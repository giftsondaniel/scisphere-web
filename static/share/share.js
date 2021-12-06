var sub_list,level0Data,level1Data,levelsData,colorRequired, sizeRequired;
var Raw_Data, color, border = 2, bordercolor = 'rgb(205,201,201)', width = sizeRequired,   height = sizeRequired,  centered;
var margin = {top: 20, right: 120, bottom: 20, left: 120};

var svg = d3.select("#map")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("left", "500");

    svg.append("rect")
		.attr("class", "mapRect")
		.attr("id", "mapRectId")
		.attr("width", width)
		.attr("height", height)
		.style("stroke", bordercolor)
		.style("fill", "none");
		//.style("stroke-width", border);

// SVG 2
var svg2 = svg.append("g").attr("id", "mapRectId_g");
var path, projection;
var numberFormatTitleValues = d3.format(".2f");

function ready(error, tn) {
   svg.transition().style("opacity", 1);
}

function isInteger(x) {
    return x % 1 === 0;
}

/* Onload */
window.onload = function(){

	levelid =level_id;
	fieldid =fieldId;
	Raw_Data = [];

	colors = generic_color = colorbrewer.Blues[5].map(function(rgb) { return d3.hsl(rgb);	});

	if(colorRequired == "Orange"){	colors = generic_color = colorbrewer.Oranges[5].map(function(rgb) {return d3.hsl(rgb); });	 }
	if(colorRequired == "Blue"){	colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {return d3.hsl(rgb);   });	 }
	if(colorRequired == "Mixed"){	colors = generic_color = colorbrewer.RdYlBu[5].map(function(rgb) {return d3.hsl(rgb);  });	 }
	if(colorRequired == "Green"){	colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {return d3.hsl(rgb);    });	 }
	if(colorRequired == "Violet"){	colors = generic_color = colorbrewer.BuPu[5].map(function(rgb) {return d3.hsl(rgb);    });	 }
	if(colorRequired == "Red"){	colors = generic_color = colorbrewer.PuRd[5].map(function(rgb) {return d3.hsl(rgb);    });	 }

	if(renderData){
		for(var i=0;i<renderData.length;i++){
			var obj=renderData[i];
			if(fieldid.toLowerCase() in obj){
				var arr={};
				arr['id_1'] = renderData[i].id_1;
				arr['id_2'] = renderData[i].id_2;
				arr['name_1'] = renderData[i].name_1;
				arr['name_2'] = renderData[i].name_2;
				if(levelid == 3){
					arr['id_3'] = renderData[i].id_3;
					arr['name_3'] = renderData[i].name_3;
				}
				arr['year'] = 2011;
				arr['key']= fieldid;
				if(renderData[i][fieldid.toLowerCase()] || renderData[i][fieldid.toLowerCase()]==0){
					arr['value']=renderData[i][fieldid.toLowerCase()];
				}else{
					arr['value']="";
				}
				Raw_Data.push(arr);
			}
		}
	}

	dataFilter('',fieldid,levelid);

}

/* Data Filter Ends Here */
function dataFilter(d,fieldid, levelid) {

	var dataById={};
	var yrtype = 2011;
	var topoJsonAvailable = 0;
	var topoJsonMap = "";

	rawData = crossfilter(Raw_Data);
	var all = rawData.groupAll();
	keyVal = rawData.dimension(function(d) {	return d.key; 	});
	yearVal = rawData.dimension(function (d) {	return d.year;	});
	level_2 = rawData.dimension(function(d) {	return d.id_2;	});

	if(levelid == 3){
	    level_3 = rawData.dimension(function(d) {	return d.id_3;  });
	}
	//Clearing Earlier filtered data
	keyVal.filterAll();
	yearVal.filterAll();
	level_2.filterAll();

	if(levelid == 3){     level_3.filterAll();	}

	// Filtering by field and year
	key = keyVal.filter(fieldid);//.toLowerCase()
	key1 = yearVal.filter('2011');
	data_val =  print_filter(key);

	//var data = [1,2,3,20,25]; // MIN AND MAX Values
	var minvall = d3.min(data_val, function(d) {	return +d.value;	});
	var maxvall = d3.max(data_val, function(d) {	return +d.value;	});
	minvalue = ((minvall / 10) * 9.6);
	minvalu = ((minvall / 10) * 12);
	domain = [minvalue, maxvall];

	var twval = (domain[0] + domain[1])
	var midval1 = (twval / 2);
	var secval = ((domain[0] + midval1) / 2);
	var forval = ((domain[1] + midval1) / 2);
	var midval = (domain[1] / 2); 

	color = d3.scale.linear()
			.range(colors)
			.domain([minvalue, secval, midval1, forval, maxvall]);

	/* Setting Range of values used for Legend */	
	range = [minvalue, secval, midval1, forval, maxvall];
	
	var distid= d.id;
        var x, y, k;
        if (d && centered !== d) {
            k = 1;
        }
        else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

	var scaleVal, lat, long,latdif,longdif, scale4, scale5, projection, path;
	var topoMap;	
	var svgid = 1;

	if(type == "map"){

		d3.json("/static/region_explorer/TOPO/"+level0Id+"_"+level1Id+"_"+levelid+"_2011_"+leveltype+"_topo.json", function(topoMap) {//TN_2001.json
		    	topojsonMap(topoMap, level0Id, level1Id, levelid, dataById, x, y, k,yrtype,leveltype,minvalue, secval, midval1, forval, maxvall,svgid);
		});	
	} else if(type == "chart") {

		shareChart(level0Id, level1Id, levelid, data_val ,yrtype,leveltype,minvalue, secval, midval1, forval, maxvall,svgid ,fieldid);
	}

}
/* Data Filter Ends Here */

