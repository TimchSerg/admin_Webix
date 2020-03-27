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
				{ id:"id",    header:"#", sort:"string", width:50},
				{ id:"restaurant",   header:"Наименование заведения", sort:"string", fillspace:true},
				{ id:"date_from",   header:"От: ", width:120, sort:"string", template: (obj)=>{ return renderDate(obj.date_from); }},
				{ id:"date_to",   header:"До: ", width:120, sort:"string", template: (obj)=>{ return renderDate(obj.date_to); }},
				{ id:"service_name",   header:"Услуга", sort:"string", width:120},
				{ id:"active", header:"Активность", sort:"string", template:"{common.checkbox()}"},
			],
			select:"row",
			resizeColumn:true,
			on:{
				onCheck:(row, column, state)=>{
					this.activeService(row, state);
				},
			}
		};

		let ui = {
			rows: [
				{label: 'Таблица заведений пользуйщиеся услугами', view: 'label'},
				dataTable
			]
		}
		return ui;
	}
	activeService(id, state){
		let active = state ? 1 : 2;
		webix.ajax(`${base_url}/threeraza/admin/active/service/restaurant/${id}/${active}`).then(
			res=>{
				let result = res.json();
				console.log(result);
			},
			rej=>console.log(rej.json(), 'error')
		);
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