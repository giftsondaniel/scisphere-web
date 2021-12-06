var color;
var menuData;
var snapshotKeyArray=[];
var rateById = d3.map();
var border = 2;
var bordercolor = 'rgb(205,201,201)';
var width = 420,
    height = 450,
    centered;
var margin = {top: 20, right: 120, bottom: 20, left: 120};
var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).attr("left", "500");
svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor).style("fill", "none").style("stroke-width", border);//.attr("transform", "translate( 100,50)");

// SVG 2
var svg2 = svg.append("g");
var clickCounter = 0;
var path, projection;

function ready(error, tn) {
   svg.transition().style("opacity", 1);
}
var sub_list,level0Data,level1Data,levelsData;

window.onload = function(){
   d3.json("/subscription_list",function(data){
	sub_list = data;
   });
   d3.json("scisphere/places/countries" , function(data) {
	d3.json('mysphere_mybuilds_for_region_snapshot_list/33',function(data){
		if((data.MyBuild.length > 0)){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
			selectedVariable = (JSON.parse(newvar)['variable']);
			if(JSON.parse(newvar).region != ''){
				var region = JSON.parse(newvar)['region'];
				if(JSON.parse(newvar)['level']){
					//Load on change of region locations in another page of explore:
					var level0Val = JSON.parse(newvar)['level']['level_0'];
					var level1Val = JSON.parse(newvar)['level']['level_1'];
			
					if((level0Val==region['level_0']) && (level1Val==region['level_1'])){
						var pathname1 = window.location.pathname;
						var prmsDt = $.deparam.fragment();
						if($.inArray(region['region_key'], selectedVariable)!= -1){
							var prms ={level0:region['level_0'], level1:region['level_1'], level:region['level'], field:region['region_key'], year:'2011' };
						}else{
							var prms ={level0:region['level_0'], level1:region['level_1'], level:region['level'], field:selectedVariable[0], year:'2011' };
						}
							var r =$.param.fragment(pathname1 ,prms, 2 );
						//$.bbq.pushState(r);
						var prms1 = $.deparam.fragment();
						if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
					} else {
						var pathname1 = window.location.pathname;
						var prmsDt = $.deparam.fragment();
						if($.inArray(region['region_key'], selectedVariable)!= -1){
							var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0], year:'2011' };//,selected: selectedid }	
						}else{
							var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0], year:'2011' };//,selected: selectedid }
						}
						var r =$.param.fragment(pathname1 ,prms, 2 );
						//$.bbq.pushState(r);
						var prms1 = $.deparam.fragment();
						if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
					}

				} else {
					//Added to hash on load
					var pathname1 = window.location.pathname;
					var prmsDt = $.deparam.fragment();
					var prms ={level0:sub_list['free_plans']['country'], level1:sub_list['free_plans']['state'], level:"2", field:'population_density', year:'2011' };//,selected: selectedid }
					var r =$.param.fragment(pathname1 ,prms, 2 );
					//$.bbq.pushState(r);
					var prms1 = $.deparam.fragment();
					if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);
					}
					//$.bbq.pushState(r);

				//Added
				}
	
				
			} else {
				//Added to hash on load
					var pathname1 = window.location.pathname;
					var prmsDt = $.deparam.fragment();
					var prms ={level0:sub_list['free_plans']['country'], level1:sub_list['free_plans']['state'], level:"2", field:'population_density', year:'2011' };//,selected: selectedid }
					var r =$.param.fragment(pathname1 ,prms, 2 );
					//$.bbq.pushState(r);
					var prms1 = $.deparam.fragment();
					if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
					//$.bbq.pushState(r);
				//Added
			}
		} else {
			//Added to hash on load
				var pathname1 = window.location.pathname;
				var prmsDt = $.deparam.fragment();
				var prms ={level0:sub_list['free_plans']['country'], level1:sub_list['free_plans']['state'], level:"2", field:'population_density', year:'2011' };//,selected: selectedid }
				var r =$.param.fragment(pathname1 ,prms, 2 );
				//$.bbq.pushState(r);
				var prms1 = $.deparam.fragment();
				if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
				//$.bbq.pushState(r);
			//Added
		}
	});

	//Working for country
	level0Data = data;
	
		var level0Id = document.getElementById('level_0_Id');
		for(var i=0;i<level0Data.length;i++){
			var optlevel0 = document.createElement('option');
			var valCh = level0Data[i].name_0;
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel0.innerHTML = valCam;
			optlevel0.value = level0Data[i].id_0;
			level0Id.appendChild(optlevel0);
		}


	$('.custom_selectbox').selectBoxIt();
	$('#level_0_Id').selectBoxIt();	
	d3.select("#menu-div").style('display','block');

	// Hash Params
	var prms = $.deparam.fragment()
	if(Object.keys(prms).length > 0){
	    hashParams();
	}	
	// Hash Params	

	//HashChange
	$(window).bind( "hashchange", function(e) {
	    var prms = $.deparam.fragment()
	    if(Object.keys(prms).length > 0){
		hashParams();
	    }
	});
	//HashChange

   });
}


function level0Change(){
   snapshotKeyArray=[];
   var filterLevel0Id = document.getElementById("level_0_Id").value;
   d3.json("scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
	hashflag1=0;
	$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();
	variableCategory = data.keys[filterLevel0Id][2011]["keys"];
	removeSVG();
	//level1 load
	menuData = data;
	var level1Id = document.getElementById('level_1_Id');
	var yearId = document.getElementById("yearId")
	if(!data.levels){
		$("#levelId").html("");
		$("#yearId").html("");
		return false;
	}
	levelsData = data.levels;
	level1Data = data.level1;
	var keysData = data.keys;
	
	for(var key in levelsData){
		if(key == filterLevel0Id){
		var optlevel1 = document.createElement('option');
		var valCh = levelsData[key].level1;
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel1.innerHTML = "Select "+valCam;
		optlevel1.value = 0;
		level1Id.appendChild(optlevel1);
		break;
		}
	}
	for(var key in level1Data) {
		if(key == filterLevel0Id){
			//sorting
			var level1list = level1Data[key];
			var sortable = [];
			for (var vehicle in level1list)
			      sortable.push([vehicle, level1list[vehicle]])
			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });
			//sorting
			for(var i=0;i<sortable.length;i++){
				if(( $.inArray(sortable[i][0], sub_list['all_plans']) != -1)){
					var optlevel1 = document.createElement('option');
					var valCh = sortable[i][1];
					var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					optlevel1.innerHTML = valCam;
					optlevel1.value = sortable[i][0];
					level1Id.appendChild(optlevel1);
				}
			}
		break;
		}
	}
	$("#level_1_Id").data("selectBox-selectBoxIt").add();
	// levels load
	for(var key in levelsData){
		var levelName='';
		if(key == filterLevel0Id){
			//for(var i=2; i<Object.keys(levelsData[key]).length; i++){ // i=2 - level2 starting from 2 
			for(var i=2; i<4; i++){ // i=2 - level2 starting from 2 
				if(levelsData[key]["level"+i+""]){
					if(levelsData[key]["level"+i+""] instanceof Array){
						for(var j=0; j<levelsData[key]["level"+i+""].length; j++){
							var optlevel = document.createElement('option');
							var valCh = levelsData[key]["level"+i+""][j];
							var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							optlevel.innerHTML = "Display "+valCam+" Level";
							optlevel.value = i+"."+j;
							levelId.appendChild(optlevel);
						}
					}else{
						var optlevel = document.createElement('option');
						var valCh = levelsData[key]["level"+i+""];
						var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel.innerHTML = "Display "+valCam+" Level";
						optlevel.value = i;
						levelId.appendChild(optlevel);
					}
				}
			}
			break;
		}
	}
	// year load
	var optyear = document.createElement('option');
	optyear.innerHTML = 2011;
	optyear.value = 2011;
	yearId.appendChild(optyear);

	var yearval = document.getElementById("yearId").value;
	$('#levelId').data("selectBox-selectBoxIt").add();
	$('#yearId').data("selectBox-selectBoxIt").add();
	loadVariableCategory();
   });

}

//hashparams call
function hashParams(){
	$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();
	hashflag1=1;
	// Url Param Load Function
	var prms = $.deparam.fragment();

	if(Object.keys(prms).length > 0){
	    var level0_Id = prms.level0;
	    var level1_Id = prms.level1;
	    var levelid = prms.level;
	    var yearid = prms.year;
	    var fieldid = prms.field;
	    var selectedid = prms.selected;
	    var level2;
	    var level2=[];

	// country load
	document.getElementById('level_0_Id').value = level0_Id;
	//$("#level0Id option[value="+level0Val+"]").attr('selected', 'selected');
	$("#level_0_Id").data("selectBox-selectBoxIt").add();

	// state load
	var filterLevel0Id = document.getElementById("level_0_Id").value;
	if(menuData){
		setMenuData();
	}else{
		
		d3.json("scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
			variableCategory = data.keys[filterLevel0Id][2011]["keys"];
			units = data.keys[filterLevel0Id][2011]['units'];
			description = data.keys[filterLevel0Id][2011]['variable_details']; 		
			level1Data = data.level1;
			menuData = data;
			loadVariableCategory();
			setMenuData();
			applySelectedVariable();
			d3.select("#"+fieldid).attr('class','selected');
		});
	}
	
     }
}


var variableCategory,units,description='';
var selectedGeoState=[]
var variableTotalPage=1;
var selectedVariable=['population','population_density','decadal_migration'];
var keyParameterArr=[];

