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
									if($$('form_restaurant').validate()){
										if(values.id == ''){
											//delete values.id;
											newRestaurant(values);
										}else {
											updateRestaurant(values);
										}
									}
								}},

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

function newRestaurant(items){

	let restaurant = formationDataRestaurant(items);
	delete restaurant.id;
		uploadImages().then(
			res=>{
				restaurant.other.images = res;
				uploadLogo().then(
					res=>{
						restaurant.other.logo = res;
						webix.ajax().headers({
							"Content-type":"application/json"
						}).post(`${base_url}/post/restaurant/1`, JSON.stringify(restaurant)).then(
							res=>{
								let refresh_btn = $$('refresh_btn');
								refresh_btn.callEvent('onItemClick');
								$$("win_custom").close();
							},
							rej=>console.log(rej)
						);
					}
				);
			}
		);

}

function updateRestaurant(items){
	let restaurant = formationDataRestaurant(items);
	let id = items.id;
	delete restaurant.id;
	uploadImages().then(
		res=>{
			restaurant.other.images = res;
			uploadLogo().then(
				res=>{
					restaurant.other.logo = res;
					// restaurant.owner_id = items.owner_id;
					webix.ajax().headers({
						"Content-type":"application/json"
					}).post(`${base_url}/threeraza/admin/restaurant/update/${id}`, JSON.stringify(restaurant)).then(
						res=>{
							let refresh_btn = $$('refresh_btn');
							refresh_btn.callEvent('onItemClick');
							$$("win_custom").close();
						},
						rej=>console.log(rej)
					);
				}
			);
		}
	);
}

function uploadLogo(){
	let input = document.getElementById('imgInp');
	let data = new FormData();
	console.log(storage_logo);
	if(true){
		data.append('logo', storage_logo);
	}

	return webix.ajax().post(`${base_url}/restaurant/admin/logo`, data).then(
		res=>{
			//console.log(JSON.encode(res));
			let result = res.json();
			let path = result.error ? '/files/avatars/default.jpg' : '/files/restaurant/logo/' + result.upload_data.file_name;
			return path;
		},
		rej=>{
			console.log(rej);
			return '/files/avatars/default.jpg';
		}
	);
};
function uploadImages(){
	let form = document.getElementById('form_multi_image');
	console.log(storage_images);
	let data;
	if(storage_images){
		data = new FormData(storage_images);
	}else{
		data = new FormData();
	}


	return webix.ajax().post(`${base_url}/restaurant/admin/images`, data).then(
		res=>{
			try{
				let result = res.json();
				return result.error ? [] : result;
			} catch (e) {
				return [];
			}
		},
		rej=>{
			return [];
		}
	);
};

export default sub_view;