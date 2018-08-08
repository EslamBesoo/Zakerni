// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var DateToday = new Date();
//var geo = require('ti.geolocation.helper');
var hijri = require('hijri');
var DateHijri = hijri.convert(DateToday, 0);
var adhan = require('adhan');
Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");
var City = Ti.App.Properties.getString("cTitle");
var coordinates = new adhan.Coordinates(Alloy.Globals.userLat, Alloy.Globals.userLon);
Ti.API.info('Alloy.Globals.userLat',Alloy.Globals.userLat);
// var params = adhan.CalculationMethod.Egyptian();
   // params.madhab = adhan.Madhab.Shafi;
var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
              "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

var days =["اﻷحد","اﻷثنين","الثلاثاء","اﻷربعاء","الخميس","الجمعة","السبت"];

var data=[
				{title:"الفجر",time:"03:26",type:"ص"},
				{title:"الشروق",time:"05:04",type:"ص"},
				{title:"الظهر",time:"11:52",type:"ص"},
				{title:"العصر",time:"03:29",type:"م"},
				{title:"المغرب",time:"06:40",type:"م"},
				{title:"العشاء",time:"08:07",type:"م"},
		 ];

setTimeout(inti,500);
function inti(){
       $.lbltime.setText(DateHijri.dayOfMonth+" "+ DateHijri.monthText +" "+ DateHijri.year);
       $.lblTitle.setText(days[DateToday.getDay()] + " "+DateToday.getDate() + " "+ months[DateToday.getMonth()] + " "+ DateToday.getFullYear());
	
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
////// get pryer times
      var prayerTimes = new adhan.PrayerTimes(coordinates, DateToday, params);
      //// formate dates
     var formattedTime = adhan.Date.formattedTime;
	/////// add Fajr /////
        var fajrTime = formattedTime(prayerTimes.fajr, fromGMT);
        var fajrHour = fajrTime.split(' ')[0];
        if (fajrTime.split(' ')[1] == "AM") {
              var fajrtype = "ص";
        } else{var fajrtype = "م";};
        var fajrRow =  {title:"الفجر",time:fajrHour,type:fajrtype};
        var rowController=Alloy.createController('row/rowParyTimeView',fajrRow);
        $.tbl.appendRow(rowController.getView(),true);
        /////// add Fajr /////
        
        /////// add sunrise /////
        var sunriseTime = formattedTime(prayerTimes.sunrise, fromGMT);
        var sunriseHour = sunriseTime.split(' ')[0];
        if (sunriseTime.split(' ')[1] == "AM") {
              var sunrisetype = "ص";
        } else{var sunrisetype = "م";};
        var sunriseRow =  {title:"الشروق",time:sunriseHour,type:sunrisetype};
        var rowController=Alloy.createController('row/rowParyTimeView',sunriseRow);
        $.tbl.appendRow(rowController.getView(),true);
        /////// add sunrise /////
        
        /////// add dhuhr /////
        var dhuhrTime = formattedTime(prayerTimes.dhuhr, fromGMT);
        var dhuhrHour = dhuhrTime.split(' ')[0];
        if (dhuhrTime.split(' ')[1] == "AM") {
              var dhuhrtype = "ص";
        } else{var dhuhrtype = "م";};
        var dhuhrRow =  {title:"الظهر",time:dhuhrHour,type:dhuhrtype};
        var rowController=Alloy.createController('row/rowParyTimeView',dhuhrRow);
        $.tbl.appendRow(rowController.getView(),true);
        /////// add dhuhr /////
        
        /////// add asr /////
        var asrTime = formattedTime(prayerTimes.asr, fromGMT);
        var asrHour = asrTime.split(' ')[0];
        if (asrTime.split(' ')[1] == "AM") {
              var asrtype = "ص";
        } else{var asrtype = "م";};
        var asrRow =  {title:"العصر",time:asrHour,type:asrtype};
        var rowController=Alloy.createController('row/rowParyTimeView',asrRow);
        $.tbl.appendRow(rowController.getView(),true);
        /////// add asr /////
        
        /////// add maghrib /////
        var maghribTime = formattedTime(prayerTimes.maghrib, fromGMT);
        var maghribHour = maghribTime.split(' ')[0];
        if (maghribTime.split(' ')[1] == "AM") {
              var maghribtype = "ص";
        } else{var maghribtype = "م";};
        var maghribRow =  {title:"المغرب",time:maghribHour,type:maghribtype};
        var rowController=Alloy.createController('row/rowParyTimeView',maghribRow);
        $.tbl.appendRow(rowController.getView(),true);
        /////// add maghrib /////
        
        /////// add isha /////
        var ishaTime = formattedTime(prayerTimes.isha, fromGMT);
        var ishaHour = ishaTime.split(' ')[0];
        if (ishaTime.split(' ')[1] == "AM") {
              var ishatype = "ص";
        } else{var ishatype = "م";};
        var ishaRow =  {title:"العشاء",time:ishaHour,type:ishatype};
        var rowController=Alloy.createController('row/rowParyTimeView',ishaRow);
        $.tbl.appendRow(rowController.getView(),true);
       // Alloy.Globals.loading.hide();
        /////// add isha /////
	// for (var i=0; i < data.length; i++) {
	 // var rowItem= data[i];
// 	 
	 // var rowController=Alloy.createController('row/rowParyTimeView',rowItem);
	 // $.tbl.appendRow(rowController.getView(),true);
	// };
};
function success(_location) {
                  console.warn("location callback success");
                  console.info(JSON.stringify(_location));
                  Ti.App.Properties.setString("userLat",_location.latitude);
                  Ti.App.Properties.setString("userLon",_location.longitude);
                  Alloy.Globals.userLat = Ti.App.Properties.getString("userLat");
                  Alloy.Globals.userLon = Ti.App.Properties.getString("userLon");
                  Ti.API.info('Alloy.Globals.userLat',Alloy.Globals.userLat);
                  Ti.API.info('Alloy.Globals.userLon',Alloy.Globals.userLon);
                  
                  

var coordinates = new adhan.Coordinates(Alloy.Globals.userLat, Alloy.Globals.userLon);
Ti.API.info('Alloy.Globals.userLat',Alloy.Globals.userLat);
var params = adhan.CalculationMethod.Egyptian();
   params.madhab = adhan.Madhab.Shafi;

setTimeout(inti,500);

            }

       function error(_error) {
                  console.error("Location error: " + _error);
            }
// setTimeout(function(){
      // Alloy.Globals.loading.show("Loading . . ",false);
      // geo.getLocation({success: success, error: error});
// },10);            
// $.prayTime.addEventListener('open',function(){
      // setTimeout(function(){
    // Alloy.Globals.loading.show("Loading . . .",false);  
// },10);
      // geo.getLocation({success: success, error: error});
// }) ;           
//inti();