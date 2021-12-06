window.onload=onLoad;
var menuData;
var tiles;
var level0Data,level1Data,levelsData;
function onLoad(){

	tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

	map = L.map('map').addLayer(tiles);
	/*For label display district and taluk level on mouseover*/	
	info = L.control();
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	info.update = function (props) {
		if (props) {
		    var name =""
		    if(props.properties.name){
			name = props.properties['name'];
		    }
			name = name.replace(/\w\S* /g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})	
		    this._div.innerHTML = (props ?
			'<h4>' + name + '</h4>' : '&nbsp;');
		   }
	};
	info.addTo(map);
	/*For label display district and taluk level on mouseover*/

	/*For button hide/show */
	/*butInfo = L.control();
	butInfo.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'butInfo'); // create a div with a class "info"
		this.update();
		return this._div;
	};
	// method that we will use to update the control based on feature properties passed
	butInfo.update = function (props) {
			this._div.innerHTML = '<input type="radio" id="hide_workbook" name="button" onclick="workbookHideShow()"> Hide <input type="radio" id="show_workbook" name="button" onclick="workbookHideShow()"> Show';
	};
	butInfo.addTo(map);*/
	/*For button hide/show */

	/*For label key and value*/
	valInfo = L.control();
	valInfo.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'valInfo'); // create a div with a class "info"
		this._div.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';//'white';
		this._div.style.borderRadius = '5px';
		this._div.style.marginTop = '0px';
		this._div.style.marginLeft = '350px';
		this._div.style.paddingLeft = '10px';
		this._div.style.paddingRight = '10px';
		this._div.style.paddingTop = '4px';
		this._div.style.paddingBottom = '4px';
		this._div.style.color = '#000000'; //'#5494C4';
		this._div.style.width = '150px';
		this._div.style.maxHeight = '435px';
		//this._div.style.opacity = '0.5';		
		this._div.style.display = 'none';
		this.update();
		return this._div;
	};
	// method that we will use to update the control based on feature properties passed
	valInfo.update = function (props) {
		if(props){
			this._div.innerHTML = '<div><input type="radio" id="hide_workbook" name="button" onclick="workbookHideShow()"> Hide <input type="radio" id="show_workbook" name="button" onclick="workbookHideShow()"> Show</div>'+props;
			//this._div.innerHTML = props;
		}else{
			//this._div.innerHTML = "";
			this._div.innerHTML = '<div><input type="radio" id="hide_workbook" name="button" onclick="workbookHideShow()"> Hide <input type="radio" id="show_workbook" name="button" onclick="workbookHideShow()"> Show</div>';
		}
	};
	valInfo.addTo(map);
	/*For label key and value*/

 	/*Loading Icon*/
	/*Loading in Map layer*/
	var loading = L.control({position: 'topleft'});

	loading.onAdd = function (map) {
	    var div = L.DomUtil.create('div', 'loading');
	    div.style.backgroundColor = 'white';
	    div.style.borderRadius = '5px';
	    div.style.marginTop = '-50px';
	    div.style.marginLeft = '350px';
	    div.style.paddingLeft = '10px';
	    div.style.paddingRight = '10px';
	    div.style.paddingTop = '4px';
	    div.style.paddingBottom = '4px';
	    div.style.color = '#5494C4';
	    div.style.width = '150px';
	    div.style.display = 'none';
	    div.innerHTML = '<label id="loading_id" class="loading-class" >Loading Please wait...</label>'; 
	    return div;
	};

	loading.addTo(map);


	//d3.json("/app/subscription_list",function(data){
		//sub_list = data;
   	d3.json("/app/scisphere/places/countries" , function(data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
			}
		}
	
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

	/* Function for pushing values to hash params */
	function push_values_to_hash_params(newvar){
		
		var level0Val="";
		var level1Val="";
		var my_build_url ="";
		if(newvar){ 
			level0Val = JSON.parse(newvar)['level']['level_0'];
			level1Val = JSON.parse(newvar)['level']['level_1'];
		}else{
			if(sub_list["plus_plans"].length > 0){
				level0Val = sub_list['free_plans']['country'];
				level1Val = sub_list['plus_plans'][0];
			}else{
				level0Val = sub_list['free_plans']['country'];
				level1Val = sub_list['free_plans']['state'];
			}
		}
		
		my_build_url="/app/scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year=2011";
		
		d3.json(my_build_url, function(data) {
			if(data){
				if(data['1001']){
					sessionClose(data['1001']);
				}
			}
	
			levelval = "3";	
			levelType = "TALUK"
			masterKeyArray = data['data'][level0Val][level1Val]['filter'];
			myVarMasterKeyArray = data['myvar'];
			//loadMasterKey_mybuild(levelval,levelType,level0Val);
			loadMasterKey(levelval,levelType,level0Val);
			loadMyVarMasterKey(levelval,level1Val);

			masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
			var pathname1 = window.location.pathname;
			var prms = $.deparam.fragment();
			prms["level0"] = level0Val;
			prms["level1"] = level1Val;

			for(var i=0;i<masterKey.length;i++){
				for(var k=0;k<selectedVariable.length;k++){
					if(masterKey[i].key == selectedVariable[k]){
						var val;
						var minval = Math.floor(masterKey[i].minval * 10) / 10;
						var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;

						// minval 
						if (minval>= 10 && minval< 100) {
						    minval= (Math.floor(minval/10)*10);
						}
						if (minval>= 100 && minval< 10000) {
						    minval= (Math.floor(minval/100)*100);
						}
						if (minval>= 10000) {
						    minval= (Math.floor(minval/1000)*1000);
						}
						// maxval 
						if (maxval>= 10 && maxval< 100) {
						    maxval= (Math.ceil(maxval/10)*10);
						}
						if (maxval>= 100 && maxval< 10000) {
						    maxval= (Math.ceil(maxval/100)*100);
						}
						if (maxval>= 10000) {
						    maxval= (Math.ceil(maxval/1000)*1000);
						}

						var sliderstep = (maxval-(minval))/10;
						if(maxval%1 != 0 || minval%1 != 0){
							sliderstep = sliderstep.toFixed(2);
						}else{
							if (sliderstep>= 100 && sliderstep< 10000) {
						    		sliderstep= (Math.ceil(sliderstep/100)*100);
							}
							if (sliderstep>=10000) {
						    		sliderstep= (Math.ceil(sliderstep/1000)*1000);
							}
						}

						if(k==0){
							val = minval+","+maxval;
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
			prms["selectedmyvariables"]= selectedMyVariable.toString();

			for(var i=0;i<booleanMasterKey.length;i++){
				for(var k=0;k<selectedVariable.length;k++){
					if(booleanMasterKey[i].key == selectedVariable[k]){
						prms["boolean_key_"+booleanMasterKey[i].key] = booleanMasterKey[i].key;
						prms["boolean_key_"+booleanMasterKey[i].key+"_checked"] = false;
						prms["boolean_key_"+booleanMasterKey[i].key+"_val"] = true;
					}
				}
			}
			// bbq
			var r = $.param.fragment(pathname1 ,prms, 2 );
			$.bbq.pushState(r);
		});
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
	
	}/* end of pushing values to hash params*/

	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
		if(prms.selectedvariables){
			selectedVariable = prms.selectedvariables.split(",");				
		}
		if(prms.selectedmyvariables){
			selectedMyVariable = prms.selectedmyvariables.split(",");
		}
		//return hashParams();
	}else{
	//For mybuilds
	d3.json('/app/mysphere_mybuilds_for_region_snapshot_list/33',function(data){

		/*check if data in MY Builds for a user*/
		if((data.MyBuild.length > 0)){
			
			var str = JSON.stringify(data.MyBuild[0]);
			var newvar = JSON.parse(str);
			selectedVariable = JSON.parse(newvar)['variable'];
			if(JSON.parse(newvar)['selectedMyVariable']){	
				selectedMyVariable = JSON.parse(newvar)['selectedMyVariable'];
			}

			if(JSON.parse(newvar).filters != ''){/*check if data has regions values in MY Builds for a user*/
			   	
    			   if(JSON.parse(newvar)['level']){  /*check if levels are available in MY Builds for a user*/

				level0Val = JSON.parse(newvar)['filters']['region']['level_0'];
				level1Val = JSON.parse(newvar)['filters']['region']['level_1'];

				level0ValLevel = JSON.parse(newvar)['level']['level_0'];
				level1ValLevel = JSON.parse(newvar)['level']['level_1'];

				level2Val = JSON.parse(newvar)['filters']['region']['level_2'];
				levelType = JSON.parse(newvar)['filters']['region']['level_type'];
				levelval = JSON.parse(newvar)['filters']['region']['level'];
				range = JSON.parse(newvar)['filters']['range'];
				myVarRangeObj = JSON.parse(newvar)['filters']['myVarRangeObj'];
				var mylocation_checked = JSON.parse(newvar)['filters'];
                                mylocation_checked = mylocation_checked['mylocation_checked'];
                                var workbook_checked = JSON.parse(newvar)['filters']['workbook_checked'];
				var workbook_name = JSON.parse(newvar)['filters']['workbook_name'];
				var rangeInSelectedVariable = 0;


				for(var key in range){
				    for(var k=0;k<selectedVariable.length;k++){
					if(key == selectedVariable[k] ){
						rangeInSelectedVariable=1;
					}
				    }
				}

				for(var key in myVarRangeObj){
				    for(var k=0;k<selectedMyVariable.length;k++){
					if(key == selectedMyVariable[k] ){
						rangeInSelectedVariable=1;
					}
				    }
				}

				if((level0ValLevel === level0Val) && (level1ValLevel === level1Val)  && (rangeInSelectedVariable != 0)){/*check if country and state in MY Builds for a user*/
				    d3.json("/app/scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year=2011" , function(data) {
					if(data){
						if(data['1001']){
							sessionClose(data['1001']);
						}
					}

					masterKeyArray = data['data'][level0Val][level1Val]['filter'];
					myVarMasterKeyArray = data['myvar'];
					//loadMasterKey_mybuild(levelval,levelType,level0Val);
					loadMasterKey(levelval,levelType,level0Val);
					loadMyVarMasterKey(levelval, level1Val);
					masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
					var pathname1 = window.location.pathname;
					var prms = $.deparam.fragment(); 
					prms["level0"] = level0Val;
					prms["level1"] = level1Val;
					prms["level2"] = level2Val;
					prms["mylocation_checked"] = mylocation_checked;
					prms['workbook_checked']= workbook_checked;
					prms['workbook_name']= workbook_name;

	
					for(var i=0;i<masterKey.length;i++){
						for(var k=0;k<selectedVariable.length;k++){
							if(masterKey[i].key == selectedVariable[k]){
							        
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
					myVar_query = '';

					for(var i=0;i<selectedMyVariable.length;i++){
						for(var j=0;j<myVarMasterKey.length;j++){	
							if(myVarMasterKey[j].key.toLowerCase() == selectedMyVariable[i].toLowerCase() ){
								if(myVarRangeObj[selectedMyVariable[i].toLowerCase()]){
									var range_split = myVarRangeObj[myVarMasterKey[j].key].split('~');
									val = range_split[0]+","+range_split[1];
									prms["myvar_key_"+myVarMasterKey[j].key+"_checked"] = true;
								}else{
									val = myVarMasterKey[i].minval+","+myVarMasterKey[i].maxval;
									prms["myvar_key_"+myVarMasterKey[j].key+"_checked"] = false;
								}
								prms["myvar_key_"+myVarMasterKey[j].key] = myVarMasterKey[j].key;
								prms["myvar_key_"+myVarMasterKey[j].key+"_val"] = val;
							}
						}
					}


					for(var i=0;i<booleanMasterKey.length;i++){
						for(var k=0;k<selectedVariable.length;k++){
							if(booleanMasterKey[i].key == selectedVariable[k]){
								if(range[booleanMasterKey[i].key]){
									prms["boolean_key_"+booleanMasterKey[i].key] = booleanMasterKey[i].key;
									prms["boolean_key_"+booleanMasterKey[i].key+"_checked"] = true;
									prms["boolean_key_"+booleanMasterKey[i].key+"_val"] = range[booleanMasterKey[i].key];
								}
							}
						}
					}
					
					prms["year"] ="2011";
					prms["level"] =levelval;
					prms["leveltype"] =levelType;
					prms["selectedvariables"]= selectedVariable.toString();
					prms["selectedmyvariables"]= selectedMyVariable.toString();
					// bbq
					var r = $.param.fragment(pathname1 ,prms, 2 );
					$.bbq.pushState(r);
				    });
				}else{
					//Load on change of region locations in another page of explore:
					level0Val = JSON.parse(newvar)['level']['level_0'];
					level1Val = JSON.parse(newvar)['level']['level_1'];
					d3.json("/app/scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year=2011" , function(data) {
						if(data){
							if(data['1001']){
								sessionClose(data['1001']);
							}
						}
		
						levelval = "3";	
						levelType = "TALUK"
						masterKeyArray = data['data'][level0Val][level1Val]['filter'];
						myVarMasterKeyArray = data['myvar'];
						//loadMasterKey_mybuild(levelval,levelType,level0Val);
						loadMasterKey(levelval,levelType,level0Val);
						loadMyVarMasterKey(levelval, level1Val);

						masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
						var pathname1 = window.location.pathname;
						var prms = $.deparam.fragment(); 
						prms["level0"] = level0Val;
						prms["level1"] = level1Val;
						prms['workbook_checked']= workbook_checked;
						prms['workbook_name']= workbook_name;

						for(var i=0;i<masterKey.length;i++){
							for(var k=0;k<selectedVariable.length;k++){
								if(masterKey[i].key == selectedVariable[k]){
									var val;
									var minval = Math.floor(masterKey[i].minval * 10) / 10;
									var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
									var keychecked = "key_"+i+"checked";

									/* minval */
									if (minval>= 10 && minval< 100) {
									    minval= (Math.floor(minval/10)*10);
									}
									if (minval>= 100 && minval< 10000) {
									    minval= (Math.floor(minval/100)*100);
									}
									if (minval>= 10000) {
									    minval= (Math.floor(minval/1000)*1000);
									}
									/* maxval */
									if (maxval>= 10 && maxval< 100) {
									    maxval= (Math.ceil(maxval/10)*10);
									}
									if (maxval>= 100 && maxval< 10000) {
									    maxval= (Math.ceil(maxval/100)*100);
									}
									if (maxval>= 10000) {
									    maxval= (Math.ceil(maxval/1000)*1000);
									}

									var sliderstep = (maxval-(minval))/10;
									if(maxval%1 != 0 || minval%1 != 0){
										sliderstep = sliderstep.toFixed(2);
									}else{
										if (sliderstep>= 100 && sliderstep< 10000) {
									    		sliderstep= (Math.ceil(sliderstep/100)*100);
										}
										if (sliderstep>=10000) {
									    		sliderstep= (Math.ceil(sliderstep/1000)*1000);
										}
									}

									if(k==0){
										val = minval+","+maxval;
									/*if( k == 0){
										val = masterKey[i].minval+","+masterKey[i].maxval;*/
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

						myVar_query = '';

						for(var i=0;i<selectedMyVariable.length;i++){
							for(var j=0;j<myVarMasterKey.length;j++){
								if(myVarMasterKey[j].key.toLowerCase() == selectedMyVariable[i].toLowerCase() ){
									if(myVarRangeObj[selectedMyVariable[i]]){
										var range_split = myVarRangeObj[myVarMasterKey[j].key].split('~');
										val = range_split[0]+","+range_split[1];
										prms["myvar_key_"+myVarMasterKey[j].key+"_checked"] = true;
									}else{
										val = myVarMasterKey[i].minval+","+myVarMasterKey[i].maxval;
										prms["myvar_key_"+myVarMasterKey[j].key+"_checked"] = false;
									}
									prms["myvar_key_"+myVarMasterKey[j].key] = myVarMasterKey[j].key;
									prms["myvar_key_"+myVarMasterKey[j].key+"_val"] = val;
								}
							}
						}	


						for(var i=0;i<booleanMasterKey.length;i++){
							for(var k=0;k<selectedVariable.length;k++){
								if(booleanMasterKey[i].key == selectedVariable[k]){
									if(range[booleanMasterKey[i].key]){
										prms["boolean_key_"+booleanMasterKey[i].key] = booleanMasterKey[i].key;
										prms["boolean_key_"+booleanMasterKey[i].key+"_checked"] = true;
										prms["boolean_key_"+booleanMasterKey[i].key+"_val"] = range[booleanMasterKey[i].key];
									}
								}
							}
						}
					
	
						prms["year"] ="2011";
						prms["level"] ="3";
						prms["selectedvariables"]= selectedVariable.toString();
						prms["selectedmyvariables"]= selectedMyVariable.toString();
						// bbq
						var r = $.param.fragment(pathname1 ,prms, 2 );
						$.bbq.pushState(r);

					});

					var pathname1 = window.location.pathname;
					var prmsDt = $.deparam.fragment();
				  }
			   } else {
				 push_values_to_hash_params("");
			   }
			} else {
			     push_values_to_hash_params(newvar);
		      	}
		} else {
		        push_values_to_hash_params("");
		}
	    });
	}
	});
	//For mybuilds
   //});
}


var level2MenuData;
var variableCategory,myVariables,units,description='';
function level0Change(){
	
   var filterLevel0Id = document.getElementById("level0Id").value;
   d3.json("/app/scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
			}
		}
	hashflag1=0;
	$("#level1Id").data("selectBox-selectBoxIt").remove();
	$("#levelId").data("selectBox-selectBoxIt").remove();
	var level1Id = document.getElementById('level1Id');
	menuData = data;
	variableCategory = data["keys"];
	myVariables = data["myvariables"];

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
							var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
							var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							optlevel1.innerHTML = valCam;
							optlevel1.value = sortable[i][0];
							level1Id.appendChild(optlevel1);
						}
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
					if(i!=5){
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
var myVarMasterKey=[];
var myVarMasterKeyArray={};
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
		//$("#level1Id").data("selectBox-selectBoxIt").remove();
		//$("#levelId").data("selectBox-selectBoxIt").remove();
	
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
			document.getElementById("level0Id").value= level0Val;
			$("#level0Id option[value="+level0Val+"]").attr('selected', 'selected');
			$("#level0Id").data("selectBox-selectBoxIt").add();
			// state load
			var filterLevel0Id = document.getElementById("level0Id").value;
			if(menuData){
				setMenuData();
			}else{
		
				d3.json("/app/scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
					if(data){
						if(data['1001']){
							sessionClose(data['1001']);
						}
					}
					menuData = data;
					level1Data = menuData.level1;
					variableCategory = data["keys"];
					myVariables = data["myvariables"];
					loadVariableCategory();
					setMenuData();
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

	// Url Param Load Function
	var prms = $.deparam.fragment();
	var level0Val = prms.level0;
	var level1Val = prms.level1;
	var level2Val = prms.level2;
	var levelVal = prms.level;
	var levelType = prms.leveltype;
	var yearVal = prms.year;
	var selectedid = prms.selected;
	var filterLevel0Id = document.getElementById("level0Id").value;
	levelsData = menuData.levels;
	level1Data = menuData.level1;
	
	var keysData = menuData.keys;
	
	if(prms.workbook_checked == true || prms.workbook_checked == "true"){
		document.getElementById("workbookcheck").checked = prms.workbook_checked;
	}


	for(var key in levelsData){
		if(key == filterLevel0Id){
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
		if(key == filterLevel0Id){
			//sorting
			var level1list = level1Data[key];
			var sortable = [];
			for (var vehicle in level1list)
			      sortable.push([vehicle, level1list[vehicle]])
			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });
			if(sub_list['plus_plans'].length > 0){
				for(var i=0;i<sortable.length;i++){
					if(( $.inArray(sortable[i][0], sub_list['plus_plans']) != -1)){
						var optlevel1 = document.createElement('option');
						var valCh = sortable[i][1];
						var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
						var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						optlevel1.innerHTML = valCam;
						optlevel1.value = sortable[i][0];
						level1Id.appendChild(optlevel1);
					}
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
				if(i!=5){
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
        	levelType = levelsData[level0Val]["level"+levelVal+""].toLowerCase();
	}
	
	/* district load */
	/**/
	if(levelType == "village" || levelType == "village_town"){
		d3.select('#level2Id').style('display', 'block');
		$("#level2Id").data("selectBox-selectBoxIt").remove();
		var optlevel2 = document.createElement('option');
		//optlevel2.innerHTML = "Select District";
		//optlevel2.value = 0;
		//level2Id.appendChild(optlevel2);

		optlevel2.innerHTML = "All District";
		optlevel2.value = "All";
		level2Id.appendChild(optlevel2);

		for(var key in level2MenuData){
			var optlevel2 = document.createElement('option');
			var valCh = level2MenuData[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel2.innerHTML = valCam;
			optlevel2.value = key;
			level2Id.appendChild(optlevel2);
		}
		
		//Sorting the select option after appending to the select option :
		$('#level2Id').append($('<option>', {  value: 0,  text: 'Select District'}));
		var options = $('#level2Id option');
		var arr = options.map(function(_, o) {
			return {
			    t: $(o).text(),
			    v: o.value
			};
		}).get();
		
		arr.sort(function(o1, o2) {
			if(o1.v == 0){ return -1; }
			else if(o2.v == 0){ return 1; }
			else {return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;}
		});
		
		options.each(function(i, o) {
			o.value = arr[i].v;
			$(o).text(arr[i].t);
			if(i==0){
				$(o).attr('selected', "selected");
				$(o).attr('disabled', true);
			}

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

		/*if (level1Map != 0) {
			d3.json('/static/region_explorer/TOPO/' + level0Map + '_' + level1Map + '_2_' + yearVal + '_district_topo.json', function (error, tjson_2) { //yearVal ///static/filters_layers/data/
			    if(tjson_2){
				    topo = topojson.feature(tjson_2, tjson_2.objects.levels); //This is for the Boundaries of the map in leaflet
			    }else { geojson = 0; }
			});
			 d3.json('/static/region_explorer/TOPO/' + level0Map + '_' + level1Map + '_3_' + yearVal + '_taluk_topo.json', function (error, tjson_21) { //yearVal ///static/filters_layers/data/
			    if(tjson_21){
				    topo = topojson.feature(tjson_21, tjson_21.objects.levels); //This is for the Boundaries of map in leaflet
			    }else { geojson1 = 0; }
			});
		    }*/
		}	
	}


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
			setHashMyVariables();
			onViewData();			
		}
	}else{
		d3.json("/app/scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year="+yearVal+"" , function(data) {
			if(data){
				if(data['1001']){
					sessionClose(data['1001']);
				}
			}
			
			var prms = $.deparam.fragment();
			if(Object.keys(prms).length > 0){
				var filtersAndLayers = data['data'];
				masterKeyArray = filtersAndLayers[level0Val][level1Val]['filter'];
				myVarMasterKeyArray = data['myvar'];
				loadMasterKey(levelVal,"",level0Val);//levelval,levelType,level0Val
				loadMyVarMasterKey(levelVal, level1Val);
				setHashKeyValues();
				setHashMyVariables();
				//setMyVariables();
				if(flag == 0 && jsonData.length>0){
					hashDataLoad();
				}else {
					onViewData();
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
	var levelVal = document.getElementById('levelId').value;
	var yearVal = document.getElementById('yearId').value;

	level2MenuData = menuData.level2[level0Val][level1Val];
	level2MenuDataLoad(); /* level2 menu data load*/

	gridMaster={};
	for(key in menuData.level2[level0Val][level1Val]){
		var obj={};
		var arr=[];
		gridMaster[menuData.level2[level0Val][level1Val][key]]=[];
	}

	d3.json("/app/scisphere/places/keydetail?level0="+level0Val+"&level1="+level1Val+"&year="+yearVal+"" , function(data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
			}
		}
			
	   if(data != 'No Result found'){
		var filtersAndLayers = data['data'];
		masterKeyArray = filtersAndLayers[level0Val][level1Val]['filter'];
		myVarMasterKeyArray = data['myvar'];
	   }else{
		masterKeyArray = "";
	    	myVarMasterKeyArray="";
	   }

	   //dataRangesMaster();	
	   loadMasterKey(levelVal,"",level0Val);
	   loadMyVarMasterKey(levelVal, level1Val);
	   setKeyValues();
	   setMyVariables();

	});
}


var ifLatLong = "grid";

function dataLoad(){
	if(document.getElementById("workbookcheck").checked == true){
		workbookmap();
		//workbookChange();
		setTimeout(function(){
			workbookChange();
		},500);
	}else{
		mapCreator();
	}
}

var dataBoolean={};
function dataRangesMaster(){
	dataRanges={};
	dataBoolean={};
	for(var i=0;i<selectedVariable.length;i++){
		var param_name = selectedVariable[i].replace('~', '-');	
		if($("#"+param_name+"_collapse").hasClass("") == true){
			if($("#"+param_name).attr('type') == 'text'){
			   	var val = $("#"+param_name).slider("getValue");
				dataRanges[selectedVariable[i]]  = { 'min': val[0] , 'max': val[1]};
			}else{
				var checked = document.getElementById("id_"+selectedVariable[i]).checked;
				dataBoolean[selectedVariable[i]]={"checked":checked};
			}
	 	};
	}

	for(var i=0;i<selectedMyVariable.length;i++){
		if($("#"+selectedMyVariable[i]+"_collapse").hasClass("") == true){
		   	var val = $("#"+selectedMyVariable[i]).slider("getValue");
			dataRanges[selectedMyVariable[i]]  = { 'min': val[0] , 'max': val[1]};
	 	};
	}
}


function levelChange(){
	hashflag1=0;
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var levelVal = document.getElementById('levelId').value;
	if (level0Val == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   return false;
	}
	if (level1Val == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   return false;
	}

	dataRangesMaster();
	level2MenuDataLoad(); /* level2 menu data load*/
	loadMasterKey(levelVal,"",level0Val);
	loadMyVarMasterKey(levelVal, level1Val);
	setKeyValues();
	setMyVariables();

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
	if(levelType == "village" || levelType == "village_town"){
		d3.select('#level2Id').style('display', 'block');
		$("#level2Id").data("selectBox-selectBoxIt").remove();

		var optlevel2 = document.createElement('option');
		optlevel2.innerHTML = "All District";
		optlevel2.value = "All";
		level2Id.appendChild(optlevel2);

		for(var key in level2MenuData){
			var optlevel2 = document.createElement('option');
			var valCh = level2MenuData[key];
			var valCam = valCh.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel2.innerHTML = valCam;
			optlevel2.value = key;
			level2Id.appendChild(optlevel2);
		}

		//Sorting the select option after appending to the select option :
		$('#level2Id').append($('<option>', {  value: 0,  text: 'Select District'}));
		var options = $('#level2Id option');
		var arr = options.map(function(_, o) {
			return {
			    t: $(o).text(),
			    v: o.value
			};
		}).get();
		/*arr.sort(function(o1, o2) {
			return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
		});*/
		arr.sort(function(o1, o2) {
			if(o1.v == 0){ return -1; }
			else if(o2.v == 0){ return 1; }
			else {return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;}
		});
		/*var obj = {
		    v: '0',
		    t: 'Select District'
		};

		arr.unshift(obj);*/

		options.each(function(i, o) {
			o.value = arr[i].v;
			$(o).text(arr[i].t);
			if(i==0){
				$(o).attr('selected', "selected");
				$(o).attr('disabled', true);
			}

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
	var levelval = levelval.charAt(0);
	if(levelval == 4){
		for(key in masterKeyArray){
			if(key == "level4"){
				for(key2 in masterKeyArray[key]){
					//if(key2 === "snapshot_PCA" || key2 === "economic_census_2005" || key2 === "distance_to_roads"){
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
					//}
				}
			}
		}
	}
	if(levelval == 3){
		for(key in masterKeyArray){
			if(key == "level3"){
				for(key2 in masterKeyArray[key]){
					//if(key2 === "snapshot_PCA" || key2 === "economic_census_2005" || key2 === "distance_to_roads"){
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
					//}
				}
			}
		}
	}
	if(levelval == 2){
		for(key in masterKeyArray){
			if(key == "level2"){
				for(key2 in masterKeyArray[key]){
					//if(key2 === "snapshot_PCA" || key2 === "economic_census_2005" || key2 === "distance_to_roads"){
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
					//}
				}
			}
		}
	}
}


function loadMyVarMasterKey(levelVal,level1Val){
	/* load myvariable master key */
	myVarMasterKey = [];
	var levelVal1 = levelVal.charAt(0);
	for(var key in myVarMasterKeyArray){
		if(key == level1Val){
			for(var key1 in myVarMasterKeyArray[key]){
			   	for(var levelKey in myVarMasterKeyArray[key][key1]){
			   		if(levelKey == "level"+levelVal1+""){
						for(var key2 in myVarMasterKeyArray[key][key1][levelKey]){
							if(myVarMasterKeyArray[key][key1][levelKey][key2].min!="Infinity"){
								var keymaster={};
								keymaster["key"] = key2;
								keymaster["minval"] = myVarMasterKeyArray[key][key1][levelKey][key2].min;
								keymaster["maxval"] = myVarMasterKeyArray[key][key1][levelKey][key2].max;
								myVarMasterKey.push(keymaster);
							}
						}
					}
				}
			}
		}
		if(key == "modelscore"){
			for(var key1 in myVarMasterKeyArray[key]){
				if(key1 == level1Val){
					for(var key2 in myVarMasterKeyArray[key][key1]){
						for(var levelKey in myVarMasterKeyArray[key][key1][key2]){
							if(levelKey == "level"+levelVal1+""){
								for(var key3 in myVarMasterKeyArray[key][key1][key2][levelKey]){
									if(myVarMasterKeyArray[key][key1][key2][levelKey][key3].min!="Infinity" && myVarMasterKeyArray[key][key1][key2][levelKey][key3].min){
										var keymaster={};
										keymaster["key"] = key3;
										keymaster["minval"] = Number(myVarMasterKeyArray[key][key1][key2][levelKey][key3].min);
										keymaster["maxval"] = Number(myVarMasterKeyArray[key][key1][key2][levelKey][key3].max);
										myVarMasterKey.push(keymaster);
									}
								}
							}
						}				
					}
				}
			}
		}
	}

	/* added */
	var keymaster={};
	keymaster["key"] = "IND_MV_01";
	keymaster["minval"] = 0;
	keymaster["maxval"] = 1;
	myVarMasterKey.push(keymaster);	
	/* added */
	
}


function loadMyVarMasterKeyOld(levelVal){

	/* load myvariable master key */
	myVarMasterKey = [];
	var levelVal = levelVal.charAt(0);
	for(var i=0;i<myVarMasterKeyArray.length;i++){
		for(var key in myVarMasterKeyArray[i]){
		   	for(var levelKey in myVarMasterKeyArray[i][key]){
		   		if(levelKey == "level"+levelVal+""){
					for(var key1 in myVarMasterKeyArray[i][key][levelKey]){
						if(myVarMasterKeyArray[i][key][levelKey][key1].min!="Infinity"){
							var keymaster={};
							keymaster["key"] = key1;
							keymaster["minval"] = myVarMasterKeyArray[i][key][levelKey][key1].min;
							keymaster["maxval"] = myVarMasterKeyArray[i][key][levelKey][key1].max;
							myVarMasterKey.push(keymaster);
						}
					}
				} 
			}
		}
	}
/* added */
	var keymaster={};
	keymaster["key"] = "IND_MV_01";
	keymaster["minval"] = 0;
	keymaster["maxval"] = 1;
	myVarMasterKey.push(keymaster);	
/* added */
	
}

var booleanMasterKey=[];
function loadMasterKey(levelval,levelType,level0Val){
	masterKey=[],booleanMasterKey=[];
	//var level0Val = document.getElementById('level0Id').value;
	//var levelval = document.getElementById('levelId').value;
	levelval = levelval.charAt(0);

	if(!levelType){
		var levelid = document.getElementById('levelId').value;
		if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
			levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]];
		}else{
			levelType = levelsData[level0Val]["level"+levelid+""];
		}
	}

	//masterKeyArray["level4"]["snapshot_PCA"]["Village"]["keys"]["Banked"]={"Min":false,"Max":true};

	if(levelval == 4){
		for(key in masterKeyArray){
			if(key == "level4"){
				for(key2 in masterKeyArray[key]){
					//if(key2 == "snapshot_PCA" || key2 == "economic_census_2005" || key2 == "distance_to_roads"){
					for(key3 in masterKeyArray[key][key2]){
						if(key3.toLowerCase() == levelType.toLowerCase()){
							for(key4 in masterKeyArray[key][key2][key3]){
								for(key5 in masterKeyArray[key][key2][key3][key4]){
									if(masterKeyArray[key][key2][key3][key4][key5].Max){
									if(masterKeyArray[key][key2][key3][key4][key5].Max != 'inf'){
										if(typeof(masterKeyArray[key][key2][key3][key4][key5].Max) == 'boolean'){
											var keymaster={};
											keymaster["key"] = key5;
											keymaster["minval"] = masterKeyArray[key][key2][key3][key4][key5].Min;
											keymaster["maxval"] = masterKeyArray[key][key2][key3][key4][key5].Max;
											booleanMasterKey.push(keymaster);
										}else{
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
					//}
				}
			}
		}
	}
	if(levelval == 3){
		for(key in masterKeyArray){
			if(key == "level3"){
				for(key2 in masterKeyArray[key]){
					//if(key2 == "snapshot_PCA" || key2 == "economic_census_2005" || key2 == "distance_to_roads"){
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
					//}
				}
			}
		}
	}
	if(levelval == 2){
		for(key in masterKeyArray){
			if(key == "level2"){
				for(key2 in masterKeyArray[key]){
					//if(key2 == "snapshot_PCA" || key2 == "economic_census_2005" || key2 == "distance_to_roads"){
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
					//}
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

	/*If user free version*/
	if(sub_list['plus_plans'].length === 0){
	    if((selectedVariable[0] != "IND_PCA_01" ) || (selectedVariable[1] != "IND_PCA_21" ) 
			|| (selectedVariable[2 ] != "IND_PCA_23"|| (selectedVariable.length > 3) )){
		selectedVariable =['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
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
		loadVariable();
	    }
	}

	/*added to mybuilds*/
	var query="";
	var myVar_query="";

	if(levelsData[level0Val]["level"+levelVal.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelVal.split(".")[0]+""][levelVal.split(".")[1]];
	}else{
        	levelType = levelsData[level0Val]["level"+levelVal+""];
	}

	/*masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	for(var i=0;i<masterKey.length;i++){
		if($("#"+masterKey[i].key+"_collapse").hasClass("") == true){
			var val = $("#"+masterKey[i].key).slider("getValue");
			query += ",{key%20eq%20"+masterKey[i].key+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
	 	}
	}*/


	dataRanges={};
	for(var i=0;i<selectedVariable.length;i++){
		var param_name = selectedVariable[i].replace('~', '-');	
		if($("#"+param_name+"_collapse").hasClass("") == true){
			if($("#"+param_name).attr('type') == 'text'){
			   	var val = $("#"+param_name).slider("getValue");
				dataRanges[selectedVariable[i]]  = { 'min': val[0] , 'max': val[1]};
				query += ",{key%20eq%20"+selectedVariable[i]+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
			}else{
				var checked = document.getElementById("id_"+selectedVariable[i]).checked;  
				query += ",{key%20eq%20"+selectedVariable[i]+"$year%20eq%20"+yearVal+"$value%20btw%20"+checked+"}";
			}
	 	};
	}


	for(var i=0;i<selectedMyVariable.length;i++){
		if($("#"+selectedMyVariable[i]+"_collapse").hasClass("") == true){
		   	var val = $("#"+selectedMyVariable[i]).slider("getValue");
			dataRanges[selectedMyVariable[i]]  = { 'min': val[0] , 'max': val[1]};
			myVar_query += ",{key%20eq%20"+selectedMyVariable[i]+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
	 	};
	}


	var mysphere_url;


	query = query.substring(1);
	if(level2Val !=0){
		mysphere_url="/app/mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";
	}else{
		mysphere_url="/app/mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";
	}

	/*My Builds url*/
	d3.json(mysphere_url,function(data){ //selectedVariable
	});

	setKeyValues();
	setMyVariables();
	//d3.select('.modal').style('display', 'none').attr('aria-hidden','true');
}


var dataRanges={};
function setMyVariables(){
	var s ="";
	var myLocationContent="";
	if(myVariables != "No Result Found"){
		myLocationContent+='<font style="color: #5F5F5F;padding: 3px 10px;font-size: 12px;">My Locations</font>'+
		   '<input type="checkbox" name="mylocations" id="mylocationsid" style="margin-left: 100px;">';
	}else{
		myLocationContent+='';
	}

	appliedSelectedMyVariable=[];

	for(var i=0;i<selectedMyVariable.length;i++){
		appliedSelectedMyVariable.push(selectedMyVariable[i]);
		appliedSelectedMyVariable = _.uniq(appliedSelectedMyVariable);
	}

	var vcount=0;
	//s+='<li class="panel" align="center"><input type="checkbox" name="mylocations" id="mylocationsid"> My Locations </li>';
	//s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onViewMyVariable()" >Apply</button>';
	if(myVarMasterKey.length > 0){
		for(var i=0;i<selectedMyVariable.length;i++){
			//appliedSelectedMyVariable.push(selectedMyVariable[i]);
			//appliedSelectedMyVariable = _.uniq(appliedSelectedMyVariable);
			var selectedvariablePushed = 1;
			for(var j=0;j<myVarMasterKey.length;j++){

				if(myVarMasterKey[j]['key'].toLowerCase() == selectedMyVariable[i].toLowerCase()){
				if(myVarMasterKey[j]['key'].toLowerCase() != 'latitude'){
				if(myVarMasterKey[j]['key'].toLowerCase() != 'longitude'){
					if(myVarMasterKey[j].minval != null || myVarMasterKey[j].maxval != null){
						selectedvariablePushed=0;
						var minval = Math.floor(myVarMasterKey[j].minval * 10) / 10;
						var maxval = Math.ceil(myVarMasterKey[j].maxval * 10) / 10;
						var keyName = myVariablesKey[myVarMasterKey[j]['key']].toTitleCase();
						//var keyName = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						var sliderstep=0;
						if(minval != maxval){
							/* minval */
							if (minval>= 10 && minval< 100) {
							    minval= (Math.floor(minval/10)*10);
							}
							if (minval>= 100 && minval< 10000) {
							    minval= (Math.floor(minval/100)*100);
							}
							if (minval>= 10000) {
							    minval= (Math.floor(minval/1000)*1000);
							}
							/* maxval */
							if (maxval>= 10 && maxval< 100) {
							    maxval= (Math.ceil(maxval/10)*10);
							}
							if (maxval>= 100 && maxval< 10000) {
							    maxval= (Math.ceil(maxval/100)*100);
							}
							if (maxval>= 10000) {
							    maxval= (Math.ceil(maxval/1000)*1000);
							}
							sliderstep = (maxval-(minval))/10;
						}
						if(maxval%1 != 0 || minval%1 != 0){
							sliderstep = sliderstep.toFixed(3);
						}else{
							if (sliderstep>= 100 && sliderstep< 10000) {
						    		sliderstep= (Math.ceil(sliderstep/100)*100);
							}
							if (sliderstep>=10000) {
						    		sliderstep= (Math.ceil(sliderstep/1000)*1000);
							}
						}
						var trimmedString = keyName;
						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ..."
						}
						/*s+='<li class="panel" >'+
						'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key']+'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
						'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse range-sec" >'+
						   '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
						   if(maxval==minval){
						      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value=""  data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
						   }else if(maxval%1 != 0 || minval%1 != 0){
						      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
						   }
						   else{
						      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
						   }
						s+='</div>'+
						'</li>';*/

						if(dataRanges[myVarMasterKey[j]['key']]){
							var rangeMin = minval;
							var rangeMax = maxval;
							if((minval <= dataRanges[myVarMasterKey[j]['key']]['min']) && (maxval >= dataRanges[myVarMasterKey[j]['key']]['min'])){
								rangeMin = dataRanges[myVarMasterKey[j]['key']]['min'];
							}
							if((minval <= dataRanges[myVarMasterKey[j]['key']]['max']) && (maxval >= dataRanges[myVarMasterKey[j]['key']]['max'])){
								rangeMax = dataRanges[myVarMasterKey[j]['key']]['max'];
							}
						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key'] +'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
							'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse in range-sec">'+
							  '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val">'+
							    '<input type="text" value="'+rangeMin+'" class="min-val">'+
							    '<input type="text" value="'+rangeMax+'" class="max-val">'+
							  '</p>'+
							  '<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+rangeMin+','+rangeMax+']"/>'+
							'</div>'+
						      '</li>';
						}else{
						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key'] +'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
							'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse range-sec">'+
							  '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val">'+
							    '<input type="text" value="'+minval+'" class="min-val">'+
							    '<input type="text" value="'+maxval+'" class="max-val">'+
							  '</p>'+
							  '<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"/>'+
							'</div>'+
						      '</li>';
						}
				

						vcount++;
					}else if(myVarMasterKey[j].minval == null || myVarMasterKey[j].maxval == null){
						selectedvariablePushed = 1;
					}
				}
				}
				}
			}
			if(selectedvariablePushed == 1){
				//var name = selectedMyVariable[i].replace(/_/g,' ');
				var keyName = myVariablesKey[selectedMyVariable[i]].toTitleCase();
				var trimmedString = keyName;
				if(keyName.length > 25){
					trimmedString = keyName.substring(0, 25);
					trimmedString = trimmedString+" ..."
				}
				s+='<li class="panel" >'+
				'<a data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow" style='+"'color:#C0C0C0 ;disable:true;'"+' id="'+selectedMyVariable[i]+'_collapse" data-target="#range--'+selectedMyVariable[i]+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
				'</li>';
				vcount++;
			}
		}
	 	if(selectedMyVariable.length<10){
		    s+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="myVarClick();">Add more variables...</a></li>';
		}

	}
	/*if(myVariables != "No Result Found"){
		s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onViewMyVariable()" >Apply</button>';
	}*/
	document.getElementById("my-variable-tableId").innerHTML=s;
	document.getElementById("mylocation-div").innerHTML=myLocationContent;
	myVarRangeSlider();
	StickyToolTipFun();
}

function setHashMyVariables(){

	var prms = $.deparam.fragment();
	var mylocation_checked="";
	if(Object.keys(prms).length > 0){
		var mylocation_checked = prms.mylocation_checked;
	}
	var s ="";
	var myLocationContent="";
	if(myVariables != "No Result Found"){
		if(mylocation_checked == "true"){	
			myLocationContent+='<font style="color: #5F5F5F;padding: 3px 10px;font-size: 12px;">My Locations</font>'+
			   '<input type="checkbox" checked="checked" name="mylocations" id="mylocationsid" style="margin-left: 100px;">';
		}else{
			myLocationContent+='<font style="color: #5F5F5F;padding: 3px 10px;font-size: 12px;">My Locations</font>'+
			   '<input type="checkbox" name="mylocations" id="mylocationsid" style="margin-left: 100px;">';
		}
	}else{
		myLocationContent+='';
	}
	
	appliedSelectedMyVariable=[];
	var vcount=0;
	//s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onViewMyVariable()" >Apply</button>';
	if(myVarMasterKey.length>0){
		for(var i=0;i<selectedMyVariable.length;i++){
			appliedSelectedMyVariable.push(selectedMyVariable[i]);
			appliedSelectedMyVariable = _.uniq(appliedSelectedMyVariable);
			var selectedvariablePushed = 1;		
			for(var j=0;j<myVarMasterKey.length;j++){		
				if(myVarMasterKey[j]['key'].toLowerCase() == selectedMyVariable[i].toLowerCase()){		
					if(myVarMasterKey[j].minval != null || myVarMasterKey[j].maxval != null){
						selectedvariablePushed = 0;
						var key = "myvar_key_"+myVarMasterKey[j].key;
						var keyvalue = "myvar_key_"+myVarMasterKey[j].key+"_val";
						if(prms[keyvalue]){kvalue = JSON.parse("["+prms[keyvalue]+"]");}
						var keychecked = "myvar_key_"+myVarMasterKey[j].key+"_checked";
						var minval = Math.floor(myVarMasterKey[j].minval * 10) / 10;
						var maxval = Math.ceil(myVarMasterKey[j].maxval * 10) / 10;
						var keyName = myVariablesKey[myVarMasterKey[j]['key']].toTitleCase();

						var sliderstep=0;
						if(minval != maxval){
							/* minval */
							if (minval>= 10 && minval< 100) {
							    minval= (Math.floor(minval/10)*10);
							}
							if (minval>= 100 && minval< 10000) {
							    minval= (Math.floor(minval/100)*100);
							}
							if (minval>= 10000) {
							    minval= (Math.floor(minval/1000)*1000);
							}
							/* maxval */
							if (maxval>= 10 && maxval< 100) {
							    maxval= (Math.ceil(maxval/10)*10);
							}
							if (maxval>= 100 && maxval< 10000) {
							    maxval= (Math.ceil(maxval/100)*100);
							}
							if (maxval>= 10000) {
							    maxval= (Math.ceil(maxval/1000)*1000);
							}
							sliderstep = (maxval-(minval))/10;
						}
		
						if(maxval%1 != 0 || minval%1 != 0){
							sliderstep = sliderstep.toFixed(3);
						}else{
							if (sliderstep>= 100 && sliderstep< 10000) {
						    		sliderstep= (Math.ceil(sliderstep/100)*100);
							}
							if (sliderstep>=10000) {
						    		sliderstep= (Math.ceil(sliderstep/1000)*1000);
							}
						}
						var trimmedString = keyName;
						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ..."
						}

						if(prms[keychecked] == "true"){
							/*s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key']+'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="" >'+trimmedString+'</a>'+
							'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse in range-sec">'+
							   '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val"><span class="min-val">'+kvalue[0]+'</span><span class="max-val">'+kvalue[1]+'</span></p>';
							   if(maxval%1 != 0 || minval%1 != 0){
							      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							   }else{
							      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							   }
							s+='</div>'+
							'</li>';*/

						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key']+'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
							'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse in range-sec">'+
							  '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val">'+
							    '<input type="text" value="'+kvalue[0]+'" class="min-val">'+
							    '<input type="text" value="'+kvalue[1]+'" class="max-val">'+
							  '</p>'+
							  '<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"/>'+
							'</div>'+
						      '</li>';


						}else{
						/*s+='<li class="panel">'+
						'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key']+'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
						'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse range-sec">'+
						   '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
						   if(maxval%1 != 0 || minval%1 != 0){
						      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
						   }else{
						      s+='<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
						   }
						s+='</div>'+
						'</li>';*/

						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+myVarMasterKey[j]['key']+'_collapse" data-tooltip="list-item-'+myVarMasterKey[j]['key']+'" data-tooltip2="st-arrow" data-target="#range-'+myVarMasterKey[j]['key']+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
							'<div id="range-'+myVarMasterKey[j]['key']+'" class="collapse range-sec">'+
							  '<p class="range-val" id="'+myVarMasterKey[j]['key']+'-val">'+
							    '<input type="text" value="'+minval+'" class="min-val">'+
							    '<input type="text" value="'+maxval+'" class="max-val">'+
							  '</p>'+
							  '<input id="'+myVarMasterKey[j]['key']+'" type="text" class="range1" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"/>'+
							'</div>'+
						      '</li>';
						}
						vcount++;
					}else if(myVarMasterKey[j].minval == null || myVarMasterKey[j].maxval == null){
						selectedvariablePushed=1;
					}
				}
			}
			if(selectedvariablePushed == 1){
				var keyName = myVariablesKey[selectedMyVariable[i]].toTitleCase();
				var trimmedString = keyName;
				if(keyName.length > 25){
					trimmedString = keyName.substring(0, 25);
					trimmedString = trimmedString+" ..."
				}
				//var name = selectedMyVariable[i].replace(/_/g,' ');
				//var keyName = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				s+='<li class="panel" >'+
				'<a data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow" style='+"'color:#C0C0C0 ;disable:true;'"+' id="'+selectedMyVariable[i]+'_collapse" data-target="#range--'+selectedMyVariable[i]+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
				'</li>';
				vcount++;
			}
		}
	 	if(selectedMyVariable.length<10){
		    s+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="myVarClick();">Add more variables...</a></li>';
		}
	}
	/*if(myVariables != "No Result Found"){
		s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onViewMyVariable()" >Apply</button>';
	}*/
	document.getElementById("my-variable-tableId").innerHTML=s;
	document.getElementById("mylocation-div").innerHTML=myLocationContent;
	myVarRangeSlider();
	StickyToolTipFun();
}


var vcount=0;
function setKeyValues(){
	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	vcount=0;
	var checkedInKeys = [];
	appliedSelectedVariable = [];
	var filterDataCount = jsonData.length;

	if(masterKey.length>0){
	checkedInKeys = [];	
	var variable = '';
	var variableId = '';

	// html key slider
	var s='';
	//s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onViewMyVariable()" >Apply</button>';
	if(selectedVariable.length >0){
		for(var k=0;k<selectedVariable.length;k++){
		   var selectedvariablePushed = 1;
		   if(variableCategory.length> 0){
		    	for(var v=0; v < variableCategory.length; v++ ){
			    if(variableCategory[v]._source['key'] == selectedVariable[k]){
				variable = variableCategory[v]._source['title'];
				variableId = variableCategory[v]._source['key'];

				appliedSelectedVariable.push(selectedVariable[k]);
				appliedSelectedVariable = _.uniq(appliedSelectedVariable);
				
				for(var i = 0; i < masterKey.length; i++) {
				    if(masterKey[i]['key'] == variableCategory[v]._source['key']){
					selectedvariablePushed = 0;
				    //if(masterKey[i]['key'].toLowerCase().replace('_',' ') == variableCategory[v]._source['title'].toLowerCase()){

					var variable = variableCategory[v]._source['title'];
					var variableId = variableCategory[v]._source['key'];

					variable = variable.replace(' ','_')
					checkedInKeys.push(selectedVariable[k]);
					var minval = Math.floor(masterKey[i].minval * 10) / 10;
					var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
					var name_1_camcase = variable.replace(/_/g,' ');
					var keyName = name_1_camcase.toTitleCase();

					var sliderstep=0;
					if(minval != maxval){
						/* minval */
						if (minval>= 10 && minval< 100) {
						    minval= (Math.floor(minval/10)*10);
						}
						if (minval>= 100 && minval< 10000) {
						    minval= (Math.floor(minval/100)*100);
						}
						if (minval>= 10000) {
						    minval= (Math.floor(minval/1000)*1000);
						}
						/* maxval */
						if (maxval>= 10 && maxval< 100) {
						    maxval= (Math.ceil(maxval/10)*10);
						}
						if (maxval>= 100 && maxval< 10000) {
						    maxval= (Math.ceil(maxval/100)*100);
						}
						if (maxval>= 10000) {
						    maxval= (Math.ceil(maxval/1000)*1000);
						}
						sliderstep = (maxval-(minval))/10;
					}
					if(maxval%1 != 0 || minval%1 != 0){
						sliderstep = sliderstep.toFixed(2);
					}else{
						if (sliderstep>= 100 && sliderstep< 10000) {
					    		sliderstep= (Math.ceil(sliderstep/100)*100);
						}
						if (sliderstep>=10000) {
					    		sliderstep= (Math.ceil(sliderstep/1000)*1000);
						}
					}

					var trimmedString = keyName;
					if(keyName.length > 25){
						trimmedString = keyName.substring(0, 25);
						trimmedString = trimmedString+" ..."
					}

					/*s+='<li class="panel">'+
					'<a data-toggle="collapse" id="'+variableId +'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+variableId+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
					'<div id="range-'+variableId+'" class="collapse range-sec">'+
					   '<p class="range-val" id="'+variableId+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
				        s+='<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
					s+='</div>'+
					'</li>';*/


					if(dataRanges[variableId]){
						var rangeMin = minval;
						var rangeMax = maxval;
						if((minval <= dataRanges[variableId]['min']) && (maxval >= dataRanges[variableId]['min'])){
							rangeMin = dataRanges[variableId]['min'];
						}
						if((minval <= dataRanges[variableId]['max']) && (maxval >= dataRanges[variableId]['max'])){
							rangeMax = dataRanges[variableId]['max'];
						}
					      s+='<li class="panel">'+
						'<a data-toggle="collapse" id="'+variableId +'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+variableId+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
						'<div id="range-'+variableId+'" class="collapse in range-sec">'+
						  '<p class="range-val" id="'+variableId+'-val">'+
						    '<input type="text" value="'+rangeMin+'" class="min-val">'+
						    '<input type="text" value="'+rangeMax+'" class="max-val">'+
						  '</p>'+
						  '<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+rangeMin+','+rangeMax+']"></input>'+
						'</div>'+
					      '</li>';

						vcount++;
					}else{
					      s+='<li class="panel">'+
						'<a data-toggle="collapse" id="'+variableId +'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+variableId+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
						'<div id="range-'+variableId+'" class="collapse range-sec">'+
						  '<p class="range-val" id="'+variableId+'-val">'+
						    '<input type="text" value="'+minval+'" class="min-val">'+
						    '<input type="text" value="'+maxval+'" class="max-val">'+
						  '</p>'+
						  '<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>'+
						'</div>'+
					      '</li>';

						vcount++;

					}
				    }
				}

			    }
			}

		if(selectedvariablePushed == 1){
			if(booleanMasterKey.length>0){
				for(var i=0;i<booleanMasterKey.length;i++){
					if(booleanMasterKey[i].key == selectedVariable[k] ){
						var keyLabel = variable.replace(/_/g,' ');
						var keyName = keyLabel.toTitleCase();
						var trimmedString = keyName;
						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ..."
						}
						var keychecked = "boolean_key_"+booleanMasterKey[i].key+"_checked";
						var keycheckedvalue = "boolean_key_"+booleanMasterKey[i].key+"_val";
						if(dataBoolean[variableId]){
						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
							'<div id="range-'+booleanMasterKey[i].key+'" class="collapse in range-sec">';
							if(dataBoolean[variableId].checked == true){
								s+='<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" checked>';
							}else{
								s+='<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox">';
							}
							s+='</div>'+
						      '</li>';
						}else{
						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
							'<div id="range-'+booleanMasterKey[i].key+'" class="collapse range-sec">'+
								'<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" >'+
							'</div>'+
						      '</li>';
						}
					}else{
						var keyLabel = variable.replace(/_/g,' ');
						var keyName = keyLabel.toTitleCase();
						var trimmedString = keyName;
						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ...";
						}
						checkedInKeys.push(selectedVariable[k]);
						s+='<li class="panel" >'+
						'<a data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" style='+"'color:#C0C0C0 ;disable:true;'"+' id="'+selectedVariable[k]+'_collapse" data-target="#range-'+selectedVariable[k]+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
						'</li>';
						vcount++;
					}
				}
			}

		}
			
		}
	}

	/* load booleanMasterKey */
	/*if(booleanMasterKey.length>0){
		for(var i=0;i<booleanMasterKey.length;i++){
			var keyName = booleanMasterKey[i].key;
			var trimmedString = keyName;
			if(keyName.length > 25){
				trimmedString = keyName.substring(0, 25);
				trimmedString = trimmedString+" ..."
			}

		      s+='<li class="panel">'+
			'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
			'<div id="range-'+booleanMasterKey[i].key+'" class="collapse range-sec">'+
				'<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" >'+
			'</div>'+
		      '</li>';
		}
	}*/

 	if(selectedVariable.length<10){
	    s+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
        }

	document.getElementById("tableId").innerHTML=s;
	rangeSlider();

	/*To reinitializing the popup by calling this function*/
		StickyToolTipFun();	

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
    }
}



function setHashKeyValues(){

	hashflag1=0;
	var checkedInKeysHash = [];
	var prms = $.deparam.fragment();
	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	
	/*If user free version*/
	if(sub_list['plus_plans'].length === 0){
	    if((selectedVariable[0] != "IND_PCA_01" ) || (selectedVariable[1] != "IND_PCA_21" ) 
			|| (selectedVariable[2 ] != "IND_PCA_23"|| (selectedVariable.length > 3) )){
		selectedVariable =['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
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
		loadVariable();
	    }
	}

	vcount=0;
	var filterDataCount = jsonData.length;
	var s = "";
	var name = '';
	var variable = '';
	var variableId = '';

	appliedSelectedVariable = [];
	var kname,kvalue,kmin,kmax,kchecked;
	//s+='<button type="button" class="btn btn-primary btn-apply" data-toggle="button" onclick="onViewMyVariable()" >Apply</button>';
	if(masterKey.length>0){
		checkedInKeysHash = [];
		for(var k=0;k<selectedVariable.length;k++){
		    var selectedvariablePushed = 1;	
		    for(var v=0; v < variableCategory.length; v++ ){
			if(variableCategory[v]._source['key'] == selectedVariable[k]){
			    variable = variableCategory[v]._source['title'];
			    variableId = variableCategory[v]._source['key'];
			
			    appliedSelectedVariable.push(selectedVariable[k]);
			    appliedSelectedVariable = _.uniq(appliedSelectedVariable);

			    for(var i = 0; i < masterKey.length; i++) {
				if(masterKey[i]['key'] == variableId){
					selectedvariablePushed =0;

					if(masterKey[i].key == selectedVariable[k]){
						checkedInKeysHash.push(selectedVariable[k]);
						var key = "key_"+i;
						var keyvalue = "key_"+i+"val";
						kname = prms[key];
						kvalue = JSON.parse("["+prms[keyvalue]+"]");

						var minval = Math.floor(masterKey[i].minval * 10) / 10;
						var maxval = Math.ceil(masterKey[i].maxval * 10) / 10;
						var keychecked = "key_"+i+"checked";
						var sliderstep=0;
						if(minval != maxval){
							/* minval */
							if (minval>= 10 && minval< 100) {
							    minval= (Math.floor(minval/10)*10);
							}
							if (minval>= 100 && minval< 10000) {
							    minval= (Math.floor(minval/100)*100);
							}
							if (minval>= 10000) {
							    minval= (Math.floor(minval/1000)*1000);
							}
							/* maxval */
							if (maxval>= 10 && maxval< 100) {
							    maxval= (Math.ceil(maxval/10)*10);
							}
							if (maxval>= 100 && maxval< 10000) {
							    maxval= (Math.ceil(maxval/100)*100);
							}
							if (maxval>= 10000) {
							    maxval= (Math.ceil(maxval/1000)*1000);
							}
							sliderstep = (maxval-(minval))/10;
						}
			
						if(maxval%1 != 0 || minval%1 != 0){
							sliderstep = sliderstep.toFixed(2);
						}else{
							if (sliderstep>= 100 && sliderstep< 10000) {
						    		sliderstep= (Math.ceil(sliderstep/100)*100);
							}
							if (sliderstep>=10000) {
						    		sliderstep= (Math.ceil(sliderstep/1000)*1000);
							}
						}

						var keyLabel = variable.replace(/_/g,' ');
						var keyName = keyLabel.toTitleCase();
						var trimmedString = keyName;

						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ..."
						}
		
						if(prms[keychecked] == "true"){
							/*s+='<li class="panel" >'+
							'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
							'<div id="range-'+masterKey[i].key+'" class="collapse in range-sec">'+
							   '<p class="range-val" id="'+masterKey[i].key+'-val"><span class="min-val">'+kvalue[0]+'</span><span class="max-val">'+kvalue[1]+'</span></p>';
							s+='<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"></input>';
							s+='</div>'+
							'</li>';*/

						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
							'<div id="range-'+masterKey[i].key+'" class="collapse in range-sec">'+
							  '<p class="range-val" id="'+masterKey[i].key+'-val">'+
							    '<input type="text" value="'+kvalue[0]+'" class="min-val">'+
							    '<input type="text" value="'+kvalue[1]+'" class="max-val">'+
							  '</p>'+
							  '<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+kvalue[0]+','+kvalue[1]+']"/>'+
							'</div>'+
						      '</li>';

						}else{
							/*s+='<li class="panel" >'+
							'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="collapsed"  >'+trimmedString+'</a>'+
							'<div id="range-'+masterKey[i].key+'" class="collapse range-sec">'+
							   '<p class="range-val" id="'+masterKey[i].key+'-val"><span class="min-val">'+minval+'</span><span class="max-val">'+maxval+'</span></p>';
							s+='<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"></input>';
							s+='</div>'+
							'</li>';*/

						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+masterKey[i].key+'_collapse" data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" data-target="#range-'+masterKey[i].key+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
							'<div id="range-'+masterKey[i].key+'" class="collapse range-sec">'+
							  '<p class="range-val" id="'+masterKey[i].key+'-val">'+
							    '<input type="text" value="'+minval+'" class="min-val">'+
							    '<input type="text" value="'+maxval+'" class="max-val">'+
							  '</p>'+
							  '<input id="'+variableId+'" type="text" class="range" value="" data-slider-min="'+minval+'" data-slider-max="'+maxval+'" data-slider-step="'+sliderstep+'" data-slider-value="['+minval+','+maxval+']"/>'+
							'</div>'+
						      '</li>';
						}

						vcount++;
				}
				
			    }
			}
	   	    }
		}
		if(selectedvariablePushed == 1){
			if(booleanMasterKey.length>0){
				for(var i=0;i<booleanMasterKey.length;i++){
					if(booleanMasterKey[i].key == selectedVariable[k] ){
						var keyLabel = variable.replace(/_/g,' ');
						var keyName = keyLabel.toTitleCase();
						var trimmedString = keyName;
						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ..."
						}
						var keychecked = "boolean_key_"+booleanMasterKey[i].key+"_checked";
						var keycheckedvalue = "boolean_key_"+booleanMasterKey[i].key+"_val";

						if(prms[keychecked] == "true"){

						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
							'<div id="range-'+booleanMasterKey[i].key+'" class="collapse in range-sec">';
							if(prms[keycheckedvalue] == "true"){
								s+='<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" checked>';
							}else{
								s+='<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox">';
							}
							s+='</div>'+
						      '</li>';
						}else{
						      s+='<li class="panel">'+
							'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
							'<div id="range-'+booleanMasterKey[i].key+'" class="collapse range-sec">'+
								'<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" >'+
							'</div>'+
						      '</li>';
						}
					}else{
						var keyLabel = variable.replace(/_/g,' ');
						var keyName = keyLabel.toTitleCase();
						var trimmedString = keyName;
						if(keyName.length > 25){
							trimmedString = keyName.substring(0, 25);
							trimmedString = trimmedString+" ...";
						}
						checkedInKeysHash.push(selectedVariable[k]);
						s+='<li class="panel" >'+
						'<a data-tooltip="list-item-'+selectedVariable[k]+'" data-tooltip2="st-arrow" style='+"'color:#C0C0C0 ;disable:true;'"+' id="'+selectedVariable[k]+'_collapse" data-target="#range-'+selectedVariable[k]+'" data-parent="#accordion" class="collapsed" >'+trimmedString+'</a>'+
						'</li>';
						vcount++;
					}
				}
			}

		}
	    }
	}
	
	/* load booleanMasterKey */
	/*if(booleanMasterKey.length>0){
		for(var i=0;i<booleanMasterKey.length;i++){
			var keyName = booleanMasterKey[i].key;
			var trimmedString = keyName;
			if(keyName.length > 25){
				trimmedString = keyName.substring(0, 25);
				trimmedString = trimmedString+" ..."
			}
			var keychecked = "boolean_key_"+booleanMasterKey[i].key+"_checked";
			var keycheckedvalue = "boolean_key_"+booleanMasterKey[i].key+"_val";


		if(prms[keychecked] == "true"){
		      s+='<li class="panel">'+
			'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="">'+trimmedString+'</a>'+
			'<div id="range-'+booleanMasterKey[i].key+'" class="collapse in range-sec">';
			if(prms[keycheckedvalue] == "true"){
				s+='<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" checked>';
			}else{
				s+='<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox">';
			}
			s+='</div>'+
		      '</li>';
		}else{
		      s+='<li class="panel">'+
			'<a data-toggle="collapse" id="'+booleanMasterKey[i].key+'_collapse" data-target="#range-'+booleanMasterKey[i].key+'" data-parent="#accordion" class="collapsed">'+trimmedString+'</a>'+
			'<div id="range-'+booleanMasterKey[i].key+'" class="collapse range-sec">'+
				'<input type="checkbox" id="id_'+booleanMasterKey[i].key+'" name="my-checkbox" >'+
			'</div>'+
		      '</li>';
		}

		}

	}*/

	if(selectedVariable.length<10){
		s+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
	}

	document.getElementById("tableId").innerHTML=s;
	//document.getElementById("page-title-active-filter").innerHTML= filterDataCount+" locations found.";
	document.getElementById("page-title-active-filter").innerHTML= "Loading data ...";

	/*To reinitializing the popup by calling this function*/
	StickyToolTipFun();
	rangeSlider();
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

	document.getElementById("workbookcheck").checked=false;


	if (level0Val == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   hashflag1 = 0;
	   return false;
	}
	if (level1Val == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   hashflag1 = 0;
	   return false;
	}

	/*if(document.getElementById('mylocationsid')){
		if(document.getElementById('mylocationsid').checked == false){
			if(levelType == "village" || levelType == "village_town"){
			   if(level2Val == 0){
			      bootbox.alert("A District must be selected for this operation. Please select a District.");
			      hashflag1 = 0;
			      return false;
			   }
			}
		}
	}else{
		if(levelType == "village" || levelType == "village_town"){
		   if(level2Val == 0){
		      bootbox.alert("A District must be selected for this operation. Please select a District.");
		      hashflag1 = 0;
		      return false;
		   }
		}

	}*/

	if(levelType == "village" || levelType == "village_town"){
	   if(level2Val == 0){
	      bootbox.alert("A District must be selected for this operation. Please select a District.");
	      hashflag1 = 0;
	      return false;
	   }
	}

	
	if (levelVal == 0) {
	   bootbox.alert("Level must be selected for this operation. Please select a Level.");
	   return false;
	}

	if(levelsData[level0Val]["level"+levelVal.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelVal.split(".")[0]+""][levelVal.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelVal+""].toLowerCase();
	}

	
	
	/*added to mybuilds*/
	var query="", query_ec="";

	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	for(var i=0;i<masterKey.length;i++){
	    for(var v=0; v<variableCategory.length; v++ ){
		if(variableCategory[v]._source['title']){
	  	if(masterKey[i]['key'].toLowerCase().replace('_',' ') == variableCategory[v]._source['title'].toLowerCase()){
		    var variableId = variableCategory[v]._source['key'];
		    if($("#"+variableId+"_collapse").hasClass("") == true){
			var val = $("#"+variableId).slider("getValue");
			query += ",{key%20eq%20"+variableId+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
	 	    }
	  	}
		}
	    }	
	}
	/*dANI*/
	for(var i=0;i<selectedVariable.length;i++){
		var param_name = selectedVariable[i].replace('~', '-');		
		var name = selectedVariable[i].split('-');
		var ckVal = selectedVariable[i].split('_');
		var variable_new ="";
		if($("#"+param_name+"_collapse").hasClass("") == true){

		   if($("#"+param_name).attr('type') == 'text'){
			   var val = $("#"+param_name).slider("getValue");
			   if(ckVal[1]!=="EC"){	
			      query+= ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
			   }else{
			      query_ec+= ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
			   }
		   }
	
	 	}
	}

	var mysphere_url;
	query = query.substring(1);
	if(level2Val !=0){
		url="/app/scisphere/places/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
		mysphere_url="/app/mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedmyvariables="+JSON.stringify(selectedMyVariable)+"";
	}else{
		url="/app/scisphere/places/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";//+"";
		mysphere_url="/app/mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedmyvariables="+JSON.stringify(selectedMyVariable)+"";
	}

	//Queue Function
	queue().defer(hashFunction);
	setTimeout(viewWithOutHashChange, 100);
	
	function hashFunction(){

		pathname1 = window.location.pathname;
		var prms1 = $.deparam.fragment();
		var level0Val = document.getElementById('level0Id').value;
		var level1Val = document.getElementById('level1Id').value;
		var level2Val = document.getElementById('level2Id').value;
		var yearVal = document.getElementById('yearId').value;
		var levelVal = document.getElementById('levelId').value;

		if(level2Val!=0){
			prms = {level0:level0Val, level1:level1Val,level2:level2Val, level:levelVal, year:yearVal};//,selected: selectedid }
		}else{
			prms = {level0:level0Val, level1:level1Val, level2:level2Val, level:levelVal, year:yearVal};//,selected: selectedid }
		}
		// bbq
		masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
		
		for(var k=0;k<selectedVariable.length;k++){
		    for(var v=0; v < variableCategory.length; v++ ){
			var variableId = variableCategory[v]._source['key'];
			if(selectedVariable[k] == variableId){
			    for(var i=0;i<masterKey.length;i++){   
				var variable = variableCategory[v]._source['title'];
				var name = selectedVariable[k].split('-');
				if(masterKey[i].key == variableId){
			  	    var val;
				    if($("#"+variableId+"_collapse").hasClass("") == true){
					if($("#"+variableId).attr('type') == 'text'){
					   val = $("#"+variableId).slider("getValue");
					   val = val[0]+","+val[1];
					}
				    }else{
					val = masterKey[i].minval+","+masterKey[i].maxval;
			   	    }	
				    prms["key_"+i] = variableId;
				    prms["key_"+i+"val"] = val;
				    prms["key_"+i+"checked"] = $("#"+variableId+"_collapse").hasClass("");
				    if($("#"+variableId+"_collapse").hasClass("") == true){
					checkedFlag=1;
				    }
				}
			    }
			}
		    }
		}

		//layers add on Filter data if radio button on layer is selected
		//added
		prms["selectedvariables"]= selectedVariable.toString();
		
		var mylocation_checked='';
		if(document.getElementById('mylocationsid')){
			mylocation_checked = document.getElementById('mylocationsid').checked;
		}
		//prms = {mylocation_checked:mylocation_checked};
		prms['mylocation_checked']= mylocation_checked;
		prms['workbook_checked']= document.getElementById('workbookcheck').checked;
		prms['workbook_name']= "";
		prms["selectedmyvariables"]= selectedMyVariable.toString();

		if(myVarMasterKey){
			for(var i=0;i<selectedMyVariable.length;i++){
				for(var j=0;j<myVarMasterKey.length;j++){
					if(selectedMyVariable[i].toLowerCase() == myVarMasterKey[j].key.toLowerCase()){ 
						var val;
						if($("#"+myVarMasterKey[j].key+"_collapse").hasClass("") == true){
						val = $("#"+myVarMasterKey[j].key).slider("getValue");
						val = val[0]+","+val[1];
						}else{
						val = myVarMasterKey[j].minval+","+myVarMasterKey[j].maxval;
						}	
						prms["myvar_key_"+myVarMasterKey[j].key] = myVarMasterKey[j].key;
						prms["myvar_key_"+myVarMasterKey[j].key+"_val"] = val;
						prms["myvar_key_"+myVarMasterKey[j].key+"_checked"] = $("#"+myVarMasterKey[j].key+"_collapse").hasClass("");
						if($("#"+myVarMasterKey[j].key+"_collapse").hasClass("") == true){
							checkedFlag=1;
						}
					}
				}
			}
		}
		
		if(booleanMasterKey.length > 0){
		for(var b=0;b<booleanMasterKey.length;b++){
			prms["boolean_key_"+booleanMasterKey[b].key] = booleanMasterKey[b].key;
			prms["boolean_key_"+booleanMasterKey[b].key+"_checked"] = $("#"+booleanMasterKey[b].key+"_collapse").hasClass("");
			if(document.getElementById("id_"+booleanMasterKey[b].key)){
			if(document.getElementById("id_"+booleanMasterKey[b].key).checked){
				prms["boolean_key_"+booleanMasterKey[b].key+"_val"] = true;
			}else{
				prms["boolean_key_"+booleanMasterKey[b].key+"_val"] = false;
			}
			}
		}
		}
	
		
		if(document.getElementById('mylocationsid')){
			if(document.getElementById('mylocationsid').checked == true){
			   checkedFlag=1;
			}
		}

		if (checkedFlag == 0) {
		   hashflag1 = 0; 
		   bootbox.alert("You must select a variable by which you want to filter. To do this click on a variable, move the slider to your range of interest and click Apply.");
		   return false;
		}

		var r = $.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}

	
	
	function viewWithOutHashChange(){
		hashNum = 0;
		if(hashflag1 == 1){
			onViewData();
		}
	}
}


function onViewMyVariable(){
	onView();
	// bbq
	/*pathname1 = window.location.pathname;
	var prmsDt = $.deparam.fragment();
	var mylocation_checked='';
	if(document.getElementById('mylocationsid')){
		mylocation_checked = document.getElementById('mylocationsid').checked
	}
	prms = {mylocation_checked:mylocation_checked};
	prms["selectedmyvariables"]= selectedMyVariable.toString();

	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var level2Val = document.getElementById('level2Id').value;
	var yearVal = document.getElementById('yearId').value;
	var levelVal = document.getElementById('levelId').value;

	if(level2Val!=0){
		prms = {level0:level0Val, level1:level1Val,level2:level2Val, level:levelVal, year:yearVal};//,selected: selectedid }
	}else{
		prms = {level0:level0Val, level1:level1Val, level:levelVal, year:yearVal};//,selected: selectedid }
	}	

	if(myVarMasterKey){
		for(var i=0;i<selectedMyVariable.length;i++){
		for(var j=0;j<myVarMasterKey.length;j++){
			if(selectedMyVariable[i].toLowerCase() == myVarMasterKey[j].key.toLowerCase()){ 
				var val;
				if($("#"+myVarMasterKey[j].key+"_collapse").hasClass("") == true){
				val = $("#"+myVarMasterKey[j].key).slider("getValue");
				val = val[0]+","+val[1];
				}else{
				val = myVarMasterKey[j].minval+","+myVarMasterKey[j].maxval;
				}	
				prms["myvar_key_"+j] = myVarMasterKey[j].key;
				prms["myvar_key_"+j+"_val"] = val;
				prms["myvar_key_"+j+"_checked"] = $("#"+myVarMasterKey[j].key+"_collapse").hasClass("");
			}
		}
		}
	}

	var r = $.param.fragment(pathname1 ,prms, 2 );
	$.bbq.pushState(r);*/
	// bbq

	/*if (document.getElementById('mylocationsid').checked == false) {
	   bootbox.alert("Please check my locations.");
	   return false;
	}*/	
	//onViewData();
}


//filter data query
function onViewData(){
	removeLayer();
	/*if(document.getElementById("workbookcheck")){
		document.getElementById("workbookcheck").checked = false;
	}*/
	//document.getElementById("workbookcheck").checked = false;

	hashflag=1;
	var level0Val = document.getElementById('level0Id').value;
	var level1Val = document.getElementById('level1Id').value;
	var level2Val = document.getElementById('level2Id').value;
	var levelVal = document.getElementById('levelId').value;
	var yearVal = document.getElementById('yearId').value;
	var query="", query_ec="";
	//levelVal = levelVal.charAt(0);
	/**/
	var levelid = document.getElementById("levelId").value;
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelType = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
        	levelType = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	/**/

	masterKey.sort(function(a,b) { return d3.ascending(a.key.toLowerCase(),b.key.toLowerCase()); });
	for(var i=0;i<selectedVariable.length;i++){
		var param_name = selectedVariable[i].replace('~', '-');		
		var name = selectedVariable[i].split('_');
		var variable_new ="";
		
		if(name[1] == 'EC'){
			if($("#"+param_name+"_collapse").hasClass("") == true){
			   var val = $("#"+param_name).slider("getValue");
			   query_ec += ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		 	}
		} else {
			if($("#"+param_name+"_collapse").hasClass("") == true){
			
			   if($("#"+param_name).attr('type') == 'text'){
				var val = $("#"+param_name).slider("getValue");
			   	query+= ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
			   }else{
				var checked = document.getElementById("id_"+selectedVariable[i]).checked;  
				query += ",{key%20eq%20"+selectedVariable[i]+"$year%20eq%20"+yearVal+"$value%20btw%20"+checked+"}";
			   }
			   
		 	}


		
		}
	}

	myVar_query = '';
	for(var i=0;i<selectedMyVariable.length;i++){
		var param_name = selectedMyVariable[i];		
		var name = selectedMyVariable[i];
		var variable_new ="";
		
		if($("#"+param_name+"_collapse").hasClass("") == true){
		   var val = $("#"+param_name).slider("getValue");
		   myVar_query+= ",{key%20eq%20"+param_name+"$year%20eq%20"+yearVal+"$value%20btw%20"+val[0]+"~"+val[1]+"}";
		
		}
	}

	var mysphere_url,mysphere_url_list;
	query = query.substring(1);
	var templateName="";
	var mylocation="";
	var mylocationcheck=false;
	if(document.getElementById('mylocationsid')){
		templateName = document.getElementById('myVariableTempId').value;
		if(document.getElementById('mylocationsid').checked == true){
		   mylocationcheck = document.getElementById('mylocationsid').checked;
		   mylocation = orgid;
		}
	}

        //filterDataLoad(url);
        /**/
        var selectedVariableWithRanges = [];
        for(var i=0;i<selectedVariable.length;i++){
                var param_name = selectedVariable[i].replace('~', '-');
                if($("#"+param_name+"_collapse").hasClass("") == true){
                   selectedVariableWithRanges.push(selectedVariable[i]);
                };
        }
	var banked="None";

	if(booleanMasterKey.length>0){
		for(var i=0;i<booleanMasterKey.length;i++){
			if($("#"+booleanMasterKey[i].key+"_collapse").hasClass("") == true){
				if(document.getElementById("id_"+booleanMasterKey[i].key).checked){
					banked=true;
				}else{
					banked=false;
				}
			}else{	banked="None"; }
		}
	}

        mylocation = orgid;
	if(level2Val !=0){
		url="/app/scisphere/places/"+level1Val+"?mylocation="+mylocation+"&mylocationcheck="+mylocationcheck+"&templateName="+templateName+"&filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal.charAt(0)+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariableWithRanges)+"&selectedMyvariables="+JSON.stringify(selectedMyVariable)+"&banked="+banked;
		mysphere_url="/app/mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
		mysphere_url_list="/app/mysphere_mybuilds_for_filters/"+level1Val+"?mylocation="+mylocation+"&mylocationcheck="+mylocationcheck+"&myVariableQ=("+myVar_query+")&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"&filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&level2="+level2Val+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}else{
		url="/app/scisphere/places/"+level1Val+"?mylocation="+mylocation+"&mylocationcheck="+mylocationcheck+"&templateName="+templateName+"&filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal.charAt(0)+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariableWithRanges)+"&selectedMyvariables="+JSON.stringify(selectedMyVariable)+"&banked="+banked;
		mysphere_url ="/app/mysphere_mybuilds_for_filters/"+level1Val+"?filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
		mysphere_url_list ="/app/mysphere_mybuilds_for_filters/"+level1Val+"?mylocation="+mylocation+"&mylocationcheck="+mylocationcheck+"&myVariableQ=("+myVar_query+")&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"&filter=("+query+")&ec=("+query_ec+")&level0="+level0Val+"&level="+levelVal+"&leveltype="+levelType.toUpperCase()+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	}

	/*var data_arr ={}; 
	for(var i=0;i<selectedVariableWithRanges.length;i++){
	    for(var j=0;j<variableCategory.length;j++){
		if(selectedVariableWithRanges[i] == variableCategory[j]._source['key']){
		    //var data_arr = {};
	    	    //data_arr[''+variableCategory[j]._source['index_id']+''] ==
		    var val = $("#"+selectedVariableWithRanges[i]).slider("getValue");
		    if(data_arr[variableCategory[j]._source['index_id']]){
			var arr = {};
			arr[variableCategory[j]._source['key']] = { 'min': val[0] , 'max': val[1]};
			data_arr[variableCategory[j]._source['index_id']].push(arr);
		    }else{
			var arr = {};
			arr[variableCategory[j]._source['key']] = { 'min': val[0] , 'max': val[1] };
			data_arr[variableCategory[j]._source['index_id']] = [ arr];
		    }
		}		
	    }
	}*/

	var data_arr ={}; 
	for(var i=0;i<selectedVariableWithRanges.length;i++){
	    for(var j=0;j<variableCategory.length;j++){
		if(selectedVariableWithRanges[i] == variableCategory[j]._source['key']){
		    if($("#"+selectedVariableWithRanges[i]).attr('type') == 'text'){
			    var val = $("#"+selectedVariableWithRanges[i]).slider("getValue");
			    if(data_arr["keys"]){
				var arr = {};
				arr[variableCategory[j]._source['key'].toLowerCase()] = { 'min': val[0] , 'max': val[1]};
				data_arr["keys"].push(arr);
			    }else{
				var arr = {};
				arr[variableCategory[j]._source['key'].toLowerCase()] = { 'min': val[0] , 'max': val[1] };
				data_arr["keys"] = [ arr];
			    }
		    }
		}		
	    }
	}

	//var data_arr ={"mylocation":[]}; 
	//data_arr["mylocation"] = [];

	/*for(var i=0;i<myVarMasterKey.length; i++ ){
	    if(($.inArray(myVarMasterKey[i].key, selectedMyVariable) != -1)){
		if($("#"+myVarMasterKey[i].key+"_collapse").hasClass("") == true){
    		    var val = $("#"+myVarMasterKey[i].key).slider("getValue");
		    var arr = {};
		    arr[myVarMasterKey[i].key] = { 'min': val[0] , 'max': val[1] };
		    if(data_arr["mylocation"]){
			data_arr["mylocation"].push(arr);	
		    } else {	
			data_arr["mylocation"] = [arr];	
		    }
		}
	    }
	}*/

	var newArr = [];
	var newArrObj = {};
	for(var i=0;i<selectedMyVariable.length; i++ ){
		if($("#"+selectedMyVariable[i]+"_collapse").hasClass("") == true){
			if(selectedMyVariable[i] != "IND_MV_01" && selectedMyVariable[i] != "IND_MV_02"){
		    		var val = $("#"+selectedMyVariable[i]).slider("getValue");
				var obj = {};
				var objNew = {};
				checkedFlag=1;

				objNew[selectedMyVariable[i]] = { 'min': val[0] , 'max': val[1] };
				if(data_arr["keys"]){
					data_arr["keys"].push(objNew);
				}else{
					data_arr["keys"] = [ objNew];
				}
			}
			if(selectedMyVariable[i] == "IND_MV_01" || selectedMyVariable[i] == "IND_MV_02"){
				var arr = {};
				var val = $("#"+selectedMyVariable[i]).slider("getValue");
				arr[selectedMyVariable[i].toLowerCase()] = { 'min': val[0] , 'max': val[1] };
				//data_arr["model25"] = [ arr];
				
				if(data_arr["keys"]){
					data_arr["keys"].push(arr);
				}else{
					data_arr["keys"] = [ arr];
				}
			}
		}
	}

	/*for(var i=0;i<selectedMyVariable.length; i++ ){
		if($("#"+selectedMyVariable[i]+"_collapse").hasClass("") == true){
			if(myVariablesKeyTempName[selectedMyVariable[i]]){
				for(var k=0;k<myTemplateForm.length;k++){
					if(myVariablesKeyTempName[selectedMyVariable[i]] == myTemplateForm[k].mytemplate_name){
						if(selectedMyVariable[i] != "IND_MV_01"){
						if(myTemplateForm[k].uploaded_date){
					    		var val = $("#"+selectedMyVariable[i]).slider("getValue");
							var obj = {};
							var objNew = {};
							checkedFlag=1;

							objNew[selectedMyVariable[i]] = { 'min': val[0] , 'max': val[1] };
							obj['ranges'] = objNew;
							obj['uploaded_date'] = myTemplateForm[k].uploaded_date;
							if(newArrObj[myTemplateForm[k].mytemplate_id]){
								newArrObj[myTemplateForm[k].mytemplate_id]['ranges'][selectedMyVariable[i]] = { 'min': val[0] , 'max': val[1] };
							}else{
								newArrObj[myTemplateForm[k].mytemplate_id] = obj;
							}
						}
						}
						if(selectedMyVariable[i] == "IND_MV_01"){
							var arr = {};
							var val = $("#"+selectedMyVariable[i]).slider("getValue");
							arr[selectedMyVariable[i]] = { 'min': val[0] , 'max': val[1] };
							data_arr["model25"] = [ arr];
						}
					}	
				}			
			}			
		}
	}*/



	if(Object.keys(newArrObj).length > 0){
		data_arr["mylocation"] = [newArrObj];
	}
	

	if(levelVal < 4) {
		d3.json("/static/region_explorer/TOPO/"+level0Val+"_"+level1Val+"_"+levelVal+"_2011_"+levelType+"_topo.json", function(error,topojson_geo) {
			topo = topojson.feature(topojson_geo, topojson_geo.objects.levels); 
			//filterDataLoad(url);
			$.ajax({
			    url: url,
			    type: 'post',
			    dataType: 'json',
			    success: function (data) {
				filterDataLoadAjax(data);
			    },
			    data: JSON.stringify(data_arr)
			});

		});
	}else{
		d3.json("/static/region_explorer/TOPO/"+level0Val+"_"+level1Val+"_2_2011_district_topo.json", function(error,topojson_geo) {
			topo = topojson.feature(topojson_geo, topojson_geo.objects.levels); 
			//filterDataLoad(url);
			$.ajax({
			    url: url,
			    type: 'post',
			    dataType: 'json',
			    success: function (data) {
				filterDataLoadAjax(data);
			    },
			    data: JSON.stringify(data_arr)
			});

		});
	}
	/**/

	d3.json(mysphere_url_list,function(data){ //selectedVariable
	});
}

var arr4SameLatLng={};
var arr4SameLatLngCount={};
var keyNameArr=[];
var geoLatLongArr=[];
/*Flag for map marker popup*/
var myVarData = 0;
function filterDataLoadAjax(data1){
		//document.getElementById("show_workbook").checked = true;
		keyNameArr=[];
		if(data1){
			if(data1['count']){
				if(data1['count'] > 1000){
					bootbox.alert("<b>warning!</b> : The result exceeds 1000. Please refine the search criteria to reduce result size.");
					document.getElementById("page-title-active-filter").innerHTML= "";
					return false;
				}
			}
			if(data1['1001']){
				sessionClose(data1['1001']);
				return false;
			}
			if(data1['subscription']){
				bootbox.alert(data1['subscription']);
				document.getElementById("page-title-active-filter").innerHTML= "No locations found.";
				document.getElementById("gridId").innerHTML= "No locations found.";
				jsonData=[];
				dataLoad();
				return false;
			}
		}
		myVarData = 0;	
		//data = JSON.parse(data);
		var data;
		if(data1){
			data = data1.result;
		}else{
			data = '';
		}

		jsonData=[]; 
		arr4SameLatLng={};
		arr4SameLatLngCount={}; 
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
			level1Label = level1Label.toTitleCase();
			level2Label = level2Label.toTitleCase();
			level3Label = level3Label.toTitleCase();
		   }
		}

		var levelval = document.getElementById('levelId').value;
		levelval = levelval.charAt(0);

		if(data.length && (data !='No Result Found')){
			data = data.sort(function(a,b) { return a.latitude - b.latitude; });
			if(levelval == 4){
				geoLatLongArr=[];
				for(var j = 0;j<data.length; j++){
					var arr={};
					var parameter = _.omit(data[j], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','latitude','longitude','geolocation']);

					for(var variable in parameter){
						/*for(var v=0; v<variableCategory.length; v++ ){
							if(variableCategory[v]._source['key']){
							if(variable.toLowerCase() == variableCategory[v]._source['key'].toLowerCase()){
								arr[variableCategory[v]._source['title']] = data[j][variable];
								keyNameArr.push(variableCategory[v]._source['title']);
							}
							}
						}*/
						if(($.inArray(variable.toUpperCase(), selectedVariable) != -1)){
							if(variablesKey[variable.toLowerCase()]){
								arr[variablesKey[variable.toLowerCase()]] = data[j][variable];
								keyNameArr.push(variablesKey[variable.toLowerCase()]);
							}
						}						
						if(($.inArray(variable, selectedMyVariable) != -1)){
							if(myVariablesKey[variable.toLowerCase()]){
								arr[myVariablesKey[variable.toLowerCase()]] = data[j][variable];
								keyNameArr.push(myVariablesKey[variable.toLowerCase()]);
							}
						}
					}
					arr["SNo"] = j+1;
					arr[level1Label] = data[j].name_1;
					arr[level2Label] = data[j].name_2;
					arr[level3Label] = data[j].name_3;
					arr[levelType] = data[j].name_4;
					arr["id_2"] = data[j].id_2;
					arr["id_3"] = data[j].id_3;
					arr["id_4"] = data[j].id_4;
					arr['latitude'] = data[j].latitude;
					arr['longitude'] = data[j].longitude;
					jsonData.push(arr);
					geoLatLongArr.push([parseFloat(data[j].latitude),parseFloat(data[j].longitude)]);
				}
				//gridData(jsonData,level2Label,levelType);
			}else if(levelval == 3){
				for(var j = 0;j<data.length; j++){
					var arr={};
					var parameter = _.omit(data[j], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','latitude','longitude','geolocation']);
					for(var variable in parameter){
						/*for(var v=0; v<variableCategory.length; v++ ){
							if(variableCategory[v]._source['key']){
							if(variable.toLowerCase() == variableCategory[v]._source['key'].toLowerCase()){
								arr[variableCategory[v]._source['title']] = data[j][variable];
								keyNameArr.push(variableCategory[v]._source['title']);
							}
							}
						}*/
						if(($.inArray(variable.toUpperCase(), selectedVariable) != -1)){
							if(variablesKey[variable.toLowerCase()]){
								arr[variablesKey[variable.toLowerCase()]] = data[j][variable];
								keyNameArr.push(variablesKey[variable.toLowerCase()]);
							}
						}
						if(($.inArray(variable, selectedMyVariable) != -1)){
							if(myVariablesKey[variable.toLowerCase()]){
								arr[myVariablesKey[variable.toLowerCase()]] = data[j][variable];
								keyNameArr.push(myVariablesKey[variable.toLowerCase()]);
							}
						}
					}
					//arr["SNo"] = j+1;
					arr[level1Label] = data[j].name_1;
					arr[level2Label] = data[j].name_2;
					arr[level3Label] = data[j].name_3;
					arr["id_2"] = data[j].id_2;
					arr["id_3"] = data[j].id_3;
					jsonData.push(arr);
				}
				//gridData(jsonData,level2Label,level3Label);
			}else if(levelval == 2){
				for(var j = 0;j<data.length; j++){
					var arr={};
					var parameter = _.omit(data[j], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','latitude','longitude','geolocation']);
					for(var variable in parameter){
						/*for(var v=0; v<variableCategory.length; v++ ){
							if(variableCategory[v]._source['key']){
							if(variable.toLowerCase() == variableCategory[v]._source['key'].toLowerCase()){
								arr[variableCategory[v]._source['title']] = data[j][variable];
								keyNameArr.push(variableCategory[v]._source['title']);
							}
							}
						}*/
						if(($.inArray(variable.toUpperCase(), selectedVariable) != -1)){
							if(variablesKey[variable.toLowerCase()]){
								arr[variablesKey[variable.toLowerCase()]] = data[j][variable];
								keyNameArr.push(variablesKey[variable.toLowerCase()]);
							}
						}
						if(($.inArray(variable, selectedMyVariable) != -1)){
							if(myVariablesKey[variable.toLowerCase()]){
								arr[myVariablesKey[variable.toLowerCase()]] = data[j][variable];
								keyNameArr.push(myVariablesKey[variable.toLowerCase()]);
							}
						}
					}
					//arr["SNo"] = j+1;
					arr[level1Label] = data[j].name_1;
					arr[level2Label] = data[j].name_2;
					arr["id_2"] = data[j].id_2;
					jsonData.push(arr);
				}
				//gridData(jsonData,level2Label,"");
			}

			if(!data[0].id_0){
				jsonData=[];
				var arrObj = [];
				myVarData = 1;
				var arrObj4SameLatLng = [];
				geoLatLongArr=[];
				for(var j = 0;j<data.length; j++){
					geoLatLongArr.push([parseFloat(data[j].latitude),parseFloat(data[j].longitude)]);
					var html ='';
					var parameter = _.omit(data[j], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude','value', 'type','geolocation','State','villagecode_2011']);
					var arr={};
					for(var variable in parameter){
						for(var v=0; v<variableCategory.length; v++ ){
							if(variableCategory[v]._source['key']){
							if(variable.toLowerCase() == variableCategory[v]._source['key'].toLowerCase()){
								arr[variableCategory[v]._source['title']] = data[j][variable];
								keyNameArr.push(variableCategory[v]._source['title']);
							}
							}
						}
						if(myVariablesKey[variable.toLowerCase()]){
							arr[myVariablesKey[variable.toLowerCase()]] = data[j][variable];
							keyNameArr.push(myVariablesKey[variable.toLowerCase()]);
						}
					}
					/*for(var variable in parameter){
						arr[variable] = data[j][variable];
					}*/
					
					var levelId='';
					if(data[j].name_1){arr[level1Label] = data[j].name_1.toTitleCase();}
					if(data[j].name_2){arr[level2Label] = data[j].name_2.toTitleCase(); levelId = 'id_2'}
					if(data[j].name_3){arr[level3Label] = data[j].name_3.toTitleCase();levelType=level3Label; levelId="id_3";}
					if(levelval == 4){
						arr["SNo"] = j+1;
						if(data[j].name_4){arr[levelType] = data[j].name_4.toTitleCase();levelType='Village/Town';}
						if(data[j]['Village/Town']){ arr['Village/Town'] = data[j]['Village/Town'].toTitleCase(); levelType='Village/Town';}
					}
					arr["id_2"] = data[j].id_2;
					arr["id_3"] = data[j].id_3;
					arr["id_4"] = data[j].id_4;
					arr['latitude'] = data[j].latitude;
					arr['longitude'] = data[j].longitude;

					/*arr["id_2"] = data[j].id_2;
					arr["id_3"] = data[j].id_3;
					arr['latitude'] = data[j].latitude;
					arr['longitude'] = data[j].longitude;
					if(data[j]['Village/Town']){
						arr['Village'] = data[j]['Village/Town'];
						arr['Village/Town'] = data[j]['Village/Town'];
						arr['Town'] = data[j]['Village/Town'];
					}
					
					if(data[j].name_1){arr[level1Label] = data[j].name_1.toTitleCase();}
					if(data[j].name_2){arr[level2Label] = data[j].name_2.toTitleCase(); levelId = 'id_2'}
					if(data[j].name_3){arr[level3Label] = data[j].name_3.toTitleCase();levelText=level3Label; levelId="id_3";}
					if(data[j].name_4 ){arr[levelType] = data[j].name_4.toTitleCase(); levelText=levelType;}
					if(data[j]['Village']){arr[levelType] = data[j]['Village'].toTitleCase();levelText=levelType;}
					if(data[j]['Village/Town']){arr[levelType] = data[j]['Village/Town'].toTitleCase();levelText=levelType;}
					if(data[j]['Town'] ){arr[levelType] = data[j]['Town'].toTitleCase(); levelText=levelType;}
					*/

	
					if(arr4SameLatLngCount[data[j].latitude+','+data[j].longitude]){
						arr4SameLatLngCount[data[j].latitude+','+data[j].longitude] = arr4SameLatLngCount[data[j].latitude+','+data[j].longitude] + 1;
					}else{	
						arr4SameLatLngCount[data[j].latitude+','+data[j].longitude] = 1;
					}
					
	
					if(data[j].name_3){
						html +='<div class="divs"  name="marker">' ;
						//html += '<div class="textWrap"><strong> Page </strong>: ' + arr4SameLatLngCount[data[j].latitude+','+data[j].longitude] + '</div>';
						html += '<div role="tabpanel">'
							  //<!-- Nav tabs -->
							  +'<ul class="nav nav-tabs" role="tablist">'
							    +'<li role="presentation" class="active"><a href="#places'+j+'" aria-controls="places" role="tab" data-toggle="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location&nbsp;&nbsp;&nbsp;&nbsp;  </a></li>'
							    +'<li role="presentation"><a href="#selectedVariable'+j+'" aria-controls="selectedVariable" role="tab" data-toggle="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Branch &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a></li>'
							  +'</ul><div style="width:200px"></div>'
							  //<!-- Tab panes -->
							  +'<div class="tab-content">'
							  +'<div role="tabpanel" class="tab-pane active" id="places'+j+'">';

						if(data[j].name_1){
							html += '<div class="textWrap"><strong>' + level1Label + '</strong>: ' + data[j].name_1 + '</div>';
						}if(data[j].name_2){
							html += '<div class="textWrap"><strong>' + level2Label + '</strong>: ' + data[j].name_2 + '</div>';
						}if(data[j].name_3){
							html += '<div class="textWrap"><strong>' + level3Label + '</strong>: ' + data[j].name_3 + '</div>';
						}
						/*if(data[j].name_4){
							html += '<div class="textWrap"><strong>' + 'Name' + '</strong>: ' + data[j].name_4 + '</div>';
						}*/
 						if(data[j]['Village/Town'] ){
							html += '<div class="textWrap"><strong>' + 'Village/Town' + '</strong>: ' + data[j]['Village/Town'] + '</div>';
						}
						if(data[j].Pincode){
							html += '<div class="textWrap"><strong>' + 'Pincode' + '</strong>: ' + data[j].Pincode + '</div>';
						}

						html += '</div><div role="tabpanel" class="tab-pane" id="selectedVariable'+j+'">';	
						parameter = _.omit(data[j], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','Pincode','geolocation','name_4','name_0','Village','State','District','Taluk','idmap70','key','leveltype','collecteddate','value', 'type','tempid','docid','org_id']);//'latitude','longitude',
						/*for(var variable in parameter){
							var varName = variable;
							if(myVariablesKey){
								if(myVariablesKey[variable]){
									varName = myVariablesKey[variable];
								}
							}
							varName = varName.toTitleCase();
							html += '<div class="textWrap"><strong>' + varName + '</strong>: ' + data[j][""+variable+""] + '</div>';				
						}*/
						for(var variable in categories){
							if(data[j][categories[variable]]){
								html += '<div class="textWrap"><strong>' + categories[variable].toTitleCase() + '</strong>: ' + data[j][categories[variable]] + '</div>';			
							}
						}		
						html +='</div>';
						html +='</div>';
						html +='</div>';
						html +='</div>';
					}
			
					if(arr4SameLatLng[data[j].latitude+','+data[j].longitude]){
						arr4SameLatLng[data[j].latitude+','+data[j].longitude] = arr4SameLatLng[data[j].latitude+','+data[j].longitude] +"  "+ html;
					}else{
						arr4SameLatLng[data[j].latitude+','+data[j].longitude] = html;
					}


					/*Find unique values in data recieved*/	
				
					if(levelid < 4){
					    if(( $.inArray(data[j]["id_"+levelid], arrObj) == -1)){	
						if(data[j]["id_"+levelid]){
						    arrObj.push(data[j][levelId]);
						    jsonData.push(arr);
						}
					    }
					}else{
					    jsonData.push(arr);
					}		
				}

				//gridData(jsonData,level2Label,levelType);
			}
			gridData(jsonData,level2Label,level3Label,levelType);
			/**/
		}else{
			jsonData=[];
			gridData(jsonData,"","","");
		}
		flag=0;
		dataLoad();
			
}


var level1Label,level2Label,level3Label,levelType;
// hashchange data load
function hashDataLoad(){
	if(document.getElementById("workbookcheck").checked == true){
		workbookmap();
		//workbookChange();
		hashflag=1;
		setTimeout(function(){
			workbookChange();
		},500);
	}else{
		mapCreator();
		hashflag=1;
	}
}

var districtLength,districtDim,grid,gridDataSelected=[],totalPage=1;
function gridData(jsonData,level2Text,level3Label,levelText){
	var levelId = document.getElementById('levelId').value;
	var level1Id = document.getElementById('level1Id');
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	var filterDataCount = jsonData.length;
	
	if(jsonData.length>0){
		/*if(jsonData[0].latitude){*/
			d3.select('#map-id').attr('class','active');
			d3.select('#grid-id').attr('class','');
			d3.select('#mapview').attr('class','tab-pane active');
			d3.select('#grid').attr('class','tab-pane');
			d3.select('#map').style('display','block');
		/*}else{
			d3.select('#map-id').attr('class','');
			d3.select('#grid-id').attr('class','active');
			d3.select('#grid').attr('class','tab-pane active');
			d3.select('#mapview').attr('class','tab-pane');
			d3.select('#map').style('display','none');
		}*/
	}else{
		bootbox.alert("There is no data available for this selection.");
	}

	var talukDim,taluk;
	var ndx = crossfilter(jsonData);
	var all = ndx.groupAll();

	districtDim = ndx.dimension(function (d) { 
            //return d.name_2;
	    return d[level2Text];
        });
	var dist = districtDim.group(function(t) { return t; });

	/*if(levelId>3){	
		talukDim = ndx.dimension(function (d) { return d.id_3; }); 
		taluk = talukDim.group(function(t) { return t; });
	}*/

	districtLength = dist.top(Infinity);
	districtLength = districtLength.sort(function(a,b) { 
		if(a.key && b.key){
			return d3.ascending(a.key,b.key);
		}
	});

	if(districtLength){
		grid="";
		grid+='<table width="100%" class="table table-hover " id="filter-grid-list">';
		for(var i=0; i<districtLength.length; i++){
			var distData = districtDim.filter(districtLength[i].key).top(Infinity);
			distData = distData.sort(function(a,b) { 
				if(a[levelText] && b[levelText]){
					return d3.ascending(a[levelText],b[levelText]);
				}
			});
			if(levelId > 3 ){ // TOWN and VIllage Level
				grid +='<tr class="grid-list-headerrow">'
					+'<td>'
						+'<label>'
						+'<input type="checkbox" class="popup-cb" id="'+distData[0]["id_2"]+'" onclick="gridDataClick('+"'"+distData[0]["id_2"]+"'"+');">'
						+'&nbsp;'+distData[0][level2Text]+''
						+'</label>'
					+'</td>'
					+'<td></td>'
					+'<td></td>'
					+'<td></td>'
					+'</tr>';
				var ndxTk = crossfilter(distData);
				var allTk = ndxTk.groupAll();
				var talukDim = ndxTk.dimension(function (d) { return d[level3Label]; }); 
				var taluk = talukDim.group(function(t) { return t; });
				var talukLength = taluk.top(Infinity);
				talukLength = talukLength.sort(function(a,b) { 
					if(a.key && b.key){
						return d3.ascending(a.key,b.key);
					}
				});
				
				if(talukLength){
					for(var j=0; j<talukLength.length; j++){
						var townOrVillage = talukDim.filter(talukLength[j].key).top(Infinity);
						townOrVillage = townOrVillage.sort(function(a,b) { 
							if(a[levelText] && b[levelText]){
								return d3.ascending(a[levelText],b[levelText]);
							}
						});
						grid +='<tr class="grid-list-headerrow">'
							+'<td><label style="margin-left: 30px;">'+townOrVillage[0][level3Label]+'</label></td>'
							+'<td></td>'
							+'<td></td>'
							+'<td></td>'
							+'</tr>';
						if(townOrVillage[0][levelText]){
							for(var k=0;k<townOrVillage.length;k+=4){
								grid += '<tr class="grid-list-colrow">';
								grid += '<td>';
								if(townOrVillage[k]){
									grid += townOrVillage[k][levelText];
								}
								grid +='</td>';
								grid += '<td>';
								if(townOrVillage[k+1]){
									grid += townOrVillage[k+1][levelText];
								}
								grid +='</td>';
								grid += '<td>';
								if(townOrVillage[k+2]){
									grid += townOrVillage[k+2][levelText];
								}
								grid +='</td>';
								grid += '<td>';
								if(townOrVillage[k+3]){
									grid += townOrVillage[k+3][levelText];
								}
								grid +='</td>';
								grid += '</tr>';
							}
						}
						talukDim.filterAll();
					}
				}
				
			}else if(levelId == 3){
				grid+='<tr class="grid-list-headerrow"><td><label><input type="checkbox" class="popup-cb" id="'+distData[0]["id_2"]+'" onclick="gridDataClick('+"'"+distData[0]["id_2"]+"'"+');">&nbsp;'+distData[0][level2Text]+'</label></td><td></td><td></td><td></td></tr>';
				if(distData[0][levelText]){
					for(var j=0;j<distData.length;j+=4){
						grid += '<tr class="grid-list-colrow">';
						grid += '<td>';
						if(distData[j]){grid += distData[j][levelText];}
						grid +='</td>';
						grid += '<td>';
						if(distData[j+1]){
							grid += distData[j+1][levelText];
						}
						grid +='</td>';
						grid += '<td>';
						if(distData[j+2]){
							grid += distData[j+2][levelText];
						}
						grid +='</td>';
						grid += '<td>';
						if(distData[j+3]){
							grid += distData[j+3][levelText];
						}
						grid +='</td>';
						grid += '</tr>';
					}
				}
			}else{
				grid+='<tr><td>'+distData[0][level2Text]+'</td><td></td><td></td><td></td></tr>';
			}

			districtDim.filterAll();
		}
		grid+='</table>';
		document.getElementById("gridId").innerHTML= grid;
		document.getElementById("page-title-top-id").innerHTML= level1Name;
		//document.getElementById("page-title-active-filter").innerHTML= filterDataCount+" locations found.";

		if(filterDataCount == 1){
			document.getElementById("page-title-active-filter").innerHTML= filterDataCount+" location found.";
		} else {
			document.getElementById("page-title-active-filter").innerHTML= filterDataCount+" locations found.";
		}		

	}else{
		document.getElementById("gridId").innerHTML= "";
	}
	gridPaginationCall();
}

function gridPaginationCall(){
	$grid_table_rows = $('.popup-area-sec ul');
	var grid_table_row_limit = 4;
	var gridTotalPage = Math.ceil($grid_table_rows.length / grid_table_row_limit);
	if(gridTotalPage==0){
		gridTotalPage=1;
	}
	$('#pg1').jqPagination('option', 'max_page', gridTotalPage);
	$('#pg1').jqPagination('option', 'current_page', 1);
}

function gridPaginationGoTo(){
	var current_page = document.getElementById('pg-grid-goto').value;
	$grid_table_rows = $('.popup-area-sec ul')
	var grid_table_row_limit = 4;
	var gridTotalPage = Math.ceil($grid_table_rows.length / grid_table_row_limit);
	if(gridTotalPage==0){
		gridTotalPage=1;
	}
	if(gridTotalPage >= current_page){
		$('#pg1').jqPagination('option', 'max_page', gridTotalPage);
		$('#pg1').jqPagination('option', 'current_page', current_page);
	}else {
		$('#pg1').jqPagination('option', 'max_page', gridTotalPage);
		$('#pg1').jqPagination('option', 'current_page', gridTotalPage);
	}
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

function onClickMapList(val){
	if(val == 'map'){
		d3.select('#mapview').style('height','500px');
		d3.select('#mapview').style('visibility','visible');
	}else{
		d3.select('#mapview').style('visibility','hidden');
		d3.select('#mapview').style('height','0px');
		d3.select('#mapview').style('display','block');
	}
}

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
			csvData.push(_.pick(jsonData[i], 'SNo',level1Label,level2Label,level3Label,levelType,keyNameArr));
		}
	}

	if(csvData){
		JSONToCSVConvertor(csvData, "", true);
	}
	gridDataSelected=[];
}

function downLoadWorkBookData(){
	var wbData=[];
	/*if(originLatLngArr.length>0){
		var data = _.where(jsonData, {latitude:originLatLngArr[0].lat.toString(),longitude:originLatLngArr[0].lng.toString()});
		if(data.length>0){
			data[0]["distance"]="";
			workbookData.push(data[0]);
		}
	}*/
	if(workbookOrginData.length>0){
		for(i=0;i<workbookOrginData.length;i++){
			wbData.push(_.pick(workbookOrginData[i], 'SNo',level1Label,level2Label,level3Label,levelType,keyNameArr,'distance'));
		}
	}
	if(workbookData.length>0){
		for(i=0;i<workbookData.length;i++){
			wbData.push(_.pick(workbookData[i], 'SNo',level1Label,level2Label,level3Label,levelType,keyNameArr,'distance'));
		}
	}
	if(wbData.length>0){
		JSONToCSVConvertor(wbData, "", true);
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

    var blob = new Blob([CSV], {type: "data:text/csv;charset=utf-8"});

    //Generate a file name
    var level1Id = document.getElementById('level1Id');
    var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
    var fileName = level1Name;
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_"); 
    if(JSONData.length>0){
       if(JSONData[0]){        
               if(JSONData[0].State){
                fileName = JSONData[0].State; 
           }
       }
    }

    saveAs(blob, ""+fileName+".csv");
    /*var byteCharacters = atob(CSV);

    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    //return new Blob(byteArrays, { type: contentType });
	
    	/*
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
    document.body.removeChild(link);*/
}
////

var markers,marker;
var map;var topo = "";
function setStyle(feature) {
	
    for(var i=0;i<jsonData.length;i++){
	    if(!(jsonData[i].id_4)){	
	      if(jsonData[i].id_3){	
		if(jsonData[i].id_3 == feature.id ){
			return { fillColor: "#44B61A", weight: 0.5, opacity: 1, color: '#696D66', dashArray: '3', fillOpacity: 0.7 };
		}
	      }	
	      else if(jsonData[i].id_2){	
		if(jsonData[i].id_2 == feature.id ){
			return { fillColor: "#44B61A",  weight: 0.5, opacity: 1, color: '#696D66', dashArray: '3', fillOpacity: 0.7   };
		}
	      }
	    }
    }
    return {fillColor: "#B8B9B7",weight: 0.5, opacity: 0.3, color: '#696D66', dashArray: '3', fillOpacity: 0.5   };
}


 function eachFeature(feature, layer) {
                layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
}

function highlightFeature(e) {

	d3.select('.info').style('visibility', '');
	d3.select('.info').style('opacity', '1');
	var layer = e.target;

	layer.setStyle({
	    weight: 2,
	    color: '#666',
	    fillOpacity: 0.3,
	    fillColor: 'white',
	});

	if (!L.Browser.ie && !L.Browser.opera) {
	    layer.bringToFront();
	}
	info.update(layer.feature);
}


function resetHighlight(e) {
	d3.select('.info').style('visibility', 'hidden');
	layer.resetStyle(e.target);
	info.update();

}


function onclickWorkBook(){
	document.getElementById("workbook-name-id").value = document.getElementById("workbookLabel").innerHTML;
}


function workbookChange(){
	var prms = $.deparam.fragment();
	var workbookName = prms.workbook_name;
	workbookOrginData=[];
	if(workbookList){
		for(var w=0;w<workbookList.length;w++){
			if(workbookList[w].workbook_name == workbookName){
				document.getElementById("workbookLabel").innerHTML = workbookName;
				$("#saveworkbook2-id").css("display","inline");
				var jsonLocation = workbookList[w].workbook_jsonlocation;
				originLatLngArr = jsonLocation["orignArr"];
				distanceLatLongArr = jsonLocation["distanceArr"];
				labelKeyValue = jsonLocation["keyValueArr"];

				if(originLatLngArr.length>0 && distanceLatLongArr.length>0){
					var ltlg = originLatLngArr[0].lat.toString().replace(".","_")+"_"+originLatLngArr[0].lng.toString().replace(".","_");
					// origin update
					setTimeout(function(){
						if(document.getElementById("idorigin_"+ltlg)){
							document.getElementById("idorigin_"+ltlg).checked = true;
						}
					},100);
					$(".c_"+ltlg).css('color','red');

					// cirle crete 10,20,30 km
					var pointA = new L.LatLng(parseFloat(originLatLngArr[0].lat), parseFloat(originLatLngArr[0].lng));
					circle3 = L.circle(pointA, ( 30 * 1000), { color: 'red', fillOpacity: 0.07 ,fill:false,weight: 2});
					circle2 = L.circle(pointA, ( 20 * 1000), { color: 'green', fillOpacity: 0.07 ,fill:false,weight: 2});
					circle1 = L.circle(pointA, ( 10 * 1000), { color: 'blue', fillOpacity: 0.07 ,fill:false,weight: 2});

					circles.addLayer(circle3);
					circles.addLayer(circle2);
					circles.addLayer(circle1);
					map.addLayer(circles);

					// data push
					var data = _.where(jsonData, {latitude:originLatLngArr[0].lat.toString(),longitude:originLatLngArr[0].lng.toString()});
					if(data.length>0){
						data[0]["distance"]="";
						workbookOrginData.push(data[0]);
					}
					// distance poly line creation
					/*for(var d=0;d<distanceLatLongArr.length;d++){
						var ltlg = distanceLatLongArr[d].lat.toString().replace(".","_")+"_"+distanceLatLongArr[d].lng.toString().replace(".","_");
						polyLineCreation(ltlg,distanceLatLongArr[d]);
					}*/
				
					if(distanceLatLongArr.length>0){
						for(var d=0;d<originLatLngArr.length;d++){
							var pointA = new L.LatLng(parseFloat(originLatLngArr[d].lat), parseFloat(originLatLngArr[d].lng));
							pointA["id_4"]=parseInt(originLatLngArr[d].id_4);
							originLatLngArr[d]=pointA;
						}
						for(var d=0;d<distanceLatLongArr.length;d++){
							var pointA = new L.LatLng(parseFloat(distanceLatLongArr[d].lat), parseFloat(distanceLatLongArr[d].lng));
							pointA["id_4"]=parseInt(distanceLatLongArr[d].id_4);
							distanceLatLongArr[d]=pointA;
						}
						polyLineCreation();
					}
					// label key value update
					var html="";
					if(labelKeyValue){
						for(var key in labelKeyValue){
							html+='<label>'+key+' : </label><label>'+labelKeyValue[key]+'</label>';
						}
					}

					//if(html){
						$(".valInfo").css('display','block');
						valInfo.update(html);
					//}

				}
			break;	
			}
		}
	}
}

function saveWorkBook(val){
	if(document.getElementById('workbook-name-id').value == ""){
	    	bootbox.alert("Workbook name is required.");
		return false;
	}
	if(originLatLngArr.length===0 || distanceLatLongArr.length===0){
		$('.close').click();
	    	bootbox.alert("You have not selected any place.");
		return false;
	}

	var wbName = document.getElementById('workbook-name-id').value;
	if(val == 2){
		wbName=wbName+" New";
	}

	var pathname1 = window.location.pathname;
	var prms = $.deparam.fragment();
	prms["workbook_checked"]=document.getElementById('workbookcheck').checked;
	prms["workbook_name"]=wbName;
	var r = $.param.fragment(pathname1 ,prms, 2 );
	$.bbq.pushState(r);

	var url="/app/mysphere_workbook";
	var dataArr={},dataArr1={};
	dataArr1["orignArr"]=originLatLngArr;
	dataArr1["distanceArr"]=distanceLatLongArr;
	dataArr1["keyValueArr"]=labelKeyValue;

	dataArr["jsonData"]=jsonData;
	dataArr["locationData"]=dataArr1;
	dataArr["wbName"]=wbName;
	dataArr["wbUrl"]=document.URL;


	$.ajax({
	    url: url,
	    type: 'post',
	    dataType: 'json',
	    success: function (data) {
		$('.close').click();
	    	bootbox.alert(data["status"]);
		document.getElementById('workbook-name-id').value = "";
		},
	    error: function(error){
		$('.close').click();
	    	bootbox.alert(data["status"]);
		document.getElementById('workbook-name-id').value = "";
		},
	    data:JSON.stringify(dataArr)
	});
}

function workbookHideShow(){
	if(document.getElementById("hide_workbook").checked == true){
		if(originLatLngArr.length > 0 && distanceLatLongArr.length>0){
			if(jsonData.length>0){
				$(".fa-map-marker").css('display','none');
				for(var i=0;i<originLatLngArr.length;i++){
					var ltlg = originLatLngArr[i]['lat'].toString().replace(".","_")+"_"+originLatLngArr[i]['lng'].toString().replace(".","_");
					$(".c_"+ltlg).css('display','block');
				}
				for(var i=0;i<distanceLatLongArr.length;i++){
					var ltlg = distanceLatLongArr[i]['lat'].toString().replace(".","_")+"_"+distanceLatLongArr[i]['lng'].toString().replace(".","_");
					$(".c_"+ltlg).css('display','block');
				}
			}
		}
	} else if (document.getElementById("show_workbook").checked == true){
		if(jsonData.length>0){
			$(".fa-map-marker").css('display','block');
		}
	} 
}


var originLatLngArr=[];
var workbookData=[];
var workbookOrginData=[];
var circleLineArr=[];
var circle1,circle2,circle3="";
function originClick(lat,lng,id_4){
	workbookData1=[];
	var ltlg = lat.toString().replace(".","_")+"_"+lng.toString().replace(".","_");
	// Reset all data process because origin is unselect.
	if(originLatLngArr.length>0){
		if(originLatLngArr[0]['lat'] == lat && originLatLngArr[0]['lng'] == lng && originLatLngArr[0]['id_4'] == id_4 ){
			if(document.getElementById("idorigin_"+ltlg).checked == false){
				originLatLngArr=[];
				$(".c_"+ltlg).css('color','#2A81CA');
				ployLine.removeLayer(firstpolyline);
				map.removeLayer(ployLine);
				if(distanceLatLongArr.length>0){
					for(var i=0;i<distanceLatLongArr.length;i++){
						var ltlg1 = distanceLatLongArr[i]['lat'].toString().replace(".","_")+"_"+distanceLatLongArr[i]['lng'].toString().replace(".","_");
						$(".c_"+ltlg1).css('color','#2A81CA');
					}
				}
				distanceLatLongArr=[];
				labelKeyValue={};
				valInfo.update();
				
				circles.removeLayer(circle1);
				circles.removeLayer(circle2);
				circles.removeLayer(circle3);
				map.removeLayer(circles);
			}
		}
	}

	// origin point create.
	if(originLatLngArr.length==0){
		if(document.getElementById("idorigin_"+ltlg).checked == true){
			var pointA = new L.LatLng(parseFloat(lat), parseFloat(lng));
			pointA["id_4"]=parseInt(id_4);
			originLatLngArr.push(pointA);
			$(".c_"+ltlg).css('color','red');
			// data push to arr for download options
			var data = _.where(jsonData, {latitude:lat.toString(),longitude:lng.toString()});
			if(data.length>0){
				data[0]["distance"]="";
				workbookOrginData.push(data[0]);
			}
			// cirle crete 10,20,30 km
			circle3 = L.circle(pointA, ( 30 * 1000), { color: 'red', fillOpacity: 0.07 ,fill:false,weight: 2});
			circle2 = L.circle(pointA, ( 20 * 1000), { color: 'green', fillOpacity: 0.07 ,fill:false,weight: 2});
			circle1 = L.circle(pointA, ( 10 * 1000), { color: 'blue', fillOpacity: 0.07 ,fill:false,weight: 2});

			circles.addLayer(circle3);
			circles.addLayer(circle2);
			circles.addLayer(circle1);
			map.addLayer(circles);

			// label update
			/*for(var i=0;i<selectedVariable.length;i++){
				if($("#"+selectedVariable[i]+"_collapse").hasClass("") == true){
					var value = _.where(jsonData, {latitude:lat.toString(),longitude:lng.toString()});
					var keyName = variablesKey[selectedVariable[i].toLowerCase()];
					if(labelKeyValue[keyName]){
						if(value[0][keyName] % 1 === 0){
							labelKeyValue[keyName]=parseInt(labelKeyValue[keyName]) - parseInt(value[0][keyName]);
						}else{
							labelKeyValue[keyName]=parseFloat(labelKeyValue[keyName]) - parseFloat(value[0][keyName]);
							labelKeyValue[keyName]=labelKeyValue[keyName].toFixed(2);
						}
					}else{
						if(value[0][keyName] % 1 === 0){
							labelKeyValue[keyName]=parseInt(value[0][keyName]);
						}else{
							labelKeyValue[keyName]=parseFloat(value[0][keyName]).toFixed(2);
						}				
					}
				}
			}*/

			if($("#IND_PCA_01_collapse").hasClass("") == true){
				var value = _.where(jsonData, {latitude:lat.toString(),longitude:lng.toString()});
				var keyName = variablesKey['ind_pca_01'];
				if(labelKeyValue[keyName]){
					labelKeyValue[keyName]=parseInt(labelKeyValue[keyName]) - parseInt(value[0][keyName]);
				}else{
					labelKeyValue[keyName]=parseInt(value[0][keyName]);
				}
			}
			var html="";
			for(var key in labelKeyValue){
				html+='<label>'+key+' : </label><label>'+labelKeyValue[key]+'</label>';
			}
			//valInfo.update(html);
			//if(html){
				$(".valInfo").css('display','block');
				valInfo.update(html);
			//}

		}else{
			$(".valInfo").css('display','none');
		}
	}
	
	if(originLatLngArr.length>0 && distanceLatLongArr.length>0){
		var pointA = new L.LatLng(parseFloat(lat), parseFloat(lng));
		onClickMarker(pointA);
	}

}


var polyLineArr=[];
var distanceLatLongArr=[];
var firstpolyline="";
var labelKeyValue={};
function onClickMarker(e){
	var id_4="";
	var originLatLng=false;
	var ltlg,latitude,longitude;
	if(e.latlng){
		ltlg = e.latlng.lat.toString().replace(".","_")+"_"+e.latlng.lng.toString().replace(".","_");
		latitude = e.latlng.lat;
		longitude = e.latlng.lng;
	}else if(e.lat){	// this latlong unselect the origin.
		ltlg = e.lat.toString().replace(".","_")+"_"+e.lng.toString().replace(".","_");
		latitude = e.lat;
		longitude = e.lng;
	}
	if(e.target){
		if(e.target.options){
			id_4 = parseInt(e.target.options.id_4);
		}
	}

	// Edit origin marker
	if(originLatLngArr.length>0){
		if(originLatLngArr[0]['lat'] == latitude && originLatLngArr[0]['lng'] == longitude && originLatLngArr[0]['id_4'] == id_4){
			originLatLng=true;
			setTimeout(function(){
				if(document.getElementById("idorigin_"+ltlg)){
					document.getElementById("idorigin_"+ltlg).checked = true;
				}		
			},50);

		}else{
			setTimeout(function(){
				map.closePopup();
			},10);
		}
	}

	var distanceRepeat = _.where(distanceLatLongArr, {lat:latitude,lng:longitude,id_4:parseInt(id_4)});

	// if unselect distance latlong to remove polyline and reset icon color.
	if(distanceRepeat.length>0){
		var myArray = distanceLatLongArr.filter(function( obj ) {
			return obj.lat !== latitude && obj.lng !== longitude && obj.id_4 !== id_4;
		});
		distanceLatLongArr=myArray;
		// update label html content.
		/*for(var i=0;i<selectedVariable.length;i++){
			if($("#"+selectedVariable[i]+"_collapse").hasClass("") == true){
				var value = _.where(jsonData, {latitude:latitude.toString(),longitude:longitude.toString()});
				var keyName = variablesKey[selectedVariable[i].toLowerCase()];

				if(labelKeyValue[keyName]){
					if(value[0][keyName] % 1 === 0){
						labelKeyValue[keyName]=parseInt(labelKeyValue[keyName]) - parseInt(value[0][keyName]);
					}else{
						labelKeyValue[keyName]=parseFloat(labelKeyValue[keyName]) - parseFloat(value[0][keyName]);
						labelKeyValue[keyName]=labelKeyValue[keyName].toFixed(2);
					}
				}
			}
		}*/
		if($("#IND_PCA_01_collapse").hasClass("") == true){
			var value = _.where(jsonData, {latitude:latitude.toString(),longitude:longitude.toString()});
			var keyName = variablesKey["ind_pca_01"];
			if(labelKeyValue[keyName]){
				labelKeyValue[keyName]=parseInt(labelKeyValue[keyName]) - parseInt(value[0][keyName]);
			}else{
				labelKeyValue[keyName]=parseInt(value[0][keyName]);
			}
		}
		var html="";
		for(var key in labelKeyValue){
			html+='<label>'+key+' : </label><label>'+labelKeyValue[key]+'</label>';
		}
		//valInfo.update(html);
		//if(html){
			$(".valInfo").css('display','block');
			valInfo.update(html);
		//}

		// remove polyline and reset icon color.
		if(polyLineArr.length>0){
			for(var i=0;i<polyLineArr.length;i++){
				if(polyLineArr[i]['_latlngs'][0]['lat'] == latitude && polyLineArr[i]['_latlngs'][0]['lng'] == longitude){
					ployLine.removeLayer(polyLineArr[i]);
					$(".c_"+ltlg).css('color','#2A81CA');
				}else if(polyLineArr[i]['_latlngs'][1]['lat'] == latitude && polyLineArr[i]['_latlngs'][1]['lng'] == longitude){
					ployLine.removeLayer(polyLineArr[i]);
					$(".c_"+ltlg).css('color','#2A81CA');
				}
			}
		}
	}

	// Push to distance LatLng and update key value of variables.
	if(distanceRepeat.length == 0){
	if(originLatLng == false && originLatLngArr.length>0){
		/*for(var i=0;i<selectedVariable.length;i++){
			if($("#"+selectedVariable[i]+"_collapse").hasClass("") == true){
				var value = _.where(jsonData, {latitude:latitude.toString(),longitude:longitude.toString()});
				var keyName = variablesKey[selectedVariable[i].toLowerCase()];

				if(labelKeyValue[keyName]){
					if(value[0][keyName] % 1 === 0){
						labelKeyValue[keyName]=parseInt(labelKeyValue[keyName]) + parseInt(value[0][keyName]);
					}else{
						labelKeyValue[keyName]=parseFloat(labelKeyValue[keyName]) + parseFloat(value[0][keyName]);
						labelKeyValue[keyName]=labelKeyValue[keyName].toFixed(2);
					}
				}else{
					if(value[0][keyName] % 1 === 0){
						labelKeyValue[keyName]=parseInt(value[0][keyName]);
					}else{
						labelKeyValue[keyName]=parseFloat(value[0][keyName]).toFixed(2);
					}
				}
			}
		}*/
		if($("#IND_PCA_01_collapse").hasClass("") == true){
			var value = _.where(jsonData, {latitude:latitude.toString(),longitude:longitude.toString()});
			var keyName = variablesKey["ind_pca_01"];
			if(labelKeyValue[keyName]){
				labelKeyValue[keyName]=parseInt(labelKeyValue[keyName]) + parseInt(value[0][keyName]);
			}else{
				labelKeyValue[keyName]=parseInt(value[0][keyName]);
			}
		}
		var html="";
		for(var key in labelKeyValue){
			html+='<label>'+key+' : </label><label>'+labelKeyValue[key]+'</label>';
		}
		//valInfo.update(html);
		//if(html){
			$(".valInfo").css('display','block');
			valInfo.update(html);
		//}

		var distarr = e.latlng;
		distarr["id_4"]=parseInt(id_4);
		distanceLatLongArr.push(distarr);

		//ployLine.removeLayer(firstpolyline);
		//map.removeLayer(ployLine);
		if(polyLineArr.length>0){
			for(var i=0;i<polyLineArr.length;i++){
				ployLine.removeLayer(polyLineArr[i]);
				map.removeLayer(ployLine);
			}
		}
	}
	}

	// Polyline create
	if(distanceRepeat.length == 0){
		if(originLatLng == false && originLatLngArr.length>0 && distanceLatLongArr.length>0){
			polyLineCreation();
		}
	}
	
}

function polyLineCreation(){
	
	// poly line creation
	polyLineArr=[];
	workbookData=[];
	for(var i=0;i<distanceLatLongArr.length;i++){
		var ltlg = distanceLatLongArr[i].lat.toString().replace(".","_")+"_"+distanceLatLongArr[i].lng.toString().replace(".","_");
		var latlngArr=[];
		latlngArr.push(originLatLngArr[0]);
		latlngArr.push(distanceLatLongArr[i]);
		//latlngArr.push(distLatLng);

		firstpolyline = new L.Polyline(latlngArr, {
			color: 'red',
			weight: 3,
			opacity: 0.5,
			smoothFactor: 1
		});

		// Calculation distance of the polyline
		var tempLatLng = null;
		var totalDistance = 0.00000;
		var distanceKM="";
		
		$.each(latlngArr, function(i, latlng){
			if(tempLatLng == null){
			    tempLatLng = latlng;
			    return;
			}
			totalDistance = tempLatLng.distanceTo(latlng);
			distanceKM = (totalDistance).toFixed(2)/1000;
		});

		firstpolyline.bindPopup(distanceKM.toFixed(1) + ' KM');
		firstpolyline.on('mouseover', function (e) {
			this.openPopup();
		});
		firstpolyline.on('mouseout', function (e) {
			this.closePopup();
		});
		polyLineArr.push(firstpolyline);
			var data = _.where(jsonData, {latitude:distanceLatLongArr[i].lat.toString(),longitude:distanceLatLongArr[i].lng.toString()});
			if(data.length>0){
				data[0]["distance"]=distanceKM.toFixed(1);
				workbookData.push(data[0]);
			}

		//ployLine.addLayer(firstpolyline);
		//map.addLayer(ployLine);
		ployLine.addLayer(polyLineArr[i]);
		map.addLayer(ployLine);
		$(".c_"+ltlg+'').css('color','green');
	}
}

var topo = "";var layer="";var info="";
/*Layer group created*/
markers = new L.FeatureGroup();
bankMarkers = new L.FeatureGroup();
circles = new L.FeatureGroup();
ployLine = new L.FeatureGroup();
labelcontent = new L.FeatureGroup();

function mapCreator(){
	$(".valInfo").css('display','none');
	$("#workbook-save").css('visibility','hidden');
	var places=['State', 'District', 'Taluk','Village/Town', 'Village_town', 'Village', 'Town', 'Pincode', 'name_1', 'name_2', 'name_3', 'name_4'];
	var level0Val = document.getElementById("level0Id").value;
	var levelid = document.getElementById("levelId").value;

	L.NumberedDivIcon = L.Icon.extend({
		options: {
			iconUrl: 'http://www.charliecroom.com/marker_hole.png',
			number: '',
			shadowUrl: null,
			iconSize: new L.Point(25, 41),
			iconAnchor: new L.Point(13, 41),
			popupAnchor: new L.Point(-00, -0),
			className: 'leaflet-marker-icon-data'
		},
		createIcon: function () {
			var div = document.createElement('div');
			var img = this._createImg(this.options['iconUrl']);
			var numdiv = document.createElement('div');
			numdiv.setAttribute("class", "number");
			numdiv.innerHTML = this.options['number'] || '';
			div.appendChild(img);
			div.appendChild(numdiv);
			this._setIconStyles(div, 'icon');
			return div;
		},
		createShadow: function () {
			return null;
		}
	});


	var levelTypeData="";
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelTypeData = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
		levelTypeData = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	levelTypeData = levelTypeData.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	this.map.removeLayer(layer);
	removeLayer();
	//this.map.removeLayer(tiles);
	markers.clearLayers();
	var latlngCheck=0;

	// layers options load.
	var layersOptions="",radiusOptions="";
	for(var i=0;i<layersVariable.length;i++){
		var layerName = layersVariable[i].name;
		var layerLabel = layersVariable[i].name.toTitleCase();
		layersOptions += '<option value="'+layerName+'">'+layerLabel+'</option>';
	
		if(i==0){
			for(var r=0;r<layersVariable[i].radius.length;r++){
				var radiusName = layersVariable[i].radius[r];
				radiusOptions += '<option value="'+radiusName+'">'+radiusName+'</option>';
			}
		}
	}
	var layerContent ='<label style="width:40px;">Layer</label> : '+
				    '<select id="layer_id" class="layer_needed" style="width:83px">'+layersOptions+'</select><br/>'+
				'<label> Radius </label> : '+
				    '<select class="bank-km" id="radius_id" style="width:83px">'+radiusOptions+'</select>';
	// layers options load ends.

	if(jsonData){
	if(levelid > 3 ){
		d3.select("#map").selectAll('#no-text').remove();
		this.map.addLayer(tiles);
		for(var i=0;i<jsonData.length;i++){
			if(jsonData[i].latitude){
				if(jsonData[i].longitude){
					latlngCheck = 1;
					marker = new L.Marker([jsonData[i].latitude,jsonData[i].longitude],{title:jsonData[i][""+levelTypeData+""],type:"Place"});

					var lat = jsonData[i].latitude.toString();
					var lng = jsonData[i].longitude.toString();

					var jobMarkerIcon = L.AwesomeMarkers.icon({
						icon: 'map-marker',
						className:"c_"+lat.replace(".","_")+"_"+lng.replace(".","_"),
						markerColor: '#2A81CA',
						prefix: 'fa',
						iconColor: '#2A81CA',
						html: "<label class='numbers'> "+(jsonData[i].SNo)+" </label>"
					});


					marker = new L.marker([lat,lng], {icon: jobMarkerIcon, title:jsonData[i][""+levelType+""],type:"Place"});

					var html ='';
					/*html = '<div role="tabpanel">'
					//<!-- Nav tabs -->
					+'<ul class="nav nav-tabs" role="tablist">'
					+'<li role="presentation" class="active"><a href="#places'+i+'" aria-controls="places" role="tab" data-toggle="tab">&nbsp;&nbsp;Location&nbsp;&nbsp;  </a></li>';
					//if(Object.keys(arr4SameLatLng).length > 0){
					if(myVarData == 1){	
					for(var variable in categories){
						if(jsonData[i][categories[variable]]){
						  	html +='<li role="presentation"><a href="#selectedVariable'+i+'" aria-controls="selectedVariable" role="tab" data-toggle="tab">&nbsp; &nbsp;&nbsp;My Branch &nbsp; &nbsp;&nbsp;</a></li>'
							break;
						}
					}	
			  		}*/

					html = '<div role="tabpanel">'+'';

					if(myVarData == 1){	
						for(var variable in categories){
							if(jsonData[i][categories[variable]]){
								//<!-- Nav tabs -->
								html  += '<ul class="nav nav-tabs" role="tablist">'
								+'<li role="presentation" class="active"><a href="#places'+i+'" aria-controls="places" role="tab" data-toggle="tab">&nbsp;&nbsp;Location&nbsp;&nbsp;  </a></li>'
							  	+'<li role="presentation"><a href="#selectedVariable'+i+'" aria-controls="selectedVariable" role="tab" data-toggle="tab">&nbsp; &nbsp;&nbsp;My Branch &nbsp; &nbsp;&nbsp;</a></li></ul>';
								break;
							}
						}
					}


			  		html +='<div style="width:200px"></div>'
						//<!-- Tab panes -->
						+'<div class="tab-content">'
						+'<div role="tabpanel" class="tab-pane active" id="places'+i+'">';


					for(var j=0; j<places.length; j++){
						if(jsonData[i][places[j]]){
							html += '<div class="textWrap"><strong>' + places[j] + '</strong>: ' + jsonData[i][places[j]] + '</div>';
						}
					}

					for(var s=0;s<selectedVariable.length;s++){
						if($("#"+selectedVariable[s]+"_collapse").hasClass("") == true){
							var keyname = variablesKey[selectedVariable[s].toLowerCase()];
							if(jsonData[i][keyname]){
								html += '<div class="textWrap"><strong>' + keyname + '</strong>: ' + jsonData[i][keyname] + '</div>';
							}
						}
					}
					for(var s=0;s<selectedMyVariable.length;s++){
						if($("#"+selectedMyVariable[s]+"_collapse").hasClass("") == true){
							var keyname = myVariablesKey[selectedMyVariable[s].toLowerCase()];
							if(jsonData[i][keyname]){
								html += '<div class="textWrap"><strong>' + keyname + '</strong>: ' + jsonData[i][keyname] + '</div>';
							}
						}
					}

					var categoriesHtml = "";
					for(var variable in categories){
						if(jsonData[i][categories[variable]]){
							categoriesHtml += '<div class="textWrap"><strong>' + categories[variable].toTitleCase() + '</strong>: ' + jsonData[i][categories[variable]] + '</div>';			
						}
					}
					if(categoriesHtml.length > 0){
						html += '</div><div role="tabpanel" class="tab-pane" id="selectedVariable'+i+'">';	
						html += categoriesHtml;
					}

				
			 		html += '</div>';
				
					/*For same location*/	
					if(arr4SameLatLngCount[jsonData[i].latitude+','+jsonData[i].longitude] > 1){

						html = ' <div align="center" >'
							+' <button id="display1" style="padding: 0px 0px;display: inline-block;" class="btn btn-info " '
							+' value="display">&nbsp;&nbsp;<&nbsp;&nbsp;</button>'
							+'<lable type="text" align="center" id="page" style="width:30px;display: inline-block;"></lable>'
							+' <button id="display" class="btn btn-info " '
							+' border-radius:4px;" style="padding: 0px 0px;display: inline-block;"  value="display">&nbsp;&nbsp;>&nbsp;&nbsp;</button></div>&nbsp;'
							+arr4SameLatLng[jsonData[i].latitude+','+jsonData[i].longitude]
							+ '</div>';

						var jobMarkerIcon = L.AwesomeMarkers.icon({
							icon: 'fa-map-marker', 
							//markerColor: 'darkblue',
							prefix: 'fa',
							//iconColor: 'darkblue',
							html: arr4SameLatLngCount[jsonData[i].latitude+','+(jsonData[i].longitude)]
						});

			
					     	marker = new L.marker([jsonData[i].latitude,(jsonData[i].longitude)], {icon: jobMarkerIcon, title:jsonData[i][""+levelType+""],type:"Place"});
							
					}		

				
					html+='<div role="tabpanel" style="width:200px;border:1px solid #bbb;padding:10px;borderRadius:5px;" class="tab-pane active" id="places'+i+'">'
						+layerContent+
						//'<button class="map-save-tab-leaflet-apply" onclick="mapLayerGoogle('+"'"+jsonData[i].latitude+','+(jsonData[i].longitude)+"'"+','+"'"+"'"+','+"'"+"'"+');">Go</button>'
						//+ '<div  style="padding:10px;width: 89px;display: inline-block;" id="'+lat.replace('.','_')+''+lng.replace('.','_')+'_id" ></div>'
						'<button class="map-save-tab-leaflet-apply" style="display:inline-block" onclick="mapLayerGoogle('+"'"+jsonData[i].latitude+','+(jsonData[i].longitude)+"'"+','+"'"+"'"+','+"'"+"'"+');">Go</button>'
						//+ '<div  class="next-button" style="padding:10px;width: 89px;display: none;" id="'+jsonData[i].latitude.replace('.','_')+jsonData[i].longitude.replace('.','_')+'_id" ></div>'
						+ '<div  class="next-button" style="width: 70px;display: none;" id="'+lat.replace('.','_')+lng.replace('.','_')+'_id" ></div>'
						+'<button class="map-save-tab-leaflet-close" style="display:inline-block" onclick="map.closePopup();">Close</button>'
						+ '';


					marker.bindPopup(html);
					this.markers.addLayer(marker);

				}
			}
		}

		if(latlngCheck == 0 ){
			d3.select('#map-id').attr('class','');
			d3.select('#grid-id').attr('class','active');
			d3.select('#grid').attr('class','tab-pane active');
			d3.select('#mapview').attr('class','tab-pane');
			d3.selectAll('.info leaflet-control').remove();
			this.map.removeLayer(layer);
			this.map.removeLayer(info);
			var NoData = d3.select("#map").append("svg").attr('width','800').attr('height','500').attr('id','no-text').append("text").attr("x", 328).attr("y", 200) 
				.style("font", "200 20px sans-serif").text("Map data not found.")
			d3.selectAll('.info leaflet-control').remove();
			this.map.removeLayer(layer);
			this.map.removeLayer(info);
			this.map.removeLayer(tiles);
		}else{
			setTimeout(function(){
				//mapPopUp();
		               map.invalidateSize();
		               this.map.addLayer(markers);


		               if(jsonData.length != 1){
		                       this.map.fitBounds(markers.getBounds());
		               } else {
		                       latlng = {lat: jsonData[0].latitude, lng: jsonData[0].longitude};
		                       this.map.setView( latlng , 14);
		               }        
		               
		       	},100);
		}
	} else {
		d3.selectAll('.info leaflet-control').remove();
		this.map.removeLayer(layer);
		this.map.removeLayer(info);
		this.map.addLayer(tiles);
		layer = L.geoJson(null, { style: setStyle, onEachFeature: eachFeature})
		//layer.addData(topo);	
		layer.addData(topo);
		d3.select("#map").selectAll('#no-text').remove();
		setTimeout(function(){
			//mapPopUp();
			map.invalidateSize();
			this.map.addLayer(layer);
			this.map.fitBounds(layer.getBounds());
			
		},100);
	}
	}
}


function workbookmap(){
	$(".valInfo").css('display','none');
	workbookOrginData=[];
	workbookData=[];
	var levelid = document.getElementById("levelId").value;
	var level0Val = document.getElementById("level0Id").value;
	var levelTypeData="";
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelTypeData = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
		levelTypeData = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	levelTypeData = levelTypeData.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});


	if(document.getElementById("workbookcheck").checked == false){
		$("#workbook-save").css('visibility','hidden');
		mapCreator();
	}else{
		$("#workbook-save").css('visibility','visible');
		if(jsonData){
		if(levelid > 3 ){
			this.map.removeLayer(layer);
			removeLayer();
			markers.clearLayers();
			var latlngCheck=0;
			d3.select("#map").selectAll('#no-text').remove();
			this.map.addLayer(tiles);
			for(var i=0;i<jsonData.length;i++){
				if(jsonData[i].latitude){
					if(jsonData[i].longitude){
						latlngCheck = 1;
						var marker = new L.Marker([jsonData[i].latitude,jsonData[i].longitude],{title:jsonData[i][""+levelTypeData+""],type:"Place"});

						var lat = jsonData[i].latitude.toString();
						var lng = jsonData[i].longitude.toString();

						var jobMarkerIcon = L.AwesomeMarkers.icon({
							icon: 'fa-map-marker',
							className:"c_"+jsonData[i].latitude.replace(".","_")+"_"+jsonData[i].longitude.replace(".","_"),
							markerColor: '#2A81CA',
							prefix: 'fa',
							iconColor: '#2A81CA',
							html: "<label class='numbers'> "+(jsonData[i].SNo)+" </label>"
						});


						marker = new L.marker([jsonData[i].latitude,(jsonData[i].longitude)], {icon: jobMarkerIcon, title:jsonData[i][""+levelType+""],type:"Place",id_4:jsonData[i].id_4}).on('click',onClickMarker);

						var html ='';
						/*html +='<div><input type="checkbox" id="idorigin_'+lat.replace('.','_')+"_"+lng.replace('.','_')+'" onclick="originClick('+lat+','+lng+','+jsonData[i].id_4+');">'+
							'<label for="idorigin_'+lat.replace('.','_')+"_"+lng.replace('.','_')+'">Set as Origin</label>'+
							'</div>';*/
						html +='<div><input type="checkbox" id="idorigin_'+lat.replace('.','_')+"_"+lng.replace('.','_')+'" onclick="originClick('+lat+','+lng+','+jsonData[i].id_4+');" style="visibility:hidden;width:0px;">'+
							'<label for="idorigin_'+lat.replace('.','_')+"_"+lng.replace('.','_')+'" > <div class="origin-button">Set as Origin</div> </label>'+
							'</div>';

						marker.bindPopup(html);
						this.markers.addLayer(marker);
					}
				}
			}	

			if(latlngCheck == 0 ){
				d3.select('#map-id').attr('class','');
				d3.select('#grid-id').attr('class','active');
				d3.select('#grid').attr('class','tab-pane active');
				d3.select('#mapview').attr('class','tab-pane');
				d3.selectAll('.info leaflet-control').remove();
				this.map.removeLayer(layer);
				this.map.removeLayer(info);
				var NoData = d3.select("#map").append("svg").attr('width','800').attr('height','500').attr('id','no-text').append("text").attr("x", 328).attr("y", 200) 
					.style("font", "200 20px sans-serif").text("Map data not found.")
				d3.selectAll('.info leaflet-control').remove();
				this.map.removeLayer(layer);
				this.map.removeLayer(info);
				this.map.removeLayer(tiles);
			}else{
				setTimeout(function(){
					//mapPopUp();
				       map.invalidateSize();
				       this.map.addLayer(markers);

				       if(jsonData.length != 1){
				               this.map.fitBounds(markers.getBounds());
				       } else {
				               latlng = {lat: jsonData[0].latitude, lng: jsonData[0].longitude};
				               this.map.setView( latlng , 14);
				       }        
				       
			       	},100);
			}
		} 
		}

	}
}

var layers, circle;

/*Function for Loading signal*/
function iterateDots(){

	//var el = document.getElementById('google-loading');
	var el = $('.loading-class');
	var dotsStr = el[0].innerHTML;
	if(dotsStr == ""){ 	dotsStr="Loading Please wait"; 	}
	var dotsLen = dotsStr.length;
	var maxDots = 21;
	var innerHtml = (dotsLen < maxDots ? dotsStr + '.' : 'Loading Please wait');
	el[0].innerHTML = innerHtml;
}

/* SnapShot */
function snapshot(locationOfSnapshot){

	location.href = locationOfSnapshot;
}

/* Stop Loading signal */	
function stopLoading(){
	$('.loading').css('display','none');
	$('.loading').html = "";

	/*Close Loading signal and popup*/
	clearInterval(interval);
}

/* Start Loading signal */	
var interval;
function startLoading(){
	$('.loading').css('display','block');
	var intervalMs = 300;
	interval = setInterval("iterateDots()", intervalMs);
}

/* Remove all layers */	
function removeLayer(){
	bankMarkers.removeLayer(layers);
	map.removeLayer(bankMarkers);
	circles.removeLayer(circle);
	map.removeLayer(circles);

	if(polyLineArr.length>0){
		for(var i=0;i<polyLineArr.length;i++){
			ployLine.removeLayer(polyLineArr[i]);
			map.removeLayer(ployLine);
		}
	}
	circles.removeLayer(circle1);
	circles.removeLayer(circle2);
	circles.removeLayer(circle3);
	map.removeLayer(circles);

	valInfo.update();	//reset label key and value
	labelKeyValue={},
	originLatLngArr=[];
	distanceLatLongArr=[];
	polyLineArr=[];
}

/*Marker icon for Bank*/
var bankIconold = L.icon({
	//iconUrl: 'http://sheltonanswerbook.com/wp-content/uploads/leaflet-maps-marker-icons/bank_euro.png',
	iconUrl: '/static/filters_layers/images/bank5.png',
	iconSize: [22, 27],
	iconAnchor: new L.Point(14, 26),//(8, 33),
	popupAnchor: new L.Point(0, -53),	
});

var bankIcon = L.AwesomeMarkers.icon({
	icon: 'fa-bank', 
	markerColor: '#CA2A46',
	prefix: 'fa',
	iconColor: '#CA2A46'
	//iconColor: '#CC3F42'
});

var towerIcon = L.AwesomeMarkers.icon({
	icon: 'fa-viacoin', 
	className:'fa-rotate-180',
	markerColor: '#CA2A46',
	prefix: 'fa',
	iconColor: '#CA2A46'
});


/*Popup Over Map*/
function mapPopUp(){
	map.on('click', function(e) {
		//if(placeNameClicked == 0){

			// layers options load.
			var layersOptions="",radiusOptions="";
			for(var i=0;i<layersVariable.length;i++){
				var layerName = layersVariable[i].name;
				var layerLabel = layersVariable[i].name.toTitleCase();
				layersOptions += '<option value="'+layerName+'">'+layerLabel+'</option>';
	
				if(i==0){
					for(var r=0;r<layersVariable[i].radius.length;r++){
						var radiusName = layersVariable[i].radius[r];
						radiusOptions += '<option value="'+radiusName+'">'+radiusName+'</option>';
					}
				}
			}
			var layerContent ='<label style="width:40px;">Layer</label> : '+
						    '<select id="layer_id" class="layer_needed" style="width:83px">'+layersOptions+'</select><br/>'+
						'<label> Radius </label> : '+
						    '<select class="bank-km" id="radius_id" style="width:83px">'+radiusOptions+'</select>';
			// layers options load ends.

			var popLocation= e.latlng;
			var lat = popLocation['lat'];
			var lng = popLocation['lng'];
			lat = lat.toString();
			lng = lng.toString();

			var popupHtml = '<div role="tabpanel" style="width:200px;border:1px solid #bbb;padding:10px;borderRadius:5px;" class="tab-pane active" id="places">'
					+layerContent+
				       //'<button class="map-save-tab-leaflet-apply" onclick="mapLayerGoogle('+"'"+popLocation['lat']+','+popLocation['lng']+"'"+','+"'"+"'"+','+"'"+"'"+');">Go</button>'
				       //+ '<div style="padding:10px;width: 89px;display: inline-block;" id="'+lat.replace('.','_')+lng.replace('.','_')+'_id" ></div>'
				       '<button class="map-save-tab-leaflet-apply" style="display:inline-block"  onclick="mapLayerGoogle('+"'"+popLocation['lat']+','+popLocation['lng']+"'"+','+"'"+"'"+','+"'"+"'"+');">Go</button>'
				       +'<div class="next-button"  style="width:70px;display: none;" id="'+lat.replace('.','_')+lng.replace('.','_')+'_id" ></div>'
				       +'<button class="map-save-tab-leaflet-close" style="display:inline-block" onclick="map.closePopup();">Close</button>'
				       +'';

			popup = L.popup()
				.setLatLng(popLocation)
				.setContent(popupHtml)
				.openOn(map); 
		/*}else{
			placeNameClicked = 0;
		} */      
	});

}


/*Function for Layer where google api is used*/
function mapLayerGoogle(d, nxt, newMarker){

	var layerId = document.getElementById("layer_id").value;
	for(var i=0;i<layersVariable.length;i++){
		if(layerId == layersVariable[i].name){
			if(layersVariable[i].provider == "internal"){
				return mapLayer(d);
			}	
		}
	}

	var nxt_token = nxt;
	var next_page_token = "";
	var layerData = [];	
	var layer_needed = $('.layer_needed').val();
	var km_radius = $('.bank-km').val();
	var token_and_radius = '{"radius":"'+ km_radius +'","layer_needed":"'+layer_needed+'","nxt_token":"'+nxt_token+'"}';	
	/*Start Loading signal*/	
	startLoading();

	/*Remove all Layers And Create a New layer Group */
	if(nxt_token == "" || newMarker ==""){
		removeLayer();	/*Remove all Layers*/
		bankMarkers = new L.FeatureGroup(); 	/*Create a new layer to remove all layers*/
	}

	

	function dataFun(){
		var url = "/app/scisphere/places/googleApi/"+d+""
	
		$.ajax({
		    url: url,
		    type: 'post',
		    dataType: 'json',
		    success: function (data) {
				
			/*Next page Token Create*/			
			next_page_token = data.next_page_token;

			/*Close Loading signal and popup*/
			stopLoading()

			for(var i = 0; i<data.results.length; i++ ){
				var latitude =(data.results[i].geometry.location.lat);
				var longitude= (data.results[i].geometry.location.lng);
				var htmlBank = '<div align="left" >'
				htmlBank += '<div align="center" class="textWrap"><strong>Bank Details </strong></div>';
				htmlBank += '<div class="textWrap"><strong>Bank </strong>: ' + data.results[i].name + '</div>';
				htmlBank += '<div class="textWrap"><strong>Branch & Address </strong>: ' + data.results[i].vicinity + '</div>';
				htmlBank += '</div>';	
				layers = new L.marker([latitude,longitude], {icon: bankIcon, type:"Place"});
				layers.bindPopup(htmlBank);
				bankMarkers.addLayer(layers);
			        map.addLayer(bankMarkers);
			}

			var latlng = d.split(',');

			/*Create Circle*/
			if(nxt_token == ""){
				var latlng = d.split(',');
		     	        circle = L.circle([latlng[0], latlng[1]], ( km_radius * 1000), { color: 'red', fillOpacity: 0.07 });
				circles.addLayer(circle);
				map.addLayer(circles);
			}

			var markerInnerHTML = "";
			if(data.next_page_token){

				$('.map-save-tab-leaflet-apply').css('display','none');
				$('.next-button').css('display','inline-block');	

				markerInnerHTML = '<button class="map-save-tab-leaflet-apply" onclick="mapLayerGoogle('+"'"+d+"'"+', '+"'"+data.next_page_token+"'"+','+"'"+d+"'"+');"> Next.. </button>';			
				document.getElementById(''+latlng[0].replace('.','_')+latlng[1].replace('.','_')+'_id').innerHTML = markerInnerHTML;
			} else {

				$('.next-button').css('display','none');
				$('.map-save-tab-leaflet-apply').css('display','inline-block');

				document.getElementById(''+latlng[0].replace('.','_')+latlng[1].replace('.','_')+'_id').innerHTML = "";
				map.closePopup();
			}	

			/*Stop Loading Signal*/
			stopLoading();
			map.setView([latlng[0], latlng[1]] , 12);
			//mapPopUp();
	    	    },
		    data: token_and_radius
		});
	}
	dataFun();	
}

/*Function for Layer where scisphere api is used*/
function mapLayer(d){

    var layerId = document.getElementById("layer_id").value;
    /*Start Loading... signal*/
    startLoading();
    var next_page_token = "";
    var layerData = [];	
    var sameLatLng = {};
    var sameLatLngCount = {};
    /*Remove all layers*/	
    removeLayer();

    /*Create Group for refreshing all the markers on Bank*/
    bankMarkers = new L.FeatureGroup();

    function dataFun(){
	var km_radius = $('.bank-km').val();	

	var url = "/app/filter_layers/places/layers?radius="+km_radius+"&geolocation="+d+"&layer="+layerId;
	var bodyData = '{"locations": "'+d+'","level0":"356","type":"bank","radius":"'+km_radius+'"}';
	sameLatLng = {};
	$.ajax({
	    url: url,
	    type: 'get',
	    dataType: 'json',
	    success: function (data) {
			//layerData = data[0].data;
			for(var key in data){
				for(var key1 in data[key]){
					var layerLength = data[key][key1];
					for(var i=0;i<layerLength.length;i++){
						var layerContentKey="",layerContent="";
						var parameter = _.omit(layerLength[i], ['latitude','longitude','geolocation','type','cell']);
						for(var variable in parameter){
							layerContentKey+='<div class="textWrap"><label style="width:50px;"><strong>'+variable.toTitleCase()+'</strong></label> : '+layerLength[i][variable]+'</div>';
						}
						layerContent +='<div class="divs" name="marker">'
						      +'<div role="tabpanel">'
						  	  //<!-- Nav tabs -->
							   +'<div style="width:200px"></div>'
							  //<!-- Tab panes -->
							   +'<div class="tab-content">'
							        +'<div role="tabpanel" class="tab-pane active" id="places'+i+'">'
								    +'<div align="left" >'+layerContentKey+'</div>'
								+'</div>'
							    +'</div>'
							+'</div>'
						    +'</div>';

						layers = new L.marker([layerLength[i].latitude,layerLength[i].longitude], {icon: towerIcon, type:"Place"});
						layers.bindPopup(layerContent);
						bankMarkers.addLayer(layers);
						map.addLayer(bankMarkers);

						/*if(sameLatLng[layerLength[i].latitude+','+layerLength[i].longitude]){
							sameLatLng[layerLength[i].latitude+','+layerLength[i].longitude] = sameLatLng[layerLength[i].latitude+','+layerLength[i].longitude] +"  "+ layerContent;
							sameLatLngCount[layerLength[i].latitude+','+layerLength[i].longitude] = sameLatLngCount[layerLength[i].latitude+','+layerLength[i].longitude] + 1 ;
						}else{
							sameLatLng[layerLength[i].latitude+','+layerLength[i].longitude] = layerContent;
							sameLatLngCount[layerLength[i].latitude+','+layerLength[i].longitude] = 1;
						}*/
					}
				}
			}
			

			/*var objSameLatLng = Object.keys(sameLatLng);
			for(var i=0; i<objSameLatLng.length; i++ ){
				var source  = objSameLatLng[i].split(',');
				layers = new L.marker([source[0],source[1]], {icon: towerIcon, type:"Place"});
				var html='<div align="center">'+sameLatLng[objSameLatLng[i]]
					    +'<button id="display1" style="padding: 0px 0px;display: inline-block;" class="btn btn-info " '
							+' value="display">&nbsp;&nbsp;<&nbsp;&nbsp;</button>'
					    +'<lable type="text" align="center" id="page" style="width:30px;display: inline-block;"></lable>/'+sameLatLngCount[objSameLatLng[i]]
					    +' <button id="display" class="btn btn-info " '
							+' border-radius:4px;" style="padding: 0px 0px;display: inline-block;"  value="display">&nbsp;&nbsp;>&nbsp;&nbsp;</button></div>&nbsp;'
					+'</div>';
				
				layers.bindPopup(html);
				bankMarkers.addLayer(layers);
			        map.addLayer(bankMarkers);	
			} */
			/*********************************************************************************/
			
			var latlng = d.split(',');
			/*Add Circle*/
	     	        circle = L.circle([latlng[0], latlng[1]], ( km_radius * 1000), {color: 'red', fillOpacity: 0.07});
			circles.addLayer(circle);
		        map.addLayer(circles);				
			/*Close Loading signal and popup*/
			stopLoading();
			map.closePopup();
			map.setView([latlng[0], latlng[1]] , 12);
			//mapPopUp();
	    }
	    //data: bodyData,
	});
    }
    dataFun();	
}

function mapCreatorold(){

	var places=['State', 'District', 'Taluk','Village/Town', 'Village_town', 'Village', 'Town', 'Pincode', 'name_1', 'name_2', 'name_3', 'name_4'];

	var level0Val = document.getElementById("level0Id").value;
	var levelid = document.getElementById("levelId").value;
	
	L.NumberedDivIcon = L.Icon.extend({
                    options: {
                        iconUrl: 'http://www.charliecroom.com/marker_hole.png',
                        number: '',
                        shadowUrl: null,
                        iconSize: new L.Point(25, 41),
                        iconAnchor: new L.Point(13, 41),
                        popupAnchor: new L.Point(-00, -0),
                        className: 'leaflet-marker-icon-data'
                    },
                    createIcon: function () {
                        var div = document.createElement('div');
                        var img = this._createImg(this.options['iconUrl']);
                        var numdiv = document.createElement('div');
                        numdiv.setAttribute("class", "number");
                        numdiv.innerHTML = this.options['number'] || '';
                        div.appendChild(img);
                        div.appendChild(numdiv);
                        this._setIconStyles(div, 'icon');
                        return div;
                    },
                    createShadow: function () {
                        return null;
                    }
                });


	var levelTypeData="";
	if(levelsData[level0Val]["level"+levelid.split(".")[0]+""] instanceof Array){
		levelTypeData = levelsData[level0Val]["level"+levelid.split(".")[0]+""][levelid.split(".")[1]].toLowerCase();
	}else{
        	levelTypeData = levelsData[level0Val]["level"+levelid+""].toLowerCase();
	}
	levelTypeData = levelTypeData.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	this.map.removeLayer(layer);
	//this.map.removeLayer(tiles);
	markers.clearLayers();

	var latlngCheck = 0; 
	if(jsonData){
	if(levelid > 3 ){
		d3.select("#map").selectAll('#no-text').remove();
		this.map.addLayer(tiles);
		for(var i=0;i<jsonData.length;i++){
		  if(jsonData[i].latitude){
		  if(jsonData[i].longitude){
			  latlngCheck = 1;
			  marker = new L.Marker([jsonData[i].latitude,jsonData[i].longitude],{title:jsonData[i][""+levelTypeData+""],type:"Place"});
			  var html ='';
			  html = '<div role="tabpanel">'
					  //<!-- Nav tabs -->
					  +'<ul class="nav nav-tabs" role="tablist">'
					  +'<li role="presentation" class="active"><a href="#places'+i+'" aria-controls="places" role="tab" data-toggle="tab">&nbsp;&nbsp;Location&nbsp;&nbsp;  </a></li>';
			  //if(Object.keys(arr4SameLatLng).length > 0){
			  if(myVarData == 1){	
				 for(var variable in categories){
					if(jsonData[i][categories[variable]]){
					  	html +='<li role="presentation"><a href="#selectedVariable'+i+'" aria-controls="selectedVariable" role="tab" data-toggle="tab">&nbsp; &nbsp;&nbsp;My Branch &nbsp; &nbsp;&nbsp;</a></li>'
						break;
					}
				 }	
			  }

	  		  html +='</ul><div style="width:200px"></div>'
					  //<!-- Tab panes -->
					  +'<div class="tab-content">'
					  +'<div role="tabpanel" class="tab-pane active" id="places'+i+'">';

			  /*if(jsonData[i][""+level1Label+""]){
			  html += '<div class="textWrap"><strong>' + level1Label + '</strong>: ' + jsonData[i][""+level1Label+""] + '</div>';
			  }if(jsonData[i][""+level2Label+""]){
			  html += '<div class="textWrap"><strong>' + level2Label + '</strong>: ' + jsonData[i][""+level2Label+""] + '</div>';
			  }if(jsonData[i][""+level3Label+""]){
			  html += '<div class="textWrap"><strong>' + level3Label + '</strong>: ' + jsonData[i][""+level3Label+""] + '</div>';
			  }if(jsonData[i][""+levelType+""]){
			  html += '<div class="textWrap"><strong>' + "Name" + '</strong>: ' + jsonData[i][""+levelType+""] + '</div>';
			  }*/
			  for(var j=0; j<places.length; j++){
				if(jsonData[i][places[j]]){
					html += '<div class="textWrap"><strong>' + places[j] + '</strong>: ' + jsonData[i][places[j]] + '</div>';
				 }
			  }
	
			  var categoriesHtml = "";	
			  for(var variable in categories){
				if(jsonData[i][categories[variable]]){
					categoriesHtml += '<div class="textWrap"><strong>' + categories[variable].toTitleCase() + '</strong>: ' + jsonData[i][categories[variable]] + '</div>';			
				}
			  }	
			  if(categoriesHtml.length > 0){
				  html += '</div><div role="tabpanel" class="tab-pane" id="selectedVariable'+i+'">';	
				  html += categoriesHtml;
			  }	
 			  /*parameter = _.omit(jsonData[i], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','name_0','Village','State','District','Taluk','Town','idmap70','key','leveltype','collecteddate','latitude','longitude','value', 'type']);
			  for(var variable in parameter){
				var varName = variable;
				if(myVariablesKey[variable]){
					if(myVariablesKey){
						if(myVariablesKey[variable]){
							varName = myVariablesKey[variable];
						}
					}
					varName = varName.toTitleCase();
				  	html += '<div class="textWrap"><strong>' + varName + '</strong>: ' + jsonData[i][""+variable+""] + '</div>';				
				}
			  }*/
			  html += '</div>';
				
			  /*For same location*/	
			  if(arr4SameLatLngCount[jsonData[i].latitude+','+jsonData[i].longitude] > 1){

				html = ' <div align="center" >'
						+' <button id="display1" style="padding: 0px 0px;display: inline-block;" class="btn btn-info " '
						+' value="display">&nbsp;&nbsp;<&nbsp;&nbsp;</button>'
						+'<lable type="text" align="center" id="page" style="width:30px;display: inline-block;"></lable>'
						+' <button id="display" class="btn btn-info " '
						+' border-radius:4px;" style="padding: 0px 0px;display: inline-block;"  value="display">&nbsp;&nbsp;>&nbsp;&nbsp;</button></div>&nbsp;'
						+arr4SameLatLng[jsonData[i].latitude+','+jsonData[i].longitude]
						+ '</div>';

			        marker = new L.marker([jsonData[i].latitude,(jsonData[i].longitude)], {
		                        icon: new L.NumberedDivIcon({
		                            number: arr4SameLatLngCount[jsonData[i].latitude+','+(jsonData[i].longitude)]
		                        }),
		                });
							
			  }		



			  marker.bindPopup(html);
			  this.markers.addLayer(marker);
		  }
		  }
		}	

		/*setTimeout(function(){
			map.invalidateSize();
			this.map.addLayer(markers);
			this.map.fitBounds(markers.getBounds());
			
		},100);*/
		/*setTimeout(function(){
                       map.invalidateSize();
                       this.map.addLayer(markers);
                       if(jsonData.length != 1){
                               this.map.fitBounds(markers.getBounds());
                       } else {
                               latlng = {lat: jsonData[0].latitude, lng: jsonData[0].longitude};
                               this.map.setView( latlng , 14);
                       }        
                       
               	},100);*/

		if(latlngCheck == 0 ){

			d3.select('#map-id').attr('class','');
			d3.select('#grid-id').attr('class','active');
			d3.select('#grid').attr('class','tab-pane active');
			d3.select('#mapview').attr('class','tab-pane');
			d3.selectAll('.info leaflet-control').remove();
			this.map.removeLayer(layer);
			this.map.removeLayer(info);
			var NoData = d3.select("#map").append("svg").attr('width','800').attr('height','500').attr('id','no-text').append("text").attr("x", 328).attr("y", 200) 
				.style("font", "200 20px sans-serif").text("Map data not found.")
			d3.selectAll('.info leaflet-control').remove();
			this.map.removeLayer(layer);
			this.map.removeLayer(info);
			this.map.removeLayer(tiles);
		}else{

			setTimeout(function(){
		               map.invalidateSize();
		               this.map.addLayer(markers);
		               if(jsonData.length != 1){
		                       this.map.fitBounds(markers.getBounds());
		               } else {
		                       latlng = {lat: jsonData[0].latitude, lng: jsonData[0].longitude};
		                       this.map.setView( latlng , 14);
		               }        
		               
		       	},100);
		}


	} else {
	
		d3.selectAll('.info leaflet-control').remove();
		this.map.removeLayer(layer);
		this.map.removeLayer(info);
		this.map.addLayer(tiles);
		layer = L.geoJson(null, { style: setStyle, onEachFeature: eachFeature})
		//layer.addData(topo);	
		layer.addData(topo);
		d3.select("#map").selectAll('#no-text').remove();
		setTimeout(function(){
			map.invalidateSize();
			this.map.addLayer(layer);
			this.map.fitBounds(layer.getBounds());
			
		},100);
		

	}
	}
}




/* leaflet map save */
document.getElementById('output').addEventListener('click', function() {
	sample3.innerHTML = 'Loading map image for saving....';

        var level1Id = document.getElementById('level1Id');
    	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	document.getElementById('pin-form-description').value = level1Name;
	var img = document.createElement('img');

        html2canvas($('#map'), {
      		allowTaint : false,
      		logging : true,
      		taintTest: false,
      		useCORS: true,
      		onrendered: function(canvas) {

			// canvas is the final rendered <canvas> element
			dataURL = canvas.toDataURL("image/png");  

			//map.panBy([100, 100]);

			var dimensions = map.getSize();
			document.getElementById('pin-form-image').value = dataURL;
			document.getElementById('imgWidth').value = dimensions.x;

			document.getElementById('imgHeight').value = dimensions.y;
			document.getElementById('pathName').value = document.URL;

			img.width = dimensions.x;
			img.height = dimensions.y;
			img.src = canvas.toDataURL();
			sample3.innerHTML = '';	
			sample3.appendChild(img);	
		}
    	});

});




/* leaflet map save 
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
        var level1Id = document.getElementById('level1Id');     	
	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	$.post("/post_image_pins/", { 'image': dataURL,'description':level1Name,'tags':'Saved_Image','width':600,'height':450,'pathName':'' }, function(data) {
		bootbox.alert('Image Saved to ' + data);
	});
}
 leaflet map save */


function contextClick(){
	cancelSelection();
	d3.select("#pop-geo").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-myvar").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-contextual").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function geoClick(){
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





/* leaflet map save */
document.getElementById('output').addEventListener('click', function() {
	sample3.innerHTML = 'Loading map image for saving....';
       var level1Id = document.getElementById('level1Id');
    	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	document.getElementById('pin-form-description').value = level1Name;
	//$('#sample3').plainModal('open', {offset: {left: 100, top: 50}});
	leafletImage(map, doImage);
});

window.setTimeout(function() {
    //map.panBy([100, 100]);
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
	//document.getElementById('pin-form-description').value = level1Name;
	document.getElementById('imgWidth').value = dimensions.x;

	document.getElementById('imgHeight').value = dimensions.y;
	document.getElementById('pathName').value = document.URL;

}

// using ajax form submission
/*$(document).ready(function() {
    // prepare Options Object for plugin
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
    $('#savedlist-ajaxform').ajaxForm(options);
});*/
/* leaflet map save */
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

function applySaveList(){
	var dataObj={
		"savedlist-desc":document.getElementById("pin-savedlist-form-desc").value,
		"listname":document.getElementById("list-name").value,
		"urlpath":document.getElementById("url-path").value,
	};

	$.ajax({
	    url: '/app/mysphere_saved_list',
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

function saveMysphereList(){
        var level1Id = document.getElementById('level1Id');
    	var level1Name = level1Id.options[level1Id.selectedIndex].innerHTML;
	document.getElementById('pin-savedlist-form-desc').value = "";
	document.getElementById('url-path').value = document.URL;
	document.getElementById('list-name').value = level1Name;
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
