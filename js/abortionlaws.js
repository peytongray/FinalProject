var lawPromise = d3.csv("csv/countryabortionlaws.csv")

var successFcn = function(law)
{
    console.log("law",law);
    drawTable(law);
   //sortOnLaw(law);
}

var failFcn = function(error)
{
    console.error("error",error)
}

console.log(lawPromise.then)
lawPromise.then (successFcn,failFcn)

var getCountry = function(country)
{
    return country.Country
}
var getStatus = function(status)
{
    return status.AbortionStatus
}

var getIcon = function(status)
{
    if (status.AbortionStatus == "Prohibited Altogether")
    {
        return "fa fa-close"
    }
        if (status.AbortionStatus == "No restriction as to reason")
    {
        return "fa fa-check"
    }
        if (status.AbortionStatus == "Socioeconomic grounds")
    {
        return "fa fa-money"
    }
        if (status.AbortionStatus == "To save a woman's life")
    {
        return "fa fa-female"
    }
        if (status.AbortionStatus == "Save life/preserve physical health")
    {
        return "fa fa-heartbeat"
    }
        if (status.AbortionStatus == "Preserve physical/mental health")
    {
        return "fa fa-meh-o"
    }
}

var drawTable = function(law)
{   var rows = d3.select("table thead")
    .selectAll("tr")
    .data(law)
    .enter()
    .append ("tr")

 rows.append("td")
    .text(getCountry);
    
 rows.append("td")
     .append("i")
    .attr("class",getIcon);
   
     rows.append("td")
     .text(getStatus)
    
   
    
}
/*
var compareLaws = function(law1, law2)
{   console.log("law1",law1)
    console.log("law2",law2)
    if (law1.Law == law2.Law)
        {return 0}
    else if (law1.Law > law2.Law)
        {return -1}
    else {return 1}
}

var sortOnLaw = function(law)
{   d3. select ("#abortionlaw")
    .on ("click", function() 
         {
            law.sort(compareLaws)
           console.log("law",law)
            console.log("clicked")
            
            d3.select ("table tbody")
            .selectAll ("*")
            .remove()
          drawTable(law) 
        })
*/