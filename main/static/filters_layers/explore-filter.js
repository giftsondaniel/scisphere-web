window.onload=onLoad;
var menuData;
var tiles;
var sub_list,level0Data,level1Data,levelsData;
function onLoad(){

	tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

	map = L.map('map').addLayer(tiles);		
	markers = L.markerClusterGroup();

	d3.json("/subscription_list",function(data){
		sub_list = data;
	});

   	d3.json("scisphere/places/countries" , function(data) {

	level0Data = data;
	var level0Id = document.getElementById('level0Id');
	for(var i=0;i<level0Data.length;i++){
		var optlevel0 = document.createElement('option');
		var valCh = level0Data[i].name_0;
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel0.innerHTML = valCam;
		optlevel0.value = level0Data[i].id_0;
		level0Id.appendChild(optlevel0);
	}
	
	$('.custom_selectbox').selectBoxIt();
	$('#level0Id').selectBoxIt();
	d3.select("#menu-div").style('display','block');


	//Hash Params
	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
	    hashParams();
	}	
	//Hash Params	

	//HashChange
	$(window).bind( "hashchange", function(e) {
	    var prms = $.deparam.fragment();
	    if(Object.keys(prms).length > 0){
		hashParams();
	    }
	});
	//HashChange

	//For mybuilds
	d3.json('mysphere_mybuilds_for_region_snapshot_list/33',function(data){
		if((data.MyBuild.length > 0)){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
			selectedVariable = JSON.parse(newvar)['variable'];
			if(JSON.parse(newvar).filters != ''){

    			   if(JSON.parse(newvar)['level']){ 

				level0Val = JSON.parse(newvar)['filters']['region']['level_0'];
				level1Val = JSON.parse(newvar)['filters']['region']['level_1'];

				level0ValLevel = JSON.parse(newvar)['level']['level_0'];
				level1ValLevel = JSON.parse(newvar)['level']['level_1'];

				level2Val = JSON.parse(newvar)['filters']['region']['level_2'];
				levelType = JSON.parse(newvar)['filters']['region']['level_type'];
				levelval = JSON.parse(newvar)['filters']['region']['level'];
				range = JSON.parse(newvar)['filters']['range'];


				if((level0ValLevel === level0Val) && (level1ValLevel === level1Val)){
				d3.json("scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year=2011" , function(data) {
						masterKeyArray = data[level0Val][level1Val]['filter'];
						loadMasterKey_mybuild(levelval,levelType,level0Val);
						masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
						var pathname1 = window.location.pathname;
						var prms = $.deparam.fragment(); 
						prms["level0"] = level0Val;
						prms["level1"] = level1Val;
						prms["level2"] = level2Val;

						for(var i=0;i<masterKey.length;i++){
							for(var k=0;k<selectedVariable.length;k++){
								var name = "";
								name = selectedVariable[k].split('-');
								var variable ='';
								var variable_new ='';
								var variable_name ='';
								var variable_id = '';

								if(name.length === 5){
									variable = name[1];
									variable_name = name[3] +' '+ name[4];
									variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3]+"-"+name[4];
								}else if(name.length === 4){
									variable = name[1];
									variable_name = name[3];
									variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3];
								} else if(name.length === 3){
									variable = name[1];
									variable_name = name[2];
									variable_id = name[0]+"-"+name[1]+"-"+name[2];
								} else if(name.length === 2){
									variable = name[1];	
									variable_name = name[1];	
									variable_id = name[0]+"-"+name[1];
								} 
								variable_new = variable;

								if(masterKey[i].key == variable){
									var val;
									if(range[selectedVariable[k]]){

										var range_split = range[selectedVariable[k]].split('~');
										val = range_split[0]+","+range_split[1];
										prms["key_"+i+k+"checked"] = true;
									}else{
										val = masterKey[i].minval+","+masterKey[i].maxval;
										prms["key_"+i+k+"checked"] = false;
									}
									prms["key_"+i+k] = selectedVariable[k];
									prms["key_"+i+k+"val"] = val;	
			
								}else if(masterKey[i].key == selectedVariable[k]){
									var val;
									if(range[masterKey[i].key]){
										var range_split = range[masterKey[i].key].split('~');
										val = range_split[0]+","+range_split[1];
										prms["key_"+i+"checked"] = true;
									}else{
										val = masterKey[i].minval+","+masterKey[i].maxval;
										prms["key_"+i+"checked"] = false;
									}
									prms["key_"+i] = masterKey[i].key;
									prms["key_"+i+"val"] = val;
							   	}
							}
						}
						prms["year"] ="2011";
						prms["level"] =levelval;
						prms["selectedvariables"]= selectedVariable.toString();
						// bbq
						var r = $.param.fragment(pathname1 ,prms, 2 );
						$.bbq.pushState(r);
					});
				}else{

					//Load on change of region locations in another page of explore:
					level0Val = JSON.parse(newvar)['level']['level_0'];
					level1Val = JSON.parse(newvar)['level']['level_1'];
					d3.json("scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year=2011" , function(data) {
							levelval = "3";	
							levelType = "TALUK"
							masterKeyArray = data[level0Val][level1Val]['filter'];
							loadMasterKey_mybuild(levelval,levelType,level0Val);

							masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
							var pathname1 = window.location.pathname;
							var prms = $.deparam.fragment(); 
							prms["level0"] = level0Val;
							prms["level1"] = level1Val;

							for(var i=0;i<masterKey.length;i++){
								for(var k=0;k<selectedVariable.length;k++){
									var name = "";
									name = selectedVariable[k].split('-');
									var variable ='';
									var variable_new ='';
									var variable_name ='';
									var variable_id = '';

									if(name.length === 5){
										variable = name[1];
										variable_name = name[3] +' '+ name[4];
										variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3]+"-"+name[4];
									}else if(name.length === 4){
										variable = name[1];
										variable_name = name[3];
										variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3];
									} else if(name.length === 3){
										variable = name[1];
										variable_name = name[2];
										variable_id = name[0]+"-"+name[1]+"-"+name[2];
									} else if(name.length === 2){
										variable = name[1];	
										variable_name = name[1];	
										variable_id = name[0]+"-"+name[1];
									} 
									variable_new = variable;

									if(masterKey[i].key == variable){
										var val;
										if(k === 0){
											val = masterKey[i].minval+","+masterKey[i].maxval;
											prms["key_"+i+"checked"] = true;

										/*}else if(range[selectedVariable[k]]){

											var range_split = range[selectedVariable[k]].split('~');
											val = range_split[0]+","+range_split[1];
											prms["key_"+i+k+"checked"] = true;*/
										}else{
											val = masterKey[i].minval+","+masterKey[i].maxval;
											prms["key_"+i+k+"checked"] = false;
										}
										prms["key_"+i+k] = selectedVariable[k];
										prms["key_"+i+k+"val"] = val;	
			
									} else if(masterKey[i].key == selectedVariable[k]){
										var val;
										if(k===0){
											val = masterKey[i].minval+","+masterKey[i].maxval;
											prms["key_"+i+"checked"] = true;

										/*}else if(range[masterKey[i].key]){
											var range_split = range[masterKey[i].key].split('~');
											val = range_split[0]+","+range_split[1];
											prms["key_"+i+"checked"] = true;*/
										}else{
											val = masterKey[i].minval+","+masterKey[i].maxval;
											prms["key_"+i+"checked"] = false;
										}
										prms["key_"+i] = masterKey[i].key;
										prms["key_"+i+"val"] = val;
								   	}
								}
							}
							prms["year"] ="2011";
							prms["level"] ="3";
							prms["selectedvariables"]= selectedVariable.toString();
							// bbq
							var r = $.param.fragment(pathname1 ,prms, 2 );
							$.bbq.pushState(r);

					});

					var pathname1 = window.location.pathname;
					var prmsDt = $.deparam.fragment(); //"Bank_layer": 3,
					//var prms={"key_18":"population","key_18checked":"true","key_18val":"8192,37819","key_5":"decadal_migration","key_5checked":"false","key_5val":"-15.01,9.65","level":"4.0","level0":"356","level1":"33","level2":"629","year":"2011"};
					/*var r =$.param.fragment(pathname1 ,prms, 2 );

					var prms = $.deparam.fragment();
					if(Object.keys(prms).length > 0){}else{  $.bbq.pushState(r);	}
					*/
				}	
			   }else {

				if(JSON.parse(newvar).regions != ''){
					level0Val = JSON.parse(newvar)['region']['level_0'];
					level1Val = JSON.parse(newvar)['region']['level_1'];

				}else if( JSON.parse(newvar).snapshot != ''){
					level0Val = JSON.parse(newvar)['snapshot']['level_0'];
					level1Val = JSON.parse(newvar)['snapshot']['level_1'];
				}else{
					level0Val = sub_list['free_plans']['country'];
					level1Val = sub_list['free_plans']['state'];
				}

				d3.json("scisphere/places/keydetail?level0="+sub_list['free_plans']['country']+"&level1="+sub_list['free_plans']['state']+"&year=2011" , function(data) {

						levelval = "3";	
						levelType = "TALUK"
						masterKeyArray = data[sub_list['free_plans']['country']][sub_list['free_plans']['state']]['filter'];
						loadMasterKey_mybuild(levelval,levelType,sub_list['free_plans']['country']);

						masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
						var pathname1 = window.location.pathname;
						var prms = $.deparam.fragment(); 
						prms["level0"] = sub_list['free_plans']['country'];
						prms["level1"] = sub_list['free_plans']['state'];

						for(var i=0;i<masterKey.length;i++){
							for(var k=0;k<selectedVariable.length;k++){
								if(masterKey[i].key == selectedVariable[k]){
									var val;
									if(k==0){
										val = masterKey[i].minval+","+masterKey[i].maxval;
										prms["key_"+i+"checked"] = true;
									}else{
										val = masterKey[i].minval+","+masterKey[i].maxval;
										prms["key_"+i+"checked"] = false;
									}
									prms["key_"+i] = masterKey[i].key;
									prms["key_"+i+"val"] = val;
							   	}
							}
						}
						prms["year"] ="2011";
						prms["level"] ="3";
						prms["selectedvariables"]= selectedVariable.toString();
						// bbq
						var r = $.param.fragment(pathname1 ,prms, 2 );
						$.bbq.pushState(r);
				});
				

				var pathname1 = window.location.pathname;
				var prmsDt = $.deparam.fragment(); //"Bank_layer": 3,
				var prms={"key_18":"population","key_18checked":"true","key_18val":"8192,37819","key_5":"decadal_migration","key_5checked":"false","key_5val":"-15.01,9.65","level":"4.0","level0":"356","level1":"33","level2":"629","year":"2011"};
				var r =$.param.fragment(pathname1 ,prms, 2 );

				var prms = $.deparam.fragment();
				if(Object.keys(prms).length > 0){}else{  $.bbq.pushState(r);	}

			   }

		    	} else {
				if(JSON.parse(newvar).regions != ''){
					level0Val = JSON.parse(newvar)['region']['level_0'];
					level1Val = JSON.parse(newvar)['region']['level_1'];

				}else if( JSON.parse(newvar).snapshot != ''){
					level0Val = JSON.parse(newvar)['snapshot']['level_0'];
					level1Val = JSON.parse(newvar)['snapshot']['level_1'];
				}else{
					level0Val = sub_list['free_plans']['country'];
					level1Val = sub_list['free_plans']['state'];
				}

				d3.json("scisphere/places/keydetail?level0="+sub_list['free_plans']['country']+"&level1="+sub_list['free_plans']['state']+"&year=2011" , function(data) {
						levelval = "3";	
						levelType = "TALUK"
						masterKeyArray = data[sub_list['free_plans']['country']][sub_list['free_plans']['state']]['filter'];
						loadMasterKey_mybuild(levelval,levelType,sub_list['free_plans']['country']);

						masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
						var pathname1 = window.location.pathname;
						var prms = $.deparam.fragment(); 
						prms["level0"] = sub_list['free_plans']['country'];
						prms["level1"] = sub_list['free_plans']['state'];

						for(var i=0;i<masterKey.length;i++){
							for(var k=0;k<selectedVariable.length;k++){
								var name = "";
								name = selectedVariable[k].split('-');
								var variable ='';
								var variable_new ='';
								var variable_name ='';
								var variable_id = '';

								if(name.length === 5){
									variable = name[1];
									variable_name = name[3] +' '+ name[4];
									variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3]+"-"+name[4];
								}else if(name.length === 4){
									variable = name[1];
									variable_name = name[3];
									variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3];
								} else if(name.length === 3){
									variable = name[1];
									variable_name = name[2];
									variable_id = name[0]+"-"+name[1]+"-"+name[2];
								} else if(name.length === 2){
									variable = name[1];	
									variable_name = name[1];	
									variable_id = name[0]+"-"+name[1];
								} 
								variable_new = variable;
								if(masterKey[i].key == selectedVariable[k]){
									var val;
									if(k==0){
										val = masterKey[i].minval+","+masterKey[i].maxval;
										prms["key_"+i+"checked"] = true;
									}else{
										val = masterKey[i].minval+","+masterKey[i].maxval;
										prms["key_"+i+"checked"] = false;
									}
									prms["key_"+i] = masterKey[i].key;
									prms["key_"+i+"val"] = val;
							   	}
								else if(masterKey[i].key == variable){
									var val;
									val = masterKey[i].minval+","+masterKey[i].maxval;
									prms["key_"+i+k+"checked"] = false;
									prms["key_"+i+k] = selectedVariable[k];
									prms["key_"+i+k+"val"] = val;	
			
								} 	
							}
						}
						
						prms["year"] ="2011";
						prms["level"] ="3";
						prms["selectedvariables"]= selectedVariable.toString();
						// bbq
						var r = $.param.fragment(pathname1 ,prms, 2 );
						$.bbq.pushState(r);
				});
				

				var pathname1 = window.location.pathname;
				var prmsDt = $.deparam.fragment();
				var prms={"key_18":"population","key_18checked":"true","key_18val":"8192,37819","key_5":"decadal_migration","key_5checked":"false","key_5val":"-15.01,9.65","level":"4.0","level0":"356","level1":"33","level2":"629","year":"2011"};
				var r =$.param.fragment(pathname1 ,prms, 2 );

				var prms = $.deparam.fragment();
				if(Object.keys(prms).length > 0){}else{  $.bbq.pushState(r);	}
			}
		} else {
			var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment(); 
			var prms={"key_18":"population","key_18checked":"true","key_18val":"8192,37819","key_5":"decadal_migration","key_5checked":"false","key_5val":"-15.01,9.65","level":"4.0","level0":"356","level1":"33","level2":"629","year":"2011"};
			var r =$.param.fragment(pathname1 ,prms, 2 );

			var prms = $.deparam.fragment();
			if(Object.keys(prms).length > 0){}else{  $.bbq.pushState(r);	}
		}
	});
	//For mybuilds
   });
}


