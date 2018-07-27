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
			idKey: "id",
            pIdKey: "parentId",
            rootPId: "100"
		},
		key:{
			name:"name",
			title:"name"
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
function loadTreeDatas(){
	var root = {"id":"0","parentId":"","name":"审计文档类别","open":true};
	var url = curProjectUrl + "/template/queryAll.do";
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
	className = treeNode.name;
	var zTree = $.fn.zTree.getZTreeObj("doc-template");
	zTree.selectNode(treeNode);
	return true;
}

function beforeRemove(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("doc-template");
	zTree.selectNode(treeNode);
	return confirm("确认删除 " + treeNode.name + " 吗？");
}
/**重命前*/
function onRemove(e, treeId, treeNode) {
	var url = curProjectUrl +"/template/delete.do";
	var data = Tool_Ajax(url,{id:treeNode.id});
	if(data=="n"){
		$.messager.alert("提示","删除失败！","info");
	}
}
/**重命名之前*/
function beforeRename(treeId, treeNode, newName) {
	className = (className === treeNode.name ? "":"dark");
	if (newName.length == 0) {
		$.messager.alert("提示","节点名称不能为空!","info");
		var zTree = $.fn.zTree.getZTreeObj("doc-template1");
		setTimeout(function(){zTree.editName(treeNode)}, 10);
		return false;
	}
	return true;
}
function onRename(e, treeId, treeNode) {
	if(className!=treeNode.name){
		var url = curProjectUrl + "/template/save.do";
		var result = Tool_Ajax(url,treeNode,"json");
		if(result&&result=="n"){
			$.messager.alert("提示","新增或更新节点失败！","info");
		}else{
			//设置节点的主键
			treeNode.id = result.data;
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
	if (treeNode.editNameFlag || $("#addBtn_"+treeNode.id).length>0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.id
		+ "' title='add node' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_"+treeNode.id);
	if (btn) btn.bind("click", function(){
		//新节点的设定
		var newNode={
				parentId:treeNode.id
		}
		var zTree = $.fn.zTree.getZTreeObj("doc-template");
		newNode = zTree.addNodes(treeNode, newNode);
		zTree.editName(newNode[0]);
	});
};
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.id).unbind().remove();
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
function newTempFile(docType,flag){
	if(isStringNull(flag)){//前台页面调用 
		upLoadNTKO({ftpFileId:"",ftpFileName:"",isReadOnly:"0",ftpFileType:docType});
	}else{//后台管理调用
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
	commonUploadifyFile(callbackUpLoad,sessionId,{closeable:true,multi:false});
 }
 
 /**附件上传后的回调父窗口回调*/
 function callbackUpLoad(file,data,response){
	 //关闭当前窗口
	 window.close();
	//执行父窗口的回调
	 var params = parent.opener.paramsG;
	 var callback = params.callback;
	 callback(file,data);
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


