/*Common for all*/
var variableCategory,units,description='';
function loadVariableCategory(){
	$("#variableCategoryId").data("selectBox-selectBoxIt").remove();

	var categoryKeys_master = _.keys(variableCategory);
	var categoryKeys_c = _.keys(variableCategory[categoryKeys_master[0]]);
	var categoryKeys_ec = _.keys(variableCategory[categoryKeys_master[1]]);
	var categoryKeys= [];
	var categoryKeys1= [];
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


/*Common for all*/
function loadGeoState(){
	var state1,state2,state3,state4;
	var geographyContent="";
	var geoCountryId = document.getElementById('geoCountryId').value;
	for(var key in level1Data) {
		if(key == geoCountryId){
			//sorting
			var level1list = level1Data[key];
			var sortable = [];
			for (var vehicle in level1list)
			      sortable.push([vehicle, level1list[vehicle]])
			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });
			//sorting
			for(var i=0,j=0;i<sortable.length;i+=4,j++){
				if(sortable[i]){
					state1 = sortable[i][1].replace(/_/g,' ');
					state1 = state1.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+1]){
					state2 = sortable[i+1][1].replace(/_/g,' ');
					state2 = state2.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+2]){
					state3 = sortable[i+2][1].replace(/_/g,' ');
					state3 = state3.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+3]){
					state4 = sortable[i+3][1].replace(/_/g,' ');
					state4 = state4.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}

				if(j%2==0){
					geographyContent+='<tr class="odd">';
				}else{
					geographyContent+='<tr class="even">';
				}
				if(sortable[i]){
					if(( $.inArray(sortable[i][0], sub_list['all_plans']) != -1)){
						geographyContent+='<td id="geo_selectedid_'+sortable[i][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i][0]+'" onclick="geoStateClick('+"'"+sortable[i][0]+"'"+');" >'+state1+'</input>'+
							'</label>'+
							'</td>';
				
					}else{
						geographyContent+='<td id="geo_selectedid_'+sortable[i][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i][0]+'" onclick="geoStateClick('+"'"+sortable[i][0]+"'"+');" >'+state1+'</input>'+
							'</label>'+
							'</td>';
					}
				}
				if(sortable[i+1]){
					if(( $.inArray(sortable[i+1][0], sub_list['all_plans']) != -1)){
						geographyContent+='<td id="geo_selectedid_'+sortable[i+1][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i+1][0]+'" onclick="geoStateClick('+"'"+sortable[i+1][0]+"'"+');" >'+state2+'</input>'+
							'</label>'+
							'</td>';
					}else{
						geographyContent+='<td id="geo_selectedid_'+sortable[i+1][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i+1][0]+'" onclick="geoStateClick('+"'"+sortable[i+1][0]+"'"+');" >'+state2+'</input>'+
							'</label>'+
							'</td>';
					}
				}
				if(sortable[i+2]){
					if(( $.inArray(sortable[i+2][0], sub_list['all_plans']) != -1)){
						geographyContent+='<td id="geo_selectedid_'+sortable[i+2][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i+2][0]+'" onclick="geoStateClick('+"'"+sortable[i+2][0]+"'"+');" >'+state3+'</input>'+
							'</label>'+
							'</td>';
					}else{
						geographyContent+='<td id="geo_selectedid_'+sortable[i+2][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i+2][0]+'" onclick="geoStateClick('+"'"+sortable[i+2][0]+"'"+');" >'+state3+'</input>'+
							'</label>'+
							'</td>';
					}
				}
				if(sortable[i+3]){
					if(( $.inArray(sortable[i+3][0], sub_list['all_plans']) != -1)){
						geographyContent+='<td id="geo_selectedid_'+sortable[i+3][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i+3][0]+'" onclick="geoStateClick('+"'"+sortable[i+3][0]+"'"+');" >'+state4+'</input>'+
							'</label>'+
							'</td>';
					}else{
						geographyContent+='<td id="geo_selectedid_'+sortable[i+3][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i+3][0]+'" onclick="geoStateClick('+"'"+sortable[i+3][0]+"'"+');" >'+state4+'</input>'+
							'</label>'+
							'</td>';

					}
				}
				geographyContent+="</tr>";
			}
		break;
		}
	}
	document.getElementById('load-master-geography').innerHTML=geographyContent;
	geoStateClick('');
	geoStatePaginationCall();
}


