// =============================================
// WALL OF AGENCY — MONOCHROME EDITION
// Hexagonal tessellation with hairline outlines
// No solid sector colors, bronze glow on hover
// =============================================
(function () {
  var grid = document.querySelector('.agency-grid');
  var svgOverlay = document.querySelector('.agency-connections-svg');
  var detailPanel = document.querySelector('.agency-detail');
  if (!grid || !svgOverlay) return;

  var participants = [
    { initials: 'OV', sector: 'Host', label: 'Facilitator', name: 'Olga V.' },
    { initials: 'MK', sector: 'Healthcare', label: 'Clinician', name: 'Dr. M. Khan' },
    { initials: 'FH', sector: 'Healthcare', label: 'Nurse Leader', name: 'F. Hadid' },
    { initials: 'GR', sector: 'Healthcare', label: 'Bioethicist', name: 'G. Reeves' },
    { initials: 'ZL', sector: 'Healthcare', label: 'Public Health', name: 'Z. Liang' },
    { initials: 'RJ', sector: 'Finance', label: 'Risk Analyst', name: 'R. Johal' },
    { initials: 'KA', sector: 'Finance', label: 'RegTech', name: 'K. Abbas' },
    { initials: 'BF', sector: 'Finance', label: 'Inclusion Lead', name: 'B. Farooq' },
    { initials: 'IR', sector: 'Finance', label: 'Economist', name: 'I. Rossi' },
    { initials: 'SA', sector: 'Government', label: 'Policy Advisor', name: 'S. Almari' },
    { initials: 'PL', sector: 'Government', label: 'Regulator', name: 'P. Larsen' },
    { initials: 'HS', sector: 'Government', label: 'Urban Planner', name: 'H. Singh' },
    { initials: 'JV', sector: 'Government', label: 'Diplomat', name: 'J. Vasquez' },
    { initials: 'LT', sector: 'Education', label: 'Dean', name: 'L. Torres' },
    { initials: 'AM', sector: 'Education', label: 'EdTech', name: 'A. Matsuda' },
    { initials: 'WE', sector: 'Education', label: 'Researcher', name: 'W. Ellis' },
    { initials: 'EU', sector: 'Education', label: 'Student Rep', name: 'E. Uche' },
    { initials: 'NB', sector: 'Technology', label: 'AI Engineer', name: 'N. Bakshi' },
    { initials: 'YC', sector: 'Technology', label: 'Data Scientist', name: 'Y. Chen' },
    { initials: 'QD', sector: 'Technology', label: 'Product Lead', name: 'Q. Diallo' },
    { initials: 'XP', sector: 'Technology', label: 'CTO', name: 'X. Petrov' },
    { initials: 'DW', sector: 'Citizen', label: 'Community Rep', name: 'D. Wangari' },
    { initials: 'TN', sector: 'Citizen', label: 'Journalist', name: 'T. Nguyen' },
    { initials: 'CO', sector: 'Citizen', label: 'Activist', name: 'C. Osei' },
    { initials: 'MT', sector: 'Citizen', label: 'Entrepreneur', name: 'M. Tadesse' }
  ];

  // Cross-sector connections: sector -> connected sectors
  var connections = {
    Healthcare: ['Government', 'Technology', 'Citizen'],
    Finance: ['Government', 'Technology', 'Education'],
    Government: ['Healthcare', 'Finance', 'Citizen', 'Education'],
    Education: ['Technology', 'Citizen', 'Government', 'Finance'],
    Technology: ['Healthcare', 'Finance', 'Education'],
    Citizen: ['Healthcare', 'Government', 'Education'],
    Host: ['Healthcare', 'Finance', 'Government', 'Education', 'Technology', 'Citizen']
  };

  // Sector cluster positions (center of each cluster, relative to container)
  // Container is 800x500
  var clusterCenters = {
    Host:       { x: 400, y: 250 },
    Healthcare: { x: 160, y: 130 },
    Finance:    { x: 640, y: 130 },
    Government: { x: 120, y: 330 },
    Education:  { x: 660, y: 330 },
    Technology: { x: 280, y: 420 },
    Citizen:    { x: 520, y: 420 }
  };

  var hexW = 64;
  var hexH = 72;
  // Honeycomb offsets for members within a cluster
  var honeycombOffsets = [
    { x: 0, y: 0 },
    { x: 56, y: 0 },
    { x: 28, y: -52 },
    { x: -28, y: -52 },
    { x: -56, y: 0 }
  ];

  var hexElements = [];
  var sectorHexMap = {};

  // Group participants by sector
  var bySector = {};
  participants.forEach(function (p) {
    if (!bySector[p.sector]) bySector[p.sector] = [];
    bySector[p.sector].push(p);
  });

  var idx = 0;
  Object.keys(bySector).forEach(function (sector) {
    sectorHexMap[sector] = [];
    var center = clusterCenters[sector];
    var members = bySector[sector];

    members.forEach(function (p, mi) {
      var offset = honeycombOffsets[mi % honeycombOffsets.length];
      var px = center.x + offset.x - hexW / 2;
      var py = center.y + offset.y - hexH / 2;

      var hex = document.createElement('div');
      hex.className = 'agency-hex';
      // Special class for host
      if (p.sector === 'Host') {
        hex.classList.add('agency-hex--host');
      }
      hex.style.left = px + 'px';
      hex.style.top = py + 'px';
      hex.style.width = hexW + 'px';
      hex.style.height = hexH + 'px';
      // No solid background color - hairline outline only (handled by CSS)
      hex.setAttribute('data-sector', p.sector);
      hex.setAttribute('data-index', idx);

      hex.innerHTML =
        '<span class="agency-hex-initials">' + p.initials + '</span>' +
        '<span class="agency-hex-label">' + p.label + '</span>';

      // Staggered entrance animation (opacity fade, slow-gate style)
      hex.style.opacity = '0';

      hex.addEventListener('mouseenter', onHexEnter);
      hex.addEventListener('mouseleave', onHexLeave);

      grid.appendChild(hex);
      hexElements.push({ el: hex, participant: p, cx: px + hexW / 2, cy: py + hexH / 2 });
      sectorHexMap[sector].push(hexElements.length - 1);

      // Animate entrance with stagger (slow-gate reveal)
      (function (hexEl, delay) {
        setTimeout(function () {
          hexEl.style.transition = 'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
          hexEl.style.opacity = '1';
        }, delay);
      })(hex, 300 + idx * 60);

      idx++;
    });
  });

  function onHexEnter(e) {
    var hexEl = e.currentTarget;
    var sector = hexEl.getAttribute('data-sector');
    var dataIdx = parseInt(hexEl.getAttribute('data-index'), 10);
    var p = hexElements[dataIdx].participant;

    grid.classList.add('has-hover');

    // Highlight connected sectors
    var connectedSectors = connections[sector] || [];
    var highlightedIndices = [];

    // Highlight own sector
    if (sectorHexMap[sector]) {
      sectorHexMap[sector].forEach(function (hi) { highlightedIndices.push(hi); });
    }
    // Highlight connected sectors
    connectedSectors.forEach(function (cs) {
      if (sectorHexMap[cs]) {
        sectorHexMap[cs].forEach(function (hi) { highlightedIndices.push(hi); });
      }
    });

    hexElements.forEach(function (h, i) {
      if (highlightedIndices.indexOf(i) !== -1) {
        h.el.classList.add('agency-hex--highlighted');
      } else {
        h.el.classList.remove('agency-hex--highlighted');
      }
    });

    // Draw connection lines (hairline style)
    drawConnections(dataIdx, connectedSectors);

    // Show detail tooltip
    if (detailPanel) {
      detailPanel.querySelector('.agency-detail-name').textContent = p.name;
      detailPanel.querySelector('.agency-detail-role').textContent = p.label + ' \u00B7 ' + p.sector;
      var connText = connectedSectors.length > 0 ? 'Connects to: ' + connectedSectors.join(', ') : '';
      detailPanel.querySelector('.agency-detail-connections').textContent = connText;
      detailPanel.classList.add('visible');

      // Position near hex
      var gridRect = grid.getBoundingClientRect();
      var hexRect = hexEl.getBoundingClientRect();
      detailPanel.style.left = (hexRect.left - gridRect.left + hexRect.width / 2) + 'px';
      detailPanel.style.top = (hexRect.top - gridRect.top - 10) + 'px';
    }
  }

  function onHexLeave() {
    grid.classList.remove('has-hover');
    hexElements.forEach(function (h) {
      h.el.classList.remove('agency-hex--highlighted');
    });
    clearConnections();
    if (detailPanel) detailPanel.classList.remove('visible');
  }

  function drawConnections(fromIdx, connectedSectors) {
    clearConnections();
    var from = hexElements[fromIdx];

    connectedSectors.forEach(function (cs) {
      if (!sectorHexMap[cs]) return;
      sectorHexMap[cs].forEach(function (toIdx) {
        var to = hexElements[toIdx];
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.cx);
        line.setAttribute('y1', from.cy);
        line.setAttribute('x2', to.cx);
        line.setAttribute('y2', to.cy);
        line.setAttribute('class', 'agency-connection-line visible');
        svgOverlay.appendChild(line);
      });
    });
  }

  function clearConnections() {
    while (svgOverlay.firstChild) {
      svgOverlay.removeChild(svgOverlay.firstChild);
    }
  }
})();
