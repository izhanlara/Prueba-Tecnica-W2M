# SuperHero W2M

Aplicacion web desarrollada con Angular para visualizar un catalogo de heroes, filtrarlos por nombre y editar su informacion mediante un modal.

## Descripcion

SuperHero es una interfaz tipo CRUD (en progreso) orientada a la gestion de heroes.

Actualmente permite:

- Mostrar tarjetas de heroes desde un archivo JSON local.
- Buscar heroes por nombre.
- Editar datos de un heroe desde un modal.

## Demo local

Una vez levantado el proyecto, la aplicacion estara disponible en:

- http://localhost:4200/

## Tecnologias

- Angular 21
- TypeScript
- SCSS
- Angular Material (iconos y botones en la barra de busqueda)
- Vitest (testing)

## Requisitos previos

- Node.js 20 o superior recomendado
- npm 10 o superior

## Instalacion

```bash
npm install
```

## Ejecucion en desarrollo

```bash
npm start
```

Tambien puedes usar Angular CLI directamente:

```bash
ng serve
```

## Scripts disponibles

```bash
# Servidor de desarrollo
npm start

# Build de produccion
npm run build

# Build en modo watch (desarrollo)
npm run watch

# Tests unitarios
npm test
```

## Estructura principal

```text
src/
	app/
		components/
			hero-component/
			search-bar-component/
			card-component-hero/
			modal-components/
		pages/
			home-pages/
		services/
			core/
				heros.service.ts
	assets/
		json/
			heros.json
```

## Flujo funcional actual

1. El servicio HerosJson carga heroes desde src/assets/json/heros.json.
2. Se renderizan en tarjetas dentro del componente de cards.
3. La barra de busqueda filtra por nombre sobre el estado actual.
4. El modal de edicion actualiza el heroe seleccionado en memoria.

Nota: la edicion se aplica al estado en ejecucion (no persiste en el archivo JSON).

## Estado del proyecto

Funcionalidades implementadas:

- Carga de heroes desde JSON.
- Render de tarjetas.
- Busqueda por nombre.
- Edicion de heroe.

Pendiente / roadmap:

- Boton eliminar funcional.
- Boton para crear nuevo heroe.
- Ajustes visuales del banner/logo.
- Mejoras de UX en la busqueda (icono y comportamiento).

## Testing

Para ejecutar pruebas unitarias:

```bash
npm test
```

## Build

Para generar la version de produccion:

```bash
npm run build
```

Los artefactos se generan en la carpeta dist/.

## Recursos utiles

- Angular CLI: https://angular.dev/tools/cli
- Documentacion Angular: https://angular.dev/
