// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var drawer=args;
var rowCount;
var City = Ti.App.Properties.getString("cTitle");
 //Ti.App.Properties.getString("officeID");
if (City =="test") {} else{
Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");  
 var now = new Date();
 var moment = require('alloy/moment');
 
var adhan = require('adhan');
 var coordinates = new adhan.Coordinates(Alloy.Globals.userLat, Alloy.Globals.userLon);

var fromGMT;
var params;
if (City == "مصر‎") {
      fromGMT =2;
       params = adhan.CalculationMethod.Egyptian();
      params.madhab = adhan.Madhab.Shafi;

} else if (City == "الكويت") {
      fromGMT =3;
       params = adhan.CalculationMethod.Kuwait();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "السعودية") {
      fromGMT =3;
       params = adhan.CalculationMethod.UmmAlQura();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "الإمارات") {
      fromGMT =4;
       params = adhan.CalculationMethod.Gulf();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "البحرين") {
      fromGMT =3;
       params = adhan.CalculationMethod.MuslimWorldLeague();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "قطر") {
      fromGMT =3;
       params = adhan.CalculationMethod.Qatar();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "العراق") {
      fromGMT =3;
       params = adhan.CalculationMethod.MuslimWorldLeague();
     params.madhab = adhan.Madhab.Shafi;
};
//params.madhab = adhan.Madhab.Shafi;
var timesArray =[];
 var prayerTimes = new adhan.PrayerTimes(coordinates, now, params);
var formattedTime = adhan.Date.formattedTime;
var fajrTime = formattedTime(prayerTimes.fajr, fromGMT, '24h');
timesArray.push({title:" الفجر ",time:fajrTime});
var dhuhrTime = formattedTime(prayerTimes.dhuhr, fromGMT, '24h');
timesArray.push({title:" الظهر ",time:dhuhrTime});
var asrTime = formattedTime(prayerTimes.asr, fromGMT, '24h');
timesArray.push({title:" العصر ",time:asrTime});
var maghribTime = formattedTime(prayerTimes.maghrib, fromGMT, '24h');
timesArray.push({title:" المغرب ",time:maghribTime});
var ishaTime = formattedTime(prayerTimes.isha, fromGMT, '24h');
timesArray.push({title:" العشاء ",time:ishaTime});
//timesArray.push({title:"تجربه",time:"22:00"});
 //var testTime = "1:5";
 // var testTime2 = "22:10";
 // var testTime3 = "22:15";
  //timesArray.push({title:" testTime ",time:testTime});
 // timesArray.push({title:" testTime2 ",time:testTime2});
 // timesArray.push({title:" testTime3 ",time:testTime3});
 PutTimeLeftToPray();
 setInterval(PutTimeLeftToPray,60000);
 };
function PutTimeLeftToPray(){
var nearstPray = findNearstPray(timesArray);
var nowTime = moment();
var doneIsha = " تم رفع آذان العشاء منذ ";
var toPray = " باقى على آذان ";
var doneMin = " دقيقة ";
var doneHour= " ساعة ";
var doneAnd = " و ";
if (nearstPray == null) {
      var IshaTime  =  moment(ishaTime, "H:m");
      var diffTimeHours = nowTime.diff(IshaTime, 'hours');
      var diffTimeMinutes = nowTime.diff(IshaTime, 'minutes');
      if (Number(diffTimeHours) > 0) {
         var hours = Math.trunc(diffTimeMinutes/60);
         var minutes = diffTimeMinutes % 60;
         $.officeName.setText(doneIsha +hours+doneHour+doneAnd+minutes+ doneMin);
      }else{
         $.officeName.setText(doneIsha +diffTimeMinutes+ doneMin);
      }
} else{
      var PrayTime  =  moment(nearstPray.time, "H:m");
      var diffTimeHours = PrayTime.diff(nowTime, 'hours');
      var diffTimeMinutes = PrayTime.diff(nowTime, 'minutes');
      var hours = Math.trunc(diffTimeMinutes/60);
      var minutes = diffTimeMinutes % 60;
      if (Number(diffTimeHours) > 0) {
         var hours = Math.trunc(diffTimeMinutes/60);
         var minutes = diffTimeMinutes % 60;
        $.officeName.setText(toPray + nearstPray.title + hours + doneHour + doneAnd + minutes+ doneMin);
      }else{
         $.officeName.setText(toPray +nearstPray.title + minutes+ doneMin);
      }
       
      Ti.API.info('nearstPray != null',JSON.stringify(nearstPray)); 
}}

 function findNearstPray(array){
       var isBefore = false;
       for (var i=0; i < array.length; i++) {
             var x = array[i];
         var newTime = moment(x.time, "H:m");
          isBefore = new moment().isBefore(newTime);
         if (isBefore == true) {
               return x;
               break;
         };
         if (i == array.length && isBefore == false) {
               return null;
         };
       };
 }
 // $.officeName.text=Ti.App.Properties.getString("officeTitle");;
