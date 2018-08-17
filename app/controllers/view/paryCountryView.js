// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var geo = require('ti.geolocation.helper');
var util = require("util");
var _alarmModule = require('bencoding.alarmmanager');
var _alarmManager = _alarmModule.createAlarmManager();
var data=[
				{title:"الفجر",time:"03:26",type:"ص"},
				{title:"الشروق",time:"05:04",type:"ص"},
				{title:"الظهر",time:"11:52",type:"ص"},
				{title:"العصر",time:"03:29",type:"م"},
				{title:"المغرب",time:"06:40",type:"م"},
				{title:"العشاء",time:"08:07",type:"م"},
		 ];
if (Alloy.Globals.LocationCity) {
      $.lblCity.text = Ti.App.Properties.getString("cTitle");
};

function getCity(){ 
	 var x={
			 	title:$.lblCity.objName,
			 	param:"country",
			 	cont:$.lblCity,
			 	
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("popupWin",x).getView().open(); 
   $.cityInd.image = "/images/Pray_settings_page/ic_selected.png";
   $.gpsInd.image = "/images/Pray_settings_page/ic_unselected.png";
};
Ti.App.addEventListener('setServices',function(){
      
      Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
      Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");
      Ti.App.Properties.setString("LocationIndicator","City");
      AddServices();
      
      
});

function getGPS(){
      geo.getLocation({success: success, error: error});
      $.cityInd.image = "/images/Pray_settings_page/ic_unselected.png";
   $.gpsInd.image = "/images/Pray_settings_page/ic_selected.png";
      
}
function success(_location) {
                  console.warn("location callback success");
                  console.info(JSON.stringify(_location));
                  Ti.App.Properties.setString("cLat",_location.latitude);
                  Ti.App.Properties.setString("cLon",_location.longitude);
                  Alloy.Globals.userLat = _location.latitude;
                  Alloy.Globals.userLon = _location.longitude;
                  Ti.API.info('Alloy.Globals.userLat',Alloy.Globals.userLat);
                  Ti.API.info('Alloy.Globals.userLon',Alloy.Globals.userLon);
                  Ti.App.Properties.setString("LocationIndicator","GPS");
                  AddServices();
                  toast("تم التحديد عن طريق GPS بنجاح",args.win);
                  
            }

       function error(_error) {
                  console.error("Location error: " + _error);
            }

function AddServices() {

     var randomNumber = util.getRandomInt(1, 2000);
      var now = new Date();
      Ti.API.info('now', now);
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AddservicesService',
        requestCode: randomNumber,
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        forceRestart: true });
      var randomNumber = util.getRandomInt(1, 2000);
      var nextday = Number(now.getDate() + 1);
      Ti.API.info('nextday', nextday);
      try{
             _alarmManager.cancelAlarmService(1000); 
      }catch(ex){
            
      }
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AddservicesService',
        requestCode: 1000,
      year: now.getFullYear(),
        month: now.getMonth(),
        day: Number(nextday),
        hour: Number("1"),
        minute: Number("10"),
        forceRestart: true,

        repeat: 86400000 });
        

  }