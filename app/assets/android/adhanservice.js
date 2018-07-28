var service = Ti.Android.currentService;
var serviceIntent = service.getIntent();
var Alloy = require('alloy');
var tools = require('bencoding.android.tools');
var util = require("util");
var ArgsData = JSON.parse(serviceIntent.getStringExtra('customData'));
//var player = Alloy.Globals.player;

    // setTimeout(function(){
          // Ti.API.info("third Service Started");
 // Ti.API.info('third service ArgsData',JSON.stringify(ArgsData));
      // setNotification();
      // //playAlarmSound();
//       
// },30000);
setNotification();
Ti.Android.stopService(serviceIntent);
function setNotification(alarm){
    var activity = Ti.Android.currentActivity;
    var intent = Ti.Android.createIntent({
        action : Ti.Android.ACTION_MAIN,
        className : 'com.digitaldesign.Zakerni.ZakerniActivity',
        //packageName: 'com.isapapps.Zakerni',
      flags : Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
    });
    //intent.flags |= Ti. Android.FLAG_ACTIVITY_NEW_TASK | Ti. Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED;
    intent.addCategory(Titanium.Android.CATEGORY_LAUNCHER);
    
    var pending = Ti.Android.createPendingIntent({
        activity : activity,
        intent : intent,
        type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
        flags : Ti.Android.FLAG_ACTIVITY_NO_HISTORY
});
    var message = " "+"حان الآن موعد آذان"+" "+ArgsData[0]+" ";
    var channel = Ti.Android.NotificationManager.createNotificationChannel({
        id: 'my_channel',
        name: 'TEST CHANNEL',
        importance: Ti.Android.IMPORTANCE_HIGH,
        enableVibration:true,
        enableLights:true,
        showBadge:true,
        bypassDnd:true
    });
    var notificationOptions = {
        contentIntent : pending,
        contentTitle : 'تطبيق ذكرنى',
        contentText : message,
        tickerText : message,
        when : new Date().getTime(),
        icon: Ti.App.Android.R.drawable.appicon,
        flags :  Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_SHOW_LIGHTS | Titanium.Android.FLAG_ONLY_ALERT_ONCE,
        sound: Ti.Filesystem.getResRawDirectory() + 'sound',
        channelId: 'my_channel',
        visibility:Titanium.Android.VISIBILITY_PUBLIC
           // defaults: Titanium.Android.NotificationManager.DEFAULT_SOUND
    };

    var notification = Ti.Android.createNotification(notificationOptions);
    var randomNumber = util.getRandomInt(1,2000);
    //notification.sound = Ti.Filesystem.getResRawDirectory() + 'sound.mp3';
    Ti.Android.NotificationManager.notify(1, notification);

Ti.Media.vibrate([0,100,100,200,100,100,200,100,100,200]);
}



// function playAlarmSound() {
// 
//     
    // player.play();
// 
// }

