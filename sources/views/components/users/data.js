import {JetView} from "webix-jet";
import {renderPhone} from '../../controllers/functions';
import Owner from 'jet-views/components/users/Owner';
import Customers from 'jet-views/components/users/Сustomers';
import groupBy from 'lodash.groupby';

export default class DataView extends JetView{
	config(){
		let ui = {
			rows:[
				Owner,
				{height:15},
				Customers
			]
		}
		return ui;
	}
	init(){
		webix.ajax(`${base_url}/threeraza/admin/users`).then(
			res=>{
				let result = res.json();
				let group = groupBy(result, 'type');

				$$("data_users_customer").clearAll();
				$$("data_users_customer").parse(group['Клиент'],"json");

			},
			rej=>console.log(rej.json(), 'error')
		);
	}
}