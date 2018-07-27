package com.ssm.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BaseOrganization;
/**
 * ���������
 * 
 * @author 
 * 
 */
public interface OrgSmo
{
	/**
	 * ��ȡ���л���
	 * 
	 * @return ���л����б�
	 */
	public List<BaseOrganization> getAllOrgs();

	/**
	 * ����ORG_ID�������ϸ
	 * 
	 * @param orgId
	 *            ����ID
	 * @return ��������
	 */
	public BaseOrganization getOrgById(String orgId);

	

	/**
	 * �������
	 * 
	 * @param bo
	 *            �»�������
	 */
	public void saveOrg(BaseOrganization bo);

	/**
	 * ���û���������
	 * 
	 * @param userId
	 *            �û�ID
	 * @return �û�������������
	 */
	public BaseOrganization getOrgByUser(String userId);

	/**
	 * ��������
	 * 
	 * @return �������
	 */
	public List<HashMap<String, String>> getOrgType();

	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ������ID
	 * @return �����ӻ����б�
	 */
	public LinkedList<BaseOrganization> getOrgByParentId(String orgId);

	/**
	 * ��ȡ������
	 * 
	 * @param showId
	 *            ����ID
	 * @return �ݹ��������и���������
	 */
	public LinkedList<BaseOrganization> getParentsByOrgId(String showId);

	/**
	 * ���ݻ�������õ�����
	 * 
	 * @param orgCode
	 *            ��������
	 * @return ��������
	 */
	public BaseOrganization getOrgByOrgCode(String orgCode);

	/**
	 * ����ID��ȡ��չ����Map
	 * 
	 * @param orgId
	 *            ����
	 * @return ��չ����Map
	 */
	Map<String, String> getOrgExtentMapByOrgId(String orgId);

	/**
	 * ��ȡ�������ڵĹ�˾
	 * 
	 * @param orgId
	 *            ����
	 * @return ��˾
	 */
	public BaseOrganization getCompanyByOrg(String orgId);

	/**
	 * ��ȡ�û����ڵ�ʡ��
	 * 
	 * @param orgId
	 *            ����
	 * @return ʡ�ݶ���
	 */
	public BaseOrganization getProvinceByOrgId(String orgId);


	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ������ID
	 * @return �����ӻ����б�
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdU(String orgId);

	/**
	 * ���ݻ�ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ������ID
	 * @param userName
	 *            �û���
	 * @return �����ӻ����б�
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdDim(String orgId, String userName);

	/**
	 * ��ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ������ID
	 * @return �����ӻ����б�
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdP(String orgId);

	/**
	 * ���ݻ�ȡ�ӻ���
	 * 
	 * @param orgId
	 *            ������ID
	 * @param positionName
	 *            ��λ��
	 * @return �����ӻ����б�
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdPDim(String orgId, String positionName);

	public List<BaseOrganization> getAuthorOrg(Map<String, String> paramMap);

	public int queryBaseUser2Organization(String userAccount);

	public List<BaseOrganization> getAuthorOrgFromOA(Map<String, String> paramMap);

	public List<BaseOrganization> getOrgByParentIdFromOA(String orgId);

	public void saveBaseUser2Organization(Map<String, String> paramMap);

	public String getuserIdFromOA(String accountName);

	public String getOaDataFlag();

	public int selectUserFromOAk(String userAccount);

	public void insertBaseUserOATemp(Map<String, String> paramMap);

	public int getUserCntFromOA(Map<String, String> map);

	public BaseOrganization getOrgByIdFromOA(String orgId);

	public boolean getFinishOaDataFlag();

	public Map<String, String> getJudgeTempOrgMap(String userAccount);

	public void updateBaseUser2Organization(Map<String, String> paramMap);

	public List<String> checkTowWords(String kids);

	public String newGetOrgById(String areaId);
}
