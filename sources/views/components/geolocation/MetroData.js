import {JetView} from "webix-jet";

export default class MetroData extends JetView{
	config(){
		return {
			view:"datatable",
			id: 'data_metro',
			autoConfig:true,
			css:"webix_shadow_medium",
			resizeColumn:true,
			columns: [
				{ id:"id",    header:"#", width:50, sort:"string",},
				{ id:"city",   header:[ "Город", { content:"textFilter" } ], sort:"string", width:100, },
				{ id:"name",   header:"Наименование", sort:"string", fillspace:true},
			],
			select:"row",
		};
	}
	init() {
		webix.ajax(`${base_url}/metro/get`).then(
			res=>{
				let result = res.json();

				$$("data_metro").clearAll();
				$$("data_metro").parse(result,"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
}