/* Topojson Starts Here */
function topojsonMap(topoMap, level0_Id, level1_Id, levelid, dataById , x, y, k, yrtype,leveltype,minvalue, secval, midval1, forval, maxvall, svgid){

	if(topoMap){

		var topojsonKeyValue={};

		if(topoMap.objects.levels.geometries){
		    for(var i=0;i <topoMap.objects.levels.geometries.length;i++){
			if(topoMap.objects.levels.geometries[i].properties){
			    if(topoMap.objects.levels.geometries[i].properties.name){
			        if(levelid == 2){		
				    topojsonKeyValue[topoMap.objects.levels.geometries[i].properties.id_2]=topoMap.objects.levels.geometries[i].properties.name;
				}
				if(levelid == 3){		
				    topojsonKeyValue[topoMap.objects.levels.geometries[i].properties.id_3]=topoMap.objects.levels.geometries[i].properties.name;
				}
			    }
			}
		    }
		}

		/* Get latlong from BBOX of topojson */
		snapLevel = 2;
		lat =(topoMap.bbox[0] + topoMap.bbox [2] )/2;					
		long =(topoMap.bbox[1] + topoMap.bbox [3])/2;
		latdif = (topoMap.bbox[0] - topoMap.bbox [2] );
		longdif = (topoMap.bbox[1] - topoMap.bbox [3] );
		if(sizeRequired == 450){
			scale4 = 52*500/(topoMap.bbox [2]-topoMap.bbox [0]);
			scale5 = 52*500/(topoMap.bbox [3]-topoMap.bbox [1])*(0.9);
		}
		if(sizeRequired == 350){
			scale4 = 52*350/(topoMap.bbox [2]-topoMap.bbox [0]);
			scale5 = 52*350/(topoMap.bbox [3]-topoMap.bbox [1])*(0.9);
		}
		if(sizeRequired == 250){
			scale4 = 52*250/(topoMap.bbox [2]-topoMap.bbox [0]);
			scale5 = 52*250/(topoMap.bbox [3]-topoMap.bbox [1])*(0.9);
		}

		if(scale5 > scale4){  scaleVal = scale4; }
		if(scale4 > scale5){  scaleVal = scale5; }

		if(level0Id == '840' && level1Id == '2'){
								/*Working Only for Alaska */ 
			projection = d3.geo.albersUsa()
					.translate([650, 200])
					.scale(scaleVal*10);
		} else {
			if(sizeRequired == 450){
									/*Working for rest of the maps */            
				projection = d3.geo.albers()
						.translate([210, 240])
						//.translate([165, 200])
						.origin([lat ,long])
						.scale(scaleVal/1.2);
			}

			if(sizeRequired == 350){
									/*Working for rest of the maps */            
				projection = d3.geo.albers()
						//.translate([210, 240])
						.translate([165, 200])
						.origin([lat ,long])
						.scale(scaleVal/1.2);
			}

			if(sizeRequired == 250){
									/*Working for rest of the maps */            
				projection = d3.geo.albers()
						.translate([125, 140])
						.origin([lat ,long])
						.scale(scaleVal/1.2);
			}
		}	

		path = d3.geo.path().projection(projection);
		carto = d3.cartogram().projection(projection)
				.properties(function(d) {	return dataById[d.id];	})
				.value(function(d) {	return +d.properties[field];	});

		geometries = topoMap.objects.levels.geometries; 
		features = carto.features(topoMap, geometries);

		var svg = d3.select("#map")
				  .append("svg")
				.attr("id","share_svg")
				.attr("width", width)
				.attr("height", height)
				.attr("left", "500")
				.style('background-color','#F6F9FE');

		svg.append("rect")
			.attr("class", "mapRect")
			.attr("width", width)
			.attr("height", height)
			//.style("stroke", bordercolor)
			.style("fill", "none");
			//.style("stroke-width", '2px');

		//SVG 2
		var svg2 = svg.append("g");

		svg2.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("id", "svg_id")
			.attr('transform', 'rotate(0)') 
			.selectAll("path")
			    .data(features, function(d) { return d.id ;})
			.attr("class", "land")
			.enter()
			    .append("path")
			.attr("class", "map_land")
			.attr("id", function(d, i) { return d.id; })
			.attr("stroke"," #171717")
			.style('stroke-width', 0.3)
			.attr("d", path)
			.call(d3.helper.tooltip()
				.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
				.style({color: 'black'})
				.text(function(d, i){ 
				      if(d.id){
					    var valset;
					    if(levelid == 2){	valset = level_2.filter(d.id);	}
					    if(levelid == 3){	valset = level_3.filter(d.id);	}

					    var dt = print_filter(valset);

					    if(dt.length == 0){
						return dt[0].name_3.toTitleCase() + ' ( No Data)';
					    }else if(!dt[0].value && dt[0].value != 0){
						if(levelid == 2){       return dt[0].name_2.toTitleCase() + ' ()';    	}
						if(levelid == 3){	return dt[0].name_3.toTitleCase() + ' ()';	}
					    }else{
						var value = '';	
						if(isInteger(dt[0].value)){   value = dt[0].value;   }
						else{  value = numberFormatTitleValues(dt[0].value);    }

						if(levelid == 2){    return dt[0].name_2.toTitleCase() + ' (' +value + ')'; 	      }	
						if(levelid == 3){    return dt[0].name_3.toTitleCase() + ' (' +value + ')';	      }	
					    }
				      }	
				})
			    )
			.style("fill", function(d, i) {

				var valset;
				if(levelid == 2){ 	valset = level_2.filter(d.id); 	}
				if(levelid == 3){	valset = level_3.filter(d.id);	}

				var dt = print_filter(valset);
				if(dt[0]){ 

				    if(dt[0].value == 'inf'){ 	return color(maxvall);} 
				    else {
					if((dt[0].value == '0') && (range[4] == range[0])){	return "#eff3ff"; }
					else if(!(dt[0].value)  && (range[4] == range[0])){ 	return "#eff3ff"; }
					else {	return color(dt[0].value);	}
				    }	

				} else { return 'black'; }
			});


		/*for Legend*/					
		runLegend();

	        svg2.attr("transform", "rotate(0)")
			.transition()
			.duration(0)
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
			.style("stroke-width", 1.5 / k + "px");

	}
}
/* Topojson Ends Here */


