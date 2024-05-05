$(document).ready(function() {
    const amenityIds = {};

    // Function to fetch places
    function fetchPlaces() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(amenityIds) }),
            success: function(data) {
                const placesSection = $('section.places');
                placesSection.empty(); // Clear existing places

                data.forEach(function(place) {
                    const article = $('<article></article>');
                    article.html(`
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
                    `);
                    placesSection.append(article);
                });
            },
            error: function(xhr, status) {
                console.error('Error Status:', status);
            }
        });
    }


    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenityIds[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenityIds[$(this).data('id')];
        }

        const amenitiesHeader = $('div.amenities h4');
        if (Object.keys(amenityIds).length === 0) {
            amenitiesHeader.text('\u00A0'); // non-breaking space
        } else {
            amenitiesHeader.text(Object.values(amenityIds).join(', '));
        }
    });

    // Check API status
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/status/',
        type: 'GET',
        success: function(data) {
            const apiStatusDiv = $('#api_status');
            if (data.status === 'OK') {
                apiStatusDiv.addClass('available');
            } else {
                apiStatusDiv.removeClass('available');
            }
        },
        error: function(xhr, status) {
            console.error('Error Status:', status);
        }
    });

    // Trigger the places search request when the page loads
    fetchPlaces();

    // Button click event handler
    $('button').click(function() {
        fetchPlaces();
    });
});
