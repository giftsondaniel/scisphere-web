var menuData;
var sub_list,level0Data,level1Data;

window.onload=function(){
	$('#fieldDetails').html("Loading Data...");
	d3.json("/app/subscription_list",function(data){
		sub_list = data;
		//push_values_to_hash_params();
	     	/*Function for pushing values to hash params */
		function push_values_to_hash_params(){
			var level0Val="";
			var level1Val="";
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
			var prms={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0], year:'2011' };
			var r =$.param.fragment(pathname1, prms, 2 );
			var prms1 = $.deparam.fragment();
			if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
			//$.bbq.pushState(r);

		}/* end of pushing values to hash params*/


		d3.json("/app/scisphere/places/countries" , function(data) {
			//Working for country
			level0Data = data;
			var level0Id = document.getElementById('level_0_Id');
			for(var i=0;i<level0Data.length;i++){
				var optlevel0 = document.createElement('option');
				var valCh = level0Data[i].name_0;
				var valCam = valCh.toTitleCase();
				optlevel0.innerHTML = valCam;
				optlevel0.value = level0Data[i].id_0;
				level0Id.appendChild(optlevel0);
			}
			//$('.custom_selectbox').selectBoxIt();
			//$('#level_0_Id').selectBoxIt();	
			$("#level_0_Id").data("selectBox-selectBoxIt").add();


			d3.json("/app/places/master" , function(data) {
				//
				var level0Val="";
				var level1Val="";
				var level2Arr=[];
				if(sub_list["plus_plans"].length > 0){
					level0Val = sub_list['free_plans']['country'];
					level1Val = sub_list['plus_plans'][0];
				}else{
					level0Val = sub_list['free_plans']['country'];
					level1Val = sub_list['free_plans']['state'];
				}
				//

				var geoMasterData=[];
				for(var i=0;i<data['master'].length;i++){
					var obj={};
					obj['id_0']=data['master'][i]['_source'].id_0;
					obj['id_1']=data['master'][i]['_source'].id_1;
					obj['id_2']=data['master'][i]['_source'].id_2;
					obj['id_3']=data['master'][i]['_source'].id_3;
					obj['name_0']=data['master'][i]['_source'].name_0;
					obj['name_1']=data['master'][i]['_source'].name_1;
					obj['name_2']=data['master'][i]['_source'].name_2;
					obj['name_3']=data['master'][i]['_source'].name_3;
					geoMasterData.push(obj);

					if(level2Arr.length<3){
						if(level1Val == data['master'][i]['_source'].id_1){
							level2Arr.push(data['master'][i]['_source'].id_2);
						}
					}

				}


				//
				selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
				var pathname1 = window.location.pathname;
				var prmsDt = $.deparam.fragment();
				var prms={level0:level0Val.toString(), level1:level1Val.toString(), level:2, field:selectedVariable[0], year:'2011' };
				prms["geoid"]=level2Arr.toString();
				prms["key_2_"+level1Val+"_arr"]=level2Arr.toString();
				var r =$.param.fragment(pathname1, prms, 2 );
				var prms1 = $.deparam.fragment();
				if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
				//$.bbq.pushState(r);
				//

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


			});

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

	});
}



var level0_Id,level1_Id,levelId,yearId,fieldId,levelType;
//hashparams call
var selectedField='';
function hashParams(){

	removeSVG();
	hashflag1=1;
	// Url Param Load Function
	var prms = $.deparam.fragment();

	if(Object.keys(prms).length > 0){
		level0_Id = prms.level0;
		yearId = prms.year;
		fieldId = prms.field;
		var selectedid = prms.selected;
		var level2;
		var level2=[];

		if(sub_list['plus_plans'].length == 0){
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

			/*var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment();
			var prms ={field:'IND_PCA_01'};
			var r =$.param.fragment(pathname1,prms,2 );
			$.bbq.pushState(r);
			var prms1 = $.deparam.fragment();*/
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
				applySelectedVariable();

				var selectedMyVariableId = fieldId.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '_');
				var re = new RegExp(" ", 'g');
				selectedMyVariableId = selectedMyVariableId.replace(re, '_');
				d3.select("#"+selectedMyVariableId).attr('class','selected');
			});
		}
	
	}
}

