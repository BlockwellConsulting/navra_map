mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-81.6326, 38.3498],
  zoom: 5
});

map.on('load', function () {
  map.addSource('pollingPlaces', {
    type: 'vector',
    url: 'mapbox://yourusername.polling_places'
  });

  map.addLayer({
    id: 'pollingPoints',
    type: 'circle',
    source: 'pollingPlaces',
    'source-layer': 'polling_places',
    paint: {
      'circle-radius': 3,
      'circle-color': '#e31a1c'
    }
  });
});
