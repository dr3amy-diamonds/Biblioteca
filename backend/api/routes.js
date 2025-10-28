// api/routes.js
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const db = require("./database.js"); 

const router = express.Router();

// --- Configuración de Multer (sin cambios) ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// =========================================
// RUTAS DE LIBROS (CRUD Completo)
// =========================================

// --- CREATE (Sin cambios) ---
router.post("/api/libros", upload.fields([
    { name: 'portada', maxCount: 1 },
    { name: 'archivoLibro', maxCount: 1 }
]), (req, res) => {
    
    try {
        const portadaFile = req.files.portada ? req.files.portada[0] : null;
        const archivoFile = req.files.archivoLibro ? req.files.archivoLibro[0] : null;
        const data = req.body;

        const sql = `
            INSERT INTO libros (
                titulo, autor, descripcion, isbn, editorial, ano_publicacion,
                numero_paginas, genero, idioma, formato, estado, destacado,
                nombre_portada, tipo_portada, portada_contenido,
                nombre_archivo, tipo_archivo, archivo_contenido
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;
        
        const params = [
            data.titulo, data.autor, data.descripcion, data.isbn, data.editorial, data.ano_publicacion,
            data.numero_paginas, data.genero, data.idioma, data.formato, data.estado, data.destacado,
            portadaFile ? portadaFile.originalname : null,
            portadaFile ? portadaFile.mimetype : null,
            portadaFile ? portadaFile.buffer : null,
            archivoFile ? archivoFile.originalname : null,
            archivoFile ? archivoFile.mimetype : null,
            archivoFile ? archivoFile.buffer : null
        ];

        db.run(sql, params, function(err) {
            if (err) {
                console.error("❌ Error al crear libro:", err.message);
                return res.status(500).json({ success: false, message: err.message });
            }
            res.json({ success: true, id: this.lastID });
        });
    } catch (err) {
        console.error("❌ Error procesando la subida:", err.message);
        res.status(500).json({ success: false, message: "Error en el servidor al procesar archivos." });
    }
});

// --- READ (Lista) (Sin cambios) ---
router.get("/api/libros", (req, res) => {
    const sql = "SELECT id, titulo, autor, isbn FROM libros";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("❌ Error al leer libros:", err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, data: rows });
    });
});

// --- READ (Portada) (Mejora menor) ---
router.get("/api/libros/portada/:id", (req, res) => {
    const sql = "SELECT tipo_portada, portada_contenido FROM libros WHERE id = ?";
    
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        if (row && row.portada_contenido) {
            res.setHeader('Content-Type', row.tipo_portada || 'image/jpeg');
            res.send(row.portada_contenido);
        } else {
            // CORREGIDO: Enviar un 404 vacío es mejor que enviar texto
            res.status(404).send(); 
        }
    });
});

// --- READ (Archivo del Libro) (Sin cambios) ---
router.get("/api/libros/archivo/:id", (req, res) => {
    const sql = "SELECT nombre_archivo, tipo_archivo, archivo_contenido FROM libros WHERE id = ?";
    
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            console.error("❌ Error al buscar archivo:", err.message);
            return res.status(500).send("Error del servidor");
        }
        if (row && row.archivo_contenido) {
            res.setHeader('Content-Type', row.tipo_archivo || 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${row.nombre_archivo || 'libro.pdf'}"`);
            res.send(row.archivo_contenido);
        } else {
            res.status(404).send("Archivo no encontrado");
        }
    });
});

// --- READ (Uno solo para Editar) (Sin cambios) ---
router.get("/api/libros/:id", (req, res) => {
    const sql = `
        SELECT id, titulo, autor, descripcion, isbn, editorial, 
               ano_publicacion, numero_paginas, genero, idioma, 
               formato, estado, destacado 
        FROM libros 
        WHERE id = ?
    `;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            console.error("❌ Error al buscar libro:", err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
        if (row) {
            res.json({ success: true, data: row });
        } else {
            res.status(404).json({ success: false, message: "Libro no encontrado" });
        }
    });
});


