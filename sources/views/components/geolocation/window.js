let sub_view = (lists)=>{
	let result = {
		view: 'form',
		id: 'form_add_metro',
		elements: [
			{view:'text', hidden: true, name: 'id'},
			{
				view:"richselect", name: 'city_id', id:'select_city',
				label:"Город", labelWidth:190,
				value:365, options:lists.cities,
				on:{
					onChange:(newv)=>{
						let newOptions = lists.group.filter((i)=>{
							return i.city_id == String(newv);
						});

						$$('group_id').define('options', newOptions);
						let value = newOptions.length > 0 ? newOptions[0].id : 1;
						$$('group_id').define('value', value);
						$$('group_id').refresh();
					},
					onAfterRender:()=>{
						let item = $$('select_city').getValue();
						refreshGroup(item, lists);
					}
				}
			},
			{
				view:"richselect", name: 'group_id', id:'group_id',
				label:"Группа", labelWidth:190,
				value:1, options:lists.group,
				// on:{
				// 	onAfterRender:()=>{
				// 		let list = $$('group_id').getList();
				// 	}
				// }
			},
			{view:"text", value:"",	label:"Наименование ст. Метро", name:'name', labelWidth:190 },
			{cols:[
					{view:'text', label: 'lat', name:'lat', value: '0', placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}, validate: (v)=>{return true;}},
					{view:'text', label: 'lng', name:'lng', value: '0', placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}, validate: (v)=>{return true;}},
				]},
			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = {};
							if($$('form_add_metro').validate()){
								$$('form_add_metro').getValues((obj)=>{
									values[obj.data.name] = obj.data.value;
								});
								if(values.id == ''){
									delete values.id;
									newElement(values);
								}else {
									updateElement(values);
								}
							}
						}},

				]}
		],
		rules:{
			"city_id":webix.rules.isNotEmpty,
			"name":webix.rules.isNotEmpty,
		}
	};
	return result;
};

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
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/metro/put/${items.id}`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
function refreshGroup(item, lists){
	let newOptions = lists.group.filter((i)=>{
		return i.city_id == String(item);
	});

	$$('group_id').define('options', newOptions);
	$$('group_id').refresh();
}
export default sub_view;