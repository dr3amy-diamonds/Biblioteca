import React from "react";
import '../styles/Menu.css';
import { Link } from "react-router-dom";

const Menu = () => {
  // Datos de ejemplo para los libros
  const libros = [
    { id: 1, titulo: "A buen fin no hay mal principio", autor: "William Shakespeare", imagen: "/images/libro1.jpg" },
    { id: 2, titulo: "A buen fin no hay mal principio", autor: "Liam Thorneberry", imagen: "/images/libro2.jpg" },
    { id: 3, titulo: "A la conquista de un imperio", autor: "William Shakespeare", imagen: "/images/libro3.jpg" },
    { id: 4, titulo: "A la conquista de un imperio", autor: "Emilio Salgari", imagen: "/images/libro4.jpg" },
    { id: 5, titulo: "A buen fin no hay mal principio", autor: "William Shakespeare", imagen: "/images/libro1.jpg" },
    { id: 6, titulo: "A buen fin no hay mal principio", autor: "Liam Thorneberry", imagen: "/images/libro2.jpg" },
    { id: 7, titulo: "A la conquista de un imperio", autor: "William Shakespeare", imagen: "/images/libro3.jpg" },
    { id: 8, titulo: "A la conquista de un imperio", autor: "Emilio Salgari", imagen: "/images/libro4.jpg" },
    { id: 9, titulo: "A buen fin no hay mal principio", autor: "William Shakespeare", imagen: "/images/libro1.jpg" },
    { id: 10, titulo: "A buen fin no hay mal principio", autor: "Liam Thorneberry", imagen: "/images/libro2.jpg" },
    { id: 11, titulo: "A la conquista de un imperio", autor: "William Shakespeare", imagen: "/images/libro3.jpg" },
    { id: 12, titulo: "A la conquista de un imperio", autor: "Emilio Salgari", imagen: "/images/libro4.jpg" },
    { id: 13, titulo: "A buen fin no hay mal principio", autor: "William Shakespeare", imagen: "/images/libro1.jpg" },
    { id: 14, titulo: "A buen fin no hay mal principio", autor: "Liam Thorneberry", imagen: "/images/libro2.jpg" },
    { id: 15, titulo: "A la conquista de un imperio", autor: "William Shakespeare", imagen: "/images/libro3.jpg" }
  ];

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
      
      <div className="pagination">
        <a href="#" className="page-link active">1</a>
        <a href="#" className="page-link">2</a>
        <a href="#" className="page-link">3</a>
      </div>
      
      <section className="books-section">
        <h2>LIBROS POR NÚMERO DE PÁGINA</h2>
        <div className="books-grid">
          {libros.map(libro => (
            <div key={libro.id} className="book-card">
              <img src={libro.imagen} alt={libro.titulo} className="book-image" />
              <div className="book-info">
                <h3 className="book-title">{libro.titulo}</h3>
                <p className="book-author">{libro.autor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
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
    </div>
  );
};

export default Menu;
