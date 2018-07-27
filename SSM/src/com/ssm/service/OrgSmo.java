package com.ssm.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BaseOrganization;
/**
 * 机构服务层
 * 
 * @author 
 * 
 */
public interface OrgSmo
{
	/**
	 * 获取所有机构
	 * 
	 * @return 所有机构列表
	 */
	public List<BaseOrganization> getAllOrgs();

	/**
	 * 根据ORG_ID查机构详细
	 * 
	 * @param orgId
	 *            机构ID
	 * @return 机构对象
	 */
	public BaseOrganization getOrgById(String orgId);

	

	/**
	 * 保存机构
	 * 
	 * @param bo
	 *            新机构对象
	 */
	public void saveOrg(BaseOrganization bo);

	/**
	 * 查用户所属机构
	 * 
	 * @param userId
	 *            用户ID
	 * @return 用户所属机构对象
	 */
	public BaseOrganization getOrgByUser(String userId);

	/**
	 * 机构类型
	 * 
	 * @return 机构类别
	 */
	public List<HashMap<String, String>> getOrgType();

	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            父机构ID
	 * @return 所有子机构列表
	 */
	public LinkedList<BaseOrganization> getOrgByParentId(String orgId);

	/**
	 * 获取父机构
	 * 
	 * @param showId
	 *            机构ID
	 * @return 递归查出的所有父机构对象
	 */
	public LinkedList<BaseOrganization> getParentsByOrgId(String showId);

	/**
	 * 根据机构编码得到机构
	 * 
	 * @param orgCode
	 *            机构编码
	 * @return 机构对象
	 */
	public BaseOrganization getOrgByOrgCode(String orgCode);

	/**
	 * 机构ID获取扩展属性Map
	 * 
	 * @param orgId
	 *            机构
	 * @return 扩展属性Map
	 */
	Map<String, String> getOrgExtentMapByOrgId(String orgId);

	/**
	 * 获取机构所在的公司
	 * 
	 * @param orgId
	 *            机构
	 * @return 公司
	 */
	public BaseOrganization getCompanyByOrg(String orgId);

	/**
	 * 获取用户所在的省份
	 * 
	 * @param orgId
	 *            机构
	 * @return 省份对象
	 */
	public BaseOrganization getProvinceByOrgId(String orgId);


	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            父机构ID
	 * @return 所有子机构列表
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdU(String orgId);

	/**
	 * 根据获取子机构
	 * 
	 * @param orgId
	 *            父机构ID
	 * @param userName
	 *            用户名
	 * @return 所有子机构列表
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdDim(String orgId, String userName);

	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            父机构ID
	 * @return 所有子机构列表
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdP(String orgId);

	/**
	 * 根据获取子机构
	 * 
	 * @param orgId
	 *            父机构ID
	 * @param positionName
	 *            岗位名
	 * @return 所有子机构列表
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