/*Common for all*/
function geoStatePaginationCall(){
	$geostate_table_rows = $('#load-master-geography tbody tr');
	var geostate_table_row_limit = 6;
	geostateTotalPage = Math.ceil($geostate_table_rows.length / geostate_table_row_limit);
	$('#geo_pg1').jqPagination('option', 'max_page', geostateTotalPage);
	$('#geo_pg1').jqPagination('option', 'current_page', 1);
}

function geoPaginationGoTo(){
	var current_page = document.getElementById('pg-geo-goto').value;
	$geostate_table_rows = $('#load-master-geography tbody tr');
	var geostate_table_row_limit = 6;
	geostateTotalPage = Math.ceil($geostate_table_rows.length / geostate_table_row_limit);
	if(geostateTotalPage >= current_page){
		$('#geo_pg1').jqPagination('option', 'max_page', geostateTotalPage);
		$('#geo_pg1').jqPagination('option', 'current_page', current_page);
	}else{
		$('#geo_pg1').jqPagination('option', 'max_page', geostateTotalPage);
		$('#geo_pg1').jqPagination('option', 'current_page', geostateTotalPage);
	}
}

/*Commmon for all*/
var selectedGeoState=[]
function geoStateClick(id){
	selectedGeoState=[];
	var geoCountryId = document.getElementById('geoCountryId').value;
	for(var key in level1Data) {
		if(key == geoCountryId){
			//sorting
			var level1list = level1Data[key];
			var sortable = [];
			for (var level1 in level1list)
			      sortable.push([level1, level1list[level1]])
			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });
			//sorting
			for(var i=0;i<sortable.length;i++){
				if(document.getElementById("geostate_"+sortable[i][0])){
					if(document.getElementById("geostate_"+sortable[i][0]).checked){
						if(( $.inArray(sortable[i][0], sub_list['all_plans']) != -1)){
							d3.select("#geo_selectedid_"+sortable[i][0]+"").attr('class','selected');
							var level1name = sortable[i][1].replace(/_/g,' ');
							level1name = level1name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							var obj={};
							obj["level1id"] = sortable[i][0];
							obj["level1name"] = level1name;
							selectedGeoState.push(obj);
							selectedGeoState = _.uniq(selectedGeoState);
						}else{
							document.getElementById("geostate_"+sortable[i][0]).checked = false;
							d3.select("#geo_selectedid_"+sortable[i][0]+"").attr('class','');
							bootbox.alert("you are not subscribed please upgrade your plan.");
							return false;
   						     }
					}else{
						d3.select("#geo_selectedid_"+sortable[i][0]+"").attr('class','');
						selectedGeoState = _.without(selectedGeoState, sortable[i][0]);
						selectedGeoState = _.uniq(selectedGeoState);
					}				
				}
			}
		}
	}
	

	if(selectedGeoState){
		var sNo=1;
		var selectedGeoStateContent="";
		for(var i=0;i<selectedGeoState.length;i++){
			var geostate = selectedGeoState[i].level1name.replace(/_/g,' ');
			geostate = geostate.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			selectedGeoStateContent +='<tr>'+
				    '<td width="20px">'+sNo+'</td>'+
				    '<td>'+geostate+'</td>'+
				    '<td><a title="" class="item-delete" onclick="removeSelectedGeoState('+"'"+selectedGeoState[i].level1id+"'"+')"></a></td>'+
				'</tr>';
			sNo++;
		}
		document.getElementById('selected-geostate').innerHTML=selectedGeoStateContent;
		document.getElementById('selected-geostate-count').innerHTML="("+selectedGeoState.length+")";
	}
}

