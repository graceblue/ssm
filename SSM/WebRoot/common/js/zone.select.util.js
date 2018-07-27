/**
 * JS UTIL 罗伟
 */



/**全局变量 几级联动**/
var g_num=0;

/**
 * 动态构建联动选择样式
 * 
 * @param num 几级联动 如3 表示3级联动
 * @param 父元素ID
 * @param class1 样式1 （不同页面样式都会不同，所以这里动态赋予class属性）
 * @param class2 样式2
 */
function initZone(num, brotherId, class1, class2, class3, class4){
	g_num=num;
	initPrimaryFrame(brotherId, class1, class2);
	
	var str="";
	var divstrs="";
	
	for(var i=1; i<=num; i++){
		if(1==i){
			str+=
				'<a id="a_id_'+i+'" class="cur" href="javascript:void(0)">'+
					'<b id="b_'+i+'" onclick="selectNode('+i+')">请选择</b>'+
					'<i></i>'+
				'</a>';
			divstrs+=
				'<div id="d_'+i+'" class="gct-s" style="display: block;"></div>';
		}else{
			str+=
				'<a id="a_id_'+i+'" href="javascript:void(0)">'+
					'<b id="b_'+i+'" onclick="selectNode('+i+')">请选择</b>'+
					'<i></i>'+
				'</a>';
			divstrs+=
				'<div id="d_'+i+'" class="gct-s" style="display: none;"></div>';
		}
	}
	
	$("#zone_title").append(str);
	$("#zone_title").after(divstrs);
}

/**
 * 初始化div主体样式 因为每个页面的样式都不一样
 * @param brotherId 表示这个div元素放在哪个元素下面（同级下面）
 * @param class1 样式名称1
 * @param class2 样式名称2
 */
function initPrimaryFrame(brotherId, class1, class2){
	var framestrs="";
	framestrs+=
		'<div id="tabId" class="'+class1+'" style="display:none;">'+
			'<div id="zone_title" class="'+class2+'">'+
			'</div>'+
		'</div>';
	
	$("#"+brotherId).after(framestrs);
}

/**
 * 解析后台传来的json数据
 * @param jsonObj json数据
 * @param layer 表示哪层级联
 */
function analyzeData(jsonObj, layer){
	
	if(null==jsonObj || jsonObj.length<1){
		//$.messager.alert("提示", "没有下级数据!");
		return;
	}
	
	var strs="";
	
	for(var i=0; i<jsonObj.length; i++){
		strs+=
			'<a title="'+jsonObj[i].orgName+'" href="javascript:void(0)" onclick="queryOrgById('+jsonObj[i].orgId+','+(layer+1)+',this)">'+((jsonObj[i].orgName).length>9?((jsonObj[i].orgName).substring(0,9)+'...'):jsonObj[i].orgName)+'</a>';
	}
	
	$("#d_"+layer).append(strs);
	$("#d_"+layer).css("display", "block");
	$("#a_id_"+layer).attr("class","cur");
	
	for(var i=1; i<=g_num; i++){
		if(i!=layer){
			$("#d_"+i).css("display", "none");
			$("#a_id_"+i).removeClass();
		}
	}
}

/**
 * 改变title值
 * @param id
 * @param layer
 * @param obj
 */
function changeTitle(id, layer, obj){
	if((layer-1)==0) return;
	layer=layer-1;
	var name=$(obj).attr("title");
	$("#b_"+layer).attr("title",name);
	name=name.length>9?(name.substring(0,9)+'...'):name;
	$("#b_"+layer).html(name);
}

/**
 * 改变title值
 * @param num
 */
function selectNode(num){
	$("#d_"+num).css("display", "block");
	$("#a_id_"+num).attr("class","cur");
	for(var i=1; i<=g_num; i++){
		if(i!=num){
			$("#d_"+i).css("display", "none");
			$("#a_id_"+i).removeClass();
		}
	}
}

/**
 * 清空所有子节点数据
 * @param num
 */
function clearTiTleAndDiv(num){
	for(var i=num; i<=g_num; i++){
		$("#b_"+i).html("请选择");
		$("#d_"+i).html("");
	}
}
















