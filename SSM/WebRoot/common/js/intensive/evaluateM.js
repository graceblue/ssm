/* 评分页面数据加载 */
function loadTable() {
	$("#auditTemp").datagrid({
		url : curProjectUrl + "/evaluate/queryManaData.do",
		queryParams : {
			year : $("#year").combobox("getValue")
		},
		//width : 'auto',
		nowrap : false,
		iconCls : 'icon-save',
		striped : true,
		pagination : true,
		rownumbers : true,
		idField : 'prjId',
		fitColumns : true,
		fit : true,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 5, 10, 20, 50 ],
		loadMsg : '数据加载中.....',
		toolbar : '#tool_search',
		singleSelect : true,
		// onDblClickRow:onDblClickRow,
		onLoadSuccess : function(data) {
			//$.parser.parse($("#auditTemp").parent());
		}
	});
}

/** 加载年份以当年为基前后加五年 */
function initYear() {
	var year = new Date().getFullYear();
	var yearData = [];
	var yearJson;
	for ( var i = (year + 2); i > (year - 6); i--) {
		yearJson = {
			key : i,
			value : i
		};
		yearData.push(yearJson);
	}
	setSelectComboEx({
		id : "year",
		data : yearData,
		selectedKey : year,
		joinable : false,
		onSelect:loadTable
	})
}


/**
 * 评分
 * 
 * @param obj 当前对象
 * @param mid 项目id
 * @param tid 类别id
 * @param flag 标识
 */
function evaluateStage(obj,mid,tid,flag) {
	var flagData = {ev:"evaluate",up:"editEv",re:"editEv"};//ev评分 up修改 re 重新评价
	openWin({
		id:"e-win",
		title:"管理类项目质量评价",
		url:curProjectUrl + "/evaluate/manager.do?mark="+flagData[flag]+"&tid="+tid+"&flag="+flag+"&mid="+mid,
		width:"760",
		height:"420",
		position:true
	});
}
/**
 * 加载数据
 */
function buildData(data){
	var content = $("#content");
	//debugger;
	if(!data || data.length==0){
		content.html("");
		return;
	}
	//获取选中行数据
	var row = $("#auditTemp").datagrid("getSelected");
	//alert(JSON.stringify(row));
	var zrrs = row.prjUseridName;
	var zrrIds = row.prjUserid;
	var zrrArr = zrrs.split(",");
	var zrrIdsArr = zrrIds.split(",");
	var oneTable = "";
	var rowspan = data.length;
	for(var i in zrrArr){
		oneTable = "<table id='"+zrrIdsArr[i]+"' border='0' cellspacing='0' cellpadding='0'style='width:728px;'>"
					+"<thead>"
						+"<tr>"
							+"<th width='15%'  >工作名称</th>"
							+"<th width='50%' align='left' >"+row.prjName+"</th>"
							+"<th width='15%' >姓名</th>"
							+"<th width='20%' align='left' >"+zrrArr[i]+"</th>"
						+"</tr>"
						+"</thead>";
		for(var y = 0;y<rowspan;y++){//加载指标存在多个类别指标
			var indicator = data[y];
			oneTable +="<tr height='15px' flag='data' indicator='"+JSON.stringify(indicator)+"'>"
							+ (y==0?"<td rowspan='"+rowspan+"'>"+indicator.evaluationIndicator+"</td>":"")
							+"<td>"+indicator.indicatorDesc+"</td>"
							+"<td>"+indicator.indicatorsAndWeights+"</td>"
							+"<td><input class='easyui-numberbox' style='width:100px; text-align:right;padding-right:5px;' data-options='min:0,max:100'></td>"
						+"</tr>";
		}			
		oneTable += "</table>";
		if(i==0){
			content.html("");
		}
		content.append(oneTable);
	}
	$.parser.parse($("#content"));//重新渲染样式
}

/**
 * 加载数据
 */
