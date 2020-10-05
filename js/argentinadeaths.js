var argPromise = d3.csv("csv/argentinadeaths.csv")

var successFCNarg = function(argdeaths)
{
    console.log("argdeaths",argdeaths);
    initGraphArg(argdeaths);
    
}

var failFCNarg = function(error)
{
    console.log("error",error);
}


argPromise.then(successFCNarg,failFCNarg);

//usdeaths is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawLinesArg = function(argdeaths,target,
                         xScale,yScale)
{
   var lineGeneratorArg= d3.line()
        .x(function(argdeath)
          {
            return xScale(argdeath.year);
        })
        .y(function(argdeath)
          {
            return yScale(argdeath.deaths)
            })
  

   d3.select("#graph2")
    .select("#graph") 
   .append("path")
       .datum(argdeaths)
       .attr("d", lineGeneratorArg)
    
}

var drawPlotArg = function(argdeaths,targetArg,
                         xScale,yScale)
{
   targetArg 
    .selectAll("circle")
    .data(argdeaths)
    .enter()
    .append("circle")
    .attr("cx",function(argdeath)
    {
        return xScale(argdeath.year);   
    })
    .attr("cy",function(argdeath)
    {
        return yScale(argdeath.deaths);    
    })
    .attr("r",3)
    
  
   .on("mouseenter" ,function(argdeaths)
      {
        console.log("argdeaths",argdeaths)
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#deathtt")
        .text(argdeaths.deaths);
        
        d3.select("#yeartt")
        .text(argdeaths.year);
      })//tool tip off
   
.on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
}

var makeTranslateStringArg = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxesArg = function(graphDim,margins,
                         xScale,yScale)
{
   
  var xAxis= d3.axisBottom(xScale)
  
  
    d3.select("#graph2")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
  var yAxis=d3.axisLeft(yScale)  
    d3.select("#graph2")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
        
 
}


//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
var drawLabelsArg = function(graphDim,margins)
{
    var labels=d3.select("#graph2")
        .append("g")
        .classed("labels",true)
    
        labels.append("text")
            .classed("title",true)
            .text("Argentina Abortion Deaths from 2005 to 2018")
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
var initGraphArg = function(argdeaths)
{
    //size of screen
    var screen = {width:700,height:600}
    //how much space on each side
    var margins = {left:50,right:20,top:40,bottom:50}
    
   
    
    var graphArg = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height/2 - margins.top-margins.bottom
        }
    console.log(graphArg);
    
    d3.select("#graph2")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var targetArg = d3.select("#graph2")
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
        .range([0,graphArg.width])

    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([graphArg.height,0])
    
    drawAxesArg(graphArg,margins,xScale,yScale);
    drawLinesArg(argdeaths,targetArg,xScale,yScale);
    drawLabelsArg(graphArg,margins);
    drawPlotArg(argdeaths,targetArg,xScale,yScale);
   
}

