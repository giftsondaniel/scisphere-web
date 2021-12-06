function shareChart(level0Id, level1Id, levelid, data_val ,yr,levelType,minvalue, secval, midval1, forval, maxvall, svgid, fld){
	
	var level1_Id = level1Id;
	var level0_Id = level0Id;
	var yrtype=2011;

	datas = data_val;
	//sorting values to find outliers
	var data1 = datas.sort(function(a,b) { return a.value - b.value; });

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
	var q1;
	if(q3 == 0){
		//var mn1 = [];
		var quartile3=1;
		for (i = 0; i<data1.length ; i++){ /*mn.push(+data1[i].value);*/ mn1.push(+data1[i].value);}	
		q1 = mn1[Math.floor((mn1.length / 4))];
		var q2 = mn1[Math.floor((mn1.length / 2))];
	    	var q3 = mn1[Math.floor((mn1.length * (0.75)))];
    		var iqr = q3 - q1;	
	}else{
		//Getting outliers
		q1 = mn[Math.floor((mn.length / 4))];
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

				if(a.value =="inf" && b.value =="inf" ){	return 0; 			}
				if(a.value =="inf"){				return b.value - maxvall; 	}
				if(b.value =="inf"){				return maxvall - a.value; 	}
				if(a.value =="-inf" && b.value =="-inf" ){	return 0; 			}
				if(b.value =="-inf"){				return b.value - a.value; 	}
				if(a.value =="inf"){				return b.value - b.value; 	}				
				else { 						return b.value - a.value;  	}
				 
			 });

	if(data.length > 200){		d3.selectAll("#bar-tab").style("overflow-x", "auto");		} 
	else {				d3.selectAll("#bar-tab").style("overflow-x", "hidden");		}

	if(fld){
	    if((fld == 'IND_ROAD_01') || (fld == 'IND_ROAD_02') || (fld == 'IND_ROAD_03') ||(fld == 'IND_ROAD_04')){	
		    var svg = d3.select("#bar_"+fld).append("svg").attr("width",650)
			.attr("height", 450).attr('id','bar1_'+fld).append("g").attr("id", "barChart")
			.attr("transform", "translate(-150,0)");

		    var text = svg.append("svg:text").attr("class", "nobar").attr("x", 450).attr("y", 150).attr("dy", ".35em")
			.attr("text-anchor", "middle").style("font", "100 20px sans-serif")
			.text("This feature is not available for this variable.");
	    }	
	}

	if(minvall === maxvall && maxvall === 0){
		range = [0,0,0,0,0];
		return false;
	}

	if(minvall < 0){ //Chart with Negative Values come under this Chart.. With Negative bar:
		var barData= [];
		for( i = 0; i < datas.length; i++) {

		    d = [];	
		    if(levelid == 2){		 
			    d["0"] = datas[i].name_2+"_"+datas[i].id_2;
			    d["1"] = +datas[i].value;
		    } else if (levelid == 3 ){
			    d["0"] = datas[i].name_3+"_"+datas[i].id_3;
			    d["1"] = +datas[i].value;
		    }	
		    barData.push(d);
		}
		if(sizeRequired == 450 ){	
			d3.select("#map")
				    .datum(barData)
				    .call(shareColumnChart()
				    .width(450)
				    .height(420)
				    .x(function(d, i) { return d[0]; })	
				    .y(function(d, i) { return d[1]; }));
		}
		if(sizeRequired == 350 ){	
			d3.select("#map")
				    .datum(barData)
				    .call(shareColumnChart()
				    .width(350)
				    .height(320)
				    .x(function(d, i) { return d[0]; })	
				    .y(function(d, i) { return d[1]; }));
		}
		if(sizeRequired == 250 ){	
			d3.select("#map")
				    .datum(barData)
				    .call(shareColumnChart()
				    .width(250)
				    .height(220)
				    .x(function(d, i) { return d[0]; })	
				    .y(function(d, i) { return d[1]; }));
		}

	} else {
		if((QrMaxValue < maxvall) && (QrMaxValue != 0) ){

			var second_middle_value = (quartilesVal[2]+minvalue)/2;
			var second_fourth_value = (second_middle_value+quartilesVal[2])/2;
			var second_second_value = (second_middle_value+minvalue)/2;

			if(minvalue== second_middle_value){
					range = [minvalue, secval, midval1, forval, maxvall];
					color = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);
			}else{
					range = [minvalue,second_second_value, second_middle_value, quartilesVal[2],maxvall];
					color = d3.scale.linear().range(colors).domain([minvalue, second_second_value, second_middle_value, quartilesVal[2],maxvall ]);	
			}

			var x = d3.scale.ordinal().rangeRoundBands([0, 530], .1);
			var y = d3.scale.linear().range([500, 0]);
			var xAxis = d3.svg.axis().scale(x).orient("bottom");
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
			var cnt = 0;


		        if(levelid == 2){ x.domain(data.map(function(d) {  return d.name_2; }));				} 
			if(levelid == 3){ x.domain(data.map(function(d) {  return d.name_3; }));				}						
			y.domain([0, d3.max(data, function(d) { if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

			if(cnt < 5){ cnt=cnt + 5;	}

			var svg = d3.select("#map")
						.append("svg")
						.attr("width",sizeRequired)
						.attr("height", sizeRequired)
						.attr('id','share_svg').style('background-color','#F6F9FE')
						.append("g")
						.attr("id", "barChart")
						.attr("transform", "translate(-180,50)");

			if(sizeRequired == 450){
				var lower = d3.scale.linear().domain([minvalue,QrMaxValue]).range([320,100]).clamp(true),
		    	        upper = d3.scale.linear().domain([QrMaxValue,maxvall]).range([80,0]).clamp(true);
			}
			if(sizeRequired == 350){
				var lower = d3.scale.linear().domain([minvalue,QrMaxValue]).range([258,80]).clamp(true),
		    	        upper = d3.scale.linear().domain([QrMaxValue,maxvall]).range([70,0]).clamp(true);
			}
			if(sizeRequired == 250){
				var lower = d3.scale.linear().domain([minvalue,QrMaxValue]).range([185,56]).clamp(true),
		    	        upper = d3.scale.linear().domain([QrMaxValue,maxvall]).range([50,0]).clamp(true);
			}
		
			//Lower Bar chart
			svg.selectAll("rect.lower")
			   	.data(data).enter()
			   	.append("rect")
			   	.attr("class", "lower")
			   	.attr("x", function(d, i) {
						if(sizeRequired == 450){
							 return 250 + i * (330/cnt);     
						}
						if(sizeRequired == 350){
							 return 250 + i * (250/cnt);     
						}
						if(sizeRequired == 250){
							 return 250 + i * (170/cnt);     
						}

					 })
			   	.attr("width", function(d, i) {
						if(sizeRequired == 450){
							 return (200/cnt);     
						}
						if(sizeRequired == 350){
							 return (150/cnt);     
						}
						if(sizeRequired == 250){
							 return (100/cnt);     
						}

					 })
			   	.attr("y", function(d) { if(d.value == "inf"){
									return lower((maxvall));}else{return lower((d.value));}
							 })
				.attr("height", function(d) {
 
						if(sizeRequired == 450){
						     if(d.value == "inf"){	
								return 320 - lower((maxvall));}
						      else{
								return 320 - lower((d.value));
						     }
						}
						if(sizeRequired == 350){
						     if(d.value == "inf"){	
								return 258 - lower((maxvall));}
						      else{
								return 258 - lower((d.value));
						     }
						}
						if(sizeRequired == 250){
						     if(d.value == "inf"){	
								return 185 - lower((maxvall));}
						      else{
								return 185 - lower((d.value));
						     }
						}

							 })
				.style("fill", function(d) { if(d.value == "inf"){	return color(maxvall);}else{return color(d.value);}})
				.on('mouseover', function(d) { 		d3.select(this).style('opacity', .8).style('stroke-width', 1.5); 	})
				.on('mouseout', function(d) {		d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0);    })
   				.call(d3.helper.tooltip()
					.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
					.style({color: 'black'})
					.text(function(d, i){ 
					      if(d){
						    var valset;
						    if(levelid == 2){	valset = level_2.filter(d.id_2);	}
						    if(levelid == 3){	valset = level_3.filter(d.id_3);	}

						    var dt = print_filter(valset);

    					            var value = '';
						    if(isInteger( d.value)){
							value =  d.value;
						    }else{
							value = numberFormatTitleValues( d.value);
						    }
						    if(dt.length == 0){
							return d.name_3.toTitleCase() + ' ( No Data)';
						    }else if(!d.value && d.value != 0){
							if(levelid == 2){       return d.name_2.toTitleCase() + ' ()';    	}
							if(levelid == 3){	return d.name_3.toTitleCase() + ' ()';	}
						    }else{
							var value = '';	
							if(isInteger(d.value)){   value = d.value;   }else{  value = numberFormatTitleValues(d.value);    }
							if(levelid == 2){    return d.name_2.toTitleCase() + ' (' +value + ')'; 	      }	
							if(levelid == 3){    return d.name_3.toTitleCase() + ' (' +value + ')';	      }	
						    }
					      }	
					})
		    		);
			
			//Upper Bar chart	
			svg.selectAll("rect.upper")
			   	.data(data)
			   	.enter()
			   	.append("rect")
			   	.attr("class", "upper")
			   	.attr("x", function(d, i) {
							if(sizeRequired == 450){
								 return 250 + i * (330/cnt);     
							}
							if(sizeRequired == 350){
								 return 250 + i * (250/cnt);     
							}
							if(sizeRequired == 250){
								 return 250 + i * (170/cnt);     
							}

					 })
			   	.attr("width", function(d, i) {
							if(sizeRequired == 450){
								 return (200/cnt);     
							}
							if(sizeRequired == 350){
								 return (150/cnt);     
							}
							if(sizeRequired == 250){
								 return (100/cnt);     
							}

					 })
			   	.attr("y", function(d) { if(d.value == "inf"){return upper(maxvall);}else{return upper(d.value); }})
				.attr("height", function(d) {
 
							if(sizeRequired == 450){
							    if(d.value == "inf"){return maxvall >= QrMaxValue ? 80 - upper((maxvall)) : 0;}
							    else{return d.value >= QrMaxValue ? 80 - upper((d.value)) : 0;} 
							}
							if(sizeRequired == 350){
							    if(d.value == "inf"){return maxvall >= QrMaxValue ? 70 - upper((maxvall)) : 0;}
							    else{return d.value >= QrMaxValue ? 70 - upper((d.value)) : 0;} 
							}
							if(sizeRequired == 250){
							    if(d.value == "inf"){return maxvall >= QrMaxValue ? 50 - upper((maxvall)) : 0;}
							    else{return d.value >= QrMaxValue ? 50 - upper((d.value)) : 0;} 
							}

							 })
			   	.style("fill", function(d) {if(d.value == "inf"){return color(maxvall);}else{return color(d.value);} })
			   	.on('mouseover', function(d) { d3.select(this).style('opacity', .8).style('stroke-width', 1.5)          })
			   	.on('mouseout', function(d) {  d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0)   	})
			    	.call(d3.helper.tooltip()
					.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
					.style({color: 'black'})
					.text(function(d, i){ 
					      if(d){
						    var valset;
						    if(levelid == 2){	valset = level_2.filter(d.id_2);	}
						    if(levelid == 3){	valset = level_3.filter(d.id_3);	}

						    var dt = print_filter(valset);

    					            var value = '';
						    if(isInteger( d.value)){
							value =  d.value;
						    }else{
							value = numberFormatTitleValues( d.value);
						    }
						    if(dt.length == 0){
							return d.name_3.toTitleCase() + ' ( No Data)';
						    }else if(!d.value && d.value != 0){
							if(levelid == 2){       return d.name_2.toTitleCase() + ' ()';    	}
							if(levelid == 3){	return d.name_3.toTitleCase() + ' ()';	}
						    }else{
							var value = '';	
							if(isInteger(d.value)){   value = d.value;   }else{  value = numberFormatTitleValues(d.value);    }
							if(levelid == 2){    return d.name_2.toTitleCase() + ' (' +value + ')'; 	      }	
							if(levelid == 3){    return d.name_3.toTitleCase() + ' (' +value + ')';	      }	
						    }
					      }	
					})
		    		);
			var formatValue = d3.format(".2s");
			//LOWER Bar chart	
			svg.append("g").attr("transform", "translate(240,0)").attr("class", "tickValues")
		  		 .call(d3.svg.axis().scale(lower).orient("left").ticks(6)
					 .tickFormat(function(d) {  
						return formatValue(d);
					}))
				.style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

			var numberFormat = d3.format(".2f");
			if((maxvall%1) == 0){
				numberFormat = d3.format(".0f");	
			}
			if((maxvall/1000) > 0){
				numberFormat = d3.format(".1f");	
			}
			//UPPER Bar chart	
			svg.append("g").attr("transform", "translate(240,0)").attr("class", "tickValues").call(d3.svg.axis().scale(upper).orient("left").ticks(1).tickValues([maxvall ]).tickFormat(function(d) { /* return valueRound(maxvall ,numberFormat);*/ return formatValue(d); })).style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});


			if(sizeRequired== 250){
				d3.selectAll(".tickValues").style({"font": "Roboto, sans-serif",'font-size':'8px',"fill":"#5F5F5F"}); ///.attr("class", "tickValues")
			}

		} else {
			var x = d3.scale.ordinal().rangeRoundBands([0, 530], .1);//672
			var y = d3.scale.linear().range([500, 0]);

			var xAxis = d3.svg.axis().scale(x).orient("bottom");
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
			var cnt = 0;
			x.domain(data.map(function(d) { return d.name_2; }));
			y.domain([0, d3.max(data, function(d) {  if((+d.value) >0){  cnt = cnt+1} return +d.value; })]);

			//SVG Declaring with id named BAR , height , width and Transform
			var svg = d3.select("#map")
					.append("svg")
					.attr("width",sizeRequired)
					.attr("height", sizeRequired)
					.attr('id','share_svg').style('background-color','#F6F9FE')
					.append("g")
					.attr("id", "barChart")
				        .attr("transform", "translate(-180,50)");

			if(cnt < 5){
				cnt = cnt + 5;
			}


			if(sizeRequired == 450){
				var lower = d3.scale.linear().domain([minvalue,maxvall]).range([320,0]).clamp(true);
			}
			if(sizeRequired == 350){
				var lower = d3.scale.linear().domain([minvalue,maxvall]).range([258,0]).clamp(true);
			}
			if(sizeRequired == 250){
				var lower = d3.scale.linear().domain([minvalue,maxvall]).range([185,0]).clamp(true);
			}
		
			//Lower Bar chart
			svg.selectAll("rect.lower")
			   	.data(data).enter()
			   	.append("rect")
			   	.attr("class", "lower")
			   	.attr("x", function(d, i) {
							if(sizeRequired == 450){
								 return 250 + i * (330/cnt);     
							}
							if(sizeRequired == 350){
								 return 250 + i * (250/cnt);     
							}
							if(sizeRequired == 250){
								 return 250 + i * (170/cnt);     
							}

					 })
			   	.attr("width", function(d, i) {
							if(sizeRequired == 450){
								 return (200/cnt);     
							}
							if(sizeRequired == 350){
								 return (150/cnt);     
							}
							if(sizeRequired == 250){
								 return (100/cnt);     
							}

					 })
			   	.attr("y", function(d) { if(d.value == "inf"){
									return lower((maxvall));}else{return lower((d.value));}
							 })
				.attr("height", function(d) {
 
							if(sizeRequired == 450){
							     if(d.value == "inf"){	
									return 320 - lower((maxvall));}
							      else{
									return 320 - lower((d.value));
							     }
							}
							if(sizeRequired == 350){
							     if(d.value == "inf"){	
									return 258 - lower((maxvall));}
							      else{
									return 258 - lower((d.value));
							     }
							}
							if(sizeRequired == 250){
							     if(d.value == "inf"){	
									return 185 - lower((maxvall));}
							      else{
									return 185 - lower((d.value));
							     }
							}

							 })
				.style("fill", function(d) { if(d.value == "inf"){	return color(maxvall);}else{return color(d.value);}})
				.on('mouseover', function(d) { 		d3.select(this).style('opacity', .8).style('stroke-width', 1.5); 	})
				.on('mouseout', function(d) {		d3.select(this).transition().duration(100).delay(200).style('opacity', 1).style('stroke-width', 0);    })
   				.call(d3.helper.tooltip()
					.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
					.style({color: 'black'})
					.text(function(d, i){ 
					      if(d){
						    var valset;
						    if(levelid == 2){	valset = level_2.filter(d.id_2);	}
						    if(levelid == 3){	valset = level_3.filter(d.id_3);	}

						    var dt = print_filter(valset);

    					            var value = '';
						    if(isInteger( d.value)){
							value =  d.value;
						    }else{
							value = numberFormatTitleValues( d.value);
						    }
						    if(dt.length == 0){
							return d.name_3.toTitleCase() + ' ( No Data)';
						    }else if(!d.value && d.value != 0){
							if(levelid == 2){       return d.name_2.toTitleCase() + ' ()';    	}
							if(levelid == 3){	return d.name_3.toTitleCase() + ' ()';	}
						    }else{
							var value = '';	
							if(isInteger(d.value)){   value = d.value;   }else{  value = numberFormatTitleValues(d.value);    }
							if(levelid == 2){    return d.name_2.toTitleCase() + ' (' +value + ')'; 	      }	
							if(levelid == 3){    return d.name_3.toTitleCase() + ' (' +value + ')';	      }	
						    }
					      }	
					})
		    		);
			

			//LOWER Bar chart	
			var formatValue = d3.format(".2s");

			svg.append("g").attr("transform", "translate(240,0)").attr("class", "tickValues")
				 .call(d3.svg.axis().scale(lower).orient("left").ticks(6)
					 .tickFormat(function(d) {  
						if(d > 100000){
							var numberFormat = d3.format(".2f");
							if((d %1) == 0){  	numberFormat = d3.format(".0f");	 }
							if((d/100000) > 0){ 	numberFormat = d3.format(".1f");	 }
							return valueRound(d ,numberFormat); 
						}else{
							return d;	
						}
					}))
				.style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"});

			if(sizeRequired== 250){
				d3.selectAll(".tickValues").style({"font": "Roboto, sans-serif",'font-size':'8px',"fill":"#5F5F5F"}); ///.attr("class", "tickValues")
			}

			}
	}		

	if(datas.length == 0){
		var svg = d3.select("#bar").append("svg")
			.attr("width",sizeRequired)
			.attr("height", sizeRequired)
			.attr('id','share_svg').style('background-color','#F6F9FE')
			.append("g")
			.attr("id", "barChart")
			.attr("transform", "translate(-150,0)");

		var levelType_ND = '';
		if(levelType){
			levelType_ND = levelType.toTitleCase();
		}
		var text = svg.append("svg:text").attr("class", "nobar").attr("x", 450).attr("y", 190).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 20px sans-serif").text("No Data at "+ levelType_ND +" level");
		var bbox = text.node().getBBox();
	}
	

	runLegend();


}

