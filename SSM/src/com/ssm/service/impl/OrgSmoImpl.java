package com.ssm.service.impl;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssm.domain.BaseOrganization;
import com.ssm.mapper.OrgDao;
import com.ssm.service.OrgSmo;



/**
 * 机构服务层
 * 
 * @author zhaoqi
 * 
 */
@Service
public class OrgSmoImpl implements OrgSmo
{
	/**
	 * 机构持久对象
	 */
	@Resource
	private OrgDao orgDao;

	@Override
	public List<BaseOrganization> getAllOrgs()
	{
		return orgDao.getAllOrgs();
	}

	@Override
	public BaseOrganization getOrgById(String orgId)
	{
		BaseOrganization bo = orgDao.getOrgById(orgId);

		return bo;
	}

	@Override
	public Map<String, String> getOrgExtentMapByOrgId(String orgId)
	{
		// 查询扩展信息
		List<Map> boExt = orgDao.getOrgExtentByOrgId(orgId);

		Map<String, String> map = new HashMap<String, String>();
		if (boExt != null)
		{
			for (Map m : boExt)
			{
				map.put(String.valueOf(m.get("PROP_CODE")), String.valueOf(m.get("PROPERTY_VALUE")));
			}
		}
		return map;
	}





	@Override
	public void saveOrg(BaseOrganization bo)
	{
		BaseOrganization bo1 = new BaseOrganization();


	}

	@Override
	public BaseOrganization getOrgByUser(String userId)
	{
		return orgDao.getOrgByUser(userId);
	}

	@Override
	public List<HashMap<String, String>> getOrgType()
	{
		return orgDao.getOrgType();
	}

	@Override
	public LinkedList<BaseOrganization> getOrgByParentId(String orgId)
	{
		return orgDao.getOrgByParentId(orgId);
	}

	@Override
	public LinkedList<BaseOrganization> getParentsByOrgId(String showId)
	{
		return orgDao.getParentsByOrgId(showId);
	}

	@Override
	public BaseOrganization getOrgByOrgCode(String orgCode)
	{
		return orgDao.getOrgByOrgCode(orgCode);
	}

	@Override
	public BaseOrganization getCompanyByOrg(String orgId)
	{
		return orgDao.getCompanyByOrg(orgId);
	}

	@Override
	public BaseOrganization getProvinceByOrgId(String orgId)
	{
		return orgDao.getProvinceByOrgId(orgId);
	}




	@Override
	public LinkedList<BaseOrganization> getOrgByParentIdU(String orgId)
	{
		return orgDao.getOrgByParentIdU(orgId);
	}

	@Override
	public LinkedList<BaseOrganization> getOrgByParentIdDim(String orgId, String userName)
	{
		// TODO Auto-generated method stub
		return orgDao.getOrgByParentIdDim(orgId, userName);
	}

	@Override
	public LinkedList<BaseOrganization> getOrgByParentIdP(String orgId)
	{
		return orgDao.getOrgByParentIdP(orgId);
	}

	@Override
	public LinkedList<BaseOrganization> getOrgByParentIdPDim(String orgId, String positionName)
	{
		// TODO Auto-generated method stub
		return orgDao.getOrgByParentIdPDim(orgId, positionName);
	}

	@Override
	public List<BaseOrganization> getAuthorOrg(Map<String, String> paramMap)
	{
		return orgDao.getAuthorOrg(paramMap);
	}

	@Override
	public int queryBaseUser2Organization(String userAccount)
	{
		return orgDao.queryBaseUser2Organization(userAccount);
	}

	@Override
	public List<BaseOrganization> getAuthorOrgFromOA(Map<String, String> paramMap)
	{
		return orgDao.getAuthorOrgFromOA(paramMap);
	}

	@Override
	public List<BaseOrganization> getOrgByParentIdFromOA(String orgId)
	{
		return orgDao.getOrgByParentIdFromOA(orgId);
	}

	@Override
	public void saveBaseUser2Organization(Map<String, String> paramMap)
	{
		// 判断用户在基准表是否存在
		String userId = orgDao.getuserIdFromOA(paramMap.get("accountName"));
		// 基准没有数据则更新临时表
		if (userId == null)
		{
			paramMap.put("userId", paramMap.get("ywUserId"));
			orgDao.insertBaseUserOATemp(paramMap);
		}
		// 基准表有数据则新增人员组织关系数据
		else
		{
			orgDao.saveBaseUser2Organization(paramMap);
		}
	}

	@Override
	public String getuserIdFromOA(String accountName)
	{
		return orgDao.getuserIdFromOA(accountName);
	}

	@Override
	public String getOaDataFlag()
	{
		return orgDao.getOaDataFlag();
	}

	@Override
	public int selectUserFromOAk(String userAccount)
	{
		return orgDao.selectUserFromOAk(userAccount);
	}

	@Override
	public void insertBaseUserOATemp(Map<String, String> paramMap)
	{
		orgDao.insertBaseUserOATemp(paramMap);
	}

	@Override
	public int getUserCntFromOA(Map<String, String> map)
	{
		// TODO Auto-generated method stub
		return orgDao.getUserCntFromOA(map);
	}

	@Override
	public BaseOrganization getOrgByIdFromOA(String orgId)
	{
		BaseOrganization bo = orgDao.getOrgByIdFromOA(orgId);

		return bo;
	}

	@Override
	public boolean getFinishOaDataFlag()
	{
		boolean resultFlag = true;
		String flag = orgDao.getOaFinishDataFlag();
		if ("N".equals(flag))
		{
			resultFlag = false;
		}
		return resultFlag;
	}

	@Override
	public Map<String, String> getJudgeTempOrgMap(String userAccount)
	{
		return orgDao.getJudgeTempOrgMap(userAccount);
	}

	@Override
	public void updateBaseUser2Organization(Map<String, String> paramMap)
	{
		orgDao.updateBaseUser2Organization(paramMap);
	}

	@Override
	public List<String> checkTowWords(String kids)
	{
		return orgDao.checkTowWords(kids);
	}

	@Override
	public String newGetOrgById(String areaId)
	{
		return orgDao.newGetOrgById(areaId);
	}

}