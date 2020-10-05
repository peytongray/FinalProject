

var successFCNus = function(usdeaths)
{
    console.log("usdeaths",usdeaths);
    initGraphUs(usdeaths);
    
}

var failFCNus = function(error)
{
    console.log("error",error);
}

var deathPromise = d3.csv("csv/usdeaths.csv")
deathPromise.then(successFCNus,failFCNus);

//usdeaths is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawLinesUs = function(usdeaths,target,
                         xScale,yScale)
{
   var lineGeneratorUs= d3.line()
        .x(function(usdeath)
          {
            return xScale(usdeath.year);
        })
        .y(function(usdeath)
          {
            return yScale(usdeath.deathnumber)
            })
  
    d3.select("#graph1")
    .select("#graph")
    .append("path")
       .datum(usdeaths)
       .attr("d", lineGeneratorUs)
    
}

var drawPlotUs = function(usdeaths,targetUs,
                         xScale,yScale)
{
   targetUs 
    .selectAll("circle")
    .data(usdeaths)
    .enter()
    .append("circle")
    .attr("cx",function(usdeath)
    {
        return xScale(usdeath.year);   
    })
    .attr("cy",function(usdeath)
    {
        return yScale(usdeath.deathnumber);    
    })
    .attr("r",3)
    

   .on("mouseenter" ,function(usdeaths)
      {
        console.log("usdeaths",usdeaths)
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#deathtt")
        .text(usdeaths.deathnumber);
        
        d3.select("#yeartt")
        .text(usdeaths.year);
      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
}

var makeTranslateStringUs = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxesUs = function(graphDim,margins,
                         xScale,yScale)
{
   
  var xAxis= d3.axisBottom(xScale)
  
  
    d3.select("#graph1")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
  var yAxis=d3.axisLeft(yScale)  
    d3.select("#graph1")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        
 
}


//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
var drawLabelsUs = function(graphDim,margins)
{
    var labels=d3.select("#graph1")
        .append("g")
        .classed("labels",true)
    
        labels.append("text")
            .classed("title",true)
            .text("United States Abortion Deaths from 1973 to 2015")
            .attr("text-anchor","middle")
            .attr("x", margins.left+graphDim.width/2)
            .attr("y",margins.top-(10))
    
        labels.append("text")
            .classed("label",true)
            .text("Year")
            .attr("text-anchor", "middle")
            .attr("x", margins.left+graphDim.width/2)
            .attr("y", margins.top+(graphDim.height)+(30))
    
        labels.append("text")
            .classed("label",true)
            .text("Number of Deaths")
            .attr("text-anchor","middle")
            .attr("transform","rotate(90),translate (" +graphDim.height/2+ ",-5)")
    
    
}
        




//sets up several important variables and calls the functions for the visualization.
var initGraphUs = function(usdeaths)
{
    //size of screen
    var screen = {width:700,height:600}
    //how much space on each side
    var margins = {left:50,right:20,top:40,bottom:50}
    
   
    
    var graphUs = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height/2 - margins.top-margins.bottom
        }
    console.log(graphUs);
    
    d3.select("#graph1")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var targetUs = d3.select("#graph1")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
   // var maxDeaths = d3.max(usdeaths[0],
                       // function(quiz)
                        // {return quiz.day});
    
    var xScale = d3.scaleLinear()
        .domain([1970,2020])
        .range([0,graphUs.width])

    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([graphUs.height,0])
    console.log(xScale(1970))
    drawAxesUs(graphUs,margins,xScale,yScale);
    drawLinesUs(usdeaths,targetUs,xScale,yScale);
    drawLabelsUs(graphUs,margins);
   drawPlotUs(usdeaths,targetUs,xScale,yScale)
}


