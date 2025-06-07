  <h1>🎬 Seba's Movies Blog</h1>
  <p>Una aplicación web moderna y responsiva para el registro y gestión de películas, desarrollada con React.js.</p>

  <h2 class="emoji">📖 Acerca del Proyecto</h2>
  <p>
    Sebastián es un apasionado del cine que disfruta analizar películas y escribir reseñas para su blog personal. Sin embargo, con el paso del tiempo, se le ha hecho difícil recordar todas las películas que ha visto y las calificaciones que les ha dado. Por eso, ha decidido crear su propia base de datos en línea.
  </p>
  <p>
    En esta aplicación, podrá registrar películas con detalles como título, género, año de lanzamiento y una calificación personal. Esto le permitirá consultar rápidamente su historial cinematográfico, compartir sus recomendaciones con amigos. Para construir esta herramienta, Sebastián utilizará React.js para desarrollar un CRUD funcional, visualmente atractivo y completamente responsivo, que le ayude a mantener su pasión por el cine más organizada que nunca.
  </p>

  <h2 class="emoji">🚀 Cómo Ejecutar el Proyecto</h2>
  <h3>Prerrequisitos</h3>
  <ul>
    <li>Node.js (versión 14 o superior)</li>
    <li>npm o yarn</li>
  </ul>

  <h3>Pasos de Instalación</h3>
  <pre><code>git clone [URL_DEL_REPOSITORIO]</code></pre>
  <pre><code>cd [NOMBRE_DEL_REPOSITORIO]</code></pre>
  <pre><code>cd frontend</code></pre>
  <pre><code>npm install</code></pre>
  <pre><code>npm run dev</code></pre>
  <p>Abre tu navegador y visita el link que se proporciona en la terminal (generalmente <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>)</p>

  <h2 class="emoji">🛠️ Tecnologías Utilizadas</h2>
  <ul>
    <li><strong>React</strong> (^19.1.0) - Biblioteca principal para la interfaz de usuario</li>
    <li><strong>React DOM</strong> (^19.1.0) - Renderizado de componentes React</li>
    <li><strong>React Router DOM</strong> (^7.6.2) - Enrutamiento y navegación</li>
    <li><strong>React Hook Form</strong> (^7.57.0) - Manejo de formularios</li>
    <li><strong>React Hot Toast</strong> (^2.5.2) - Notificaciones y mensajes</li>
    <li><strong>Lucide React</strong> (^0.513.0) - Iconos modernos y personalizables</li>
  </ul>

  <h2 class="emoji">📁 Estructura del Proyecto</h2>
  <pre><code>
frontend/
├── node_modules/           
├── src/
│   ├── assets/
│   │   └── moviesLogo.png
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── MovieFormModal.jsx
│   │   ├── NotificationItem.jsx
│   │   └── WelcomeCard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useMovies.jsx
│   │   └── useNotifications.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Home.jsx
│   ├── utils/
│   │   └── ApiUrl.jsx
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
  </code></pre>

  <h2 class="emoji">🎯 Funcionalidades Principales</h2>
  <ul>
    <li>CRUD Completo: Crear, leer, actualizar y eliminar películas</li>
    <li>Interfaz Responsiva: Adaptable a diferentes dispositivos</li>
    <li>Gestión de Estado: Utilizando Context API de React</li>
    <li>Formularios Optimizados: Con validación usando React Hook Form</li>
    <li>Notificaciones: Sistema de alertas con React Hot Toast</li>
    <li>Navegación Fluida: Implementada con React Router DOM</li>
    <li>Diseño Moderno: Interfaz atractiva y fácil de usar</li>
  </ul>

  <h2 class="emoji">🔧 Mantenimiento y Desarrollo</h2>
  <h3>Comandos Útiles</h3>
  <pre><code># Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview

# Linting del código
npm run lint
  </code></pre>

  <h3>Estructura de Componentes</h3>
  <ul>
    <li><strong>MovieCard.jsx:</strong> Tarjeta individual para mostrar información de películas</li>
    <li><strong>MovieFormModal.jsx:</strong> Modal para agregar/editar películas</li>
    <li><strong>NotificationItem.jsx:</strong> Componente para mostrar notificaciones</li>
    <li><strong>WelcomeCard.jsx:</strong> Tarjeta de bienvenida en la página principal</li>
  </ul>

  <h3>Hooks Personalizados</h3>
  <ul>
    <li><strong>useMovies.jsx:</strong> Manejo del estado y operaciones CRUD de películas</li>
    <li><strong>useNotifications.jsx:</strong> Gestión de notificaciones y alertas</li>
  </ul>

  <h3>Páginas</h3>
  <ul>
    <li><strong>Home.jsx:</strong> Página de inicio con información del proyecto</li>
    <li><strong>Dashboard.jsx:</strong> Panel principal con la lista de películas y funcionalidades CRUD</li>
  </ul>
  </code></pre>

  <h2 class="emoji">💖 Contribución</h2>

  <p><strong>¡Disfruta organizando tu colección de películas! 🍿</strong></p>
