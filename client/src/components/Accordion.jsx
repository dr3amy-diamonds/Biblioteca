    // src/components/Accordion.jsx
    import React, { useState } from "react";
    import "./Accordion.css"; // <-- 1. Importa su propio CSS

    function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        // 2. Usa clases BEM y un modificador
        <div className={`accordion__item ${isOpen ? "accordion__item--active" : ""}`}>
        <h2 className="accordion__title" onClick={toggleAccordion}>
            {title}
            {/* Es buena idea añadir un ícono que también rote */}
            <span className="accordion__icon">+</span> 
        </h2>
        <div className="accordion__content">
            {/* 3. El contenido interno ahora es un div simple */}
            <div className="accordion__content-inner">
            {children}
            </div>
        </div>
        </div>
    );
    }

    export default Accordion;