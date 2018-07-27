package com.ssm.mapper;

import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BaseUser;

/**
 * 用户持久层
 * 
 * @author 
 * 
 */
public interface UserDao 
{
	/**
	 * 账号查用户
	 * 
	 * @param userAccount
	 *            用户账号
	 * @return 用户
	 */
	public BaseUser getUserByAccount(@Param("userAccount") String userAccount);

}