/*Common for all */
function removeSelectedGeoState(id){
	if(document.getElementById("geostate_"+id)){
		document.getElementById("geostate_"+id).checked = false;
		d3.select("#geo_selectedid_"+id).attr('class','');
	}
	selectedGeoState = _.without(selectedGeoState, id);
	geoStateClick(id);
}

/*Common for all load variables*/
var variableTotalPage=1;
function loadVariable(){
	contextualVariable=[];
	contextualVariableValue=[];

	var masterVariableContent='';
	var variable1,variable2,variable3;
	var variableCategoryId = document.getElementById('variableCategoryId').value;
	var variableCategoryValue=[];
	//For all Variable:
	if(variableCategoryId == 'allcategories'){
		for(var key in variableCategory){
		    if(key === 'census'){				
		        for(var key1 in variableCategory[key]){
			    if(variableCategory[key][key1].length>0){
				for(var i=0;i<variableCategory[key][key1].length;i++){
				     contextualVariable.push(variableCategory[key][key1][i]);
				}
			    }
 		        }	 
		    } else if(key === 'economic_census'){
			for(var key1 in variableCategory[key]){
			    if(variableCategory[key][key1].length>0){
				for(var i=0;i<variableCategory[key][key1].length;i++){
				    if(typeof(variableCategory[key][key1][i]) === 'object'){	
					var name = (Object.keys(variableCategory[key][key1][i]));
					variable1 = variableCategory[key][key1][i][name[1]].replace(/' '/g,'_');
					variable1 = variable1.replace(/&/g,'');
					variable1 = variable1.replace(/ /g,'_');
					contextualVariable.push('economiccensus_2005-'+key1+'-'+variableCategory[key][key1][i][name[0]]+'-'+variable1);
				     } else {
					contextualVariable.push('economiccensus_2005-'+variableCategory[key][key1][i]);					
				     }
				}
			    }
 		        }	
		    }
		}
	} else { 	//For Selected Variable:
		for(var key in variableCategory){
		    if(key === 'census'){				
		        for(var key1 in variableCategory[key]){
			    if(key1 == variableCategoryId){
			        if(variableCategory[key][key1].length>0){
				    for(var i=0;i<variableCategory[key][key1].length;i++){
					contextualVariable.push(variableCategory[key][key1][i]);
				    }
			        }
			    }
 		        }	 
		    } else if(key === 'economic_census'){
		       for(var key1 in variableCategory[key]){
			   if(key1 == variableCategoryId){
			       if(variableCategory[key][key1].length>0){
				    for(var i=0;i<variableCategory[key][key1].length;i++){
					if(typeof(variableCategory[key][key1][i]) === 'object'){	
					     var name = (Object.keys(variableCategory[key][key1][i]));
					     variable1 = variableCategory[key][key1][i][name[1]].replace(/' '/g,'_');
					     variable1 = variable1.replace(/&/g,'');
					     variable1 = variable1.replace(/ /g,'_');
					     contextualVariable.push('economiccensus_2005-'+key1+'-'+variableCategory[key][key1][i][name[0]]+'-'+variable1);
					} else {
					     contextualVariable.push('economiccensus_2005-'+variableCategory[key][key1][i]);					
					}
				    }
			        }
 		            }	
		        }
		    }
		}
	}

	if(contextualVariable){
		for(var i=0,j=0; i<contextualVariable.length; i+=3,j++){
		    if(contextualVariable[i]){
			variable1 = contextualVariable[i];//.replace(/_/g,' ');
		    }
		    if(contextualVariable[i+1]){
			variable2 = contextualVariable[i+1];//.replace(/_/g,' ');
		    }
		    if(contextualVariable[i+2]){
			variable3 = contextualVariable[i+2];//.replace(/_/g,' ');
		    }

		    if(j%2==0){
			masterVariableContent+='<tr class="odd">';
		    }else{
			masterVariableContent+='<tr class="even">';
		    }
		      	
		    if(contextualVariable[i]){
		  	var name = contextualVariable[i].split('-');
			var variableName = variable1;
			var variableUnit ='';
			if(name.length == 5){
			     variable1 = name[1] + ' '+ name[3] + ' ' + name[4];
			     variableName = name[1];		
			} else if(name.length == 4){
			     variable1 = name[1] + ' '+ name[3];
			     variableName = name[1];		
			} else if(name.length == 2){
			     variable1 = name[1];	
			     variableName = name[1];			
			} 
			var formula='',source='',Description='';
			for(var k =0; k < description.length; k++){
				if(variableName === description[k]['variable_name'] ){
					formula=description[k]['formula'],source=description[k]['source'],Description=description[k]['Description'];
				}
			}
			if(units[variableName]){
				variableUnit = units[variableName];
			}

			var mouseOverPopup="";
			mouseOverPopup+='<table class='+"'mouseOverPopup'"+'  >'
					   +'<tr>'
					      +'<td width='+"'25%;'"+' valign='+"'top'"+'>Description</td><td width='+"'1%'"+' valign='+"'top'"+'>:&nbsp;</td><td  width='+"'74%'"+' align='+"'left'"+'>'+Description+'</td>'
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

			variable1 = variable1.replace(/_/g,' ');
			variable1 = variable1.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});					

			if(( $.inArray(contextualVariable[i], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+contextualVariable[i]+'_selectedid" class="selected"><label class="popup-label" data-original-title="'+variable1+'" data-popover="true" data-html=true data-content="'
						+ mouseOverPopup
						+'"><input type="checkbox" checked class="popup-cb" id="'+contextualVariable[i]+'_variable" onclick="variableClick('
						+"'"+contextualVariable[i]+"'"+');" >'+variable1+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+contextualVariable[i]+'_selectedid"><label class="popup-label" data-original-title="'+variable1+'" data-popover="true" data-html=true data-content="'
						+ mouseOverPopup
						+'"><input type="checkbox" class="popup-cb" id="'+contextualVariable[i]+'_variable" onclick="variableClick('+"'"+contextualVariable[i]+"'"+');" >'+variable1+'</input></label></td>';
			}
		     }
		     if(contextualVariable[i+1]){
			var name = contextualVariable[i+1].split('-');
			var variableName = variable2;
			var variableUnit ='';
			if(name.length == 5){
			     variable2 = name[1] + ' '+ name[3] + ' ' + name[4];
			     variableName = name[1];		
			} else if(name.length == 4){
			     variable2 = name[1] + ' '+ name[3];
			     variableName = name[1];		
			} else if(name.length == 2){
			     variable2 = name[1];
			     variableName = name[1];		
			} 
			var formula='',source='',Description='';
			for(var k =0; k < description.length; k++){
				if(variableName === description[k]['variable_name'] ){
					formula=description[k]['formula'],source=description[k]['source'],Description=description[k]['Description'];
				}
			}
			if(units[variableName]){
				variableUnit = units[variableName];
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
			variable2 = variable2.replace(/_/g,' ');
			variable2 = variable2.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			if(( $.inArray(contextualVariable[i+1], selectedVariable) != -1)){
			     masterVariableContent+='<td id="'+contextualVariable[i+1]+'_selectedid" class="selected"><label class="popup-label" data-original-title="'+variable2+'" data-popover="true" data-html=true data-content="'
						+ mouseOverPopup
						+'"><input type="checkbox" checked class="popup-cb" id="'+contextualVariable[i+1]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+1]+"'"+');" >'+variable2+'</input></label></td>';
			}else{
			     masterVariableContent+='<td id="'+contextualVariable[i+1]+'_selectedid"><label class="popup-label" data-original-title="'+variable2+'" data-popover="true" data-html=true data-content="'
						+ mouseOverPopup
						+'"><input type="checkbox" class="popup-cb" id="'+contextualVariable[i+1]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+1]+"'"+');" >'+variable2+'</input></label></td>';
			}
		     }
		     if(contextualVariable[i+2]){
			var name = contextualVariable[i+2].split('-');
			var variableName = variable3;
			var variableUnit ='';
			if(name.length == 5){
			    variable3 = name[1] + ' '+ name[3] + ' ' + name[4];
			     variableName = name[1];
			} else if(name.length == 4){
			    variable3 = name[1] + ' '+ name[3];
			     variableName = name[1];
			} else if(name.length == 2){
			    variable3 = name[1];		
			     variableName = name[1];
			} 
			var formula='',source='',Description='';
			for(var k =0; k < description.length; k++){
				if(variableName === description[k]['variable_name'] ){
					formula=description[k]['formula'],source=description[k]['source'],Description=description[k]['Description'];
				}
			}
			if(units[variableName]){
				variableUnit = units[variableName];
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
			variable3 = variable3.replace(/_/g,' ');
			variable3 = variable3.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			if(( $.inArray(contextualVariable[i+2], selectedVariable) != -1)){
				masterVariableContent+='<td id="'+contextualVariable[i+2]+'_selectedid" class="selected"><label class="popup-label"  data-original-title="'+variable3+'" data-popover="true" data-html=true data-content="'
						+ mouseOverPopup
						+'"><input type="checkbox" checked class="popup-cb" id="'+contextualVariable[i+2]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+2]+"'"+');" >'+variable3+'</input></label></td>';
			}else{
				masterVariableContent+='<td id="'+contextualVariable[i+2]+'_selectedid"><label class="popup-label"  data-original-title="'+variable3+'" data-popover="true" data-html=true data-content="'
						+ mouseOverPopup
						+'"><input type="checkbox" class="popup-cb" id="'+contextualVariable[i+2]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+2]+"'"+');" >'+variable3+'</input></label></td>';
			}
		     }
			masterVariableContent+='</tr>';
		}
		document.getElementById('load-master-variable').innerHTML=masterVariableContent;
		variableClick('');
	}else{
		document.getElementById('load-master-variable').innerHTML="";
	}
	
	$('.popup-label').popover({
			trigger:'hover',
			placement:'right',
			html:true
		      });  

	$('.popup-label').popover({
		selector: 'li',
		trigger: 'hover',
		placement:'right'
	    });


	variablePaginationCall();
}	


