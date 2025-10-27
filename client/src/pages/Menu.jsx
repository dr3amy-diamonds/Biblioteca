import React, { useState, useEffect } from "react"; // 1. Importamos useState y useEffect
import '../styles/Menu.css';
import { Link } from "react-router-dom";

// 2. Definimos la URL de tu API (igual que en Panel.jsx)
const API_URL = "http://localhost:3001";

const Menu = () => {
  // 3. Reemplazamos el array estático por un estado vacío
  const [libros, setLibros] = useState([]);

  // 4. Usamos useEffect para cargar los datos cuando el componente se monte
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        // Llamamos a la misma API que usa tu Panel para la lista
        const response = await fetch(`${API_URL}/api/libros`);
        const result = await response.json();
        
        if (result.success) {
          setLibros(result.data); // Guardamos los libros en el estado
        } else {
          console.error("Error al cargar libros:", result.message);
        }
      } catch (err) {
        console.error("Error de red al cargar libros:", err);
      }
    };

    fetchLibros();
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="logo-container">
          <img src="/images/logo.svg" alt="The Old Library Logo" className="logo" />
          <h1>The Old Library</h1>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Buscar un libro..." className="search-input" />
          <button className="search-button">
            <i className="search-icon">🔍</i>
          </button>
        </div>
      </header>
      
      {/* Esta paginación sigue siendo estática por ahora */}
      <div className="pagination">
        <a href="#" className="page-link active">1</a>
        <a href="#" className="page-link">2</a>
        <a href="#" className="page-link">3</a>
      </div>
      
      <section className="books-section">
        <h2>LIBROS POR NÚMERO DE PÁGINA</h2>
        <div className="books-grid">
          {/* 5. Mapeamos sobre el estado 'libros' */}
          {libros.map(libro => (
            <div key={libro.id} className="book-card">
              
              {/* 6. ¡CAMBIO CLAVE! Usamos la URL de la API para la portada */}
              <img 
                src={`${API_URL}/api/libros/portada/${libro.id}`} 
                alt={libro.titulo} 
                className="book-image" 
              />
              
              <div className="book-info">
                {/* Los nombres 'titulo' y 'autor' coinciden con tu API */}
                <h3 className="book-title">{libro.titulo}</h3>
                <p className="book-author">{libro.autor}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mensaje por si no hay libros */}
        {libros.length === 0 && <p>Cargando libros o no hay ninguno disponible...</p>}
      </section>
      
      <nav className="main-nav">
        <ul className="nav-links">
          {/* Tus links de navegación no cambian */}
          <li><Link to="/MainLibrary" className="nav-link">Inicio</Link></li>
          <li><Link to="/categorias" className="nav-link">Categorías</Link></li>
          <li><Link to="/libros" className="nav-link">Libros</Link></li>
          <li><Link to="/autores" className="nav-link">Autores</Link></li>
          <li><Link to="/categories" className="nav-link">Categories</Link></li>
          <li><Link to="/colecciones" className="nav-link">Colecciones</Link></li>
          <li><Link to="/recomendados" className="nav-link">Recommutadoo</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;