var level2MenuData;
var variableCategory,units,description='';
function level0Change(){
	
   var filterLevel0Id = document.getElementById("level0Id").value;
   d3.json("scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
	hashflag1=0;
	$("#level1Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();
	//$("#yearId").data("selectBox-selectBoxIt").remove();
	var level1Id = document.getElementById('level1Id');
	//level1 load
	menuData = data;
	//contextualVariable = data.keys[filterLevel0Id]["snapshot_pca"][2011]["level2"]["key"];
	variableCategory = data.keys[filterLevel0Id][2011]["keys"];
	units = data.keys[filterLevel0Id][2011]["units"];
	description = data.keys[filterLevel0Id][2011]["variable_details"];
	
	if(data.levels){
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
		$("#level1Id").data("selectBox-selectBoxIt").add();
		//levels load
		for(var key in levelsData){
			var levelName='';
			if(key == filterLevel0Id){
				for(var i=2; i<Object.keys(levelsData[key]).length; i++){ // i=2 - level2 starting from 2 
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
		$("#levelId").data("selectBox-selectBoxIt").add();
		//year load
		var optyear = document.createElement('option');
		optyear.innerHTML = 2011;
		optyear.value = 2011;
		yearId.appendChild(optyear);
		/*for(var key in keysData){
			if(key == filterLevel0Id){
				for(var key1 in keysData[key]["snapshot_pca"]){
					var yearval = moment(key1,"DD/MM/YYYY");
					var optyear = document.createElement('option');
					if(yearval._i == "2011"){
						optyear.innerHTML = yearval._i;
						optyear.value = yearval._i;
						yearId.appendChild(optyear);
					}
				}
			}
		}*/
	}
	loadVariableCategory();
   });	
}
   

var jsonData=[];
var masterKey=[];
var masterKeyArray={};
var layersData;
var flag=0; // for dataload 
var hashflag=0; // for data grid & map hashparams set
var hashflag1=0; // for dataview on click button
var url;
var hashNum= 0; // For Removing State layers from url( Hash params)


//hashparams call
function hashParams(){
	if(hashNum == 0){
		hashflag1 = 1;
		$("#level1Id").data("selectBox-selectBoxIt").remove();
		$("#levelId").data("selectBox-selectBoxIt").remove();
	
		// Url Param Load Function
		var prms = $.deparam.fragment();
		//var sId = document.getElementById('stateId');
		if(Object.keys(prms).length > 0){
			var level0Val = prms.level0;
			var level1Val = prms.level1;
			var levelVal = prms.level;
			var yearVal = prms.year;
			var selectedid = prms.selected;
			var level2;
			var level2=[];
			// country load
			//document.getElementById('countryId').value = ctid;
			$("#level0Id option[value="+level0Val+"]").attr('selected', 'selected');
			$("#level0Id").data("selectBox-selectBoxIt").add();
			// state load
			var filterLevel0Id = document.getElementById("level0Id").value;
			if(menuData){
				setMenuData();
			}else{
				d3.json("scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
				menuData = data;
				variableCategory = data.keys[filterLevel0Id][2011]["keys"];	
				units = data.keys[filterLevel0Id][2011]['units'];
				description = data.keys[filterLevel0Id][2011]['variable_details']; 	
				setMenuData();
				loadVariableCategory();
				});
			}
		}
	}
}


/* hashparams set menu values :: state,levels and year ... */
function setMenuData(){

	$("#level1Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();
	$("#level2Id").data("selectBox-selectBoxIt").remove();
	//$("#yearId").data("selectBox-selectBoxIt").remove();

	// Url Param Load Function
	var prms = $.deparam.fragment();
	//var sId = document.getElementById('stateId');
	var level0Val = prms.level0;
	var level1Val = prms.level1;
	var level2Val = prms.level2;
	var levelVal = prms.level;
	var yearVal = prms.year;
	var selectedid = prms.selected;

	var filterLevel0Id = document.getElementById("level0Id").value;
	levelsData = menuData.levels;
	level1Data = menuData.level1;
	var keysData = menuData.keys;

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
	//levels load
	for(var key in levelsData){
		var levelName='';
		if(key == filterLevel0Id){
			for(var i=2; i<Object.keys(levelsData[key]).length; i++){ // i=2 - level2 starting from 2 
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
	
	//year load
	var optyear = document.createElement('option');
	optyear.innerHTML = 2011;
	optyear.value = 2011;
	yearId.appendChild(optyear);
	/*for(var key in keysData){
		if(key == filterLevel0Id){
			for(var key1 in keysData[key]["snapshot_pca"]){
				var yearval = moment(key1,"DD/MM/YYYY");
				var optyear = document.createElement('option');
				if(yearval._i == "2011"){
					optyear.innerHTML = yearval._i;
					optyear.value = yearval._i;
					yearId.appendChild(optyear);
				}
			}
		}
	}*/

	document.getElementById('level1Id').value = level1Val;
	document.getElementById('levelId').value = levelVal;
	document.getElementById('yearId').value = yearVal;

	$("#level1Id").data("selectBox-selectBoxIt").add();
	$("#levelId").data("selectBox-selectBoxIt").add();

	level2MenuData = menuData.level2[level0Val][level1Val];

	var level2Id = document.getElementById("level2Id");
	//var levelVal = document.getElementById('levelId');
	//var levelType = levelVal.options[levelVal.selectedIndex].innerHTML;
	var levelid = document.getElementById("levelId").value;
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	
	/* district load */
	/**/
	if(levelType == "village"){
		d3.select('#level2Id').style('display', 'block');
		$("#level2Id").data("selectBox-selectBoxIt").remove();
		var optlevel2 = document.createElement('option');
		//optlevel2.innerHTML = "Select District";
		//optlevel2.value = 0;
		//level2Id.appendChild(optlevel2);

		for(var key in level2MenuData){
			var optlevel2 = document.createElement('option');
			var valCh = level2MenuData[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel2.innerHTML = valCam;
			optlevel2.value = key;
			level2Id.appendChild(optlevel2);
		}
		
		//Sorting the select option after appending to the select option :
		var options = $('#level2Id option');
		var arr = options.map(function(_, o) {
			return {
			    t: $(o).text(),
			    v: o.value
			};
		}).get();
		arr.sort(function(o1, o2) {
			return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
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

		document.getElementById('level2Id').value = level2Val;
		$("#level2Id").data("selectBox-selectBoxIt").add();
		//bootbox.alert("District is required. Please select a District");
	}else{
		$("#level2Id").data("selectBox-selectBoxIt").remove();
		d3.select('#level2Id').style('display', 'none');
		d3.select('#level2IdSelectBoxItContainer').style('display', 'none');
		d3.select('#llevel2IdSelectBoxIt').style('display', 'none');

	}
	/**/
	
	hashLoadKey();
	
	//Added For TopoJSon Map 
	if(document.getElementById("levelId").value > 0 && document.getElementById('yearId').value >0 ){
	var rr = document.getElementById("levelId");
	var level1Name = rr.options[0].text;
	var level2Name = rr.options[1].text;
	var level0Map = document.getElementById('level0Id').value;
	var level1Map = document.getElementById('level1Id').value;

	if (level1Map != 0) {
		d3.json('/static/region_explorer/TOPO/' + level0Map + '_' + level1Map + '_2_' + yearVal + '_district_topo.json', function (error, tjson_2) { //yearVal ///static/filters_layers/data/
		    if(tjson_2){
			    geojson = topojson.feature(tjson_2, tjson_2.objects.levels); //This is for the Boundaries of the map in leaflet
		    }else { geojson = 0; }
			
		});
		 d3.json('/static/region_explorer/TOPO/' + level0Map + '_' + level1Map + '_3_' + yearVal + '_taluk_topo.json', function (error, tjson_21) { //yearVal ///static/filters_layers/data/
		    if(tjson_21){
			    geojson1 = topojson.feature(tjson_21, tjson_21.objects.levels); //This is for the Boundaries of map in leaflet
		    }else { geojson1 = 0; }
		});
	    }
	}	
	
	}


var views;
/* hashparams load keydetails */
function hashLoadKey(){
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var levelVal = document.getElementById('levelId').value;
	var yearVal = document.getElementById('yearId').value;
	if(masterKey.length>0){
		var prms = $.deparam.fragment();
		if(Object.keys(prms).length > 0){
			setHashKeyValues();
			if(prms['view'] !=  views ){
				hashDataLoad();
			}else{
				if(prms['Bank_layer']){
					//onViewLayersData();
				}else{	
					onViewData();}
			}
		views =  prms['view'] 
		}
	}else{
		d3.json("scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year="+yearVal+"" , function(data) {
			var prms = $.deparam.fragment();
			if(Object.keys(prms).length > 0){
				var filtersAndLayers = data;
				masterKeyArray = filtersAndLayers[level0Val][level1Val]['filter'];
				//layersData = filtersAndLayers[level0Val][level1Val]['layers'];
				//addLayers(layersData);
				loadMasterKey();
				setHashKeyValues();

				if(flag == 0 && jsonData.length>0){
					hashDataLoad();
				}else {
					if(prms['Bank_layer']){
						//onViewLayersData();
					}else{	onViewData();}
				}
			}
		});
	}
}

var gridMaster={};
/* change state to load keydetails */
function level1Change(){
	hashflag1=0;
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var yearVal = document.getElementById('yearId').value;

	level2MenuData = menuData.level2[level0Val][level1Val];
	level2MenuDataLoad(); /* level2 menu data load*/

	gridMaster={};
	for(key in menuData.level2[level0Val][level1Val]){
		var obj={};
		var arr=[];
		gridMaster[menuData.level2[level0Val][level1Val][key]]=[];
	}

	d3.json("scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year="+yearVal+"" , function(data) {
	 
	   if(data != 'No Result found'){
		var filtersAndLayers = data;
		masterKeyArray = filtersAndLayers[level0Val][level1Val]['filter'];
	   }else{
		masterKeyArray = '';
	   }
	   
	   loadMasterKey();
	   setKeyValues();

	});
}


var ifLatLong = "grid";

function dataLoad(){
	mapCreator();
}


function levelChange(){
	hashflag1=0;
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;


	if (level0Val == 0) {
	   bootbox.alert("Country is required. Please select a country");
	   return false;
	}
	if (level1Val == 0) {
	   bootbox.alert("State is required. Please select a State");
	   return false;
	}
	level2MenuDataLoad(); /* level2 menu data load*/
	loadMasterKey();
	setKeyValues();
}

var levelType;
function level2MenuDataLoad(){

	var level0Val = document.getElementById('level0Id').value;
	var levelid = document.getElementById("levelId").value;
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	
	var level2Id = document.getElementById("level2Id");

	/* district load */
	if(levelType == "village"){
		d3.select('#level2Id').style('display', 'block');
		$("#level2Id").data("selectBox-selectBoxIt").remove();
		var optlevel2 = document.createElement('option');
		//optlevel2.innerHTML = "Select District";
		//optlevel2.value = 0;
		//level2Id.appendChild(optlevel2);

		for(var key in level2MenuData){
			var optlevel2 = document.createElement('option');
			var valCh = level2MenuData[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel2.innerHTML = valCam;
			optlevel2.value = key;
			level2Id.appendChild(optlevel2);
		}

		//Sorting the select option after appending to the select option :
		var options = $('#level2Id option');
		var arr = options.map(function(_, o) {
			return {
			    t: $(o).text(),
			    v: o.value
			};
		}).get();
		arr.sort(function(o1, o2) {
			return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
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

		//$('#level2Id').html(selectList);

		$("#level2Id").data("selectBox-selectBoxIt").add();
	}else{
		$("#level2Id").data("selectBox-selectBoxIt").remove();
		d3.select('#level2Id').style('display', 'none');
		d3.select('#level2IdSelectBoxItContainer').style('display', 'none');
		d3.select('#llevel2IdSelectBoxIt').style('display', 'none');

	}
}


function loadMasterKey_mybuild(levelval,levelType,level0Val){
	masterKey=[];
	levelval = levelval.charAt(0);
	if(levelval == 4){
		for(key in masterKeyArray){
			if(key == "level4"){
				for(key2 in masterKeyArray[key]){
					if(key2 === "snapshot_PCA" || key2 === "economic_census_2005" || key2 === "distance_to_roads"){
						for(key3 in masterKeyArray[key][key2]){
							if(key3.toLowerCase() == levelType.toLowerCase()){
								for(key4 in masterKeyArray[key][key2][key3]){
									for(key5 in masterKeyArray[key][key2][key3][key4]){
										if(masterKeyArray[key][key2][key3][key4][key5].Max){
										if(masterKeyArray[key][key2][key3][key4][key5].Max != 'inf'){
										var keymaster={};
										keymaster["key"] = key5;
										keymaster["minval"] = masterKeyArray[key][key2][key3][key4][key5].Min;
										keymaster["maxval"] = masterKeyArray[key][key2][key3][key4][key5].Max;
										masterKey.push(keymaster);
										}
										}
									}	
								}
							}
						}
					}
				}
			}
		}
	}
	if(levelval == 3){
		for(key in masterKeyArray){
			if(key == "level3"){
				for(key2 in masterKeyArray[key]){
					if(key2 === "snapshot_PCA" || key2 === "economic_census_2005" || key2 === "distance_to_roads"){
						for(key3 in masterKeyArray[key][key2]){
							for(key4 in masterKeyArray[key][key2][key3]){
								if(masterKeyArray[key][key2][key3][key4].Max){
								if(masterKeyArray[key][key2][key3][key4].Max != 'inf'){
								var keymaster={};
								keymaster["key"] = key4;
								keymaster["minval"] = masterKeyArray[key][key2][key3][key4].Min;
								keymaster["maxval"] = masterKeyArray[key][key2][key3][key4].Max;
								masterKey.push(keymaster);
								}
								}
							}
						}
					}
				}
			}
		}
	}
	if(levelval == 2){
		for(key in masterKeyArray){
			if(key == "level2"){
				for(key2 in masterKeyArray[key]){
					if(key2 === "snapshot_PCA" || key2 === "economic_census_2005" || key2 === "distance_to_roads"){
						for(key3 in masterKeyArray[key][key2]){
							for(key4 in masterKeyArray[key][key2][key3]){
								if(masterKeyArray[key][key2][key3][key4].Max){
								if(masterKeyArray[key][key2][key3][key4].Max != 'inf'){
								var keymaster={};
								keymaster["key"] = key4;
								keymaster["minval"] = masterKeyArray[key][key2][key3][key4].Min;
								keymaster["maxval"] = masterKeyArray[key][key2][key3][key4].Max;
								masterKey.push(keymaster);
								}
								}
							}
						}
					}
				}
			}
		}
	}
}



function loadMasterKey(){
	masterKey=[];
	var level0Val = document.getElementById('level0Id').value;
	var levelval = document.getElementById('levelId').value;
	levelval = levelval.charAt(0);
	var levelid = document.getElementById('levelId').value;

	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]];
	}else{
        	levelType = levelsData[level0Val]["level"+levelid+""];
	}
	
	if(levelval == 4){
		for(key in masterKeyArray){
			if(key == "level4"){
				for(key2 in masterKeyArray[key]){
					if(key2 == "snapshot_PCA" || key2 == "economic_census_2005" || key2 == "distance_to_roads"){
						for(key3 in masterKeyArray[key][key2]){
							if(key3.toLowerCase() == levelType.toLowerCase()){
								for(key4 in masterKeyArray[key][key2][key3]){
									for(key5 in masterKeyArray[key][key2][key3][key4]){
										if(masterKeyArray[key][key2][key3][key4][key5].Max){
										if(masterKeyArray[key][key2][key3][key4][key5].Max != 'inf'){
										var keymaster={};
										keymaster["key"] = key5;
										keymaster["minval"] = masterKeyArray[key][key2][key3][key4][key5].Min;
										keymaster["maxval"] = masterKeyArray[key][key2][key3][key4][key5].Max;
										masterKey.push(keymaster);
										}
										}
									}	
								}
							}
						}
					}
				}
			}
		}
	}
	if(levelval == 3){
		for(key in masterKeyArray){
			if(key == "level3"){
				for(key2 in masterKeyArray[key]){
					if(key2 == "snapshot_PCA" || key2 == "economic_census_2005" || key2 == "distance_to_roads"){
						for(key3 in masterKeyArray[key][key2]){
							for(key4 in masterKeyArray[key][key2][key3]){
								if(masterKeyArray[key][key2][key3][key4].Max){
								if(masterKeyArray[key][key2][key3][key4].Max != 'inf'){
								var keymaster={};
								keymaster["key"] = key4;
								keymaster["minval"] = masterKeyArray[key][key2][key3][key4].Min;
								keymaster["maxval"] = masterKeyArray[key][key2][key3][key4].Max;
								masterKey.push(keymaster);
								}
								}
							}
						}
					}
				}
			}
		}
	}
	if(levelval == 2){
		for(key in masterKeyArray){
			if(key == "level2"){
				for(key2 in masterKeyArray[key]){
					if(key2 == "snapshot_PCA" || key2 == "economic_census_2005" || key2 == "distance_to_roads"){
						for(key3 in masterKeyArray[key][key2]){
							for(key4 in masterKeyArray[key][key2][key3]){
								if(masterKeyArray[key][key2][key3][key4].Max){
								if(masterKeyArray[key][key2][key3][key4].Max != 'inf'){
								var keymaster={};
								keymaster["key"] = key4;
								keymaster["minval"] = masterKeyArray[key][key2][key3][key4].Min;
								keymaster["maxval"] = masterKeyArray[key][key2][key3][key4].Max;
								masterKey.push(keymaster);
								}
								}
							}
						}
					}
				}
			}
		}
	}
}


function applySelectedVariableFilters(){

	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var level2Val = document.getElementById('level2Id').value;
	var levelVal = document.getElementById('levelId').value;
	var yearVal = document.getElementById('yearId').value;

	/*added to mybuilds*/
	var query="";

	if(levelsData[level0Val]["level"+levelVal.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelVal.split(".")[0]+""][levelVal.split(".")[1]];
	}else{
        	levelType = levelsData[level0Val]["level"+levelVal+""];
	}


	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	for(var i=0;i<masterKey.length;i++){
		if($("#"+masterKey[i].key+"_collapse").hasClass("") == true){
			var val = $("#"+masterKey[i].key).slider("getValue");
			query += ",{key%20eq%20"+masterKey[i].key+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
	 	}
	}
	var mysphere_url;
	query = query.substring(1);
	if(level2Val !=0){
		mysphere_url="mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}else{
		mysphere_url="mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}
	
	d3.json(mysphere_url,function(data){ //selectedVariable
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	setKeyValues();
	//d3.select('.modal').style('display', 'none').attr('aria-hidden','true');
}

var vcount=0;

function setKeyValues(){
	hashflag1=0;
	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	vcount=0;
	var checkedInKeys = [];
	var filterDataCount = jsonData.length;
	if(masterKey.length>0){
		checkedInKeys = [];	
		// html key slider
		var s='';
		for(var i = 0; i < masterKey.length; i++) {
			if(selectedVariable.length>0){
			for(var k=0;k<selectedVariable.length;k++){
				var name = "";
				name = selectedVariable[k].split('-');
				var variable ='';
				var variable_new ='';
				var variable_name ='';
				var variable_id = '';

				if(name.length === 5){
					variable = name[1];
					variable_name = name[1] +' '+name[3] +' '+ name[4];
					variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3]+"-"+name[4];
				}else if(name.length === 4){
					variable = name[1];
					variable_name = name[1] +' '+name[3];
					variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3];
				} else if(name.length === 3){
					variable = name[1];
					variable_name = name[1] +' '+name[2];
					variable_id = name[0]+"-"+name[1]+"-"+name[2];
				} else if(name.length === 2){
					variable = name[1];	
					variable_name = name[1];	
					variable_id = name[0]+"-"+name[1];
				} 
				variable_new = variable;
				var formula='',source='',Description='',variableUnit ='';
				for(var j =0; j < description.length; j++){
					if(selectedVariable[k] === description[j]['variable_name'] || variable_new === description[j]['variable_name']){
						formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
					}
				}
				if(name.length > 1){
					if(units[variable_new]){
						variableUnit = units[variable_new];
					}
				}else{
					if(units[selectedVariable[k]]){
						variableUnit = units[selectedVariable[k]];
					}
				}
				var mouseOverPopup="";
				mouseOverPopup+='<table class='+"'mouseOverPopup'"+'>'
						   +'<tr>'
						      +'<td width='+"'25%'"+' valign='+"'top'"+'>Description</td><td valign='+"'top'"+'>:&nbsp;</td><td  width='+"'75%'"+' align='+"'left'"+'>'+Description+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Formula</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+formula+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Source</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+source+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Units</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+variableUnit+'</td>'
						   +'</tr>'
						+'</table>';


				if(masterKey[i].key === variable){
					for(var j =0; j < description.length; j++){
						if(variable === description[j]['variable_name'] || variable_new === description[j]['variable_name']){
							formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
						}
					}
					if(units[variable_new]){
						variableUnit = units[variable_new];
					}
					checkedInKeys.push(selectedVariable[k]);
					var minval = Math.floor(masterKey[i].minval * 10) / 10;
					var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
					var name_1_camcase = variable_name.replace(/_/g,' ');
					var keyName = name_1_camcase.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					s+='<li class="panel"  data-popover="true" data-html=true data-original-title="'+keyName+'" data-content="'+
							mouseOverPopup+ '" >'+
					'<a data-toggle="collapse" id="'+variable_id +'_collapse" data-target="#range-'+variable_id+'" data-parent="#accordion" class="collapsed" >'+keyName+'</a>'+
					'<div id="range-'+variable_id+'" class="collapse range-sec">'+
					   '<p class="range-val" id="'+variable_id+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
					   if(maxval%1 != 0 || minval%1 != 0){
					      s+='<input id="'+variable_id+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="0.1" data-slider-value="['+minval+','+maxval+']"></input>';
					   }else{
					      s+='<input id="'+variable_id+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="1" data-slider-value="['+minval+','+maxval+']"></input>';
					   }
					s+='</div>'+
					'</li>';
					vcount++;
			
				}else if(masterKey[i].key === selectedVariable[k]){
					
					if(units[selectedVariable[k]]){
						variableUnit = units[selectedVariable[k]];
					}
					checkedInKeys.push(selectedVariable[k]);
					var minval = Math.floor(masterKey[i].minval * 10) / 10;
					var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
					var keyVal = masterKey[i].key;
					keyVal = keyVal.replace(/_/g,' ');
					var keyName = keyVal.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyName+'" data-content="'+
							mouseOverPopup+'"  >'+
					'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="collapsed" >'+keyName+'</a>'+
					'<div id="range-'+masterKey[i].key+'" class="collapse range-sec">'+
					   '<p class="range-val" id="'+masterKey[i].key+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
					   if(maxval%1 != 0 || minval%1 != 0){
					      s+='<input id="'+masterKey[i].key+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="0.1" data-slider-value="['+minval+','+maxval+']"></input>';
					   }else{
					      s+='<input id="'+masterKey[i].key+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="1" data-slider-value="['+minval+','+maxval+']"></input>';
					   }
					s+='</div>'+
					'</li>';
					vcount++;
				}else{
				}
			}
		}
		
		}
		
		for(var keys in selectedVariable){
			var arrayCheckedValues = $.inArray(selectedVariable[keys], checkedInKeys);

			if(arrayCheckedValues === -1){
				checkedInKeys.push(selectedVariable[keys]);
				var formula='',source='',Description='',variableUnit ='';
				for(var j =0; j < description.length; j++){
					if(selectedVariable[keys] === description[j]['variable_name']){
						formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
					}
				}
				if(units[selectedVariable[keys]]){
					variableUnit = units[selectedVariable[keys]];
				}
				var mouseOverPopup="";
				mouseOverPopup+='<table class='+"'mouseOverPopup'"+'>'
						   +'<tr>'
						      +'<td width='+"'25%'"+' valign='+"'top'"+'>Description</td><td valign='+"'top'"+'>:&nbsp;</td><td  width='+"'75%'"+' align='+"'left'"+'>'+Description+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Formula</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+formula+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Source</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+source+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Units</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+variableUnit+'</td>'
						   +'</tr>'
						+'</table>';

				checkedInKeys.push(selectedVariable[keys]);
				var keyVal = selectedVariable[keys];
				keyVal = keyVal.replace(/_/g,' ');
				var keyName = keyVal.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyName+'" data-content="'+mouseOverPopup
						+'"  >'+
				'<a data-toggle="collapse" style='+"'color:#C0C0C0 ;disable:true;'"+' id="'+selectedVariable[keys]+'_collapse" data-target="#range--'+selectedVariable[keys]+'" data-parent="#accordion" class="collapsed" >'+keyName+'</a>'+
				'</li>';
				vcount++;	
				
			}

		}

	       if(selectedVariable.length<10){
		    s+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
    	       }
		s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onView()" >Apply</button>';
		document.getElementById("tableId").innerHTML=s;
		rangeSlider();

		//For popup

			//For popup

		$('.panel').popover({
			trigger:'hover',
			placement:'right',
			html:true
		      });  

		$('.panel').popover({
			selector: 'li',
			trigger: 'hover',
			placement:'right'
		    });


		var originalLeave = $.fn.popover.Constructor.prototype.leave;
		$.fn.popover.Constructor.prototype.leave = function(obj){
		  var self = obj instanceof this.constructor ?
		    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
		  var container, timeout;

		  originalLeave.call(this, obj);

		  if(obj.currentTarget) {
		    container = $(obj.currentTarget).siblings('.popover')
		    timeout = self.timeout;
		    container.one('mouseenter', function(){
		      //We entered the actual popover – call off the dogs
		      clearTimeout(timeout);
		      //Let's monitor popover content instead
		      container.one('mouseleave', function(){
			$.fn.popover.Constructor.prototype.leave.call(self, self);
		      });
		    })
		  }
		};	
		
	}else{
		document.getElementById("tableId").innerHTML="";
	}
	// html key slider

		
}


function setHashKeyValues(){
	hashflag1=0;
	var checkedInKeysHash = [];
	var prms = $.deparam.fragment();
	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	vcount=0;
	var filterDataCount = jsonData.length;
	// html key slider
	var s = "";
	var name = '';
	var kname,kvalue,kmin,kmax,kchecked;
	if(masterKey.length>0){
		checkedInKeysHash = [];
		for(var i = 0; i < masterKey.length; i++) {
			if(selectedVariable.length >0){
			for(var k=0;k<selectedVariable.length;k++){
				var name = selectedVariable[k].split('-');
				var variable ='';
				var variable_new ='';
				var variable_name ='';
				var variable_id = '';

				if(name.length === 5){
					variable = name[1];
					variable_name = name[1] +' '+name[3] +' '+ name[4];
					variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3]+"-"+name[4];
				}else if(name.length === 4){
					variable = name[1];
					variable_name = name[1] +' '+name[3];
					variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3];
				} else if(name.length === 3){
					variable = name[1];
					variable_name = name[1] +' '+name[2];
					variable_id = name[0]+"-"+name[1]+"-"+name[2];
				} else if(name.length === 2){
					variable = name[1];	
					variable_name = name[1];	
					variable_id = name[0]+"-"+name[1];
				} 
				variable_new = variable;
				var formula='',source='',Description='',variableUnit ='';
				for(var j =0; j < description.length; j++){
					if(selectedVariable[k] == description[j]['variable_name'] || variable_new == description[j]['variable_name']){
						formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
					}
				}
				if(name.length > 1){
					if(units[variable_new]){
						variableUnit = units[variable_new];
					}
				}else{
					if(units[selectedVariable[k]]){
						variableUnit = units[selectedVariable[k]];
					}
				}
				var mouseOverPopup="";
				mouseOverPopup+='<table class='+"'mouseOverPopup'"+'>'
						   +'<tr>'
						      +'<td width='+"'25%'"+' valign='+"'top'"+'>Description</td><td valign='+"'top'"+'>:&nbsp;</td><td  width='+"'75%'"+' align='+"'left'"+'>'+Description+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Formula</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+formula+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Source</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+source+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Units</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+variableUnit+'</td>'
						   +'</tr>'
						+'</table>';


				if(masterKey[i].key === variable){
					var key = "key_"+i;
					var key_ec = "key_"+i+k;
					var keyvalue = "key_"+i+"val";
					var keyvalue_ec = "key_"+i+k+"val";
					var keychecked = "key_"+i+"checked";
					var keychecked_ec = "key_"+i+k+"checked";
					kname = prms[key];
					var param_value = '';
					if(prms[keyvalue]){ 
						param_value=prms[keyvalue];  
						kname = variable_name;
					} else if(prms[keyvalue_ec]){  
						param_value = prms[keyvalue_ec]; 
						kname = prms[key_ec]; 
						keychecked = keychecked_ec;
						kname = variable_name;
					}
					if(param_value){
						if(units[variable_new]){
							variableUnit = units[variable_new];
						}
						checkedInKeysHash.push(selectedVariable[k]);
						kvalue = JSON.parse("["+param_value+"]");
						var minval = Math.floor(masterKey[i].minval * 10) / 10;
						var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
						var keyLabel = kname.replace(/_/g,' ');
						var keyLabelName = keyLabel.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						if(prms[keychecked] == "true"){

							s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyLabelName+'" data-content="'+mouseOverPopup
							+'" >'+
							'<a data-toggle="collapse" id="'+variable_id+'_collapse" data-target="#range-'+variable_id+'" data-parent="#accordion" class="" >'+keyLabelName+'</a>'+
							'<div id="range-'+variable_id+'" class="collapse in range-sec">'+
							   '<p class="range-val" id="'+variable_id+'-val"><span class="min-val">'+kvalue[0]+'</span><span class="max-val">'+kvalue[1]+'</span></p>';
							if(maxval%1 != 0 || minval%1 != 0 || ((maxval-minval)< 5)){
							   s+='<input id="'+variable_id+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="0.01" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							}else{
							   s+='<input id="'+variable_id+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="1" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							}
							s+='</div>'+
							'</li>';

						}else{
							s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyLabelName+'" data-content="  '+mouseOverPopup
							+'" >'+
							'<a data-toggle="collapse" id="'+variable_id+'_collapse" data-target="#range-'+variable_id+'" data-parent="#accordion" class="collapsed"  >'+keyLabelName+'</a>'+
							'<div id="range-'+variable_id+'" class="collapse range-sec">'+
							   '<p class="range-val" id="'+variable_id+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
							if(maxval%1 != 0 || minval%1 != 0 || ((maxval-minval)< 5)){
							   s+='<input id="'+variable_id+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="0.01" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							}else{
							   s+='<input id="'+variable_id+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="1" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							}
							s+='</div>'+
							'</li>';
						}
						vcount++;
					}

				} else if(masterKey[i].key === selectedVariable[k]){
					checkedInKeysHash.push(selectedVariable[k]);
					if(units[selectedVariable[k]]){
						variableUnit = units[selectedVariable[k]];
					}
					var key = "key_"+i;
					var keyvalue = "key_"+i+"val";
					kname = prms[key];
					kvalue = JSON.parse("["+prms[keyvalue]+"]");

					var minval = Math.floor(masterKey[i].minval * 10) / 10;
					var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
					var keychecked = "key_"+i+"checked";

					var keyLabel = kname.replace(/_/g,' ');
					var keyLabelName = keyLabel.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					if(prms[keychecked] == "true"){
						s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyLabelName+'" data-content="'+mouseOverPopup
						+'">'+
						'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="">'+keyLabelName+'</a>'+
						'<div id="range-'+masterKey[i].key+'" class="collapse in range-sec">'+
						   '<p class="range-val" id="'+masterKey[i].key+'-val"><span class="min-val">'+kvalue[0]+'</span><span class="max-val">'+kvalue[1]+'</span></p>';
						if(maxval%1 != 0 || minval%1 != 0 || ((maxval-minval)< 5)){
						   s+='<input id="'+masterKey[i].key+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="0.01" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
						}else{
						   s+='<input id="'+masterKey[i].key+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="1" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
						}
						s+='</div>'+
						'</li>';

					}else{
						s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyLabelName+'" data-content="'+mouseOverPopup
						+'" >'+
						'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="collapsed"  >'+keyLabelName+'</a>'+
						'<div id="range-'+masterKey[i].key+'" class="collapse range-sec">'+
						   '<p class="range-val" id="'+masterKey[i].key+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
						if(maxval%1 != 0 || minval%1 != 0 || ((maxval-minval)< 5)){
						   s+='<input id="'+masterKey[i].key+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="0.01" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
						}else{
						   s+='<input id="'+masterKey[i].key+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="1" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
						}
						s+='</div>'+
						'</li>';
					}
					vcount++;
				}
				else{
				}
			}
		}
				
	   }	
	}

	for(var keys in selectedVariable){
		var arrayCheckedValues = $.inArray(selectedVariable[keys], checkedInKeysHash);

		if(arrayCheckedValues === -1){
			checkedInKeysHash.push(selectedVariable[keys]);
			var formula='',source='',Description='',variableUnit ='';
			for(var j =0; j < description.length; j++){
				if(selectedVariable[keys] === description[j]['variable_name']){
					formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
				}
			}
			if(units[selectedVariable[keys]]){
				variableUnit = units[selectedVariable[keys]];
			}
			var mouseOverPopup="";
			mouseOverPopup+='<table class='+"'mouseOverPopup'"+'>'
						   +'<tr>'
						      +'<td width='+"'25%'"+' valign='+"'top'"+'>Description</td><td valign='+"'top'"+'>:&nbsp;</td><td  width='+"'75%'"+' align='+"'left'"+'>'+Description+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Formula</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+formula+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Source</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+source+'</td>'
						   +'</tr>'
						   +'<tr>'
						      +'<td valign='+"'top'"+'>Units</td><td valign='+"'top'"+'>:&nbsp;</td><td align='+"'left'"+'>'+variableUnit+'</td>'
						   +'</tr>'
						+'</table>';
			checkedInKeysHash.push(selectedVariable[keys]);
			var keyVal = selectedVariable[keys];
			keyVal = keyVal.replace(/_/g,' ');
			var keyName = keyVal.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			s+='<li class="panel" data-popover="true" data-html=true data-original-title="'+keyName+'" data-content="'+mouseOverPopup
				+'" >'+
			'<a data-toggle="collapse" style='+"'color:#C0C0C0 ;disable:true;'"+' id="'+selectedVariable[keys]+'_collapse" data-target="#range--'+selectedVariable[keys]+'" data-parent="#accordion" class="collapsed" >'+keyName+'</a>'+
			'</li>';
			vcount++;	
			
		}

	}

	if(selectedVariable.length<10){
		s+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
	}

	s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onView()" >Apply</button>';
	document.getElementById("tableId").innerHTML=s;
	document.getElementById("page-title-active-filter").innerHTML= filterDataCount+" locations found.";


	rangeSlider();
	
	//For popup
	$('.panel').popover({trigger:'hover',placement:'right',	html:true  });  
	$('.panel').popover({ selector: 'li',trigger: 'hover',placement:'right'  });

	var originalLeave = $.fn.popover.Constructor.prototype.leave;
	$.fn.popover.Constructor.prototype.leave = function(obj){
	  var self = obj instanceof this.constructor ?
	    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
	  var container, timeout;

	  originalLeave.call(this, obj);

	  if(obj.currentTarget) {
	    container = $(obj.currentTarget).siblings('.popover')
	    timeout = self.timeout;
	    container.one('mouseenter', function(){
	      //We entered the actual popover – call off the dogs
	      clearTimeout(timeout);
	      //Let's monitor popover content instead
	      container.one('mouseleave', function(){
		$.fn.popover.Constructor.prototype.leave.call(self, self);
	      });
	    })
	  }
	};

}


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



var pathname1;
var prms={};
var layerDataRemove;


function onView(){
	flag=1;
	hashflag=1; 
	hashflag1=1;
	ifLatLong  = "grid";
	var checkedFlag=0;
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var level2Val = document.getElementById('level2Id').value;
	var yearVal = document.getElementById('yearId').value;
	var levelVal = document.getElementById('levelId').value;

	if(levelsData[level0Val]["level"+levelVal.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelVal.split(".")[0]+""][levelVal.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelVal+""].toLowerCase();
	}

	if (level0Val == 0) {
	   bootbox.alert("Country is required. Please select a country");
	   hashflag1 = 0;
	   return false;
	}
	if (level1Val == 0) {
	   bootbox.alert("State is required. Please select a state");
	   hashflag1 = 0;
	   return false;
	}
	if(levelType == "village"){
	   if(level2Val == 0){
	      bootbox.alert("District is required. Please select a district");
	      hashflag1 = 0;
	      return false;
	   }
	}
	
	/*added to mybuilds*/
	var query="", query_ec="";

	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	for(var i=0;i<masterKey.length;i++){
		if($("#"+masterKey[i].key+"_collapse").hasClass("") == true){
			var val = $("#"+masterKey[i].key).slider("getValue");
			query += ",{key%20eq%20"+masterKey[i].key+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
	 	}
	}
	/*dANI*/
	for(var i=0;i<selectedVariable.length;i++){
		var param_name = selectedVariable[i].replace('~', '-');		
		var name = selectedVariable[i].split('-');
		var variable_new ="";
		if(name.length === 4){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}			
		} else  if(name.length === 3){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}			
		} else if(name.length === 2){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}
		} else {
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query+= ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}
		
		}
	}
	var mysphere_url;
	query = query.substring(1);
	if(level2Val !=0){
		url="scisphere/places/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"";
		mysphere_url="mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}else{
		url="scisphere/places/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"";
		mysphere_url="mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}

	//d3.json("mysphere_mybuilds",function(data){ //selectedVariable
	d3.json(mysphere_url,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	//Queue Function
	queue().defer(hashFunction);
	setTimeout(viewWithOutHashChange, 100);
	
	function hashFunction(){
		// bbq
		pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		if(level2Val!=0){
			prms = {level0:level0Val, level1:level1Val,level2:level2Val, level:levelVal, year:yearVal};//,selected: selectedid }
		}else{
			prms = {level0:level0Val, level1:level1Val, level:levelVal, year:yearVal};//,selected: selectedid }
		}
		// bbq
		masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
		
		for(var i=0;i<masterKey.length;i++){
			for(var k=0;k<selectedVariable.length;k++){
				var name = selectedVariable[k].split('-');	
				if(masterKey[i].key === selectedVariable[k]){
					var val;
					if($("#"+masterKey[i].key+"_collapse").hasClass("") == true){
						val = $("#"+masterKey[i].key).slider("getValue");
						val = val[0]+","+val[1];
					}else{
						val = masterKey[i].minval+","+masterKey[i].maxval;
					}
					prms["key_"+i] = masterKey[i].key;
					prms["key_"+i+"val"] = val;
					prms["key_"+i+"checked"] = $("#"+masterKey[i].key+"_collapse").hasClass("");
					if($("#"+masterKey[i].key+"_collapse").hasClass("") == true){
						checkedFlag=1;
					}

			   	} else if(name[3]){
					var variable = name[1];
					if(masterKey[i].key === variable){
						var val;
						if($("#"+selectedVariable[k]+"_collapse").hasClass("") == true){
							val = $("#"+selectedVariable[k]).slider("getValue");
							val = val[0]+","+val[1];
						}else{
							val = masterKey[i].minval+","+masterKey[i].maxval;
						}
						prms["key_"+i+k] = selectedVariable[k];
						prms["key_"+i+k+"val"] = val;
						prms["key_"+i+k+"checked"] = $("#"+selectedVariable[k]+"_collapse").hasClass("");
						if($("#"+selectedVariable[k]+"_collapse").hasClass("") == true){
							checkedFlag=1;
						}
				   	}
				} else if(name[1]){
					var variable = name[1];
					variable_new = variable;					
					if(masterKey[i].key === variable_new){
						var variable_rpl = selectedVariable[k].replace('~','-');
						var val;
						if($("#"+variable_rpl+"_collapse").hasClass("") == true){
							val = $("#"+variable_rpl).slider("getValue");
							val = val[0]+","+val[1];
						}else{
							val = masterKey[i].minval+","+masterKey[i].maxval;
						}
						prms["key_"+i] = variable_rpl;
						prms["key_"+i+"val"] = val;
						prms["key_"+i+"checked"] = $("#"+variable_rpl+"_collapse").hasClass("");
						if($("#"+variable_rpl+"_collapse").hasClass("") == true){
							checkedFlag=1;
						}
				   	}
				}
			}
		}
		if (checkedFlag == 0) {
		   hashflag1 = 0; 
		   bootbox.alert("Filter Key is required. Please choose a key");
		   return false;
		}

		//layers add on Filter data if radio button on layer is selected
		var prms1 = $.deparam.fragment();
		//added
		prms["selectedvariables"]= selectedVariable.toString();
		
		// bbq
		var r = $.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
		// bbq
	}

	function viewWithOutHashChange(){
		hashNum = 0;
		if(hashflag1 == 1){
			onViewData();
		}
	}
}


//filter data query
function onViewData(){
	hashflag=1;
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var level2Val = document.getElementById('level2Id').value;
	var levelVal = document.getElementById('levelId').value;
	var yearVal = document.getElementById('yearId').value;
	var query="", query_ec="";
	levelVal = levelVal.charAt(0);
	/**/
	var levelid = document.getElementById("levelId").value;
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	/**/
	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	for(var i=0;i<masterKey.length;i++){
		if($("#"+masterKey[i].key+"_collapse").hasClass("") == true){
			var val = $("#"+masterKey[i].key).slider("getValue");
			query += ",{key%20eq%20"+masterKey[i].key+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
	 	}
	}
	var mysphere_url;
	query = query.substring(1);
	if(level2Val !=0){
		url="scisphere/places/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"";
		mysphere_url_list="mysphere_mybuilds_for_filters_list/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}else{
		url="scisphere/places/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"";
		mysphere_url_list="mysphere_mybuilds_for_filters_list/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}
	
	/*dANI*/
	for(var i=0;i<selectedVariable.length;i++){
		var param_name = selectedVariable[i].replace('~', '-');		
		var name = selectedVariable[i].split('-');
		var variable_new ="";
		if(name.length === 4){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}			
		} else  if(name.length === 3){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}			
		} else if(name.length === 2){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}
		} else {
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query+= ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}
		
		}
	}
	var mysphere_url;
	query = query.substring(1);
	if(level2Val !=0){
		url="scisphere/places/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"";
		mysphere_url="mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}else{
		url="scisphere/places/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"";
		mysphere_url="mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}
	filterDataLoad(url);

	d3.json(mysphere_url_list,function(data){ //selectedVariable
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});
}


var level1Label,level2Label,level3Label,levelType;
function level4Data(data){
	var level0Val = document.getElementById('level0Id').value;
	levelsData = menuData.levels;
	var level = document.getElementById('levelId');
	levelType = level.options[level.selectedIndex].innerHTML;	
	for(var key in levelsData){ //label name
	   if(key == level0Val){
		level1Label = levelsData[key].level1;
		level2Label = levelsData[key].level2;
		level3Label = levelsData[key].level3;
		level1Label = level1Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		level2Label = level2Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		level3Label = level3Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	   }
	}
	for(var j = 0;j<data.length; j++){
		var arr={};
		arr[level1Label] = data[j].fields.name_1[0];
		arr[level2Label] = data[j].fields.name_2[0];
		arr[level3Label] = data[j].fields.name_3[0];
		arr[levelType] = data[j].fields.name_4[0];
		arr["id_2"] = data[j].fields.id_2[0];
		arr['latitude'] = data[j].fields.latitude[0];
		arr['longitude'] = data[j].fields.longitude[0];
		jsonData.push(arr);
	}
	gridData(jsonData,level2Label,levelType);
}

function level3Data(data){
	var level0Val = document.getElementById('level0Id').value;
	levelsData = menuData.levels;
	var level = document.getElementById('levelId');
	levelType = level.options[level.selectedIndex].innerHTML;
	for(var key in levelsData){ //label name
	   if(key == level0Val){
		level1Label = levelsData[key].level1;
		level2Label = levelsData[key].level2;
		level3Label = levelsData[key].level3;
		level1Label = level1Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		level2Label = level2Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		level3Label = level3Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	   }
	}
	for(var j = 0;j<data.length; j++){
		var arr={};
		arr[level1Label] = data[j].fields.name_1[0];
		arr[level2Label] = data[j].fields.name_2[0];
		arr[level3Label] = data[j].fields.name_3[0];
		arr["id_2"] = data[j].fields.id_2[0];
		jsonData.push(arr);
	}
	gridData(jsonData,level2Label,level3Label);
}


function level2Data(data){
	var level0Val = document.getElementById('level0Id').value;
	levelsData = menuData.levels; 
	var level = document.getElementById('levelId');
	levelType = level.options[level.selectedIndex].innerHTML;
	for(var key in levelsData){ //label name
	   if(key == level0Val){
		level1Label = levelsData[key].level1;
		level2Label = levelsData[key].level2;
		level1Label = level1Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		level2Label = level2Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	   }
	}
	for(var j = 0;j<data.length; j++){
		var arr={};
		arr[level1Label] = data[j].fields.name_1[0];
		arr[level2Label] = data[j].fields.name_2[0];
		arr["id_2"] = data[j].fields.id_2[0];
		jsonData.push(arr);

	}
	gridData(jsonData,level2Label,"");
}


function filterDataLoad(url){
	d3.json(url, function(data) {
		data = data.result;
		jsonData=[]; 
		var level0Val = document.getElementById('level0Id').value;
		var levelsData = menuData.levels;
		var levelid = document.getElementById("levelId").value;
		if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
			levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]];
		}else{
			levelType = levelsData[level0Val]["level"+levelid+""];
		}
		levelType = levelType.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});	

		for(var key in levelsData){ //label name
		   if(key == level0Val){
			level1Label = levelsData[key].level1;
			level2Label = levelsData[key].level2;
			level3Label = levelsData[key].level3;
			level1Label = level1Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			level2Label = level2Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			level3Label = level3Label.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		   }
		}

		var levelval = document.getElementById('levelId').value;
		levelval = levelval.charAt(0);
		if(data.length){
			if(levelval == 4){
				for(var j = 0;j<data.length; j++){
					var arr={};
					arr[level1Label] = data[j].name_1;
					arr[level2Label] = data[j].name_2;
					arr[level3Label] = data[j].name_3;
					arr[levelType] = data[j].name_4;
					arr["id_2"] = data[j].id_2;
					arr['latitude'] = data[j].latitude;
					arr['longitude'] = data[j].longitude;
					jsonData.push(arr);
				}
				gridData(jsonData,level2Label,levelType);
			}else if(levelval == 3){
				for(var j = 0;j<data.length; j++){
					var arr={};
					arr[level1Label] = data[j].name_1;
					arr[level2Label] = data[j].name_2;
					arr[level3Label] = data[j].name_3;
					arr["id_2"] = data[j].id_2;
					jsonData.push(arr);
				}
				gridData(jsonData,level2Label,level3Label);
			}else if(levelval == 2){
				for(var j = 0;j<data.length; j++){
					var arr={};
					arr[level1Label] = data[j].name_1;
					arr[level2Label] = data[j].name_2;
					arr["id_2"] = data[j].id_2;
					jsonData.push(arr);
				}
				gridData(jsonData,level2Label,"");
			}
		}else{
			jsonData=[];
			gridData(jsonData,"","");
		}
		flag=0;
		dataLoad();
	});
}

