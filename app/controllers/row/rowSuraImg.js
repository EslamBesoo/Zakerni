// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var zeroid=(parseInt(args)+3);
if (zeroid<10) {
	zeroid="000"+zeroid;
} else if (zeroid<100){
	zeroid="00"+zeroid;
}else if (zeroid>100){
	zeroid="0"+zeroid;
};
Ti.API.info('img url= '+zeroid);
//Ti.API.info("/quaran_img/"+zeroid+".jpg");
var urlImg="/quaran_img/"+zeroid+".jpg";
/*
//newView
var fileName =urlImg; 

 var file = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory+urlImg);
 Ti.API.info('img nativePath = '+file.nativePath);
 //$.imgLogo.image=file.nativePath;
imgArray=[];imgArray.push(zeroid);
$.gallery.addImages(imgArray,0);

function testArr(){
	 Ti.API.info('img imgArray = '+imgArray);
	 $.imgtest.image=urlImg;
	 
};
*/


var TiTouchImageView = require('org.iotashan.TiTouchImageView');
var imageView = TiTouchImageView.createView({
	backgroundColor:'#fff',
	top:0,
	//left:0,
	//right:0,
	//bottom:0,
	image:urlImg,
	zoom:1,
	maxZoom:2,
	minZoom:1,
});

$.rowSuraImg.add(imageView);

rtl(imageView);


