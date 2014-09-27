function initialize() {
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(-25.363882, 131.044922)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Add 5 markers to the map at random locations
  var southWest = new google.maps.LatLng(-31.203405, 125.244141);
  var northEast = new google.maps.LatLng(-25.363882, 131.044922);

  var bounds = new google.maps.LatLngBounds(southWest, northEast);
  map.fitBounds(bounds);

  var lngSpan = northEast.lng() - southWest.lng();
  var latSpan = northEast.lat() - southWest.lat();

  for (var i = 0; i < 5; i++) {
    var position = new google.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random());
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });

    marker.setTitle((i + 1).toString());
    attachSecretMessage(marker, i);
  }
}

// The five markers show a secret message when clicked
// but that message is not within the marker's instance data
function attachSecretMessage(marker, num) {
  var message = ['This', 'is', 'the', 'secret', 'message'];
  var infowindow = new google.maps.InfoWindow({
    content: message[num]
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}

function crearLeyenda() {
  var leyenda = document.createElement('div');
  leyenda.id = "leyenda";
  document.body.appendChild(leyenda);
}

function loadScript() {
  crearLeyenda();
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;