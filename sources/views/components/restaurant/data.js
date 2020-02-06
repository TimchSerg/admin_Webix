import {JetView} from "webix-jet";
import {renderPhone} from '../../controllers/functions';

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
				{ id:"active", header:"Активность", template:"{common.checkbox()}"},
			],
			select:"row",
			on:{
				onAfterSelect:()=>{
					$$('edit_btn').enable();
					$$('delete_btn').enable();
				},
				onCheck:(row, column, state)=>{
					this.activeRestaurant(row, state);
				}
			}
		};
	}
	activeRestaurant(id, state){
		let active = state ? 1 : 2;
		webix.ajax(`${base_url}/threeraza/admin/active/${id}/${active}`).then(
			res=>{
				let result = res.json();
				console.log(result);
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	init(){
		webix.ajax(`${base_url}/threeraza/admin/restaurant`).then(
			res=>{
				let result = res.json();

				$$("data_restaurants").clearAll();
				$$("data_restaurants").parse(result,"json");

			},
			rej=>console.log(rej.json(), 'error')
		);
	}

}