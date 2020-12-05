
/* DATA FUNCTIONS: Import and Retrieve Data from the data.csv file & execute
Everything Below */
const url = "http://127.0.0.1:5000/api/votesTot";

d3.json(url)
  .then(function(demoData, err) {
      if (err) throw err;
  
// Format/Parse the Data (convert data as Numbers)
    demoData.forEach(function(data) {
      data.total_votes16 = +data.total_votes16;
      data.total_votes20 = +data.total_votes20;
      data.votes16_Donald_Trump = +data.votes16_Donald_Trump;
      data.votes20_Donald_Trump = +data.votes20_Donald_Trump;
      data.votes16_Hillary_Clinton = +data.votes16_Hillary_Clinton;
      data.votes20_Joe_Biden = +data.votes20_Joe_Biden;
      data.percentage16_Donald_Trump = +data.percentage16_Donald_Trump;
      data.percentage16_Hillary_Clinton = +data.percentage16_Hillary_Clinton;
      data.percentage20_Donald_Trump = +data.percentage20_Donald_Trump;
      data.percentage20_Joe_Biden = +data.percentage20_Joe_Biden;
 

  });   

  //console.log(demoData)
 
   //TRACE TOTAL VOTES
// Trace1 for Total Votes Data
/*En los traces se quitan los brackets porque al final se debe pasar un objeto json {} en vez de un array [] para cada trace */
var trace1 = 
{
x: demoData.map(row => row.state),
y: demoData.map(row => row.total_votes16),
text: demoData.map(row => row.state),
marker: {
  color: 'rgb(29,240,170)'},
name: "TotalVotes 16",
type: "bar"


};

console.log(trace1)


// Trace 2 for Totla Votes Data
var trace2 = {
x: demoData.map(row => row.state),
y: demoData.map(row => row.total_votes20),
text: demoData.map(row => row.state),
marker: {
  color: 'rgb(24,209,24)'},
name: "TotalVotes 20",
type: "bar"
};


// Combining both traces
var bar_data = [trace1,trace2];


// Apply the group barmode to the layout
var barlayout={
title: " Total votes Republicans & Democrats 2016 vs 2020",
barmode: "group",
xaxis:{title:"State name", automargin:true},
yaxis: {title: "Millon Votes"}
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot0", bar_data, barlayout);

  
//=================================================================================

  //TRACE REPUBLICANS
// Trace1 for the Republicans Data
var trace1 = 
  {
  x: demoData.map(row => row.state),
  y: demoData.map(row => row.votes16_Donald_Trump),
  text: demoData.map(row => row.state),
  marker: {
    color: 'rgb(242,164,30'},
  name: "RepVotes 16",
  type: "bar"
};
  console.log(trace1)
  

// Trace 2 for the Republicans Data
var trace2 = {
  x: demoData.map(row => row.state),
  y: demoData.map(row => row.votes20_Donald_Trump),
  text: demoData.map(row => row.state),
  marker: {
    color: 'rgb(199,20,20)'},
  name: "RepVotes 20",
  type: "bar"
};

 
// Combining both traces
var bar_data = [trace1,trace2];

// Apply the group barmode to the layout
var barlayout={
  title: "Republicans 2016 vs 2020",
  barmode: "group",
  xaxis:{title:"State name", automargin:true},
  yaxis: {title: "Million Votes"}
};

 
// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot1", bar_data, barlayout);

  

//=================================================================================


 //TRACE DEMOCRATS

// Trace1 for the Democrats Data
var trace1 = 
  {
  x: demoData.map(row => row.state),
  y: demoData.map(row => row.votes16_Hillary_Clinton),
  text: demoData.map(row => row.state),

  name: "DemVotes 16",
  type: "bar"
};
  console.log(trace1)
  

// Trace 2 for the Republicans Data
var trace2 = {
  x: demoData.map(row => row.state),
  y: demoData.map(row => row.votes20_Joe_Biden),
  text: demoData.map(row => row.state),
  marker: {
  color: 'rgb(8,48,107)'},
  name: "DemVotes 20",
  type: "bar"
};

 
// Combining both traces
var bar_data = [trace1,trace2];

// Apply the group barmode to the layout
var barlayout={
  title: "Democrats 2016 vs 2020",
  barmode: "group",
  xaxis:{title:"State name", automargin:true},
  yaxis: {title: "Million Votes"}
};

 
// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot2", bar_data, barlayout);



});



