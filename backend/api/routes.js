// api/routes.js
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
// Ajustamos la ruta para importar la BD desde 'api/database.js'
const db = require("./database.js"); 

const router = express.Router();

// --- 1. Configuración de Multer ---
// Le decimos que guarde los archivos en la memoria (como Buffers)
// porque los vamos a meter en un BLOB, no en el disco.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// =========================================
// RUTAS DE LIBROS (El nuevo CRUD)
// =========================================

// CREATE: Crear un nuevo libro
// 'upload.fields' maneja los dos archivos: 'portada' y 'archivoLibro'
router.post("/api/libros", upload.fields([
    { name: 'portada', maxCount: 1 },
    { name: 'archivoLibro', maxCount: 1 }
]), (req, res) => {
    
    try {
        // Los archivos vienen en req.files
        const portadaFile = req.files.portada ? req.files.portada[0] : null;
        const archivoFile = req.files.archivoLibro ? req.files.archivoLibro[0] : null;

        // Los datos de texto vienen en req.body
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

// READ: Obtener todos los libros para la lista
// Solo traemos lo necesario para la tabla, no los BLOBs (archivos pesados)
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

// DELETE: Borrar un libro por su ID
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

// (Faltarían las rutas UPDATE (PUT) y GET /:id (para un solo libro),
// pero con esto ya puedes crear, leer la lista y borrar)


// =========================================
// RUTAS DE USUARIOS (Movidas desde server.js)
// =========================================

// Ruta de registro
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

// Ruta de login
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


// Exportamos el router para que server.js pueda usarlo
module.exports = router;