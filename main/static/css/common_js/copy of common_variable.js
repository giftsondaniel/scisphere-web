
var variableCategory,units,description;
function loadVariableCategory(){
	$("#variableCategoryId").data("selectBox-selectBoxIt").remove();

	var categoryKeys_master = _.keys(variableCategory);
	var categoryKeys_c = _.keys(variableCategory[categoryKeys_master[0]]);
	var categoryKeys_ec = _.keys(variableCategory[categoryKeys_master[1]]);
	var categoryKeys= [];
	var categoryKeys1= [];
	for(var i=0;i<categoryKeys_c.length; i++){
		//categoryKeys.push(categoryKeys_c[i]);
		if (!($.inArray(categoryKeys_c[i], categoryKeys) > -1)) {
			categoryKeys.push(categoryKeys_c[i]);
		}
	}	
	for(var j=0;j<categoryKeys_ec.length; j++){
		//categoryKeys.push(categoryKeys_ec[j]);
		if (!($.inArray(categoryKeys_ec[j], categoryKeys) > -1)) {
			categoryKeys.push(categoryKeys_ec[j]);
		}
	}	
	categoryKeys = categoryKeys.sort();

	var variableCategoryId = document.getElementById('variableCategoryId');
		var optcategory = document.createElement('option');
		optcategory.innerHTML = "All Category";
		optcategory.value = "allcategory";
		variableCategoryId.appendChild(optcategory);

	for(var i=0;i<categoryKeys.length;i++){
		var optcategory = document.createElement('option');
		var valCh = categoryKeys[i];
		valCh = valCh.replace(/_/g,' ');
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


function loadGeoState(){
	var state1,state2,state3,state4;
	var table="";
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
					table+='<tr class="odd">';
				}else{
					table+='<tr class="even">';
				}
				if(sortable[i]){
					if(( $.inArray(sortable[i][0], sub_list['all_plans']) != -1)){
						table+='<td id="geo_selectedid_'+sortable[i][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i][0]+'" onclick="geoStateClick('+"'"+sortable[i][0]+"'"+');" >'+state1+'</input>'+
							'</label>'+
							'</td>';
				
					}else{
						table+='<td id="geo_selectedid_'+sortable[i][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i][0]+'" onclick="geoStateClick('+"'"+sortable[i][0]+"'"+');" >'+state1+'</input>'+
							'</label>'+
							'</td>';
					}
				}
				if(sortable[i+1]){
					if(( $.inArray(sortable[i+1][0], sub_list['all_plans']) != -1)){
						table+='<td id="geo_selectedid_'+sortable[i+1][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i+1][0]+'" onclick="geoStateClick('+"'"+sortable[i+1][0]+"'"+');" >'+state2+'</input>'+
							'</label>'+
							'</td>';
					}else{
						table+='<td id="geo_selectedid_'+sortable[i+1][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i+1][0]+'" onclick="geoStateClick('+"'"+sortable[i+1][0]+"'"+');" >'+state2+'</input>'+
							'</label>'+
							'</td>';
					}
				}
				if(sortable[i+2]){
					if(( $.inArray(sortable[i+2][0], sub_list['all_plans']) != -1)){
						table+='<td id="geo_selectedid_'+sortable[i+2][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i+2][0]+'" onclick="geoStateClick('+"'"+sortable[i+2][0]+"'"+');" >'+state3+'</input>'+
							'</label>'+
							'</td>';
					}else{
						table+='<td id="geo_selectedid_'+sortable[i+2][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i+2][0]+'" onclick="geoStateClick('+"'"+sortable[i+2][0]+"'"+');" >'+state3+'</input>'+
							'</label>'+
							'</td>';
					}
				}
				if(sortable[i+3]){
					if(( $.inArray(sortable[i+3][0], sub_list['all_plans']) != -1)){
						table+='<td id="geo_selectedid_'+sortable[i+3][0]+'" class="selected"><label class="popup-label">'+
							'<input type="checkbox" checked class="popup-cb" id="geostate_'+sortable[i+3][0]+'" onclick="geoStateClick('+"'"+sortable[i+3][0]+"'"+');" >'+state4+'</input>'+
							'</label>'+
							'</td>';
					}else{
						table+='<td id="geo_selectedid_'+sortable[i+3][0]+'"><label class="popup-label">'+
							'<input type="checkbox" class="popup-cb" id="geostate_'+sortable[i+3][0]+'" onclick="geoStateClick('+"'"+sortable[i+3][0]+"'"+');" >'+state4+'</input>'+
							'</label>'+
							'</td>';

					}
				}
				table+="</tr>";
			}
		break;
		}
	}
	document.getElementById('load-master-geography').innerHTML=table;
	geoStateClick('');
	geoStatePaginationCall();
}


