<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/easyui/easyuisy.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/common/style/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/common/style/js/jquery.easyui.min.js"></script>
<script type="text/javascript">
//var currTabId=parent.currTabId;
//var parentObj=parent.$("#"+currTabId)[0].contentWindow;
window.onload=function(){
	document.getElementById("hlf").value=parent.exportString;
};


function btnExcel(){
	document.getElementById("type").value="excel";
	document.getElementById("formAction").submit();
}
function btnWord(){
	document.getElementById("type").value="word";
	document.getElementById("formAction").submit();
}
</script>
</head>
<body style="padding:20px; align:center" >
     <form id='formAction' action="<%=request.getContextPath()%>/export/ExportExcel.do"  method="post">
     	<font size="3px">请选择导出的文件类型类型</font><br /><br />
     	<input id="dgg" class="easyui-linkbutton" type="button" value="导出Excel" onclick="btnExcel()"/>
     	<input id="dgg" class="easyui-linkbutton" type="button" style="margin-left:50px;" value="导出Word" onclick="btnWord()"/>
 		<input id="hlf" name='hfs'  type="hidden"/>
 		<input id="type" name='type'  type="hidden"/>
    </form>
</body>
</html>