import React, { useState, useEffect } from "react";
import '../styles/Menu.css';
import { Link } from "react-router-dom";
// 1. IMPORTAMOS EL NUEVO COMPONENTE MODAL
import LibroDetalle from "./LibroDetalle"; 

const API_URL = "http://localhost:3001";
const MAX_LIBROS_POR_PAGINA = 15; 

const Menu = () => {
  // Estado para la lista de libros (sin cambios)
  const [libros, setLibros] = useState([]);
  
  // 2. NUEVOS ESTADOS PARA MANEJAR EL MODAL
  const [selectedLibro, setSelectedLibro] = useState(null); // Guarda los datos del libro clickeado
  const [isLoadingDetalle, setIsLoadingDetalle] = useState(false); // Muestra "Cargando..."

  // Carga la lista de libros (sin cambios)
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

  // 3. NUEVA FUNCIÓN: Se llama al hacer clic en una tarjeta
  const handleBookClick = async (libroId) => {
    setIsLoadingDetalle(true); // Muestra el overlay de carga
    setSelectedLibro(null);
    try {
      // Llamamos a la API para obtener los *detalles completos* del libro
      // (Esta es la ruta que ya usamos en Panel.jsx para editar)
      const response = await fetch(`${API_URL}/api/libros/${libroId}`);
      const result = await response.json();

      if (result.success) {
        setSelectedLibro(result.data); // Guardamos los datos completos en el estado
      } else {
        alert("Error al cargar los detalles del libro.");
      }
    } catch (err) {
      alert("Error de red al cargar detalles.");
    }
    setIsLoadingDetalle(false); // Oculta el overlay de carga
  };

  // 4. NUEVA FUNCIÓN: Para cerrar el modal
  const handleCloseDetalle = () => {
    setSelectedLibro(null);
  };

  return (
    <div className="menu-container">
      
      {/* --- ENCABEZADO (sin cambios) --- */}
      <header className="menu-header">
        <div className="header-top-row">
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
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><Link to="/MainLibrary" className="nav-link">Inicio</Link></li>
            <li><Link to="/categorias" className="nav-link">Categorías</Link></li>
            <li><Link to="/libros" className="nav-link">Libros</Link></li>
            <li><Link to="/autores" className="nav-link">Autores</Link></li>
            <li><Link to="/categories" className="nav-link">Categories</Link></li>
            <li><Link to="/colecciones" className="nav-link">Colecciones</Link></li>
            <li><Link to="/recomendados" className="nav-link">Recommutadoo</Link></li>
          </ul>
        </nav>
      </header>
      
      {/* --- PAGINACIÓN (sin cambios) --- */}
      {libros.length > MAX_LIBROS_POR_PAGINA && (
        <div className="pagination">
          {/* ... */}
        </div>
      )}
      
      {/* --- SECCIÓN DE LIBROS --- */}
      <section className="books-section">
        <h2>LIBROS POR NÚMERO DE PÁGINA</h2>
        <div className="books-grid">
          {libros.map(libro => (
            // 5. MODIFICACIÓN: La tarjeta ahora es un <button>
            <button 
              key={libro.id} 
              className="book-card" // Usamos la clase CSS existente
              onClick={() => handleBookClick(libro.id)} // Llama a la nueva función
            >
              <img 
                src={`${API_URL}/api/libros/portada/${libro.id}`} 
                alt={libro.titulo} 
                className="book-image" 
              />
              <div className="book-info">
                <h3 className="book-title">{libro.titulo}</h3>
                <p className="book-author">{libro.autor}</p>
              </div>
            </button>
          ))}
        </div>
        {libros.length === 0 && <p>Cargando libros o no hay ninguno disponible...</p>}
      </section>
      
      {/* --- FOOTER (sin cambios) --- */}
      <footer className="footer">
        {/* ... */}
      </footer>
      
      {/* --- 6. RENDERIZADO CONDICIONAL DEL MODAL --- */}
      
      {/* Muestra "Cargando..." mientras se buscan los detalles */}
      {isLoadingDetalle && (
        <div className="loading-overlay">
          <p>Cargando detalles...</p>
        </div>
      )}
      
      {/* Muestra el modal si hay un libro seleccionado */}
      {selectedLibro && (
        <LibroDetalle 
          libro={selectedLibro} 
          onClose={handleCloseDetalle} 
          apiUrl={API_URL}
        />
      )}
      
    </div>
  );
};

export default Menu;