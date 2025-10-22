const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt"); 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("❌ Error al conectar a SQLite:", err.message);
    } else {
        console.log("✅ Conectado a la base de datos SQLite.");

        // Crear tabla de usuarios si no existe
        db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        `, (err) => {
            if (err) {
                console.error("❌ Error al crear la tabla:", err.message);
            } else {
                console.log("✅ Tabla 'usuarios' lista.");
            }
        });
    }
});

// Ruta de registro (encripta contraseña)
app.post("/register", async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // <= encripta con salt

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

// Ruta de login (verifica contraseña con hash)
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT full_name, password FROM usuarios WHERE email = ?`;

    db.get(query, [email], async (err, row) => {
        if (err) {
            console.error("❌ Error en login:", err.message);
            return res.status(500).json({ success: false, error: "Error interno" });
        }

        if (row) {
            const isMatch = await bcrypt.compare(password, row.password); // <= compara hash
            if (isMatch) {
                return res.json({ success: true, name: row.full_name });
            }
        }

        return res.json({ success: false, message: "Correo o contraseña incorrectos" });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
