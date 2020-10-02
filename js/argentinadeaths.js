var argPromise = d3.csv("csv/argentinadeaths.csv")

var successFCN = function(argdeaths)
{
    console.log("argdeaths",argdeaths);
    initGraph(argdeaths);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}


argPromise.then(successFCN,failFCN);

//usdeaths is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawLines = function(argdeaths,target,
                         xScale,yScale)
{
   var lineGenerator= d3.line()
        .x(function(argdeaths,i)
          {
            return xScale(i);
        })
        .y(function(argdeaths)
          {
            return yScale(argdeaths)
            })
   
  var lines= d3.select("#graph2")
            .select("#graph")
            .selectAll("g")
            .data(argdeaths)
            .enter()
            .append("g")
            .classed("line",true)
            .attr("fill", "none")
            
  
  .on("mouseover", function(argdeaths)
     {
            var xPos=d3.event.pageX;
            var yPos=d3.event.pageY;
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left", xPos+"px")
      
            d3.select(this)
            .classed("selected",true)
            .raise()
    }
     )
  
  .on("mouseleave",function(argdeaths)
     {
        d3.select("#tooltip")
        .classed("hidden",true)
        d3.select(this)
        .classed("selected",false)
    }
   )

    lines.append("path")
       .datum(function(argdeaths)
                {
                    //console.log("function")
                    return argdeaths
                })
       .attr("d", lineGenerator)
    
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
   
  var xAxis= d3.axisBottom(xScale)
  
  
    d3.select("svg")
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
var drawLabels = function(graphDim,margins)
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
var initGraph = function(argdeaths)
{
    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:50,right:20,top:40,bottom:50}
    
   
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#graph2")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
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
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,50])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    drawLines(argdeaths,target,xScale,yScale);
    drawLabels(graph,margins);
   
}


