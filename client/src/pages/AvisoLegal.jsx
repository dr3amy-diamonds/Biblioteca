import React from "react";
import { Link } from "react-router-dom";
import "../styles/AvisoLegal.css";

function AvisoLegal() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-header__inner">
          <img src="/images/logo.png" alt="The Old Library" className="legal-header__logo" />
          <h1 className="legal-header__title">Aviso Legal y Políticas de Uso</h1>
          <p className="legal-header__subtitle">The Old Library — Biblioteca digital de obras de dominio público y libre distribución</p>
        </div>
      </header>

      <main className="legal-content">
        {/* Introducción */}
        <section className="legal-section" aria-labelledby="intro">
          <h2 id="intro">1. Introducción y misión</h2>
          <p>
            The Old Library es un proyecto educativo y cultural que ofrece acceso gratuito a libros, documentos y materiales
            de <strong>dominio público</strong> o provenientes de <strong>fuentes de libre distribución</strong>. Nuestra misión es facilitar el acceso al
            conocimiento, preservar obras de valor histórico y promover la lectura responsable, respetando la legalidad vigente
            y las buenas prácticas de atribución.
          </p>
          <p>
            Este sitio está desarrollado con tecnología React y funciona como una biblioteca digital sin fines comerciales.
            No vendemos contenidos, ni ofrecemos acceso a obras protegidas por derechos de autor sin la debida autorización.
          </p>
        </section>

        {/* Declaración dominio público */}
        <section className="legal-section" aria-labelledby="dominio-publico">
          <h2 id="dominio-publico">2. Obras ofrecidas: dominio público y libre distribución</h2>
          <p>
            El catálogo está compuesto por materiales identificados como <strong>dominio público</strong> o <strong>libre distribución</strong>, de conformidad con
            las legislaciones aplicables y/o las políticas de las fuentes desde las cuales se obtuvieron. Realizamos esfuerzos
            razonables para verificar el estado legal de cada obra; sin embargo, la naturaleza cambiante de las normativas y
            jurisdicciones puede implicar diferencias según el país del usuario.
          </p>
          <p>
            Si consideras que alguna obra incluida no cumple estas condiciones o vulnera derechos, te pedimos que nos lo
            notifiques inmediatamente a través de los canales de contacto indicados en esta página para revisar y, en su caso,
            retirar el contenido.
          </p>
        </section>

        {/* Imágenes de portada */}
        <section className="legal-section" aria-labelledby="portadas">
          <h2 id="portadas">3. Imágenes de portada: uso ilustrativo</h2>
          <p>
            Las imágenes de portada utilizadas en el sitio se han obtenido de fuentes de libre acceso y se emplean con fines
            <strong> estrictamente ilustrativos o decorativos</strong>. Estas imágenes no siempre corresponden a la edición exacta del libro
            que se ofrece para descarga, y pueden representar ediciones diferentes, versiones históricas o interpretaciones
            artísticas vinculadas a la obra.
          </p>
          <p>
            No se pretende confundir al usuario ni atribuir características específicas de la edición mostrada a la versión
            digital disponible. Cuando corresponde, se incluye información adicional sobre la edición o fuente digital.
          </p>
        </section>

        {/* Exención de responsabilidad */}
        <section className="legal-section" aria-labelledby="exencion">
          <h2 id="exencion">4. Exención de responsabilidad</h2>
          <p>
            The Old Library actúa como un <strong>intermediario</strong> que facilita el acceso a obras que, según la información disponible,
            son de dominio público o están autorizadas para distribución. No garantizamos de forma absoluta la exactitud,
            integridad o vigencia del estatus legal de cada obra en todas las jurisdicciones.
          </p>
          <p>
            En consecuencia, <strong>no asumimos responsabilidad</strong> por reclamaciones derivadas del uso, descarga o distribución
            de materiales por parte de los usuarios, especialmente cuando estos actos contravengan la normativa aplicable en su
            país. El uso del sitio implica que el usuario se compromete a verificar la legalidad del acceso y uso de las obras en
            su ubicación geográfica y a respetar cualquier restricción local.
          </p>
        </section>

        {/* Privacidad y cookies */}
        <section className="legal-section" aria-labelledby="privacidad">
          <h2 id="privacidad">5. Privacidad y uso de datos</h2>
          <p>
            Respetamos tu privacidad y aplicamos el principio de <strong>minimización de datos</strong>. El sitio <strong>no requiere</strong> el
            suministro de datos personales para la mera navegación o descarga de materiales en dominio público.
          </p>
          <ul className="legal-list">
            <li>
              <strong>Cuentas y autenticación:</strong> en caso de utilizar funciones de registro o acceso (si están habilitadas),
              se solicitará la información mínima necesaria (por ejemplo, nombre y correo electrónico) para fines de
              autenticación y administración. Estos datos serán tratados con medidas razonables de seguridad y no se
              compartirán con terceros con fines comerciales.
            </li>
            <li>
              <strong>Cookies y almacenamiento local:</strong> el sitio puede utilizar cookies técnicas y/o almacenamiento local
              del navegador para recordar preferencias, mantener sesiones o mejorar la experiencia de usuario. No se utilizan
              cookies de seguimiento con fines publicitarios.
            </li>
            <li>
              <strong>Registros técnicos:</strong> el servidor puede generar registros técnicos (logs) de acceso para garantizar la
              seguridad y el mantenimiento del servicio. Estos registros no se emplean para elaborar perfiles personales.
            </li>
          </ul>
          <p>
            Puedes solicitar la <strong>eliminación</strong> o <strong>actualización</strong> de tus datos de cuenta (si existiesen) mediante el canal de
            contacto indicado. Adoptamos medidas razonables para proteger la información, aunque ningún sistema es
            completamente invulnerable.
          </p>
        </section>

        {/* Referenciación de fuentes */}
        <section className="legal-section" aria-labelledby="referencias">
          <h2 id="referencias">6. Referenciación adecuada de fuentes y autores</h2>
          <p>
            Para promover buenas prácticas académicas y de preservación, recomendamos que los usuarios <strong>citen</strong> y <strong>referencien</strong>
            correctamente las versiones digitales y los recursos visuales utilizados:
          </p>
          <ul className="legal-list">
            <li>
              Al descargar una obra, indica el <strong>título</strong>, <strong>autor</strong> (si procede), <strong>fuente</strong> de la versión digital y, cuando sea
              posible, la <strong>fecha</strong> o <strong>edición</strong> de la copia consultada.
            </li>
            <li>
              Si utilizas una imagen de portada, cita su <strong>origen</strong> (repositorio, banco de imágenes o enlace) y, cuando
              corresponda, la <strong>licencia</strong> aplicable o la condición de <strong>dominio público</strong>.
            </li>
            <li>
              Evita atribuir características de una imagen decorativa a la copia digital ofrecida, salvo que se trate de la misma
              edición y exista certeza documental.
            </li>
          </ul>
        </section>

        {/* Contacto y actualización */}
        <section className="legal-section" aria-labelledby="contacto">
          <h2 id="contacto">7. Contacto legal y última actualización</h2>
          <p>
            Si detectas cualquier posible vulneración de derechos o deseas formular una petición de retirada, contáctanos en
            <a href="mailto:contacto@theoldlibrary.org" className="legal-link">contacto@theoldlibrary.org</a>. Revisaremos la solicitud y
            actuaremos con diligencia.
          </p>
          <p className="legal-update">Última actualización: 04 de noviembre de 2025</p>
        </section>

        {/* Navegación auxiliar */}
        <nav className="legal-nav">
          <Link to="/" className="legal-button">Volver al inicio</Link>
        </nav>
      </main>

      <footer className="legal-footer">
        <div className="legal-footer__inner">
          <p>© 2025 The Old Library. Todos los derechos reservados.</p>
          <div className="legal-footer__links">
            <Link to="/legal" className="legal-footer__link">Aviso Legal</Link>
            <Link to="/privacidad" className="legal-footer__link">Privacidad</Link>
            <Link to="/terminos" className="legal-footer__link">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AvisoLegal;