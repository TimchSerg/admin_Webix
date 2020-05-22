export let geolocation = (lists)=> {
	let coordinates = {
		cols:[
			{view:'text', label: 'Широта', name: 'lat', labelPosition:"top", placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}},
			{view:'text', label: 'Долгота', name: 'lng', labelPosition:"top", placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}},
		]
	};
	let datatest = {
		cols:[
			{	view:'datatable', id:'list_metro',
				columns:[
					{ id:"name",	header:"Список метро", css:"", fillspace:true},
					// { id:"city",	header:"Город",width:200, fillspace:true},
				],
				data: [],select:true
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
					// { id:"city",	header:"Город",width:200, fillspace:true},
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
						refreshMetro(newv);
					},
					onAfterRender:()=>{
						let item = $$('select_city').getValue();
						refreshMetro(item);
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


function refreshMetro(city_id){
	console.log(city_id);
	webix.ajax(`${base_url}/metro/get_by_city/${city_id}`).then(
		res=>{
			let result = res.json();
			console.log(result);
			$$("list_metro").clearAll();
			$$("list_metro").parse(result);

		},
		rej=>console.log(rej.json(), 'error')
	);
}