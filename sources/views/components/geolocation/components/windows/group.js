let formatWindow = (lists)=>{
	let result = {
		view: 'form', id: 'form_group',
		elements: [
			{view:'text', hidden: true, name: 'id'},
			{
				view:"select", name: 'city_id',
				label:"Город", labelWidth:120,
				value:365, options:lists.cities
			},
			{view:"text", value:"",	label:"Наименование:", name:'name', labelWidth:120,  },
			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = {};
							if($$('form_group').validate()){
								$$('form_group').getValues((obj)=>{
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
		rules: {
			"name":webix.rules.isNotEmpty,
		}
	};
	return result;
};

function newElement(items){

	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/group/post`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('group_refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
function updateElement(items){
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/group/put/${items.id}`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('group_refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
export default formatWindow;
