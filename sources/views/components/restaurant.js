import {JetView} from "webix-jet";
import DataView from "./restaurant/data.js";
import OldDataView from "./restaurant/old_data.js";
import windowDevice from './Windows';
import {setValueWindow} from './restaurant/controllers/setValueWindow.js';
import sub_view from './restaurant/window';
import orderBy from 'lodash.orderby';

export default class Active extends JetView{
	config(){
		let accordion = {
			// multi:true,
			// view:"accordion",
			css:"webix_dark",
			rows:[
				{ header:"Новая база", body:{
						rows: [
							{height: 50, cols: [
									{width: 150, cols:[
											{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus", on:{
													onItemClick: ()=>{
														this.parseCities();
													}
												}},
											{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true, on: {
													onItemClick:()=>{
														let item  = $$('data_restaurants').getSelectedItem();
															item.rating = item.rating*10;
														// item.min_price_hook = Number(item.min_price_hook);
														this.parseCities(item);
													}
												}},
											{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
													onItemClick:()=>{
														this.refreshData();
													}
												}},
											{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true, on: {
													onItemClick:()=>{
														let item  = $$('data_restaurants').getSelectedItem();
														let id = item.id;
														let name = item.name;

														this.deleteItem(id, name);

													}
												}},
										]
									},
									{}
								]},
							DataView
						]
					}},
				{view:'resizer'},
				{ header:"Старая база", body:{
					rows: [
						OldDataView
					]
					}}
			]
		};
		return accordion;
	}
	refreshData(){
		webix.ajax(`${base_url}/threeraza/admin/restaurant`).then(
			res=>{
				let result = res.json();
				console.log(result, 'asd');
				$$("data_restaurants").clearAll();
				$$("data_restaurants").parse(result,"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	parseCities(item){

		let lists = {
			cities:[],
			category:[],
			owners:[],
			group:[]
		};
		webix.ajax(`${base_url}/group/get`).then(
			res=>{
				let group = this.nameToValue(res.json());
					lists.group = group;
			},
			rej=>{console.log(rej);}
		);

		webix.ajax(`${base_url}/get/cities`).then(
			res=>{
				lists.cities = this.nameToValue(res.json());
				webix.ajax(`${base_url}/ajax/get_all_rows/100/threeraza__category_restaurant`).then(
					res=>{
						lists.category = this.nameToValue(res.json());
						webix.ajax(`${base_url}/AdminThreeraza/get_users`).then(
							res=>{
								lists.owners = this.nameToValue(res.json()).filter(i=>i.type == 'Владелец');
								let form = sub_view(lists);
								windowDevice(form, 'Новое заведение');
										let secondShow = $$('secondShow');
										secondShow.callEvent('onItemClick');

										let multiShow = $$('multiShow');
										multiShow.callEvent('onItemClick');

								if(item != undefined){
									setValueWindow(item);
								}
							},
							rej=>{lists.owners = []}
						)
					},
					rej=>{lists.category = []}
				)
			},
			rej=>{lists.cities = []}
		);
	}
	nameToValue(data){
		data.forEach(i=>{
			if(i.type == undefined){
				i.value = i.name;
			}else{
				i.value = `${i.first_name} ${i.last_name}`;
			}

		});
		let res = orderBy(data,['name'], ['asc']);
		return res;
	}
	deleteItem(id, name){
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: name,
			callback: (result)=>{
				if(result){
					webix.ajax(`${base_url}/threeraza/admin/restaurant/delete/${id}`).then(
						res=>this.refreshData(),
						rej=>console.log('error', rej)
					);
				}
			}
		})
	}
}