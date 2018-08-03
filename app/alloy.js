
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();
// if (OS_ANDROID)
// {
// function resumeLauncher() {
// Alloy.createController('index',{
// });
// }
// if (Ti.Android.currentActivity)
// {
// Ti.Android.currentActivity.setOnResume(resumeLauncher);
// }
// }

if(OS_ANDROID){
    var geo = require('ti.geolocation.helper');
   // geo.getLocation({success: success, error: error});  
}
Alloy.Globals.launchCount = Ti.App.Properties.getBool("Launchcount");
if (Alloy.Globals.launchCount != false) {
Ti.App.Properties.setBool("Launchcount",true);
Alloy.Globals.launchCount = Ti.App.Properties.getBool("Launchcount");
} else{};
Ti.API.info('Alloy.Globals.launchCount',Alloy.Globals.launchCount);

if (Ti.App.Properties.getString("cTitle") == null) {

Ti.App.Properties.setString("cTitle","test");
} else{
      //Ti.App.Properties.setString("cTitle","test");
      };
      if (Ti.App.Properties.getString("notificationType") == null) {

Ti.App.Properties.setString("notificationType","all");
} else{
      //Ti.App.Properties.setString("cTitle","test");
      };
Ti.API.info('cTitle',Ti.App.Properties.getString("cTitle"));
Alloy.Globals.player = Ti.Media.createSound({
        url : "/sound.mp3",
        allowBackground: true,
        volume:1.0,
        
        
    });
    Ti.App.Properties.setObject("player",Alloy.Globals.player);
function success(_location) {
                  console.warn("location callback success");
                  console.info(JSON.stringify(_location));
                  Ti.App.Properties.setString("userLat",_location.latitude);
                  Ti.App.Properties.setString("userLon",_location.longitude);
                  Alloy.Globals.userLat = Ti.App.Properties.getString("userLat");
                  Alloy.Globals.userLon = Ti.App.Properties.getString("userLon");
                  Ti.API.info('Alloy.Globals.userLat',Alloy.Globals.userLat);
                  Ti.API.info('Alloy.Globals.userLon',Alloy.Globals.userLon);
                  
                  // $.latitude.setText("latitude : " + _location.latitude);
                  // Lat = _location.latitude;
                  // $.longitude.setText("longitude : " + _location.longitude);
                  // Long = _location.longitude;
            }

       function error(_error) {
                  console.error("Location error: " + _error);
            }
Ti.Android.currentActivity.addEventListener('onIntent', function(e) {
    Ti.API.info('onIntent: received intent');
    Ti.API.info('e onIntent',JSON.stringify(e));
    // var text = e.intent.getStringExtra("android.intent.extra.TEXT");
    // if(text){
        // Ti.API.info('TEXT: ' + text);
        // Alloy.Globals.win.backgroundColor = 'green';
    // }
});
Ti.Android.currentActivity.addEventListener('newintent', function(e) {
    Ti.API.info('newintent: received intent');
    Ti.API.info('e newintent',JSON.stringify(e));
    // var text = e.intent.getStringExtra("android.intent.extra.TEXT");
    // if(text){
        // Ti.API.info('TEXT: ' + text);
        // Alloy.Globals.win.backgroundColor = 'orange';
    // }
});

Alloy.Globals.fontType="UthmanicHafs1_Ver09";
Alloy.Globals.current = Ti.Android.currentActivity;
var appSec=[];
var OPEN_MODE_NONE;
var mainSec=[];
 var iosdrawer=require("iosDrawer");
var androdrawer=require("androMenu");
var cityID;
var sectionID;
var typeID;
var advTypeID;
var countryID;
var _title;
var _desc;
var _price; 
Alloy.Globals.userLat = Ti.App.Properties.getString("cLat");
Alloy.Globals.userLon = Ti.App.Properties.getString("cLon");

var LocationIndicator = Ti.App.Properties.getString("LocationIndicator");
if (LocationIndicator == "GPS") {
      Alloy.Globals.LocationGPS = true;
      Alloy.Globals.LocationCity = false;
      
} else if(LocationIndicator == "City"){
      Alloy.Globals.LocationGPS = false;
      Alloy.Globals.LocationCity = true;
};


var iosToast=require("iosToast");
if( OS_ANDROID ) {
  Alloy.Globals.Android = { 
    "Api" : Ti.Platform.Android.API_LEVEL
  }; 
}
 
Alloy.Globals.hOff=false;
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
 
Alloy.Globals.applang=Ti.App.Properties.getString("SETTING_LANGUAGE");
Alloy.Globals.appURl="http://www.aldallaal.com/mobile/api/"; 
//Alloy.Globals.imagePath="http://www.aldallaal.com/images/";   
Alloy.Globals.imagePath="http://aldallaal.com/scripts/timthumb.php?src=http://aldallaal.com/images/";    

Alloy.Globals.applang=Ti.App.Properties.getString("SETTING_LANGUAGE");
  if (Alloy.Globals.applang=="en") {Alloy.Globals.isRTL="left";
}else if (Alloy.Globals.applang=="ar"){Alloy.Globals.isRTL="right";};


				
					if (Alloy.Globals.applang == null) {
						Ti.App.Properties.setString("SETTING_LANGUAGE","ar");
                        Ti.Locale.setLanguage("ar");
                        Ti.API.info(Alloy.Globals.applang+'/ar-right');
                       // Alloy.Globals.isRTL = Ti.Locale.currentLanguage === 'ar';
                        Alloy.Globals.applang=Ti.App.Properties.getString("SETTING_LANGUAGE");
                        Alloy.Globals.isRTL="right";
					} else{
						 Ti.Locale.setLanguage(Ti.App.Properties.getString("SETTING_LANGUAGE"));
                           Ti.API.info(Alloy.Globals.applang+'/en-left');
					  
						};
  
   
 