// hashchange data load
function hashDataLoad(){
	mapCreator();
	hashflag=1;
}

var districtLength,districtDim,grid,gridDataSelected=[],totalPage=1;
function gridData(jsonData,level2Text,levelText){
	var level1Id = document.getElementById('level1Id');
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	var filterDataCount = jsonData.length;
	if(jsonData.length>0){
		if(jsonData[0].latitude){
			d3.select('#map-id').attr('class','active');
			d3.select('#grid-id').attr('class','');
			d3.select('#mapview').attr('class','tab-pane active');
			d3.select('#grid').attr('class','tab-pane');
			d3.select('#map').style('display','block');
		}else{
			d3.select('#map-id').attr('class','');
			d3.select('#grid-id').attr('class','active');
			d3.select('#grid').attr('class','tab-pane active');
			d3.select('#mapview').attr('class','tab-pane');
			d3.select('#map').style('display','none');
		}
	}else{
		bootbox.alert("No Result found.");
	}

	var ndx = crossfilter(jsonData);
	var all = ndx.groupAll();

	districtDim = ndx.dimension(function (d) { 
            return d.id_2;
        });
	var dist = districtDim.group(function(t) { return t; });

	districtLength = dist.top(Infinity);

	if(districtLength){
		grid="";
		for(var i=0; i<districtLength.length; i++){
			var tt = districtDim.filter(districtLength[i].key).top(Infinity);
			grid+='<ul class="popup-area-list">';
			grid+='<label class="popup-label"><input type="checkbox" class="popup-cb" id="'+tt[0]["id_2"]+'" onclick="gridDataClick('+"'"+tt[0]["id_2"]+"'"+');">'+tt[0][level2Text]+'</label>';
			if(tt[0][levelText]){
				for(var j=0;j<tt.length;j++){
					grid += '<li><a>'+tt[j][levelText]+'</a></li>';
				}
			}
			grid+='</ul>';
			districtDim.filterAll();
		}
		document.getElementById("gridId").innerHTML= grid;
		document.getElementById("page-title-top-id").innerHTML= level1Name;
		document.getElementById("page-title-active-filter").innerHTML= filterDataCount+" locations found.";

	}else{
		document.getElementById("gridId").innerHTML= "";
	}
	gridPaginationCall();
}

