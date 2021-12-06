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
var numberFormatTitleValues = d3.format(".2f");

function ready(error, tn) {
   svg.transition().style("opacity", 1);
}
var level0Data,level1Data,levelsData;
function isInteger(x) {
    return x % 1 === 0;
}
var onLoadHashFlag=true;
window.onload = function(){

	$('#fieldDetails').html("Loading Data...");
	/* Function for pushing values to hash params */
	function push_values_to_hash_params(){
		var level0Val="";
		var level1Val="";
		var my_build_url="";
		if(sub_list["plus_plans"].length > 0){
			level0Val = sub_list['free_plans']['country'];
			level1Val = sub_list['plus_plans'][0];
		}else{
			level0Val = sub_list['free_plans']['country'];
			level1Val = sub_list['free_plans']['state'];
		}

		selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0], year:'2011' };//,selected: selectedid }
		var r =$.param.fragment(pathname1, prms, 2 );
		var prms1 = $.deparam.fragment();
		if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
		//$.bbq.pushState(r);
	}
	/* end of pushing values to hash params*/

	//d3.json("/app/places/master", function(masdata){
	d3.json("/static/master_data/masterdata.json", function(masdata){

	d3.json('/app/mysphere_mybuilds_for_region_snapshot_list/33',function(data){
		regionViewLoad();
		masterDataLoad(masdata);

		/*check if data in MY Builds for a user*/
		if((data.MyBuild.length > 0)){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
			selectedVariable = (JSON.parse(newvar)['variable']);
			selectedMyVariable = (JSON.parse(newvar)['selectedMyVariable']);
			if(selectedVariable.length==0){
				selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
			}

			if(JSON.parse(newvar).region != ''){ /*check if data has regions values in MY Builds for a user*/
				var region = JSON.parse(newvar)['region'];
				if(JSON.parse(newvar)['level']){   /*check if levels are available in MY Builds for a user*/

					//Load on change of region locations in another page of explore:
					var level0Val = JSON.parse(newvar)['level']['level_0'];
					var level1Val = JSON.parse(newvar)['level']['level_1'];
					var sub_list_not_in_level1 = 0;
					if(sub_list["plus_plans"].length > 0){
					    if(level1Val){
						for(var i = 0; i<sub_list["plus_plans"].length; i++){
						    if(level1Val ==sub_list["plus_plans"][i] ){
							sub_list_not_in_level1 = 1;
						    }
						}
					    }
					}
			
					if((level0Val==region['level_0']) && (level1Val==region['level_1']) && (sub_list_not_in_level1 == 1)){	/*check if country and state in MY Builds for a user*/
						var pathname1 = window.location.pathname;
						var prmsDt = $.deparam.fragment();
						if($.inArray(region['region_key'], selectedMyVariable)!= -1){
							var prms ={level0:region['level_0'], level1:region['level_1'], level:region['level'], field:region['region_key'], year:'2011' };
						}
						else if($.inArray(region['region_key'], selectedVariable)!= -1){
							var prms ={level0:region['level_0'], level1:region['level_1'], level:region['level'], field:region['region_key'], year:'2011' };
						}else{
							var prms ={level0:region['level_0'], level1:region['level_1'], level:region['level'], field:selectedVariable[0], year:'2011' };
						}
							var r =$.param.fragment(pathname1 ,prms, 2 );
						//$.bbq.pushState(r);
						var prms1 = $.deparam.fragment();
						if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
					} else if((sub_list_not_in_level1 == 1)) {
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
					} else {
						push_values_to_hash_params();
					}
				} else {
					push_values_to_hash_params();
				}
			} else {
				push_values_to_hash_params();
			}
		} else {
			push_values_to_hash_params();
		}



	//});
	});
	//Working for country
	level0Data = masdata["countries"];
	var level0Id = document.getElementById('level_0_Id');
	for(var i=0;i<level0Data.length;i++){
		var optlevel0 = document.createElement('option');
		var valCh = level0Data[i].name_0;
		var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel0.innerHTML = valCam;
		optlevel0.value = level0Data[i].id_0;
		level0Id.appendChild(optlevel0);
	}


	$('.custom_selectbox').selectBoxIt();
	$('#level_0_Id').selectBoxIt();	
	d3.select("#menu-div").style('display','block');

	//Hash Params
	var prms = $.deparam.fragment()
	if(Object.keys(prms).length > 0){
	    hashParams();
	}
	//Hash Params
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


function regionViewChange(){

	if(level1Array.length == 0){
		$("#geo-compare-sec").css("display","none");
		$("#menu-div").css("display","block");
	}else {
		$("#menu-div").css("display","none");
		$("#geo-compare-sec").css("display","block");
	}

	regionViewLoad();
	fieldChange(fieldval);
}

var level2Arr=[];
var tableRowCount={};
var stateDim,districtDim,talukDim;
function masterDataLoad(data){

	var level0Val="";
	var level1Val="";
	if(sub_list["plus_plans"].length > 0){
		level0Val = sub_list['free_plans']['country'];
		level1Val = sub_list['plus_plans'][0];
	}else{
		level0Val = sub_list['free_plans']['country'];
		level1Val = sub_list['free_plans']['state'];
	}

	level2Arr=[];
	var geoMasterData=[];
	for(var i=0;i<data['master']['master'].length;i++){
		var obj={};
		obj['id_0']=data['master']['master'][i]['_source'].id_0;
		obj['id_1']=data['master']['master'][i]['_source'].id_1;
		obj['id_2']=data['master']['master'][i]['_source'].id_2;
		obj['id_3']=data['master']['master'][i]['_source'].id_3;
		obj['name_0']=data['master']['master'][i]['_source'].name_0;
		obj['name_1']=data['master']['master'][i]['_source'].name_1;
		obj['name_2']=data['master']['master'][i]['_source'].name_2;
		obj['name_3']=data['master']['master'][i]['_source'].name_3;
		geoMasterData.push(obj);

		if(level2Arr.length<3){
			if(level1Val == data['master']['master'][i]['_source'].id_1){
				level2Arr.push(data['master']['master'][i]['_source'].id_2);
			}
		}

	}

	var ndx = crossfilter(geoMasterData);
	var all = ndx.groupAll();

	stateDim = ndx.dimension(function (d) {
	    return d.id_1 + "$" + d.name_1;
	});
	districtDim = ndx.dimension(function (d) {
	    return d.id_2;
	});
	talukDim = ndx.dimension(function (d) {
	    return d.id_3;
	});

	geoMenuDataLoad();
}

function onLevelChange(){
	tableRowCount={};	//reset table row count
	geoMenuDataLoad();
}


var level1Array=[];
var level1Obj={};
var levelsObj={};
var selectedGeoVariable={};
var selectedGeoId=[];
var regionValue;
function applyGeoVariable(){
	level1Array=[];
	var geoLevel = document.getElementById('geo_level').value;
	selectedGeoVariable={};
	selectedGeoId=[];
	level1Obj={};
	levelsObj={};

	for(var i=1;i<=tableRowCount["rowcount"];i++){
		if(document.getElementById("geo_level1_"+i)){
			var geoLevel1Value = document.getElementById("geo_level1_"+i).value;
			var geoLevel1Id = document.getElementById("geo_level1_"+i);
			var geoLevel1Name = geoLevel1Id.options[geoLevel1Id.selectedIndex].innerHTML;

			var geoLevel2Value = document.getElementById("geo_level2_"+i).value;
			var geoLevel2Id = document.getElementById("geo_level2_"+i);
			var geoLevel2Name = geoLevel2Id.options[geoLevel2Id.selectedIndex].innerHTML;

			if(geoLevel1Value==0){
				bootbox.alert("A State must be selected for this operation. Please select a State.");
				return false;
			}

			if(geoLevel==3){

				var geoLevel3Value = document.getElementById("geo_level3_"+i).value;
				var geoLevel3Id = document.getElementById("geo_level3_"+i);
				var geoLevel3Name = geoLevel3Id.options[geoLevel3Id.selectedIndex].innerHTML;

				if(geoLevel3Value==0){
					bootbox.alert("A Taluk must be selected for this operation. Please select a Taluk.");
					return false;
				}

				if(selectedGeoVariable[geoLevel1Value]){
					if(selectedGeoVariable[geoLevel1Value][geoLevel2Value]){
						selectedGeoVariable[geoLevel1Value][geoLevel2Value].push(geoLevel3Value);
					}else{
						selectedGeoVariable[geoLevel1Value][geoLevel2Value]=[geoLevel3Value];
					}
				}else{
					selectedGeoVariable[geoLevel1Value]={};
					selectedGeoVariable[geoLevel1Value][geoLevel2Value]=[geoLevel3Value];
				}
				selectedGeoId.push(geoLevel3Value);
				level1Obj[geoLevel1Value]=geoLevel1Name;
				levelsObj[geoLevel3Value]=geoLevel3Name;

			}else{
				if(geoLevel2Value==0){
					bootbox.alert("A District must be selected for this operation. Please select a District.");
					return false;
				}

				if(selectedGeoVariable[geoLevel1Value]){
					selectedGeoVariable[geoLevel1Value].push(geoLevel2Value);
				}else{
					selectedGeoVariable[geoLevel1Value]=[geoLevel2Value];
				}
				selectedGeoId.push(geoLevel2Value);
				level1Obj[geoLevel1Value]=geoLevel1Name;
				levelsObj[geoLevel2Value]=geoLevel2Name;

			}
		}
	}

	var checkRepeatKey={};
	for(var i=0;i<selectedGeoId.length;i++){
		if(!checkRepeatKey[selectedGeoId[i]]){
			checkRepeatKey[selectedGeoId[i]] = selectedGeoId[i];
		} else {
			bootbox.alert("Repeated geographical levels found.");
			return false;
		}
		
	}

	//
	var geoVariableContent="";
	geoVariableContent+='<ul class="nav navbar-nav item-panel-list2 group-list">';

	for(var key in selectedGeoVariable){
		level1Array.push(key);
		geoVariableContent+='<li>'+
				    '<h4 class="group-title">'+level1Obj[key]+'</h4>';
		for(var key1 in selectedGeoVariable[key]){
			if(geoLevel==3){
				for(var key2 in selectedGeoVariable[key][key1]){
					geoVariableContent+='<a title="'+levelsObj[selectedGeoVariable[key][key1][key2]]+'" class="group-item">'+levelsObj[selectedGeoVariable[key][key1][key2]]+'</a>';			
				}
			}else{
				geoVariableContent+='<a title="'+levelsObj[selectedGeoVariable[key][key1]]+'" class="group-item">'+levelsObj[selectedGeoVariable[key][key1]]+'</a>';
			}
		}
		geoVariableContent+='</li>';
	}
	level1Array = _.uniq(level1Array);
	if(geoVariableContent){
		document.getElementById('geo-var-sec').innerHTML=geoVariableContent;
	}else{
		document.getElementById('geo-var-sec').innerHTML="";
	}

	if(level1Array.length == 0){
		$("#geo-compare-sec").css("display","none");
		$("#menu-div").css("display","block");
	}else {
		$("#menu-div").css("display","none");
		$("#geo-compare-sec").css("display","block");
	}

	regionViewLoad();
	fieldChange(fieldval);
}


function level0Change(){
   snapshotKeyArray=[];
   var filterLevel0Id = document.getElementById("level_0_Id").value;
   d3.json("/app/scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
   //d3.json("/static/master_data/countrydetails_"+filterLevel0Id+".json" , function(data) {
	if(data){
		if(data['1001']){
			sessionClose(data['1001']);
		}
	}
	hashflag1=0;
	$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();
        variableCategory = data["keys"];
	myVariables = data["myvariables"];
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
		var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel1.innerHTML = "Select "+valCam;
		optlevel1.value = 0;
		optlevel1.setAttribute("selected", "selected");
		optlevel1.setAttribute("disabled", "disabled");
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
			if(sub_list['plus_plans'].length > 0){
				for(var i=0;i<sortable.length;i++){
					if(( $.inArray(sortable[i][0], sub_list['plus_plans']) != -1)){
						var optlevel1 = document.createElement('option');
						var valCh = sortable[i][1];
						var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel1.innerHTML = valCam;
						optlevel1.value = sortable[i][0];
						level1Id.appendChild(optlevel1);
					}
				}
			}else{
				for(var i=0;i<sortable.length;i++){
					if( sortable[i][0]=== sub_list['free_plans']['state'][0]){
						var optlevel1 = document.createElement('option');
						var valCh = sortable[i][1];
						var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel1.innerHTML = valCam;
						optlevel1.value = sortable[i][0];
						level1Id.appendChild(optlevel1);
					}
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
							var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							optlevel.innerHTML = "Display "+valCam+" Level";
							optlevel.value = i+"."+j;
							levelId.appendChild(optlevel);
						}
					}else{
						var optlevel = document.createElement('option');
						var valCh = levelsData[key]["level"+i+""];
						var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

	//$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	//$("#levelId").data("selectBox-selectBoxIt").remove();
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

		if(sub_list['plus_plans'].length == 0){
			
		    //if((fieldid != "IND_PCA_01" ) || (fieldid != "IND_PCA_21" ) || (fieldid != "IND_PCA_23")){
		    if(!( $.inArray(fieldid, selectedVariable) > -1)) {
			
			selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
			bootbox.dialog({
			  message: "You do not currently have access to these variables. To access them you will have to upgrade your plan. Upgrade now?",
			  buttons: {
			    no: {
			      label: "No Thank You."
			    },
			    yes: {
			      label: "Yes Please.",
			      callback: function() {
				window.location="/app/upgrade_account";
			      }
			    }
			  }
			});

			var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment();
			var prms ={field:'IND_PCA_01'};
			var r =$.param.fragment(pathname1,prms,2 );
			$.bbq.pushState(r);
			var prms1 = $.deparam.fragment();
		    }
		}

		// country load
		document.getElementById('level_0_Id').value = level0_Id;
		//$("#level0Id option[value="+level0Val+"]").attr('selected', 'selected');
		$("#level_0_Id").data("selectBox-selectBoxIt").add();

		// state load
		var filterLevel0Id = document.getElementById("level_0_Id").value;
		if(menuData){
			setMenuData();
		}else{
		
			d3.json("/app/scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
			//d3.json("/static/master_data/countrydetails_"+filterLevel0Id+".json" , function(data) {
				if(data){
					if(data['1001']){
						sessionClose(data['1001']);
					}
				}
				if(selectedMyVariable.length == 0){
					if(templatename){
						if(data["myvariables"]){
							if(data["myvariables"][templatename]){
								if(data["myvariables"][templatename]['levelsmapping']){
									if(Object.keys(data["myvariables"][templatename]['levelsmapping']).length > 0){
										for(i=0;i<data["myvariables"][templatename]['performancevariable'].length;i++){
											if(i<5){
												selectedMyVariable = []
												selectedMyVariable.push(data["myvariables"][templatename]['performancevariable'][0].id);
											}
										}
									}
								}
							}
						}
					}	
				}
				document.getElementById('fieldDetails').innerHTML="";
				variableCategory = data["keys"];
				myVariables = data["myvariables"];
				level1Data = data.level1;
				menuData = data;
				loadVariableCategory();
				setMenuData();
				//applySelectedVariable();
				applySelectedVariableCommon();

				var selectedMyVariableId = fieldid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '_');
				var re = new RegExp(" ", 'g');
				selectedMyVariableId = selectedMyVariableId.replace(re, '_');
				d3.select("#"+selectedMyVariableId).attr('class','selected');
			});
		}
	}
}


function applySelectedVariable(){
	applySelectedVariableCommon();
	applyGeoVariable();
}

var variableCategory,myVariables,units,description='';
var selectedGeoState=[]
var variableTotalPage=1;
var selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
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
		var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
			/*for(var i=0;i<sortable.length;i++){
				if(( $.inArray(sortable[i][0], sub_list['all_plans']) != -1)){
					var optlevel1 = document.createElement('option');
					var valCh = sortable[i][1];
					var valCam = valCh.replace(/\w\S* /g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					optlevel1.innerHTML = valCam;
					optlevel1.value = sortable[i][0];
					level1Id.appendChild(optlevel1);
				}
			}*/
			if(sub_list['plus_plans'].length > 0){
				for(var i=0;i<sortable.length;i++){
					if(( $.inArray(sortable[i][0], sub_list['plus_plans']) != -1)){
						var optlevel1 = document.createElement('option');
						var valCh = sortable[i][1];
						var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel1.innerHTML = valCam;
						optlevel1.value = sortable[i][0];
						level1Id.appendChild(optlevel1);
					}
				}
			}else{
				for(var i=0;i<sortable.length;i++){
					if(sortable[i][0] === sub_list['free_plans']['state'][0]){
						var optlevel1 = document.createElement('option');
						var valCh = sortable[i][1];
						var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel1.innerHTML = valCam;
						optlevel1.value = sortable[i][0];
						level1Id.appendChild(optlevel1);
					}
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
							var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							optlevel.innerHTML = "Display "+valCam+" Level";
							optlevel.value = i+"."+j;
							levelId.appendChild(optlevel);
						}
					}else{
						var optlevel = document.createElement('option');
						var valCh = levelsData[key]["level"+i+""];
						var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
		
		for(var j=0;j<variableCategory.length;j++){
			if(variableCategory[j]._source['key']){
			if(fieldval.toLowerCase() == variableCategory[j]._source['key'].toLowerCase()){
				document.getElementById('fieldDetails').innerHTML = variableCategory[j]._source['title'] +' in '+ variableCategory[j]._source['units'];	
			}
			}
		}	
		for(key in myVariables){
			for(var key1 in myVariables[key]){
				for(var key2 in myVariables[key][key1]){
					if(myVariables[key][key1][key2]['id'] == fieldval){
						document.getElementById('fieldDetails').innerHTML = myVariables[key][key1][key2]['name'] +' in '+ myVariables[key][key1][key2]['unit']  ;
					}
				}
			}
		}
		

		var field = fieldval.replace('_',' ');
		field = field.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

		//if(fieldSplit.length>1){
		//	field = splitFieldName.replace(/_/g,' ').toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		//}

		field = field.replace(/_/g,' ').toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});		

		//document.getElementById('fieldDetails').innerHTML = field + units;	
		
	}

	if(level1Array.length == 0){
		if(prms.level2){
			level_2 = prms.level2;
			lvl2={};
			lvl2["id"] = level_2;
			level2.push(lvl2)
			talukDataOnLoad(level0_Id,level1_Id,fieldval,yearid,levelid,level2);	
		} else{
			dataLoad(level0_Id,level1_Id,fieldval,yearid,levelid,selectedid);	
		}
	}else {
		var compareLevelval = document.getElementById('geo_level').value;
		compareDataLoad(level0_Id,fieldval,yearval,compareLevelval);
	}

	}

}


