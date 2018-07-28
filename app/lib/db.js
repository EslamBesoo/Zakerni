
exports.createCarttbl=function(){
var db = Ti.Database.open('FDB');
	if(db){
	    //db.execute('DROP TABLE IF EXISTS cart');
	db.execute('CREATE TABLE IF NOT EXISTS cart(pid TEXT PRIMARY KEY, name TEXT, qty TEXT, colorID TEXT,unitID TEXT,colorName TEXT , unitName TEXT, price TEXT,imgUrl TEXT);');
	
	}
	db.close();
};
exports.addToCart=function(dataArray){
	try{
	var db = Ti.Database.open('FDB');
	if(db){
	try{
	db.execute('INSERT INTO cart (pid, name, qty,colorID,unitID,colorName,unitName,price,imgUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', dataArray);
	toast("Product is added");
	}catch(e){
	    if (e.message.indexOf("UNIQUE constraint failed") !==-1) {toast("this product is alredy exist");};
	    Ti.API.info('Error db: '+e.message);
	}
	//getCart();
	}
	db.close();
	}catch(e){};
};

exports.getCart=function(){
	try{
	var db = Ti.Database.open('FDB');
	 
	 var rows = db.execute('SELECT * FROM cart');
	 Ti.API.info(rows);
	 pkQty=rows.rowCount;
	 Ti.App.fireEvent("getQty");
  while (rows.isValidRow())
  {
   Ti.API.info('cart data ---> ROWID: ' + rows.field(0) + ', name:' + rows.field(1) + ', qty: ' + rows.field(2) + ', color: ' + rows.field(3)+ ', rows: ' + rows.field(4));
    rows.next();
  }
  rows.close();
  db.close();
 }catch(e){alert("err:"+JSON.stringify(e));};
};

exports.get2Cart=function(_callBack){
    try{
    var _dataTable=[];
    var db = Ti.Database.open('FDB');
     
    var rows = db.execute('SELECT * FROM cart');
    // Ti.API.info('rowData: '+);
    var rowx=rows.rowCount;
  while (rows.isValidRow())
  {
      var rowData={"id":parseInt(rows.field(0)),"name":rows.field(1),"qty":rows.field(2),"color":parseInt(rows.field(3)),"unit":parseInt(rows.field(4)),"colorName":rows.field(5),"unitNmae":rows.field(6),"price":parseInt(rows.field(7)),"imgUrl":rows.field(8)};
     
      _dataTable.push(rowData);
      //rowx++;
      rows.next();
  }
  if (rowx>0) {
      _callBack({
                  success:true,
                  data:_dataTable
               });
  }else{ _callBack({
                  success:false,
                  data:_dataTable
               });};
  
  rows.close();
  db.close();
 }catch(e){alert("err:"+JSON.stringify(e));};
};

exports.updateqtyCart=function(dataArray){
    try{
	var db = Ti.Database.open('FDB');
	if(db){
		db.execute('UPDATE cart SET qty=?,colorID=?,unitID=?,colorName=?,unitName=?,price=? WHERE pid=?',dataArray);
	}
	db.close();
	}catch(e){};
};
function createTable(e) {  
 var db = Ti.Database.open('codeguru');
 if(db){
  db.execute('CREATE TABLE people (name TEXT, phone_number TEXT, city TEXT)');
  var thisName = 'Arthur';
  var thisPhoneNo = '1-617-000-0000';
  var thisCity = 'Mountain View';
  db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', thisName, thisPhoneNo, thisCity);

  var personArray = ['Paul','020 7000 0000', 'London'];
  db.execute('INSERT INTO people (name, phone_number, city) VALUES (?, ?, ?)', personArray);

  var rows = db.execute('SELECT rowid,name,phone_number,city FROM people');
  while (rows.isValidRow())
  {
    Ti.API.info('Person ---> ROWID: ' + rows.fieldByName('rowid') + ', name:' + rows.field(1) + ', phone_number: ' + rows.fieldByName(2) + ', city: ' + rows.field(3)+ ', city: ' + rows.field(4)+ ', city: ' + rows.field(5));
    rows.next();
  }
  rows.close();
 }
    alert($.label.text);
}

exports.deletfromCArt=function(){
    try{
     db = Ti.Database.open('FDB');
    db.execute('DELETE FROM cart');// WHERE pid=?',productId);
     pkQty=0;
      Ti.API.info("pkQty"+pkQty);
      }catch(e){};
};


exports.del=function(productId){
    try{
     db = Ti.Database.open('FDB');
    db.execute('DELETE FROM cart WHERE pid=?',productId);
      var rows = db.execute('SELECT * FROM cart');
     pkQty=rows.rowCount;
      Ti.API.info("pkQty"+pkQty);
      }catch(e){};
};
