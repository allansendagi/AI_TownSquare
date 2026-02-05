// =============================================
// PROTOCOL PHASE STATE MACHINE
// Interactive 7-phase click-through demo
// with crossfade transitions and auto-play
// =============================================
(function () {
  var section = document.querySelector('.phase-machine-section');
  if (!section) return;

  var navBtns = section.querySelectorAll('.phase-machine-nav-btn');
  var modes = section.querySelectorAll('.phase-mode');
  var progress = section.querySelector('.phase-machine-progress-fill');
  var prevBtn = section.querySelector('.phase-machine-prev');
  var nextBtn = section.querySelector('.phase-machine-next');
  var autoBtn = section.querySelector('.phase-machine-auto');

  var totalPhases = 7;
  var currentPhase = 1;
  var autoInterval = null;
  var autoPlaying = false;

  var phaseColors = [
    '#2B7A78', // Prime
    '#3B6FA0', // Complicate
    '#D4A843', // Position
    '#E07A5F', // Breakout
    '#3AAFA9', // Shareback
    '#1A365D', // Synthesize
    '#8B5CF6'  // Capture
  ];

  // Phase-specific content rendered on first visit
  var rendered = {};

  function goToPhase(n) {
    if (n < 1) n = 1;
    if (n > totalPhases) n = 1; // cycle

    currentPhase = n;

    // Update nav active state
    for (var i = 0; i < navBtns.length; i++) {
      navBtns[i].classList.toggle('active', i === n - 1);
      navBtns[i].style.borderBottomColor = (i === n - 1) ? phaseColors[i] : 'transparent';
    }

    // Crossfade modes
    for (var i = 0; i < modes.length; i++) {
      modes[i].classList.toggle('phase-mode--active', i === n - 1);
    }

    // Update progress bar
    var pct = (n / totalPhases) * 100;
    if (progress) progress.style.width = pct + '%';

    // Render phase-specific dynamic content
    renderPhaseContent(n);
  }

  function renderPhaseContent(n) {
    if (rendered[n]) return;
    rendered[n] = true;

    var mode = modes[n - 1];
    if (!mode) return;
    var target = mode.querySelector('.phase-mode-dynamic');
    if (!target) return;

    switch (n) {
      case 2: renderNuanceCards(target); break;
      case 4: renderBreakoutRooms(target); break;
      case 5: renderConsensusCards(target); break;
    }
  }

  function renderNuanceCards(container) {
    var nuances = [
      { title: 'The Replacement Myth', text: 'History shows technology restructures work rather than eliminating it. But the speed of AI is unprecedented.' },
      { title: 'The Geography Gap', text: 'Dubai\'s readiness score differs sharply from global averages. Local context shapes the answer fundamentally.' },
      { title: 'The Agency Question', text: 'The outcome depends less on AI capability and more on institutional speed of adaptation.' }
    ];
    nuances.forEach(function (item, i) {
      var card = document.createElement('div');
      card.className = 'phase-mode-nuance-card';
      card.style.animationDelay = (i * 0.12) + 's';
      card.innerHTML =
        '<h4 class="phase-mode-nuance-title">' + item.title + '</h4>' +
        '<p class="phase-mode-nuance-text">' + item.text + '</p>';
      container.appendChild(card);
    });
  }

  function renderBreakoutRooms(container) {
    var sectorColors = ['#2B7A78', '#D4A843', '#3B6FA0', '#E07A5F', '#3AAFA9'];
    var rooms = [
      { name: 'Room 1: Healthcare', focus: 'Clinical AI adoption timelines' },
      { name: 'Room 2: Finance', focus: 'Algorithmic risk and job displacement' },
      { name: 'Room 3: Government', focus: 'Policy speed vs. technology speed' },
      { name: 'Room 4: Education', focus: 'Reskilling infrastructure gaps' },
      { name: 'Room 5: Cross-Sector', focus: 'Citizen trust and transparency' }
    ];
    rooms.forEach(function (room, i) {
      var card = document.createElement('div');
      card.className = 'phase-mode-breakout-card';
      card.style.animationDelay = (i * 0.08) + 's';
      var dots = '';
      for (var d = 0; d < 5; d++) {
        dots += '<span class="phase-mode-member-dot" style="background: ' + sectorColors[(i + d) % sectorColors.length] + ';"></span>';
      }
      card.innerHTML =
        '<div class="phase-mode-breakout-name">' + room.name + '</div>' +
        '<div class="phase-mode-breakout-focus">' + room.focus + '</div>' +
        '<div class="phase-mode-member-dots">' + dots + '</div>';
      container.appendChild(card);
    });
  }

  function renderConsensusCards(container) {
    var insights = [
      { sector: 'Healthcare + Technology', text: 'AI augments clinical decisions but institutional inertia slows adoption by 5\u201310 years.' },
      { sector: 'Finance + Government', text: 'Regulatory sandboxes are the fastest path to responsible deployment at scale.' },
      { sector: 'Education + Citizen', text: 'AI literacy must be embedded in K\u201312 curricula within 3 years to maintain civic agency.' }
    ];
    insights.forEach(function (item, i) {
      var card = document.createElement('div');
      card.className = 'phase-mode-consensus-card';
      card.style.animationDelay = (i * 0.12) + 's';
      card.innerHTML =
        '<div class="phase-mode-consensus-sector">' + item.sector + '</div>' +
        '<p class="phase-mode-consensus-text">' + item.text + '</p>';
      container.appendChild(card);
    });
  }

  // Nav button clicks
  for (var i = 0; i < navBtns.length; i++) {
    (function (idx) {
      navBtns[idx].addEventListener('click', function () {
        goToPhase(idx + 1);
        stopAutoPlay();
      });
    })(i);
  }

  // Prev / Next
  if (prevBtn) prevBtn.addEventListener('click', function () {
    goToPhase(currentPhase - 1 < 1 ? totalPhases : currentPhase - 1);
    stopAutoPlay();
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    goToPhase(currentPhase + 1);
    stopAutoPlay();
  });

  // Auto-play
  function startAutoPlay() {
    autoPlaying = true;
    if (autoBtn) autoBtn.classList.add('active');
    autoInterval = setInterval(function () {
      goToPhase(currentPhase + 1);
    }, 5000);
  }

  function stopAutoPlay() {
    autoPlaying = false;
    if (autoBtn) autoBtn.classList.remove('active');
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }

  if (autoBtn) autoBtn.addEventListener('click', function () {
    if (autoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Initialize to phase 1
  goToPhase(1);
})();
