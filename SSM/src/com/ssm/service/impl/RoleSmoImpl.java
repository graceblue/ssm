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
 * ��ɫ�����
 * 
 * @author 
 * 
 */
@Service
public class RoleSmoImpl implements RoleSmo
{

	/**
	 * ��ɫ�־ò�
	 */
	@Resource
	RoleDao roleDao;

	/**
	 * �˵��־ò�
	 */
	@Resource
	MenuSmo menuSmoImpl;



	/**
	 * ���ݽ�ɫ��id�õ��ý�ɫ�����е��û�
	 * 
	 * @param roleId
	 *            ��ɫId
	 * @return �ý�ɫ�������û���accountName
	 */
	@Override
	public List<BaseUser> selectUsersByRole(String roleId)
	{
		return roleDao.selectUsersByRole(roleId);
	}

	/**
	 * ���ݽ�ɫ��id�õ��ý�ɫ�����еĸ�λ
	 * 
	 * @param roleId
	 *            ��ɫ��id
	 * @return �ý�ɫ�����и�λ��
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
					result += "[roleId:" + roleId + "����ʧ��.ԭ��" + e.getMessage() + "]";
				}
			}
		}
		result += "-----[������ϣ��ܹ�����" + i + "��]";
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
					result += "[roleId:" + roleId + "����ʧ��.ԭ��" + e.getMessage() + "]";
				}
			}
		}
		result += "-----[������ϣ��ܹ�����" + i + "��]";
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