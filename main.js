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

  function outbound(href, label, className) {
    return (
      '<a class="' + className + '" href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(label) +
      "<span aria-hidden=\"true\">→</span></a>"
    );
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
    var links = outbound(project.repo, "Repositorio", "");
    if (project.demo) links += outbound(project.demo, "Sitio", "live");

    article.innerHTML =
      '<div class="project-body">' +
      '<p class="kicker"><span>' + number + " · " + escapeHtml(project.kicker) + " · " + escapeHtml(project.year) + "</span>" + status + "</p>" +
      "<h3><a href=\"" + escapeHtml(project.repo) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + escapeHtml(project.title) + "</a></h3>" +
      '<p class="summary">' + escapeHtml(project.summary) + "</p>" +
      flowHtml +
      '<ul class="points">' + points + "</ul>" +
      '<ul class="tags">' + tags + "</ul>" +
      '<p class="links">' + links + "</p>" +
      "</div>";

    list.appendChild(article);
  });

  var copyButton = document.getElementById("copy-mail");
  if (copyButton) {
    var address = "manuelcardona0206@gmail.com";
    copyButton.addEventListener("click", function () {
      function done() {
        copyButton.textContent = "Copiado";
        window.setTimeout(function () {
          copyButton.textContent = "Copiar";
        }, 1600);
      }
      function fallback() {
        var field = document.createElement("textarea");
        field.value = address;
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
        done();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done).catch(fallback);
        return;
      }
      fallback();
    });
  }

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
