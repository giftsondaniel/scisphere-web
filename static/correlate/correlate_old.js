var menuData;
window.onload = function(){
   $('#fieldDetails').html("Loading Data...");
   //d3.json("/app/subscription_list",function(data){
	//sub_list = data;

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
		selectedCorrelationFields.push(selectedVariable[0]);
		var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0], year:'2011' };//,selected: selectedid }
		var r =$.param.fragment(pathname1, prms, 2 );
		var prms1 = $.deparam.fragment();
		if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
		//$.bbq.pushState(r);
	
	}/* end of pushing values to hash params*/

     d3.json("/app/scisphere/places/countries" , function(data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
			}
		}
	d3.json('/app/mysphere_mybuilds_for_region_snapshot_list/33',function(data){

		/*check if data in MY Builds for a user*/
		if((data.MyBuild.length > 0)){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
			selectedVariable = (JSON.parse(newvar)['variable']);
			selectedMyVariable = (JSON.parse(newvar)['selectedMyVariable']);
			loadCorrelateView();
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
						if($.inArray(region['region_key'], selectedVariable)!= -1){
							selectedCorrelationFields.push(region['region_key']);
							var prms ={level0:region['level_0'], level1:region['level_1'], level:region['level'], field:region['region_key'], year:'2011' };
						}else{
							selectedCorrelationFields.push(selectedVariable[0]);
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
							selectedCorrelationFields.push(selectedVariable[0]);
							var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0], year:'2011' };//,selected: selectedid }	
						}else{
							selectedCorrelationFields.push(selectedVariable[0]);
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
	});

	//Working for country
	level0Data = data;
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
   //});
}


function level0Change(){
	var filterLevel0Id = document.getElementById("level_0_Id").value;
	d3.json("/app/scisphere/places/countrydetail?level0="+filterLevel0Id+"" , function(data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
			}
		}
		hashflag1=0;
		$("#level_1_Id").data("selectBox-selectBoxIt").remove();
		//$("#levelId").data("selectBox-selectBoxIt").remove();
		variableCategory = data["keys"];
		myVariables = data["myvariables"];

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
		// year load
		var optyear = document.createElement('option');
		optyear.innerHTML = 2011;
		optyear.value = 2011;
		yearId.appendChild(optyear);

		var yearval = document.getElementById("yearId").value;
		$('#yearId').data("selectBox-selectBoxIt").add();
		loadVariableCategory();
	});
}

//hashparams call
function hashParams(){
	hashflag1=1;
	// Url Param Load Function
	var prms = $.deparam.fragment();

	if(Object.keys(prms).length > 0){
		var level0_Id = prms.level0;
		var level1_Id = prms.level1;
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
				if(data){
					if(data['1001']){
						sessionClose(data['1001']);
					}
				}
				if(selectedMyVariable.length == 0){
					if(templatename){
						if(data["myvariables"]){
							if(data["myvariables"][templatename]){
								selectedMyVariable = []
								selectedMyVariable.push(data["myvariables"][templatename]['performancevariable'][0].id);
								if(selectedCorrelationFields.length <2){
									selectedCorrelationFields.push(data["myvariables"][templatename]['performancevariable'][0].id);
								}
							}
						}
					}	
				}else{
					selectedCorrelationFields.push(selectedMyVariable[0]);
				}
				variableCategory = data["keys"];
				myVariables = data["myvariables"];
				level1Data = data.level1;
				menuData = data;
				loadVariableCategory();
				setMenuData();
				//applySelectedVariable();
				applySelectedVariableCommon();
				//fieldChange('');
			});
		}
	}

}


var variableCategory,myVariables,units,description='';
var selectedGeoState=[]
var variableTotalPage=1;
var selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];

