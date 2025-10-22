// src/components/Accordion.jsx
import React, { useState } from "react";
import "../styles/index.css"; // Asegúrate de tener estilos importados si los necesitas

function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`accordion__item ${isOpen ? "active" : ""}`}>
        <h2 className="accordion__title" onClick={toggleAccordion}>
            {title}
        </h2>
        <div
            className="accordion__content"
            style={{
            maxHeight: isOpen ? "500px" : "0",
            padding: isOpen ? "1rem" : "0 1rem",
            }}
        >
            {children}
        </div>
        </div>
    );
    }

export default Accordion;
