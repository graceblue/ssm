/**
 * 流程查看 列表查看 
 * @param instanceWfId 流程实例
 */
function seeHistory4Ins(instanceWfId){
	var winId = "workflow-win-see";
	if(document.getElementById(winId)!=null){
		$(winId).remove();
	}
	$("body").append("<div id='"+winId+"'></div>");
	$('#'+winId).window({
		title:"流程查看",
  		href:curProjectUrl+"/baseWorkflow/queryHistory4Ins.do?instId="+instanceWfId,
  		top:50,
	    width:775,  
		height:'auto',  
	    zIndex:2,
	    collapsible:false,
	    minimizable:false,
	    maximizable:false,
	    cache:false,
	    modal:true,
	    shadow:false,
	    draggable:false,
	    resizable:false,
	    onLoad:function(){
	    	/*var top = $(document).scrollTop(); 
	    	$("#"+winId).parent().css({"top":top+"px"});
	    	$(".window-shadow").css({"top":top+"px"}); */
	    	$(".window").css("position","fixed");
	    }
	});
	
}

//流程图查看
function history4Ins(instanceWfId){
	var url = curProjectUrl + '/workflow/history4Ins.do';
	var jumpUrl = Tool_Ajax(url,{instanceWfId:instanceWfId});
	var height = 600;
	var width = 1200;
	var wtop=(window.screen.height-height)/2;
	var wleft=(window.screen.width-width)/2;
	window.open(jumpUrl,"","height="+height+", width="+width+", resizable=yes,status=no,center=yes,top=" + wtop + ",left=" + wleft);
};