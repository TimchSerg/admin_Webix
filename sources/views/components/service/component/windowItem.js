import StocksController from "jet-views/components/service/controller/StocksController";
import {config} from "jet-views/components/service/data";
import Position from "jet-views/components/service/component/window/Position";
import QrCode from "jet-views/components/service/component/window/QrCode";
import Marketing from "jet-views/components/service/component/window/Marketing";

export default class windowItem extends StocksController{
	config(){
		let ui = {
			view: 'window',	id: 'win_custom',
			move: false, resize: true, modal: true,
			position: 'center',	fullscreen: false,
			width: 800,	minHeight: 600,
			head: {
				view: "toolbar", cols: [
					{view: "label", id: 'WindowRender_label', label: 'Настройки элемента'},
					{view: "icon", icon: "mdi mdi-close", click: ()=>{$$("win_custom").close();} },
				],
			},
			body: {
				padding:15,
				rows: [
					{	view:'form', id:'form_element',
						elements:[
							{cols:[
									{view:'text', name:'id', label:'Код:', disabled: true, labelWidth:100,},
									{width:10},
									{view:'richselect', name:'type_id', label: 'Тип:', options:config.list_type, labelWidth:60,
										on:{
											onChange:(newv)=>{ this.showForm(newv); }
										}
									}
								]},
							{view:'text', name:'name', label:'Название:', labelWidth:100,},
							{view:'textarea', name:'description', height:120, label:"Описание:", labelPosition:"top" },
							{height: 10},

							{id:'rows_position', hidden:true, rows:[
									Position
								]},
							{id:'rows_qrcode', hidden:true, rows:[
									QrCode
								]},
							{id:'rows_marketing', hidden:true, rows:[
									Marketing
								]},

							{view:'button', id:'save_form', css:"webix_primary", label: 'Сохранить', on:{
									onItemClick:()=>{
										this.saveElement();
									}
								}}
						],
						rules:{
							"name":webix.rules.isNotEmpty,
							"type_id":webix.rules.isNotEmpty,
							"description": webix.rules.isNotEmpty,
						}
					}
				]
			}
		};
		return ui;
	}
	saveElement(){
		if($$('form_element').validate()){
			let data = $$('form_element').getValues();
			let data_form_stock = this.getValuesByType(data.type_id);

			if(!Object.keys(data_form_stock).length) return;

			data.parameters = data_form_stock;
			console.log(data);
			if(data.id == ''){
				delete data.id;
				this.post(data, 'item_admin').then(
					res=> {
						$$("refresh_btn").callEvent("onItemClick");
						$$("win_custom").close();
					},
					rej=>console.log('error', rej)
				);
			}else{
				this.put(data, 'item_admin').then(
					res=> {
						$$("refresh_btn").callEvent("onItemClick");
						$$("win_custom").close();
					},
					rej=>console.log('error', rej)
				);
			}
		};
	}
	showForm(id){
		let array_name_form = ['rows_position', 'rows_qrcode', 'rows_marketing'];
		array_name_form.forEach((i)=>{
			$$(i).hide();
		});

		//let type = config.list_type.filter((i)=>{ return i.id == id; });
		switch (id) {
			case '1':
				$$(array_name_form[0]).show();
				break;
			case '2':
				$$(array_name_form[1]).show();
				break;
			case '3':
				$$(array_name_form[2]).show();
				break;
			default:
				console.log(id, 'default');
				//alert( "Нет таких значений" );
		}
	}
	getValuesByType(id){
		let array_name_form = ['form_element_position', 'form_element_qrcode', 'form_element_marketing'];
		let result = {};
		switch (id) {
			case '1':
				if($$(array_name_form[0]).validate()){
					result = $$(array_name_form[0]).getValues();
				}
				break;
			case '2':
				if($$(array_name_form[1]).validate()){
					result = $$(array_name_form[1]).getValues();
				}
				break;
			case '3':
				if($$(array_name_form[2]).validate()){
					result = $$(array_name_form[2]).getValues();
				}
				break;
			default:
				console.log(id, 'default');
			//alert( "Нет таких значений" );
		}

		return result;
	}
	showWindow(){
		this.getRoot().show();
	}
	init(){

	}
}