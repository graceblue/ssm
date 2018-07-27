package com.ssm.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssm.domain.BaseRole;
import com.ssm.domain.BaseUser;
import com.ssm.service.OrgSmo;
import com.ssm.service.RoleSmo;
import com.ssm.service.UserSmo;

import com.ssm.domain.BaseOrganization;




@Controller
@RequestMapping("/login")
public class LoginController {
	/**
	 * 用户服务层
	 */
	@Resource
	UserSmo userSmoImpl;	
	/**
	 * 角色服务层
	 */
	@Resource
	RoleSmo roleSmoImpl;	
	/**
	 * 机构服务层
	 */
	@Resource
	OrgSmo orgSmoImpl;
	
	@RequestMapping("login")
	public String login(HttpServletRequest request, HttpServletResponse response, HttpSession session, ModelMap model)
			throws Exception {
		String userAccount = request.getParameter("userAccount");
		String operID = request.getParameter("operID");
		String pwd = request.getParameter("pwd");
		if ((userAccount == null || "".equals(userAccount)) && (operID == null || "".equals(operID))) {
			return "login";
		}
		String inputValidate = request.getParameter("validate");
		Object validate = request.getSession().getAttribute("validate");
		request.getSession().setAttribute("validate", "");
		if (validate == null || !validate.equals(inputValidate))
		{
			model.put("message", "验证码错误！");
			return "login";
		}
		BaseUser bu = null;
		try
		{
			bu = userSmoImpl.getUserByAccount(userAccount);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			model.put("message", "账号或密码不正确！");

			return "login";
		}
		if (bu == null)
		{
			model.put("message", "账号或密码不正确");
			return "login";
		}

		if (bu.getUserStateCd().equals("0"))
		{
			model.put("message", "用户状态已失效，请联系管理员！");
			return "login";
		}
		pwd = asciiToString(pwd);
		String accountPassword = bu.getAccountPasswordCd();
		if(!accountPassword.equals(pwd)){
			model.put("message", "账号或密码不正确！");
			return "login";
			
		}
		// 用户拥有的角色
		List<BaseRole> roles = roleSmoImpl.getRolesByUser(bu.getUserId());
		bu.setRoles(roles);
		
		// 用户所属的机构
		BaseOrganization bo = orgSmoImpl.getOrgByUser(bu.getUserId());
		bu.setOrg(bo);
		
		return "mainPage";
	}
	
	/**
	 * 跳主页
	 * 
	 * @return 路径
	 */
	@RequestMapping("/index")
	public String index()
	{
		return "login";
	}
	

	public static String asciiToString(String value)
	{
		StringBuffer sbu = new StringBuffer();
		String[] chars = value.split(",");
		for (int i = 0; i < chars.length; i++)
		{
			sbu.append((char) Integer.parseInt(chars[i]));
		}
		return sbu.toString();
	}

}
