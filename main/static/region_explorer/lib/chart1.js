function chart(fld, yr, levelType ){

	//SVG Image for save image
	d3.select("#barSaveButton").select('image').remove();		
	d3.select("#barSaveButton").append("image")
	    .attr("xlink:href", "/static/region_explorer/images/save.png")
	    .attr("x", "1050")
	    .attr("y", "10")
	    .attr("id", "image_Canvas_bar")
	    .attr("width", "43")
	    .attr("height", "40")
	    .on("click", function(d){
	     	var el = document.getElementById("canvas-Bar-id");
	 	el.click();				
    		})
	    .on('mouseover', function(d) {
	    	d3.select(this).style('opacity', 0.6);
    	  	this.parentNode.appendChild(this);			
		})
	    .on('mouseout', function(d) {
	  	d3.select(this).style('opacity', 1)
    	  	this.parentNode.appendChild(this); 			
	    });
	//SVG Image for save image

	var level1_Id = document.getElementById('level_1_Id').value;
	var level0_Id = document.getElementById('level_0_Id').value;
	//var yearType = document.getElementById("yearId");
	//var yrtype = yearType.options[yearType.selectedIndex].value;
	var yrtype=2011;

	//Bar Chart starts here
	d3.selectAll("#bar1").remove();
	d3.selectAll(".bar1").remove();

	key = keyVal.filter(fld);
	key2 = yearVal.filter(yr);
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

	var maxvall_QrMaxValue = d3.max(mn.filter(isBigEnough(QrMaxValue)), function(d) {return d;});
	var maxvall_QrMaxValue1 = d3.max(mn.filter(isLessThan(maxvall_QrMaxValue)), function(d) {return d;});

	var maxvall_QrMaxValue_2 = maxvall_QrMaxValue * 2;	

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
	color = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);

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
				
				else { return b.value - a.value;  }				 
				 });


   	var level1Id = document.getElementById('level_1_Id');
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	var levelId = document.getElementById('levelId').value;
	//var levelName = levelId.options[levelId.selectedIndex].innerHTML;
	var levelName = levelsData[level0_Id]["level"+levelId+""].toLowerCase();

	var grid="";
	grid += '<li><span> '+level1Name+' </span></li>'+
		'<li class="active"><span> All '+levelName+'s </span></li>';
	document.getElementById('breadcrumb_id').innerHTML = grid; 	
	
	if(minvall == maxvall && maxvall == 0){
		range = [0,0,0,0,0];	
		return false;
	}

     if(data.length <= 2){

	 if(minvall < 0){			//Chart with Negative Values come under this Chart.. With Negative bar:
	    var barData= []; 			// push datas in [0,1] format of array to the chart
	    for( i = 0; i < datas.length; i++) {
	        d = [];		 
	        d["0"] = datas[i].name_2+"_"+datas[i].id_2;
	        d["1"] = +datas[i].value;
	        barData.push(d);
	    }
	    d3.select("#bar")
	       .datum(barData)
	       .call(columnChart()
	       .width(660)
	       .height(420)
	       .x(function(d, i) { return d[0]; })
	       .y(function(d, i) { return d[1]; }));
	
	} else {

	    // Split Bar Chart
	    if( ( QrMaxValue < maxvall) && ( maxvall_QrMaxValue_2 < maxvall)){

		//Added to change the color according to outliers
		var second_middle_value = (quartilesVal[2]+minvalue)/2;
		var second_fourth_value = (second_middle_value+quartilesVal[2])/2;
		var second_second_value = (second_middle_value+minvalue)/2;

		range = [minvalue,second_second_value, second_middle_value, quartilesVal[2],maxvall];
		color = d3.scale.linear().range(colors).domain([minvalue, second_second_value, second_middle_value, quartilesVal[2],maxvall ]);			
		var x = d3.scale.ordinal().rangeRoundBands([0, 50], .1);//672
		var y = d3.scale.linear().range([500, 0]);
		var xAxis = d3.svg.axis().scale(x).orient("bottom");
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");

		//yAxis.tickValues(d3.range(minval, (maxval+1), differenceValue));

		x.domain(data.map(function(d) { return d.name_2; }));
		y.domain([0, d3.max(data, function(d) { return +d.value; })]);

		//SVG Declaring with id named BAR , height , width and Transform
		var svg = d3.select("#bar").append("svg").attr("width",450).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart").attr("transform", "translate(50,10)");

		svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(230," + 330 + ")")
		    .call(xAxis)
		    .selectAll("text")  
		    .style("text-anchor", "end")
		    .attr("dx", "-.8em")
		    .attr("dy", ".15em")
		    .attr("transform", function(d) {
		    	return "rotate(-45)" 
		    });

		var yAxisNodes = svg.append("g").attr("class", "y axis")
				  .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '3px'}).style({"font": "Roboto, sans-serif",'font-size':'16px',"fill":"#8A8A8A"})
				  .call(yAxis);

		yAxisNodes.selectAll('text').style({ 'stroke-width': '1px'});

		var lower = d3.scale.linear().domain([minvalue,maxvall_QrMaxValue]).range([320,100]).clamp(true),
		    upper = d3.scale.linear().domain([maxvall_QrMaxValue,maxvall]).range([80,0]).clamp(true);

		//Lower Bar chart
		svg.selectAll("rect.lower")
		   .data(data).enter()
		   .append("rect")
		   .attr("class", "lower")
		   .attr("x", function(d, i) {  return 233+ x(i);      })
		   .attr("width", x.rangeBand())
		   .attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
		   .attr("height", function(d) { if(d.value == "inf"){return 320 - lower((maxvall));}else{return 320 - lower((d.value)); }})
		   .style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}
			else{   return color(d.value); }
		   })
		   .on('mouseover', function(d) {
 			d3.select('#spacialcontent').style('display','');
			var mouse = d3.mouse(d3.select('.lower')[0][0])
			d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
			d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
				.style('opacity', 1) })
		   .on('mouseout', function(d) {
		   	d3.select('#spacialcontent').style('display','none');		
		   	d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
		   	})
		   .on("contextmenu", function(d, index){

			snapLevel = 2;
			//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;
			snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
			canvasImage = "chart";
			snapshotRankPopup(level0_Id,level1_Id,d.id_2);
			$('#snapshot-popup-id').click();
			/*var y, x;
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
			   .style('display', 'block');*/
			d3.event.preventDefault();
		    });

		//Upper Bar chart	
		svg.selectAll("rect.upper")
		   .data(data)
		   .enter()
		   .append("rect")
		   .attr("class", "upper")
		   .attr("x", function(d, i) {  return 233+ x(i);      })
		   .attr("width", x.rangeBand())
		   .attr("y", function(d) { if(d.value == "inf"){return upper(maxvall);}else{return upper(d.value); }})
		   .attr("height", function(d) { if(d.value == "inf"){return maxvall >= QrMaxValue ? 80 - upper((maxvall)) : 0;}else{return d.value >= QrMaxValue ? 80 - upper((d.value)) : 0;}  }) //5091
		   .style("fill", function(d) {if(d.value == "inf"){return color(maxvall);}else{return color(d.value);} })
		   .on('mouseover', function(d) {
		   	d3.select('#spacialcontent').style('display','');
		   	var mouse = d3.mouse(d3.select('.lower')[0][0])
		   	d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
		   	d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
		   .style('opacity', 1)  })
		   .on('mouseout', function(d) {
		   	d3.select('#spacialcontent').style('display','none');
		   	d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
		   }).on("contextmenu", function(d, index){
		   	snapLevel = 2;
		   	//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;
			snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
		   	canvasImage = "chart";
			snapshotRankPopup(level0_Id,level1_Id,d.id_2);
			$('#snapshot-popup-id').click();
		   	/*var y, x;
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
		   	    .style('display', 'block');*/
		   	d3.event.preventDefault();
		   });

		   //LOWER Bar chart	
		   svg.append("g").attr("transform", "translate(230,0)").call(d3.svg.axis().scale(lower).orient("left").ticks(6)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

		   //UPPER Bar chart	
		   svg.append("g").attr("transform", "translate(230,0)").call(d3.svg.axis().scale(upper).orient("left").ticks(2)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});	

		}else{
		   //Common Bar Chart for data.length below 40
		   var x = d3.scale.ordinal().rangeRoundBands([0, 50], .1);//672
		   var y = d3.scale.linear().range([450, 0]);
		   var xAxis = d3.svg.axis().scale(x).orient("bottom");
		   x.domain(data.map(function(d) { return d.name_2; }));
		   y.domain([0, d3.max(data, function(d) { return +d.value; })]);

		   //SVG Declaring with id named BAR , height , width and Transform
		   svg = d3.select("#bar").append("svg").attr("width",450).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
		      .attr("transform", "translate(-110,50)");

		   svg.append("g")
		      .attr("class", "axis")
		      .attr("transform", "translate(230," + 255 + ")")
		      .call(xAxis)
		      .selectAll("text")  
		      .style("text-anchor", "end")
		      .attr("dx", "-.8em")
		      .attr("dy", ".15em")
		      .attr("transform", function(d) {
				return "rotate(-45)" 
		   }).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});
		   var lower = d3.scale.linear().domain([minvalue,maxvall]).range([250,0]).clamp(true);//,//minv, epval//QrMaxValue//meanVal

		   //Lower Bar chart
		   svg.selectAll("rect.lower")
		   .data(data).enter()
		   .append("rect")
		   .attr("class", "lower")
		   .attr("x", function(d, i) {  return 233+ x(i);      })//return 250 + i * 20; })
		   .attr("width", x.rangeBand())
		   .attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
		        .attr("height", function(d) { if(d.value == "inf"){return 250 - lower((maxvall));}else{return 250 - lower((d.value)); }})
		        .style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}else{return color(d.value);}})
		   .on('mouseover', function(d) {
		   	d3.select('#spacialcontent').style('display','');
		   	var mouse = d3.mouse(d3.select('.lower')[0][0])
		   	d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
		   	d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
		   	.style('opacity', 1) })
		   .on('mouseout', function(d) {
	 		d3.select('#spacialcontent').style('display','none');		
			d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
		   }).on("contextmenu", function(d, index){
			snapLevel = 2;
			//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;
			snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
			canvasImage = "chart";
			snapshotRankPopup(level0_Id,level1_Id,d.id_2);
			$('#snapshot-popup-id').click();
			/*var y, x;
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
				.style('display', 'block');*/
		        d3.event.preventDefault();
		   });

		   //LOWER Bar chart	
		   svg.append("g").attr("transform", "translate(230,0)")
  		        .call(d3.svg.axis().scale(lower).orient("left").ticks(6)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

		   }
	    }
	}else{
	    if(minvall < 0){ //Chart with Negative Values come under this Chart.. With Negative bar:
		var barData= [];
		for( i = 0; i < datas.length; i++) {

		    d = [];		 
		    d["0"] = datas[i].name_2+"_"+datas[i].id_2;
		    d["1"] = +datas[i].value;
		    barData.push(d);
		}
		d3.select("#bar")
		    .datum(barData)
		    .call(columnChart()
		    .width(660)
		    .height(420)
		    .x(function(d, i) { return d[0]; })	
		    .y(function(d, i) { return d[1]; }));

	    } else {
		
			// **** Split Bar Starts here ****
			//Chart which doesnot the max value lies under the outlier

			if((QrMaxValue < maxvall) && (QrMaxValue != 0) ){

				//Added to change the color according to outliers
				var second_middle_value = (quartilesVal[2]+minvalue)/2;
				var second_fourth_value = (second_middle_value+quartilesVal[2])/2;
				var second_second_value = (second_middle_value+minvalue)/2;

				range = [minvalue,second_second_value, second_middle_value, quartilesVal[2],maxvall];
				color = d3.scale.linear().range(colors).domain([minvalue, second_second_value, second_middle_value, quartilesVal[2],maxvall ]);		

				var x = d3.scale.ordinal().rangeRoundBands([0, 530], .1);//672
				var y = d3.scale.linear().range([500, 0]);
				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
				var cnt = 0;


				x.domain(data.map(function(d) {  return d.name_2; }));
				y.domain([0, d3.max(data, function(d) { if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

				var svg = d3.select("#bar").append("svg").attr("width",700).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
						    .attr("transform", "translate(-140,50)");

				var lower = d3.scale.linear().domain([minvalue,QrMaxValue]).range([320,100]).clamp(true),//minv, epval//QrMaxValue//meanVal
		    	        upper = d3.scale.linear().domain([QrMaxValue,maxvall]).range([80,0]).clamp(true);//cval

				//Lower Bar chart
				svg.selectAll("rect.lower")
				   	.data(data).enter()
				   	.append("rect")
				   	.attr("class", "lower")
				   	.attr("x", function(d, i) {  return 250 + i * (350/cnt);      })//return 250 + i * 20; })
				   	.attr("width",(200/cnt))
				   	.attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
					.attr("height", function(d) { if(d.value == "inf"){return 320 - lower((maxvall));}else{return 320 - lower((d.value)); }})
					.style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}else{return color(d.value);}})
				   .on('mouseover', function(d) {
				 		d3.select('#spacialcontent').style('display','');
						var mouse = d3.mouse(d3.select('.lower')[0][0])
						d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
						d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
						.style('opacity', 1) })
				   .on('mouseout', function(d) {
				 		d3.select('#spacialcontent').style('display','none');		
						d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
				 }).on("contextmenu", function(d){
					snapLevel = 3;
					//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;	
					snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
					canvasImage = "chart";
					snapshotRankPopup(level0_Id,level1_Id,d.id_2);
					$('#snapshot-popup-id').click();
					/*var position = d3.mouse(this);
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
						.style('display', 'block');*/
					d3.event.preventDefault();
				 });
			
				//Upper Bar chart	
				svg.selectAll("rect.upper")
				   	.data(data)
				   	.enter()
				   	.append("rect")
				   	.attr("class", "upper")
				   	.attr("x", function(d, i) {  return 250 + i * (350/cnt);      })
				   	.attr("width",(200/cnt))
				   	.attr("y", function(d) { if(d.value == "inf"){return upper(maxvall);}else{return upper(d.value); }})
				   	.attr("height", function(d) { if(d.value == "inf"){return maxvall >= QrMaxValue ? 80 - upper((maxvall)) : 0;}else{return d.value >= QrMaxValue ? 80 - upper((d.value)) : 0;}  }) //5091
				   	.style("fill", function(d) {if(d.value == "inf"){return color(maxvall);}else{return color(d.value);} })
				   	.on('mouseover', function(d) {
	 					d3.select('#spacialcontent').style('display','');
						var mouse = d3.mouse(d3.select('.lower')[0][0])
						d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
						d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
						.style('opacity', 1)  })
				   	.on('mouseout', function(d) {
				 		d3.select('#spacialcontent').style('display','none');
						d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
				    	})
			    	.on("contextmenu", function(d, index){
						snapLevel = 3;
						//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;
						snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
						canvasImage = "chart";
						snapshotRankPopup(level0_Id,level1_Id,d.id_2);
						$('#snapshot-popup-id').click();
						/*var y, x;
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
							.style('display', 'block');*/
						d3.event.preventDefault();
				   });

				//LOWER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
			  		 .call(d3.svg.axis().scale(lower).orient("left").ticks(6)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

				//UPPER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
			  		 .call(d3.svg.axis().scale(upper).orient("left").ticks(2)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});	

			} else if(QrMaxValue > maxvall){ // **** Bar chart Starts here ****

				var x = d3.scale.ordinal().rangeRoundBands([0, 500], .1);//672
				var y = d3.scale.linear().range([500, 0]);

				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
				var cnt = 0;
				x.domain(data.map(function(d) { return d.name_2; }));
				y.domain([0, d3.max(data, function(d) {  if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

				//SVG Declaring with id named BAR , height , width and Transform
				var svg = d3.select("#bar").append("svg").attr("width",700).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
							    .attr("transform", "translate(-140,50)");
				var lower = d3.scale.linear().domain([minvalue,maxvall]).range([320,0]).clamp(true);//,//minv, epval//QrMaxValue//meanVal

				//Lower Bar chart
				svg.selectAll("rect.lower")
					   .data(data).enter()
					   .append("rect")
					   .attr("class", "lower")
					   .attr("x", function(d, i) {  return 250 + i * (350/cnt);      })//return 250 + i * 20; })
					   .attr("width",(200/cnt))
					   .attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
					   .attr("height", function(d) { if(d.value == "inf"){return 320 - lower((maxvall));}else{return 320 - lower((d.value)); }})
					   .style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}else{return color(d.value);}})
					   .on('mouseover', function(d) {
					 		d3.select('#spacialcontent').style('display','');
							var mouse = d3.mouse(d3.select('.lower')[0][0])
						d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
						d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
						.style('opacity', 1) })
				   .on('mouseout', function(d) {
				 		d3.select('#spacialcontent').style('display','none');		
						d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
				   }).on("contextmenu", function(d, index){
					snapLevel = 3;
					//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;
					snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
					canvasImage = "chart";
					snapshotRankPopup(level0_Id,level1_Id,d.id_2);
					$('#snapshot-popup-id').click();
					/*var y, x;
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
						.style('display', 'block');*/
					d3.event.preventDefault();
				   });

				//LOWER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
				  		 .call(d3.svg.axis().scale(lower).orient("left").ticks(6)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});
			 	/// Barchart Ends here;

			//}else if(((QrMaxValue < maxvall) && (QrMaxValue == 0))  || ((QrMaxValue == 0) && (maxvall == 0))){ // **** Bar chart Starts here ****
			 } else {
	
				var x = d3.scale.ordinal().rangeRoundBands([0, 530], .1);//672
				var y = d3.scale.linear().range([500, 0]);

				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
				var cnt = 0;
				x.domain(data.map(function(d) { return d.name_2; }));
				y.domain([0, d3.max(data, function(d) {  if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

				//SVG Declaring with id named BAR , height , width and Transform
				var svg = d3.select("#bar").append("svg").attr("width",700).attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
							    .attr("transform", "translate(-140,50)");

				var lower = d3.scale.linear().domain([minvalue,maxvall]).range([320,0]).clamp(true);//,//minv, epval//QrMaxValue//meanVal

				//Lower Bar chart
				svg.selectAll("rect.lower")
					   .data(data).enter()
					   .append("rect")
					   .attr("class", "lower")
					   .attr("x", function(d, i) {  return 250 + i * (350/cnt);      })//return 250 + i * 20; })
					   .attr("width",(200/cnt))
					   .attr("y", function(d) { if(d.value == "inf"){return lower((maxvall));}else{return lower((d.value));} })
					   .attr("height", function(d) { if(d.value == "inf"){return 320 - lower((maxvall));}else{return 320 - lower((d.value)); }})
					   .style("fill", function(d) { if(d.value == "inf"){return color(maxvall);}else{return color(d.value);}})
					   .on('mouseover', function(d) {
							d3.select('#spacialcontent').style('display','');
							var mouse = d3.mouse(d3.select('.lower')[0][0])
							d3.select(this).style('opacity', .8).style('stroke-width', 1.5)
							d3.select('#spacialcontent').html( d.name_2 + ' <span class="value">(' + d.value + ')</span> &nbsp;' + '<span style="color:' + + '">&#9608;</span>').style('top', mouse[1] + 'px').style('left', (((mouse[0]) ) + 'px')) 
							.style('opacity', 1) })
					   .on('mouseout', function(d) {
					 		d3.select('#spacialcontent').style('display','none');		
							d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)
					   }).on("contextmenu", function(d, index){
						snapLevel = 3;
						//snapURL = "scisphere/places/"+level1_Id+"/"+d.id_2+"?level="+snapLevel+"&level0="+level0_Id+"&year="+yrtype;
						snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id_2+"&levels=2";
						canvasImage = "chart";
						snapshotRankPopup(level0_Id,level1_Id,d.id_2);
						$('#snapshot-popup-id').click();
						/*var y, x;
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
							.style('display', 'block');*/
						d3.event.preventDefault();
					   });

				//LOWER Bar chart	
				svg.append("g").attr("transform", "translate(240,0)")
			  		 //.call(d3.svg.axis().scale(lower).orient("left").ticks(6));
					 .call(d3.svg.axis().scale(lower).orient("left").ticks(6)).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

				}
		}
	}		

	if(datas.length == 0){
		var svg = d3.select("#bar").append("svg").attr("width",650)
			.attr("height", 450).attr('id','bar1').append("g").attr("id", "barChart")
			.attr("transform", "translate(-150,0)");

		var levelType_ND = '';
		if(levelType){
			levelType_ND = levelType.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
		var text = svg.append("svg:text").attr("class", "nobar").attr("x", 450).attr("y", 190).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 20px sans-serif").text("No Data at "+ levelType_ND +" level");
		var bbox = text.node().getBBox();
	}

	if(q3>0){
		// call histogram
		if(quartile3 ==1){
	   		histogramLoad(mn1);
		}else{
          		histogramLoad(mn);
		}
	}else{
		document.getElementById('meanId').innerHTML = "";
		document.getElementById('medianId').innerHTML = "";
	}

}

