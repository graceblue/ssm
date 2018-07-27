/***
 * 立项js
 */
/** 项目类型 */
function queryAuditType() {
	var url = curProjectUrl + "/plan/queryAuditType.do";
	var defer = Tool_Ajax_Async(url, null, "json");
	defer.done(function(data) {
		var auditTypelist = [];
		var ph = {
			"id" : "",
			"state" : "open",
			"text" : "请选择",
			selected : true
		};
		auditTypelist.push(ph);
		var temp = data.typelist;
		if (isNull(temp) && temp.length != 0) {// 头部加入请选
			for ( var i in temp) {
				auditTypelist.push(temp[i]);
			}
		}
		$("#projectType").combotree({
			data : auditTypelist,
			onClick : function(node) {
				var tree = $(this).tree;
				var isLeaf = tree("isLeaf", node.target);
				if (!isLeaf) {
					$("#projectType").combotree("setValue", "");
				}
			}
		});
		$("#projectType").combotree("setValue", "");
	});
};

/** 更多选项展开 */
function extend() {
	$("#moreselect").toggle();
};

/** 被审计单位 */
function selectBZUnit(obj) {
	$("body").append("<div id='selectBzdw'></div>");
	$("#selectBzdw").window({
		title : "被审计单位",
		href : '<%=request.getContextPath()%>/business/selectBZUnit.do',
		width : 620,
		height : 428,
		zIndex : 2,
		region : "center",
		collapsible : false,
		cache : false,
		minimizable : false,
		maximizable : false,
		draggable : false,
		resizable : false,
		modal : true,
		onLoad : function() {
			$(".window-mask").height($("#selectBzdw").parent().height() + 25);
		}
	});
};

/** 项目类型* */
function initProjectLevel() {
	var levels = [ {
		id : "",
		text : "请选择",
		selected : true
	}, {
		id : "1",
		text : "普通项目"
	}, {
		id : "2",
		text : "汇总项目"
	} ];
	$("#projectLevel").combobox({
		"data" : levels,
		valueField : 'id',
		textField : 'text',
		editable : false,
		panelHeight : 'auto'
	});
};

/**查看模版信息*/
function seeTemplate(templetId){
	window.location.href = curProjectUrl + "/template/goto.do?mark=appedit&templetId="+templetId;
};
/**新增模版信息*/
function newTemplate(){
	window.location.href = curProjectUrl + "/template/goto.do?mark=appadd";
};

/**删除模版信息*/
function delTemplate(obj,id){
	$.messager.confirm("提示","确认删除？",function(r){
		if(r){
			var url = curProjectUrl + "/business/delProTemplate.do";
			var result = Tool_Ajax(url,{id:id});
			if(result=="y"){
				$.messager.alert("提示","删除成功！","info");
				$(obj).parent().parent().remove();
			}else{
				$.messager.alert("提示","删除失败！","info");
			}
		}
	});
}

