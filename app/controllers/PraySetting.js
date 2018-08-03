// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
init();
function init(){
      $.container2.add(Alloy.createController('/view/paryCountryView',{win:$.PraySetting}).getView());
       $.container2.add(Alloy.createController('/view/prayTimeSettingView',{win:$.PraySetting}).getView());
}