function applySelectedVariable(){
	applySelectedVariableCommon();
	var fieldTitle = "";
	var selectedLengthBefore = selectedCorrelationFields.length;
	var copySelectedCorrelationFields = JSON.parse(JSON.stringify(selectedCorrelationFields));

	for(var i=0;i<copySelectedCorrelationFields.length;i++){
		d3.select("#"+copySelectedCorrelationFields[i]).attr('class','selected');
	}
	/*for(var i=0;i<copySelectedCorrelationFields.length;i++){
		d3.select("#"+copySelectedCorrelationFields[i]).attr('class','selected');
		var fieldName = "";
		var checkIfVarInSelectedList=0;

		if((( $.inArray(copySelectedCorrelationFields[i], selectedMyVariable)) != -1)){
			if(myVariablesKey[copySelectedCorrelationFields[i]]){
				fieldName= myVariablesKey[copySelectedCorrelationFields[i]];
				checkIfVarInSelectedList=1;
			}
		}

		if((( $.inArray(copySelectedCorrelationFields[i], selectedVariable)) != -1)){	
			if(contextualVariableNameId[copySelectedCorrelationFields[i]]){
				fieldName= contextualVariableNameId[copySelectedCorrelationFields[i]];
				checkIfVarInSelectedList=1;
			}
		}

		if(checkIfVarInSelectedList == 0){
			selectedCorrelationFields = _.without(selectedCorrelationFields, copySelectedCorrelationFields[i]);
		}

		if(fieldTitle.length == 0){
			fieldTitle = fieldName +' <span class="page-subtitle">vs</span>  ';
		}else{
			fieldTitle = fieldTitle + fieldName;
		}
	}

	var selectedLengthAfter = selectedCorrelationFields.length;
	document.getElementById('fields-title').innerHTML = fieldTitle;

	if(selectedLengthBefore >selectedLengthAfter ){
		if(selectedLengthAfter==1){
			document.getElementById('Scatter_chart').innerHTML=" Please choose one more variable ";
		}
		if(selectedLengthAfter<1){
			document.getElementById('Scatter_chart').innerHTML=" Please Select two variables ";		
		}
	}*/

	loadCorrelateView();
	fieldChange("");

}

function loadCorrelateView(){
	var viewContent="";
	for(var i=0;i<selectedVariable.length;i++){

                viewContent+='<div class="col-lg-12" id="correlate_'+selectedVariable[i]+'" style="display:none">'+
                	'<h2 class="page-title" id="fields-title_'+selectedVariable[i]+'"> Loading Data ...</h2>'+
                    	'<div class="tab-sec correlate-tab clearfix">'+
                            '<ul class="nav nav-tabs rightpanel-map-tab" role="tablist" >'+
                                '<li class="active"><a href="#scatter_'+selectedVariable[i]+'" role="tab" data-toggle="tab" id="tab-map">Scatter</a></li>'+
                                '<li><a href="#whiskers_'+selectedVariable[i]+'" role="tab" data-toggle="tab" id="tab-grid">Box &amp; Whiskers</a></li>'+
                            '</ul>'+
                        '</div>'+
                        '<div class="tab-content correlate-tab-content clearfix">'+
                             '<div class="tab-pane active" id="scatter_'+selectedVariable[i]+'">'+
                            	'<div class="col-lg-12">'+
                                	'<div class="col-lg-7 tab-left">'+
                                    	'<p class="title-link-sec"><a onclick="change_axis('+"'"+selectedVariable[i]+"'"+');" title="Transpose Axes" style="color:red;" id="transpose_'+selectedVariable[i]+'" class="title-link">Transpose Axes</a></p>'+
                                        '<div class="graph-wrap" id="Scatter_chart_'+selectedVariable[i]+'" >'+
						'<div> Loading Data ... </div>	'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-lg-5">'+
                                    	'<div class="corr-block-view">'+
                                        	'<table border="0" class="block-view-table">'+
                                            	'<tr>'+
                                                	'<td width="110"><h4 class="title">Correlation</h4></td>'+
	                                                '<td><h3 class="value" id="cor_val_'+selectedVariable[i]+'"><sup><a href="#" class="correlate-info" data-toggle="tooltip" data-placement="right" title="Info"></a></sup></h3></td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                	'<td><h4 class="title">R<sup>2</sup> of linear fit</h4></td>'+
                                                   	'<td><h3 class="value" id="r2_val_'+selectedVariable[i]+'"><sup><a href="#" class="correlate-info" data-toggle="tooltip" data-placement="right" title="Info"></a></sup></h3></td>'+
                                                '</tr>'+
                                            '</table>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="tab-pane" id="whiskers_'+selectedVariable[i]+'">'+
                            	'<div class="col-lg-12">'+
                                	'<div class="col-lg-7 tab-left">'+
                                    	'<p class="title-link-sec"><a onclick="change_axis();" title="Transpose Axes" class="title-link-dis">Transpose Axes</a></p>'+
                                        '<div class="graph-wrap"  >'+
                                        	'<img src="/static/images/correlate-graph-2.png" alt="Correlate Graph" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-lg-5">'+
                                    	'<div class="corr-block-view">'+
                                        	'<table border="0" class="block-view-table">'+
                                            	'<tr>'+
                                                	'<td width="110"><h4 class="title">Correlation</h4></td>'+
                                                    	'<td><h3 class="value">0.70<sup><a href="#" class="correlate-info" data-toggle="tooltip" data-placement="right" title="Info"></a></sup></h3></td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                	'<td><h4 class="title">ANOVA</h4></td>'+
                                                    	'<td><h3 class="value">0.12<sup><a href="#" class="correlate-info" data-toggle="tooltip" data-placement="right" title="Info"></a></sup></h3></td>'+
                                                '</tr>'+
                                            '</table>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
	}

	if(viewContent){
		document.getElementById('correlateViewId').innerHTML=viewContent;
	}else{
		document.getElementById('correlateViewId').innerHTML="";
	}

	// re set correlate data image and value
	var numberFormat = d3.format(".2f");
	if(correlateData){
		if(correlateData.correlatedata){
			for(key in correlateData.correlatedata){
				if(key){
					d3.select('#correlate_'+key.toUpperCase()).style('display','');	
					document.getElementById('Scatter_chart_'+key.toUpperCase()).innerHTML="";
					document.getElementById('cor_val_'+key.toUpperCase()).innerHTML = "";
					document.getElementById('r2_val_'+key.toUpperCase()).innerHTML = "";
					$('#Scatter_chart_'+key.toUpperCase()).append('<img src="/media/correlate/'+key+'_1_'+correlateData.id+'.png"></img>');
					document.getElementById('cor_val_'+key.toUpperCase()).innerHTML = numberFormat(correlateData.correlatedata[key]["corcoef"]);
					document.getElementById('r2_val_'+key.toUpperCase()).innerHTML = numberFormat(correlateData.correlatedata[key]["rsquare"]);
				}

			}
		}
	}
	//

}