/*Common pagination*/
function variablePaginationCall(){
	$variable_table_rows = $('#load-master-variable tbody tr');
	var variable_table_row_limit = 6;
	variableTotalPage = Math.ceil($variable_table_rows.length / variable_table_row_limit);
	$('#pg2').jqPagination('option', 'max_page', variableTotalPage);
	$('#pg2').jqPagination('option', 'current_page', 1);
}

function variablePaginationGoTo(){
	var current_page = document.getElementById('pg-variable-goto').value;
	$variable_table_rows = $('#load-master-variable tbody tr');
	var variable_table_row_limit = 6;
	variableTotalPage = Math.ceil($variable_table_rows.length / variable_table_row_limit);
	if(variableTotalPage >= current_page){
		$('#pg2').jqPagination('option', 'max_page', variableTotalPage);
		$('#pg2').jqPagination('option', 'current_page', current_page);
	}else {
		$('#pg2').jqPagination('option', 'max_page', variableTotalPage);
		$('#pg2').jqPagination('option', 'current_page', variableTotalPage);
	}
}

var contextualVariable=[];
var selectedVariable=['population','population_density','decadal_migration'];
var appliedSelectedVariable = selectedVariable;

/*Common for all variable click*/
function variableClick(id){

	for(var i=0;i<contextualVariable.length;i++){
		if(document.getElementById(contextualVariable[i]+"_variable")){
			if(document.getElementById(contextualVariable[i]+"_variable").checked){
				if(selectedVariable.length>=10){
					if ( $('#'+id+'_selectedid').hasClass( "selected" ) ) {	
						if(!document.getElementById(id+"_variable").checked){
							document.getElementById(id+"_variable").checked = false;
							d3.select("#"+id+"_selectedid").attr('class','');
							selectedVariable = _.without(selectedVariable, id);
						}
					}else{
						if(id){
						   document.getElementById(id+"_variable").checked = false;
						   bootbox.alert("You can select a maximum of 10 variables ");
						   return false;
						}
					}
				}else{
					d3.select("#"+contextualVariable[i]+"_selectedid").attr('class','selected');
					selectedVariable.push(contextualVariable[i]);
					selectedVariable = _.uniq(selectedVariable);
				}
			}else{
				d3.select("#"+contextualVariable[i]+"_selectedid").attr('class','');
				selectedVariable = _.without(selectedVariable, contextualVariable[i]);
				selectedVariable = _.uniq(selectedVariable);
			}
		}
	}

	if(selectedVariable){
		var sNo=1;
		var selectedVariableContent="";
		for(var i=0;i<selectedVariable.length;i++){

			var variable = selectedVariable[i].replace(/_/g,' ');
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			var name = variable.split('-');
			if(name.length == 5){
				variable = name[1]+' '+name[3] + ' ' + name[4];
			} else if(name.length == 4){
				variable = name[1]+' '+name[3];
			} else if(name.length === 3){
				variable = name[1]+' '+name[2];
			} else if(name.length === 2){
				variable = name[1];		
			} 
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			variable = variable.replace(/_/g,' ');
	
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			selectedVariableContent +='<tr>'+
				    '<td width="20px">'+sNo+'</td>'+
				    '<td>'+variable+'</td>'+
				    '<td><a title="" class="item-delete" onclick="removeSelectedVariable('+"'"+selectedVariable[i]+"'"+')"></a></td>'+
				'</tr>';
			sNo++;
		}
		document.getElementById('selected-variable').innerHTML=selectedVariableContent;		
		document.getElementById('selected-variable-count').innerHTML="("+selectedVariable.length+")";
		document.getElementById('selected-variable-count-title').innerHTML=selectedVariable.length;

	}

}


