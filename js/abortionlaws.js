var lawPromise = d3.csv("csv/countryabortionlaws.csv")

var successFcn = function(law)
{
    console.log("law",law);
    drawTable(law);
    sortOngetStatus(law);
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


var drawTable = function(law)
{   var rows = d3.select("table thead")
    .selectAll("tr")
    .data(law)
    .enter()
    .append ("tr")

 rows.append("td")
    .text(getCountry);
    
     rows.append("td")
    .text(getStatus);
    
}

var sortOngetStatus = function(law)
{   d3. select ("#abortionlaw")
    .on("click", function() 
         {
            law.sort(getStatus)
           
            console.log("clicked")
            
            d3.select ("table thead")
            .selectAll ("*")
            .remove()
            drawTable(law) 
        })

}
