package com.ssm.domain;

import java.util.Map;

/**
 * 用户信息扩展
 * 
 * @author 
 * 
 */
public abstract class BaseUserExtend
{

	/**
	 * 将子类中的属性转换成Map，非String类型的请转化成String；如email
	 * 则map.put("email",email)，类型转换请自定�?;
	 * 
	 * @return Map
	 */
	public abstract Map<String, String> toMap();

	/**
	 * 从数据库中拿出扩展属性后，会转换成Map，本方法即从Map中解析出属�?��?��?�一赋�?�，类型转换请自定义
	 * 
	 * @param map
	 *            扩展属�??
	 * 
	 */
	public abstract void fromMap(Map<String, String> map);

}
