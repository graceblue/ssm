// //////////////////////
var isSaving=0;
var treeId = "#proType";//含#号
var hasData = false;//是否有指标
var maxId;
var busintypeid = "M_INTENSIVE_MP_STATUS";
function loadDimensionsTree() {
	var data = [{id:"0",text:"管理类工作分类",state:"open"}];
	var ret= Tool_Ajax(curProjectUrl + "/index/queryType.do",{busintypeid:busintypeid},"json");
	if(ret){
		data[0].children=ret.types;
		maxId = ret.maxId;
	}
	$(treeId).tree(
			{
				/*url : curProjectUrl + '/business/loadAuditOrg.do?orgCode='
						+ orgCode,*/
				onClick : function(node) {
					loadIndexData(node.id);//加载指标权重
					
				},
				/*onBeforeExpand : function(node, param) {
					$('#dimensions').tree('options').url = curProjectUrl
							+ "/business/loadChildAuditOrg.do?orgCode="
							+ node.id;
				},*/
				onAfterEdit:onAfterEdit,
				data:data,
				onContextMenu: function(e,node){
					e.preventDefault();
					$(this).tree('select',node.target);
					var id = node.id=="0"?"add":"remove";
					$('#'+id).menu('show',{
						left: e.pageX,
						top: e.pageY
					});
				}
			});
}

/**增加维度**/
function append(){
	var t = $(treeId);
	var node = t.tree('getSelected');
	$.messager.prompt("类别名称","请输入类别名称：",function(r){
		if(r){
			if(r.length>20){
				myAlert("新增失败！类别名称过长！");
				return;
			}
			
			var type = Tool_Ajax(curProjectUrl + "/index/saveType.do",{busInName:r,busInId:maxId*1+1,businessTypeId:busintypeid},"json");
			if(type){
				t.tree('append', {
					parent: (node?node.target:null),
					data: [{
						id:type.busInId,
						text: r
					}]
				});
			}else{
				myAlert("新增失败！");
			}
		}
	});
}
/**删除**/
function remove(){
	if(hasData){
		myAlert("请先删除相应指标！");
		return;
	}
	$.messager.confirm("提示","确认删除？",function(r){
		if(r){
			var node = $(treeId).tree('getSelected');
			if(node.id=="0"){
				myAlert("此节点无法删除");
			}else{
				var url = curProjectUrl + "/index/deleteType.do";
				var r = Tool_Ajax(url,{id:node.id,busintypeid:busintypeid});
				if(r=="y"){
					$(treeId).tree('remove', node.target);
				}
				else
					myAlert("删除工作类别失败！");
			}
		}
	});
}
/**
 * 更新
 */
var oldTreeText;//更新之前的值
function update(){
	var node = $(treeId).tree('getSelected');
	if (node){
		oldTreeText = node.text;
		$(treeId).tree('beginEdit',node.target);
	}
}
/**更新*/
function onAfterEdit(node){
	var newTreeText = node.text.Trim();
	if(isStringNull(newTreeText)){
		if(newTreeText ==  oldTreeText){return;}
		if(newTreeText.length>20){
			myAlert("更新失败！您输入的类别名称过长,请重新输入！");
			node.text = oldTreeText;//为空保存不变
			$(treeId).tree('update',node);
			return;
		}
		var url = curProjectUrl + "/index/updateType.do";
		var type ={
				busInId:node.id,
				busInName:newTreeText,
				businessTypeId:busintypeid
		};
		var ret = Tool_Ajax(url,type);
		if(ret!="y"){
			myAlert("更新失败！");
		}
	}else{
		node.text = oldTreeText;//为空保存不变
		$(treeId).tree('update',node);
	}
}

