import {JetView} from "webix-jet";
import {options} from "../DataView";
import formatWindow from "./windows/group";
import windowDevice from "jet-views/components/Windows";

export class MenuGroup extends JetView{
	config(){

		let ui = {height: 50, cols: [
				{width: 150, cols:[
						{ view:"button", id:"group_add_btn", type:"icon", icon:"mdi mdi-plus", on:{
								onItemClick: ()=>{
									let form = formatWindow(options);
									windowDevice(form, 'Добавление групп');
								}
							}},
						{ view:"button", id:"group_edit_btn", type:"icon", icon:"wxi-pencil", disabled: false, on: {
								onItemClick:()=>{
									let item  = $$('col_tree').getSelectedItem();
									if(item){
										let form = formatWindow(options);
										windowDevice(form, 'Редактирование групп');
										console.log(item);
										$$('form_group').setValues(item);
									}
								}
							}},
						{ view:"button", id:"group_refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
								onItemClick:()=>{
									this.refreshData();
								}
							}},
						{ view:"button", id:"group_delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: false, on: {
								onItemClick:()=>{
									let item  = $$('col_tree').getSelectedItem();
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
	refreshData(){
		$$('btn_getGroup').callEvent('onItemClick');
	}
	deleteItem(id, name){
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: name,
			callback: (result)=>{
				if(result){
					webix.ajax(`${base_url}/group/delete/${id}`).then(
						res=>this.refreshData(),
						rej=>console.log('error', rej)
					);
				}
			}
		});
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
