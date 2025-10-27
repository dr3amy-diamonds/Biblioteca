import React, { useState, useEffect } from "react";
import styles from "../styles/Panel.module.css";

const API_URL = "http://localhost:3001";

// --- Definimos el estado inicial del formulario ---
const estadoInicialForm = {
    titulo: "", autor: "", descripcion: "", isbn: "", editorial: "",
    ano_publicacion: "", numero_paginas: "", genero: "", idioma: "",
    formato: "", estado: "Borrador", destacado: false,
};

const Panel = () => {
    // Estado para el formulario (completo)
    const [formData, setFormData] = useState(estadoInicialForm);
    // Estados para los archivos
    const [portada, setPortada] = useState(null);
    const [archivoLibro, setArchivoLibro] = useState(null);

    // Estado para la lista de libros
    const [libros, setLibros] = useState([]);
    
    // --- NUEVO: Estado para saber qué ID estamos editando ---
    const [editingId, setEditingId] = useState(null);

    // --- Función para LEER (READ) desde la API (Sin cambios) ---
    const fetchLibros = async () => {
        try {
            const response = await fetch(`${API_URL}/api/libros`);
            const result = await response.json();
            if (result.success) {
                setLibros(result.data); 
            } else {
                console.error("Error al cargar libros:", result.message);
            }
        } catch (err) {
            console.error("Error de red:", err);
        }
    };

    // --- Cargar los libros cuando el componente inicia (Sin cambios) ---
    useEffect(() => {
        fetchLibros();
    }, []);
    
    // --- NUEVO: Función para limpiar el formulario ---
    const resetForm = () => {
        setFormData(estadoInicialForm);
        setPortada(null);
        setArchivoLibro(null);
        setEditingId(null);
        
        // Limpiar visualmente los inputs de archivo
        // Usamos try/catch por si los elementos no están renderizados
        try {
            document.querySelector("#portada").value = null;
            document.querySelector("#archivoLibro").value = null;
        } catch (e) {}
    };

    // --- Handlers para el Formulario (sin cambios) ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: type === "checkbox" ? checked : value }));
    };
    const handlePortadaChange = (e) => { setPortada(e.target.files[0]); };
    const handleArchivoChange = (e) => { setArchivoLibro(e.target.files[0]); };
    
    
    // --- Función handleSubmit (AHORA MANEJA CREATE Y UPDATE) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Usamos FormData para enviar archivos
        const dataParaApi = new FormData();
        for (const key in formData) {
            dataParaApi.append(key, formData[key]);
        }
        if (portada) {
            dataParaApi.append("portada", portada);
        }
        if (archivoLibro) {
            dataParaApi.append("archivoLibro", archivoLibro);
        }

        try {
            let response;
            
            // 2. Decidir si es UPDATE (PUT) o CREATE (POST)
            if (editingId) {
                // --- Lógica de UPDATE (PUT) ---
                response = await fetch(`${API_URL}/api/libros/${editingId}`, {
                    method: "PUT",
                    body: dataParaApi,
                });
            } else {
                // --- Lógica de CREATE (POST) ---
                response = await fetch(`${API_URL}/api/libros`, {
                    method: "POST",
                    body: dataParaApi,
                });
            }

            const result = await response.json();

            if (result.success) {
                alert(`¡Libro ${editingId ? 'actualizado' : 'guardado'} exitosamente!`);
                resetForm();   // Limpiar formulario y salir del modo edición
                fetchLibros(); // Recargar la tabla
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            console.error("Error de red al guardar/actualizar:", err);
            alert("Error de conexión al guardar/actualizar el libro.");
        }
    };
    
    // --- Función para BORRAR (DELETE) (Sin cambios) ---
    const handleEliminar = async (libro) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${libro.titulo}"?`)) {
            try {
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
    
    // --- NUEVO: Función para EDITAR (Carga datos en el form) ---
    const handleEditar = async (libro) => {
        console.log("Cargando datos para editar:", libro.id);
        try {
            // 1. Llamar a la API para obtener TODOS los datos de este libro
            const response = await fetch(`${API_URL}/api/libros/${libro.id}`);
            const result = await response.json();
            
            if (result.success) {
                // 2. Rellenar el formulario con los datos recibidos
                setFormData(result.data);
                // 3. Marcar el ID que estamos editando
                setEditingId(libro.id);
                // 4. Limpiar los campos de archivo (el usuario debe subirlos de nuevo si quiere cambiarlos)
                setPortada(null);
                setArchivoLibro(null);
                document.querySelector("#portada").value = null;
                document.querySelector("#archivoLibro").value = null;
                
                // Opcional: Mover la vista al formulario
                window.scrollTo(0, 0); 
            } else {
                alert(`Error al cargar datos: ${result.message}`);
            }
        } catch (err) {
             console.error("Error de red al cargar libro:", err);
             alert("Error de conexión al cargar datos para editar.");
        }
    };

    return (
        <div className={styles.panel}>
            
            <header className={styles.panelHeader}>
                <h1>Panel de Administración</h1>
                <button className={styles.btnGestionar}>Gestionar Relaciones</button>
            </header>

            <div className={styles.panelContent}>

                {/* --- COLUMNA IZQUIERDA: TARJETA DE FORMULARIO --- */}
                <div className={styles.formCard}>
                    {/* Título dinámico */}
                    <h2>{editingId ? "Editando Libro" : "Registrar Nuevo Item"}</h2>
                    
                    <form className={styles.libroForm} onSubmit={handleSubmit}>
                        
                        {/* Columna 1 del Formulario (Inputs sin cambios) */}
                        <div className={styles.formColumna}>
                            {/* ... (todos los .formGroup de título, autor, desc, isbn, editorial) ... */}
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

                        {/* Columna 2 del Formulario (Inputs sin cambios) */}
                        <div className={styles.formColumna}>
                            {/* ... (todos los .formGroup de año, pág, género, etc.) ... */}
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
                                {editingId && <small>Dejar vacío para conservar la portada actual.</small>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="archivoLibro">Archivo del Libro (PDF/EPUB):</label>
                                <input type="file" id="archivoLibro" name="archivoLibro" accept=".pdf,.epub" onChange={handleArchivoChange} />
                                {editingId && <small>Dejar vacío para conservar el archivo actual.</small>}
                            </div>
                        </div>

                        {/* Botones dinámicos */}
                        <div className={styles.formActions}>
                            {/* Mostramos "Cancelar" solo si estamos editando */}
                            {editingId && (
                                <button type="button" className={styles.btnCancelar} onClick={resetForm}>
                                    Cancelar
                                </button>
                            )}
                            <button type="submit" className={styles.btnGuardar}>
                                {editingId ? "Actualizar Libro" : "Guardar Libro"}
                            </button>
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
                                {/* NUEVA COLUMNA */}
                                <th>Portada</th> 
                                <th>Título</th>
                                <th>Autor</th>
                                <th>ISBN</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libros.map(libro => (
                                <tr key={libro.id}>
                                    <td>{libro.id}</td>
                                    {/* NUEVO TD CON LA IMAGEN */}
                                    <td>
                                        <img 
                                            src={`${API_URL}/api/libros/portada/${libro.id}`} 
                                            alt={`Portada de ${libro.titulo}`}
                                            className={styles.portadaThumbnail}
                                        />
                                    </td>
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