/*!
 * jocarsa|seashell v1.1.0
 * Enhanced searchable select dropdown replacement.
 */

(function () {
  // Automatically apply to all <select> elements on the page
  document.addEventListener('DOMContentLoaded', function () {
    const allSelects = document.querySelectorAll('select');

    allSelects.forEach((originalSelect) => {
      // Skip if already processed
      if (originalSelect.dataset.jocarsaProcessed) return;

      // Mark as processed
      originalSelect.dataset.jocarsaProcessed = true;

      // Create the wrapper for our custom widget
      const seashellWrapper = document.createElement('div');
      seashellWrapper.className = 'seashell-wrapper';

      // Create the visible input box
      const seashellDisplay = document.createElement('input');
      seashellDisplay.className = 'seashell-display';
      seashellDisplay.type = 'text';
      seashellDisplay.placeholder = originalSelect.dataset.placeholder || 'Select an option...';

      // Create the dropdown container
      const seashellDropdown = document.createElement('div');
      seashellDropdown.className = 'seashell-dropdown';

      // Populate the dropdown with the <option> items
      Array.from(originalSelect.options).forEach((option) => {
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'seashell-dropdown-item';
        dropdownItem.textContent = option.text;
        dropdownItem.dataset.value = option.value;

        // Handle item click
        dropdownItem.addEventListener('click', () => {
          // Set the display text
          seashellDisplay.value = option.text;

          // Update the original select’s value
          originalSelect.value = option.value;

          // Trigger the change event on the original select
          originalSelect.dispatchEvent(new Event('change'));

          // Hide the dropdown
          seashellDropdown.classList.remove('open');
        });

        seashellDropdown.appendChild(dropdownItem);
      });

      // Toggle dropdown on input click
      seashellDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        seashellDropdown.classList.toggle('open');
      });

      // Filter dropdown on input keyup
      seashellDisplay.addEventListener('keyup', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const items = seashellDropdown.querySelectorAll('.seashell-dropdown-item');
        items.forEach((item) => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
      });

      // Insert custom widget into the DOM (before hiding the original <select>)
      originalSelect.style.display = 'none'; // Hide the original <select>
      originalSelect.parentNode.insertBefore(seashellWrapper, originalSelect);

      // Assemble the custom widget
      seashellWrapper.appendChild(seashellDisplay);
      seashellWrapper.appendChild(seashellDropdown);
    });

    // Close dropdown if clicked anywhere outside of a seashell display
    document.addEventListener('click', closeAllDropdowns);

    /**
     * Closes all seashell dropdowns.
     */
    function closeAllDropdowns() {
      const allDropdowns = document.querySelectorAll('.seashell-dropdown.open');
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove('open');
      });
    }
  });
})();

