
/**
 * 动态统计送审金额总数
 * 
 * @param obj 当前标签对象
 * @param type 通信还是土建（土建类型没用到，待需求扩展）
 * @param id 参建单位code
 * 
 * @author 罗伟
 */
function statisGiveMoney(obj, type, id)
{
	var param1="";
	var param2="";
	
	//通信
	if("communicate"==type)
	{
		param1="ft1";
		param2="feeType1_1";
	}
	//土建
	else
	{
		param1="civilFee1";
		param2="civilFee1_1";
	}
	
	var givem=formmoneyofid("giveMoneytotal_"+id);
	
	var numtatol=0;
	var money="";
	
	for(var i=1; i<=jaFeeTypeNumber; i++)
	{
		if($("#"+param1+i+"_1_"+id).length==0) continue;
    	
    	//获取金额
    	money=formmoneyofid(param1+i+"_1_"+id);
    	
    	//其中：甲供材料费扣款  这个是相减
		if(i==2 && param1=="ft1")
		{
			numtatol-=money;
		}
		//其它的相加
		else
		{
			numtatol+=money;
		}
	}
	
	if(numtatol>givem && givem!=0)
	{
		$.messager.alert("提示", "明细金额总和不能大于送审金额!");
		$(obj).val("");
		return;
	}
	
	//通信有合计  土建目前没有合计
	if("communicate"==type)
	{
		$("#"+param2+"_"+id).numberbox("setValue", numtatol==0?"":numtatol);
	}
}

/**
 * 动态统计初审金额总数
 * 
 * @param obj 当前标签对象
 * @param type 通信 or 土建
 * @param id 参建单位code
 * @param type1 当前标签对象id前缀
 */
function statisFirstMoney(obj,type,id,type1)
{
	var param1="";
	var param2="";
	var param3="";
	
	//通信
	if("communicate"==type){
		param1="ft1";
		param2="feeType1_2";
		param3="communicate";
	}else{//土建
		param1="civilFee1";
		param2="civilFee1_2";
		param3="civil";
	}
	
	var givem=formmoneyofid("firstMoneytotal_"+id);
	
	var numtatol=0;
	var money="";
	
	for(var i=1; i<=jaFeeTypeNumber; i++)
	{
		if($("#"+param1+i+"_2_"+id).length==0) continue;
		
		//获取金额
    	money=formmoneyofid(param1+i+"_2_"+id);
		
    	//其中：甲供材料费扣款  这个是相减
		if(i==2 && param1=="ft1"){
			numtatol-=money;
		}else{
			numtatol+=money;
		}
	}
	
	if(numtatol>givem && givem!=0){
		$.messager.alert("提示", "明细金额总和不能大于初审金额!");
		$(obj).val("");
		return;
	}
	
	if("communicate"==type){
		$("#"+param2+"_"+id).numberbox("setValue", numtatol==0?"":numtatol);
		//计算明细费用的审减率和审减金额
		accountChildFeeSjAndSjLv(obj, id, 2, type1);
		//计算总审减率和审减金额
		countAuditRate(param3, id);
	}else{
		//计算明细费用的审减率和审减金额
		accountChildFeeSjAndSjLv(obj, id, 2, type1);
	}
}

/**
 * 动态统计审定金额总数
 * 
 * @param obj 当前标签对象
 * @param type 通信 or 土建
 * @param id 参建单位code
 * @param type1 当前标签对象id前缀
 */