var fieldId;
function setMenuData(){

	keyParameterArr=[];
	snapshotKeyArray=[];

	hashflag1=1;
	// Url Param Load Function
	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
		level0_Id = prms.level0;
		yearId = prms.year;
		fieldId = prms.field.toLowerCase();
		levelId = prms.level;
		//var level1Arr = prms.level1;


		var selectedid = prms.selected;
		var filtercountry = document.getElementById("level_0_Id").value;
		var yearText = document.getElementById("yearId")
		var level1Data = menuData.level1;
		var keysData = menuData.keys;
	

		document.getElementById("geo_level").value=levelId;
		$("#geo_level").data("selectBox-selectBoxIt").add();
		onLevelChange();
		
		var level1Arr = prms.level1.split(",");

		var jVal=0;
		if(levelId==2){
			for(var i=0;i<level1Arr.length;i++){
				var level1value = level1Arr[i];
				var keyname = "key_2_"+level1value+"_arr";
				var levelArr=prms[keyname].split(",");
			
				for(var j=0;j<levelArr.length;j++){
					if(jVal != 0){
						if(!document.getElementById("geo_level1_"+jVal)){
							addNewRow();
						}
					}
					document.getElementById("geo_level1_"+jVal).value=level1value;
					$("#geo_level1_"+jVal).data("selectBox-selectBoxIt").add();
					geoLevel1Change("geo_level1_"+jVal,"geo_level2_"+jVal);

					document.getElementById("geo_level2_"+jVal).value=levelArr[j];
					$("#geo_level2_"+jVal).data("selectBox-selectBoxIt").add();
					jVal=jVal+1;
				}
			}
		applyGeoVariable();
		}

		if(levelId==3){
			for(var i=0;i<level1Arr.length;i++){
				var level1value = level1Arr[i];
				var keyname2 = "key_2_"+level1value+"_arr";
				var level2Arr=prms[keyname2].split(",");

				for(var j=0;j<level2Arr.length;j++){
					var level2value = level2Arr[j];
					var keyname3 = "key_3_"+level2value+"_arr";
					var level3Arr=prms[keyname3].split(",");

					for(var k=0;k<level3Arr.length;k++){
						if(jVal != 0){
							if(!document.getElementById("geo_level1_"+jVal)){
								addNewRow();
							}
						}
						document.getElementById("geo_level1_"+jVal).value=level1value;
						$("#geo_level1_"+jVal).data("selectBox-selectBoxIt").add();
						geoLevel1Change("geo_level1_"+jVal,"geo_level2_"+jVal);

						document.getElementById("geo_level2_"+jVal).value=level2Arr[j];
						$("#geo_level2_"+jVal).data("selectBox-selectBoxIt").add();
						geoLevel2Change("geo_level1_"+jVal,"geo_level2_"+jVal,"geo_level3_"+jVal);

						document.getElementById("geo_level3_"+jVal).value=level3Arr[k];
						$("#geo_level3_"+jVal).data("selectBox-selectBoxIt").add();

						jVal=jVal+1;
					}
				}
			}
		applyGeoVariable();
		}

		// year load
		var optyear = document.createElement('option');
		optyear.innerHTML = 2011;
		optyear.value = 2011;
		yearText.appendChild(optyear);
		//
		document.getElementById('yearId').value = yearId;
		var yearval = document.getElementById("yearId").value;

		colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
			return d3.hsl(rgb);
		});

		if(fieldId){

			for(var j=0;j<variableCategory.length;j++){
				if(fieldId.toLowerCase() == variableCategory[j]._source['key'].toLowerCase()){
					document.getElementById('fieldDetails').innerHTML = variableCategory[j]._source['title'] +' in '+ variableCategory[j]._source['units'];
				}
			}
			for(key in myVariables){
				for(var key1 in myVariables[key]){
					for(var key2 in myVariables[key][key1]){
						if(myVariables[key][key1][key2]['id'] == fieldId){
							document.getElementById('fieldDetails').innerHTML = myVariables[key][key1][key2]['name'] +' in '+ myVariables[key][key1][key2]['unit'];
						}
					}
				}
			}

			var field = fieldId.replace('_',' ');
			field = field.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			var units ="";	
			field = field.replace(/_/g,' ').toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});		
			//document.getElementById('fieldDetails').innerHTML = field + units;	
		}
		dataLoad(level0_Id,fieldId,yearId,levelId);	
	}
}


