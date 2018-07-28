// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
 $.lblTitle.text="  سورة "+args.data.name;
 $.lblid.text=" "+args.data.surah;
 function gotoSurah(){
 	//Alloy.createController("surah",args).getView().open();
 	//Alloy.createController("quranPages",args.surah).getView().open();
 	var x={title:"سورة "+args.data.name,id:args.id,page:args.data.pageNo,back:true,last:args.last.pageNo};
   		Alloy.Globals.Navigator.open("quranPages",x); 
 };

if(OS_ANDROID){
    $.row.title =args.data.name;
    
}