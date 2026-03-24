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

## EndPoint local

> [!Note]
> Cambiamos a json server para simular backend real y permitir persistencia de datos en las operaciones CRUD.

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

````bash
npm run server
```

Tambien puedes usar Angular CLI directamente:

```bash
ng serve
````

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

## Flujo funcional actual

1. El servicio HerosJson carga heroes desde src/assets/json/heros.json.
2. Se renderizan en tarjetas dentro del componente de cards.
3. La barra de busqueda filtra por nombre sobre el estado actual (Hero signal).
4. El modal de edicion actualiza el heroe seleccionado en memoria.

Nota: la edicion se aplica al estado en ejecucion (no persiste en el archivo JSON).

### ⚠️ Problema conocido solventado: Búsquedas concatenadas

El filtro de búsqueda filtraba sobre `Hero()` en lugar de `allHeros()`, lo que causaba que cada búsqueda dependa del resultado anterior. Ejemplo:

- Buscas "bat" → resultado: Batman
- Buscas "super" → busca "super" dentro del resultado anterior (solo Batman), no en todos los héroes
- Solución: El método `filterHero()` debe filtrar sobre `allHeros()` y luego establecer el resultado en `Hero()`.

## Estado del proyecto

Funcionalidades implementadas:

- Carga de heroes desde JSON.
- Render de tarjetas.
- Busqueda por nombre.
- Edicion de heroe.

Pendiente / roadmap:

- Añadir mensajes de confirmacion al añadir/editar/eliminar un heroe.
- Ajustes visuales desde SASS.

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
