// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (Ti.App.Properties.getString("SETTING_LANGUAGE")=="ar") {
	$.AppHeader.remove($.viewIconEN);
	//$.viewButton.left=0;
}else{
	$.AppHeader.remove($.viewIconAR);
	//$.viewButton.right=0;
};

 
//rtl($.AppHeader);



