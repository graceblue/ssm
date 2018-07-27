/**处理项目开始时间*/
function dealTimeStart(proTimeStart){
	if(isStringNull(proTimeStart)){
     	var xun = proTimeStart.substring(6,7)=="1"?"上旬":proTimeStart.substring(6,7)=="2"?"中旬":"下旬";
     	proTimeStart = proTimeStart.substring(0,4)+"年"+proTimeStart.substring(4,6)+"月"+xun;
     }
     return proTimeStart;
}