//$.img.image=Alloy.Globals.imagePath+Ti.App.Properties.getString("officeImg")+"&h=150&w=150&q=100&zc=0";
//alert(JSON.stringify(drawer));
 var data = [
        {title:"الرئيسية",img:"/images/Sidemenu/ic_home.png"},
        {title:"مواقيت الصلاة",img:"/images/Sidemenu/ic_pray_time.png"},
        {title: "اعدادات الصلاة",img:"/images/Sidemenu/ic_pray_setting.png"},
        {title:"قراءة القرآن",img:"/images/Sidemenu/ic_reading_quran.png"},
        {title:"استماع القرآن" ,img:"/images/Sidemenu/ic_listening_quran.png"},
        {title:"اذكار واردة في القرآن",img:"/images/Sidemenu/ic_azkar.png"},
        {title:"اتجاه القبلة",img:"/images/Sidemenu/ic_azkar.png"},
         
    ];
    rowCount=data.length;
           
    for (var i=0; i <rowCount; i++) {
     var rowitem= data[i];
     var rowController=Alloy.createController("/row/rowMenu",rowitem).getView();
         $.tableView.appendRow(rowController);
         rowController=null;
         rowitem=null;
    };
    
   if (OS_IOS) {drawer.setShouldStretchDrawer(true);};
    
   
    
    $.tableView.addEventListener("click", function(e){
       // Ti.API.info("isLeftWindowOpen: " + drawer.isLeftWindowOpen());
      // closeAllios();
        switch(e.index){
            case 0:
            closeAll();
      
                break;
            case 1:
                closeAll();
               var x={title:data[e.index].title};
              Alloy.Globals.Navigator.open("prayTime",x);
                break;
            case 2:
             closeAll();
            var x={title:data[e.index].title,type:""};
              Alloy.Globals.Navigator.open("PraySetting",x); 
               
                break;
            case 3:
             closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("suraList",x); 
               
                break;
                
                case 4:
                closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("quranRadio",x); 
                
                break;
                 
                case 5:
                closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("azkarList",x); 
                
                break;
                case 6:
                closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("qibla",x); 
                
                break;
                 
           
                
              
        }

if (OS_IOS) {
           	
           		 	getToggel(drawer);
           	}else{getToggel(drawer);};
       

        if (Alloy.Globals.applang=="ar") {
					//drawer.toggleRight();
					//drawer=null;
					//data=null;
				}else{
					//drawer.toggleLeft();
					//drawer=null;
					//data=null; 
				};
       
      
    });
    /*
    var dara=[
    
	{company_id:"2", product_id:"1", quantity:"20"},
	{company_id:"2", product_id:"1", quantity:"20"},
	{company_id:"2", product_id:"1", quantity:"20"},
]
    
    {
    mosque_id:1,
    name:"ehab ail",
    address:"giza,fasiel,from Mobile test",
    phone:"01157887337",
    proudct_List:[{company_id:"2", product_id:"1", quantity:"20"},{company_id:"2", product_id:"1", quantity:"20"},{company_id:"2", product_id:"1", quantity:"20"},]
    }
 */
    function closeAll(){
         if (OS_ANDROID) {
        for (var i=0; i < appSec.length; i++) {
                 try{
                         var winx= appSec[i];
                          	winx.close();
                       		 winx=null;
                 }catch(e){};
                };
                
                 };
    };
    
    function closeAllios(){
        
        for (var i=0; i < appSec.length; i++) {
                 try{
                     if (OS_IOS) {
                         var winx= appSec[i];
                         winx.close();
                     };
                 }catch(e){};
                };
    };
    
   
//rtl($.tableView);