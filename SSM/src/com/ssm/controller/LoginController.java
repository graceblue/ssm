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
	 * �û������
	 */
	@Resource
	UserSmo userSmoImpl;	
	/**
	 * ��ɫ�����
	 */
	@Resource
	RoleSmo roleSmoImpl;	
	/**
	 * ���������
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
			model.put("message", "��֤�����");
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
			model.put("message", "�˺Ż����벻��ȷ��");

			return "login";
		}
		if (bu == null)
		{
			model.put("message", "�˺Ż����벻��ȷ");
			return "login";
		}

		if (bu.getUserStateCd().equals("0"))
		{
			model.put("message", "�û�״̬��ʧЧ������ϵ����Ա��");
			return "login";
		}
		pwd = asciiToString(pwd);
		String accountPassword = bu.getAccountPasswordCd();
		if(!accountPassword.equals(pwd)){
			model.put("message", "�˺Ż����벻��ȷ��");
			return "login";
			
		}
		// �û�ӵ�еĽ�ɫ
		List<BaseRole> roles = roleSmoImpl.getRolesByUser(bu.getUserId());
		bu.setRoles(roles);
		
		// �û������Ļ���
		BaseOrganization bo = orgSmoImpl.getOrgByUser(bu.getUserId());
		bu.setOrg(bo);
		
		return "mainPage";
	}
	
	/**
	 * ����ҳ
	 * 
	 * @return ·��
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
