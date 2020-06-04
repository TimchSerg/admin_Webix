import {JetView} from "webix-jet";

export default class StocksController extends JetView{
	getByUrl(url){
		return new Promise((resolve, reject) => {
			webix.ajax(`${base_url}${url}`).then(
				res=>{
					let result = res.json();
					resolve(result);
				},
				rej=> {
					reject(rej.json());
				}
			);
		});
	}
	get(table){
		console.log(table, 'get');
		return new Promise((resolve, reject) => {
			webix.ajax(`${base_url}/get/stocks/${table}`).then(
				res=>{
					let result = res.json();
					resolve(result);
				},
				rej=> {
					reject(rej.json());
				}
			);
		});

	}
	post(data, table){
		console.log(data, table, 'post');
	}
	put(data, table){
		console.log(data, table, 'put');
	}
	delete(data, table){
		console.log(data, table, 'delete');
	}
	activeItem(row, state){
		console.log(row, state, 'activeItem');
	}
}