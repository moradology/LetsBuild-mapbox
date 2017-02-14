/* =====================
Set up map
===================== */
mapboxgl.accessToken = 'pk.eyJ1IjoieXVuc2hpIiwiYSI6ImNpeHczcjA3ZDAwMTMyd3Btb3Fzd3hpODIifQ.SWiqUD9o_DkHZuJBPIEHPA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yunshi/ciz4svp6b006b2rpluoxzvl57',
  center: [-75.1639, 39.9522],
  zoom: 12,
  pitch: 50,
});

var draw = new MapboxDraw({
  displayControlsDefault: true,
  controls: {
    polygon: true,
    trash: true
  }
});

//add footprint layer to show the building height
map.on('load', function() {
  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'footprint-64awx0',
    'type': 'fill-extrusion',
    'minzoom': 12,
    'paint': {
      'fill-extrusion-color': {
        'property': 'MAX_HGT',
        "type": "exponential",
        "stops": [
          //convert unit: feet to meters
          //the maximum height is 1159 feet
          [0,'#fff'],
          [1159, '#fbb217']
        ]
      },
      'fill-extrusion-height': {
        'property': 'MAX_HGT',
        "type": "exponential",
        "stops": [
          //convert unit: feet to meters
          [0,0],
          [1159, 353.2632]
        ]
      },
      'fill-extrusion-opacity': 0.85
    }
  });

  //predefine a polygon source to add input polygon
  map.addSource('poly',{
    "type": "geojson",
    "data": {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[[0,0],
        [0,0],
        [0,0]]]}
      }
    });

    // add control to the map.
    // change the order to define the different position
    map.addControl(new mapboxgl.ScaleControl({unit: 'imperial'}),'bottom-right');
    map.addControl(new mapboxgl.GeolocateControl(),'bottom-right');
    map.addControl(new mapboxgl.NavigationControl(),'bottom-right');
    map.addControl(draw,'top-right');
  });
