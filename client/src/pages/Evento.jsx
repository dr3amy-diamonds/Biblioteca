// src/pages/Evento.jsx
// Página de eventos de la biblioteca digital.
// Usa estados para los botones "Voy a ir" y "Estoy interesado".
// Importa estilos desde src/styles/Evento.css para mantener consistencia.

import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/Evento.css";

// Componente interno para una tarjeta de evento individual.
// Mantiene estados locales para "Voy a ir" y "Estoy interesado".
const EventoCard = ({ evento }) => {
  const [voyAIr, setVoyAIr] = useState(false);
  const [interesado, setInteresado] = useState(false);

  return (
    <div className="evento__container">
      <header className="evento__header">
        <h1 className="evento__title">{evento.titulo}</h1>
        <div className="evento__datetime">
          <span className="evento__date">{evento.fecha}</span>
          <span className="evento__time">{evento.hora}</span>
        </div>
      </header>

      <div className="evento__content">
        {/* Placeholder de imagen, puedes asignar un src más adelante */}
        <div className="evento__image-wrapper">
          <img className="evento__image" src={evento.imageUrl} alt="Imagen del evento" />
        </div>

        <div className="evento__details">
          <p className="evento__description">{evento.descripcion}</p>
          <p className="evento__location">
            <span className="evento__location-label">Ubicación:</span> {evento.ubicacion}
          </p>

          <div className="evento__actions">
            <button
              type="button"
              className={`evento__btn evento__btn--primary ${voyAIr ? "evento__btn--active" : ""}`}
              onClick={() => setVoyAIr((prev) => !prev)}
              aria-pressed={voyAIr}
            >
              {voyAIr ? <><i className="fas fa-check"></i> Voy a ir</> : "Voy a ir"}
            </button>

            <button
              type="button"
              className={`evento__btn evento__btn--secondary ${interesado ? "evento__btn--active" : ""}`}
              onClick={() => setInteresado((prev) => !prev)}
              aria-pressed={interesado}
            >
              {interesado ? "Interesado" : "Estoy interesado"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de eventos: renderiza una lista de varios eventos.
const Evento = () => {
  const eventos = [
    {
      titulo: "Club de Lectura: Realismo Mágico",
      descripcion:
        "Únete para discutir autores como Gabriel García Márquez, Laura Esquivel y más.",
      ubicacion: "Biblioteca Pública Piloto, Medellín, Colombia",
      fecha: "Sábado, 16 de noviembre",
      hora: "10:00 AM - 12:00 PM",
      imageUrl: "../../public/images/Lectura.jpg",
    },
    {
      titulo: "Presentación de libro: Historia de Bogotá",
      descripcion:
        "Conversatorio con el autor y firma de ejemplares. Cupos limitados.",
      ubicacion: "Biblioteca Luis Ángel Arango, Bogotá, Colombia",
      fecha: "Jueves, 21 de noviembre",
      hora: "6:30 PM - 8:00 PM",
      imageUrl: "../../public/images/libro.jpg",
    },
    {
      titulo: "Feria Literaria de Cali",
      descripcion:
        "Paneles, talleres y stands con editoriales locales. Entrada gratuita.",
      ubicacion: "Centro Cultural de Cali, Cali, Colombia",
      fecha: "Domingo, 24 de noviembre",
      hora: "9:00 AM - 5:00 PM",
      imageUrl: "../../public/images/Literaria.jpeg",
    },
    {
      titulo: "Encuentro de poesía Caribe",
      descripcion:
        "Lectura colectiva y micrófono abierto con poetas del Caribe.",
      ubicacion: "Biblioteca Piloto del Caribe, Barranquilla, Colombia",
      fecha: "Viernes, 29 de noviembre",
      hora: "7:00 PM - 9:00 PM",
      imageUrl: "../../public/images/Caribe.jpg",
    },
  ];

  return (
    <div className="evento">
      <div className="evento__header-bar">
        <a href="/MainLibrary" className="evento__back-button">
          ← Volver a la Biblioteca
        </a>
      </div>
      <TransitionGroup className="evento__list">
        {eventos.map((ev, idx) => (
          <CSSTransition
            key={idx}
            timeout={300}
            classNames="fade-item"
          >
            <EventoCard evento={ev} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <footer className="evento__footer">
        <div className="evento__footer-content">
          <p className="evento__footer-text">
            © 2025 The Old Library
          </p>
          <div className="evento__footer-links">
            <a href="/legal" className="evento__footer-link">
              Políticas de Privacidad
            </a>
            <a href="/legal" className="evento__footer-link">
              Legalidad
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Evento;