function setMenuData(){
	keyParameterArr=[];
	snapshotKeyArray=[];

	$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();

	hashflag1=1;
	// Url Param Load Function
	var prms = $.deparam.fragment();

	if(Object.keys(prms).length > 0){
	var level0_Id = prms.level0;
	var level1_Id = prms.level1;
	var levelid = prms.level;
	var yearid = prms.year;
	fieldval = prms.field;
	var selectedid = prms.selected;
	var filtercountry = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById('level_1_Id');
	levelsData = menuData.levels;
	var level1Data = menuData.level1;
	var keysData = menuData.keys;
	//state load
	for(var key in levelsData){
		if(key == filtercountry){
		var optlevel1 = document.createElement('option');
		var valCh = levelsData[key].level1;
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel1.innerHTML = "Select "+valCam;
		optlevel1.value = 0;
		optlevel1.setAttribute("disabled", "disabled");
		level1Id.appendChild(optlevel1);
		break;
		}
	}
	for(var key in level1Data) {
		if(key == filtercountry){
			//sorting
			var level1list = level1Data[key];
			var sortable = [];
			for (var vehicle in level1list)
			      sortable.push([vehicle, level1list[vehicle]])
			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });
			//sorting
			for(var i=0;i<sortable.length;i++){
				if(( $.inArray(sortable[i][0], sub_list['all_plans']) != -1)){
					var optlevel1 = document.createElement('option');
					var valCh = sortable[i][1];
					var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					optlevel1.innerHTML = valCam;
					optlevel1.value = sortable[i][0];
					level1Id.appendChild(optlevel1);
				}
			}
		break;
		}
	}
	// levels load
	
	for(var key in levelsData){
		var levelName='';
		if(key == filtercountry){
			for(var i=2; i<4; i++){ // i=2 - level2 starting from 2 
				if(levelsData[key]["level"+i+""]){
					if(levelsData[key]["level"+i+""] instanceof Array){
							for(var j=0; j<levelsData[key]["level"+i+""].length; j++){
							var optlevel = document.createElement('option');
							var valCh = levelsData[key]["level"+i+""][j];
							var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							optlevel.innerHTML = "Display "+valCam+" Level";
							optlevel.value = i+"."+j;
							levelId.appendChild(optlevel);
						}
					}else{
						var optlevel = document.createElement('option');
						var valCh = levelsData[key]["level"+i+""];
						var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel.innerHTML = "Display "+valCam+" Level";
						optlevel.value = i;
						levelId.appendChild(optlevel);
					}
				}
			}
			break;
		}
	}
	// year load
	var optyear = document.createElement('option');
	optyear.innerHTML = 2011;
	optyear.value = 2011;
	yearId.appendChild(optyear);
	//	
	document.getElementById('level_1_Id').value = level1_Id;
	document.getElementById('levelId').value = levelid;
	document.getElementById('yearId').value = yearid;
	var yearval = document.getElementById("yearId").value;

	$("#level_1_Id").data("selectBox-selectBoxIt").add();
	$("#levelId").data("selectBox-selectBoxIt").add();
	

	colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
		return d3.hsl(rgb);
	});

	if(fieldval){
		var field = fieldval.replace('_',' ');
		field = field.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		var units ="";	
		
		if(fieldval == "land_area"){ units=" (square kilometer)";
		
			colors = generic_color = colorbrewer.Oranges[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
		 }
		if(fieldval == "road_density"){ units=" ( Ratio of Total Roads Length by Area in square km)";
		
			colors = generic_color = colorbrewer.Oranges[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
		 }
		if(fieldval == "population_density"){ units=" ( per square kilometer )"; 
				colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
	
		}
		if(fieldval == "urban_percent"){ units="    ( % )"; 
				colors = generic_color = colorbrewer.Oranges[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
	

		 }
		if(fieldval == "industrial_worker"){ units="    ( % )"; 
				colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
	
		 }
		if(fieldval == "literacy_rate"){ units="    ( % )"; 
				colors = generic_color = colorbrewer.BuPu[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });

		}
		if(fieldval == "population"){
				colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });

		}
		if(fieldval == "decadal_migration"){ units="    ( Population ratio of 2011 by 2001 )"
				colors = generic_color = colorbrewer.RdYlBu[5].map(function(rgb) {//.reverse() // Blues
				return d3.hsl(rgb);
			    });

		}
		if(fieldval == "decadal_industrialization"){ units="    ( Industrial worker Ratio of 2011 by 2001 ) ";
		
			colors = generic_color = colorbrewer.RdYlBu[5].map(function(rgb) {//.reverse()// PuRd
				return d3.hsl(rgb);
			    });
		 }
		if(fieldval == "decadal_urbanization"){ units="    ( Urban percent Ratio of 2011 by 2001 ) "; 
				colors = generic_color = colorbrewer.RdYlBu[5].map(function(rgb) {//.reverse()//  BuGn
				return d3.hsl(rgb);
			    });
	
		}
		if(fieldval == "urban_percent"){ units="    ( % )"; 
				colors = generic_color = colorbrewer.Oranges[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
	

		 }
		if(fieldval == "agricultural_worker"){ units="    ( % )"; 
				colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });
	
		 }
		if(fieldval == "urban_coeff"){ units="    ( Ratio of 2011 >100000 to  2011  < 10000 )"; 
				colors = generic_color = colorbrewer.BuPu[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });

		}
		if(fieldval == "household"){
				colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			    });

		}
		var fieldSplit = field.split("-");
		var splitFieldName;

		if(fieldSplit.length === 5){
			splitFieldName = fieldSplit[1] +' - '+fieldSplit[3] +' '+ fieldSplit[4];
		}else if(fieldSplit.length === 4){
			splitFieldName = fieldSplit[1] +' - '+fieldSplit[3];
		} else if(fieldSplit.length === 3){
			splitFieldName = fieldSplit[1] +' - '+fieldSplit[2];
		} else if(fieldSplit.length === 2){
			splitFieldName = fieldSplit[1];	
		} 

		if(fieldSplit.length>1){
			field = splitFieldName.replace(/_/g,' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}

		field = field.replace(/_/g,' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});		

		document.getElementById('fieldDetails').innerHTML = field + units;	
		
	}

	if(prms.level2){
		level_2 = prms.level2;
		lvl2={};
		lvl2["id"] = level_2;
		level2.push(lvl2)
		talukDataOnLoad(level0_Id,level1_Id,fieldval,yearid,levelid,level2);	
	} else{
		dataLoad(level0_Id,level1_Id,fieldval,yearid,levelid,selectedid);	
	}
	}
}


function removeSVG(){
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.select("#map").selectAll('.legend').remove();
	d3.selectAll('#svg_id').remove();
	d3.selectAll('#bar1').remove();
	d3.selectAll('.bar1').remove();
	d3.selectAll('.nomap').remove();
	d3.select("#map").select('image').remove();
	document.getElementById('fieldDetails').innerHTML="";
	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select("#barBackButton").select('image').remove();
}



var selectedState='';
function level1Change(){
	removeSVG();
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;


	if(selectedState!=level1_Id){
		//DAni
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval, year:yearval };//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
		//DAni
	}else{
		if(level0_Id != 0 && level1_Id != 0){
		dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
		}
	}
	selectedState = level1_Id;
	
	/*For mybuilds*/
	addToMyBuilds(fieldval);
	
}


var selectedLevel='';
function levelChange(){
	removeSVG();

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;

	if (level0_Id == 0) {
	   bootbox.alert("Country is required. Please select a country and state");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("State is required. Please select a state");
	   return false;
	}

	if(selectedLevel!=levelval){
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval, year:yearval };//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}else{
		if(level0_Id != 0 && level1_Id != 0){
		dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
		}
	}
	selectedLevel = levelval;
	addToMyBuilds(fieldval);
	
}

function addToMyBuilds(fieldid){

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;

	mysphere_url_list="mysphere_mybuilds_for_region_snapshot/"+level1_Id+"?level0="+level0_Id+"&level="
				+levelval+"&region_key="+fieldid+"&selectedvariables="+JSON.stringify(selectedVariable)+"";

	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

}

var colors;
var fieldval;
var selectedField='';
var selectedYear='';
function fieldChange(fieldid){
	fieldval = fieldid;
	for(var i=0;i<selectedVariable.length;i++){
		d3.select("#"+selectedVariable[i]).attr('class','');	 
	}
	d3.select("#"+fieldval).attr('class','selected');

	removeSVG();
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;
	if (level0_Id == 0) {
	   bootbox.alert("Country is required. Please select a country and state");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("State is required. Please select a state");
	   return false;
	}

	addToMyBuilds(fieldid);

	if(selectedField!=fieldval || selectedYear!=yearval){
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval, year:yearval };//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}else{
		if(level0_Id != 0 && level1_Id != 0){
		dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
		}
	}
	selectedField = fieldval;
	selectedYear = yearval;
}

// level2 variables
var maxvall, minvalue, minvalue, secval, midval, midval1, forval, maxvall, rawData,l2_Data,l3_Data;
var yearVal, KeyVal, level_2;

// level3 variables
var l3_RawData,l3_KeyVal,l3_YearVal,l3_level_3,l3_level_2;
var masterData = new Array(4);
var canvasImage;

