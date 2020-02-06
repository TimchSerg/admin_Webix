import {JetView} from "webix-jet";

export default class DonateData extends JetView{
	config(){
		let controlPanel = {height: 50, cols: [
					{width: 150, cols:[
							{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus"},
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
					{ id:"name",   header:"Наименование", fillspace:true},
					{ id:"price",   header:"Стоимость", width:100},
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