function shareColumnChart() {

  var margin = {top: 50, right: 80, bottom: 50, left: 50},
      width = sizeRequired,//550,
      height = sizeRequired,//350,
      xRoundBands = 0.2,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.scale.ordinal(),
      yScale = d3.scale.linear(),
      formatValue = d3.format(".2s"),
      yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(function(d) { return formatValue(d); }),
      //yAxis = d3.svg.axis().scale(yScale).orient("left"),
      xAxis = d3.svg.axis().scale(xScale);

  var dtlng, maxvall ; //Changes made by Vinny

  function chart(selection) {
    selection.each(function(data) {
      dtlng =data.length;

      maxvall = d3.max(data, function(d) {return +d[1];});//Changes made by Vinny		
      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.

      

      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });
      var xAxisLengthMinus=0;
      if(sizeRequired == 450 ){ xAxisLengthMinus = (130*1);}
      if(sizeRequired == 350 ){ xAxisLengthMinus = (130*(0.78));}	
      if(sizeRequired == 250 ){ xAxisLengthMinus = (130*(0.56));}	

      xScale
          .domain(data.map(function(d) { return d[0];} ))
          .rangeRoundBands([0, width-xAxisLengthMinus], xRoundBands);

      // Update the y-scale.
      yScale
          .domain(d3.extent(data.map(function(d) { return d[1];} )))
          .range([height - margin.top - margin.bottom, 0])//- margin.top - margin.bottom
          .nice();
          


      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("#map").data([data]);



      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").attr('id','share_svg').style('background-color','#F6F9FE').append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "x axis zero");

      height = sizeRequired;
      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the bars.
      var bar = svg.select(".bars").selectAll(".bar1").data(data);
      bar.enter().append("rect");
      bar.exit().remove();

      //Changes Made by Vinny	
      bar .attr("class", function(d, i) { if(isNaN(d[1])){return maxvall < 0 ? "bar" : "bar"; } else{ return d[1] < 0 ? "bar" : "bar"; }})
          // .attr("x", function(d) { return X(d); })
	  .attr("x", function(d ,i) {
			if(sizeRequired == 450 ){
			    return  5 + (i *(305/dtlng)); 
			}
			if(sizeRequired == 350 ){
			    return  5 + (i *(238/dtlng)); 
			}
			if(sizeRequired == 250 ){
			    return  5 + (i *(171/dtlng)); 
			}
		})

	  //Changes Made by Vinny 
	  .attr("y", function(d, i) {if(isNaN(d[1])){  return maxvall < 0 ? Y0() : Y(d);   } else{  return d[1] < 0 ? Y0() : Y(d); }})
	  .attr("width",function(d ,i) {
			if(sizeRequired == 450 ){
			    return (200/dtlng); 
			}
			if(sizeRequired == 350 ){
			    return  (156/dtlng); 
			}
			if(sizeRequired == 250 ){
			    return (112/dtlng); 
			}
		})
          .attr("height", function(d, i) { return Math.abs( Y(d) - Y0() ); })
	  .call(d3.helper.tooltip()
			.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
			.style({color: 'black'})
			.text(function(d, i){ 
				var value = '';
				var did = d[0].split("_")
				if(isInteger( d[1])){
				    value =  d[1];
				}else{
				    value = numberFormatTitleValues( d[1]);
				}
				 return did[0] + '  (' +value + ')';	 
			})
    		)
	  .on('mouseover', function(d) {
			var did = d[0].split("_");
			var mouse = d3.mouse(d3.select('.bars')[0][0])
			d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
	 })

	  .on('mouseout', function(d) {
	 		d3.select('#spacialcontent').style('display','none');
			d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
	  }).on("contextmenu", function(d){
		snapLevel = levelid;
		
	  }).style("fill",function(d) {  return color(d[1]); });

    // x axis at the bottom of the chart
     g.select(".x.axis")
        //.attr("transform", "translate(0," + ((height - margin.top - margin.bottom) ) + ")")
        .attr("transform", "translate(0," + ((height - margin.top)) + ")")
        .call(xAxis.orient("bottom"));
    
    // zero line
     g.select(".x.axis.zero")
        .attr("transform", "translate(0," + Y0() + ")")
        .call(xAxis.tickFormat("").tickSize(0));
    
    
      // Update the y-axis.
      g.select(".y.axis").attr("class", "tickValues")
        .call(yAxis).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

      if(sizeRequired== 250){
	   d3.selectAll(".tickValues").style({"font": "Roboto, sans-serif",'font-size':'8px',"fill":"#5F5F5F"}); ///.attr("class", "tickValues")
      }
          
    });
  }

  runLegend();


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
