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
		data.type_id = Number(data.type_id);
		return new Promise((resolve, reject) => {
			webix.ajax().headers({
				"Content-type":"application/json"
			}).post(`${base_url}/post/stocks/${table}`, JSON.stringify(data)).then(
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
	put(data, table){
		console.log(data, table, 'put');
		data.type_id = Number(data.type_id);
		return new Promise((resolve, reject) => {
			webix.ajax().headers({
				"Content-type":"application/json"
			}).post(`${base_url}/put/stocks/${table}`, JSON.stringify(data)).then(
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
	delete(id, table){
		console.log(id, table, 'delete');
		return new Promise((resolve, reject) => {
			webix.ajax(`${base_url}/delete/stocks/${id}/${table}`).then(
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
	activeItem(row, state){
		console.log(row, state, 'activeItem');
	}
}