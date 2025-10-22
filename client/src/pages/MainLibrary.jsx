import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/mainLibrary.module.css";

const MainLibrary = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Redirige a la página de inicio de sesión
    };

    return (
        <div className={styles.mainlibContainer}>
        <div className={styles.background}></div>

        <header className={styles.mainlibHeader}>
            <div className={styles.logoContenedor}>
            <img
                src="/images/logo.png"
                alt="Logo"
                className={styles.logoImagen}
            />
            <h1 className={styles.logo}>The Old Library</h1>
            </div>

            <nav className={styles.mainlibNav}>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Colección</a></li>
                <li><a href="#">Actividades</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
            </nav>

            <button onClick={handleLogout} className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
            </button>
        </header>

        <main className={styles.contenido}>
            <section className={styles.bienvenida}>
            <h2>Bienvenido a The Old Library</h2>
            <p>
                Explora el conocimiento clásico, accede a nuestra colección y
                disfruta del placer de la lectura.
            </p>
            </section>

            <section className={styles.categorias}>
            <h3>Categorías destacadas</h3>
            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.lectura}`}>
                <i className="fas fa-book"></i>
                <span><a href="/menu">Lectura</a></span>
                </div>
            </div>
            </section>
        </main>

        <footer className={styles.footer}>
            <p className={styles.footerText}>
            © 2025 The Old Library |{" "}
            <a href="#" className={styles.footerLink}>
                Política de privacidad
            </a>
            </p>
        </footer>
        </div>
    );
    };

export default MainLibrary;