





var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75; //This is the size of the hole in the middle
var color = d3.scaleOrdinal()
  .domain(data1)
  .range(["#00dd00","#CC0000"])
// draw and append the container
var svg = d3.select("#donut").append("svg")
  .attr("width", width).attr("height", height);

// set the thickness of the inner and outer radii

// construct default pie laoyut
var pie = d3.pie().value(function(d){ return d; }).sort(null);
// construct arc generator
var arc = d3.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);
// creates the pie chart container
var g = svg.append('g')
var g = svg.append('g')
  .attr('transform', function(){
    if ( window.innerWidth >= 960 ) var shiftWidth = width / 2;
    if ( window.innerWidth < 960 ) var shiftWidth = width / 3;
    return 'translate(' + shiftWidth + ',' + height / 2 + ')';
  })
// generate random data
var data = Object.values(data1);
var div = d3.select("#donut").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

// enter data and draw pie chart
var path = g.datum(data).selectAll("path")
  .data(pie)
  .enter().append("path")
    .attr("class","piechart")
    
    
    .attr("fill", function(d,i){ return color(i); })
    .attr("d", arc)
    .each(function(d){ this._current = d; })
    .on('mouseover', function (d, i) {
          wait(100);
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          //Makes the new div appear on hover:
          div.transition()
               .duration(50)
               .style("opacity", 1);
          var cont;
          if(d.index==0){
            cont="Placed "+d.value;
          }
          else{
            cont="Not Placed "+d.value;
          }
          div.html(cont)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
     })
     .on('mouseout', function (d, i) {
          d3.select(this).transition()  
               .duration('50')
               .attr('opacity', '1');
          //Makes the new div disappear:
          div.transition()
               .duration('50')
               .style("opacity", 0);
     });

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}
function render(data){
  // generate new random data
  data = Object.values(data);
  console.log(data);
  // add transition to new path
  g.datum(data).selectAll("path").data(pie).transition().duration(600).attrTween("d", arcTween)
  // add any new paths
  g.datum(data).selectAll("path")
    .data(pie)
  .enter().append("path")
    .attr("class","piechart")
    .attr("fill", function(d,i){ return color(i); })
    .attr("d", arc)
    .each(function(d){ this._current = d; })
  // remove data not being used
  g.datum(data).selectAll("path")
    .data(pie).exit().remove();
    

}

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
} 
