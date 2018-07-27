package com.ssm.mapper;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BaseOrganization;

public interface OrgDao {
	/**
	 * 获取所有组织架构
	 * 
	 * @return List
	 */
	public List<BaseOrganization> getAllOrgs();

	/**
	 * 根据主键查机构
	 * 
	 * @param orgId
	 *            主键
	 * @return 机构
	 */
	public BaseOrganization getOrgById(@Param("orgId") String orgId);


	/**
	 * 保存机构
	 * 
	 * @param bo
	 *            机构
	 */
	public void saveOrg(BaseOrganization bo);

	/**
	 * 查用户机构
	 * 
	 * @param userId
	 *            用户
	 * @return 机构
	 */
	public BaseOrganization getOrgByUser(@Param("userId") String userId);

	/**
	 * 机构类型
	 * 
	 * @return 机构类型
	 */
	public List<HashMap<String, String>> getOrgType();

	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            机构
	 * @return 子机构
	 */
	public LinkedList<BaseOrganization> getOrgByParentId(@Param("orgId") String orgId);

	/**
	 * 获取父机构
	 * 
	 * @param showId
	 *            机构
	 * @return 父机构
	 */
	public LinkedList<BaseOrganization> getParentsByOrgId(@Param("showId") String showId);

	/**
	 * 根据机构编码得到机构
	 * 
	 * @param orgCode
	 *            机构编码
	 * @return 机构
	 */
	public BaseOrganization getOrgByOrgCode(@Param("orgCode") String orgCode);

	/**
	 * 保存机构的扩展信息
	 * 
	 * @param extedsProperties
	 *            扩展信息
	 */
	public void saveOrgExtends(List<Map<String, String>> extedsProperties);

	/**
	 * 更新机构
	 * 
	 * @param bo
	 *            机构
	 */
	public void updateOrg(BaseOrganization bo);

	/**
	 * 更新机构扩展
	 * 
	 * @param map
	 *            机构扩展
	 */
	public void updateOrgExtends(Map<String, String> map);

	/**
	 * 获取机构扩展
	 * 
	 * @param orgId
	 *            机构ID
	 * @return 机构纵表数据
	 */
	public List<Map> getOrgExtentByOrgId(String orgId);

	/**
	 * 获取机构所在公司
	 * 
	 * @param orgId
	 *            机构
	 * @return 所在公司
	 */
	public BaseOrganization getCompanyByOrg(@Param("orgId") String orgId);

	/**
	 * 获取机构所在省份
	 * 
	 * @param orgId
	 *            机构
	 * @return 公司
	 */
	public BaseOrganization getProvinceByOrgId(@Param("orgId") String orgId);


	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            机构
	 * @return 子机构
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdU(@Param("orgId") String orgId);

	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            机构
	 * @param userName
	 *            用户名
	 * @return 子机构
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdDim(@Param("orgId") String orgId,
			@Param("userName") String userName);

	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            机构
	 * @return 子机构
	 */
	public LinkedList<BaseOrganization> getOrgByParentIdP(@Param("orgId") String orgId);

	/**
	 * 获取子机构
	 * 
	 * @param orgId
	 *            机构
	 * @param positionName
	 *            岗位名
	 * @return 子机构
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