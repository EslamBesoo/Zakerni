// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var drawer=args;
var rowCount;

            			 Ti.App.Properties.getString("officeID");
            			
  
 // $.officeName.text=Ti.App.Properties.getString("officeTitle");;
//$.img.image=Alloy.Globals.imagePath+Ti.App.Properties.getString("officeImg")+"&h=150&w=150&q=100&zc=0";
//alert(JSON.stringify(drawer));
 var data = [
        {title:"الرئيسية",img:"/images/Sidemenu/ic_home.png"},
        {title:"مواقيت الصلاة",img:"/images/Sidemenu/ic_pray_time.png"},
        {title: "اعدادات الصلاة",img:"/images/Sidemenu/ic_pray_setting.png"},
        {title:"قراءة القرآن",img:"/images/Sidemenu/ic_reading_quran.png"},
         {title:"استماع القرآن" ,img:"/images/Sidemenu/ic_listening_quran.png"},
        {title:"اذكار واردة في القرآن",img:"/images/Sidemenu/ic_azkar.png"},
        {title:"اتجاه القبلة",img:"/images/Sidemenu/ic_azkar.png"},
         
    ];
    rowCount=data.length;
           
    for (var i=0; i <rowCount; i++) {
     var rowitem= data[i];
     var rowController=Alloy.createController("/row/rowMenu",rowitem).getView();
         $.tableView.appendRow(rowController);
         rowController=null;
         rowitem=null;
    };
    
   if (OS_IOS) {drawer.setShouldStretchDrawer(true);};
    
   
    
    $.tableView.addEventListener("click", function(e){
       // Ti.API.info("isLeftWindowOpen: " + drawer.isLeftWindowOpen());
      // closeAllios();
        switch(e.index){
            case 0:
            closeAll();
      
                break;
            case 1:
                closeAll();
               var x={title:data[e.index].title};
              Alloy.Globals.Navigator.open("prayTime",x);
                break;
            case 2:
             closeAll();
            var x={title:data[e.index].title,type:""};
              Alloy.Globals.Navigator.open("PraySetting",x); 
               
                break;
            case 3:
             closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("suraList",x); 
               
                break;
                
                case 4:
                closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("quranRadio",x); 
                
                break;
                 
                case 5:
                closeAll();
               var x={title:data[e.index].title};
               //Alloy.Globals.Navigator.open("quranRadio",x); 
                
                break;
                case 6:
                closeAll();
               var x={title:data[e.index].title};
               Alloy.Globals.Navigator.open("qibla",x); 
                
                break;
                 
           
                
              
        }

if (OS_IOS) {
           	
           		 	getToggel(drawer);
           	}else{getToggel(drawer);};
       

        if (Alloy.Globals.applang=="ar") {
					//drawer.toggleRight();
					//drawer=null;
					//data=null;
				}else{
					//drawer.toggleLeft();
					//drawer=null;
					//data=null; 
				};
       
      
    });
    /*
    var dara=[
    
	{company_id:"2", product_id:"1", quantity:"20"},
	{company_id:"2", product_id:"1", quantity:"20"},
	{company_id:"2", product_id:"1", quantity:"20"},
]
    
    {
    mosque_id:1,
    name:"ehab ail",
    address:"giza,fasiel,from Mobile test",
    phone:"01157887337",
    proudct_List:[{company_id:"2", product_id:"1", quantity:"20"},{company_id:"2", product_id:"1", quantity:"20"},{company_id:"2", product_id:"1", quantity:"20"},]
    }
 */
    function closeAll(){
         if (OS_ANDROID) {
        for (var i=0; i < appSec.length; i++) {
                 try{
                         var winx= appSec[i];
                          	winx.close();
                       		 winx=null;
                 }catch(e){};
                };
                
                 };
    };
    
    function closeAllios(){
        
        for (var i=0; i < appSec.length; i++) {
                 try{
                     if (OS_IOS) {
                         var winx= appSec[i];
                         winx.close();
                     };
                 }catch(e){};
                };
    };
    
   
//rtl($.tableView);