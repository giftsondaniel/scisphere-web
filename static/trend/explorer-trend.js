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
var onLoad = 0;

var sub_list,level0Data,level1Data,levelsData;
function isInteger(x) {
    return x % 1 === 0;
}

window.onload = function(){
   $('#fieldDetails').html("Loading Data...");
   //$("#from_time_id").data("selectBox-selectBoxIt").remove();
   //$("#to_time_id").data("selectBox-selectBoxIt").remove();
   //d3.json("/app/subscription_list",function(data){
	//sub_list = data;
     /* Function for pushing values to hash params */
	function push_values_to_hash_params(level0Val,level1Val){
		if(!level0Val && !level1Val){
			if(sub_list["plus_plans"].length > 0){
				level0Val = sub_list['free_plans']['country'];
				level1Val = sub_list['plus_plans'][0];
			}else{
				level0Val = sub_list['free_plans']['country'];
				level1Val = sub_list['free_plans']['state'];
			}
		}
		selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
		if(selectedMyVariable.length > 0 ){
			var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment();
			var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedMyVariable[0] };//,selected: selectedid }
			var r =$.param.fragment(pathname1, prms, 2 );
			var prms1 = $.deparam.fragment();
		}else{

			var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment();
			var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedVariable[0] };//,selected: selectedid }
			var r =$.param.fragment(pathname1, prms, 2 );
			var prms1 = $.deparam.fragment();
		}
		if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
		//$.bbq.pushState(r);

	
	}/* end of pushing values to hash params*/



     //d3.json("/app/scisphere/places/countries" , function(data) {
     d3.json("/static/master_data/countries.json", function(data){
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

			//Load on change of region locations in another page of explore:
			var level0Val = JSON.parse(newvar)['level']['level_0'];
			var level1Val = JSON.parse(newvar)['level']['level_1'];

			if((JSON.parse(newvar).trend != '')){// && (JSON.parse(newvar)['trend'])){ /*check if data has regions values in MY Builds for a user*/
				var trend = JSON.parse(newvar)['trend'];
				if(JSON.parse(newvar)['level']){   /*check if levels are available in MY Builds for a user*/
		
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
			
						if((level0Val==trend['level_0']) && (level1Val==trend['level_1']) && (sub_list_not_in_level1 == 1)){	/*check if country and state in MY Builds for a user*/
							console.log(1);
							var pathname1 = window.location.pathname;
							var prmsDt = $.deparam.fragment();
							if($.inArray(trend['trend_key'], selectedMyVariable)!= -1){
								var prms ={level0:trend['level_0'], level1:trend['level_1'], level:trend['level'],
									  	field:trend['trend_key'],todate:trend['to_date'], frmdate:trend['from_date'],
										type:trend['date_type'] };
							} else {
								var prms ={level0:trend['level_0'], level1:trend['level_1'], level:trend['level'], field:selectedMyVariable[0]};
							}
								var r =$.param.fragment(pathname1 ,prms, 2 );

							var prms1 = $.deparam.fragment();
							if(Object.keys(prms1).length > 0){

							}else{  
								$.bbq.pushState(r);
							}

						} else if((sub_list_not_in_level1 == 1)) {
							console.log(2);
							var pathname1 = window.location.pathname;
							var prmsDt = $.deparam.fragment();
							if($.inArray(trend['trend_key'], selectedMyVariable)!= -1){
								var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedMyVariable[0] };//,selected: selectedid }	
							}else{
								var prms ={level0:level0Val, level1:level1Val, level:2, field:selectedMyVariable[0] };//,selected: selectedid }
							}
							var r =$.param.fragment(pathname1 ,prms, 2 );
							//$.bbq.pushState(r);
							var prms1 = $.deparam.fragment();
							if(Object.keys(prms1).length > 0){}else{  $.bbq.pushState(r);}
						} else {
							console.log(3);
							push_values_to_hash_params(level0Val,level1Val);
						}
				} else {
					push_values_to_hash_params(level0Val,level1Val);
				}
			} else {
				push_values_to_hash_params(level0Val,level1Val);
			}
		} else {
			push_values_to_hash_params("","");
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

	//$("#from_time_id").selectBoxIt({ defaultText: '', autoWidth: false });	
	//$("#to_time_id").selectBoxIt({ defaultText: '', autoWidth: false });	

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

	$('#levelId').data("selectBox-selectBoxIt").add();
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
 		fieldid = prms.field;
		var selectedid = prms.selected;
		var level2;
		var level2=[];


 		var dateType = prms.type;
		document.getElementById("time_type").value = dateType;

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
			loadData();
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
							selectedMyVariable = []
							selectedMyVariable.push(data["myvariables"][templatename]['performancevariable'][0].id);
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
				//selectedMyVariableProd = ["pv_16_3", "pv_18_13"];
				applySelectedVariable();

				loadData();

				var selectedMyVariableId = fieldid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '_');
				var re = new RegExp(" ", 'g');
				selectedMyVariableId = selectedMyVariableId.replace(re, '_');
				d3.select("#"+fieldid).attr('class','selected');
			});
		}
	
	}
}


