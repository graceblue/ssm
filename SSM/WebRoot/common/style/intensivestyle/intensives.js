var dataStr = getRedisData('M_PLAN_SOURCE,M_AUDIT_TYPE,AUDIT_WAY,M_INTENSIVE_STAGE_STATUS');
var planSource = $.parseJSON(dataStr["M_PLAN_SOURCE"]);// 计划性质
var auditType = $.parseJSON(dataStr["M_AUDIT_TYPE"]);// 审计项目类型
var statusO = redisArrToJson(dataStr["M_INTENSIVE_STAGE_STATUS"]);
$(document).ready(function() {
	initYear();// 初始化年份
	// loadPrjInfo();
});
var conObj = null;
/** 加载年份以当年为基前后加五年 */
function initYear() {
	var year = new Date().getFullYear();
	var planYear = "";
	var yearData = [];
	var yearJson;
	var prjInfosCount;
	var prjRealeasedCount;
	if (conObj) {
		planYear = conObj.planYear;
	}
	planYear = isStringNull(planYear) ? planYear : year;
	for ( var i = (year + 2); i > (year - 6); i--) {
		yearJson = {
			label : i,
			value : i,
			selected : i == planYear
		};
		yearData.push(yearJson);
	}
	$("#year").combobox({
		valueField : 'label',
		textField : 'value',
		data : yearData,
		panelHeight : 'auto',
		editable : false
	});
}
