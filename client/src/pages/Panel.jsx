import React, { useState, useEffect } from "react";
// Importamos los estilos del módulo CSS
import styles from "../styles/Panel.module.css";

// --- 1. Definimos la URL de tu Backend ---
const API_URL = "http://localhost:3001";

const Panel = () => {
    // Estado para el formulario (completo)
    const [formData, setFormData] = useState({
        titulo: "", autor: "", descripcion: "", isbn: "", editorial: "",
        ano_publicacion: "", numero_paginas: "", genero: "", idioma: "",
        formato: "", estado: "Borrador", destacado: false,
    });
    // Estados para los archivos
    const [portada, setPortada] = useState(null);
    const [archivoLibro, setArchivoLibro] = useState(null);

    // Estado para la lista de libros
    const [libros, setLibros] = useState([]);

    // --- 2. Función para LEER (READ) desde la API ---
    const fetchLibros = async () => {
        try {
            // Llama a tu ruta GET /api/libros
            const response = await fetch(`${API_URL}/api/libros`);
            const result = await response.json();
            if (result.success) {
                setLibros(result.data); // Llena la tabla con datos de la BD
            } else {
                console.error("Error al cargar libros:", result.message);
            }
        } catch (err) {
            console.error("Error de red:", err);
        }
    };

    // --- 3. Cargar los libros cuando el componente inicia ---
    useEffect(() => {
        fetchLibros(); // Ya no usa mockLibros
    }, []);

    // --- Handlers para el Formulario (sin cambios) ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: type === "checkbox" ? checked : value }));
    };
    const handlePortadaChange = (e) => { setPortada(e.target.files[0]); };
    const handleArchivoChange = (e) => { setArchivoLibro(e.target.files[0]); };
    
    // --- 4. Función para CREAR (CREATE) en la API ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Usamos FormData porque estamos enviando archivos (BLOBs)
        const dataParaApi = new FormData();

        // 1. Añadir todos los campos de texto
        for (const key in formData) {
            dataParaApi.append(key, formData[key]);
        }
        
        // 2. Añadir los archivos
        if (portada) {
            dataParaApi.append("portada", portada);
        }
        if (archivoLibro) {
            dataParaApi.append("archivoLibro", archivoLibro);
        }

        try {
            // Llama a tu ruta POST /api/libros
            const response = await fetch(`${API_URL}/api/libros`, {
                method: "POST",
                body: dataParaApi,
                // No se pone 'Content-Type', FormData lo hace automático
            });

            const result = await response.json();

            if (result.success) {
                alert("¡Libro guardado exitosamente!");
                // Limpiar formulario y recargar la lista
                setFormData({
                    titulo: "", autor: "", descripcion: "", isbn: "", editorial: "",
                    ano_publicacion: "", numero_paginas: "", genero: "", idioma: "",
                    formato: "", estado: "Borrador", destacado: false,
                });
                setPortada(null);
                setArchivoLibro(null);
                e.target.querySelector("#portada").value = null;
                e.target.querySelector("#archivoLibro").value = null;
                
                fetchLibros(); // Recargar la tabla
            } else {
                alert(`Error al guardar: ${result.message}`);
            }
        } catch (err) {
            console.error("Error de red al guardar:", err);
            alert("Error de conexión al guardar el libro.");
        }
    };
    
    // --- 5. Función para BORRAR (DELETE) en la API ---
    const handleEliminar = async (libro) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${libro.titulo}"?`)) {
            try {
                // Llama a tu ruta DELETE /api/libros/:id
                const response = await fetch(`${API_URL}/api/libros/${libro.id}`, {
                    method: 'DELETE'
                });
                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    fetchLibros(); // Recargar la tabla
                } else {
                     alert(`Error al eliminar: ${result.message}`);
                }
            } catch (err) {
                console.error("Error de red al eliminar:", err);
                alert("Error de conexión al eliminar.");
            }
        }
    };
    
    // (HandleEditar sigue como simulación por ahora)
    const handleEditar = (libro) => {
        alert(`(Función Editar aún no conectada) Cargando datos de "${libro.titulo}"...`);
        setFormData({
             ...formData, 
             titulo: libro.titulo,
             autor: libro.autor,
             isbn: libro.isbn,
             // ...etc
        });
    };

    return (
        // Contenedor principal (fondo gris)
        <div className={styles.panel}>
            
            {/* Encabezado del Panel */}
            <header className={styles.panelHeader}>
                <h1>Panel de Administración</h1>
                <button className={styles.btnGestionar}>Gestionar Relaciones</button>
            </header>

            {/* Contenedor de 2 Columnas (Flexbox) */}
            <div className={styles.panelContent}>

                {/* --- COLUMNA IZQUIERDA: TARJETA DE FORMULARIO --- */}
                <div className={styles.formCard}>
                    <h2>Registrar Nuevo Item</h2>
                    
                    {/* El formulario ahora llama al nuevo handleSubmit (async) */}
                    <form className={styles.libroForm} onSubmit={handleSubmit}>
                        
                        {/* Columna 1 del Formulario */}
                        <div className={styles.formColumna}>
                            <div className={styles.formGroup}>
                                <label htmlFor="titulo">Título del Libro:</label>
                                <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="autor">Autor:</label>
                                <input type="text" id="autor" name="autor" value={formData.autor} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="descripcion">Descripción:</label>
                                <textarea id="descripcion" name="descripcion" rows="6" value={formData.descripcion} onChange={handleChange}></textarea>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="isbn">ISBN (Código):</label>
                                <input type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="editorial">Editorial:</label>
                                <input type="text" id="editorial" name="editorial" value={formData.editorial} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Columna 2 del Formulario */}
                        <div className={styles.formColumna}>
                            <div className={styles.formGroupInline}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="ano_publicacion">Año Pub:</label>
                                    <input type="number" id="ano_publicacion" name="ano_publicacion" placeholder="Ej: 2024" value={formData.ano_publicacion} onChange={handleChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="numero_paginas">Nº Páginas:</label>
                                    <input type="number" id="numero_paginas" name="numero_paginas" placeholder="Ej: 300" value={formData.numero_paginas} onChange={handleChange} />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="genero">Género:</label>
                                <input type="text" id="genero" name="genero" placeholder="Ej: Ciencia Ficción" value={formData.genero} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="idioma">Idioma:</label>
                                <input type="text" id="idioma" name="idioma" placeholder="Ej: Español" value={formData.idioma} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="formato">Formato:</label>
                                <input type="text" id="formato" name="formato" placeholder="Ej: PDF, EPUB, Tapa blanda" value={formData.formato} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="estado">Estado:</label>
                                <select id="estado" name="estado" value={formData.estado} onChange={handleChange}>
                                    <option value="Borrador">Borrador</option>
                                    <option value="Publicado">Publicado</option>
                                    <option value="Oculto">Oculto</option>
                                </select>
                            </div>
                            <div className={styles.formGroupCheckbox}>
                                <label htmlFor="destacado">Marcar como Destacado:</label>
                                <input type="checkbox" id="destacado" name="destacado" checked={formData.destacado} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="portada">Imagen de Portada:</label>
                                <input type="file" id="portada" name="portada" accept="image/*" onChange={handlePortadaChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="archivoLibro">Archivo del Libro (PDF/EPUB):</label>
                                <input type="file" id="archivoLibro" name="archivoLibro" accept=".pdf,.epub" onChange={handleArchivoChange} />
                            </div>
                        </div>

                        {/* Botón de Guardar */}
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.btnGuardar}>Guardar Libro</button>
                        </div>
                    </form>
                </div>

                {/* --- COLUMNA DERECHA: TARJETA DE TABLA --- */}
                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>Tabla de Libros</h2>
                    </div>
                    
                    <table className={styles.listaTabla}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>ISBN</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ahora 'libros' viene de la API */}
                            {libros.map(libro => (
                                <tr key={libro.id}>
                                    <td>{libro.id}</td>
                                    <td>{libro.titulo}</td>
                                    <td>{libro.autor}</td>
                                    <td>{libro.isbn}</td>
                                    <td>
                                        <div className={styles.accionesBotones}>
                                            <button 
                                                className={styles.btnEditar}
                                                onClick={() => handleEditar(libro)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className={styles.btnEliminar}
                                                onClick={() => handleEliminar(libro)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {libros.length === 0 && <p>Cargando libros o no hay libros para mostrar.</p>}
                </div>

            </div>
        </div>
    );
};

export default Panel;