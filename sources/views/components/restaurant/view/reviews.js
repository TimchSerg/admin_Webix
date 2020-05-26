import {JetView} from "webix-jet";
import groupBy from 'lodash.groupby';
//import orderBy from 'lodash.orderby';

export default class Active extends JetView{
	config(){
		let list_city = {
			view:'list', id:'list_city',
			template:'#name#',
			width:250,
			data:[]
		};
		let datatable = {
			view:'datatable', id:'reviews_datatable',
			autoConfig:true,
			//css:"webix_shadow_medium",
			resizeColumn:true,
			columns: [
				{ id:"id",    header:"#", width:50, sort:"string",},
				{ id:"date",   header:[ "Дата создания", { content:"textFilter" } ], sort:"string", width:100, },
				{ id:"restaurant_name",  header:[ "Заведение", { content:"textFilter" } ], sort:"string", fillspace:true},
				{ id:"user_name",  header:[ "Пользователь", { content:"textFilter" } ], sort:"string", fillspace:true},
				{ id:"comment",   header:"Отзыв", sort:"string", fillspace:true},
				{ id:"active", header:"Активность", template:"{common.checkbox()}"},
			],
			select:"row",
			on:{
				onCheck:(row, column, state)=>{
					this.activeCommit(row, state);
				},
			}
		};
		let view = {
			rows:[
				{ header:"Отзывы", body:{
						rows: [
							{cols:[
									{ header:"Список городов", body:{
											rows:[
												list_city
											],
										}},
									{view:'resizer'},
									{rows:[
											{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
													onItemClick:()=>{
														this.refreshData();
													}
												}},
											datatable
										]}
								]}
						]
					}},
			]
		};
		return view;
	}
	refreshData(){
		webix.ajax(`${base_url}/get/admin/comment`).then(
			res=>{
				let result = res.json();

				result.forEach((i)=>{
					i.city_name = i.city[0].name;
					i.user_name = i.user[0].login;
					i.restaurant_name = i.restaurant[0].name;
				});

				let city = groupBy(result,'city_name');
				let list_city = [];
				for (const key in city) {
					let item = {
						name:key,
						data:city[key]
					};
					list_city.push(item);
				}
				$$("list_city").clearAll();
				$$("list_city").parse(list_city);

				$$("reviews_datatable").clearAll();
				$$("reviews_datatable").parse(result);
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	activeCommit(id, state){
		let active = state ? 1 : 2;
		webix.ajax(`${base_url}/put/admin/commit/active/${id}/${active}`).then(
			res=>{
				let result = res.json();
				console.log(result);
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	init(_$view, _$) {
		this.refreshData();
	}
}