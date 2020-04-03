import {formationDataRestaurant} from '../restaurant/controllers/restaurant_data.js';
import {basic} from "./component_window/basic";
import {gallery} from "./component_window/gallery";
import {menu_list} from "./component_window/menu_list";

import {storage_logo} from "../../../components/uploadImage/components/secondImage";
import {storage_images} from "../../../components/uploadImage/components/multiImages";

let sub_view = (lists)=>{
	lists.owners.push({id: 0, value: 'Владелец не выбран'});
	let basic_page = basic(lists);
	let gallery_page = gallery;
	let menu_list_page = menu_list;
	let tabbar_rest = {
		view: 'tabbar',
		id:'tabbar_rest',
		//value:"basic",
		multiview:true,
		borderless: true,
		options:[
			{value: 'Основное', id:'basic'},
			{value: 'Галерея и soc.link', id:'gallery'},
			{value: 'Меню и График раб.', id:'menu_list'},
		]
	};
	let cells = {
		cells: [
			basic_page,
			gallery_page,
			menu_list_page
		]
	};
	let result = {
		view: 'form',
		id: 'form_restaurant',
		borderless: true,
		elements: [
			{rows:[
					// {height: 15},
					{cols:[
						{width: 15},
						{rows:[
								tabbar_rest,
								cells
							]},
						{width: 15},
					]},

			]},

		],
		rules:{
			"phone_owner": ()=>{return true;},
			"name":webix.rules.isNotEmpty,
			"phone":webix.rules.isNotEmpty,
			"address":webix.rules.isNotEmpty,
			"min_price_hook": webix.rules.isNotEmpty,
		}
	};

	return result;
};


export default sub_view;