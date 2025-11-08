// Menu.jsx (Completo, con paginación Y CORRECCIÓN DE LAYOUT DEFINITIVA)
// Se añade 'useRef' para las correcciones de react-transition-group
import React, { useState, useEffect, useRef } from "react"; // <--- CORRECCIÓN
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "../styles/Menu.module.css";
import LibroDetalle from "./LibroDetalle"; // Asegúrate de que este componente exista

const API_URL = "http://localhost:3001";
const MAX_LIBROS_POR_PAGINA = 15;

const Menu = () => {
  const [libros, setLibros] = useState([]);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [isLoadingDetalle, setIsLoadingDetalle] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  
  // --- NUEVOS ESTADOS PARA LA BÚSQUEDA ---
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- REF PARA TRANSICIÓN DE "NO RESULTADOS" ---
  const noResultsRef = useRef(null); // <--- CORRECCIÓN
  

  // --- LÓGICA DE PAGINACIÓN ---
  const librosMostrar = isSearching ? searchResults : libros;
  const totalPaginas = Math.ceil(librosMostrar.length / MAX_LIBROS_POR_PAGINA);
  const indiceFinal = paginaActual * MAX_LIBROS_POR_PAGINA;
  const indiceInicial = indiceFinal - MAX_LIBROS_POR_PAGINA;
  const librosActuales = librosMostrar.slice(indiceInicial, indiceFinal);

  const handlePageChange = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    setPaginaActual(nuevaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };
  // --- FIN DE LA LÓGICA DE PAGINACIÓN ---


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

  // --- NUEVA LÓGICA DE BÚSQUEDA CON DEBOUNCE ---
  useEffect(() => {
    // Si no hay término de búsqueda, resetear
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setPaginaActual(1);
      return;
    }

    // Debounce: esperar 300ms después del último cambio
    const timeoutId = setTimeout(() => {
      const termLower = searchTerm.toLowerCase().trim();
      
      const resultados = libros.filter((libro) => {
        // Búsqueda insensible a mayúsculas/minúsculas
        const tituloMatch = libro.titulo.toLowerCase().includes(termLower);
        const autorMatch = libro.autor.toLowerCase().includes(termLower);
        
        return tituloMatch || autorMatch;
      });

      setSearchResults(resultados);
      setIsSearching(true);
      setPaginaActual(1); // Resetear a la primera página al buscar
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, libros]);

  // Función para limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setSearchResults([]);
    setPaginaActual(1);
  };

  return (
    <>
      <div className={styles['menu-container']}>
        
        <header className={styles['menu-header']}>
          {/* ... (tu header no cambia) ... */}
          <div className={styles['header-top-row']}>
            <div className={styles['logo-container']}>
              <img src="/images/logo.png" alt="The Old Library Logo" className={styles.logo} />
              <h1>The Old Library</h1>
            </div>
            <div className={styles['search-container']}>
              <input 
                type="text" 
                placeholder="Buscar un libro..." 
                className={styles['search-input']}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar libros por título o autor"
              />
              <button className={styles['search-button']}>
                <i className="fas fa-search search-icon"></i>
              </button>
            </div>
          </div>
          <nav className={styles['main-nav']}>
            <ul className={styles['nav-links']}>
              <li><Link to="/MainLibrary" className={styles['nav-link']}>Inicio</Link></li>
              <li><Link to="/menu" className={styles['nav-link']}>Catálogo</Link></li>
              <li><Link to="/categorias" className={styles['nav-link']}>Categorías</Link></li>
              <li><Link to="/recomendados" className={styles['nav-link']}>Recomendados</Link></li>
            </ul>
          </nav>
        </header>
        
        <section className={styles['books-section']}>
          <h2>Bienvenidos</h2>
          
          {/* Información de búsqueda */}
          {isSearching && (
            <div className={styles['search-info']}>
              <p>
                Resultados para: <strong>"{searchTerm}"</strong>
              </p>
              <p>
                {searchResults.length} {searchResults.length === 1 ? 'libro encontrado' : 'libros encontrados'}
              </p>
              <button onClick={handleClearSearch} className={styles['clear-search']}>
                ✕ Limpiar búsqueda
              </button>
            </div>
          )}

          {/* Grid de libros o mensaje de sin resultados */}
          {librosActuales.length === 0 && isSearching ? (
            <CSSTransition
              in={true}
              appear={true}
              timeout={300}
              classNames="fade"
              nodeRef={noResultsRef} // <--- CORRECCIÓN
            >
              <div className={styles['no-results']} ref={noResultsRef}> {/* <--- CORRECCIÓN */}
                <div className={styles['no-results-content']}>
                  <i className="fas fa-book no-results-icon"></i>
                  <h3>No hay resultados</h3>
                  <p>El libro que has buscado no está en nuestra colección</p>
                  <button onClick={handleClearSearch} className={styles['clear-search']}>
                    Volver a explorar
                  </button>
                </div>
              </div>
            </CSSTransition>
          ) : (
            <TransitionGroup className={styles['books-grid']}>
              {librosActuales.map(libro => {
                // --- CREAR REF PARA CADA ELEMENTO DEL MAP ---
                const nodeRef = React.createRef(null); // <--- CORRECCIÓN
                
                return (
                  <CSSTransition
                    key={libro.id}
                    timeout={300}
                    classNames="fade-item"
                    nodeRef={nodeRef} // <--- CORRECCIÓN
                  >
                    <button
                      ref={nodeRef} // <--- CORRECCIÓN
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
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          )}
          
          {libros.length === 0 && !isSearching && (
            <p className={styles['loading-message']}>Cargando libros o no hay ninguno disponible...</p>
          )}
        </section>


        {/* --- CONTROLES DE PAGINACIÓN (GENERADOS) --- */}
        {librosMostrar.length > MAX_LIBROS_POR_PAGINA && (
          <div className={styles.pagination}>
            <button
              className={styles.pageLink}
              onClick={() => handlePageChange(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              &laquo; Anterior
            </button>
            
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`${styles.pageLink} ${paginaActual === index + 1 ? styles.active : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={styles.pageLink}
              onClick={() => handlePageChange(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente &raquo;
            </button>
          </div>
        )}
        
        <footer className={styles.footer}>
          {/* ... (tu footer no cambia) ... */}
          <div className={styles['footer-content']}>
            <p>&copy; 2025 The Old Library. Todos los derechos reservados.</p>
            <div className={styles['footer-links']}>
                <Link to="/privacidad" className={styles['footer-link']}>Privacidad</Link>
                <Link to="/terminos" className={styles['footer-link']}>Términos</Link>
            </div>
          </div>
        </footer>
        
      </div>

      {/* Overlays */}
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