function gridPaginationCall(){
	$grid_table_rows = $('.popup-area-sec ul');
	var grid_table_row_limit = 4;
	gridTotalPage = Math.ceil($grid_table_rows.length / grid_table_row_limit);
	$('#pg1').jqPagination('option', 'max_page', gridTotalPage);
	$('#pg1').jqPagination('option', 'current_page', 1);
}


function gridDataClick(gridDataId){
	if(districtLength){
		for(var i=0;i<districtLength.length;i++){
			if(document.getElementById(districtLength[i].key)){
				if(document.getElementById(districtLength[i].key).checked){
					gridDataSelected.push(districtLength[i].key);
					gridDataSelected = _.uniq(gridDataSelected);
				}else{
					gridDataSelected = _.without(gridDataSelected, districtLength[i].key);
					gridDataSelected = _.uniq(gridDataSelected);
				}
			}
		}
	}
 
}

var variableCategory,units,description='';
function loadVariableCategory1(){
	$("#variableCategoryId").data("selectBox-selectBoxIt").remove();
	var categoryKeys_master = _.keys(variableCategory);
	var categoryKeys_c = _.keys(variableCategory[categoryKeys_master[0]]);
	var categoryKeys_ec = _.keys(variableCategory[categoryKeys_master[1]]);
	var categoryKeys= [];
	for(var i=0;i<categoryKeys_c.length; i++){
		if (!($.inArray(categoryKeys_c[i], categoryKeys) > -1)) {
			categoryKeys.push(categoryKeys_c[i]);
		}
	}	
	for(var j=0;j<categoryKeys_ec.length; j++){
		if (!($.inArray(categoryKeys_ec[j], categoryKeys) > -1)) {
			categoryKeys.push(categoryKeys_ec[j]);
		}
	}	
	categoryKeys = categoryKeys.sort();

	var variableCategoryId = document.getElementById('variableCategoryId');
		var optcategory = document.createElement('option');
		optcategory.innerHTML = "All Categories";
		optcategory.value = "allcategories";
		variableCategoryId.appendChild(optcategory);

	for(var i=0;i<categoryKeys.length;i++){
		var optcategory = document.createElement('option');
		var valCh = categoryKeys[i];
		valCh = valCh.replace(/_/g,' ');
		valCh = valCh.replace(' in',' By Industry ');
		valCh = valCh.replace('employment','% Employed ');
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optcategory.innerHTML = valCam;
		optcategory.value = categoryKeys[i];
		variableCategoryId.appendChild(optcategory);
	}
	$("#variableCategoryId").data("selectBox-selectBoxIt").add();

	/* GEO Country load start */
	var geoCountryId = document.getElementById('geoCountryId');
	for(var i=0;i<level0Data.length;i++){
		var optlevel0 = document.createElement('option');
		var valCh = level0Data[i].name_0;
		var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		optlevel0.innerHTML = valCam;
		optlevel0.value = level0Data[i].id_0;
		geoCountryId.appendChild(optlevel0);
	}
	$("#geoCountryId").data("selectBox-selectBoxIt").add();
	/* GEO Country load end */

	loadGeoState();
	loadVariable();
}


