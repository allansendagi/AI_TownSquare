// =============================================
// DUBAI - Live Protocol Tracker
// Polls a public Google Sheets CSV during live events
// Before/after event: displays static historical data
// =============================================
(function () {
  var container = document.getElementById('trackerInsights');
  if (!container) return;

  // Placeholder: In production, this would poll a Google Sheets CSV URL
  // var SHEET_URL = 'https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv';
  // var POLL_INTERVAL = 30000; // 30 seconds

  // Static sample data for pre-event display
  var sampleInsights = [
    {
      phase: 'Prime',
      text: 'Opening question framed around workforce displacement narratives vs. augmentation realities.',
      themes: ['Workforce', 'Framing']
    },
    {
      phase: 'Complicate',
      text: 'Participants challenged the binary "replace vs. augment" framing. Healthcare and education sectors show fundamentally different dynamics.',
      themes: ['Healthcare', 'Education']
    },
    {
      phase: 'Breakout',
      text: 'Small groups identified institutional readiness as the missing variable in public discourse about AI and jobs.',
      themes: ['Governance', 'Readiness']
    }
  ];

  function renderInsights(insights) {
    container.innerHTML = '';
    insights.forEach(function (insight) {
      var card = document.createElement('div');
      card.className = 'tracker-insight-card';

      var phaseEl = document.createElement('div');
      phaseEl.className = 'tracker-insight-phase';
      phaseEl.textContent = 'Phase: ' + insight.phase;

      var textEl = document.createElement('p');
      textEl.className = 'tracker-insight-text';
      textEl.textContent = insight.text;

      var tagsEl = document.createElement('div');
      tagsEl.className = 'tracker-insight-tags';
      insight.themes.forEach(function (theme) {
        var tag = document.createElement('span');
        tag.className = 'tracker-tag';
        tag.textContent = theme;
        tagsEl.appendChild(tag);
      });

      card.appendChild(phaseEl);
      card.appendChild(textEl);
      card.appendChild(tagsEl);
      container.appendChild(card);
    });
  }

  renderInsights(sampleInsights);
})();
