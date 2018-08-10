// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var moment = require('alloy/moment');
$.lblTitle.text=args.data.title;
var reqNumSabah = 6000;
var reqNumMasaa = 6100;

var _alarmModule = require('bencoding.alarmmanager');
var _alarmManager = _alarmModule.createAlarmManager();
if (args.id == 2) {
      $.setTimebtn.setVisible(false);
}else if(args.id == 0){
    var AzkarSabahTime = Ti.App.Properties.getObject("AzkarSabahTime");
if(AzkarSabahTime == null){
      
}else{
     $.setTimebtn.setTitle(AzkarSabahTime.timeView); 
}  
}else if(args.id == 1){
     var AzkarMasaaTime = Ti.App.Properties.getObject("AzkarMasaaTime");
if(AzkarMasaaTime == null){
      
}else{
     $.setTimebtn.setTitle(AzkarMasaaTime.timeView); 
} 
}


var picker = Ti.UI.createPicker({
  type:Ti.UI.PICKER_TYPE_DATE,
  //minDate:new Date(2017,11,31),
  //maxDate:maxDate,
  value:new Date(),
  top:50
}); 
function setTimeValue(){
      picker.showTimePickerDialog({
  value: new Date(),
  callback: function(e) {
    if (e.cancel) {
      Ti.API.info('User canceled dialog');
    } else {
      Ti.API.info('User selected date: ' + e.value);
      var selected = moment(e.value).format("H:m");
      var timeView = moment(e.value).format("h:m a");
      Ti.API.info('User selected new date: ' + selected);
      if (args.id == 0) {
            if (Ti.App.Properties.getObject("AzkarSabahTime") != null) {
                  _alarmManager.cancelAlarmService(reqNumSabah);      
                  
            };
            Ti.App.Properties.setObject("AzkarSabahTime",{title:"الصباح",time:selected,timeView:timeView});
            $.setTimebtn.setTitle(timeView);
            
      var DateToday = new Date();
      //var newTime = timeConvertor(time);
      //var timevalue = newTime.split(' ')[0];
      var hour = selected.split(':')[0];
      var minute = selected.split(':')[1];
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AzkarServiceService',
        requestCode: reqNumSabah,
        year: DateToday.getFullYear(),
        month: DateToday.getMonth(),
        day: DateToday.getDate(),
        hour: Number(hour),
        forceRestart: true,
        minute: Number(minute),
        second:Number("0"),
        repeat: 'daily',

        customData: JSON.stringify(["الصباح"])
      });
      } else if(args.id == 1){
            if (Ti.App.Properties.getObject("AzkarMasaaTime") != null) {
                  _alarmManager.cancelAlarmService(reqNumMasaa);      
                  
            };
            Ti.App.Properties.setObject("AzkarMasaaTime",{title:"المساء",time:selected,timeView:timeView});
            $.setTimebtn.setTitle(timeView);
             var DateToday = new Date();
      //var newTime = timeConvertor(time);
      //var timevalue = newTime.split(' ')[0];
      var hour = selected.split(':')[0];
      var minute = selected.split(':')[1];
      
      _alarmManager.addAlarmService({
        service: 'com.digitaldesign.Zakerni.AzkarServiceService',
        requestCode: reqNumMasaa,
        year: DateToday.getFullYear(),
        month: DateToday.getMonth(),
        day: DateToday.getDate(),
        hour: Number(hour),
        forceRestart: true,
        minute: Number(minute),
        second:Number("0"),
        repeat: 'daily',

        customData: JSON.stringify(["المساء"])
      });
      };
      
    }
    
  }
});
}

function goRadio(e){
      if(e.source.id == "setTimebtn"){}else{
           var x={title:args.data.title,id:args.id,back:true};
            Alloy.Globals.Navigator.open("azkar",x);  
      }
	
};

