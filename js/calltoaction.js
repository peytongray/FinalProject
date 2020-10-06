var actionPromise = d3.csv("csv/abortionlaws.csv")

var successFunc = function(law)
{
    console.log("law",law);
    drawTableAction(law);
    //filterOnDeathRate(deathrate);
   sortOnDeathRate(law);
}

var failFunc = function(error)
{
    console.error("error",error)
}

console.log(actionPromise.then)
actionPromise.then (successFunc,failFunc)

var getCountryAction = function(country)
{
    return country.Country
}
var getStatusAction = function(status)
{
    return status.AbortionStatus
}
var getDrAction = function(death)
{
    return death.DeathRate
}

var getIconAction = function(status)
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

var drawTableAction = function(law)
{   var rows = d3.select("table tbody")
    .selectAll("tr")
    .data(law)
    .enter()
    .append ("tr")

 rows.append("td")
    .text(getCountryAction);
    
 rows.append("td")
     .append("i")
    .attr("class",getIconAction);
   
     rows.append("td")
     .text(getStatusAction)
 
    rows.append("td")
        .text(getDrAction)
    
   
    
}

/*var compareDeathRate = deathrate.filter(function(deathrate))
{ 
    if (deathrate > 10)
        {return 0}
    else if (deathrate < 11)
        {return -1}
    else {return 1}

}

var filterOnDeathRate = function(deathrate)
{   d3. select ("#deathrate")
    .on ("click", function() 
         {
            deathrate.filter(getDrAction)
           
            console.log("clicked")
            
            d3.select ("table thead")
            .selectAll ("*")
            .remove()
            drawTableAction(deathrate) 
        })

}
*/

var compareDeathRate = function(deathrate1, deathrate2)
{   console.log("deathrate1",deathrate1)
    console.log("deathrate2",deathrate2)
    if (deathrate1.DeathRate == deathrate2.DeathRate)
        {return 0}
    else if (deathrate1.DeathRate > deathrate2.DeathRate)
        {return -1}
    else {return 1}
}

var sortOnDeathRate = function(deathrate)
{   d3. select ("#deathrate")
    .on ("click", function() 
         {
            deathrate.sort(compareDeathRate)
           console.log("deathrate",deathrate)
            console.log("clicked")
            
            d3.select ("table tbody")
            .selectAll ("*")
            .remove()
          drawTableAction(deathrate) 
        })

}



