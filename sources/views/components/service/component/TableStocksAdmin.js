import MenuController from "jet-views/components/service/controller/MenuController";

export default class TableStocksAdmin extends MenuController{
	config(){

		let ui = {
				view: "datatable", id: 'table_stocks',
				autoConfig: true, css: "webix_shadow_medium",
				columns: [
					{ id:"id",    header:"#", sort:"string", width:50},
					{ id:"type_name",   header:"Тип услуги", sort:"string",},
					{ id:"name",   header:"Наименование", sort:"string", fillspace:true},
					{ id:"description",   header:"Описание", sort:"string", fillspace:true},
					{ id:"active", header:"Активность", sort:"string", template:"{common.checkbox()}"},
				],
				select:"row", resizeColumn:true,
				on:{
					onBeforeLoad: function () {
						this.showOverlay("Загрузка данных...");
						if (!this.count()) {
							this.showOverlay("Записей нет.");
						} else {
							this.hideOverlay();
						}
					},
					onAfterLoad: function () {
						if (!this.count()) {
							this.showOverlay("Записей нет.");
						} else {
							this.hideOverlay();
						}
					},
					onAfterSelect:()=>{
						$$('edit_btn').enable();
						$$('delete_btn').enable();
					},
					onBlur:()=>{
						setTimeout(()=>{
							$$('edit_btn').disable();
							$$('delete_btn').disable();
							// $$('list_donate').clearSelection();
						}, 500);
					},
					onCheck:(row, column, state)=>{
						this.activeItem(row, state);
					},
					onItemDblClick:()=>{
						let item  = $$('table_stocks').getSelectedItem();
						this.update(item);
					}
				}
			};
		return ui;
	}
	init() {
		this.get('item_admin').then(
			res=> {
				console.log(res);

				$$('table_stocks').clearAll();
				$$('table_stocks').parse(res);
			},
			rej=>console.log(rej)
		);
	}
}