function removeSVG(){
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.select("#map").selectAll('.legend').remove();
	d3.selectAll('#svg_id').remove();
	d3.selectAll('#bar_svg').remove();
	d3.selectAll('.bar_svg').remove();
	d3.selectAll('.nomap').remove();
	d3.select("#map").select('image').remove();
	document.getElementById('fieldDetails').innerHTML="";
	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select("#barBackButton").select('image').remove();
	d3.select("#map_legend").selectAll('.legend').remove();
	d3.select("#map_legend").selectAll('.legend1').remove();
}



var selectedState='';
function level1Change(){

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;
	if(level1_Id != 0){
    	    removeSVG();
	    mapLoading();
	
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
	}else{
		//removeSVG();
		bootbox.alert("Please select a State.");
		return false;
	}
}


var selectedLevel='';
function levelChange(){
	removeSVG();
	
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;
	if (level0_Id == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   return false;
	}
	/* myvariable */
	var myVariableContent = '';
	var fieldArr = [];
	var allField = [];
	for(var i=0;i<selectedVariable.length;i++){
		allField.push(selectedVariable[i]);
	}

	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	if(levelval == 3){
       		fieldval = fieldval.replace('l2','l3');
	}
	if(levelval == 2){
       		fieldval = fieldval.replace('l3','l2');
	}

	var selectedMyVar = [];	
	/*myVariable */
	for(var i=0;i<selectedMyVariable.length;i++){
		var insideLevel = 0;
		var myVariableName = "";
		for(var index in  myVarIndex){
			for(var	 keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					var levelVarArr = myVariables[myVarIndex[index]]['levelsmapping']['level'+levelval];
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id == selectedMyVariable[i] ){
							myVariableName = myVariables[myVarIndex[index]][keys][keyOfNumber].name;
							if(myVariableName.length > 25){
								myVariableName = myVariableName.substring(0, 25);
								myVariableName = myVariableName+" ..."
							}
							//var myVarName=selectedMyVariable[i].replace(/_/g," ").toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							//if((( $.inArray(selectedMyVariable[i], levelVarArr)) != -1)){
							if((( $.inArray(selectedMyVariable[i], selectedMyVar)) == -1)){
								selectedMyVar.push(selectedMyVariable[i]);
								insideLevel = 1;
								fieldArr.push(selectedMyVariable[i]);
								if(fieldval == selectedMyVariable[i]){
									myVariableContent+='<li class="selected" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedMyVariable[i]+"'"+')" >'+myVariableName.toTitleCase()+'</a></li>';
								} else {
									myVariableContent+='<li class="" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedMyVariable[i]+"'"+')" >'+myVariableName.toTitleCase()+'</a></li>';
								}
								allField.push(selectedMyVariable[i]);
							}
						}
					}
				}	
			}	
		}
		if(insideLevel == 0){
			if(myVariableName.length > 25){
				myVariableName = myVariableName.substring(0, 25);
				myVariableName = myVariableName+" ..."
			}
			myVariableContent+='<li class="" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow" style="color:#C0C0C0 ;disable:true;"  class="popup-label" >'+myVariableName.toTitleCase()+'</a></li>';
		}
	}
 	if(selectedMyVariable.length<10){
	    myVariableContent+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="myVarClick();">Add more variables...</a></li>';
	}
	var fieldNotFound = 0;
	if(myVariableContent.length > 1){	
		document.getElementById('myVariableListId').innerHTML=myVariableContent;
	}else{
		document.getElementById('myVariableListId').innerHTML="";
	}
	/* myvariable */

	if(( $.inArray(fieldval, allField) == -1)){
		fieldNotFound = 1;	
	}
	
	if(fieldNotFound == 1){
		fieldval = selectedVariable[0];
	}
	
	/* to clear all selected color and re color the selected variable*/
	for(var i=0;i<selectedVariable.length;i++){
		d3.select("#"+selectedVariable[i]).attr('class','');
	}
	d3.select("#"+fieldval).attr('class','selected');

	mapLoading();
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
	StickyToolTipFun();
}


