// =============================================
// CIVIC BRIEF COUNTDOWN
// Counts down to brief publication deadline (48h after event end)
// Deadline: April 5, 2026 at 3:30 PM GST (15:30 +04:00)
// Supports multiple instances on the same page
// =============================================
(function () {
  'use strict';

  // Brief publication deadline: 48 hours after event end (April 3, 3:30 PM + 48h)
  var BRIEF_DEADLINE = new Date('2026-04-05T15:30:00+04:00').getTime();

  // Instance configurations (Dubai page and Home page)
  var instances = [
    {
      countdown: 'civicBriefCountdown',
      available: 'civicBriefAvailable',
      btn: 'civicBriefBtn',
      hours: 'cb-hours',
      min: 'cb-min',
      sec: 'cb-sec'
    },
    {
      countdown: 'civicBriefCountdownHome',
      available: 'civicBriefAvailableHome',
      btn: 'civicBriefBtnHome',
      hours: 'cb-hours-home',
      min: 'cb-min-home',
      sec: 'cb-sec-home'
    }
  ];

  var activeInstances = [];
  var intervalId = null;

  function initInstance(config) {
    var countdownEl = document.getElementById(config.countdown);
    var availableEl = document.getElementById(config.available);
    var briefBtn = document.getElementById(config.btn);
    var hoursEl = document.getElementById(config.hours);
    var minEl = document.getElementById(config.min);
    var secEl = document.getElementById(config.sec);

    // Skip if main countdown element not found
    if (!countdownEl || !hoursEl) return null;

    return {
      countdownEl: countdownEl,
      availableEl: availableEl,
      briefBtn: briefBtn,
      hoursEl: hoursEl,
      minEl: minEl,
      secEl: secEl
    };
  }

  function showBriefAvailable(instance) {
    if (instance.countdownEl) instance.countdownEl.style.display = 'none';
    if (instance.availableEl) instance.availableEl.style.display = 'block';
    if (instance.briefBtn) instance.briefBtn.style.display = 'inline-flex';
  }

  function showCountdown(instance) {
    if (instance.countdownEl) instance.countdownEl.style.display = 'block';
    if (instance.availableEl) instance.availableEl.style.display = 'none';
    if (instance.briefBtn) instance.briefBtn.style.display = 'none';
  }

  function updateInstance(instance, totalHours, minutes, seconds) {
    instance.hoursEl.textContent = String(totalHours).padStart(2, '0');
    instance.minEl.textContent = String(minutes).padStart(2, '0');
    instance.secEl.textContent = String(seconds).padStart(2, '0');
  }

  function update() {
    var now = Date.now();
    var diff = BRIEF_DEADLINE - now;

    // If deadline passed, show "Brief Available" state for all instances
    if (diff <= 0) {
      activeInstances.forEach(function(instance) {
        showBriefAvailable(instance);
      });

      // Dispatch event for other modules
      var event = new CustomEvent('civicBriefPublished', {
        detail: { deadline: new Date(BRIEF_DEADLINE) }
      });
      document.dispatchEvent(event);

      // Stop the interval
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      return;
    }

    // Calculate hours, minutes, seconds
    var totalHours = Math.floor(diff / 3600000);
    var minutes = Math.floor((diff / 60000) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    // Update all active instances
    activeInstances.forEach(function(instance) {
      updateInstance(instance, totalHours, minutes, seconds);
    });
  }

  function init() {
    // Initialize all instances
    instances.forEach(function(config) {
      var instance = initInstance(config);
      if (instance) {
        activeInstances.push(instance);
      }
    });

    // Exit if no instances found
    if (activeInstances.length === 0) return;

    // Check if already past deadline
    if (Date.now() >= BRIEF_DEADLINE) {
      activeInstances.forEach(function(instance) {
        showBriefAvailable(instance);
      });
      return;
    }

    // Show countdown for all instances
    activeInstances.forEach(function(instance) {
      showCountdown(instance);
    });

    // Initial update
    update();

    // Update every second
    intervalId = setInterval(update, 1000);
  }

  // Public API for testing
  window.CivicBriefCountdown = {
    getDeadline: function() {
      return new Date(BRIEF_DEADLINE);
    },
    isPublished: function() {
      return Date.now() >= BRIEF_DEADLINE;
    },
    forcePublished: function() {
      activeInstances.forEach(function(instance) {
        showBriefAvailable(instance);
      });
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      console.log('CivicBriefCountdown: Forced to published state');
    },
    getActiveInstances: function() {
      return activeInstances.length;
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
