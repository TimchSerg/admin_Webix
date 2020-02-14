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
							{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true},
							{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true},
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
					{ id:"id",    header:"#", width:50},
					{ id:"city",   header:"Город", fillspace:true},
					{ id:"name",   header:"Наименование", fillspace:true},
					{ id:"type",   header:"Тип услуги"},
					{ id:"price",   header:"Стоимость", width:100},
					{ id:"active", header:"Активность", template:"{common.checkbox()}"},
				],
				select:"row",
				resizeColumn:true,
				on:{
					onAfterSelect:()=>{
						$$('edit_btn').enable();
						$$('delete_btn').enable();
					},
					onBlur:()=>{
						$$('list_donate').clearSelection();
						$$('edit_btn').disable();
						$$('delete_btn').disable();
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
	showWindow(){
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
						console.log(lists);
						windowDevice(form, 'Новая услуга');
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
	init(){
		webix.ajax(`${base_url}/threeraza/admin/list/donate`).then(
			res=>{

				$$("list_donate").clearAll();
				$$("list_donate").parse(res.json(),"json");

			},
			rej=>console.log(rej.json(), 'error')
		);
	}
}