function fieldChange(fieldid){
	
	fieldId = fieldid;
	for(var i=0;i<selectedVariable.length;i++){
		d3.select("#"+selectedVariable[i]).attr('class','');	 
	}

	for(var i=0;i<selectedMyVariable.length;i++){
		var selectedMyVariableId = selectedMyVariable[i];
		var re = new RegExp(" ", 'g');
		selectedMyVariableId = selectedMyVariableId.replace(re, '_');
		d3.select("#"+selectedMyVariableId).attr('class','');
		if(fieldId == selectedMyVariableId){
			fieldId = selectedMyVariable[i];
		}
	}

	d3.select("#"+fieldId).attr('class','selected');

	removeSVG();
	var level0_Id = document.getElementById('level_0_Id').value;
	var levelval = document.getElementById('geo_level').value;
	var yearId = document.getElementById('yearId').value;
	var geoLevel = document.getElementById('geo_level').value;


	if(selectedField !=fieldId){
		/*var pathname1 = window.location.pathname;
		var prms = $.deparam.fragment();
		prms["field"]=fieldId;
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);*/
		// bbq
		var pathname1 = window.location.pathname;
		var prms = $.deparam.fragment();
		if(geoLevel==2){
			var stateArr=[];
			
			for(var key in selectedGeoVariable){
				stateArr.push(key);
				//prms["key_"+key] = key;
				var arr=[];
				for(var key1 in selectedGeoVariable[key]){
					arr.push(selectedGeoVariable[key][key1].toString());
				}
				prms["key_2_"+key+"_arr"] = arr.toString();
			}
			prms["field"]=fieldId;
			prms["level1"]=stateArr.toString();
			prms["geoid"]=selectedGeoId.toString();
			prms["level"]=2;
		}else if(geoLevel==3){
			var stateArr=[];
			for(var key in selectedGeoVariable){
				stateArr.push(key);
				var arr=[];
				for(var key1 in selectedGeoVariable[key]){
					arr.push(key1.toString());
					var arr1=[];
					for(var key2 in selectedGeoVariable[key][key1]){
						arr1.push(selectedGeoVariable[key][key1][key2].toString());
					}
					prms["key_3_"+key1+"_arr"] = arr1.toString();
				}
				prms["key_2_"+key+"_arr"] = arr.toString();
			}
			prms["field"]=fieldId;
			prms["level1"]=stateArr.toString();
			prms["geoid"]=selectedGeoId.toString();
			prms["level"]=3;
		}
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
		// bbq

	}else{
		for(var j=0;j<variableCategory.length;j++){
			if(fieldId.toLowerCase() == variableCategory[j]._source['key'].toLowerCase()){
				document.getElementById('fieldDetails').innerHTML = variableCategory[j]._source['title'] +' in '+ variableCategory[j]._source['units'];	
			}
		}	
		dataLoad(level0_Id,fieldId,yearId,levelval);
	}
	selectedField = fieldId;
	selectedYear = yearId;
}


function onLevelChange(){
	tableRowCount={};	//reset table row count
	geoMenuDataLoad();
}

var stateDim,districtDim,talukDim;
function geoMenuDataLoad(){

	var geoLevel=document.getElementById('geo_level').value;
	var geoMenuContent="";

	if(geoLevel==2){
		geoMenuContent+='<tr>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox">'+
					 '<select class="custom_selectbox" id="geo_level1_0" onchange="geoLevel1Change('+"'geo_level1_0','geo_level2_0'"+');">'+
					    '<option value="0">Select State</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox">'+
					 '<select class="custom_selectbox" id="geo_level2_0">'+
					    '<option value="0">Select District</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				'<td><span id="add_row_0" class="var-add" onclick="addNewRow()"></span></td>'+
				'</tr>';

		document.getElementById('geo_content_id').innerHTML=geoMenuContent;

		var state = stateDim.group(function(t) { return t; });
		var stateLength = state.top(Infinity);

		var geoLevel1 = document.getElementById('geo_level1_0');
		for(var i=0;i<stateLength.length;i++){
			var stateValue = stateLength[i].key.split("$");
			var optlevel0 = document.createElement('option');
			optlevel0.innerHTML = stateValue[1];
			optlevel0.value = stateValue[0];
			geoLevel1.appendChild(optlevel0);
		}
		$('#geo_level1_0').selectBoxIt({ defaultText: '', autoWidth: false });
		$('#geo_level2_0').selectBoxIt({ defaultText: '', autoWidth: false });

	}else if(geoLevel==3){

		geoMenuContent+='<tr>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox">'+
					 '<select class="custom_selectbox" id="geo_level1_0" onchange="geoLevel1Change('+"'geo_level1_0','geo_level2_0'"+');">'+
					    '<option value="0">Select State</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox">'+
					 '<select class="custom_selectbox" id="geo_level2_0" onchange="geoLevel2Change('+"'geo_level1_0','geo_level2_0','geo_level3_0'"+');">'+
					    '<option value="0">Select District</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox">'+
					 '<select class="custom_selectbox" id="geo_level3_0">'+
					    '<option value="0">Select Taluk</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				'<td><span id="add_row_0" class="var-add" onclick="addNewRow()"></span></td>'+
				'</tr>';

		document.getElementById('geo_content_id').innerHTML=geoMenuContent;

		var state = stateDim.group(function(t) { return t; });
		var stateLength = state.top(Infinity);

		var geoLevel1 = document.getElementById('geo_level1_0');
		for(var i=0;i<stateLength.length;i++){
			var stateValue = stateLength[i].key.split("$");
			var optlevel0 = document.createElement('option');
			optlevel0.innerHTML = stateValue[1];
			optlevel0.value = stateValue[0];
			geoLevel1.appendChild(optlevel0);
		}
		$('#geo_level1_0').selectBoxIt({ defaultText: '', autoWidth: false });
		$('#geo_level2_0').selectBoxIt({ defaultText: '', autoWidth: false });
		$('#geo_level3_0').selectBoxIt({ defaultText: '', autoWidth: false });
	}
	tableRowCount["rowcount"] = 0;
}


