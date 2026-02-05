// =============================================
// ORBITAL SRI VISUALIZATION
// Replaces hexagonal radar with orbital satellite system
// Central planet (overall score) + 6 orbiting pillar satellites
// =============================================
(function () {
  var svg = document.getElementById('orbitalSriSvg');
  if (!svg) return;

  var detailPanel = document.getElementById('orbitalDetailPanel');
  var detailName = document.getElementById('orbitalDetailName');
  var detailAbbr = document.getElementById('orbitalDetailAbbr');
  var detailWeight = document.getElementById('orbitalDetailWeight');
  var detailDesc = document.getElementById('orbitalDetailDesc');
  var detailDubai = document.getElementById('orbitalDetailDubai');
  var detailGlobal = document.getElementById('orbitalDetailGlobal');
  var detailSubMetrics = document.getElementById('orbitalDetailSubMetrics');
  var centerValue = document.getElementById('orbitalCenterValue');

  var pillars = [
    { name: 'Governance', abbr: 'GOV', weight: 25, dubaiScore: 72, globalAvg: 45, color: '#2B7A78',
      description: 'Regulatory frameworks, policy readiness, and institutional capacity for AI oversight.',
      subMetrics: [{ label: 'Regulatory Frameworks', value: 78 }, { label: 'Policy Readiness', value: 68 }, { label: 'Institutional Capacity', value: 70 }] },
    { name: 'Citizen Empowerment', abbr: 'CIT', weight: 20, dubaiScore: 58, globalAvg: 38, color: '#3AAFA9',
      description: 'Public awareness, digital literacy, and citizen participation in AI governance.',
      subMetrics: [{ label: 'Public Awareness', value: 52 }, { label: 'Digital Literacy', value: 64 }, { label: 'Civic Participation', value: 55 }] },
    { name: 'Ethics', abbr: 'ETH', weight: 20, dubaiScore: 65, globalAvg: 42, color: '#D4A843',
      description: 'Ethical guidelines, bias mitigation, transparency, and accountability measures.',
      subMetrics: [{ label: 'Ethical Guidelines', value: 70 }, { label: 'Bias Mitigation', value: 58 }, { label: 'Transparency', value: 66 }] },
    { name: 'Economic Adaptability', abbr: 'ECO', weight: 15, dubaiScore: 70, globalAvg: 50, color: '#E07A5F',
      description: 'Workforce transition readiness, reskilling infrastructure, and economic resilience.',
      subMetrics: [{ label: 'Workforce Transition', value: 65 }, { label: 'Reskilling Programs', value: 72 }, { label: 'Economic Resilience', value: 74 }] },
    { name: 'Infrastructure', abbr: 'INF', weight: 10, dubaiScore: 82, globalAvg: 55, color: '#3B6FA0',
      description: 'Digital infrastructure, data governance, and technical capacity.',
      subMetrics: [{ label: 'Digital Infrastructure', value: 88 }, { label: 'Data Governance', value: 76 }, { label: 'Technical Capacity', value: 82 }] },
    { name: 'Foresight', abbr: 'FOR', weight: 10, dubaiScore: 60, globalAvg: 35, color: '#8B5CF6',
      description: 'Future-readiness planning, scenario analysis, and adaptive policy mechanisms.',
      subMetrics: [{ label: 'Future Planning', value: 62 }, { label: 'Scenario Analysis', value: 55 }, { label: 'Adaptive Policy', value: 63 }] }
  ];

  var cx = 350, cy = 350;
  var n = pillars.length;
  var orbitRadii = [145, 155, 165, 140, 160, 150];
  var orbitDurations = [60, 72, 84, 68, 76, 90];

  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  // Draw orbital paths (dashed circles)
  for (var i = 0; i < n; i++) {
    svg.appendChild(svgEl('circle', {
      cx: cx, cy: cy, r: orbitRadii[i],
      fill: 'none',
      stroke: 'rgba(26, 54, 93, 0.08)',
      'stroke-width': '1',
      'stroke-dasharray': '6,8',
      'class': 'orbital-path'
    }));
  }

  // Central planet with radial gradient
  var defs = svgEl('defs', {});
  var grad = svgEl('radialGradient', { id: 'planetGrad', cx: '40%', cy: '35%', r: '60%' });
  var stop1 = svgEl('stop', { offset: '0%', 'stop-color': '#3AAFA9' });
  var stop2 = svgEl('stop', { offset: '100%', 'stop-color': '#1A365D' });
  grad.appendChild(stop1);
  grad.appendChild(stop2);
  defs.appendChild(grad);

  // Drop shadow filter
  var filter = svgEl('filter', { id: 'planetShadow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
  var feGauss = svgEl('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: '8', result: 'blur' });
  var feOffset = svgEl('feOffset', { in: 'blur', dx: '0', dy: '4', result: 'shifted' });
  var feFlood = svgEl('feFlood', { 'flood-color': 'rgba(26,54,93,0.2)', result: 'color' });
  var feComp = svgEl('feComposite', { in: 'color', in2: 'shifted', operator: 'in', result: 'shadow' });
  var feMerge = svgEl('feMerge', {});
  feMerge.appendChild(svgEl('feMergeNode', { in: 'shadow' }));
  feMerge.appendChild(svgEl('feMergeNode', { in: 'SourceGraphic' }));
  filter.appendChild(feGauss);
  filter.appendChild(feOffset);
  filter.appendChild(feFlood);
  filter.appendChild(feComp);
  filter.appendChild(feMerge);
  defs.appendChild(filter);
  svg.appendChild(defs);

  // Central planet circle
  svg.appendChild(svgEl('circle', {
    cx: cx, cy: cy, r: 50,
    fill: 'url(#planetGrad)',
    filter: 'url(#planetShadow)',
    'class': 'orbital-planet'
  }));

  // Create satellite groups with orbital rotation
  var satellites = [];
  for (var i = 0; i < n; i++) {
    var p = pillars[i];
    var satRadius = 14 + (p.weight / 25) * 12;
    var startAngle = (360 / n) * i;

    // Orbital ring group — rotates around the center
    var ring = svgEl('g', {
      'class': 'orbital-ring',
      style: 'transform-origin: ' + cx + 'px ' + cy + 'px; animation: orbit ' + orbitDurations[i] + 's linear infinite; animation-delay: -' + (i * 5) + 's;',
      'data-index': i
    });

    // Dashed connection line from satellite to center
    var angle = (startAngle * Math.PI) / 180;
    var sx = cx + orbitRadii[i] * Math.cos(angle);
    var sy = cy + orbitRadii[i] * Math.sin(angle);

    ring.appendChild(svgEl('line', {
      x1: cx, y1: cy,
      x2: sx, y2: sy,
      stroke: 'rgba(26, 54, 93, 0.06)',
      'stroke-width': '1',
      'stroke-dasharray': '4,6'
    }));

    // Satellite circle
    var sat = svgEl('circle', {
      cx: sx, cy: sy, r: satRadius,
      fill: p.color,
      stroke: 'white',
      'stroke-width': '2.5',
      'class': 'orbital-satellite',
      cursor: 'pointer',
      'data-index': i
    });
    ring.appendChild(sat);

    // Score text inside satellite
    var scoreText = svgEl('text', {
      x: sx, y: sy + 1,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      fill: 'white',
      'font-family': 'var(--font-mono, monospace)',
      'font-size': '11',
      'font-weight': '700',
      'pointer-events': 'none'
    });
    scoreText.textContent = p.dubaiScore;
    ring.appendChild(scoreText);

    // Label below satellite
    var labelText = svgEl('text', {
      x: sx, y: sy + satRadius + 14,
      'text-anchor': 'middle',
      fill: 'var(--text-secondary, #4A5568)',
      'font-family': 'var(--font-sans, sans-serif)',
      'font-size': '10',
      'font-weight': '600',
      'pointer-events': 'none'
    });
    labelText.textContent = p.abbr;
    ring.appendChild(labelText);

    // Hit area for hover
    var hitArea = svgEl('circle', {
      cx: sx, cy: sy, r: satRadius + 10,
      fill: 'transparent',
      cursor: 'pointer',
      'data-index': i
    });
    hitArea.addEventListener('mouseenter', showDetail);
    hitArea.addEventListener('mouseleave', hideDetail);
    hitArea.addEventListener('click', toggleDetail);
    ring.appendChild(hitArea);

    svg.appendChild(ring);
    satellites.push({ ring: ring, sat: sat });
  }

  // Set center score
  if (centerValue) centerValue.textContent = '67';

  var activeIndex = -1;

  function showDetail(e) {
    var idx = parseInt(e.target.getAttribute('data-index'), 10);
    displayDetail(idx);
  }

  function hideDetail() {
    if (activeIndex === -1 && detailPanel) {
      detailPanel.classList.remove('visible');
    }
  }

  function toggleDetail(e) {
    var idx = parseInt(e.target.getAttribute('data-index'), 10);
    if (activeIndex === idx) {
      activeIndex = -1;
      detailPanel.classList.remove('visible');
    } else {
      activeIndex = idx;
      displayDetail(idx);
    }
  }

  function displayDetail(idx) {
    var p = pillars[idx];
    if (!detailPanel) return;

    detailName.textContent = p.name;
    detailAbbr.textContent = p.abbr;
    detailAbbr.style.background = p.color;
    detailWeight.textContent = p.weight + '% weight';
    detailDesc.textContent = p.description;
    detailDubai.textContent = p.dubaiScore;
    detailGlobal.textContent = p.globalAvg;

    // Render sub-metrics
    detailSubMetrics.innerHTML = '';
    p.subMetrics.forEach(function (sm) {
      var row = document.createElement('div');
      row.className = 'orbital-detail-sub-row';
      row.innerHTML =
        '<span class="orbital-detail-sub-label">' + sm.label + '</span>' +
        '<div class="orbital-detail-sub-bar-wrap">' +
          '<div class="orbital-detail-sub-bar" style="width: 0%; background: ' + p.color + ';" data-target="' + sm.value + '"></div>' +
        '</div>' +
        '<span class="orbital-detail-sub-value">' + sm.value + '</span>';
      detailSubMetrics.appendChild(row);
    });

    detailPanel.classList.add('visible');

    // Animate sub-metric bars
    requestAnimationFrame(function () {
      var bars = detailSubMetrics.querySelectorAll('.orbital-detail-sub-bar');
      for (var b = 0; b < bars.length; b++) {
        (function (bar) {
          requestAnimationFrame(function () {
            bar.style.width = bar.getAttribute('data-target') + '%';
          });
        })(bars[b]);
      }
    });
  }

  // Scroll-triggered entrance: satellites fly out from center
  var animated = false;
  function animateIn() {
    if (animated) return;
    animated = true;
    svg.classList.add('orbital-entered');
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
