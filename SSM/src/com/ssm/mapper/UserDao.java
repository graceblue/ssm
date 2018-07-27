package com.ssm.mapper;

import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BaseUser;

/**
 * �û��־ò�
 * 
 * @author 
 * 
 */
public interface UserDao 
{
	/**
	 * �˺Ų��û�
	 * 
	 * @param userAccount
	 *            �û��˺�
	 * @return �û�
	 */
	public BaseUser getUserByAccount(@Param("userAccount") String userAccount);

}