function addToMyBuilds(fieldid){
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	mysphere_url_list="/app/mysphere_mybuilds_for_region_snapshot/"+level1_Id+"?level0="+level0_Id+"&level="
				+levelval+"&region_key="+fieldid+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});
}

function mapLoading(){

	d3.selectAll("#maploading").remove();
	d3.selectAll("#barloading").remove();
	var maploading = d3.select("#map").append("svg").attr("class", "maploading").attr("id", "maploading").attr("width", 420)
				.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
	maploading.append("text").attr("x", 148).attr("y", 113) 
	.text("Loading Map...");
	var maploading = d3.select("#bar").append("svg").attr("class", "barloading").attr("id", "barloading").attr("width", 420)
				.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
	maploading.append("text").attr("x", 148).attr("y", 113) 
	.text("Loading Chart...");
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

	for(var i=0;i<selectedMyVariable.length;i++){
		var selectedMyVariableId = selectedMyVariable[i];	//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '_');
		var re = new RegExp(" ", 'g');
		selectedMyVariableId = selectedMyVariableId.replace(re, '_');
		d3.select("#"+selectedMyVariableId).attr('class','');
		if(fieldid == selectedMyVariableId){
			fieldval = selectedMyVariable[i];
		}
	}

	d3.select("#"+fieldid).attr('class','selected');

	removeSVG();
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;
	if (level0_Id == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   return false;
	}
	addToMyBuilds(fieldid);
	mapLoading();

	if(selectedField !=fieldval || selectedYear!=yearval){
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval, year:yearval };//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}else{
		if(level0_Id != 0 && level1_Id != 0){
			for(var j=0;j<variableCategory.length;j++){
				if(variableCategory[j]._source['key']){
				if(fieldval.toLowerCase() == variableCategory[j]._source['key'].toLowerCase()){
					document.getElementById('fieldDetails').innerHTML = variableCategory[j]._source['title'] +' in '+ variableCategory[j]._source['units'];
				}
				}
			}	
			//if(regionValue == "region"){
			if(level1Array.length == 0){
				dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
			}else {
				var compareLevelval = document.getElementById('geo_level').value;
				compareDataLoad(level0_Id,fieldval,yearval,compareLevelval);
			}
		}
	}
	


	selectedField = fieldval;
	selectedYear = yearval;
}


function regionViewLoad(){
	var mapViewContent="";
	if(level1Array.length == 0){
		mapViewContent+='<div class="col-lg-6">'+
		        /*'<div>'+
			    '<a class="map-save-tab" onclick="saveImgMap()" id="canvas-Map-id" data-toggle="modal" data-target=".my-save">Save</a>'+
		        '</div>'+*/
			'<div  style=" height:26px;">'+
				'<div style="display:inline;">'+
				    '<a class="map-save-tab" onclick="saveImgMap()" style="display:inline;" id="canvas-Map-id_'+selectedVariable[i]
						+'" data-toggle="modal" data-target=".my-save">Save</a>'+
				'</div>'+
				/*'<div style="display:inline;padding-left:2px;">'+
				    '<a class="map-save-tab" onclick="shareImgMap('+"'"+'map'+"'"+')"  style="display:inline;" id="canvas-Map-id_'+selectedVariable[i]
						+'" data-toggle="modal"  data-target=".share-popup"'
						+'>Share</a>'+
				'</div>'+*/

		        '</div>'+
			'<div id="map"></div>'+
			'<svg id="barBackButton" style="width:170px; height: 50px;"></svg>'+
                    '</div>'+

		    '<div class="col-lg-6">'+
		        //'<div>'+
			//    '<a class="map-save-tab" onclick="saveImgChart()" id="canvas-Bar-id" data-toggle="modal" data-target=".my-save">Save</a>'+
			'<div  style=" height:24px;">'+
				'<div style="display:inline;">'+
				    '<a class="map-save-tab" onclick="saveImgChart()" style="display:inline;" id="canvas-Bar-id_'+selectedVariable[i]+'" data-toggle="modal" data-target=".my-save">Save</a>'+
				'</div>'+
				/*'<div style="display:inline;padding-left:2px;">'+
				    '<a class="map-save-tab" onclick="shareImgMap('+"'"+'chart'+"'"+')" style="display:inline;" id="canvas-Bar-id_'+selectedVariable[i]+'"  data-toggle="modal"  data-target=".share-popup"   >Share</a>'+
				'</div>'+*/

                        '<div class="tab-sec rightpanel-map-tab">'+
                            '<ul class="nav nav-tabs" role="tablist" >'+
                              '<li class="active" id="bar-grap-id"><a href="#bargraph" role="tab" data-toggle="tab" id="tab-map" onclick="helpChange('+"'Bar'"+');">Bar Graph</a></li>'+
                              '<li id="histogram-id"><a href="#histogram" role="tab" data-toggle="tab" id="tab-grid" onclick="helpChange('+"'Histogram'"+');">Histogram</a></li>'+
                            '</ul>'+
                        '</div>'+
			'</div>'+
                    	'<div class="tab-content" id="bar-tab" >'+
                          '<div class="tab-pane active" id="bargraph">'+
                          	'<div id="bar"></div>'+
                          '</div>'+
                          '<div class="tab-pane" id="histogram">'+
				'<table cellpadding="4" width="100%">'+
				'<tr>'+
					'<td><div id="histogramDivId" style="height:350px;"></div></td>'+
				'</tr>'+
			        '<tr>'+
				    	'<td style="padding-left: 40px;"><font id="meanId"></font></td>'+
			        '</tr>'+
			        '<tr>'+
				    	'<td style="padding-left: 40px;"><font id="medianId"></font></td>'+
			        '</tr>'+
				'</table>'+
                          '</div>'+
                        '</div>'+
                    '</div>';

	}else {
		for(var i=0;i<level1Array.length;i++){
			if(i==0){
				mapViewContent+='<div id="map_legend" style="height:40px;"></div><div class="col-lg-12">'+
				'<div id="spacialcontent_'+level1Array[i]+'" style="visibility:hidden">No Data</div>'+
				'<div class="col-lg-6" id="map_'+level1Array[i]+'"></div>';

			    	mapViewContent+='<div class="col-lg-6">'+
					'<div>'+
					    '<a class="map-save-tab" onclick="saveImgChart()" id="canvas-Bar-id" data-toggle="modal" data-target=".my-save">Save</a>'+
				        '<div class="tab-sec rightpanel-map-tab">'+
				            '<ul class="nav nav-tabs" role="tablist" >'+
				              '<li class="active" id="bar-grap-id"><a href="#bargraph" role="tab" data-toggle="tab" id="tab-map" onclick="helpChange('+"'Bar'"+');">Bar Graph</a></li>'+
				              '<li id="histogram-id"><a href="#histogram" role="tab" data-toggle="tab" id="tab-grid" onclick="helpChange('+"'Histogram'"+');">Histogram</a></li>'+
				            '</ul>'+
				        '</div>'+
					'</div>'+
				    	'<div class="tab-content" id="bar-tab" >'+
				          '<div class="tab-pane active" id="bargraph">'+
				          	'<div id="bar"></div>'+
				          '</div>'+
				          '<div class="tab-pane" id="histogram">'+
						'<table cellpadding="4" width="100%">'+
						'<tr>'+
							'<td><div id="histogramDivId" style="height:350px;"></div></td>'+
						'</tr>'+
						'<tr>'+
						    	'<td style="padding-left: 40px;"><font id="meanId"></font></td>'+
						'</tr>'+
						'<tr>'+
						    	'<td style="padding-left: 40px;"><font id="medianId"></font></td>'+
						'</tr>'+
						'</table>'+
				          '</div>'+
				        '</div>'+
				    '</div>';
			}else{
				mapViewContent+='<div class="col-lg-6">'+
					'<div id="spacialcontent_'+level1Array[i]+'" style="visibility:hidden">No Data</div>'+
					'<div id="map_'+level1Array[i]+'"></div>'+
					'</div>';
			}

		}
	}

	if(mapViewContent){
		document.getElementById('mapview').innerHTML=mapViewContent;
	}else{
		document.getElementById('mapview').innerHTML="";
	}


}


// compare dataload
var fullCompareData=[];
/* Compare */
function compareDataLoad(level0_Id,fieldId,yearId,compareLevelval){

	var category="";
	var index_name = '';
	for(var j=0;j<variableCategory.length;j++){
		if(fieldId.toLowerCase() == variableCategory[j]._source['key'].toLowerCase()){
			index_name = variableCategory[j]._source['index_id'];
			category = index_name;
			colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			});
		}
	}

	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	if(index_name == ''){
		for(var index in myVarIndex){
			for(var keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id == fieldId  ){
							category="mylocation";
							index_name = orgid;
							colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {
								return d3.hsl(rgb);
							});
						}
					}
				}
			}	
		}
	}	

	//level1Array=[];
	fullCompareData=[];

	if(compareLevelval){
		if(compareLevelval == 2){
			levelType = "District";
		}else if(compareLevelval == 3){
			levelType = "Taluk";
		}
		var content='<li><span>Geography - '+levelType+' level <span></li>';
		document.getElementById('breadcrumb_id').innerHTML = content;

		d3.json("/app/places/compare?id="+selectedGeoId+"&category="+category+"&varkey="+fieldId.toLowerCase()+"&index="+index_name+"&level="+parseInt(compareLevelval)+"&level1Id="+level1Array+"", function(data) {
		//d3.json("/app/places/"+level1_Id[0]+"/region?category=demographic&regionkey="+fieldId+"&index=demographic&level="+parseInt(levelId)+"&level0="+level0_Id+"&leveltype="+levelType+"", function(data) {
			if(data){
				if(data['1001']){
					sessionClose(data['1001']);
					return false;
				}
				if(data['subscription']){
					bootbox.alert(data['subscription']);
				}
			}
			fullCompareData=[];
			for(i=0;i<data.length;i++){
				for(var key in data[i]){
					parameter = _.omit(data[i][key], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
					for(varkey in parameter){
						var arr={};
						if(parseInt(compareLevelval) == 2){
							arr['id_1'] = data[i][key].id_1;
							arr['id_2'] = data[i][key].id_2;
							arr['name_1'] = data[i][key].name_1;
							arr['name_2'] = data[i][key].name_2;
						}else if(parseInt(compareLevelval) == 3){
							arr['id_2'] = data[i][key].id_2;
							arr['name_2'] = data[i][key].name_2;
							arr['id_3'] = data[i][key].id_3;
							arr['name_3'] = data[i][key].name_3;
						}
						arr['year'] = 2011;
						arr['key']=fieldId;
						arr['value']=data[i][key][varkey];
						fullCompareData.push(arr);
					}
				}
			}
			if(compareLevelval == 2){
				compareData_level2('');
			}
			if(compareLevelval == 3){
				compareData_level3('');
			}
		});
	  }

}