//load level2 and level3 level data
function dataLoad(level0_Id,level1_Id,fieldid,yearval,levelid){

	if(fieldid){
	    if(menuData.keys[level0_Id][yearval].keys.census.geospatial){
		if($.inArray(fieldid,menuData.keys[level0_Id][yearval].keys.census.geospatial)!= -1){
			//bootbox.alert("This feature is not available for this variable.");
			//return false;
		}
	    }	
	}

	var level1Id = document.getElementById('level_1_Id');
	
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	var levelId = document.getElementById('levelId');
	//var levelName = levelId.options[levelId.selectedIndex].innerHTML;
	var levelName = levelsData[level0_Id]["level"+levelid+""].toLowerCase();
	levelName = levelName.replace(/_/g,' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});		

	var grid="";
	grid += '<li><span> '+level1Name+' </span></li>'+
		'<li class="active"><span> All '+levelName+'s </span></li>';
	document.getElementById('breadcrumb_id').innerHTML = grid; 

	var field_split = fieldid.split('-');
	var keyId = '';
	if(field_split.length >1){
		keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"_"+field_split[1]+"_"+field_split[(field_split.length) - 1];
	}else{
		keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"";
	}

	var val = 0;

	for(i= 0; i < masterData.length; i++ ){
		if(masterData[i]){
			if(masterData[i].key == keyId ){
				val = 1; 
				if(parseInt(levelid) == 2){
					l2_Data = masterData[i].value;
				}	
				if(parseInt(levelid) == 3){
					l3_Data = masterData[i].value;
				}
			}
		}
	} 

	if(val == 0){
		if(field_split.length >1){
			var field = 'value.Economic_Census_2005';
			fieldid_split =  fieldid.split('-')
			for(var j = 0; j< fieldid_split.length; j++){
				if((3 > j) && (j>0)){
					field +='.'+ fieldid_split[j]					
				}
			}	
			if(parseInt(levelid) == 2){
				d3.json("places/"+level1_Id+"/region_ec?level="+parseInt(levelid)+"&ec_key="+field+"&level0="+level0_Id+"&leveltype="+levelName+"", function(data) {
					if(data.hits){
					var dataArr2 = [];
					for(i=0;i<data.hits.total;i++){
						parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
						//for(key in parameter){
							var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
							var arr={};
							arr['id_1'] = data.hits.hits[i]._source.id_1;
							arr['id_2'] = data.hits.hits[i]._source.id_2;
							arr['id_3'] = data.hits.hits[i]._source.id_3;
							arr['name_1'] = data.hits.hits[i]._source.name_1;
							arr['name_2'] = data.hits.hits[i]._source.name_2;
							arr['name_3'] = data.hits.hits[i]._source.name_3;
							arr['year'] = 2011;
							arr['key']=fieldid;
							if(fieldid_split.length <3){
								if(data.hits.hits[i]._source["value"]){
									arr['value']= data.hits.hits[i]._source["value"]['Economic_Census_2005'][fieldid_split[1]];
								}else{ arr['value']= 0; }
							}else {
								if(data.hits.hits[i]._source["value"]){
								arr['value']= data.hits.hits[i]._source["value"]['Economic_Census_2005'][fieldid_split[1]][fieldid_split[2]];							
								}else{ arr['value']= 0; }
							}
							dataArr2.push(arr);
						//}
					}
					}

					master = {};
					master["key"] = keyId;
					master["value"] = dataArr2;
					master["topojson"] = "0";
					masterData.unshift(master);

					if(masterData.length > 4){
						masterData.length=4;
					}
					if(levelid == 2){
						l2_Data = dataArr2;
						level2('');
					}
					if(levelid == 3){
						l3_Data = dataArr2;
						level3_level('');
					}

					
				});

			}else if(parseInt(levelid) == 3){

				d3.json("places/"+level1_Id+"/region_ec?level="+parseInt(levelid)+"&ec_key="+field+"&level0="+level0_Id+"&leveltype="+levelName+"", function(data) {
					var dataArr2 = [];
					for(i=0;i<data.hits.total;i++){
						parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
						//for(key in parameter){
							var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
							var arr={};
							arr['id_1'] = data.hits.hits[i]._source.id_1;
							arr['id_2'] = data.hits.hits[i]._source.id_2;
							arr['id_3'] = data.hits.hits[i]._source.id_3;
							arr['name_1'] = data.hits.hits[i]._source.name_1;
							arr['name_2'] = data.hits.hits[i]._source.name_2;
							arr['name_3'] = data.hits.hits[i]._source.name_3;
							arr['year'] = 2011;
							arr['key']=fieldid;
							if(fieldid_split.length <3){
								if(data.hits.hits[i]._source["value"]){
									arr['value']= data.hits.hits[i]._source["value"]['Economic_Census_2005'][fieldid_split[1]];
								}else{ arr['value']= 0; }
							}else {
								if(data.hits.hits[i]._source["value"]){
								arr['value']= data.hits.hits[i]._source["value"]['Economic_Census_2005'][fieldid_split[1]][fieldid_split[2]];							
								}else{ arr['value']= 0; }
							}
							dataArr2.push(arr);
						//}
					}

					master = {};
					master["key"] = keyId;
					master["value"] = dataArr2;
					master["topojson"] = "0";
					masterData.unshift(master);

					if(masterData.length > 4){
						masterData.length=4;
					}
					if(levelid == 2){
						l2_Data = dataArr2;
						level2('');
					}
					if(levelid == 3){
						l3_Data = dataArr2;
						level3_level('');
					}

				});	
			}
		} else{
			if(parseInt(levelid) == 2){

				d3.json("places/"+level1_Id+"/region?level="+parseInt(levelid)+"&level0="+level0_Id+"&leveltype="+levelName+"", function(data) {
					var dataArr2 = [];
					for(i=0;i<data.hits.total;i++){
						parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
						for(key in parameter){
							var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
							var arr={};
							arr['id_1'] = data.hits.hits[i]._source.id_1;
							arr['id_2'] = data.hits.hits[i]._source.id_2;
							arr['name_1'] = data.hits.hits[i]._source.name_1;
							arr['name_2'] = data.hits.hits[i]._source.name_2;
							arr['year'] = year;
							arr['key']=key;
							arr['value']=parameter[key];
							dataArr2.push(arr);
						}
					}

					master = {};
					master["key"] = keyId;
					master["value"] = dataArr2;
					master["topojson"] = "0";
					masterData.unshift(master);

					if(masterData.length > 4){
						masterData.length=4;
					}
					if(levelid == 2){
						l2_Data = dataArr2;
						level2('');
					}
					if(levelid == 3){
						l3_Data = dataArr2;
						level3_level('');
					}

				});

			  }
			if(parseInt(levelid) == 3){
				d3.json("places/"+level1_Id+"/region?level="+parseInt(levelid)+"&level0="+level0_Id+"&leveltype="+levelName+"", function(data) {
					var dataArr3 = [];
					for(i=0;i<data.hits.total;i++){
						parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
						for(key in parameter){
							var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
							var arr={};
							arr['id_2'] = data.hits.hits[i]._source.id_2;
							arr['id_3'] = data.hits.hits[i]._source.id_3;
							arr['name_2'] = data.hits.hits[i]._source.name_2;
							arr['name_3'] = data.hits.hits[i]._source.name_3;
							arr['year'] = year;
							arr['key']=key;
							arr['value']=parameter[key];
							dataArr3.push(arr);
						}
					}

					master = {};
					master["key"] = keyId;
					master["value"] = dataArr3;
					master["topojson"] = "0";
					masterData.unshift(master);
					if(masterData.length > 4){
						masterData.length=4;
					}
					l3_Data = dataArr3;
					level3_level('');
				});
			}
		}
	}else if(val != 0){
		if(parseInt(levelid) == 2){
		   level2('');
		}
		if(parseInt(levelid) == 3){
		   level3_level('');
		}
	 }

}

var snapLevel,snapPlaceid,snapURL;
var level2DistrictName='';

//load level3 level data
function level3DataLoad(dd, place){
	var level1_Id = document.getElementById("level_1_Id").value;
	var level0_Id = document.getElementById("level_0_Id").value;
	var levelid = document.getElementById("levelId").value;
	var yearval = document.getElementById('yearId').value;
	//var keyId = level0_Id+"_"+level1_Id+"_3_"+yearval;
	var val = 0;
	var prms = $.deparam.fragment();
	var fieldid = ''
	if(Object.keys(prms).length > 0){
		fieldid = prms.field;
	}	
	
	if(fieldid){
	    if(menuData.keys[level0_Id][yearval].keys.census.geospatial){
		if($.inArray(fieldid,menuData.keys[level0_Id][yearval].keys.census.geospatial)!= -1){
			//bootbox.alert("This feature is not available for this variable.");
			//return false;
		}
	    }	
	}

	var field_split = fieldid.split('-');
	var keyId = '';
	if(field_split.length >1){
		keyId = level0_Id+"_"+level1_Id+"_3_"+yearval+"_"+field_split[1]+"_"+field_split[(field_split.length) - 1];
	}else{
		keyId = level0_Id+"_"+level1_Id+"_"+3+"_"+yearval+"";
	}


	for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key == keyId ){
	      	 val = 1; 
      		 l3_Data = masterData[i].value;
	     }
	  }
	}	
	if(val == 1){
		level3(dd, place);
	}	
	else if(val == 0) { 	

		levelid = parseInt(levelid)+1;
		var levelType = levelsData[level0_Id]["level"+levelid+""].toUpperCase();

		if(field_split.length >1){
			var field = 'value.Economic_Census_2005';
			fieldid_split =  fieldid.split('-')
			for(var j = 0; j< fieldid_split.length; j++){
				if((3 > j) && (j>0)){
					field +='.'+ fieldid_split[j]					
				}
			}		
			d3.json("places/"+level1_Id+"/region_ec?level="+parseInt(levelid)+"&ec_key="+field+"&level0="+level0_Id+"&leveltype="+levelType+"", function(data) {

				var dataArr3 = [];
				for(i=0;i<data.hits.total;i++){
					parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
					//for(key in parameter){
						var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
						var arr={};
						arr['id_1'] = data.hits.hits[i]._source.id_1;
						arr['id_2'] = data.hits.hits[i]._source.id_2;
						arr['id_3'] = data.hits.hits[i]._source.id_3;
						arr['name_1'] = data.hits.hits[i]._source.name_1;
						arr['name_2'] = data.hits.hits[i]._source.name_2;
						arr['name_3'] = data.hits.hits[i]._source.name_3;
						arr['year'] = 2011;
						arr['key']=fieldid;
						if(fieldid_split.length <3){
							if(data.hits.hits[i]._source["value"]){
								arr['value']= data.hits.hits[i]._source["value"]['Economic_Census_2005'][fieldid_split[1]];
							}else{ arr['value']= 0; }
						}else {
							if(data.hits.hits[i]._source["value"]){
							arr['value']= data.hits.hits[i]._source["value"]['Economic_Census_2005'][fieldid_split[1]][fieldid_split[2]];							
							}else{ arr['value']= 0; }
						}
						dataArr3.push(arr);
					//}
				}

				master = {};
				master["key"] = keyId;
				master["value"] = dataArr3;
				master["topojson"] = "0";
				masterData.unshift(master);

				if(masterData.length > 4){
					masterData.length=4;
				}
				l3_Data = dataArr3;
				level3(dd , place);
				
			});

		} 

	   else{	

	     d3.json("places/"+level1_Id+"/region?&leveltype="+levelType+"&level=3&level0="+level0_Id+"", function(data) {//COUNTY_SUBDIVISION //TALUK

		var dataArr3 = [];
		for(i=0;i<data.hits.total;i++){
			parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
			for(key in parameter){
				var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
				var arr={};
				arr['id_2'] = data.hits.hits[i]._source.id_2;
				arr['id_3'] = data.hits.hits[i]._source.id_3;
				arr['name_2'] = data.hits.hits[i]._source.name_2;
				arr['name_3'] = data.hits.hits[i]._source.name_3;
				arr['year'] = year;
				arr['key']=key;
				arr['value']=parameter[key];
				dataArr3.push(arr);
			}
		}

		master = {};
		master["key"] = keyId;
		master["value"] = dataArr3;
		master["topojson"] = '0';
		masterData.unshift(master);
		if(masterData.length > 4){
			masterData.length=4;
		}

		l3_Data = dataArr3;
		level3(dd, place);
	     });
	 }
	}
}

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

        
//LEGEND:::::
var range;
function legend1(minvalue, secval, midval1, forval, maxvall) {

		    var numberFormat = d3.format(".0f");		    
		    if(secval) {
			numberFormat = d3.format(".0f");
			var numberFormat1 = d3.format(".0f");
			var numberFormatValue=0;
			
			for(i = 0 ; i < 5 ; i++){
			  for(j = 0 ; j < 5 ; j++){
			    if(numberFormat1(range[i+1])){
				var val1_i = (numberFormat1((numberFormat1(range[i])))).length;
			    	var val_i = (numberFormat1((numberFormat1(range[i]))));
				var Value_i;
			   	if ((val1_i > 0) && (val1_i <= 3)) {
					Value_i = (numberFormat(range[i]));
				    }
				if ((val1_i > 3) && (val1_i <= 6)) {
					finalValue_i = val_i / 1000;
						Value_i = (numberFormat(finalValue_i));
				    }
				if ((val1_i > 6) && (val1_i <= 9)) {
					finalValue_i = val_i / 1000000;
					Value_i = (numberFormat(finalValue_i));
				    }
				if (val1_i > 9) {
					finalValue_i = val_i / 1000000000;
					Value_i = (numberFormat(finalValue_i));
				    }
					
				
				var val1_iplus1 = (numberFormat1((numberFormat1(range[i+1])))).length;
			    	var val_iplus1 = (numberFormat1((numberFormat1(range[i+1]))));
			   	if ((val1_iplus1 > 0) && (val1_iplus1 <= 3)) {
					Value_iplus1 = (numberFormat(range[i+1]) + " ");
				    }
				if ((val1_iplus1 > 3) && (val1_iplus1 <= 6)) {
					finalValue_iplus1 = val_iplus1 / 1000;
						Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }
				if ((val1_iplus1 > 6) && (val1_iplus1 <= 9)) {
					finalValue_iplus1 = val_iplus1 / 1000000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }
				if (val1_iplus1 > 9) {
					finalValue_iplus1 = val_iplus1 / 1000000000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }

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
			
			d3.select("#svg_id").selectAll('.legend').remove();
			d3.select("#map").selectAll('.legend2').remove();
			d3.select("#svg_id").selectAll('.legend2').remove();

			var legend = d3.select("#svg_id").append("svg").attr("class", "legend22").attr("id", "legend_1").attr("width", 600).attr("height", 300).selectAll("g").data(color.domain().slice().reverse()).enter().append("g")
					//.attr("pointer-events", "none")
			.attr("transform", function(d, i) {
			    return "translate(" + ((i * 40) +90) + ",20 )scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 158).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 158).attr("y", -13) 
			.text(function(d, i) {
				return valueRound(d, numberFormat, i);
			});
			//NO Data added in each case of Legend:
			var color_no_data_1 = d3.scale.linear().range(colors).domain([0]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend22").attr("id", "legend_2")
				.attr("width", 600).attr("height", 300).selectAll("g")
			.data(color_no_data_1.domain().slice().reverse()).enter().append("g")//.attr("pointer-events", "none")
			.attr("transform", "translate(" + ((4 * 50)+90) + ",20 )scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 98).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill","black").style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 98).attr("y", -13) 
			.text("No Data");

		    }
		    else  {
			d3.select("#svg_id").selectAll('.legend').remove();
			d3.select("#map").selectAll('.legend2').remove();
			d3.select("#svg_id").selectAll('.legend2').remove();
			color_no_data = d3.scale.linear().range(colors).domain([secval]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend").attr("id", "legend_2").attr("width", 600).attr("height", 300).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    return "translate(100," + i * 20 + ")scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect").attr("x", 18).attr("y", 06)
			.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8);

			legend.append("text").attr("x", 18).attr("y", 3) 
			.text("No Data");

		    }
}


function legend2(minvalue, secval, midval1, forval, maxvall) {
		    var numberFormat = d3.format(".0f");
		    if(secval) {
			numberFormat = d3.format(".0f");
			var numberFormat1 = d3.format(".0f");
			var numberFormatValue=0;
			
			for(i = 0 ; i < 5 ; i++){
			  for(j = 0 ; j < 5 ; j++){
			    if(numberFormat1(range[i+1])){
				var val1_i = (numberFormat1((numberFormat1(range[i])))).length;
			    	var val_i = (numberFormat1((numberFormat1(range[i]))));
				var Value_i;
			   	if ((val1_i > 0) && (val1_i <= 3)) {
					Value_i = (numberFormat(range[i]));
				    }
				if ((val1_i > 3) && (val1_i <= 6)) {
					finalValue_i = val_i / 1000;
						Value_i = (numberFormat(finalValue_i));
				    }
				if ((val1_i > 6) && (val1_i <= 9)) {
					finalValue_i = val_i / 1000000;
					Value_i = (numberFormat(finalValue_i));
				    }
				if (val1_i > 9) {
					finalValue_i = val_i / 1000000000;
					Value_i = (numberFormat(finalValue_i));
				    }
					
				
				var val1_iplus1 = (numberFormat1((numberFormat1(range[i+1])))).length;
			    	var val_iplus1 = (numberFormat1((numberFormat1(range[i+1]))));
			   	if ((val1_iplus1 > 0) && (val1_iplus1 <= 3)) {
					Value_iplus1 = (numberFormat(range[i+1]) + " ");
				    }
				if ((val1_iplus1 > 3) && (val1_iplus1 <= 6)) {
					finalValue_iplus1 = val_iplus1 / 1000;
						Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }
				if ((val1_iplus1 > 6) && (val1_iplus1 <= 9)) {
					finalValue_iplus1 = val_iplus1 / 1000000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }
				if (val1_iplus1 > 9) {
					finalValue_iplus1 = val_iplus1 / 1000000000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }

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

			d3.select("#svg_id").selectAll('.legend').remove();
			d3.select("#map").selectAll('.legend2').remove();

			var legend = d3.select("#map").append("svg").attr("class", "legend2").attr("width", 400).attr("height", 100).selectAll("g").data(color.domain().slice().reverse()).enter().append("g")
			.attr("transform", function(d, i) {
			    return "translate(" + ((i * 40) +90) + ",20 )scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 158).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 158).attr("y", -13) 
			.text(function(d, i) {
			    return valueRound(d, numberFormat,i);	
			});

			//NO Data added in each case of Legend:
			color_no_data_1 = d3.scale.linear().range(colors).domain([0]);
			var legend = d3.select("#map").append("svg").attr("class", "legend2")
				.attr("width", 400).attr("height", 100).selectAll("g")
			.data(color_no_data_1.domain().slice().reverse()).enter().append("g")//.attr("pointer-events", "none")
			.attr("transform", "translate(" + ((4 * 50)+90) + ",20 )scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 98).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill","black").style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 98).attr("y", -13) 
			.text("No Data");


		    } else  {

			d3.select("#svg_id").selectAll('.legend').remove();
			d3.select("#map").selectAll('.legend2').remove();
			color_no_data = d3.scale.linear().range(colors).domain([secval]);
			var legend = d3.select("#map").append("svg").attr("class", "legend2").attr("width", 400).attr("height", 100).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    return "translate(100," + i * 20 + ")scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect").attr("x", 18).attr("y", 06)
			.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8);

			legend.append("text").attr("x", 18).attr("y", 3) 
			.text("No Data");

		    }


 		 if(secval) {
			var numberFormat = d3.format(".0f");
			var numberFormat1 = d3.format(".0f");
			var numberFormatValue=0;
			
			for(i = 0 ; i < 5 ; i++){
			  for(j = 0 ; j < 5 ; j++){
			    if(numberFormat1(range[i+1])){
				var val1_i = (numberFormat1((numberFormat1(range[i])))).length;
			    	var val_i = (numberFormat1((numberFormat1(range[i]))));
				var Value_i;
			   	if ((val1_i > 0) && (val1_i <= 3)) {
					Value_i = (numberFormat(range[i]));
				    }
				if ((val1_i > 3) && (val1_i <= 6)) {
					finalValue_i = val_i / 1000;
						Value_i = (numberFormat(finalValue_i));
				    }
				if ((val1_i > 6) && (val1_i <= 9)) {
					finalValue_i = val_i / 1000000;
					Value_i = (numberFormat(finalValue_i));
				    }
				if (val1_i > 9) {
					finalValue_i = val_i / 1000000000;
					Value_i = (numberFormat(finalValue_i));
				    }
					
				
				var val1_iplus1 = (numberFormat1((numberFormat1(range[i+1])))).length;
			    	var val_iplus1 = (numberFormat1((numberFormat1(range[i+1]))));
			   	if ((val1_iplus1 > 0) && (val1_iplus1 <= 3)) {
					Value_iplus1 = (numberFormat(range[i+1]) + " ");
				    }
				if ((val1_iplus1 > 3) && (val1_iplus1 <= 6)) {
					finalValue_iplus1 = val_iplus1 / 1000;
						Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }
				if ((val1_iplus1 > 6) && (val1_iplus1 <= 9)) {
					finalValue_iplus1 = val_iplus1 / 1000000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }
				if (val1_iplus1 > 9) {
					finalValue_iplus1 = val_iplus1 / 1000000000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
				    }

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

			d3.select("#svg_id").selectAll('.legend2').remove();

			var legend = d3.select("#svg_id").append("svg").attr("class", "legend2").attr("width", 400).attr("height", 100).style("display","none").selectAll("g").data(color.domain().slice().reverse()).enter().append("g")
					//.attr("pointer-events", "none")
			.attr("transform", function(d, i) {
			    return "translate(" + ((i * 40) +90) + ",20 )scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 158).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 158).attr("y", -13) 
			.text(function(d, i) {
			    return valueRound(d,numberFormat,i);	
			});
			//NO Data added in each case of Legend:
			color_no_data_1 = d3.scale.linear().range(colors).domain([0]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend2")
				.attr("width", 400).attr("height", 100).style("display","none").selectAll("g")
			.data(color_no_data_1.domain().slice().reverse()).enter().append("g")//.attr("pointer-events", "none")
			.attr("transform", "translate(" + ((4 * 50)+90) + ",20 )scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 98).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill","black").style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 98).attr("y", -13) 
			.text("No Data");


		    }
		    else  {

			d3.select("#svg_id").selectAll('.legend2').remove();
			color_no_data = d3.scale.linear().range(colors).domain([secval]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend2").attr("width", 400).attr("height", 100).style("display","none").selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    return "translate(100," + i * 50 + ")scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect").attr("x", 18).attr("y", 06)
			.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8);

			legend.append("text").attr("x", 18).attr("y", 3) 
			.text("No Data");

		    }
}


// level3 zoom function
function level3(d , placename) {
	snapsht = 1;
	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select("#barBackButton").select('image').remove();
	d3.select(".mapRect").style('display','block');
	d3.select("#map").selectAll('.legend').remove();
	d3.selectAll('#TN_adm3_borders').remove();
	d3.selectAll('#svg_id').remove();
	d3.selectAll('.nomap').remove();
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.select("#map").select('svg').remove();

	var dataById={};
	var lvl2_id  = d.id;

	var level1_Id = document.getElementById('level_1_Id').value;
	var level0_Id = document.getElementById('level_0_Id').value;

	//Getting values from options of field and year select	
	var yearType = document.getElementById("yearId");
	var yrtype = yearType.options[yearType.selectedIndex].value;
	var level_1_Type = document.getElementById("level_1_Id");
	var level1_Type = level_1_Type.options[level_1_Type.selectedIndex].value;
	var levelid = document.getElementById("levelId").value;
	levelid = parseInt(levelid)+1;
	//var levelType = level.options[(level.selectedIndex) +1].innerHTML.toLowerCase();
	var levelType = levelsData[level0_Id]["level"+levelid+""].toLowerCase();


	//Check if Topojson is already in master data:	
	var keyId = level0_Id+"_"+level1_Type+"_3_"+yrtype;
	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key == keyId ){
      		 if(masterData[i].topojson != '0'){
			topoJsonAvailable = 1;
			topoJsonMap = masterData[i].topojson;
		}
	     }
	  }
	}
	
	l3_RawData = crossfilter(l3_Data);    

	l3_KeyVal = l3_RawData.dimension(function(d) {
	   return d.key;				
	});
	l3_YearVal = l3_RawData.dimension(function (d) {           
	   return d.year;
	}); 	
	l3_level_3 = l3_RawData.dimension(function(d) {
	   return d.id_3;
	});
	l3_level_2 = l3_RawData.dimension(function(d) {
	   return d.id_2;
	});

	//Clearing Earlier filtered data
	l3_KeyVal.filterAll();
	l3_YearVal.filterAll();
	l3_level_2.filterAll();
	l3_level_3.filterAll();

	// Filtering by field and year
	key = l3_KeyVal.filter(fieldval);
	data_val = print_filter(key);	
	key1 = l3_YearVal.filter(yrtype);
	data_val =  print_filter(key);	
	
	//var data = [1,2,3,20,25]; // MIN AND MAX Values
	var minvall = d3.min(data_val, function(d) {return +d.value;});
	var maxvall = d3.max(data_val, function(d) {return +d.value;});

	minvalue = ((minvall / 10) * 9.6);
	minvalu = ((minvall / 10) * 12);
	domain = [minvalue, maxvall];
	var twval = (domain[0] + domain[1])
	var midval1 = (twval / 2);
	var secval = ((domain[0] + midval1) / 2);
	var forval = ((domain[1] + midval1) / 2);
	var midval = (domain[1] / 2); 

	color = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);
	color1 = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);
	range = [minvalue, secval, midval1, forval, maxvall];

	/*Taluk bar chart*/	
	level_3_focus_Chart(fieldval, yrtype, lvl2_id , placename ,levelType );

	document.getElementById("fieldDetails").style.visibility=''; 
        d3.select(".land-fill").remove();

	var tn;	
	if(topoJsonAvailable == 1){
		tn = topoJsonMap;
		topoJsonAvailable =0;
		level3_Zoom_Topojson(tn, level0_Id, level1_Id, dataById, d, l3_level_3, yrtype,levelType,minvalue, secval, midval1, forval, maxvall);
	}else{
		d3.json("/static/region_explorer/TOPO/"+level0_Id+"_"+level1_Type+"_3_"+yrtype+"_"+ levelType+"_topo.json", function(tn) {//TN_2001.json //levelType
		   for(i= 0; i < masterData.length; i++ ){
		      if(masterData[i]){
		         if(masterData[i].key == keyId ){
			    if(masterData[i].topojson == '0'){
	      			 masterData[i]["topojson"]=tn
			     }
		          }
		       }
		    }	
		    level3_Zoom_Topojson(tn, level0_Id, level1_Id, dataById, d, l3_level_3, yrtype,levelType,minvalue, secval, midval1, forval, maxvall);
        	});	
	}
}


function level3_Zoom_Topojson(tn, level0_Id, level1_Id, dataById, d, l3_level_3, yrtype,levelType,minvalue, secval, midval1, forval, maxvall){

	if(tn){
		snapLevel = 3;
		lat =(tn.bbox[0] + tn.bbox [2] )/2;					
		long =(tn.bbox[1] + tn.bbox [3])/2;
		latdif = (tn.bbox[0] - tn.bbox [2] );
		longdif = (tn.bbox[1] - tn.bbox [3] );
		scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
		scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

		if(scale5 > scale4){    scaleVal = scale4; }
		if(scale4 > scale5){   scaleVal = scale5;}

		if(level0_Id == '840' && level1_Id == '2'){ 
		    var  projection = d3.geo.albersUsa().translate([650, 200]).scale(scaleVal*10);/*TN*///scaleVal // Only for Alaska
		} else{
		    var projection = d3.geo.albers().translate([210, 240]).origin([lat ,long]).scale(scaleVal/1.2);/*TN*///scaleVal//.translate([250, 250])	
		}

		path = d3.geo.path().projection(projection);
		var lvl2_id  = d.id;
		var x, y, k;
		if (d && centered !== d) {
			var centroid = path.centroid(d);
			x = centroid[0];
			y = centroid[1];
			k = 2;
			centered = d;
		} else {
			x = width / 2;
			y = height / 2;
			k = 1;
			centered = null;
		}	
		carto = d3.cartogram().projection(projection).properties(function(d) {
										return dataById[d.id];
									}).value(function(d) {
										return +d.properties[field];
									});	

		geometries = tn.objects.levels.geometries; 
		features = carto.features(tn, geometries);

		var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');//.style("fill", "#E1FCFB")
		svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor)
			.style("fill", "none").style("stroke-width", '2px');

		//SVG 2
		var svg2 = svg.append("g");	

		svg2.append("svg").attr("width", width).attr("height", height+50).attr("id", "svg_id").attr('transform', 'rotate(0)').selectAll("path") 
						.data(features, function(d) {
							 return d.id })
						.attr("class", "land").enter().append("path")
						.attr("stroke"," #171717")
						.attr("id", function(d, i) { return d.id;	})
						.attr("opacity", function(d) {
							new_level3 = l3_level_3.filter(d.id);
							var tk = new_level3.top(1);
							var ntk = tk[0];
							if(ntk){
							   if (ntk.id_2 == (lvl2_id)) {
							      d3.select(this).style('stroke', 'black');
							      d3.select(this).style('opacity', 1).style('stroke-width', 0.3);
							      //this.parentNode.appendChild(this);
							      return 1
							   }else {   return 0.01;
							}
						    }
				    		}).attr("d", path)
						.on('mouseover', function(d) {
							 if(d.id){
							    var valset = l3_level_3.filter(d.id);
							    var dt = print_filter(valset);
							    new_level3 = l3_level_3.filter(d.id);
							    var tk = new_level3.top(1);
							    var ntk = tk[0];
							    if(ntk){ 
							       if (ntk.id_2 == (lvl2_id)) {
								  d3.select('#spacialcontent').style('display','');
								  d3.select('#spacialcontent').html(dt[0].name_3+'&nbsp; <span class="value">('+dt[0].value+')</span>')
								  d3.select(this).style('opacity', 0.4);
							       } else if(!dt[0].value && dt[0].value != 0){
							          d3.select('#spacialcontent').style('display','');	
							          d3.select('#spacialcontent').html( dt[0].name_2 + ' <span class="value"></span>');/*Not Available*/
							          d3.select(this).style('opacity', 0.3);
							          //this.parentNode.appendChild(this);
							       } else {
							   	  d3.select(this).style('opacity', 0.1);
							       }
							    }else if(tk.length ==0) {
								d3.select('#spacialcontent').style('display','');
								d3.select('#spacialcontent').html("No Data")
							    }	
							}
						}).on('mouseout', function(d) {
		        				d3.select('#spacialcontent').style('display','none');
							if(d.id){
							    new_level3 = l3_level_3.filter(d.id);
							    var tk = new_level3.top(1);
							    var ntk = tk[0];
							    if(ntk){	
						               if (ntk.id_2 == (lvl2_id)) {
								  d3.select(this).style('opacity', 1);
							       }else {
							   	  d3.select(this).style('opacity', 1);
							        }
							    }
							}	
						}).on("click", level2 )
						 .style("fill", function(d, i) {
								    var valset = l3_level_3.filter(d.id);
								    var dt = print_filter(valset);
								    if(dt[0] && d.id != undefined ){ 
										if(dt[0] == 'inf'){  
											return color(maxvall);
										} else { 
											level2DistrictName = dt[0].name_2; 
											if(dt[0].value == '0' && (range[4] === range[0])){ 
												return "#eff3ff";
											} else if(!(dt[0].value)  && (range[4] == range[0])){ 
												return "#eff3ff";//F0F0F0 
											}  else {
												return color(dt[0].value);						
											}
										}	
								    } else { 
										d3.select(this).style('opacity', 0.05); 
										return '#EFEFEF';
								    }
						} );

		svg2.selectAll("path").classed("active", centered && function(d) { return d === centered;}).attr("id", "svg_id")
						.on("contextmenu", function(d){
							snapLevel = 3;
							snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id+"&levels=3";
							canvasImage = "map";
							snapshotRankLevel3Popup(level0_Id,level1_Id,d.id);
							$('#snapshot-popup-id').click();
							d3.event.preventDefault();
						});

		/*Legend*/
		if(range[4] === range[0] && (range[4] === 0)){
		
			d3.select("#svg_id").selectAll('.legend').remove();
			d3.select("#map").selectAll('.legend2').remove();
			d3.select("#svg_id").selectAll('.legend2').remove();
			color_no_data_1 = d3.scale.linear().range(colors).domain([0]);
			var legend = d3.select("#map").append("svg").attr("class", "legend2")
				.attr("width", 400).attr("height", 100).selectAll("g")
			.data(color_no_data_1.domain().slice().reverse()).enter().append("g")//.attr("pointer-events", "none")
			.attr("transform", function(d, i) {
			    	return "translate(100," + i * 20 + ")scale(0.8)";
			});
			var ls_w = 20, ls_h = 20;
			legend.append("rect").attr("x", 18).attr("y", 26)
					.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
					    return "#eff3ff";
					}).style("opacity", 0.8);
			legend.append("text").attr("x", 18).attr("y", 23) 
					.text("0");
			legend.append("rect").attr("x", 78).attr("y", 26)
					.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
					    return "black";
					}).style("opacity", 0.8);
			legend.append("text").attr("x", 78).attr("y", 23) 
					.text("No Data");

			color_no_data = d3.scale.linear().range(colors).domain([0]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend").attr("id", "legend_2").attr("display", "none")
			.attr("width", 600).attr("height", 300).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    	return "translate(100," + i * 20 + ")scale(0.8)";
			});
			var ls_w = 20, ls_h = 20;
			legend.append("rect").attr("x", 18).attr("y", 26)
					.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
					    return "#eff3ff";
					}).style("opacity", 0.8);
			legend.append("text").attr("x", 18).attr("y", 23) 
					.text("0");
			legend.append("rect").attr("x", 78).attr("y", 26)
					.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
					    return "black";
					}).style("opacity", 0.8);

			legend.append("text").attr("x", 78).attr("y", 23) 
					.text("No Data");
		}else{
			//LEGEND
			legend2(range[0],range[1],range[2],range[3],range[4]);
		}

		/*SVG Image for save image*/
		 var imgs = svg.selectAll("image").data([0]);
			  imgs.enter()
			    .append("svg:image")
			    .attr("xlink:href", "/static/region_explorer/images/save.png")
			    .attr("x", "450")
			    .attr("y", "2")
			    .attr("id", "image_Canvas_bar")
			    .attr("width", "43")
			    .attr("height", "40")
			    .on("click", function(d){
				var el = document.getElementById("canvas-Map-id");
				el.click();				
				})
			    .on('mouseover', function(d) {
					  d3.select(this).style('opacity', 0.6);
				    	  //this.parentNode.appendChild(this);			
					})
			    .on('mouseout', function(d) {
					  d3.select(this).style('opacity', 1);
				    	  //this.parentNode.appendChild(this); 			
			     });
		d3.select("#barBackButton").append("image")
			    .attr("xlink:href", "/static/images/back-icon.png")
			    .attr("x", "7")
			    .attr("y", "20")
			    .attr("id", "image_back")
			    .style("cursor", "pointer")
			    .attr("title", "Back")
			    .attr("width", "43")
			    .attr("height", "25")
			    .on("click", function(d) { level2('');})
			    .on('mouseover', function(d) {
					d3.select(this).style('opacity', 0.6);
					this.parentNode.appendChild(this);			
					})
			    .on('mouseout', function(d) {
					d3.select(this).style('opacity', 1)
					this.parentNode.appendChild(this); 			
				});


		svg2.attr("transform", "rotate(0)").transition().duration(750).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");

		}else{
		   var text = svg.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
	   	   var bbox = text.node().getBBox();
		}	
		document.getElementById("fieldDetails").style.visibility=''; 
}

