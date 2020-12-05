// Initializes the page with a default plot
function init() {

  data = [{
    x: ["TOT", "AZ", "GA", "MI", "PA", "WI"],
    y: [25.98, 54.59, 16.36, 16.24, 34.18, 38.01] }];
    
  var CHART = d3.selectAll("#plot").node();

  Plotly.newPlot(CHART, data);
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;

  var CHART = d3.selectAll("#plot").node();

  // Initialize x and y arrays
  var x = [];
  var y = [];

  switch(dataset) {
    case "dataset1":
      x = ["TOT", "AZ", "GA", "MI", "PA", "WI"];
      y = [25.98, 54.59, 16.36, 16.24, 34.18, 38.01];
      break;

    case "dataset2":
      x = ["TOT", "AZ", "GA", "MI", "PA", "WI"];
      y = [19.44, 55.34, 2.21, 2.28, 18.70, 38.67];
      break;

    case "dataset3":
      x = ["TOT", "AZ", "GA", "MI", "PA", "WI"];
      y = [26.46, 55.54, 30.84, 30.21, 0.0, 38.67];
      break;

    default:
      x = ["TOT", "AZ", "GA", "MI", "PA", "WI"];
      y = [25.98, 54.59, 16.36, 16.24, 34.18, 38.01];
      break;
  }


  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle(CHART, "x", [x]);
  Plotly.restyle(CHART, "y", [y]);
}

init();

//["TOT", "AZ", "GA", "MI", "PA", "WI"];
//[1, 2, 3, 4, 5, 6];
