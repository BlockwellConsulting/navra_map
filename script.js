// Create map
var map = L.map('map').setView([38.3498, -81.6326], 5);

// Basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON layers
var pollingPlaces = new L.GeoJSON.AJAX("national_pollingplaces_navracompliant.geojson", {
  onEachFeature: function (feature, layer) {
    layer.bindPopup("Polling Place");
  }
}).addTo(map);

var countySummary = new L.GeoJSON.AJAX("National_navra_county_summary.geojson", {
  style: { color: "blue", weight: 2 }
}).addTo(map);

var alaskaHouse = new L.GeoJSON.AJAX("Alaska_navra_stateleg_summary.geojson", {
  style: { color: "green", weight: 2 }
}).addTo(map);