function geoLevel1Change(geoLevel1SelectId,geoLevel2SelectId){

	var geoLevel1Value = document.getElementById(geoLevel1SelectId).value;
	var geoLevel1Id = document.getElementById(geoLevel1SelectId);
	var geoLevel1Name = geoLevel1Id.options[geoLevel1Id.selectedIndex].innerHTML;

	var stateFilter = geoLevel1Value+"$"+geoLevel1Name;

	var state = stateDim.filter(stateFilter).top(Infinity);

	var distObj={};
	for(var i=0;i<state.length;i++){
		distObj[state[i].id_2]=state[i].name_2;
	}

	$("#"+geoLevel2SelectId).html("");
	var geoLevel2 = document.getElementById(geoLevel2SelectId);
	var optlevel0 = document.createElement('option');
	optlevel0.innerHTML = "Select District";
	optlevel0.value = "0";
	geoLevel2.appendChild(optlevel0);
	for(key in distObj){
		var optlevel0 = document.createElement('option');
		optlevel0.innerHTML = distObj[key];
		optlevel0.value = key;
		geoLevel2.appendChild(optlevel0);
	}
	$("#"+geoLevel2SelectId).data("selectBox-selectBoxIt").add();

	stateDim.filterAll();
}

function geoLevel2Change(geoLevel1SelectId,geoLevel2SelectId,geoLevel3SelectId){

	var geoLevel1Value = document.getElementById(geoLevel1SelectId).value;
	var geoLevel1Id = document.getElementById(geoLevel1SelectId);
	var geoLevel1Name = geoLevel1Id.options[geoLevel1Id.selectedIndex].innerHTML;
	var geoLevel2Value = document.getElementById(geoLevel2SelectId).value;

	var stateFilter = geoLevel1Value+"$"+geoLevel1Name;
	var state = stateDim.filter(stateFilter).top(Infinity);

	var dist = districtDim.filter(geoLevel2Value).top(Infinity);

	var talukObj={};
	for(var i=0;i<dist.length;i++){
		if(dist[i].name_3){
			talukObj[dist[i].id_3]=dist[i].name_3;
		}
	}

	$("#"+geoLevel3SelectId).html("");
	var geoLevel3 = document.getElementById(geoLevel3SelectId);
	for(key in talukObj){
		var optlevel0 = document.createElement('option');
		optlevel0.innerHTML = talukObj[key];
		optlevel0.value = key;
		geoLevel3.appendChild(optlevel0);
	}
	$("#"+geoLevel3SelectId).data("selectBox-selectBoxIt").add();

	stateDim.filterAll();
	districtDim.filterAll();
}