function statisAuditMoney(obj,type,id,type1)
{
	var param1="";
	var param2="";
	var param3="";
	
	//通信
	if("communicate"==type){
		param1="ft1";
		param2="feeType1_3";
		param3="communicate";
	}else{//土建
		param1="civilFee1";
		param2="civilFee1_3";
		param3="civil";
	}

	var numtatol=0;
	var money="";
	
	for(var i=1; i<=jaFeeTypeNumber; i++)
	{
		if($("#"+param1+i+"_3_"+id).length==0) continue;
		
		//获取金额
    	money=formmoneyofid(param1+i+"_3_"+id);
		
		if(i==2 && param1=="ft1"){
			numtatol-=money;
		}else{
			numtatol+=money;
		}
	}
	
	if("communicate"==type){
		$("#"+param2+"_"+id).numberbox("setValue", numtatol==0?"":numtatol);
		//计算明细费用的审减率和审减金额
		accountChildFeeSjAndSjLv(obj, id, 3, type1);
		//计算总审减率和审减金额
		countAuditRate(param3, id);
	}else{
		//计算明细费用的审减率和审减金额
		accountChildFeeSjAndSjLv(obj, id, 3, type1);
	}
}

/**
 * 添加自定义费用
 */
function addCustomFee(id){
	var str=
		'<dl>'+
	      	'<dt>'+
	        	'<input id="feeType'+zdyFeeTypeNumber+'_'+id+'" onblur="enterFeeNameOnBlur(this,1)" onfocus="enterFeeNameOnFocus(this,1)" type="text" class="easyui-numberbox numberbox-f validatebox-text" value="其他费用（自定义）" />'+
	      	'</dt>'+
	      	'<dd>'+
	        	'<input type="text" id="feeType'+zdyFeeTypeNumber+'_1_'+id+'"></input>'+
	      	'</dd>'+
	      	'<dd>'+
	        	'<input type="text" onblur="accountChildFeeSjAndSjLv(this,'+"'"+id+"'"+',2,'+"'"+"feeType"+zdyFeeTypeNumber+"'"+')" id="feeType'+zdyFeeTypeNumber+'_2_'+id+'"></input>'+
	      	'</dd>'+
	      	'<dd>'+
	        	'<input type="text" onblur="accountChildFeeSjAndSjLv(this,'+"'"+id+"'"+',3,'+"'"+"feeType"+zdyFeeTypeNumber+"'"+')" id="feeType'+zdyFeeTypeNumber+'_3_'+id+'"></input>'+
	      		'<a title="删除该费用" class="adelsy" href="javascript:void(0)" onclick="deleteCustomFee(this)"><img src="'+curProjectUrl+'/common/style/imgs/p_delete.png"></img></a>'+
	      	'</dd>'+
	      	'<dd class="txtalg">'+
	        	'<label id="feeType'+zdyFeeTypeNumber+'_4_'+id+'">--</label>'+
	        '</dd>'+
	    '</dl>';
	    
	$("#communicate_"+id).append(str);
	transnumber(1,id);
    zdyFeeTypeNumber++;
}

/**
 * 删除自定义费用
 * @param obj
 */
function deleteCustomFee(obj){
	$(obj).parent().parent().remove();
}

/**
 * 添加建安费费用明细
 */
function addJAFee(id){
	var str=
		'<dl>'+
        	'<dt>'+
        		'<span class="paddlt1">'+
        			'<input id="ft1'+jaFeeTypeNumber+'_'+id+'" onblur="enterFeeNameOnBlur(this,2)" onfocus="enterFeeNameOnFocus(this,2)" type="text" class="easyui-numberbox numberbox-f validatebox-text" value="其中：自定义" />'+
        		'</span>'+
        	'</dt>'+
        	'<dd>'+
          		'<input onblur="statisGiveMoney(this,'+"'communicate',"+"'"+id+"'"+')" type="text" id="ft1'+jaFeeTypeNumber+'_1_'+id+'"></input>'+
        	'</dd>'+
        	'<dd>'+
          		'<input onblur="statisFirstMoney(this,'+"'communicate',"+"'"+id+"'"+','+"'"+"ft1"+jaFeeTypeNumber+"'"+')" type="text" id="ft1'+jaFeeTypeNumber+'_2_'+id+'"></input>'+
        	'</dd>'+
        	'<dd>'+
          		'<input onblur="statisAuditMoney(this,'+"'communicate',"+"'"+id+"'"+','+"'"+"ft1"+jaFeeTypeNumber+"'"+')" type="text" id="ft1'+jaFeeTypeNumber+'_3_'+id+'"></input>'+
        		'<a title="删除该费用" class="adelsy" href="javascript:void(0)" onclick="deleteJAFee(this,'+jaFeeTypeNumber+','+"'"+id+"'"+')"><img src="'+curProjectUrl+'/common/style/imgs/p_delete.png"></img></a>'+
        	'</dd>'+
        	'<dd class="txtalg">'+
	        	'<label id="ft1'+jaFeeTypeNumber+'_4_'+id+'">--</label>'+
	        '</dd>'+
      	'</dl>';
    
    $("#moreselect1_"+id).append(str);
    //格式化
    transnumber(2,id);
    //自增长
    jaFeeTypeNumber++;
}

