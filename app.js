window.onload = function() {
  //google api boilerplate
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 8
    });
  }
  initMap();

  let latOne = document.getElementById('latOne');
  let latTwo = document.getElementById('latTwo');
  let lngOne = document.getElementById('lngOne');
  let lngTwo = document.getElementById('lngTwo');
  let result = document.getElementById('result');

  document.getElementById('action').addEventListener('click', function() {
    try {
      //google is happier when you use LatLng objects
      //https://developers.google.com/maps/documentation/javascript/reference/coordinates
      let fromCord = new google.maps.LatLng(
        Number(latOne.value),
        Number(lngOne.value)
      );
      let toCord = new google.maps.LatLng(
        Number(latTwo.value),
        Number(lngTwo.value)
      );
      addMarkers(fromCord, toCord);
      findDistance(fromCord, toCord);
    } catch (error) {
      console.error(error);
    }
  });

  function addMarkers(fromCord, toCord) {
    let bounds = new google.maps.LatLngBounds();

    let mk1 = new google.maps.Marker({ position: fromCord, map: map });
    let mk2 = new google.maps.Marker({ position: toCord, map: map });

    mk1.setMap(map);
    mk2.setMap(map);
    bounds.extend(fromCord);
    bounds.extend(toCord);
    map.fitBounds(bounds);
  }
  //library has built in math function for distance between points
  async function findDistance(fromCord, toCord) {
    let response = await google.maps.geometry.spherical.computeDistanceBetween(
      fromCord,
      toCord
    );
    let radio = document.querySelector('input[type="radio"]:checked');

    result.innerHTML =
      response * radio.value + ' ' + radio.getAttribute('unit');
  }

  //This is for the quick test button rather than user input
  document.getElementById('fastTest').addEventListener('click', function() {
    try {
      //google is happier when you use LatLng objects
      let fromCord = new google.maps.LatLng(37.773972, -122.431297);
      let toCord = new google.maps.LatLng(37.8715, -122.273);
      addMarkers(fromCord, toCord);
      findDistance(fromCord, toCord);
    } catch (error) {
      console.error(error);
    }
  });
};
