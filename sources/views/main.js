import {JetView, plugins} from "webix-jet";
import logout from '../models/session';

export default class TopView extends JetView{
	config(){
		var menu_data = [
			{id: "restaurant", icon: "mdi mdi-home-modern", value: "Заведения",
				data: [
					{id: "restaurant.view.main_db", value:"Основная БД"},
					{id: "restaurant.view.old_db", value:"Старая БД"},
					{id: "restaurant.view.reviews", value:"Отзывы"},
				]
			},
			{id: "geolocation", icon: "mdi mdi-briefcase", value:"Геолокация"},
			{id: "users", icon: "mdi mdi-account-multiple", value:"Пользователи"},
			{id: "service", icon: "mdi mdi-briefcase", value:"Услуги"},
		];
		var logout_btn = { view:"button", type:"icon", icon:"mdi mdi-exit-to-app", click: () => this.show("/logout") };
		var ui = {
			rows: [
				{ view: "toolbar", padding:3, elements: [
						{ view: "icon", icon: "mdi mdi-menu", click: function(){
								$$("$sidebar1").toggle();
							}
						},
						{ view: "label", label: "Панель админа"},
						{width: 150, cols:[
								{ view: "label", label: "Выход"},
								logout_btn
							]}

					]
				},
				{ cols:[
						{
							view: "sidebar",
							data: menu_data,
							//width: 200,
							on:{
								onAfterSelect: (id) => {
									console.log(id);
									if(id != 'restaurant'){
										this.app.show('/main/components.' + id);
									}
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