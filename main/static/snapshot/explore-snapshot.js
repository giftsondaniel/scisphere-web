var border = 2;
var bordercolor = 'rgb(205,201,201)';
var width = 480,
    height = 480,
    centered;
var margin = {top: 0, right: 120, bottom: 20, left: 120};
var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height).attr("left", "500");
//svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor).style("fill", "none").style("stroke-width", border);//.attr("transform", "translate( 100,50)");

// SVG 2
var svg2 = svg.append("g");
var clickCounter = 0;
var path, projection;

function ready(error, tn) {
	svg.transition().style("opacity", 1);
}

var sub_list,level0Data,level1Data,levelsData;
window.onload=function(){

	d3.json("/subscription_list",function(data){
		sub_list = data;
	});
	
	d3.json("scisphere/places/countries" , function(data) {
		d3.json('mysphere_mybuilds_for_region_snapshot_list/33',function(data){
			if(data.MyBuild.length > 0){
				var str = JSON.stringify(data.MyBuild[0])
				var newvar = JSON.parse(str);
				selectedVariable = (JSON.parse(newvar)['variable']);
				if(JSON.parse(newvar).snapshot != ''){
					var str = JSON.stringify(data.MyBuild[0])
					var newvar = JSON.parse(str);
					var snapshot = JSON.parse(newvar)['snapshot'];

				        if(JSON.parse(newvar)['level']){
						var level0Val = JSON.parse(newvar)['level']['level_0'];
						var level1Val = JSON.parse(newvar)['level']['level_1'];
	
						if((level0Val==snapshot['level_0']) && (level1Val==snapshot['level_1'])){
							var pathname1 = window.location.pathname;
							var prmsDt = $.deparam.fragment();
							var prms ={level0:snapshot['level_0'], level1:snapshot['level_1'], levels:snapshot['levels'], levelid:snapshot['level_id'] };//,selected: selectedid }	
							var r =$.param.fragment(pathname1 ,prms, 2 );
							//$.bbq.pushState(r);
							var prms1 = $.deparam.fragment();
							if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
						}else{
							d3.json("scisphere/places/countrydetail?level0="+level0Val+"" , function(data) {
								var obj = data['level2'][level0Val][level1Val];
								for (levelid in obj) break;
								//Added to hash on load
								var pathname1 = window.location.pathname;
								var prmsDt = $.deparam.fragment();
								var prms={"level0":level0Val,"level1":level1Val,"levelid":levelid,"level":"2","levels":"2"};
								var r =$.param.fragment(pathname1 ,prms, 2 );
								var prms = $.deparam.fragment();
								if(Object.keys(prms).length > 0){ }else{  $.bbq.pushState(r);}
							});
						}
				    	}else{
					 d3.json("scisphere/places/countrydetail?level0="+sub_list['free_plans']['country']+"" , function(data) {
						var obj = data['level2'][sub_list['free_plans']['country']][sub_list['free_plans']['state']];
						for (levelid in obj) break;
						//Added to hash on load
						var pathname1 = window.location.pathname;
						var prmsDt = $.deparam.fragment();
						var prms={"level0":sub_list['free_plans']['country'],"level1":sub_list['free_plans']['state'],"levelid":levelid,"level":"2","levels":"2"};
						var r =$.param.fragment(pathname1 ,prms, 2 );
						var prms = $.deparam.fragment();
						if(Object.keys(prms).length > 0){ }else{  $.bbq.pushState(r);}
					});
	
					}
				
				    } else {
					d3.json("scisphere/places/countrydetail?level0="+sub_list['free_plans']['country']+"" , function(data) {
						var obj = data['level2'][sub_list['free_plans']['country']][sub_list['free_plans']['state']];
						for (levelid in obj) break;
						//Added to hash on load
						var pathname1 = window.location.pathname;
						var prmsDt = $.deparam.fragment();
						var prms={"level0":sub_list['free_plans']['country'],"level1":sub_list['free_plans']['state'],"levelid":levelid,"level":"2","levels":"2"};
						var r =$.param.fragment(pathname1 ,prms, 2 );
						var prms = $.deparam.fragment();
						if(Object.keys(prms).length > 0){ }else{  $.bbq.pushState(r);}
					});
				    }
		       } else {
				d3.json("scisphere/places/countrydetail?level0="+sub_list['free_plans']['country']+"" , function(data) {
					var obj = data['level2'][sub_list['free_plans']['country']][sub_list['free_plans']['state']];
					for (levelid in obj) break;
					//Added to hash on load
					var pathname1 = window.location.pathname;
					var prmsDt = $.deparam.fragment();
					var prms={"level0":sub_list['free_plans']['country'],"level1":sub_list['free_plans']['state'],"levelid":levelid,"level":"2","levels":"2"};
					var r =$.param.fragment(pathname1 ,prms, 2 );
					var prms = $.deparam.fragment();
					if(Object.keys(prms).length > 0){ }else{  $.bbq.pushState(r);}
				});
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

//hashparams call
function hashParams(){
	// Url Param Load Function
	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
	    var level0_Id = prms.level0;
	}

	// country load
	$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	document.getElementById('level_0_Id').value = level0_Id;
	$("#level_0_Id option[value="+level0_Id+"]").attr('selected', 'selected');
	$("#level_0_Id").data("selectBox-selectBoxIt").add();

	// state load
	if(menuData){
		setMenuData();
	}else{
		d3.json("scisphere/places/countrydetail?level0="+level0_Id+"" , function(data) {
			variableCategory = data.keys[level0_Id][2011]["keys"];
			units = data.keys[level0_Id][2011]['units'];
			description = data.keys[level0_Id][2011]['variable_details']; 	
			level1Data = data.level1;
			loadVariableCategory();
			menuData = data;
			setMenuData();
			applySelectedVariable();
		});
	}
}

//FieldChange function;
function fieldChange(){}

var variableCategory,units,description='';
function setMenuData(){
	// Url Param Load Function
	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
		var level0_Id = prms.level0;
		var level1_Id = prms.level1;
		var level_Id = prms.levelid;

		//var level2_Id = prms.level2;
		//var level3_Id = prms.level3;
		var level = prms.level;

		$("#level_1_Id").data("selectBox-selectBoxIt").remove();
		$("#level_2_Id").data("selectBox-selectBoxIt").remove();
		$("#level_3_Id").data("selectBox-selectBoxIt").remove();

		var level0_Id = document.getElementById("level_0_Id").value;
		var level1Id = document.getElementById('level_1_Id');
		levelsData = menuData.levels;
		level1Data = menuData.level1;

		//For Level1
		for(var key in levelsData){
			if(key == level0_Id){
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
			if(key == level0_Id){
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

		document.getElementById('level_1_Id').value = level1_Id;
		$("#level_1_Id").data("selectBox-selectBoxIt").add();

		if(prms.levels == 3){
			level3("",level_Id);
		} else {
			level2("",level_Id);
		}

	}

}


function level2_level3_menu(level2_Id, level3_Id){
	$("#level_2_Id").data("selectBox-selectBoxIt").remove();
	$("#level_3_Id").data("selectBox-selectBoxIt").remove();
	var level0_Id = document.getElementById("level_0_Id").value;
	var level1_Id = document.getElementById("level_1_Id").value;
	//For Level2
	var level2Data = menuData.level2[level0_Id][level1_Id];
	var level2Id = document.getElementById("level_2_Id");
	var optlevel2 = document.createElement('option');
	//optlevel2.innerHTML = "Select District";
	//optlevel2.value = 0;
	//level2Id.appendChild(optlevel2);

	for(var key in level2Data){
		var optlevel2 = document.createElement('option');
		var valCh = level2Data[key];
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel2.innerHTML = valCam;
		optlevel2.value = key;
		level2Id.appendChild(optlevel2);
	}
	//Sorting the select option after appending to the select option :
	var options_level1 = $('#level_2_Id option');
	var arr = options_level1.map(function(_, o) {
		return {
		    t: $(o).text(),
		    v: o.value
		};
	}).get();

	arr.sort(function(o1, o2) {
		if(o1.v == 0){ return -1; }
		else if(o2.v == 0){ return -1; }
		else {return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;}
	});

	var obj = {
	    v: '0',
	    t: 'Select District'
	};

	arr.unshift(obj);

	options_level1.each(function(i, o) {
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});


	document.getElementById('level_2_Id').value = level2_Id;
	$("#level_2_Id").data("selectBox-selectBoxIt").add();
	$('#level_2_Id').selectBoxIt();

	//if(window.navigator.appName == "")
	//For Level3
	d3.json("scisphere/places/"+level1_Id+"/"+level2_Id+"?level0="+level0_Id+"&leveltype=taluk" , function(data) {
	  	var level3Id = document.getElementById("level_3_Id");
		for(var key in data){
			for(var key1 in data[key]){
				for(var key2 in data[key][key1]){
					var level3Data = data[key][key1][key2].level3;
				}
			}
		}	

		var optlevel3 = document.createElement('option');
		//optlevel3.innerHTML = "Select Taluk";
		//optlevel3.value = 0;
		//level3Id.appendChild(optlevel3);

		for(var key in level3Data){
			var optlevel3 = document.createElement('option');
			var valCh = level3Data[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel3.innerHTML = valCam;
			optlevel3.value = key;
			level3Id.appendChild(optlevel3);
		}
		//Sorting the select option after appending to the select option :
		var options = $('#level_3_Id option');
		var arr = options.map(function(_, o) {
			return {
			    t: $(o).text(),
			    v: o.value
			};
		}).get();
		arr.sort(function(o1, o2) {
			if(o1.v == 0){ return -1; }
			else if(o2.v == 0){ return -1; }
			else {return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;}
		});

		var obj = {
		    v: '0',
		    t: 'Select Taluk'
		};

		arr.unshift(obj);
		
		options.each(function(i, o) {
			o.value = arr[i].v;
			$(o).text(arr[i].t);
		});


		document.getElementById('level_3_Id').value = level3_Id;

		$("#level_3_Id").data("selectBox-selectBoxIt").add();
		$('#level_3_Id').selectBoxIt();

		//For H2 TO CHANGE ON DATA LOAD
		h2_change_level3();

  	});
}


var menuData = '';
var masterData = new Array(4);
function countryChange(){
	snapshotKeyArray=[];
	var level0_Id = document.getElementById("level_0_Id").value;
	d3.json("scisphere/places/countrydetail?level0="+level0_Id+"" , function(data) {
		$("#level_1_Id").html("");
		menuData = data;
		variableCategory = data.keys[filterLevel0Id][2011]["keys"];
		units = data.keys[level0_Id][2011]['units'];
		description = data.keys[level0_Id][2011]['variable_details'];
		var level1Id = document.getElementById('level_1_Id');
		$("#level_1_Id").data("selectBox-selectBoxIt").remove();
		$("#level_2_Id").data("selectBox-selectBoxIt").remove();
		$("#level_3_Id").data("selectBox-selectBoxIt").remove();

		if(!data.levels){
			$("#levelId").html("");
			$("#fieldId").html("");
			return false;
		}
		levelsData = data.levels;
		level1Data = data.level1;
		var keysData = data.keys;
	
		for(var key in levelsData){
			if(key == level0_Id){
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
			if(key == level0_Id){
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
		$('#level_1_Id').selectBoxIt();
		loadVariableCategory();
	});

}


function level1Change(){
	snapshotKeyArray=[];
	var level0_Id = document.getElementById("level_0_Id").value;
	var level1_Id = document.getElementById("level_1_Id").value;
	var level2Id = document.getElementById("level_2_Id");
	var level3Id = document.getElementById("level_3_Id");
	var level2Data = menuData.level2[level0_Id][level1_Id];
	$("#level_2_Id").data("selectBox-selectBoxIt").remove();
	$("#level_3_Id").data("selectBox-selectBoxIt").remove();

	var optlevel2 = document.createElement('option');
	//optlevel2.innerHTML = "Select District";
	//optlevel2.value = 0;
	//level2Id.appendChild(optlevel2);

	for(var key in level2Data){
		var optlevel2 = document.createElement('option');
		var valCh = level2Data[key];
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel2.innerHTML = valCam;
		optlevel2.value = key;
		level2Id.appendChild(optlevel2);
	}
	//Sorting the select option after appending to the select option :
	var options = $('#level_2_Id option');
	var arr = options.map(function(_, o) {
		return {
		    t: $(o).text(),
		    v: o.value
		};
	}).get();
	arr.sort(function(o1, o2) {
		if(o1.v == 0){ return -1; }
		else if(o2.v == 0){ return -1; }
		else {return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;}
	});
	var obj = {
	    v: '0',
	    t: 'Select District'
	};

	arr.unshift(obj);
	options.each(function(i, o) {
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});


	$("#level_2_Id").data("selectBox-selectBoxIt").add();
	$('#level_2_Id').selectBoxIt();
}


function level2Change(){
	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;
	var level2Id = document.getElementById("level_2_Id").value;
	var level3Id = document.getElementById("level_3_Id").value;
  	d3.json("scisphere/places/"+level1Id+"/"+level2Id+"?level0="+level0Id+"&leveltype=taluk" , function(data) {
	  	var level3Id = document.getElementById("level_3_Id");
		for(var key in data){
			for(var key1 in data[key]){
				for(var key2 in data[key][key1]){
					var level3Data = data[key][key1][key2].level3;
				}
			}
		}	
		$("#level_3_Id").data("selectBox-selectBoxIt").remove();

		var optlevel3 = document.createElement('option');
		optlevel3.innerHTML = "Select Taluk";
		optlevel3.value = 0;
		//level3Id.appendChild(optlevel3);

		for(var key in level3Data){
			var optlevel3 = document.createElement('option');
			var valCh = level3Data[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel3.innerHTML = valCam;
			optlevel3.value = key;
			level3Id.appendChild(optlevel3);
		}
		//Sorting the select option after appending to the select option :
		var options = $('#level_3_Id option');
		var arr = options.map(function(_, o) {
			return {
			    t: $(o).text(),
			    v: o.value
			};
		}).get();
		arr.sort(function(o1, o2) {
			if(o1.v == 0){ return -1; }
			else if(o2.v == 0){ return -1; }
			else {return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;}
		});
		options.each(function(i, o) {
			o.value = arr[i].v;
			$(o).text(arr[i].t);
		});


		$("#level_3_Id").data("selectBox-selectBoxIt").add();
		$('#level_3_Id').selectBoxIt();
	});

	var pathname1 = window.location.pathname;
	var prmsDt = $.deparam.fragment();
	var prms ={level0:level0Id, level1:level1Id, levelid:level2Id , levels:2};
	var r =$.param.fragment(pathname1 ,prms, 2 );
	$.bbq.pushState(r);

}

function level3Change(){
	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;
	var level2Id = document.getElementById("level_2_Id").value;
	var level3Id = document.getElementById("level_3_Id").value;
	var pathname1 = window.location.pathname;
	var prmsDt = $.deparam.fragment();
	var prms ={level0:level0Id, level1:level1Id, levelid:level3Id , levels:3};
	var r =$.param.fragment(pathname1 ,prms, 2 );
	$.bbq.pushState(r);
	h2_change_level3();
}

function h2_change_level3(){
	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;
	var level2Id = document.getElementById("level_2_Id").value;
	var level3Id = document.getElementById("level_3_Id").value;	
	var level1Value = document.getElementById('level_1_Id');
	var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
	var level2Value = document.getElementById('level_2_Id');
	var level2Name = level2Value.options[level2Value.selectedIndex].innerHTML;
	//
	var grid="";
	grid += '<li><span> '+ level1Name +' '+'</span></li>';

	var level2LevelsName = menuData["levels"][level0Id]['level2'];
	level2LevelsName = level2LevelsName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

	grid += '<li><span onclick="level2_onClick('+ level2Id +')" class="level2_span_onclick" > '+level2Name +' '+'</span></li>';

	if(document.getElementById('level_3_Id').value > 0){
		var level3Value = document.getElementById('level_3_Id');
		var level3Name = level3Value.options[level3Value.selectedIndex].innerHTML;

		grid += '<li><span> '+level3Name+' '+'</span></li>';

		var level3LevelsName = menuData["levels"][level0Id]['level3'];
		level3LevelsName = level3LevelsName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

		document.getElementById('page-title-id').innerHTML= level3Name+" "+level3LevelsName+"," ;

		var level1Value = document.getElementById('level_1_Id');
		var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
		document.getElementById('page-subtitle-id').innerHTML=level2Name+" "+level2LevelsName+", "+level1Name;

		//grid += '<li class="active"><span>  '+'All '+level3LevelsName+'s' +'</span></li>';
		document.getElementById('breadcrumb_id').innerHTML =grid;
	}else{
		//grid += '<li class="active"><span>  '+'All '+level2LevelsName+'s' +'</span></li>';
		document.getElementById('breadcrumb_id').innerHTML =grid; 
	}
}


function level2_onClick(d){
	var level2Id = d.id;
	if(d.id){
		level2Id = d.id;
	}else if(d){
		level2Id = d;		
	}		

	$("#level_2_Id option[value="+d.id+"]").attr('selected', 'selected');
	$("#level_2_Id").data("selectBox-selectBoxIt").add();
	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;
	var level3Id = document.getElementById("level_3_Id").value;

	d3.json("scisphere/places/"+level1Id+"/"+level2Id+"?level0="+level0Id+"&leveltype=taluk" , function(data) {
		var level3Id = document.getElementById("level_3_Id");
		var level3Data = data.level3;

		for(var key in data){
			for(var key1 in data[key]){
				for(var key2 in data[key][key1]){
					var level3Data = data[key][key1][key2].level3;
				}
			}
		}

		$("#level_3_Id").data("selectBox-selectBoxIt").remove();

		var optlevel3 = document.createElement('option');
		optlevel3.innerHTML = "Select Taluk";
		optlevel3.value = 0;
		level3Id.appendChild(optlevel3);

		talukArr=[];
		for(var key in level3Data){
			var optlevel3 = document.createElement('option');
			var valCh = level3Data[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel3.innerHTML = valCam;
			optlevel3.value = key;
			talukArr.push(key);	
			level3Id.appendChild(optlevel3);
		}
		$("#level_3_Id").data("selectBox-selectBoxIt").add();
		$('#level_3_Id').selectBoxIt();
	});

	var level2Value = document.getElementById('level_2_Id');
	var level2Name = level2Value.options[level2Value.selectedIndex].innerHTML;
	document.getElementById('page-title-id').innerHTML=level2Name+" District,";
	var level1Value = document.getElementById('level_1_Id');
	var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
	document.getElementById('page-subtitle-id').innerHTML=level1Name;
	var pathname1 = window.location.pathname;
	var prmsDt = $.deparam.fragment();
	var prms ={level0:level0Id, level1:level1Id, levelid:level2Id , levels:2};//,selected: selectedid }
	var r =$.param.fragment(pathname1 ,prms, 2 );
	$.bbq.pushState(r);	
}


// level2 function
function level2(d,id) {
	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;
	var level3Id = document.getElementById("level_3_Id").value;
	
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

	//Check if Topojson is already in master data:	
	var keyId = level0Id+"_"+level1Id+"_2";
	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key){
	     	if(masterData[i].key == keyId ){
      		  if(masterData[i].topojson != '0'){
			topoJsonAvailable = 1;
			topoJsonMap = masterData[i].topojson;
		  }
		}
	     }
	  }
	}


	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;

	var scaleVal, lat, long,latdif,longdif, scale4, scale5, projection, path;

	snapshotRank(level0Id,level1Id,id);
	
	var master= {};
	var tn;	
	if(topoJsonAvailable == 1){
		tn = topoJsonMap;
		topoJsonAvailable =0;
		 level2Topojson(tn,id);
	}else{
	    d3.json("/static/region_explorer/TOPO/356_"+level1Id+"_2_2011_district_topo.json", function(tn) {
		 master= {};
	         master["key"] = keyId;
	         master["topojson"] = tn;
		 masterData.unshift(master);
		 level2Topojson(tn,id);	
	    });	
	}
}


function level2Topojson(tn,id){
	
	if(tn){ 
	  d3.select("#map").selectAll('.mapRect').remove();
	  var svg = d3.select("#map").append("svg").attr("width", width-140).attr("height", 450).attr("left", "500").style('background-color','#F6F9FE');

	  // SVG 2
	  var svg2 = svg.append("g");
 	  d3.select("#map").selectAll('#svg_id').remove();
	  d3.select(".mapRect").style('display','block');	
	  var dataById={};
	  lat =(tn.bbox[0] + tn.bbox [2])/2;					
	  long =(tn.bbox[1] + tn.bbox [3])/2;
	  latdif = (tn.bbox[0] - tn.bbox [2] );
	  longdif = (tn.bbox[1] - tn.bbox [3] );
          scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
          scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

	  if(scale5 > scale4){    scaleVal = scale4; }
	  if(scale4 > scale5){  scaleVal = scale5;}
	
	  projection = d3.geo.albers().translate([250, 250]).origin([lat ,long]).scale(scaleVal );/*TN*///scaleVal//.translate([250, 250])	
	  path = d3.geo.path().projection(projection);
          carto = d3.cartogram().projection(projection).properties(function(d) {
										return dataById[d.id];
									}).value(function(d) {
										return +d.properties[field];
									});
          geometries = tn.objects.levels.geometries; 
          features = carto.features(tn, geometries);
	  var x, y, k;		
	  var val = 0;
			   
 	  svg2.append("svg").attr("width", width-10).attr("height", height-1).attr("id", "svg_id")
				.attr('transform', 'rotate(0)') 
				.selectAll("path")
				.data(features, function(d) {
						 if((d.id == id) && (val == 0)){ //level3DataLoad(d);
							val =1;
							if (d && centered !== d) {
								var centroid = path.centroid(d);
								x = centroid[0];
								y = centroid[1];
								k = 1;
								centered = d;
							} else {
								x = width / 2;
								y = height / 2;
								k = 1;
								centered = null;
							}
						 }
						 return d.id ;
						})
				.attr("class", "land").enter().append("path")
				.attr("class", "map_land")
				.attr("id", function(d, i) { 	 return d.id; })
				.attr("stroke"," #171717").style('stroke-width', 0.4)
				.attr("d", path)
				//.on("click", level2_onClick)
				.on("click", function(d){ level2_onClick(d);})
				.on('mouseover', function(d) {
					   	  d3.select(this).style('stroke-width', 0.4);
					   	  d3.select(this).style('cursor', 'pointer');
					    	  //this.parentNode.appendChild(this);
						})
				.on('mouseout', function(d) {
					   	  d3.select(this).style('opacity', 5);
					   	  d3.select(this).style('stroke-width', 0.4);
					   	  d3.select(this).style("stroke"," black");
					    	  //this.parentNode.appendChild(this);
						})
				.style("fill", function(d, i) {
					if(d.id == id){
						return '#4B93C3';
					} else {  return 'white';}
				});

	  svg2.selectAll("path").classed("active", centered && function(d) {
	    		  return d === centered;
	                });

          svg2.attr("transform", "rotate(0)").transition().duration(0).attr("transform", "translate(" + (width-140) / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y  + ")").style("stroke-width", 1.5 / k + "px");
          svg.append("rect").attr("class", "mapRect").attr("width", width-140).attr("height", 450).style("stroke", 'rgb(205,201,201)').style("fill", "none").style("stroke-width", 2);//.attr("transform", "translate( 100,50)");

	}else{  
   	   var text = svg2.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
   	   var bbox = text.node().getBBox();
	}
}



function level3_onClick(d){
	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;
	// Change on Hash params:	
	var pathname1 = window.location.pathname;
	var prmsDt = $.deparam.fragment();
	var prms ={level0:level0Id, level1:level1Id, levelid:d.id , levels:3 }
	var r =$.param.fragment(pathname1 ,prms, 2 );
	$.bbq.pushState(r);		
}


var talukArr = [];
// level3 function
function level3(d,id) {

	var level0Id = document.getElementById("level_0_Id").value;
	var level1Id = document.getElementById("level_1_Id").value;

	if(d){
		level3Id = d.id	
	}

	//Check if Topojson is already in master data:	
	var keyId = level0Id+"_"+level1Id+"_3";
	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key){
	     	if(masterData[i].key == keyId ){
      		  if(masterData[i].topojson != '0'){
			topoJsonAvailable = 1;
			topoJsonMap = masterData[i].topojson;
		  }
		}
	     }
	  }
	}

	//Snapshot Chart::	
	//snapshotRank_level3(level0Id,level1Id,level3Id);
	snapshotRank_level3(level0Id,level1Id,id);
	
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
	var level1_Id = document.getElementById("level_1_Id").value;
	var scaleVal, lat, long,latdif,longdif, scale4, scale5, projection, path;

	//master["key"] = keyId;
	//master["topojson"] = '0';
	//masterData.unshift(master);
	var master= {};
	var tn;	
	if(topoJsonAvailable == 1){
		tn = topoJsonMap;
		topoJsonAvailable =0;
		 level3Topojson(tn,id);
	}else{
	    d3.json("/static/region_explorer/TOPO/356_"+level1_Id+"_3_2011_taluk_topo.json", function(tn) {
		 master= {};
	         master["key"] = keyId;
	         master["topojson"] = tn;
		 masterData.unshift(master);
		 level3Topojson(tn,id);	
	    });	
	}
	
}

function level3Topojson(tn,id){
	
	if(tn){

	var svg = d3.select("#map").append("svg").attr("width", width-140).attr("height", 450).attr("left", "500").style('background-color','#F6F9FE');
	//svg.append("rect").attr("class", "mapRect").attr("width", width-140).attr("height", 450).style("stroke", 'rgb(205,201,201)').style("fill", "none").style("stroke-width", 1);//.attr("transform", "translate( 100,50)");

	// SVG 2
	var svg2 = svg.append("g");
 	 d3.select("#map").selectAll('#svg_id').remove();
	 d3.select(".mapRect").style('display','block');	
	 var dataById={};
	 lat =(tn.bbox[0] + tn.bbox [2] )/2;					
	 long =(tn.bbox[1] + tn.bbox [3])/2;
	 latdif = (tn.bbox[0] - tn.bbox [2] );
	 longdif = (tn.bbox[1] - tn.bbox [3] );
         scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
         scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

	 if(scale5 > scale4){    scaleVal = scale4; }
	 if(scale4 > scale5){  scaleVal = scale5;}
	
	 projection = d3.geo.albers().translate([250, 250]).origin([lat ,long]).scale(scaleVal );/*TN*///scaleVal//.translate([250, 250])	

	  path = d3.geo.path().projection(projection);
		
          carto = d3.cartogram().projection(projection).properties(function(d) {
										return dataById[d.id];
									}).value(function(d) {
										return +d.properties[field];
									});
          geometries = tn.objects.levels.geometries; 
          features = carto.features(tn, geometries);
	  var x, y, k;		
	  var val = 0;
	
			   
 	  svg2.append("svg").attr("width", width-10).attr("height", height-1).attr("id", "svg_id")
				.attr('transform', 'rotate(0)') 
				.selectAll("path")
				.data(features, function(d) {
							 if((d.id == id) && (val == 0)){ //level3DataLoad(d);
								val =1;
								if (d && centered !== d) {
									var centroid = path.centroid(d);
									x = centroid[0];
									y = centroid[1];
									k = 2;
									centered = d;
								} else {
									x = width / 2;
									y = height / 2;
									k = 2;
									centered = null;
								}
							 }
							 return d.id ;})
				.attr("class", "land").enter().append("path")
				.attr("class", "map_land")
				.attr("id", function(d, i) { 	 return d.id; })
				.attr("stroke"," #171717").style('stroke-width', 0.1)
				.attr("d", path)
				.on("click", function(d){ level3_onClick(d);})
				.on('mouseover', function(d) {
						if(d.id){
					   	  d3.select(this).style('stroke-width', 0.3);
					   	  d3.select(this).style('cursor', 'pointer');
					    	  //this.parentNode.appendChild(this);
						}
						})
				.on('mouseout', function(d) {
						if(d.id){
					   	  d3.select(this).style('stroke-width', 0.1);
					    	  //this.parentNode.appendChild(this);
						}
						})
				.style("fill", function(d, i) {
					if(d.id == id){
						return '#4B93C3';
					} else {  return 'white';}
				});

			svg2.selectAll("path").classed("active", centered && function(d) {
			    		return d === centered;
			});

		       svg2.attr("transform", "rotate(0)").transition().duration(500).attr("transform", "translate(" + (width-140) / 2 + "," + height / 2 + ")scale(" + k*2 + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
		       svg.append("rect").attr("class", "mapRect").attr("width", width-140).attr("height", 450).style("stroke", 'rgb(205,201,201)').style("fill", "none").style("stroke-width", 2);//.attr("transform", "translate( 100,50)");

			}else{  
		   	   var text = svg2.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
		   	   var bbox = text.node().getBBox();
			}
		}


var selectedGeoState=[]
var variableTotalPage=1;
var contextualVariable=[];
var selectedVariable=['population','population_density','decadal_migration'];

function canvasfun(canvasImage){
	document.getElementById("pin-form-description").value="";
	var context;
	if(canvasImage=="map"){
		var svgname = document.getElementById("svg_id");
		var svg = new XMLSerializer().serializeToString(svgname);
	}else if(canvasImage == "rank"){
		var svgname = document.getElementById("rankChart");
		var svg = new XMLSerializer().serializeToString(svgname);
		var find = '<path';
		var re = new RegExp(find, 'g');
		svg = svg.replace(re, '<path style="fill: none; stroke: black; display: none;"');
	}
	//svg = svg.replace('0H0V380H-6','0H0V380H-6');
	var canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
    canvg(canvas, svg, {renderCallback: function() {
	var h = canvas.height;
	var w = canvas.height;
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
	var level1 = document.getElementById('level_1_Id');
	var level1Name = level1.options[level1.selectedIndex].innerHTML;
	var level2 = document.getElementById('level_2_Id');
	var level2Name = level2.options[level2.selectedIndex].innerHTML;
	document.getElementById('pin-form-description').value = level1Name+" - "+level2Name;
	document.getElementById('idSavedImage').innerHTML = "Snapshot "+level1Name+" - "+level2Name;
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
