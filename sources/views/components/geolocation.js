import {JetView} from "webix-jet";
import DataView from "./geolocation/DataView.js";

export default class Active extends JetView{
	config(){
		return { rows: [
				DataView
			]};
	}
}