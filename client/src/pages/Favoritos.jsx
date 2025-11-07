import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Favoritos.css';
import { loadFavorites, removeFavorite } from '../utils/favorites';
import LibroDetalle from './LibroDetalle';

const API_URL = "http://localhost:3001";

const FavoritosPage = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  useEffect(() => {
    setFavoritos(loadFavorites());
  }, []);

  const handleVerDetalles = async (id) => {
    try {
      setLoadingDetalle(true);
      const res = await fetch(`${API_URL}/api/libros/${id}`);
      const json = await res.json();
      if (json.success) {
        setSelectedLibro(json.data);
      } else {
        alert('No se pudo cargar el detalle del libro');
      }
    } catch (e) {
      alert('Error de red al cargar detalles');
    } finally {
      setLoadingDetalle(false);
    }
  };

  const handleCerrarModal = () => setSelectedLibro(null);

  const handleQuitarFavorito = (id) => {
    const updated = removeFavorite(id);
    setFavoritos(updated);
  };

  return (
    <div className="favoritos-container">
      <header className="favoritos-header">
        <div className="favoritos-header__inner">
          <h1 className="favoritos-title">Mis Favoritos</h1>
          <nav className="favoritos-nav">
            <Link to="/MainLibrary" className="favoritos-link">Inicio</Link>
            <Link to="/menu" className="favoritos-link">Explorar colección</Link>
          </nav>
        </div>
      </header>

      <main className="favoritos-main">
        {favoritos.length === 0 ? (
          <div className="favoritos-empty">
            <p>No tienes libros en favoritos todavía.</p>
            <Link to="/menu" className="favoritos-cta">Ir a Explorar</Link>
          </div>
        ) : (
          <section className="favoritos-grid">
            {favoritos.map((b) => (
              <article key={b.id} className="favorito-card">
                <img
                  src={`${API_URL}/api/libros/portada/${b.id}`}
                  alt={b.titulo}
                  className="favorito-cover"
                />
                <div className="favorito-info">
                  <h3 className="favorito-title">{b.titulo}</h3>
                  <p className="favorito-author">{b.autor || 'Autor desconocido'}</p>
                </div>
                <div className="favorito-actions">
                  <button className="favorito-btn" onClick={() => handleVerDetalles(b.id)}>
                    <i className="fas fa-eye"></i> Ver detalles
                  </button>
                  <button className="favorito-btn" onClick={() => handleQuitarFavorito(b.id)}>
                    <i className="fas fa-heart-broken"></i> Quitar
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {loadingDetalle && (
        <div className="favoritos-loading">Cargando detalles...</div>
      )}

      {selectedLibro && (
        <LibroDetalle libro={selectedLibro} onClose={handleCerrarModal} apiUrl={API_URL} />
      )}

      {/* Footer compacto */}
      <footer className="favoritos-footer">
        <p className="favoritos-footer__text">
          © 2025 The Old Library | <Link to="/legal" className="favoritos-footer__link">Políticas de Privacidad y Legalidad</Link>
        </p>
      </footer>
    </div>
  );
};

export default FavoritosPage;