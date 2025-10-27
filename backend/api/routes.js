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
// La portada la cargaremos con una ruta separada
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

// --- NUEVO: READ (Portada) ---
// Esta ruta especial sirve la imagen BLOB de la portada
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
            // Puedes enviar una imagen placeholder si no se encuentra
            res.status(404).send("Portada no encontrada");
        }
    });
});

// --- NUEVO: READ (Uno solo para Editar) ---
// Trae todos los datos de un libro (EXCEPTO los BLOBs pesados)
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


// --- NUEVO: UPDATE (Actualizar) ---
router.put("/api/libros/:id", upload.fields([
    { name: 'portada', maxCount: 1 },
    { name: 'archivoLibro', maxCount: 1 }
]), (req, res) => {
    
    try {
        const id = req.params.id;
        const portadaFile = req.files.portada ? req.files.portada[0] : null;
        const archivoFile = req.files.archivoLibro ? req.files.archivoLibro[0] : null;
        const data = req.body;

        // 1. Empezamos la query de actualización solo con los campos de texto
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

        // 2. Si el usuario subió una NUEVA portada, la añadimos a la query
        if (portadaFile) {
            sql += ", nombre_portada = ?, tipo_portada = ?, portada_contenido = ?";
            params.push(portadaFile.originalname, portadaFile.mimetype, portadaFile.buffer);
        }
        
        // 3. Si el usuario subió un NUEVO archivo de libro, lo añadimos
        if (archivoFile) {
            sql += ", nombre_archivo = ?, tipo_archivo = ?, archivo_contenido = ?";
            params.push(archivoFile.originalname, archivoFile.mimetype, archivoFile.buffer);
        }

        // 4. Cerramos la query con el WHERE
        sql += " WHERE id = ?";
        params.push(id);

        // 5. Ejecutamos
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
router.post("/register", async (req, res) => { /* ...código existente... */ });
router.post("/login", (req, res) => { /* ...código existente... */ });


module.exports = router;