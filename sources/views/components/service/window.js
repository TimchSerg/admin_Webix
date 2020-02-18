let sub_view = (lists)=>{
	let result = {
		view: 'form',
		id: 'form_service',
		elements: [
			{view:'text', hidden: true, name: 'id'},
			{
				view:"select", name: 'city_id', id:'select_city',
				label:"Город", labelWidth:170,
				value:365, options:lists.cities
			},
			{
				view:"select", name: 'type',
				label:"Категория", labelWidth:170,
				value:3, options:lists.type_donute
			},
			{view:"text", value:"",	label:"Наименование", name:'name', labelWidth:170 },
			{view:"text", value:"",	label:"Цена", name:'price', labelWidth:170, pattern:{ mask:"####", allow:/[0-9]/g}},
			{view:"text", value:"1", label:"Кол-во дней", name:'day', labelWidth:170, pattern:{ mask:"###", allow:/[0-9]/g}},
			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = $$('form_service').getValues();
							if(values.id == ''){
								delete values.id;
								newService(values);
							}else {
								updateService(values);
							}
						}},

				]}
		]
	}
	return result;
}

function newService(items){
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/threeraza/admin/service/new`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
function updateService(items){
	let id = items.id;
	let custom = {
		city_id:items.city_id,
		type:items.type,
		name:items.name,
		price:items.price,
		day:items.day,
	};
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/threeraza/admin/service/update/${id}`, JSON.stringify(custom)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
export default sub_view;