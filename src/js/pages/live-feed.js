// =============================================
// LIVE SYNTHESIS FEED
// Polls mock JSON to simulate real-time insight capture
// In production: polls /api/live-insights every 8 seconds
// State-aware: only active during live event
// =============================================
(function () {
  'use strict';

  var stream = document.getElementById('liveFeedStream');
  var toggle = document.getElementById('liveFeedToggle');
  if (!stream) return;

  var isPolling = false;
  var pollInterval = null;
  var shown = 0;

  // Toggle functionality
  if (toggle) {
    var toggleText = toggle.querySelector('.live-feed-toggle-text');

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse
        stream.style.maxHeight = stream.scrollHeight + 'px';
        // Force reflow
        stream.offsetHeight;
        stream.classList.add('collapsed');
        toggle.setAttribute('aria-expanded', 'false');
        if (toggleText) toggleText.textContent = 'Show Insights';
      } else {
        // Expand
        stream.classList.remove('collapsed');
        stream.style.maxHeight = stream.scrollHeight + 'px';
        toggle.setAttribute('aria-expanded', 'true');
        if (toggleText) toggleText.textContent = 'Hide Insights';

        // Remove max-height after transition
        setTimeout(function () {
          stream.style.maxHeight = '';
        }, 500);
      }
    });
  }

  var mockInsights = [
    { phase: 'Prime', text: 'The real question isn\u2019t job loss \u2014 it\u2019s whether institutions are ready to retrain at the speed AI deploys.', time: '0:03' },
    { phase: 'Complicate', text: 'Healthcare sees augmentation. Finance sees replacement. Same technology, opposite narratives.', time: '0:08' },
    { phase: 'Complicate', text: '\u201CReadiness\u201D means something different in Dubai than in Detroit. Context is everything.', time: '0:11' },
    { phase: 'Position', text: 'The host reframed: \u201CWhat if the gap isn\u2019t between humans and AI, but between institutions and citizens?\u201D', time: '0:15' },
    { phase: 'Breakout', text: 'Group 1 consensus: workforce policy is 10 years behind the technology curve.', time: '0:24' },
    { phase: 'Breakout', text: 'Education group argues AI literacy should be as foundational as reading and writing.', time: '0:29' },
    { phase: 'Shareback', text: 'Surprising convergence: both regulators and builders agree transparency is non-negotiable.', time: '0:38' },
    { phase: 'Synthesize', text: 'Three themes emerged: institutional speed, trust architecture, and citizen agency.', time: '0:48' }
  ];

  function renderInsight(insight) {
    var card = document.createElement('div');
    card.className = 'live-feed-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    card.innerHTML =
      '<div class="live-feed-card-header">' +
        '<span class="live-feed-card-phase">' + insight.phase + '</span>' +
        '<span class="live-feed-card-time">' + insight.time + '</span>' +
      '</div>' +
      '<p class="live-feed-card-text">' + insight.text + '</p>';

    stream.prepend(card);

    // Trigger animation
    requestAnimationFrame(function () {
      card.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  function startPolling() {
    if (isPolling) return;
    isPolling = true;

    // Show first 3 immediately
    for (var i = shown; i < Math.min(shown + 3, mockInsights.length); i++) {
      renderInsight(mockInsights[i]);
      shown++;
    }

    // Poll every 8 seconds for new insights
    pollInterval = setInterval(function () {
      if (shown >= mockInsights.length) {
        // In production, would continue polling API
        return;
      }
      renderInsight(mockInsights[shown]);
      shown++;
    }, 8000);
  }

  function stopPolling() {
    isPolling = false;
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  // Listen for event state changes
  document.addEventListener('eventStateChange', function(e) {
    var state = e.detail.state;

    if (state === 'live') {
      // Start live polling
      startPolling();
    } else if (state === 'post-event') {
      // Stop polling, show all insights
      stopPolling();
      while (shown < mockInsights.length) {
        renderInsight(mockInsights[shown]);
        shown++;
      }
    } else {
      // Pre-event: stop polling
      stopPolling();
    }
  });

  // Check current state on load
  if (window.EventState) {
    var currentState = window.EventState.getState();
    if (currentState === 'live') {
      startPolling();
    } else if (currentState === 'post-event') {
      // Show all insights immediately
      while (shown < mockInsights.length) {
        renderInsight(mockInsights[shown]);
        shown++;
      }
    }
  } else {
    // Fallback: start polling if no event state manager
    startPolling();
  }
})();
