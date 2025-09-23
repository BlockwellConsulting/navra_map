// Initialize map centered on Charleston, WV
var map = L.map('map').setView([38.3498, -81.6326], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a test marker at Charleston
L.marker([38.3498, -81.6326]).addTo(map)
  .bindPopup("Test marker – Charleston, WV")
  .openPopup();
