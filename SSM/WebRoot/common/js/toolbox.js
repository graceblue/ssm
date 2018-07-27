
//ajax调用
//tbparam：传入参数，参数方式"A="+A+"&B="+B
//url: 指定方法
//returnvalue: 返回值，初始为null 
function tool_ajax(url,tbparam) { 
	var returnvalue = null;
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
	};
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				returnvalue = xmlhttp.responseText;
		}
	};
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(tbparam+"&verfication_default="+new Date());
  return returnvalue;
};