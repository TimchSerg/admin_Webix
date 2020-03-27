import {basic} from "./component_window/basic";
import {gallery} from "./component_window/gallery";
import {menu_list} from "./component_window/menu_list";

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
	}
	let result = {
		view: 'form',
		id: 'form_restaurant',
		borderless: true,
		elements: [
			{rows:[
					{height: 15},
					{cols:[
						{width: 15},
						{rows:[
								tabbar_rest,
								cells
							]},
						{width: 15},
					]},
					{height: 15},
					{cols:[
							{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
									$$("win_custom").close();
								}},
							{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
									let values = $$('form_restaurant').getValues();
									if(values.id == ''){
										delete values.id;
										newRestaurant(values);
									}else {
										updateRestaurant(values);
									}
								}},

						]},

			]},

		]
	};

	return result;
}

function newRestaurant(items){
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/threeraza/admin/restaurant/new`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
function updateRestaurant(items){
	console.log(items);
	let id = items.id;
	let custom = {
		city_id:items.city_id,
		category_id:items.category_id,
		name:items.name,
		phone:items.phone,
		address:items.address,
		min_price_hook:items.min_price_hook,
		owner_id:items.owner_id,
		phone_owner:items.phone_owner
	}
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/threeraza/admin/restaurant/update/${id}`, JSON.stringify(custom)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}

export default sub_view;