var tableRowCount={};
function addNewRow(){

	var geoLevel = document.getElementById('geo_level').value;

  	var table = document.getElementById("geo_content_id");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

	if(tableRowCount["rowcount"]){
		tableRowCount["rowcount"] = tableRowCount["rowcount"]+1;
	}else{
		tableRowCount["rowcount"] = 1;
	}
	var countval = tableRowCount["rowcount"];

	// state load
	var cell1 = row.insertCell(0);
	var divelement1 = document.createElement("div");
	divelement1.className = "select-wrap1 variable-selectbox";
	var element1 = document.createElement("select");
	element1.id = "geo_level1_"+countval;
	element1.className = "custom_selectbox";
	element1.onchange = function() { 
		geoLevel1Change("geo_level1_"+countval,"geo_level2_"+countval);
	};
	divelement1.appendChild(element1);
	cell1.appendChild(divelement1);

	var o = document.createElement('option');
	o.value = "0";
	o.text = "Select State";
	element1.options.add(o);
	divelement1.appendChild(element1);


	var state = stateDim.group(function(t) { return t; });
	var stateLength = state.top(Infinity);

	var geoLevel1 = document.getElementById("geo_level1_"+countval);
	for(var i=0;i<stateLength.length;i++){
		var stateValue = stateLength[i].key.split("$");
		var optlevel0 = document.createElement('option');
		optlevel0.innerHTML = stateValue[1];
		optlevel0.value = stateValue[0];
		geoLevel1.appendChild(optlevel0);
	}
	$("#geo_level1_"+countval).selectBoxIt({ defaultText: '', autoWidth: false });

	// district load
	var cell2 = row.insertCell(1);
	var divelement2 = document.createElement("div");
	divelement2.className = "select-wrap1 variable-selectbox";
	var element2 = document.createElement("select");
	element2.id = "geo_level2_"+countval;
	element2.className = "custom_selectbox";
	if(geoLevel==3){
		element2.onchange = function() { 
			geoLevel2Change("geo_level1_"+countval,"geo_level2_"+countval,"geo_level3_"+countval);
		};
	}
	divelement2.appendChild(element2);
	cell2.appendChild(divelement2);

	var o = document.createElement('option');
	o.value = "0";
	o.text = "Select District";
	element2.options.add(o);
	divelement2.appendChild(element2);

	$("#geo_level2_"+countval).selectBoxIt({ defaultText: '', autoWidth: false });

	if(geoLevel==3){
		// taluk load
		var cell3 = row.insertCell(2);
		var divelement3 = document.createElement("div");
		divelement3.className = "select-wrap1 variable-selectbox";
		var element3 = document.createElement("select");
		element3.id = "geo_level3_"+countval;
		element3.className = "custom_selectbox";
		divelement3.appendChild(element3);
		cell3.appendChild(divelement3);

		var o = document.createElement('option');
		o.value = "0";
		o.text = "Select Taluk";
		element3.options.add(o);
		divelement3.appendChild(element3);

		$("#geo_level3_"+countval).selectBoxIt({ defaultText: '', autoWidth: false });

		// add arrow
		var cell4 = row.insertCell(3);
		var element4 = document.createElement("span");
		element4.id = "add_row_"+countval;
		element4.classList.add("var-add");
		element4.onclick = function() { addNewRow() };
		cell4.appendChild(element4);

		// Close arrow 
		var cell5 = row.insertCell(4);
		var element5 = document.createElement("span");
		element5.id = "close_arrow_"+countval;
		element5.classList.add("var-close");
		element5.onclick = function() { deleteRow(this); };
		cell5.appendChild(element5);

	}else{

		// add arrow
		var cell3 = row.insertCell(2);
		var element3 = document.createElement("span");
		element3.id = "add_row_"+countval;
		element3.classList.add("var-add");
		element3.onclick = function() { addNewRow() };
		cell3.appendChild(element3);

		// Close arrow 
		var cell4 = row.insertCell(3);
		var element4 = document.createElement("span");
		element4.id = "close_arrow_"+countval;
		element4.classList.add("var-close");
		element4.onclick = function() { deleteRow(this); };
		cell4.appendChild(element4);

	}

}

function deleteRow(row){
	var table=document.getElementById("geo_content_id");
	var i=row.parentNode.parentNode.rowIndex;

	bootbox.dialog({
		message: "Are you sure want to remove?",
		buttons: {
		no: {
			label: "No"
		},
		yes: {
			label: "Yes",
			callback: function() {
					table.deleteRow(i);
			}
		}
		}
	});
}


var level1Obj={};
var levelsObj={};
var selectedGeoVariable={};
var selectedGeoId=[];
function applyGeoVariable(){
	level1Array=[];
	applySelectedVariable();

	var geoLevel = document.getElementById('geo_level').value;
	selectedGeoVariable={};
	selectedGeoId=[];
	level1Obj={};
	levelsObj={};

	for(var i=0;i<=tableRowCount["rowcount"];i++){
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
						//selectedGeoVariable[geoLevel1Value].push(geoLevel3Value);
						selectedGeoVariable[geoLevel1Value][geoLevel2Value].push(geoLevel3Value);
					}else{
						//selectedGeoVariable[geoLevel1Value]=[geoLevel3Value];
						selectedGeoVariable[geoLevel1Value][geoLevel2Value]=[geoLevel3Value];
					}
				}else{
					selectedGeoVariable[geoLevel1Value]={};
					//selectedGeoVariable[geoLevel1Value][geoLevel2Value] = [];
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
			geoVariableContent+='<a title="'+levelsObj[selectedGeoVariable[key][key1]]+'" class="group-item">'+levelsObj[selectedGeoVariable[key][key1]]+'</a>';
		}
		geoVariableContent+='</li>';
	}
	level1Array = _.uniq(level1Array);
	if(geoVariableContent){
		document.getElementById('geo-var-sec').innerHTML=geoVariableContent;
	}else{
		document.getElementById('geo-var-sec').innerHTML="";
	}


	for(var i=0;i<level1Array.length;i++){
		var keyIdkeys=[];
		for(var j=0;j<masterData.length;j++){
			if(masterData[j]){
				keyIdkeys.push(masterData[j].key);
			}
		}
		var keyId = level0_Id+"_"+level1Array[i]+"_"+levelId+"_"+yearId;
		if(($.inArray(keyId, keyIdkeys) == -1)){
			master = {};
			master["key"] = keyId;
			master["topojson"] = "0";
			masterData.unshift(master);
		}
	}
	if(masterData.length > 4){
		masterData.length=4;
	}

}





