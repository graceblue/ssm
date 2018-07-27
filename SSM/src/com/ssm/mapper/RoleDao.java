package com.ssm.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BasePosition;
import com.ssm.domain.BaseRole;
import com.ssm.domain.BaseUser;


/**
 * ��ɫ�־ò�
 * 
 * @author 
 * 
 */
public interface RoleDao 
{


	/**
	 * ���ݽ�ɫ��id�õ��ý�ɫ�����е��û�
	 * 
	 * @param roleId
	 *            ��ɫ
	 * @return �ý�ɫ�������û�
	 */
	List<BaseUser> selectUsersByRole(@Param("roleId") String roleId);

	/**
	 * ���ݽ�ɫ��id�õ��ý�ɫ�����еĸ�λ
	 * 
	 * @param roleId
	 *            ��ɫ
	 * @return �ý�ɫ�����и�λ
	 */
	List<BasePosition> selectPositionsByRole(@Param("roleId") String roleId);

	/**
	 * ɾ����ɫ
	 * 
	 * @param roleId
	 *            ��ɫ
	 * @throws Exception
	 *             �쳣
	 */
	void deleteRole(@Param("roleId") String roleId) throws Exception;

	/**
	 * ��ӽ�ɫ
	 * 
	 * @param role
	 *            ��ɫ
	 */
	void addRole(BaseRole role);

	/**
	 * ���½�ɫ
	 * 
	 * @param role
	 *            ��ɫ
	 */
	void updateRole(BaseRole role);

	/**
	 * ��ȡ��ɫ����
	 * 
	 * @return ��ɫ����
	 */
	List<Map<String, String>> getRoleTypeList();

	/**
	 * ���ݽ�ɫID��ȡ��ɫ
	 * 
	 * @param roleId
	 *            ��ɫID
	 * @return ��ɫ
	 */
	BaseRole getRoleById(@Param("roleId") String roleId);

	/**
	 * ��ȡĳ���û�ӵ�еĽ�ɫ
	 * 
	 * @param userId
	 * 
	 * @return ӵ�еĵĽ�ɫ
	 */
	List<BaseRole> getRolesByUser(@Param("userId") String userId);

	/**
	 * ��ȡĳ����λӵ�еĽ�ɫ
	 * 
	 * @param userId
	 * 
	 * @return ӵ�еĵĽ�ɫ
	 */
	List<BaseRole> getRolesByPosition(@Param("positionId") String positionId);

	/**
	 * ɾ���û���ɫ���ù�ϵ
	 * 
	 * @param userId
	 *            �û�
	 * @param roleId
	 *            ��ɫ
	 */
	void deleteUserRole(@Param("userId") String userId, @Param("roleId") String roleId);

	/**
	 * ɾ����λ��ɫ���ù�ϵ
	 * 
	 * @param positionId
	 *            ��λ
	 * @param roleId
	 *            ��ɫ
	 */
	void deletePositionRole(@Param("positionId") String positionId, @Param("roleId") String roleId);

	/**
	 * �����û���ɫ��Ӧ��ϵ
	 * 
	 * @param userId
	 *            �û�
	 * @param roleId
	 *            ��ɫ
	 * @param startDate
	 *            ��ʼʱ��
	 * @param endDate
	 *            ����ʱ��
	 */
	void saveUserRole(@Param("userId") String userId, @Param("roleId") String roleId,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

	/**
	 * �����λ��ɫ��Ӧ��ϵ
	 * 
	 * @param positionId
	 *            ��λ
	 * @param roleId
	 *            ��ɫ
	 * @param startDate
	 *            ��ʼʱ��
	 * @param endDate
	 *            ����ʱ��
	 */
	void savePositionRole(@Param("positionId") String positionId, @Param("roleId") String roleId,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

	/**
	 * ��ȡ���н�ɫ
	 * 
	 * @return ���н�ɫ
	 */
	List<BaseRole> getAllRoles();

	/**
	 * ��������Ȩ��
	 * 
	 * @param fromUserId
	 *            Ŀ��ID
	 * @param copyUserId
	 *            ������
	 * @param copyRole
	 *            ����Ŀ���ɫ
	 */
	void betchInsertUserRole(@Param("fromUserId") String fromUserId, @Param("copyUserId") String[] copyUserId,
			@Param("copyRole") String[] copyRole);

	/**
	 * ��������Ȩ��
	 * 
	 * @param fromPositionId
	 *            Ŀ��ID
	 * @param copyPositionId
	 *            ������
	 * @param copyRole
	 *            ����Ŀ���ɫ
	 */
	void betchInsertPositionRole(@Param("fromPositionId") String fromPositionId,
			@Param("copyPositionId") String[] copyPositionId, @Param("copyRole") String[] copyRole);


	/**
	 * ��ȡ���и�λ
	 * 
	 * @return ���и�λ
	 */
	List<BasePosition> getAllPositions();

	/**
	 * ���ݽ�ɫ���ƻ�ȡ��ɫ
	 * 
	 * @param roleName
	 *            ��ɫ����
	 * @return ��ɫ
	 */
	BaseRole getRoleByRoleName(@Param("roleName") String roleName);

}
