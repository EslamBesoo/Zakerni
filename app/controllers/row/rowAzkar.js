// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var repet=parseInt(args.data.repeat);
$.lblCountRepat.text=0;
$.lblTitle.text=args.data.zekr;
$.lblhint.text=args.data.bless;
$.lblRepeat.text=" مرات التكرار ( "+repet+" ) ";
$.lblCount.text="  الصفحة "+(args.pageNO+1)+" من "+args.allPage;

function nextPage(e){
      Ti.Media.vibrate();
      if (repet>1) {
            repet=(repet-1);
            $.lblCountRepat.text=parseInt($.lblCountRepat.text)+1;
      }else{
            repet=args.data.repeat;
            $.lblCountRepat.text=repet;
            Ti.App.fireEvent("textNext");
      };


};
rtl($.viewRow);
rtl($.bannerView);