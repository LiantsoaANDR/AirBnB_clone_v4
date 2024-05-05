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

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            const placesSection = document.querySelector('section.places');
            data.forEach(function(place) {
                const article = document.createElement('article');
                article.innerHTML = `
                    <div class="title">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />${place.max_guest} Guests</div>
                        <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />${place.number_bathrooms} Bathroom</div>
                    </div>
                    <div class="description">${place.description}</div>
                `;
                placesSection.appendChild(article);
            });
        },
        error: function(xhr, status) {
            console.error('Error Status:', status);
        }
    });
});
