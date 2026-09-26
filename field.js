(function () {
  var canvas = document.getElementById("field");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d", { alpha: true });
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = [];
  var links = [];
  var packets = [];
  var width = 0;
  var height = 0;
  var running = true;
  var last = 0;

  function build() {
    var gap = width < 720 ? 108 : 86;
    var cols = Math.ceil(width / gap) + 2;
    var rows = Math.ceil(height / gap) + 2;
    nodes = [];
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        nodes.push({
          x: col * gap + (row % 2) * gap * 0.45 - gap,
          y: row * gap * 0.86 - gap,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    links = [];
    var reach = gap * 1.35;
    var reach2 = reach * reach;
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy <= reach2) links.push([i, j]);
      }
    }

    packets = [];
    var count = Math.max(10, Math.min(26, Math.floor(links.length / 8)));
    for (var n = 0; n < count; n++) {
      var link = links[Math.floor(Math.random() * links.length)] || [0, 1];
      packets.push({
        a: link[0],
        b: link[1],
        t: Math.random(),
        speed: 0.00012 + Math.random() * 0.00016
      });
    }
  }

  function resize() {
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    build();
    if (reduce) draw(0, 0);
  }

  function point(node, time) {
    return {
      x: node.x + Math.sin(time * 0.00025 + node.phase) * 7,
      y: node.y + Math.cos(time * 0.00022 + node.phase) * 7
    };
  }

  function hop(packet) {
    var here = packet.b;
    var next = [];
    var i;
    for (i = 0; i < links.length; i++) {
      if (links[i][0] === here) next.push(links[i][1]);
      else if (links[i][1] === here) next.push(links[i][0]);
    }
    if (!next.length) {
      var link = links[Math.floor(Math.random() * links.length)] || [0, 1];
      packet.a = link[0];
      packet.b = link[1];
    } else {
      packet.a = here;
      packet.b = next[Math.floor(Math.random() * next.length)];
    }
    packet.t = 0;
  }

  function draw(time, dt) {
    var points = new Array(nodes.length);
    var i;
    ctx.clearRect(0, 0, width, height);

    for (i = 0; i < nodes.length; i++) points[i] = point(nodes[i], time);

    ctx.lineWidth = 1;
    for (i = 0; i < links.length; i++) {
      var link = links[i];
      var a = points[link[0]];
      var b = points[link[1]];
      ctx.strokeStyle = "rgba(159, 208, 198, 0.16)";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    for (i = 0; i < points.length; i++) {
      ctx.fillStyle = "rgba(244, 246, 244, 0.42)";
      ctx.fillRect(points[i].x - 1, points[i].y - 1, 2, 2);
    }

    if (reduce) return;

    for (i = 0; i < packets.length; i++) {
      var packet = packets[i];
      packet.t += packet.speed * dt;
      if (packet.t >= 1) hop(packet);
      var from = points[packet.a];
      var to = points[packet.b];
      if (!from || !to) continue;
      var x = from.x + (to.x - from.x) * packet.t;
      var y = from.y + (to.y - from.y) * packet.t;
      ctx.fillStyle = "rgba(14, 110, 98, 0.35)";
      ctx.fillRect(x - 3.5, y - 3.5, 7, 7);
      ctx.fillStyle = "#e7f6f2";
      ctx.fillRect(x - 1.4, y - 1.4, 2.8, 2.8);
    }
  }

  function loop(now) {
    if (!running) return;
    var dt = last ? Math.min(34, now - last) : 16;
    last = now;
    draw(now, dt);
    if (!reduce) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running && !reduce) {
      last = 0;
      requestAnimationFrame(loop);
    }
  });

  resize();
  requestAnimationFrame(loop);
})();
