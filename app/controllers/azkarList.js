// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var data=require("json/list");
Ti.API.info('azkar: '+JSON.stringify(data));
function inti(){
	for (var i=0; i < data.length; i++) {
	 var rowItem= data[i];
	 
	 var rowController=Alloy.createController('row/rowAzkarList',{data:rowItem,id:i});
	 $.tbl.appendRow(rowController.getView(),true);
	};
};
inti();