/* Legend Starts Here */
function legendNew(minvalue, secval, midval1, forval, maxvall) {

    var numberFormat = d3.format(".0f");		    
    if(secval) {

	numberFormat = d3.format(".0f");
	var numberFormat1 = d3.format(".0f");
	var numberFormatValue=0;
	
	for(i = 0 ; i < 5 ; i++){
    	    for(j = 0 ; j < 5 ; j++){
	     	if(numberFormat1(range[i+1])){
		    var val1_i = (numberFormat1(numberFormat1(range[i]))).length;
		    var val_i = (numberFormat1(numberFormat1(range[i])));
		    var Value_i;

		    if ((val1_i > 0) && (val1_i <= 3)) { 	Value_i = (numberFormat(range[i]));		    			    }
		    if ((val1_i > 3) && (val1_i <= 6)) {  	finalValue_i = val_i / 1000;   	Value_i = (numberFormat(finalValue_i));	    }
		    if ((val1_i > 6) && (val1_i <= 9)) {	finalValue_i = val_i / 1000000;	Value_i = (numberFormat(finalValue_i));	    }
		    if (val1_i > 9) {	finalValue_i = val_i / 1000000000; 	Value_i = (numberFormat(finalValue_i));		    	    }
					
		    var val1_iplus1 = (numberFormat1(numberFormat1(range[i+1]))).length;
		    var val_iplus1 = (numberFormat1(numberFormat1(range[i+1])));		

	   	    if ((val1_iplus1 > 0) && (val1_iplus1 <= 3)) {	Value_iplus1 = (numberFormat(range[i+1]) + " ");    					    }
		    if ((val1_iplus1 > 3) && (val1_iplus1 <= 6)) {	finalValue_iplus1 = val_iplus1 / 1000;	Value_iplus1 = (numberFormat(finalValue_iplus1));   }
		    if ((val1_iplus1 > 6) && (val1_iplus1 <= 9)) {	finalValue_iplus1 = val_iplus1 / 1000000; Value_iplus1 = (numberFormat(finalValue_iplus1)); }
		    if ( val1_iplus1 > 9) {	finalValue_iplus1 = val_iplus1 / 1000000000;	Value_iplus1 = (numberFormat(finalValue_iplus1));		    }

		    if(parseFloat(Value_i) == parseFloat(Value_iplus1)){
		    	if(numberFormatValue < j){
				numberFormat = d3.format("."+(j-1)+"f");
				numberFormatValue = j-1;
		    	}
		    }else{
	  		break;
		    }
		}
	    }
	}

	var legendWidth =  (sizeRequired*(1/3)) + sizeRequired;
	var legendHeight =  sizeRequired - (sizeRequired*(1/3));
	
	d3.select("#share_svg").selectAll('.legend22').remove();

	if(sizeRequired== 450){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_1")
			.attr("width", 600)
			.attr("height", 300)
			.selectAll("g")
			.data(color.domain().slice().reverse())
			.enter()
			.append("g")
			.attr("transform", function(d, i) {	return "translate(" +  (250 -(i * 40) ) + ",20 )scale(0.8)";	});

		var ls_w = 20, ls_h = 20;

		legend.append("rect")
			.attr("width", ls_w + 30)
			.attr("height", ls_h)
			.style("fill", function(d, i) {	return color(d);	})
			.style("opacity", 0.8)
			.attr("y", 06);

		legend.append("text")
			.text(function(d, i) {
				var formatValue = d3.format(".2s");
				if(i==0){	return (formatValue(d) + "  +");	}
				else{		return formatValue(d);			}
			})
			.style({'font-size':'11px'});
	}

	if(sizeRequired == 350){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_1")
			.attr("width", 300)
			.attr("height", 150)
			.selectAll("g")
			.data(color.domain().slice().reverse())
			.enter()
			.append("g")
			.attr("transform", function(d, i) {	return "translate(" +  (210 -(i * 40) ) + ",20 )scale(0.8)";	});

			var ls_w = 20, ls_h = 20;

			legend.append("rect")
				.attr("width", ls_w + 30)
				.attr("height", ls_h)
				.style("fill", function(d, i) {	return color(d);	})
				.style("opacity", 0.8)
				.attr("y", 06);

			legend.append("text")
				.text(function(d, i) {
					var formatValue = d3.format(".2s");
					if(i==0){	return (formatValue(d) + "  +");	}
					else{		return formatValue(d);			}
				})
				.style({'font-size':'11px'});
	}

	if(sizeRequired == 250){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_1")
			.attr("width", 200)
			.attr("height", 80)
			.selectAll("g")
			.data(color.domain().slice().reverse())
			.enter()
			.append("g")
			.attr("transform", function(d, i) {	return "translate(" +  (150 -(i * 28) ) + ",20 )scale(0.8)";	});

			var ls_w = 15, ls_h = 15;

			legend.append("rect")
				.attr("width", ls_w + 20)
				.attr("height", ls_h)
				.style("fill", function(d, i) {	return color(d);	})
				.style("opacity", 0.8)
				.attr("y", 06);

			legend.append("text")
				.text(function(d, i) {
					var formatValue = d3.format(".2s");
					if(i==0){	return (formatValue(d) + "  +");	}
					else{		return formatValue(d);			}
				})
				.style({'font-size':'9px'});
	}

	//NO Data added in each case of Legend:
	var color_no_data_1 = d3.scale.linear().range(colors).domain([0]);

	if(sizeRequired== 450){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_2")
			.attr("width", 600)
			.attr("height", 300)
			.selectAll("g")
			.data(color_no_data_1.domain().slice().reverse())
			.enter().append("g")
			.attr("transform", "translate(" + ((4 * 50)+90) + ",20 )scale(0.8)" );

		var ls_w = 20, ls_h = 20;

		legend.append("rect")
			.attr("width", ls_w + 30)
			.attr("height", ls_h)
			.style("fill","black")
			.style("opacity", 0.8)
			.attr("y", 06);

		legend.append("text")
			.text("No Data")
			.style({'font-size':'11px'});
	}

	if(sizeRequired== 350){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_2")
			.attr("width", 300)
			.attr("height", 150)
			.selectAll("g")
			.data(color_no_data_1.domain().slice().reverse())
			.enter().append("g")
			.attr("transform", "translate(" + ((4 * 42)+80) + ",20 )scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect")
				.attr("width", ls_w + 30)
				.attr("height", ls_h)
				.style("fill","black")
				.style("opacity", 0.8)
				.attr("y", 06);

			legend.append("text")
				.text("No Data")
				.style({'font-size':'11px'});
	}

	if(sizeRequired== 250){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_2")
			.attr("width", 300)
			.attr("height", 80)
			.selectAll("g")
			.data(color_no_data_1.domain().slice().reverse())
			.enter().append("g")
			.attr("transform", "translate(" + ((4 * 32)+50) + ",20 )scale(0.8)" );

		var ls_w = 15, ls_h = 15;

		legend.append("rect")
			.attr("width", ls_w + 20)
			.attr("height", ls_h)
			.style("fill","black")
			.style("opacity", 0.8)
			.attr("y", 06);

		legend.append("text")
			.text("No Data")
			.style({'font-size':'9px'});


	}



    } else {


	d3.select("#share_svg").selectAll('.legend_2').remove();
	var color_no_data_1 = d3.scale.linear().range(colors).domain([0]);

	if(sizeRequired== 450){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_2")
			.attr("width", 600)
			.attr("height", 300)
			.selectAll("g")
			.data(color_no_data_1.domain().slice().reverse())
			.enter().append("g")
			.attr("transform", "translate(" +100+ ",20 )scale(0.8)" );

		var ls_w = 20, ls_h = 20;

		legend.append("rect")
			.attr("width", ls_w + 30)
			.attr("height", ls_h)
			.style("fill","black")
			.style("opacity", 0.8)
			.attr("y", 06);

		legend.append("text")
			.text("No Data")
			.style({'font-size':'11px'});

	}

	if(sizeRequired== 350){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_2")
			.attr("width", 300)
			.attr("height", 150)
			.selectAll("g")
			.data(color_no_data_1.domain().slice().reverse())
			.enter().append("g")
			.attr("transform", "translate(" + 100 + ",20 )scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect")
				.attr("width", ls_w + 30)
				.attr("height", ls_h)
				.style("fill","black")
				.style("opacity", 0.8)
				.attr("y", 06);

			legend.append("text")
				.text("No Data")
				.style({'font-size':'11px'});


	}
	if(sizeRequired== 250){
		var legend = d3.select("#share_svg")
			.append("svg")
			.attr("class", "legend22")
			.attr("id", "legend_2")
			.attr("width", 300)
			.attr("height", 80)
			.selectAll("g")
			.data(color_no_data_1.domain().slice().reverse())
			.enter().append("g")
			.attr("transform", "translate(" + 100 + ",20 )scale(0.8)" );

		var ls_w = 15, ls_h = 15;

		legend.append("rect")
			.attr("width", ls_w + 20)
			.attr("height", ls_h)
			.style("fill","black")
			.style("opacity", 0.8)
			.attr("y", 06);

		legend.append("text")
			.text("No Data")
			.style({'font-size':'9px'});


	}


     }
}
/* Legend Ends Here */