var variableCategory,myVariables,units,description='';
var selectedGeoState=[]
var variableTotalPage=1;
var selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
var keyParameterArr=[];

function applySelectedVariable(){
	applySelectedVariableCommon();
}


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
	//	
	document.getElementById('level_1_Id').value = level1_Id;
	document.getElementById('levelId').value = levelid;

	$("#level_1_Id").data("selectBox-selectBoxIt").add();
	$("#levelId").data("selectBox-selectBoxIt").add();
	
	/*colors = generic_color = colorbrewer.Blues[5].map(function(rgb) {//.reverse()
		return d3.hsl(rgb);
	});*/
	//fieldChange(fieldval);
	}
}

function loadData(){
	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
		var level0_Id = prms.level0;
		var level1_Id = prms.level1;
		var levelid = prms.level;

		var fromDate = prms.frmdate;
		var toDate = prms.todate;
		var dateTypeVal = prms.type;
		fieldval = prms.field;
		fieldid_prod = prms.product;



		if(!fieldid_prod){
			if(fieldval){
				fieldid_prod = myVariablesKeyProductName[fieldval];
			}
			if(!dateType){

				if(myVarProd[tempName]){
				    	if(myVarProd[tempName][fieldid_prod]){	
						if(myVarProd[tempName][fieldid_prod].datetype.length > 0){
							if(!dateType){
								dateTypeVal = myVarProd[tempName][fieldid_prod].datetype[0];
								$("#time_type").html("");
								var timeType= document.getElementById("time_type");
								for(var j=0;j<myVarProd[tempName][fieldid_prod].datetype.length;j++){
									var dateType = document.createElement('option');
									dateType.innerHTML = myVarProd[tempName][fieldid_prod].datetype[j];
									dateType.value = myVarProd[tempName][fieldid_prod].datetype[j];
									time_type.appendChild(dateType);
								}
								document.getElementById("time_type").value = dateTypeVal;
							}
						}
					}
				}
			}
		}else{

			var tempName = '';
			if(myVariablesKeyProductName){
				fieldid_prod = myVariablesKeyProductName[fieldval];
			}
			if(myVariablesKeyTempName){
				tempName = myVariablesKeyTempName[fieldval];
			}

			$("#time_type").html("");
			var timeType= document.getElementById("time_type");

			for(var j=0;j<myVarProd[tempName][fieldid_prod].datetype.length;j++){
				var dateType = document.createElement('option');
				dateType.innerHTML = myVarProd[tempName][fieldid_prod].datetype[j];
				dateType.value = myVarProd[tempName][fieldid_prod].datetype[j];
				time_type.appendChild(dateType);
			}
			document.getElementById("time_type").value = dateTypeVal;

		}
		


		d3.select("#"+fieldval).attr('class','selected');

	
		if(fromDate && toDate){	
			$("#date_from").val(fromDate);
			$("#date_to").val(toDate);
		}
		//applyData();
		//fieldChange(fieldval);
		if( onLoad == 0 ){
			onLoad = 1;
			fieldChange(fieldval);
		}else{
			applyData();
		}
	}
}

function removeSVG(){
	d3.selectAll('#histogramSvgId').remove();
	d3.selectAll('#histogramOutSvgId').remove();
	d3.selectAll('#svg_id').remove();
	d3.selectAll('#bar_svg').remove();
	d3.selectAll('.bar_svg').remove();
	d3.selectAll('.nomap').remove();
	d3.select("#map").select('image').remove();
	document.getElementById('fieldDetails').innerHTML="";
	document.getElementById("fieldDetails").style.visibility='hidden'; 
	d3.select("#barBackButton").select('image').remove();
}

var selectedState='';
function level1Change(){
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	if(level1_Id != 0){
    	    removeSVG();
	
	    if(selectedState!=level1_Id){
		//DAni
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval };//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
		//DAni
	    }else{
		if(level0_Id != 0 && level1_Id != 0){
		//dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
		}
	    }
	    selectedState = level1_Id;
	    /*For mybuilds*/
	    //addToMyBuilds(fieldval);
	}else{
		//removeSVG();
		bootbox.alert("Please select a State.");
		return false;
	}
}


