var zNodes = [];
var zTreeObj;
var setting = {
	view: {
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false
	},
	edit: {
		enable: true,
		editNameSelectAll: true
	},
	data: {
		simpleData: {
			enable: true,
			idKey: "typeId",
            pIdKey: "typeParentId",
            rootPId: "0"
		},
		key:{
			name:"typeName",
			title:"typeName"
		}
	},
	callback: {
		beforeDrag: beforeDrag,
		beforeEditName: beforeEditName,
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		onRemove: onRemove,
		onRename: onRename,
		onClick:onTreeClick
	}
};

/**获取文档类别*/
function loadKBhomeDatas(){
	var root = {"typeId":"0","typeParentId":"","typeName":"知识库类别管理","open":true};
	var url = curProjectUrl + "/knowledgebase/queryAll.do";
	var data = Tool_Ajax(url,null,"json");
	if(!data){
		data = [];
	}
	data.push(root);
	return data;	
}


var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
	return false;
}
function beforeEditName(treeId, treeNode) {
	className = treeNode.typeName;
	var zTree = $.fn.zTree.getZTreeObj("doc-template");
	zTree.selectNode(treeNode);
	return true;
}

function beforeRemove(treeId, treeNode) {
	if(treeNode.children){
		$.messager.alert("提示","该类别底下有子节点，不能删除！","info");
		return false;
	}
	var zTree = $.fn.zTree.getZTreeObj("doc-template");
	zTree.selectNode(treeNode);
	return confirm("确认删除 " + treeNode.typeName + " 吗？");
}
/**重命前*/
function onRemove(e, treeId, treeNode) {
	var url = curProjectUrl +"/knowledgebase/deleteKbType.do";
	var data = Tool_Ajax(url,{id:treeNode.typeId});
	if(data=="n"){
		$.messager.alert("提示","删除失败！","info");
	}
}
/**重命名之前*/
function beforeRename(treeId, treeNode, newName) {
	className = (className === treeNode.typeName ? "":"dark");
	if (newName.length == 0) {
		$.messager.alert("提示","节点名称不能为空!","info");
		var zTree = $.fn.zTree.getZTreeObj("sdfd");
		setTimeout(function(){zTree.editName(treeNode)}, 10);
		return false;
	}
	return true;
}
function onRename(e, treeId, treeNode) {
	if(className!=treeNode.typeName){
		var url = curProjectUrl + "/knowledgebase/saveKbType.do";
		var result = Tool_Ajax(url,treeNode,"json");
		if(result&&result=="n"){
			$.messager.alert("提示","新增或更新节点失败！","info");
		}else{
			//设置节点的主键
			treeNode.typeId = result.data;
			/*var name = treeNode.audititemname;
			treeNode.title=name;//标题显示
			treeNode.audititemname = name.length>17?name.substring(0,15)+"...":name;*/ 
		}
	}
}
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}
/**新增节点**/
var newCount = 1;
function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag || $("#addBtn_"+treeNode.typeId).length>0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.typeId
		+ "' title='新增' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_"+treeNode.typeId);
	if (btn) btn.bind("click", function(){
		//新节点的设定
		var newNode={
				parentId:treeNode.typeId,
				typeName:""
		}
		var zTree = $.fn.zTree.getZTreeObj("doc-template");
		newNode = zTree.addNodes(treeNode, newNode);
		zTree.editName(newNode[0]);
	});
};
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.typeId).unbind().remove();
};
function selectAll() {
	var zTree = $.fn.zTree.getZTreeObj("doc-template");
	zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
}

/**
* 单击事件
*
*/
function onTreeClick(event, treeId, treeNode, clickFlag) {
	zTreeObj = treeNode;
	loadTempFiles();
}

/**********************datagrid*********************/
function loadTempFiles(){
	$('#tempFile').datagrid({loadFilter:pagerFilter}).datagrid('loadData', getData());
}
//获取模版文件 flag 标识 区别用户与系统管理员
function getData(){
	var flag = window.location.href.indexOf("otherDocCom")>-1?"user":"";
	var rows = [];
	if(zTreeObj){
		var queryParams = {typeId:zTreeObj.id,fileName:$("#serName").val(),flag:isStringNull(flag)?flag:""};
		rows =  Tool_Ajax(curProjectUrl+"/template/queryTempFile.do",{queryParams:JSON.stringify(queryParams)},"json");
	}
	return rows;
}


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

var idG;

/**修改模版文件*/
function updateTempFile(id,data,fileName){
	idG = id;
	if(isStringNull(data))
	{
		//新
		upLoadNTKO({ftpFileId:data,ftpFileName:fileName,isReadOnly:"0"});
	}else{
		myAlert("参数传入不正确！");
	}
}

/**删除模版文件*/
function deleteTempFile(id){
	$.messager.confirm("删除","确认删除？",function(r){
		if(r){
			var url = curProjectUrl + "/template/deleteTempFile.do";
			var result = Tool_Ajax(url,{id:id});
			if(result=="n"){
				myAlert("删除失败");
			}else{
				loadTempFiles();
			}
		}
	});
}

