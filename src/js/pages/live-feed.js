// =============================================
// LIVE SYNTHESIS FEED
// Polls mock JSON to simulate real-time insight capture
// In production: polls Google Sheets CSV or WebSocket
// =============================================
(function () {
  var stream = document.getElementById('liveFeedStream');
  if (!stream) return;

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

  var shown = 0;

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

  // Show first 3 immediately
  for (var i = 0; i < Math.min(3, mockInsights.length); i++) {
    renderInsight(mockInsights[i]);
    shown++;
  }

  // Simulate live polling: add one every 8 seconds
  var interval = setInterval(function () {
    if (shown >= mockInsights.length) {
      clearInterval(interval);
      return;
    }
    renderInsight(mockInsights[shown]);
    shown++;
  }, 8000);
})();
