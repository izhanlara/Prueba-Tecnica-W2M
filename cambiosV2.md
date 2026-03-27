Cambios añadidos

Front:

Quitamos del package.json:

- Prettier
- "packageManager": "npm@11.9.0"

- heros.service: Quitamos const heroIdentifier = oldHero.id ?? oldHero.nombre;
  Y cambiomos por const heroIdentifier = oldHero.id;

Usamos fontIcon="add", lo cual permite que podamos quitar el texto del boton y poner el icono direcamtnte con fontIcon.

Maqueta:
