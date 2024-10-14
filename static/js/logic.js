
 var map = L.map('map').setView([0, 0], 2);

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 18,
 }).addTo(map);

 let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

 d3.json(queryUrl).then(function (data) {
     createFeatures(data.features);
 });
createLegend()

 function createFeatures(earthquakeData) {
     earthquakeData.forEach(function (earthquake) {
        
         var magnitude = earthquake.properties.mag;
         var depth = earthquake.geometry.coordinates[2];

        
         var markerSize = magnitude * 3; 
         var markerColor = getColor(depth);

         var circleMarker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
             radius: markerSize,
             fillColor: markerColor,
             color: markerColor,
             weight: 1,
             opacity: 1,
             fillOpacity: 0.8
         }).addTo(map);
        
         circleMarker.bindPopup("<h3>Magnitude: " + magnitude + "</h3><hr><p>Location: " + earthquake.properties.place + "</p><p>Depth: " + depth + " km</p>");
    });
 }

 function getColor(depth) {
     return depth > 90 ? "#98ee00" :
            depth > 70  ? "#d4ee00" :
            depth > 50  ? "#eecc00" :
            depth > 30   ? "#ee9c00" :
            depth > 10   ? "#ea822c" :
             "#ea2c2c" ;
 }

    
function createLegend() {
     let legend = L.control({position: 'bottomright'});

     legend.onAdd = function () {
         let div = L.DomUtil.create('div', 'info legend');
         let depths = [-10,10, 30, 50, 70, 90];
         let colors = [
                 "#98ee00",
                 "#d4ee00",
                 "#eecc00",
                 "#ee9c00",
                 "#ea822c",
                 "#ea2c2c"];
        
         for (let i = 0; i < depths.length; i++) {
             div.innerHTML += "<i style='background: "
                 + colors[i]
                 + "'></i> "
                 + depths[I]
                + (depths[I + 1] ? "&ndash;" + depths[I + 1] + "<br>" : "+");
             }
             return div;
        };
    

div.style.backgroundColor = "white";
div.style.padding = "10px";
div.style.borderRadius = "5px";
return div;
};

legend.addTo(map);


// // We create the tile layer that will be the background of our map.
// console.log("Step 1 working");

// // We create the tile layer that will be the background of our map.
// let basemap = L.tileLayer(
//   "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
//   {
//     attribution:
//       'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
//   });


// // We create the map object with options.
// let map = L.map("map", {
//   center: [
//     40.7, -94.5
//   ],
//   zoom: 3
// });

// // Then we add our 'basemap' tile layer to the map.
// basemap.addTo(map);

// // Here we make an AJAX call that retrieves our earthquake geoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

//     // This function returns the style data for each of the earthquakes we plot on
//     // the map. We pass the magnitude of the earthquake into two separate functions
//     // to calculate the color and radius.
//     function styleInfo(feature) {
//       return {
//         opacity: 1,
//         fillOpacity: 1,
//         fillColor: getColor(feature.geometry.coordinates[2]),
//         color: "#000000",
//         radius: getRadius(feature.properties.mag),
//         stroke: true,
//         weight: 0.5
//       };
//     }
// // This function determines the color of the marker based on the magnitude of the earthquake.
// function getColor(depth) {
//     switch (true) {
//       case depth > 90:
//         return "#ea2c2c";
//       case depth > 70:
//         return "#ea822c";
//       case depth > 50:
//         return "#ee9c00";
//       case depth > 30:
//         return "#eecc00";
//       case depth > 10:
//         return "#d4ee00";
//       default:
//         return "#98ee00";
//     }
//   }

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }

//     return magnitude * 4;
//   }
//   // Here we add a GeoJSON layer to the map once the file is loaded.
//   L.geoJson(data, {
//     // We turn each feature into a circleMarker on the map.
//     pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng);
//     },
//     // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo,
//     // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
//     onEachFeature: function (feature, layer) {
//       layer.bindPopup(
//         "Magnitude: "
//         + feature.properties.mag
//         + "<br>Depth: "
//         + feature.geometry.coordinates[2]
//         + "<br>Location: "
//         + feature.properties.place
//       );
//     }
//   }).addTo(map);
//   // Here we create a legend control object.
//   let legend = L.control({
//     position: "bottomright"
//   });

//   // Then add all the details for the legend
//   legend.onAdd = function () {
//     let div = L.DomUtil.create("div", "info legend");

//     let grades = [-10, 10, 30, 50, 70, 90];
//     let colors = [
//       "#98ee00",
//       "#d4ee00",
//       "#eecc00",
//       "#ee9c00",
//       "#ea822c",
//       "#ea2c2c"
//     ];

//     // Looping through our intervals to generate a label with a colored square for each interval.
//     for (let i = 0; i < grades.length; i++) {
//       div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
//         + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }
//     return div;
//   };

//   // Finally, we our legend to the map.
//   legend.addTo(map);
// });