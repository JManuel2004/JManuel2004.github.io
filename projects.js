// Cada objeto es un proyecto. Para agregar otro, copia un bloque,
// cambia los campos y vuelve a subir este archivo.
// demo puede quedar en null si todavía no hay un sitio público.
// Si demo tiene URL, la ficha marca el proyecto como en producción.
window.PROJECTS = [
  {
    title: "Clasificación de ingresos con Spark ML",
    year: "2026",
    kicker: "Pipeline de datos",
    summary:
      "Pipeline por lotes en PySpark que estima si un ingreso supera los 50 000. El esquema es explícito, el holdout ocurre antes de ajustar el modelo y los pesos de clase se calculan solo en el pliegue de entrenamiento.",
    flow: {
      entra: "Datos sintéticos de personas, con esquema explícito.",
      transforma: "Pipeline por lotes en PySpark. El holdout queda separado antes de ajustar el modelo.",
      sale: "Una estimación de si el ingreso supera los 50 000."
    },
    points: [
      "fnlwgt queda fuera del vector: es un peso muestral, no un atributo de la persona.",
      "La clase positiva es siempre >50K, aunque deje de ser la minoritaria.",
      "Los datos son sintéticos y la misma semilla regenera el archivo."
    ],
    tags: ["Python", "PySpark", "Spark ML"],
    repo: "https://github.com/JManuel2004/Clasificaci-n-de-Ingresos-con-Spark-ML",
    demo: null
  },
  {
    title: "ScoutBet",
    year: "2026",
    kicker: "Modelo estadístico",
    summary:
      "Motor para partidos del Mundial 2026. Combina Dixon-Coles, forma con decaimiento temporal y un prior bayesiano del ranking FIFA. El resultado sale del modelo, sin un modelo de lenguaje en el camino.",
    flow: {
      entra: "Partidos del Mundial 2026, forma reciente y el ranking FIFA.",
      transforma: "Dixon-Coles, decaimiento temporal y un prior bayesiano del ranking.",
      sale: "Probabilidades de marcador, calibradas con Brier Score."
    },
    points: [
      "Matriz de marcadores de Poisson y calibración con Brier Score.",
      "Fuentes en vivo con respaldo cuando una API no responde.",
      "FastAPI y SQLAlchemy detrás, React y Vite delante."
    ],
    tags: ["Python", "FastAPI", "React"],
    repo: "https://github.com/JManuel2004/Mundial-SIS",
    demo: null
  },
  {
    title: "Análisis transaccional de clientes",
    year: "2025",
    kicker: "Analítica",
    summary:
      "Pipeline sobre historial de compras: carga incremental con registro de corridas, segmentación y una recomendación a partir de los productos ya vistos.",
    flow: {
      entra: "Historial de compras, con carga incremental y registro de corridas.",
      transforma: "Segmentación con K-means sobre el comportamiento de compra.",
      sale: "Segmentos de clientes y una recomendación a partir de lo ya visto."
    },
    points: [
      "El procesamiento incremental evita rehacer toda la historia en cada corrida.",
      "La segmentación usa K-means sobre el comportamiento de compra.",
      "Cada etapa vive en su propio módulo."
    ],
    tags: ["Python", "PySpark", "SQL"],
    repo: "https://github.com/JManuel2004/transactional-customer-analysis",
    demo: null
  },
  {
    title: "Sistema de diagnóstico IRL",
    year: "2026",
    kicker: "Producto",
    summary:
      "Aplicación para leer la madurez de una iniciativa de innovación digital con el marco KTH IRL. La hice para INNLAB, en la Universidad Icesi.",
    flow: {
      entra: "48 afirmaciones en seis dimensiones del marco KTH IRL.",
      transforma: "Lectura de la madurez de una iniciativa de innovación digital.",
      sale: "Un perfil con cuellos de botella y desbalances entre dimensiones."
    },
    points: [
      "Un cuestionario de 48 afirmaciones en seis dimensiones.",
      "El perfil marca cuellos de botella y desbalances entre dimensiones.",
      "NestJS, React, PostgreSQL y contratos compartidos entre API y web."
    ],
    tags: ["TypeScript", "NestJS", "React", "PostgreSQL"],
    repo: "https://github.com/JManuel2004/sistema-diagnostico-irl",
    demo: "https://sistema-diagnostico-irl-api.vercel.app"
  }
];
