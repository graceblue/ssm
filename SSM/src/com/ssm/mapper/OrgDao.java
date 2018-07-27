package com.ssm.mapper;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BaseOrganization;

public interface OrgDao {
	/**
	 * ��ȡ������֯�ܹ�
	 * 
	 * @return List
	 */
	public List<BaseOrganization> getAllOrgs();

	/**
	 * �������������
	 * 
	 * @param orgId
	 *            ����
	 * @return ����
	 */
	public BaseOrganization getOrgById(@Param("orgId") String orgId);


	/**
	 * �������
	 * 
	 * @param bo
	 *            ����
	 */
	public void saveOrg(BaseOrganization bo);

	/**
	 * ���û�����
	 * 
	 * @param userId
	 *            �û�
	 * @return ����
	 */
	public BaseOrganization getOrgByUser(@Param("userId") String userId);

	/**
	 * ��������
	 * 
	 * @return ��������
	 */
	public List<HashMap<String, String>> getOrgType();

	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ����
	 * @return �ӻ���
	 */
	public LinkedList<BaseOrganization> getOrgByParentId(@Param("orgId") String orgId);

	/**
	 * ��ȡ������
	 * 
	 * @param showId
	 *            ����
	 * @return ������
	 */
	public LinkedList<BaseOrganization> getParentsByOrgId(@Param("showId") String showId);

	/**
	 * ���ݻ�������õ�����
	 * 
	 * @param orgCode
	 *            ��������
	 * @return ����
	 */
	public BaseOrganization getOrgByOrgCode(@Param("orgCode") String orgCode);

	/**
	 * �����������չ��Ϣ
	 * 
	 * @param extedsProperties
	 *            ��չ��Ϣ
	 */
	public void saveOrgExtends(List<Map<String, String>> extedsProperties);

	/**
	 * ���»���
	 * 
	 * @param bo
	 *            ����
	 */
	public void updateOrg(BaseOrganization bo);

	/**
	 * ���»�����չ
	 * 
	 * @param map
	 *            ������չ
	 */
	public void updateOrgExtends(Map<String, String> map);

	/**
	 * ��ȡ������չ
	 * 
	 * @param orgId
	 *            ����ID
	 * @return �����ݱ�����
	 */
	public List<Map> getOrgExtentByOrgId(String orgId);

	/**
	 * ��ȡ�������ڹ�˾
	 * 
	 * @param orgId
	 *            ����
	 * @return ���ڹ�˾
	 */
	public BaseOrganization getCompanyByOrg(@Param("orgId") String orgId);

	/**
	 * ��ȡ��������ʡ��
	 * 
	 * @param orgId
	 *            ����
	 * @return ��˾
	 */
	public BaseOrganization getProvinceByOrgId(@Param("orgId") String orgId);


	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ����
	 * @return �ӻ���
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdU(@Param("orgId") String orgId);

	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ����
	 * @param userName
	 *            �û���
	 * @return �ӻ���
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdDim(@Param("orgId") String orgId,
			@Param("userName") String userName);

	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ����
	 * @return �ӻ���
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdP(@Param("orgId") String orgId);

	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ����
	 * @param positionName
	 *            ��λ��
	 * @return �ӻ���
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdPDim(@Param("orgId") String orgId,
			@Param("positionName") String positionName);

	public List<BaseOrganization> getAuthorOrg(Map<String, String> paramMap);

	public int queryBaseUser2Organization(@Param("userAccount") String userAccount);

	public List<BaseOrganization> getAuthorOrgFromOA(Map<String, String> paramMap);

	public List<BaseOrganization> getOrgByParentIdFromOA(@Param("orgId") String orgId);

	public void saveBaseUser2Organization(Map<String, String> paramMap);

	public String getuserIdFromOA(@Param("accountName") String accountName);

	public String getOaDataFlag();

	public int selectUserFromOAk(@Param("userAccount") String userAccount);

	public void insertBaseUserOATemp(Map<String, String> paramMap);

	public int getUserCntFromOA(Map<String, String> paramMap);

	public void updateBaseUserOATemp(Map<String, String> paramMap);

	public BaseOrganization getOrgByIdFromOA(@Param("orgId") String orgId);

	public String getOaFinishDataFlag();

	public Map<String, String> getJudgeTempOrgMap(@Param("userAccount") String userAccount);

	public void updateBaseUser2Organization(Map<String, String> paramMap);

	public List<String> checkTowWords(String kids);

	public String newGetOrgById(@Param("areaId") String areaId);

}