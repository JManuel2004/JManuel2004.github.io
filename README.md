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
  points: [
    "Una decisión concreta.",
    "Otra decisión concreta."
  ],
  tags: ["Python", "SQL"],
  repo: "https://github.com/JManuel2004/nombre-del-repo",
  demo: null
}
```

`demo` lleva la URL del sitio si existe. Si no hay sitio, déjalo en `null`.

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