/**
 * 解决动态添加easyui-numberbox不能格式化的问题
 */
function transnumber(flag,id)
{
	//添加建安费用明细
	if(2==flag)
	{
		formatnumber('ft1'+jaFeeTypeNumber+'_1_'+id);
		formatnumber('ft1'+jaFeeTypeNumber+'_2_'+id);
		formatnumber('ft1'+jaFeeTypeNumber+'_3_'+id);
	}
	//自定义费用
	else
	{
		formatnumber('feeType'+zdyFeeTypeNumber+'_1_'+id);
		formatnumber('feeType'+zdyFeeTypeNumber+'_2_'+id);
		formatnumber('feeType'+zdyFeeTypeNumber+'_3_'+id);
	}
}

/**
 * 删除自定义建安费
 * @param obj
 * @param num
 * @param id
 */
function deleteJAFee(obj, num, id){
	var gm=$.trim($("#ft1"+num+"_1_"+id).val())==""?"0":$.trim($("#ft1"+num+"_1_"+id).val());
	var fm=$.trim($("#ft1"+num+"_2_"+id).val())==""?"0":$.trim($("#ft1"+num+"_2_"+id).val());
	var am=$.trim($("#ft1"+num+"_3_"+id).val())==""?"0":$.trim($("#ft1"+num+"_3_"+id).val());
	
	gm=gm.replace(/,/g,"");
	gm=parseInt(gm);
	
	fm=fm.replace(/,/g,"");
	fm=parseInt(fm);
	
	am=am.replace(/,/g,"");
	am=parseInt(am);
	
	var gmt=$.trim($("#feeType1_1_"+id).val())==""?"0":$.trim($("#feeType1_1_"+id).val());
	gmt=gmt.replace(/,/g,"");
	gmt=parseInt(gmt);
	$("#feeType1_1_"+id).numberbox("setValue", (gmt-gm)==0?"":(gmt-gm));
	
	gmt=$.trim($("#feeType1_2_"+id).val())==""?"0":$.trim($("#feeType1_2_"+id).val());
	gmt=gmt.replace(/,/g,"");
	gmt=parseInt(gmt);
	$("#feeType1_2_"+id).numberbox("setValue", (gmt-fm)==0?"":(gmt-fm));
	
	gmt=$.trim($("#feeType1_3_"+id).val())==""?"0":$.trim($("#feeType1_3_"+id).val());
	gmt=gmt.replace(/,/g,"");
	gmt=parseInt(gmt);
	$("#feeType1_3_"+id).numberbox("setValue", (gmt-am)==0?"":(gmt-am));
	
	$(obj).parent().parent().remove();
	countAuditRate('communicate', id);
}

/**
 * 计算明细费用审减金额和审减率
 * flag: 表示初审还是审定 type:id前缀
 */
function accountChildFeeSjAndSjLv(obj, code, flag, type){
	//初审
	var fm=0;
	//审定
	var am=0;
	//审减金额/审减ID
	var auditratestr="";

	//初审
	if(2==flag){
		fm=formmoneyofobj(obj);
		am=formmoneyofid(type+"_3_"+code);
	}else if(3==flag){
		fm=formmoneyofid(type+"_2_"+code);
		am=formmoneyofobj(obj);
	}
	
	auditratestr=type+"_4_"+code;
	
	setdataauditrate(fm, am, auditratestr);
}

