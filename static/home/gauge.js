var currentpos = 0;

var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    margin = 40,
    n = 10,
    radius = width/4  ,
    needleRad = 10,
    pi = Math.PI,
    halfPi = pi / 2,
    endAngle = pi / 2,
    startAngle = -endAngle,
    data = d3.range(startAngle, endAngle, pi / n),
    _data = data.slice(0),
    tt = 2000,
    scale = d3.scaleLinear().range([startAngle, endAngle]),
    colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([data[0], data[data.length - 1]]),
    svg = d3.select('#gauge')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0' + ' ' + '0' + ' ' + width + ' ' + Math.min(width,height))
        .attr('preserveAspectRatio', 'xMinYMin')
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + (Math.min(height, width)/1.5  - margin) + ')');
console.log(width, height);
_data.push(endAngle);

var arc = d3.arc()
    .innerRadius(radius - (radius / 5))
    .outerRadius(radius)
    .startAngle(function (d) { return d; })
    .endAngle(function (d, i) { return _data[i + 1]; });

var slice = svg.append('g').selectAll('path.slice').data(data);

slice
    .enter()
    .append('path')
    .attr('class', 'slice')
    .attr('d', arc)
    .attr('fill', function (d) { return colorScale(d); });

var needle = svg.append('g').append('path').attr('class', 'needle').attr('fill-opacity', .7).attr('stroke', 'black');
var text = svg.append('g').append('text').attr('class', 'text').attr('text-anchor', 'middle').attr('dy', '-0.45em').classed('monospace', true).style("font-size", "140%");

function updateGauge(oldValue, newValue) {
    currentpos = newValue;
    oldValue = scale(oldValue);
    newValue = scale(newValue);
    needle
        .datum({ oldValue: oldValue })
        .transition().duration(tt)
        .attrTween('d', lineTween(newValue));
    text
        .datum({ oldValue: oldValue })
        .transition().duration(tt)
        .attrTween('transform', transformTween(newValue))
        .tween('text', textTween(newValue));

}

function textTween(newValue) {
    return function (d) {

        var that = d3.select(this),
            i = d3.interpolate(d.oldValue, newValue);

        return function (t) {
            that.text(d3.format('.1%')(scale.invert(i(t))) + " placed");
        };
    };
}

function transformTween(newValue) {
    return function (d) {

        var interpolate = d3.interpolate(d.oldValue, newValue);

        return function (t) {
            var _in = interpolate(t) - halfPi,
                centerX = (radius + 20) * Math.cos(_in),
                centerY = (radius + 20) * Math.sin(_in);
            return 'translate(' + centerX + ',' + centerY + ')';
        };
    };
}

function lineTween(newValue) {
    return function (d) {

        var interpolate = d3.interpolate(d.oldValue, newValue);

        return function (t) {

            var _in = interpolate(t) - halfPi,
                _im = _in - halfPi,
                _ip = _in + halfPi;

            var topX = radius * Math.cos(_in),
                topY = radius * Math.sin(_in);

            var leftX = needleRad * Math.cos(_im),
                leftY = needleRad * Math.sin(_im);

            var rightX = needleRad * Math.cos(_ip),
                rightY = needleRad * Math.sin(_ip);

            return d3.line()([[topX, topY], [leftX, leftY], [rightX, rightY]]) + 'Z';
        };
    };
}
updateGauge(currentpos, btech_placed_frac);