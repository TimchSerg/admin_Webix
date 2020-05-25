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
						$$('group_id').refresh();
					}
				}
			},
			{
				view:"richselect", name: 'group_id', id:'group_id',
				label:"Группа", labelWidth:190,
				value:1, options:lists.group,
				on:{
					onAfterRender:()=>{
						let list = $$('group_id').getList();
						console.log(list.config.data);
					}
				}
			},
			{view:"text", value:"",	label:"Наименование ст. Метро", name:'name', labelWidth:190 },
			{cols:[
					{view:'text', label: 'lat', name:'lat', value: '0'},
					{view:'text', label: 'lng', name:'lng', value: '0'},
				]},
			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = {};
							$$('form_add_metro').getValues((obj)=>{
								values[obj.data.name] = obj.data.value;
							});
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
export default sub_view;