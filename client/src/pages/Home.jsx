
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { FaUserCircle } from 'react-icons/fa';
    import Accordion from '../components/Accordion'; 
    import '../styles/Home.css'; // Sigue importando sus estilos

    // (El contenido de accordionItems no cambia)
    const accordionItems = [
        {
            title: 'Colecciones',
            content: 'Explora nuestras colecciones curadas, desde manuscritos antiguos hasta bestsellers modernos. Cada colección está diseñada para guiarte a través de géneros y temas específicos.'
        },
        {
            title: 'Recomendados',
            content: 'Descubre lecturas recomendadas por nuestros bibliotecarios y la comunidad. Encuentra tu próxima gran aventura literaria aquí.'
        },
        {
            title: 'Sobre la Biblioteca',
            content: 'The Old Library es tu santuario digital para el conocimiento. Nuestra misión es preservar y compartir historias, ofreciendo un acceso fácil y abierto a una vasta colección de libros y documentos.'
        }
    ];

const Home = () => {
    return (
        // 1. El bloque .home se vuelve el contenedor principal
        <div className="home"> 
        
        <Link to="/LoginRegister" className="home__login-button">
            <FaUserCircle className="home__login-icon" />
            Iniciar Sesión
        </Link>

        {/* 2. Un "main" envuelve tu contenido central */}
        <main className="home__main-wrapper">
            <div className="home__content">
            <div className="home__welcome-text">
                <h1 className="home__title">Bienvenidos a The Old Library</h1>
                <p className="home__subtitle">Tu portal digital a un mundo de conocimiento y descubrimiento.</p>
            </div>
            <div className="home__accordion-section">
                {accordionItems.map((item, index) => (
                <Accordion key={index} title={item.title}>
                    {item.content}
                </Accordion>
                ))}
            </div>
            </div>
        </main>

        {/* 3. El footer va al final, fuera del "main" */}
        <footer className="home__footer">
            <p className="home__footer-text">
            © 2025 The Old Library. Todos los derechos reservados.
            </p>
        </footer>

        </div>
    );
};

    export default Home;