var selectedLevel='';
function levelChange1(){
	removeSVG();
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	if (level0_Id == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   return false;
	}

	if(selectedLevel!=levelval){
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval};//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}else{
		if(level0_Id != 0 && level1_Id != 0){
		//dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
		}
	}
	selectedLevel = levelval;
	//addToMyBuilds(fieldval);
}
function levelChange(){

	removeSVG();
	document.getElementById('normalizeId').checked = false;

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
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
	var fieldArrOvAll = [];
	for(var i=0;i<selectedVariable.length;i++){
		fieldArrOvAll.push(selectedVariable[i]);
	}

	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

 	var selectedMyVar = [];
	/*myVariable */
	for(var i=0;i<selectedMyVariable.length;i++){
		var insideLevel = 0;
		for(var index in  myVarIndex){
			for(var keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					var levelVarArr = myVariables[myVarIndex[index]]['levelsmapping']['level'+levelval];
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id == selectedMyVariable[i] ){
							var myVariableName = myVariables[myVarIndex[index]][keys][keyOfNumber].name;
							//var myVarName=selectedMyVariable[i].replace(/_/g," ").toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							//if((( $.inArray(selectedMyVariable[i], levelVarArr)) != -1)){
							if((( $.inArray(selectedMyVariable[i], selectedMyVar)) == -1)){
							selectedMyVar.push(selectedMyVariable[i]);
							fieldArr.push(selectedMyVariable[i]);
							insideLevel = 1;
							var trimmedString = myVariableName.toTitleCase();
							if(myVariableName.length > 25){
								trimmedString = myVariableName.substring(0, 25);
								trimmedString = trimmedString+" ..."
							}

							if(fieldval == selectedMyVariable[i]){
								myVariableContent+='<li class="selected" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedMyVariable[i]+"'"+')" >'+trimmedString.toTitleCase() +'</a></li>';
							} else {
								myVariableContent+='<li class="" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedMyVariable[i]+"'"+')" >'+trimmedString.toTitleCase() +'</a></li>';
							}
							}
							if(( $.inArray(selectedMyVariable[i], fieldArrOvAll) == -1)){
								fieldArrOvAll.push(selectedMyVariable[i]);
							}
						}
					}
				}	
			}	
		}
		if(insideLevel == 0){
			var trimmedString = myVariableName;
			if(myVariableName.length > 25){
				trimmedString = myVariableName.substring(0, 25);
				trimmedString = trimmedString+" ..."
			}
			myVariableContent+='<li class="" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow" style="color:#C0C0C0 ;disable:true;"  class="popup-label" >'+trimmedString +'</a></li>';
		}
	}
	var fieldNotFound = 0;
	if(myVariableContent.length > 1){	
		document.getElementById('myVariableListId').innerHTML=myVariableContent;
	}else{
		document.getElementById('myVariableListId').innerHTML="";
	}

	if(( $.inArray(fieldval, fieldArrOvAll) == -1)){
		fieldNotFound = 1;	
	}
	
	/* to clear all selected color and re color the selected variable*/
	for(var i=0;i<selectedVariable.length;i++){
		d3.select("#"+selectedVariable[i]).attr('class','');	 
	}
	d3.select("#"+fieldval).attr('class','selected');

	if(selectedLevel!=levelval){
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval};//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
	}else{
		if(level0_Id != 0 && level1_Id != 0){
		//dataLoad(level0_Id,level1_Id,fieldval,yearval,levelval);
		}
	}

	selectedLevel = levelval;
	addToMyBuilds(fieldval);
}


function addToMyBuilds(fieldid){
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var fromDate =document.getElementById('date_from').value, toDate=document.getElementById('date_to').value;
	var timeType= document.getElementById("time_type").value;


	mysphere_url_list="/app/mysphere_mybuilds_for_trend/"+level1_Id+"?level0="+level0_Id+"&level="
				+levelval+"&trend_key="+fieldid+"&trend_product="+fieldid_prod+"&type="+timeType+"&from_date="+fromDate+"&to_date="+toDate+"&selectedvariables="+JSON.stringify(selectedVariable)
				+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});
}



