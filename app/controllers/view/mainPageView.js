// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


function prayTime(){
	  closeAllSec();
      var x={title:"مواقيت الصلاة",type:""};
      Alloy.Globals.Navigator.open("prayTime",x); 
};

function PraySetting(){
	  closeAllSec();
      var x={title:"اعدادات الصلاة",type:""};
      Alloy.Globals.Navigator.open("PraySetting",x); 
};

function suraList(){
	  closeAllSec();
      var x={title:"قراءة القرآن",type:""};
      Alloy.Globals.Navigator.open("suraList",x); 
};

function quranRadio(){
	  closeAllSec();
      var x={title:"استماع القرآن",type:""};
      Alloy.Globals.Navigator.open("quranRadio",x); 
};

function azkar(){
	  closeAllSec();
      var x={title:"اذكار واردة في القرآن",type:""};
      Alloy.Globals.Navigator.open("quranRadio",x); 
};