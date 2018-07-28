// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var data=[
				{title:"الفجر",time:"03:26",type:"ص"},
				{title:"الشروق",time:"05:04",type:"ص"},
				{title:"الظهر",time:"11:52",type:"ص"},
				{title:"العصر",time:"03:29",type:"م"},
				{title:"المغرب",time:"06:40",type:"م"},
				{title:"العشاء",time:"08:07",type:"م"},
		 ];


function getCity(){ 
	 var x={
			 	title:$.lblCity.objName,
			 	param:"country",
			 	cont:$.lblCity,
			 	
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("popupWin",x).getView().open(); 
};