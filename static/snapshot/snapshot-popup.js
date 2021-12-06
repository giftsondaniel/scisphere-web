
function snapshotRankPopup(level0Id,level1Id,level2Id){
d3.json("scisphere/places/"+level1Id+"/"+level2Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=district&level=2", function (data) {

	mysphere_url_list="mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=2&levelid="+level2Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});


	//Chart
	d3.select("#wrapper").selectAll("#rankChart").remove();

	
	var chartData = '';
	var chartDataEc = '';	
	for(var k=0; k<data.rank.length; k++){
	    if(data.rank[k]._source.key === 'rank_PCA'){
		chartData = data.rank[k]._source.value.PCA_2011;
	    }else if(data.rank[k]._source.key === 'rank_Economic_Census_2005'){
		chartDataEc = data.rank[k]._source.value.Economic_Census_2005;
	    }
	}

	var chartData_snapshot = data.snapshot;
	var chartData_ec = '';
	if(data.ec.value){		
		chartData_ec = data.ec.value.Economic_Census_2005;
	}
	var data_Sort =[];
	var data_Sort_ec =[];

	for(var i=0;i<selectedVariable.length;i++) {
		var name = selectedVariable[i].split('-');
		var variable ='', variable_id_value ='';
		for(var key in chartDataEc){
			if(typeof chartDataEc[key] ==="object"){
				if(name.length == 5){
				    variable = name[1] + '_' +name[3] + '_' + name[4];
				    variable_id_value = chartDataEc[name[1]][name[2]]	
				} else if(name.length == 4){
				    variable = name[1] + '_' +name[3];
				    variable_id_value = chartDataEc[name[1]][name[2]]	
				} else if(name.length == 2){
				    variable = name[1];		
				    variable_id_value = chartDataEc[name[1]]
				} 
			}
		}	
		if(variable_id_value){
			var obj={};
			obj["key"]=variable;
			obj["value"]=variable_id_value;	
			data_Sort.push(obj)

		} else {
			var obj={};
			obj["key"]=variable;
			obj["value"]=0;	
			data_Sort.push(obj)	
		}
	}

	for(var key in chartData){
		var obj={};
		obj["key"]=key;
		obj["value"]=chartData[key];	
		data_Sort.push(obj)	
	}

	data_Sort = data_Sort.sort(function(a,b) {  return b.value - a.value; });

	var dollars=[];
	var snapshotValue=[];
	var categories=[];

	for(var j =0;j<data_Sort.length;j++){
		for(var k=0;k<selectedVariable.length;k++){
			var name = selectedVariable[k].split('-');
			if(name.length == 1){
				if(data_Sort[j].key === selectedVariable[k]){
					var variable = data_Sort[j].key.replace(/_/g,' ');
					variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					dollars.push(data_Sort[j].value);
					categories.push(variable);
					snapshotValue.push(chartData_snapshot[data_Sort[j].key]);
				}
			}else{
				var name = selectedVariable[k].split('-');
				var variable ='', ecVariable='', ecCategory = '';
				if(name.length == 5){
				    variable = name[1] +'_'+name[3] + '_' + name[4];
				    ecVariable = name[2];
				    ecCategory = name[1];	
				} else if(name.length == 4){
				    variable = name[1] +'_'+ name[3];
				    ecVariable = name[2];
				    ecCategory = name[1];	
				} else if(name.length == 2){
				    variable = name[1];		
				    ecCategory = name[1];	
				} 

				if(name.length > 2 && (chartData_ec != "")){
					var ecValue = '';
					if(chartData_ec[ecCategory][ecVariable]){
						ecValue = chartData_ec[ecCategory][ecVariable];
					} else {
						ecValue = 0;	
					}
					if(data_Sort[j].key === variable){
						var variable = data_Sort[j].key.replace(/_/g,' ');
						variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						dollars.push(data_Sort[j].value);
						categories.push(variable);
						snapshotValue.push(ecValue);
					}
				} else {
				    if(chartData_ec.length > 0){
					var ecValue = '';
					if(chartData_ec[ecCategory]){
						ecValue = chartData_ec[ecCategory];
					} else {
						ecValue = 0;	
					}
					if(data_Sort[j].key === variable){
						var variable = data_Sort[j].key.replace(/_/g,' ');
						variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						dollars.push(data_Sort[j].value);
						categories.push(variable);
						snapshotValue.push(ecValue);
					}	
				   }
				}
			}
		}
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

	var canvas = d3.select('#wrapper')
		.append('svg').attr('id','rankChart')
		.attr({'width':500,'height':550});


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
		.tickSize(0.5)
		.tickFormat(function(d,i){ return categories[i]; })
		.tickValues(d3.range(dollars.length));

	var y_xis = canvas.append('g')
		.attr("transform", "translate(177,80)")//7,330
		.attr('id','yaxis')
		.attr("y", function(d){ return yscale(d); } )
		.call(yAxis)
		.selectAll("#yaxis text")
		.call(wrap, 150);

	var x_xis = canvas.append('g')
		.attr("transform", "translate(178,370)")//490
		.attr('id','xaxis')
		.call(xAxis);
	
	var chart = canvas.append('g')
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

	var transit = d3.select("#rankChart")
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

		
	var transitext = d3.select('#rankChart')
		.append('g')
		.selectAll('text')
		.data(dollars)
		.enter()
		.append('text')
		.attr({'x':function(d) {return xscale(d)-(xscale(d) -200 ); },'y':function(d,i){ return yscale(i)+82; }})
		.text(function(d){ return d; }).style({'font-size':'9px', 'alignment-baseline':'middle', 'text-anchor':'middle','fill':'white'});

	var level2Name = data.rank[0]._source.name_2;
	var level1Value = document.getElementById('level_1_Id');
 	var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
	var textValue = level2Name+" - Percentile among in "+level1Name;

	var text = canvas.append("svg:text")
		.attr("class", "nobar").attr("x", 280).attr("y", 30).attr("dy", ".35em").attr("text-anchor", "middle")
		.style({"font": "100 16px inherit","fill":"#8A8A8A"}).text(textValue);

	var snapshot_text = d3.select('#rankChart').append('g')
		.attr('id','snapshot_value')
		.selectAll('text')
		.data(snapshotValue)
		.enter()
		.append('text')
		.attr({'x':function(d) {return xscale(d)-(xscale(d) -230 ); },'y':function(d,i){ return yscale(i)+82; }})
		.text(function(d){ return d; }).style({'font-size':'9px', 'alignment-baseline':'middle', 'text-anchor':'right','fill':'black'});

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

  });

}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
	words = text.text().split(/\s+/).reverse(),
	word,
	line = [],
	lineNumber = 0,
	lineHeight = 1.1, // ems
	y = text.attr("y"),
	dy = parseFloat(text.attr("dy")),
	tspan = text.text(null).append("tspan").attr("x", -4).attr("y", y).attr("dy", dy + "em");
    var lines = '';
    while (word = words.pop()) {
      line.push(word);
      lines += "_"+word;	
      tspan.text(line.join(" "));
      //if (tspan.node().getComputedTextLength() > width) {
      if (lines.length > 35) {
	lines ="";
	line.pop();
	tspan.text(line.join(" "));
	line = [word];
	tspan = text.append("tspan").attr("x", -4).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
     }
    }
  });
}




