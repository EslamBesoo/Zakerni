// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
/*var data=[
				{title:"إذاعة القرآن الكريم",url:"PgkGgnWUfnQ"},
				{title:"راديو الشيخ العقاسي",url:"f5anLvfaLxk"},
				{title:"إذاعة الاسلام اليوم",url:"qCvOgVdnnsY"},
				{title:"إذاعى الشيخ ماهر المعيقلي",url:"rHU9DyfMxuk"},
				{title:"إذاعة الشيخ عبد الباسط عبد الصمد",url:""},
		 ];
*/
var data=[
				{title:"إذاعة الشيخ عبد الباسط عبد الصمد",url:"http://quraan.us:9916/;*.mp3"},
				{title:" إذاعة الشيخ محمود خليل الحصري",url:"http://quraan.us:9920/;*.mp3"},
				{title:"إذاعة الشيخ فارس عباد",url:"http://quraan.us:9904/;*.mp3"},
				{title:"إذاعة الشيخ سعد الغامدي",url:"http://quraan.us:9854/;*.mp3"},
				{title:"إذاعة الشيخ ماهر المعيقلي",url:"http://quraan.us:9856/;*.mp3"},
				{title:"المصحف المعلم للمنشاوي",url:"http://quraan.us:9308/;*.mp3"},
				{title:"إذاعة الشيخ مشاري العفاسي",url:"http://quraan.us:9922/;*.mp3"},
				{title:"إذاعة الشيخ أحمد العجمي",url:"http://quraan.us:9852/;*.mp3"},
				
		 ];

function inti(){
	for (var i=0; i < data.length; i++) {
	 var rowItem= data[i];
	 
	 var rowController=Alloy.createController('row/rowRadioView',rowItem);
	 $.tbl.appendRow(rowController.getView(),true);
	};
};
inti();
Ti.API.info('data'+args.data);

if (args.data) {
	$.ptView.setHeight("80%");
};