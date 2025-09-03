/*!
 * jocarsa|seashell v1.3.0
 * - Syncs with programmatic <select> value changes
 * - Rebuilds when options change (MutationObserver)
 * - Manual refresh via 'seashell:refresh' event
 */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const allSelects = document.querySelectorAll('select');

    allSelects.forEach((originalSelect) => {
      if (originalSelect.dataset.jocarsaProcessed) return;
      originalSelect.dataset.jocarsaProcessed = true;

      const seashellWrapper = document.createElement('div');
      seashellWrapper.className = 'seashell-wrapper';
      seashellWrapper.style.position = 'relative';

      const seashellDisplay = document.createElement('input');
      seashellDisplay.className = 'seashell-display';
      seashellDisplay.type = 'text';
      seashellDisplay.placeholder =
        originalSelect.dataset.placeholder || 'Select an option...';

      const seashellDropdown = document.createElement('div');
      seashellDropdown.className = 'seashell-dropdown';

      // --- Helpers ----------------------------------------------------------
      const closeAllDropdowns = () => {
        document
          .querySelectorAll('.seashell-dropdown.open')
          .forEach((d) => d.classList.remove('open'));
      };

      const syncFromSelect = () => {
        const sel = originalSelect.selectedOptions[0];
        if (sel) seashellDisplay.value = sel.text;
        else if (!seashellDisplay.matches(':focus')) seashellDisplay.value = '';
      };

      const buildDropdown = () => {
        // Clear current items
        seashellDropdown.innerHTML = '';

        // Recreate items
        Array.from(originalSelect.options).forEach((option) => {
          const item = document.createElement('div');
          item.className = 'seashell-dropdown-item';
          item.textContent = option.text;
          item.dataset.value = option.value;

          if (option.disabled) {
            item.style.pointerEvents = 'none';
            item.style.opacity = '0.6';
          }

          item.addEventListener('click', () => {
            seashellDisplay.value = option.text;
            originalSelect.value = option.value;
            originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
            seashellDropdown.classList.remove('open');
          });

          seashellDropdown.appendChild(item);
        });

        // Keep display consistent with current selection
        syncFromSelect();
      };

      // Debounce to collapse bursty mutations
      let rebuildTimer = null;
      const scheduleRebuild = () => {
        clearTimeout(rebuildTimer);
        rebuildTimer = setTimeout(buildDropdown, 0);
      };

      // --- Wire up interactions --------------------------------------------
      seashellDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        seashellDropdown.classList.toggle('open');
      });

      seashellDisplay.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        seashellDropdown
          .querySelectorAll('.seashell-dropdown-item')
          .forEach((item) => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
          });
      });

      document.addEventListener('click', closeAllDropdowns);

      // Sync when the <select> value changes programmatically
      originalSelect.addEventListener('change', syncFromSelect);

      // Manual refresh API
      originalSelect.addEventListener('seashell:refresh', scheduleRebuild);

      // Observe option list changes (added/removed/modified)
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (
            m.type === 'childList' || // options added/removed
            (m.type === 'attributes' && m.target.tagName === 'OPTION') // option changed
          ) {
            scheduleRebuild();
            break;
          }
        }
      });

      observer.observe(originalSelect, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['label', 'value', 'selected', 'disabled', 'text'],
      });

      // --- Mount into DOM ---------------------------------------------------
      originalSelect.parentNode.insertBefore(seashellWrapper, originalSelect);
      seashellWrapper.appendChild(originalSelect);
      seashellWrapper.appendChild(seashellDisplay);
      seashellWrapper.appendChild(seashellDropdown);

      // Hide original select
      originalSelect.style.display = 'none';

      // Initial build
      buildDropdown();
    });
  });
})();

