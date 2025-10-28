import React from 'react';
// 1. ELIMINAMOS la importación de .module.css
// import styles from '../styles/LibroDetalle.module.css'; 
// (No necesitamos importar Menu.css aquí porque ya está importado en Menu.jsx)

// --- Iconos SVG Simples ---
const IconDownload = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
    </svg>
);
const IconClose = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
);
// --- Fin de Iconos ---

const LibroDetalle = ({ libro, onClose, apiUrl }) => {

    const handleContentClick = (e) => e.stopPropagation();

    if (!libro) return null;

    // 2. CAMBIAMOS {styles.clase} por "clase"
    return (
        <div className="modalOverlay" onClick={onClose}>
        
        <div className="modalContent" onClick={handleContentClick}>
            
            <button className="closeButton" onClick={onClose}>
            <IconClose />
            </button>
            
            <nav className="breadcrumb">
            Inicio / Categoría / {libro.genero || "General"}
            </nav>

            <div className="detalleMain">
            
            <div className="detalleCover">
                <img 
                src={`${apiUrl}/api/libros/portada/${libro.id}`} 
                alt={`Portada de ${libro.titulo}`} 
                />
            </div>

            <div className="detalleInfo">
                <h1>{libro.titulo}</h1>
                
                <p className="infoItem">
                <strong>Autor(es):</strong> {libro.autor || "No especificado"}
                </p>
                <p className="infoItem">
                <strong>Año de Publicación:</strong> {libro.ano_publicacion || "N/A"}
                </p>
                <p className="infoItem">
                <strong>Género:</strong> {libro.genero || "No especificado"}
                </p>
                <p className="infoItem">
                <strong>Editorial:</strong> {libro.editorial || "No especificado"}
                </p>
                <p className="infoItem">
                <strong>ISBN:</strong> {libro.isbn || "No especificado"}
                </p>

                <h3>Sinopsis</h3>
                <p className="sinopsis">
                {libro.descripcion || "No hay descripción disponible."}
                </p>

                <div className="detalleActions">
                <a 
                    href={`${apiUrl}/api/libros/archivo/${libro.id}`}
                    className="btnDescargar"
                    download
                >
                    Descargar (PDF) <IconDownload />
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default LibroDetalle;