import {formationDataRestaurant} from "jet-views/components/restaurant/controllers/restaurant_data";
import {storage_logo} from "../../../../components/uploadImage/components/secondImage";
import {storage_images} from "../../../../components/uploadImage/components/multiImages";

export let basic =(lists)=>{


	let result = {
		rows:[
			{view: 'text', name:'id', value:'', hidden: true},
			{
				view:"select", name: 'city_id', id:'select_city',
				label:"Город", labelWidth:170,
				value:365, options:lists.cities
			},
			{
				view:"select", name: 'category_id',
				label:"Категория заведения", labelWidth:170,
				value:3, options:lists.category
			},
			{view:"text", value:"",	label:"Наименование", name:'name', labelWidth:170 },
			{view:"text", value:"",	label:"Телефон заведения", name:'phone', labelWidth:170, pattern:{ mask:"+#(###)###-##-##", allow:/[0-9]/g}},
			{view:"text", value:"",	label:"Адрес", name:'address', labelWidth:170 },
			{view:"text", value:0, label:"Минимальная цена кальяна", name:'min_price_hook', labelWidth:200, pattern:{ mask:"####", allow:/[0-9]/g}, validate: (v)=>{return v.length ? true : false;} },
			{template:'<hr>', height:1},
			{
				view:"select", name: 'owner_id',
				label:"Владелец", labelWidth:170,value: '48',
				options:lists.owners
			},
			{view:"text", label:"Телефон владельца", name:'phone_owner', labelWidth:170, pattern:{ mask:"+#(###)###-##-##", allow:/[0-9]/g}, validate: (v)=>{return true} },
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

			{template:'<hr>', height:1},
			{height:15}

		]
	};

	return {
		id:'basic',
		rows:[
			{height: 15},
			result
		]
	};
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
					}).post(`${base_url}/post/restaurant/${restaurant.owner_id}`, JSON.stringify(restaurant)).then(
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
	let images = items.images;
	let restaurant = formationDataRestaurant(items);
	let id = items.id;
	delete restaurant.id;
	uploadImages().then(
		res=>{
			let result = images.concat(res);
			restaurant.other.images = result;
			uploadLogo(restaurant.other.logo).then(
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

function uploadLogo(old){
	let input = document.getElementById('imgInp');
	let data = new FormData();

	if(true){
		data.append('logo', storage_logo);
	}

	return webix.ajax().post(`${base_url}/restaurant/admin/logo`, data).then(
		res=>{
			//console.log(JSON.encode(res));
			let result = res.json();
			let path = result.error ? old : '/files/restaurant/logo/' + result.upload_data.file_name;
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

