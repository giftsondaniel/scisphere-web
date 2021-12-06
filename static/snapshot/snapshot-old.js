/* Snapshot.html */

var demographicKey=["ind_pca_01","ind_pca_21","ind_pca_23","ind_pca_18","ind_pca_16","ind_pca_20","ind_pca_24","ind_pca_02","ind_pca_19","ind_pca_06"];
var economiccensusKey=["ind_ec_02","ind_ec_03","ind_ec_04","ind_ec_07","ind_ec_08"];
var top10Key=["ind_ec_02","ind_ec_03","ind_ec_04","ind_ec_07","ind_ec_08","ind_pca_01","ind_pca_21","ind_pca_23","ind_pca_18","ind_pca_16"];

var rankCategory=[];
function snapshotRank(level0Id,level1Id,level2Id){

  /*Loading chart*/ 
  d3.selectAll("#svg_custom").remove();
  d3.selectAll("#svg_top10").remove();

  d3.selectAll("#Chartloading").remove();
  var maploading = d3.select("#canvas_custom").append("svg").attr("class", "Chartloading").attr("id", "Chartloading").attr("width", 440)
			.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
  maploading.append("text").attr("x", 148).attr("y", 113) 
			.text("Loading Chart...");
  /*var maploading1 = d3.select("#canvas_top10").append("svg").attr("class", "Chartloading").attr("id", "Chartloading").attr("width", 440)
			.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
  maploading1.append("text").attr("x", 148).attr("y", 113) 
			.text("Loading Chart...");*/

  

  d3.json("/app/scisphere/places/"+level1Id+"/"+level2Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=district&level=2", function (data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
				return false;
			}
		}
	/*Remove loading chart*/
	d3.selectAll("#Chartloading").remove();

	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	level2_level3_menu(level2Id, '');

	//Title oVer Chart
	var level2Value = document.getElementById('level_2_Id');
	var level2Name = level2Value.options[level2Value.selectedIndex].innerHTML;
	var level2LevelsName = menuData["levels"][level0Id]['level2'];
	level2LevelsName = level2LevelsName.toTitleCase();
	document.getElementById('page-title-id').innerHTML=level2Name+" "+level2LevelsName+"," ;

	var level1Value = document.getElementById('level_1_Id');
	var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
	document.getElementById('page-subtitle-id').innerHTML=level1Name;

	snapshotContentLoad(data);
	snapshotLoad(data);
	snapshotTop10Load(data);
	snapshotCustomLoad(data);
  });
}


/* Snapshot.html */
function snapshotRank_level3(level0Id,level1Id,level3Id){

  /*Loading chart*/ 
  d3.selectAll("#svg_custom").remove();

  d3.selectAll("#Chartloading").remove();
  var maploading = d3.select("#canvas_custom").append("svg").attr("class", "Chartloading").attr("id", "Chartloading").attr("width", 440)
			.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
  maploading.append("text").attr("x", 148).attr("y", 113) 
			.text("Loading Chart...");

   d3.json("/app/scisphere/places/"+level1Id+"/"+level3Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=taluk&level=3", function (data) {
	
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
				return false;
			}
		}

	/*Remove loading chart*/
	d3.selectAll("#Chartloading").remove();	

	var level_3_id = data.demographic["id_3"];
	var level_2_id = data.demographic["id_2"];

	//level2 and level3 menu Change:
	level2_level3_menu(level_2_id , level_3_id);

	d3.select("#canvas_custom").selectAll("#svg_custom").remove();

	document.getElementById('level_2_Id').value = level_2_id;
	$("#level_2_Id").data("selectBox-selectBoxIt").add();

	document.getElementById('level_3_Id').value = level_3_id;
	$("#level_3_Id").data("selectBox-selectBoxIt").add();
		
	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";


	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	snapshotContentLoad(data);
	snapshotLoad(data);
	snapshotCustomLoad(data);
	snapshotTop10Load(data);
   });
}


