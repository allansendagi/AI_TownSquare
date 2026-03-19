/**
 * AI TownSquare Analytics
 * Unified event tracking for Plausible and Google Analytics 4
 */

(function() {
  'use strict';

  // Unified tracking function - fires to both Plausible and GA4
  function trackEvent(eventName, eventParams) {
    eventParams = eventParams || {};

    // Plausible tracking
    if (typeof plausible !== 'undefined') {
      plausible(eventName, { props: eventParams });
    }

    // GA4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
    }
  }

  // Expose globally
  window.atsTrack = trackEvent;

  // ========================================
  // Form Submission Tracking
  // ========================================
  document.addEventListener('submit', function(e) {
    var form = e.target;
    var formId = form.id || form.getAttribute('name') || 'unknown_form';
    var formAction = form.getAttribute('action') || '';

    // Determine form type
    var formType = 'form_submit';
    if (formAction.includes('formspree') || form.classList.contains('registration-form')) {
      if (formId.includes('sponsor') || form.querySelector('[name*="sponsor"]')) {
        formType = 'sponsor_inquiry';
      } else if (formId.includes('rsvp') || window.location.pathname.includes('rsvp')) {
        formType = 'rsvp_confirm';
      } else {
        formType = 'seat_application';
      }
    }

    trackEvent(formType, {
      form_id: formId,
      page: window.location.pathname
    });
  });

  // ========================================
  // CTA Click Tracking
  // ========================================
  document.addEventListener('click', function(e) {
    var target = e.target.closest('a.btn, button.btn, .nav-cta');
    if (!target) return;

    var ctaText = target.textContent.trim().substring(0, 50);
    var ctaHref = target.getAttribute('href') || '';

    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_href: ctaHref,
      page: window.location.pathname
    });
  });

  // ========================================
  // Protocol Phase Interaction Tracking
  // ========================================
  document.addEventListener('click', function(e) {
    var phaseHeader = e.target.closest('.protocol-phase-header');
    if (!phaseHeader) return;

    var phase = phaseHeader.closest('.protocol-phase');
    if (!phase) return;

    var phaseNode = phase.querySelector('.protocol-phase-node');
    var phaseName = phase.querySelector('.protocol-phase-name');

    var phaseNumber = phaseNode ? phaseNode.textContent.trim() : 'unknown';
    var phaseTitle = phaseName ? phaseName.textContent.trim() : 'unknown';

    trackEvent('protocol_phase_view', {
      phase_number: phaseNumber,
      phase_name: phaseTitle
    });
  });

  // ========================================
  // Design Notes Expansion Tracking
  // ========================================
  document.addEventListener('click', function(e) {
    var notesToggle = e.target.closest('.protocol-design-notes-toggle');
    if (!notesToggle) return;

    var isExpanding = notesToggle.getAttribute('aria-expanded') === 'false';
    if (!isExpanding) return; // Only track expansions, not collapses

    var phase = notesToggle.closest('.protocol-phase');
    var phaseName = phase ? phase.querySelector('.protocol-phase-name') : null;

    trackEvent('design_notes_view', {
      phase_name: phaseName ? phaseName.textContent.trim() : 'unknown'
    });
  });

  // ========================================
  // Civic Brief View Tracking
  // ========================================
  document.addEventListener('click', function(e) {
    var briefCard = e.target.closest('.briefs-card, [data-brief-id]');
    if (!briefCard) return;

    var briefTitle = briefCard.querySelector('.briefs-card-title, h3, h4');

    trackEvent('brief_view', {
      brief_title: briefTitle ? briefTitle.textContent.trim() : 'unknown'
    });
  });

  // ========================================
  // Scroll Depth Tracking (25%, 50%, 75%, 100%)
  // ========================================
  var scrollMarkers = { 25: false, 50: false, 75: false, 100: false };

  function getScrollPercentage() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return Math.round((scrollTop / docHeight) * 100);
  }

  var scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      var percentage = getScrollPercentage();

      [25, 50, 75, 100].forEach(function(marker) {
        if (percentage >= marker && !scrollMarkers[marker]) {
          scrollMarkers[marker] = true;
          trackEvent('scroll_depth', {
            depth: marker + '%',
            page: window.location.pathname
          });
        }
      });
    }, 100);
  });

  // ========================================
  // External Link Tracking
  // ========================================
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="http"]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (href.includes('aitownsquare.org')) return; // Skip internal links

    trackEvent('external_link', {
      url: href,
      page: window.location.pathname
    });
  });

})();
