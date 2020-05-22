import {JetView} from "webix-jet";
import sub_view from "jet-views/components/geolocation/window";
import windowDevice from "jet-views/components/Windows";
import orderBy from "lodash.orderby";

export class MenuBtn extends JetView{
	config(){

		let ui = {height: 50, cols: [
				{width: 150, cols:[
						{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus", on:{
								onItemClick: ()=>{
									this.parseElement();
								}
							}},
						{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: false, on: {
								onItemClick:()=>{
									let item  = $$('data_metro').getSelectedItem();

									this.parseElement(item);
								}
							}},
						{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
								onItemClick:()=>{
									this.refreshData();
								}
							}},
						{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: false, on: {
								onItemClick:()=>{
									let item  = $$('data_metro').getSelectedItem();
									let id = item.id;
									let name = item.name;

									this.deleteItem(id, name);

								}
							}},
					]
				},
				{}
			]};
		return ui;
	}
	parseElement(item){
		let lists = {
			cities: [],
			group:[],
		};
		webix.ajax(`${base_url}/get/cities`).then(
			res=>{
				lists.cities = this.nameToValue(res.json());
				webix.ajax(`${base_url}/ajax/get_all_rows/1000/threeraza__group`).then(
					res=>{
						lists.group = this.nameToValue(res.json());
						let form = sub_view(lists);
						windowDevice(form, 'Редактирование элемента');
						console.log(item);
						if(item){
							console.log(item);
							$$('form_add_metro').setValues(item);
						}
						// let secondShow = $$('secondShow');
						// secondShow.callEvent('onItemClick');
						//
						// let multiShow = $$('multiShow');
						// multiShow.callEvent('onItemClick');

						// if(item != undefined){
						// 	$$('form_add_metro').setValues(item);
						// }
					},
					rej=>{lists.category = []}
				)
			},
			rej=>{lists.cities = []}
		);
	}
	refreshData(){
		webix.ajax(`${base_url}/metro/get`).then(
			res=>{
				let result = res.json();

				$$("data_metro").clearAll();
				$$("data_metro").parse(result,"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	deleteItem(id, name){
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: name,
			callback: (result)=>{
				if(result){
					webix.ajax(`${base_url}/metro/delete/${id}`).then(
						res=>this.refreshData(),
						rej=>console.log('error', rej)
					);
				}
			}
		})
	}
	nameToValue(data){
		data.forEach(i=>{
			i.value = i.name;
		});
		let res = orderBy(data,['name'], ['asc']);
		return res;
	}
	init(view){
		//view.parse(data);
	}
}
