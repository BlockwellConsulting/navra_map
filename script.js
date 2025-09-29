<div id="map" style="height:500px; width:100%;"></div>

<script>
function initMap() {
  const myCenter = { lat: 38.3498, lng: -81.6326 }; // Charleston, WV
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: myCenter,
  });
  
  new google.maps.Marker({
    position: myCenter,
    map: map,
    title: "Hello from Charleston!",
  });
}
</script>
