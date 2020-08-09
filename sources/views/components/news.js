import {JetView} from "webix-jet";
import DataView from "./news/data.js";

export default class Active extends JetView{
	config(){
		return { rows: [
				DataView
			]};
	}
}