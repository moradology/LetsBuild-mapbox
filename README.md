# LetsBuild-mapbox
Mapbox GL js

  Beginner for javascript/html/css. Try Mapbox GL.js and turf.js for the first time. All is fresh and new!

##Goal (part of the MUSA capstone final project)
  Build an online tool to convert footprint to 3D model. 
  This is a tool for anyone who wants to have a taste of being the architect, urban planner, realtor...
  !!!OR those who were fascinated by The SIMS game series in their childhoods! Just like me :).

##Process
  In this project, I first created a style in Mapbox Studio and import footprint.geojson (>5MB) by upload API Learn CLI then to upload the dataset).

  I add the footprint layer by uploading a filled pattern.And I intended to use the footprint to make a 3D building layer in the mapbox studio because the openstreetmap can only offer part of the buildings in Philly. 

  However, I found that in mapbox studio, I can not use the height in the dataset to fill in the height field (it can only be the fixed value). So I changed my strategy to add the 3D layer in my javascript.

  And since the height in the dataset is in feet, so I tried the exponential property-function without editing the original dataset.

##Result
  The final javasccript also uses mapbox geocoder, draw plugin and turf.js to simulate the real process when we try to plan the site and build the building.
