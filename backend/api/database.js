// api/database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // Importamos 'path' para unir rutas

// Ruta correcta para subir un nivel (de 'api' a 'backend') y encontrar el .db
const DB_SOURCE = path.resolve(__dirname, "../database.db");

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Error fatal, no se puede conectar
        console.error("❌ Error al conectar a SQLite:", err.message);
        throw err;
    } else {
        console.log("✅ Conectado a la base de datos SQLite.");
        // Tu .db ya tiene las tablas, así que no necesitamos crearlas aquí.
    }
});

// Exportamos la conexión 'db' para usarla en otros archivos
module.exports = db;