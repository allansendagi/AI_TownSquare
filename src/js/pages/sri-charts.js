// =============================================
// SRI DASHBOARD - Bar Chart Animations & City Selector
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

  // City Selector
  var cityTabs = document.querySelectorAll('.sri-city-tab');
  if (!cityTabs.length) return;

  // City data (embedded for simplicity - matches sri.json)
  var cityData = {
    dubai: {
      name: 'Dubai / UAE',
      overallScore: 67,
      pillars: [72, 58, 65, 70, 82, 60]
    },
    global: {
      name: 'Global Average',
      overallScore: 44,
      pillars: [45, 38, 42, 50, 55, 35]
    }
  };

  cityTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var city = tab.dataset.city;
      if (!city || !cityData[city]) return;

      // Update active state
      cityTabs.forEach(function (t) {
        t.classList.remove('sri-city-tab--active');
      });
      tab.classList.add('sri-city-tab--active');

      // Update gauges
      var dubaiGauge = document.querySelector('.sri-gauge-ring[data-score]');
      if (dubaiGauge) {
        var score = cityData[city].overallScore;
        dubaiGauge.dataset.score = score;
        dubaiGauge.style.setProperty('--score', score);

        // Update value display
        var valueEl = dubaiGauge.closest('.sri-gauge').querySelector('.sri-gauge-value');
        if (valueEl) {
          valueEl.textContent = score;
        }

        // Update region label
        var regionEl = dubaiGauge.closest('.reveal').querySelector('.sri-gauge-region');
        if (regionEl) {
          regionEl.textContent = cityData[city].name;
        }
      }

      // Update pillar bars
      var pillarBars = document.querySelectorAll('.sri-bar-fill--dubai');
      pillarBars.forEach(function (bar, index) {
        if (cityData[city].pillars[index] !== undefined) {
          var newWidth = cityData[city].pillars[index];
          bar.dataset.width = newWidth;
          bar.style.width = newWidth + '%';

          // Update value display
          var valueEl = bar.closest('.sri-bar-row').querySelector('.sri-bar-value');
          if (valueEl) {
            valueEl.textContent = newWidth;
          }
        }
      });
    });
  });
})();
