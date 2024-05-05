window.addEventListener('DOMContentLoaded', function () {
  const amenityIds = {};

  document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        amenityIds[this.dataset.id] = this.dataset.name;
      } else {
        delete amenityIds[this.dataset.id];
      }

      const amenitiesHeader = document.querySelector('div.amenities h4');
      if (Object.keys(amenityIds).length === 0) {
        amenitiesHeader.textContent = '\u00A0'; // non-breaking space
      } else {
        amenitiesHeader.textContent = Object.values(amenityIds).join(', ');
      }
    });
  });
});
