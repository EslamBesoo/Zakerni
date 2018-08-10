// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


function prayTime(){ 
      //$.img1.image="/images/Homepage/ic_prayers_time_animated.png";
        closeAllSec();
      var x={title:"مواقيت الصلاة",type:""};
      Alloy.Globals.Navigator.open("prayTime",x); 
     // $.img1.image="/images/Homepage/ic_prayers_time.png";
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
      Alloy.Globals.Navigator.open("azkarList",x); 
};

var matrix2d = Ti.UI.create2DMatrix();
matrix2d = matrix2d.rotate(10); // in degrees
matrix2d = matrix2d.scale(1.1); // scale to 1.5 times original size
var a = Ti.UI.createAnimation({
    transform: matrix2d,
    duration: 500,
    autoreverse: true,
    visible:true,
    repeat: 1
});



var b = Ti.UI.createAnimation({
    opacity: 0,
    duration: 100
});

var c = Ti.UI.createAnimation({
    opacity: 1,
    duration: 2000
});
imgs();


function imgs(){
      $.imgLogo.animate(c);
setTimeout(function() {
      $.img1.visible=true;
      $.img1.animate(a);
}, 500);

setTimeout(function() {
      $.img2.visible=true;
      $.img2.animate(a);
}, 1000);

setTimeout(function() {
      $.img3.visible=true;
      $.img3.animate(a);
}, 1500);

setTimeout(function() {
      $.img4.visible=true;
      $.img4.animate(a);
}, 2000);

setTimeout(function() {
      $.img5.visible=true;
      $.img5.animate(a);
}, 2500);

};



$.imgLogo.addEventListener('click', function(){
    $.imgLogo.animate(b, function(){
        $.imgLogo.animate(c);
    });
});

function fedin(control){
       control.animate(b, function(){
        control.animate(c);
    });
};

