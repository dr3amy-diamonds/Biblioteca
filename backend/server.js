// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// --- 1. Importamos el router ---
// Nota la ruta: './api/routes.js' porque el archivo está dentro de la carpeta 'api'
const apiRoutes = require("./api/routes.js");

const app = express();
const PORT = 3001;

// --- 2. Configuraciones Generales ---
app.use(cors());
// Aumentamos el límite para poder recibir los archivos BLOB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// --- 3. El "Gerente" ---
// Le decimos a Express que para CUALQUIER ruta ('/'), 
// debe usar el router que importamos.
app.use("/", apiRoutes);

// --- 4. Arrancar el servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});