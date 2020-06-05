import MenuController from "jet-views/components/service/controller/MenuController";

export default class Menu extends MenuController{
	config(){

		let ui = {
			height: 50, cols: [
				{width: 150, cols:[
						{ view:"button", id:"add_btn", type:"icon", icon:"mdi mdi-plus", on:{
								onItemClick:()=>{
									this.add();
								}
							}},
						{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true, on:{
								onItemClick:()=>{
									let item  = $$('table_stocks').getSelectedItem();
									// item.min_price_hook = Number(item.min_price_hook);
									if(item) this.update(item);
								}
							}},
						{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
								onItemClick:()=>{
									this.refresh('item_admin');
								}
							}},
						{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true, on: {
								onItemClick:()=>{
									let item  = $$('table_stocks').getSelectedItem();

									if(item) this.deleteItem(item.id, 'item_admin');
								}
							}},
					]
				},
				{}
			]};
		return ui;
	}
}