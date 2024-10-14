
var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
});

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

    createLegend();
}

function getColor(depth) {
    return depth > 90 ? '#bd0026' :
           depth > 70  ? '#fc4e2a' :
           depth > 50  ? '#fd8d3c' :
           depth > 30   ? '#fcfc03' :
           depth > 10   ? '#cafc03' :
            '#24fc03' ;
}
function createLegend() {
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
            depths = [-10,10, 30, 50, 70, 90],
            labels = [];

            for (var i = 0; i < depths.length; i++) {
                var color = getColor(depths[i] + 1);
                div.innerHTML +=
                    '<i style="background:' + color + '"></i> ' +
                    depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
            }
    

        div.style.backgroundColor = "white";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        return div;
    };

    legend.addTo(map);
}