package com.ssm.service;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BasePosition;
import com.ssm.domain.BaseRole;
import com.ssm.domain.BaseUser;



/**
 * ��ɫ�����
 * 
 * @author 
 * 
 */
public interface RoleSmo {


	/**
	 * ���ݽ�ɫ��id�õ��ý�ɫ�����е��û�
	 * 
	 * @param roleId
	 *            ��ɫ��id
	 * @return �ý�ɫ�������û���
	 */
	public List<BaseUser> selectUsersByRole(String roleId);

	/**
	 * ���ݽ�ɫ��id�õ��ý�ɫ�����еĸ�λ
	 * 
	 * @param roleId
	 *            ��ɫ��id
	 * @return �ý�ɫ�����и�λ��
	 */
	public List<BasePosition> selectPositionsByRole(String roleId);

	/**
	 * ɾ����ɫ
	 * 
	 * @param roleId
	 *            ��ɫID
	 * @throws Exception
	 *             �쳣
	 */
	public void deleteRole(String roleId) throws Exception;

	/**
	 * ������ɫ
	 * 
	 * @param role
	 *            �½�ɫ����
	 * @throws Exception
	 *             �쳣
	 */
	public void addRole(BaseRole role) throws Exception;

	/**
	 * ��ɫ����
	 * 
	 * @return ��ɫ����
	 */
	public List<Map<String, String>> getRoleTypeList();

	/**
	 * ��ɫID���ҽ�ɫ����
	 * 
	 * @param roleId
	 *            ��ɫID
	 * @return ��ɫ����ID
	 */
	public BaseRole getRoleById(String roleId);

	/**
	 * �༭��ɫ
	 * 
	 * @param role
	 *            �½�ɫ����
	 */
	public void editRole(BaseRole role);

	/**
	 * ��ȡĳ���û�ӵ�еĽ�ɫ
	 * 
	 * @param userId
	 *            �û�ID
	 * @return ���û�ӵ�еĽ�ɫ�б�
	 */
	public List<BaseRole> getRolesByUser(String userId);

	/**
	 * ��ȡĳ����λӵ�еĽ�ɫ
	 * 
	 * @param userId
	 *            �û�ID
	 * @return �ø�λӵ�еĽ�ɫ�б�
	 */
	public List<BaseRole> getRolesByPosition(String positionId);

	/**
	 * ����û����ɫ�Ĺ�ϵ
	 * 
	 * @param userId
	 *            �û�ID
	 * @param roleId
	 *            ��ɫID
	 */
	public void deleteUserRole(String userId, String roleId);

	/**
	 * �����λ���ɫ�Ĺ�ϵ
	 * 
	 * @param userId
	 *            �û�ID
	 * @param roleId
	 *            ��ɫID
	 */
	public void deletePositionRole(String positionId, String roleId);

	/**
	 * �����û����ɫ�Ĺ�ϵ
	 * 
	 * @param users
	 *            �û�ID
	 * @param roles
	 *            ��ɫID ���� 1,2,3,
	 * @param startDate
	 *            ע��ʱ��
	 * @param endDate
	 *            ����ʱ��
	 * @return ��ϵ
	 */
	public String saveUserRole(String[] users, String[] roles, String startDate, String endDate);

	/**
	 * �����λ���ɫ�Ĺ�ϵ
	 * 
	 * @param positions
	 *            ��λID
	 * @param roles
	 *            ��ɫID ���� 1,2,3,
	 * @param startDate
	 *            ע��ʱ��
	 * @param endDate
	 *            ����ʱ��
	 * @return ��ϵ
	 */
	public String savePositionRole(String[] positions, String[] roles, String startDate, String endDate);

	/**
	 * ��ȡ���еĽ�ɫ
	 * 
	 * @return ���еĽ�ɫ
	 */
	public List<BaseRole> getAllRoles();

	/**
	 * ���������û���ɫ
	 * 
	 * @param fromUserId
	 *            Ŀ����
	 * @param copyUserId
	 *            ����������û�ID
	 * @param copyRole
	 *            ��������Ľ�ɫID
	 */
	public void betchInsertUserRole(String fromUserId, String[] copyUserId, String[] copyRole);

	/**
	 * ���������λ��ɫ
	 * 
	 * @param fromPositionId
	 *            Ŀ����
	 * @param copyPositionId
	 *            ��������ĸ�λID
	 * @param copyRole
	 *            ��������Ľ�ɫID
	 */
	public void betchInsertPositionRole(String fromPositionId, String[] copyPositionId, String[] copyRole);

	/**
	 * ���ݽ�ɫ���û�
	 * 
	 * @param roleId
	 * @param page
	 * @return
	 */
//	public List<BaseUser> getUsersByRole(String roleId, Page page);

	/**
	 * ���ݽ�ɫ���λ
	 * 
	 * @param roleId
	 * @param page
	 * @return
	 */
//	public List<BasePosition> getPositionsByRole(String roleId, Page page);

	/**
	 * ��ȡ���еĸ�λ
	 * 
	 * @return ���еĸ�λ
	 */
	public List<BasePosition> getAllPositions();

	/**
	 * ��ɫ���Ʋ��ҽ�ɫ����
	 * 
	 * @param roleName
	 *            ��ɫ����
	 * @return ��ɫ����ID
	 */
	public BaseRole getRoleByRoleName(String roleName);


}
