let sub_view = (lists)=>{
	lists.owners.push({id: 0, value: 'Владелец не выбран'});
	let result = {
		view: 'form',
		id: 'form_restaurant',
		elements: [
			{view:'text', hidden: true, name: 'id'},
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

			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = $$('form_restaurant').getValues();
							if(values.id == ''){
								delete values.id;
								newRestaurant(values);
							}else {
								updateRestaurant(values);
							}
						}},

				]}
		]
	}
	return result;
}

function newRestaurant(items){
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/threeraza/admin/restaurant/new`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
function updateRestaurant(items){
	console.log(items);
	let id = items.id;
	let custom = {
		city_id:items.city_id,
		category_id:items.category_id,
		name:items.name,
		phone:items.phone,
		address:items.address,
		min_price_hook:items.min_price_hook,
		owner_id:items.owner_id,
		phone_owner:items.phone_owner
	}
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/threeraza/admin/restaurant/update/${id}`, JSON.stringify(custom)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}

export default sub_view;