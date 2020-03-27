export let basic =(lists)=>{
	let result = {
		rows:[
			{
				view:"select", name: 'city_id', id:'select_city',
				label:"Город", labelWidth:170,
				value:365, options:lists.cities
			},
			{
				view:"select", name: 'category_id',
				label:"Категория заведения", labelWidth:170,
				value:3, options:lists.category
			},
			{view:"text", value:"",	label:"Наименование", name:'name', labelWidth:170 },
			{view:"text", value:"",	label:"Телефон заведения", name:'phone', labelWidth:170, pattern:{ mask:"+#(###)###-##-##", allow:/[0-9]/g}},
			{view:"text", value:"",	label:"Адрес", name:'address', labelWidth:170 },
			{view:"text", value:0, label:"Минимальная цена кальяна", name:'min_price_hook', labelWidth:200, pattern:{ mask:"####", allow:/[0-9]/g} },
			{template:'<hr>', height:1},
			{
				view:"select", name: 'owner_id',
				label:"Владелец", labelWidth:170,
				options:lists.owners
			},
			{view:"text", label:"Телефон владельца", name:'phone_owner', labelWidth:170, pattern:{ mask:"+#(###)###-##-##", allow:/[0-9]/g} },


		]
	};

	return {
		id:'basic',
		rows:[
			{height: 15},
			result
		]
	};
};


