package com.ssm.domain;

import java.util.Date;
import java.util.List;

public class BasePosition {
	private Long positionId;

	private String positionCode;

	private String positionName;

	private String positionFullName;

	private String positionTypeCd;

	private String positionDesc;

	private Short isDelete;

	private String orgName;

	private Date createTime;// 岗位注册时间（只有用户关联岗位的时候可用,表示某用户对该岗位的使用时限）

	private String positionTypeCdName;// 岗位类型名称

	private String createOpName;// 岗位创建人

	private String areaName;// 岗位所在地区

	private String userCount = "0"; // 岗位下面人数

	/**
	 * @Description
	 * @return
	 */
	public String getUserCount()
	{

		return userCount;
	}

	/**
	 * @param userCount
	 */
	public void setUserCount(String userCount)
	{

		this.userCount = userCount;
	}

	public String getPositionTypeCdName()
	{
		return positionTypeCdName;
	}

	public void setPositionTypeCdName(String positionTypeCdName)
	{
		this.positionTypeCdName = positionTypeCdName;
	}

	public String getCreateOpName()
	{
		return createOpName;
	}

	public void setCreateOpName(String createOpName)
	{
		this.createOpName = createOpName;
	}

	public Date getCreateTime()
	{
		return createTime;
	}

	public void setCreateTime(Date createTime)
	{
		this.createTime = createTime;
	}

	private BaseOrganization org;// 岗位所属机构

	private BaseOrganization company;// 岗位所属公司

	private List<BaseRole> roles;// 岗位拥有的角色

	public Long getPositionId()
	{
		return positionId;
	}

	public void setPositionId(Long positionId)
	{
		this.positionId = positionId;
	}

	public String getPositionCode()
	{
		return positionCode;
	}

	public void setPositionCode(String positionCode)
	{
		this.positionCode = positionCode;
	}

	public String getPositionName()
	{
		return positionName;
	}

	public void setPositionName(String positionName)
	{
		this.positionName = positionName;
	}

	public String getPositionFullName()
	{
		return positionFullName;
	}

	public void setPositionFullName(String positionFullName)
	{
		this.positionFullName = positionFullName;
	}

	public String getPositionTypeCd()
	{
		return positionTypeCd;
	}

	public void setPositionTypeCd(String positionTypeCd)
	{
		this.positionTypeCd = positionTypeCd;
	}

	public String getPositionDesc()
	{
		return positionDesc;
	}

	public void setPositionDesc(String positionDesc)
	{
		this.positionDesc = positionDesc;
	}

	public Short getIsDelete()
	{
		return isDelete;
	}

	public void setIsDelete(Short isDelete)
	{
		this.isDelete = isDelete;
	}

	public BaseOrganization getOrg()
	{
		return org;
	}

	public void setOrg(BaseOrganization org)
	{
		this.org = org;
	}

	public BaseOrganization getCompany()
	{
		return company;
	}

	public void setCompany(BaseOrganization company)
	{
		this.company = company;
	}

	public List<BaseRole> getRoles()
	{
		return roles;
	}

	public void setRoles(List<BaseRole> roles)
	{
		this.roles = roles;
	}

	public String getOrgName()
	{
		return orgName;
	}

	public void setOrgName(String orgName)
	{
		this.orgName = orgName;
	}

	public String getAreaName()
	{
		return areaName;
	}

	public void setAreaName(String areaName)
	{
		this.areaName = areaName;
	}


}