// --- UPDATE (Actualizar) (¡CORREGIDO!) ---
router.put("/api/libros/:id", upload.fields([
    { name: 'portada', maxCount: 1 },
    { name: 'archivoLibro', maxCount: 1 }
]), (req, res) => {
    
    try {
        const id = req.params.id;
        const portadaFile = req.files.portada ? req.files.portada[0] : null;
        const archivoFile = req.files.archivoLibro ? req.files.archivoLibro[0] : null;
        const data = req.body;

        // 1. Empezamos la query (sin cambios)
        let sql = `
            UPDATE libros SET 
                titulo = ?, autor = ?, descripcion = ?, isbn = ?, editorial = ?, 
                ano_publicacion = ?, numero_paginas = ?, genero = ?, idioma = ?, 
                formato = ?, estado = ?, destacado = ?
        `;
        
        let params = [
            data.titulo, data.autor, data.descripcion, data.isbn, data.editorial, 
            data.ano_publicacion, data.numero_paginas, data.genero, data.idioma, 
            data.formato, data.estado, data.destacado
        ];

        // 2. Añadir portada (sin cambios)
        if (portadaFile) {
            sql += ", nombre_portada = ?, tipo_portada = ?, portada_contenido = ?";
            params.push(portadaFile.originalname, portadaFile.mimetype, portadaFile.buffer);
        }
        
        // 3. Añadir archivo de libro (¡CORREGIDO!)
        if (archivoFile) {
            // CORREGIDO: Se quitó el '=' duplicado en 'tipo_archivo = ?'
            sql += ", nombre_archivo = ?, tipo_archivo = ?, archivo_contenido = ?";
            params.push(archivoFile.originalname, archivoFile.mimetype, archivoFile.buffer);
        }

        // 4. Cerramos la query (sin cambios)
        sql += " WHERE id = ?";
        params.push(id);

        // 5. Ejecutamos (sin cambios)
        db.run(sql, params, function(err) {
            if (err) {
                console.error("❌ Error al actualizar libro:", err.message);
                return res.status(500).json({ success: false, message: err.message });
            }
            if (this.changes === 0) {
                 return res.status(404).json({ success: false, message: "Libro no encontrado" });
            }
            res.json({ success: true, message: "Libro actualizado", changes: this.changes });
        });
    } catch (err) {
        console.error("❌ Error procesando la actualización:", err.message);
        res.status(500).json({ success: false, message: "Error en el servidor al procesar archivos." });
    }
});


// --- DELETE (Sin cambios) ---
router.delete("/api/libros/:id", (req, res) => {
    const sql = "DELETE FROM libros WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            console.error("❌ Error al borrar libro:", err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: "Libro no encontrado" });
        }
        res.json({ success: true, message: "Libro eliminado", changes: this.changes });
    });
});


// =========================================
// RUTAS DE USUARIOS (Sin cambios)
// =========================================
router.post("/register", async (req, res) => {
    const { full_name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO usuarios (full_name, email, password) VALUES (?, ?, ?)`;
        db.run(query, [full_name, email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.json({ success: false, message: "El correo ya está registrado." });
                }
                console.error("❌ Error en registro:", err.message);
                return res.status(500).json({ success: false });
            }
            return res.json({ success: true });
        });
    } catch (err) {
        console.error("❌ Error al encriptar contraseña:", err.message);
        return res.status(500).json({ success: false });
    }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT full_name, password FROM usuarios WHERE email = ?`;
    db.get(query, [email], async (err, row) => {
        if (err) {
            console.error("❌ Error en login:", err.message);
            return res.status(500).json({ success: false, error: "Error interno" });
        }
        if (row) {
            const isMatch = await bcrypt.compare(password, row.password);
            if (isMatch) {
                return res.json({ success: true, name: row.full_name });
            }
        }
        return res.json({ success: false, message: "Correo o contraseña incorrectos" });
    });
});


module.exports = router;