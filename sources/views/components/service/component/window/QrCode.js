import {JetView} from "webix-jet";

export default class QrCode extends JetView{
	config() {
		let ui = {
			view:'form', id:'form_element_qrcode',
			elements:[
				{view:'label', label:'QR Коды'},
				{height:10},
				{view:'text', name:'count', label: 'Кол-во:', pattern:{ mask:"#####", allow:/[0-9]/g}, labelWidth:100, validate: (v)=>{return v.length ? true : false;}},
				{view:'text', name:'price', label: 'Цена:', pattern:{ mask:"####", allow:/[0-9]/g}, labelWidth:100, validate: (v)=>{return v.length ? true : false;}}
			]
		};
		return ui;
	}
}