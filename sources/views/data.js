import {JetView} from "webix-jet";

export default class DataView extends JetView{
	config(){
		return { view:"datatable", autoConfig:true, css:"webix_shadow_medium" };
	}
	init(view){

	}
}