function removeSVG(){
	d3.selectAll('.legend').remove();
	d3.select("#mapview").select('div').remove();
	document.getElementById('fieldDetails').innerHTML="";
	document.getElementById("fieldDetails").style.visibility='hidden'; 
}


var colors, color;
// level2 variables
var maxvall, minvalue, minvalue, secval, midval, midval1, forval, maxvall, rawData;
var yearVal, KeyVal, level_2;
// level3 variables
var l3_RawData,l3_KeyVal,l3_YearVal,l3_level_3,l3_level_2;
var masterData = new Array(4);
var fullCompareData=[];
//load level2 and level3 level data
var level1Array=[];
function dataLoad(level0_Id,fieldId,yearId,levelId){

	var category="";
	var index_name = '';
	for(var j=0;j<variableCategory.length;j++){
		if(fieldId == variableCategory[j]._source['key'].toLowerCase()){
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
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id ==fieldId  ){
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

	if(levelId){
		if(levelId == 2){
			levelType = "District";
		}else if(levelId == 3){
			levelType = "Taluk";
		}

		d3.json("/app/places/compare?id="+selectedGeoId+"&category="+category+"&varkey="+fieldId+"&index="+index_name+"&level="+parseInt(levelId)+"", function(data) {
		//d3.json("/app/places/"+level1_Id[0]+"/region?category=demographic&regionkey="+fieldId+"&index=demographic&level="+parseInt(levelId)+"&level0="+level0_Id+"&leveltype="+levelType+"", function(data) {
			for(i=0;i<data.length;i++){
				for(var key in data[i]){
					parameter = _.omit(data[i][key], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','idmap70','key','leveltype','collecteddate','latitude','longitude']);
					for(varkey in parameter){
						var arr={};
						if(parseInt(levelId) == 2){
							arr['id_1'] = data[i][key].id_1;
							arr['id_2'] = data[i][key].id_2;
							arr['name_1'] = data[i][key].name_1;
							arr['name_2'] = data[i][key].name_2;
						}else if(parseInt(levelId) == 3){
							arr['id_2'] = data[i][key].id_2;
							arr['name_2'] = data[i][key].name_2;
							arr['id_3'] = data[i][key].id_3;
							arr['name_3'] = data[i][key].name_3;
						}
						arr['year'] = 2011;
						arr['key']=varkey.toLowerCase();
						arr['value']=data[i][key][varkey];
						fullCompareData.push(arr);
						//level1Array.push(data[i][key].id_1);
					}
				}
			}
			//level1Array = _.uniq(level1Array);
			/*for(var i=0;i<level1Array.length;i++){
				var keyId = level0_Id+"_"+level1Array[i]+"_"+levelId+"_"+yearId;
				master = {};
				master["key"] = keyId;
				master["topojson"] = "0";
				masterData.unshift(master);
					
			}
			if(masterData.length > 4){
				masterData.length=4;
			}*/

			if(levelId == 2){
				compareData_level2('');
			}
			if(levelId == 3){
				compareData_level3('');
			}
		});
	  }

}

var snapLevel,snapURL;
var mapViewContent="";
function compareData_level2(d){

	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select(".mapRect").style('display','block');

	var dataById={};

	var topoJsonAvailable = 0;
	var topoJsonMap = "";
	/*for(var i=0;i<level1Array.length;i++){
		var keyId = level0_Id+"_"+level1Array[i]+"_"+levelId+"_"+yearId;
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
	}*/
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
	key = keyVal.filter(fieldId);
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
	legend1(minvalue, secval, midval1, forval, maxvall);

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

	mapViewContent="";
	for(var i=0;i<level1Array.length;i++){
		//mapViewContent+='<div id="spacialcontent_'+level1Array[i]+'" style="visibility:hidden">No Data</div>';
		if(i==0){
			mapViewContent+='<div class="col-lg-12"><div id="spacialcontent_'+level1Array[i]+'" style="visibility:hidden">No Data</div><div class="col-lg-6" id="map_'+level1Array[i]+'"></div>';
			mapViewContent+='<div class="col-lg-6" id="bar_'+level1Array[i]+'"></div>';
			mapViewContent+='</div>';
		}else{
			mapViewContent+='<div class="col-lg-6"><div id="spacialcontent_'+level1Array[i]+'" style="visibility:hidden">No Data</div><div id="map_'+level1Array[i]+'"></div></div>';
		}

	}

	if(mapViewContent){
		document.getElementById('mapview').innerHTML=mapViewContent;
	}else{
		document.getElementById('mapview').innerHTML="";
		var mapViewContent="";
		mapViewContent+='<div class="col-lg-12"><div id="spacialcontent" style="visibility:hidden">No Data</div><div class="col-lg-6" id="map"></div>';
		mapViewContent+='<div class="col-lg-6" id="bar"></div>';
		mapViewContent+='</div>';
		document.getElementById('mapview').innerHTML=mapViewContent;
	}

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
		loadTopoJson(level1Id);
	}

	function loadTopoJson(level1Id){
		chart(fieldId,yearId,400,500,level1Id);
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

var rateById = d3.map();
var border = 2;
var bordercolor = 'rgb(205,201,201)';
var width = 420,
    height = 450,
    centered;
var margin = {top: 20, right: 120, bottom: 20, left: 120};
var svg,svg2;


function level2TopojsonLoad(tn, level0_Id, level1Id, dataById , x, y, k, yearId){

        svg = d3.select("#map_"+level1Id).append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');
        svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor).style("fill", "none").style("stroke-width", border);//.attr("transform", "translate( 100,50)");
	svg2 = svg.append("g");

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
										return dataById[d.id];
									}).value(function(d) {
										return +d.properties[field];
									});
		geometries = tn.objects.levels.geometries; 
		features = carto.features(tn, geometries);		
			   
 	 	svg2.append("svg").attr("width", width).attr("height", height).attr("id", "svg_id")
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
						d3.select('#spacialcontent_'+level1Id).style('visibility','');
						d3.select('#spacialcontent_'+level1Id).html( "No Data");
					    }else{
						d3.select('#spacialcontent_'+level1Id).style('visibility','');
						d3.select('#spacialcontent_'+level1Id).html( dt[0].name_2 + ' <span class="value">(' + dt[0].value + ')</span>')
						d3.select(this).style('opacity', 0.3)
						//this.parentNode.appendChild(this);
					    }
					}
				}).on('mouseout', function(d) {
        				 d3.select('#spacialcontent_'+level1Id).style('visibility','hidden'); 
					 if(d.id){  	
 					    d3.select('#spacialcontent_'+level1Id).style('visibility','hidden');	
					    d3.select(this).style('opacity', 1)
					    //this.parentNode.appendChild(this);
					 }
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
				});

		svg2.selectAll("path").classed("active", centered && function(d) {
		    		return d === centered;
		});
		svg2.attr("transform", "rotate(0)").transition().duration(0).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");

	}else{  
	   var text = svg2.append("svg:text").attr("x", 250).attr("class", "nomap").attr("y", 200).attr("dy", ".35em").attr("text-anchor", "middle").style("font", "100 28px sans-serif").text("No Map");
	   var bbox = text.node().getBBox();
	}
	document.getElementById("fieldDetails").style.visibility=''; 
}



