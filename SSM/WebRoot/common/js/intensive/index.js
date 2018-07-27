// //////////////////////
var isSaving=0;
var treeId = "#dimensions";//含#号
var hasInd = false;//是否有指标
function loadDimensionsTree(orgCode) {
	var data = [{id:"0",text:"集约化评价维度",state:"open"}];
	var dims = Tool_Ajax(curProjectUrl + "/index/queryDim.do",{},"json");
	data[0].children=dims;
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
				updateUrl:curProjectUrl + "/index/updateDim.do",
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
	$.messager.prompt("维度名称","请输入维度名称：",function(r){
		if(r){
			var dim = Tool_Ajax(curProjectUrl + "/index/saveDim.do",{evaluativeDimension:r},"json");
			if(dim){
				t.tree('append', {
					parent: (node?node.target:null),
					data: [{
						id:dim.dimensionsId,
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
	if(hasInd){
		myAlert("请先删除相应指标！");
		return;
	}
	
	$.messager.confirm("提示","确认删除？",function(r){
		if(r){
			var node = $(treeId).tree('getSelected');
			if(node.id=="0"){
				myAlert("此节点无法删除");
			}else{
				var url = curProjectUrl + "/index/deleteDim.do";
				var r = Tool_Ajax(url,{id:node.id});
				if(r=="1")
					$('#dimensions').tree('remove', node.target);
				else
					myAlert("删除审计单位失败！");
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
			myAlert("更新失败！您输入的维度名称过长,请重新输入！");
			node.text = oldTreeText;//为空保存不变
			$(treeId).tree('update',node);
			return;
		}
		var url = curProjectUrl + "/index/updateDim.do";
		var dim ={
				dimensionsId:node.id,
				evaluativeDimension:newTreeText
		};
		var ret = Tool_Ajax(url,dim);
		if(ret!="1"){
			myAlert("更新失败！");
		}
	}else{
		node.text = oldTreeText;//为空保存不变
		$(treeId).tree('update',node);
	}
}

/* 评分页面数据加载 */
function loadIndexData() {
	///$("#dg-index").datagrid({
		//url : curProjectUrl + "/index/queryInd.do",
		//queryParams : {
		//	did:did
		//},
		/*width : 'auto',
		nowrap : false,
		iconCls : 'icon-save',
		striped : true,
		pagination : true,
		rownumbers : true,
		idField : 'mbId',
		fitColumns : true,
		fit : true,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 5, 10, 20, 50 ],
		loadMsg : '数据加载中.....',
		toolbar : '#td-index',*/
		//loadFilter:pagerFilter
		/*singleSelect : true,
		// onDblClickRow:onDblClickRow,
		onLoadSuccess : function(data) {
			// $.parser.parse($("#auditTemp").parent());
		}*/
	//}).datagrid('loadData', getIndexData());
	$('#dg-index').datagrid({loadFilter:pagerFilter}).datagrid('loadData', getIndexData());
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


//将得到的数据进行分页
function pagerFilter(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
		data = {
			total: data.length,
			rows: data
		}
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			opts.checkbox=true;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('loadData',data);
		}
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
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
				sequence:"显示序号不能为空！"
			})){return;}
			var ind ={dimensionsId:node.id};
			$("#td-index input").each(function(){
				ind[this.id]= this.value;
			});
			//easyui 取值 指标权重
			ind.indicatorsAndWeights=$("#indicatorsAndWeights").numberbox("getValue")*1/100;
			isSaving=1;
			var ret = Tool_Ajax(curProjectUrl + "/index/saveInd.do",ind);
			if(ret=="1"){
				loadIndexData();
			}else{
				myAlert("新增失败！");
			}
			isSaving = 0;
		}else{
			myAlert("请选择相应的评价维度！");
		}
	}
	
}
/**删除**/
function deleteInd(id){
	$.messager.confirm("提示","确认删除？",function(r){
		if(r){
			var url = curProjectUrl + "/index/deleteInd.do";
			var ret = Tool_Ajax(url,{id:id});
			if(ret=="1"){
				loadIndexData();
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
		title:"更新指标权重",
		url:curProjectUrl + "/index/index.do?mark=edit",
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
				sequenceE:"显示序号不能为空！"
			})){return;}
			var ind={
				indicatorsAndWeights:$("#indicatorsAndWeightsE").numberbox("getValue")*1/100,
				evaluationIndicator:$("#evaluationIndicatorE").val(),
				sequence:$("#sequenceE").val(),
				indicatorId:$("#indicatorIdE").val()
			}
			isSaving=1;
			var ret = Tool_Ajax(curProjectUrl + "/index/updateInd.do",ind);
			if(ret=="1"){
				$("#cancel").click();
				loadIndexData();
			}else{
				myAlert("新增失败！");
			}
			isSaving = 0;
	}
	
}