function loadVariable(){
	contextualVariable=[];
	contextualVariableValue=[];
	var table='';
	var variable1,variable2,variable3;

	var variableCategoryId = document.getElementById('variableCategoryId').value;
	var variableCategoryValue=[];

	//For all Variable:
	if(variableCategoryId == 'allcategory'){

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
					variable1 = variableCategory[key][key1][i][name[0]].replace(/' '/g,'_');
					variable1 = variable1.replace(/&/g,'');
					variable1 = variable1.replace(/ /g,'_');
					contextualVariable.push('economiccensus_2005-'+key1+'-'+variableCategory[key][key1][i][name[1]]+'-'+variable1);
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
					     variable1 = variableCategory[key][key1][i][name[0]].replace(/' '/g,'_');
					     variable1 = variable1.replace(/&/g,'');
					     variable1 = variable1.replace(/ /g,'_');
					     contextualVariable.push('economiccensus_2005-'+key1+'-'+variableCategory[key][key1][i][name[1]]+'-'+variable1);
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
			variable1 = contextualVariable[i].replace(/_/g,' ');
		    }
		    if(contextualVariable[i+1]){
			variable2 = contextualVariable[i+1].replace(/_/g,' ');
		    }
		    if(contextualVariable[i+2]){
			variable3 = contextualVariable[i+2].replace(/_/g,' ');
		    }
		    variable1 = variable1.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		    variable2 = variable2.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		    variable3 = variable3.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

		    if(j%2==0){
			table+='<tr class="odd">';
		    }else{
			table+='<tr class="even">';
		    }
		    if(contextualVariable[i]){
		  	var name = contextualVariable[i].split('-');
			if(name.length == 5){
			     variable1 = name[1] + ' - '+ name[3] + ' ' + name[4];
			} else if(name.length == 4){
			     variable1 = name[1] + ' - '+name[3];
			} else if(name.length == 2){
			     variable1 = name[1];		
			} 
			variable1 = variable1.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});					
			variable1 = variable1.replace(/_/g,' ');
			if(( $.inArray(contextualVariable[i], selectedVariable) != -1)){
			    table+='<td id="'+contextualVariable[i]+'_selectedid" class="selected"><label class="popup-label"><input type="checkbox" checked class="popup-cb" id="'+contextualVariable[i]+'_variable" onclick="variableClick('
						+"'"+contextualVariable[i]+"'"+');" >'+variable1+'</input></label></td>';
			}else{
			    table+='<td id="'+contextualVariable[i]+'_selectedid"><label class="popup-label"><input type="checkbox" class="popup-cb" id="'+contextualVariable[i]+'_variable" onclick="variableClick('+"'"+contextualVariable[i]+"'"+');" >'+variable1+'</input></label></td>';
			}
		     }
		     if(contextualVariable[i+1]){
			var name = contextualVariable[i+1].split('-');
			if(name.length == 5){
			     variable2 = name[1] + ' - '+ name[3] + ' ' + name[4];
			} else if(name.length == 4){
			     variable2 = name[1] + ' - '+ name[3];
			} else if(name.length == 2){
			     variable2 = name[1];		
			} 
			variable2 = variable2.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			variable2 = variable2.replace(/_/g,' ');
			if(( $.inArray(contextualVariable[i+1], selectedVariable) != -1)){
			     table+='<td id="'+contextualVariable[i+1]+'_selectedid" class="selected"><label class="popup-label"><input type="checkbox" checked class="popup-cb" id="'+contextualVariable[i+1]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+1]+"'"+');" >'+variable2+'</input></label></td>';
			}else{
			     table+='<td id="'+contextualVariable[i+1]+'_selectedid"><label class="popup-label"><input type="checkbox" class="popup-cb" id="'+contextualVariable[i+1]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+1]+"'"+');" >'+variable2+'</input></label></td>';
			}
		     }
		     if(contextualVariable[i+2]){
			var name = contextualVariable[i+2].split('-');
			if(name.length == 5){
			    variable3 = name[1] + ' - '+ name[3] + ' ' + name[4];
			} else if(name.length == 4){
			    variable3 = name[1] + ' - '+ name[3];
			} else if(name.length == 2){
			    variable3 = name[1];		
			} 
			variable3 = variable3.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			variable3 = variable3.replace(/_/g,' ');
			if(( $.inArray(contextualVariable[i+2], selectedVariable) != -1)){
				table+='<td id="'+contextualVariable[i+2]+'_selectedid" class="selected"><label class="popup-label"><input type="checkbox" checked class="popup-cb" id="'+contextualVariable[i+2]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+2]+"'"+');" >'+variable3+'</input></label></td>';
			}else{
				table+='<td id="'+contextualVariable[i+2]+'_selectedid"><label class="popup-label"><input type="checkbox" class="popup-cb" id="'+contextualVariable[i+2]+'_variable" onclick="variableClick('+"'"+contextualVariable[i+2]+"'"+');" >'+variable3+'</input></label></td>';
			}
		     }
			table+='</tr>';
		}
		document.getElementById('load-master-variable').innerHTML=table;
		variableClick('');
	}else{
		document.getElementById('load-master-variable').innerHTML="";
	}
	variablePaginationCall();
}