/* Compare */
function compareData_level2(d){

	var level0_Id = document.getElementById('level_0_Id').value;
	var levelid = document.getElementById("levelId").value;
	var geoLevelId = document.getElementById('geo_level').value;
        var levelType = levelsData[level0_Id]["level"+geoLevelId+""].toLowerCase();
	var yearId = document.getElementById('yearId').value;

	document.getElementById("fieldDetails").style.visibility='hidden';
	d3.select(".mapRect").style('display','block');

	var dataById={};

	var topoJsonAvailable = 0;
	var topoJsonMap = "";

	rawData = crossfilter(fullCompareData);    
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
	key1 = yearVal.filter(yearId);
	var data_val =  print_filter(key);

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
	color = d3.scale.linear().range(colors).domain([minvalue, secval, midval1, forval, maxvall]);


	//chart(fieldId,yearId,400,500);
	//legend1(minvalue, secval, midval1, forval, maxvall);
	compareLegend(minvalue, secval, midval1, forval, maxvall);

	//var distid= d.id;
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

	for(var i=0;i<level1Array.length;i++){
		var level1Id = level1Array[i];
		/*var keyId = level0_Id+"_"+level1Id+"_"+levelId+"_"+yearId;
		for(j= 0; j < masterData.length; j++ ){
			if(masterData[j]){
				if(masterData[j].key == keyId ){
					if(masterData[j].topojson != '0'){
						topoJsonAvailable = 1;
						topoJsonMap = masterData[j].topojson;
					}
				}
			}
		}*/
		if(i==0){
			chart(fieldval,yearId,levelType);
		}
		loadTopoJson(level1Id);
	}

	function loadTopoJson(level1Id){
		//chart(fieldval,yearId,400,500,level1Id);
		//chart(fieldval,yearId,levelType);
		var tn;

		if(topoJsonAvailable == 1){
			tn = topoJsonMap;
			topoJsonAvailable=0;
			level2TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k,yearId);
		}else{
			d3.json("/static/region_explorer/TOPO/"+level0_Id+"_"+level1Id+"_2_"+yearId+"_"+levelType.toLowerCase()+"_topo.json", function(tn) {//TN_2001.json
				/*var keyId = level0_Id+"_"+level1Id+"_"+levelId+"_"+yearId;
				for(i=0;i<masterData.length;i++){
					if(masterData[i]){
						if(masterData[i].key == keyId ){
							if(masterData[i].topojson == '0'){
								masterData[i]["topojson"]=tn;
							}
						}
					}
				}*/
				level2TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k,yearId);
			});
		}

	}

}

var svgcompare,svg2compare;
/* Compare */
function level2TopojsonLoad(tn, level0_Id, level1Id, dataById , x, y, k, yearId){

        svgcompare = d3.select("#map_"+level1Id).append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');
        svgcompare.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor).style("fill", "none").style("stroke-width", border);//.attr("transform", "translate( 100,50)");
	svg2compare = svgcompare.append("g");

	if(tn){ 
		lat =(tn.bbox[0] + tn.bbox [2] )/2;					
		long =(tn.bbox[1] + tn.bbox [3])/2;
		latdif = (tn.bbox[0] - tn.bbox [2] );
		longdif = (tn.bbox[1] - tn.bbox [3] );
		scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
		scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

		if(scale5 > scale4){scaleVal = scale4;}
		if(scale4 > scale5){  scaleVal = scale5;}
	
		if(level0_Id == '840' && level1Id == '2'){
		 /*Working new*/  projection = d3.geo.albersUsa().translate([650, 200]).scale(scaleVal*10);/*TN*///scaleVal // Only for Alaska
		}
	 	else{
		 /*Working new*/ projection = d3.geo.albers().translate([210, 250]).origin([lat ,long]).scale(scaleVal/1.3);/*TN*///scaleVal//.translate([250, 250])	
		}	

	  	path = d3.geo.path().projection(projection);
		
         	carto = d3.cartogram().projection(projection).properties(function(d) {
										if(d.properties){
											return d.properties.name;
										}else{
											return dataById[d.id];
										}
									}).value(function(d) {
										return +d.properties[field];
									});
		geometries = tn.objects.levels.geometries; 
		features = carto.features(tn, geometries);		
			   
 	 	svg2compare.append("svg").attr("width", width).attr("height", height).attr("id", "svg_id")
				.attr('transform', 'rotate(0)')
				.selectAll("path")
				.data(features, function(d) { return d.id ;})
				.attr("class", "land").enter().append("path")
				.attr("class", "map_land")
				.attr("id", function(d, i) { 	 return d.id; })
				.attr("stroke"," #777").style('stroke-width', 0.8)
				.attr("d", path).on('mouseover', function(d) {
					if(d.id){
					    var valset = level_2.filter(d.id);
					    var dt = print_filter(valset);
					   	
					    if(dt.length == 0){
					       d3.select('#spacialcontent').style('display','');	
				               d3.select('#spacialcontent').html(d.properties.toTitleCase()+" (No Data)");
					    }else if(!dt[0].value && dt[0].value != 0){
        				       d3.select('#spacialcontent').style('display','');	
					       d3.select('#spacialcontent').html( dt[0].name_2.toTitleCase() + ' <span class="value"></span>')/*Not Available*/
					       //d3.select(this).style('opacity', 0.3)
					       //this.parentNode.appendChild(this);
					    }else{
					       var value = '';	
					       if(isInteger(dt[0].value)){
							value = dt[0].value;
					       }else{
							value = numberFormatTitleValues(dt[0].value);
					       }
        				       d3.select('#spacialcontent').style('display','');	
					       d3.select('#spacialcontent').html( dt[0].name_2.toTitleCase() + ' <span class="value">(' +value + ')</span>')
					       //d3.select(this).style('opacity', 0.3)
					       //this.parentNode.appendChild(this);
					    }
					}
				}).on('mouseout', function(d) {
        				 d3.select('#spacialcontent').style('display','none'); 
					 /*if(d.id){  	
 					    d3.select('#spacialcontent_'+level1Id).style('visibility','hidden');	
					    d3.select(this).style('opacity', 1)
					    //this.parentNode.appendChild(this);
					 }*/
				})
				//.on("click", level3DataLoad)
				.style("fill", function(d, i) {
					if(d.id){
						var valset = level_2.filter(d.id);
						var dt = print_filter(valset);
						if(dt[0]){
							if(dt[0].value){
								d3.select(this).style('stroke-width', 2);
								d3.select(this).style('stroke', 'black');
							}
							if(dt[0].value == 'inf'){
						    		return color(maxvall);
							}
							else {
						    		return color(dt[0].value);}
							}
						else {  
							return 'white';
						}
					}
				}).on("contextmenu", function(d){
						d3.event.preventDefault();
						snapLevel = 2;
						snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1Id+"&levelid="+d.id+"&levels=2";
						canvasImage ='map';
						snapshotRankPopup(level0_Id,level1Id,d.id);
						$('#snapshot-popup-id').click();

				});

		svg2compare.selectAll("path").classed("active", centered && function(d) {
		    		return d === centered;
		});
		svg2compare.attr("transform", "rotate(0)").transition().duration(0).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");

	}else{  
	   var text = svg2compare.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
	   var bbox = text.node().getBBox();
	}
	document.getElementById("fieldDetails").style.visibility=''; 
}

/* Compare */
function compareData_level3(d){

	var level0_Id = document.getElementById('level_0_Id').value;
	var yearId = document.getElementById('yearId').value;
	//var levelid = document.getElementById("levelId").value;
	//levelid = parseInt(levelid)+1;
	var geoLevelId = document.getElementById('geo_level').value;
	var levelType = levelsData[level0_Id]["level"+geoLevelId+""].toLowerCase();

	d3.select(".mapRect").style('display','block');
	document.getElementById("fieldDetails").style.visibility='hidden'; 

	//d3.select("#map").selectAll('.legend').remove();
	d3.selectAll('#svg_id').remove();
	d3.selectAll('.nomap').remove();
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.selectAll('.legend').remove();

	var dataById={};

	//Check if Topojson is already in master data:	
	//var keyId = level0_Id+"_"+level1_Id+"_3_"+yearId;
	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	/*for(i= 0; i < masterData.length; i++ ){
	  if(masterData[i]){
	     if(masterData[i].key == keyId ){
      		 if(masterData[i].topojson != '0'){
			topoJsonAvailable = 1;
			topoJsonMap = masterData[i].topojson;
		}
	     }
	  }
	}*/

	l3_RawData = crossfilter(fullCompareData);

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
	l3_level_3.filterAll();
	l3_level_2.filterAll();

	// Filtering by field and year
	key = l3_KeyVal.filter(fieldval);
	key1 = l3_YearVal.filter(yearId);
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
	
	//level_3_LevelChart(fieldId,yearId,400,500);
	//legend1(minvalue, secval, midval1, forval, maxvall);
	compareLegend(minvalue, secval, midval1, forval, maxvall);

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



	for(var i=0;i<level1Array.length;i++){
		var level1Id = level1Array[i];
		if(i==0){
			level_3_LevelChart(fieldval,yearId,levelType);
		}
		loadTopoJson(level1Id);
	}

	function loadTopoJson(level1Id){
		var tn;
		if(topoJsonAvailable == 1){
			tn = topoJsonMap;
			topoJsonAvailable =0 ;
			level3TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k ,yearId);
		}else{
			d3.json("/static/region_explorer/TOPO/"+level0_Id+"_"+level1Id+"_3_"+yearId+"_"+levelType.toLowerCase()+"_topo.json", function(tn) {//TN_2001.json
				/*for(i= 0; i < masterData.length; i++ ){
					if(masterData[i]){
						if(masterData[i].key == keyId ){
							if(masterData[i].topojson == '0'){
								masterData[i]["topojson"]=tn
							}
						}
					}
				}*/	
				level3TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k,yearId);
			});
		}
		//level_3_LevelChart(fieldId.toLowerCase(),yearId,400,500,level1Id);
	}

}

