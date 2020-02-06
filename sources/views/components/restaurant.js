import {JetView} from "webix-jet";
import DataView from "./restaurant/data.js";

export default class Active extends JetView{
	config(){
		return { rows: [
				{height: 50, cols: [
						{width: 150, cols:[
								{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus"},
								{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true},
								{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true},
							]
						},
						{}
					]},
				DataView
			]};
	}
}