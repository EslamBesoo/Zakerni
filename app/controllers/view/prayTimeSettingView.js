// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var data=[
				{title:"التبية قبل كل آذان بدقيقتين",time:120000},
				{title:"التبية قبل آذان الفجر",time:120000},
				//{title:"التبية قبل آذان الشروق",time:120000},
				{title:"التبية قبل آذان الظهر",time:120000},
				{title:"التبية قبل آذان العصر",time:120000},
				{title:"التبية قبل آذان المغرب",time:120000},
				{title:"التبية قبل آذان العشاء",time:120000},
		 ];


function inti(){
	for (var i=0; i < data.length; i++) {
	 var rowItem= data[i];
	 
	 var rowController=Alloy.createController('row/rowParyTimeSetting',rowItem);
	 $.tbl.appendRow(rowController.getView(),true);
	};
};
inti();