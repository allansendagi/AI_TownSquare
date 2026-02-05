// =============================================
// SVG HEXAGONAL RADAR CHART — Dubai SRI
// Draws a 6-pillar radar on an SVG canvas
// with hover tooltips and scroll-triggered animation
// =============================================
(function () {
  var svg = document.getElementById('dubaiRadarChart');
  if (!svg) return;

  var tooltip = document.getElementById('radarTooltip');
  var tooltipTitle = document.getElementById('radarTooltipTitle');
  var tooltipDesc = document.getElementById('radarTooltipDesc');
  var wrap = svg.closest('.dubai-radar-wrap');

  // SRI data (inline to avoid async fetch)
  var pillars = [
    { name: 'Governance', weight: 25, dubaiScore: 72, globalAvg: 45, description: 'Regulatory frameworks, policy readiness, and institutional capacity for AI oversight.' },
    { name: 'Citizen\nEmpowerment', weight: 20, dubaiScore: 58, globalAvg: 38, description: 'Public awareness, digital literacy, and citizen participation in AI governance.' },
    { name: 'Ethics', weight: 20, dubaiScore: 65, globalAvg: 42, description: 'Ethical guidelines, bias mitigation, transparency, and accountability measures.' },
    { name: 'Economic\nAdaptability', weight: 15, dubaiScore: 70, globalAvg: 50, description: 'Workforce transition readiness, reskilling infrastructure, and economic resilience.' },
    { name: 'Infrastructure', weight: 10, dubaiScore: 82, globalAvg: 55, description: 'Digital infrastructure, data governance, and technical capacity.' },
    { name: 'Foresight', weight: 10, dubaiScore: 60, globalAvg: 35, description: 'Future-readiness planning, scenario analysis, and adaptive policy mechanisms.' }
  ];

  var cx = 250, cy = 250;
  var maxRadius = 180;
  var levels = 4; // concentric rings
  var n = pillars.length;

  // Helper: get point on radar at angle index and value (0-100)
  function getPoint(index, value) {
    var angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    var r = (value / 100) * maxRadius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  }

  // Helper: SVG element creation
  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
      el.setAttribute(k, attrs[k]);
    }
    return el;
  }

  // Draw concentric hexagonal grid lines
  for (var lvl = 1; lvl <= levels; lvl++) {
    var val = (lvl / levels) * 100;
    var points = [];
    for (var i = 0; i < n; i++) {
      var p = getPoint(i, val);
      points.push(p.x + ',' + p.y);
    }
    svg.appendChild(svgEl('polygon', {
      points: points.join(' '),
      fill: 'none',
      stroke: 'rgba(26,54,93,0.08)',
      'stroke-width': '1'
    }));
  }

  // Draw axis lines from center to each vertex
  for (var i = 0; i < n; i++) {
    var outer = getPoint(i, 100);
    svg.appendChild(svgEl('line', {
      x1: cx, y1: cy,
      x2: outer.x, y2: outer.y,
      stroke: 'rgba(26,54,93,0.06)',
      'stroke-width': '1'
    }));
  }

  // Global average polygon (rendered first, behind Dubai)
  var globalPoints = [];
  for (var i = 0; i < n; i++) {
    var p = getPoint(i, pillars[i].globalAvg);
    globalPoints.push(p.x + ',' + p.y);
  }
  var globalPoly = svgEl('polygon', {
    points: globalPoints.join(' '),
    fill: 'rgba(136,150,171,0.12)',
    stroke: '#8896AB',
    'stroke-width': '1.5',
    'stroke-dasharray': '6,4',
    'class': 'dubai-radar-polygon'
  });
  svg.appendChild(globalPoly);

  // Dubai score polygon — starts collapsed at center, animates out
  var dubaiStartPoints = [];
  var dubaiTargetPoints = [];
  for (var i = 0; i < n; i++) {
    dubaiStartPoints.push(cx + ',' + cy);
    var p = getPoint(i, pillars[i].dubaiScore);
    dubaiTargetPoints.push(p.x + ',' + p.y);
  }
  var dubaiPoly = svgEl('polygon', {
    points: dubaiStartPoints.join(' '),
    fill: 'rgba(43,122,120,0.15)',
    stroke: '#2B7A78',
    'stroke-width': '2.5',
    'class': 'dubai-radar-polygon'
  });
  svg.appendChild(dubaiPoly);

  // Score dots on Dubai polygon vertices
  var scoreDots = [];
  for (var i = 0; i < n; i++) {
    var dot = svgEl('circle', {
      cx: cx, cy: cy,
      r: '5',
      fill: '#2B7A78',
      stroke: 'white',
      'stroke-width': '2'
    });
    svg.appendChild(dot);
    scoreDots.push(dot);
  }

  // Labels + weights around the outside
  for (var i = 0; i < n; i++) {
    var labelPoint = getPoint(i, 115);
    var lines = pillars[i].name.split('\n');
    var anchor = 'middle';
    if (labelPoint.x < cx - 20) anchor = 'end';
    if (labelPoint.x > cx + 20) anchor = 'start';

    // Pillar name (may be multi-line)
    for (var li = 0; li < lines.length; li++) {
      var label = svgEl('text', {
        x: labelPoint.x,
        y: labelPoint.y + li * 15,
        'text-anchor': anchor,
        'class': 'dubai-radar-label',
        'data-pillar': i
      });
      label.textContent = lines[li];
      svg.appendChild(label);
    }

    // Weight annotation below label
    var weightY = labelPoint.y + lines.length * 15 + 2;
    var weight = svgEl('text', {
      x: labelPoint.x,
      y: weightY,
      'text-anchor': anchor,
      'class': 'dubai-radar-weight'
    });
    weight.textContent = pillars[i].weight + '% weight';
    svg.appendChild(weight);

    // Invisible hit area for hover
    var hitPoint = getPoint(i, 80);
    var hitArea = svgEl('circle', {
      cx: hitPoint.x, cy: hitPoint.y,
      r: '30',
      fill: 'transparent',
      cursor: 'pointer',
      'data-pillar': i
    });
    hitArea.addEventListener('mouseenter', showTooltip);
    hitArea.addEventListener('mouseleave', hideTooltip);
    svg.appendChild(hitArea);
  }

  function showTooltip(e) {
    var idx = parseInt(e.target.getAttribute('data-pillar'), 10);
    var pillar = pillars[idx];
    tooltipTitle.textContent = pillar.name.replace('\n', ' ') + ': ' + pillar.dubaiScore + '/100';
    tooltipDesc.textContent = pillar.description;

    // Position tooltip near the point
    var rect = wrap.getBoundingClientRect();
    var svgRect = svg.getBoundingClientRect();
    var pt = getPoint(idx, pillar.dubaiScore);
    var scaleX = svgRect.width / 500;
    var scaleY = svgRect.height / 500;
    var tooltipX = pt.x * scaleX + svgRect.left - rect.left;
    var tooltipY = pt.y * scaleY + svgRect.top - rect.top - 80;

    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  // Scroll-triggered animation
  var animated = false;
  function animateIn() {
    if (animated) return;
    animated = true;
    dubaiPoly.setAttribute('points', dubaiTargetPoints.join(' '));
    for (var i = 0; i < n; i++) {
      var target = getPoint(i, pillars[i].dubaiScore);
      scoreDots[i].setAttribute('cx', target.x);
      scoreDots[i].setAttribute('cy', target.y);
      scoreDots[i].style.transition = 'cx 0.8s cubic-bezier(0.4,0,0.2,1), cy 0.8s cubic-bezier(0.4,0,0.2,1)';
    }
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateIn();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(svg);
  } else {
    animateIn();
  }
})();
