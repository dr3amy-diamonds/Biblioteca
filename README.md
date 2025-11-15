# 📚 The Old Library

Una plataforma web educativa dedicada a preservar el conocimiento clásico y fomentar la lectura a través de una interfaz visual inspirada en bibliotecas antiguas.

## 🏗️ Tecnologías utilizadas

### Frontend
- ⚛️ React 19
- 🎨 CSS personalizado con temática clásica
- 📦 Vite 7
- 🔄 React Router DOM
- 🎭 React Transition Group (animaciones)
- 📝 Tipografías: Playfair Display + Cormorant Garamond

### Backend
- 🖥️ Node.js
- 🚂 Express 5
- 💾 SQLite3 (almacenamiento local)
- 🔐 bcrypt (encriptación de contraseñas)
- 📤 Multer (carga de archivos)

---

## 🚀 Funcionalidades

### Usuario
- ✅ Registro e inicio de sesión con validación
- 📚 Catálogo de libros con búsqueda en tiempo real
- 📖 Vista detallada de libros con modal
- ⭐ Sistema de favoritos
- 📄 Paginación de resultados
- 📱 Diseño completamente responsivo

### Administrador
- ➕ CRUD completo de libros
- 🖼️ Carga de portadas e archivos PDF/EPUB
- 📊 Panel de administración con tabla paginada
- 🏷️ Gestión de categorías y metadatos

---

## 📁 Estructura del proyecto

```
Biblioteca-main/
├── backend/
│   ├── server.js              # Servidor Express
│   ├── .env.example           # Variables de entorno (ejemplo)
│   ├── database.db            # Base de datos SQLite
│   ├── package.json
│   └── api/
│       ├── database.js        # Configuración de BD
│       └── routes.js          # Rutas API con validación
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example           # Variables de entorno (ejemplo)
│   ├── public/
│   │   └── images/            # Imágenes estáticas
│   └── src/
│       ├── main.jsx           # Punto de entrada
│       ├── App.jsx            # Rutas principales
│       ├── index.css          # Estilos globales
│       ├── config/
│       │   └── api.js         # Configuración API centralizada
│       ├── pages/             # Componentes de páginas
│       │   ├── Home.jsx
│       │   ├── LoginRegister.jsx
│       │   ├── MainLibrary.jsx
│       │   ├── Menu.jsx
│       │   ├── Panel.jsx
│       │   ├── Categoria.jsx
│       │   ├── Favoritos.jsx
│       │   └── ...
│       ├── components/        # Componentes reutilizables
│       │   ├── Accordion.jsx
│       │   └── LibroDetalle.jsx
│       ├── styles/            # Estilos modulares CSS
│       └── utils/             # Utilidades
└── README.md
```

---

## ⚙️ Instalación y configuración

### Requisitos previos
- Node.js (v16 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Biblioteca-main.git
cd Biblioteca-main
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
PORT=3001
NODE_ENV=development
DB_PATH=./database.db
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=50
```

Iniciar el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

### 3. Configurar el Frontend

```bash
cd ../client
npm install
```

Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

Editar `.env`:
```env
VITE_API_URL=http://localhost:3001
```

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🔧 Scripts disponibles

### Backend
- `npm start` - Iniciar servidor en modo producción

### Frontend
- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Ejecutar ESLint

---

## 🎨 Mejoras implementadas

### Backend
- ✅ Variables de entorno para configuración segura
- ✅ Validación de datos de entrada en todas las rutas
- ✅ Middleware centralizado de manejo de errores
- ✅ Configuración CORS específica y segura
- ✅ Validación de tipos de archivo (imágenes y documentos)
- ✅ Límites de tamaño de archivo configurables
- ✅ Mensajes de error descriptivos y consistentes

### Frontend
- ✅ Configuración centralizada de API
- ✅ Manejo robusto de errores con feedback visual
- ✅ Estados de carga (loading) con spinners
- ✅ Validación de formularios en tiempo real
- ✅ Mensajes de éxito y error animados
- ✅ Accesibilidad mejorada (ARIA labels, navegación por teclado)
- ✅ Optimización con hooks (useMemo, useCallback)
- ✅ Búsqueda con debounce para mejor rendimiento
- ✅ Soporte para Enter en formularios de login

### CSS
- ✅ Variables CSS globales para consistencia
- ✅ Sistema de diseño con espaciado y colores estandarizados
- ✅ Animaciones suaves y profesionales
- ✅ Soporte para prefers-reduced-motion (accesibilidad)
- ✅ Scrollbar personalizado
- ✅ Estados disabled en botones
- ✅ Diseño responsive mejorado

---

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt (10 rounds)
- Validación de entrada en cliente y servidor
- Sanitización de datos en queries SQL
- CORS configurado para orígenes específicos
- Validación de tipos MIME en archivos subidos
- Manejo seguro de errores sin exponer información sensible

---

## 📝 Notas de desarrollo

- Las portadas de los libros se almacenan como BLOB en la base de datos
- Los archivos PDF/EPUB también se guardan en la BD
- El sistema de favoritos usa localStorage del navegador
- La paginación es del lado del cliente para mejor experiencia

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de uso educativo.

---

## 👥 Autor

Desarrollado para el curso de Aspectos Legales - Séptimo Semestre

---

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.
