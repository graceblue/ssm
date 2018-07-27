package com.ssm.domain;

import java.util.Map;

/**
 * 机构的扩展类，在数据库中以纵表的形式存储
 * 
 * @author zhaoqi
 * 
 */
public abstract class BaseOrganizationExtend
{

	/**
	 * 将子类中的属性转换成Map，非String类型的请转化成String；如email
	 * 则map.put("email",email)，类型转换请自定�?;
	 * 
	 * @return Map
	 */
	public abstract Map<String, String> toMap();

	/**
	 * 从数据库中拿出扩展属性后，会转换成Map<String,String>，本方法即从Map中解析出属�?��?��?�一赋�??,类型转换请自定义�?
	 * 
	 * @param map
	 *            map
	 */
	public abstract void fromMap(Map<String, String> map);

}