var snapsht = 0;
//level3 function
function level3_level(d) {

	snapsht = 0;
	d3.select(".mapRect").style('display','block');
	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select("#barBackButton").select('image').remove();
	d3.select("#map").selectAll('.legend').remove();
        d3.selectAll('#TN_adm3_borders_final').remove(); 
	d3.selectAll('#svg_id').remove();
	d3.selectAll('.nomap').remove();
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.select("#map").select('svg').remove();

	var dataById={};
	var level1_Id = document.getElementById('level_1_Id').value;
	var level0_Id = document.getElementById('level_0_Id').value;
	
	//Getting values from options of field and year select	
	var yearType = document.getElementById("yearId");
	var yrtype = yearType.options[yearType.selectedIndex].value;
	var level_1_Type = document.getElementById("level_1_Id");
	var level1_Type = level_1_Type.options[level_1_Type.selectedIndex].value;
	var levelid = document.getElementById("levelId").value;
        var levelType = levelsData[level0_Id]["level"+levelid+""].toLowerCase();
	
	//Check if Topojson is already in master data:	
	var keyId = level0_Id+"_"+level1_Type+"_3_"+yrtype;
	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key == keyId ){
      		 if(masterData[i].topojson != '0'){
			topoJsonAvailable = 1;
			topoJsonMap = masterData[i].topojson;
		}
	     }
	  }
	}

	l3_RawData = crossfilter(l3_Data);    

	l3_KeyVal = l3_RawData.dimension(function(d) {
	   return d.key;				
	});
	l3_YearVal = l3_RawData.dimension(function (d) {           
	   return d.year;
	}); 	
	l3_level_3 = l3_RawData.dimension(function(d) {
	   return d.id_3;
	});
	l3_level_2 = l3_RawData.dimension(function(d) {
	   return d.id_2;
	});

	//Clearing Earlier filtered data
	l3_KeyVal.filterAll();
	l3_YearVal.filterAll();
	l3_level_2.filterAll();
	l3_level_3.filterAll();

	// Filtering by field and year
	key = l3_KeyVal.filter(fieldval);
	key1 = l3_YearVal.filter(yrtype);
	data_val =  print_filter(key);

	///var data = [1,2,3,20,25]; // MIN AND MAX Values
	var minvall = d3.min(data_val, function(d) {return +d.value;});
	var maxvall = d3.max(data_val, function(d) {return +d.value;});
	minvalue = ((minvall / 10) * 9.6);
	minvalu = ((minvall / 10) * 12);
	domain = [minvalue, maxvall];

	var twval = (domain[0] + domain[1])
	var midval1 = (twval / 2);
	var secval = ((domain[0] + midval1) / 2);
	var forval = ((domain[1] + midval1) / 2);
	var midval = (domain[1] / 2); 

	range = [minvalue, secval, midval1, forval, maxvall];
	color = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);
	
	/*Chart*/
	level_3_LevelChart(fieldval,yrtype , levelType );

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

        d3.select(".land-fill").remove();
	
	var tn;	
	if(topoJsonAvailable == 1){
		tn = topoJsonMap;
		topoJsonAvailable =0;
		level3_levels_Topojson(tn, level0_Id, level1_Id, dataById, x, y, k,yrtype,levelType,minvalue, secval, midval1, forval, maxvall);
	}else{
	    d3.json("/static/region_explorer/TOPO/"+level0_Id+"_"+level1_Type+"_3_"+yrtype+"_"+levelType+"_topo.json", function(tn) {//TN_2001.json
		 for(i= 0; i < masterData.length; i++ ){
		  if(masterData[i]){
		     if(masterData[i].key == keyId ){
			if(masterData[i].topojson == '0'){
	      			 masterData[i]["topojson"]=tn
			}
		      }
		   }
		 }	
		level3_levels_Topojson(tn, level0_Id, level1_Id, dataById, x, y, k,yrtype,levelType,minvalue, secval, midval1, forval, maxvall);
	    });	
	}
 }