function setMenuData(){
	$("#level_1_Id").data("selectBox-selectBoxIt").remove();
	hashflag1=1;
	// Url Param Load Function
	var prms = $.deparam.fragment();

	if(Object.keys(prms).length > 0){
	var level0_Id = prms.level0;
	var level1_Id = prms.level1;
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

	// year load
	var optyear = document.createElement('option');
	optyear.innerHTML = 2011;
	optyear.value = 2011;
	yearId.appendChild(optyear);
	//	
	document.getElementById('level_1_Id').value = level1_Id;
	document.getElementById('yearId').value = yearid;
	var yearval = document.getElementById("yearId").value;

	$("#level_1_Id").data("selectBox-selectBoxIt").add();
	dataLoad(level0_Id,level1_Id,fieldval,yearid,selectedid);
	//fieldChange("");
	}
}



var selectedState='';
function level1Change(){
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var yearval = document.getElementById('yearId').value;

	if(level1_Id != 0){
		if(selectedState!=level1_Id){
			var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment();
			var prms ={level0:level0_Id, level1:level1_Id, field:fieldval, year:yearval };
			var r =$.param.fragment(pathname1 ,prms, 2 );
			$.bbq.pushState(r);
		}else{
			if(level0_Id != 0 && level1_Id != 0){
				dataLoad(level0_Id,level1_Id,fieldval,yearval);
			}
		}
		selectedState = level1_Id;
		/*For mybuilds*/
		//addToMyBuilds(fieldval);
		fieldChange(fieldval);
	}else{
		bootbox.alert("Please select a State.");
		return false;
	}
}


function addToMyBuilds(fieldid){
	console.log("addToMyBuilds");
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	mysphere_url_list="/app/mysphere_mybuilds_for_region_snapshot/"+level1_Id+"?level0="+level0_Id+"&region_key="+fieldid+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});
}



var fieldval;
var selectedField='';
var selectedYear='';
var selectedCorrelationFields = [];
var fieldName1 = '';
var fieldName2 = '';

