package com.ssm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BaseMenu;
import com.ssm.domain.BaseRole;

/**
 * �˵������
 * 
 * @author 
 * 
 */
public interface MenuSmo
{

	/**
	 * ��ȡ���в˵�
	 * 
	 * @return ���в˵����б�
	 */
	public abstract List<BaseMenu> getAllMenus();

	/**
	 * ����ID��˵�
	 * 
	 * @param menuId
	 *            ��Ҫ���ҵĲ˵�ID
	 * @return �鵽�Ĳ˵�����
	 */
	public abstract BaseMenu selectMenuById(String menuId);

	/**
	 * ��Ӳ˵�
	 * 
	 * @param bm
	 *            �²˵���BaseMenu����
	 */
	public abstract void addMenu(BaseMenu bm);

	/**
	 * ���²˵�
	 * 
	 * @param bm
	 *            �²˵���BaseMenu����
	 */
	public abstract void editMenu(BaseMenu bm);

	/**
	 * ���ݸ��ڵ���Ӳ˵�
	 * 
	 * @param menuId
	 *            ���ڵ�ID
	 * @return �ø��ڵ��������Ӳ˵��б�
	 */
	public abstract List<BaseMenu> selectMenuByParentId(String menuId);

	public abstract List<BaseMenu> selectMenuByUserId(String menuId, String userId);

	public abstract List<BaseMenu> selecAlltMenuByUserId(String menuId, String userId);

	/**
	 * ɾ���˵�
	 * 
	 * @param menuId
	 *            ��Ҫɾ���Ĳ˵�Id
	 */
	public abstract void deleteMenu(String menuId);

	/**
	 * ��ɫ��ȡ��Ӧ�˵�
	 * 
	 * @param roleId
	 *            ���ݽ�ɫID���Ҷ�Ӧ�Ĳ˵�Ȩ���б�
	 * @return �ý�ɫӵ�еĲ˵�Ȩ��
	 */
	public abstract List<BaseMenu> getMenusByRoleId(String roleId);

	/**
	 * ���������ɫ��˵���Ӧ��ϵ
	 * 
	 * @param roleId
	 *            ��ɫID
	 * @param menuList
	 *            �ý�ɫ��Ӧ���²˵�Ȩ�ޣ������ǽ�ԭ�ȵĲ˵�Ȩ��ȫ��ɾ�������µ�
	 */
	public abstract void saveRoleMenus(String roleId, List<String> menuList);

	/**
	 * ��ȡ�˵�����
	 * 
	 * @return �˵�����
	 */
	public abstract List<Map<String, String>> selectMenuType();

	/**
	 * ������Ĳ˵��б�ת���ɴ���νṹ�Ĳ˵�
	 * 
	 * @param menuList
	 *            ����Ĳ˵��б�
	 * @return ���Ϲ�������εĲ˵�����
	 */
	public LinkedList<BaseMenu> convertMenu(ArrayList<BaseMenu> menuList);

	/**
	 * ȥ�ز˵������ڸ��ݽ�ɫ����˵���˵����ظ������
	 * 
	 * @param roles
	 *            ȥ��ǰ�Ĳ˵��б�
	 * @return ȥ�غ�Ĳ˵��б�
	 */
	public ArrayList<BaseMenu> distinctMenu(List<BaseRole> roles);

	/**
	 * ��ȡ�˵������и����˵�
	 * 
	 * @param menuId
	 *            �˵�ID
	 * @return �ݹ���ҵ������и����˵�
	 */
	public abstract List<BaseMenu> getParentMenusById(String menuId);

	/**
	 * ɾ����ɫӵ�еĲ˵�Ȩ��
	 * 
	 * @param roleId
	 *            ��ɫID
	 */
	public abstract void deleteRoleMenuByRole(String roleId);

	List<HashMap<String, Object>> selectHandlelistPage(HashMap<String, Object> map);

	void saveHandleInfo(HashMap<String, Object> map);

	List<HashMap<String, Object>> selectHasHandledlist(HashMap<String, Object> map);

	public List<BaseMenu> selectMenuByData(HashMap<String, Object> map);

	List<HashMap<String, Object>> selectSecHandledlist(HashMap<String, Object> map);

	List<HashMap<String, Object>> selectnewHandlelistPage(HashMap<String, Object> map);

	public abstract ArrayList<BaseMenu> getMenusByUser(String userId);
}
