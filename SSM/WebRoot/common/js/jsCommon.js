
		/**
		 * 在文本框输入金额后，此方法从右到左三个数字加一个逗号分开，数据号以.00结尾
		 * 
		 * @param s 要格式化的数据：例如：5454 格式化后：5,454.00
		 * 
		 * @author Lee
		 */ 
		function AngelMoney(s){
		   s=s.replace(/\b(0+)/gi,"");//用于处理数字前面多个0的情况：例如：“00123”变成123 
		   var reg=new RegExp(",","g");//正则表达式，替换所有的逗号
		   s=s.replace(reg,"");
		   if(/[^0-9\.]/.test(s)) return "不是数字！";
		   s=s.replace(/^(\d*)$/,"$1.");
		   s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
		   s=s.replace(".",",");
		   var re=/(\d)(\d{3},)/;
		   while(re.test(s))
		        s=s.replace(re,"$1,$2");
		   s=s.replace(/,(\d\d)$/,".$1");
		   return s.replace(/^\./,"0.");
		}
		
		
		/**
		 * 用于处理数字前面多个0的情况：例如：“00123”变成123 
		 * 
		 * @param s 要格式化的数据：例如：0005454 格式化后：5454
		 * 
		 * @author Lee
		 */ 
		function formatInteger(s){
		   return s.replace(/\b(0+)/gi,"");
		}
	
		/**
		 * 判断日期大小
		 * 
		 * @param begindate 开始日期
		 * @param enddate   结束日期
		 * 
		 * @author Lee
		 */ 
	    function RQDXcheck(begindate,enddate){
	        //将字符串转换为日期
	        var bDate = new Date(begindate.replace(/-/g,"/"));
	        var eDate = new Date(enddate.replace(/-/g,"/"));
	        //js判断日期
			if(bDate-eDate>0){ 
			   return false;
			 }
			return true;
	     }
	    /**
		 * 验证日期格式
		 * 
		 * @param RQ 日期
		 * 
		 * @author Lee
		 */
		function RQcheck(RQ) {
	       var date = RQ;
	       var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);//正则表达式验证日期格式
	       if (result == null)
	          return false;
	          var d = new Date(result[1], result[3] - 1, result[4]);
	          return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
	
	     }
	    
		/**
		 * 非空验证
		 * 
		 * @param strs 要验证的数据
		 * 
		 * @author Lee
		 */
	     function isEmpty(strs){
	     	if(strs == null || strs == ''){
				return false;
			}
			return true;
	     }
	     
	     /**
		  * 获取URL的参数值
		  * 
		  * @param url    URL地址
		  * @param paras  参数名称
		  * 
		  * @author Lee
		  */ 
	     function getParamValue(url,paras){
	    	 var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
	    	 var paraObj = {};
	    	 for (i=0; j=paraString[i]; i++){  
	    		 paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
	    	 }  
	    	 var returnValue = paraObj[paras.toLowerCase()];  
	    	 if(typeof(returnValue)=="undefined"){  
	    		 return "";  
	    	 }else{  
	    		 return returnValue; 
	    	 }
	    }
	     
	     /**
		  * 获取系统时间(yyyy-MM-dd)
		  *
		  * @author Lee
		  */ 
	     function getDateTime(){
	    	 var dateTime=new Date();
	    	 var yy=dateTime.getFullYear();
	    	 var MM=dateTime.getMonth()+1;  //因为1月这个方法返回为0，所以加1
	    	 var dd=dateTime.getDate();
	    	 var createDate = yy + "-" + MM + "-" + dd;
	    	 return createDate;
	     }
	     
	     /**
	      * Ajax 无返回值
	      * 
	      * @param url      地址
	      * @param isasync  是否同异步：值：true 或 false
	      */
	     function ajaxeMethod(url,isasync){
	    	 $.ajax({
	    			type:"post",
	    			url:url,
	    			async : isasync,//同步
	    			dataType :"json",//json数据格式
	    			success:function(){
	    			}
	    		});
	     }
	     /**
	      * Ajax 带有返回值
	      * 
	      * @param url      地址
	      * @param isasync  是否同异步：值：true 或 false
	      */
	     function ajaxeMethod(type,url,isasync){
	    	 var resultFlag  = "";
	    	 $.ajax({
	 	 		type:"post",
	 	 		url:url,
	 	 		async : isasync,//同步
	 	 		dataType :"json",//json数据格式
	 	 		success:function(data){
	 	 			resultFlag = data;
	 	 		}
	 	 	});
	    	return resultFlag;
	     }
	     