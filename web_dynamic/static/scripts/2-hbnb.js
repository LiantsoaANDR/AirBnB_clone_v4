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

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function(data) {
        const apiStatusDiv = document.getElementById('api_status');
        if (data.status === 'OK') {
          apiStatusDiv.classList.add('available');
        } else {
          apiStatusDiv.classList.remove('available');
        }
      },
      error: function(xhr, status) {
        console.error('Error Status:', status);
      }
    });
  });