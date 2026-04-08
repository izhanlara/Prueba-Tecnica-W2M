# SuperHero W2M

Aplicación web desarrollada con Angular para gestionar un catálogo de héroes mediante una interfaz tipo CRUD. Permite consultar, buscar, añadir, editar y eliminar héroes con una experiencia visual basada en componentes reutilizables.

## Descripción

SuperHero W2M está orientada a la gestión de héroes con foco en:

- Arquitectura de componentes mantenible.
- Flujo CRUD completo.
- Integración con un backend simulado para persistencia local.
- Interfaz clara y responsive para facilitar la navegación.

## Funcionalidades

- Listado de héroes en tarjetas.
- Búsqueda por nombre en tiempo real.
- Alta de héroes mediante modal.
- Edición de héroes mediante modal.
- Eliminación de héroes con confirmación.
- Mensajes de confirmación en operaciones CRUD.
- Gestión de listas extensas con botón de mostrar más/menos.

## Stack técnico

- Angular 21
- TypeScript
- SCSS/SASS
- Angular Material
- Vitest para testing
- json-server para simular backend REST

## Requisitos previos

- Node.js 20 o superior (recomendado)
- npm 10 o superior

## API y endpoint

> [!NOTE]
> El proyecto utiliza json-server para simular un backend real y mantener persistencia de datos entre operaciones CRUD.

Endpoint principal:

- http://localhost:3000/allHeros

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

1. Inicia la aplicación Angular:

```bash
npm start
```

2. En otra terminal, inicia json-server:

```bash
npm run server
```

Alternativamente, puedes usar Angular CLI:

```bash
ng serve
```

Aplicación disponible en:

- http://localhost:4200/

> [!CAUTION]
> Si no ejecutas `npm run server`, la aplicación permanecerá en estado de carga (loader) al no encontrar el backend simulado.

## Scripts disponibles

```bash
# Servidor de desarrollo
npm start

# Backend simulado (json-server)
npm run server

# Build de producción
npm run build

# Build en modo watch
npm run watch

# Tests unitarios
npm test
```

## Estructura principal del proyecto

```
src/
  app/
    components/
      card/
      form/
      modal-dates/
      search-bar/
      layout/
    pages/
      page-home/
    sections/
      section-hero/
      section-footer/
      section-titles/
    services/
      core/
    pipes/
      search-bar-pipe/
  assets/
    json/
    img/
```

## Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/`.

## Recursos útiles

- [Angular CLI](https://angular.dev/tools/cli)
- [Documentación Angular](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [Listado de iconos Material](https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/)
- [json-server](https://www.npmjs.com/package/json-server)
