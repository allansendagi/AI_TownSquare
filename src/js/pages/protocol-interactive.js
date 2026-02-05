// =============================================
// PROTOCOL - Accordion Interaction
// =============================================
(function () {
  var phases = document.querySelectorAll('.protocol-phase-header');
  if (!phases.length) return;

  phases.forEach(function (header) {
    header.addEventListener('click', function () {
      var phase = header.closest('.protocol-phase');
      var isOpen = phase.classList.contains('protocol-phase--open');

      // Close all
      document.querySelectorAll('.protocol-phase').forEach(function (p) {
        p.classList.remove('protocol-phase--open');
      });

      // Toggle clicked
      if (!isOpen) {
        phase.classList.add('protocol-phase--open');
      }
    });
  });
})();
