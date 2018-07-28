// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.lblTitle.text=args.title;


function goRadio(){
	var x={title:args.title,url:args.url,back:true};
   		Alloy.Globals.Navigator.open("playRadioYoutube",x); 
};
