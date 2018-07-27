/** 跳转到新增成果页面**/
function addAuditResult11(projectId,projectState,lineNum){
	var auditChiefIds = $('#auditChiefIDS'+lineNum).val();
	location.href=curProjectUrl+"/processResult/toAddAuditResult.do?projectId="+projectId+"&projectState="+projectState+"&auditChiefIds="+auditChiefIds+"&lineNum="+lineNum;
};

/**根据项目主键，删除项目中的子项目信息**/
function deleteProjectChild(projectId){
	if(confirm("确定要删除数据吗?")){
		$.ajax({
		type:"post",
		url:curProjectUrl+"/processtrack/deleteProcessInfo.do?projectId="+projectId,
		async : false,//同步
		dataType :"json",//json数据格式
		success:function(){
			$("#childP"+projectId).css("display","none");
			//window.location.reload();
			}
		});
	}
};

/**根据项目主键，修改项目中的子项目信息**/
function updateProjectChild(projectId,lineNum){
	location.href=curProjectUrl+'/processtrack/updProcessTrack.do?projectId='+projectId+'&lineNum='+lineNum;
};

/**单个项目（主项目中的子项目）进行提交**/
function submitLX(projectId){
	if(confirm("确定要提交数据吗?")){
		$.ajax({
			type:"post",
			url:curProjectUrl+'/processtrack/updateProcessChildProjectState.do?projectId='+projectId+'&auditType=doAudit',
			async : false,//同步
			dataType :"json",//json数据格式
			success:function(){
				window.location.reload();
			}
		});
	}
};

/**查看单个成果信息**/
function findAuditResult(prID,lineNum){
	var auditChiefIds = $('#auditChiefIDS'+lineNum).val();
	location.href=curProjectUrl+'/processResult/selectProcessResult.do?resultId='+prID+"&auditChiefIds="+auditChiefIds;
};

/**未审计**/
function noAudit(){
	location.href=curProjectUrl+"/process/toNoAuditView.do";
};

/**审计中**/
function doAudit(){
	location.href=curProjectUrl+"/process/toDoAuditView.do";
};




