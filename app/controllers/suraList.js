// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var surah=require("quran");
getSuar();
function getSuar(){
	Ti.API.info('click');
	surah.quran(function(_response){
		
		//Ti.API.info('data: '+JSON.stringify(_response.data));
		var dataList=_response.data;
			for(var line = 0; line < dataList.length; line++){
				var itemRow=dataList[line];
				Ti.API.info('data: '+JSON.stringify(itemRow.pageNo));
				 var rowController=Alloy.createController('row/rowSurahName',{data:itemRow,id:(line+1),last:dataList[line+1]});
		          $.tbl.appendRow(rowController.getView(),true);
			}
	});
	

						    
};


if(OS_IOS){
    //Equals to tableRow.js new property
    $.tbl.filterAttribute="filter";
}

if(OS_ANDROID){
        //Android only works with title :( 
        $.tbl.filterAttribute="title";
}


function searchValue(){
	$.search.value=$.txtSearch.value;
};

function resetData(){
	$.txtSearch.value='';
};
