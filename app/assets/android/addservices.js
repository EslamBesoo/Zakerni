var service = Ti.Android.currentService;
var serviceIntent = service.getIntent();

var Alloy = require('alloy');
var _alarmModule = require('bencoding.alarmmanager');
var _alarmManager = _alarmModule.createAlarmManager();
Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");
var now = new Date();
var util = require("util");
var moment = require('alloy/moment');
var ArgsData = JSON.parse(serviceIntent.getStringExtra('customData'));
Ti.API.info('first service ArgsData',JSON.stringify(ArgsData));
Ti.API.info("First Service Launched");
var adhan = require('adhan');
var coordinates = new adhan.Coordinates(Alloy.Globals.userLat, Alloy.Globals.userLon);
var params = adhan.CalculationMethod.Egyptian();
   params.madhab = adhan.Madhab.Shafi;
var prayerTimes = new adhan.PrayerTimes(coordinates, now, params);
var formattedTime = adhan.Date.formattedTime;
_alarmManager.cancelNotifications();
var City = Ti.App.Properties.getString("cTitle");
var fromGMT;
if (City == "مصر‎") {
      fromGMT =2;
} else if (City == "الكويت") {
      fromGMT =3;
}else if (City == "السعودية") {
      fromGMT =3;
}else if (City == "الإمارات") {
      fromGMT =4;
}else if (City == "البحرين") {
      fromGMT =3;
}else if (City == "قطر") {
      fromGMT =3;
}else if (City == "العراق") {
      fromGMT =3;
};


var fajrTime = formattedTime(prayerTimes.fajr, fromGMT);
var dhuhrTime = formattedTime(prayerTimes.dhuhr, fromGMT);
var asrTime = formattedTime(prayerTimes.asr, fromGMT);
var maghribTime = formattedTime(prayerTimes.maghrib, fromGMT);
var ishaTime = formattedTime(prayerTimes.isha, fromGMT);

var notificationType = Ti.App.Properties.getString("notificationType");
if (notificationType == "all") {
   addnotificationAlarm("الفجر",fajrTime);
addAzanAlarm("الفجر",fajrTime);

addnotificationAlarm("الظهر",dhuhrTime);
addAzanAlarm("الظهر",dhuhrTime);


addnotificationAlarm("العصر",asrTime);
addAzanAlarm("العصر",asrTime);


addnotificationAlarm("المغرب",maghribTime);
addAzanAlarm("المغرب",maghribTime);


addnotificationAlarm("العشاء",ishaTime);
addAzanAlarm("العشاء",ishaTime);   
} else if (notificationType == "fajr") {
         addnotificationAlarm("الفجر",fajrTime);
         addAzanAlarm("الفجر",fajrTime);
}else if (notificationType == "dhuhr") {
        addnotificationAlarm("الظهر",dhuhrTime);
        addAzanAlarm("الظهر",dhuhrTime);
}else if (notificationType == "asr") {
        addnotificationAlarm("العصر",asrTime);
        addAzanAlarm("العصر",asrTime);
}else if (notificationType == "maghrib") {
        addnotificationAlarm("المغرب",maghribTime);
        addAzanAlarm("المغرب",maghribTime);
}else if (notificationType == "isha") {
       addnotificationAlarm("العشاء",ishaTime);
addAzanAlarm("العشاء",ishaTime); 
};


// var testTime = "9:05 PM";
// Ti.API.info('testTime',testTime);
// addnotificationAlarm("testTime",testTime);
// addAzanAlarm("testTime",testTime);


Ti.API.info('fajrTime',fajrTime);
Ti.API.info('dhuhrTime',dhuhrTime);
Ti.API.info('asrTime',asrTime);
Ti.API.info('maghribTime',maghribTime);
Ti.API.info('ishaTime',ishaTime);

setTimeout(function(){
      Ti.API.info("First Service Ended");
      Ti.Android.stopService(serviceIntent);
},10000);

function addAzanAlarm(title, time) {

  if (checkTime(time)) {
    setTimeout(function () {
      var randomNumber = util.getRandomInt(1, 2000);
      var DateToday = new Date();
      var newTime = timeConvertor(time);
      var timevalue = newTime.split(' ')[0];
      var hour = timevalue.split(':')[0];
      var minute = timevalue.split(':')[1];
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AdhanserviceService',
        requestCode: randomNumber,
        year: DateToday.getFullYear(),
        month: DateToday.getMonth(),
        day: DateToday.getDate(),
        hour: Number(hour),
        forceRestart: true,
        minute: Number(minute),
        //second:Number("00"),

        customData: JSON.stringify([title])
      });

      Ti.API.info('service Azan added', time);
    }, 100);
  };
  Ti.API.info('Check Time Azan ' + title + " " + time, checkTime(time));
}
function addnotificationAlarm(title, time) {
  if (checkTime(time)) {
    setTimeout(function () {
      var randomNumber = util.getRandomInt(1, 2000);
      var DateToday = new Date();
      var newTime = timeConvertor(time);
      Ti.API.info('newTime', newTime);
      var timevalue = newTime.split(' ')[0];
      var hour = timevalue.split(':')[0];
      var minute = timevalue.split(':')[1];
      var newmin = Number(minute) - 2;
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.NotificationserviceService',
        requestCode: randomNumber,
        forceRestart: true,
        year: DateToday.getFullYear(),
        month: DateToday.getMonth(),
        day: DateToday.getDate(),
        hour: Number(hour),
        minute: Number(newmin),

       // second:Number("00"),
        
        customData: JSON.stringify([title])
      });
      Ti.API.info('service notification added', time);
    }, 200);
  };
  Ti.API.info('Check Time Notification ' + title + " " + time, checkTime(time));
}

function checkTime(time) {
      
  var fullTime =  moment(time, "hh:mm A");

  var isBefore = new moment().isBefore(fullTime);

  return isBefore;
}
function timeConvertor(time) {
    var PM ;
    var timesplit = time.split(' ')[1];
    Ti.API.info('timesplit',timesplit);
    if (timesplit  == "PM") {
              var PM = true;
              Ti.API.info('PM',PM);
        } else{var PM = false;
              Ti.API.info('PM',PM);};
    
    time = time.split(':');
    var min = time[1];
    
    if (PM) {
            if ( Number(time[0]) == 12) {
                 var hour = time[0]; 
            } else{
        var hour = 12 + Number(time[0]);
        };
        //var sec = time[2].replace('PM', '');
    } else {
        var hour = time[0];
        //var sec = time[2].replace('AM', '')       
    }
    
   // console.log(hour + ':' + min + ':' + sec);
    return(hour+":"+min);
}