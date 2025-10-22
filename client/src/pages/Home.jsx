import React from "react";
import "../styles/index.css";
import Accordion from "../components/Accordion";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <header className="header">
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-item"><a href="#">Inicio</a></li>
                        <li className="header__nav-item"><a href="#">Catálogo</a></li>
                        <li className="header__nav-item"><a href="#">Servicios</a></li>
                        <li className="header__nav-item"><a href="#">Eventos</a></li>
                        <li className="header__nav-item">
                            <Link to="/LoginRegister" className="header__link">
                                <img className="header__icon" src="/images/avatar.png" alt="Login" />
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="header__contenedor">
                    <h1 className="header__title">The Old Library</h1>
                    <h3 className="header__subtitle">¡Bienvenido a The Old Library!</h3>
                    <button
                        className="header__button"
                        onClick={() =>
                            document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Explorar
                    </button>
                </div>
            </header>

            <section className="section section__about">
                <div className="accordion">
                    <Accordion title="Sobre Nosotros">
                        <p>The Old Library es un espacio dedicado a preservar el conocimiento clásico y fomentar la lectura en todas las edades.</p>
                    </Accordion>
                </div>
            </section>

            <section id="coleccion" className="section section__collection">
                <div className="accordion">
                    <Accordion title="Nuestra Colección">
                        <p>Literatura clásica, filosofía, historia, ciencia y cuentos infantiles. También tenemos una colección digital accesible.</p>
                    </Accordion>
                </div>
            </section>

            <section className="section section__testimonios">
                <div className="accordion">
                    <Accordion title="Lo que dicen nuestros visitantes">
                        <blockquote>
                            <p>“Un lugar mágico para los amantes de los libros.”</p>
                            <cite>– Clara M.</cite>
                        </blockquote>
                        <blockquote>
                            <p>“La colección digital me salvó durante mis estudios.”</p>
                            <cite>– Andrés L.</cite>
                        </blockquote>
                    </Accordion>
                </div>
            </section>

            <section className="section section__registro">
                <div className="accordion">
                    <Accordion title="¡Suscríbete al boletín!">
                        <form className="formulario-registro">
                            <input type="email" placeholder="Tu correo electrónico" required />
                            <button type="submit">Suscribirme</button>
                        </form>
                    </Accordion>
                </div>
            </section>

            <section className="section section__contact">
                <div className="accordion">
                    <Accordion title="Contáctanos">
                        <p>¿Tienes preguntas o sugerencias? Estamos dispuestos a ayudarte a encontrar tu próximo descubrimiento literario.</p>
                    </Accordion>
                </div>
            </section>

            <footer className="footer">
                <p className="footer__text">
                    © 2025 The Old Library | <a href="#" className="footer__link">Política de privacidad</a>
                </p>
            </footer>
        </div>
    );
};

export default Home;
