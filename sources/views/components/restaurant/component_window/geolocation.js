export let geolocation = (lists)=> {
	var metro_dbllist = {
		view:"dbllist",
		id:'metro_dbllist',
		list:{ height:200, scroll:true },
		labelLeft:"Список метро",
		labelRight:"Выбранные метро",
		data:[]
	};
	let coordinates = {
		cols:[
			{view:'text', label: 'Широта', name: 'lat', labelPosition:"top", placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}},
			{view:'text', label: 'Долгота', name: 'lng', labelPosition:"top", placeholder: '11.111111', pattern:{ mask:"##.######", allow:/[0-9]/g}},
		]
	};
	let datatest = {
		cols:[
			{view:'datatable',
				id:'datatable',
				columns:[
					{ id:"name",	header:"", css:"Наименование",  width:50},
					{ id:"city",	header:"Город",width:200, fillspace:true},
				],
				data: [],
				select:true
			},
			{
				rows:[
					{},
					{rows:[
							{view:'button', label:'select', on:{
								onItemClick:()=>{

									}
								}},
							{view:'button', label:'unselect', on:{
									onItemClick:()=>{

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
					{ id:"name",	header:"", css:"Наименование",  width:50},
					{ id:"city",	header:"Город",width:200, fillspace:true},
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
			//metro_dbllist,
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
			$$("datatable").clearAll();
			$$("datatable").parse(result);

		},
		rej=>console.log(rej.json(), 'error')
	);
}