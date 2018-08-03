// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
   var tools = require('bencoding.android.tools');
var _alarmModule = require('bencoding.alarmmanager');
var _alarmManager = _alarmModule.createAlarmManager();
var util = require("util");
var data=[
				{title:"التنبيه قبل كل آذان بدقيقتين",time:120000,notificationType:"all"},
				{title:"التنبيه قبل آذان الفجر",time:120000,notificationType:"fajr"},
				//{title:"التنبيه قبل آذان الشروق",time:120000},
				{title:"التنبيه قبل آذان الظهر",time:120000,notificationType:"dhuhr"},
				{title:"التنبيه قبل آذان العصر",time:120000,notificationType:"asr"},
				{title:"التنبيه قبل آذان المغرب",time:120000,notificationType:"maghrib"},
				{title:"التنبيه قبل آذان العشاء",time:120000,notificationType:"isha"},
		 ];


function inti(){
	for (var i=0; i < data.length; i++) {
	 var rowItem= data[i];
	 
	 var rowController=Alloy.createController('row/rowParyTimeSetting',rowItem);
	 $.tbl.appendRow(rowController.getView(),true);
	};
};
inti();

$.tbl.addEventListener('click',function(e){
      
      Ti.App.fireEvent('updateNotificationType',{notificationType:data[e.index].notificationType});
      if (Ti.App.Properties.getString("notificationType") == data[e.index].notificationType) {
            Ti.API.info('notificationType Settings unchanged',Ti.App.Properties.getString("notificationType"));
      } else{
            Ti.App.Properties.setString("notificationType",data[e.index].notificationType);
             Ti.API.info('notificationType Settings changed',Ti.App.Properties.getString("notificationType"));
             AddServices();
      };
      
      
});

function AddServices() {

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

  }

