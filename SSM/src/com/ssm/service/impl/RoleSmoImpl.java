package com.ssm.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.domain.BasePosition;
import com.ssm.domain.BaseRole;
import com.ssm.domain.BaseUser;
import com.ssm.mapper.RoleDao;
import com.ssm.service.MenuSmo;
import com.ssm.service.RoleSmo;

/**
 * 角色服务层
 * 
 * @author 
 * 
 */
@Service
public class RoleSmoImpl implements RoleSmo
{

	/**
	 * 角色持久层
	 */
	@Resource
	RoleDao roleDao;

	/**
	 * 菜单持久层
	 */
	@Resource
	MenuSmo menuSmoImpl;



	/**
	 * 根据角色的id得到该角色下所有的用户
	 * 
	 * @param roleId
	 *            角色Id
	 * @return 该角色下所有用户的accountName
	 */
	@Override
	public List<BaseUser> selectUsersByRole(String roleId)
	{
		return roleDao.selectUsersByRole(roleId);
	}

	/**
	 * 根据角色的id得到该角色下所有的岗位
	 * 
	 * @param roleId
	 *            角色的id
	 * @return 该角色下所有岗位的
	 */
	@Override
	public List<BasePosition> selectPositionsByRole(String roleId)
	{
		return roleDao.selectPositionsByRole(roleId);
	}

	@Override
	public void deleteRole(String roleId) throws Exception
	{
		try
		{
			roleDao.deleteRole(roleId);
		}
		catch (Exception e)
		{
			throw e;
		}
	}

	@Override
	public void addRole(BaseRole role) throws Exception
	{
		try
		{
			roleDao.addRole(role);
		}
		catch (Exception e)
		{
			throw e;
		}
	}

	@Override
	public List<Map<String, String>> getRoleTypeList()
	{
		return roleDao.getRoleTypeList();
	}

	@Override
	public BaseRole getRoleById(String roleId)
	{
		return roleDao.getRoleById(roleId);
	}

	@Override
	public void editRole(BaseRole role)
	{
		roleDao.updateRole(role);
	}

	@Override
	public List<BaseRole> getRolesByUser(String userId)
	{
		List<BaseRole> roles = roleDao.getRolesByUser(userId);
		for (BaseRole r : roles)
		{
			r.setMenuPermission(menuSmoImpl.getMenusByRoleId(String.valueOf(r.getRoleId())));
		}
		// TODO
		return roles;
	}

	@Override
	public List<BaseRole> getRolesByPosition(String positionId)
	{
		List<BaseRole> roles = roleDao.getRolesByPosition(positionId);
		for (BaseRole r : roles)
		{
			r.setMenuPermission(menuSmoImpl.getMenusByRoleId(String.valueOf(r.getRoleId())));
		}
		// TODO
		return roles;
	}

	@Override
	public void deleteUserRole(String userId, String roleId)
	{
		roleDao.deleteUserRole(userId, roleId);

	}

	@Override
	public void deletePositionRole(String positionId, String roleId)
	{
		roleDao.deletePositionRole(positionId, roleId);

	}

	@Override
	public String saveUserRole(String[] userId, String[] roles, String startDate, String endDate)
	{
		String result = "";
		int i = 0;
		for (String u : userId)
		{
			for (String roleId : roles)
			{
				try
				{
					roleDao.saveUserRole(u, roleId, startDate, endDate);
					i++;
				}
				catch (Exception e)
				{
					result += "[roleId:" + roleId + "保存失败.原因：" + e.getMessage() + "]";
				}
			}
		}
		result += "-----[保存完毕：总共保存" + i + "条]";
		return result;
	}

	@Override
	public String savePositionRole(String[] positions, String[] roles, String startDate, String endDate)
	{
		String result = "";
		int i = 0;
		for (String p : positions)
		{
			for (String roleId : roles)
			{
				try
				{
					roleDao.savePositionRole(p, roleId, startDate, endDate);
					i++;
				}
				catch (Exception e)
				{
					result += "[roleId:" + roleId + "保存失败.原因：" + e.getMessage() + "]";
				}
			}
		}
		result += "-----[保存完毕：总共保存" + i + "条]";
		return result;
	}

	@Override
	public List<BaseRole> getAllRoles()
	{
		return roleDao.getAllRoles();
	}

	@Override
	public void betchInsertUserRole(String fromUserId, String[] copyUserId, String[] copyRole)
	{
		roleDao.betchInsertUserRole(fromUserId, copyUserId, copyRole);
	}

	@Override
	public void betchInsertPositionRole(String fromPositionId, String[] copyPositionId, String[] copyRole)
	{
		roleDao.betchInsertPositionRole(fromPositionId, copyPositionId, copyRole);
	}



	@Override
	public List<BasePosition> getAllPositions()
	{
		return roleDao.getAllPositions();
	}

	@Override
	public BaseRole getRoleByRoleName(String roleName)
	{
		return roleDao.getRoleByRoleName(roleName);
	}

}