function compareData_level3(d){

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
	var keyId = level0_Id+"_"+level1_Id+"_3_"+yearId;
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
	key = l3_KeyVal.filter(fieldId);
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
	legend1(minvalue, secval, midval1, forval, maxvall);

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

	mapViewContent="";
	for(var i=0;i<level1Array.length;i++){

		mapViewContent+='<div id="spacialcontent_'+level1Array[i]+'"></div>';
		mapViewContent+='<div><div class="col-lg-6" id="map_'+level1Array[i]+'"></div>';
		if(i==0){
			mapViewContent+='<div class="col-lg-6" id="bar_'+level1Array[i]+'"></div>';
		}
		mapViewContent+='</div>';
	}
	
	if(mapViewContent){
		document.getElementById('mapview').innerHTML=mapViewContent;
	}else{
		document.getElementById('mapview').innerHTML="";
	}

	for(var i=0;i<level1Array.length;i++){
		loadTopoJson(level1Array[i]);
	}

	function loadTopoJson(level1Id){
		var tn;
		if(topoJsonAvailable == 1){
			tn = topoJsonMap;
			topoJsonAvailable =0 ;
			level3TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k ,yearId);
		}else{
			d3.json("/static/region_explorer/TOPO/"+level0_Id+"_"+level1Id+"_3_"+yearId+"_"+levelType.toLowerCase()+"_topo.json", function(tn) {//TN_2001.json
				for(i= 0; i < masterData.length; i++ ){
					if(masterData[i]){
						if(masterData[i].key == keyId ){
							if(masterData[i].topojson == '0'){
								masterData[i]["topojson"]=tn
							}
						}
					}
				}	
				level3TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k,yearId);
			});
		}
		level_3_LevelChart(fieldId,yearId,400,500,level1Id);
	}

}