var colors;
var fieldval;
var fieldid_prod = "";
var selectedField='';
var selectedYear='';
selectedMyVariableProd= ["pv_16_3", "pv_18_13"] ;
function fieldChange(fieldid){


	
	document.getElementById('normalizeId').checked = false;


	for(var i=0;i<selectedVariable.length;i++){
		d3.select("#"+selectedVariable[i]).attr('class','');	 
	}

	for(var i=0;i<selectedMyVariable.length;i++){
		var selectedMyVariableId = selectedMyVariable[i];
		var re = new RegExp(" ", 'g');
		selectedMyVariableId = selectedMyVariableId.replace(re, '_');
		d3.select("#"+selectedMyVariableId).attr('class','');
		if(fieldid == selectedMyVariableId){
			fieldval = selectedMyVariable[i];
		}
	}	

	d3.select("#"+fieldid).attr('class','selected');

	fieldval = fieldid;

	removeSVG();
	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	if (level0_Id == 0) {
	   bootbox.alert("A Country must be selected for this operation. Please select a Country.");
	   return false;
	}
	if (level1_Id == 0) {
	   bootbox.alert("A State must be selected for this operation. Please select a State.");
	   return false;
	}

	var tempName = '';
	if(myVariablesKeyTempName){
		tempName = myVariablesKeyTempName[fieldid];
	}

	selectedField = fieldval;

	if(!myVarProd[tempName]){
		bootbox.alert("Choose my variables.");
		return false;
	} else {

		newFunc(fieldid,'');
		hashUpdate();
		//applyData();
	}

}


// level2 variables
var maxvall, minvalue, minvalue, secval, midval, midval1, forval, maxvall, rawData,l2_Data,l3_Data;
var yearVal, KeyVal, level_2;

// level3 variables
var l3_RawData,l3_KeyVal,l3_YearVal,l3_level_3,l3_level_2;
var masterData = new Array(4);
var canvasImage;
var monthObj={
	"01":"Jan",
	"02":"Feb",
	"03":"Mar",
	"04":"Apr",
	"05":"May",
	"06":"Jun",
	"07":"Jul",
	"08":"Aug",
	"09":"Sep",
	"10":"Oct",
	"11":"Nov",
	"12":"Dec"	
 };


