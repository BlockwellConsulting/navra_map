// Legend control
var legend = L.control({position: 'bottomright'});

// Define legend content for each layer
var legendsContent = {
    "County Summary": {
        breaks: [1000, 5000, 10000, 50000, 100000],
        colors: ["#ffffcc","#a1dab4","#41b6c4","#2c7fb8","#253494"],
        title: "Total Voters"
    },
    "Precincts": {
        breaks: [100, 500, 1000, 5000, 10000],
        colors: ["#f2f0f7","#cbc9e2","#9e9ac8","#756bb1","#54278f"],
        title: "Population"
    },
    "Alaska House Districts": {
        breaks: [1000, 5000, 10000, 20000],
        colors: ["#feedde","#fdbe85","#fd8d3c","#e6550d"],
        title: "Voter Count"
    }
};

// Function to create legend HTML for a given layer
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

// Add legend container
legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = ""; // start empty
    return div;
};
legend.addTo(map);

// Function to update legend based on visible layers
function updateLegend() {
    var div = document.querySelector('.legend');
    div.innerHTML = "";

    for (var name in overlayMaps) {
        if (map.hasLayer(overlayMaps[name]) && legendsContent[name]) {
            div.innerHTML += getLegendHtml(name) + "<br>";
        }
    }
}

// Update legend when layers are added/removed
map.on('overlayadd', updateLegend);
map.on('overlayremove', updateLegend);

// Initialize legend on page load
updateLegend();