function fieldChange(fieldid){
	if(fieldid){
		if(selectedCorrelationFields.length > 0){
			if($.inArray(fieldid, selectedCorrelationFields)!= -1){
				selectedCorrelationFields = _.without(selectedCorrelationFields, fieldid);
			} else {
				if(selectedCorrelationFields.length < 2 ){
					selectedCorrelationFields.push(fieldid);					
				}else{
					bootbox.alert("Please unselect a Variable to choose another variable.");
					return false;	
				}
			}
		} else {
			selectedCorrelationFields.push(fieldid);					
		}
	}
	
	fieldval = fieldid;

	var checkMyVarKeyFlag = 0;
	for(var i=0;i<selectedCorrelationFields.length;i++){
		if(myVariablesKey){
			if(myVariablesKey[selectedCorrelationFields[i]]){
				checkMyVarKeyFlag = 1; 
			}
		}
	}
	/*Alert on if No variable from My variable is selected*/
	if(selectedCorrelationFields.length ==2){
		if(checkMyVarKeyFlag == 0){
			selectedCorrelationFields = _.without(selectedCorrelationFields, fieldid);
			bootbox.alert("Please select any one My Variable.");
			return false;
		}
	}

	/*Contextual Variable Remove Selected*/
	d3.select("#All_Variables").attr('class','');
	for(var i=0;i<selectedVariable.length;i++){
		d3.select("#"+selectedVariable[i]).attr('class','');
	}

	/* MY Variable Remove Selected*/
	for(var i=0;i<selectedMyVariable.length;i++){
		var selectedMyVariableId = selectedMyVariable[i];	//.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '_');
		var re = new RegExp(" ", 'g');
		selectedMyVariableId = selectedMyVariableId.replace(re, '_');
		d3.select("#"+selectedMyVariableId).attr('class','');
		if(fieldid == selectedMyVariableId){
			fieldval = selectedMyVariable[i];
		}
	}


	for(var i=0;i<selectedCorrelationFields.length;i++){
		d3.select("#"+selectedCorrelationFields[i]).attr('class','selected');
	}

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var yearval = document.getElementById('yearId').value;
	if (level0_Id == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   return false;
	}
	//addToMyBuilds(fieldid);
	if(selectedCorrelationFields.length < 2){
		return false;
	}

	/*if(selectedField !=fieldid){
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, field:fieldid, year:yearval };
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}else{*/
		if(level0_Id != 0 && level1_Id != 0){
			dataLoad(level0_Id,level1_Id,fieldval,yearval);
		}
	//}
	selectedField = fieldval;
	selectedYear = yearval;
}

var correlateData;
var contextKeyId=[];
var contextKeyName=[];
var myvarKeyId=[];
var myvarKeyName=[];
function dataLoad(level0_Id,level1_Id,fieldid,yearval){
	//document.getElementById('Scatter_chart').innerHTML=" Loading Data ... ";
	var category="";
	var index_name = '';
	imageUniqueId="";
	contextKeyId=[];
	contextKeyName=[];
	myvarKeyId=[];
	myvarKeyName=[];

	var selectedcontextvariable=[];
	var dataBody = {};

	for(var i=0;i<selectedCorrelationFields.length;i++){
		if(myVariablesKey){
			if(myVariablesKey[selectedCorrelationFields[i]]){
				myvarKeyName.push(myVariablesKey[selectedCorrelationFields[i]]);
				myvarKeyId.push(selectedCorrelationFields[i]);
			}
		}
		if(selectedCorrelationFields[i]=="All_Variables"){
			for(var s=0;s<selectedVariable.length;s++){
				if(contextualVariableNameId[selectedVariable[s]]){
					selectedcontextvariable.push(selectedVariable[s]);
					myvarKeyObj[selectedVariable[s].toLowerCase()]= contextualVariableNameId[selectedVariable[s]];
					contextKeyName.push(contextualVariableNameId[selectedVariable[s]]);
					contextKeyId.push(selectedVariable[s].toLowerCase());
					for(var j=0;j<variableCategory.length;j++){
						if(selectedVariable[s] == variableCategory[j]._source['key']){
							index_name = variableCategory[j]._source['index_id'];
							category = index_name;
							if(dataBody["keys"]){
								dataBody["keys"].push(selectedVariable[s].toLowerCase());
							}else{
								dataBody["keys"] = [selectedVariable[s].toLowerCase()];
							}
						}
					}		
				}
			}
		}else{
			if(contextualVariableNameId[selectedCorrelationFields[i]]){
				selectedcontextvariable.push(selectedCorrelationFields[i]);
				contextKeyName.push(contextualVariableNameId[selectedCorrelationFields[i]]);
				contextKeyId.push(selectedCorrelationFields[i].toLowerCase());
				for(var j=0;j<variableCategory.length;j++){
					if(selectedCorrelationFields[i] == variableCategory[j]._source['key']){
						index_name = variableCategory[j]._source['index_id'];
						category = index_name;
						if(dataBody["keys"]){
							dataBody["keys"].push(selectedCorrelationFields[i].toLowerCase());
						}else{
							dataBody["keys"] =  [selectedCorrelationFields[i].toLowerCase()];
						}
					}
				}		
			} else {
				if(dataBody["keys"]){
					dataBody["keys"].push(selectedCorrelationFields[i]);
				}else{
					dataBody["keys"] =  [selectedCorrelationFields[i]];
				}
			}
		}
	}


	for(i=0;i<contextKeyId.length;i++){
		for(j=0;j<myvarKeyId.length;j++){
			var fieldTitle = contextKeyName[i] +' <span class="page-subtitle">vs</span> '+ myvarKeyName[j];
			document.getElementById("fields-title_"+contextKeyId[i].toUpperCase()).innerHTML = fieldTitle;
		}
	}



	//setting selected field and year	
	selectedField = fieldid;
	selectedYear = yearval;
	
	var url = "/app/places/correlate/"+level1_Id+"?contextKeyId="+contextKeyId+"&contextKeyName="+escape(contextKeyName)+"&myvarKeyId="+myvarKeyId+"&myvarKeyName="+escape(myvarKeyName)+"&category="+category+"&index="+index_name+"&level0="+level0_Id+"&selectedvariables="+JSON.stringify(selectedcontextvariable);

	$.ajax({
	    url: url,
	    type: 'post',
	    dataType: 'json',
	    success: function (data) {
			correlateData = data;
			if(data){
				if(data['subscription']){
					bootbox.alert(data['subscription']);
					//document.getElementById('Scatter_chart').innerHTML="No Data Found.";
					return false;
				}
				if(data['1001']){
					sessionClose(data['1001']);
				}
			}


			for(var i=0;i<selectedVariable.length;i++){
				d3.select('#correlate_'+selectedVariable[i]).style('display','none');
			}

			for(var i=0;i<selectedCorrelationFields.length;i++){
				d3.select("#"+selectedCorrelationFields[i]).attr('class','selected');
			}

			var numberFormat = d3.format(".2f");

			for(key in data.correlatedata){
				if(key){
					imageUniqueId=data.id;
					d3.select('#correlate_'+key.toUpperCase()).style('display','');	
					document.getElementById('Scatter_chart_'+key.toUpperCase()).innerHTML="";
					document.getElementById('cor_val_'+key.toUpperCase()).innerHTML = "";
					document.getElementById('r2_val_'+key.toUpperCase()).innerHTML = "";
					$('#Scatter_chart_'+key.toUpperCase()).append('<img src="/media/correlate/'+key+'_1_'+data.id+'.png"></img>');
					document.getElementById('cor_val_'+key.toUpperCase()).innerHTML = numberFormat(data.correlatedata[key]["corcoef"]);
					document.getElementById('r2_val_'+key.toUpperCase()).innerHTML = numberFormat(data.correlatedata[key]["rsquare"]);
				}

			}

	    },
	    error:  function (err) {
			console.log(err);
			for(var i=0;i<selectedCorrelationFields.length;i++){
					d3.select("#"+selectedCorrelationFields[i]).attr('class','selected');
			}
			for(var i=0;i<selectedVariable.length;i++){
				document.getElementById('Scatter_chart_'+selectedVariable[i]).innerHTML="No Data Found.";
				document.getElementById('cor_val_'+selectedVariable[i]).innerHTML = "";
				document.getElementById('r2_val_'+selectedVariable[i]).innerHTML = "";
			}
	    },	
	    data: JSON.stringify(dataBody)
	});

}

