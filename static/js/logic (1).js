// Function to determine marker size based on population
function markerSize(population) {
  return population / 50;
}

// An array containing all of the information needed to create city and state markers
var locations = [
  {
    coordinates: [34.048927, -111.093735],
    state: {
      name: "Arizona",
      population: 7278717,
      votes: 1000000
    },
    city: {
      name: "Phoenix",
      population: 1445632,
      votes: 1000000
    }
  },
  {
    coordinates: [33.247875, -83.441162],
    state: {
      name: "Georgia",
      population: 9544750,
    },
    city: {
      name: "Atlanta",
      population: 506811
    },
    votes: {
      name: "Trump",
      total: 1672143
    }
  },
  {
    coordinates: [44.500000, -89.500000],
    state: {
      name: "Wisconsin",
      population: 12671821
    },
    city: {
      name: "Milwaukee",
      population: 590157
    },
    votes: {
      name: "Trump",
      total: 1630866
    }
  },
  {
    coordinates: [41.203323, -77.194527],
    state: {
      name: "Pennsylvania",
      population: 12801989
    },
    city: {
      name: "Philadelphia",
      population: 1567442
    },
    votes: {
      name: "Trump",
      total: 3378263
    }
  },
  {
    coordinates: [44.182205, -84.506836],
    state: {
      name: "Michigan",
      population: 9987000
    },
    city: {
      name: "Detroit",
      population: 667272
    },
    votes: {
      name: "Trump",
      total: 2649852
    }
  }
];

// Define arrays to hold created city and state markers
var cityMarkers = [];
var stateMarkers = [];
var countyMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  stateMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.5,
      color: "white",
      fillColor: "white",
      radius: markerSize(locations[i].state.population)
    })
  );

  // Setting the marker radius for the city by passing population into the markerSize function
  cityMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: true,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].city.population)
    })
  );
  
  // countyMarkers.push(
  //   L.circle(locations[i].coordinates, {
  //     stroke: false,
  //     fillOpacity: 0.75,
  //     color: "red",
  //     fillColor: "red",
  //     radius: markerSize(locations[i].votes.total)
  //   })
  // );

}


// Create base layers

// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Create two separate layer groups: one for cities and one for states
var states = L.layerGroup(stateMarkers);
var cities = L.layerGroup(cityMarkers);
var votes = L.layerGroup(countyMarkers);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  "State Population": states,
  "City Population": cities,
  "Repulican Votes ": votes
};
//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Number of votes per County</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);
// Define a map object
var myMap = L.map("map2", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, states, cities, votes]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


// // Load in geojson data
// var geoData = "static/data/us-county-boundaries.geojson";
// var geojson;

// // Grab data with d3
// var votes = d3.json(geoData, function(data) {

//   // Create a new choropleth layer
//   geojson = L.choropleth(data, {

//     // Define what  property in the features to use
//     valueProperty: "votes",

//     // Set color scale
//     scale: ["white", "red"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "black",
//       weight: 1,
//       fillOpacity: 0.7
//     },

//     // Binding a pop-up to each layer
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("State: " + feature.properties.st + "<br>Votes:</br>" + feature.properties.votes + "<br>County:</br>" + feature.properties.name_prev);
//     }
//   }).addTo(myMap);

//   // // Add all vart to a new layer group.
//   // var cityMarkers = [];

//   // for (var i = 0; i < cities.length; i++) {
//   //   // loop through the cities array, create a new marker, push it to the cityMarkers array
//   //   cityMarkers.push(
//   //     L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
//   //   );
//   // }

//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Number of votes per County</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

//   //Defining baseMaps
// var baseMaps = {
//   "Street Map": streetmap,
//   "Dark Map": darkmap
// };

// var overlayMaps = {
//   "Votes": votes,
//   "State Population": states,
//   "City Population": cities
// };

//   // Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
// });

// countyMarkers.push(
//   L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
// )