/* Snapshot.html level4 village level */
function snapshotRank_level4(level0Id,level1Id,level4Id){

  /*Loading chart*/ 
  d3.selectAll("#svg_custom").remove();

  d3.selectAll("#Chartloading").remove();
  var maploading = d3.select("#canvas_custom").append("svg").attr("class", "Chartloading").attr("id", "Chartloading").attr("width", 440)
			.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
  maploading.append("text").attr("x", 148).attr("y", 113) 
			.text("Loading Chart...");

   d3.json("/app/scisphere/places/"+level1Id+"/"+level4Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=village&level=4", function (data) {

	/*Remove loading chart*/
	d3.selectAll("#Chartloading").remove();	

	var level_3_id = data.demographic["id_3"];
	var level_2_id = data.demographic["id_2"];

	//level2 and level3 menu Change:
	level2_level3_menu(level_2_id , level_3_id);

	d3.select("#canvas_custom").selectAll("#svg_custom").remove();

	document.getElementById('level_2_Id').value = level_2_id;
	$("#level_2_Id").data("selectBox-selectBoxIt").add();

	document.getElementById('level_3_Id').value = level_3_id;
	$("#level_3_Id").data("selectBox-selectBoxIt").add();
	

	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=4&levelid="+level4Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=4&levelid="+level4Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";

	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	snapshotRank_level4_map(data);
	snapshotContentLoad(data);
	snapshotLoad(data);
	snapshotCustomLoad(data);

	if(data['demographic']['name_4']){


		var level4LevelsName = data['demographic']['name_4'];
		level4LevelsName = level4LevelsName.toTitleCase();

		var level3LevelsName = data['demographic']['name_3'];
		level3LevelsName = level3LevelsName.toTitleCase();

		var level2LevelsName = data['demographic']['name_2'];
		level2LevelsName = level2LevelsName.toTitleCase();

		var level1LevelsName = data['demographic']['name_1'];
		level1LevelsName = level1LevelsName.toTitleCase();

		document.getElementById('page-title-id').innerHTML= level4LevelsName+"," ;

		var level1Value = document.getElementById('level_1_Id');
		var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
		document.getElementById('page-subtitle-id').innerHTML= level3LevelsName+", "+level2LevelsName+", "+level1Name;

	}
		
   });
}

/* Region Explorer Snapshot /
function snapshotRankPopup(level0Id,level1Id,level2Id){
  d3.json("/app/scisphere/places/"+level1Id+"/"+level2Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=district&level=2", function (data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
				return false;
			}
		}
	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";

	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	rankCategory=[];
	for(var key in data){
		if(key != "rank"){
			rankCategory.push(key);
		}
	}
	snapshotCustomLoad(data);
  });
}

/* Region Explorer Snapshot 
function snapshotRankLevel3Popup(level0Id,level1Id,level3Id){
   d3.json("/app/scisphere/places/"+level1Id+"/"+level3Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=taluk&level=3", function (data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
				return false;
			}
		}

	var level_3_id = data.demographic["id_3"];
	var level_2_id = data.demographic["id_2"];

	d3.select("#canvas_custom").selectAll("#svg_custom").remove();
	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	rankCategory=[];
	for(var key in data){
		if(key != "rank"){
			rankCategory.push(key);
		}
	}
	snapshotCustomLoad(data);

   });
}
*/

/* Region Explorer Snapshot */
function snapshotRankPopup(level0Id,level1Id,level2Id){
  d3.json("/app/scisphere/places/"+level1Id+"/"+level2Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=district&level=2", function (data) {
		if(data){
			if(data['1001']){
				sessionClose(data['1001']);
				return false;
			}
		}	

	/*myvariable*/
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}
	var myVariable = "";
	if(myVarIndex){
		for(var index in myVarIndex){
			for(var keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id ==fieldval  ){
							myVariable = myVarIndex[index];
						}
					}
				}
			}	
		}
	}


	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";

	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	rankCategory=[];
	for(var key in data){
		if(key != "rank"){
			rankCategory.push(key);
		}
	}

	if(myVariable == ""){
		snapshotCustomLoad(data);
	}else{
		snapshotLoadPopUp(data);
	}
		
  });
}