//Function called for getting datas into array from a crossfilter filter::
function print_filter(filter) {
	var f = eval(filter);	
	if (typeof(f.length) != "undefined") {}
	else {}
	if (typeof(f.top) != "undefined") {
		    f = f.top(Infinity);
		}
	else {}
	if (typeof(f.dimension) != "undefined") {
		    f = f.dimension(function(d) {
			return d;
		    }).top(Infinity);
		}
	else {}
	return f;
 };


/*Title case*/
String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  str = str.replace(/_/g," ");
  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'Per', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv','Town'];
  for (i = 0, j = uppers.length; i < j; i++)
     str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
       uppers[i].toUpperCase());

  return str;
}


function valueRound(d, numberFormat_form, j){
	var numberFormat = d3.format(".0f");
	numberFormat = numberFormat_form;
	var numberFormat1 = d3.format(".0f");
	var numberFormatValue=0;
	var i = j;
	var val1 = (numberFormat1((numberFormat1(d)))).length;
	    var val = (numberFormat1((numberFormat1(d))));
	    var Value;
	    if ((val1 > 0) && (val1 <= 3)) {
		if(i==0){	Value = (numberFormat(d) + "  +");	}
		else{ 	Value = (numberFormat(d) + " ");		}
	    }
	    if ((val1 > 3) && (val1 <= 6)) {
		finalValue = val / 1000;
		if(i==0){ 	Value = (numberFormat(finalValue) + " K  +");	}
		else{		Value = (numberFormat(finalValue) + " K");	}
	    }
	    if ((val1 > 6) && (val1 <= 9)) {
		finalValue = val / 1000000;
		if(i==0){	Value = (numberFormat(finalValue) + " M  +");	}
		else{		Value = (numberFormat(finalValue) + " M");	}
	    }
	    if (val1 > 9) {
		finalValue = val / 1000000000;
		if(i==0){	Value = (numberFormat(finalValue) + " B  +");	}
		else{		Value = (numberFormat(finalValue) + " B");	}
	    }
	return Value;
}

