# rankkings-web
Frontend web oficial de RankKings.

## Estructura

- `index.html`: estructura semántica de la página y contenido inicial.
- `src/input.css`: tokens de marca, temas y estilos de componentes.
- `src/main.js`: punto de entrada; inicializa los módulos en orden.
- `src/modules/theme.js`: tema claro/oscuro y persistencia en `localStorage`.
- `src/modules/menus.js`: menús de secciones, filtros, creación y perfil.
- `src/modules/content-views.js`: pestañas Reels, Galería y Posteos.
- `src/modules/slider.js`: carrusel, indicadores y autoplay.
- `src/config/app-config.js`: configuración central del backend.
- `src/data/mock-data.js`: datos locales temporales con el mismo contrato del feed.
- `src/services/api-client.js`: cliente HTTP aislado y preparado para timeout.
- `src/services/app-services.js`: composición central de servicios de la aplicación.
- `src/repositories/content-repository.js`: repositorio que permite cambiar mock por API.
- `dist/output.css`: CSS generado, no editar manualmente.

## Desarrollo

1. Ejecuta `npm install` si aún no existen las dependencias.
2. Ejecuta `npm run build` después de modificar HTML, CSS o clases usadas por JavaScript.
3. Sirve la carpeta con un servidor local para probar los módulos ES, por ejemplo `python -m http.server 8000`.

## Cómo extenderlo

Para añadir una responsabilidad nueva, crea un módulo en `src/modules/`, exporta una función `init...` y llámala desde `src/main.js`. Conserva los IDs y atributos `data-*` del HTML cuando el módulo dependa de ellos; son el contrato entre la vista y la lógica.

## Integración futura con backend

La interfaz no llama a la API todavía. El flujo previsto es:

`componente UI -> repositorio -> cliente API -> backend`

Para conectar el feed, configura `apiBaseUrl` en `src/config/app-config.js` y crea el repositorio con `createContentRepository({ apiClient: createApiClient(), useRemote: true })`. El endpoint esperado para el contenido destacado es `GET /v1/content/featured`; su respuesta debe conservar los campos `id`, `type`, `title`, `category`, `imageUrl` y `href`.

El HTML utiliza `data-content-id` para identificar contenido por ID y no por posición. Así los componentes pueden migrar de datos locales a datos remotos sin rehacer la estructura de la página.