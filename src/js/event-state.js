// =============================================
// EVENT STATE MACHINE
// Manages pre-event, live, and post-event states
// Event: April 3, 2026, 2:00 PM GST (10:00 UTC), 60 minutes
// =============================================
(function () {
  'use strict';

  var EVENT_START = new Date('2026-04-03T14:00:00+04:00').getTime();
  var EVENT_DURATION = 60 * 60 * 1000; // 60 minutes
  var EVENT_END = EVENT_START + EVENT_DURATION;

  var currentState = null;
  var forcedState = null;
  var pollInterval = null;

  function calculateState() {
    if (forcedState) return forcedState;

    var now = Date.now();
    if (now < EVENT_START) return 'pre-event';
    if (now >= EVENT_START && now < EVENT_END) return 'live';
    return 'post-event';
  }

  function applyState(state) {
    var body = document.body;

    // Remove existing state classes
    body.classList.remove('event-state--pre-event', 'event-state--live', 'event-state--post-event');

    // Add current state class
    body.classList.add('event-state--' + state);

    // Dispatch custom event for other modules
    var event = new CustomEvent('eventStateChange', {
      detail: {
        state: state,
        previousState: currentState,
        isForced: !!forcedState
      }
    });
    document.dispatchEvent(event);

    currentState = state;
  }

  function update() {
    var newState = calculateState();
    if (newState !== currentState) {
      applyState(newState);
    }
  }

  function init() {
    // Initial state
    update();

    // Poll every 30 seconds for state changes
    pollInterval = setInterval(update, 30000);
  }

  // Public API for testing
  window.EventState = {
    forceState: function(state) {
      if (['pre-event', 'live', 'post-event', null].indexOf(state) === -1) {
        console.error('EventState: Invalid state. Use "pre-event", "live", "post-event", or null to reset.');
        return;
      }
      forcedState = state;
      update();
      console.log('EventState: Forced to "' + (state || 'auto') + '"');
    },
    getState: function() {
      return currentState;
    },
    getEventTimes: function() {
      return {
        start: new Date(EVENT_START),
        end: new Date(EVENT_END),
        duration: EVENT_DURATION
      };
    },
    isLive: function() {
      return currentState === 'live';
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
