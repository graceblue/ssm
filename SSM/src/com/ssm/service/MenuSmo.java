package com.ssm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.ssm.domain.BaseMenu;
import com.ssm.domain.BaseRole;

/**
 * 菜单服务层
 * 
 * @author 
 * 
 */
public interface MenuSmo
{

	/**
	 * 获取所有菜单
	 * 
	 * @return 所有菜单的列表
	 */
	public abstract List<BaseMenu> getAllMenus();

	/**
	 * 根据ID查菜单
	 * 
	 * @param menuId
	 *            需要查找的菜单ID
	 * @return 查到的菜单对象
	 */
	public abstract BaseMenu selectMenuById(String menuId);

	/**
	 * 添加菜单
	 * 
	 * @param bm
	 *            新菜单的BaseMenu对象
	 */
	public abstract void addMenu(BaseMenu bm);

	/**
	 * 更新菜单
	 * 
	 * @param bm
	 *            新菜单的BaseMenu对象
	 */
	public abstract void editMenu(BaseMenu bm);

	/**
	 * 根据父节点查子菜单
	 * 
	 * @param menuId
	 *            父节点ID
	 * @return 该父节点下所有子菜单列表
	 */
	public abstract List<BaseMenu> selectMenuByParentId(String menuId);

	public abstract List<BaseMenu> selectMenuByUserId(String menuId, String userId);

	public abstract List<BaseMenu> selecAlltMenuByUserId(String menuId, String userId);

	/**
	 * 删除菜单
	 * 
	 * @param menuId
	 *            需要删除的菜单Id
	 */
	public abstract void deleteMenu(String menuId);

	/**
	 * 角色获取对应菜单
	 * 
	 * @param roleId
	 *            根据角色ID查找对应的菜单权限列表
	 * @return 该角色拥有的菜单权限
	 */
	public abstract List<BaseMenu> getMenusByRoleId(String roleId);

	/**
	 * 批量保存角色与菜单对应关系
	 * 
	 * @param roleId
	 *            角色ID
	 * @param menuList
	 *            该角色对应的新菜单权限，做法是将原先的菜单权限全部删掉换成新的
	 */
	public abstract void saveRoleMenus(String roleId, List<String> menuList);

	/**
	 * 获取菜单类型
	 * 
	 * @return 菜单类型
	 */
	public abstract List<Map<String, String>> selectMenuType();

	/**
	 * 将无序的菜单列表转换成带层次结构的菜单
	 * 
	 * @param menuList
	 *            无序的菜单列表
	 * @return 整合过后的树形的菜单对象
	 */
	public LinkedList<BaseMenu> convertMenu(ArrayList<BaseMenu> menuList);

	/**
	 * 去重菜单，用于根据角色查出菜单后菜单项重复的情况
	 * 
	 * @param roles
	 *            去重前的菜单列表
	 * @return 去重后的菜单列表
	 */
	public ArrayList<BaseMenu> distinctMenu(List<BaseRole> roles);

	/**
	 * 获取菜单的所有父级菜单
	 * 
	 * @param menuId
	 *            菜单ID
	 * @return 递归查找到的所有父级菜单
	 */
	public abstract List<BaseMenu> getParentMenusById(String menuId);

	/**
	 * 删除角色拥有的菜单权限
	 * 
	 * @param roleId
	 *            角色ID
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
