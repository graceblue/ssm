$(function(){
			var posHeight = 410;
			$('#tt_yj').tree({
				url : base+'/transferInfo/loadCurOrg.do?orgId=',
				onClick : function(node) {
					$("#s_orgId_yj").val(node.id);
					loadUsers();
				},
				onBeforeExpand : function(node,param) {   
					$('#tt_yj').tree('options').url = base+'/transferInfo/loadOrg.do?orgId='
						+ node.id;   
				},
				onLoadSuccess:function(node){
					$(".tree-title").each(function(){
						var a = $(this);
						if(undefined != a.find("a").attr("id")){
							$('#'+a.find("a").attr("id")).poshytip();
						}
					});
				}
			});
			
			loadUsers();
			
			$("#userNames_yj").html($("#s_person_yj_old").val());
			$('#demo-basic').poshytip();
		});
		
		/**
		*加载datagrid数据和配置
		*/
		var yj_row = new Array();
		function loadUsers() {
			var EventFlag=$("#s_isSingle_yj").val()=='y';
			var queryParams;
			queryParams={'orgId' : $("#s_orgId_yj").val(),
					'orgName':$("#s_orgName").val(), 
					'xingbie':$('input:radio[name=xingbie]:checked').val(),
					'jobsPost':$("#s_jobsPost").val(),
					'auditSpecialty':$("#s_auditSpecialty").val(),
					'comprehensiveability':$("#s_comprehensiveability").val()
					};
			extendG=null;
			$('#list_data_yj').datagrid({
				url : base+"/transferInfo/selectUserByCondTwo.do",
				queryParams : queryParams,
				width : 'auto',
				nowrap : false,
				iconCls : 'icon-save',
				striped : true,
				pagination : true,
				rownumbers : true,
				pageNumber : 1,
				pageSize : 6,
				pageList : [ 6, 10, 20, 50 ],
				loadMsg:'数据加载中.....',
				columns : [ [{field : 'userId',hidden : true},
				        {field : 'orgName',title : '单位',width : 120,
							formatter : function(value, rowData, rowIndex) {
								var org = rowData.org;
								return org.orgName;
						}},
						{field : 'userName',title : '姓名',width : 100,
							formatter:function(value, rowData, rowIndex){
								var id=rowData.userId;
								var userName = rowData.userName;
								var dytpcs = rowData.dytpcs;
								var ljtpcs = rowData.ljtpcs;
								var yjStr = "";
								if(dytpcs >= 2 || ljtpcs > 2) {
									yj_row.push(id);
									yjStr = "<font color='red'>"+userName+"</font>";
									yjStr += "<a id='userName-b_"+id+"' title='";
									if(dytpcs >= 2 && !(ljtpcs > 2)){
										
										yjStr += "同月重复'><div style='width:12px;hight:16px;float:right;background: url(\"../common/style/imgs/yj2.png\") repeat scroll 0 0 rgba(0, 0, 0, 0);'>&nbsp;</div>";
									}
									if(!(dytpcs >= 2) && ljtpcs > 2){
										yjStr += "累计两次以上'><div style='width:12px;hight:16px;float:right;background: url(\"../common/style/imgs/yj2.png\") repeat scroll 0 0 rgba(0, 0, 0, 0);'>&nbsp;</div>";
									}
									if(dytpcs >= 2 && ljtpcs > 2){
										yjStr += "同月重复并累计两次以上'><div style='width:12px;hight:16px;float:right;background: url(\"../common/style/imgs/yj2.png\") repeat scroll 0 0 rgba(0, 0, 0, 0);'>&nbsp;</div>";
									}
									
									yjStr += "</a>";
									
								}else{
									yjStr = userName;
								}
								
								return yjStr;
							}
						},
						{field : 'sex',title : '性别',width : 50},
						{field : 'birthyear',title : '年龄',width : 50,
							formatter:function(value, rowData, rowIndex){
								if(rowData.birthyear == null || rowData.birthyear=='' || rowData.birthyear == 0){
									return '';
								}else{
									var birthyear=rowData.birthyear;
									var myDate = new Date();
									var newyear = myDate.getFullYear();
									return newyear-birthyear;
								}
							}
						},
						{field : 'jobsPost',title : '工作岗位',width : 100,
							formatter:function(value, rowData, rowIndex){
								if(rowData.jobsPost != null && rowData.jobsPost != "" && rowData.jobsPost.length>5 ){
									return rowData.jobsPost.substr(1, 5)+"...";
								}else{
									return rowData.jobsPost;
								}
							}},
						{field : 'auditSpecialty',title : '审计专长',width : 100,
							formatter:function(value, rowData, rowIndex){
								if(rowData.auditSpecialty != null && rowData.auditSpecialty != "" && rowData.auditSpecialty.length>5 ){
									return rowData.auditSpecialty.substr(1, 5)+"...";
								}else{
									return rowData.auditSpecialty;
								}
							}},
						{field : 'comprehensiveability',title : '综合能力',width : 100,
							formatter:function(value, rowData, rowIndex){
								if(rowData.comprehensiveability != null && rowData.comprehensiveability != "" && rowData.comprehensiveability.length>5 ){
									return rowData.comprehensiveability.substr(1, 5)+"...";
								}else{
									return rowData.comprehensiveability;
								}
							}},
						{field : 'gongzuo',title : '曾参加的集团项目和工作',width : 100,
							formatter:function(value, rowData, rowIndex){
								if(rowData.gongzuo != null && rowData.gongzuo != "" && rowData.gongzuo.length>5 ){
									return rowData.gongzuo.substr(1, 5)+"...";
								}else{
									return rowData.gongzuo;
								}
							}},
						{field : 'lispingjia',title : '历史评价',width : 100,
								formatter:function(value, rowData, rowIndex){
									if(rowData.lispingjia != null && rowData.lispingjia != "" && rowData.lispingjia.length>5 ){
										return rowData.lispingjia.substr(1, 5)+"...";
									}else{
										return rowData.lispingjia;
									}
								}	
							} ] ],
				toolbar : '#tb_yj',
				singleSelect:EventFlag,
				onClickRow:onClickRow,
				onLoadSuccess:function(data){
					for(var i=0; i<yj_row.length; i++){
						$('#userName-b_'+yj_row[i]).poshytip();
					}
				}
			});
			setPage();
		}
		
		function onClickRow(index,row){
			replaceOrAdd(index,row);//多选
		}
		
		//添加或删除用户
		function replaceOrAdd(index,row) {
			var isContant = true;
			var names = $("#userNames_yj").html();
			var snames = $("#s_person_yj").val();
			var id = row.userId;//选中
			var name = row.userName;//选 中
			var orgName = row.org.orgName;
			var orgId = row.org.orgId;
			
			var z = id+"|"+name+"|"+orgName+"|"+orgId;
			
			var n = names.split(",");
			var len = n.length;
			for(var i=0;i<len;i++){
				if(n[i]==name){
					if(len==1){
						$("#userNames_yj").html(names.replace(name, ""));
						$("#s_person_yj").val(snames.replace(z, ""));
						removePersonYJ(index,row);
					}else if(i==(len-1)){
						$("#userNames_yj").html(names.replace(","+name, ""));
						$("#s_person_yj").val(snames.replace(","+z, ""));
						removePersonYJ(index,row);
					}else{
						$("#userNames_yj").html(names.replace((name+","), ""));
						$("#s_person_yj").val(snames.replace((z+","), ""));
						removePersonYJ(index,row);
					}
					isContant=false;
					break;
				}
			}
			
			if(isContant){
				 if (snames == ""){
					$("#userNames_yj").html(name);
					$("#s_person_yj").val(z);
					addPersonYJ(index,row);
				}
				else{ 
					$("#userNames_yj").html(names+","  + name);
					$("#s_person_yj").val(snames+","  + z);
					addPersonYJ(index,row);
				}
			}
		}
		
		function removePersonYJ(index,row){
			var dytpcs = row.dytpcs-1;
			var ljtpcs = row.ljtpcs-1;
			
			if (dytpcs<2){
				$('#list_data_yj').datagrid('endEdit', index);
	            $('#list_data_yj').datagrid('updateRow', 
	            		{ index: index, 
	            		row: { 
	            			userId: row.userId, 
	            			orgName: row.orgName,
	            			userName:row.userName,
	            			sex:row.sex,
	            			birthyear:row.birthyear,
	            			jobsPost:row.jobsPost,
	            			auditSpecialty:row.auditSpecialty,
	            			comprehensiveability:row.comprehensiveability,
	            			gongzuo:row.gongzuo,
	            			lispingjia:row.lispingjia,
	            			dytpcs:dytpcs,
	            			ljtpcs:ljtpcs
	            			} 
	            		});
	            
				$("tr[datagrid-row-index="+index+"]").find("td[field='userName']").find('div').html('').html(row.userName);
			} 
			if(ljtpcs<2){
				$('#list_data_yj').datagrid('endEdit', index);
	            $('#list_data_yj').datagrid('updateRow', 
	            		{ index: index, 
	            		row: { 
	            			userId: row.userId, 
	            			orgName: row.orgName,
	            			userName:row.userName,
	            			sex:row.sex,
	            			birthyear:row.birthyear,
	            			jobsPost:row.jobsPost,
	            			auditSpecialty:row.auditSpecialty,
	            			comprehensiveability:row.comprehensiveability,
	            			gongzuo:row.gongzuo,
	            			lispingjia:row.lispingjia,
	            			dytpcs:dytpcs,
	            			ljtpcs:ljtpcs
	            			} 
	            		});
	            $("tr[datagrid-row-index="+index+"]").find("td[field='userName']").find('div').html('').html(row.userName);
			}
		}
		
		function addPersonYJ(index,row){
			var dytpcs = row.dytpcs+1;
			var ljtpcs = row.ljtpcs+1;
			
			if (row.dytpcs <2 && dytpcs>=2){
				$('#list_data_yj').datagrid('endEdit', index);
	            $('#list_data_yj').datagrid('updateRow', 
	            		{ index: index, 
	            		row: { 
	            			userId: row.userId, 
	            			orgName: row.orgName,
	            			userName:row.userName,
	            			sex:row.sex,
	            			birthyear:row.birthyear,
	            			jobsPost:row.jobsPost,
	            			auditSpecialty:row.auditSpecialty,
	            			comprehensiveability:row.comprehensiveability,
	            			gongzuo:row.gongzuo,
	            			lispingjia:row.lispingjia,
	            			dytpcs:dytpcs,
	            			ljtpcs:ljtpcs
	            			} 
	            		});
	            var h = $("tr[datagrid-row-index="+index+"]").find("td[field='userName']").find('div').html();
				var s= '';
				s += "<font color='red'>"+h+"</font>";
				//s += "<a id='userName-b_"+row.userId+"' title='同月重复'><span>同月重复</span>";
				$("tr[datagrid-row-index="+index+"]").find("td[field='userName']").find('div').html('').html(s);
				$('#userName-b_'+row.userId).poshytip();
			}
			if(row.ljtpcs <=2 && ljtpcs>2){
				$('#list_data_yj').datagrid('endEdit', index);
	            $('#list_data_yj').datagrid('updateRow', 
	            		{ index: index, 
	            		row: { 
	            			userId: row.userId, 
	            			orgName: row.orgName,
	            			userName:row.userName,
	            			sex:row.sex,
	            			birthyear:row.birthyear,
	            			jobsPost:row.jobsPost,
	            			auditSpecialty:row.auditSpecialty,
	            			comprehensiveability:row.comprehensiveability,
	            			gongzuo:row.gongzuo,
	            			lispingjia:row.lispingjia,
	            			dytpcs:dytpcs,
	            			ljtpcs:ljtpcs
	            			} 
	            		});
	            var h = $("tr[datagrid-row-index="+index+"]").find("td[field='userName']").find('div').html();
				var s= '';
				s += "<font color='red'>"+h+"</font>";
				//s += "<a id='userName-b_"+row.userId+"' title='累计两次以上'><span>累计两次以上</span>";
				$("tr[datagrid-row-index="+index+"]").find("td[field='userName']").find('div').html('').html(s);
				$('#userName-b_'+row.userId).poshytip();
			}
		}
		
		function setPage(){
			var p = $('#list_data_yj').datagrid('getPager');
			    $(p).pagination({    
					  pageSize: 6,//每页显示的记录条数，默认为10  
					  pageList: [6,10,15],//可以设置每页记录条数的列表  
					  beforePageText: '第',//页数文本框前显示的汉字  
					  afterPageText: '页    共 {pages} 页', 
					  displayMsg:'共 {total} 条记录' //'当前显示 {from} - {to} 条记录   共 {total} 条记录'
			    });
			}
	function doSelectUser(){
		var sPerson = $("#s_person_yj").val();
		var n = sPerson.split(",");
		var personcontainer = $("#personcontainer");
		personcontainer.html("");
		var s = "";
		var p = null;
		for(var i=0;i<n.length;i++){
			if(n[i] == '' || n[i].length <= 0){
				continue;
			}
			p = n[i].split("|");
			s = "<li id='person_li_"+p[0]+"'>"+
				"<input type='hidden' name='personId' id='personId_"+p[0]+"' value='"+p[0]+"'/>"+
				"<small class='smryif1'>"+
				"<a href='javascript:void(0)' personId='"+p[0]+"' onclick='delPerson("+p[0]+");'><img src='../common/style/imgs/delede.png' title='删除' /></a>"+
				"</small>"+
				"<small class='smryif2'>"+p[1]+"</small>"+
				"<small>"+p[2]+"</small>"+
				"</li>";
			personcontainer.append(s);
		}
		$('#selUserWin_yj').window('close');
	}