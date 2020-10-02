var adPromise = d3.csv("csv/reproductiveads.csv")

var successFcn = function(ads)
{
    console.log("ads",ads);
    drawLabels(ads)
}

var failFcn = function(error)
{
    console.error("error",error)
}

console.log(adPromise.then)
adPromise.then (successFcn,failFcn)

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("csv/reproductiveads.csv", function(data) {

  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.price; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0)  ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#0000ff")

});



//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
//var drawLabels = function(graphDim,margins)

{
   var labels=d3.select("svg")
        .append("g")
        .classed("labels",true)
    
        labels.append("text")
            .classed("title",true)
            .text("Amount Spent on Facebook Reproductive Rights Ads by 2020 Democratic Candidates")
            .attr("text-anchor","middle")
            .attr("x", margin.left+width/2)
            .attr("y",margin.top-(20))
    
        labels.append("text")
            .classed("label",true)
            .text("Candidate")
            .attr("text-anchor", "middle")
          .attr("x", margin.left+width/2)
            .attr("y", margin.top+(height)+(30))
    
        labels.append("text")
            .classed("label",true)
            .text("Amount Spent")
            .attr("text-anchor","middle")
            .attr("transform","rotate(90),translate (" +height/2+ ",-5)")
    
    
}
        