var yrObj=["2015","2014","2013","2012","2011","2010","2009","2008"];
var monthArr=["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];


function newFunc(fieldid,type){
	

	fieldval = fieldid;
	var tempName = '';
	if(myVariablesKeyProductName){
		fieldid_prod = myVariablesKeyProductName[fieldid];
	}
	if(myVariablesKeyTempName){
		tempName = myVariablesKeyTempName[fieldid];
	}




	var kys = Object.keys(myVarProd[tempName]);
	var yr = [];
	var mn = [];
	var dd = [];

	for (var yearVal in myVarProd[tempName][fieldid_prod].year){
		if(( $.inArray(myVarProd[tempName][fieldid_prod].year[yearVal], yr ) ==  -1)){
			yr.push(myVarProd[tempName][fieldid_prod].year[yearVal]);
		}
	}
	for (var monthVal in myVarProd[tempName][fieldid_prod].month){
		if(( $.inArray(myVarProd[tempName][fieldid_prod].month[monthVal], mn ) ==  -1)){
			mn.push(myVarProd[tempName][fieldid_prod].month[monthVal]);
		}
	}
	for (var dayVal in myVarProd[tempName][fieldid_prod].day){
		if(( $.inArray(myVarProd[tempName][fieldid_prod].day[dayVal], dd ) ==  -1)){
			dd.push(myVarProd[tempName][fieldid_prod].day[dayVal]);
		}
	}

	$("#time_type").html("");
	var timeType= document.getElementById("time_type");
	for(var j=0;j<myVarProd[tempName][fieldid_prod].datetype.length;j++){				
		var dateType = document.createElement('option');
		dateType.innerHTML = myVarProd[tempName][fieldid_prod].datetype[j];
		dateType.value = myVarProd[tempName][fieldid_prod].datetype[j];
		time_type.appendChild(dateType);
	}



	
	if(type == ""){
		if(myVarProd[tempName]){
			if(myVarProd[tempName][fieldid_prod]){
				if(myVarProd[tempName][fieldid_prod].datetype){
					if(myVarProd[tempName][fieldid_prod].datetype[0]){
						timeType = myVarProd[tempName][fieldid_prod].datetype[0];		
					}
				}
			}
		}
	}else{
		timeType = type;
	}

	if(timeType =='Year' ){

	


		var minYr = d3.min(yr, function(d) {return d;});
		var maxYr = d3.max(yr, function(d) {return d;});

		//$("#date_from").val(minYr+"-01-01");
		//$("#date_to").val(maxYr+"-09-28");
		$("#date_from").val("01-01-"+minYr);
		$("#date_to").val("28-09-"+maxYr);					


		//$('#date_from').datetimepicker('setDate', minYr+"-01-01");
		//$('#date_to').datetimepicker('setDate',maxYr+"-01-28");

	}
	if(timeType =='Month' ){
	
		var minYr = d3.min(yr, function(d) {return d;});
		var maxYr = d3.max(yr, function(d) {return d;});
		var minMn = d3.min(mn, function(d) {return d;});
		var maxMn = d3.max(mn, function(d) {return d;});

		//$("#date_from").val(minYr+"-"+minMn+"-01");
		//$("#date_to").val(maxYr+"-"+maxMn+"-01");
		$("#date_from").val("01-"+minMn+"-"+minYr);
		$("#date_to").val("01-"+maxMn+"-"+maxYr);
	
	}
	if(timeType =='Date' ){
		
		var mindd = d3.min(dd, function(d) {return d;});
		var maxdd = d3.max(dd, function(d) {return d;});

		$("#date_from").val(mindd);
		$("#date_to").val(maxdd);
	}
 	$('.custom_selectbox').selectBoxIt({ defaultText: '', autoWidth: false });

	//hashUpdate();
}


function hashUpdate(){

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;

	var timeTtype= document.getElementById("time_type").value;

	var fromDate =document.getElementById('date_from').value,
	    toDate=document.getElementById('date_to').value;
	
	var prms = $.deparam.fragment();
	if(Object.keys(prms).length > 0){
		var level0_Id_Hash = prms.level0;
		var level1_Id_Hash = prms.level1;
		var levelid_Hash = prms.level;

		var fromDate_Hash = prms.frmdate;
		var toDate_Hash = prms.todate;
		var dateType_Hash = prms.type;
		fieldval_Hash = prms.field;
		fieldid_prod_Hash = prms.product;

	
		if(levelval == levelid_Hash){
			if(level0_Id == level0_Id_Hash){
				if(level1_Id == level1_Id_Hash){
					if(fieldval == fieldval_Hash){
						if(fieldid_prod == fieldid_prod_Hash){
							if(timeTtype == dateType_Hash){
								if(fromDate == fromDate_Hash){
									if(toDate == toDate_Hash){
										applyData();
									}
								}
							}
						}
					}
				}
			}
		}


		var pathname1 = window.location.pathname;
		var prmsDt = $.param.fragment();
		var prms ={level0:level0_Id, level1:level1_Id, level:levelval, field:fieldval, product:fieldid_prod, type:timeTtype, frmdate: fromDate, todate: toDate};//,selected: selectedid }
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);


	}
	

}

