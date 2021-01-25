import StocksController from "jet-views/components/service/controller/StocksController";
import {Jodit} from "jodit";
import {uploadImages} from "../../../components/uploadImage/uploadImages";
import {storage_logo, clearStorage} from "../../../components/uploadImage/components/secondImage";

export var editor = null;
let uploadCustom = uploadImages('second', 'foto');
export default class windowItem extends StocksController{
	config() {
		let form = {
			view: "form",
			id: "form_news",
			elements: [
				{view: "text", hidden: true, name: "id"},
				{cols:[
						{rows:[
								{view: 'label', label: 'Фото превью'},
								uploadCustom
							]},
						{padding:10, rows:[
								{view: "text", value: "", label: "Наименование", name: "name", labelPosition: 'top'},
								{view: "textarea", value: "", label: "Описание", name: "description", labelPosition: 'top', height: 150},
							]}
					]},
				{
					borderless:true,
					template: '<textarea id="editor_news" name="editor_news"> </textarea>',
					on: {
						onAfterRender: () => {

							let height = document.body.clientHeight - 385;
							// eslint-disable-next-line no-unused-vars
							editor = new Jodit("#editor_news", {
								"uploader": {
									"insertImageAsBase64URI": true
								},
								"height": height,
								"buttons": "|,source,|,bold,italic,underline,|,ul,ol,|,font,fontsize,brush,,image,table,link,|,align,undo,redo,\n,cut,copy,paste,|,fullsize,print,about"
							});

							// editor.s.insertHTML('<h1>sadasdasd</h1>')
						}
					}
				},
				{
					cols: [
						{
							view: "button", css: "webix_danger", value: "Отменить", click: () => {
								this.close();
							}
						},
						{
							view: "button", css: "webix_primary", value: "Сохранить", click: () => {
								if($$('form_news').validate()){
									let values = $$("form_news").getValues();
									values.html_code = String(editor.value);
									if(values.id != ''){
										this.updateNews(values);
									}else{
										this.createNews(values);
									}
								}
							}
						},

					]
				}
			],
			rules:{
				"name":webix.rules.isNotEmpty,
				"description":webix.rules.isNotEmpty,
			}

		};
		let ui = {
			view: 'window', id: 'win_custom',
			move: false, resize: true, modal: true,
			position: 'center', fullscreen: true,
			top: 15,
			head: {
				view: "toolbar", cols: [
					{view: "label", id: 'WindowRender_label', label: 'Настройки элемента'},
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
	updateNews(news){
		delete news.logo;

		if(storage_logo){
			this.uploadLogo().then(
				res=>{
					news.h_image = res;
					webix.ajax().headers({
						"Content-type":"application/json"
					}).post(`${base_url}/news/put/${news.id}`, JSON.stringify(news)).then(
						res=>{
							let refresh_btn = $$("refresh_btn");
							refresh_btn.callEvent("onItemClick");
							$$("win_custom").close();
						},
						rej=>console.log(rej)
					);
				}
			).catch(e=>{
					console.log(e)
				}
			)
		}else{
			webix.ajax().headers({
				"Content-type":"application/json"
			}).post(`${base_url}/news/put/${news.id}`, JSON.stringify(news)).then(
				res=>{
					let refresh_btn = $$("refresh_btn");
					refresh_btn.callEvent("onItemClick");
					$$("win_custom").close();
				},
				rej=>console.log(rej)
			);
		}

	}
	createNews(news){
		delete news.id;
		delete news.logo;

		this.uploadLogo().then(
			res=>{
				news.h_image = res;
				webix.ajax().headers({
					"Content-type":"application/json"
				}).post(`${base_url}/news/new`, JSON.stringify(news)).then(
					res=>{
						let refresh_btn = $$("refresh_btn");
						refresh_btn.callEvent("onItemClick");

						this.close();
					},
					rej=>console.log(rej)
				);
			}
		).catch(e=>{
				console.log(e)
			}
		)
	}
	uploadLogo(old){
		let input = document.getElementById("imgInp");
		let data = new FormData();
		if(old == undefined){
			old = "/files/avatars/default.jpg";
		}
		if(true){
			data.append("logo", storage_logo);
		}

		return webix.ajax().post(`${base_url}/news/logo`, data).then(
			res=>{
				//console.log(JSON.encode(res));
				let result = res.json();
				let path = result.error ? old : "/files/news/" + result.upload_data.file_name;
				return path;
			},
			rej=>{
				// eslint-disable-next-line no-console
				console.log(rej);
				return "/files/avatars/default.jpg";
			}
		);
	}
	close(){
		clearStorage();
		$$("win_custom").close();
	}
	showWindow(){
		this.getRoot().show();
	}
	init(){

	}
}