import {JetView} from "webix-jet";
import OldDataView from "../../restaurant/old_data.js";

export default class Active extends JetView{
	config(){
		let view = {
			rows:[
				{ header:"Старая база данных", body:{
						rows: [
							OldDataView
						]
					}},
			]
		};
		return view;
	}
}