// session Timeout set and redirect
var wintimeout;
function SetWinTimeout() {
	wintimeout = window.setTimeout("window.location.href='/accounts/logout/';",600000); //after 5 mins i.e. 5 * 60 * 1000
}
$(document).ready(function(){
	$('body').click(function() {
		window.clearTimeout(wintimeout); //when user clicks remove timeout and reset it
		SetWinTimeout();
	});
});
SetWinTimeout();

// csv download
var csvData=[];
function downloadCSV(){
	csvData=[];
	var checked = false;
	// only selected list download
	if(gridDataSelected.length>0){
		checked = true;
		for(var i=0;i<gridDataSelected.length;i++){
			var tt = districtDim.filter(gridDataSelected[i]).top(Infinity);
			for(j=0;j<tt.length;j++){
				csvData.push(_.pick(tt[j], level1Label,level2Label,level3Label,levelType));
			}
			districtDim.filterAll();
		}
	}

	// all list download
	if(checked == false){
		for(i=0;i<jsonData.length;i++){
			csvData.push(_.pick(jsonData[i], level1Label,level2Label,level3Label,levelType));
		}
	}
	
	if(csvData){
		JSONToCSVConvertor(csvData, "", true);
	}
}


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';    
    //Set Report title in first row or line
    //CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var level1Id = document.getElementById('level1Id');
    var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
    var fileName = level1Name;
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    //this trick will generate a temp <a> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
////

