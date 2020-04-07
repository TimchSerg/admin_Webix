let sub_view = (lists)=>{
	let result = {
		view: 'form',
		id: 'form_add_metro',
		elements: [
			{view:'text', hidden: true, name: 'id'},
			{
				view:"select", name: 'city_id', id:'select_city',
				label:"Город", labelWidth:190,
				value:365, options:lists.cities
			},
			{
				view:"select", name: 'group_id',
				label:"Группа", labelWidth:190,
				value:3, options:lists.group
			},
			{view:"text", value:"",	label:"Наименование ст. Метро", name:'name', labelWidth:190 },
			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = $$('form_add_metro').getValues();
							if(values.id == ''){
								delete values.id;
								newElement(values);
							}else {
								updateElement(values);
							}
						}},

				]}
		]
	}
	return result;
}

function newElement(items){
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/metro/post`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
function updateElement(items){
	// let id = items.id;
	// let custom = {
	// 	city_id:items.city_id,
	// 	type:items.type,
	// 	name:items.name,
	// 	price:items.price,
	// 	day:items.day,
	// };
	// webix.ajax().headers({
	// 	"Content-type":"application/json"
	// }).post(`${base_url}/threeraza/admin/service/update/${id}`, JSON.stringify(custom)).then(
	// 	res=>{
	// 		let refresh_btn = $$('refresh_btn');
	// 		refresh_btn.callEvent('onItemClick');
	// 		$$("win_custom").close();
	// 	},
	// 	rej=>console.log(rej)
	// );
}
export default sub_view;