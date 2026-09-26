# Portafolio

Sitio estático de Manuel Cardona. La página pública es [jmanuel2004.github.io](https://jmanuel2004.github.io/).

## Agregar un proyecto

Abre `projects.js` y copia un bloque dentro de `window.PROJECTS`. El orden del archivo es el orden en la página.

```js
{
  title: "Nombre del proyecto",
  year: "2026",
  kicker: "Pipeline de datos",
  summary: "Una frase de qué problema resuelve y cómo está armado.",
  flow: {
    entra: "Qué entra al pipeline.",
    transforma: "Qué decisión o proceso lo cambia.",
    sale: "Qué queda al final."
  },
  points: [
    "Una decisión concreta.",
    "Otra decisión concreta."
  ],
  tags: ["Python", "SQL"],
  repo: "https://github.com/JManuel2004/nombre-del-repo",
  demo: null
}
```

`flow` es el contrato corto de la ficha: entra, se transforma, sale. `demo` lleva la URL del sitio si existe. Si no hay sitio, déjalo en `null`. Con URL, la ficha marca el proyecto como en producción.

Después:

```bash
git add projects.js
git commit -m "Add a project to the portfolio"
git push
```

GitHub Pages publica `main` en unos minutos.

## Verlo en local

Abre `index.html` en el navegador, o desde esta carpeta:

```bash
python -m http.server 4173
```

Entra a `http://127.0.0.1:4173`.
