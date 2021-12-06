var sub_list,level0Data,level1Data,levelsData,colorRequired, sizeRequired, shareColors;
var Raw_Data, color, border = 2, bordercolor = 'rgb(205,201,201)',  centered;
var margin = {top: 20, right: 120, bottom: 20, left: 120};
var svgShare,svgShare2;

var pathShare, projectionShare;
var numberFormatTitleValues = d3.format(".2f");

function ready(error, tn) {
   svgShare.transition().style("opacity", 1);
}

function isInteger(x) {
    return x % 1 === 0;
}

var level0Id, level1Id, level, fieldId, leveltype, type, colorRequired , sizeRequired ;
var titleHtml="";

/* Onload */
//window.onload = function(){

levelid = document.getElementById("levelId").value;
 var widthShare ,heightShare;

function sharePreview(type, colorRequired, sizeRequired, fieldId, level ,levelType){


	d3.select("#mapShare").selectAll('svg').remove();

	widthShare = sizeRequired,   heightShare = sizeRequired;

	level0Id = document.getElementById('level_0_Id').value;
	level1Id = document.getElementById('level_1_Id').value;
	var levelid = document.getElementById("levelId").value;
	level	 = levelid;
	fieldId	 = fieldId;
	leveltype= levelType;
	shareImgVariable = type;
	colorRequired 	=  $("input[name='size']:checked").val();
	sizeRequired 	=  $("input[name='color']:checked").val();


	if(widthShare== 450){$("#mapShare").width("460");$("#main-id").width("460"); }
	if(widthShare== 350){$("#mapShare").width("360");$("#main-id").width("360"); }
	if(widthShare== 250){$("#mapShare").width("260");$("#main-id").width("260"); }

	titleShare = document.getElementById('share-text-id').value;

	if(titleShare.length > 70){
		titleShare = titleShare.substring(0, 68);
		titleShare = titleShare+ ' ...';
	}
	titleHtml = titleShare;

	/*svgShare = d3.select("#mapShare")
			.append("svg")
			.attr("width", widthShare)
			.attr("height", heightShare)
			.attr("left", "500");

	    svgShare.append("rect")
			.attr("class", "mapRect")
			.attr("id", "mapRectId")
			.attr("width", widthShare)
			.attr("height", heightShare)
			.style("stroke", bordercolor)
			.style("fill", "none");
			//.style("stroke-width", border);

	// SVG 2
	svgShare2 = svgShare.append("g").attr("id", "mapRectId_g");*/
	levelid =level;
	fieldid =fieldId;
	Raw_Data = [];

	if(levelid == 2){
		renderData = l2_Data;
	}
	if(levelid == 3){
		renderData = l3_Data;
	}


	dataFilter('',fieldid,levelid);
}

//}

/* Data Filter Ends Here */
function dataFilter(d,fieldid, levelid) {

	var dataById={};
	var yrtype = 2011;
	var topoJsonAvailable = 0;
	var topoJsonMap = "";

	rawData = crossfilter(renderData);
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
			.range(shareColors)
			.domain([minvalue, secval, midval1, forval, maxvall]);

	/* Setting Range of values used for Legend */	
	range = [minvalue, secval, midval1, forval, maxvall];
	
	var distid= d.id;
        var x, y, k;
        if (d && centered !== d) {
            k = 1;
        }
        else {
            x = widthShare / 2;
            y = heightShare / 2;
            k = 1;
            centered = null;
        }

	var scaleValShare, latShare, longShare,latdifShare,longdifShare, scaleShare4, scaleShare5, projectionShare, pathShare;
	var topoMap;	
	var svgShareid = 1;
	var type = shareImgVariable;

	if(type == "map"){

		d3.json("/static/region_explorer/TOPO/"+level0Id+"_"+level1Id+"_"+levelid+"_2011_"+leveltype+"_topo.json", function(topoMap) {//TN_2001.json
		    	topojsonMap(topoMap, level0Id, level1Id, levelid, dataById, x, y, k,yrtype,leveltype,minvalue, secval, midval1, forval, maxvall,svgShareid);
		});	
	} else if(type == "chart") {

		shareChart(level0Id, level1Id, levelid, data_val ,yrtype,leveltype,minvalue, secval, midval1, forval, maxvall,svgShareid ,fieldid);
	}

}
/* Data Filter Ends Here */

