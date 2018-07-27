package com.ssm.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.domain.BaseUser;
import com.ssm.mapper.UserDao;
import com.ssm.service.UserSmo;



@Service(value = "userSmoImpl")
public class UserSmoImpl implements UserSmo
{
	/**
	 * 用户持久层对象
	 */
	@Resource
	private UserDao userDao;


	
	@Override
	public BaseUser getUserByAccount(String userAccount)
	{
		BaseUser bu = userDao.getUserByAccount(userAccount);
		return bu;
	}
	
}