function level3TopojsonLoad(tn, level0_Id, level1Id, dataById, x, y, k, yearId){
	
        svg = d3.select("#map_"+level1Id).append("svg").attr("width", width).attr("height", height).attr("left", "500").style('background-color','#F6F9FE');
        svg.append("rect").attr("class", "mapRect").attr("width", width).attr("height", height).style("stroke", bordercolor).style("fill", "none").style("stroke-width", border);//.attr("transform", "translate( 100,50)");

	svg2 = svg.append("g");

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
									return dataById[d.id];
								}).value(function(d) {
									return +d.properties[field];
								});	
		
	      geometries = tn.objects.levels.geometries; 
	      features = carto.features(tn, geometries);	
	      svg2.append("svg").attr("width", width).attr("height", height).attr("id", "svg_id")
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
				       d3.select('#spacialcontent_'+level1Id).style('visibility','');	
				       d3.select('#spacialcontent_'+level1Id).html("No Data");
				    }else {
				       d3.select('#spacialcontent_'+level1Id).style('visibility','');	
				       d3.select('#spacialcontent_'+level1Id).html( dt[0].name_3 + ' <span class="value">(' + dt[0].value + ')</span>')
				       d3.select(this).style('opacity', 0.3)
				       this.parentNode.appendChild(this);
				    }
				}
			}).on('mouseout', function(d) {
				d3.select('#spacialcontent_'+level1Id).style('visibility','hidden');
				if(d.id){	
				    d3.select('#spacialcontent_'+level1Id).style('visibility','hidden');	
				    d3.select(this).style('opacity', 1)
				    this.parentNode.appendChild(this);
			       	}
			}).on("contextmenu", function(d){
				snapLevel = 3;
				snapURL = "scisphere/places/"+level1Id+"/"+d.id+"?level=3&level0="+level0_Id+"&year="+yearId;
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
			
				    	
			})//.on("click", level3)
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

			d3.select("#map").selectAll('.legend').remove();

			var legend = d3.select("#map_legend").append("svg").attr("class", "legend").attr("width", 265).attr("height", 75).selectAll("g").data(color.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
			    return "translate(" + i * 50 + ",30 )scale(0.8)";
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
			var legend = d3.select("#map_legend").append("svg").attr("class", "legend")
				.attr("width", 150).attr("height", 75).selectAll("g")
			.data(color_no_data_1.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none")
			//.attr("transform", "translate(" + 5 * 50 + ",30 )scale(0.8)" );
			.attr("transform", "translate(-14,30)scale(0.8)" );

			var ls_w = 20, ls_h = 20;

			legend.append("rect").attr("x", 18).attr("y", 06)
			.attr("width", ls_w + 40).attr("height", ls_h).style("fill","white").style("opacity", 0.8).attr("stroke"," #777").style('stroke-width', 0.8);

			legend.append("text").attr("x", 18).attr("y", 3) 
			.text("No Data");


		    }
		    else  {
			d3.select("#map_legend").selectAll('.legend').remove();
			color_no_data = d3.scale.linear().range(colors).domain([secval]);
			var legend = d3.select("#map").append("svg").attr("class", "legend").attr("width", 150).attr("height", 75).selectAll("g").data(color_no_data.domain().slice().reverse()).enter().append("g").attr("pointer-events", "none").attr("transform", function(d, i) {
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






function contextClick(){
	cancelSelection();
	d3.select("#pop-geo").attr("class","collapse pop-acc-content explore-popup-body clearfix").attr("style","");
	d3.select("#pop-variable").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-contextual").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function geoClick(){
	cancelSelection();
	d3.select("#pop-contextual").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-variable").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-geo").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

function myVarClick(){
	cancelSelection();
	d3.select("#pop-geo").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-contextual").attr("class","collapse pop-acc-content clearfix").attr("style","");
	d3.select("#pop-variable").attr("class","pop-acc-content clearfix collapse in ").attr("style","");
}

