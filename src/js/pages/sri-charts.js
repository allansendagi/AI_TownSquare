// =============================================
// SRI DASHBOARD - Bar Chart Animations
// =============================================
(function () {
  var bars = document.querySelectorAll('.sri-bar-fill');
  if (!bars.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fills = entry.target.querySelectorAll('.sri-bar-fill');
          fills.forEach(function (fill) {
            fill.style.width = fill.dataset.width + '%';
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.sri-pillar').forEach(function (el) {
    observer.observe(el);
  });

  // Animate gauges
  var gauges = document.querySelectorAll('.sri-gauge-ring');
  if (gauges.length) {
    var gaugeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.setProperty('--score', entry.target.dataset.score);
          }
        });
      },
      { threshold: 0.5 }
    );
    gauges.forEach(function (g) { gaugeObserver.observe(g); });
  }
})();