/*Common for all , variable remove on click on contextual variable*/
function removeSelectedVariable(id){
	if(document.getElementById(id+"_variable")){
		document.getElementById(id+"_variable").checked = false;
		d3.select("#"+id+"_selectedid").attr('class','');
	}
	selectedVariable = _.without(selectedVariable, id);
	variableClick(id);
}

/*Common for all*/
function cancelSelectedVariable(){

	selectedVariable = appliedSelectedVariable;
	loadVariable();
}


/*Common for region_explorer and snapshot */
function applySelectedVariable(){

	var prms = $.deparam.fragment();

	//selectedVariableBKP to keep the selected variable backup
	var selectedVariableBKP = selectedVariable
        var fieldid = '';
        var level1 = '';
        var level = '';
	

	if(sub_list['plus_plans'].length === 0){
	    if((selectedVariable[0] != "population" ) || (selectedVariable[1] != "population_density" ) 
			|| (selectedVariable[2 ] != "decadal_migration"|| (selectedVariable.length > 3) )){
		selectedVariable =['population','population_density','decadal_migration'];
		if(document.getElementById('levelId')){	
			if(Object.keys(prms).length > 0){
			    fieldid = prms.field;
			    level1 = prms.level1;
			    level = prms.level;
			}
			var pathname1 = window.location.pathname;
			var prmsDt = $.deparam.fragment();
			var prms ={level0: sub_list.free_plans.country, level1: level1, level:level, field:selectedVariable[0], year:'2011' };
			var r =$.param.fragment(pathname1 ,prms, 2 );
			$.bbq.pushState(r);
			var prms1 = $.deparam.fragment();
			loadVariable();
		}
		bootbox.alert("Please upgrade to apply all the variables.");
	    }
	}


	/*level1 = document.getElementById('level_1_Id').value;


	if(!( $.inArray(level1 , sub_list.plus_plans) != -1)){
	   if((selectedVariable[0] != "population" ) || (selectedVariable[1] != "population_density" ) 
			|| (selectedVariable[2 ] != "decadal_migration"|| (selectedVariable.length > 3) )){

		selectedVariable =['population','population_density','decadal_migration'];
		var pathname1 = window.location.pathname;
		var prmsDt = $.deparam.fragment();
		var prms ={level0: sub_list.free_plans.country, level1: level1, level:level, field:selectedVariable[0], year:'2011' };
		var r =$.param.fragment(pathname1 ,prms, 2 );
		$.bbq.pushState(r);
		var prms1 = $.deparam.fragment();
		//loadVariable();
	    }
	}*/

	appliedSelectedVariable = [];
	if(selectedVariable.length>0){
		var contextualVariableContent="";
		for(var i=0;i<selectedVariable.length;i++){
				
			appliedSelectedVariable.push(selectedVariable[i]);
			appliedSelectedVariable = _.uniq(appliedSelectedVariable);

			var name = "";
			name = selectedVariable[i].split('-');
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
				variable_name = name[2];
				variable_id = name[0]+"-"+name[1]+"-"+name[2];
			} else if(name.length === 2){
				variable = name[1];	
				variable_name = name[1];	
				variable_id = name[0]+"-"+name[1];
			} else{
			}
			variable_new = variable;

			var variable = selectedVariable[i].replace(/_/g,' ');
			variable = variable.replace(/\w\S* /g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			var variable_name = variable_name.replace(/_/g,' ');
			variable_name = variable_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			var formula='',source='',Description='';
			var variable_split = variable.split('~');
			var variableUnit = '';
			for(var j =0; j < description.length; j++){
				if(selectedVariable[i] === description[j]['variable_name'] || variable_new === description[j]['variable_name']){
					formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
				}
			}
			if(name.length > 1){
				if(units[variable_new]){
					variableUnit = units[variable_new];
				}
			}else{
				if(units[selectedVariable[i]]){
					variableUnit = units[selectedVariable[i]];
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

			if(name.length > 1){
				variableUnit='';
				if(units[variable_new]){
					variableUnit = units[variable_new];
				}
				if(fieldid == selectedVariable[i]){
					contextualVariableContent+='<li class="selected" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+ mouseOverPopup +'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable_name+'">'+variable_name+'</a></li>';
				} else {
					contextualVariableContent+='<li class="" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+mouseOverPopup+'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable_name+'">'+variable_name+'</a></li>';
				} 
			} else {
				variableUnit='';
				if(units[selectedVariable[i]]){
					variableUnit = units[selectedVariable[i]];
				}
				if(fieldid == selectedVariable[i]){
					contextualVariableContent+='<li class="selected" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+mouseOverPopup +'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable+'">'+variable+'</a></li>';
				} else {
					contextualVariableContent+='<li class="" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+mouseOverPopup +'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable+'">'+variable+'</a></li>';
				}
			}
		}
		if(selectedVariable.length<10){
		    contextualVariableContent+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
    	       }
		document.getElementById('tableId').innerHTML=contextualVariableContent;
	}else{
		document.getElementById('tableId').innerHTML="";
	}

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = '';


	//Save selected variable backup
	//selectedVariable = selectedVariableBKP;

	if(document.getElementById('levelId')){	
		/*For Region_explore*/
		var yearval = document.getElementById('yearId').value;
		levelval = document.getElementById('levelId').value;

		mysphere_url_list="mysphere_mybuilds_for_region_snapshot/"+level1_Id+"?level0="+level0_Id+"&level="+levelval+"&region_key="+fieldid+"&selectedvariables="+JSON.stringify(selectedVariable)+"";

		d3.json(mysphere_url_list,function(data){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
		});
	
	}else{
		/*For snapshot*/
		var prms = $.deparam.fragment();
		if(Object.keys(prms).length > 0){
		    var levels = prms.levels;
		    var level0Id = prms.level0;
		    var level1Id = prms.level1;
		    var levelId = prms.levelid;
	
		    mysphere_url_list="mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels="+levels+"&levelid="+levelId+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
		    d3.json(mysphere_url_list,function(data){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
				
		    });
		}
	}



	//For popup
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
	      //We entered the actual popover ??? call off the dogs
	      clearTimeout(timeout);
	      //Let's monitor popover content instead
	      container.one('mouseleave', function(){
		$.fn.popover.Constructor.prototype.leave.call(self, self);
	      });
	    })
	  }
	};

	$('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'right', delay: {show: 20, hide: 00}});


	
}


