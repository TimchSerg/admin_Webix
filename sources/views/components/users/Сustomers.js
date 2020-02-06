import {JetView} from "webix-jet";
import {renderDate, renderPhone} from "../../controllers/functions";

export default class Customers extends JetView{
	config(){

		let dataTable = {
			view:"datatable",
			id: 'data_users_customer',
			autoConfig:true,
			css:"webix_shadow_medium",
			resizeColumn:true,
			columns: [
				{ id:"id",    header:"#", width:50},
				{ id:"photo",   header:"", width:50, template:"<img class='datatable_images' src='#photo#' width='34' height='34'/>",},
				{ id:"first_name",   header:"Имя", fillspace:true},
				{ id:"last_name",   header:"Фамилия", fillspace:true},
				{ id:"city",   header:"Город", width:100},
				{ id:"country",   header:"Страна", width:100},
				{ id:"email",    header:"Email", width:150},
				{ id:"phone",   header:"Телефон", width:140, template: (obj)=>{ return renderPhone(obj.phone); }},
				{ id:"reg_date",   header:"Дата регистрации", width:140, template: (obj)=>{ return renderDate(obj.reg_date); }},
			],
			select:"row",
		};
		let ui = {
			rows:[
				{label: 'Пользователи', view: 'label'},
				dataTable
			]
		};
		return ui;
	}
	init(){

	}
}