/* Compare */
function level3TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k, yearId){
	
        svgcompare = d3.select("#map_"+level1Id).append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');
        svgcompare.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor).style("fill", "none").style("stroke-width", border);//.attr("transform", "translate( 100,50)");

	svgcompare2 = svgcompare.append("g");

	 if(tn){
	      lat =(tn.bbox[0] + tn.bbox [2] )/2;					
	      long =(tn.bbox[1] + tn.bbox [3])/2;
	      latdif = (tn.bbox[0] - tn.bbox [2] );
	      longdif = (tn.bbox[1] - tn.bbox [3] );
	      scale4 = 52*500/(tn.bbox [2]-tn.bbox [0]);
	      scale5 = 52*500/(tn.bbox [3]-tn.bbox [1])*(0.9);

	      if(scale5 > scale4){   scaleVal = scale4; }
	      if(scale4 > scale5){   scaleVal = scale5;}

	      if(level0_Id == '840' && level1Id == '2'){
		 /*Working new*/var  projection = d3.geo.albersUsa().translate([650, 200]).scale(scaleVal*10);/*TN*///scaleVal // Only for Alaska
	      }else{
		 /*Working new*/var projection = d3.geo.albers().translate([210, 250]).origin([lat ,long]).scale(scaleVal/1.3);/*TN*///scaleVal//.translate([250, 250])	
      	      }
		
              var path = d3.geo.path().projection(projection);

 	      carto = d3.cartogram().projection(projection).properties(function(d) {
									if(d.properties){
										return d.properties.name;
									}else{
										return dataById[d.id];
									}
								}).value(function(d) {
									return +d.properties[field];
								});	
		
	      geometries = tn.objects.levels.geometries; 
	      features = carto.features(tn, geometries);	
	      svgcompare2.append("svg").attr("width", width).attr("height", height).attr("id", "svg_id")
			.attr('transform', 'rotate(0)') 
			.selectAll("path")
		        .data(features, function(d) {   return d.id })
			.attr("class", "land").enter().append("path")
			.attr("id", function(d, i) {    return d.id; })
			.attr("stroke"," #777").style('stroke-width', 0.8)
			.attr("d", path).on('mouseover', function(d) {
				if(d.id){
				    var valset = l3_level_3.filter(d.id);
				    var dt = print_filter(valset);
				    if(dt.length == 0){
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html(d.properties.toTitleCase()+" (No Data)");
				    }else if(!dt[0].value && dt[0].value != 0){
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html( dt[0].name_3.toTitleCase() + ' <span class="value"></span>');/*Not Available*/
				    }else {
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html( dt[0].name_3.toTitleCase() + ' <span class="value">(' + dt[0].value + ')</span>');
				    }
				}
			}).on('mouseout', function(d) {
        			d3.select('#spacialcontent').style('display','none');
			}).on("contextmenu", function(d){
				snapLevel = 3;
				snapURL = "/snapshot#level0="+level0_Id+"&level1="+level1Id+"&levelid="+d.id+"&levels=3";
				canvasImage = "map";
				snapshotRankLevel3Popup(level0_Id,level1Id,d.id);
				$('#snapshot-popup-id').click();
				d3.event.preventDefault();
			})
			.style("fill", function(d, i) {
				if(d.id){
					var valset = l3_level_3.filter(d.id);
					var dt = print_filter(valset);
				   	if(dt[0]){
						if(dt[0].value){
							d3.select(this).style('stroke-width', 2);
							d3.select(this).style('stroke', 'black');
						}
						if(dt[0].value == 'inf'){  
							return color(maxvall);
						}
						else{
							return color(dt[0].value);
						}
					}	
					else{ 
						return 'white';
					}
				}
			});


			svgcompare2.selectAll("path").classed("active", centered && function(d) {
			    		return d === centered;
			});

		svgcompare2.attr("transform", "rotate(0)").transition().duration(0).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
		

		}else{
		   var text = svgcompare.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
	   	   var bbox = text.node().getBBox();
		}

		document.getElementById("fieldDetails").style.visibility=''; 	

}

// compare dataload




// level2 variables
var maxvall, minvalue, minvalue, secval, midval, midval1, forval, maxvall, rawData,l2_Data,l3_Data;
var yearVal, KeyVal, level_2;

// level3 variables
var l3_RawData,l3_KeyVal,l3_YearVal,l3_level_3,l3_level_2;
var masterData = new Array(4);
var canvasImage;

var shareCategory, shareIndexName;

