/* 评分页面数据加载 */
function loadTable() {
	$("#auditTemp").datagrid({
		url : curProjectUrl + "/evaluate/queryData.do",
		queryParams : {
			year : $("#year").combobox("getValue"),
			quarters : $("#quarter").combobox("getValues").toString(),
			auditDept : $("#auditDept").attr("orgId")
		},
		width : 'auto',
		nowrap : false,
		iconCls : 'icon-save',
		striped : true,
		pagination : true,
		rownumbers : true,
		idField : 'STAGE_ID',
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
		joinable : false
	})
}
/** 初始化季度 */
function initQuarter() {
	var data = [];
	var quarters = [ "一", "二", "三", "四" ];
	for ( var i = 1; i <= 4; i++) {
		data.push({
			key : i,
			value : "第" + quarters[i - 1] + "季度"
		});
	}
	setSelectComboEx({
		id : "quarter",
		data : data,
		multiple : true,
		onSelect : function(data) {
				$("#quarter").combobox("unselect", "");
		}
	});
}

/**
 * ' 审计单位
 * 
 * @param obj
 */
function selectAuditDept(obj) {
	comSelectOrg(obj.id,{
		singleSelect:false
	});
};
/**
 * 清空审计单位
 * @param obj
 */
function deleteAuditDept(obj){
	$(obj).prev().val("");
	$(obj).prev().removeAttr("orgId");
}

/**
 * 评分
 * 
 * @param obj 当前对象
 * @param sid 阶段id
 * @param flag 标识
 */
function evaluateStage(obj,sid,flag) {
	var flagData = {ev:"evaluate",up:"editEv",re:"editEv"};//ev评分 up修改 re 重新评价
	openWin({
		id:"e-win",
		title:"项目质量评价",
		url:curProjectUrl + "/evaluate/index.do?mark="+flagData[flag]+"&sid="+sid+"&flag="+flag,
		width:"760",
		height:"420",
		position:true
	});
}

/**格式化分数*/
function formatProgress(value){
	if (value){
    	var s = '<div style="width:100%;height:20px;border:1px solid #ccc">' +
    			'<div style="width:' + value + '%;height:20px;background:#009FCC;">' + value + '%' + '</div>'
    			'</div>';
    	return s;
	} else {
    	return '';
	}
}
var scorceObj;
function setObj(obj){
	scorceObj = obj;
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
	//评价分数的验证 至少评一项
	var gradeScorce = $("#total").html();
	if(gradeScorce*1==0){
		myAlert("请对质量评价进行评分！");
		return;
	}
	
	var url = curProjectUrl +  "/evaluate/saveEvaluate.do";
	var ret = Tool_Ajax(url,{grade:JSON.stringify(getGradeData()),eigrade:JSON.stringify(getEIGrade())});
	if(ret!="0"){
		$("#close").click();//关闭
		updateGrid('ev');
	}
}
/**
 * 更新评价与评分表
 */
function updateGrade(){
	//评价分数的验证 至少评一项
	var gradeScorce = $("#total").html();
	if(gradeScorce*1==0){
		myAlert("请对质量评价进行评分！");
		return;
	}
	//加入标识 
	var url = curProjectUrl +  "/evaluate/updateEvaluate.do?flag="+$("#flag").val();
	var grade = getGradeData();
	grade.eigrade = JSON.stringify(getEIGrade());
	var ret = Tool_Ajax(url,grade);
	if(ret!="0"){
		$("#close").click();//关闭
		updateGrid('up');
	}
}
/**
 * 更新grid数据
 */
function updateGrid(flag){
	//设定评价得分
	var row = $("#auditTemp").datagrid("getSelected");
	row.TOTAL_SORCE = $("#total").html();
	var index = $("#auditTemp").datagrid("getRowIndex",row);
	if(flag=="ev"){
		var oprater = "<a href='javascript:' class='easyui-linkbutton' onclick='evaluateStage(this,\""+ row.STAGE_ID + "\",\"up\")' >修改</a>"
		+"&nbsp;&nbsp;<a href='javascript:' class='easyui-linkbutton' onclick='evaluateStage(this,\""+ row.STAGE_ID + "\",\"re\")' >重评</a>";
		row.OPRATER = oprater;
	}//操作
	$("#auditTemp").datagrid("updateRow",{index:index,row:row});
}

/**
 * 获取评分信息
 * @returns
 */
function getGradeData(){
	//评价主表
	var grade ={
			stageId:$("#sid").val(),
			grade:$("#total").html(),
			gradeId:$("#total").attr("gradeId")
	}
	return grade;
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
