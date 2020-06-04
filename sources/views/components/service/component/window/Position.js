import {JetView} from "webix-jet";
import {config} from "jet-views/components/service/data";

export default class Position extends JetView{
	config() {
		let ui = {
			view:'form', id:'form_element_position',
			elements:[
				{view:'label', label:'Позиция ТОП3'},
				{height:10},
				{cols:[
						{view:'richselect', label: 'Город:', name:'city_id', options:config.list_cities, labelWidth:100, },
						{width:10},
						{view:'richselect', label: 'Район:', name:'group_id', options:[], labelWidth:60, }
					]},
				{ view:"slider", label:"Диапозон от", value:"0", name:"range_from", min:0, max:28, labelWidth:100,
					title:(obj)=>{
						let value = obj.value;
						return `Диапозон от ${value} дней`;
					}, moveTitle:false},
				{ view:"slider", label:"Диапозон до", value:"0", name:"range_to", min:0, max:28, labelWidth:100,
					title:(obj)=>{
						let value = obj.value;
						return `Диапозон до ${value} дней`;
					}, moveTitle:false},
				{view:'richselect', label: 'Позиция:', name:'position', options:[
						{id:1, value: '1'},
						{id:2, value: '2'},
						{id:3, value: '3'},
					], labelWidth:100,},
				{view:'text', name:'price', label: 'Цена:', placholder:'За 1 день', pattern:{ mask:"####", allow:/[0-9]/g}, labelWidth:100, validate: (v)=>{return v.length ? true : false;}}
			],
			rules:{
				"city_id":webix.rules.isNotEmpty,
				"position": webix.rules.isNotEmpty,
			}
		};
		return ui;
	}
}