/* snapshot load */
function snapshotLoadPopUp(data){
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	var myValObj = {};
	for(var index in myVarIndex){
		for(var keys in myVariables[myVarIndex[index]]){
			if(keys != "levelsmapping"){
				for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
					var myVariableName = myVariables[myVarIndex[index]][keys][keyOfNumber].name;
					var key = myVariables[myVarIndex[index]][keys][keyOfNumber].id;			
					myValObj[key] = myVariableName;
				}
			}	
		}	
	}


	for(var i=0;i<rankCategory.length;i++){
		for(var key in data['rank']){
			if(key == rankCategory[i]){
				var data_sort=[];
				var dollars=[];
				var snapshotValue=[];
				var categories=[];
				var rankKeys = _.omit(data.rank[key]['_source'], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','collecteddate','geolocation','key','latitude','longitude','leveltype','docid','org_id',"uploaddate","District","type","tempid"]);
				for(var key1 in rankKeys){
					if(rankCategory[i] == "myvar"){
						if(rankKeys[key1]==0 || rankKeys[key1]){
							var obj={};
							obj["key"]=key1;
							obj["value"]=rankKeys[key1];
							if(( $.inArray(key1, selectedMyVariable) != -1)){
								if(data[rankCategory[i]][key1]== 0 || data[rankCategory[i]][key1]){			
									data_sort.push(obj)
								}
							}
						} 
					}
						
				}
				data_sort = data_sort.sort(function(a,b) {  return b.value - a.value; });


				for(var j =0;j<data_sort.length;j++){
					var filteredList = _.filter(variableCategory, function(item){
					    return _.some(item._source, function(source){
						return source == data_sort[j].key.toUpperCase();
					    });
					});
					if(filteredList.length>0){	
						categories.push(filteredList[0]._source['title'].toTitleCase().replace(/_/g," "));
					}else{
						if(myValObj){
							categories.push(myValObj[data_sort[j].key].toTitleCase().replace(/_/g," "));
						}
					}
	
					dollars.push(data_sort[j].value);
					snapshotValue.push(data[rankCategory[i]][""+data_sort[j].key+""]);
				}
				/**/
				var canvasname="canvas_custom";
				var svgname="svg_custom";
				var rankCategoryId = rankCategory[0];
				d3.select("#"+canvasname+"").selectAll("#"+svgname+"").remove();
				snapshotChartLoad(data,categories,dollars,snapshotValue,canvasname,svgname,rankCategoryId);
			}
		}
	}
}



/* Region Explorer Snapshot */
function snapshotRankLevel3Popup(level0Id,level1Id,level3Id){
   d3.json("/app/scisphere/places/"+level1Id+"/"+level3Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=taluk&level=3", function (data) {

	/*myvariable*/
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}
	var myVariable = "";
	if(myVarIndex){
		for(var index in myVarIndex){
			for(var keys in myVariables[myVarIndex[index]]){
				if(keys != "levelsmapping"){
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id ==fieldval  ){
							myVariable = myVarIndex[index];
						}
					}
				}
			}	
		}
	}

	var level_3_id = data.demographic["id_3"];
	var level_2_id = data.demographic["id_2"];

	d3.select("#canvas_custom").selectAll("#svg_custom").remove();
	//mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariables="+JSON.stringify(selectedMyVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	rankCategory=[];
	for(var key in data){
		if(key != "rank"){
			rankCategory.push(key);
		}
	}

	if(myVariable == ""){
		snapshotCustomLoad(data);
	}else{
		snapshotLoadPopUp(data);
	}
	

   });
}

