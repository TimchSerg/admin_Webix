import {JetView} from "webix-jet";
import {renderPhone} from '../../controllers/functions';

let _base_dir_ = 'https://platform.ru/';

export default class DataView extends JetView{
	config(){
		return {
			view:"datatable",
			id: 'data_restaurants',
			autoConfig:true,
			css:"webix_shadow_medium",
			resizeColumn:true,
			columns: [
				{ id:"id",    header:"#", width:50},
				{ id:"logo",   header:"", width:50, template:"<img class='datatable_images' src='#logo#' width='34' height='34'/>",},
				{ id:"name",   header:"Наименование", fillspace:true},
				{ id:"city",   header:"Город", width:100},
				{ id:"address",    header:"Адрес", width:150},
				{ id:"phone",   header:"Телефон", width:140, template: (obj)=>{ return renderPhone(obj.phone); }},
				{ id:"owner",   header:"Владелец", width:150, template: (obj)=>{
						if(obj.owner == ' '){
							return 'Пользователь не заполнил о себе'
						}else{
							return obj.owner;
						}
					}
				},
				{ id:"phone_owner",   header:"Телефон владельца", width:140, template: (obj)=>{ return renderPhone(obj.phone); }},
			],
			select:"row",
			on:{
				onAfterSelect:()=>{
					$$('edit_btn').enable();
					$$('delete_btn').enable();
				},
			}
		};
	}
	init(){
		webix.ajax(`${_base_dir_}threeraza/admin/restaurant`).then(
			res=>{

				$$("data_restaurants").clearAll();
				$$("data_restaurants").parse(res.json(),"json");

			},
			rej=>console.log(rej.json(), 'error')
		);
	}

}