//load level2 and level3 level data
function dataLoad(level0_Id,level1_Id,fieldid,yearval,levelid){

	var category="";
	var index_name = '';
	var data_obj={};
	var regionkey=[];

	for(var j=0;j<variableCategory.length;j++){
		if(fieldid == variableCategory[j]._source['key']){
			index_name = variableCategory[j]._source['index_id'];
			category = index_name;
			colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			});
			data_obj["keys"]=[fieldid.toLowerCase()]
			regionkey.push(fieldid.toLowerCase());
		}
	}

	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	if(index_name == ''){
		for(var index in myVarIndex){
			for(var keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id ==fieldid  ){
							category="mylocation";
							index_name = orgid;
							colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {
								return d3.hsl(rgb);
							});
							regionkey.push(fieldid.toLowerCase());
						   	data_obj["keys"]=[fieldid.toLowerCase()]
						}
					}
				}
			}	
		}
	}


	//setting selected field and year	
	selectedField = fieldid;
	selectedYear = yearval;

	if(fieldid == 'IND_MV_01'){
		category="model";
		index_name = 'model25';
	}

	mapLoading();
	var level1Id = document.getElementById('level_1_Id');
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	var levelId = document.getElementById('levelId');
	var levelName = levelsData[level0_Id]["level"+levelid+""].toLowerCase();
	levelName = levelName.replace(/_/g,' ').toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

	var grid="";
	grid += '<li><span> '+level1Name+' </span></li>'+
		'<li class="active"><span> All '+levelName+'s </span></li>';
	document.getElementById('breadcrumb_id').innerHTML = grid;

	var field_split = fieldid.split('_');
	var keyId = '';
	if(field_split[1] == 'EC'){
		keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"_"+fieldid;
	}else{
		//keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"";
		keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"_"+fieldid;
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


	shareIndexName = index_name;
	shareCategory = category;


	if(val == 0){
		
			if(parseInt(levelid) == 2){
				var url="/app/places/"+level1_Id+"/region?category="+category+"&regionkey="+regionkey+"&index="+index_name+"&level="+parseInt(levelid)+"&level0="+level0_Id+"&leveltype="+levelName+"";
				$.ajax({
				    url: url,
				    type: 'post',
				    dataType: 'json',
				    success: function (data) {
					if(data){
						if(data['subscription']){
							bootbox.alert(data['subscription']);
						}
						if(data['1001']){
							sessionClose(data['1001']);
						}
					}

					var dataArr2 = [];
					var arrObj = [];
					if(data){
					for(var i=0;i<data.length;i++){
						if(fieldid == "All_Variables"){
							for(var s=0;s<selectedVariable.length;s++){
								var obj=data[i];
								if(selectedVariable[s].toLowerCase() in obj){
									var arr={};
									arr['id_1'] = data[i].id_1;
									arr['id_2'] = data[i].id_2;
									arr['name_1'] = data[i].name_1;
									arr['name_2'] = data[i].name_2;
									arr['year'] = 2011;
									arr['key']= selectedVariable[s];
									if(data[i][selectedVariable[s].toLowerCase()] || data[i][selectedVariable[s].toLowerCase()]==0){
										arr['value']=data[i][selectedVariable[s].toLowerCase()];
										dataArr2.push(arr);
									}/*else{
										arr['value']="";
									}
									dataArr2.push(arr);*/
								}
							}
						}else{
							var obj=data[i];
							if(fieldid.toLowerCase() in obj){
								var arr={};
								arr['id_1'] = data[i].id_1;
								arr['id_2'] = data[i].id_2;
								arr['name_1'] = data[i].name_1;
								arr['name_2'] = data[i].name_2;
								arr['year'] = 2011;
								arr['key']= fieldid;
								if(data[i][fieldid.toLowerCase()] || data[i][fieldid.toLowerCase()]==0){
									arr['value']=data[i][fieldid.toLowerCase()];
									dataArr2.push(arr);
								}/*else{
									arr['value']="";
								}
								dataArr2.push(arr);*/
							}
						}
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
				    },
				    data: JSON.stringify(data_obj)
				});
			  }
			if(parseInt(levelid) == 3){
				var url = "/app/places/"+level1_Id+"/region?category="+category+"&regionkey="+regionkey+"&index="+index_name+"&level="+parseInt(levelid)+"&level0="+level0_Id+"&leveltype="+levelName+"";
				$.ajax({
				    url: url,
				    type: 'post',
				    dataType: 'json',
				    success: function (data) {

					if(data){
						if(data['subscription']){
							bootbox.alert(data['subscription']);
						}
						if(data['1001']){
							sessionClose(data['1001']);
						}
					}

					var dataArr3 = [];
					var arrObj = [];
					if(data){
					for(var i=0;i<data.length;i++){
						if(fieldid == "All_Variables"){
							for(var s=0;s<selectedVariable.length;s++){
								var obj=data[i];
								if(selectedVariable[s].toLowerCase() in obj){
									var arr={};
									arr['id_1'] = data[i].id_1;
									arr['id_2'] = data[i].id_2;
									arr['id_3'] = data[i].id_3;
									arr['name_1'] = data[i].name_1;
									arr['name_2'] = data[i].name_2;
									arr['name_3'] = data[i].name_3;
									arr['year'] = 2011;
									arr['key']= selectedVariable[s];
									if(data[i][selectedVariable[s].toLowerCase()] || data[i][selectedVariable[s].toLowerCase()]==0){
										arr['value']=data[i][selectedVariable[s].toLowerCase()];
									}else{
										arr['value']="";
									}
									dataArr3.push(arr);
								}
							}
						}else{
							var obj=data[i];
							if(fieldid.toLowerCase() in obj){
								var arr={};
								arr['id_1'] = data[i].id_1;
								arr['id_2'] = data[i].id_2;
								arr['id_3'] = data[i].id_3;
								arr['name_1'] = data[i].name_1;
								arr['name_2'] = data[i].name_2;
								arr['name_3'] = data[i].name_3;
								arr['year'] = 2011;
								arr['key']= fieldid;
								if(data[i][fieldid.toLowerCase()] || data[i][fieldid.toLowerCase()]==0){
									arr['value']=data[i][fieldid.toLowerCase()];
								}else{
									arr['value']="";
								}
								dataArr3.push(arr);
							}
						}
					}
					}

                                        master = {};
                                        master["key"] = keyId;
                                        master["value"] = dataArr3;
                                        master["topojson"] = "0";
                                        masterData.unshift(master);
                                        if(masterData.length > 4){
                                                masterData.length = 4;
                                        }
                                        l3_Data = dataArr3;
                                        level3_level('');


				    },
				    error: function(err){
					console.log(err);
				    },
				    data: JSON.stringify(data_obj)
				});

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
	mapLoading();
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
	var category="";
	var index_name = '';
	var data_obj={};
	for(var j=0;j<variableCategory.length;j++){
		if(fieldid == variableCategory[j]._source['key']){
			index_name = variableCategory[j]._source['index_id'];
			category=index_name;
			colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			});
			//data_obj[variableCategory[j]._source['index_id']]=[fieldid.toLowerCase()];
			//data_obj["keys"]=[fieldid.toLowerCase()];
			if(data_obj["keys"]){
				data_obj["keys"].push(fieldid.toLowerCase());
			}else{
				data_obj["keys"] = [ fieldid.toLowerCase()];
			}
		}
	}


	if(fieldid == "All_Variables"){
		for(var i=0;i<selectedVariable.length;i++){
			for(var j=0;j<variableCategory.length;j++){
				if(selectedVariable[i] == variableCategory[j]._source['key']){
				    if(data_obj["keys"]){
					data_obj["keys"].push(selectedVariable[i].toLowerCase());
				    }else{
					data_obj["keys"] = [ selectedVariable[i].toLowerCase()];
				    }
				}
			}
		}
	}

	var fieldid_taluk = fieldid.replace('l2','l3');
	fieldid_taluk = fieldid_taluk.toLowerCase();

	/*myvariable*/
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}
	if(index_name == ''){
		for(var index in  myVarIndex){
			for(var	 keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id ==fieldid  ){
							index_name = orgid;
							category = "mylocation";
							colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {
								return d3.hsl(rgb);
							});
						   	data_obj["keys"]=[fieldid.toLowerCase()]
						}
					}
				}
			}	
		}
	}

	//setting selected field and year	
	selectedField =fieldid;
	selectedYear = yearval

	if(fieldid == 'IND_MV_01'){
		category="model";
		index_name = 'model25';
	}

	
	var field_split = fieldid.split('_');
	var keyId = '';
	if(field_split[1] == 'EC'){
		//keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"_"+field_split[1]+"_"+field_split[(field_split.length) - 1];
		keyId = level0_Id+"_"+level1_Id+"_"+3+"_"+yearval+"_"+fieldid;
	}else{
		keyId = level0_Id+"_"+level1_Id+"_"+3+"_"+yearval+"_"+fieldid;
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
		level3(dd, place,fieldid);
	}	
	else {
		levelid = parseInt(levelid)+1;
		var levelType = levelsData[level0_Id]["level"+levelid+""].toUpperCase();
		var url = "/app/places/"+level1_Id+"/region?category="+category+"&regionkey="+fieldid_taluk+"&index="+index_name+"&leveltype="+levelType+"&level=3&level0="+level0_Id+""
		//var url = "/app/places/"+level1_Id+"/region?category="+category+"&regionkey="+fieldid_taluk+"&index="+index_name+"&level="+parseInt(levelid)+"&level0="+level0_Id+"&leveltype="+levelName+"";
		$.ajax({
		    url: url,
		    type: 'post',
		    dataType: 'json',
		    success: function (data) {
			if(data){
				if(data['subscription']){
					bootbox.alert(data['subscription']);
				}
				if(data['1001']){
					sessionClose(data['1001']);
				}
			}
			var dataArr3 = [];
			var arrObj = [];
			if(data){
			for(var i=0;i<data.length;i++){
				if(fieldid == "All_Variables"){
					for(var s=0;s<selectedVariable.length;s++){
						var obj=data[i];
						if(selectedVariable[s].toLowerCase() in obj){
							var arr={};
							arr['id_1'] = data[i].id_1;
							arr['id_2'] = data[i].id_2;
							arr['id_3'] = data[i].id_3;
							arr['name_1'] = data[i].name_1;
							arr['name_2'] = data[i].name_2;
							arr['name_3'] = data[i].name_3;
							arr['year'] = 2011;
							arr['key']= selectedVariable[s];
							if(data[i][selectedVariable[s].toLowerCase()] || data[i][selectedVariable[s].toLowerCase()]==0){
								arr['value']=data[i][selectedVariable[s].toLowerCase()];
							}else{
								arr['value']="";
							}
							dataArr3.push(arr);
						}
					}
				}else{
					var obj=data[i];
					if(fieldid.toLowerCase() in obj){
						var arr={};
						arr['id_1'] = data[i].id_1;
						arr['id_2'] = data[i].id_2;
						arr['id_3'] = data[i].id_3;
						arr['name_1'] = data[i].name_1;
						arr['name_2'] = data[i].name_2;
						arr['name_3'] = data[i].name_3;
						arr['year'] = 2011;
						arr['key']= fieldid;
						if(data[i][fieldid.toLowerCase()] || data[i][fieldid.toLowerCase()]==0){
							arr['value']=data[i][fieldid.toLowerCase()];
						}else{
							arr['value']="";
						}
						dataArr3.push(arr);
					}
				}
			}
			}

			/*var dataArr3 = [];
			var arrObj = [];
			if(data){
			for(var i=0;i<data.length;i++){
				for(var key in data[i]){
					if(data[i][key] != "No Result Found"){
					for(var j=0;j<data[i][key].length;j++){
						if(fieldid == "All_Variables"){
							for(var s=0;s<selectedVariable.length;s++){
								var obj=data[i][key][j]._source;
								if(selectedVariable[s].toLowerCase() in obj){
									var arr={};
									arr['id_1'] = data[i][key][j]._source.id_1;
									arr['id_2'] = data[i][key][j]._source.id_2;
									arr['id_3'] = data[i][key][j]._source.id_3;
									arr['name_1'] = data[i][key][j]._source.name_1;
									arr['name_2'] = data[i][key][j]._source.name_2;
									arr['name_3'] = data[i][key][j]._source.name_3;
									arr['year'] = 2011;
									arr['key']= selectedVariable[s];
									if(data[i][key][j]._source[selectedVariable[s].toLowerCase()] || data[i][key][j]._source[selectedVariable[s].toLowerCase()]==0){
										arr['value']=data[i][key][j]._source[selectedVariable[s].toLowerCase()];
									}else{
										arr['value']="";
									}
									dataArr3.push(arr);	
								}
							}
						}else{
							var obj=data[i][key][j]._source;
							if(fieldid.toLowerCase() in obj){
								var arr={};
								arr['id_1'] = data[i][key][j]._source.id_1;
								arr['id_2'] = data[i][key][j]._source.id_2;
								arr['id_3'] = data[i][key][j]._source.id_3;
								arr['name_1'] = data[i][key][j]._source.name_1;
								arr['name_2'] = data[i][key][j]._source.name_2;
								arr['name_3'] = data[i][key][j]._source.name_3;
								arr['year'] = 2011;
								arr['key']= fieldid;
								if(data[i][key][j]._source[fieldid.toLowerCase()] || data[i][key][j]._source[fieldid.toLowerCase()]==0){
									arr['value']=data[i][key][j]._source[fieldid.toLowerCase()];
								}else{
									arr['value']="";
								}
								dataArr3.push(arr);
							}
						}

					}
					}
				}
			}
			}*/
			
			

			master = {};
			master["key"] = keyId;
			master["value"] = dataArr3;
			master["topojson"] = '0';
			masterData.unshift(master);
			if(masterData.length > 4){
				masterData.length=4;
			}

			l3_Data = dataArr3;
			level3(dd, place,fieldid);


		    },
		    data: JSON.stringify(data_obj)
		});
		
	     /*d3.json("/app/places/"+level1_Id+"/region?category="+category+"&regionkey="+fieldid_taluk+"&index="+index_name+"&leveltype="+levelType+"&level=3&level0="+level0_Id+"", function(data) {//COUNTY_SUBDIVISION //TALUK

		if(data){
			if(data['subscription']){
				bootbox.alert(data['subscription']);
			}
		}
		
		var dataArr3 = [], arrObj = [];
		if(data){
		if(data.hits){
		for(i=0;i<data.hits.total;i++){
			parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude','value']);
			var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
			var arr={};
			arr['id_1'] = data.hits.hits[i]._source.id_1;
			arr['id_2'] = data.hits.hits[i]._source.id_2;
			arr['id_3'] = data.hits.hits[i]._source.id_3;
			arr['name_1'] = data.hits.hits[i]._source.name_1;
			arr['name_2'] = data.hits.hits[i]._source.name_2;
			arr['name_3'] = data.hits.hits[i]._source.name_3;
			arr['year'] = 2011;
			arr['key']= fieldid;
			if(data.hits.hits[i]._source[fieldid_taluk]){
				arr['value']=data.hits.hits[i]._source[fieldid_taluk];
			}else{
				arr['value']="";
			}

			if(( $.inArray(data.hits.hits[i]._source.id_3, arrObj) == -1)){	
				if(data.hits.hits[i]._source.id_3){
				    arrObj.push(data.hits.hits[i]._source.id_3);
				    dataArr3.push(arr);
				}
			}	
		}
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
	     });*/
	 }
	//}
}


