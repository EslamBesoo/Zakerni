var service = Ti.Android.currentService;
var serviceIntent = service.getIntent();

var Alloy = require('alloy');
var _alarmModule = require('bencoding.alarmmanager');
var _alarmManager = _alarmModule.createAlarmManager();
Ti.API.info('findStartActivityName',_alarmManager.findStartActivityName());
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


_alarmManager.cancelNotifications();
var City = Ti.App.Properties.getString("cTitle");
var fromGMT;
if (City == "مصر‎") {
      fromGMT =2;
      var params = adhan.CalculationMethod.Egyptian();
      params.madhab = adhan.Madhab.Shafi;
} else if (City == "الكويت") {
      fromGMT =3;
      var params = adhan.CalculationMethod.Kuwait();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "السعودية") {
      fromGMT =3;
      var params = adhan.CalculationMethod.UmmAlQura();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "الإمارات") {
      fromGMT =4;
      var params = adhan.CalculationMethod.Gulf();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "البحرين") {
      fromGMT =3;
      var params = adhan.CalculationMethod.MuslimWorldLeague();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "قطر") {
      fromGMT =3;
      var params = adhan.CalculationMethod.Qatar();
      params.madhab = adhan.Madhab.Shafi;
}else if (City == "العراق") {
      fromGMT =3;
      var params = adhan.CalculationMethod.MuslimWorldLeague();
      params.madhab = adhan.Madhab.Shafi;
};
 //params.madhab = adhan.Madhab.Shafi;
var prayerTimes = new adhan.PrayerTimes(coordinates, now, params);
var formattedTime = adhan.Date.formattedTime;

var fajrTime = formattedTime(prayerTimes.fajr, fromGMT, '24h');
var dhuhrTime = formattedTime(prayerTimes.dhuhr, fromGMT, '24h');
var asrTime = formattedTime(prayerTimes.asr, fromGMT, '24h');
var maghribTime = formattedTime(prayerTimes.maghrib, fromGMT, '24h');
var ishaTime = formattedTime(prayerTimes.isha, fromGMT, '24h');
Ti.API.info('fajrTime',fajrTime);
Ti.API.info('dhuhrTime',dhuhrTime);
Ti.API.info('asrTime',asrTime);
Ti.API.info('maghribTime',maghribTime);
Ti.API.info('ishaTime',ishaTime);
var fajrReqNum = {notification:100,azan:150};
var dhuhrReqNum = {notification:200,azan:250};
var asrReqNum = {notification:300,azan:350};
var maghribReqNum = {notification:400,azan:450};
var ishaReqNum = {notification:500,azan:550};

var notificationType = Ti.App.Properties.getString("notificationType");
if (notificationType == "all") {
addnotificationAlarm("الفجر",fajrTime,fajrReqNum.notification);
addAzanAlarm("الفجر",fajrTime,fajrReqNum.azan);
addnotificationAlarm("الظهر",dhuhrTime,dhuhrReqNum.notification);
addAzanAlarm("الظهر",dhuhrTime,dhuhrReqNum.azan);
addnotificationAlarm("العصر",asrTime,asrReqNum.notification);
addAzanAlarm("العصر",asrTime,asrReqNum.azan);
addnotificationAlarm("المغرب",maghribTime,maghribReqNum.notification);
addAzanAlarm("المغرب",maghribTime,maghribReqNum.azan);
addnotificationAlarm("العشاء",ishaTime,ishaReqNum.notification);
addAzanAlarm("العشاء",ishaTime,ishaReqNum.azan);   
} else if (notificationType == "fajr") {
         addnotificationAlarm("الفجر",fajrTime,fajrReqNum.notification);
         addAzanAlarm("الفجر",fajrTime,fajrReqNum.azan);
}else if (notificationType == "dhuhr") {
        addnotificationAlarm("الظهر",dhuhrTime,dhuhrReqNum.notification);
        addAzanAlarm("الظهر",dhuhrTime,dhuhrReqNum.azan);
}else if (notificationType == "asr") {
        addnotificationAlarm("العصر",asrTime,asrReqNum.notification);
        addAzanAlarm("العصر",asrTime,asrReqNum.azan);
}else if (notificationType == "maghrib") {
        addnotificationAlarm("المغرب",maghribTime,maghribReqNum.notification);
        addAzanAlarm("المغرب",maghribTime,maghribReqNum.azan);
}else if (notificationType == "isha") {
       addnotificationAlarm("العشاء",ishaTime,ishaReqNum.notification);
       addAzanAlarm("العشاء",ishaTime,ishaReqNum.azan);  
};

// 
 // var testTime = "21:45";
  // var testTime2 = "21:50";
 // // var testTime3 = "22:28";
// // 
 // addnotificationAlarm("testTime",testTime,700);
 // addAzanAlarm("testTime",testTime,750);
 // addnotificationAlarm("testTime2",testTime2,800);
 // addAzanAlarm("testTime2",testTime2,850);
 // addnotificationAlarm("testTime3",testTime3);
 // addAzanAlarm("testTime3",testTime3);

Ti.API.info('fajrTime',fajrTime);
Ti.API.info('dhuhrTime',dhuhrTime);
Ti.API.info('asrTime',asrTime);
Ti.API.info('maghribTime',maghribTime);
Ti.API.info('ishaTime',ishaTime);

setTimeout(function(){
      Ti.API.info("First Service Ended");
      Ti.Android.stopService(serviceIntent);
},10000);

function addAzanAlarm(title, time,requestNumber) {

  if (checkTime(time)) {
    setTimeout(function () {
         
      var randomNumber = util.getRandomInt(1, 2000);
      var DateToday = new Date();
      //var newTime = timeConvertor(time);
      //var timevalue = newTime.split(' ')[0];
      var hour = time.split(':')[0];
      var minute = time.split(':')[1];
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AdhanserviceService',
        requestCode: randomNumber,
        year: DateToday.getFullYear(),
        month: DateToday.getMonth(),
        day: DateToday.getDate(),
        hour: Number(hour),
        forceRestart: true,
        minute: Number(minute),
        second:Number("0"),

        customData: JSON.stringify([title])
      });

      Ti.API.info('service Azan added', hour +":"+ minute);
    }, 100);
  };
  Ti.API.info('Check Time Azan ' + title + " " + time, checkTime(time));
}
function addnotificationAlarm(title, time,requestNumber) {
  if (checkTime(time)) {
    setTimeout(function () {
          
      var randomNumber = util.getRandomInt(2000, 4000);
      var DateToday = new Date();
      var hour = time.split(':')[0];
      var minute = time.split(':')[1];
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

        second:Number("0"),
        
        customData: JSON.stringify([title])
      });
      Ti.API.info('service notification added', hour +":"+ newmin);
    }, 200);
  };
  Ti.API.info('Check Time Notification ' + title + " " + time, checkTime(time));
}

function checkTime(time) {
      
  var fullTime =  moment(time, "H:m");

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
                 var hour = 12; 
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