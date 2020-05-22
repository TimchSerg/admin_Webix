import {JetView} from "webix-jet";
import MetroData from './MetroData';
import {MenuBtn} from "jet-views/components/geolocation/MenuBtn";
import {MenuGroup} from "jet-views/components/geolocation/components/MenuGroup";
import sub_view from "jet-views/components/geolocation/window";
import windowDevice from "jet-views/components/Windows";
import orderBy from "lodash.orderby";

export let options = {
	cities: [],
	group: []
};
console.log('asdasdas');
export default class DataView extends JetView{
	config(){
		let this__btn_hidden = {
			hidden:true,
			rows:[
				{view:'button', id:'btn_getGroup', on:{
						onItemClick:()=>{
							this.getGroup();
						}
					}}
			]
		};
		var col_tree = {
			view: "list", id: "col_tree",
			width: 220,	//drag: true,
			select: true,
			template:"#id#: #value#",
			data: [],
			on: {
				onItemClick:(id)=>{
					console.log(id);
				},
				onItemDblClick:()=>{
					$$('group_edit_btn').callEvent('onItemClick');
				}
			}
		};
		let ui = {
			rows: [
				this__btn_hidden,
				{cols:[
						{	header: "Группы", headerHeight: 53,
							body: {
								rows: [
									MenuGroup,
									col_tree,
								]
							},
						},
						{view: "resizer"},
						{	header: "Станции метро", headerHeight: 53,
							body: {
								rows: [
									MenuBtn,
									MetroData,
								]
							},
						},
					]}
			]
		};
		return ui;
	}
	getGroup(){
		console.log('getGroup');
		webix.ajax(`${base_url}/group/get`).then(
			res=>{
				let group = this.nameToValue(res.json());

				$$('col_tree').clearAll();
				$$('col_tree').parse(group);
			},
			rej=>{console.log(rej);}
		);
	}
	getCityes(){
		webix.ajax(`${base_url}/get/cities`).then(
			res=>{
				let cities = this.nameToValue(res.json());
					options.cities = cities;
			},
			rej=>{
				console.log(rej);
			}
		);
	}
	nameToValue(data){
		data.forEach(i=>{
			i.value = i.name;
		});
		let res = orderBy(data,['name'], ['asc']);
		return res;
	}
	init(){
		this.getGroup();
		this.getCityes();
	}
}