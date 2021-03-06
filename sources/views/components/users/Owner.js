import {JetView} from "webix-jet";
import {renderPhone, renderDate} from '../../controllers/functions';

export default class Owner extends JetView{
	config(){
		let controlPanel = {height: 50, cols: [
					{width: 150, cols:[
							{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true},
							{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true},
						]
					},
					{}
				]};
		let dataTable = {
			view:"datatable",
			id: 'data_users_owner',
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
				{ id:"phone",   header:"Телефон", width:140},
				{ id:"reg_date",   header:"Дата регистрации", width:140, template: (obj)=>{ return renderDate(obj.reg_date); }},
			],
			select:"row",
			on:{
				onAfterSelect:()=>{
					$$('edit_btn').enable();
					$$('delete_btn').enable();
				},
				onBlur:()=>{
					$$('edit_btn').disable();
					$$('delete_btn').disable();
				}
			}
		};
		let ui = {
			rows:[
				{label: 'Владельцы', view: 'label'},
				controlPanel,
				dataTable
			]
		};
		return ui;
	}
	init(){

	}
}