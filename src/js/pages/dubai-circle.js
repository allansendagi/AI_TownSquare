// =============================================
// CURATED CIRCLE — Positions 25 participant nodes
// in a circular arrangement using trigonometry
// =============================================
(function () {
  var ring = document.getElementById('curatedCircleRing');
  if (!ring) return;

  var participants = [
    { initials: 'OV', sector: 'Host', label: 'Facilitator' },
    { initials: 'MK', sector: 'Healthcare', label: 'Clinician' },
    { initials: 'RJ', sector: 'Finance', label: 'Risk Analyst' },
    { initials: 'SA', sector: 'Government', label: 'Policy Advisor' },
    { initials: 'LT', sector: 'Education', label: 'Dean' },
    { initials: 'NB', sector: 'Technology', label: 'AI Engineer' },
    { initials: 'FH', sector: 'Healthcare', label: 'Nurse Leader' },
    { initials: 'DW', sector: 'Citizen', label: 'Community Rep' },
    { initials: 'KA', sector: 'Finance', label: 'RegTech' },
    { initials: 'PL', sector: 'Government', label: 'Regulator' },
    { initials: 'YC', sector: 'Technology', label: 'Data Scientist' },
    { initials: 'AM', sector: 'Education', label: 'EdTech' },
    { initials: 'GR', sector: 'Healthcare', label: 'Bioethicist' },
    { initials: 'TN', sector: 'Citizen', label: 'Journalist' },
    { initials: 'BF', sector: 'Finance', label: 'Inclusion Lead' },
    { initials: 'HS', sector: 'Government', label: 'Urban Planner' },
    { initials: 'QD', sector: 'Technology', label: 'Product Lead' },
    { initials: 'WE', sector: 'Education', label: 'Researcher' },
    { initials: 'ZL', sector: 'Healthcare', label: 'Public Health' },
    { initials: 'CO', sector: 'Citizen', label: 'Activist' },
    { initials: 'IR', sector: 'Finance', label: 'Economist' },
    { initials: 'JV', sector: 'Government', label: 'Diplomat' },
    { initials: 'XP', sector: 'Technology', label: 'CTO' },
    { initials: 'EU', sector: 'Education', label: 'Student Rep' },
    { initials: 'MT', sector: 'Citizen', label: 'Entrepreneur' }
  ];

  var sectorColors = {
    Host: '#1A365D',
    Healthcare: '#2B7A78',
    Finance: '#D4A843',
    Government: '#3B6FA0',
    Education: '#E07A5F',
    Technology: '#3AAFA9',
    Citizen: '#8896AB'
  };

  var ringWidth = ring.offsetWidth;
  var ringHeight = ring.offsetHeight;
  var centerX = ringWidth / 2;
  var centerY = ringHeight / 2;

  // Node size (matches CSS)
  var nodeSize = 52;
  if (ringWidth <= 340) nodeSize = 40;
  if (ringWidth <= 280) nodeSize = 34;

  // Radius: half the ring minus half the node size, with some padding
  var radius = (Math.min(ringWidth, ringHeight) / 2) - (nodeSize / 2) - 4;

  var total = participants.length;
  var startAngle = -Math.PI / 2; // Start from top

  participants.forEach(function (p, i) {
    var angle = startAngle + (2 * Math.PI * i) / total;
    var x = centerX + radius * Math.cos(angle) - nodeSize / 2;
    var y = centerY + radius * Math.sin(angle) - nodeSize / 2;

    var node = document.createElement('div');
    node.className = 'curated-circle-node';
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.style.width = nodeSize + 'px';
    node.style.height = nodeSize + 'px';
    node.style.background = sectorColors[p.sector] || '#8896AB';
    node.textContent = p.initials;

    // Tooltip
    var tooltip = document.createElement('span');
    tooltip.className = 'curated-circle-node-tooltip';
    tooltip.textContent = p.label + ' \u00B7 ' + p.sector;
    node.appendChild(tooltip);

    // Staggered entrance
    node.style.opacity = '0';
    node.style.transform = 'scale(0)';
    setTimeout(function () {
      node.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      node.style.opacity = '1';
      node.style.transform = 'scale(1)';
    }, 100 + i * 60);

    ring.appendChild(node);
  });
})();
