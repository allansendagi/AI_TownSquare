// =============================================
// DUBAI RSVP — INVITATION CONFIRMATION
// URL param parsing, form handling, calendar generation
// =============================================
(function () {
  var form = document.getElementById('rsvpForm');
  var formWrap = document.getElementById('rsvpFormWrap');
  var btn = document.getElementById('rsvpSubmitBtn');
  var successConfirmed = document.getElementById('rsvpSuccessConfirmed');
  var successDeclined = document.getElementById('rsvpSuccessDeclined');
  var greeting = document.getElementById('rsvpGreeting');
  var guestNameEl = document.getElementById('guestName');
  var nameField = document.getElementById('nameField');
  var emailField = document.getElementById('emailField');
  var formSubject = document.getElementById('formSubject');
  var googleCalBtn = document.getElementById('googleCalendarBtn');
  var icsBtn = document.getElementById('icsDownloadBtn');

  if (!form) return;

  // =============================================
  // Event Details (for calendar generation)
  // =============================================
  var eventDetails = {
    title: 'AI TownSquare — Dubai Node',
    startDate: '20260403T100000Z', // 2:00 PM GST = 10:00 UTC
    endDate: '20260403T110000Z',   // 3:00 PM GST = 11:00 UTC
    location: 'Dubai International Financial Centre',
    description: '60-minute structured civic dialogue examining AI\'s societal impact with 25 cross-sector participants.\\n\\nQuestion: Is AI Going to Take Our Jobs?\\n\\nMore info: https://aitownsquare.org/dubai/'
  };

  // =============================================
  // URL Parameter Parsing
  // =============================================
  function getUrlParams() {
    var params = {};
    var search = window.location.search.substring(1);
    if (!search) return params;

    var pairs = search.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      if (pair.length === 2) {
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
    return params;
  }

  // Pre-fill form from URL parameters
  function prefillForm() {
    var params = getUrlParams();

    if (params.name) {
      nameField.value = params.name;
      nameField.readOnly = true;
      guestNameEl.textContent = params.name;
    }

    if (params.email) {
      emailField.value = params.email;
      emailField.readOnly = true;
    }
  }

  prefillForm();

  // =============================================
  // Attendance Radio Handling
  // =============================================
  var attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  function updateButtonText() {
    var selectedValue = document.querySelector('input[name="attendance"]:checked').value;
    if (selectedValue === 'yes') {
      btn.textContent = 'Confirm My Seat \u2192';
      formSubject.value = 'Dubai RSVP - Confirmed';
    } else {
      btn.textContent = 'Submit Response \u2192';
      formSubject.value = 'Dubai RSVP - Declined';
    }
  }

  for (var i = 0; i < attendanceRadios.length; i++) {
    attendanceRadios[i].addEventListener('change', updateButtonText);
  }

  // =============================================
  // Form Submission
  // =============================================
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    btn.textContent = 'Submitting...';
    btn.disabled = true;

    var data = new FormData(form);
    var attendance = document.querySelector('input[name="attendance"]:checked').value;

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        // Hide form
        formWrap.style.display = 'none';

        // Show appropriate success state
        if (attendance === 'yes') {
          successConfirmed.style.display = 'block';
          // Generate calendar links
          googleCalBtn.href = generateGoogleCalendarUrl();
          icsBtn.addEventListener('click', downloadICS);
        } else {
          successDeclined.style.display = 'block';
        }

        // Hide greeting as well for cleaner success view
        if (greeting) {
          greeting.style.display = 'none';
        }
      } else {
        btn.textContent = 'Something went wrong. Try again.';
        btn.style.background = 'linear-gradient(135deg, #DC2626, #EF4444)';
        btn.disabled = false;

        setTimeout(function () {
          updateButtonText();
          btn.style.background = '';
        }, 3000);
      }
    }).catch(function () {
      btn.textContent = 'Network error. Try again.';
      btn.style.background = 'linear-gradient(135deg, #DC2626, #EF4444)';
      btn.disabled = false;

      setTimeout(function () {
        updateButtonText();
        btn.style.background = '';
      }, 3000);
    });
  });

  // =============================================
  // Google Calendar URL Generator
  // =============================================
  function generateGoogleCalendarUrl() {
    var baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    var params = [
      'text=' + encodeURIComponent(eventDetails.title),
      'dates=' + eventDetails.startDate + '/' + eventDetails.endDate,
      'details=' + encodeURIComponent(eventDetails.description),
      'location=' + encodeURIComponent(eventDetails.location)
    ];
    return baseUrl + '&' + params.join('&');
  }

  // =============================================
  // ICS File Generator
  // =============================================
  function generateICSContent() {
    var uid = 'dubai-node-2026@aitownsquare.org';
    var now = new Date();
    var dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Escape special characters for ICS format
    var description = eventDetails.description.replace(/\n/g, '\\n');

    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AI TownSquare//Dubai Node//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + uid,
      'DTSTAMP:' + dtstamp,
      'DTSTART:' + eventDetails.startDate,
      'DTEND:' + eventDetails.endDate,
      'SUMMARY:' + eventDetails.title,
      'LOCATION:' + eventDetails.location,
      'DESCRIPTION:' + description,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return ics;
  }

  function downloadICS() {
    var icsContent = generateICSContent();
    var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    var url = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = url;
    link.download = 'ai-townsquare-dubai-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
})();
