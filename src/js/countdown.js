// =============================================
// COUNTDOWN TIMER
// =============================================
(function () {
  var target = new Date('2026-04-15T18:00:00+04:00').getTime();
  var els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-min'),
    s: document.getElementById('cd-sec')
  };

  if (!els.d) return;

  function update() {
    var diff = target - Date.now();
    if (diff <= 0) {
      els.d.textContent = '00';
      els.h.textContent = '00';
      els.m.textContent = '00';
      els.s.textContent = '00';
      return;
    }
    els.d.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    els.h.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
    els.m.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
    els.s.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();
