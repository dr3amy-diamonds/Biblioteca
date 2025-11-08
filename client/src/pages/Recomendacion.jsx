import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Recomendacion.module.css";
import LibroDetalle from "./LibroDetalle";

const API_URL = "http://localhost:3001";

const Recomendacion = () => {
  const [libroRecomendado, setLibroRecomendado] = useState(null);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [isLoadingDetalle, setIsLoadingDetalle] = useState(false);
  const [fechaRecomendacion, setFechaRecomendacion] = useState(null);

  // Libro seleccionado: Don Quijote de la Mancha (ID: 8)
  const LIBRO_RECOMENDADO_ID = 8;

  useEffect(() => {
    const fetchLibroRecomendado = async () => {
      try {
        const response = await fetch(`${API_URL}/api/libros/${LIBRO_RECOMENDADO_ID}`);
        const result = await response.json();
        if (result.success) {
          setLibroRecomendado(result.data);
          // Establecer fecha de recomendación (se actualizará semanalmente)
          setFechaRecomendacion(new Date().toLocaleDateString('es-ES'));
        } else {
          console.error("Error al cargar el libro recomendado:", result.message);
        }
      } catch (err) {
        console.error("Error de red al cargar libro recomendado:", err);
      }
    };
    fetchLibroRecomendado();
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

  const justificacionRecomendacion = {
    titulo: "Don Quijote de la Mancha",
    importanciaHistorica: "Publicada entre 1605 y 1615, esta obra maestra de Miguel de Cervantes marcó un hito en la literatura universal. Considerada la primera novela moderna, revolucionó el concepto de narrativa al introducir la figura del narrador omnisciente y explorar la psicología de los personajes de manera profunda. Su impacto en la literatura occidental fue tan significativo que se ha traducido a más de 50 idiomas y ha influido en generaciones de escritores.",
    
    valorLiterario: "La obra representa la cumbre de la literatura española y una de las más importantes de la literatura universal. Cervantes demuestra un dominio excepcional del lenguaje, combinando humor, ironía y profundidad filosófica. La estructura narrativa innovadora, con historias entrelazadas y metanarrativas, estableció las bases para la novela moderna. La relación entre Don Quijote y Sancho Panza se ha convertido en uno de los arquetipos literarios más estudiados y admirados.",
    
    resenasYOpiniones: "La crítica literaria ha sido unánime en su elogio durante más de cuatro siglos. Vladimir Nabokov la consideró 'la mejor novela jamás escrita', mientras que Carlos Fuentes la describió como 'el libro que inventó la libertad'. En las encuestas literarias contemporáneas, Don Quijote consistentemente ocupa los primeros lugares. Los lectores modernos la valoran por su relevancia universal sobre los ideales, la locura, la identidad y la naturaleza humana. Goodreads la califica con 4.0/5 estrellas basada en más de 100,000 reseñas."
  };

  if (!libroRecomendado) {
    return (
      <div className={styles['recomendacion-container']}>
        <div className={styles['loading-overlay']}>
          <p>Cargando recomendación...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles['recomendacion-container']}>
        <header className={styles['recomendacion-header']}>
          <div className={styles['header-top-row']}>
            <div className={styles['logo-container']}>
              <img src="/images/logo.png" alt="The Old Library Logo" className={styles.logo} />
              <h1>The Old Library</h1>
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

        <main className={styles['recomendacion-main']}>
          <section className={styles['recomendacion-hero']}>
            <h2 className={styles['recomendacion-titulo']}><i className="fas fa-book"></i> Recomendación de la Semana</h2>
            <p className={styles['recomendacion-fecha']}>Selección especial del {fechaRecomendacion}</p>
          </section>

          <section className={styles['libro-destacado']}>
            <div className={styles['libro-contenedor']}>
              <div className={styles['libro-imagen-contenedor']}>
                <img
                  src={`${API_URL}/api/libros/portada/${libroRecomendado.id}`}
                  alt={libroRecomendado.titulo}
                  className={styles['libro-imagen-destacada']}
                  onClick={() => handleBookClick(libroRecomendado.id)}
                />
                <button 
                  className={styles['ver-detalles-btn']}
                  onClick={() => handleBookClick(libroRecomendado.id)}
                >
                  Ver Detalles
                </button>
              </div>
              
              <div className={styles['libro-informacion']}>
                <h3 className={styles['libro-titulo-destacado']}>{libroRecomendado.titulo}</h3>
                <p className={styles['libro-autor-destacado']}>por {libroRecomendado.autor}</p>
                <p className={styles['libro-genero']}>Género: {libroRecomendado.genero}</p>
                <p className={styles['libro-anio']}>Año: {libroRecomendado.ano_publicacion}</p>
                
                <div className={styles['libro-descripcion']}>
                  <h4>Sinopsis</h4>
                  <p>{libroRecomendado.descripcion}</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles['justificacion-seccion']}>
            <h3 className={styles['justificacion-titulo']}>¿Por qué recomendamos este libro?</h3>
            
            <div className={styles['justificacion-grid']}>
              <div className={styles['justificacion-card']}>
                <div className={styles['justificacion-icono']}><i className="fas fa-university"></i></div>
                <h4>Importancia Histórica</h4>
                <p>{justificacionRecomendacion.importanciaHistorica}</p>
              </div>
              
              <div className={styles['justificacion-card']}>
                <div className={styles['justificacion-icono']}><i className="fas fa-pen"></i></div>
                <h4>Valor Literario</h4>
                <p>{justificacionRecomendacion.valorLiterario}</p>
              </div>
              
              <div className={styles['justificacion-card']}>
                <div className={styles['justificacion-icono']}><i className="fas fa-star"></i></div>
                <h4>Reseñas y Opiniones</h4>
                <p>{justificacionRecomendacion.resenasYOpiniones}</p>
              </div>
            </div>
          </section>

          <section className={styles['invitacion-lectura']}>
            <h3 className={styles['invitacion-titulo']}>¿Listo para esta aventura literaria?</h3>
            <p className={styles['invitacion-texto']}>
              Sumérgete en las páginas de esta obra maestra y descubre por qué ha cautivado a lectores 
              durante más de cuatro siglos. Una experiencia de lectura que enriquecerá tu perspectiva 
              literaria y cultural.
            </p>
            <div className={styles['invitacion-botones']}>
              <button 
                className={styles['btn-principal']}
                onClick={() => handleBookClick(libroRecomendado.id)}
              >
                Leer Ahora
              </button>
              <Link to="/menu" className={styles['btn-secundario']}>
                Explorar Más Libros
              </Link>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
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

export default Recomendacion;