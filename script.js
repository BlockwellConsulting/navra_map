// Initialize map centered on continental US
var map = L.map('map').setView([39.8283, -98.5795], 4);

// Add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Helper: color scale function
function getColor(d, breaks, colors) {
  for (var i = 0; i < breaks.length; i++) {
    if (d <= breaks[i]) return colors[i];
  }
  return colors[colors.length - 1];
}

// County summary styling by total_voters
function countyStyle(feature) {
  var breaks = [1000, 5000, 10000, 50000, 100000]; // example breakpoints
  var colors = ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"];
  return {
    color: "#333",
    weight: 1,
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.total_voters, breaks, colors)
  };
}

// Alaska Hou
