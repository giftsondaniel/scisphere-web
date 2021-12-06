function level_3_LevelChart( fld, yr,chartWidth,chartHeight){

var barWidth;
var barChartWidth;
var columnBarChartWidth;

	if(chartWidth<400){
	   chartWidth = 400;
	   barChartWidth = (chartWidth*60)/100;
	   barWidth = (chartWidth*35)/100;
	   columnBarChartWidth = (chartWidth*75)/100;
	}else{
	   barChartWidth = (chartWidth*60)/100;
	   barWidth = (chartWidth*35)/100;
	   columnBarChartWidth = (chartWidth*75)/100;
	}
	chartWidth = chartWidth;


	//Bar Chart starts here
	//d3.selectAll("#bar1").remove();
	//d3.selectAll(".bar1").remove();
	
	key = l3_KeyVal.filter(fld);
	key2 = l3_YearVal.filter(yr);
	datas = print_filter(key);

	//sorting values to find outliers
	var data1 = datas.sort(function(a,b) {  return a.value - b.value; });

	//Mean, Median, Standard Deviation and Quantile values
	var mn = [];
	var mn1 = [];
	var quartile3=0;
	for (i = 0; i<data1.length ; i++){ mn.push(+data1[i].value); } 

	var meanVal = jStat(mn).mean();
	var medianVal = jStat(mn).median();
	var stdevVal = jStat(mn).stdev(true);
	var quartilesVal = jStat(mn).quartiles();
	var quartilesValSum = jStat(mn).sum();
	var q3 = mn[Math.floor((mn.length * (0.75)))];
	
	if(q3 == 0){
		//var mn1 = [];
		var quartile3=1;
		for (i = 0; i<data1.length ; i++){ /*mn.push(+data1[i].value);*/ mn1.push(+data1[i].value);}
		var q1 = mn1[Math.floor((mn1.length / 4))];
		var q2 = mn1[Math.floor((mn1.length / 2))];
	    	var q3 = mn1[Math.floor((mn1.length * (0.75)))];
    		var iqr = q3 - q1;	
	}else{
		//Getting outliers
		var q1 = mn[Math.floor((mn.length / 4))];
		var q2 = mn[Math.floor((mn.length / 2))];
	    	var q3 = mn[Math.floor((mn.length * (0.75)))];
	    	var iqr = q3 - q1;
	}

	var mn_total= 0;
	for(var i=0; i < mn.length; i++){
	    mn_total += mn[i];
	}
	
	function isBigEnough(value) {
	  return function(element, index, array) {
 	      return (element <= value);
	  }
	}
	function isLessThan(value) {
	  return function(element, index, array) {
 	      return (element < value);
	  }
	}
	function isBetween(value1 , value2) {
	  return function(element,index, array) {
 	      return ((element<= value2) && (element>value1));
	  }
	}

	var QrMaxValue = q3 + iqr*1.5;
	var QrMinValue = q1 - iqr*1.5;

	//var maxvall_QrMaxValue = d3.max(mn.filter(isBigEnough(QrMaxValue)), function(d) {return d;});
	//var maxvall_QrMaxValue1 = d3.max(mn.filter(isLessThan(maxvall_QrMaxValue)), function(d) {return d;});

	//var maxvall_QrMaxValue_2 = maxvall_QrMaxValue * 2;	

	//d3 sorting desc order
	var data = data1.sort(function(a,b) {  return d3.descending(a.value,b.value); });

	//var data = [1,2,3,20,25]; // MIN AND MAX Values
	var minvall = d3.min(data, function(d) {return +d.value;});
	var maxvall = d3.max(data, function(d) {return +d.value;});

	//For only 80% value;
	var epval = ((maxvall)*(80/100));
	var tpval = ((maxvall)*(10/100));
	var cval = tpval + epval;
	var minv = minvall -tpval;
	    minvalue = ((minvall / 10) * 9.6);
	    minvalu = ((minvall / 10) * 12);
	    domain = [minvalue, maxvall];

	var twval = (domain[0] + domain[1])
	var midval1 = (twval / 2);
	var secval = ((domain[0] + midval1) / 2);
	var forval = ((domain[1] + midval1) / 2);
	var midval = (domain[1] / 2);
	
	quartilesVal_3=quartilesVal[2] * 3;

	//Color and Ranges for the SPLIT CHART:
	var arr = [];	
	for (i = 0; i<data1.length ; i++){ if(+data1[i].value > 0){arr.push(+data1[i].value);	}}
	var quartilesValSumArr = jStat(arr).quartiles();
	quartilesVal_3 = quartilesValSumArr[2] * 2;
	//color = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);

	//Sort Values
	var data = datas.sort(function(a,b) {

				if(a.value =="inf" && b.value =="inf" ){
					return 0; 
				}
				if(a.value =="inf"){
					return b.value - maxvall; 
				}
				if(b.value =="inf"){
					return maxvall - a.value; 
				}
				
				if(a.value =="-inf" && b.value =="-inf" ){
					return 0; 
				}
				if(b.value =="-inf"){
					return b.value - a.value; 
				}
				if(a.value =="inf"){
					return b.value - b.value; 
				}
	
				if(a.value =="nan" && b.value =="nan" ){
					return 0; 
				}
				if(a.value =="nan"){
					return b.value - maxvall; 
				}
				if(b.value =="nan"){
					return maxvall - a.value; 
				}
				
				if(a.value =="-nan" && b.value =="-nan" ){
					return 0; 
				}
				if(b.value =="-nan"){
					return b.value - a.value; 
				}
				if(a.value =="nan"){
					return b.value - b.value; 
				}			
				
				else { return b.value - a.value;  }				 
				 });


     
	    if(minvall < 0){ //Chart with Negative Values come under this Chart.. With Negative bar:
		var barData= [];
		for( i = 0; i < datas.length; i++) {
		    d = [];		 
		    d["0"] = datas[i].name_3+"_"+datas[i].id_3;
		    d["1"] = +datas[i].value;
		    if(datas[i].value !=0){barData.push(d);}
		}
		d3.select("#bar")
		    .datum(barData)
		    .call(columnChart(columnBarChartWidth)
		    .width(chartWidth)
		    .height(450)
		    .x(function(d, i) { return d[0]; })	
		    .y(function(d, i) { return d[1]; }));

	    } else {
		
			// **** Split Bar Starts here ****
			//Chart which doesnot the max value lies under the outlier

			if(mid_com){

				//Added to change the color according to outliers
				var second_middle_value = (quartilesVal[2]+minvalue)/2;
				var second_fourth_value = (second_middle_value+quartilesVal[2])/2;
				var second_second_value = (second_middle_value+minvalue)/2;

				range = [minvalue,second_second_value, second_middle_value, quartilesVal[2],maxvall];
				//color = d3.scale.linear().range(colors).domain([minvalue, second_second_value, second_middle_value, quartilesVal[2],maxvall ]);		

				var x = d3.scale.ordinal().rangeRoundBands([0, 530], .1);//672
				var y = d3.scale.linear().range([500, 0]);
				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
				var cnt = 0;


				x.domain(data.map(function(d) {  return d.name_3; }));
				y.domain([0, d3.max(data, function(d) { if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

				var svg = d3.select("#bar").append("svg").attr("width",chartWidth).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
						    .attr("transform", "translate(-170,10)");

				minvalue = min_com; 
				maxvall = max_com;
				QrMaxValue = mid_com;



				var lower = d3.scale.linear().domain([minvalue,QrMaxValue]).range([320,100]).clamp(true),//minv, epval//QrMaxValue//meanVal
		    	        upper = d3.scale.linear().domain([QrMaxValue,maxvall]).range([80,0]).clamp(true);//cval

				//Lower Bar chart
				svg.selectAll("rect.lower")
				   	.data(data).enter()
				   	.append("rect")
				   	.attr("class", "lower")
				   	.attr("x", function(d, i) {  return 250 + i * (barChartWidth/cnt);      })//return 250 + i * 20; })
				   	.attr("width",(barWidth/cnt))
				   	.attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
					.attr("height", function(d) { if(d.value == "inf"){return 320 - lower((maxvall));}else{return 320 - lower((d.value)); }})
					.style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}else{return color(d.value);}})
				   .on('mouseover', function(d) {
				 		d3.select('#spacialcontent').style('visibility','');
						var mouse = d3.mouse(d3.select('.lower')[0][0])
						d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
						d3.select('#spacialcontent').html( d.name_3 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
						.style('opacity', 1) })
				   .on('mouseout', function(d) {
				 		d3.select('#spacialcontent').style('visibility','hidden');		
						d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
				 }).on("contextmenu", function(d){
					snapLevel = 3;
					snapURL = "scisphere/places/"+level1_Id+"/"+d.id_3+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yearId;	
					canvasImage = "chart";
					var position = d3.mouse(this);
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
				 });
			
				//Upper Bar chart	
				svg.selectAll("rect.upper")
				   	.data(data)
				   	.enter()
				   	.append("rect")
				   	.attr("class", "upper")
				   	.attr("x", function(d, i) {  return 250 + i * (barChartWidth/cnt);      })
				   	.attr("width",(barWidth/cnt))
				   	.attr("y", function(d) { if(d.value == "inf"){return upper(maxvall);}else{return upper(d.value); }})
				   	.attr("height", function(d) { if(d.value == "inf"){return maxvall >= QrMaxValue ? 80 - upper((maxvall)) : 0;}else{return d.value >= QrMaxValue ? 80 - upper((d.value)) : 0;}  }) //5091
				   	.style("fill", function(d) {if(d.value == "inf"){return color(maxvall);}else{return color(d.value);} })
				   	.on('mouseover', function(d) {
	 					d3.select('#spacialcontent').style('visibility','');
						var mouse = d3.mouse(d3.select('.lower')[0][0])
						d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
						d3.select('#spacialcontent').html( d.name_3 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
						.style('opacity', 1)  })
				   	.on('mouseout', function(d) {
				 		d3.select('#spacialcontent').style('visibility','hidden');
						d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
				    	})
			    	.on("contextmenu", function(d, index){
						snapLevel = 3;
						snapURL = "scisphere/places/"+level1_Id+"/"+d.id_3+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yearId;
						canvasImage = "chart";
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
				   });

				//LOWER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
			  		 .call(d3.svg.axis().scale(lower).orient("left").ticks(6));

				//UPPER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
			  		 .call(d3.svg.axis().scale(upper).orient("left").ticks(2));	

			}else{

				var x = d3.scale.ordinal().rangeRoundBands([0, 530], .1);//672
				var y = d3.scale.linear().range([0, 500]);

				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
				var cnt = 0;
				x.domain(data.map(function(d) { return d.name_3; }));
				y.domain([0, d3.max(data, function(d) {  if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

				//SVG Declaring with id named BAR , height , width and Transform
				var svg = d3.select("#bar").append("svg").attr("width",chartWidth).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
							    .attr("transform", "translate(-140,10)");
				minvalue = min_com; 
				maxvall = max_com;

				var lower = d3.scale.linear().domain([minvalue,maxvall]).range([320,0]).clamp(true);//,//minv, epval//QrMaxValue//meanVal

				//Lower Bar chart
				svg.selectAll("rect.lower")
					   .data(data).enter()
					   .append("rect")
					   .attr("class", "lower")
					   .attr("x", function(d, i) {  return 250 + i * (barChartWidth/cnt);      })//return 250 + i * 20; })
					   .attr("width",(barWidth/cnt))
					   .attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
					   .attr("height", function(d) { if(d.value == "inf"){return 320 - lower((maxvall));}else{return 320 - lower((d.value)); }})
					   .style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}else{return color(d.value);}})
					   .on('mouseover', function(d) {
							d3.select('#spacialcontent').style('visibility','');
							var mouse = d3.mouse(d3.select('.lower')[0][0])
							d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
							d3.select('#spacialcontent').html( d.name_3 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
							.style('opacity', 1) })
					   .on('mouseout', function(d) {
					 		d3.select('#spacialcontent').style('visibility','hidden');		
							d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
					   }).on("contextmenu", function(d, index){
						snapLevel = 3;
						snapURL = "scisphere/places/"+level1_Id+"/"+d.id_3+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yearId;
						canvasImage = "chart";
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
					   });

				//LOWER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
			  		 .call(d3.svg.axis().scale(lower).orient("left").ticks(6));

				}
		
	}		

	if(datas.length == 0){
		var svg = d3.select("#bar").append("svg").attr("width",650)
			.attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
			.attr("transform", "translate(-150,10)");

		var text = svg.append("svg:text").attr("class", "nobar").attr("x", 450).attr("y", 130).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Data");
		var bbox = text.node().getBBox();
	}

}

