package com.ssm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BaseUser;



/**
 * �û������
 * 
 * @author 
 * 
 */
public interface UserSmo
{
	/**
	 * �����˺Ų��û�
	 * 
	 * @param userAccount
	 *            �û��˺�
	 * @return �û�����
	 */
	public BaseUser getUserByAccount(String userAccount);

}