/* 评分页面数据加载 */
function loadIndexData(id) {
	if(!isStringNull(id)){
		var node = $(treeId).tree('getSelected');
		id = node.id;
	}
	$("#dg-index").datagrid({
		url : curProjectUrl + "/evaluate/queryIndicator.do",
		queryParams : {id:id},
		width : 'auto',
		nowrap : false,
		iconCls : 'icon-save',
		striped : true,
		//pagination : true,
		//rownumbers : true,
		idField : 'indicatorId',
		//fitColumns : true,
		//fit : true,
		//pageNumber : 1,
		//pageSize : 10,
		//pageList : [ 5, 10, 20, 50 ],
		//loadMsg : '数据加载中.....',
		//toolbar : '#td-index',
		//loadFilter:pagerFilter
		//singleSelect : true,
		// onDblClickRow:onDblClickRow,
		onLoadSuccess : function(data) {
			// $.parser.parse($("#auditTemp").parent());
		},
		loadFilter:function(data){//数据加载完成后进行过滤
			var rows = data.rows;
			if(rows && rows.length>0){
				hasData = true;
				for(var i in rows){
					var oprater ="<a href='javascript:' class='easyui-linkbutton' onclick='viewInd(this,\""+rows[i].indicatorId+"\")'>修改</a>"
					+ "&nbsp;&nbsp;<a href='javascript:' class='easyui-linkbutton' onclick='deleteInd(\""+rows[i].indicatorId+"\")'>删除</a>";
					rows[i].oprater = oprater;
				}
				data.rows = rows;
			}
			return data;
		}
	});
	//}).datagrid('loadData', getIndexData());
	//$('#dg-index').datagrid({loadFilter:pagerFilter}).datagrid('loadData', getIndexData());
}

/**
 * 获取指标信息
 * @returns
 */
function getIndexData(){
	var node = $(treeId).tree('getSelected');
	var did="";
	if(node)
		did = node.id;
	var url = curProjectUrl + "/index/queryInd.do";
	var data = Tool_Ajax(url,{did:did},"json");
	hasInd = data.length!=0;//删除维度的标识   有指标无法删除维度
	if(hasInd){
		for(var i in data){
			var oprater ="<a href='javascript:' class='easyui-linkbutton' onclick='viewInd(this,\""+data[i].indicatorId+"\")'>修改</a>"
						+ "&nbsp;&nbsp;<a href='javascript:' class='easyui-linkbutton' onclick='deleteInd(\""+data[i].indicatorId+"\")'>删除</a>";
			data[i].oprater = oprater;
			data[i].indicatorsAndWeights *= 100;
		}
	}
	
	
	return data;
}

/**增加维度**/
function saveInd(){
	if(isSaving==0){
		var node = $(treeId).tree('getSelected');
		if(node){
			if(!vilidateEmpty({
				evaluationIndicator:"评价指标不能为空！",
				indicatorsAndWeights:"指标权重不能为空！",
				//indicatorDesc:"指标描述不能为空！",
				sequence:"显示序号不能为空！"
			})){return;}
			var indicator ={indicatorType:node.id};
			$("#td-index input").each(function(){
				indicator[this.id]= this.value;
			});
			//指标描述
			indicator.indicatorDesc=$("#indicatorDesc").val();
			isSaving=1;
			var ret = Tool_Ajax(curProjectUrl + "/evaluate/saveIndicator.do",indicator);
			if(ret=="1"){
				loadIndexData(node.id);
				$("#td-index input").each(function(){
					this.value="";
				});
				$("#indicatorDesc").val("");
			}else{
				myAlert("新增失败！");
			}
			isSaving = 0;
		}else{
			myAlert("请选择相应的工作类别！");
		}
	}
	
}
/**删除**/
function deleteInd(id){
	$.messager.confirm("提示","确认删除？",function(r){
		if(r){
			var url = curProjectUrl + "/evaluate/deleteIndicator.do";
			var ret = Tool_Ajax(url,{id:id});
			if(ret=="1"){
				loadIndexData();
				hasData = false;
			}else{
				myAlert("删除失败！");
			}
		}
	});
}
/**
 * 更新
 */
function viewInd(obj,id){
	openWin({
		id:"ind",
		title:"更新指标",
		url:curProjectUrl + "/index/indexManager.do?mark=editM",
		width:"400",
		height:"340",
		position:true
	});
}

/**
 * 更新指标
 */
function updateInd(){
	if(isSaving==0){
		if(!vilidateEmpty({
			evaluationIndicatorE:"评价指标不能为空！",
			indicatorsAndWeightsE:"指标权重不能为空！",
			//indicatorDesc:"指标权重不能为空！",
			sequenceE:"显示序号不能为空！"
		})){return;}
		var row = $("#dg-index").datagrid("getSelected");
		row.evaluationIndicator = $("#evaluationIndicatorE").val();
		row.indicatorsAndWeights = $("#indicatorsAndWeightsE").val();
		row.sequence = $("#sequenceE").val();
		row.indicatorDesc = $("#indicatorDescE").val();
			isSaving=1;
			var ret = Tool_Ajax(curProjectUrl + "/evaluate/updateIndicator.do",row);
			if(ret=="1"){
				$("#cancel").click();
				loadIndexData();
			}else{
				myAlert("保存失败！");
			}
			isSaving = 0;
	}
}