function level3DataLoad_old(dd, place){
	mapLoading();
	
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
	var category="";
	var index_name = '';
	for(var j=0;j<variableCategory.length;j++){
		if(fieldid == variableCategory[j]._source['key']){
			index_name = variableCategory[j]._source['index_id'];
			category=index_name;
			colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
				return d3.hsl(rgb);
			});	
		}
	}	

	var fieldid_taluk = fieldid.replace('l2','l3');
	fieldid_taluk = fieldid_taluk.toLowerCase();

	/*myvariable*/
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}
	if(index_name == ''){
		for(var index in  myVarIndex){
			for(var	 keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id ==fieldid  ){
							index_name = orgid;
							category = "mylocation";
							colors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {
								return d3.hsl(rgb);
							});
						}
					}
				}
			}	
		}
	}

	//setting selected field and year	
	selectedField =fieldid;
	selectedYear = yearval

	if(fieldid == 'IND_MV_01'){
		category="model";
		index_name = 'model25';
	}

	
	var field_split = fieldid.split('_');
	var keyId = '';
	if(field_split[1] == 'EC'){
		//keyId = level0_Id+"_"+level1_Id+"_"+levelid+"_"+yearval+"_"+field_split[1]+"_"+field_split[(field_split.length) - 1];
		keyId = level0_Id+"_"+level1_Id+"_"+3+"_"+yearval+"_"+fieldid;
	}else{
		keyId = level0_Id+"_"+level1_Id+"_"+3+"_"+yearval+"_"+fieldid;
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
	else {	
     		levelid = parseInt(levelid)+1;
		var levelType = levelsData[level0_Id]["level"+levelid+""].toUpperCase();
		
	     d3.json("/app/places/"+level1_Id+"/region?category="+category+"&regionkey="+fieldid_taluk+"&index="+index_name+"&leveltype="+levelType+"&level=3&level0="+level0_Id+"", function(data) {//COUNTY_SUBDIVISION //TALUK
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
				return false;
			}
                        if(data['subscription']){
                                bootbox.alert(data['subscription']);
                        }
		}
		
		/*if(data){
		if(data.hits){*/
		var dataArr3 = [], arrObj = [];
		if(data){
		if(data.hits){
		for(i=0;i<data.hits.total;i++){
			parameter = _.omit(data.hits.hits[i]._source, ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude','value']);
			var year = moment(data.hits.hits[i]._source.collecteddate,"YYYY/MM/DD").format("YYYY")
			var arr={};
			arr['id_1'] = data.hits.hits[i]._source.id_1;
			arr['id_2'] = data.hits.hits[i]._source.id_2;
			arr['id_3'] = data.hits.hits[i]._source.id_3;
			arr['name_1'] = data.hits.hits[i]._source.name_1;
			arr['name_2'] = data.hits.hits[i]._source.name_2;
			arr['name_3'] = data.hits.hits[i]._source.name_3;
			arr['year'] = 2011;
			arr['key']= fieldid;
			if(data.hits.hits[i]._source[fieldid_taluk]){
				arr['value']=data.hits.hits[i]._source[fieldid_taluk];
			}else{
				arr['value']="";
			}

			if(( $.inArray(data.hits.hits[i]._source.id_3, arrObj) == -1)){	
				if(data.hits.hits[i]._source.id_3){
				    arrObj.push(data.hits.hits[i]._source.id_3);
				    dataArr3.push(arr);
				}
			}	
		}
		}
		}
		/*}
		}*/

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
	//}
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

function compareLegend(minvalue, secval, midval1, forval, maxvall) {

	d3.select("#map_legend").selectAll('.legend').remove();
	d3.select("#map_legend").selectAll('.legend1').remove();
	    if(secval) {
		var numberFormat = d3.format(".0f");
		var numberFormat1 = d3.format(".0f");
		
		for(i = 0 ; i < 5 ; i++){
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

			if(parseInt(Value_i) == parseInt(Value_iplus1)){
					numberFormat = d3.format(".1f");
			     }
			}
		}



		var legend = d3.select("#map_legend").append("svg").attr("class", "legend").attr("width", 600).attr("height", 100).selectAll("g").data(color.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
		    //return "translate(" + i * 50 + ",30 )scale(0.8)";
		    return "translate(" +  (200 -(i * 50) ) + ",30 )scale(0.8)";

		});

		var ls_w = 20, ls_h = 20;

		legend.append("rect").attr("x", 18).attr("y", 06)
		.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
		    return color(d);
		}).style("opacity", 0.8).attr("stroke"," #777").style('stroke-width', 0.8);

		legend.append("text").attr("x", 18).attr("y", 3) 
		.text(function(d, i) {

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
		});
		//NO Data added in each case of Legend:
		color_no_data_1 = d3.scale.linear().range(colors).domain([0]);
		var legend = d3.select("#map_legend").append("svg").attr("class", "legend1")
			.attr("width", 150).attr("height", 75).selectAll("g")
		.data(color_no_data_1.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none")
		//.attr("transform", "translate(" + 5 * 50 + ",30 )scale(0.8)" );
		.attr("transform", "translate(-14,30)scale(0.8)" );

		var ls_w = 20, ls_h = 20;

		legend.append("rect").attr("x", 18).attr("y", 06)
		.attr("width", ls_w + 40).attr("height", ls_h).style("fill","black").style("opacity", 0.8).attr("stroke"," #777").style('stroke-width', 0.8);

		legend.append("text").attr("x", 18).attr("y", 3) 
		.text("No Data");


	    }
	    else  {

		color_no_data = d3.scale.linear().range(colors).domain([secval]);
		var legend = d3.select("#map").append("svg").attr("class", "legend1").attr("width", 150).attr("height", 75).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
		    return "translate(100," + i * 20 + ")scale(0.8)";
		   // return "translate(" + 6 * 50 + ",30 )scale(0.8)";
		});

		var ls_w = 20, ls_h = 20;

		legend.append("rect").attr("x", 18).attr("y", 06)
		.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
		    return color(d);
		}).style("opacity", 0.8);

		legend.append("text").attr("x", 18).attr("y", 3) 
		.text("No Data");


		/*legend.append("rect").attr("x", 18).attr("y", 06)
		.attr("width", ls_w).attr("height", ls_h).style("fill", function(d, i) {
		    return color(d);
		}).style("opacity", 0.8);

		legend.append("text").attr("x", 42).attr("y", 23) 
		.text("No Data");*/
	    }

}

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
		    //return "translate(" + ((i * 40) +90) + ",20 )scale(0.8)";
		    return "translate(" +  (250 -(i * 40) ) + ",20 )scale(0.8)";
		});



		var ls_w = 20, ls_h = 20;

		legend.append("rect")//.attr("x", 158).attr("y", -06)
		.attr("width", ls_w + 30).attr("height", ls_h).style("fill", function(d, i) {
		    return color(d);
		}).style("opacity", 0.8).attr("y", 06);

		legend.append("text")//.attr("x", 158).attr("y", -13) 
		.text(function(d, i) {

			//return valueRound(d, numberFormat, i);
			var formatValue = d3.format(".2s");
			if(i==0){
				return (formatValue(d) + "  +");
			}else{
				return formatValue(d);
			}

		}).style({'font-size':'11px'});
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
		.text("No Data").style({'font-size':'11px'});

	    }
	    else  {
		d3.select("#svg_id").selectAll('.legend').remove();
		d3.select("#map").selectAll('.legend2').remove();
		d3.select("#svg_id").selectAll('.legend2').remove();
		color_no_data = d3.scale.linear().range(colors).domain([secval]);
		var legend = d3.select("#svg_id").append("svg").attr("class", "legend").attr("id", "legend_2").attr("width", 600).attr("height", 300).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
		    return "translate(100,20)scale(0.8)";/*" + i * 20 + "*/
		});

		var ls_w = 20, ls_h = 20;

		legend.append("rect").attr("x", 18).attr("y", 06)
		.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
		    return color(d);
		}).style("opacity", 0.8);

		legend.append("text").attr("x", 18).attr("y", 3) 
		.text("No Data").style({'font-size':'11px'});

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
			    //return "translate(" + ((i * 40) +90) + ",20 )scale(0.8)";
			    return "translate(" +  (250 -(i * 40) ) + ",20 )scale(0.8)";
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect")//.attr("x", 158).attr("y", -06)
			.attr("width", ls_w + 30).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8).attr("y", 06);

			legend.append("text")//.attr("x", 158).attr("y", -13) 
			.text(function(d, i) {
			    //return valueRound(d, numberFormat,i);	
			    var formatValue = d3.format(".2s");
			    if(i==0){
				   return (formatValue(d) + "  +");
			    }else{
				   return formatValue(d);
			    }

			}).style({'font-size':'11px'});

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
			.text("No Data").style({'font-size':'11px'});


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
			.text("No Data").style({'font-size':'11px'});

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
			}).style({'font-size':'11px'});
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
			.text("No Data").style({'font-size':'11px'});


		    }
		    else  {

			d3.select("#svg_id").selectAll('.legend2').remove();
			color_no_data = d3.scale.linear().range(colors).domain([secval]);
			var legend = d3.select("#svg_id").append("svg").attr("class", "legend2").attr("width", 400).attr("height", 100).style("display","none").selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    return "translate(100,20)scale(0.8)";/*" + i * 50 + "*/
			});

			var ls_w = 20, ls_h = 20;

			legend.append("rect").attr("x", 18).attr("y", 06)
			.attr("width", ls_w + 40).attr("height", ls_h).style("fill", function(d, i) {
			    return color(d);
			}).style("opacity", 0.8);

			legend.append("text").attr("x", 18).attr("y", 3) 
			.text("No Data").style({'font-size':'11px'});

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
        	                                                        if(d.properties){
	                                                                	return d.properties.name;
                	                                                }else{
                        	        		                        return dataById[d.id];
                                	                                }
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
							       var value = '';	
							       if(isInteger(dt[0].value)){
								    value = dt[0].value;
							       }else{
								    value = numberFormatTitleValues(dt[0].value);
							       }	
							       if (ntk.id_2 == (lvl2_id)) {
		
								  d3.select('#spacialcontent').style('display','');
								  d3.select('#spacialcontent').html(dt[0].name_3.toTitleCase()+'&nbsp; <span class="value">('+value+')</span>')
								  d3.select(this).style('opacity', 0.4);
							       } else if(!dt[0].value && dt[0].value != 0){
							          d3.select('#spacialcontent').style('display','');	
							          d3.select('#spacialcontent').html( dt[0].name_2.toTitleCase() + ' <span class="value"></span>');/*Not Available*/
							          d3.select(this).style('opacity', 0.3);
							          //this.parentNode.appendChild(this);
							       } else {
							   	  d3.select(this).style('opacity', 0.1);
							       }
							    }else if(tk.length ==0) {
								d3.select('#spacialcontent').style('display','');
								d3.select('#spacialcontent').html(d.properties.toTitleCase()+" (No Data)")
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
                                                                if(d.properties){
                                                                	return d.properties.name;
                                                                }else{
                                                                        return dataById[d.id];
                                                                }
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
				       d3.select('#spacialcontent').html(d.properties.toTitleCase()+" (No Data)");
				    }else if(!dt[0].value && dt[0].value != 0){
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html( dt[0].name_3.toTitleCase() + ' <span class="value"></span>');/*Not Available*/
				       d3.select(this).style('opacity', 0.3);
				       //this.parentNode.appendChild(this);
				    }else {
				       d3.select('#spacialcontent').style('display','');	
				       d3.select('#spacialcontent').html( dt[0].name_3.toTitleCase() + ' <span class="value">(' + dt[0].value + ')</span>');
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

	var keyId = level0_Id+"_"+level1_Type+"_2_"+yrtype+"_"+fieldval;
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
	key = keyVal.filter(fieldval);//.toLowerCase()
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
                                                                        if(d.properties){
                                                                                return d.properties.name;
                                                                        }else{
	                                                                        return dataById[d.id];
                                                                        }
									}).value(function(d) {
										return +d.properties[field];
									});
          geometries = tn.objects.levels.geometries; 
          features = carto.features(tn, geometries);		
 	 var svg = d3.select("#map").append("svg").attr("id","map_svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');//.style("fill", "#E1FCFB")
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
				               d3.select('#spacialcontent').html(d.properties.toTitleCase()+" (No Data)");
					    }else if(!dt[0].value && dt[0].value != 0){
        				       d3.select('#spacialcontent').style('display','');	
					       d3.select('#spacialcontent').html( dt[0].name_2.toTitleCase() + ' <span class="value"></span>')/*Not Available*/
					       //d3.select(this).style('opacity', 0.3)
					       //this.parentNode.appendChild(this);
					    }else{
					       var value = '';	
					       if(isInteger(dt[0].value)){
							value = dt[0].value;
					       }else{
							value = numberFormatTitleValues(dt[0].value);
					       }
        				       d3.select('#spacialcontent').style('display','');	
					       d3.select('#spacialcontent').html( dt[0].name_2.toTitleCase() + ' <span class="value">(' +value + ')</span>')
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
	    .style({"font": "Roboto, sans-serif",'font-size':'12px',"fill":"#5F5F5F"})
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
		    .style({"font": "Roboto, sans-serif",'font-size':'12px',"fill":"#5F5F5F"})
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

var shareImgVariable = '';

function shareImgMap(d){

	shareImgVariable = d;	
	//$('#share-popup-id').click();
	var shareSizeElem = document.getElementById('shareSize');
	var shareSize = shareSizeElem.options[shareSizeElem.selectedIndex].value;

	var shareColorElem = document.getElementById('shareColor');
	var shareColor = shareColorElem.options[shareColorElem.selectedIndex].value;

	if(shareColor != "Select" && shareSize != "Select"){
		onchangeSizeColor();
	}
}

function onchangeSizeColor(){

	var level0_Id = document.getElementById('level_0_Id').value;	
	var shareSizeElem = document.getElementById('shareSize');
	var shareSize = shareSizeElem.options[shareSizeElem.selectedIndex].value;

	var shareColorElem = document.getElementById('shareColor');
	var shareColor = shareColorElem.options[shareColorElem.selectedIndex].value;
	var levelid = document.getElementById("levelId").value;

	if(shareColor == "Select" || shareSize == "Select"){
		bootbox.alert("Please select a size and Color");
		return false;
	}

	if(shareColor == "Orange"){	shareColors = generic_color = colorbrewer.Oranges[5].map(function(rgb) {	return d3.hsl(rgb); 	});	 }
	if(shareColor == "Blue"){	shareColors = generic_color = colorbrewer.Blues[5].map(function(rgb) {		return d3.hsl(rgb);   	});	 }
	if(shareColor == "Mixed"){	shareColors = generic_color = colorbrewer.RdYlBu[5].map(function(rgb) {		return d3.hsl(rgb);  	});	 }
	if(shareColor == "Green"){	shareColors = generic_color = colorbrewer.BuGn[5].map(function(rgb) {		return d3.hsl(rgb);    	});	 }
	if(shareColor == "Violet"){ 	shareColors = generic_color = colorbrewer.BuPu[5].map(function(rgb) {		return d3.hsl(rgb);    	});	 }
	if(shareColor == "Red"){	shareColors = generic_color = colorbrewer.PuRd[5].map(function(rgb) {		return d3.hsl(rgb);    	});	 }

	/* Call Title change Function */
	titleChange();

	levelType= levelsData[level0_Id]["level"+levelid+""].toLowerCase();

	/* Call Share Preview Function */
 	sharePreview(shareImgVariable, shareColor, shareSize, fieldval, level, levelType);

}

function shareConfirmImg(){

	document.getElementById('iframe-id').src = "http://test.scisphere.com/loading";

	var level0_Id = document.getElementById('level_0_Id').value;	
	var shareSizeElem = document.getElementById('shareSize');
	var size = shareSizeElem.options[shareSizeElem.selectedIndex].value;

	var shareColorElem = document.getElementById('shareColor');
	var color = shareColorElem.options[shareColorElem.selectedIndex].value;
	var levelid = document.getElementById("levelId").value;

	if(!size){
		bootbox.alert("Please select a size");
		return false;
	}

	if(!color){
		bootbox.alert("Please select a Color");
		return false;
	}

	/*for iframe*/
	$('#close-button').click();
	$('#Share-confirm-popup-id').click();


	var level1_Id = document.getElementById('level_1_Id').value;
	var level0_Id = document.getElementById('level_0_Id').value;
	var titleShare = document.getElementById('share-text-id').value;

	if(titleShare.length > 70){
		titleShare = titleShare.substring(0, 68);
		titleShare = titleShare+ ' ...';
	}

	var bodyData = {"title": titleShare, "size": "450"};

	if(size== 450){	$("#iframe-id").width("455").height("485"); bodyData = {"title": titleShare, "size": "450"};	}
	if(size== 350){	$("#iframe-id").width("355").height("385"); bodyData = {"title": titleShare, "size": "350"};	}
	if(size== 250){	$("#iframe-id").width("255").height("285"); bodyData = {"title": titleShare, "size": "250"}; 	}

	var yrtype = 2011;
	var level_1_Type = document.getElementById("level_1_Id");
	var level1_Type = level_1_Type.options[level_1_Type.selectedIndex].value;
	var levelid = document.getElementById("levelId").value;
        var levelType = levelsData[level0_Id]["level"+levelid+""].toLowerCase();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	canvasfunShare();

	var uniqueId = 1;
	titleShare = titleShare.replace(/\n/g,' '); //replace("\n","");

	/*To Creat a new Html Page*/	
	var url = "/app/shareMap/"+level0_Id+"/"+level1_Id+"/"+levelid+"/"+fieldval+"/"+levelType+"/"+shareImgVariable+"/"+shareIndexName+"/"+shareCategory+"/"+color+"/"+size+"/"+uniqueId+"";
	$.ajax({
	    url: url,
	    type: "POST",
	    success: function (data) {

		uniqueId = data;
		document.getElementById('iframe-id').src = "http://"+domainName+"/embed/"+uniqueId+".html";

		if(size== 450){	
			document.getElementById('share-link-id').value = "<iframe width='470' height='495' id='iframe-id' src='http://"+domainName+"/embed/"+uniqueId+".html'></iframe>";
		}else if(size== 350){	
			document.getElementById('share-link-id').value = "<iframe width='375' height='395' id='iframe-id' src='http://"+domainName+"/embed/"+uniqueId+".html'></iframe>";
		}else if(size== 250){	
			document.getElementById('share-link-id').value = "<iframe width='275' height='295' id='iframe-id' src='http://"+domainName+"/embed/"+uniqueId+".html'></iframe>";
		}
	    },
	    error:   function (err) {

		document.getElementById('iframe-id').src = "http://"+domainName+"/embed/"+uniqueId+".html";
		if(size== 450){	
			document.getElementById('share-link-id').value = "<iframe width='470' height='495' id='iframe-id' src='http://"+domainName+"/embed/"+uniqueId+".html'></iframe>";
		}else if(size== 350){	
			document.getElementById('share-link-id').value = "<iframe width='375' height='395' id='iframe-id' src='http://"+domainName+"/embed/"+uniqueId+".html'></iframe>";
		}else if(size== 250){	
			document.getElementById('share-link-id').value = "<iframe width='275' height='295' id='iframe-id' src='http://"+domainName+"/embed/"+uniqueId+".html'></iframe>";
		}
		},	
	    data: titleShare		
	});

}


function canvasfunShare(){

	document.getElementById("pin-form-description").value="";
	var context;
	var svgname = document.getElementById("share_svg");
	var svg = new XMLSerializer().serializeToString(svgname);
	var find = '<rect width="50"';
	var re = new RegExp(find, 'g');
	svg = svg.replace(re, '<rect width="40"');
	var find = 'style="display: none;"';
	var re = new RegExp(find, 'g');
	svg = svg.replace(re, 'style="display: block;"');

	var find = '<path';
	var re = new RegExp(find, 'g');
	svg = svg.replace(re, '<path style="fill: none; stroke: black;"');

	var find = '<line';
	var re = new RegExp(find, 'g');
	svg = svg.replace(re, '<line style="stroke: black;"');

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

	var level = document.getElementById('levelId').value;
	var state = document.getElementById('level_1_Id');
	var statename = state.options[state.selectedIndex].innerHTML;
	var year = document.getElementById('yearId').value;

	var prms = $.deparam.fragment();
	var keyname;
	if(Object.keys(prms).length > 0){
		var filteredList = _.filter(variableCategory, function(item){
		    return _.some(item._source, function(source){
			return source == prms.field;
		    });
		});
		if(filteredList){
                       if(filteredList[0]){
                               if(filteredList[0]._source){
                                       keyname = filteredList[0]._source['title'];
                               }
                       }
               	}
		//keyname = filteredList[0]._source['title'];
	}

	var titleShare = document.getElementById('share-text-id').value;
	document.getElementById('pin-form-description').value = titleShare;
	document.getElementById('idSavedImage').innerHTML = statename+" - "+keyname;
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
			var svgname = document.getElementById("bar_svg");
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

	var prms = $.deparam.fragment();
	var keyname;
	if(Object.keys(prms).length > 0){
		var filteredList = _.filter(variableCategory, function(item){
		    return _.some(item._source, function(source){
			return source == prms.field;
		    });
		});
		keyname = filteredList[0]._source['title'];
	}
	
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
/*$(document).ready(function() {
    //prepare Options Object for plugin
    var options = {
        success: function() {
	    $('.close').click();
	    bootbox.alert("Successfully Saved.");
        },
        error:  function(resp) {
	    $('.close').click();
	    bootbox.alert("Not Saved.");
        }
    };
    $('#ajaxform').ajaxForm(options);
    //$('#ajaxformUrlShare').ajaxForm(options);
});*/

function applySaveImage(){
	var dataObj={
		"image":document.getElementById("pin-form-image").value,
		"description":document.getElementById("pin-form-description").value,
		"tags":document.getElementById("pin-form-tags").value,
		"width":document.getElementById("imgWidth").value,
		"height":document.getElementById("imgHeight").value
	};

	$.ajax({
	    url: '/app/post_image_pins/',
	    type: 'post',
	    dataType: 'json',
	    success: function (data) {
		$('.close').click();
	    	bootbox.alert("Successfully Saved.");
	    },
	    error: function(err){
		$('.close').click();
		if(err["responseText"]=="success"){
	   	    bootbox.alert("Successfully Saved.");
		}else{
	   	    bootbox.alert("Not Saved.");
		}
	    },
	    data: JSON.stringify(dataObj)
	});
}


function contextClick(){
	cancelSelection();
	d3.select("#pop-geo").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-myvar").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-contextual").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function geoClick(){
	onclickGEO();
	cancelSelection();
	d3.select("#pop-contextual").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-myvar").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-geo").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function myVarClick(){
	cancelSelection();
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


// session Timeout set and redirect
var wintimeout;
function SetWinTimeout() {
	wintimeout = window.setTimeout("window.location.href='/accounts/logout/';",3600000); //after 5 mins i.e. 5 * 60 * 1000
}
function sessionClose(message) {
	bootbox.dialog({
		message: message,
		buttons: {
		yes: {
			label: "Ok",
			callback: function() {
				wintimeout = window.setTimeout("window.location.href='/accounts/logout/';");
			}
		}
		}
	});
}
$(document).ready(function(){
	$('body').click(function() {
		window.clearTimeout(wintimeout); //when user clicks remove timeout and reset it
		SetWinTimeout();
	});
});
SetWinTimeout();