function level3_levels_Topojson(tn, level0_Id, level1_Id, dataById, x, y, k, yrtype,levelType,minvalue, secval, midval1, forval, maxvall){

	 if(tn){
		var svg = d3.select("#map").append("svg").attr("width", width-140).attr("height", 450).attr("left", "500").style('background-color','#F6F9FE');
	      snapLevel = 3;
	      lat =(tn.bbox[0] + tn.bbox [2] )/2;					
	      long =(tn.bbox[1] + tn.bbox [3])/2;
	      latdif = (tn.bbox[0] - tn.bbox [2] );
	      longdif = (tn.bbox[1] - tn.bbox [3] );
	      scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
	      scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

	      if(scale5 > scale4){   scaleVal = scale4; }
	      if(scale4 > scale5){   scaleVal = scale5;}

	      if(level0_Id == '840' && level1_Id == '2'){
		 /*Working new*/var  projection = d3.geo.albersUsa().translate([650, 200]).scale(scaleVal*10);/*TN*///scaleVal // Only for Alaska
	      }else{
		 /*Working new*/var projection = d3.geo.albers().translate([210, 240]).origin([lat ,long]).scale(scaleVal/1.2);/*TN*///scaleVal//.translate([250, 250])	
      	      }
		
              var path = d3.geo.path().projection(projection);

 	      carto = d3.cartogram().projection(projection).properties(function(d) {
									return dataById[d.id];
								}).value(function(d) {
									return +d.properties[field];
								});	
		
	      geometries = tn.objects.levels.geometries; 
	      features = carto.features(tn, geometries);
 	      var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');//.style("fill", "#E1FCFB")
	      svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor)
		.style("fill", "none").style("stroke-width", '2px');//.attr("transform", "translate( 100,50)");

	      //SVG 2
	      var svg2 = svg.append("g");
	
	      svg2.append("svg").attr("width", width).attr("height", height).attr("id", "svg_id")
			.attr('transform', 'rotate(0)') 
			.selectAll("path")
		        .data(features, function(d) {   return d.id })
			.attr("class", "land").enter().append("path")
			.attr("id", function(d, i) {    return d.id; })
			.attr("stroke"," #171717").style('stroke-width', 0.3)
			.attr("d", path).on('mouseover', function(d) {
				if(d.id){
				    var valset = l3_level_3.filter(d.id);
				    var dt = print_filter(valset);
				    if(dt.length == 0){
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html("No Data");
				    }else if(!dt[0].value && dt[0].value != 0){
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html( dt[0].name_3 + ' <span class="value"></span>');/*Not Available*/
				       d3.select(this).style('opacity', 0.3);
				       //this.parentNode.appendChild(this);
				    }else {
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html( dt[0].name_3 + ' <span class="value">(' + dt[0].value + ')</span>');
				       d3.select(this).style('opacity', 0.3);
				      // this.parentNode.appendChild(this);
				    }
				}
			}).on('mouseout', function(d) {
				d3.select('#spacialcontent').style('display','none');
				if(d.id){	
				    d3.select('#spacialcontent').style('display','none');	
				    d3.select(this).style('opacity', 1);
				    //this.parentNode.appendChild(this);
			       	}
			}).on("contextmenu", function(d){
				snapLevel = 3;
				snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id+"&levels=3";
				canvasImage = "map";
				snapshotRankLevel3Popup(level0_Id,level1_Id,d.id);
				$('#snapshot-popup-id').click();
				d3.event.preventDefault();
			})
			.style("fill", function(d, i) {
					var valset = l3_level_3.filter(d.id);
					var dt = print_filter(valset);
					if(dt[0]){ 
					    if(dt[0].value == 'inf'){  
						return color(maxvall);
					    } else {
						if(dt[0].value == '0' && (range[4] === range[0])){ 
							return "#eff3ff";
						} else if(!(dt[0].value)  && (range[4] == range[0])){ 
								return "#eff3ff";//F0F0F0 
						} else {
							return color(dt[0].value);						
						}
					    }		
					} else {  
						return 'black';
					}
				} );	
				
		/*Legend*/
		if((range[4] === range[0]) && ( range[0] === 0)){
		
			d3.select("#svg_id").selectAll('.legend').remove();
			d3.select("#map").selectAll('.legend2').remove();
			d3.select("#svg_id").selectAll('.legend2').remove();
			color_no_data = d3.scale.linear().range(colors).domain([secval]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend").attr("id", "legend_2").attr("width", 600).attr("height", 300).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    	return "translate(100," + i * 20 + ")scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;
			legend.append("rect").attr("x", 18).attr("y", 26)
					.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
					    return "#eff3ff";
					}).style("opacity", 0.8);
			legend.append("text").attr("x", 18).attr("y", 23) 
					.text("0");

			legend.append("rect").attr("x", 78).attr("y", 26)
					.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
					    return "black";
					}).style("opacity", 0.8);

			legend.append("text").attr("x", 78).attr("y", 23) 
					.text("No Data");

		}else if(range[4]){
			legend1(range[0],range[1],range[2],range[3],range[4]);
		}	

		 //SVG Image for save image
			 var imgs = svg.selectAll("image").data([0]);
			 	imgs.enter()
				    .append("svg:image")
				    .attr("xlink:href", "/static/region_explorer/images/save.png")
				    .attr("x", "450")
				    .attr("y", "2")
				    .attr("width", "43")
				    .attr("height", "40")
				    .on("click", function(d){
					var el = document.getElementById("canvas-Map-id");
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

			svg2.selectAll("path").classed("active", centered && function(d) {
			    		return d === centered;
			});

		svg2.attr("transform", "rotate(0)").transition().duration(0).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
		

		}else{
		   var text = svg.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
	   	   var bbox = text.node().getBBox();
		}

		document.getElementById("fieldDetails").style.visibility=''; 	

}


