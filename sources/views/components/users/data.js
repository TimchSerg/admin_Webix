import {JetView} from "webix-jet";
import {renderPhone} from '../../controllers/functions';

let _base_dir_ = 'https://platform.ru/';

export default class DataView extends JetView{
	config(){
		return {
			view:"datatable",
			id: 'data_users',
			autoConfig:true,
			css:"webix_shadow_medium",
			resizeColumn:true,
			//
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
		webix.ajax(`${_base_dir_}threeraza/admin/users`).then(
			res=>{

				$$("data_users").clearAll();
				$$("data_users").parse(res.json(),"json");

			},
			rej=>console.log(rej.json(), 'error')
		);
	}

}