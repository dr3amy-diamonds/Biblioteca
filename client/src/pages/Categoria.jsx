// pages/Categoria.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetch from "../utils/useFetch";
import LibroDetalle from "./LibroDetalle";
import "../styles/Categoria.css";

const API_URL = "http://localhost:3001";

/**
 * Componente Categoria
 * 
 * Funcionalidad:
 * - Vista principal: Muestra todas las categorías disponibles en cards con estadísticas
 * - Vista detalle: Muestra libros de una categoría específica al hacer clic
 * - Incluye el mismo header que Menu.jsx para coherencia visual
 * - Responsive y accesible
 */
const Categoria = () => {
  const { nombre } = useParams(); // Captura el parámetro de URL si existe
  const navigate = useNavigate();

  // Estados para el modal de detalles del libro
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [isLoadingDetalle, setIsLoadingDetalle] = useState(false);

  // Fetch de categorías con estadísticas
  const { 
    data: categorias, 
    loading: loadingCategorias, 
    error: errorCategorias 
  } = useFetch(`${API_URL}/api/categorias/stats/count`, {
    skip: !!nombre // Solo cargar si NO hay parámetro nombre
  });

  // Fetch de libros por categoría (solo si hay nombre en la URL)
  const { 
    data: libros, 
    loading: loadingLibros, 
    error: errorLibros 
  } = useFetch(
    nombre ? `${API_URL}/api/categorias/${nombre}` : null,
    { skip: !nombre }
  );

  // Función para manejar clic en una categoría
  const handleCategoriaClick = (categoriaName) => {
    navigate(`/categoria/${encodeURIComponent(categoriaName)}`);
  };

  // Función para volver a la vista de categorías
  const handleVolverCategorias = () => {
    navigate('/categorias');
  };

  // Función para abrir detalles de un libro
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

  // Agrupar categorías por tipo (para futuras implementaciones de subcategorías)
  const agruparCategorias = (cats) => {
    if (!cats) return [];
    
    // Aquí podrías implementar lógica para agrupar categorías relacionadas
    // Por ejemplo, agrupar "Filosofía", "Ética", "Estética" bajo "Filosofía"
    // Por ahora, retornamos todas como principales
    return cats.map(cat => ({
      nombre: cat.categoria,
      total: cat.total,
      subcategorias: [] // Para futuro uso
    }));
  };

  // --- RENDERIZADO CONDICIONAL ---

  // Vista de carga
  if (loadingCategorias || (nombre && loadingLibros)) {
    return (
      <div className="categoria-container">
        <Header />
        <main className="categoria-main">
          <div className="loading-message">
            <p>⏳ Cargando {nombre ? 'libros' : 'categorías'}...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Vista de error
  if (errorCategorias || errorLibros) {
    return (
      <div className="categoria-container">
        <Header />
        <main className="categoria-main">
          <div className="error-message">
            <h2>⚠️ Error al cargar datos</h2>
            <p>{errorCategorias || errorLibros}</p>
            <button onClick={() => window.location.reload()} className="btn-retry">
              Intentar de nuevo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Vista de categoría específica (detalle)
  if (nombre && libros) {
    return (
      <div className="categoria-container">
        <Header />
        <main className="categoria-main">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <button onClick={handleVolverCategorias} className="breadcrumb-link">
              ← Categorías
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{nombre}</span>
          </nav>

          <section className="categoria-detalle">
            <h1 className="categoria-titulo">{nombre}</h1>
            <p className="categoria-subtitulo">
              {libros.length} {libros.length === 1 ? 'libro encontrado' : 'libros encontrados'}
            </p>

            {libros.length === 0 ? (
              <div className="no-books-message">
                <p>📚 No hay libros disponibles en esta categoría.</p>
              </div>
            ) : (
              <div className="libros-grid">
                {libros.map((libro) => (
                  <button
                    key={libro.id}
                    className="libro-card"
                    onClick={() => handleBookClick(libro.id)}
                  >
                    <img
                      src={`${API_URL}/api/libros/portada/${libro.id}`}
                      alt={libro.titulo}
                      className="libro-image"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-book.png';
                      }}
                    />
                    <div className="libro-info">
                      <h3 className="libro-titulo">{libro.titulo}</h3>
                      <p className="libro-autor">{libro.autor}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />

        {/* Overlays */}
        {isLoadingDetalle && (
          <div className="loading-overlay">
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
      </div>
    );
  }

  // Vista principal: Grid de categorías
  const categoriasAgrupadas = agruparCategorias(categorias);

  return (
    <div className="categoria-container">
      <Header />
      <main className="categoria-main">
        <section className="categorias-hero">
          <h1 className="hero-titulo">Explora Nuestras Categorías</h1>
          <p className="hero-descripcion">
            Descubre nuestra colección organizada por géneros literarios
          </p>
        </section>

        <section className="categorias-grid-section">
          {categoriasAgrupadas.length === 0 ? (
            <div className="no-categories-message">
              <p>📂 No hay categorías disponibles en este momento.</p>
            </div>
          ) : (
            <div className="categorias-grid">
              {categoriasAgrupadas.map((categoria, index) => (
                <article
                  key={index}
                  className="categoria-card"
                  onClick={() => handleCategoriaClick(categoria.nombre)}
                >
                  <div className="categoria-icon">
                    {getCategoriaIcon(categoria.nombre)}
                  </div>
                  <h2 className="categoria-nombre">{categoria.nombre}</h2>
                  <div className="categoria-stats">
                    <span className="stats-numero">{categoria.total}</span>
                    <span className="stats-texto">
                      {categoria.total === 1 ? 'libro' : 'libros'}
                    </span>
                  </div>
                  <div className="categoria-hover-indicator">
                    Ver colección →
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Componente Header reutilizable
 * Mantiene coherencia visual con Menu.jsx
 */
const Header = () => {
  return (
    <header className="categoria-header">
      <div className="header-top-row">
        <div className="logo-container">
          <img src="/images/logo.png" alt="The Old Library Logo" className="logo" />
          <h1>The Old Library</h1>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar un libro..." 
            className="search-input"
          />
          <button className="search-button">
            <i className="search-icon">🔍</i>
          </button>
        </div>
      </div>
      <nav className="main-nav">
        <ul className="nav-links">
          <li><Link to="/MainLibrary" className="nav-link">Inicio</Link></li>
          <li><Link to="/categorias" className="nav-link active">Categorías</Link></li>
          <li><Link to="/menu" className="nav-link">Explorar</Link></li>
          <li><Link to="/favoritos" className="nav-link">Favoritos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

/**
 * Componente Footer reutilizable
 */
const Footer = () => {
  return (
    <footer className="categoria-footer">
      <div className="footer-content">
        <p>&copy; 2025 The Old Library. Todos los derechos reservados.</p>
        <div className="footer-links">
          <Link to="/privacidad" className="footer-link">Privacidad</Link>
          <Link to="/terminos" className="footer-link">Términos</Link>
        </div>
      </div>
    </footer>
  );
};

/**
 * Función auxiliar para asignar iconos según la categoría
 * Mejora la experiencia visual
 */
const getCategoriaIcon = (categoria) => {
  const iconMap = {
    'Terror': '👻',
    'Ciencia ficción': '🚀',
    'Novela gótica': '🏰',
    'Filosofía': '🤔',
    'Historia': '📜',
    'Poesía': '✍️',
    'Romance': '💕',
    'Aventura': '🗺️',
    'Misterio': '🔍',
    'Fantasía': '🐉',
    'Biografía': '👤',
    'Ensayo': '📝',
    'Drama': '🎭',
    'Comedia': '😄',
  };

  return iconMap[categoria] || '📚';
};

export default Categoria;
