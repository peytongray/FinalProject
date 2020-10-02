var adsPromise = d3.csv("csv/reproductiveads.csv")

var successFCN = function(repads)
{
    console.log("repads",repads);
    initGraph(repads);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}


adsPromise.then(successFCN,failFCN);

//usdeaths is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawBars = function(usdeaths,target,graphDim,xScale,yScale)
{
  target.selectAll("rect")
        .data(usdeaths)
        .enter()
    .append("rect")
    .attr("x",function(repads)
         {
            return xscale(repads.year);
        })
         
    .attr("y",function(repads)
         {
            return yscale(repads.money);
        })
          .attr("width",xScale.bandwidth)
        .attr("height",function(year)
             {
                return graphDim.height-yScale(year.money)})
   .attr("fill", "red")
    
  var lines= d3.select("svg")
            .select("#graph")
            .selectAll("g")
            .data(usdeaths)
            .enter()
            .append("g")
            .classed("line",true)
            .attr("fill", "none")
            
  
  .on("mouseover", function(repads)
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
  
  .on("mouseleave",function(repads)
     {
        d3.select("#tooltip")
        .classed("hidden",true)
        d3.select(this)
        .classed("selected",false)
    }
   )

    lines.append("g")
     .datum(function(repads)
                {
                    //console.log("function")
                    return repads.money
                })
       //.attr("d", lineGenerator)
    
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graph,margins,
                         xScale,yScale)
{
   
  var xAxis= d3.axisBottom(xScale);
      var yAxis=d3.axisLeft(yScale);
  
  var axes= d3.select("#graph")
                .append("g")
  
  .call(xAxis)
  
  axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        
        .call(xAxis)
  
   axes.append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
      
        .call(yAxis)
        
 
}


//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
    var labels=d3.select("#graph")
        .append("g")
        .classed("labels",true)
    
        labels.append("text")
            .classed("title",true)
            .text("Amount Spent on Facebook Reproductive Rights Ads by 2020 Democratic Candidates")
            .attr("text-anchor","middle")
            .attr("x", margins.left+graphDim.width/2)
            .attr("y",margins.top-(10))
    
        labels.append("text")
            .classed("label",true)
            .text("Candidate")
            .attr("text-anchor", "middle")
            .attr("x", margins.left+graphDim.width/2)
            .attr("y", margins.top+(graphDim.height)+(30))
    
        labels.append("text")
            .attr("transform","translate(20,"+
                 (margins.top+
                ( graph.height/2))+")")
            .append("text")
            .classed("label",true)
            .text("Amount Spent")
            .attr("text-anchor","middle")
            .attr("transform","rotate(90)")
                  //translate (" +graphDim.height/2+ ",-5)")
    
    
}
        




//sets up several important variables and calls the functions for the visualization.
var initGraph = function(repads)
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
    
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#graph")
    .append("g")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
   // var maxDeaths = d3.max(usdeaths[0],
                       // function(quiz)
                        // {return quiz.day});
    
    var xScale = d3.scaleBand()
        .domain([1970,2020])
        .range([0,graph.width])

    var yScale = d3.scaleBand()
        .domain([0,50])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
   // drawBars(repads,target,graph,xScale,yScale);
    drawLabels(graph,margins);
   
}


