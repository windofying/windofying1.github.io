/**
 * Filter chips for landing page — classic script (no ES modules).
 * Syncs selection to #lead-form hidden inputs (capacity, timeline, location_flexibility) for Supabase.
 */
(function () {
  function syncRequirementHiddenInput(group) {
    var field = group.getAttribute('data-requirement-field');
    if (!field) return;
    var form = document.getElementById('lead-form');
    if (!form) return;
    var input = form.querySelector('input[name="' + field + '"]');
    if (!input) return;
    var selected = group.querySelector('.landing-chip[aria-pressed="true"]');
    if (selected) {
      var v = selected.getAttribute('data-value');
      input.value = v != null && String(v).length ? v : selected.textContent.replace(/\s+/g, ' ').trim();
    } else {
      input.value = '';
    }
  }

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
            syncRequirementHiddenInput(grp);
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