function snapshotContentLoad(data){
	
	rankCategory=[];
	var snapPanel = "";
	var snapChart = "";
	/* static content */
	snapPanel +='<div class="tab-sec rightpanel-map-tab" style="margin-right: 70px;margin-top: -40px;">'+
		'<div class="submenu-sec1">'+
		'<div class="sub-menu1" align="center"><a href="#snap-custom" class="tab-custom active" role="tab" data-toggle="tab" id="tab-custom" onclick="snapScroll('+"'tab-custom'"+');" title="Context">'+
		'<span class="submneu-con1">Context</span>'+
		'</a></div>';
	snapChart+='<div class="tab-content">'+
		'<div class="tab-pane active" id="snap-custom">'+
		'<div id="canvas_custom" style="margin-left:350px;"></div>'+
		'</div>';
	/* static content */

		
	
	for(var key in data.rank){
		if(data.rank[key] != "No Result Found"){
		var carouselTitle = key.toTitleCase();
		snapPanel +='<div class="sub-menu1" align="center">'+
			'<a href="#snap-'+key+'" class="tab-'+key+'" role="tab" data-toggle="tab" id="tab-'+key+'" onclick="snapScroll('+"'tab-"+key+"'"+');" title="'+carouselTitle+'">'+
			'<span class="submneu-con1">'+carouselTitle.toTitleCase()+'</span>'+
			'</a>'+
			'</div>';
		snapChart+='<div class="tab-pane" id="snap-'+key+'">'+
			'<div id="canvas_'+key+'" style="margin-left:350px;"></div>'+
			'</div>';
				
		d3.selectAll("#svg_"+key+"").remove();
		var maploading2 = d3.select("#canvas_"+key+"").append("svg").attr("class", "Chartloading").attr("id", "Chartloading").attr("width", 440)
				.attr("height", 300).attr("transform", "translate(100, 120 )scale(0.8)");
		
		rankCategory.push(key);
		}
	}

	/* top 10 */
	snapPanel +='<div class="sub-menu1" align="center">'+
		'<a href="#snap-top10" class="tab-top10" role="tab" data-toggle="tab" id="tab-top10" onclick="snapScroll('+"'tab-top10'"+');" title="Top 10 Industries">'+
		'<span class="submneu-con1">Top 10 Industries</span>'+
		'</a>'+
		'</div>';
	snapChart+='<div class="tab-pane" id="snap-top10">'+
		'<div id="canvas_top10" style="margin-left:350px;"></div>'+
		'</div>';
	/* top 10 */

	snapPanel +='</div>'+
		'</div>';
	snapChart+='</div>';

	document.getElementById('snap-panel').innerHTML=snapPanel;
	document.getElementById('snap-chart').innerHTML=snapChart;
	$('.submenu-sec1').bxSlider({slideWidth: 120,minSlides: 3,maxSlides: 3,moveSlides: 1,pager: false});

}

function snapScroll(id){
	d3.selectAll('.tab-custom').attr('class','tab-custom');
	d3.selectAll('.tab-top10').attr('class','tab-top10');
	for(var i=0;i<rankCategory.length;i++){
		d3.selectAll('.tab-'+rankCategory[i]+'').attr('class','tab-'+rankCategory[i]+'');
	}
	d3.selectAll('.'+id+'').attr('class',''+id+' active');
}

