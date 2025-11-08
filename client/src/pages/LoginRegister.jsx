import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login_registro.css";

const LoginRegistro = () => {
    const [fullName, setFullName] = useState("");
    const [emailRegistro, setEmailRegistro] = useState("");
    const [passwordRegistro, setPasswordRegistro] = useState("");

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const navigate = useNavigate();

    // 👉 Aquí definimos la URL base del backend
    const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

    useEffect(() => {
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");

        signUpButton?.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        signInButton?.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        return () => {
            signUpButton?.removeEventListener("click", () => {});
            signInButton?.removeEventListener("click", () => {});
        };
    }, []);

    const handleLogin = async () => {
        if (!emailLogin || !passwordLogin) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await axios.post(`${API}/login`, {
                email: emailLogin,
                password: passwordLogin,
            });

            if (response.data.success) {
                try {
                    localStorage.setItem("currentUserEmail", String(emailLogin).trim().toLowerCase());
                } catch (e) {
                    console.warn("No se pudo guardar el usuario actual en localStorage", e);
                }
                navigate("/MainLibrary");
            } else {
                alert("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error en login:", error);
            alert("Hubo un problema al iniciar sesión.");
        }
    };

    const handleRegister = async () => {
        if (!fullName || !emailRegistro || !passwordRegistro) {
            alert("Por favor completa todos los campos del registro.");
            return;
        }

        try {
            const response = await axios.post(`${API}/register`, {
                full_name: fullName,
                email: emailRegistro,
                password: passwordRegistro,
            });

            if (response.data.success) {
                alert("✓ Usuario registrado con éxito");
                document.getElementById("signIn").click(); // vuelve al login
            } else {
                alert(response.data.message || "✗ El registro falló");
            }
        } catch (error) {
            console.error("Error en registro:", error);
            alert("✗ Falló el registro");
        }
    };

    return (
        <>
            <div className="login-page">
                <div id="container" className="Contenedor">
                    {/* Registro */}
                    <div className="form-container sign-up-container">
                        <h2 className="contenedor-registro__titulo">Crear una cuenta</h2>
                        <p className="contenedor-registro__parrafo">
                            Usa tu correo electrónico para registrarte
                        </p>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={emailRegistro}
                            onChange={(e) => setEmailRegistro(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={passwordRegistro}
                            onChange={(e) => setPasswordRegistro(e.target.value)}
                        />
                        <button
                            className="contenedor-registro__boton"
                            onClick={handleRegister}
                        >
                            Registrarse
                        </button>
                    </div>

                    {/* Inicio de sesión */}
                    <div className="form-container sign-in-container">
                        <h2 className="contenedor-inicio-sesion__titulo2">Inicio de Sesión</h2>
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={emailLogin}
                            onChange={(e) => setEmailLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={passwordLogin}
                            onChange={(e) => setPasswordLogin(e.target.value)}
                        />
                        <button
                            className="contenedor-inicio-sesion__boton2"
                            onClick={handleLogin}
                        >
                            Iniciar Sesión
                        </button>
                    </div>

                    {/* Paneles de overlay */}
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h2 className="contenedor-inicio-sesion__titulo">Bienvenido de nuevo</h2>
                                <p className="contenedor-inicio-sesion__parrafo">
                                    Para mantenerte conectado con nosotros, inicia sesión con tu información personal
                                </p>
                                <button className="contenedor-inicio-sesion__boton" id="signIn">
                                    Iniciar Sesión
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h2 className="contenedor-registro__titulo2">¡Hola, Amigo!</h2>
                                <p className="contenedor-registro__parrafo2">
                                    Introduce tus datos y comienza esta aventura con nosotros
                                </p>
                                <button className="contenedor-registro__boton2" id="signUp">
                                    ¡Regístrate!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="login-footer">
                <p className="login-footer__text">
                    © 2025 The Old Library |{" "}
                    <a href="/legal" className="login-footer__link">
                        Políticas de Privacidad y Legalidad
                    </a>
                </p>
            </footer>
        </>
    );
};

export default LoginRegistro;
