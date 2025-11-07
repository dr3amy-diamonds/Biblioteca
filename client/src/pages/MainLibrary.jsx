// src/components/MainLibrary.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";

// 1. Importamos los estilos como un objeto 'styles'
import styles from "../styles/MainLibrary.module.css"; 

const MainLibrary = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Redirige a la página de inicio
    };

    return (
        // 2. Usamos los estilos del módulo (styles.clase)
        <div className={styles.dashboard}>

        {/* --- HEADER --- */}
        <header className={styles.dashboard__header}>
            <div className={styles.dashboard__logoContainer}>
            <img
                src="/images/logo.png"
                alt="Logo"
                className={styles.dashboard__logoImg}
            />
            <h1 className={styles.dashboard__logoTitle}>The Old Library</h1>
            </div>

            <button onClick={handleLogout} className={styles.dashboard__logoutBtn}>
                <i className="fas fa-sign-out-alt"></i> Cerrar sesión
            </button>
        </header>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <main className={styles.dashboard__content}>
            <section className={styles.dashboard__welcome}>
            <h2>Bienvenido de vuelta</h2>
            <p>
                Tu portal al conocimiento te espera. ¿Qué te gustaría hacer hoy?
            </p>
            </section>

            <section className={styles.dashboard__gridContainer}>
            
            <Link to="/menu" className={styles.dashboardCard}>
                <i className="fas fa-book-open"></i>
                <h4 className={styles.dashboardCard__title}>Explorar Colección</h4>
                <p className={styles.dashboardCard__desc}>
                Accede a todos nuestros libros y manuscritos.
                </p>
            </Link>

            <Link to="/favoritos" className={styles.dashboardCard}>
                <i className="fas fa-star"></i>
                <h4 className={styles.dashboardCard__title}>Mis Favoritos</h4>
                <p className={styles.dashboardCard__desc}>
                Revisa los títulos que has guardado.
                </p>
            </Link>

            <Link to="/eventos" className={styles.dashboardCard}>
                <i className="fas fa-calendar-alt"></i>
                <h4 className={styles.dashboardCard__title}>Actividades</h4>
                <p className={styles.dashboardCard__desc}>
                Descubre nuestros próximos eventos y talleres.
                </p>
            </Link>

            </section>
        </main>

        {/* --- FOOTER --- */}
        <footer className={styles.dashboard__footer}>
            <p className={styles.dashboard__footerText}>
            © 2025 The Old Library |{" "}
            <a href="/legal" className={styles.dashboard__footerLink}>
                Políticas de Privacidad y Legalidad
            </a>
            </p>
        </footer>
        </div>
    );
};

export default MainLibrary;