var markers;
var map;
var markersLayer = new L.LayerGroup(); // NOTE: Layer is created here!
function mapCreator(){

	var level0Val = document.getElementById("level0Id").value;
	var levelid = document.getElementById("levelId").value;
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	levelType = levelType.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

	//markers = L.markerClusterGroup();
	markers = L.markerClusterGroup({ disableClusteringAtZoom: 13 , showCoverageOnHover: false });
	//map = L.map('map').addLayer(tiles);
	markersLayer.clearLayers();
	this.map.removeLayer(markers);
	this.map.removeLayer(tiles);
	this.map.removeLayer(markersLayer);

	if(jsonData[0].latitude){

		//POP to remove
		/*var popup_on_map = '<a href="#mapview" data-view="mapview"  data-toggle="tab" role="tab" id="tab-map" class="" onclick="d3.select('+"'#map'"+').style('+"'display'"+','+"'block'"+'); dataLoad();">Map<span class="tab-icon"></span></a>'

		document.getElementById('map-id').innerHTML= popup_on_map;*/
		

		//MAp	
		d3.select("#map").selectAll('#no-text').remove();
		this.map.addLayer(tiles);
		for(var i=0;i<jsonData.length;i++){
		  var marker = new L.Marker([jsonData[i].latitude,jsonData[i].longitude],{title:jsonData[i][""+levelType+""],type:"Place"});
		  var html ='';
		  html += '<div class="textWrap"><strong>' + level1Label + '</strong>: ' + jsonData[i][""+level1Label+""] + '</div>';
		  html += '<div class="textWrap"><strong>' + level2Label + '</strong>: ' + jsonData[i][""+level2Label+""] + '</div>';
		  html += '<div class="textWrap"><strong>' + level3Label + '</strong>: ' + jsonData[i][""+level3Label+""] + '</div>';
		  html += '<div class="textWrap"><strong>' + levelType + '</strong>: ' + jsonData[i][""+levelType+""] + '</div>';
		  marker.bindPopup(html);
		  markers.addLayer(marker);
		}
		setTimeout(function(){
			map.invalidateSize();
			markersLayer.addLayer(markers)
			this.map.addLayer(markersLayer);
			this.map.fitBounds(markers.getBounds());
		},100);

	} else {
		d3.select("#map").selectAll('#no-text').remove();
		var NoData = d3.select("#map").append("svg").attr('width','800').attr('height','500').attr('id','no-text').append("text").attr("x", 268).attr("y", 200) 
			.style("font", "200 20px sans-serif").text("Map display is unavailable for "+levelType+" level")
	
		// levelType = levelsData[level0Val]["level"+3+""].toLowerCase();
		//var levelType = levelsData[level0Val]["level"+2+""].toLowerCase();
		
		var popup_on_map = '<a href="#mapview" data-view="mapview" data-popover="true" data-html=true data-content="A map view is not available for this level. <br> Map views are available only for village and town level filtering." data-toggle="tab" role="tab" id="tab-map" class="" onclick="d3.select('+"'#map'"+').style('+"'display'"+','+"'block'"+'); dataLoad();">Map<span class="tab-icon"></span></a>'

		//document.getElementById('map-id').innerHTML= popup_on_map;
		$('#tab-map').popover({
			trigger: 'click',
			placement:'right'
		    });

		
		return false;
	}
}