/**
 * 修改审减率
 * @param type
 * @param id
 */
function countAuditRate(type, id){
	
	var param1="communicate"==type?"feeType1_2_"+id:"civilFee1_2_"+id;
	var param2="communicate"==type?"feeType1_3_"+id:"civilFee1_3_"+id;
	var param3="communicate"==type?"feeType1_4_"+id:"civilFee1_4_"+id;
	
	//初审金额
	var fm=$.trim($("#"+param1).val())==""?"0":$.trim($("#"+param1).val());
	fm=fm.replace(/,/g,"");
	fm=parseInt(fm);
	
	//审定金额
	var am=$.trim($("#"+param2).val())==""?"0":$.trim($("#"+param2).val());
	am=am.replace(/,/g,"");
	am=parseInt(am);
	
	setdataauditrate(fm, am, param3);
}

/**编辑明细**/
function editDetail(flag,id){
	if(1==flag) $("#moreselect1_"+id).slideToggle();
	if(2==flag) $("#moreselect2_"+id).slideToggle();
	if(3==flag) $("#moreselect3_"+id).slideToggle();
	if(4==flag) $("#moreselect4_"+id).slideToggle();
}

/**通信切换土建**/
function transTxToTj(obj,id){
	$("#communicate_"+id).css("display","none");
	$("#communicate_"+id).next().css("display","none");
	
	$("#civil_"+id).css("display","block");
	$("#civil_"+id).next().css("display","block");
}

/**土建切换通信**/
function transTjToTx(obj,id){
	$("#communicate_"+id).css("display","block");
	$("#communicate_"+id).next().css("display","block");
	
	$("#civil_"+id).css("display","none");
	$("#civil_"+id).next().css("display","none");
}

/**计算审减金额和审减率**/
function accountAuditReduceRate(obj, code, flag, type){

	//初审
	var fm=0;
	//审定
	var am=0;
	//审减金额/审减ID
	var auditratestr="";
	
	
	if(2==flag){
		fm=formmoneyofobj(obj);
		am=formmoneyofid(type+"3_"+code);
	}else if(3==flag){
		fm=formmoneyofid(type+"2_"+code);
		am=formmoneyofobj(obj);
	}
	
	auditratestr=type+"4"+"_"+code;
	
	setdataauditrate(fm, am, auditratestr);
}

/**自定义费用名称切换**/
function enterFeeNameOnFocus(obj, flag){
	var contents=$.trim($(obj).val());
	if(2==flag){
		if("其中：自定义"==contents){
			$(obj).val("");
		}
	}else if(1==flag){
		if("其他费用（自定义）"==contents){
			$(obj).val("");
		}
	}else if(3==flag){
		if("enter text…"==contents){
			$(obj).val("");
		}
	}else if(9==flag){
		if("自定义费用"==contents){
			$(obj).val("");
		}
	}
}

/**自定义费用名称切换**/
function enterFeeNameOnBlur(obj, flag){
	var contents=$.trim($(obj).val());
	if(2==flag){
		if(""==contents){
			$(obj).val("其中：自定义");
		}
	}else if(1==flag){
		if(""==contents){
			$(obj).val("其他费用（自定义）");
		}
	}else if(3==flag){
		if(""==contents){
			$(obj).val("enter text…");
		}
	}else if(9==flag){
		if(""==contents){
			$(obj).val("自定义费用");
		}
	}
}

/**flag:1 获取审减金额  flag:2 获取审减率**/
function getAuditsubMoneyOrAuditsubRate(id, flag){

	if($("#"+id).length==0) return;
	
	//审减金额 默认为0
	var subm=0;
	//审减率
	var subr='0%';
	
	var str=$.trim($("#"+id).html());
	
	if(str!="--"){
		var bnum=str.indexOf("(");
		subm=str.substring(0,bnum);
		subm=subm.replace(/,/g,"");
		subm=parseInt(subm);
		subr=str.substring(bnum+1,str.length-1);
	}
	
	if(1==flag) return subm;
	if(2==flag) return subr;
}

