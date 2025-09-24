// Initialize the map centered on Charleston, WV
var map = L.map('map').setView([38.3498, -81.6326], 5);

// Add OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load *one* GeoJSON file
var pollingPlaces = new L.GeoJSON.AJAX("national_pollingplaces_navracompliant.geojson", {
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      layer.bindPopup(JSON.stringify(feature.properties));
    }
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: "red",
      color: "black",
      weight: 1,
      fillOpacity: 0.8
    });
  }
}).addTo(map);
