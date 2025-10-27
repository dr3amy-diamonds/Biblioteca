import React, { useState, useEffect } from "react";
import '../styles/Menu.css';
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001";
const MAX_LIBROS_POR_PAGINA = 15; 

const Menu = () => {
  const [libros, setLibros] = useState([]);

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

  return (
    <div className="menu-container">
      
      {/* --- ENCABEZADO SUPERIOR (AHORA CON NAVEGACIÓN DENTRO) --- */}
      <header className="menu-header">
        {/* Fila superior para logo y búsqueda */}
        <div className="header-top-row">
          <div className="logo-container">
            <img src="/images/logo.png" alt="The Old Library Logo" className="logo" />
            <h1>The Old Library</h1>
          </div>
          <div className="search-container">
            <input type="text" placeholder="Buscar un libro..." className="search-input" />
            <button className="search-button">
              <i className="search-icon">🔍</i>
            </button>
          </div>
        </div>
        
        {/* Fila inferior para la barra de navegación */}
        <nav className="main-nav">
          <ul className="nav-links">
            <li><Link to="/MainLibrary" className="nav-link">Inicio</Link></li>
            <li><Link to="/categorias" className="nav-link">Categorías</Link></li>
            <li><Link to="/libros" className="nav-link">Libros</Link></li>
            <li><Link to="/autores" className="nav-link">Autores</Link></li>
            <li><Link to="/recomendados" className="nav-link">Recomendados</Link></li>
          </ul>
        </nav>
      </header>
      
      {/* --- PAGINACIÓN CONDICIONAL --- */}
      {libros.length > MAX_LIBROS_POR_PAGINA && (
        <div className="pagination">
          <a href="#" className="page-link active">1</a>
          <a href="#" className="page-link">2</a>
          <a href="#" className="page-link">3</a>
        </div>
      )}
      
      {/* --- SECCIÓN DE LIBROS --- */}
      <section className="books-section">
        <h2>Bienvenido</h2>
        <div className="books-grid">
          {libros.map(libro => (
            <div key={libro.id} className="book-card">
              <img 
                src={`${API_URL}/api/libros/portada/${libro.id}`} 
                alt={libro.titulo} 
                className="book-image" 
              />
              <div className="book-info">
                <h3 className="book-title">{libro.titulo}</h3>
                <p className="book-author">{libro.autor}</p>
              </div>
            </div>
          ))}
        </div>
        {libros.length === 0 && <p>Cargando libros o no hay ninguno disponible...</p>}
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} The Old Library. Todos los derechos reservados.</p>
          <div className="footer-links">
            <Link to="/privacidad" className="footer-link">Política de Privacidad</Link>
            <Link to="/terminos" className="footer-link">Términos de Uso</Link>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default Menu;