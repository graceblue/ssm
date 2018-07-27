var planUtil = {
	/**类型*/
	planTypeGroup : "01",//集团年度计划类型
	planTypeOther : "03",//审计机构
	
	/**状态*/
	statusDraft : "01",//草稿
	statusChangeing:"15",//调整中
	statusApprove:"16",//审核中
	statusShure:"17",//已定稿
	
	/**流程业务id*/
	processGroup:"183",//集团指令指导性计划
	processAudit:"plan_group_audit",//集团审计部审计机构计划（调整）审核流程
	processCompany:"plan_company",//省公司审计机构计划审核流程
	processCompanyP:"plan_company_p",//省公司审计机构计划调整审核流程（指令指导性被动调整）
	processCompanyZ:"plan_company_z",//省公司审计机构计划调整审核流程（指令指导性主动调整）
	processCompanyM:"plan_company_m",//省公司审计机构计划调整审核流程（自主性计划调整）

	/**编制单位*/
	orgGroup :"00",
	
	
	changeState:"02",//自主性计划调整
	changeStateN:"03"//需要调整
		
		
}



/**送审
* @param bizId 流程定义ID
* @param applyId 业务单ID
* @param applyTitle 业务单名称
*/
function setWFStartPopedom(bizId,applyId,applyTitle,status){
	if(!isStringNull(bizId)|| !isStringNull(applyId)){
		$.messager.alert('提示','传入参数不正确！','info');
		return;
	}
	if(typeof(applyTitle) !="undifined" && applyTitle!=""){//解决中文乱码
		applyTitle=encodeURI(encodeURI(applyTitle));
	}
	status = status=="undefinded"?"":status;
	$("body").append("<div id='workflow-win'></div>");
		$('#workflow-win').window({
		title:"流程发起",
  		href:getProjectUrl()+'/planWorkflow/setWFStartPopedom.do?applyId='+applyId+'&applyTitle='+applyTitle+'&bizId='+bizId+"&status="+status, 
  		top:10,
	    width:564,  
	    height:'auto',  
	    zIndex:3,
	    collapsible:false,
	    minimizable :false,
	    maximizable:false,
	    draggable:false,
	    resizable:false,
	    shadow:false,
	    cache:false,
	    modal:true,
	    onClose:function(){
    		$("#workflow-win").remove();
	    },
	    onLoad:function(){
	    	$(".window").css("position","fixed");
	    } 
	});
}