// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


function init(){
      
}
$.qiblaPage.addEventListener('beforeload',function(){
      Alloy.Globals.loading.show(L("ind_Loading"),false);
});
$.qiblaPage.addEventListener('load',function(){
      Alloy.Globals.loading.hide();
});