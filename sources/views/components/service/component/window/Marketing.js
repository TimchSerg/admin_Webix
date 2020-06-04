import {JetView} from "webix-jet";

export default class Marketing extends JetView{
	config() {
		let ui = {
			view:'form', id:'form_element_marketing',
			elements:[
				{view:'label', label:'Реклама'},
				{height:10},
				{ view:"slider", label:"Кол-во дней", value:"0", name:"range_day", min:1, max:31, labelWidth:100,
					title:(obj)=>{
						let value = obj.value;
						return `${value} дней`;
					}, moveTitle:false},
				//{view:'text', name:'count', label: 'Частота:', pattern:{ mask:"#####", allow:/[0-9]/g}, labelWidth:100,},
				{view:'text', name:'price', label: 'Цена:', pattern:{ mask:"####", allow:/[0-9]/g}, labelWidth:100, validate: (v)=>{return v.length ? true : false;}}
			]
		};
		return ui;
	}
}