/**新模版文件*/
function newTempFile(docType){
	var fileName = $("#fileName").val();
	var descript = $("#descript").val();
	if(!isStringNull(fileName)){
		myAlert("模版名称不能为空！");
		return;
	}
	if(!isStringNull(descript)){
		myAlert("模版说明不能为空！");
		return;
	}
	if(!zTreeObj || zTreeObj.id=="0")
	{
		myAlert("请选择文档类别！");
	}else{
		//新
		upLoadNTKO({ftpFileId:"",ftpFileName:fileName,isReadOnly:"0",ftpFileType:docType});
	}
}

 function callBackNTKO(result)  
  {  
	 if(isStringNull(result)){
		 var file =$.parseJSON(result).resultContent;
		 if(file){
			 var fileName = $("#fileName").val();//模版附件名
			 var data = file.data;
			 fileName += data.substring(data.indexOf("."));
			 var tempFile={
					 templateId:idG,
					 typeId:zTreeObj.id,
					 recordId:data,
					 fileName:fileName,
					 fileType:".doc",
					 fileSize:file.fileSize,
					 descript:$("#descript").val()
			 }
			 var url = curProjectUrl + "/template/saveTempFile.do";
			 var result = Tool_Ajax(url,{tempFile:JSON.stringify(tempFile)});
			 if(result && result=="y"){
				 loadTempFiles();
				 idG="";
			 }else{
				 myAlert("模版新增失败！");
			 }
		 }
	}
 	
  } 
 
 /**上传附件*/
 function uploadTempFile(obj,sessionId){
	 if(!zTreeObj || zTreeObj.id=="0")
	{
		myAlert("请选择文档类别！");
	}else{
		if(!isStringNull($("#descript").val())){
			myAlert("模版说明不能为空！");
			return;
		}
		//新
		commonUploadifyFile(dealwithTempFile,sessionId,{closeable:true,multi:false});
	}
 }
 /**上传附件*/
 function uploadFile(obj,sessionId){
	 var params = parent.opener.paramsG;
	 var callback = params.callback;
	commonUploadifyFile(callback,sessionId,{closeable:true,multi:false});
 }
 
 /**上传回调*/
 function dealwithTempFile(file,data,response){
	 var tempFile={
			 typeId:zTreeObj.id,
			 recordId:data,
			 fileName:file.name,
			 fileType:file.type,
			 fileSize:file.size,
			 descript:$("#descript").val()
	 }
	 var url = curProjectUrl + "/template/saveTempFile.do";
	 var result = Tool_Ajax(url,{tempFile:JSON.stringify(tempFile)});
	 if(result && result=="y"){
		 loadTempFiles();
	 }else{
		 myAlert("模版新增失败！");
	 }
 }
 
 function configTempFile(id){
	 var winJson={
			 id:"config-lable",
			 title:"配置模版标签信息",
			 url:curProjectUrl + "/template/bookmarks.do?tempfile="+id,
			 width:600,
			 height:450,
			 position:false
			 
	 }
	 openWin(winJson);
 }
 
 
 /**模版使用*/
 function useTempFile(id,ftpid,name){
	 var params = parent.opener.paramsG;
	 var bookMarks = getBookMarkJson(ftpid, params.bookmarks);
	 upLoadNTKO({ftpFileId:ftpid,ftpFileName:name,isReadOnly:"0",bookMarks:JSON.stringify(bookMarks)});
	 
 }
 
 /**
  * @param result 返回信息
  * @example {"fileId":"1520","fileName":"1388145053183.doc",
  * "filePath":"/2013/12/27","fileRealName":"ntko.doc","operation":"1","uploader":"2112",
  * "uploaderDateTime":{"date":27,"day":5,"hours":19,"minutes":50,"month":11,"seconds":53,"time":1388145053183,"timezoneOffset":-480,"year":113},
  * "uploaderUnit":"552","data":"1388145053183.doc"}
  * @author lijie
  * 
  */
  function callBackNTKO(result)  
{  
	var initName = window.location.href.indexOf("digao")>0?"在线工作底稿.doc":"在线测试记录.doc";
	var resultJSON=eval("("+result+")");
	var file = resultJSON.resultContent;
	file.type=".doc";//默认是doc文档
	file.flag="2";//内容页附件
	file.name=initName;
	file.size=file.fileSize;
	file.contentType="1";//标识增加方式 1 在线增加 2 附件增加
	//buildContent(file);
}  

 
 /**获取标签数据json
  * @param data FTP时间戳
  * @param 占位符数组
  * */
 function getBookMarkJson(data,arr){
	 if(!isStringNull(data)){
		 myAlert("参数不正确");
	 }
	 var url = curProjectUrl + "/template/getBookMarkJson.do";
	 var result = Tool_Ajax(url,{data:data,arr:arr.toString()},"json");
	 return result;
 }