function timeTypeChange(){
	var time_type_value = document.getElementById('time_type').value;	
	document.getElementById('time_from_to').innerHTML = "";



	var frmTimeMnthId = document.getElementById('frm_time_type_month');
	var frmTimeYrId = document.getElementById('frm_time_type_year');
	var toTimeMnthId = document.getElementById('to_time_type_month');
	var toTimeYrId = document.getElementById('to_time_type_year');


	var tempName = '';
	if(myVariablesKeyProductName){
		fieldid_prod = myVariablesKeyProductName[fieldval];
	}
	if(myVariablesKeyTempName){
		tempName = myVariablesKeyTempName[fieldval];
	}


	var kys = Object.keys(myVarProd[tempName]);
	var yr = [];
	var mn = [];

	for (var yearVal in myVarProd[tempName][fieldid_prod].year){
		if(( $.inArray(myVarProd[tempName][fieldid_prod].year[yearVal], yr ) ==  -1)){
			yr.push(myVarProd[tempName][fieldid_prod].year[yearVal]);
		}
	}
	for (var monthVal in myVarProd[tempName][fieldid_prod].month){
		if(( $.inArray(myVarProd[tempName][fieldid_prod].month[monthVal], mn ) ==  -1)){
			mn.push(myVarProd[tempName][fieldid_prod].month[monthVal]);
		}
	}

	if(time_type_value=="Year"){
		$("#to_time_type_year").html("");
		$("#frm_time_type_year").html("");

		var minYr = d3.min(yr, function(d) {return d;});
		var maxYr = d3.max(yr, function(d) {return d;});		

		for(var j=0;j<yrObj.length;j++){				
			var fromYr = document.createElement('option');
			fromYr.innerHTML = yrObj[j];
			fromYr.value = yrObj[j];
			frmTimeYrId.appendChild(fromYr);
		}
		for(var j=0;j<yrObj.length;j++){				
			var toYr = document.createElement('option');
			toYr.innerHTML = yrObj[j];
			toYr.value = yrObj[j];
			toTimeYrId.appendChild(toYr);
		}	
		$("#to_time_type_year").val(maxYr);
		$("#frm_time_type_year").val(minYr);
	
	}
	if(time_type_value=="Month"){
		$("#to_time_type_year").html("");
		$("#to_time_type_month").html("");
		$("#frm_time_type_year").html("");		
		$("#frm_time_type_month").html("");	

		var minYr = d3.min(yr, function(d) {return d;});
		var maxYr = d3.max(yr, function(d) {return d;});
		var minMn = d3.min(mn, function(d) {return d;});
		var maxMn = d3.max(mn, function(d) {return d;});
	

		for(var j=0;j<yrObj.length;j++){				
			var fromYr = document.createElement('option');
			fromYr.innerHTML = yrObj[j];
			fromYr.value = yrObj[j];
			frmTimeYrId.appendChild(fromYr);
		}
		for(var j=0;j<yrObj.length;j++){				
			var toYr = document.createElement('option');
			toYr.innerHTML = yrObj[j];
			toYr.value = yrObj[j];
			toTimeYrId.appendChild(toYr);
		}

		for(var j=0;j<monthArr.length;j++){				
			var fromMn = document.createElement('option');
			fromMn.innerHTML = monthObj[monthArr[j]];
			fromMn.value = monthArr[j];
			frmTimeMnthId.appendChild(fromMn);
		}
		for(var j=0;j<monthArr.length;j++){				
			var toMn = document.createElement('option');
			toMn.innerHTML = monthObj[monthArr[j]];
			toMn.value = monthArr[j];
			toTimeMnthId.appendChild(toMn);
		}	

		$("#to_time_type_year").val(maxYr);
		$("#frm_time_type_year").val(minYr);
		$("#to_time_type_month").val(maxMn);
		$("#frm_time_type_month").val(minMn);

	}

	$('.custom_selectbox').selectBoxIt({ defaultText: '', autoWidth: false });
	
	hashUpdate();
}

