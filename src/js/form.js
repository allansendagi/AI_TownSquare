// =============================================
// FORM HANDLING (Formspree)
// =============================================
(function () {
  var form = document.getElementById('registerForm');
  var btn = document.getElementById('submitBtn');
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
        btn.textContent = 'Application Received \u2714';
        btn.style.background = 'linear-gradient(135deg, #059669, #10B981)';
        form.reset();

        setTimeout(function () {
          btn.textContent = 'Submit Application \u2192';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        btn.textContent = 'Something went wrong. Try again.';
        btn.style.background = 'linear-gradient(135deg, #DC2626, #EF4444)';
        btn.disabled = false;

        setTimeout(function () {
          btn.textContent = 'Submit Application \u2192';
          btn.style.background = '';
        }, 3000);
      }
    }).catch(function () {
      btn.textContent = 'Network error. Try again.';
      btn.style.background = 'linear-gradient(135deg, #DC2626, #EF4444)';
      btn.disabled = false;

      setTimeout(function () {
        btn.textContent = 'Submit Application \u2192';
        btn.style.background = '';
      }, 3000);
    });
  });
})();