var imageUniqueId = "";
function change_axis(keyId){
	if($('#transpose_'+keyId).hasClass('title-link')){
		for(i=0;i<contextKeyId.length;i++){
			for(j=0;j<myvarKeyId.length;j++){
				if(contextKeyId[i] == keyId.toLowerCase()){
					var fieldTitle = myvarKeyName[j] +' <span class="page-subtitle">vs</span> '+ contextKeyName[i];
					document.getElementById("fields-title_"+keyId).innerHTML = fieldTitle;
				}
			}
		}

		$("#transpose_"+keyId).attr('class', '');
		document.getElementById("transpose_"+keyId).style.fontSize = "13px";	
		document.getElementById("transpose_"+keyId).style.color = "grey";		
		document.getElementById('Scatter_chart_'+keyId).innerHTML="";
		$('#Scatter_chart_'+keyId).append('<img src="/media/correlate/'+keyId.toLowerCase()+'_2_'+imageUniqueId+'.png"></img>');
	} else {
		for(i=0;i<contextKeyId.length;i++){
			for(j=0;j<myvarKeyId.length;j++){
				if(contextKeyId[i] == keyId.toLowerCase()){
					var fieldTitle = contextKeyName[i] +' <span class="page-subtitle">vs</span> '+ myvarKeyName[j];
					document.getElementById("fields-title_"+keyId).innerHTML = fieldTitle;
				}
			}
		}

		$("#transpose_"+keyId).attr('class', 'title-link');
		document.getElementById("transpose_"+keyId).style.color = "red";
		document.getElementById("transpose_"+keyId).style.fontSize = "13px";
		document.getElementById('Scatter_chart_'+keyId).innerHTML="";
		$('#Scatter_chart_'+keyId).append('<img src="/media/correlate/'+keyId.toLowerCase()+'_1_'+imageUniqueId+'.png"></img>');
	}
}



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

