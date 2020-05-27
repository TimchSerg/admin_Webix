import {JetView} from "webix-jet";
import groupBy from 'lodash.groupby';
import formatWindow from "jet-views/components/restaurant/view/windows/winComment";
import {options} from "jet-views/components/geolocation/DataView";
import windowDevice from "jet-views/components/Windows";
//import orderBy from 'lodash.orderby';

let data_comment = [];
export default class Active extends JetView{
	config(){
		let list_city = {
			view:'list', id:'list_city',
			template:'#name#', select:true,
			width:250,
			data:[],
			on:{
				onAfterSelect:(id)=>{
					let select = $$('list_city').getSelectedItem();

					this.refreshComment(select);
				}
			}
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
				onAfterSelect:()=>{
					let select = $$('reviews_datatable').getSelectedItem();

					if(select){
						$$('edit_btn').enable();
						$$('delete_btn').enable();
					}
				},
				onItemDblClick:()=>{
					let item  = $$('reviews_datatable').getSelectedItem();

					this.editItem(item);
				}
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
											{cols: [
													{ view:"button", id:"edit_btn", type:"icon", icon:"wxi-pencil", disabled: true, on: {
															onItemClick:()=>{
																let item  = $$('reviews_datatable').getSelectedItem();

																this.editItem(item);
															}
														}},
													{ view:"button", id:"refresh_btn", type:"icon", icon:"mdi mdi-refresh", disabled: false, on: {
															onItemClick:()=>{
																this.refreshData();
															}
														}},
													{ view:"button", id:"delete_btn", type:"icon", icon:"mdi mdi-delete", disabled: true, on: {
															onItemClick:()=>{
																let item  = $$('reviews_datatable').getSelectedItem();
																let id = item.id;
																let name = item.name;

																this.deleteItem(id, name);
															}
														}}
												]},
											datatable
										]}
								]}
						]
					}},
			]
		};
		return view;
	}
	editItem(item){
		if(item){
			let form = formatWindow(item);
			windowDevice(form, 'Редактирование комментария');

			//$$('form_comment').setValues(item);
		}
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
				data_comment = result;
			},
			rej=>console.log(rej.json(), 'error')
		);
	}
	deleteItem(id, name){
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: '',
			callback: (result)=>{
				if(result){
					webix.ajax(`${base_url}/delete/admin/comment/${id}`).then(
						res=>this.refreshData(),
						rej=>console.log('error', rej)
					);
				}
			}
		})
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
	refreshComment(select){
		let filter = data_comment.filter((i)=>{
			return i.city_name == select.name;
		});
		$$("reviews_datatable").clearAll();
		$$("reviews_datatable").parse(filter);
	}
	init(_$view, _$) {
		this.refreshData();
	}
}