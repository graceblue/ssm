package com.ssm.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ssm.domain.BaseMenu;

public interface MenuDao {

	/**
	 * 获取所有菜单
	 * 
	 * @return List
	 */
	public List<BaseMenu> getAllMenus();

	/**
	 * 获取Menu
	 * 
	 * @param menuId
	 *            菜单ID menuId
	 * @return BaseMenu
	 */
	public BaseMenu selectMenuById(@Param("menuId") String menuId);

	/**
	 * 新增菜单
	 * 
	 * @param bm
	 *            菜单
	 */
	public void addMenu(BaseMenu bm);

	/**
	 * 修改菜单
	 * 
	 * @param bm
	 *            菜单
	 */
	public void editMenu(BaseMenu bm);

	/**
	 * 删除菜单
	 * 
	 * @param menuId
	 *            菜单ID
	 * @return List
	 */
	public List<BaseMenu> selectMenuByParentId(@Param("menuId") String menuId);

	/**
	 * 删除菜单与角色关系
	 * 
	 * @param menuId
	 *            菜单ID
	 */
	public void deleteRoleMenu(@Param("menuId") String menuId);

	/**
	 * 删除菜单
	 * 
	 * @param menuId
	 *            菜单ID
	 */
	public void deleteMenu(@Param("menuId") String menuId);

	/**
	 * 获取角色对应的菜单
	 * 
	 * @param roleId
	 *            roleId
	 * @return List
	 */
	public List<BaseMenu> getMenusByRoleId(@Param("roleId") String roleId);

	public List<BaseMenu> selectMenuByUserId(@Param("menuId") String menuId, @Param("userId") String userId);

	public List<BaseMenu> selecAlltMenuByUserId(@Param("menuId") String menuId, @Param("userId") String userId);

	/**
	 * 删除菜单与角色关系
	 * 
	 * @param roleId
	 *            菜单ID
	 */
	public void deleteRoleMenuByRole(@Param("roleId") String roleId);

	/**
	 * 保存角色对应用户
	 * 
	 * @param saveMenus
	 *            用户对应的菜单列表
	 */
	public void saveRoleMenus(List<Map<String, String>> saveMenus);

	/**
	 * 获取菜单类型
	 * 
	 * @return 菜单类型
	 */
	public List<Map<String, String>> selectMenuType();

	/**
	 * 获取菜单的所有父级菜单
	 * 
	 * @param menuId
	 *            菜单ID
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