// level2 function
function level2(d) {

	snapsht = 0;
	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select(".mapRect").style('display','block');
	d3.select("#barBackButton").select('image').remove();
	d3.select("#map").selectAll('.legend').remove();
        d3.selectAll('#TN_adm3_borders_final').remove(); 
	d3.selectAll('#svg_id').remove();
	d3.selectAll('.nomap').remove();
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.select("#map").select('svg').remove();

	var dataById={};
	var level1_Id = document.getElementById('level_1_Id').value;
	var level0_Id = document.getElementById('level_0_Id').value;
	
	var yrtype = 2011;
	var level_1_Type = document.getElementById("level_1_Id");
	var level1_Type = level_1_Type.options[level_1_Type.selectedIndex].value;
	var levelid = document.getElementById("levelId").value;
        var levelType = levelsData[level0_Id]["level"+levelid+""].toLowerCase();

	var keyId = level0_Id+"_"+level1_Type+"_2_"+yrtype;
	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key == keyId ){
      		 if(masterData[i].topojson != '0'){
		     topoJsonAvailable = 1;
		     topoJsonMap = masterData[i].topojson;
		}
	     }
	  }
	}

	rawData = crossfilter(l2_Data);    
	keyVal = rawData.dimension(function(d) {
	   return d.key;				
	});
	yearVal = rawData.dimension(function (d) {           
	   return d.year;
	}); 	
	level_2 = rawData.dimension(function(d) {
	   return d.id_2;
	});

	//Clearing Earlier filtered data
	keyVal.filterAll();
	yearVal.filterAll();
	level_2.filterAll();

	// Filtering by field and year
	key = keyVal.filter(fieldval);
	key1 = yearVal.filter(yrtype);
	data_val =  print_filter(key);	

	//var data = [1,2,3,20,25]; // MIN AND MAX Values
	var minvall = d3.min(data_val, function(d) {return +d.value;});
	var maxvall = d3.max(data_val, function(d) {return +d.value;});
	minvalue = ((minvall / 10) * 9.6);
	minvalu = ((minvall / 10) * 12);
	domain = [minvalue, maxvall];

	var twval = (domain[0] + domain[1])
	var midval1 = (twval / 2);
	var secval = ((domain[0] + midval1) / 2);
	var forval = ((domain[1] + midval1) / 2);
	var midval = (domain[1] / 2); 
	range = [minvalue, secval, midval1, forval, maxvall];
	
	/*Chart function*/
	chart(fieldval,yrtype,levelType );

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

        d3.select(".land-fill").remove();
	var scaleVal, lat, long,latdif,longdif, scale4, scale5, projection, path;

	var tn;	
	if(topoJsonAvailable == 1){
		tn = topoJsonMap;
		topoJsonAvailable =0 ;
		level2Topojson(tn, level0_Id, level1_Id, dataById, x, y, k ,yrtype,levelType,minvalue, secval, midval1, forval, maxvall);
	}else{
		d3.json("/static/region_explorer/TOPO/"+level0_Id+"_"+level1_Type+"_2_"+yrtype+"_"+levelType+"_topo.json", function(tn) {//TN_2001.json
		  for(i= 0; i < masterData.length; i++ ){
		     if(masterData[i]){
		        if(masterData[i].key == keyId ){
			   if(masterData[i].topojson == '0'){
	      			 masterData[i]["topojson"]=tn
			    }
		         }
		      }
		   }	
		   level2Topojson(tn, level0_Id, level1_Id, dataById, x, y, k,yrtype,levelType,minvalue, secval, midval1, forval, maxvall);	
		});	
	}
    }

function level2Topojson(tn, level0_Id, level1_Id, dataById , x, y, k, yrtype,levelType,minvalue, secval, midval1, forval, maxvall){
	if(tn){ 
	 snapLevel = 2;
	 lat =(tn.bbox[0] + tn.bbox [2] )/2;					
	 long =(tn.bbox[1] + tn.bbox [3])/2;
	 latdif = (tn.bbox[0] - tn.bbox [2] );
	 longdif = (tn.bbox[1] - tn.bbox [3] );
         scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
         scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

	 if(scale5 > scale4){    scaleVal = scale4; }
	 if(scale4 > scale5){  scaleVal = scale5;}
	
	 if(level0_Id == '840' && level1_Id == '2'){
		 /*Working new*/  projection = d3.geo.albersUsa().translate([650, 200]).scale(scaleVal*10);/*TN*///scaleVal // Only for Alaska
		}
	 else{
		 /*Working new*/ projection = d3.geo.albers().translate([210, 240]).origin([lat ,long]).scale(scaleVal/1.2);/*TN*///scaleVal//.translate([250, 250])	
		}	

	  path = d3.geo.path().projection(projection);
		
          carto = d3.cartogram().projection(projection).properties(function(d) {
										return dataById[d.id];
									}).value(function(d) {
										return +d.properties[field];
									});
          geometries = tn.objects.levels.geometries; 
          features = carto.features(tn, geometries);		
 	 var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');//.style("fill", "#E1FCFB")
          svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor)
			.style("fill", "none").style("stroke-width", '2px');//.attr("transform", "translate( 100,50)");


	 //SVG 2
	 var svg2 = svg.append("g");

 	  svg2.append("svg").attr("width", width).attr("height", height).attr("id", "svg_id")
				.attr('transform', 'rotate(0)') 
				.selectAll("path")
				.data(features, function(d) { return d.id ;})
				.attr("class", "land").enter().append("path")
				.attr("class", "map_land")
				.attr("id", function(d, i) { return d.id; })
				.attr("stroke"," #171717").style('stroke-width', 0.3)
				.attr("d", path)
				.on('mouseover', function(d) {
					if(d.id){
					    var valset = level_2.filter(d.id);
					    var dt = print_filter(valset);
					    if(dt.length == 0){
					       d3.select('#spacialcontent').style('display','');	
				               d3.select('#spacialcontent').html( "No Data");
					    }else if(!dt[0].value && dt[0].value != 0){
        				       d3.select('#spacialcontent').style('display','');	
					       d3.select('#spacialcontent').html( dt[0].name_2 + ' <span class="value"></span>')/*Not Available*/
					       //d3.select(this).style('opacity', 0.3)
					       //this.parentNode.appendChild(this);
					    }else{
        				       d3.select('#spacialcontent').style('display','');	
					       d3.select('#spacialcontent').html( dt[0].name_2 + ' <span class="value">(' + dt[0].value + ')</span>')
					       //d3.select(this).style('opacity', 0.3)
					       //this.parentNode.appendChild(this);
					    }
					}
				})
				//.on("click", level3DataLoad)
				.on("click", function(d) { 
					if(d.id){
					    var valset = level_2.filter(d.id); 					    
					    var dt = print_filter(valset); 					    
					    if(dt.length == 0){
					    }else{
						level3DataLoad(d, dt[0].name_2);	
					    } 					}
				 }).on('mouseout', function(d) {
        				 d3.select('#spacialcontent').style('display','none'); 
					/* if(d.id){  	
 					    d3.select('#spacialcontent').style('display','none');	
					    d3.select(this).style('opacity', 1)
					    this.parentNode.appendChild(this);
					 }*/
				})
				.style("fill", function(d, i) {
					var valset = level_2.filter(d.id);
					var dt = print_filter(valset);
					if(dt[0]){ 
						if(dt[0].value == 'inf'){ 
						     return color(maxvall);
						} else {
							if((dt[0].value == '0') && (range[4] == range[0])){ 
								return "#eff3ff";
							} else if(!(dt[0].value)  && (range[4] == range[0])){ 
								return "#eff3ff";//F0F0F0 
							} else {
								return color(dt[0].value);						
							}
					    	}	
					}	
					else{  return 'black';}
				});


			svg2.selectAll("path").classed("active", centered && function(d) {
			    		return d === centered;
			}).on("contextmenu", function(d){
					snapLevel = 2;
					snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1_Id+"&levelid="+d.id+"&levels=2";
				        canvasImage ='map';
					snapshotRankPopup(level0_Id,level1_Id,d.id);
					$('#snapshot-popup-id').click();
					d3.event.preventDefault();
			});

		    /*for Legend*/					
		    if((range[4] === range[0]) && ( range[0] === 0)){

				d3.select("#svg_id").selectAll('.legend').remove();
				d3.select("#map").selectAll('.legend2').remove();
				d3.select("#svg_id").selectAll('.legend2').remove();

				color_no_data = d3.scale.linear().range(colors).domain([secval]);
				var legend = d3.select("#svg_id").append("svg").attr("class", "legend").attr("id", "legend_2").attr("width", 600).attr("height", 300).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
						return "translate(100," + i * 20 + ")scale(0.8)";
				});

				var ls_w = 20, ls_h = 20;
				legend.append("rect").attr("x", 18).attr("y", 26)
						.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
							return "#eff3ff";
						}).style("opacity", 0.8);

				legend.append("text").attr("x", 18).attr("y", 23) 
						.text("0");

				legend.append("rect").attr("x", 78).attr("y", 26)
						.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
							return "black";
						}).style("opacity", 0.8);

				legend.append("text").attr("x", 78).attr("y", 23) 
						.text("No Data");

			}else if(range[4]){
				legend1(range[0],range[1],range[2],range[3],range[4]);
			}
			//Legend	

		       svg2.attr("transform", "rotate(0)").transition().duration(0).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");

		       //SVG Image for save image
		       var imgs = svg.selectAll("image").data([0]);
			  imgs.enter()
			    .append("svg:image")
			    //.attr("xlink:href", "/static/region_explorer/images/save.png")
			    .attr("x", "450")
			    .attr("y", "2")
			    .attr("width", "43")
			    .attr("height", "40")
			    .on("click", function(d){
				var el = document.getElementById("canvas-Map-id");
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
					
			}else{  
		   	   var text = svg.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
		   	   var bbox = text.node().getBBox();
			}
			document.getElementById("fieldDetails").style.visibility=''; 
		}


