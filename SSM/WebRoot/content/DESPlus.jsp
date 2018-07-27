<%@page import="javax.servlet.http.*"%>
<%
	String validate = request.getParameter("validate");
	String validateSession = (String)request.getSession().getAttribute("validate");
	
	if(validate.equals(validateSession)){
		response.getWriter().write("1");
	}else{
		response.getWriter().write("0");
	}
%>