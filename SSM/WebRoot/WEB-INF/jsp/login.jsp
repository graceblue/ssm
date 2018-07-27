<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<title>物联网平台</title>
<link rel="stylesheet" href="../common/style/planstyle/auditLogin.css" type="text/css"></link>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/easyui/easyuisy.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/easyui/base.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/easyui/icon.css" />

<link href="<%=request.getContextPath()%>/common/skin/qq/ymPrompt.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/common/skin/ymPrompt.js" type="text/javascript"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/common/style/js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/style/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/md5.js"></script>
<style>

</style>
<script>

 	var defauleName = "请输入用户名";
  var url = "<%=request.getContextPath()%>/login/login.do?";
	$(document).ready(function() {
	
		var loginbtn = $(".loginbtu");
		$(document).keypress(function(e) {
			if (e.which == 13) {
				loginbtn.click();
			}
		});
		window.moveTo(0, 0);
		window.resizeTo(screen.availWidth, screen.availHeight)
		/* function window.onbeforeunload()   
		{   
		  if(event.clientX>document.body.  
			clientWidth&&event.clientY<0||event.altKey)   
		  {   
		    window.event.returnvalue = "";   
		  }  
		} */
		loginbtn.click(function() {
			var userAccount = $("#id").val();
			var pwd = $("#password").val();
			
			var validate = $("#validate").val();
			if (!userAccount) {
				clickImg();
				$("#error  font").text("请输入用户名");
				return;
			}
			if (!pwd) {
				clickImg();
				$("#error font").text("请输入密码");
				return;
			}else{	
				var password=encrypt(pwd);
				//alert(password);
			    $("#password").val(password);
			}
			if (!validate) {
				clickImg();
				$("#error font").text("请输入验证码");
				return;
			}//else{
				//var ss = checkvalidate(validate);
				//if(!ss){
					//clickImg();
				   // $("#error font").text("验证码错误");
				   // $("#validate").val("");
					//return;
				// }
			    
		//	}
			$("#myForm").submit();
		});

		$("#uname").click(function() {
			$(this).hide();
			$("#id").focus();
		});
		$("#upsw").click(function() {
			$(this).hide();
			$("#password").focus();
		});
		
		$("#uvalidate").click(function() {
			$(this).hide();
			$("#validate").focus();
		});

		var flag =false;
	    var tempDate = new Date();
	
			if(flag){
			 	return;
			}
	});

	function checkvalidate(val){
		var flag = true;
		$.ajax({
		   type: "POST",
		   async: false,
		   url: "${pageContext.request.contextPath}/content/DESPlus.jsp",
		   data: "validate="+val,
		   success: function(msg){
		   	if(msg==0){   
    			   flag = false;
		   	}
		   }
	 	});
		return flag;
	}
	function clickImg(){
	 	var date = new Date();
		$("#imgValidate").attr("src","${pageContext.request.contextPath}/content/image.jsp?date="+date);
	}
	$(document).ready(function() {

		$("#focus .input_txt").each(function() {
			var thisVal = $(this).val();
			//判断文本框的值是否为空，有值的情况就隐藏提示语，没有值就显示
			if (thisVal != "") {
				$(this).siblings("span").hide();
			} else {
				$(this).siblings("span").show();
			}
			//聚焦型输入框验证 
			$(this).focus(function() {
				$(this).siblings("span").hide();
			}).blur(function() {
				var val = $(this).val();
				if (val != "") {
					$(this).siblings("span").hide();
				} else {
					$(this).siblings("span").show();
				}
			});
		});
		$("#keydown .input_txt").each(function() {
			var thisVal = $(this).val();
			//判断文本框的值是否为空，有值的情况就隐藏提示语，没有值就显示
			if (thisVal != "") {
				$(this).siblings("span").hide();
			} else {
				$(this).siblings("span").show();
			}
			$(this).keyup(function() {
				var val = $(this).val();
				$(this).siblings("span").hide();
			}).blur(function() {
				var val = $(this).val();
				if (val != "") {
					$(this).siblings("span").hide();
				} else {
					$(this).siblings("span").show();
				}
			});
		});
	});
	
	function encrypt(value){
	var monyer = new Array();
	var i;
	for(i=0;i<value.length;i++){
	   monyer+=value.charCodeAt(i)+",";
	}
	return monyer;
}
	
	//修改密码
	function updatePassword(){
		
		
		$("#detailWindow").window({
			href : "${pageContext.request.contextPath}/common/gotoUpdatePasswordPage.do",
			title : "忘记密码",
			width : 300,
			height : 200,
			//left:582,
			top:200,
			zIndex : 5,
		    collapsible:false,
		    minimizable :false,
		    maximizable:false,
		    draggable:false,
		    resizable:true,
		    shadow:false,
		    cache:false,
		    modal:false,
		    inline:false,
			onLoad : function() {
				$(".window").css("position", "fixed");
			}
		});
	}
</script>

</head>
<body>

	<div class="logintop">
		<div class="middle logo-top">
		<!-- 
			<img src="../common/style/imgs/logo1.png" alt="中国电信" title="中国电信" id="login-logo" />
			<p id="login-txt">江苏电信集约化运维平台</p>
	    -->
		</div>
	</div>
	<div class="logininfo">
		<div class="logintub">
			<div class="middle">
				<form id="myForm" method="post"
					action="<%=request.getContextPath()%>/login/login.do">
					<div class="loginifright" id="focus">
						<ul>
							<p class="ptit">登录系统</p>
							<li><span id="uname">请输入您的帐号</span> <input id="id"
								class="input_txt" name="userAccount" type="text" value="" /></li>
							<li><span id="upsw">请输入您的密码</span> <input  id="password"
								class="input_txt" name="pwd" type="password" value="" /></li>
						     <li style="background:url(../common/style/imgs/validate.png) no-repeat;width:280px;"><span id="uvalidate" >请输入验证码</span> <input id="validate"
								 class="input_txt" name="validate" type="text" value="" style="width:112px;"/>
								 <img id="imgValidate" src="<%=request.getContextPath()%>/content/image.jsp" style="margin-left: 8px;" onclick="clickImg()"/></li>
							<p class="jzpwd">
								<span id="bumeng" style="display: none;"></span>
								<div id="error" style="height: 12px;margin-left:70px;" >
									<font size="2" face="arial" color="red">${message}
									</font>
								</div>
							</p>
							<p style="height:5px" ></p>
							<p class="loginbtuif" style="margin-top:-2px">
								<a href="javascript:void(0);" class="loginbtu" style="">登录系统</a> 
							</p>
						</ul>
					</div>
				</form>
			</div>
		</div>
		<div class="login_bottom" style="margin-top:0px;position:relative;bottom:-20px;">

		</div>
	</div>
	<div id="detailWindow" style="width: 300px;height: 200px;border: 0px solid red;"></div>	
</body>
</html>
