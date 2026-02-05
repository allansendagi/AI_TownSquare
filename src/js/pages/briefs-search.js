// =============================================
// BRIEFS - Client-side Search & Filter
// =============================================
(function () {
  var searchInput = document.getElementById('briefsSearch');
  var filterChips = document.querySelectorAll('.briefs-filter-chip');
  var briefCards = document.querySelectorAll('.brief-card');
  var emptyState = document.querySelector('.briefs-empty');

  if (!searchInput || !briefCards.length) return;

  var activeFilter = 'All';

  function filterBriefs() {
    var query = searchInput.value.toLowerCase().trim();
    var visibleCount = 0;

    briefCards.forEach(function (card) {
      var title = (card.dataset.title || '').toLowerCase();
      var city = (card.dataset.city || '').toLowerCase();
      var themes = (card.dataset.themes || '').toLowerCase();
      var sector = (card.dataset.sector || '').toLowerCase();

      var matchesSearch = !query ||
        title.indexOf(query) !== -1 ||
        city.indexOf(query) !== -1 ||
        themes.indexOf(query) !== -1 ||
        sector.indexOf(query) !== -1;

      var matchesFilter = activeFilter === 'All' ||
        sector.indexOf(activeFilter.toLowerCase()) !== -1 ||
        themes.indexOf(activeFilter.toLowerCase()) !== -1;

      if (matchesSearch && matchesFilter) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  searchInput.addEventListener('input', filterBriefs);

  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filterChips.forEach(function (c) { c.classList.remove('briefs-filter-chip--active'); });
      chip.classList.add('briefs-filter-chip--active');
      activeFilter = chip.dataset.filter;
      filterBriefs();
    });
  });
})();