/* context load */
function snapshotCustomLoad(data){

	var data_sort=[];
	var dollars=[];
	var snapshotValue=[];
	var categories=[];
	
	for(var j=0;j<selectedVariable.length;j++) {
		for(var key in data['rank']){
			var rankKeys = _.omit(data.rank[key]['_source'], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','collecteddate','geolocation','key','latitude','longitude','leveltype']);
			for(var key1 in rankKeys){
				if(key1.toUpperCase() == selectedVariable[j]){
					if(rankKeys[key1]==0  || rankKeys[key1]){
						var obj={};
						obj["key"]=key1;
						obj["value"]=rankKeys[key1];
						if(data[key]){
							if(data[key][key1]== 0 || data[key][key1]){	
								data_sort.push(obj)
							}
						}
					}
				}
			}
		}
	}
	data_sort = data_sort.sort(function(a,b) {  return b.value - a.value; });

	for(var j=0;j<data_sort.length;j++){
		var filteredList = _.filter(variableCategory, function(item){
		    return _.some(item._source, function(source){
			return source == data_sort[j].key.toUpperCase();
		    });
		});

		categories.push(filteredList[0]._source['title'].toTitleCase().replace(/_/g," "));
		dollars.push(data_sort[j].value);
		for(var k=0;k<rankCategory.length;k++){
			if(data[rankCategory[k]]){
				if(data[rankCategory[k]][data_sort[j].key] == 0 || data[rankCategory[k]][data_sort[j].key]){
					snapshotValue.push(data[rankCategory[k]][data_sort[j].key]);
				}
			}
		}
	}
	var canvasname="canvas_custom";
	var svgname="svg_custom";
	var rankCategoryId = rankCategory[0];
	
	d3.select("#"+canvasname+"").selectAll("#"+svgname+"").remove();
	snapshotChartLoad(data,categories,dollars,snapshotValue,canvasname,svgname,rankCategoryId);
}

/* snapshot load */
function snapshotLoad(data){
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	var myValObj = {};
	for(var index in myVarIndex){
		for(var keys in myVariables[myVarIndex[index]]){
			if(keys != "levelsmapping"){
				for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
					var myVariableName = myVariables[myVarIndex[index]][keys][keyOfNumber].name;
					var key = myVariables[myVarIndex[index]][keys][keyOfNumber].id;			
					myValObj[key] = myVariableName;
				}
			}	
		}	
	}

	for(var i=0;i<rankCategory.length;i++){
		for(var key in data['rank']){
			if(key == rankCategory[i]){
				var data_sort=[];
				var dollars=[];
				var snapshotValue=[];
				var categories=[];
				var rankKeys = _.omit(data.rank[key]['_source'], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','collecteddate','geolocation','key','latitude','longitude','leveltype','docid','org_id',"uploaddate","District","type","tempid"]);
				for(var key1 in rankKeys){
					if(rankCategory[i] == "economic"){
						if(( $.inArray(key1, economiccensusKey) != -1)){
							if(rankKeys[key1]==0 || rankKeys[key1]){
								var obj={};
								obj["key"]=key1;
								obj["value"]=rankKeys[key1];	
								if(data[rankCategory[i]][key1]== 0 || data[rankCategory[i]][key1]){	
									data_sort.push(obj)
								}	
							}
						}
					}else if(rankCategory[i] == "demographic"){
						if(( $.inArray(key1, demographicKey) != -1)){
							if(rankKeys[key1]==0 || rankKeys[key1]){
								var obj={};
								obj["key"]=key1;
								obj["value"]=rankKeys[key1];
								if(data[rankCategory[i]][key1]== 0 || data[rankCategory[i]][key1]){		
									data_sort.push(obj)
								}	
							} 
						}
					}else{
						if(rankKeys[key1]==0 || rankKeys[key1]){
							var obj={};
							obj["key"]=key1;
							obj["value"]=rankKeys[key1];
							
							if(( $.inArray(key1, selectedMyVariable) != -1)){
								if(data[rankCategory[i]][key1]== 0 || data[rankCategory[i]][key1]){			
									data_sort.push(obj)
								}
							}
						} 
					}
						
				}
				data_sort = data_sort.sort(function(a,b) {  return b.value - a.value; });

				for(var j =0;j<data_sort.length;j++){
					var filteredList = _.filter(variableCategory, function(item){
					    return _.some(item._source, function(source){
						return source == data_sort[j].key.toUpperCase();
					    });
					});
					if(filteredList.length>0){	
						categories.push(filteredList[0]._source['title'].toTitleCase().replace(/_/g," "));
					}else{
						if(myValObj){
							categories.push(myValObj[data_sort[j].key].toTitleCase().replace(/_/g," "));
						}
					}
	
					dollars.push(data_sort[j].value);
					snapshotValue.push(data[rankCategory[i]][""+data_sort[j].key+""]);
				}
				/**/
				var canvasname="canvas_"+rankCategory[i];
				var svgname="svg_"+rankCategory[i];
				var rankCategoryId = rankCategory[i];
				d3.select("#"+canvasname+"").selectAll("#"+svgname+"").remove();
				snapshotChartLoad(data,categories,dollars,snapshotValue,canvasname,svgname,rankCategoryId);
			}
		}
	}
}

/* top 10 context load */
function snapshotTop10Load(data){

	var columns = ["ind_ec_13_a","ind_ec_13_b","ind_ec_13_c","ind_ec_13_d","ind_ec_13_e","ind_ec_13_f","ind_ec_13_g","ind_ec_13_h","ind_ec_13_i","ind_ec_13_j","ind_ec_13_k","ind_ec_13_l","ind_ec_13_m","ind_ec_13_n","ind_ec_13_o","ind_ec_13_p","ind_ec_13_q"];
	var data_sort=[];
	var data_sort1=[];
	var dollars=[];
	var snapshotValue=[];
	var categories=[];
	/*if(!data['top10']){
		return false;
	}*/

	var rankKeys = _.omit(data['rank']['economic']['_source'], ['id_0','id_1','id_2','id_3','id_4','name_0','name_1','name_2','name_3','name_4','collecteddate','geolocation','key','latitude','longitude','leveltype']);
	for(var key1 in rankKeys){
		if(rankKeys[key1] == 0 || rankKeys[key1]){
			var obj={};
			if(( $.inArray(key1, columns) != -1)){
				obj["key"]=key1;
				obj["value"]=rankKeys[key1];	
				if(data['economic'][key1]== 0 || data['economic'][key1]){	
					data_sort.push(obj);
				}
			}
		}
	}

	data_sort = data_sort.sort(function(a,b) {  return b.value - a.value; });

	var topTenArr = [];
	for(var i=0; i <data_sort.length; i++){
		if(i<10){
			topTenArr.push(data_sort[i]);
		}	
	}	
	data_sort = topTenArr;
	for(var j=0;j<data_sort.length;j++){
		var filteredList = _.filter(variableCategory, function(item){
		    return _.some(item._source, function(source){
			return source == data_sort[j].key.toUpperCase();
		    });
		});
		if(filteredList.length>0){
			categories.push(filteredList[0]._source['title'].toTitleCase().replace(/_/g," "));
		}	
		dollars.push(data_sort[j].value);
		//dollars.push((10 - (j)));

		for(var k=0;k<rankCategory.length;k++){
			if(data[rankCategory[k]]){
				if(data[rankCategory[k]][data_sort[j].key] == 0 || data[rankCategory[k]][data_sort[j].key]){
					snapshotValue.push(data[rankCategory[k]][data_sort[j].key]);
				}
			}
		}
	}
	var canvasname="canvas_top10";
	var svgname="svg_top10";
	var rankCategoryId = rankCategory[0];
	
	d3.select("#"+canvasname+"").selectAll("#"+svgname+"").remove();
	snapshotChartLoad(data,categories,dollars,snapshotValue,canvasname,svgname,rankCategoryId);
}


function snapshotChartLoad(data,categories,dollars,snapshotValue,canvasname,svgname,rankCategoryId){

	if(categories.length == 0){
		var canvas = d3.select('#'+canvasname+'')
			.append('svg').attr('id',svgname)
			.attr({'width':500,'height':550,'padding-left':650});
		var text = canvas.append("svg:text")
			.attr("x", 280).attr("y", 130).attr("dy", ".35em").attr("text-anchor", "middle")
			.style({"font-size": "x-large","font": "500 40px inherit","fill":"#8A8A8A"}).text("No data Found ");
		
		return false;
	}


	var colors = ['#EDF5FE'];
	var grid = d3.range(1).map(function(i){
		return {'x1':0,'y1':0,'x2':0,'y2':20};
	});

	var tickVals = grid.map(function(d,i){
		if((i > 0)){ return i*25; }
		else if(i===0){ return 0;}
	});

	var xscale = d3.scale.linear()
		.domain([0,100])
		.range([0,300]);

	var yscale = d3.scale.linear()
		.domain([0,categories.length])//categories.length
		.range([0, 300]);

	var colorScale = d3.scale.quantize()
		.domain([0,categories.length])//categories.length,6
		.range(colors);

	var canvas = d3.select('#'+canvasname+'')
		.append('svg').attr('id',svgname)
		.attr({'width':500,'height':550,'padding-left':650});

	var grids = canvas.append('g')
		  .attr('id','grid')
		  .attr('transform','translate(178,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
		  .attr({
				 'y2':function(d){ return 315; }//d.y2; }
			})	
		  .style({'stroke':'#000','stroke-width':'1px'});

	var xAxis = d3.svg.axis();
		xAxis
		.orient('bottom')
		.scale(xscale)
		.tickValues(["0","25","50","75","100"]);//tickVals

	var yAxis = d3.svg.axis();
		yAxis
		.orient('left')
		.scale(yscale)
		.tickSize(3)
		.tickFormat(function(d,i){ return categories[i]; })
		.tickValues(d3.range(dollars.length)) ;

	var y_xis = canvas.append('g')
		//.attr("transform", "translate(177,80)")//7,330
		.attr("transform", "translate(177,80)")//7,330
		.attr('id','yaxis')
		.attr("y", function(d){ return yscale(d); } )
		.call(yAxis)
		.selectAll("#yaxis text")
		.call(wrap, 162).style({'font-size':'9px'});

	var x_xis = canvas.append('g')
		//.attr("transform", "translate(178,370)")//490
		.attr("transform", "translate(178,370)")//490
		.attr('id','xaxis')
		.call(xAxis);
	
	var chart = canvas.append('g')
		.attr("transform", "translate(180,50)")//-12,310
		.attr("transform", "translate(180,50)")//-12,310
		.attr('id','bars')
		.selectAll('rect')
		.data(dollars)
		.enter()
		.append('rect')
		.attr('height',23)
		.attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
		.style('fill',function(d,i){ return colorScale(i); })
		.attr('width',function(d){ return 0; });

	var transit = d3.select("#"+svgname+"")
		.selectAll("rect")
		.data(dollars)
		.transition()
		.duration(1000) 
		.attr("width", function(d) {return xscale(d); });

	var circle = canvas.selectAll("circle")
		.data(dollars);

	var circleEnter = circle.enter().append("circle");
		circleEnter.attr("cy", function(d, i) { return yscale(i)+80;});
		circleEnter.attr("cx", function(d, i) { return xscale(d)-(xscale(d) -200 );});
		circleEnter.attr("r", 14).attr("id", 'circle_id').style("fill", "#43A3DA");

		
	var transitext = d3.select('#'+svgname+'')
		.append('g')
		.selectAll('text')
		.data(dollars)
		.enter()
		.append('text')
		.attr({'x':function(d) {return xscale(d)-(xscale(d) -200 ); },'y':function(d,i){ return yscale(i)+82; }})
		.text(function(d){ return d; }).style({'font-size':'9px', 'alignment-baseline':'middle', 'text-anchor':'middle','fill':'white'});

	/*ON no data found*/
	if(data.rank[rankCategoryId] == 'No Result Found'){
		return false;
	}

	if(!data.rank[rankCategoryId]._source){
		return false;
	}


	var level2Name = data.rank[rankCategoryId]._source.name_2;
	var level1Value = document.getElementById('level_1_Id');
 	var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
	var textValue = level2Name+" - Percentile among in "+level1Name;
	if(data.rank[rankCategoryId]._source.name_4){
		var level4Name = data.rank[rankCategoryId]._source.name_4;
		var level3Name = data.rank[rankCategoryId]._source.name_3;
		textValue = level4Name.toTitleCase()+','+ level3Name.toTitleCase()+" - Percentile among all villages in "+level1Name.toTitleCase();
	} else if(data.rank[rankCategoryId]._source.name_3){
		var level3Name = data.rank[rankCategoryId]._source.name_3;
		textValue = level3Name.toTitleCase()+', '+level2Name+" - Percentile among all taluks in "+level1Name.toTitleCase();
	} else {
		textValue = level2Name.toTitleCase()+" - Percentile among all districts in "+level1Name.toTitleCase();
	}

	var text = canvas.append("svg:text")
		.attr("class", "nobar").attr("x", 280).attr("y", 30).attr("dy", ".35em").attr("text-anchor", "middle")
		.attr("class", "nobar").attr("x", 280).attr("y", 30).attr("dy", ".35em").attr("text-anchor", "middle")
		.style({"font": "100 9px inherit","fill":"#8A8A8A"}).text(textValue);

	var snapshot_text = d3.select('#'+svgname+'').append('g')
		.attr('id','snapshot_value')
		.selectAll('text')
		.data(snapshotValue)
		.enter()
		.append('text')
		.attr({'x':function(d) {return xscale(d)-(xscale(d) -230 ); },'y':function(d,i){ return yscale(i)+82; }})
		.text(function(d){ if(d > 100){ return valueRoundSnapshot(d);}else{ return  d; }}).style({'font-size':'9px', 'alignment-baseline':'middle', 'text-anchor':'right','fill':'black'});

	var grids = canvas.append('g')
		  .attr('id','grid1')
		  .attr('transform','translate(328,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
 		  .attr({
				 'y2':function(d){ return 318; }
			})
		  .style({'stroke':'#000','stroke-width':'0.3px'}).style("stroke-dasharray", ("3, 3"));

	var grids = canvas.append('g')
		  .attr('id','grid2')
		  .attr('transform','translate(253,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
 		  .attr({
				 'y2':function(d){ return 318; }
			})
		  .style({'stroke':'#000','stroke-width':'0.3px'}).style("stroke-dasharray", ("3, 3"));

	var grids = canvas.append('g')
		  .attr('id','grid3')
		  .attr('transform','translate(403,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
 		  .attr({
				 'y2':function(d){ return 318; }
			})
		  .style({'stroke':'#000','stroke-width':'0.3px'}).style("stroke-dasharray", ("3, 3"));

	var grids = canvas.append('g')
		  .attr('id','grid2')
		  .attr('transform','translate(478,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
 		  .attr({
				 'y2':function(d){ return 318; }
			})
		  .style({'stroke':'#000','stroke-width':'0.3px'}).style("stroke-dasharray", ("3, 3"));
}


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
	words = text.text().split(/\s+/).reverse(),
	sentence = text.text().split(/\n+/).reverse(),
	word,
	line = [],
	lineNumber = 0,
	lineNumberChart = 2,	/*0*/
	lineHeight = 0.5,//1.1, // ems
	y = text.attr("y"),
	dy = parseFloat(text.attr("dy"));
		
    if(sentence[0].length > 70  ){		
	    var tspan = text.text(null).append("tspan").attr("x", -4).attr("y", y).attr("dy", (dy) + "em").attr("style","font-size:8.5px");
    }else{
	    var tspan = text.text(null).append("tspan").attr("x", -4).attr("y", y).attr("dy", (dy) + "em").attr("style","font-size:10px");
    }	

    var lines = '', previousLines = '',linesLength = 0;
    while (word = words.pop()) {
      line.push(word);
      linesBefore = lines.length;
      lines += "_"+word;	
      tspan.text(line.join(" "));
	
      if(sentence[0].length > 70  ){	
	   if (lines.length > 40) {
		linesBefore = 0;
		previousLines = "";
		lines ="";
		line.pop();
		tspan.text(line.join(" "));
		line = [word];
		lineNumberChart = ++lineNumberChart;
		lineNumberChart = lineNumberChart + 10 ;
		if(sentence[0].length > 70  ){	
		    var tspan = text.append("tspan").attr("x", -4).attr("y", (lineNumberChart)).text(word).attr("style","font-size:8.5px");
		}else{
		    var tspan = text.append("tspan").attr("x", -4).attr("y", (lineNumberChart)).text(word).attr("style","font-size:10px");
		}
	   }

     }else{	
	  if (lines.length > 35) {
		linesBefore = 0;
		previousLines = "";
		lines ="";
		line.pop();
		tspan.text(line.join(" "));
		line = [word];
		lineNumberChart = ++lineNumberChart;
		lineNumberChart = lineNumberChart + 10 ;
		if(sentence[0].length > 70  ){	
		    var tspan = text.append("tspan").attr("x", -4).attr("y", (lineNumberChart)).text(word).attr("style","font-size:8.5px");
		}else{
		    var tspan = text.append("tspan").attr("x", -4).attr("y", (lineNumberChart)).text(word).attr("style","font-size:10px");		
		}
	  }

     }		
      previousLines += "_"+word;
	
    }
  });
}

function valueRoundSnapshot(d){
	var numberFormat = d3.format(".0f");
	var numberFormat1 = d3.format(".0f");
	var numberFormat2 = d3.format(".1f");
	var numberFormatValue=0;
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
				Value = (numberFormat2(finalValue) + " K  +");
			}else{
				Value = (numberFormat2(finalValue) + " K");
			}
		}
		if ((val1 > 6) && (val1 <= 9)) {
			finalValue = val / 1000000;
			if(i==0){
				Value = (numberFormat(finalValue) + " M  +");
			}else{
				Value = (numberFormat2(finalValue) + " M");
			}
		}
		if (val1 > 9) {
			finalValue = val / 1000000000;
			if(i==0){
				Value = (numberFormat(finalValue) + " B  +");
			}else{
				Value = (numberFormat2(finalValue) + " B");
			}
		}
	return Value;
}
