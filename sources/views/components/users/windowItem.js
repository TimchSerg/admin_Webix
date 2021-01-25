import StocksController from "jet-views/components/service/controller/StocksController";
import {storage_logo, clearStorage} from "../../../components/uploadImage/components/secondImage";

export var editor = null;
export default class windowItem extends StocksController{
	config() {
		let form = {
			view: "form",
			id: "form_users",
			elements: [
				{view: "text", hidden: true, name: "id"},
				{view: "text", hidden: true, name: "type", value:"2"},
				{view: 'text', name:'email', label: 'e-mail', labelPosition: 'top'},
				{view: 'text', name:'login', label: 'Логин', labelPosition: 'top'},
				{view: 'text', type:'password', name:'password', label: 'Пароль', labelPosition: 'top'},
				{
					cols: [
						{
							view: "button", css: "webix_danger", value: "Отменить", click: () => {
								this.close();
							}
						},
						{
							view: "button", css: "webix_primary", value: "Сохранить", click: () => {
								let data = $$('form_users').getValues();
								console.log(data, 'save');
								let test = {
									email: "serg@mail.com",
									login: "serg@mail.com",
									password: "123456",
									type: "2"
								}
								this.createUsers(test);
							}
						},
					]
				}
			],

		};
		let ui = {
			view: 'window', id: 'win_custom',
			move: false, resize: true, modal: true,
			position: 'center', fullscreen: false,
			top: 15,
			head: {
				view: "toolbar", cols: [
					{view: "label", id: 'WindowRender_label', label: 'Добавление/редактирование пользователя'},
					{
						view: "icon", icon: "mdi mdi-close", click: () => {
							this.close();
						}
					},
				],
			},
			body: {
				padding: 15,
				rows: [
					form
				]
			}
		};
		return ui;
	}
	createUsers(data){
		webix.ajax().headers({
			"Content-type":"application/json"
		}).post(`${base_url}/threeraza/admin/create/user`, JSON.stringify(data)).then(
			res=>{
				console.log(res);
				let refresh_btn = $$("refresh_btn");
				refresh_btn.callEvent("onItemClick");

				this.close();
			},
			rej=>console.log(rej)
		);
	}
	close(){
		$$("win_custom").close();
	}
	showWindow(){
		this.getRoot().show();
	}
	init(){

	}
}