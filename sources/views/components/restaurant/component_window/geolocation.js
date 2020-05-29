export let geolocation = (lists)=> {
	let coordinates = {
		cols:[
			{view:'text', label: 'Широта', name: 'lat', id:'geo_lat', labelPosition:"top", placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}},
			{view:'text', label: 'Долгота', name: 'lng', id:'geo_lng', labelPosition:"top", placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}},
		]
	};
	let datatest = {
		cols:[
			{	view:'datatable', id:'list_metro',
				columns:[
					{ id:"name", header:"Список метро", css:"", fillspace:true},
				],
				data: [],select:true,
			},
			{
				rows:[
					{},
					{padding: 10, rows:[
							{view:'button', type:"icon", icon:"mdi mdi-chevron-double-right", width:60, on:{
								onItemClick:()=>{
										let select = $$('list_metro').getSelectedItem();
										if(select){
											$$('select_metro').add(select);
											$$('list_metro').remove(select.id);

											return;
										}
									}
								}},
							{view:'button', type:"icon", icon:"mdi mdi-chevron-double-left", width:60, on:{
									onItemClick:()=>{
										let select = $$('select_metro').getSelectedItem();

										if(select){
											$$('list_metro').add(select);
											$$('select_metro').remove(select.id);

											return;
										}
									}
								}},
						]},
					{}
				]
			},
			{
				view:'datatable',
				id:'select_metro',
				columns:[
					{ id:"name",	header:"Выбранные", css:"",  fillspace:true},
				],
				data: [],
				select:true
			}
		]
	};
	let ui = {
		id:'geolocation',
		rows:[
			{height: 10},
			{
				view:"select", name: 'city_id', id:'select_city',
				label:"Город", labelWidth:170,
				value:365, options:lists.cities, on:{
					onChange:(newv)=>{
						refreshGroup(newv, lists);
						let value = webix.storage.local.get('group_id');
						refreshMetro(newv, value);

						$$('select_metro').clearAll();

						webix.storage.local.put('group_id', '1');
					},
					onAfterRender:()=>{
						let item = $$('select_city').getValue();
						let value = webix.storage.local.get('group_id');
						refreshGroup(item, lists);
						refreshMetro(item, value);
					}
				}
			},
			{
				view:"richselect", name: 'group_id', id:'group_id',
				label:"Группа", labelWidth:170,
				value:1, options:lists.group,
				on:{
					onAfterRender:()=>{
						let value = webix.storage.local.get('group_id');
						$$('group_id').setValue(value);
					},
					onChange:(newv)=>{
						let value = webix.storage.local.get('group_id');
						if(newv != value){
							$$("select_metro").clearAll();
						}
						let item = $$('select_city').getValue();
						refreshMetro(item,newv);

					}
				}
			},
			{view:"text", value:"",	label:"Адрес", name:'address', labelWidth:170 },
			datatest,
			{height: 10},
			coordinates
		]
	};
	return ui;
};


function refreshMetro(city_id, group){
	webix.ajax(`${base_url}/metro/get_by_city/${city_id}`).then(
		res=>{
			let result = res.json();
			let filter = result.filter((i)=>{
				return i.group_id == group;
			});
			console.log(filter);
			$$("list_metro").clearAll();
			$$("list_metro").parse(filter);

			refreshTable();
		},
		rej=>console.log(rej.json(), 'error')
	);
}

function refreshGroup(item, lists){
	let newOptions = lists.group.filter((i)=>{
		return i.city_id == String(item);
	});

	$$('group_id').define('options', newOptions);
	$$('group_id').refresh();
}

function refreshTable(){
	let list = $$('list_metro').serialize();
	let select = $$('select_metro').serialize();
	for (let i = 0; i < select.length; i++){
		var elemPosition = list.map((i)=> { return i.id; }).indexOf(select[i].id);

		if(elemPosition != '-1'){ list.splice(elemPosition, 1);}
	}
	console.log(list, select);
	$$('list_metro').clearAll();
	$$('list_metro').parse(list);
}