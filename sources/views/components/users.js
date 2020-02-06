import {JetView} from "webix-jet";
import DataView from "./users/data.js";

export default class Active extends JetView{
	config(){
		return { rows: [
				DataView
			]};
	}
}