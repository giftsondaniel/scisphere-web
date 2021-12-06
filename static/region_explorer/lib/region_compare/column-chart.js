//chart 1

function columnChart(columnBarChartWidth,level1Id) {
  var margin = {top: 20, right: 30, bottom: 50, left: 50},
      width = 420,
      height = 420,
      xRoundBands = 0.2,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.scale.ordinal(),
      yScale = d3.scale.linear(),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),
      xAxis = d3.svg.axis().scale(xScale);
	
var dtlng, maxvall ; //Changes made by Vinny


  function chart(selection) {
    selection.each(function(data) {
	
      dtlng = data.length;
      maxvall = d3.max(data, function(d) {return +d[1];});//Changes made by Vinny		
      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.


      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      xScale
          .domain(data.map(function(d) { return d[0];} ))
          .rangeRoundBands([0, width - margin.left - margin.right], xRoundBands);
    
      /*if(dtlng > 500){
          xScale
             .domain(data.map(function(d) { return d[0];} ))
             .rangeRoundBands([0, width - margin.left - margin.right + 1000], xRoundBands);	

	}*/	
      // Update the x-scale.


      // Update the y-scale.
      yScale
          .domain(d3.extent(data.map(function(d) { return d[1];} )))
          .range([height - margin.top - margin.bottom, 0])
          .nice();
          

      // Select the svg element, if it exists.
      var svg = d3.select('#bar_'+level1Id).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").attr('id','bar1').append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      // gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "x axis zero");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the bars.
      var bar = svg.select(".bars").selectAll(".bar1").data(data);
      bar.enter().append("rect");
      //bar.exit().remove();
      //bar .attr("class", function(d, i) { return d[1] < 0 ? "bar negative" : "bar positive"; })
      //bar .attr("class", function(d, i) { return d[1] < 0 ? "bar" : "bar"; })

	  //Changes Made by Vinny	
	  bar .attr("class", function(d, i) { if(isNaN(d[1])){return maxvall < 0 ? "bar" : "bar"; } else{ return d[1] < 0 ? "bar" : "bar"; }})
          // .attr("x", function(d) { return X(d); })
	  .attr("x", function(d ,i) { return /*X(d)*/ 5 + (i *(columnBarChartWidth/dtlng)); })//570
          //.attr("y", function(d, i) { return d[1] < 0 ? Y0() : Y(d); })

	  //Changes Made by Vinny 
	  .attr("y", function(d, i) {if(isNaN(d[1])){  return maxvall < 0 ? Y0() : Y(d);   } else{  return d[1] < 0 ? Y0() : Y(d); }})
          .attr("width",  xScale.rangeBand())
          .attr("height", function(d, i) { return Math.abs( Y(d) - Y0() ); })
	  .on('mouseover', function(d) {
			var did = d[0].split("_");
			var mouse = d3.mouse(d3.select('.bars')[0][0])
			d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
	 		d3.select('#spacialcontent_'+level1Id).style('visibility','');
			if(isNaN(d[1])){
			 	d3.select('#spacialcontent_'+level1Id).html( did[0] + ' <span class="value">(' +"Inf"+ ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>')
				.style('opacity', 1) 			
			}else{
			d3.select('#spacialcontent_'+level1Id).html( did[0] + ' <span class="value">(' + d[1] + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>')
			.style('opacity', 1)} })

			//d3.select('#spacialcontent').html( did[0] + ' <span class="value">(' + d[1] + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>')
			//.style('opacity', 1)   }) //Changes Made by Vinny
	  .on('mouseout', function(d) {
	 		d3.select('#spacialcontent_'+level1Id).style('visibility','hidden');
			d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
	  }).on("contextmenu", function(d){
		 snapLevel = levelId;
		var did = d[0].split("_");
		if(snapLevel == 2 && snapsht == 1 ){
			snapLevel = 3;
			snapURL = "scisphere/places/"+level1_Id+"/"+did[1]+"?level="+3+"&level0="+level0_Id+"&year="+yearId+"";
		}else{
			snapURL = "scisphere/places/"+level1_Id+"/"+did[1]+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yearId+"";
		}	
		canvasImage = "taluk";
		var y, x;
		if (d3.event.pageX || d3.event.pageY) {
			  var x = d3.event.pageX;
			  var y = d3.event.pageY;
		      } else if (d3.event.clientX || d3.event.clientY) {
			  var x = d3.event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			  var y = d3.event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		      }
		d3.select('#my_custom_menu')
			.style('position', 'absolute')
			.style('left', x+"px")
			.style('top', y+"px")
			.style('display', 'block');
		d3.event.preventDefault();
	  }).style("fill",function(d) {  return color(d[1]); });

    // x axis at the bottom of the chart
     g.select(".x.axis")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
        .call(xAxis.orient("bottom"));
    
    // zero line
     g.select(".x.axis.zero")
        .attr("transform", "translate(0," + Y0() + ")")
        .call(xAxis.tickFormat("").tickSize(0));
    
    
     // Update the y-axis.
     g.select(".y.axis")
        .call(yAxis).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});
          
    });
  }


// The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(d[0]);
  }

  function Y0() {
    return yScale(0);
  }

  // The x-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
       if(isNaN(d[1])){ return yScale(maxvall); }//changes made by vinny
       else{ return yScale(d[1]); }//changes made by vinny	
//    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}


