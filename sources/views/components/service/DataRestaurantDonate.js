import {JetView} from "webix-jet";
import {renderDate} from "jet-views/controllers/functions";


export default class DataRestaurantDonate extends JetView{
	config(){
		let dataTable = {
			view: "datatable",
			id: 'list_restaurant_donate',
			autoConfig: true,
			css: "webix_shadow_medium",
			columns: [
				{ id:"id",    header:"#", width:50},
				{ id:"restaurant",   header:"Наименование заведения", fillspace:true},
				{ id:"date_from",   header:"От: ", width:120, template: (obj)=>{ return renderDate(obj.date_from); }},
				{ id:"date_to",   header:"До: ", width:120, template: (obj)=>{ return renderDate(obj.date_to); }},
				{ id:"service_name",   header:"Услуга", width:120},
			],
			select:"row",
			resizeColumn:true,
		};

		let ui = {
			rows: [
				{label: 'Таблица заведений пользуйщиеся услугами', view: 'label'},
				dataTable
			]
		}
		return ui;
	}
	init(){
		webix.ajax(`${base_url}/threeraza/admin/list/restaurant/donate`).then(
			res=>{
				$$("list_restaurant_donate").clearAll();
				$$("list_restaurant_donate").parse(res.json(),"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
}