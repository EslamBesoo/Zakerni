// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var util = require("util");
   var tools = require('bencoding.android.tools');
var _alarmModule = require('bencoding.alarmmanager');
Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");
var _alarmManager = _alarmModule.createAlarmManager();
function getCity(){ 
	 var x={
			 	title:$.lblCity.objName,
			 	param:"country",
			 	cont:$.lblCity,
			 	
		 	};
		 	//alert(JSON.stringify(x));
   Alloy.createController("popupWin",x).getView().open(); 
};
Ti.App.addEventListener('setServices',function(){
      Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
      Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");
      AddServices();
});

function AddServices() {
      Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
      Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");
    Alloy.Globals.launchCount = Ti.App.Properties.getBool("Launchcount");
    if (Alloy.Globals.launchCount == true) {
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
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AddservicesService',
        requestCode: randomNumber,
      year: now.getFullYear(),
        month: now.getMonth(),
        day: Number(nextday),
        hour: Number("1"),
        minute: Number("10"),
        forceRestart: true,

        repeat: 86400000 });


      Ti.App.Properties.setBool("Launchcount", false);
      Alloy.Globals.launchCount = Ti.App.Properties.getBool("Launchcount");
      setTimeout(function(){
          var x={title:"ذكرني",img:"mutooncat"};
            Alloy.Globals.Navigator.open("mainApp",x);
    },1000);
    } else {
          
    };
    //Alloy.Globals.loading.hide();
    
  }
 		Ti.API.info(Ti.App.Properties.getString("cLat")+"\n"+Ti.App.Properties.getString("cLon")+"\n"+Ti.App.Properties.getString("cTitle"));