function buildDataRe(data){
	var content = $("#content");
	//debugger;
	if(!data){
		content.html("");
		return;
	}
	//获取选中行数据
	var row = $("#auditTemp").datagrid("getSelected");
	//alert(JSON.stringify(row));
	//重评还是根据人进行遍历    
	var zrrs = row.prjUseridName;
	var zrrIds = row.prjUserid;
	var zrrArr = zrrs.split(",");
	var zrrIdsArr = zrrIds.split(",");
	var oneTable = "";
	for(var i in zrrArr){
		var uid = zrrIdsArr[i];
		oneTable = "<table id='"+uid+"' gradeId='"+data[uid+"G"]+"' border='0' cellspacing='0' cellpadding='0'style='width:728px;'>"
		+"<thead>"
		+"<tr>"
		+"<th width='15%'  >工作名称</th>"
		+"<th width='50%' align='left' >"+row.prjName+"</th>"
		+"<th width='15%' >姓名</th>"
		+"<th width='20%' align='left' >"+zrrArr[i]+"</th>"
		+"</tr>"
		+"</thead>";
		var tempData = data[uid];
		var rowspan = tempData.length;
		for(var y = 0;y<rowspan;y++){//加载指标存在多个类别指标
			var indicator = tempData[y];
			oneTable +="<tr height='15px' flag='data' indicator='"+JSON.stringify(indicator)+"'>"
			+ (y==0?"<td rowspan='"+rowspan+"'>"+indicator.evaluationIndicator+"</td>":"")
			+"<td>"+indicator.indicatorDesc+"</td>"
			+"<td>"+indicator.indicatorsAndWeights+"</td>"
			+"<td><input class='easyui-numberbox' value='"+indicator.scorePm+"' style='width:100px; text-align:right;padding-right:5px;' data-options='min:0,max:100'></td>"
			+"</tr>";
		}			
		oneTable += "</table>";
		if(i==0){
			content.html("");
		}
		content.append(oneTable);
	}
	$.parser.parse($("#content"));//重新渲染样式
}
/**
 * 加载数据-修改页面
 */
function buildDataEd(data){
	var content = $("#content");
	//debugger;
	if(!data || data.length==0){
		content.html("");
		return;
	}
	var row = $("#auditTemp").datagrid("getSelected");
	var oneTable = "";
	for(var i in data){
		oneTable = "<table id='"+data[i]["prjUserid"]+"' gradeId='"+data[i]["gradeId"]+"' border='0' cellspacing='0' cellpadding='0'style='width:728px;'>"
		+"<thead>"
		+"<tr>"
		+"<th width='15%'  >工作名称</th>"
		+"<th width='50%' align='left' >"+row.prjName+"</th>"
		+"<th width='15%' >姓名</th>"
		+"<th width='20%' align='left' >"+data[i]["prjUseridName"]+"</th>"
		+"</tr>"
		+"</thead>";
		var one = data[i].evaluationMpGradeModels;
		var rowspan = one.length;
		for(var y = 0;y<rowspan;y++){//加载指标存在多个类别指标
			var indicator = one[y];
			oneTable +="<tr height='15px' flag='data' indicator='"+JSON.stringify(indicator)+"'>"
			+ (y==0?"<td rowspan='"+rowspan+"'>"+indicator.evaluationIndicator+"</td>":"")
			+"<td>"+indicator.indicatorDesc+"</td>"
			+"<td>"+indicator.indicatorsAndWeights+"</td>"
			+"<td><input class='easyui-numberbox' value='"+indicator.scorePm+"' style='width:100px; text-align:right;padding-right:5px;' data-options='min:0,max:100'></td>"
			+"</tr>";
		}			
		oneTable += "</table>";
		if(i==0){
			content.html("");
		}
		content.append(oneTable);
	}
	$.parser.parse($("#content"));//重新渲染样式
}



/***
 * 改变单项得分项
 * @param v1
 * @param v2
 */
