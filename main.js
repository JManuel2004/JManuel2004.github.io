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

    var links =
      '<a href="' + escapeHtml(project.repo) + '">Repositorio</a>';
    if (project.demo) {
      links += '<a href="' + escapeHtml(project.demo) + '">Sitio</a>';
    }

    article.innerHTML =
      '<p class="project-index">' + number + "</p>" +
      '<div class="project-body">' +
      '<p class="kicker">' + escapeHtml(project.kicker) + " · " + escapeHtml(project.year) + "</p>" +
      "<h3>" + escapeHtml(project.title) + "</h3>" +
      "<p>" + escapeHtml(project.summary) + "</p>" +
      "<ul class=\"points\">" + points + "</ul>" +
      "<ul class=\"tags\">" + tags + "</ul>" +
      '<p class="links">' + links + "</p>" +
      "</div>";

    list.appendChild(article);
  });
})();