function applySelectedVariable(){

	var prms = $.deparam.fragment();
        var fieldid = '';
	if(Object.keys(prms).length > 0){
	    fieldid = prms.field;
	}

	if(selectedVariable.length>0){
		var table="";
		for(var i=0;i<selectedVariable.length;i++){
			var name = "";
			name = selectedVariable[i].split('-');
			var variable ='';
			var variable_new ='';
			var variable_name ='';
			var variable_id = '';

			if(name.length === 5){
				variable = name[1];
				variable_name = name[1] +' - '+name[3] +' '+ name[4];
				variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3]+"-"+name[4];
			}else if(name.length === 4){
				variable = name[1];
				variable_name = name[1] +' - '+name[3];
				variable_id = name[0]+"-"+name[1]+"-"+name[2]+"-"+name[3];
			} else if(name.length === 3){
				variable = name[1];
				variable_name = name[1] +' - '+name[2];
				variable_name = name[2];
				variable_id = name[0]+"-"+name[1]+"-"+name[2];
			} else if(name.length === 2){
				variable = name[1];	
				variable_name = name[1];	
				variable_id = name[0]+"-"+name[1];
			} 
			variable_new = variable;

			var variable = selectedVariable[i].replace(/_/g,' ');
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			var variable_name = variable_name.replace(/_/g,' ');
			variable_name = variable_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			var formula='',source='',Description='';
			var variable_split = variable.split('~');
			var variableUnit;
			for(var j =0; j < description.length; j++){
				if(selectedVariable[i] === description[j]['variable_name'] || variable_new === description[j]['variable_name']){
					formula=description[j]['formula'],source=description[j]['source'],Description=description[j]['Description'];
				}
			}

			if(name.length > 1){
				if(units[variable_new]){
					variableUnit = units[variable_new];
				}
				if(fieldid == selectedVariable[i]){
					table+='<li class="selected" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+'<div>'+
							'Description :<a>'+Description+'</a><br>'+
							'Formula :<a>'+formula+'</a><br>'+
							'Source :<a>'+source+'</a><br>'+
							'Units :<a>'+variableUnit+'</a></div>'
						+'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable_name+'">'+variable_name+'</a></li>';
				} else {
					table+='<li class="" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+'<div>'+
							'Description :<a>'+Description+'</a><br>'+
							'Formula :<a>'+formula+'</a><br>'+
							'Source :<a>'+source+'</a><br>'+
							'Units :<a>'+variableUnit+'</a></div>'
						+'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable_name+'">'+variable_name+'</a></li>';
				}
			} else {
				if(units[variable_new]){
					variableUnit = units[variable_new];
				}			
			
				if(fieldid == selectedVariable[i]){
					table+='<li class="selected" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+'<div>'+
							'Description :<a>'+Description+'</a><br>'+
							'Formula :<a>'+formula+'</a><br>'+
							'Source :<a>'+source+'</a><br>'+
							'Units :<a>'+variableUnit+'</a></div>'
						+'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable+'">'+variable+'</a></li>';
				} else {
					table+='<li class="" id="'+selectedVariable[i]+'"><a data-popover="true" data-html=true data-content="'
						+'<div>'+
							'Description :<a>'+Description+'</a><br>'+
							'Formula :<a>'+formula+'</a><br>'+
							'Source :<a>'+source+'</a><br>'+
							'Units :<a>'+variableUnit+'</a></div>'
						+'" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" title="'+variable+'">'+variable+'</a></li>';
				}
			}
		}
		if(selectedVariable.length<10){
		    table+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
    	       }
		document.getElementById('tableId').innerHTML=table;
	}else{
		document.getElementById('tableId').innerHTML="";
	}

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = document.getElementById('levelId').value;
	var yearval = document.getElementById('yearId').value;

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
	      //We entered the actual popover – call off the dogs
	      clearTimeout(timeout);
	      //Let's monitor popover content instead
	      container.one('mouseleave', function(){
		$.fn.popover.Constructor.prototype.leave.call(self, self);
	      });
	    })
	  }
	};


	$('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'right', delay: {show: 20, hide: 00}});


	mysphere_url_list="mysphere_mybuilds_for_region_snapshot/"+level1_Id+"?level0="+level0_Id+"&level="+levelval+"&region_key="+fieldid+"&selectedvariables="+JSON.stringify(selectedVariable)+"";

	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});
}

