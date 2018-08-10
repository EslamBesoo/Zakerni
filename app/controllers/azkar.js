// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args; 
if (args.id==0) {
	var data=require("json/azkar_sabah").content;
} else if (args.id==1) {
	var data=require("json/azkar_massa").content;
} else if (args.id==2) {
	var data=require("json/PostPrayer_azkar").content;
}
//Ti.API.info('azkar: '+JSON.stringify(data.title));
function inti(){
	for (var i=0; i < data.length; i++) {
	 var rowItem= data[i];
	 
	 var rowController=Alloy.createController('row/rowAzkar',{pageNO:i,data:rowItem,allPage:data.length});
	 $.form.addView(rowController.getView());
	};
};

 inti();
 
rtl($.form);



Ti.App.addEventListener("textNext",nextView);
function nextView(){
	$.form.setCurrentPage(($.form.currentPage+1));
};
