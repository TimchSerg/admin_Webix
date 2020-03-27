import {JetView} from "webix-jet";
import DonateData from "jet-views/components/service/DonateData";
import DataRestaurantDonate	from "jet-views/components/service/DataRestaurantDonate";

export default class DataView extends JetView{
	config(){

		let ui = {
			rows: [
				DonateData,
				{view:'resizer'},
				DataRestaurantDonate
			]
		};
		return ui;
	}
	init(view){
		//view.parse(data);
	}
}