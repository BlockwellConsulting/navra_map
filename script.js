// Initialize map centered on continental US
var map = L.map('map').setView([39.8283, -98.5795], 4);

// Add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Helper function: returns color based on breaks and colors
function getColor(d, breaks, colors) {
  for (var i = 0; i < breaks.length; i++) {
    if (d <= breaks[i]) return colors[i];
  }
  return colors[colors.length - 1];
}

// County Summary styling
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

// Alaska House District styling
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

// County Summary layer
var countySummary = new L.GeoJSON.AJAX("National_navra_county_summary.geojson", {
  style: countyStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup("County: " + (feature.properties.county || "N/A") +
                    "<br>Total Voters: " + (feature.properties.total_voters || "N/A"));
  }
});

// Alaska House District layer
var alaskaSummary = new L.GeoJSON.AJAX("Alaska_navra_stateleg_summary.geojson", {
  style: alaskaStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup("House District: " + (feature.properties.district || "N/A") +
                    "<br>Voter Count: " + (feature.properties.voter_count || "N/A"));
  }
});

// Layer controls
var overlayMaps = {
  "Polling Places": pollingPlaces,
  "County Summary": countySummary,
  "Alaska House Districts": alaskaSummary
};

L.control.layers(null, overlayMaps, {collapsed:false}).addTo(map);

// Add default visible layers
pollingPlaces.addTo(map);
countySummary.addTo(map);
alaskaSummary.addTo(map);

// Interactive legend
var legend = L.control({position: 'bottomright'});

var legendsContent = {
    "County Summary": {
        breaks: [1000, 5000, 10000, 50000, 100000],
        colors: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
        title: "Total Voters"
    },
    "Alaska House Districts": {
        breaks: [1000, 5000, 10000, 20000],
        colors: ["#feedde","#fdbe85","#fd8d3c","#e6550d"],
        title: "Voter Count"
    }
};

// Generate HTML for legend for a given layer
function getLegendHtml(layerName) {
    var content = legendsContent[layerName];
    if (!content) return "";
    var html = "<strong>" + layerName + ": " + content.title + "</strong><br>";
    for (var i = 0; i < content.breaks.length; i++) {
        html +=
            '<i style="background:' + content.colors[i] + '; width: 18px; height: 18px; display: inline-block; margin-right:5px;"></i> ' +
            (i === 0 ? "≤ " : content.breaks[i-1]+ " – ") + content.breaks[i] + '<br>';
    }
    return html;
}

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = "";
    return div;
};
legend.addTo(map);

function updateLegend() {
    var div = document.querySelector('.legend');
    div.innerHTML = "";
    for (var name in overlayMaps) {
        if (map.hasLayer(overlayMaps[name]) && legendsContent[name]) {
            div.innerHTML += getLegendHtml(name) + "<br>";
        }
    }
}

map.on('overlayadd', updateLegend);
map.on('overlayremove', updateLegend);

// Initialize legend on page load
updateLegend();
