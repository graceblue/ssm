package com.ssm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BaseUser;



/**
 * 用户服务层
 * 
 * @author 
 * 
 */
public interface UserSmo
{
	/**
	 * 根据账号查用户
	 * 
	 * @param userAccount
	 *            用户账号
	 * @return 用户对象
	 */
	public BaseUser getUserByAccount(String userAccount);

}