package com.ssm.domain;

import java.util.Date;
import java.util.List;

public class BaseUser  implements java.io.Serializable{

		private static final long serialVersionUID = 1L;
		/**
		 * �û�ID
		 */
		private String userId; // �û�ID

		/**
		 * �û�����
		 */
		private String userName; // �û�����

		/**
		 * ��������
		 */
		private String orgName; // ��������

		/**
		 * �˺�
		 */
		private String accountName; // �˺�

		/**
		 * ����
		 */
		private String accountPasswordCd; // ����

		/**
		 * �û�״̬
		 */
		private String userStateCd; // �û�״̬

		/**
		 * ��ʾ˳��
		 */
		private String showOrderNo; // ��ʾ˳��

		/**
		 * �Ƿ��߼�ɾ��
		 */
		private String isDelete; // �Ƿ��߼�ɾ��

		/**
		 * ���֤��
		 */
		private String identityId; // ���֤��

		/**
		 * �Ա�
		 */
		private String gender; // �Ա�

		/**
		 * ����
		 */
		private String age; // ����

		/**
		 * ��ϵ�绰
		 */
		private String phoneNumber; // ��ϵ�绰

		/**
		 * EMAIL
		 */
		private String email; // EMAIL

		/**
		 * ����
		 */
		private String description;// ����

		/**
		 * �û�������λ
		 */
		private BasePosition position;// �û�������λ

		/**
		 * �û���������
		 */
		private BaseOrganization org;// �û���������

		/**
		 * �û�������˾
		 */
		private BaseOrganization company;// �û�������˾

		/**
		 * �û�ӵ�еĽ�ɫ
		 */
		private List<BaseRole> roles;// �û�ӵ�еĽ�ɫ

		/**
		 * �û�ӵ�е�����ά��Ȩ��
		 */
		private List dataPermission;// �û�ӵ�е�����ά��Ȩ��

		/**
		 * �û�ע���λʱ��
		 */
		private Date createTime;// �û�ע���λʱ��

		/**
		 * �û����ڵ���
		 */
		private String areaName;

		private String areaId;
		// ά������
		private String protect;
		// רҵ
		private String major;
		// ��ɫ
		private String roler;

		/**
		 * ������ʶ
		 */
		private String produceScene;

		/**
		 * �����ʶ
		 */
		private String manageScene;
		/**
		 * �´��޸�ʱ��
		 */
		private String nextUpdateTime;

		public String getProduceScene()
		{
			return produceScene;
		}

		public void setProduceScene(String produceScene)
		{
			this.produceScene = produceScene;
		}

		public String getManageScene()
		{
			return manageScene;
		}

		public void setManageScene(String manageScene)
		{
			this.manageScene = manageScene;
		}

		public String getProtect()
		{
			return protect;
		}

		public void setProtect(String protect)
		{
			this.protect = protect;
		}

		public String getMajor()
		{
			return major;
		}

		public void setMajor(String major)
		{
			this.major = major;
		}

		public String getRoler()
		{
			return roler;
		}

		public void setRoler(String roler)
		{
			this.roler = roler;
		}

		public Date getCreateTime()
		{
			return createTime;
		}

		public void setCreateTime(Date createTime)
		{
			this.createTime = createTime;
		}

		/**
		 * �û���չ
		 */
		private BaseUserExtend userExtend;

		public List<BaseRole> getRoles()
		{
			return roles;
		}

		public void setRoles(List<BaseRole> roles)
		{
			this.roles = roles;
		}

		public List getDataPermission()
		{
			return dataPermission;
		}

		public void setDataPermission(List dataPermission)
		{
			this.dataPermission = dataPermission;
		}

		public String getUserId()
		{
			return userId;
		}

		public void setUserId(String userId)
		{
			this.userId = userId;
		}

		public String getUserName()
		{
			return userName;
		}

		public void setUserName(String userName)
		{
			this.userName = userName;
		}

		public String getAccountName()
		{
			return accountName;
		}

		public void setAccountName(String accountName)
		{
			this.accountName = accountName;
		}

		public String getAccountPasswordCd()
		{
			return accountPasswordCd;
		}

		public void setAccountPasswordCd(String accountPasswordCd)
		{
			this.accountPasswordCd = accountPasswordCd;
		}

		public String getUserStateCd()
		{
			return userStateCd;
		}

		public void setUserStateCd(String userStateCd)
		{
			this.userStateCd = userStateCd;
		}

		public String getShowOrderNo()
		{
			return showOrderNo;
		}

		public void setShowOrderNo(String showOrderNo)
		{
			this.showOrderNo = showOrderNo;
		}

		public String getIsDelete()
		{
			return isDelete;
		}

		public void setIsDelete(String isDelete)
		{
			this.isDelete = isDelete;
		}

		public String getIdentityId()
		{
			return identityId;
		}

		public String getGender()
		{
			return gender;
		}

		public void setGender(String gender)
		{
			this.gender = gender;
		}

		public String getAge()
		{
			return age;
		}

		public void setAge(String age)
		{
			this.age = age;
		}

		public String getPhoneNumber()
		{
			return phoneNumber;
		}

		public void setPhoneNumber(String phoneNumber)
		{
			this.phoneNumber = phoneNumber;
		}

		public String getEmail()
		{
			return email;
		}

		public void setEmail(String email)
		{
			this.email = email;
		}

		public String getDescription()
		{
			return description;
		}

		public void setDescription(String description)
		{
			this.description = description;
		}

		public void setIdentityId(String identityId)
		{
			this.identityId = identityId;
		}

		public BasePosition getPosition()
		{
			return position;
		}

		public void setPosition(BasePosition position)
		{
			this.position = position;
		}

		public BaseOrganization getOrg()
		{
			return org;
		}

		public void setOrg(BaseOrganization org)
		{
			this.org = org;
		}

		public BaseUserExtend getUserExtend()
		{
			return userExtend;
		}

		public void setUserExtend(BaseUserExtend userExtend)
		{
			this.userExtend = userExtend;
		}

		public BaseOrganization getCompany()
		{
			return company;
		}

		public void setCompany(BaseOrganization company)
		{
			this.company = company;
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

		public String getAreaId()
		{
			return areaId;
		}

		public void setAreaId(String areaId)
		{
			this.areaId = areaId;
		}

		public String getNextUpdateTime()
		{
			return nextUpdateTime;
		}

		public void setNextUpdateTime(String nextUpdateTime)
		{
			this.nextUpdateTime = nextUpdateTime;
		}

}
