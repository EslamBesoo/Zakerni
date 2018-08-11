// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args; 
Ti.API.info('azkar: '+JSON.stringify(args.page));
      var data=require("json/"+args.page).content;


function inti(){
      for (var i=0; i < data.length; i++) {
       var rowItem= data[i];
       
       var rowController=Alloy.createController('row/rowAzkar',{pageNO:i,data:rowItem,allPage:data.length});
       $.form.addView(rowController.getView());
      };
};

 inti();
 
rtl($.form);

$.nextView.visible=false;

Ti.App.addEventListener("textNext",nextView);
function nextView(){
      $.form.setCurrentPage(($.form.currentPage+1));
      Ti.API.info('test: '+data.length+" setCurrentPage"+$.form.currentPage);
};


function previousView(){
      $.form.setCurrentPage(($.form.currentPage-1));
      Ti.API.info('test: '+data.length+" setCurrentPage"+$.form.currentPage);
};


function testScroll(){
      //$.form.setCurrentPage(($.form.currentPage+1));
      Ti.API.info('test: '+data.length+" setCurrentPage"+$.form.currentPage);
      
      if ($.form.currentPage==0) {$.nextView.visible=false;}else{$.nextView.visible=true;};
      
      if ($.form.currentPage==parseInt(data.length-1)) {$.previousView.visible=false;}else{$.previousView.visible=true;};
};


rtl($.imgPrevious);
