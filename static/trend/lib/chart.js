(function (){
  var VIZ = {};
  var margin = {top: 20, right: 55, bottom: 30, left: 80},
      width  = 700 - margin.left - margin.right,
      height = 300  - margin.top  - margin.bottom;



  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .rangeRound([height, 0]);

  /*var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
  */
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom").tickFormat(function (d) {
        return d.split("-").reverse().join("-");
    });

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var color = d3.scale.ordinal()
      .range(["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"]);

  var svg = d3.select("#chart").append("svg")
      .attr("id", "thesvg")
      .attr("width", "600px")
      .attr("height", "450px")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  VIZ.stackChart = function (data, offset) {

    //offset = 'zero';	

    var stack = d3.layout.stack()
        .values(function (d) { return d.values; })
        .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
        .y(function (d) { return d.value; });

    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
        .y0(function (d) { return y(d.y0); })
        .y1(function (d) { return y(d.y0 + d.y); });

    //var labelVar = 'quarter';
    var labelVar = 'date';
    var varNames = d3.keys(data[0])
        .filter(function (key) { return key !== labelVar;});
    color.domain(varNames);

    var seriesArr = [], series = {};
    varNames.forEach(function (name) {
      series[name] = {name: name, values:[]};
      seriesArr.push(series[name]);
    });

    data.forEach(function (d) {
      varNames.map(function (name) {
        series[name].values.push({name: name, label: d[labelVar], value: +d[name]});
      });
    });

    x.domain(data.map(function (d) { return d.date; })); // d.quarter

    stack.offset(offset)
    stack(seriesArr);

    y.domain([0, d3.max(seriesArr, function (c) { 
        //return d3.max(c.values, function (d) { return d.y0 + d.y; });
        return d3.max(c.values, function (d) { return d.y0 + d.y; });
      })]);

    var selection = svg.selectAll(".series")
      .data(seriesArr)
      .enter().append("g")
        .attr("class", "series");

    selection.append("path")
      //.attr("class", "streamPath")
      .attr("class", function(d, i) {   return "line "+d.name;	})
      .attr("d", function (d) { return area(d.values); })
      .style("fill", function (d) { return color(d.name); })
      .on("mouseover", function (d) { showStackPopover.call(this, d); })
      .on("mouseout",  function (d) { removePopovers(); })
      .style("stroke", "grey");

    var points = svg.selectAll(".seriesPoints")
      .data(seriesArr)
      .enter().append("g")
        .attr("class", "seriesPoints");

    points.selectAll(".point")
      .data(function (d) { return d.values; })
      .enter().append("circle")
       .attr("class", "point")
       .attr("cx", function (d) { return x(d.label) + x.rangeBand() / 2; })
       .attr("cy", function (d) { return y(d.y0 + d.y); })
       .attr("r", "2px")/*10px*/
       .style("fill",function (d) { return color(d.name); })
       .on("mouseover", function (d) { showPopover.call(this, d); })
       .on("mouseout",  function (d) { removePopovers(); })

    drawAxis();
    drawLegend(varNames);
  }

  VIZ.lineChart = function (data) {
    var line = d3.svg.line()
        .interpolate("cardinal") /*cardinal, linear*/
        .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
        .y(function (d) { return y(d.value); });

    var labelVar = "date"; //'quarter';
    var varNames = d3.keys(data[0]).filter(function (key) { return key !== labelVar;});

    var seriesData = varNames.map(function (name) {
      return {
        name: name,
        values: data.map(function (d) {
          return {name: name, label: d[labelVar], value: +d[name]};
        })
      };
    });

    x.domain(data.map(function (d) { return d.date;/*d.quarter;*/ }));
    y.domain([
      d3.min(seriesData, function (c) { 
        return d3.min(c.values, function (d) { return d.value; });
      }),
      d3.max(seriesData, function (c) { 
        return d3.max(c.values, function (d) { return d.value; });
      })
    ]);

    /*svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height+40) + ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("id", "text_id")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        //.style("fill", "#5F5F5F")
        //.text("Value");
        .text(nameOfVar);*/

    var series = svg.selectAll(".series")
        .data(seriesData)
      .enter().append("g")
        .attr("class", "series");

    series.append("path")
      //.attr("class", "line")
      .attr("class", function(d, i) {   return "line "+d.name;	})
      //.attr("id", function(d, i) {   return d.name+"-chart";	})
      .attr("d", function (d) { return line(d.values); })
      .style("stroke", function (d) { return color(d.name); })
      .style("stroke-width", "2px")
      .style("fill", "none")
      .on("mouseover", function (d) { showStackPopover.call(this, d); })
      .on("mouseout",  function (d) { removePopovers(); })

    series.selectAll(".linePoint")
      .data(function (d) { return d.values; })
      .enter().append("circle")
       //.attr("class", "linePoint")
       .attr("class", function(d, i) {  return "linePoint "+d.name;	})
       .attr("cx", function (d) { return x(d.label) + x.rangeBand()/2; })
       .attr("cy", function (d) { return y(d.value); })
       .attr("r", "0.1px")/*1.5*/
       .style("fill", function (d) { return color(d.name); })
       .style("stroke", "grey")
       .style("stroke-width", "1px")
       .on("mouseover", function (d) { showPopover.call(this, d); })
       .on("mouseout",  function (d) { removePopovers(); })

    drawAxis();
    drawLegend(varNames);
  }

  VIZ.stackBarChart = function (data) {
    var labelVar = "date";/*'quarter';*/
    var varNames = d3.keys(data[0]).filter(function (key) { return key !== labelVar;});
    color.domain(varNames);

    data.forEach(function (d) {
      var y0 = 0;
      d.mapping = varNames.map(function (name) { 
        return {
          name: name,
          label: d[labelVar],
          y0: y0,
          y1: y0 += +d[name]
        };
      });
      d.total = d.mapping[d.mapping.length - 1].y1;
    });

    x.domain(data.map(function (d) { return d.date;/*d.quarter;*/ }));
    y.domain([0, d3.max(data, function (d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height+20)+ ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("id", "text_id")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        //.text("Value");
        .text(nameOfVar);


    var selection = svg.selectAll(".series")
        .data(data)
      .enter().append("g")
        .attr("class", "series")
        .attr("transform", function (d) { return "translate(" + x(d.date) + ",0)"; });/*d.quarter;*/

    selection.selectAll("rect")
      .data(function (d) { return d.mapping; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function (d) { return y(d.y1); })
      .attr("height", function (d) { return y(d.y0) - y(d.y1); })
      .style("fill", function (d) { return color(d.name); })
      .style("stroke", "grey")
      .on("mouseover", function (d) { showPopover.call(this, d); })
      .on("mouseout",  function (d) { removePopovers(); })

    drawAxis();
    drawLegend(varNames);
  }

  VIZ.clearAll = function () {
    svg.selectAll("*").remove()
  }

  function drawAxis() {
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height+20)+ ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)" 
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("id", "text_id")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        //.text("Value");
        .text(nameOfVar);
  }

 
  function drawLegend (varNames) { 

    varNames = varNames.sort(function(a,b) { return d3.ascending(a, b); });

    if(varNames.length > 15){
	$("#legend").css("overflow-y","scroll");
    } else {
	$("#legend").css("overflow-y","hidden");
    }	
	
	
    $("#legend").empty();	
    var legend = d3.select("#legend")
	.append("svg")
	.attr("width", 150)
	.attr("height", (50 +(18* varNames.length)))
	.selectAll(".legend_trend")
        .data(varNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend_trend")
	//.attr("class", function(d, i) { return "line "+d;})
        .attr("transform", function (d, i) { return "translate(-05," + ((i * 20)  )+ ")"; });

    legend.append("rect")
        .attr("x", 130)
        .attr("width", 10)
        .attr("height", 10)
	.attr("class", function(d, i) { return "legend-name-rect "+d;})
	.attr("id", function(d, i) { return "legend-id-rect-"+d;})
        .style("fill", color)
        .style("cursor", "pointer")
        .on('mouseover', function(d) {
		d3.selectAll(".line").style('opacity', 0.2);
		d3.select(".line."+d).style('opacity', 1).style('stroke-width', "3px");
		d3.selectAll(".linePoint").style('opacity', 0).style('stroke-width', "0px");
		d3.selectAll(".linePoint."+d).style('opacity', 1).style('stroke-width', "2px");

	}).on('mouseout', function(d) {
		d3.selectAll(".line").style('opacity', 1).style('stroke-width', '2px');
		d3.selectAll(".linePoint").style('opacity', 1).style('stroke-width', "2px");
	}).on('click', function (d) {                           //onclick function to toggle off the lines        	
		if(d){
			if($(".line-dim.checked."+d).css("opacity") == 0){

				/*lines on chart*/
				$(".line-dim.checked."+d).attr("class","line "+d);
				d3.selectAll(".line."+d).style('opacity', 1).style('stroke-width', "2px");

				/*lines on chart*/
				$(".linePoint-dim.checked."+d).attr("class","linePoint "+d);
				d3.selectAll(".linePoint."+d).style('opacity', 1).style('stroke-width', "2px");

				/*Rectangle on legend*/
				$(".legend-name-rect-dim."+d).attr("class","legend-name-rect "+d);
				d3.selectAll(".legend-name-rect."+d).style('opacity', '1').style('stroke-width', "1px");

				/*Text on legend*/
				$(".legend-name-text "+d).attr("class","legend-name-text-dim "+d);
				d3.selectAll(".legend-name-text-dim."+d).style('opacity', '1').style('stroke-width', "1px");

			} else {

				/*lines on chart*/
				$(".line."+d).attr("class","line-dim checked "+d);	
				d3.selectAll(".line-dim.checked."+d).style('opacity', '0').style('stroke-width', "1px");

				/*linePoints on chart*/
				$(".linePoint."+d).attr("class","linePoint-dim checked "+d);	
				d3.selectAll(".linePoint-dim.checked."+d).style('opacity', '0').style('stroke-width', "1px");

				/*Rectangle on legend*/
				$(".legend-name-rect."+d).attr("class","legend-name-rect-dim "+d);
				d3.selectAll(".legend-name-rect-dim."+d).style('opacity', '0.4').style('stroke-width', "0.2px");

				/*Text on legend*/
				$(".legend-name-text."+d).attr("class","legend-name-text-dim "+d);
				d3.selectAll(".legend-name-text-dim."+d).style('opacity', '0.3').style('stroke-width', "0.2px");




			}
			
		}

	})
        .style("stroke", "grey");

    legend.append("text")
        .attr("x", 125)
        .attr("y", 6)
	 .attr("class", function(d, i) { return "legend-name-text "+d;})
	 .attr("id", function(d, i) { return "legend-id-text-"+d;})
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("cursor", "pointer")
        .on('mouseover', function(d) {
		d3.selectAll(".line").style('opacity', 0.2);
		d3.select(".line."+d).style('opacity', 1).style('stroke-width', "3px");

		d3.selectAll(".linePoint").style('opacity', 0).style('stroke-width', "0px");
		d3.selectAll(".linePoint."+d).style('opacity', 1).style('stroke-width', "2px");

	}).on('mouseout', function(d) {
		d3.selectAll(".line").style('opacity', 1).style('stroke-width', '2px');
		d3.selectAll(".linePoint").style('opacity', 1).style('stroke-width', "2px");
	}).on('click', function (d) {                           //onclick function to toggle off the lines        	
		if(d){
			if($(".line-dim.checked."+d).css("opacity") == 0){

				/*lines on chart*/
				$(".line-dim.checked."+d).attr("class","line "+d);
				d3.selectAll(".line."+d).style('opacity', 1).style('stroke-width', "2px");

				/*lines on chart*/
				$(".linePoint-dim.checked."+d).attr("class","linePoint "+d);
				d3.selectAll(".linePoint."+d).style('opacity', 1).style('stroke-width', "2px");

				/*Rectangle on legend*/
				$(".legend-name-rect-dim."+d).attr("class","legend-name-rect "+d);
				d3.selectAll(".legend-name-rect."+d).style('opacity', '1').style('stroke-width', "1px");

				/*Text on legend*/
				$(".legend-name-text "+d).attr("class","legend-name-text-dim "+d);
				d3.selectAll(".legend-name-text-dim."+d).style('opacity', '1').style('stroke-width', "1px");

			} else {

				/*lines on chart*/
				$(".line."+d).attr("class","line-dim checked "+d);	
				d3.selectAll(".line-dim.checked."+d).style('opacity', '0').style('stroke-width', "1px");

				/*linePoints on chart*/
				$(".linePoint."+d).attr("class","linePoint-dim checked "+d);	
				d3.selectAll(".linePoint-dim.checked."+d).style('opacity', '0').style('stroke-width', "1px");

				/*Rectangle on legend*/
				$(".legend-name-rect."+d).attr("class","legend-name-rect-dim "+d);
				d3.selectAll(".legend-name-rect-dim."+d).style('opacity', '0.4').style('stroke-width', "0.2px");

				/*Text on legend*/
				$(".legend-name-text."+d).attr("class","legend-name-text-dim "+d);
				d3.selectAll(".legend-name-text-dim."+d).style('opacity', '0.3').style('stroke-width', "0.2px");




			}
			
		}

	})
        .text(function (d) { return d.toTitleCase(); });
  }

  function removePopovers () {
    $('.popover').each(function() {
      $(this).remove();
    }); 
  }

  function showPopover (d) {

    console.log(d);	
    $(this).popover({
      title: d.name.toTitleCase(),
      placement: 'auto top',
      container: 'body',
      trigger: 'manual',
      html : true,
      content: function() { 
	 /*if(d.value == 0){ */
           return "Date: " + d.label + 
               //"<br/>Value: " + d3.format(",")(d.value ? d.value: d.y1 - d.y0); 
               "<br/>Value: " + d.value; 
	 /*} else {
           return "Date: " + d.label + 
               "<br/>Value: 0" ; 
	 }*/
	}
    });
    $(this).popover('show')
  }

  function showStackPopover (d) {
    $(this).popover({
      title: d.name.toTitleCase(),
      placement: 'auto top',
      container: 'body',
      trigger: 'manual',
      html : true,
      width: '100px',
      content: function() { 
	   var html = "";
	   for (var i=0; i<d.values.length ; i++){
		html += d.values[i].label+"  :  "+d.values[i].value+"<br/>";
	   }
           return html;
        }
    });
    $(this).popover('show')
  }


  VIZ.onResize = function () {
    var aspect = 1000 / 500, chart = $("#thesvg");
    var targetWidth = chart.parent().width();
      /*Added*/   
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
    //chart.attr("width", "800");
    //chart.attr("height", 500);
  }

  window.VIZ = VIZ;

}())






