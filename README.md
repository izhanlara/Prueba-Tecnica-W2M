# SuperHero W2M

Aplicacion web desarrollada con Angular para visualizar un catalogo de heroes, filtrarlos por nombre y editar su informacion mediante un modal.
Desarrollada en la ultima version Anuglar 21, utilizando TypeScript, SCSS y Angular Material para los componentes de UI.

## Descripcion

SuperHero es una interfaz tipo CRUD orientada a la gestion de heroes.

Actualmente permite:

- Carga de heroes desde JSON.
- Render de tarjetas.
- Busqueda por nombre.
- Añadir Heroe.
- Elimiar Heroe.
- Edicion de heroe.
- Añadir mensajes de confirmacion al añadir/editar/eliminar un heroe.
- Ajustes visuales desde SASS.

## Demo local

Una vez levantado el proyecto, la aplicacion estara disponible en:

- http://localhost:4200/

## Tecnologias

- Angular 21
- TypeScript
- SCSS
- Angular Material
- Vitest (testing)

## Requisitos previos

- Node.js 20 o superior recomendado
- npm 10 o superior

## EndPoint

> [!Note]
> Cambiamos a json server para simular backend real y permitir persistencia de datos en las operaciones CRUD. Originalmente se cargaban los heroes desde un archivo JSON estático, pero con json server podemos realizar peticiones HTTP reales y mantener el estado de los datos entre sesiones.

- Con json server el codigo es mas limpio y sencillo, ya que se pueden hacer peticiones HTTP reales (GET, POST, PUT, DELETE) a un endpoint local.
- El endpoint para acceder a los heroes es:

http://localhost:3000/allHeros

## Instalacion

```bash
npm install
```

## Ejecucion en desarrollo

```bash
npm start
```

```bash
npm run server
```

Tambien puedes usar Angular CLI directamente:

```bash
ng serve
```

> [!CAUTION]
> El comando `npm run server` levanta el servidor, sin el servidor la web se quedara cargando con el loader hasta que se levante dicho servidor.

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

## Estructura del proyecto

```
- src/
  - app/
    - components/
      - card/ (componente de tarjeta de heroe)
      - search/ (componente de barra de busqueda)
      - banner/ (componente de banner superior)
      - footer/ (componente de pie de pagina)
      - modal/ (componente de modal para añadir/editar heroe)
    - services/
      - heros-json.service.ts (servicio para cargar heroes desde JSON)
    - pipes/
      - search.pipe.ts (pipe para filtrar heroes por nombre)
    - app.component.ts/html/scss (componente raiz)
  - assets/
    - json/
      - heros.json (archivo JSON con datos de heroes)
```

## Flujo funcional actual

1. El servicio HerosJson carga heroes desde src/assets/json/heros.json.
2. Se renderizan en tarjetas dentro del componente de cards.
3. La barra de busqueda filtra por nombre sobre el estado actual.
4. El modal de edicion actualiza el heroe seleccionado en memoria.

## Estado del proyecto

Funcionalidades implementadas:

- Carga de heroes desde JSON.
- Render de tarjetas.
- Busqueda por nombre.
- Añadir Heroe.
- Elimiar Heroe.
- Edicion de heroe.
- Añadir mensajes de confirmacion al añadir/editar/eliminar un heroe.
- Ajustes visuales desde SASS.

## Build

Para generar la version de produccion:

```bash
npm run build
```

Los artefactos se generan en la carpeta dist/.

## Recursos utiles

> [!Tip]
> Adjuntamos recursos que pueden ser utiles para el desarrollo de la prueba tecnica:

- [Diseño](https://www.figma.com/design/7SsAVf0GaxR4eUgY1A13A8/PRUEBA-T%C3%89CNICA-FRONT?node-id=34-7942&t=kPv8ReOgt8LDGPTB-0)
- [Angular CLI](https://angular.dev/tools/cli)
- [Documentacion Angular](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [Anuglar Icons](https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/)
- [Json Server](https://www.npmjs.com/package/json-server)
