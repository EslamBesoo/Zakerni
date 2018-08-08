// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var geo = require('ti.geolocation.helper');
var util = require("util");

if (Alloy.Globals.LocationGPS) {
       geo.getLocation({success: success, error: error});
};
function getLocation(){
      geo.getLocation({success: success, error: error});
}

function success(_location) {
                  //console.warn("location callback success");
                 // console.info(JSON.stringify(_location));
                  Ti.App.Properties.setString("cLat",_location.latitude);
                  Ti.App.Properties.setString("cLon",_location.longitude);
                  Alloy.Globals.userLat = _location.latitude;
                  Alloy.Globals.userLon = _location.longitude;
                  Ti.API.info('Alloy.Globals.userLat',Alloy.Globals.userLat);
                  Ti.API.info('Alloy.Globals.userLon',Alloy.Globals.userLon);
                  
            }

       function error(_error) {
                  console.error("Location error: " + _error);
            }
            

setTimeout(function(){
           var permissions = ['android.permission.ACCESS_WIFI_STATE',
            'android.permission.WAKE_LOCK',
            'android.permission.GET_TASKS',
            'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
            'android.permission.ACCESS_FINE_LOCATION',
            'android.permission.RECEIVE_BOOT_COMPLETED',
            'android.permission.VIBRATE'];
Ti.Android.requestPermissions(permissions, function(e) {
    if (e.success) {
        Ti.API.info("SUCCESS");
        //getLocation();
        AddServices();
    } else {
        Ti.API.info("ERROR: " + e.error);
    }
}); 
      },1000);
   var tools = require('bencoding.android.tools');
var _alarmModule = require('bencoding.alarmmanager');
var _alarmManager = _alarmModule.createAlarmManager();

      
  function AddServices() {

    Alloy.Globals.launchCount = Ti.App.Properties.getBool("Launchcount");
    if (Alloy.Globals.launchCount == true) {
      var randomNumber = util.getRandomInt(1, 2000);
      var now = new Date();
      Ti.API.info('now', now);
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AddservicesService',
        //requestCode: randomNumber,
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
    } else {};
    //Alloy.Globals.loading.hide();
  }