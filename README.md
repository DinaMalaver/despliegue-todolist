# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Despliegue 100% en Netlify

1. Verifica que el archivo `netlify.toml` existe en la raíz de `frontend`:
	```toml
	[build]
	  publish = "dist"
	  command = "npm run build"
	[[redirects]]
	  from = "/api/*"
	  to = "https://tu-backend-url.netlify.app/:splat"
	  status = 200
	```

2. El archivo `public/_redirects` debe contener:
	```
	/*    /index.html   200
	```

3. El archivo `vite.config.js` debe tener:
	```js
	export default defineConfig({
	  base: './',
	  plugins: [react()],
	})
	```

4. En `index.html`, los paths deben ser relativos:
	```html
	<link rel="icon" type="image/svg+xml" href="vite.svg" />
	<script type="module" src="src/main.jsx"></script>
	```

5. Scripts en `package.json`:
	```json
	"build": "vite build"
	```

6. Pasos para desplegar:
	- Sube el repo a GitHub.
	- En Netlify, selecciona "New site from Git" y conecta tu repo.
	- Build command: `npm run build`
	- Publish directory: `dist`

7. Para probar localmente:
	```powershell
	cd frontend
	npm install
	npm run build
	npm run preview
	```

8. Si usas rutas en React Router, la redirección SPA ya está lista.

9. Si tu backend está en otro dominio, ajusta el proxy en Vite o usa funciones serverless en Netlify.

**Despliegue en GitHub Pages**

- **Resumen**: Este repositorio ahora incluye un flujo de GitHub Actions que construye la carpeta `frontend` y publica `frontend/dist` en la rama `gh-pages`.
- **Configuración importante**: `vite.config.js` tiene `base` establecido en `/backend-todolist/` para servir correctamente los assets desde `https://<usuario>.github.io/backend-todolist/`.
- **Qué hace el workflow**: `.github/workflows/deploy-frontend-gh-pages.yml` se dispara en `push` sobre `main`, ejecuta `npm ci` y `npm run build` en `frontend`, y publica `frontend/dist` en la rama `gh-pages` con `peaceiris/actions-gh-pages`.
- **Acciones que debes realizar**:
	1. Asegúrate de subir (commit + push) los cambios al repositorio (`netlify.toml`, `_headers`, `_redirects`, `vite.config.js`, workflow).
	2. Espera a que el workflow termine (GitHub → Actions → Deploy Frontend to GitHub Pages).
	3. Abre la URL `https://LuyerPerez.github.io/backend-todolist/` (puede tardar unos minutos la primera vez).
- **Comandos locales**:
``powershell
cd frontend
npm install
npm run build
``
