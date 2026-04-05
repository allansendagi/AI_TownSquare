/**
 * Brief Detail Page — Scroll-Spy TOC + Copy to Clipboard
 * CB-DXB-001 and future briefs
 */

(function() {
  'use strict';

  // =============================================
  // SCROLL-SPY FOR TABLE OF CONTENTS
  // =============================================

  var sections = document.querySelectorAll('.brief-section');
  var tocLinks = document.querySelectorAll('.brief-toc-link');

  if (sections.length && tocLinks.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          tocLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    });

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

  // =============================================
  // SMOOTH SCROLL FOR TOC LINKS
  // =============================================

  tocLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetId);

      if (targetSection) {
        var headerOffset = 80;
        var elementPosition = targetSection.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        history.pushState(null, null, '#' + targetId);
      }
    });
  });

  // =============================================
  // COPY TO CLIPBOARD — Citation Block
  // =============================================

  var copyBtn = document.getElementById('copyCitation');
  var citationText = document.getElementById('citationText');

  if (copyBtn && citationText) {
    copyBtn.addEventListener('click', function() {
      var text = citationText.textContent;

      // Use modern clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showCopiedFeedback();
        }).catch(function() {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    });
  }

  function showCopiedFeedback() {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');

    setTimeout(function() {
      copyBtn.textContent = 'Copy to Clipboard';
      copyBtn.classList.remove('copied');
    }, 2000);
  }

  function fallbackCopy(text) {
    // Fallback for older browsers
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      showCopiedFeedback();
    } catch (err) {
      console.error('Copy failed:', err);
      copyBtn.textContent = 'Copy failed';
      setTimeout(function() {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    }

    document.body.removeChild(textarea);
  }

  // =============================================
  // HIGHLIGHT INITIAL SECTION ON LOAD
  // =============================================

  // Check if URL has a hash and scroll to it
  if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    var targetSection = document.getElementById(hash);

    if (targetSection) {
      setTimeout(function() {
        var headerOffset = 80;
        var elementPosition = targetSection.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  } else {
    // Mark first TOC link as active if at top of page
    if (tocLinks.length && window.scrollY < 200) {
      tocLinks[0].classList.add('active');
    }
  }

})();
