import {JetView} from "webix-jet";
import windowDevice from '../Windows';
import sub_view from './window';
import orderBy from "lodash.orderby";

export default class DonateData extends JetView{
	config(){
		let controlPanel = {height: 50, cols: [
					{width: 150, cols:[
							{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus", on:{
									onItemClick:()=>{
										this.showWindow();
									}
								}},
							{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true, on:{
									onItemClick:()=>{
										let item  = $$('list_donate').getSelectedItem();
										// item.min_price_hook = Number(item.min_price_hook);
										this.showWindow(item);
									}
								}},
							{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
									onItemClick:()=>{
										this.refreshData();
									}
								}},
							{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true, on: {
									onItemClick:()=>{
										console.log('asd');
										let item  = $$('list_donate').getSelectedItem();
										let id = item.id;
										let name = item.name;

										this.deleteItem(id, name);

									}
								}},
						]
					},
					{}
				]};

		let dataTable = {
				view: "datatable",
				id: 'list_donate',
				autoConfig: true,
				css: "webix_shadow_medium",
				columns: [
					{ id:"id",    header:"#", sort:"string", width:50},
					{ id:"city",   header:"Город", sort:"string", fillspace:true},
					{ id:"name",   header:"Наименование", sort:"string", fillspace:true},
					{ id:"type_name",   header:"Тип услуги", sort:"string",},
					{ id:"price",   header:"Стоимость", sort:"string", width:100},
					{ id:"day",   header:"Срок(Дней)", sort:"string", width:100},
					{ id:"active", header:"Активность", sort:"string", template:"{common.checkbox()}"},
				],
				select:"row",
				resizeColumn:true,
				on:{
					onAfterSelect:()=>{
						$$('edit_btn').enable();
						$$('delete_btn').enable();
					},
					onBlur:()=>{
						setTimeout(()=>{
							$$('edit_btn').disable();
							$$('delete_btn').disable();
							$$('list_donate').clearSelection();
						}, 500);
					},
					onCheck:(row, column, state)=>{
						this.activeService(row, state);
					},
					onItemDblClick:()=>{
						let item  = $$('list_donate').getSelectedItem();
						this.showWindow(item);
					}
				}
		};

		let ui = {
			rows: [
				{label: 'Список возможных услуг', view: 'label'},
				controlPanel,
				dataTable
			]
		}
		return ui;
	}
	activeService(id, state){
		let active = state ? 1 : 2;
		webix.ajax(`${base_url}/threeraza/admin/active/service/${id}/${active}`).then(
			res=>{
				let result = res.json();
				console.log(result);
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	refreshData(){
		webix.ajax(`${base_url}/threeraza/admin/list/donate`).then(
			res=>{
				$$("list_donate").clearAll();
				$$("list_donate").parse(res.json(),"json");
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	showWindow(item){
		let lists = {
			cities: [],
			type_donute:[],
			owners: []
		}
		webix.ajax(`${base_url}/get/cities`).then(
			res=>{
				lists.cities = this.nameToValue(res.json());
				webix.ajax(`${base_url}/ajax/get_all_rows/100/threeraza__type_donute`).then(
					res=>{
						lists.type_donute = this.nameToValue(res.json());
						let form = sub_view(lists);

						if(item != undefined){
							console.log(item);
							windowDevice(form, 'Редактирование услуги');
							$$('form_service').setValues(item);
						}else{
							windowDevice(form, 'Новая услуга');
						}
					},
					rej=>{lists.type_donute = []}
				)
			},
			rej=>{lists.cities = []}
		);
	}
	nameToValue(data){
		data.forEach(i=>{
			if(i.type == undefined){
				i.value = i.name;
			}else{
				i.value = `${i.first_name} ${i.last_name}`;
			}

		});
		let res = orderBy(data,['name'], ['asc']);
		return res;
	}
	deleteItem(id, name){
		console.log('del');
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: name,
			callback: (result)=>{
				if(result){
					webix.ajax(`${base_url}/threeraza/admin/service/delete/${id}`).then(
						res=>this.refreshData(),
						rej=>console.log('error', rej)
					);
				}
			}
		})

	}
	init(){
		this.refreshData();
	}
}