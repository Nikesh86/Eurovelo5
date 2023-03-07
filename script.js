var map = L.map('map').setView([50.6887186, 3.1667413], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var gpx = '/gpx/gpx.xml'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
  async: true,
  marker_options: {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null,
    
  }

}).on('loaded', function (e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);