function snapshotRankLevel3Popup(level0Id,level1Id,level3Id){
   d3.json("scisphere/places/"+level1Id+"/"+level3Id+"/snapshot?level0="+level0Id+"&year=2011&leveltype=taluk&level=3", function (data) {

	var level_3_id = data.snapshot["id_3"];
	var level_2_id = data.snapshot["id_2"];


	d3.select("#wrapper").selectAll("#rankChart").remove();
	mysphere_url_list="mysphere_mybuilds_for_snapshot/"+level1Id+"?level0="+level0Id+"&levels=3&levelid="+level3Id+"&selectedvariables="+JSON.stringify(selectedVariable)+"";
	d3.json(mysphere_url_list,function(data){
		var str = JSON.stringify(data.MyBuild[0])
		var newvar = JSON.parse(str);
	});

	
	var chartData = '';
	var chartDataEc = '';	
	var chartData_snapshot = data.snapshot;
	var chartData_ec = '';
	if(data.ec.value){		
		chartData_ec = data.ec.value.Economic_Census_2005;
	}
	//var chartData_ec = data.ec.value.Economic_Census_2005;

	for(var k=0; k<data.rank.length; k++){
	    if(data.rank[k]._source.key === 'rank_PCA'){
		chartData = data.rank[k]._source.value.PCA_2011;
	    }else if(data.rank[k]._source.key === 'rank_Economic_Census_2005'){
		chartDataEc = data.rank[k]._source.value.Economic_Census_2005;
	    }
	}
	var data_Sort =[];
	
	for(var i=0;i<selectedVariable.length;i++) {
		var name = selectedVariable[i].split('-');
		var variable ='', variable_id_value ='';
		for(var key in chartDataEc){
			if(typeof chartDataEc[key] ==="object"){
				if(name.length == 5){
				    variable = name[1] + '_' +name[3] + '_' + name[4];
				    variable_id_value = chartDataEc[name[1]][name[2]]	
				} else if(name.length == 4){
				    variable = name[1] + '_' +name[3];
				    variable_id_value = chartDataEc[name[1]][name[2]]	
				} else if(name.length == 2){
				    variable = name[1];		
				    variable_id_value = chartDataEc[name[1]]
				} 
			}
		}	
		if(variable_id_value){
			var obj={};
			obj["key"]=variable;
			obj["value"]=variable_id_value;	
			data_Sort.push(obj)	

		} else {
			var obj={};
			obj["key"]=variable;
			obj["value"]=0;	
			data_Sort.push(obj)	
		}
	}

	for(var key in chartData){
		var obj={};
		obj["key"]=key;
		obj["value"]=chartData[key];	
		data_Sort.push(obj)	
	}



	data_Sort = data_Sort.sort(function(a,b) {  return b.value - a.value; });
	var dollars=[];
	var categories=[];
	var snapshotValue=[];

	for(var j =0;j<data_Sort.length;j++){
		for(var k=0;k<selectedVariable.length;k++){
			var name = selectedVariable[k].split('-');
			if(name.length == 1){
				if(data_Sort[j].key === selectedVariable[k]){
					var variable = data_Sort[j].key.replace(/_/g,' ');
					variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
					dollars.push(data_Sort[j].value);
					categories.push(variable);
					snapshotValue.push(chartData_snapshot[data_Sort[j].key]);
				}
			}else{
				var name = selectedVariable[k].split('-');
				var variable ='', ecVariable='', ecCategory = '';
				if(name.length == 5){
				    variable = name[1] +'_'+name[3] + '_' + name[4];
				    ecVariable = name[2];
				    ecCategory = name[1];	
				} else if(name.length == 4){
				    variable = name[1] +'_'+ name[3];
				    ecVariable = name[2];
				    ecCategory = name[1];	
				} else if(name.length == 2){
				    variable = name[1];		
				    ecCategory = name[1];	
				} 

				if(name.length > 2  && (chartData_ec != "")){
					var ecValue = '';
					if(chartData_ec[ecCategory][ecVariable]){
						ecValue = chartData_ec[ecCategory][ecVariable];
					} else {
						ecValue = 0;	
					}
					if(data_Sort[j].key === variable){
						var variable = data_Sort[j].key.replace(/_/g,' ');
						variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						dollars.push(data_Sort[j].value);
						categories.push(variable);
						snapshotValue.push(ecValue);
					}
				} else {
					var ecValue = '';
					if(chartData_ec[ecCategory]){
						ecValue = chartData_ec[ecCategory];
					} else {
						ecValue = 0;	
					}
					if(data_Sort[j].key === variable){
						var variable = data_Sort[j].key.replace(/_/g,' ');
						variable = variable.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
						dollars.push(data_Sort[j].value);
						categories.push(variable);
						snapshotValue.push(ecValue);
					}	
				}
			}
		}
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

	var canvas = d3.select('#wrapper')
		.append('svg').attr('id','rankChart')
		.attr({'width':500,'height':550});

	var grids = canvas.append('g')
		  .attr('id','grid')
		  .attr('transform','translate(178,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
		  .attr({
				 'y2':function(d){ return 315; }//d.y2; } /*Dani*/
			})
		  .style({'stroke':'#000','stroke-width':'1px'});

	var xAxis = d3.svg.axis();
		xAxis
		.orient('bottom')
		.scale(xscale)
		.tickSize(10)
		//.tickValues(["0","50","100"]);//tickVals
		.tickValues(["0","25","50","75","100"]);//tickVals

	var yAxis = d3.svg.axis();
		yAxis
		.orient('left')
		.scale(yscale)
		.tickSize(0.5)
		.tickFormat(function(d,i){ return categories[i]; })
		.tickValues(d3.range(dollars.length));

	var y_xis = canvas.append('g')
		.attr("transform", "translate(177,80)")//7,330
		.attr('id','yaxis')
		.attr("y", function(d){ return yscale(d); } )
		.call(yAxis);

	var x_xis = canvas.append('g')
		.attr("transform", "translate(178,370)")//490
		.attr('id','xaxis')
		.call(xAxis)
		.selectAll("#yaxis text")
		.call(wrap, 175);


	
	var chart = canvas.append('g')
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


	var transit = d3.select("#rankChart")
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

		
	var transitext = d3.select('#rankChart')
		.append('g')
		.selectAll('text')
		.data(dollars)
		.enter()
		.append('text')
		.attr({'x':function(d) {return xscale(d)-(xscale(d) -200 ); },'y':function(d,i){ return yscale(i)+82; }})
		.text(function(d){ return d; }).style({'font-size':'9px', 'alignment-baseline':'middle', 'text-anchor':'middle','fill':'white'});

	var level2Name = data.rank[0]._source.name_2;
	var level3Name = data.rank[0]._source.name_3;

	var level1Value = document.getElementById('level_1_Id');
 	var level1Name = level1Value.options[level1Value.selectedIndex].innerHTML;
	var textValue = level3Name+" - Percentile among in "+level2Name;

	var text = canvas.append("svg:text")
			.attr("class", "nobar").attr("x", 280).attr("y", 30).attr("dy", ".35em").attr("text-anchor", "middle")
			.style({"font": "Roboto, sans-serif",'font-size':'16px',"fill":"#8A8A8A"}).text(textValue);


	var snapshot_text = d3.select('#rankChart').append('g')
		.attr('id','snapshot_value')
		.selectAll('text')
		.data(snapshotValue)
		.enter()
		.append('text')
		.attr({'x':function(d) {return xscale(d)-(xscale(d) -230 ); },'y':function(d,i){ return yscale(i)+82; }})
		.text(function(d){ return d; }).style({'font-size':'9px', 'alignment-baseline':'middle', 'text-anchor':'right','fill':'black'});

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
		  .attr('id','grid4')
		  .attr('transform','translate(478,60)')
		  .selectAll('line')
		  .data(grid)
		  .enter()
		  .append('line')
 		  .attr({
				 'y2':function(d){ return 318; }
			})
		  .style({'stroke':'#000','stroke-width':'0.3px'}).style("stroke-dasharray", ("3, 3"));


     });

}


