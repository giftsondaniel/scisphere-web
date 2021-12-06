/*Common for all*/
/*Title case*/
String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  str = str.replace(/_/g," ");
  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'Per', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv','Town'];
  for (i = 0, j = uppers.length; i < j; i++)
     str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
       uppers[i].toUpperCase());

  return str;
}


// geo variable load

function onclickGEO(){
	var level1Id = document.getElementById('level_1_Id').value;
	var geoLevel=document.getElementById('geo_level').value;

	var state = stateDim.group(function(t) { return t; });
	var stateLength = state.top(Infinity);

	$("#geo_level1_0").html("");
	var geoLevel1 = document.getElementById('geo_level1_0');

	var optlevel0 = document.createElement('option');
	optlevel0.innerHTML = "Select State";
	optlevel0.value = "0";
	geoLevel1.appendChild(optlevel0);

	for(var i=0;i<stateLength.length;i++){
		var stateValue = stateLength[i].key.split("$");
		if(stateValue[0] == level1Id){
			var optlevel0 = document.createElement('option');
			optlevel0.innerHTML = stateValue[1];
			optlevel0.value = stateValue[0];
			geoLevel1.appendChild(optlevel0);
		}
	}
	$("#geo_level1_0").data("selectBox-selectBoxIt").add();

}

function geoMenuDataLoad(){
	var level1Id = document.getElementById('level_1_Id').value;
	var geoLevel=document.getElementById('geo_level').value;
	var geoMenuContent="";

	if(geoLevel==2){
		geoMenuContent+='<tr>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox" style="width:175px;">'+
					 '<select class="custom_selectbox" id="geo_level1_0" onchange="geoLevel1Change('+"'geo_level1_0','geo_level2_0'"+');">'+
					    '<option value="0">Select State</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox" style="width:175px;">'+
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
		if(level1Id != 0){
			for(var i=0;i<stateLength.length;i++){
				var stateValue = stateLength[i].key.split("$");
				if(stateValue[0] == level1Id){
					var optlevel0 = document.createElement('option');
					optlevel0.innerHTML = stateValue[1];
					optlevel0.value = stateValue[0];
					geoLevel1.appendChild(optlevel0);
				}
			}
		}else{
			/*for(var i=0;i<stateLength.length;i++){
				var stateValue = stateLength[i].key.split("$");
				var optlevel0 = document.createElement('option');
				optlevel0.innerHTML = stateValue[1];
				optlevel0.value = stateValue[0];
				geoLevel1.appendChild(optlevel0);
			}*/
		}

		//Sorting the select option after appending to the select option :
		var options = $("#geo_level1_0 option");
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

		$('#geo_level1_0').selectBoxIt({ defaultText: '', autoWidth: false });
		$('#geo_level2_0').selectBoxIt({ defaultText: '', autoWidth: false });

	}else if(geoLevel==3){

		geoMenuContent+='<tr>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox" style="width:175px;">'+
					 '<select class="custom_selectbox" id="geo_level1_0" onchange="geoLevel1Change('+"'geo_level1_0','geo_level2_0'"+');">'+
					    '<option value="0">Select State</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox" style="width:175px;">'+
					 '<select class="custom_selectbox" id="geo_level2_0" onchange="geoLevel2Change('+"'geo_level1_0','geo_level2_0','geo_level3_0'"+');">'+
					    '<option value="0">Select District</option>'+
					  '</select>'+
				      '</div>'+
		 	 	   '</td>'+
				   '<td>'+
				      '<div class="select-wrap1 variable-selectbox" style="width:175px;">'+
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
		if(level1Id != 0){
			for(var i=0;i<stateLength.length;i++){
				var stateValue = stateLength[i].key.split("$");
				if(stateValue[0] == level1Id){
					var optlevel0 = document.createElement('option');
					optlevel0.innerHTML = stateValue[1];
					optlevel0.value = stateValue[0];
					geoLevel1.appendChild(optlevel0);
				}
			}
		}else{
			for(var i=0;i<stateLength.length;i++){
				var stateValue = stateLength[i].key.split("$");
				var optlevel0 = document.createElement('option');
				optlevel0.innerHTML = stateValue[1];
				optlevel0.value = stateValue[0];
				geoLevel1.appendChild(optlevel0);
			}
		}

		//Sorting the select option after appending to the select option :
		var options = $("#geo_level1_0 option");
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

		$('#geo_level1_0').selectBoxIt({ defaultText: '', autoWidth: false });
		$('#geo_level2_0').selectBoxIt({ defaultText: '', autoWidth: false });
		$('#geo_level3_0').selectBoxIt({ defaultText: '', autoWidth: false });
	}
	tableRowCount["rowcount"] = 0;
}


function geoLevel1Change(geoLevel1SelectId,geoLevel2SelectId){

	var level1_Id = document.getElementById('level_1_Id').value;
	var geoLevel1Value = document.getElementById(geoLevel1SelectId).value;
	/*if(level1_Id != geoLevel1Value){
		bootbox.alert("alert");
		document.getElementById(geoLevel1SelectId).value = level1_Id;
		return false;
	}*/

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
		optlevel0.innerHTML = distObj[key].toTitleCase();
		optlevel0.value = key;
		geoLevel2.appendChild(optlevel0);
	}
	//Sorting the select option after appending to the select option :
	var options = $("#"+geoLevel2SelectId+" option");
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

	var optlevel0 = document.createElement('option');
	optlevel0.innerHTML = "Select Taluk";
	optlevel0.value = "0";
	geoLevel3.appendChild(optlevel0);

	for(key in talukObj){
		var optlevel0 = document.createElement('option');
		optlevel0.innerHTML = talukObj[key].toTitleCase();
		optlevel0.value = key;
		geoLevel3.appendChild(optlevel0);
	}

	//Sorting the select option after appending to the select option :
	var options = $("#"+geoLevel3SelectId+" option");
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
	$("#"+geoLevel3SelectId).data("selectBox-selectBoxIt").add();

	stateDim.filterAll();
	districtDim.filterAll();
}


function addNewRow(){

	var level1Id = document.getElementById('level_1_Id').value;

	var geoLevel = document.getElementById('geo_level').value;
	var geoLevel1Value = document.getElementById('geo_level1_0').value;
	var geoLevel2Value = document.getElementById('geo_level2_0').value;

	if(geoLevel1Value == 0){
		bootbox.alert("A State must be selected for this operation. Please select a State.");
		return false;
	}
	if(geoLevel2Value == 0){
		bootbox.alert("A District must be selected for this operation. Please select a District.");
		return false;
	}

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
	divelement1.style.width = "175px";
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
		if(stateValue[0]==level1Id){
			var optlevel0 = document.createElement('option');
			optlevel0.innerHTML = stateValue[1];
			optlevel0.value = stateValue[0];
			geoLevel1.appendChild(optlevel0);
		}
	}
	//Sorting the select option after appending to the select option :
	var options = $("#geo_level1_"+countval+" option");
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

	$("#geo_level1_"+countval).selectBoxIt({ defaultText: '', autoWidth: false });


	// district load
	var cell2 = row.insertCell(1);
	var divelement2 = document.createElement("div");
	divelement2.className = "select-wrap1 variable-selectbox";
	divelement2.style.width = "175px";
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
		divelement3.style.width = "175px";
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
		/*var cell4 = row.insertCell(3);
		var element4 = document.createElement("span");
		element4.id = "add_row_"+countval;
		element4.classList.add("var-add");
		element4.onclick = function() { addNewRow() };
		cell4.appendChild(element4);*/

		// Close arrow 
		var cell4 = row.insertCell(3);
		var element4 = document.createElement("span");
		element4.id = "close_arrow_"+countval;
		element4.classList.add("var-close");
		element4.onclick = function() { deleteRow(this); };
		cell4.appendChild(element4);

		// value set new row and reset first row
		document.getElementById("geo_level1_"+countval).value=geoLevel1Value;
		$("#geo_level1_"+countval).data("selectBox-selectBoxIt").add();
		geoLevel1Change("geo_level1_"+countval,"geo_level2_"+countval);

		document.getElementById("geo_level2_"+countval).value=geoLevel2Value;
		$("#geo_level2_"+countval).data("selectBox-selectBoxIt").add();
		geoLevel2Change("geo_level1_"+countval,"geo_level2_"+countval,"geo_level3_"+countval);

		var geoLevel3Value = document.getElementById("geo_level3_0").value;

		if(geoLevel3Value == 0){
			bootbox.alert("A Taluk must be selected for this operation. Please select a Taluk.");
			return false;
		}

		document.getElementById("geo_level3_"+countval).value=geoLevel3Value;
		$("#geo_level3_"+countval).data("selectBox-selectBoxIt").add();

		document.getElementById("geo_level1_0").value=0;
		$("#geo_level2_0").html("");
		$("#geo_level3_0").html("");
		$("#geo_level1_0").data("selectBox-selectBoxIt").add();
		$("#geo_level2_0").data("selectBox-selectBoxIt").add();
		$("#geo_level3_0").data("selectBox-selectBoxIt").add();


	}else{

		// add arrow
		/*var cell3 = row.insertCell(2);
		var element3 = document.createElement("span");
		element3.id = "add_row_"+countval;
		element3.classList.add("var-add");
		element3.onclick = function() { addNewRow() };
		cell3.appendChild(element3);*/

		// Close arrow 
		var cell3 = row.insertCell(2);
		var element3 = document.createElement("span");
		element3.id = "close_arrow_"+countval;
		element3.classList.add("var-close");
		element3.onclick = function() { deleteRow(this); };
		cell3.appendChild(element3);
		
		// value set new row and reset first row
		document.getElementById("geo_level1_"+countval).value=geoLevel1Value;
		$("#geo_level1_"+countval).data("selectBox-selectBoxIt").add();
		geoLevel1Change("geo_level1_"+countval,"geo_level2_"+countval);

		document.getElementById("geo_level2_"+countval).value=geoLevel2Value;
		$("#geo_level2_"+countval).data("selectBox-selectBoxIt").add();

		document.getElementById("geo_level1_0").value=0;
		$("#geo_level2_0").html("");
		$("#geo_level1_0").data("selectBox-selectBoxIt").add();
		$("#geo_level2_0").data("selectBox-selectBoxIt").add();

	}

}

function deleteRow(row){
	var table=document.getElementById("geo_content_id");
	var i=row.parentNode.parentNode.rowIndex;
	table.deleteRow(i);
}

// geo variable load


var contextualVariableNameId = {};

