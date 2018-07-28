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
$.img.image="/quaran_img/"+zeroid+".jpg";
