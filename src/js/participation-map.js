// =============================================
// PARTICIPATION MAP
// Shows animated viewer dots during live event
// Polls /api/live-viewers every 15 seconds
// =============================================
(function () {
  'use strict';

  var container = document.getElementById('viewerDots');
  var countEl = document.getElementById('viewerCount');
  if (!container) return;

  var isPolling = false;
  var pollInterval = null;
  var currentDots = [];

  // Mock viewer data - replace with real API in production
  var mockViewers = [
    { lat: 40.7128, lng: -74.0060, city: 'New York' },
    { lat: 51.5074, lng: -0.1278, city: 'London' },
    { lat: 35.6762, lng: 139.6503, city: 'Tokyo' },
    { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
    { lat: 52.5200, lng: 13.4050, city: 'Berlin' },
    { lat: 48.8566, lng: 2.3522, city: 'Paris' },
    { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    { lat: 1.3521, lng: 103.8198, city: 'Singapore' },
    { lat: -23.5505, lng: -46.6333, city: 'Sao Paulo' },
    { lat: 37.7749, lng: -122.4194, city: 'San Francisco' },
    { lat: 55.7558, lng: 37.6173, city: 'Moscow' },
    { lat: 31.2304, lng: 121.4737, city: 'Shanghai' },
    { lat: 43.6532, lng: -79.3832, city: 'Toronto' },
    { lat: -26.2041, lng: 28.0473, city: 'Johannesburg' },
    { lat: 22.3193, lng: 114.1694, city: 'Hong Kong' }
  ];

  // Convert lat/lng to percentage position on simplified map
  function coordToPercent(lat, lng) {
    // Simple equirectangular projection
    var x = ((lng + 180) / 360) * 100;
    var y = ((90 - lat) / 180) * 100;
    return { x: x, y: y };
  }

  // Create a viewer dot element
  function createDot(viewer, index) {
    var pos = coordToPercent(viewer.lat, viewer.lng);
    var dot = document.createElement('div');
    dot.className = 'viewer-dot';
    dot.style.left = pos.x + '%';
    dot.style.top = pos.y + '%';
    dot.style.animationDelay = (index * 0.15) + 's';
    dot.title = viewer.city;
    return dot;
  }

  // Update viewer count with animation
  function updateCount(count) {
    if (!countEl) return;

    var current = parseInt(countEl.textContent) || 0;
    if (current === count) return;

    // Animate count change
    var duration = 500;
    var start = performance.now();

    function animate(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = Math.round(current + (count - current) * eased);
      countEl.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // Fetch viewer data (mock for now)
  function fetchViewers() {
    // In production, this would be:
    // return fetch('/api/live-viewers').then(r => r.json());

    return new Promise(function(resolve) {
      // Simulate network delay
      setTimeout(function() {
        // Randomly select 8-15 viewers for variety
        var count = Math.floor(Math.random() * 8) + 8;
        var shuffled = mockViewers.slice().sort(function() { return 0.5 - Math.random(); });
        var viewers = shuffled.slice(0, count);

        // Add random viewer count variation
        var baseCount = 1247;
        var variation = Math.floor(Math.random() * 200) - 100;

        resolve({
          count: baseCount + variation,
          viewers: viewers
        });
      }, 100);
    });
  }

  // Render viewer dots
  function renderViewers(data) {
    // Clear existing dots (except Dubai marker)
    currentDots.forEach(function(dot) {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
    });
    currentDots = [];

    // Update count
    updateCount(data.count);

    // Create new dots with staggered animation
    data.viewers.forEach(function(viewer, index) {
      var dot = createDot(viewer, index);
      dot.style.opacity = '0';
      container.appendChild(dot);
      currentDots.push(dot);

      // Fade in with delay
      setTimeout(function() {
        dot.style.transition = 'opacity 0.5s ease-out';
        dot.style.opacity = '1';
      }, index * 100);
    });
  }

  // Start polling
  function startPolling() {
    if (isPolling) return;
    isPolling = true;

    // Initial fetch
    fetchViewers().then(renderViewers);

    // Poll every 15 seconds
    pollInterval = setInterval(function() {
      fetchViewers().then(renderViewers);
    }, 15000);
  }

  // Stop polling
  function stopPolling() {
    isPolling = false;
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  // Listen for event state changes
  document.addEventListener('eventStateChange', function(e) {
    if (e.detail.state === 'live') {
      startPolling();
    } else {
      stopPolling();
    }
  });

  // Check initial state
  if (window.EventState && window.EventState.isLive()) {
    startPolling();
  }
})();