var tempData_new = [];
var parseDate = '';
var nameOfVar = '';
function applyData(){

	/*Add to My Builds*/
	addToMyBuilds(fieldval);

	/*Clear all values inside a chart as well as no data found*/
	VIZ.clearAll();
	d3.select(".no_data").remove();
	d3.select("#legend").html("");

	/*Get Country and State and also type of time spec */
	var level1_Id = document.getElementById('level_1_Id').value; 
	var levelId = document.getElementById('levelId').value; 
 	var time_type_value = document.getElementById('time_type').value;

	var tempName = '';
	if(myVariablesKeyProductName){
		fieldid_prod = myVariablesKeyProductName[fieldval];
	}
	if(myVariablesKeyTempName){
		tempName = myVariablesKeyTempName[fieldval];
	}

	/*Add Name of the Product to H3*/
	nameOfVar = myVarProd[tempName][fieldid_prod].keyname
	document.getElementById('spacialcontent').innerHTML=nameOfVar;

	/*Get values from and To date*/
	var frm_date = document.getElementById("date_from").value;
	var to_date = document.getElementById("date_to").value;

	var frm_date_API = frm_date.split("-").reverse().join("-");
	var to_date_API = to_date.split("-").reverse().join("-");


	trendData = [];
	tempData_new = [];
	d3.json("/app/scisphere/trend_data/"+level1_Id+"?trendkey="+fieldid_prod+"&myloc="+orgid+"&level="+levelId+"&from="+frm_date_API+"&to="+to_date_API+"&type="+time_type_value.toLowerCase()+"",function(data){

		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
			}
		}

		normalizedTrendData = [];
		
		if(data){
			/* To Find if no data is found */
			if(data.Message || data.message){
				VIZ.clearAll();
				var maploading = d3.select("#thesvg").append("svg").attr("class", "no_data").attr("width", 420)
								.attr("height", 300).attr("transform", "translate(100, 120 )scale(1.8)");

				    maploading.append("text").attr("x", 308).attr("y", 113) 
								.text("No data found");
				return false;
			}
		}

		/* Forming of date type in JavaScript */
		/*var parseDate_cal = d3.time.format("%Y-%m-%d").parse;
		var parseDate = d3.time.format("%Y-%m-%d").parse;
		if(time_type_value == "Month"){
			 parseDate = d3.time.format("%Y-%m").parse;
		}else if(time_type_value == "Year"){
			 parseDate = d3.time.format("%Y").parse;
		} else {
			 parseDate = d3.time.format("%Y-%m-%d").parse;
		}*/

		var parseDate_cal = d3.time.format("%d-%m-%Y").parse;
		var parseDate = d3.time.format("%d-%m-%Y").parse;
		if(time_type_value == "Month"){
			 parseDate = d3.time.format("%m-%Y").parse;
		} else if(time_type_value == "Year"){
			 parseDate = d3.time.format("%Y").parse;
		} else {
			 parseDate = d3.time.format("%d-%m-%Y").parse;
		}



		/* Get Data into a array from an object*/	
		for(var i=0; i<data.length; i++ ){
			if(data[i]){
				if(data[i]._source){
					if(data[i]._source.date_obj){
						var dateObjLen =  data[i]._source.date_obj;

						for(var j=0;j<dateObjLen.length; j++){
							if(dateObjLen[j].keyid == fieldid_prod){

								var copyObj = JSON.parse(JSON.stringify(dateObjLen[j]));
								copyObj["name_"+levelId] = data[i]._source["name_"+levelId];
								copyObj["id_"+levelId] = data[i]._source["id_"+levelId];
								copyObj['date'] = copyObj['date'].split("-").reverse().join("-");

								/* Push data only if the date satisfies betweent the dates given */
								if((parseDate_cal(frm_date) <= parseDate(copyObj['date'])) && (parseDate(copyObj['date']) <= parseDate_cal(to_date))){
									copyObj['date'] = copyObj['date'].split("-").reverse().join("-");
									trendData.push(copyObj);
								}
							}
						}
					}
				}
			}
		}
	

	
		var numberFormat = d3.format(".2f");

		/* Find min and max */
		var minval = d3.min(trendData, function(d) {return +d.value;});
		var maxval = d3.max(trendData, function(d) {return +d.value;});
		var difference = maxval-minval;

		/* Push data into normalObject to find Normal and as well as Orignal Data */
		var norObj = {}		
		var oriObj = {}		
		for(var i=0; i<trendData.length; i++ ){
			
			if(norObj[trendData[i]['date']]){
				if(difference<1){
					norObj[trendData[i]['date']][trendData[i]['name_'+levelId]]= ((trendData[i]['value']-minval)/(maxval-minval))*10;  //(trendData[i]['value']/maxval)*10;				
				}else{
					norObj[trendData[i]['date']][trendData[i]['name_'+levelId]]= numberFormat(((trendData[i]['value']-minval)/(maxval-minval))*10); //numberFormat((trendData[i]['value']/maxval)*10);				
				}
				norObj[trendData[i]['date']]['date']= trendData[i]['date'];

				oriObj[trendData[i]['date']][trendData[i]['name_'+levelId]]= trendData[i]['value'];				
				oriObj[trendData[i]['date']]['date']= trendData[i]['date'];

			}else{
				norObj[trendData[i]['date']] = {}
				if(difference<1){
					norObj[trendData[i]['date']][trendData[i]['name_'+levelId]]= ((trendData[i]['value']-minval)/(maxval-minval))*10;   // (trendData[i]['value']/maxval)*10;
				} else {
					norObj[trendData[i]['date']][trendData[i]['name_'+levelId]]= numberFormat(((trendData[i]['value']-minval)/(maxval-minval))*10);//numberFormat((trendData[i]['value']/maxval)*10);
				}
				norObj[trendData[i]['date']]['date']= trendData[i]['date'];

				oriObj[trendData[i]['date']] = {}
				oriObj[trendData[i]['date']][trendData[i]['name_'+levelId]]= trendData[i]['value'];
				oriObj[trendData[i]['date']]['date']= trendData[i]['date'];
			}
		}
	


		/* Find number of dates and form a data to number of dates given in the data */
		var dates = Object.keys(norObj);
		var orginalValue = [];
		var orginalValueStack = [];
		var norValueStack = [];
		var maxValue = 0;
		for(var i=0; i<dates.length; i++ ){
			if(norObj[dates[i]]){
				var sum = 0;
				var placeName = Object.keys(oriObj[dates[i]]);
				for(var j=0; j<placeName.length; j++ ){
					if(placeName[j] != "date"){
						sum = sum + oriObj[dates[i]][placeName[j]];
					}
				}
				if(sum >maxValue){ maxValue = sum;}
				normalizedTrendData.push(norObj[dates[i]])
				orginalValue.push(oriObj[dates[i]])
			}
		}
		orginalValueStack = JSON.parse(JSON.stringify(oriObj));
		for(var i=0; i<dates.length; i++ ){
			if(orginalValueStack[dates[i]]){
				var placeName = Object.keys(orginalValueStack[dates[i]]);
				for(var j=0; j<placeName.length; j++ ){
					if(placeName[j] != "date"){
						if(difference<1){
							orginalValueStack[dates[i]][placeName[j]] = (orginalValueStack[dates[i]][placeName[j]] / maxValue)* 10;
						} else {
							orginalValueStack[dates[i]][placeName[j]] = numberFormat((orginalValueStack[dates[i]][placeName[j]] / maxValue)* 10);
						}		
					}
				}
				norValueStack.push(orginalValueStack[dates[i]]);
			}
		}
		norTrendDataStack = norValueStack;

		trendData = orginalValue;
		trendData = trendData.sort(function(a,b) { return d3.ascending(a.date, b.date); });


		/* Clear all data and Form a chart */		
		VIZ.clearAll();

		/*if($("#normalizeId").prop('checked') == true){
			  VIZ.lineChart(normalizedTrendData);
		} else {
			  VIZ.lineChart(trendData);
		}*/

		var Trddata = '';
		if($("#normalizeId").hasClass("active")){
			Trddata = normalizedTrendData;
		}else{
			Trddata = trendData;
		}

		VIZ.clearAll();
		if($("#normalizeId").hasClass("active")){
			if($("#line_chart").hasClass("active")){
			      VIZ.lineChart(Trddata);
			}else{
			      VIZ.stackChart(norTrendDataStack, 'zero');
			}
		} else {
			if($("#line_chart").hasClass("active")){
			      VIZ.lineChart(Trddata);
			}else{
			      VIZ.stackChart(Trddata, 'zero');
			}
		}




	});

	//hashUpdate();

}