function textSearch(){
	var searchText = document.getElementById('id_search2').value;
	var masterVariableContent = '';


	document.getElementById("variableCategoryId").value = "allcategories";
	$("#variableCategoryId").data("selectBox-selectBoxIt").add();

	contextualVariable = [];
	if(variableCategory.length > 0){
		for(var i=0;i<variableCategory.length; i++){
			if(variableCategory[i]._source['title']){
				var title = variableCategory[i]._source['title'];
				/*title = title.replace(/ +/g, "");
				searchText = searchText.replace(/ +/g, "");*/
				title = title.split(' ').join('');
				searchText = searchText.split(' ').join('');
				if(title.toLowerCase().indexOf(searchText.toLowerCase()) != -1){
					contextualVariable.push(variableCategory[i]);
				}
			}
		}
	}

	//if(contextualVariable){
	if(contextualVariable.length > 0){
		for(var i=0,j=0; i<contextualVariable.length; i+=3,j++){
		    
		    if(j%2==0){
			masterVariableContent+='<tr class="odd">';
		    }else{
			masterVariableContent+='<tr class="even">';
		    }
		    if(contextualVariable[i]){
		  	
			var variable1 = contextualVariable[i]._source['title'];
			var variableId1 = contextualVariable[i]._source['key'];
			contextualVariableNameId[variableId1] = variable1;  			
			
			variable1 = variable1.replace(/_/g,' ');
			variable1 = variable1.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			if(( $.inArray(contextualVariable[i]._source['key'], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+variableId1+'_selectedid" class="selected"><label data-tooltip="list-item-'+variableId1+'" data-tooltip2="st-arrow"  class="popup-label" >'
						+'<input type="checkbox" checked class="popup-cb" id="'+variableId1+'_variable"  onclick="variableClick('
						+"'"+variableId1+"'"+');" >'+variable1+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+variableId1+'_selectedid"><label data-tooltip="list-item-'+variableId1+'" data-tooltip2="st-arrow" class="popup-label" >'
						+'<input type="checkbox"  class="popup-cb" id="'+variableId1+'_variable" onclick="variableClick('+"'"+variableId1+"'"+');" >'+variable1+'</input></label></td>';
			}
		     }
		  	
		     /*  *  */
		     if(contextualVariable[i+1]){
			var variable2 = contextualVariable[i+1]._source['title'];
			var variableId2 = contextualVariable[i+1]._source['key'];

			contextualVariableNameId[variableId2] = variable2;

			variable2 = variable2.replace(/_/g,' ');
			variable2 = variable2.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			if(( $.inArray(contextualVariable[i+1]._source['key'], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+variableId2+'_selectedid" class="selected"><label data-tooltip="list-item-'+variableId2+'" data-tooltip2="st-arrow"  class="popup-label" >'
						+'<input type="checkbox" checked  class="popup-cb" id="'+variableId2+'_variable"  data-tooltip="list-item-'+variableId2+'"  onclick="variableClick('
						+"'"+variableId2+"'"+');" >'+variable2+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+variableId2+'_selectedid"><label data-tooltip="list-item-'+variableId2+'" data-tooltip2="st-arrow"  class="popup-label">'
						+'<input type="checkbox"  class="popup-cb" id="'+variableId2+'_variable" onclick="variableClick('+"'"+variableId2+"'"+');" >'+variable2+'</input></label></td>';
			}
		     }
		     if(contextualVariable[i+2]){
			var variable3 = contextualVariable[i+2]._source['title'];
			var variableId3 = contextualVariable[i+2]._source['key'];

			contextualVariableNameId[variableId3] = variable3;

			variable3 = variable3.replace(/_/g,' ');
			variable3 = variable3.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});					

			if(( $.inArray(contextualVariable[i+2]._source['key'], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+variableId3+'_selectedid" class="selected"><label data-tooltip="list-item-'+variableId3+'" data-tooltip2="st-arrow" class="popup-label" >'
						+'<input type="checkbox" checked class="popup-cb" id="'+variableId3+'_variable"  onclick="variableClick('
						+"'"+variableId3+"'"+');" >'+variable3+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+variableId3+'_selectedid"><label data-tooltip="list-item-'+variableId3+'" data-tooltip2="st-arrow" class="popup-label">'
						+'<input type="checkbox"  class="popup-cb" id="'+variableId3+'_variable" onclick="variableClick('+"'"+variableId3+"'"+');" >'+variable3+'</input></label></td>';
			}
		     }
			masterVariableContent+='</tr>';
		}


		document.getElementById('load-master-variable').innerHTML=masterVariableContent;
	
		/*To reinitializing the popup by calling this function*/
		StickyToolTipFun();	
	
		variableClick('');

	}else{
		searchText = document.getElementById('id_search2').value;
		document.getElementById('load-master-variable').innerHTML="<tr class='odd'><td></td> <td colspan='2'> No Variables Found such as '"+searchText+"'.</td></tr>";
		//document.getElementById('sticky-tool-inner').innerHTML='';
	}
	
	
	if(contextualVariable.length > 0){
		variablePaginationCall();
	}
	
}


var variableCategory,units,description='';
function loadVariableCategory(){
	$("#variableCategoryId").data("selectBox-selectBoxIt").remove();
	//$("#geoCountryId").data("selectBox-selectBoxIt").remove();
	$("#myVariableTempId").data("selectBox-selectBoxIt").remove();
	var categoryKeys= [];
	for(var i=0;i<variableCategory.length; i++){
		if(variableCategory[i]){
		if(variableCategory[i]._source['category']){
			categoryKeys.push(variableCategory[i]._source['category']);
			categoryKeys = _.uniq(categoryKeys);	
		}
		}
	}
	categoryKeys = categoryKeys.sort();
	
	var variableCategoryId = document.getElementById('variableCategoryId');
		var optcategory = document.createElement('option');
		optcategory.innerHTML = "All Categories";
		optcategory.value = "allcategories";
		variableCategoryId.appendChild(optcategory);
	for(var i=0;i<categoryKeys.length;i++){
		if(categoryKeys[i]){
			var optcategory = document.createElement('option');
			var valCh = categoryKeys[i];
			valCh = valCh.replace(/_/g,' ');
			//valCh = valCh.replace(' in',' By Industry ');
			//valCh = valCh.replace('employment','% Employed ');
			var valCam = valCh.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optcategory.innerHTML = valCam;
			optcategory.value = categoryKeys[i];
			variableCategoryId.appendChild(optcategory);
		}
	}
	$("#variableCategoryId").data("selectBox-selectBoxIt").add();

	/* GEO Country load start 
	var geoCountryId = document.getElementById('geoCountryId');
	for(var i=0;i<level0Data.length;i++){
		var optlevel0 = document.createElement('option');
		var valCh = level0Data[i].name_0;
		var valCam = valCh.toTitleCase();
		optlevel0.innerHTML = valCam;
		optlevel0.value = level0Data[i].id_0;
		geoCountryId.appendChild(optlevel0);
	}
	$("#geoCountryId").data("selectBox-selectBoxIt").add();
	 GEO Country load end */

	/* My Variable template load start */
	var myVariableTempId = document.getElementById('myVariableTempId');
	if(myVariables != "No Result Found"){
		for(var key in myVariables){
			var content;
			if(key.length > 25){
				content = key.substring(0, 20)+"...";
			}else{
				content = key;
			}
			var optlevel0 = document.createElement('option');
			//var valCam = key;//.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			optlevel0.innerHTML = content;
			optlevel0.value = key;
			optlevel0.setAttribute("rel","popover");
			optlevel0.setAttribute("title","Template : "+key);
			myVariableTempId.appendChild(optlevel0);
		}
		$("#myVariableTempId").data("selectBox-selectBoxIt").add();
	}
	/* My Variable template load end */

	/*POP up on mouse over on select option*/
	$("[rel='popover']").popover({ trigger: "hover", container: "body" });

	//loadGeoState();
	loadVariable();
	loadMyVariable();
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
					state1 = state1.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+1]){
					state2 = sortable[i+1][1].replace(/_/g,' ');
					state2 = state2.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+2]){
					state3 = sortable[i+2][1].replace(/_/g,' ');
					state3 = state3.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+3]){
					state4 = sortable[i+3][1].replace(/_/g,' ');
					state4 = state4.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
	var geostateTotalPage = Math.ceil($geostate_table_rows.length / geostate_table_row_limit);
	if(geostateTotalPage==0){
		geostateTotalPage=1;
	}
	$('#geo_pg1').jqPagination('option', 'max_page', geostateTotalPage);
	$('#geo_pg1').jqPagination('option', 'current_page', 1);
}

function geoPaginationGoTo(){
	var current_page = document.getElementById('pg-geo-goto').value;
	$geostate_table_rows = $('#load-master-geography tbody tr');
	var geostate_table_row_limit = 6;
	var geostateTotalPage = Math.ceil($geostate_table_rows.length / geostate_table_row_limit);
	if(geostateTotalPage==0){
		geostateTotalPage=1;
	}
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
							level1name = level1name.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
							var obj={};
							obj["level1id"] = sortable[i][0];
							obj["level1name"] = level1name;
							selectedGeoState.push(obj);
							selectedGeoState = _.uniq(selectedGeoState);
						}else{
							document.getElementById("geostate_"+sortable[i][0]).checked = false;
							d3.select("#geo_selectedid_"+sortable[i][0]+"").attr('class','');
							bootbox.dialog({
							  message: "You do not currently have access to these geographies or variables. To access them you will have to upgrade your plan. Upgrade now?",
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
			geostate = geostate.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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


var myVariablesKey={},variablesKey={};
var myVariablesKeyTempName={};
var categories=[];
var trend="trend";
var myVariablesKeyProductDetails={}
var myVariablesDateType=[];



var myVarProd={};
var myVarProdTemp={};

var myVariablesDateType=[];
var myVariablesKeyProductName={};

var monthObjName ={
	"01" : "January",
	"02" : "Febraury",
	"03" : "March",
	"04" : "April",
	"05" : "May",
	"06" : "June",
	"07" : "July",
	"08" : "August",
	"09" : "September",
	"10" : "October",
	"11" : "November",
	"12" : "December"
};


function loadMyVariable(){

	var keyId1,keyId2,keyId3,variable1,variable2,variable3;
        var myVariableTempId = document.getElementById('myVariableTempId').value;
	var myVariableContent="";
	myVarProd = [];

	for(key in myVariables){
		for(var key1 in myVariables[key]){
			for(var key2 in myVariables[key][key1]){

				if(key1 == "category"){				
					if(( $.inArray(myVariables[key][key1][key2]['name'], categories) == -1)){
						categories.push(myVariables[key][key1][key2]['name']);
					}
				}

				if(myVariables[key][key1][key2]['name']){

					var variableObj= myVariables[key][key1][key2];		
					myVariablesKey[variableObj.id] = variableObj['name'];
					myVariablesKeyProductName[variableObj['id']] = variableObj["keyid"];


					if(myVarProd[key]){

						if (myVarProd[key][variableObj["keyid"]]){
								if(variableObj['keytype']){
								if(( $.inArray(variableObj['keytype'], myVarProd[key][variableObj["keyid"]]["datetype"]) ==  -1)){
									myVarProd[key][variableObj["keyid"]]["datetype"].push(variableObj['keytype']);

									/*date type array*/
									if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
										myVariablesDateType.push(variableObj['keytype']);
									}
								}
								if(variableObj['timespecyearid']){
									if(( $.inArray(variableObj['timespecyearid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
										myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
									}
								}
								/*if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 31 || splt.length >1){
											if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
												myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
											}
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}*/
								if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 12 || splt.length >1){
											if(splt.length >1){
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["day"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["day"].push(variableObj['timespecid']);
												}
											}else{
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
												}
											}	
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}
								if(variableObj['date']){
									//if(variableObj['id'].indexOf("avg") ==  -1){	
										if(( $.inArray(variableObj['date'], myVarProd[key][variableObj["keyid"]]["date"]) ==  -1)){
											myVarProd[key][variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
										}
									//}	
								}
							}
						}else{
							if(variableObj['keytype']){
								myVarProd[key][variableObj["keyid"]] = { "id": variableObj['id'],
															"keyname":variableObj['keyname'], 
															"datetype":[], "month":[], "year":[], "day":[] ,
															"date":{} };


								if(( $.inArray(variableObj['keytype'], myVarProd[key][variableObj["keyid"]]["datetype"]) == -1)){
									myVarProd[key][variableObj["keyid"]]["datetype"].push(variableObj['keytype']);
									/*date type array*/
									if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
										myVariablesDateType.push(variableObj['keytype']);
									}
								}
								if(variableObj['timespecyearid']){
									if(( $.inArray(variableObj['timespecyearid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
										myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
									}
								}
								/*if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 31 || splt.length >1){
											if(variableObj['timespecid']){
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
												}
											}	
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}*/
								if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 12 || splt.length >1){
											if(splt.length >1){
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["day"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["day"].push(variableObj['timespecid']);
												}
											}else{
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
												}
											}	
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}
								if(variableObj['date']){
									//if(variableObj['id'].indexOf("_by_avg") ==  -1){	
										if(( $.inArray(variableObj['date'], myVarProd[key][variableObj["keyid"]]["date"]) ==  -1)){
											myVarProd[key][variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
										}
									//}
								}
							}else{

								/*Modal Score */
								if(variableObj["id"].indexOf("IND_MV") != -1 || variableObj["id"].indexOf("mv") != -1){
									myVarProd[key][variableObj["id"]]={};
									myVarProd[key][variableObj["id"]] = { "id": variableObj['id'],
															"keyname":variableObj['name'], 
															"datetype":[], "month":[], "year":[], "day":[],
															"date":{} };
								}
							}


						}
						myVariablesKeyTempName[variableObj.id] = key;
					}else{
						myVarProd[key] ={};
						myVarProd[key][variableObj["keyid"]]={};
						if(variableObj['keytype']){
							myVarProd[key][variableObj["keyid"]] = { "id": variableObj['id'],
														"keyname":variableObj['keyname'], 
														"datetype":[], "month":[], "year":[], "day":[],
														"date":{} };


							if(( $.inArray(variableObj['keytype'], myVarProd[key][variableObj["keyid"]]["datetype"]) == -1)){
								myVarProd[key][variableObj["keyid"]]["datetype"].push(variableObj['keytype']);
								/*date type array*/
								if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
									myVariablesDateType.push(variableObj['keytype']);
								}
							}
							if(variableObj['timespecyearid']){
								if(( $.inArray(variableObj['timespecyearid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
									myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
								}
							}
							if(variableObj['timespecid']){
								if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
									var splt = variableObj['timespecid'].split('-');
									if(variableObj['timespecid'] > 12 || splt.length >1){
										if(splt.length >1){
											if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["day"]) ==  -1)){
												myVarProd[key][variableObj["keyid"]]["day"].push(variableObj['timespecid']);
											}
										}else{
											if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
												myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
											}
										}	
									}else{
										myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
									}
								}
							}
							if(variableObj['date']){
								//if(variableObj['id'].indexOf("_by_avg") ==  -1){	
									if(( $.inArray(variableObj['date'], myVarProd[key][variableObj["keyid"]]["date"]) ==  -1)){
										myVarProd[key][variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
									}
								//}
							}
						myVariablesKeyTempName[variableObj.id] = key;
						}
					}
				}
			}
		}
	}


	for(key in myVariables){
		if(key == myVariableTempId){
			var sortable = [];
			for(var key1 in myVariables[key]){
				for(var key2 in myVariables[key][key1]){
					if(myVariables[key][key1][key2]['name']){
						var obj={};
						obj[myVariables[key][key1][key2].id]=myVariables[key][key1][key2]['name'];
						sortable.push(obj);
					}
				}
			}

			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });

			var myVarProdKeys = Object.keys(myVarProd[myVariableTempId]);	

			for(var i=0,j=0;i<myVarProdKeys.length;i+=2,j++){

				if(j%2==0){
					myVariableContent+='<tr  class="pop-variable-table">';
				}else{
					myVariableContent+='<tr class="pop-variable-table">';
				}
				if(myVarProdKeys[i] && myVarProdKeys[i]!='undefined'){

						var month_1td = ""; 
						var year_1td = "";
						var date_1td = "";
						console.log("dddddd");
						console.log(myVarProd[myVariableTempId][myVarProdKeys[i]]);
						month_1td = myVarProd[myVariableTempId][myVarProdKeys[i]].month; 
						year_1td = myVarProd[myVariableTempId][myVarProdKeys[i]].year;
						day_1td = myVarProd[myVariableTempId][myVarProdKeys[i]].day;
						date_1td = Object.keys(myVarProd[myVariableTempId][myVarProdKeys[i]].date);

						month_1td = month_1td.sort(function(a,b) { return d3.ascending(a, b); });
						year_1td = year_1td.sort(function(a,b) { return d3.ascending(a, b); });

		

						var list = "";
						for(var k=0;k <year_1td.length;k++ ){
							for(var j=0; j<month_1td.length; j++ ){
								if(( $.inArray(month_1td[j]+"-"+year_1td[k], date_1td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i]].date[month_1td[j]+"-"+year_1td[k]];	
					                                    list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a title="'+monthObjName[month_1td[j]]+' '+year_1td[k]+'">'+monthObjName[month_1td[j]]+' '+year_1td[k]+'</a></label></li>';
								}
							}	
						}

						if(month_1td.length < 1){
							for(var k=0;k <year_1td.length;k++ ){
								if(( $.inArray(year_1td[k], date_1td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i]].date[year_1td[k]];	
						                            list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a title="'+year_1td[k]+'">'+year_1td[k]+'</a></label></li>';
								}
							}
						}
	
						if(day_1td.length >0){
							for(var k=0;k <day_1td.length;k++ ){
								if(( $.inArray(day_1td[k], date_1td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i]].date[day_1td[k]];	
						                            list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a title="'+day_1td[k]+'">'+day_1td[k]+'</a></label></li>';
								}
							}

						}

						if(list.length == 0){
				
							myVariableContent +=  '<td width="50%" id="myvar_selectedid_'+myVarProdKeys[i]+'" >'+
						                	'<div class="pop-dropdown-wrap" style="cursor:pointer;" data-tooltip="list-item-'+myVarProdKeys[i]+'" data-tooltip2="st-arrow"  onclick="myVariableClick('+"'"+myVarProdKeys[i]+"'"+');">'+
						                    	'<div class="drop-head clearfix">'+
						                        	'<div class="left-pane">'+
										//'<a onclick="myVariableClick('+"'"+myVarProdKeys[i]+"'"+');" title="'+myVarProd[myVariableTempId][myVarProdKeys[i]]['keyname']+'">'+myVarProd[myVariableTempId][myVarProdKeys[i]]['keyname'].toTitleCase()+'</a>'+
						                                '<h3 id="'+myVarProdKeys[i]+'-h3">'+myVarProd[myVariableTempId][myVarProdKeys[i]]['keyname'].toTitleCase()+" "+
											'<font id="'+myVarProdKeys[i]+'-font" ></font>'
										+'</h3>'+
						                            '</div>'+
						                        '</div>'+
						                    '</div>'+
						                '</td>';

						}else{

							myVariableContent +=  '<td width="50%"  id="myvar_selectedid_'+myVarProdKeys[i]+'" >'+
						                	'<div class="pop-dropdown-wrap">'+
						                    	'<div class="drop-head clearfix">'+
						                        	'<div class="left-pane">'+
						                                '<h3 id="'+myVarProdKeys[i]+'-h3">'+myVarProd[myVariableTempId][myVarProdKeys[i]]['keyname'].toTitleCase()+" "+
											'<font id="'+myVarProdKeys[i]+'-font" ></font>'
										+'</h3>'+
						                            '</div>'+
						                            '<div class="right-pane pop-vari-trig">'+
						                            '</div>'+
						                        '</div>'+
						                        '<div class="drop-content clearfix">'+
						                        	'<ul class="drop-list-wrap">'+
											list
						                           ' </ul>'+
						                        '</div>'+
						                    '</div>'+
						                '</td>';
						}


				} else {

					        myVariableContent +=  '<td width="50%"></td>' 
				}

				if(myVarProdKeys[i+1]){

						var month_2td = ""; 
						var year_2td = "";
						var date_2td = "";

						month_2td = myVarProd[myVariableTempId][myVarProdKeys[i+1]].month; 
						year_2td = myVarProd[myVariableTempId][myVarProdKeys[i+1]].year;
						day_2td = myVarProd[myVariableTempId][myVarProdKeys[i+1]].day;
						date_2td = Object.keys(myVarProd[myVariableTempId][myVarProdKeys[i+1]].date);

						month_2td = month_2td.sort(function(a,b) { return d3.ascending(a, b); });
						year_2td = year_2td.sort(function(a,b) { return d3.ascending(a, b); });

						var list = "";
						for(var k=0;k <year_2td.length;k++ ){
							for(var j=0; j<month_2td.length; j++ ){
								if(( $.inArray(month_2td[j]+"-"+year_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[month_2td[j]+"-"+year_2td[k]];	
					                                    list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a title="'+monthObjName[month_2td[j]]+' '+year_2td[k]+'">'+monthObjName[month_2td[j]]+' '+year_2td[k]+'</a></label></li>';
								}
								if(( $.inArray(year_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[year_2td[k]];	
					                                    list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a title="'+year_2td[k]+'">'+year_2td[k]+'</a></label></li>';
								}
							}	
						}
						if(month_2td.length < 1){
							for(var k=0;k <year_2td.length;k++ ){
								if(( $.inArray(year_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[year_2td[k]];	
						                            list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a title="'+year_2td[k]+'">'+year_2td[k]+'</a></label></li>';
								}
							}
						}
						if(day_2td.length >0){
							for(var k=0;k <day_2td.length;k++ ){
								if(( $.inArray(day_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[day_2td[k]];	
						                            list += '<li onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a  title="'+day_2td[k]+'">'+day_2td[k]+'</a></label></li>';
								}
							}

						}
						if(list.length == 0){
				
							myVariableContent +=  '<td width="50%" id="myvar_selectedid_'+myVarProdKeys[i+1]+'" >'+
						                	'<div class="pop-dropdown-wrap" data-tooltip="list-item-'+myVarProdKeys[i+1]+'" data-tooltip2="st-arrow"  style="cursor:pointer;" onclick="myVariableClick('+"'"+myVarProdKeys[i+1]+"'"+');">'+
						                    	'<div class="drop-head clearfix">'+
						                        	'<div class="left-pane">'+
										//'<a onclick="myVariableClick('+"'"+myVarProdKeys[i+1]+"'"+');" title="'+myVarProd[myVariableTempId][myVarProdKeys[i+1]]['keyname']+'">'+myVarProd[myVariableTempId][myVarProdKeys[i+1]]['keyname'].toTitleCase()+'</a>'+

										'<h3  id="'+myVarProdKeys[i+1]+'-h3">'+myVarProd[myVariableTempId][myVarProdKeys[i+1]]['keyname'].toTitleCase()+""
											+'<font id="'+myVarProdKeys[i+1]+'-font" ></font>'
										+'</h3>'+
						                            '</div>'+
						                        '</div>'+
						                    '</div>'+
						                '</td>';

						}else{

							myVariableContent +=  '<td width="50%" id="myvar_selectedid_'+myVarProdKeys[i+1]+'" >'+
						                	'<div class="pop-dropdown-wrap">'+
						                    	'<div class="drop-head clearfix">'+
						                        	'<div class="left-pane">'+
						                                '<h3  id="'+myVarProdKeys[i+1]+'-h3">'+myVarProd[myVariableTempId][myVarProdKeys[i+1]]['keyname'].toTitleCase()+""
											+'<font id="'+myVarProdKeys[i+1]+'-font" ></font>'
										+'</h3>'+
						                            '</div>'+
						                            '<div class="right-pane pop-vari-trig">'+
						                            '</div>'+
						                        '</div>'+
						                        '<div class="drop-content clearfix">'+
						                        	'<ul class="drop-list-wrap">'+
											list
						                           ' </ul>'+
						                        '</div>'+
						                    '</div>'+
						                '</td>';

						}


				} else {

					        myVariableContent +=  '<td width="50%"></td>' 
				}
				myVariableContent+="</tr>";	
			}
		}
	}
	document.getElementById('load-master-myvariable').innerHTML=myVariableContent;
	myVariableListDown();
	myVariableClick('');
	myVariablePaginationCall();
	StickyToolTipFun();
}



function loadMyVariable_without_model_score(){

	var keyId1,keyId2,keyId3,variable1,variable2,variable3;
        var myVariableTempId = document.getElementById('myVariableTempId').value;
	var myVariableContent="";
	myVarProd = [];

	for(key in myVariables){
		for(var key1 in myVariables[key]){
			for(var key2 in myVariables[key][key1]){
				if(myVariables[key][key1][key2]['name']){

					var variableObj= myVariables[key][key1][key2];		
					myVariablesKey[variableObj.id] = variableObj['name'];
					myVariablesKeyProductName[variableObj['id']] = variableObj["keyid"];

					if(myVarProd[key]){

						if (myVarProd[key][variableObj["keyid"]]){
								if(variableObj['keytype']){
								if(( $.inArray(variableObj['keytype'], myVarProd[key][variableObj["keyid"]]["datetype"]) ==  -1)){
									myVarProd[key][variableObj["keyid"]]["datetype"].push(variableObj['keytype']);

									/*date type array*/
									if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
										myVariablesDateType.push(variableObj['keytype']);
									}
								}
								if(variableObj['timespecyearid']){
									if(( $.inArray(variableObj['timespecyearid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
										myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
									}
								}
								/*if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 31 || splt.length >1){
											if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
												myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
											}
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}*/
								if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 12 || splt.length >1){
											if(splt.length >1){
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["day"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["day"].push(variableObj['timespecid']);
												}
											}else{
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
												}
											}	
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}
								if(variableObj['date']){
									if(variableObj['id'].indexOf("avg") ==  -1){	
										if(( $.inArray(variableObj['date'], myVarProd[key][variableObj["keyid"]]["date"]) ==  -1)){
											myVarProd[key][variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
										}
									}	
								}
							}
						}else{
							if(variableObj['keytype']){
								myVarProd[key][variableObj["keyid"]] = { "id": variableObj['id'],
															"keyname":variableObj['keyname'], 
															"datetype":[], "month":[], "year":[], "day":[] ,
															"date":{} };


								if(( $.inArray(variableObj['keytype'], myVarProd[key][variableObj["keyid"]]["datetype"]) == -1)){
									myVarProd[key][variableObj["keyid"]]["datetype"].push(variableObj['keytype']);
									/*date type array*/
									if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
										myVariablesDateType.push(variableObj['keytype']);
									}
								}
								if(variableObj['timespecyearid']){
									if(( $.inArray(variableObj['timespecyearid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
										myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
									}
								}
								/*if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 31 || splt.length >1){
											if(variableObj['timespecid']){
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
												}
											}	
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}*/
								if(variableObj['timespecid']){
									if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
										var splt = variableObj['timespecid'].split('-');
										if(variableObj['timespecid'] > 12 || splt.length >1){
											if(splt.length >1){
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["day"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["day"].push(variableObj['timespecid']);
												}
											}else{
												if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
													myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
												}
											}	
										}else{
											myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
										}
									}
								}
								if(variableObj['date']){
									if(variableObj['id'].indexOf("_by_avg") ==  -1){	
										if(( $.inArray(variableObj['date'], myVarProd[key][variableObj["keyid"]]["date"]) ==  -1)){
											myVarProd[key][variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
										}
									}
								}
							}


						}
						myVariablesKeyTempName[variableObj.id] = key;
					}else{
						myVarProd[key] ={};
						
						myVarProd[key][variableObj["keyid"]]={};
						if(variableObj['keytype']){
							myVarProd[key][variableObj["keyid"]] = { "id": variableObj['id'],
														"keyname":variableObj['keyname'], 
														"datetype":[], "month":[], "year":[], "day":[],
														"date":{} };


							if(( $.inArray(variableObj['keytype'], myVarProd[key][variableObj["keyid"]]["datetype"]) == -1)){
								myVarProd[key][variableObj["keyid"]]["datetype"].push(variableObj['keytype']);
								/*date type array*/
								if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
									myVariablesDateType.push(variableObj['keytype']);
								}
							}
							if(variableObj['timespecyearid']){
								if(( $.inArray(variableObj['timespecyearid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
									myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
								}
							}
							if(variableObj['timespecid']){
								if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["month"]) ==  -1)){
									var splt = variableObj['timespecid'].split('-');
									if(variableObj['timespecid'] > 12 || splt.length >1){
										if(splt.length >1){
											if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["day"]) ==  -1)){
												myVarProd[key][variableObj["keyid"]]["day"].push(variableObj['timespecid']);
											}
										}else{
											if(( $.inArray(variableObj['timespecid'], myVarProd[key][variableObj["keyid"]]["year"]) ==  -1)){
												myVarProd[key][variableObj["keyid"]]["year"].push(variableObj['timespecid']);
											}
										}	
									}else{
										myVarProd[key][variableObj["keyid"]]["month"].push(variableObj['timespecid']);
									}
								}
							}
							if(variableObj['date']){
								if(variableObj['id'].indexOf("_by_avg") ==  -1){	
									if(( $.inArray(variableObj['date'], myVarProd[key][variableObj["keyid"]]["date"]) ==  -1)){
										myVarProd[key][variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
									}
								}
							}
						myVariablesKeyTempName[variableObj.id] = key;
						}
					}
				}
			}
		}
	}



	for(key in myVariables){
		if(key == myVariableTempId){
			var sortable = [];
			for(var key1 in myVariables[key]){
				for(var key2 in myVariables[key][key1]){
					if(myVariables[key][key1][key2]['name']){
						var obj={};
						obj[myVariables[key][key1][key2].id]=myVariables[key][key1][key2]['name'];
						sortable.push(obj);
					}
				}
			}

			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });

			var myVarProdKeys = Object.keys(myVarProd[myVariableTempId]);	
			console.log("myVarProdKeys");
			console.log(myVarProd);
			console.log(myVarProdKeys);
			for(var i=0,j=0;i<myVarProdKeys.length;i+=2,j++){

				if(j%2==0){
					myVariableContent+='<tr  class="pop-variable-table">';
				}else{
					myVariableContent+='<tr class="pop-variable-table">';
				}

				if(myVarProdKeys[i]){

						var month_1td = ""; 
						var year_1td = "";
						var date_1td = "";

						month_1td = myVarProd[myVariableTempId][myVarProdKeys[i]].month; 
						year_1td = myVarProd[myVariableTempId][myVarProdKeys[i]].year;
						day_1td = myVarProd[myVariableTempId][myVarProdKeys[i]].day;
						date_1td = Object.keys(myVarProd[myVariableTempId][myVarProdKeys[i]].date);

						month_1td = month_1td.sort(function(a,b) { return d3.ascending(a, b); });
						year_1td = year_1td.sort(function(a,b) { return d3.ascending(a, b); });

		

						var list = "";
						for(var k=0;k <year_1td.length;k++ ){
							for(var j=0; j<month_1td.length; j++ ){
								if(( $.inArray(month_1td[j]+"-"+year_1td[k], date_1td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i]].date[month_1td[j]+"-"+year_1td[k]];	
					                                    list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');"><a onclick="myVariableClick('+"'"+myVariableId+"'"+');" title="'+monthObjName[month_1td[j]]+' '+year_1td[k]+'">'+monthObjName[month_1td[j]]+' '+year_1td[k]+'</a></li>';
								}
							}	
						}

						if(month_1td.length < 1){
							for(var k=0;k <year_1td.length;k++ ){
								if(( $.inArray(year_1td[k], date_1td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i]].date[year_1td[k]];	
						                            list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a onclick="myVariableClick('+"'"+myVariableId+"'"+');" title="'+year_1td[k]+'">'+year_1td[k]+'</a></label></li>';
								}
							}
						}
	
						if(day_1td.length >0){
							for(var k=0;k <day_1td.length;k++ ){
								if(( $.inArray(day_1td[k], date_1td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i]].date[day_1td[k]];	
						                            list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a onclick="myVariableClick('+"'"+myVariableId+"'"+');" title="'+day_1td[k]+'">'+day_1td[k]+'</a></label></li>';
								}
							}

						}

					        myVariableContent +=  '<td width="50%"  id="myvar_selectedid_'+myVarProdKeys[i]+'" >'+
				                        	'<div class="pop-dropdown-wrap">'+
				                            	'<div class="drop-head clearfix">'+
				                                	'<div class="left-pane">'+
				                                        '<h3 id="'+myVarProdKeys[i]+'-h3">'+myVarProd[myVariableTempId][myVarProdKeys[i]]['keyname']+" "+
										'<font id="'+myVarProdKeys[i]+'-font" ></font>'
									+'</h3>'+
				                                    '</div>'+
				                                    '<div class="right-pane pop-vari-trig">'+
				                                    '</div>'+
				                                '</div>'+
				                                '<div class="drop-content clearfix">'+
				                                	'<ul class="drop-list-wrap">'+
										list
				                                   ' </ul>'+
				                                '</div>'+
				                            '</div>'+
				                        '</td>';


				} else {

					        myVariableContent +=  '<td width="50%"></td>';
				}

				if(myVarProdKeys[i+1]){

						var month_2td = ""; 
						var year_2td = "";
						var date_2td = "";

						month_2td = myVarProd[myVariableTempId][myVarProdKeys[i+1]].month; 
						year_2td = myVarProd[myVariableTempId][myVarProdKeys[i+1]].year;
						day_2td = myVarProd[myVariableTempId][myVarProdKeys[i+1]].day;
						date_2td = Object.keys(myVarProd[myVariableTempId][myVarProdKeys[i+1]].date);

						month_2td = month_2td.sort(function(a,b) { return d3.ascending(a, b); });
						year_2td = year_2td.sort(function(a,b) { return d3.ascending(a, b); });

						var list = "";
						for(var k=0;k <year_2td.length;k++ ){
							for(var j=0; j<month_2td.length; j++ ){
								if(( $.inArray(month_2td[j]+"-"+year_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[month_2td[j]+"-"+year_2td[k]];	
					                                    list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a onclick="myVariableClick('+"'"+myVariableId+"'"+');" title="'+monthObjName[month_2td[j]]+' '+year_2td[k]+'">'+monthObjName[month_2td[j]]+' '+year_2td[k]+'</a></label></li>';
								}
								if(( $.inArray(year_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[year_2td[k]];	
					                                    list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a onclick="myVariableClick('+"'"+myVariableId+"'"+');" title="'+year_2td[k]+'">'+year_2td[k]+'</a></label></li>';
								}
							}	
						}
						if(month_2td.length < 1){
							for(var k=0;k <year_2td.length;k++ ){
								if(( $.inArray(year_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[year_2td[k]];	
						                            list += '<li data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a onclick="myVariableClick('+"'"+myVariableId+"'"+');" title="'+year_2td[k]+'">'+year_2td[k]+'</a></label></li>';
								}
							}
						}
						if(day_2td.length >0){
							for(var k=0;k <day_2td.length;k++ ){
								if(( $.inArray(day_2td[k], date_2td) != -1)){
									    var myVariableId = myVarProd[myVariableTempId][myVarProdKeys[i+1]].date[day_2td[k]];	
						                            list += '<li onclick="myVariableClick('+"'"+myVariableId+"'"+');">'+
											'<label data-tooltip="list-item-'+myVariableId+'" data-tooltip2="st-arrow"  class="popup-label" >'+
											'<a  title="'+day_2td[k]+'">'+day_2td[k]+'</a></label></li>';
								}
							}

						}

	
					        myVariableContent +=  '<td width="50%" id="myvar_selectedid_'+myVarProdKeys[i+1]+'" >'+
				                        	'<div class="pop-dropdown-wrap">'+
				                            	'<div class="drop-head clearfix">'+
				                                	'<div class="left-pane">'+
				                                        '<h3  id="'+myVarProdKeys[i+1]+'-h3">'+myVarProd[myVariableTempId][myVarProdKeys[i+1]]['keyname']+""
										+'<font id="'+myVarProdKeys[i+1]+'-font" ></font>'
									+'</h3>'+
				                                    '</div>'+
				                                    '<div class="right-pane pop-vari-trig">'+
				                                    '</div>'+
				                                '</div>'+
				                                '<div class="drop-content clearfix">'+
				                                	'<ul class="drop-list-wrap">'+
										list
				                                   ' </ul>'+
				                                '</div>'+
				                            '</div>'+
				                        '</td>';



				} else {

					        myVariableContent +=  '<td width="50%"></td>';
				}

				myVariableContent+="</tr>";	
			}
		}
	}
	document.getElementById('load-master-myvariable').innerHTML=myVariableContent;
	myVariableListDown();
	myVariableClick('');
	myVariablePaginationCall();
}


function loadMyVariable1(){

	var keyId1,keyId2,keyId3,variable1,variable2,variable3;
        var myVariableTempId = document.getElementById('myVariableTempId').value;
	var myVariableContent="";


	for(key in myVariables){
		for(var key1 in myVariables[key]){
			for(var key2 in myVariables[key][key1]){
				if(myVariables[key][key1][key2]['name']){

					var variableObj= myVariables[key][key1][key2];		
					myVariablesKey[variableObj.id] = variableObj['name'];

					if (myVariablesKeyProductDetails[variableObj["keyid"]]){
						if(variableObj['keytype']){
							if(( $.inArray(variableObj['keytype'], myVariablesKeyProductDetails[variableObj["keyid"]]["datetype"]) ==  -1)){
								myVariablesKeyProductDetails[variableObj["keyid"]]["datetype"].push(variableObj['keytype']);

								/*date type array*/
								if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
									myVariablesDateType.push(variableObj['keytype']);
								}
							}

							if(variableObj['id']){
								if(( $.inArray(variableObj['id'], myVariablesKeyProductDetails[variableObj["keyid"]]["id"]) ==  -1)){
									myVariablesKeyProductDetails[variableObj["keyid"]]["id"].push(variableObj['id']);
								}
							}

							if(variableObj['timespecyearid']){
								if(( $.inArray(variableObj['timespecyearid'], myVariablesKeyProductDetails[variableObj["keyid"]]["year"]) ==  -1)){
									myVariablesKeyProductDetails[variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
								}
							}
							if(variableObj['timespecid']){
								if(( $.inArray(variableObj['timespecid'], myVariablesKeyProductDetails[variableObj["keyid"]]["month"]) ==  -1)){
									var splt = variableObj['timespecid'].split('-');
									if(variableObj['timespecid'] > 31 || splt.length >1){
										if(( $.inArray(variableObj['timespecid'], myVariablesKeyProductDetails[variableObj["keyid"]]["year"]) ==  -1)){
											myVariablesKeyProductDetails[variableObj["keyid"]]["year"].push(variableObj['timespecid']);
										}
									}else{
										myVariablesKeyProductDetails[variableObj["keyid"]]["month"].push(variableObj['timespecid']);
									}
								}
							}
							if(variableObj['date']){
								if(( $.inArray(variableObj['date'], myVariablesKeyProductDetails[variableObj["keyid"]]["date"]) ==  -1)){
									//myVariablesKeyProductDetails[variableObj["keyid"]]["date"].push(variableObj['date']);
									myVariablesKeyProductDetails[variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
								}
							}
						}
					}else{
						if(variableObj['keytype']){
							myVariablesKeyProductDetails[variableObj["keyid"]] = { "id": [],
														"keyname":variableObj['keyname'], 
														"datetype":[], "month":[], "year":[] ,
														"date":{} };

							if(variableObj['id']){
								if(( $.inArray(variableObj['id'], myVariablesKeyProductDetails[variableObj["keyid"]]["id"]) ==  -1)){
									myVariablesKeyProductDetails[variableObj["keyid"]]["id"].push(variableObj['id']);
								}
							}

							if(( $.inArray(variableObj['keytype'], myVariablesKeyProductDetails[variableObj["keyid"]]["datetype"]) == -1)){
								myVariablesKeyProductDetails[variableObj["keyid"]]["datetype"].push(variableObj['keytype']);
								/*date type array*/
								if(( $.inArray(variableObj['keytype'], myVariablesDateType) == -1)){
									myVariablesDateType.push(variableObj['keytype']);
								}
							}
							if(variableObj['timespecyearid']){
								if(( $.inArray(variableObj['timespecyearid'], myVariablesKeyProductDetails[variableObj["keyid"]]["year"]) ==  -1)){
									myVariablesKeyProductDetails[variableObj["keyid"]]["year"].push(variableObj['timespecyearid']);
								}
							}
							if(variableObj['timespecid']){
								if(( $.inArray(variableObj['timespecid'], myVariablesKeyProductDetails[variableObj["keyid"]]["month"]) ==  -1)){
									//myVariablesKeyProductDetails[variableObj["keyid"]]["month"].push(variableObj['timespecid']);
									var splt = variableObj['timespecid'].split('-');
			
									if(variableObj['timespecid'] > 31 || splt.length >1){
										if(variableObj['timespecid']){
											if(( $.inArray(variableObj['timespecid'], myVariablesKeyProductDetails[variableObj["keyid"]]["year"]) ==  -1)){
												myVariablesKeyProductDetails[variableObj["keyid"]]["year"].push(variableObj['timespecid']);
											}
										}	
									}else{
										myVariablesKeyProductDetails[variableObj["keyid"]]["month"].push(variableObj['timespecid']);
									}
								}
							}
							if(variableObj['date']){
								if(( $.inArray(variableObj['date'], myVariablesKeyProductDetails[variableObj["keyid"]]["date"]) ==  -1)){
									//myVariablesKeyProductDetails[variableObj["keyid"]]["date"].push(variableObj['date']);
									myVariablesKeyProductDetails[variableObj["keyid"]]["date"][variableObj['date']] = variableObj['id'];
								}
							}
						}


					}
					myVariablesKeyTempName[variableObj.id] = key;
				}
			}
		}
	}


	for(key in myVariables){
		for(var key1 in myVariables[key]){
			if(key1 == "category"){
				for(var key3 in myVariables[key][key1]){
					if(( $.inArray(myVariables[key][key1][key3]['name'], categories) == -1)){
						categories.push(myVariables[key][key1][key3]['name']);
					}
				}
			}else{
				for(var key2 in myVariables[key][key1]){
					if(myVariables[key][key1][key2]['name']){
						myVariablesKey[myVariables[key][key1][key2].id]=myVariables[key][key1][key2]['name'];	// For access key name using key id
						myVariablesKeyTempName[myVariables[key][key1][key2].id] = key;
					}
				}
			}
		}
	}

	for(key in myVariables){
		if(key == myVariableTempId){
			var sortable = [];
			for(var key1 in myVariables[key]){
				if(key1 !="category"){
					for(var key2 in myVariables[key][key1]){
						if(myVariables[key][key1][key2]['name']){
							var obj={};
							obj[myVariables[key][key1][key2].id]=myVariables[key][key1][key2]['name'];
							//myVariablesKey[myVariables[key][key1][key2].id]=myVariables[key][key1][key2]['name'];
							sortable.push(obj);
						}
					}
				}
			}

			/*for(var i=0;i<myVariables[key].length;i++){
				if(myVariables[key][i]['geocategory'] == false){
					sortable.push(myVariables[key][i]['name']);
				}
			}*/
			
			sortable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });
			//myVariablesKey=sortable;

			for(var i=0,j=0;i<sortable.length;i+=3,j++){

				if(sortable[i]){
					keyId1 = Object.keys(sortable[i]);
					var keyName1 = sortable[i][keyId1];
					variable1 = keyName1.replace(/_/g,' ');
					variable1 = variable1.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+1]){
					keyId2 = Object.keys(sortable[i+1]);
					var keyName2 = sortable[i+1][keyId2];
					variable2 = keyName2.replace(/_/g,' ');
					variable2 = variable2.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}
				if(sortable[i+2]){
					keyId3 = Object.keys(sortable[i+2]);
					var keyName3 = sortable[i+2][keyId3];
					variable3 = keyName3.replace(/_/g,' ');
					variable3 = variable3.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}

				if(j%2==0){
					myVariableContent+='<tr class="odd">';
				}else{
					myVariableContent+='<tr class="even">';
				}

				keyId1 = (keyId1[0]);	
				keyId2 = (keyId2[0]);	
				keyId3 = (keyId3[0]);	


				if(sortable[i]){
					if(( $.inArray(keyId1, selectedMyVariable) != -1)){
						myVariableContent+='<td id="myvar_selectedid_'+keyId1+'" class="selected">'+
							'<label data-tooltip="list-item-'+keyId1+'" data-tooltip2="st-arrow"  class="popup-label" >'+	
							'<input type="checkbox" checked class="popup-cb" id="myvar_'+keyId1+'" onclick="myVariableClick('+"'"+keyId1+"'"+');" >'+variable1+'</input>'+
							'</label>'+
							'</td>';
					}else{
						myVariableContent+='<td id="myvar_selectedid_'+keyId1+'">'+
							'<label data-tooltip="list-item-'+keyId1+'" data-tooltip2="st-arrow"  class="popup-label" >'+	
							'<input type="checkbox" class="popup-cb" id="myvar_'+keyId1+'" onclick="myVariableClick('+"'"+keyId1+"'"+');" >'+variable1+'</input>'+
							'</label>'+
							'</td>';
					}
				
				}
				if(sortable[i+1]){
					if(( $.inArray(keyId2, selectedMyVariable) != -1)){	
						myVariableContent+='<td id="myvar_selectedid_'+keyId2+'" class="selected">'+
							'<label data-tooltip="list-item-'+keyId2+'" data-tooltip2="st-arrow"  class="popup-label" >'+	
							'<input type="checkbox" checked class="popup-cb" id="myvar_'+keyId2+'" onclick="myVariableClick('+"'"+keyId2+"'"+');" >'+variable2+'</input>'+
							'</label>'+
							'</td>';
					}else{
						myVariableContent+='<td id="myvar_selectedid_'+keyId2+'">'+
							'<label data-tooltip="list-item-'+keyId2+'" data-tooltip2="st-arrow"  class="popup-label" >'+	
							'<input type="checkbox" class="popup-cb" id="myvar_'+keyId2+'" onclick="myVariableClick('+"'"+keyId2+"'"+');" >'+variable2+'</input>'+
							'</label>'+
							'</td>';
					}
				
				}
				if(sortable[i+2]){
					if(( $.inArray(keyId3, selectedMyVariable) != -1)){	
						myVariableContent+='<td id="myvar_selectedid_'+keyId3+'" class="selected">'+
							'<label data-tooltip="list-item-'+keyId3+'" data-tooltip2="st-arrow"  class="popup-label" >'+	
							'<input type="checkbox" checked class="popup-cb" id="myvar_'+keyId3+'" onclick="myVariableClick('+"'"+keyId3+"'"+');" >'+variable3+'</input>'+
							'</label>'+
							'</td>';
					}else{
						myVariableContent+='<td id="myvar_selectedid_'+keyId3+'"><label class="popup-label">'+
							'<label data-tooltip="list-item-'+keyId3+'" data-tooltip2="st-arrow"  class="popup-label" >'+	
							'<input type="checkbox" class="popup-cb" id="myvar_'+keyId3+'" onclick="myVariableClick('+"'"+keyId3+"'"+');" >'+variable3+'</input>'+
							'</label>'+
							'</td>';
					}
				
				}
				myVariableContent+="</tr>";
			}

		}
		
	}
	document.getElementById('load-master-myvariable').innerHTML=myVariableContent;
	myVariableClick('');
	myVariablePaginationCall();
	StickyToolTipFun();
}

function myVariablePaginationCall(){
	$myvariable_table_rows = $('#load-master-myvariable tbody tr');
	var myvariable_table_row_limit = 6;
	var myvariableTotalPage = Math.ceil($myvariable_table_rows.length / myvariable_table_row_limit);
	if(myvariableTotalPage==0){
		myvariableTotalPage=1;
	}
	$('#myvar_pg1').jqPagination('option', 'max_page', myvariableTotalPage);
	$('#myvar_pg1').jqPagination('option', 'current_page', 1);
}

function myVariablePaginationGoTo(){
	var current_page = document.getElementById('pg-myvar-goto').value;
	$myvariable_table_rows = $('#load-master-myvariable tbody tr');
	var myvariable_table_row_limit = 6;
	var myvariableTotalPage = Math.ceil($myvariable_table_rows.length / myvariable_table_row_limit);
	if(myvariableTotalPage==0){
		myvariableTotalPage=1;
	}
	if(myvariableTotalPage >= current_page){
		$('#myvar_pg1').jqPagination('option', 'max_page', myvariableTotalPage);
		$('#myvar_pg1').jqPagination('option', 'current_page', current_page);
	}else{
		$('#myvar_pg1').jqPagination('option', 'max_page', myvariableTotalPage);
		$('#myvar_pg1').jqPagination('option', 'current_page', myvariableTotalPage);
	}
}

var selectedMyVariable=[];

function myVariableClick(id){
	if(id){
		if( $.inArray(id, selectedMyVariable) != -1){
			selectedMyVariable = _.without(selectedMyVariable, id);	
		}else{
			if(selectedMyVariable.length>=10){
				bootbox.alert("You can select a maximum of 10 variables into your list at a time. To add a new variable simply move one out of the list.");
				$(".modal").css('overflow-y', 'scroll');
				$('body.modal-open').css('overflow', 'hidden');
				return false;
			}else{
				selectedMyVariable.push(id);			
				selectedMyVariable = _.uniq(selectedMyVariable);
			}
		}
	}


	/*if( $.inArray(id, selectedMyVariable) != -1){
		if(selectedMyVariable.length>=10){
			if(id){
			   bootbox.alert("You can select a maximum of 10 variables into your list at a time. To add a new variable simply move one out of the list.");
			   $(".modal").css('overflow-y', 'scroll');
			   $('body.modal-open').css('overflow', 'hidden');
			   return false;
			}
		}
	}*/
	if(selectedMyVariable){
		var sNo=1;
		var selectedMyVariableContent="";
		for(var i=0;i<selectedMyVariable.length;i++){
			if(myVariablesKey[selectedMyVariable[i]]){
				selectedMyVariableContent +='<tr>'+
				    '<td width="20px">'+sNo+'</td>'+
				    '<td>'+myVariablesKey[selectedMyVariable[i]].toTitleCase()+'</td>'+
				    '<td><a title="" class="item-delete" onclick="removeSelectedMyVariable('+"'"+selectedMyVariable[i]+"'"+')"></a></td>'+
				'</tr>';
				sNo++;
			}else{
				selectedMyVariable = _.without(selectedMyVariable, selectedMyVariable[i]);	
			}
		}
		document.getElementById('selected-my-variable').innerHTML=selectedMyVariableContent;		
		document.getElementById('selected-my-variable-count').innerHTML="("+selectedMyVariable.length+")";
		document.getElementById('selected-my-variable-count-title').innerHTML=selectedMyVariable.length;
	}

	
}



function myVariableClick_without_removing(id){

	if( $.inArray(id, selectedMyVariable) == -1){
		if(selectedMyVariable.length>=10){
			if(id){
			   bootbox.alert("You can select a maximum of 10 variables into your list at a time. To add a new variable simply move one out of the list.");
			   $(".modal").css('overflow-y', 'scroll');
			   $('body.modal-open').css('overflow', 'hidden');
			   return false;
			}
		}else{
			if(myVariablesKey){
				if(myVariablesKey[id]){
					selectedMyVariable.push(id);
					selectedMyVariable = _.uniq(selectedMyVariable);
				}
			}
		}
	}
	if(selectedMyVariable){
		var sNo=1;
		var selectedMyVariableContent="";
		for(var i=0;i<selectedMyVariable.length;i++){
			selectedMyVariableContent +='<tr>'+
				    '<td width="20px">'+sNo+'</td>'+
				    '<td>'+myVariablesKey[selectedMyVariable[i]].toTitleCase()+'</td>'+
				    '<td><a title="" class="item-delete" onclick="removeSelectedMyVariable('+"'"+selectedMyVariable[i]+"'"+')"></a></td>'+
				'</tr>';
			sNo++;
		}
		document.getElementById('selected-my-variable').innerHTML=selectedMyVariableContent;		
		document.getElementById('selected-my-variable-count').innerHTML="("+selectedMyVariable.length+")";
		document.getElementById('selected-my-variable-count-title').innerHTML=selectedMyVariable.length;
	}

	
}


function removeSelectedMyVariable(id){
	/*if(document.getElementById("myvar_"+id)){
		document.getElementById("myvar_"+id).checked = false;
		d3.select('#myvar_selectedid_'+id).attr('class','');
	}*/
	selectedMyVariable = _.without(selectedMyVariable, id);
	myVariableClick('');
}


function myVariableClick1(id){
	appliedSelectedMyVariable = _.uniq(appliedSelectedMyVariable);
	if(myVariablesKey){
	//for(var i=0;i<myVariablesKey.length;i++){
	for(var key in myVariablesKey){

		if(document.getElementById("myvar_"+key)){
			if(document.getElementById("myvar_"+key).checked){
				if(selectedMyVariable.length>=10){
					if ( $('#myvar_selectedid_'+key).hasClass( "selected" ) ) {
						if(!document.getElementById("myvar_"+key).checked){
							document.getElementById("myvar_"+key).checked = false;
							d3.select('#myvar_selectedid_'+key).attr('class','');
							selectedMyVariable = _.without(selectedMyVariable, key);
						}
					}else{
						if(id){
						   document.getElementById("myvar_"+key).checked = false;
						   bootbox.alert("You can select a maximum of 10 variables into your list at a time. To add a new variable simply move one out of the list.");
						   $(".modal").css('overflow-y', 'scroll');
						   $('body.modal-open').css('overflow', 'hidden');
						   return false;
						}
					}
				}else{
					d3.select('#myvar_selectedid_'+key).attr('class','selected');
					selectedMyVariable.push(key);
					selectedMyVariable = _.uniq(selectedMyVariable);
				}
			}else{
				d3.select('#myvar_selectedid_'+key).attr('class','');
				selectedMyVariable = _.without(selectedMyVariable, key);
				selectedMyVariable = _.uniq(selectedMyVariable);
			}
		}
	}
	//}
	}


	if(selectedMyVariable){
		var sNo=1;
		var selectedMyVariableContent="";
		for(var i=0;i<selectedMyVariable.length;i++){
			//for(var j=0;j<myVariablesKey.length;j++){
			for(var key in myVariablesKey){
			if(selectedMyVariable[i] == key){
				selectedMyVariableContent +='<tr>'+
					    '<td width="20px">'+sNo+'</td>'+
					    '<td>'+myVariablesKey[key].toTitleCase()+'</td>'+
					    '<td><a title="" class="item-delete" onclick="removeSelectedMyVariable('+"'"+selectedMyVariable[i]+"'"+')"></a></td>'+
					'</tr>';
				sNo++;
			}
			}
			//}
		}
		document.getElementById('selected-my-variable').innerHTML=selectedMyVariableContent;		
		document.getElementById('selected-my-variable-count').innerHTML="("+selectedMyVariable.length+")";
		document.getElementById('selected-my-variable-count-title').innerHTML=selectedMyVariable.length;
	}
	
}


function removeSelectedMyVariable1(id){
	if(document.getElementById("myvar_"+id)){
		document.getElementById("myvar_"+id).checked = false;
		d3.select('#myvar_selectedid_'+id).attr('class','');
	}
	selectedMyVariable = _.without(selectedMyVariable, id);
	myVariableClick(id);
}


/*Common for all load variables*/
var variableTotalPage=1;
var layersVariable=[];
function loadVariable(){
	contextualVariable=[];
	contextualVariableValue=[];

	var masterVariableContent='';
	var variable1,variable2,variable3;
	var variableCategoryId = document.getElementById('variableCategoryId').value;
	var variableCategoryValue=[];
	var popup_data = '';

	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	var popUpArr= [];

	/*myVariable */
	for(var index in myVarIndex){
		for(var	keys in myVariables[myVarIndex[index]]){
			if(keys != "levelsmapping"){
				for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
				  var myVarName = myVariables[myVarIndex[index]][keys][keyOfNumber].name.toTitleCase();
	
					/*Added popup*/
					if(( $.inArray(myVariables[myVarIndex[index]][keys][keyOfNumber].id, popUpArr) == -1)){

				       	popup_data += '<div class="list-item-'+myVariables[myVarIndex[index]][keys][keyOfNumber].id+' st-detail">'+
					    '<h3 class="st-title">'+myVarName+'</h3>'+
                                       '<p class="st-desc"><span class="title">Template Name : </span> '+ myVarIndex[index]+'</p>'+
					    '<p class="st-desc"><span class="title">Description : </span> '+myVariables[myVarIndex[index]][keys][keyOfNumber].description+'</p>'+
					    '<p class="st-formula"><span class="title">Formula : </span> '+myVariables[myVarIndex[index]][keys][keyOfNumber].formula+'  </p>'+
					    '<p class="st-source"><span class="title">Source : </span> '+myVariables[myVarIndex[index]][keys][keyOfNumber].source+'</p>'+
					    '<p class="st-unit"><span class="title">Units : </span>'+myVariables[myVarIndex[index]][keys][keyOfNumber].unit+'</p>'+
					'</div>';
					popUpArr.push(myVariables[myVarIndex[index]][keys][keyOfNumber].id);	
					}
	
				}
			}	
		}	
	}

	//For all Variable:
	if(variableCategoryId == 'allcategories'){
		for(var i=0;i<variableCategory.length; i++){
			if(variableCategory[i]._source['title']){
				var variable = variableCategory[i]._source['title'];
				var variableId = variableCategory[i]._source['key'];
				var formula=variableCategory[i]._source['formula'];
				var source=variableCategory[i]._source['source'];
				var Description= variableCategory[i]._source['description'];
				var variableUnit = variableCategory[i]._source['units'];
				variablesKey[variableId.toLowerCase()]=variable;	// For access key name using key id

				//contextualVariable.push(variableCategory[i]._source['key']+'~'+variableCategory[i]._source['title']);
				contextualVariable.push(variableCategory[i]);

				if(formula == null){
					formula="";
				}
				if(source == null){
					source="";
				}
				if(Description == null){
					Description="";
				}
				if(variableUnit== null){
					variableUnit="";
				}
			
				popup_data += '<div class="list-item-'+variableId+' st-detail">'+
					    '<h3 class="st-title">'+variable.toTitleCase()+'</h3>'+
					    '<p class="st-desc"><span class="title">Description : </span> '+Description+'</p>'+
					    '<p class="st-formula"><span class="title">Formula : </span> '+formula+'  </p>'+
					    '<p class="st-source"><span class="title">Source : </span> '+source+'</p>'+
					    '<p class="st-unit"><span class="title">Units : </span>'+variableUnit+'</p>'+
					'</div>';
			}else{ // push layers variable in array object.
				layersVariable.push(variableCategory[i]._source);
			}
		}
		document.getElementById('sticky-tool-inner').innerHTML=popup_data;


	} else { 
		for(var i=0;i<variableCategory.length; i++){
			if( variableCategoryId == variableCategory[i]._source['category'] ){
				//contextualVariable.push(variableCategory[i]._source['key']+'~'+variableCategory[i]._source['title']);
				contextualVariable.push(variableCategory[i]);
				var variable = variableCategory[i]._source['title'];
				var variableId = variableCategory[i]._source['key'];
				variablesKey[variableId.toLowerCase()]=variable;	// For access key name using key id
			}
		}
	}

	//contextualVariable.sort(function(a,b) { return d3.ascending(a[1],b[1]); });

	if(contextualVariable){
		for(var i=0,j=0; i<contextualVariable.length; i+=3,j++){
		    
		    if(j%2==0){
			masterVariableContent+='<tr class="odd">';
		    }else{
			masterVariableContent+='<tr class="even">';
		    }
		    if(contextualVariable[i]){
		    if(contextualVariable[i]._source['title']){
			var variable1 = contextualVariable[i]._source['title'];
			var variableId1 = contextualVariable[i]._source['key'];
			contextualVariableNameId[variableId1] = variable1; 
			
			variable1 = variable1.replace(/_/g,' ');
			variable1 = variable1.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			if(( $.inArray(contextualVariable[i]._source['key'], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+variableId1+'_selectedid" class="selected"><label data-tooltip="list-item-'+variableId1+'" data-tooltip2="st-arrow"  class="popup-label" >'
						+'<input type="checkbox" checked class="popup-cb" id="'+variableId1+'_variable"  onclick="variableClick('
						+"'"+variableId1+"'"+');" >'+variable1+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+variableId1+'_selectedid"><label data-tooltip="list-item-'+variableId1+'" data-tooltip2="st-arrow" class="popup-label" >'
						+'<input type="checkbox"  class="popup-cb" id="'+variableId1+'_variable" onclick="variableClick('+"'"+variableId1+"'"+');" >'+variable1+'</input></label></td>';
			}
		     }
		     }
		  	
		     /*  *  */
		     if(contextualVariable[i+1]){
 		     if(contextualVariable[i+1]._source['title']){
			var variable2 = contextualVariable[i+1]._source['title'];
			var variableId2 = contextualVariable[i+1]._source['key'];
			contextualVariableNameId[variableId2] = variable2; 	

			variable2 = variable2.replace(/_/g,' ');
			variable2 = variable2.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

			if(( $.inArray(contextualVariable[i+1]._source['key'], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+variableId2+'_selectedid" class="selected"><label data-tooltip="list-item-'+variableId2+'" data-tooltip2="st-arrow"  class="popup-label" >'
						+'<input type="checkbox" checked  class="popup-cb" id="'+variableId2+'_variable"  data-tooltip="list-item-'+variableId2+'"  onclick="variableClick('
						+"'"+variableId2+"'"+');" >'+variable2+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+variableId2+'_selectedid"><label data-tooltip="list-item-'+variableId2+'" data-tooltip2="st-arrow"  class="popup-label">'
						+'<input type="checkbox"  class="popup-cb" id="'+variableId2+'_variable" onclick="variableClick('+"'"+variableId2+"'"+');" >'+variable2+'</input></label></td>';
			}
		     }
		     }

		     if(contextualVariable[i+2]){
 		     if(contextualVariable[i+2]._source['title']){
			var variable3 = contextualVariable[i+2]._source['title'];
			var variableId3 = contextualVariable[i+2]._source['key'];
			contextualVariableNameId[variableId3] = variable3; 	

			variable3 = variable3.replace(/_/g,' ');
			variable3 = variable3.toTitleCase();//.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});					

			if(( $.inArray(contextualVariable[i+2]._source['key'], selectedVariable) != -1)){
			    masterVariableContent+='<td id="'+variableId3+'_selectedid" class="selected"><label data-tooltip="list-item-'+variableId3+'" data-tooltip2="st-arrow" class="popup-label" >'
						+'<input type="checkbox" checked class="popup-cb" id="'+variableId3+'_variable"  onclick="variableClick('
						+"'"+variableId3+"'"+');" >'+variable3+'</input></label></td>';
			}else{
			    masterVariableContent+='<td id="'+variableId3+'_selectedid"><label data-tooltip="list-item-'+variableId3+'" data-tooltip2="st-arrow" class="popup-label">'
						+'<input type="checkbox"  class="popup-cb" id="'+variableId3+'_variable" onclick="variableClick('+"'"+variableId3+"'"+');" >'+variable3+'</input></label></td>';
			}
		     }
		     }

			masterVariableContent+='</tr>';
		}
		document.getElementById('load-master-variable').innerHTML=masterVariableContent;
	
		/*To reinitializing the popup by calling this function*/
		StickyToolTipFun();	
	
		variableClick('');

	}else{
		document.getElementById('load-master-variable').innerHTML="";
		//document.getElementById('sticky-tool-inner').innerHTML='';
	}
	
	/*$('.popup-label').popover({
			trigger:'hover',
			placement:'top',
			html:true
		      });  

	$('.popup-label').popover({
		selector: 'li',
		trigger: 'hover',
		placement:'top'
	    });*/

	variablePaginationCall();
}	


/*Common pagination*/
function variablePaginationCall(){
	$variable_table_rows = $('#load-master-variable tbody tr');
	var variable_table_row_limit = 6;
	variableTotalPage = Math.ceil($variable_table_rows.length / variable_table_row_limit);
	if(variableTotalPage==0){
		variableTotalPage=1;
	}
	$('#pg2').jqPagination('option', 'max_page', variableTotalPage);
	$('#pg2').jqPagination('option', 'current_page', 1);
}

function variablePaginationGoTo(){
	var current_page = document.getElementById('pg-variable-goto').value;
	$variable_table_rows = $('#load-master-variable tbody tr');
	var variable_table_row_limit = 6;
	var variableTotalPage = Math.ceil($variable_table_rows.length / variable_table_row_limit);
	if(variableTotalPage==0){
		variableTotalPage=1;
	}
	if(variableTotalPage >= current_page){
		$('#pg2').jqPagination('option', 'max_page', variableTotalPage);
		$('#pg2').jqPagination('option', 'current_page', current_page);
	}else {
		$('#pg2').jqPagination('option', 'max_page', variableTotalPage);
		$('#pg2').jqPagination('option', 'current_page', variableTotalPage);
	}
}

var contextualVariable=[];
var selectedVariable=["IND_PCA_01", "IND_PCA_21", "IND_PCA_23"];
var appliedSelectedVariable = selectedVariable;
var appliedSelectedMyVariable = selectedMyVariable;


/*Common for all variable click*/
function variableClick(id){
	for(var i=0;i<contextualVariable.length;i++){
		var variable = contextualVariable[i]._source['title'].toTitleCase();
		var variableId = contextualVariable[i]._source['key'];
		var formula = contextualVariable[i]._source['formula'];
		var source = contextualVariable[i]._source['source'];
		var Description = contextualVariable[i]._source['description'].replace(/_/g," ");
		var variableUnit = contextualVariable[i]._source['units'];
		if(document.getElementById(variableId+"_variable")){
			if(document.getElementById(variableId+"_variable").checked){
				if(selectedVariable.length>=10){
					if ( $('#'+variableId+'_selectedid').hasClass( "selected" ) ) {	
						if(!document.getElementById(variableId+"_variable").checked){
							document.getElementById(variableId+"_variable").checked = false;
							d3.select("#"+variableId+"_selectedid").attr('class','');
							selectedVariable = _.without(selectedVariable, variableId);
						}
					}else{
						if(id){
						   document.getElementById(variableId+"_variable").checked = false;
						   bootbox.alert("You can select a maximum of 10 variables into your list at a time. To add a new variable simply move one out of the list.");
						   $(".modal").css('overflow-y', 'scroll');
						   $('body.modal-open').css('overflow', 'hidden');
						   return false;
						}
					}
				}else{
					d3.select("#"+variableId+"_selectedid").attr('class','selected');
					selectedVariable.push(variableId);
					selectedVariable = _.uniq(selectedVariable);
				}
			}else{
				d3.select("#"+variableId+"_selectedid").attr('class','');
				selectedVariable = _.without(selectedVariable, variableId);
				selectedVariable = _.uniq(selectedVariable);
			}
		}
	}


	if(selectedVariable){
		
		var sNo=1;
		var selectedVariableContent="";
		for(var i=0;i<selectedVariable.length;i++){
			for(var j=0;j<variableCategory.length;j++){
				if(selectedVariable[i] === variableCategory[j]._source['key'] ){
					selectedVariableContent +='<tr>'+
						    '<td width="20px">'+sNo+'</td>'+
						    '<td>'+variableCategory[j]._source['title']+'</td>'+
						    '<td><a title="" class="item-delete" onclick="removeSelectedVariable('+"'"+variableCategory[j]._source['key']+"'"+')"></a></td>'+
						'</tr>';
					sNo++;
				}
			}
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


/*Common for all cancelSelection click*/
function cancelSelection(){
	
	appliedSelectedVariable = _.uniq(appliedSelectedVariable);
	for(var i=0;i<selectedVariable.length;i++){
		if($.inArray(selectedVariable[i], appliedSelectedVariable) == -1){
			d3.select("#"+selectedVariable[i]+"_selectedid").attr('class','');
			if(document.getElementById(selectedVariable[i]+"_variable")){
				document.getElementById(selectedVariable[i]+"_variable").checked = false;
			}
		}
	}

	for(var i=0;i<appliedSelectedVariable.length;i++){
		d3.select("#"+appliedSelectedVariable[i]+"_selectedid").attr('class','selected');
		if(document.getElementById(appliedSelectedVariable[i]+"_variable")){
			document.getElementById(appliedSelectedVariable[i]+"_variable").checked = true;
		}
	}

	selectedVariable = [];
	selectedVariable = appliedSelectedVariable;
	if(selectedVariable){
		var sNo=1;
		var selectedVariableContent="";
		for(var i=0;i<appliedSelectedVariable.length;i++){
			for(var j=0;j<variableCategory.length;j++){
				if(appliedSelectedVariable[i] === variableCategory[j]._source['key'] ){
					selectedVariableContent +='<tr>'+
						    '<td width="20px">'+sNo+'</td>'+
						    '<td>'+variableCategory[j]._source['title'].toTitleCase()+'</td>'+
						    '<td><a title="" class="item-delete" onclick="removeSelectedVariable('+"'"+variableCategory[j]._source['key']+"'"+')"></a></td>'+
						'</tr>';
					sNo++;
				}
			}
		}
		selectedVariable = appliedSelectedVariable;
		document.getElementById('selected-variable').innerHTML=selectedVariableContent;		
		document.getElementById('selected-variable-count').innerHTML="("+appliedSelectedVariable.length+")";
		document.getElementById('selected-variable-count-title').innerHTML=selectedVariable.length;
	}

	/*My variables*/
	for(var i=0;i<selectedMyVariable.length;i++){
		if($.inArray(selectedMyVariable[i], appliedSelectedMyVariable)== -1){
			if(d3.select('#myvar_selectedid_'+selectedMyVariable[i])){
				d3.select('#myvar_selectedid_'+selectedMyVariable[i]).attr('class','');
				if(document.getElementById("myvar_"+selectedMyVariable[i])){
					document.getElementById("myvar_"+selectedMyVariable[i]).checked = false;
				}
			}
		}
	}

	for(var i=0;i<appliedSelectedMyVariable.length;i++){
		d3.select('#myvar_selectedid_'+appliedSelectedMyVariable[i]).attr('class','selected');
		if(document.getElementById("myvar_"+appliedSelectedMyVariable[i])){
			document.getElementById("myvar_"+appliedSelectedMyVariable[i]).checked = true;

		}
	}
	
	selectedMyVariable = [];
	selectedMyVariable = appliedSelectedMyVariable;

	if(selectedMyVariable){
		var sNo=1;
		var selectedMyVariableContent="";
		for(var i=0;i<selectedMyVariable.length;i++){
			for(var key in myVariablesKey){
				if(selectedMyVariable[i] == key){
					selectedMyVariableContent +='<tr>'+
						    '<td width="20px">'+sNo+'</td>'+
						    '<td>'+myVariablesKey[key].toTitleCase()+'</td>'+
						    '<td><a title="" class="item-delete" onclick="removeSelectedMyVariable('+"'"+selectedMyVariable[i]+"'"+')"></a></td>'+
						'</tr>';
					sNo++;
				}
			}
		}
		document.getElementById('selected-my-variable').innerHTML=selectedMyVariableContent;		
		document.getElementById('selected-my-variable-count').innerHTML="("+selectedMyVariable.length+")";
		document.getElementById('selected-my-variable-count-title').innerHTML=selectedMyVariable.length;
	}
}


function applySelectedVariableCommon(){
	//My variable index Name :	
	var myVarIndex = "";
	if(typeof(myVariables) == "object"){
		myVarIndex = Object.keys(myVariables);
	}

	var prms = $.deparam.fragment();
	//selectedVariableBKP to keep the selected variable backup
	var selectedVariableBKP = selectedVariable
        var fieldid = '';
        var level1 = '';
        var level = '';
	if(Object.keys(prms).length > 0){
	    fieldid = prms.field;
	    level1 = prms.level1;
	    level = prms.level;
	}

	if(sub_list['plus_plans'].length === 0){
		    	
	    if((selectedVariable[0] != "IND_PCA_01" ) || (selectedVariable[1] != "IND_PCA_21" ) 
			|| (selectedVariable[2] != "IND_PCA_23"|| (selectedVariable.length > 3) )){
		//if(prms.field){
			selectedVariable = ['IND_PCA_01', 'IND_PCA_21', 'IND_PCA_23'];
			if(document.getElementById('levelId')){	
				var pathname1 = window.location.pathname;
				var prmsDt = $.deparam.fragment();
				var prms ={level0: sub_list.free_plans.country, level1: level1, level:level, field:selectedVariable[0], year:'2011' };
				var r =$.param.fragment(pathname1 ,prms, 2 );
				$.bbq.pushState(r);
				var prms1 = $.deparam.fragment();
				loadVariable();
			}else{
				loadVariable();
			}

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
		//}
	    }
	}

	var contextualVariableContent = '';
	var myVariableContent = '';
	appliedSelectedVariable = [];
	appliedSelectedMyVariable = [];

	for(var i=0;i<selectedVariable.length;i++){
		for(var j=0;j<variableCategory.length;j++){
			if(variableCategory[j]._source['key']){
			if(selectedVariable[i].toLowerCase() == variableCategory[j]._source['key'].toLowerCase()){
				var variable = variableCategory[j]._source['title'].toTitleCase();
				var variableId = variableCategory[j]._source['key'].replace(/_/g," ");
				var formula = variableCategory[j]._source['formula'];
				var source = variableCategory[j]._source['source'];
				var Description = variableCategory[j]._source['description'];
				var variableUnit = variableCategory[j]._source['units'];
				var trimmedString = variable;
				if(variable.length > 25){
					trimmedString = variable.substring(0, 25);
					trimmedString = trimmedString+" ..."
				}

				if(formula == null){
					formula="";
				}
				if(source == null){
					source="";
				}
				if(Description == null){
					Description="";
				}
				if(variableUnit == null){
					variableUnit="";
				}
				
				appliedSelectedVariable.push(selectedVariable[i]);
				appliedSelectedVariable = _.uniq(appliedSelectedVariable);
				
				if(name.length > 1){
					variableUnit='';
					if(units[variable_new]){
						variableUnit = units[variable_new];
					}
					if(fieldid == selectedVariable[i]){
						contextualVariableContent+='<li class="selected"  id="'+selectedVariable[i]+'"><a data-tooltip="list-item-'+selectedVariable[i]+'" data-tooltip2="st-arrow"  onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" >'+trimmedString.toTitleCase()+'</a></li>';
					} else {
						contextualVariableContent+='<li class="" id="'+selectedVariable[i]+'"><a data-tooltip="list-item-'+selectedVariable[i]+'" data-tooltip2="st-arrow"   onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" >'+trimmedString.toTitleCase()+'</a></li>';
					} 
				} else {
					if(fieldid == selectedVariable[i]){
						contextualVariableContent+='<li class="selected" id="'+selectedVariable[i]+'"><a data-tooltip="list-item-'+selectedVariable[i]+'" data-tooltip2="st-arrow"   onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" >'+trimmedString.toTitleCase()+'</a></li>';
					} else {
						contextualVariableContent+='<li class="" id="'+selectedVariable[i]+'"><a  data-tooltip="list-item-'+selectedVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedVariable[i]+"'"+')" >'+trimmedString.toTitleCase()+'</a></li>';
					}
				}
				
			}
			}
		}
	}

	/* myVariable */
	/* for snapshot only */
	if(!document.getElementById('levelId')){
		var prms = $.deparam.fragment();
		if(Object.keys(prms).length > 0){
		    level = prms.levels;
		}
	}

	var selectedMyVar = [];

	for(var i=0;i<selectedMyVariable.length;i++){
		appliedSelectedMyVariable.push(selectedMyVariable[i]);
		appliedSelectedMyVariable = _.uniq(appliedSelectedMyVariable);
		var insideLevel = 0;
		var myVariableName = "";
		for(var index in myVarIndex){
			for(var keys in myVariables[myVarIndex[index]]){
				/*Parameter levelsmapping */
				if(keys != "levelsmapping"){
					var levelVarArr = myVariables[myVarIndex[index]]['levelsmapping']['level'+level];
					for(var keyOfNumber in Object.keys(myVariables[myVarIndex[index]][keys])){
						if(myVariables[myVarIndex[index]][keys][keyOfNumber].id == selectedMyVariable[i] ){
							myVariableName = myVariables[myVarIndex[index]][keys][keyOfNumber].name;
							//if((( $.inArray(selectedMyVariable[i], levelVarArr)) != -1)){
							insideLevel = 1;
							if((( $.inArray(selectedMyVariable[i], selectedMyVar)) == -1)){
								selectedMyVar.push(selectedMyVariable[i]);
								var trimmedString = myVariableName;
								if(myVariableName.length > 25){
									trimmedString = myVariableName.substring(0, 25);
									trimmedString = trimmedString+" ..."
								}

								if(fieldid == selectedMyVariable[i]){
									myVariableContent+='<li class="selected" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedMyVariable[i]+"'"+')" >'+trimmedString.toTitleCase()+'</a></li>';
								} else {
									myVariableContent+='<li class="" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow"  class="popup-label" onclick="fieldChange('+"'"+selectedMyVariable[i]+"'"+')" >'+trimmedString.toTitleCase()+'</a></li>';
								}
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
			myVariableContent+='<li class="" id="'+selectedMyVariable[i]+'"><a  data-tooltip="list-item-'+selectedMyVariable[i]+'" data-tooltip2="st-arrow" style="color:#C0C0C0 ;disable:true;"  class="popup-label" >'+trimmedString.toTitleCase() +'</a></li>';
		}
	}

	if(selectedVariable.length<10){
	    contextualVariableContent+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="contextClick();">Add more variables...</a></li>';
        }
	if(contextualVariableContent.length > 1){	
		document.getElementById('tableId').innerHTML=contextualVariableContent;
	}else{
		document.getElementById('tableId').innerHTML="";
	}

	if(selectedMyVariable.length<10){
	    //myVariableContent+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="myVarClick();">Add more variables...</a></li>';
	    if(sub_list['plus_plans'].length === 0){
		    myVariableContent+='<li class="panel"><a href="" style="pointer-events: none;cursor: default;">No my variables found.</a></li>';
	    } else {
		    myVariableContent+='<li class="panel"><a data-toggle="modal" data-target=".contextual-variable" onclick="myVarClick();">Add more variables...</a></li>';
	    }
       }
	if(myVariableContent.length > 1){	
		document.getElementById('myVariableListId').innerHTML=myVariableContent;
	}else{
		document.getElementById('myVariableListId').innerHTML="No my variables found.";
	}

	StickyToolTipFun();

	var level0_Id = document.getElementById('level_0_Id').value;
	var level1_Id = document.getElementById('level_1_Id').value;
	var levelval = '';

	//Save selected variable backup
	//selectedVariable = selectedVariableBKP;
	if(document.getElementById('time_type')){
		/*For TREND*/
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
	
	} else if(document.getElementById('levelId')){	
		/*For Region_explore*/
		var yearval = document.getElementById('yearId').value;
		levelval = document.getElementById('levelId').value;

		mysphere_url_list="/app/mysphere_mybuilds_for_region_snapshot/"+level1_Id+"?level0="+level0_Id+"&level="+levelval+"&region_key="+fieldid+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";

		d3.json(mysphere_url_list,function(data){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
		});
	
	}else if(document.getElementById('level_2_Id')){

		/*For snapshot*/
		var prms = $.deparam.fragment();
		if(Object.keys(prms).length > 0){
		    var levels = prms.levels;
		    var level0Id = prms.level0;
		    var level1Id = prms.level1;
		    var levelId = prms.levelid;
		
		    mysphere_url_list="/app/mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels="+levels+"&levelid="+levelId+"&selectedvariables="+JSON.stringify(selectedVariable)+"&selectedMyVariable="+JSON.stringify(selectedMyVariable)+"";
		    d3.json(mysphere_url_list,function(data){
			var str = JSON.stringify(data.MyBuild[0])
			var newvar = JSON.parse(str);
		    });
		    if(levels == 3){	
			snapshotRank_level3(level0Id,level1Id,levelId);	
		    }else if(levels == 2){
			snapshotRank(level0Id,level1Id,levelId);	
		    }
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

}