/**加载下拉框数据**/
function loadBeginAuditSelect(){
	var arr=[];
	if(sjcodes.length>0){
		arr=sjcodes.split(",");
		for(var i=0; i<arr.length; i++){
			//选中设计
			setSelectedData("designFeeType_"+arr[i], "10", "EXPENSE_TYPE");
		}
	}
	
	if(jlcodes.length>0){
		arr=jlcodes.split(",");
		for(var i=0; i<arr.length; i++){
			//选中监理
			setSelectedData("supervisionFeeType_"+arr[i], "20", "EXPENSE_TYPE");
		}
	}
	
	if(jccodes.length>0){
		arr=jccodes.split(",");
		for(var i=0; i<arr.length; i++){
			//选中集成
			setSelectedData("integrateFeeType_"+arr[i], "40", "EXPENSE_TYPE");
		}
	}
}

/**设置下拉框事件**/
function setOnSelectEvent(){
	setOnSelect(sjcodes,1);
	setOnSelect(jlcodes,2);
	setOnSelect(jccodes,3);
}

/**下拉框事件公用方法**/
function setOnSelect(codes, flag){
	var arr=[];
	var ids="";
	if(codes.length>0){
		arr=codes.split(",");
		for(var i=0; i<arr.length; i++){
			ids=(1==flag?"designFeeType_":2==flag?"supervisionFeeType_":3==flag?"integrateFeeType_":"")+arr[i];
			$("#"+ids).combobox({
				onSelect:function(){
					bselected(this,flag);
				}
			});
		}
	}
}

/**改变费用名称**/
function bselected(obj,flag){
	var code=$(obj).attr("id");
	var index=code.indexOf("_");
	code=code.substring(index+1)
	var ids=(1==flag?"designFeeType_":2==flag?"supervisionFeeType_":3==flag?"integrateFeeType_":"")+code;
	var id=(1==flag?"designFeeTypeName_":2==flag?"supervisionFeeTypeName_":3==flag?"integrateFeeTypeName_":"")+code;
	var sjhiddenid=(1==flag?"otherDesignFee_":2==flag?"otherSupervisionFee_":3==flag?"otherIntegrateFee_":"")+code;
	var sjcodeid=code;
	code=$("#"+ids).combobox("getValue");
	changeFeeName(id, code, sjhiddenid, sjcodeid, 1);
}

/**改变费用名称**/
function changeFeeName(id, code, otherId, codeid, flag){
	var feeName="10"==code?"设计费":"20"==code?"监理费":"30"==code?"施工费":"40"==code?"集成费":"50"==code?"其它费用":"费用";
	var index=0;
	var ids="";
	index=1==flag?sjOtherFeeBeginIndex:2==flag?jlOtherFeeBeginIndex:4==flag?jcOtherFeeBeginIndex:0;
	ids=1==flag?"designOtherFee":2==flag?"supervisionOtherFee":4==flag?"integrateOtherFee":"";
	$("#"+id).html(feeName);
	if(feeName=="其它费用"){
		$("#"+otherId).css("display","block");
	}else{
		$("#"+otherId).css("display","none");
		var sr="";
		for(var i=0; i<=index; i++){
			sr=ids+i+"_"+codeid;
			//alert(sr);
			//alert($("#"+sr).length==0);
			if($("#"+sr).length==0){
				continue;
			}else{
				$("#"+sr).parent().parent().remove();
			}
		}
	}
}

/*********************************************************************************************************************/
/*********************************************************************************************************************/
/**********************************************************公共方法begin************************************************/
/**格式化金额  参数：对象**/
function formmoneyofobj(obj){
	var money=$.trim($(obj).val())==""?"0":$.trim($(obj).val());
	money=money.replace(/,/g,"");
	money=parseInt(money);
	return money;
}