/* Topojson Starts Here */
function topojsonMap(topoMap, level0_Id, level1_Id, levelid, dataById , x, y, k, yrtype,leveltype,minvalue, secval, midval1, forval, maxvall, svgShareid){

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
		latShare =(topoMap.bbox[0] + topoMap.bbox [2] )/2;					
		longShare =(topoMap.bbox[1] + topoMap.bbox [3])/2;
		latdifShare = (topoMap.bbox[0] - topoMap.bbox [2] );
		longdifShare = (topoMap.bbox[1] - topoMap.bbox [3] );
		if(widthShare == 450){
			scaleShare4 = 52*500/(topoMap.bbox [2]-topoMap.bbox [0]);
			scaleShare5 = 52*500/(topoMap.bbox [3]-topoMap.bbox [1])*(0.9);
		}
		if(widthShare == 350){
			scaleShare4 = 52*350/(topoMap.bbox [2]-topoMap.bbox [0]);
			scaleShare5 = 52*350/(topoMap.bbox [3]-topoMap.bbox [1])*(0.9);
		}
		if(widthShare == 250){
			scaleShare4 = 52*250/(topoMap.bbox [2]-topoMap.bbox [0]);
			scaleShare5 = 52*250/(topoMap.bbox [3]-topoMap.bbox [1])*(0.9);
		}

		if(scaleShare5 > scaleShare4){  scaleValShare = scaleShare4; }
		if(scaleShare4 > scaleShare5){  scaleValShare = scaleShare5; }

		if(level0Id == '840' && level1Id == '2'){
								/*Working Only for Alaska */ 
			projectionShare = d3.geo.albersUsa()
					.translate([650, 200])
					.scale(scaleValShare*10);
		} else {
			if(widthShare == 450){
									/*Working for rest of the maps */            
				projectionShare = d3.geo.albers()
						.translate([210, 250])
						//.translate([165, 200])
						.origin([latShare ,longShare])
						.scale(scaleValShare/1.2);
			}

			if(widthShare == 350){
									/*Working for rest of the maps */            
				projectionShare = d3.geo.albers()
						//.translate([210, 240])
						.translate([165, 200])
						.origin([latShare ,longShare])
						.scale(scaleValShare/1.2);
			}

			if(widthShare == 250){
									/*Working for rest of the maps */            
				projectionShare = d3.geo.albers()
						.translate([125, 140])
						.origin([latShare ,longShare])
						.scale(scaleValShare/1.2);
			}
		}	

		pathShare = d3.geo.path().projection(projectionShare);
		cartoShare = d3.cartogram().projection(projectionShare)
				.properties(function(d) {	return dataById[d.id];	})
				.value(function(d) {	return +d.properties[field];	});

		geometries = topoMap.objects.levels.geometries; 
		features = cartoShare.features(topoMap, geometries);

		var svgShare = d3.select("#mapShare")
				  .append("svg")
				.attr("id","share_svg")
				.attr("width", widthShare)
				.attr("height", heightShare)
				.attr("left", "500")
				.style('background-color','#F6F9FE');

		svgShare.append("rect")
			.attr("class", "mapRect")
			.attr("width", widthShare)
			.attr("height", heightShare)
			//.style("stroke", bordercolor)
			.style("fill", "none");
			//.style("stroke-width", '2px');

		//SVG 2
		var svgShare2 = svgShare.append("g");

		svgShare2.append("svg")
			.attr("width", widthShare)
			.attr("height", heightShare)
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
			.attr("d", pathShare)
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

	        svgShare2.attr("transform", "rotate(0)")
			.transition()
			.duration(0)
			.attr("transform", "translate(" + widthShare / 2 + "," + widthShare / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
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

	if(widthShare== 450){
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

	if(widthShare == 350){
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

	if(widthShare == 250){
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
	var color_no_data_1 = d3.scale.linear().range(shareColors).domain([0]);

	if(widthShare== 450){
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

	if(widthShare== 350){
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

	if(widthShare== 250){
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
	var color_no_data_1 = d3.scale.linear().range(shareColors).domain([0]);

	if(widthShare== 450){
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

	if(widthShare== 350){
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
	if(widthShare== 250){
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

		var color_no_data_1 = d3.scale.linear().range(shareColors).domain([0]);

		if(widthShare== 450){
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

		if(widthShare== 350){
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
		if(widthShare== 250){
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
	if(widthShare == 450){
		truncatedTitle = titleHtml.substring(0,68);
		$('#title-id').css("fontSize", "12px");
		document.getElementById('popup-title').style.width = "448px";
	}
	else if(widthShare == 350){
		truncatedTitle = titleHtml.substring(0,38);
		$('#title-id').css("fontSize", "10px");
		document.getElementById('popup-title').style.width = "348px";
	}
	else if(widthShare == 250){
		truncatedTitle = titleHtml.substring(0,18);
		$('#title-id').css("fontSize", "8px");
		document.getElementById('popup-title').style.width = "248px";
	}

	document.getElementById('title-id').innerHTML = titleHtml;
	$('#title-id').innerHTML = titleHtml;



}
function titleChange(){

	var titleShare = document.getElementById('share-text-id').value;
	if(!shareSize){
		if(document.getElementById('shareSize')){
			var shareSizeElem = document.getElementById('shareSize');
			var shareSize = shareSizeElem.options[shareSizeElem.selectedIndex].value;
			widthShare = shareSize ;
		}
	}

	$('#title-id').css("fontSize", "12px");

	if(titleShare.length > 70){
		titleShare = titleShare.substring(0, 68);
		titleShare = titleShare+ ' ...';
	}
	$('#title-id').innerHTML = titleShare;


	var titleShare = titleShare;	
	if(widthShare == 450){
		titleShare = titleShare.substring(0,68);
		$('#title-id').css("fontSize", "12px");
		document.getElementById('popup-title').style.width = "448px";
	}
	else if(widthShare == 350){
		titleShare = titleShare.substring(0,38);
		$('#title-id').css("fontSize", "10px");
		document.getElementById('popup-title').style.width = "348px";
	}
	else if(widthShare == 250){
		titleShare = titleShare.substring(0,18);
		$('#title-id').css("fontSize", "8px");
		document.getElementById('popup-title').style.width = "248px";
	}

	titleShare = titleShare.replace(/\n/g,' ');

	document.getElementById('title-id').innerHTML = titleShare;
	$('#title-id').innerHTML = titleShare;
}
