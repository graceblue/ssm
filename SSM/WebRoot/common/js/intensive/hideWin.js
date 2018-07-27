/*****隐藏弹框阴影******/
	var easyuiPanelOnOpen = function (left, top) {
	    $(".window-shadow").hide();
	};
	$.fn.window.defaults.onOpen = easyuiPanelOnOpen;