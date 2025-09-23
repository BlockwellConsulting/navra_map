// Initialize map centered on Charleston/US
var map = L.map('map').setView([39.8283, -98.5795], 4);

// Add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Helper function: color based on breaks
function getColor(d, breaks, colors) {
  for (var i = 0; i < breaks.length; i++) {
    if (d <= breaks[i]) return colors[i];
  }
  return colors[colors.length - 1];
}

// County styling
function countyStyle(feature) {
  var breaks = [1000, 5000, 10000, 50000, 100000];
  var colors = ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"];
  return {
    color: "#333",
    weight: 1,
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.total_voters, breaks, colors)
  };
}

// Alaska House styling
function alaskaStyle(feature) {
  var breaks = [1000, 5000, 10000, 20000];
  var colors = ["#feedde","#fdbe85","#fd8d3c","#e6550d"];
  return {
    color: "#444",
    weight: 2,
    fillOpacity: 0.6,
    fillColor: getColor(feature.properties.voter_count, breaks, colors)
  };
}

// Polling Places markers
var pollingPlaces = new L.GeoJSON.AJAX("national_pollingplaces_navracompliant.geojson", {
  pointToLayer: function(feature, latlng){
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: "#e31a1c",
      color: "#b10026",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  },
  onEachFeature: function(feature, layer){
    layer.bindPopup("Polling Place: " + (feature.properties.name || "N/A"));
  }
});

// County layer
var countySummary = new L.GeoJSON.AJAX("National_navra_county_summary.geojson", {
  style: countyStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup("County: " + (feature.properties.county || "N/A") +
                    "<br>Total Voters: " + (feature.properties.total_voters || "N/A"));
  }
});

// Alaska House districts
var alaskaSummary = new L.GeoJSON.AJAX("Alaska_navra_stateleg_summary.geojson", {
  style: alaskaStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup("House District: " + (feature.properties.district || "N/A") +
                    "<br>Voter Count: " + (feature.properties.voter_count || "N/A"));
  }
});

// Overlay controls
var overlayMaps = {
  "Polling Places": pollingPlaces,
  "County Summary": countySummary,
  "Alaska House Districts": alaskaSummary
};

L.control.layers(null, overlayMaps, {collapsed:false}).addTo(map);

// Add default layers
pollingPlaces.addTo(map);
countySummary.addTo(map);
alaskaSummary.addTo(map);
