package com.ssm.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BaseMenu;

public interface MenuDao {

	/**
	 * ��ȡ���в˵�
	 * 
	 * @return List
	 */
	public List<BaseMenu> getAllMenus();

	/**
	 * ��ȡMenu
	 * 
	 * @param menuId
	 *            �˵�ID menuId
	 * @return BaseMenu
	 */
	public BaseMenu selectMenuById(@Param("menuId") String menuId);

	/**
	 * �����˵�
	 * 
	 * @param bm
	 *            �˵�
	 */
	public void addMenu(BaseMenu bm);

	/**
	 * �޸Ĳ˵�
	 * 
	 * @param bm
	 *            �˵�
	 */
	public void editMenu(BaseMenu bm);

	/**
	 * ɾ���˵�
	 * 
	 * @param menuId
	 *            �˵�ID
	 * @return List
	 */
	public List<BaseMenu> selectMenuByParentId(@Param("menuId") String menuId);

	/**
	 * ɾ���˵����ɫ��ϵ
	 * 
	 * @param menuId
	 *            �˵�ID
	 */
	public void deleteRoleMenu(@Param("menuId") String menuId);

	/**
	 * ɾ���˵�
	 * 
	 * @param menuId
	 *            �˵�ID
	 */
	public void deleteMenu(@Param("menuId") String menuId);

	/**
	 * ��ȡ��ɫ��Ӧ�Ĳ˵�
	 * 
	 * @param roleId
	 *            roleId
	 * @return List
	 */
	public List<BaseMenu> getMenusByRoleId(@Param("roleId") String roleId);

	public List<BaseMenu> selectMenuByUserId(@Param("menuId") String menuId, @Param("userId") String userId);

	public List<BaseMenu> selecAlltMenuByUserId(@Param("menuId") String menuId, @Param("userId") String userId);

	/**
	 * ɾ���˵����ɫ��ϵ
	 * 
	 * @param roleId
	 *            �˵�ID
	 */
	public void deleteRoleMenuByRole(@Param("roleId") String roleId);

	/**
	 * �����ɫ��Ӧ�û�
	 * 
	 * @param saveMenus
	 *            �û���Ӧ�Ĳ˵��б�
	 */
	public void saveRoleMenus(List<Map<String, String>> saveMenus);

	/**
	 * ��ȡ�˵�����
	 * 
	 * @return �˵�����
	 */
	public List<Map<String, String>> selectMenuType();

	/**
	 * ��ȡ�˵������и����˵�
	 * 
	 * @param menuId
	 *            �˵�ID
	 * @return List
	 */
	public List<BaseMenu> getParentMenusById(@Param("menuId") String menuId);

	List<HashMap<String, Object>> selectHandlelistPage(HashMap<String, Object> map);

	void saveHandleInfo(HashMap<String, Object> map);

	List<HashMap<String, Object>> selectHasHandledlist(HashMap<String, Object> map);

	public List<BaseMenu> selectMenuByData(HashMap<String, Object> map);

	List<HashMap<String, Object>> selectSecHandledlist(HashMap<String, Object> map);

	List<HashMap<String, Object>> selectnewHandlelistPage(HashMap<String, Object> map);

	public ArrayList<BaseMenu> getMenusByUser(@Param("userId")String userId);
}