// histogram start
function histogramLoad(histData){

	var meanVal = jStat(histData).mean();
	var medianVal = jStat(histData).median();
	var stdevVal = jStat(histData).stdev(true);
	var quartilesVal = jStat(histData).quartiles();
	var q1 = histData[Math.floor((histData.length / 4))];
	var q2 = histData[Math.floor((histData.length / 2))];
    	var q3 = histData[Math.floor((histData.length * (0.75)))];
    	var iqr = q3 - q1;
	var QrMaxValue = q3 + iqr*1.5;
	var QrMinValue = q1 - iqr*1.5;
	
	var Percentile10th = ((10/100)*histData.length);
	var Percentile90th = ((90/100)*histData.length);
	var Percentile25th = ((25/100)*histData.length);
	var Percentile75th = ((75/100)*histData.length);

	var percentile90thby10th = histData[Math.round(Percentile90th)]/histData[Math.round(Percentile10th)];
	var percentile75thby25th = histData[Math.round(Percentile75th)]/histData[Math.round(Percentile25th)];

	percentile90thby10th = percentile90thby10th.toFixed(1)+" fold";
	percentile75thby25th = percentile75thby25th.toFixed(1)+" fold";

	if(percentile90thby10th == "Infinity fold"){
		percentile90thby10th = "";
	}
	if(percentile75thby25th == "Infinity fold"){
		percentile75thby25th = "";
	}


	if(histData){
		if(!isNaN(meanVal)){
			document.getElementById('meanId').innerHTML = " <font>Mean:</font> "+meanVal.toFixed(2)+"<font style='padding-left: 58px;'>90<sup>th</sup> / 10<sup>th</sup> percentile:</font> "+percentile90thby10th;
			document.getElementById('medianId').innerHTML = " <font>Median:</font> "+medianVal.toFixed(2)+"<font style='padding-left: 45px;'>75<sup>th</sup> / 25<sup>th</sup> percentile:</font> "+percentile75thby25th;
		}else{
			document.getElementById('meanId').innerHTML = "";
			document.getElementById('medianId').innerHTML = "";
		}
	}else{
		document.getElementById('meanId').innerHTML = "";
		document.getElementById('medianId').innerHTML = "";
	}

	var outliers= [];
	var inliers=[];
	
	for(i=0;i<histData.length;i++){
	   if(histData[i] > QrMaxValue){
		outliers.push(histData[i]);
		//mn2 = _.without(mn2, mn2[i]);
	   }else{
		inliers.push(histData[i]);
	   }
	}

	///

 	//inner liers
	var bins = 5;
	var maxval_outliers = d3.max(histData, function(d) {return d;});
	var values = inliers;
	var xAxisFormat = "0.0f";
	var minval = d3.min(values, function(d) {return +d;});
	var maxval = d3.max(values, function(d) {return +d;});
	var uniqValues = _.uniq(values);
	if(uniqValues.length == 1){
	   if(uniqValues[0]>0){
		if((uniqValues[0]>0) && (uniqValues[0]<=100)){ minval=uniqValues[0]-1; }
		if((uniqValues[0]>100) && (uniqValues[0]<=1000)){ minval=uniqValues[0]-100; } 
		if((uniqValues[0]>1000) && (uniqValues[0]<=1000000)){ minval=uniqValues[0]-1000; } //1 million
		if((uniqValues[0]>1000000) && (uniqValues[0]<=1000000000)){ minval=uniqValues[0]-1000000; } //1 Billion
		//minval=uniqValues[0]-1;
		//bins=1;
	   }else if(uniqValues[0]<0){
		if((uniqValues[0]<0) && (uniqValues[0]>=-100)){ minval=uniqValues[0]-100; }
		if((uniqValues[0]<-100) && (uniqValues[0]>=-1000)){ minval=uniqValues[0]-1000; }
		if((uniqValues[0]<-1000) && (uniqValues[0]>=-1000000)){ minval=uniqValues[0]-1000000; } //1 million
		if((uniqValues[0]<-1000000) && (uniqValues[0]>=-1000000000)){ minval=uniqValues[0]-1000000000; } //1 Billion
		//minval=2(uniqValues[0]);
		//bins=1;
	   }
	   //minval=0;
	}

	// A formatter for counts.
	var formatCount = d3.format(".0f");
	var numberFormat = d3.format(".0f");
	if(maxval) {
		numberFormat = d3.format(".0f");
		var numberFormat1 = d3.format(".0f");
		var numberFormatValue=0;
		
		for(i = 0 ; i < 5 ; i++){
		  for(j = 0 ; j < 5 ; j++){
		    if(numberFormat1(range[i+1])){
			var val1_i = (numberFormat1((numberFormat1(range[i])))).length;
		    	var val_i = (numberFormat1((numberFormat1(range[i]))));
			var Value_i;
		   	if ((val1_i > 0) && (val1_i <= 3)) {
				Value_i = (numberFormat(range[i]));
			    }
			if ((val1_i > 3) && (val1_i <= 6)) {
				finalValue_i = val_i / 1000;
				Value_i = (numberFormat(finalValue_i));
			    }
			if ((val1_i > 6) && (val1_i <= 9)) {
				finalValue_i = val_i / 1000000;
				Value_i = (numberFormat(finalValue_i));
			    }
			if (val1_i > 9) {
				finalValue_i = val_i / 1000000000;
				Value_i = (numberFormat(finalValue_i));
			    }
				
			
			var val1_iplus1 = (numberFormat1((numberFormat1(range[i+1])))).length;
		    	var val_iplus1 = (numberFormat1((numberFormat1(range[i+1]))));
		   	if ((val1_iplus1 > 0) && (val1_iplus1 <= 3)) {
				Value_iplus1 = (numberFormat(range[i+1]) + " ");
			    }
			if ((val1_iplus1 > 3) && (val1_iplus1 <= 6)) {
				finalValue_iplus1 = val_iplus1 / 1000;
					Value_iplus1 = (numberFormat(finalValue_iplus1));
			    }
			if ((val1_iplus1 > 6) && (val1_iplus1 <= 9)) {
				finalValue_iplus1 = val_iplus1 / 1000000;
				Value_iplus1 = (numberFormat(finalValue_iplus1));
			    }
			if (val1_iplus1 > 9) {
				finalValue_iplus1 = val_iplus1 / 1000000000;
				Value_iplus1 = (numberFormat(finalValue_iplus1));
			    }

			if(parseFloat(Value_i) == parseFloat(Value_iplus1)){
			    if(numberFormatValue < j){
				numberFormat = d3.format("."+(j-1)+"f");
				xAxisFormat = "."+(j-1)+"f";
				numberFormatValue = j-1;
			     }
			}else{
			  break;
			}

			}

		      }
		}
	}

	
	var margin = {top: 32, right: 20, bottom: 80, left: 40},//30
	    width = 360 - margin.left - margin.right,
	    height = 350 - margin.top - margin.bottom; //290//350

	var x = d3.scale.linear()
	    .domain([minval, maxval])
	    .range([0, width]);

	tempScale = d3.scale.linear().domain([0, bins]).range([minval, maxval]); //bins = 5 default
	tickArray = d3.range(parseInt(bins) + 1).map(tempScale);

	// Generate a histogram using twenty uniformly-spaced bins.
	var data = d3.layout.histogram()
	    .bins(tickArray)
	    (values);

	var y = d3.scale.linear()
	    .domain([0, d3.max(data, function(d) { return d.y; })])
	    .range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(bins, "%"); //bins = 5 default


	var mid = maxval - minval;
	var differenceValue = mid/bins; //bins = 5 default
	var maxByTen = maxval%10;
	var minByTen = minval%10;

	if((maxval_outliers % 1 != 0)){
		xAxisFormat = "0.2f"
	}
	if(differenceValue>=1){
		xAxis.tickValues(d3.range(minval, (maxval+0.001), differenceValue)).tickFormat(function(d) {  return valueRound(d, numberFormat,'1');});
	}else{
		xAxis.tickValues(d3.range(minval, (maxval+0.001), differenceValue)).tickFormat(d3.format(xAxisFormat));
	}

	if(outliers.length > 0){
		if(differenceValue>=1){
			xAxis.tickValues(d3.range(minval, (maxval), differenceValue)).tickFormat(function(d) {  return valueRound(d, numberFormat,'1'); });
		}else{
			xAxis.tickValues(d3.range(minval, (maxval), differenceValue)).tickFormat(d3.format(xAxisFormat));
		}
	}

	var svg = d3.select("#histogramDivId").append("svg")
	    .attr("width", width + margin.left + margin.right+ 50)//40
	    .attr("height", height + margin.top + margin.bottom )
	    .attr("id","histogramSvgId")
	    .attr("class","histogramSvgId")
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top +  ")");

	var bar = svg.selectAll(".bar")
	    .data(data)
	    .enter().append("g")
	    .attr("class", "bar")
	    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

	bar.append("rect")
	    .attr("x", 1)
	    .attr("width", function(d) {return x(data[0].x  + data[0].dx) - 5; })
	    .attr("height", function(d) { return height - y(d.y); }).style("fill", "#B6B6B4");;

	// data count
	bar.append("text")
	    .attr("dy", ".75em")
	    .attr("y", -12)
	    .attr("x", x(data[0].x  + data[0].dx) / 2)
	    .attr("text-anchor", "middle")
	    .text(function(d,i) { 
		if(formatCount(d.y)!=0){
		   return formatCount(d.y);
		}
	 });

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .selectAll("text")  
            .style("text-anchor", "end")
	    .style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"})
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
	    .attr("transform", function(d) {
		return "rotate(-45)" 
	});


	// outliers data start
	if(outliers.length>0){
		var values = outliers;
		var minval = maxval;

		//var minval = d3.min(values, function(d) {return +d;});
		var maxval = d3.max(values, function(d) {return +d;});
		var uniqValues = _.uniq(values);
	
		// A formatter for counts.
		var formatCount = d3.format(",.0f");

		var margin = {top: 32, right: 30, bottom: 80, left: 330},
		    width = 60,
		    height = 350 - margin.top - margin.bottom ;//290

		var x = d3.scale.linear()
		    .domain([minval, maxval])
		    .range([0, width]);

		var bins = 1;
		tempScale = d3.scale.linear().domain([0, parseInt(bins)]).range([minval, maxval]);
		tickArray = d3.range(parseInt(bins) + 1).map(tempScale);

		// Generate a histogram using twenty uniformly-spaced bins.
		var data = d3.layout.histogram()
		    .bins(tickArray)
		    (values);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom").ticks(1, "%");

		var mid = maxval - minval;
		var differenceValue = maxval-minval;
		if(differenceValue>=1){
		    xAxis.tickValues(d3.range(minval, (maxval+0.001), differenceValue)).tickFormat(function(d) {  return valueRound(d, numberFormat,'1');});
		}else{
		    xAxis.tickValues(d3.range(minval, (maxval+0.001), differenceValue)).tickFormat(d3.format(xAxisFormat));
		}
		

		bar = svg.selectAll(".histogramSvgId")
		    .data(data)
		    .enter().append("g")
		    .attr("class", "bar")
		    .attr("transform", function(d) { return "translate(" + 300 + "," + y(d.y) + ")"; });

		bar.append("rect")
		    .attr("x", 1)
		    .attr("width", function(d) {return x(data[0].x  + data[0].dx) - 1; })
		    .attr("height", function(d) { return height - y(d.y); }).style("fill", "orange");

		// data count
		bar.append("text")
		    .attr("dy", ".75em") 
		    .attr("y", -12)
		    .attr("x", x(data[0].x  + data[0].dx) / 2) 
		    .attr("text-anchor", "middle")
		    .text(function(d,i) { 
			if(formatCount(d.y)!=0){
			   return formatCount(d.y);
			}
		     });

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(300," + height + ")")
		    .call(xAxis)
		    .selectAll("text")  
		    .style("text-anchor", "end")
		    .attr("dx", "-.8em")
		    .style({"font": "Roboto, sans-serif",'font-size':'10px',"fill":"#5F5F5F"})
		    .attr("dy", ".15em")
		    .attr("transform", function(d) {
			return "rotate(-45)" 
			});


		var chartTitle = ["Outlier"];
	 	var header = bar.append("text")
		        .attr("class", "chart-title")
			.attr("dy", ".75em") 
			.attr("y", -30)
		        .attr("x", x(data[0].x  + data[0].dx) / 2)
		        .attr("text-anchor", "middle")
		        .text(chartTitle);
	}
