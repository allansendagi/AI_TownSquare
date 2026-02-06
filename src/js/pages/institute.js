// =============================================
// INSTITUTE PAGE - Publication PDF Viewer Toggle
// =============================================
(function () {
  var toggles = document.querySelectorAll('.publication-toggle');
  if (!toggles.length) return;

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pubId = btn.dataset.publication;
      var viewer = document.getElementById('viewer-' + pubId);
      var card = btn.closest('.publication-card');

      if (!viewer) return;

      var isOpen = viewer.classList.contains('publication-viewer--open');

      // Close all other viewers first
      document.querySelectorAll('.publication-viewer--open').forEach(function (v) {
        v.classList.remove('publication-viewer--open');
      });
      document.querySelectorAll('.publication-card--open').forEach(function (c) {
        c.classList.remove('publication-card--open');
      });
      document.querySelectorAll('.publication-toggle').forEach(function (t) {
        t.classList.remove('publication-toggle--active');
        t.querySelector('.publication-toggle-text').textContent = 'Read Online';
      });

      // Toggle current viewer
      if (!isOpen) {
        viewer.classList.add('publication-viewer--open');
        card.classList.add('publication-card--open');
        btn.classList.add('publication-toggle--active');
        btn.querySelector('.publication-toggle-text').textContent = 'Close Viewer';
      }
    });
  });
})();
