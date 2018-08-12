// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var pageid=args.page;
//var db = Ti.Database.install('ayahinfo.db',"mydb");

//var rows = db.execute('SELECT DISTINCT page_number FROM glyphs WHERE sura_number='+args.id);


 // pageid=rows.fieldByName('page_number');
// $.form.scrollToView(parseInt(pageid-1));

//$.form.addView(Alloy.createController("row/rowSuraImg",100).getView());
//605
getAllSuar();
Ti.API.info('surah data: '+JSON.stringify(args));
/*
  by surah
 
function getAllSuar(){
	for (var i=(args.page); i < (args.last); i++) {
  $.form.addView(Alloy.createController("row/rowSuraImg",(i)).getView());
	};
//$.form.scrollToView(parseInt(pageid-1));
};*/
// all mushaf
function getAllSuar(){
	for (var i=1; i < 605; i++) {
  $.form.addView(Alloy.createController("row/rowSuraImg",(i)).getView());
	};
$.form.scrollToView(parseInt(pageid-1));
};

function getTitle(e){
	$.quranPages.children[0].children[1].opacity="0.6";
	$.quranPages.children[0].children[1].backgroundColor="#526938";
	setTimeout(function(){
		$.quranPages.children[0].children[1].backgroundColor="transparent";
	},3000);
};
rtl($.form);
