var fetchBus = function(e) {
  $.ajax("https://cors-anywhere.herokuapp.com/http://www3.septa.org/hackathon/TransitViewAll/")
  .done(function(data){
    var coordsList = [];
    _.each(data, function(datum){
      _.each(datum, function(datum){
        _.each(datum, function(datum){
          _.each(datum, function(datum){
            //console.log(datum.lng);
            coordsList.push([datum.lng, datum.lat]);
            //console.log([datum.lng, datum.lat]);
          });
        });
      });
    });
    map.setCenter(coordsList[5]);
    console.log(coordsList);
    var ptsets = turf.multiPoint(coordsList);
    //var ptsets = turf.multiPoint(coordsList);
    console.log(ptsets);
    map.getSource('ppp').setData(
      ptsets
    );
    map.addLayer({
      "id": "ppp",
      "source": "ppp",
      "type": "circle",
      "paint": {
          "circle-radius": 50,
          "circle-color": "#f0f"
      }
    });

    //console.log(coordsList);
  });
  console.log("hi");
};

map.on('load', function () {
  map.addSource('ppp', { type: 'geojson', data: "" });

  window.setInterval(function(){
    fetchBus();
  }, 10000);


});
