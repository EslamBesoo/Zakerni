// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function runRadio(){
	$.audioPlayer.setUrl(args.url);
};

function closeRadio(){
	$.audioPlayer.dispose();
};

