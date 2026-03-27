// =============================================
// BRIEFS - Client-side Search & Filter
// =============================================
(function () {
  var searchInput = document.getElementById('briefsSearch');
  var searchWrap = document.getElementById('briefsSearchWrap');
  var filtersWrap = document.getElementById('briefsFilters');
  var filterChips = document.querySelectorAll('.briefs-filter-chip');
  var briefCards = document.querySelectorAll('.brief-card');
  var emptyState = document.querySelector('.briefs-empty');

  // View toggle elements
  var viewBtns = document.querySelectorAll('.briefs-view-btn');
  var briefsView = document.getElementById('briefsView');
  var questionsView = document.getElementById('questionsView');

  var activeFilter = 'All';

  // View Toggle Handler
  if (viewBtns.length && briefsView && questionsView) {
    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.dataset.view;

        // Update button states
        viewBtns.forEach(function (b) { b.classList.remove('briefs-view-btn--active'); });
        btn.classList.add('briefs-view-btn--active');

        // Toggle views
        if (view === 'briefs') {
          briefsView.style.display = '';
          questionsView.style.display = 'none';
          if (searchWrap) searchWrap.style.display = '';
          if (filtersWrap) filtersWrap.style.display = '';
        } else if (view === 'questions') {
          briefsView.style.display = 'none';
          questionsView.style.display = '';
          if (searchWrap) searchWrap.style.display = 'none';
          if (filtersWrap) filtersWrap.style.display = 'none';
        }
      });
    });
  }

  // Search & Filter (for briefs)
  if (!searchInput) return;

  function filterBriefs() {
    if (!briefCards.length) return;

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

// =============================================
// QUESTION SUBMISSION FORM
// =============================================
(function () {
  var form = document.getElementById('questionForm');
  var btn = document.getElementById('questionSubmitBtn');
  var note = document.getElementById('questionFormNote');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    btn.textContent = 'Submitting...';
    btn.disabled = true;

    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        btn.textContent = 'Question Submitted ✔';
        btn.style.background = 'linear-gradient(135deg, #059669, #10B981)';
        form.reset();

        note.textContent = 'Thank you! We\'ll review your question and get back to you.';
        note.className = 'question-form-note success';
        note.style.display = 'block';

        setTimeout(function () {
          btn.textContent = 'Submit Question →';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        btn.textContent = 'Something went wrong';
        btn.style.background = 'linear-gradient(135deg, #DC2626, #EF4444)';
        btn.disabled = false;

        note.textContent = 'There was a problem submitting your question. Please try again.';
        note.className = 'question-form-note error';
        note.style.display = 'block';

        setTimeout(function () {
          btn.textContent = 'Submit Question →';
          btn.style.background = '';
        }, 3000);
      }
    }).catch(function () {
      btn.textContent = 'Network error';
      btn.style.background = 'linear-gradient(135deg, #DC2626, #EF4444)';
      btn.disabled = false;

      note.textContent = 'Network error. Please check your connection and try again.';
      note.className = 'question-form-note error';
      note.style.display = 'block';

      setTimeout(function () {
        btn.textContent = 'Submit Question →';
        btn.style.background = '';
      }, 3000);
    });
  });
})();