function runLegend(){
	/*for Legend*/					
	if((range[4] === range[0]) && ( range[0] === 0)){

		var color_no_data_1 = d3.scale.linear().range(colors).domain([0]);

		if(sizeRequired== 450){
			var legend = d3.select("#share_svg")
				.append("svg")
				.attr("class", "legend22")
				.attr("id", "legend_2")
				.attr("width", 600)
				.attr("height", 300)
				.selectAll("g")
				.data(color_no_data_1.domain().slice().reverse())
				.enter().append("g")
				.attr("transform", "translate(" + 100 + ",20 )scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect")
				.attr("width", ls_w + 30)
				.attr("height", ls_h)
				.style("fill","black")
				.style("opacity", 0.8)
				.attr("y", 06);

			legend.append("text")
				.text("No Data")
				.style({'font-size':'11px'});
		}

		if(sizeRequired== 350){
			var legend = d3.select("#share_svg")
				.append("svg")
				.attr("class", "legend22")
				.attr("id", "legend_2")
				.attr("width", 300)
				.attr("height", 150)
				.selectAll("g")
				.data(color_no_data_1.domain().slice().reverse())
				.enter().append("g")
				.attr("transform", "translate(" + 100 + ",20 )scale(0.8)" );

				var ls_w = 20, ls_h = 20;

				legend.append("rect")
					.attr("width", ls_w + 30)
					.attr("height", ls_h)
					.style("fill","black")
					.style("opacity", 0.8)
					.attr("y", 06);

				legend.append("text")
					.text("No Data")
					.style({'font-size':'11px'});
		}

		if(sizeRequired== 250){
			var legend = d3.select("#share_svg")
				.append("svg")
				.attr("class", "legend22")
				.attr("id", "legend_2")
				.attr("width", 300)
				.attr("height", 80)
				.selectAll("g")
				.data(color_no_data_1.domain().slice().reverse())
				.enter().append("g")
				.attr("transform", "translate(" + 100 + ",20 )scale(0.8)" );

			var ls_w = 15, ls_h = 15;

			legend.append("rect")
				.attr("width", ls_w + 20)
				.attr("height", ls_h)
				.style("fill","black")
				.style("opacity", 0.8)
				.attr("y", 06);

			legend.append("text")
				.text("No Data")
				.style({'font-size':'9px'});

		}

	}else if(range[4]){
		legendNew(range[0],range[1],range[2],range[3],range[4]);
	}

	var truncatedTitle = titleHtml;	
	if(sizeRequired == 450){
		truncatedTitle = titleHtml.substring(0,68);
		d3.select('#title-id').attr("fontSize", "12px");
		document.getElementById('popup-title').style.width = "448px";
	}
	else if(sizeRequired == 350){
		truncatedTitle = titleHtml.substring(0,38);
		d3.select('#title-id').attr("fontSize", "10px");
		document.getElementById('popup-title').style.width = "348px";
	}
	else if(sizeRequired == 250){
		truncatedTitle = titleHtml.substring(0,18);
		d3.select('#title-id').attr("fontSize", "8px");
		document.getElementById('popup-title').style.width = "248px";
	}

	titleHtml = titleHtml.replace(/\n/g,' ');

	document.getElementById('title-id').innerHTML = titleHtml;
	d3.select('#title-id').html = titleHtml;



}
