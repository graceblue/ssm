package com.ssm.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BasePosition;
import com.ssm.domain.BaseRole;
import com.ssm.domain.BaseUser;


/**
 * 角色持久层
 * 
 * @author 
 * 
 */
public interface RoleDao 
{


	/**
	 * 根据角色的id得到该角色下所有的用户
	 * 
	 * @param roleId
	 *            角色
	 * @return 该角色下所有用户
	 */
	List<BaseUser> selectUsersByRole(@Param("roleId") String roleId);

	/**
	 * 根据角色的id得到该角色下所有的岗位
	 * 
	 * @param roleId
	 *            角色
	 * @return 该角色下所有岗位
	 */
	List<BasePosition> selectPositionsByRole(@Param("roleId") String roleId);

	/**
	 * 删除角色
	 * 
	 * @param roleId
	 *            角色
	 * @throws Exception
	 *             异常
	 */
	void deleteRole(@Param("roleId") String roleId) throws Exception;

	/**
	 * 添加角色
	 * 
	 * @param role
	 *            角色
	 */
	void addRole(BaseRole role);

	/**
	 * 更新角色
	 * 
	 * @param role
	 *            角色
	 */
	void updateRole(BaseRole role);

	/**
	 * 获取角色类型
	 * 
	 * @return 角色类型
	 */
	List<Map<String, String>> getRoleTypeList();

	/**
	 * 根据角色ID获取角色
	 * 
	 * @param roleId
	 *            角色ID
	 * @return 角色
	 */
	BaseRole getRoleById(@Param("roleId") String roleId);

	/**
	 * 获取某个用户拥有的角色
	 * 
	 * @param userId
	 * 
	 * @return 拥有的的角色
	 */
	List<BaseRole> getRolesByUser(@Param("userId") String userId);

	/**
	 * 获取某个岗位拥有的角色
	 * 
	 * @param userId
	 * 
	 * @return 拥有的的角色
	 */
	List<BaseRole> getRolesByPosition(@Param("positionId") String positionId);

	/**
	 * 删除用户角色对用关系
	 * 
	 * @param userId
	 *            用户
	 * @param roleId
	 *            角色
	 */
	void deleteUserRole(@Param("userId") String userId, @Param("roleId") String roleId);

	/**
	 * 删除岗位角色对用关系
	 * 
	 * @param positionId
	 *            岗位
	 * @param roleId
	 *            角色
	 */
	void deletePositionRole(@Param("positionId") String positionId, @Param("roleId") String roleId);

	/**
	 * 保存用户角色对应关系
	 * 
	 * @param userId
	 *            用户
	 * @param roleId
	 *            角色
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            到期时间
	 */
	void saveUserRole(@Param("userId") String userId, @Param("roleId") String roleId,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

	/**
	 * 保存岗位角色对应关系
	 * 
	 * @param positionId
	 *            岗位
	 * @param roleId
	 *            角色
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            到期时间
	 */
	void savePositionRole(@Param("positionId") String positionId, @Param("roleId") String roleId,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

	/**
	 * 获取所有角色
	 * 
	 * @return 所有角色
	 */
	List<BaseRole> getAllRoles();

	/**
	 * 批量复制权限
	 * 
	 * @param fromUserId
	 *            目标ID
	 * @param copyUserId
	 *            复制人
	 * @param copyRole
	 *            复制目标角色
	 */
	void betchInsertUserRole(@Param("fromUserId") String fromUserId, @Param("copyUserId") String[] copyUserId,
			@Param("copyRole") String[] copyRole);

	/**
	 * 批量复制权限
	 * 
	 * @param fromPositionId
	 *            目标ID
	 * @param copyPositionId
	 *            复制人
	 * @param copyRole
	 *            复制目标角色
	 */
	void betchInsertPositionRole(@Param("fromPositionId") String fromPositionId,
			@Param("copyPositionId") String[] copyPositionId, @Param("copyRole") String[] copyRole);


	/**
	 * 获取所有岗位
	 * 
	 * @return 所有岗位
	 */
	List<BasePosition> getAllPositions();

	/**
	 * 根据角色名称获取角色
	 * 
	 * @param roleName
	 *            角色名称
	 * @return 角色
	 */
	BaseRole getRoleByRoleName(@Param("roleName") String roleName);

}