/**格式化金额  参数：id**/
function formmoneyofid(id){
	var money=$.trim($("#"+id).val())==""?"0":$.trim($("#"+id).val());
	money=money.replace(/,/g,"");
	money=parseInt(money);
	return money;
}

/**公共方法 设置审减金额和审减率 fm:初审金额 am:审定金额 id:审减金额标签id 数据都为格式化后的**/
function setdataauditrate(fm, am, id){
	//审减金额
	var sjmoney=0;
	//审减率
	var sjdiffenerce=0;
	
	if((0!=fm && 0!=am) || (0==am && 0!=fm)){
		sjmoney=fm-am;
		sjdiffenerce=Percentage(sjmoney, fm);
		
		$("#"+id).html(formatCurrency(sjmoney)+" "+"("+sjdiffenerce+")");
	}else{
		$("#"+id).html("--");
	}
}

/**
 * 百分比
 * 
 * @param num
 * @param total
 * @returns {String}
 */
function Percentage(num, total) { 
    return (Math.round(num / total * 10000) / 100.00 + "%"); //小数点后两位百分比
}

/**
 * 格式化输入框
 * @param id
 */
function formatnumber(id){
	$('#'+id).numberbox({   
	    min:0,   
	    precision:2,
	    groupSeparator:',',
	    decimalSeparator:'.'   
	}); 
}
/*********************************************************************************************************************/
/*********************************************************************************************************************/
/**********************************************************公共方法end**************************************************/


/**设计 监理  集成 其它费用起始id标识**/
var sjOtherFeeBeginIndex=1;
var jlOtherFeeBeginIndex=1;
var jcOtherFeeBeginIndex=1;

