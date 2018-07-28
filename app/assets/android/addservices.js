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
var fajrTime = formattedTime(prayerTimes.fajr, 2);
Ti.API.info('fajrTime',fajrTime);
addnotificationAlarm("الفجر",fajrTime);
addAzanAlarm("الفجر",fajrTime);

var dhuhrTime = formattedTime(prayerTimes.dhuhr, 2);
Ti.API.info('dhuhrTime',dhuhrTime);
addnotificationAlarm("الظهر",dhuhrTime);
addAzanAlarm("الظهر",dhuhrTime);
var asrTime = formattedTime(prayerTimes.asr, 2);
Ti.API.info('asrTime',asrTime);
addnotificationAlarm("العصر",asrTime);
addAzanAlarm("العصر",asrTime);
var maghribTime = formattedTime(prayerTimes.maghrib, 2);
Ti.API.info('maghribTime',maghribTime);
addnotificationAlarm("المغرب",maghribTime);
addAzanAlarm("المغرب",maghribTime);
var ishaTime = formattedTime(prayerTimes.isha, 2);
Ti.API.info('ishaTime',ishaTime);
addnotificationAlarm("العشاء",ishaTime);
addAzanAlarm("العشاء",ishaTime);
var testTime = "9:05 PM";
Ti.API.info('testTime',testTime);
addnotificationAlarm("testTime",testTime);
addAzanAlarm("testTime",testTime);




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
  var fullTime = moment(time, "hh:mm A");

  var isBefore = new moment().isBefore(fullTime);

  return isBefore;
}
function timeConvertor(time) {
    var PM = true;
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
        var hour = 12 + Number(time[0]);
        //var sec = time[2].replace('PM', '');
    } else {
        var hour = time[0];
        //var sec = time[2].replace('AM', '')       
    }
    
   // console.log(hour + ':' + min + ':' + sec);
    return(hour+":"+min);
}