# SuperHero W2M

Aplicación web desarrollada con Angular para visualizar un catálogo de héroes, filtrarlos por nombre y editar su información mediante un modal.
Desarrollada en la última versión Angular 21, utilizando TypeScript, SCSS y Angular Material para los componentes de UI.

## Descripción

SuperHero es una interfaz tipo CRUD orientada a la gestión de héroes.

Actualmente permite:

- Carga de héroes desde JSON.
- Render de tarjetas.
- Búsqueda por nombre.
- Añadir héroe.
- Eliminar héroe.
- Edición de héroe.
- Añadir mensajes de confirmación al añadir/editar/eliminar un héroe.
- Ajustes visuales desde SASS.

## Demo local

Una vez levantado el proyecto, la aplicación estará disponible en:

- http://localhost:4200/

## Tecnologías

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
> Cambiamos a json server para simular backend real y permitir persistencia de datos en las operaciones CRUD. Originalmente se cargaban los héroes desde un archivo JSON estático, pero con json server podemos realizar peticiones HTTP reales y mantener el estado de los datos entre sesiones.

- Con json server el código es más limpio y sencillo, ya que se pueden hacer peticiones HTTP reales (GET, POST, PUT, DELETE) a un endpoint local.
- El endpoint para acceder a los héroes es:

http://localhost:3000/allHeros

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

```bash
npm run server
```

También puedes usar Angular CLI directamente:

```bash
ng serve
```

> [!CAUTION]
> El comando `npm run server` levanta el servidor. Sin él, la web se quedará cargando con el loader hasta que dicho servidor inicie.

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
      - card/ (componente de tarjeta de héroe)
      - search/ (componente de barra de búsqueda)
      - banner/ (componente de banner superior)
      - footer/ (componente de pie de página)
      - modal/ (componente de modal para añadir/editar héroe)
    - services/
      - heros-json.service.ts (servicio para cargar héroes desde JSON)
    - pipes/
      - search.pipe.ts (pipe para filtrar héroes por nombre)
    - app.component.ts/html/scss (componente raíz)
  - assets/
    - json/
      - heros.json (archivo JSON con datos de héroes)
```

## Flujo funcional actual

1. El servicio HerosJson carga héroes desde src/assets/json/heros.json.
2. Se renderizan en tarjetas dentro del componente de cards.
3. La barra de búsqueda filtra por nombre sobre el estado actual.
4. El modal de edición actualiza el héroe seleccionado en memoria.

## Estado del proyecto

Funcionalidades implementadas:

- Carga de héroes desde JSON.
- Render de tarjetas.
- Búsqueda por nombre.
- Añadir héroe.
- Eliminar héroe.
- Edición de héroe.
- Añadir mensajes de confirmación al añadir/editar/eliminar un héroe.
- Ajustes visuales desde SASS.

## Build

Para generar la versión de producción:

```bash
npm run build
```

Los artefactos se generan en la carpeta dist/.

## Recursos útiles

> [!Tip]
> Adjuntamos recursos que pueden ser útiles para el desarrollo de la prueba técnica:

- [Diseño](https://www.figma.com/design/7SsAVf0GaxR4eUgY1A13A8/PRUEBA-T%C3%89CNICA-FRONT?node-id=34-7942&t=kPv8ReOgt8LDGPTB-0)
- [Angular CLI](https://angular.dev/tools/cli)
- [Documentación Angular](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [Angular Icons](https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/)
- [Json Server](https://www.npmjs.com/package/json-server)

---

### Cambios tras revisión:

Front:

Quitamos del package.json:

- Prettier
- "packageManager": "npm@11.9.0"

- heros.service: Quitamos `const heroIdentifier = oldHero.id ?? oldHero.nombre;`
  Y cambiamos por `const heroIdentifier = oldHero.id;`

Usamos `fontIcon="add"`, lo cual permite que podamos quitar el texto del botón y poner el icono directamente con fontIcon.

Añadimos ruta por proxy.config.js

Añadimos carpetas relativas con `@` para no tener que hacer `../../` en las importaciones.
Añadimos al tsconfig.json `"baseUrl": "./"` para disponer de rutas relativas desde la raíz del proyecto.

footer: añadimos bucle para renderizar los iconos de redes sociales, evitando así repetir código.

Quitamos reseteos innecesarios en el servicio de modal add, ya que al abrir el modal se resetea el formulario y al cerrarlo se resetea también, lo cual es redundante.

Maqueta:

---