/**新增其它费用**/
function addOtherFee(obj, type, id){
	var index=0;
	var str="";
	if("design"==type){
		str=
			'<dl class="martop paddtop">'+
	       		'<dt>'+
	       			'<input id="designOtherFee'+sjOtherFeeBeginIndex+'_'+id+'" onblur="enterFeeNameOnBlur(this,9)" onfocus="enterFeeNameOnFocus(this,9)"  class="easyui-numberbox numberbox-f validatebox-text" type="text" value="自定义费用" />'+
	       		'</dt>'+
	       		'<dd>'+
	         		'<input id="designOtherFee'+sjOtherFeeBeginIndex+'_1_'+id+'" type="text" />'+
	       		'</dd>'+
	       		'<dd>'+
	         		'<input id="designOtherFee'+sjOtherFeeBeginIndex+'_2_'+id+'" onblur="accountAuditReduceRate(this,'+"'"+id+"'"+',2,'+"'"+'designOtherFee'+sjOtherFeeBeginIndex+'_'+"'"+')" type="text" />'+
	       		'</dd>'+
	       		'<dd>'+
	         		'<input id="designOtherFee'+sjOtherFeeBeginIndex+'_3_'+id+'" onblur="accountAuditReduceRate(this,'+"'"+id+"'"+',3,'+"'"+'designOtherFee'+sjOtherFeeBeginIndex+'_'+"'"+')" type="text" />'+
	       			'<a title="删除该费用" class="adelsy" href="javascript:void(0)" onclick="deleteOtherFee(this)"><img src="'+curProjectUrl+'/common/style/imgs/p_delete.png"></img></a>'+
	       		'</dd>'+
	       		'<dd class="txtalg">'+
		        	'<label id="designOtherFee'+sjOtherFeeBeginIndex+'_4_'+id+'">--</label>'+
		        '</dd>'+
	     	'</dl>';
	     index=sjOtherFeeBeginIndex;
	}else if("supervision"==type){
		str=
			'<dl class="martop paddtop">'+
	       		'<dt>'+
	       			'<input id="supervisionOtherFee'+jlOtherFeeBeginIndex+'_'+id+'" onblur="enterFeeNameOnBlur(this,9)" onfocus="enterFeeNameOnFocus(this,9)"  class="easyui-numberbox numberbox-f validatebox-text" type="text" value="自定义费用" />'+
	       		'</dt>'+
	       		'<dd>'+
	         		'<input id="supervisionOtherFee'+jlOtherFeeBeginIndex+'_1_'+id+'" type="text" />'+
	       		'</dd>'+
	       		'<dd>'+
	         		'<input id="supervisionOtherFee'+jlOtherFeeBeginIndex+'_2_'+id+'" onblur="accountAuditReduceRate(this,'+"'"+id+"'"+',2,'+"'"+'supervisionOtherFee'+jlOtherFeeBeginIndex+'_'+"'"+')" type="text" />'+
	       		'</dd>'+
	       		'<dd>'+
	         		'<input id="supervisionOtherFee'+jlOtherFeeBeginIndex+'_3_'+id+'" onblur="accountAuditReduceRate(this,'+"'"+id+"'"+',3,'+"'"+'supervisionOtherFee'+jlOtherFeeBeginIndex+'_'+"'"+')" type="text" />'+
	       			'<a title="删除该费用" class="adelsy" href="javascript:void(0)" onclick="deleteOtherFee(this)"><img src="'+curProjectUrl+'/common/style/imgs/p_delete.png"></img></a>'+
	       		'</dd>'+
	       		'<dd class="txtalg">'+
		        	'<label id="supervisionOtherFee'+jlOtherFeeBeginIndex+'_4_'+id+'">--</label>'+
		        '</dd>'+
	     	'</dl>';
	     index=jlOtherFeeBeginIndex;
	}else if("integrate"==type){
		str=
			'<dl class="martop paddtop">'+
	       		'<dt>'+
	       			'<input id="integrateOtherFee'+jcOtherFeeBeginIndex+'_'+id+'" onblur="enterFeeNameOnBlur(this,9)" onfocus="enterFeeNameOnFocus(this,9)"  class="easyui-numberbox numberbox-f validatebox-text" type="text" value="自定义费用" />'+
	       		'</dt>'+
	       		'<dd>'+
	         		'<input id="integrateOtherFee'+jcOtherFeeBeginIndex+'_1_'+id+'" type="text" />'+
	       		'</dd>'+
	       		'<dd>'+
	         		'<input id="integrateOtherFee'+jcOtherFeeBeginIndex+'_2_'+id+'" onblur="accountAuditReduceRate(this,'+"'"+id+"'"+',2,'+"'"+'integrateOtherFee'+jcOtherFeeBeginIndex+'_'+"'"+')" type="text" />'+
	       		'</dd>'+
	       		'<dd>'+
	         		'<input id="integrateOtherFee'+jcOtherFeeBeginIndex+'_3_'+id+'" onblur="accountAuditReduceRate(this,'+"'"+id+"'"+',3,'+"'"+'integrateOtherFee'+jcOtherFeeBeginIndex+'_'+"'"+')" type="text" />'+
	       			'<a title="删除该费用" class="adelsy" href="javascript:void(0)" onclick="deleteOtherFee(this)"><img src="'+curProjectUrl+'/common/style/imgs/p_delete.png"></img></a>'+
	       		'</dd>'+
	       		'<dd class="txtalg">'+
		        	'<label id="integrateOtherFee'+jcOtherFeeBeginIndex+'_4_'+id+'">--</label>'+
		        '</dd>'+
	     	'</dl>';
	     index=jcOtherFeeBeginIndex;
	}
	
	sjOtherFeeBeginIndex++;
	jlOtherFeeBeginIndex++;
	jcOtherFeeBeginIndex++;
	$(obj).parent().parent().parent().after(str);
	
	transnumberofother(type, index, id);
}

/**删除其它费用**/
function deleteOtherFee(obj){
	$(obj).parent().parent().remove();
}

/**解决动态添加easyui-numberbox不能格式化的问题**/
function transnumberofother(type, index, id){
	formatnumber(type+'OtherFee'+index+'_1_'+id);
	formatnumber(type+'OtherFee'+index+'_2_'+id);
	formatnumber(type+'OtherFee'+index+'_3_'+id);
}










