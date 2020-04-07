import {JetView} from "webix-jet";
import MetroData from './MetroData';
import {MenuBtn} from "jet-views/components/geolocation/MenuBtn";

export default class DataView extends JetView{
	config(){

		let ui = {
			rows: [
				MenuBtn,
				MetroData,
			]
		};
		return ui;
	}
	init(view){
		//view.parse(data);
	}
}