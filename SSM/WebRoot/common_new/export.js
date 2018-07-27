function expt(grid) {
	var tableString = '<table cellspacing="0" class="pb">';
	var frozenColumns = grid.datagrid("options").frozenColumns; // 得到frozenColumns对象  
	var columns = grid.datagrid("options").columns; // 得到columns对象   
	var nameList = new Array();
	// 载入title  
	if (typeof columns != 'undefined' && columns != '') {
		$(columns).each(
						function(index) {
							tableString += '\n<tr>';
							if (typeof frozenColumns != 'undefined'
									&& typeof frozenColumns[index] != 'undefined') {
								for ( var i = 0; i < frozenColumns[index].length; ++i) {
								 
									if (!frozenColumns[index][i].hidden) {
										tableString += '\n<th width="'
												+ frozenColumns[index][i].width
												+ '"';
										if (typeof frozenColumns[index][i].rowspan != 'undefined'
												&& frozenColumns[index][i].rowspan > 1) {
										
											tableString += ' rowspan="'
													+ frozenColumns[index][i].rowspan
													+ '"';
										}else{
											tableString += ' rowspan=2';
										}
										if (typeof frozenColumns[index][i].colspan != 'undefined'
												&& frozenColumns[index][i].colspan > 1) {
											tableString += ' colspan="'
													+ frozenColumns[index][i].colspan
													+ '"';
										}
										if (typeof frozenColumns[index][i].field != 'undefined'
												&& frozenColumns[index][i].field != '') {
											nameList
													.push(frozenColumns[index][i]);
										}
										tableString += '>'
												+ frozenColumns[0][i].title
												+ '</th>';
									}
								}
								 
							}
					 
							for ( var i = 0; i < columns[index].length; ++i) {
								if (!columns[index][i].hidden) {
									tableString += '\n<th width="'
											+ columns[index][i].width + '"';
									if (typeof columns[index][i].rowspan != 'undefined'
											&& columns[index][i].rowspan > 1) {
									
										tableString += ' rowspan="'
												+ columns[index][i].rowspan
												+ '"';
									}
									if (typeof columns[index][i].colspan != 'undefined'
											&& columns[index][i].colspan > 1) {
										tableString += ' colspan="'
												+ columns[index][i].colspan
												+ '"';
									}
									if (typeof columns[index][i].field != 'undefined'
											&& columns[index][i].field != '') {
										nameList.push(columns[index][i]);
									}
									tableString += '>'
											+ columns[index][i].title + '</th>';
								}
							}
					 
							tableString += '\n</tr>';
						});
	
	}
	
 
	// 载入内容  
	var rows = grid.datagrid("getRows"); // 这段代码是获取当前页的所有行  
	var j0;
	var j1;
	var j2;
	for ( var i = 0; i < rows.length; ++i) {
		tableString += '\n<tr>';
		for ( var j = 0; j < nameList.length; ++j) {
			
	if(j==0){
		if(i==0){
			getLength(rows,nameList,i,0);
			createTD(nameList,0,rows,0,l);
			tableString += str_td;	
		}else{
		  if(!(rows[i][nameList[0].field])==(rows[i-1][nameList[0].field])){
				getLength(rows,nameList,i,0);
			createTD(nameList,0,rows,i,l);
			tableString += str_td;	
		  }
		}
		
		
	}else if(j==1){  
		
		if(i==0){
			getLength(rows,nameList,i,1); 
			createTD(nameList,1,rows,0,l);
			tableString += str_td;	      
		}else{
		
		  if(!(rows[i][nameList[1].field]==rows[i-1][nameList[1].field])){
				getLength(rows,nameList,i,1);
			createTD(nameList,1,rows,i,l);
			tableString += str_td;	
		  }
		}   
	}else if(j==2){  
		
		if(i==0){
			getLength(rows,nameList,i,2); 
			createTD(nameList,2,rows,0,l);
			tableString += str_td;	      
		}else{	
		  if(!(rows[i][nameList[2].field]==rows[i-1][nameList[2].field])){
				getLength(rows,nameList,i,2);
			createTD(nameList,2,rows,i,l);
			tableString += str_td;	
		  }
		}   
	}
	else{
		createTD(nameList,j,rows,i,0);
		tableString += str_td;	
	}
			
		
		
		 
		}
		
		tableString += '\n</tr>';
	}
	tableString += '\n</table>';
	alert(tableString)
	$('#hlf').val(tableString);
	exportString = tableString;
	var url = "/IndicatySys/common_new/export.jsp";
	var param2 = {
		doSize : false,
		shadow : false,
		content : '<iframe  scrolling="no" frameborder="0"  src="' + url
				+ '" style="width:100%;height:95%;"></iframe>',
		title : 'Export',
		width : 300,
		height : 170,
		modal : true
	};
	mpgdialog(param2);
}
var l;
function getLength(rows,nameList,hang,lie){
	 l=1;
	for ( var i = hang; i < rows.length-1; i++) {
				 if( rows[i][nameList[lie].field]==rows[i+1][nameList[lie].field]){
					l++;				
				 }	else{
					 break;
				 }	
		 
		 
	}	
}
var str_td;
function createTD(nameList,j,rows,i,c){
	str_td="";
	
	var e = nameList[j].field.lastIndexOf('_0');
	str_td += '\n<td';
	
	str_td += ' rowspan="'
			+ c
			+ '"';
	
	if (nameList[j].align != 'undefined' && nameList[j].align != '') {
		str_td += ' style="text-align:' + nameList[j].align + ';"';
	}
	str_td += '>';
	if (e + 2 == nameList[j].field.length) {
		str_td += rows[i][nameList[j].field.substring(0, e)];
	
	} else{
		str_td += rows[i][nameList[j].field];
		
	}
	str_td += '</td>';
 
}

function mpgdialog(param) {
	$('#dialog2').dialog(param);
	$('#dialog2').window('center');
}
