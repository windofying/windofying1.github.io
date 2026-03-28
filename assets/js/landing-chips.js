/**
 * Filter chips for landing page — classic script (no ES modules).
 * Ensures clicks work even when module scripts fail (file://, strict CSP, etc.).
 */
(function () {
  function initLandingFilterChips() {
    var groups = document.querySelectorAll('.landing-chip-group');
    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      var chips = group.querySelectorAll('.landing-chip');
      for (var i = 0; i < chips.length; i++) {
        chips[i].addEventListener('click', function (chip, grp) {
          return function () {
            var wasOn = chip.getAttribute('aria-pressed') === 'true';
            var all = grp.querySelectorAll('.landing-chip');
            for (var j = 0; j < all.length; j++) {
              all[j].setAttribute('aria-pressed', 'false');
              all[j].classList.remove('is-selected');
            }
            if (!wasOn) {
              chip.setAttribute('aria-pressed', 'true');
              chip.classList.add('is-selected');
            }
          };
        }(chips[i], group));
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingFilterChips);
  } else {
    initLandingFilterChips();
  }
})();