function geoStatePaginationCall(){
	$geostate_table_rows = $('#load-master-geography tbody tr');
	var geostate_table_row_limit = 6;
	geostateTotalPage = Math.ceil($geostate_table_rows.length / geostate_table_row_limit);
	$('#geo_pg1').jqPagination('option', 'max_page', geostateTotalPage);
	$('#geo_pg1').jqPagination('option', 'current_page', 1);
}


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
		var table="";
		for(var i=0;i<selectedGeoState.length;i++){
			var geostate = selectedGeoState[i].level1name.replace(/_/g,' ');
			geostate = geostate.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			table +='<tr>'+
				    '<td width="20px">'+sNo+'</td>'+
				    '<td>'+geostate+'</td>'+
				    '<td><a title="" class="item-delete" onclick="removeSelectedGeoState('+"'"+selectedGeoState[i].level1id+"'"+')"></a></td>'+
				'</tr>';
			sNo++;
		}
		document.getElementById('selected-geostate').innerHTML=table;
		document.getElementById('selected-geostate-count').innerHTML="("+selectedGeoState.length+")";
	}
}

function removeSelectedGeoState(id){
	if(document.getElementById("geostate_"+id)){
		document.getElementById("geostate_"+id).checked = false;
		d3.select("#geo_selectedid_"+id).attr('class','');
	}
	selectedGeoState = _.without(selectedGeoState, id);
	geoStateClick(id);
}

var selectedVariable=['population','population_density','decadal_migration'];
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
		var table="";
		for(var i=0;i<selectedVariable.length;i++){

			var variable = selectedVariable[i].replace(/_/g,' ');
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			var name = variable.split('-');
			if(name.length == 5){
				variable = name[1]+' - '+name[3] + ' ' + name[4];
			} else if(name.length == 4){
				variable = name[1]+' - '+name[3];
			} else if(name.length === 3){
				variable = name[1]+' - '+name[2];
			} else if(name.length === 2){
				variable = name[1];		
			} 
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			variable = variable.replace(/_/g,' ');
	
			variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			table +='<tr>'+
				    '<td width="20px">'+sNo+'</td>'+
				    '<td>'+variable+'</td>'+
				    '<td><a title="" class="item-delete" onclick="removeSelectedVariable('+"'"+selectedVariable[i]+"'"+')"></a></td>'+
				'</tr>';
			sNo++;
		}
		document.getElementById('selected-variable').innerHTML=table;		
		document.getElementById('selected-variable-count').innerHTML="("+selectedVariable.length+")";
		document.getElementById('selected-variable-count-title').innerHTML=selectedVariable.length;

	}

}

function removeSelectedVariable(id){
	if(document.getElementById(id+"_variable")){
		document.getElementById(id+"_variable").checked = false;
		d3.select("#"+id+"_selectedid").attr('class','');
	}
	selectedVariable = _.without(selectedVariable, id);
	variableClick(id);
}

