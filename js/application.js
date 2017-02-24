// write functions HERE!!!
var calculateArea = function() {
  // reset the area
  $('#calculated').text('');
  var data = draw.getAll();
  _.each(data.features,function(datum){
    var type = datum.geometry.type;
    //console.log('This is a ' + type);
    switch (type) {
      case 'Polygon':
      // convert square meters to square foot
      var area = turf.area(data) * 10.7639;
      var length = turf.lineDistance(data, 'miles');
      // restrict to 2 decimal points
      var rounded_area = Math.round(area*100)/100;
      var rounded_length = Math.round(length*5280*100)/100;
      $('#calculated').append("<div id='polygon'></div>");
      $('#polygon').text('- ' + type + ' (Parameter: ' + rounded_length+ ' feet. Area: ' + rounded_area + ' sqft.)');
      break;

      case 'LineString':
      // convert square meters to square foot
      length = turf.lineDistance(data, 'miles');
      // restrict to 2 decimal points
      rounded_length = Math.round(length*5280*100)/100;
      $('#calculated').append("<div id='line'></div>");
      $('#line').text('- ' + type + ' (Length: ' + rounded_length+ ' feet.)');
      break;
      default:
      alert("Use the draw tools to draw something!");
    }
  });
  if (data.features.length > 1) {
    $('#calculated').append("<br><div id=\'warning\'>*You have drawn multiple things.<br>Callculate only the last for each shape!</div>");
  }
};


// fetch the polygon, draw and extrude the building
var drawBuilding = function() {
  var data = draw.getAll();
  var height = $('#height').val();
  // default value
  if (height === 0){
    height = 0;
    $('#warning').remove();
    $('#calculated').append("<br><div id=\'warning\'>*No height found. Draw only the footprint for you!</div>");
  }
  height = String(height);
  // only draw the polygon
  data.features = _.filter(data.features, function(datum){
    return datum.geometry.type === 'Polygon' || datum.geometry.type === 'MultiPolygon';
  });

  if (data.features.length > 0){
    map.getSource('poly').setData(data);
    map.addLayer({
      'id': '3d-blueprint',
      'source': 'poly',
      'type': 'fill-extrusion',
      'minzoom': 12,
      'paint': {
        'fill-extrusion-color': '#fff',
        // must use the number() to declare as a number, convert meter to foot
        'fill-extrusion-height': Number(height*0.3048),
        'fill-extrusion-opacity': 0.9
      }
    });
  }
};

// hide 3D layer
var hide3DLayer = function(e) {
  var offLayerId = '3d-buildings';
  var visibility = map.getLayoutProperty(offLayerId, 'visibility');
  if (map.getLayoutProperty(offLayerId, 'visibility') === 'visible') {
    map.setLayoutProperty(offLayerId, 'visibility', 'none');
  } else {
    map.setLayoutProperty(offLayerId, 'visibility', 'visible');
  }
};


// add realtime SEPTA data
var fetchBus = function(e) {
    $.ajax("https://cors-anywhere.herokuapp.com/http://www3.septa.org/hackathon/TransitViewAll/")
    .done(function(data){
      var coordsList = [];
      _.each(data, function(datum){
        _.each(datum, function(datum){
          _.each(datum, function(datum){
            _.each(datum, function(datum){
              coordsList.push([datum.lng, datum.lat]);
            });
          });
        });
      });

      var ptSets = turf.multiPoint(coordsList);
      map.getSource('septa').setData(ptSets);
    });
  };
  //
  // // hide septa layer
  // var hideSeptaLayer = function(e) {
  //   var offLayerId = 'septa';
  //   var visibility = map.getLayoutProperty(offLayerId, 'visibility');
  //   if (map.getLayoutProperty(offLayerId, 'visibility') === 'visible') {
  //     map.setLayoutProperty(offLayerId, 'visibility', 'none');
  //   } else {
  //     map.setLayoutProperty(offLayerId, 'visibility', 'visible');
  //
  //   }
  // };
