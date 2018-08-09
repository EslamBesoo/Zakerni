var service = Ti.Android.currentService;
var serviceIntent = service.getIntent();

//var tools = require('bencoding.android.tools');
var util = require("util");


setNotification();
Ti.Android.stopService(serviceIntent);
function setNotification(alarm){
      Ti.Android.NotificationManager.cancelAll();
      var ArgsData = JSON.parse(serviceIntent.getStringExtra('customData'));
      Ti.API.info('third service ArgsData',JSON.stringify(ArgsData));
 Ti.API.info("third Service Launched");
    var activity = Ti.Android.currentActivity;
    var intent = Ti.Android.createIntent({
        action : Ti.Android.ACTION_MAIN,
        className : 'com.digitaldesign.Zakerni.ZakerniActivity',
        flags : Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
    });
    intent.addCategory(Titanium.Android.CATEGORY_LAUNCHER);
    //intent.flags |= Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_NEW_TASK;
    var pending = Ti.Android.createPendingIntent({
        activity : activity,
        intent : intent,
        type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
        flags : Ti.Android.FLAG_UPDATE_CURRENT 
    });
    var message = " "+"حان الآن موعد آذان"+" "+ArgsData[0]+" ";
    var channel = Ti.Android.NotificationManager.createNotificationChannel({
        id: 'my_channel2',
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
        sound: Ti.Filesystem.getResRawDirectory() + 'sound.mp3',
        //sound: Ti.Filesystem.getResRawDirectory() + 'sound.mp3',
        channelId: 'my_channel2',
        visibility:Titanium.Android.VISIBILITY_PUBLIC
           // defaults: Titanium.Android.NotificationManager.DEFAULT_SOUND
    };

    var notification = Ti.Android.createNotification(notificationOptions);
    var randomNumber = util.getRandomInt(1,2000);
    Ti.API.info('Titanium.Platform.Android',Titanium.Platform.Android.API_LEVEL);
    if (Number(Titanium.Platform.Android.API_LEVEL) < Number("23")) {
          Ti.API.info('Titanium.Platform.Android.API_LEVEL < 23');
    notification.sound = Ti.Filesystem.getResRawDirectory() + 'sound.mp3';
    }else{
          Ti.API.info('Titanium.Platform.Android.API_LEVEL > 23');
    }
    Ti.Android.NotificationManager.notify(1, notification);

Ti.Media.vibrate([0,100,100,200,100,100,200,100,100,200]);
}



// function playAlarmSound() {
// 
//     
    // player.play();
// 
// }

