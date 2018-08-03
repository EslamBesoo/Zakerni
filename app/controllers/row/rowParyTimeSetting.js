// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.lblTitle.text=args.title;
if (Ti.App.Properties.getString("notificationType") == args.notificationType) {
      $.img.image = "/images/Pray_settings_page/ic_selected.png";
};
Ti.App.addEventListener('updateNotificationType',function(e){
     // Ti.API.info('e updateNotificationType',JSON.stringify(e));
      if (e.notificationType === args.notificationType ) {
             $.img.image = "/images/Pray_settings_page/ic_selected.png";
      } else{
             $.img.image = "/images/Pray_settings_page/ic_unselected.png";
      };
});