function changeIt(v1,v2){
	var weight = $(scorceObj).attr("weight");
	var total = v1*weight;
	total = total.toFixed(3);
	$(scorceObj).parent().next().html(total);
	totalScores();
}

/**
 * 计算总得分
 */
function totalScores(){
	var total=0.00;
	$("[sorce='total']").each(function(){
		total += $(this).html()*1;
	});
	$("#total").html(total.toFixed(2));
}
/**
 * 保存评价与评分表
 */
function saveGrade(){
	var url = curProjectUrl +  "/evaluate/saveEvaluateManager.do";
	var ret = Tool_Ajax(url,{grade:JSON.stringify(getGradeData())});
	if(ret!="n"){
		$("#close").click();//关闭
		updateGrid();
	}
}

/**
 * 更新评价与评分表
 */
function updateGrade(){
	//加入标识 
	var url = curProjectUrl +  "/evaluate/updateEvaluateManager.do";
	var ret = Tool_Ajax(url,{grade:JSON.stringify(getGradeData()),flag:$("#flag").val(),mid:$("#mid").val()});
	if(ret!="n"){
		$("#close").click();//关闭
	}
}
/**
 * 更新grid数据
 */
function updateGrid(flag){
	//修改操作按钮
	var row = $("#auditTemp").datagrid("getSelected");
	var index = $("#auditTemp").datagrid("getRowIndex",row);
	var oprater = "<a href='javascript:' class='easyui-linkbutton' onclick='evaluateStage(this,\""+ row.prjId + "\",\""+row.prjTypeId+"\",\"up\")' >修改</a>"
	+"&nbsp;&nbsp;<a href='javascript:' class='easyui-linkbutton' onclick='evaluateStage(this,\""+ row.prjId + "\",\""+row.prjTypeId+"\",\"re\")' >重评</a>";
	row.oprater = oprater;
	$("#auditTemp").datagrid("updateRow",{index:index,row:row});
}

/**
 * 获取评分信息
 * @returns
 */
function getGradeData(){
	//评价主表
	var row = $("#auditTemp").datagrid("getSelected");
	//遍历所有table 
	var mpGradeArr = [];
	$("#content table").each(function(){
		var oneTotal = 0;
		//该评价表下的所有评分记录
		var evaluationMpGradeModels = [];
		var gradeId = $(this).attr("gradeId");
		$(this).find("[flag='data']").each(function(){
			//单个评分
			var indicator = $.parseJSON($(this).attr("indicator"));
			//总分的计算
			var scorce = $(this).find("input").val();
			scorce = isStringNull(scorce)?scorce:0;
			indicator.scorePm = scorce;
			oneTotal += scorce*1;
			if($("#flag").val()=="re"){
				//重评时加入评价主键
				indicator.gradeId = gradeId;
			}
			evaluationMpGradeModels.push(indicator);
		});
		//单个评价记录
		var mpGrade = {
				gradeId:gradeId,
				prjId:$("#mid").val(),//工作编号
			prjUserid:this.id,
			prjUseridName:$(this).find("th")[3].innerHTML,
			modifyUsername:$("#curUser").val(),
			status:"1",//状态为可用
			grade:oneTotal,
			evaluationMpGradeModels:JSON.stringify(evaluationMpGradeModels)
		}
		mpGradeArr.push(mpGrade);
		
	});
	return mpGradeArr;
}
/**
 * 获取评价详情
 * @returns {Array}
 */
function getEIGrade(){
	//对应得分
	var EIGrades = [];
	//获取所有tr 行
	$("[sorce='total']").each(function(){
		var obj = $(this);
		var EIGrade = $.parseJSON(obj.attr("info"));
		EIGrade.scorePm = obj.prev().find("input").val();//评分
		EIGrade.gradeId = $("#total").attr("gradeId");
		EIGrades.push(EIGrade);
	});
	return EIGrades;
}
