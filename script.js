// Initialize map centered on continental US
var map = L.map('map').setView([39.8283, -98.5795], 4);

// Add OpenStreetMap basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Test marker at Charleston, WV
var charlestonMarker = L.marker([38.3498, -81.6326])
    .addTo(map)
    .bindPopup("Test marker – Charleston, WV")
    .openPopup();