/* leaflet map save */
$(function() {
	$('#btnSaveMap').click(function() {
		setTimeout(function() {
			$('#map').html2canvas({
				flashcanvas: "/static/js/leaflet-to-png-js/flashcanvas.min.js",
				"Access-Control-Allow-Origin":"*",
				logging: false,
				profile: false,
				useCORS: true
			});
		}, 1000);
		
	});

});

function manipulateCanvasFunction(savedMap) {

	dataURL = savedMap.toDataURL("image/png");
       /*document.getElementById('pin-form-image').value = dataURL;
	document.getElementById('imgHeight').value = 400;
	document.getElementById('imgWidth').value = 600;
	document.getElementById('pathName').value = document.URL;*/

       var level1Id = document.getElementById('level1Id');     	
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;

	$.post("/post_image_pins/", { 'image': dataURL,'description':level1Name,'tags':'Saved_Image','width':600,'height':450,'pathName':'' }, function(data) {
		bootbox.alert('Image Saved to ' + data);
	});
}
/* leaflet map save */


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





/* leaflet map save */
document.getElementById('output').addEventListener('click', function() {
	sample3.innerHTML = 'Loading map image for saving....';
	//$('#sample3').plainModal('open', {offset: {left: 100, top: 50}});
	leafletImage(map, doImage);
});

window.setTimeout(function() {
    map.panBy([100, 100]);
    // map.setView([0, 0], 2);
    window.setTimeout(function() {
        leafletImage(map, doImage);
    }, 1000);
}, 1000);

function doImage(err, canvas) {
        var level1Id = document.getElementById('level1Id');
    	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	var img = document.createElement('img');
	var dimensions = map.getSize();
	img.width = dimensions.x;
	img.height = dimensions.y;
	img.src = canvas.toDataURL();
	sample3.innerHTML = '';
	sample3.appendChild(img);

	document.getElementById('pin-form-image').value = canvas.toDataURL();
	document.getElementById('pin-form-description').value = level1Name;
	document.getElementById('imgWidth').value = dimensions.x;

	document.getElementById('imgHeight').value = dimensions.y;
	document.getElementById('pathName').value = document.URL;

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
/* leaflet map save */
