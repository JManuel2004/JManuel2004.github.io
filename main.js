(function () {
  var list = document.getElementById("project-list");
  var projects = window.PROJECTS || [];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function flowCell(label, text) {
    if (!text) return "";
    return "<div><dt>" + escapeHtml(label) + "</dt><dd>" + escapeHtml(text) + "</dd></div>";
  }

  projects.forEach(function (project, index) {
    var article = document.createElement("article");
    article.className = "project";

    var number = String(index + 1).padStart(2, "0");
    var points = (project.points || [])
      .map(function (point) {
        return "<li>" + escapeHtml(point) + "</li>";
      })
      .join("");
    var tags = (project.tags || [])
      .map(function (tag) {
        return "<li>" + escapeHtml(tag) + "</li>";
      })
      .join("");

    var flow = project.flow || {};
    var flowHtml =
      flowCell("Entra", flow.entra) +
      flowCell("Se transforma", flow.transforma) +
      flowCell("Sale", flow.sale);
    if (flowHtml) flowHtml = '<dl class="flow">' + flowHtml + "</dl>";

    var status = project.demo ? '<span class="status">En producción</span>' : "";
    var links = '<a href="' + escapeHtml(project.repo) + '">Repositorio</a>';
    if (project.demo) {
      links += '<a class="live" href="' + escapeHtml(project.demo) + '">Sitio</a>';
    }

    article.innerHTML =
      '<p class="project-index">' + number + "</p>" +
      '<div class="project-body">' +
      '<p class="kicker"><span>' + escapeHtml(project.kicker) + " · " + escapeHtml(project.year) + "</span>" + status + "</p>" +
      "<h3>" + escapeHtml(project.title) + "</h3>" +
      '<p class="summary">' + escapeHtml(project.summary) + "</p>" +
      flowHtml +
      '<ul class="points">' + points + "</ul>" +
      '<ul class="tags">' + tags + "</ul>" +
      '<p class="links">' + links + "</p>" +
      "</div>";

    list.appendChild(article);
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll("nav a"));
  if (!("IntersectionObserver" in window)) return;

  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var on = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("is-current", on);
          if (on) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