function Langme(param){
	return Ti.App.Properties.getString(param);
};
function toast(title,win){
    if (OS_ANDROID) {
            Alloy.createWidget("com.mcongrove.toast", null, {
            text: title,
            duration: 2000,
            view: win
            });
    }else{
            iosToast.show(title);
    };
};


function sharedata(e,_status){
      if (OS_ANDROID) {
    var directory = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'pictures/shareing');
    !directory.exists() && directory.createDirectory();
    
      var fileToShare = Ti.Filesystem.getFile(directory.resolve(), 'aldallal.jpg');
    fileToShare.write(e.toImage());   
    _status=_status+"\n تحميل التطبيق من "+"https://play.google.com/store/apps/details?id=com.digitaldesign.aldallaalPartner";
    }else{
    var img = e.toImage();
        fileToShare = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'aldallal.jpg');
         fileToShare.write(e.toImage());  
   // fileToShare = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'tempimage.jpg');
};
   // write the blob image to created file
Ti.API.info('share: '+_status);
    var socialWidget=Alloy.createWidget('com.alcoapps.socialshare');
    socialWidget.share({
        status:_status+"\n تحميل التطبيق من "+"https://play.google.com/store/apps/details?id=com.digitaldesign.aldallaalPartner",
        //androidDialogTitle:"Share With",
        image:fileToShare.nativePath,
        androidDialogTitle  :"الدلال",
        });
}

function rtl(controll){
    if (Alloy.Globals.applang ==="ar") {
      controll.transform=Ti.UI.create2DMatrix().scale(-1,1);
    }else{controll.transform=null;};  
   
};

function rtlEN(controll){
    if (Alloy.Globals.applang ==="en") {
      controll.transform=Ti.UI.create2DMatrix().scale(-1,1);
    }else{controll.transform=null;};  
   
};
 
function r2l(controll){
    if (Alloy.Globals.applang ==="ar") {
    	controll.transform=Ti.UI.create2DMatrix().scale(-1,1);
        	for (var i = controll.children.length; i > 0; i--){
            try{
            	controll.children[i-1].children[0].transform=Ti.UI.create2DMatrix().scale(-1,1);
            controll.children[i-1].children[1].transform=Ti.UI.create2DMatrix().scale(-1,1);
            }catch(e){};
             Ti.API.info('controll: '+JSON.stringify(controll.children[i-1]));
         };
    }else{
    	controll.transform=null;
    	for (var i = controll.children.length; i > 0; i--){
    		 try{
             controll.children[i-1].children[0].transform=null;
            controll.children[i-1].children[1].transform=null;
             }catch(e){};
         };
    };  
   
};

function _backButton(win){
	if (OS_ANDROID) {
					win.addEventListener('android:back', function(e) {var activity = Titanium.Android.currentActivity; activity.finish();});
					win.addEventListener('android:back', function(){win.close(Titanium.UI.Android);});
				//var	toolbar = (Toolbar) rootView.findViewById(R.id.my_awesome_toolbar);	
					};
			};
			
			
		/*	
function FormatDate(date)
	{   
	    var arr = date.split(/[- :T]/), // from your example var date = "2012-11-14T06:57:36+0000";
	    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], 00);
	    newDate = date.toString("MMMM");
	    //.. do further stuff here  
	   // alert("newDate:"+newDate+"\n"+newDate.substring(4,16));
	    return newDate.substring(4,16);
	}
			
*/
function htm(content){
				var htmlPage="<html><header> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"></header><body>"+content+"\n"+"</body></html>";
					return htmlPage;
			};
			


function getlocation(win){
	if(Ti.Network.online){
        Ti.Geolocation.purpose = "Receive User Location";
        if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.getCurrentPosition(function(e){

            if (!e.success || e.error)
            {
               toast('غير قادر علي فتح الموقع '+e.error);
                return;
            }
            var longitude = e.coords.longitude;
            var latitude = e.coords.latitude;
            
            Ti.App.Properties.setString("long",longitude);
            Ti.App.Properties.setString("lat",latitude);

        // alert("latitude: " + latitude + "longitude: " + longitude);

        });
       } else {
       		var opengps = require('Gps_AccessFromSetting');
       		opengps._checkGPS(win);
       		}
    }else{
        toast(" الانترنت مغلق يجب فتح الانترنت للحصول علي الموقع",win);
    }
};


function closeAllSec(){
	for (var i=0; i < appSec.length; i++) {
                 try{
                         var winx= appSec[i];
                          	winx.close();
                       		 winx=null;
                 }catch(e){Ti.API.info(' Alloy Err:' +JSON.stringify(e));};
                };
                
               
};

function getToggel(menu){
	if (OS_IOS) {
		if (Ti.Locale.currentLanguage=="ar") {
			Ti.API.info('App lang Ar ='+Ti.Locale.currentLanguage);
			menu.toggleRightWindow();
	
		} else{
			menu.toggleLeftWindow();
		};
	} else{
		if (Ti.Locale.currentLanguage=="ar") {
			Ti.API.info('App lang Ar ='+Ti.Locale.currentLanguage);
			//menu.toggleRight();
	menu.toggleLeft();	
		} else{
			menu.toggleLeft();	
		};
	};
};

function checkemail(emailAddress)
				{
				    var str = emailAddress;
				    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				    if (filter.test(str))
				    {
				        testresults = true;
				    }
				    else
				    {
				        testresults = false;
				    }
				    Ti.API.info(testresults+ '= checkemail: '+emailAddress);
				    return (testresults);
				};
 