// outliers data end

}
// histogram end

function valueRound(d , numberFormat_form , j){
	var numberFormat = d3.format(".0f");
	numberFormat = numberFormat_form;
	var numberFormat1 = d3.format(".0f");
	var numberFormatValue=0;
	var i = j;
	var val1 = (numberFormat1((numberFormat1(d)))).length;
		    var val = (numberFormat1((numberFormat1(d))));
		    var Value;
		    if ((val1 > 0) && (val1 <= 3)) {
			if(i==0){
				Value = (numberFormat(d) + "  +");
			}else{
				Value = (numberFormat(d) + " ");
				}
		    }
		    if ((val1 > 3) && (val1 <= 6)) {
			finalValue = val / 1000;
			if(i==0){
				Value = (numberFormat(finalValue) + " K  +");
			}else{
				Value = (numberFormat(finalValue) + " K");
				}

		    }
		    if ((val1 > 6) && (val1 <= 9)) {
			finalValue = val / 1000000;
			if(i==0){
				Value = (numberFormat(finalValue) + " M  +");
			}else{
				Value = (numberFormat(finalValue) + " M");
				}
		    }
		    if (val1 > 9) {
			finalValue = val / 1000000000;
			if(i==0){
				Value = (numberFormat(finalValue) + " B  +");
			}else{
				Value = (numberFormat(finalValue) + " B");
				}
		    }
	return Value;
}
function saveImgMap(){
	canvasImage ='map';
	canvasfun();
}

function saveImgChart(){
	canvasImage = "chart";
	canvasfun();
}


function canvasfun(){
	document.getElementById("pin-form-description").value="";
	var context;
	if(canvasImage=="map"){
		var svgname = document.getElementById("svg_id");
		var svg = new XMLSerializer().serializeToString(svgname);
		var find = '<rect width="50"';
		var re = new RegExp(find, 'g');
		svg = svg.replace(re, '<rect width="40"');
		var find = 'style="display: none;"';
		var re = new RegExp(find, 'g');
		svg = svg.replace(re, 'style="display: block;"');
		
	}else if(canvasImage == "chart"){
		if($('li#histogram-id').hasClass('active') == true){
			var svgname = document.getElementById("histogramSvgId");
			var svg = new XMLSerializer().serializeToString(svgname);

			var find = '<path';
			var re = new RegExp(find, 'g');
			svg = svg.replace(re, '<path style="fill: none; stroke: black;"');

			var find = '<line';
			var re = new RegExp(find, 'g');
			svg = svg.replace(re, '<line style="stroke: black;"');

		}else{
			var svgname = document.getElementById("bar1");
			var svg = new XMLSerializer().serializeToString(svgname);
			svg = svg.replace('width="650" height="550"','width="600" height="450"');
			svg = svg.replace('width="650" height="450"','width="600" height="450"');
			svg = svg.replace('width="700" height="450"','width="600" height="450"');
			svg = svg.replace('width="660"','width="600"');
			svg = svg.replace('width="1500"','width="500"');

			var find = '<path';
			var re = new RegExp(find, 'g');
			svg = svg.replace(re, '<path style="fill: none; stroke: black;"');

			var find = '<line';
			var re = new RegExp(find, 'g');
			svg = svg.replace(re, '<line style="stroke: black;"');

		}

	}
	
	//svg = svg.replace('0H0V380H-6','0H0V380H-6');

	var canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");

    	canvg(canvas, svg, {renderCallback: function() {
	if(canvasImage == "chart"){var h = 450; var w = 600;}else{
	var h = canvas.height;
	var w = canvas.height;
	//var w = canvas.height;
	}

	data = context.getImageData(0, 0, w, h);
	var compositeOperation = context.globalCompositeOperation;
		context.globalCompositeOperation = "destination-over";
		context.fillStyle = 'white';
		context.fillRect(0,0,w,h);

	var img = canvas.toDataURL("image/png");
		context.clearRect (0,0,w,h);
		context.putImageData(data, 0,0);                
		context.globalCompositeOperation = compositeOperation;
	        document.getElementById('pin-form-image').value = img;
		document.getElementById('imgHeight').value = h;
		document.getElementById('imgWidth').value = w;

        }}); 


	document.getElementById('pathName').value = document.URL;

	var level = document.getElementById('levelId').value;
	var state = document.getElementById('level_1_Id');
	var statename = state.options[state.selectedIndex].innerHTML;
	var year = document.getElementById('yearId').value;

	//
	var prms = $.deparam.fragment();
	var keyname;
	if(Object.keys(prms).length > 0){
		var name = "";
		name = prms.field.split('-');
		if(name.length === 5){
			keyname = name[1] +' '+name[3] +' '+ name[4];
		}else if(name.length === 4){
			keyname = name[1] +' '+name[3];
		} else if(name.length === 3){
			keyname = name[1] +' '+name[2];
		} else if(name.length === 2){
			keyname = name[1];	
		} else{
			keyname = name[0];	
		} 
		keyname = keyname.replace(/_/g,' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	//
	
	if(level == 2 && snapLevel == 2){
		 document.getElementById('pin-form-description').value = statename+", All Districts "+keyname+" ("+year+")";
	} else if(level == 3 && snapLevel == 3){
		 document.getElementById('pin-form-description').value = statename+", All Taluks "+keyname+" ("+year+")";
	} else if(level == 2 && snapLevel == 3){
		 document.getElementById('pin-form-description').value = statename+" - "+level2DistrictName+", "+keyname+" ("+year+")";
	}

	document.getElementById('idSavedImage').innerHTML = statename+" - "+keyname;
}

// using ajax form submission
$(document).ready(function() {

    // prepare Options Object for plugin
    var options = {
        success: function() {
	    $('.close').click();
            $("#form_ajax").show();
            setTimeout(function() {
                $("#form_ajax").hide();
            }, 5000);
        },
        error:  function(resp) {
	    $('.close').click();
            $("#form_ajax_error").show();
            //render errors in form fields
            var errors = JSON.parse(resp.responseText);
            for (error in errors) {
                var id = '#id_' + error;
                $(id).parent('p').prepend(errors[error]);
            }
            setTimeout(function() {
                $("#form_ajax_error").hide();
            }, 5000);
        }
    };
    $('#ajaxform').ajaxForm(options);
    //$('#ajaxformUrlShare').ajaxForm(options);

});

function contextClick(){
	d3.select("#pop-geo").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-myvar").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-contextual").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function geoClick(){
	d3.select("#pop-contextual").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-myvar").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-geo").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function myVariableClick(){
	d3.select("#pop-geo").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-contextual").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-myvar").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function helpChange(selected){
	var innerhtml_graph = '<a class="help" data-toggle="tooltip" data-placement="left" data-popover="true" data-html=true data-content="Region allows you to compare a set of contiguous regions within a selected geography along a selected dimension.For example, compare all Districts within a State or all Taluks within a District by Population. <br><br>'+ 
				'To add or change contextual variables in the list available in the menu,<br> click the + button next to Contextual variables.<br><br>'+
				'<strong>Choropleth Map</strong><br><br>'+
				'&nbsp;&nbsp;The color of the sub-region represents its value. You can:<br>'+
				'&nbsp;&nbsp;<strong>*</strong>&nbsp;&nbsp;Hover over an area to see its name and value. <br>'+
				'&nbsp;&nbsp;<strong>*</strong>&nbsp;&nbsp;Right click to see a snapshot of the sub-region across the contextual variables in your list.<br>'+
				'&nbsp;&nbsp;<strong>*</strong>&nbsp;&nbsp;Click on a sub-region to drill down to the next level.  <br><br>'+
				'<strong>Bar Graphs</strong><br><br>'+
				'In this view each bar represents a sub-region of the overall selection. '+
				' Hover over the bar to see the name of the place and its value." id="help"></a>';

	var innerhtml_histogram = '<a class="help" data-toggle="tooltip" data-placement="left" data-popover="true" data-html=true data-content="Region allows you to compare a set of contiguous regions within a selected geography along a selected dimension.For example, compare all Districts within a State or all Taluks within a District by Population. <br><br>'+ 
				'To add or change contextual variables in the list available in the left menu, '+
				'click the + button next to Contextual variables.<br><br>'+
				'<strong>Choropleth Map</strong><br><br>'+
				'&nbsp;&nbsp;The color of the sub-region represents its value. You can:<br>'+
				'&nbsp;&nbsp;<strong>*</strong>&nbsp;&nbsp;Hover over an area to see its name and value. <br>'+
				'&nbsp;&nbsp;<strong>*</strong>&nbsp;&nbsp;Right click to see a snapshot of the sub-region across the contextual variables in your list.<br>'+
				'&nbsp;&nbsp;<strong>*</strong>&nbsp;&nbsp;Click on a sub-region to drill down to the next level.  <br><br>'+
				'<strong>Histogram</strong><br><br>'+
				'This view counts up the sub-regions into ranges specified on the x-axis.  Outliers are shown separately for better resolution of the bulk data distribution. '+
				'Mean (average), Median (50th percentile of all values), and the fold difference between the 75th and 25th percentile values and 90th and 10th percentile values are shown below the histogram." id="help"></a>';

	if(selected === "Bar"){
		document.getElementById('help-popover').innerHTML=innerhtml_graph;
	}else{
		document.getElementById('help-popover').innerHTML=innerhtml_histogram;
	}

}

