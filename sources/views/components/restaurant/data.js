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
				{ id:"id",    header:[ "#", { content:"textFilter" } ], width:50},
				{ id:"link",   header:"Link", sort:"string", width:70, template:(e)=>{
						//console.log(e);
						return `<a href="https://3raza.com/#/list/${e.name}/${e.id}/" target="_blank"> <span class="mdi mdi-eye"></span> </a>`;
					}},
				{ id:"logo",   header:"", width:50, template:"<img class='datatable_images' src='#logo#' width='34' height='34'/>",},
				{ id:"name",   header:"Наименование", sort:"string", fillspace:true},
				{ id:"city",   header:"Город", sort:"string", width:100},
				{ id:"address",    header:"Адрес", sort:"string", width:150},
				{ id:"phone",   header:[ "Телефон", { content:"textFilter" } ], sort:"string", width:140},
				{ id:"owner",   header:"Владелец", sort:"string", width:150, template: (obj)=>{
						if(obj.owner == ' '){
							return 'Пользователь не заполнил о себе'
						}else{
							return obj.owner;
						}
					}
				},
				{ id:"phone_owner",   header:[ "Телефон владельца", { content:"textFilter" } ], width:180},
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
				},
				onItemDblClick:()=>{
					let edit_btn = $$('edit_btn');
					edit_btn.callEvent('onItemClick');
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
		let refresh_btn = $$('refresh_btn');
		refresh_btn.callEvent('onItemClick');
	}

}