// =============================================
// DUBAI CALENDAR — Standalone calendar page
// For sharing with confirmed attendees
// =============================================
(function () {
  var googleCalBtn = document.getElementById('googleCalendarBtn');
  var icsBtn = document.getElementById('icsDownloadBtn');

  if (!googleCalBtn && !icsBtn) return;

  // Event Details
  var eventDetails = {
    title: 'AI TownSquare Dubai',
    startDate: '20260403T100000Z', // 2:00 PM GST = 10:00 UTC
    endDate: '20260403T110000Z',   // 3:00 PM GST = 11:00 UTC
    location: 'Dubai International Financial Centre',
    description: '60-minute structured civic dialogue examining AI\'s societal impact with 25 cross-sector participants.\\n\\nQuestion: Is AI Going to Take Our Jobs?\\n\\nMore info: https://aitownsquare.org/dubai/'
  };

  // Google Calendar URL Generator
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

  // ICS File Generator
  function generateICSContent() {
    var uid = 'dubai-2026@aitownsquare.org';
    var now = new Date();
    var dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    var description = eventDetails.description.replace(/\n/g, '\\n');

    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AI TownSquare//Dubai//EN',
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

  // Set up buttons
  if (googleCalBtn) {
    googleCalBtn.href = generateGoogleCalendarUrl();
  }

  if (icsBtn) {
    icsBtn.addEventListener('click', downloadICS);
  }
})();
