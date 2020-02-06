import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config(){
		var menu_data = [
			{id: "restaurant", icon: "mdi mdi-home-modern", value: "Заведения"},
			{id: "users", icon: "mdi mdi-account-multiple", value:"Пользователи"},
			{id: "service", icon: "mdi mdi-briefcase", value:"Услуги"},
		];

		var ui = {
			rows: [
				{ view: "toolbar", padding:3, elements: [
						{ view: "icon", icon: "mdi mdi-menu", click: function(){
								$$("$sidebar1").toggle();
							}
						},
						{ view: "label", label: "Панель админа"},
						{},
					]
				},
				{ cols:[
						{
							view: "sidebar",
							data: menu_data,
							width: 200,
							on:{
								onAfterSelect: (id) => {
									this.app.show('/main/components.' + id);
								},
							}
						},
						{
							type: "space",
							rows: [{$subview: true}]
						}
					]}
			]
		};

		return ui;
	}
	init(){
		// this.use(plugins.Menu, "top:menu");
	}
}