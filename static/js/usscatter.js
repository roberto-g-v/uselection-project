/** *********************************************************
Demographics and Coronavirus variables vs US Elections
********************************************************** */

// Code for Chart is Wrapped Inside a Function That Automatically Resizes the Chart
function makeResponsive() {

  /* Select SVG area dimensions: 
  If SVG Area is not empty when browser loads, 
  Remove & Replace with a resized version of the chart */
      
      var svgArea = d3.select("body").select("svg");
    
      // Clear SVG is Not Empty
      if (!svgArea.empty()) {
        svgArea.remove();
      }
      
      // Setup Chart SVG Parameters/Dimensions
  
      // var svgWidth = 980;
      // var svgHeight = 600;
  
      var svgHeight = window.innerHeight * 0.8;
      var svgWidth = window.innerWidth * 0.6;
    
      // Set SVG Margins
      var margin = {
        top: 10,
        right: 30,
        bottom: 115,
        left: 90
      };
    
      // Define Dimensions of the Chart Area
      var width = svgWidth - margin.left - margin.right;
      var height = svgHeight - margin.top - margin.bottom;
    
      /* Create an SVG Element/Wrapper -  Select Body id scatter placeholder,
       Append to SVG area & set the SVG attributes */
      var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
      /* Append group element & Set group attribute margins using 
      Shift Transform - Translate by left and top Margins */
      var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
      // Initial Params
      var chosenXAxis = "Poverty";
      var chosenYAxis = "percentage20_Donald_Trump";
    
      /* X-SCALE: Function for updating xScale upon click on x-Axis label */
      function xScale(demoData, chosenXAxis) {
        // Create Scale Functions for the Chart (chosenXAxis)
        var xLinearScale = d3.scaleLinear()
          .domain([d3.min(demoData, d => d[chosenXAxis]) * 0.9, //from 0.8 to 0.9 adjust x line to starts on 10 in Poverty
            d3.max(demoData, d => d[chosenXAxis]) * 1.1 //from 1.2 to 1.1 adjust y line to end on 22
          ])
          .range([0, width]);
        return xLinearScale;
      }
    
      /* Y-SCALE: Function for Updating yScale Upon Click on y-Axis Label */
      function yScale(demoData, chosenYAxis) {
        // Create Scale Functions for the Chart (chosenYAxis)
        var yLinearScale = d3.scaleLinear()
          .domain([d3.min(demoData, d => d[chosenYAxis]) * 0.9, //from 0.8 to 0.9 adjust y line to starts on 6
            d3.max(demoData, d => d[chosenYAxis]) * 1.1 // from 1.2 to 1.1 adjust y line to end on 26
          ])
          .range([height, 0]);
        return yLinearScale;
      }
    
      /* X-AXIS update: Function for Updating xAxis var upon 
      click on axis label */
      function renderXAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);
        xAxis.transition()
          .duration(1000)
          .call(bottomAxis);
        return xAxis;
      }
    
      /* Y-AXIS update: Function for Updating yAxis var upon
       click on axis label */
      function renderYAxes(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);
        yAxis.transition()
          .duration(1000)
          .call(leftAxis);
        return yAxis;
      }
    
      /* X-Y CIRCLES GROUP: Function for updating circles group 
      with a Transition to new circles */
      function renderCircles(circlesGroup, newXScale, chosenXAxis, 
          newYScale, chosenYAxis) {
    
        circlesGroup.transition()
          .duration(1000)
          .attr("cx", d => newXScale(d[chosenXAxis]))
          .attr("cy", d => newYScale(d[chosenYAxis]));
        return circlesGroup;
      }
    
      /* X-Y CIRCLES GROUP FILL LABELS:Function for updating Label Text 
      group with a Transition to new text */
      function renderText(textGroup, newXScale, chosenXAxis, 
          newYScale, chosenYAxis) {
    
        textGroup.transition()
          .duration(1000)
          .attr("x", d => newXScale(d[chosenXAxis]))
          .attr("y", d => newYScale(d[chosenYAxis]))
          .attr("text-anchor", "middle")
          .attr("alignement-baseline", "central" );
         
       
    
        return textGroup;
      }
    
      // Function for Updating Circles Group with New Tooltip
      function updateToolTip(chosenXAxis, chosenYAxis, 
          circlesGroup, textGroup) {
      
           //Conditional for XAxis
        if (chosenXAxis === "Poverty") {
          var xLabel = "Poverty (%)";
        }
        else if (chosenXAxis === "Unemployment") {
          var xLabel = "Unemployment (%)";
        }
        else if (chosenXAxis === "percentage_deaths") {
          var xLabel = "Coronavirus deaths (%)";
        }
        else {
          var xLabel = "Income Per Capita (Median)";
        }
         
          //Conditional for YAxis
        if (chosenYAxis === "percentage20_Donald_Trump") {
          var yLabel = "Votes20 DTrump (%)";
        }
        /*****else if (chosenYAxis === "obesity") {
          var yLabel = "Obesity (%)";
        }******/
        else {
          var yLabel = "Votes20 JBiden (%)";
        }
    

  /** *********************************************************
  2.Animate the transitions for your circles' locations as well as the range of your axes. 
  3.Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.
  -Hint: Try binding all of the CSV data to your circles. This will let you easily determine their }
  x or y values when you click the labels.
  
  3. Incorporate d3-tip
  -While the ticks on the axes allow us to infer approximate values for each circle, it's impossible 
  to determine the true value without adding another layer of data.
  -Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data 
  when the user hovers their cursor over the element. 
  -Add tooltips to your circles and display each tooltip with the data that the user has selected.
  -Use the d3-tip.js plugin developed by Justin Palmer—we've already included this plugin in your assignment directory.
  -Check out David Gotz's example to see how you should implement tooltips with d3-tip.
  ********************************************************** */
  
  
  
  
        // Initialize Tool Tip = TEXT LABEL MOUSEOVER
        var toolTip = d3.tip()
          .attr("class", "tooltip d3-tip")
          .offset([90, 90])
          .html(function(d) {
            return (`<strong>${d.county}</strong>
              <br>${xLabel} ${d[chosenXAxis]}
              <br>${yLabel} ${d[chosenYAxis]}`);
          });
        // Create circles Tooltip in the chart
        circlesGroup.call(toolTip);
        /* CIRCLE SHOW-HIDE EVENT LISTENER:Create Event Listeners 
        to display and hide the Circles Tooltip */
        circlesGroup.on("mouseover", function(data) {
          toolTip.show(data, this);
        })
          // onmouseout event
          .on("mouseout", function(data) {
            toolTip.hide(data);
          });
        /* CIRCLE TEXT EVENT LISTENER: Create Text Tooltip in the Chart */
        textGroup.call(toolTip);
        // Create Event Listeners to Display and Hide the Text Tooltip
        textGroup.on("mouseover", function(data) {
          toolTip.show(data, this);
        })
          // onmouseout Event
          .on("mouseout", function(data) {
            toolTip.hide(data);
          });
        return circlesGroup;
      }
    
      /* DATA FUNCTIONS: Import and Retrieve Data from the data.csv file & execute
       Everything Below */
      const url = "/api/votes";

      d3.json(url)
        .then(function(demoData, err) {
            if (err) throw err;
  
        // Format/Parse the Data (convert data as Numbers)
        demoData.forEach(function(data) {
          data.Poverty = +data.Poverty;
          data.Unemployment = +data.Unemployment;
          data.percentage_deaths = +data.percentage_deaths
          data.IncomePerCap = +data.IncomePerCap;
          data.percentage20_Donald_Trump = +data.percentage20_Donald_Trump;
          data.percentage20_Joe_Biden = +data.percentage20_Joe_Biden;
        });
    
        /* FUNCTION X-Y LINEAR SCALE: Create xLinearScale & yLinearScale 
        Functions for the Chart */
        var xLinearScale  = xScale(demoData, chosenXAxis);
        var yLinearScale = yScale(demoData, chosenYAxis);
    
        // Create Axis Functions for the Chart
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);
    
  
        //APPENDING X-Y AXIS TO THE CHART
        // Append xAxis to the Chart
        var xAxis = chartGroup.append("g")
          .classed("x-axis", true)
          .attr("transform", `translate(0, ${height})`)
          .call(bottomAxis);
    
        // Append yAxis to the Chart
        var yAxis = chartGroup.append("g")
          .classed("y-axis", true)
          .call(leftAxis);
    
  
        var color = d3.scaleOrdinal()
          .domain(["AZ", "GA", "MI", "WI","PA" ])
          .range([ "#900aa1", "#21908dff", "#41090c","#05155c", "#dd4a1e"])

              //APPENDING CIRCLES TO THE CHART  
        // Create & Append Initial Circles
        var circlesGroup = chartGroup.selectAll(".stateCircle")
          .data(demoData)
          .enter()
          .append("circle")
          .attr("cx", d => xLinearScale(d[chosenXAxis]))
          .attr("cy", d => yLinearScale(d[chosenYAxis]))
          .style("fill", function (d) { return color(d.state)} )
          .attr("class", "stateCircle")
          .attr("r", 12) // circle size
          .attr("opacity", ".75");
          /****.style("fill", function (d) { return color(d.county) } )****/
          /****.attr("fill", function(d) {
            return "rgb("+d[chosenXAxis]+","+d[chosenYAxis]+",0)"
          });*****/

          
          
              
        // Append Text abbreviations to Circles
        var textGroup = chartGroup.selectAll(".stateText")
          .data(demoData)
          .enter()
          .append("text")
          .attr("x", d => xLinearScale(d[chosenXAxis]))
          .attr("y", d => yLinearScale(d[chosenYAxis]*.99)) //Center texts abbr inside the circle
          .text(d => (d.state))
          .attr("class", "stateText")
          .attr("font-size", "13px")
          .attr("text-anchor", "middle")
          .attr("alignement-baseline", "central" )
          .attr("fill", "white");
  
  
  
              //CREATE X-Y GROUPS FOR 3 AXIS LABELS
        // X GROUP: Create xAxis-Label Group 
        var xLabelsGroup = chartGroup.append("g")
          .attr("transform", `translate(${width / 2}, ${height + 20})`);
        // Append xAxis
        var povertyLabel = xLabelsGroup.append("text")
          .attr("x", 0)
          .attr("y", 20)
          .attr("value", "Poverty") // Value to Grab for Event Listener
          .classed("active", true)
          .text("Poverty (%)");
    
        var unemploymentLabel = xLabelsGroup.append("text")
          .attr("x", 0)
          .attr("y", 40)
          .attr("value", "Unemployment") // Value to Grab for Event Listener
          .classed("inactive", true)
          .text("Unemployment (%)");
    
        var coronaLabel = xLabelsGroup.append("text")
          .attr("x", 0)
          .attr("y", 60)
          .attr("value", "percentage_deaths") // Value to Grab for Event Listener
          .classed("inactive", true)
          .text("Coronavirus deaths (%)");


        var incomeLabel = xLabelsGroup.append("text")
          .attr("x", 0)
          .attr("y", 80)
          .attr("value", "IncomePerCap") // Value to Grab for Event Listener
          .classed("inactive", true)
          .text("Income Per Capita (Median)");
    
        // Y GROUP: Create yAxis-Label Group 
        var yLabelsGroup = chartGroup.append("g")
          .attr("transform", `translate(-25, ${height / 2})`);
        // Append yAxis
        var votesDTLabel = yLabelsGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -30)
          .attr("x", 0)
          .attr("value", "percentage20_Donald_Trump")
          .attr("dy", "1em")
          .classed("axis-text", true)
          .classed("active", true)
          .text("Votes20 DTrump (%)");
    
           
        var votesJBLabel = yLabelsGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -70)
          .attr("x", 0)
          .attr("value", "percentage20_Joe_Biden")
          .attr("dy", "1em")
          .classed("axis-text", true)
          .classed("inactive", true)
          .text("Votes20 JBiden (%)");
  
              //TOOL TIP
        // updateToolTip Function
        var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, 
          circlesGroup, textGroup);
              
              //EVENT LISTENER
        // xAxis Labels Event Listener
        xLabelsGroup.selectAll("text")
          .on("click", function() {
            // Get Value of Selection
            var value = d3.select(this).attr("value");
  
            if (value !== chosenXAxis) {
              // Replaces chosenXAxis with Value
              chosenXAxis = value;
              // Updates xScale for New Data
              xLinearScale = xScale(demoData, chosenXAxis);
              //console.log(chosenXAxis, chosenYAxis)
  
              // Updates xAxis with Transition
              xAxis = renderXAxes(xLinearScale, xAxis);
  
              // Updates Circles with New Values
              circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis,
                   yLinearScale, chosenYAxis);
              // Updates Text with New Values
              textGroup = renderText(textGroup, xLinearScale, chosenXAxis, 
                  yLinearScale, chosenYAxis)
              // Updates Tooltips with New Information
              circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, 
                  circlesGroup, textGroup);
              // Changes Classes to Change Bold Text
              if (chosenXAxis === "Poverty") {
                povertyLabel
                  .classed("active", true)
                  .classed("inactive", false);
                unemploymentLabel
                  .classed("active", false)
                  .classed("inactive", true);
                coronaLabel
                  .classed("active", false)
                  .classed("inactive", true);  
                incomeLabel
                  .classed("active", false)
                  .classed("inactive", true);
              }
              else if (chosenXAxis === "Unemployment") {
                povertyLabel
                  .classed("active", false)
                  .classed("inactive", true);
                unemploymentLabel
                  .classed("active", true)
                  .classed("inactive", false);
                coronaLabel
                  .classed("active", false)
                  .classed("inactive", true);  
                incomeLabel
                  .classed("active", false)
                  .classed("inactive", true);
              }
              else if (chosenXAxis === "percentage_deaths") {
                povertyLabel
                  .classed("active", false)
                  .classed("inactive", true);
                unemploymentLabel
                  .classed("active", false)
                  .classed("inactive", true);
                coronaLabel
                  .classed("active", true)
                  .classed("inactive", false);
                incomeLabel
                  .classed("active", false)
                  .classed("inactive", true);
              }
              else {
                povertyLabel
                  .classed("active", false)
                  .classed("inactive", true);
                unemploymentLabel
                  .classed("active", false)
                  .classed("inactive", true);
                coronaLabel
                  .classed("active", false)
                  .classed("inactive", true);                  
                incomeLabel
                  .classed("active", true)
                  .classed("inactive", false);
              }
            }
          });
        
          // yAxis Labels Event Listener
        yLabelsGroup.selectAll("text")
          .on("click", function() {
            // Get Value of Selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {
              // Replaces chosenYAxis with Value
              chosenYAxis = value;
              // Updates yScale for New Data
              yLinearScale = yScale(demoData, chosenYAxis);
              //console.log(chosenXAxis, chosenYAxis)
  
              // Updates yAxis with Transition
              yAxis = renderYAxes(yLinearScale, yAxis);
  
              // Updates Circles with New Values
              circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, 
                  yLinearScale, chosenYAxis);
              // Updates Text with New Values
              textGroup = renderText(textGroup, xLinearScale, chosenXAxis,
                   yLinearScale, chosenYAxis)
              // Updates Tooltips with New Information
              circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, 
                  circlesGroup, textGroup);
              // Changes Classes to Change Bold Text
              if (chosenYAxis === "percentage20_Donald_Trump") {
                votesDTLabel
                  .classed("active", true)
                  .classed("inactive", false);
                /*smokesLabel
                  .classed("active", false)
                  .classed("inactive", true);*/
                votesJBLabel
                  .classed("active", false)
                  .classed("inactive", true);
              }
             

              else {
                votesDTLabel
                  .classed("active", false)
                  .classed("inactive", true);
                /*smokesLabel
                  .classed("active", false)
                  .classed("inactive", true);*/
                votesJBLabel
                  .classed("active", true)
                  .classed("inactive", false);
              }
            }
          });
      });
    }
  
  
    // When Browser Loads, makeResponsive() is Called
    makeResponsive();
    
    // When Browser Window is Resized, makeResponsive() is Called
    d3.select(window).on("resize", makeResponsive);
