function displayMap() {
    var googleTag = $(
        ' < script async defer src = “https: maps.googleapis.com / maps / api / js ? key = AIzaSyA8MspKkrm - iWGzPOfeYDsDvQssYSMTt4E & callback = initMap” > ’
    )
    $("body").append(googleTag);
}
var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: zipObject.latitude,
            lng: zipObject.longitude
        }
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
            lat: breweriesArray.latitude,
            lng: breweriesArray.longitude
        }
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