var norTrendDataStack = [];
function yaxisChange(d){


	trendData = trendData.sort(function(a,b) { return d3.ascending(a.date, b.date); });
	normalizedTrendData = normalizedTrendData.sort(function(a,b) { return d3.ascending(a.date, b.date); });
	norTrendDataStack= norTrendDataStack.sort(function(a,b) { return d3.ascending(a.date, b.date); });


	if($("#normalizeId").hasClass("active")){
	
		d3.select("#normalizeId").attr("class","").attr("style","color:#B7B7B7; padding-left:180px;");
	}else{
		d3.select("#normalizeId").attr("class","active").attr("style","color:#428bca; padding-left:180px;");		
	}

	var data = '';
	if($("#normalizeId").hasClass("active")){
		data = normalizedTrendData;
	}else{
		data = trendData;
	}

	VIZ.clearAll();
	if($("#normalizeId").hasClass("active")){
		if($("#line_chart").hasClass("active")){
	              VIZ.lineChart(data);
		}else{
		      VIZ.stackChart(norTrendDataStack, 'zero');
		}
	} else {
		if($("#line_chart").hasClass("active")){
	              VIZ.lineChart(data);
		}else{
		      VIZ.stackChart(data, 'zero');
		}
	}


}

function chartChange(chartVal){
	
	setTimeout(function() {

	/*	if(document.getElementById('normalizeId').checked){
			data = normalizedTrendData;
		} else {
			data = trendData;
		}

		  VIZ.clearAll();
		  if (chartVal == 'line') {
		    VIZ.lineChart(data);
		  } else if (chartVal == 'stack') {
		    VIZ.stackChart(data, 'zero');
		  }*/
		trendData = trendData.sort(function(a,b) { return d3.ascending(a.date, b.date); });
		normalizedTrendData = normalizedTrendData.sort(function(a,b) { return d3.ascending(a.date, b.date); });
		norTrendDataStack= norTrendDataStack.sort(function(a,b) { return d3.ascending(a.date, b.date); });

		var data = '';
		if($("#normalizeId").hasClass("active")){
			data = normalizedTrendData;
		}else{
			data = trendData;
		}

		VIZ.clearAll();
		if($("#normalizeId").hasClass("active")){
			if($("#line_chart").hasClass("active")){
			      VIZ.lineChart(data);
			}else{
			      VIZ.stackChart(norTrendDataStack, 'zero');
			}
		} else {
			if($("#line_chart").hasClass("active")){
			      VIZ.lineChart(data);
			}else{
			      VIZ.stackChart(data, 'zero');
			}
		}

 

            }, 0);
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


// using ajax form submission
/*$(document).ready(function() {
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
		document.getElementById('help-popover').innerHTML = innerhtml_graph;
	}else{
		document.getElementById('help-popover').innerHTML = innerhtml_histogram;
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


