exports.country=function(_callBack)
{
	var data=[
				{title:"مصر‎",code:"20",lat:"30.06263",lon:"31.24967"},
				{title:"الكويت",code:"965",lat:"29.31166",lon:"47.481766"},
				{title:"السعودية",code:"966",lat:"23.885942",lon:"45.079162"},
				{title:"الإمارات",code:"971",lat:"23.424076",lon:"53.847818"},
				{title:"البحرين",code:"973",lat:"25.930414",lon:"50.637772"},
				{title:"قطر",code:"974",lat:"25.354826",lon:"51.183884"},
				{title:"العراق",code:"964",lat:"33.223191",lon:"43.679291"},
	
];
_callBack({
						success:true,
						data:data
					//	data:JSON.parse(data)
					});
};