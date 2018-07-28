// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _getService=require("xhrService");
$.popupWin.addEventListener('open',function(evt){
                    var activity=$.popupWin.activity;
                    activity.actionBar.hide();
                   
                  returnData();
                });
function closeWin(){
	$.popupWin.close();
};

 var getID;

$.lblTitle.text=args.title;

function intiCointry(){
	var surah=require("countryArab");
	surah.country(function(_response){
		
		//Ti.API.info('data: '+JSON.stringify(_response.data));
			var dataList=_response.data; 
             for ( var i=0; i <dataList.length ; i++) {
             	    var rowItem={title:dataList[i].title,lat:dataList[i].lat,lon:dataList[i].lon};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for
	});
	
};

function intiCities(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.cities;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].city_id,title:datax[i].city_name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"allCities/"+args.cID,"allCities",$.popupWin);
    }catch(e){alert(e.message);};
};



function intiTypes(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.types;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].type_id,title:datax[i].type_name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"allTypes","allTypes",$.popupWin);
    }catch(e){alert(e.message);};
};


function intiSection(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.sections;  
             for ( var i=0; i <datax.length ; i++) {
             	    var rowItem={id:datax[i].section_id,title:datax[i].section_name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                   
                };//end for

             }else{Ti.API.info(JSON.stringify(_response));};//end if
    },"allSections","allSections",$.popupWin);
    }catch(e){alert(e.message);};
};


function intiallTypeAds(){
	try{
	   _getService.getservice(function(_response){
        
        if (_response.success) {  datax=_response.data.typeAds;  
             for ( var i=0; i <datax.length ; i++) {
             	     var rowItem={id:datax[i].t_ads_id,title:datax[i].t_ads_name};
                     var rowController=Alloy.createController('row/rowSelectedItem',rowItem);
                     $.tbl.appendRow(rowController.getView(),true);
                };

             }else{Ti.API.info(JSON.stringify(_response));};
    },"allTypeAds","allTypeAds",$.popupWin);
    }catch(e){alert(e.message);};
};

function returnData(){
	if (args.param=="country") {
		 intiCointry();
	}else if(args.param=="type"){
		intiTypes();
		
	}else if(args.param=="typeAds"){
		intiallTypeAds();
	}else if(args.param=="section"){
		intiSection();
	}else{
		intiCities();
	};
	
};

function getValue(e){
	args.cont.text=e.row.args.title;
	args.cont.className=e.row.args.id;
	
	//alert("value= "+args.cont.className);
	
	if (args.param=="country") {
		countryID=e.row.args.id;
		 Ti.App.Properties.setString("cLat",e.row.args.lat);
		 Ti.App.Properties.setString("cLon",e.row.args.lon);
		 Ti.App.Properties.setString("cTitle",e.row.args.title);
		 Ti.App.fireEvent('setServices',{});
	}else if(args.param=="type"){
		typeID=e.row.args.id;
	}else if(args.param=="typeAds"){
		advTypeID=e.row.args.id;
	}else if(args.param=="section"){
		sectionID=e.row.args.id;
	}else{
		cityID=e.row.args.id;
	};
	$.popupWin.close();
};
