import {JetView} from "webix-jet";

export default class OldDataView extends JetView{
	config(){
		return {
			view:"datatable",
			id: 'data_old_restaurants',
			autoConfig:true,
			css:"webix_shadow_medium",
			resizeColumn:true,
			columns: [
				{ id:"id",    header:"#", width:50, sort:"string",},
				{ id:"country",   header:"Страна", sort:"string",},
				{ id:"city",   header:[ "Город", { content:"textFilter" } ], sort:"string", width:100, },
				{ id:"name",   header:"Наименование", sort:"string", fillspace:true},
				{ id:"phone",   header:"Телефон", sort:"string", fillspace:true},
				{ id:"crossStreet",    header:"Адрес", sort:"string", width:150},
			],
			select:"row",
		};
	}
	init() {
		webix.ajax(`${base_url}/threeraza/admin/zavedenie`).then(
			res=>{
				let result = res.json();

				$$("data_old_restaurants").clearAll();
				$$("data_old_restaurants").parse(result,"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
}