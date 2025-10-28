// Menu.jsx (Corregido)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 1. IMPORTAMOS EL MÓDULO (styles)
import styles from "../styles/Menu.module.css"; 
import LibroDetalle from "./LibroDetalle"; 

const API_URL = "http://localhost:3001";
const MAX_LIBROS_POR_PAGINA = 15; 

const Menu = () => {
  // ... (toda tu lógica de 'useState', 'useEffect', 'handleBookClick' no cambia) ...
  const [libros, setLibros] = useState([]);
  const [selectedLibro, setSelectedLibro] = useState(null); 
  const [isLoadingDetalle, setIsLoadingDetalle] = useState(false);

  useEffect(() => {
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
        console.error("Error de red al cargar libros:", err);
      }
    };
    fetchLibros();
  }, []); 

  const handleBookClick = async (libroId) => {
    setIsLoadingDetalle(true); 
    setSelectedLibro(null);
    try {
      const response = await fetch(`${API_URL}/api/libros/${libroId}`);
      const result = await response.json();
      if (result.success) {
        setSelectedLibro(result.data); 
      } else {
        alert("Error al cargar los detalles del libro.");
      }
    } catch (err) {
      alert("Error de red al cargar detalles.");
    }
    setIsLoadingDetalle(false); 
  };

  const handleCloseDetalle = () => {
    setSelectedLibro(null);
  };

  return (
    <>
      {/* 2. CORRECCIÓN: Usamos styles['clase-con-guion'] */}
      <div className={styles['menu-container']}>
        
        <header className={styles['menu-header']}>
          <div className={styles['header-top-row']}>
            <div className={styles['logo-container']}>
              {/* 'logo' no tiene guion, así que styles.logo está bien */}
              <img src="/images/logo.png" alt="The Old Library Logo" className={styles.logo} />
              <h1>The Old Library</h1>
            </div>
            <div className={styles['search-container']}>
              <input type="text" placeholder="Buscar un libro..." className={styles['search-input']} />
              <button className={styles['search-button']}>
                <i className="search-icon">🔍</i>
              </button>
            </div>
          </div>
          <nav className={styles['main-nav']}>
            <ul className={styles['nav-links']}>
              <li><Link to="/MainLibrary" className={styles['nav-link']}>Inicio</Link></li>
              <li><Link to="/categorias" className={styles['nav-link']}>Categorías</Link></li>
              <li><Link to="/colecciones" className={styles['nav-link']}>Colecciones</Link></li>
              <li><Link to="/recomendados" className={styles['nav-link']}>Recomendados</Link></li>
            </ul>
          </nav>
        </header>
        
        {libros.length > MAX_LIBROS_POR_PAGINA && (
          // 'pagination' no tiene guion
          <div className={styles.pagination}>
            {/* ... */}
          </div>
        )}
        
        <section className={styles['books-section']}>
          <h2>Bienvenidos</h2>
          <div className={styles['books-grid']}>
            {libros.map(libro => (
              <button 
                key={libro.id} 
                className={styles['book-card']}
                onClick={() => handleBookClick(libro.id)}
              >
                <img 
                  src={`${API_URL}/api/libros/portada/${libro.id}`} 
                  alt={libro.titulo} 
                  className={styles['book-image']} 
                />
                <div className={styles['book-info']}>
                  <h3 className={styles['book-title']}>{libro.titulo}</h3>
                  <p className={styles['book-author']}>{libro.autor}</p>
                </div>
              </button>
            ))}
          </div>
          {libros.length === 0 && <p>Cargando libros o no hay ninguno disponible...</p>}
        </section>
        
        {/* 'footer' no tiene guion */}
        <footer className={styles.footer}>
          {/* ... (asegúrate de que las clases del footer también usen 'styles.') ... */}
        </footer>
        
      </div> 

      {/* Los overlays están fuera y usan corchetes */}
      {isLoadingDetalle && (
        <div className={styles['loading-overlay']}>
          <p>Cargando detalles...</p>
        </div>
      )}
      
      {selectedLibro && (
        <LibroDetalle 
          libro={selectedLibro} 
          onClose={handleCloseDetalle} 
          apiUrl={API_URL}
        />
      )}
      
    </> 
  );
};

export default Menu;