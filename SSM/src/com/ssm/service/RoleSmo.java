package com.ssm.service;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BasePosition;
import com.ssm.domain.BaseRole;
import com.ssm.domain.BaseUser;



/**
 * 角色服务层
 * 
 * @author 
 * 
 */
public interface RoleSmo {


	/**
	 * 根据角色的id得到该角色下所有的用户
	 * 
	 * @param roleId
	 *            角色的id
	 * @return 该角色下所有用户的
	 */
	public List<BaseUser> selectUsersByRole(String roleId);

	/**
	 * 根据角色的id得到该角色下所有的岗位
	 * 
	 * @param roleId
	 *            角色的id
	 * @return 该角色下所有岗位的
	 */
	public List<BasePosition> selectPositionsByRole(String roleId);

	/**
	 * 删除角色
	 * 
	 * @param roleId
	 *            角色ID
	 * @throws Exception
	 *             异常
	 */
	public void deleteRole(String roleId) throws Exception;

	/**
	 * 新增角色
	 * 
	 * @param role
	 *            新角色对象
	 * @throws Exception
	 *             异常
	 */
	public void addRole(BaseRole role) throws Exception;

	/**
	 * 角色类型
	 * 
	 * @return 角色类型
	 */
	public List<Map<String, String>> getRoleTypeList();

	/**
	 * 角色ID查找角色对象
	 * 
	 * @param roleId
	 *            角色ID
	 * @return 角色对象ID
	 */
	public BaseRole getRoleById(String roleId);

	/**
	 * 编辑角色
	 * 
	 * @param role
	 *            新角色对象
	 */
	public void editRole(BaseRole role);

	/**
	 * 获取某个用户拥有的角色
	 * 
	 * @param userId
	 *            用户ID
	 * @return 该用户拥有的角色列表
	 */
	public List<BaseRole> getRolesByUser(String userId);

	/**
	 * 获取某个岗位拥有的角色
	 * 
	 * @param userId
	 *            用户ID
	 * @return 该岗位拥有的角色列表
	 */
	public List<BaseRole> getRolesByPosition(String positionId);

	/**
	 * 清除用户与角色的关系
	 * 
	 * @param userId
	 *            用户ID
	 * @param roleId
	 *            角色ID
	 */
	public void deleteUserRole(String userId, String roleId);

	/**
	 * 清除岗位与角色的关系
	 * 
	 * @param userId
	 *            用户ID
	 * @param roleId
	 *            角色ID
	 */
	public void deletePositionRole(String positionId, String roleId);

	/**
	 * 保存用户与角色的关系
	 * 
	 * @param users
	 *            用户ID
	 * @param roles
	 *            角色ID 数组 1,2,3,
	 * @param startDate
	 *            注册时间
	 * @param endDate
	 *            到期时间
	 * @return 关系
	 */
	public String saveUserRole(String[] users, String[] roles, String startDate, String endDate);

	/**
	 * 保存岗位与角色的关系
	 * 
	 * @param positions
	 *            岗位ID
	 * @param roles
	 *            角色ID 数组 1,2,3,
	 * @param startDate
	 *            注册时间
	 * @param endDate
	 *            到期时间
	 * @return 关系
	 */
	public String savePositionRole(String[] positions, String[] roles, String startDate, String endDate);

	/**
	 * 获取所有的角色
	 * 
	 * @return 所有的角色
	 */
	public List<BaseRole> getAllRoles();

	/**
	 * 批量插入用户角色
	 * 
	 * @param fromUserId
	 *            目标人
	 * @param copyUserId
	 *            批量插入的用户ID
	 * @param copyRole
	 *            批量插入的角色ID
	 */
	public void betchInsertUserRole(String fromUserId, String[] copyUserId, String[] copyRole);

	/**
	 * 批量插入岗位角色
	 * 
	 * @param fromPositionId
	 *            目标人
	 * @param copyPositionId
	 *            批量插入的岗位ID
	 * @param copyRole
	 *            批量插入的角色ID
	 */
	public void betchInsertPositionRole(String fromPositionId, String[] copyPositionId, String[] copyRole);

	/**
	 * 根据角色查用户
	 * 
	 * @param roleId
	 * @param page
	 * @return
	 */
//	public List<BaseUser> getUsersByRole(String roleId, Page page);

	/**
	 * 根据角色查岗位
	 * 
	 * @param roleId
	 * @param page
	 * @return
	 */
//	public List<BasePosition> getPositionsByRole(String roleId, Page page);

	/**
	 * 获取所有的岗位
	 * 
	 * @return 所有的岗位
	 */
	public List<BasePosition> getAllPositions();

	/**
	 * 角色名称查找角色对象
	 * 
	 * @param roleName
	 *            角色名称
	 * @return 角色对象ID
	 */
	public BaseRole getRoleByRoleName(String roleName);


}
