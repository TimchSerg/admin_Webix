import {JetView} from "webix-jet";
import {renderDate} from "jet-views/controllers/functions";
import windowDevice from "jet-views/components/Windows";
import sub_view from "jet-views/components/news/Window";
import windowItem from "./windowItem";
import {editor} from "./windowItem";

export default class DataView extends JetView{
	config(){
		let menu_btn = {height: 50, cols: [
			{width: 200, cols:[
				{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus", on:{
					onItemClick: ()=>{
						this.ui(windowItem).showWindow();
					}
				}},
				{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true, on: {
					onItemClick:()=>{
						this.ui(windowItem).showWindow();

						let item  = $$("data_news").getSelectedItem();

						$$('form_news').setValues(item);

						editor.s.insertHTML(item.html_code);

						$$("imageShow").define('template', `<img id="imageShow" class="image_table_CLOSE" src="${item.h_image}" alt="Фотография" select="false" style="height: 100%; display: block;margin: 0 auto;"/>`);
						$$("imageShow").refresh();
					}
				}},
				{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
					onItemClick:()=>{
						this.refreshData();
					}
				}},
				{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true, on: {
					onItemClick:()=>{
						let item  = $$("data_news").getSelectedItem();
						let id = item.id;
						let name = item.name;

						this.deleteItem(id, name);
					}
				}},
			]
			},
			{}
		]};
		const table = {
			view:"datatable",
			id: "data_news",
			autoConfig:true,
			css:"webix_shadow_medium",
			resizeColumn:true,
			columns: [
				{ id:"id",    header:"#", width:50},
				{ id:"name",   header:"Наименование", fillspace:true},
				{ id:"description",   header:"Описание", fillspace:true},
				{ id:"date_create",   header:"Дата создания", width:150},
				{ id:"active", header:"Активность", template:"{common.checkbox()}"},
			],
			select:"row",
			on:{
				onAfterSelect:()=>{
					$$("edit_btn").enable();
					$$("delete_btn").enable();
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
		let ui = {
			rows:[
				menu_btn,
				table
			]
		};
		return ui;
	}
	activeRestaurant(id, state){
		let active = state ? 1 : 2;
		webix.ajax(`${base_url}/news/active/${id}/${active}`).then(
			res=>{
				let result = res.json();
				console.log(result);
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	refreshData(){
		webix.ajax(`${base_url}/news/get`).then(
			res=>{
				let result = res.json();
				$$("data_news").clearAll();
				$$("data_news").parse(result,"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	deleteItem(id, name){
		console.log(id, name);
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: name,
			callback: (result)=>{
				if(result){
					webix.ajax(`${base_url}/news/delete/${id}`).then(
						res=>this.refreshData(),
						rej=>console.log('error', rej)
					);
				}
			}
		});
	}
	init(){
		this.refreshData();
	}
}