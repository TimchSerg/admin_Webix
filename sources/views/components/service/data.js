import Menu from './component/Menu';
import TableStocksAdmin from './component/TableStocksAdmin';
import StocksController from "jet-views/components/service/controller/StocksController";

export let config = {
	list_type:[]
};

export default class DataView extends StocksController{
	config(){
		let ui = {
			rows: [
				{rows: [
						{label: 'Список возможных услуг', view: 'label'},
						Menu,
						TableStocksAdmin
					]
				}
			]
		};
		return ui;
	}
	nameToValue(data){
		data.forEach((i)=>{
			i.value = i.name;
		})
		return data;
	}
	init(){
		this.getByUrl('/get/cities').then(
			res=>{
				if(res.length) config.list_cities = this.nameToValue(res);
				console.log(config);
			},
			rej=>console.log(rej)
		);
		this.get('type').then(
			res=>{
				if(res.length) config.list_type = this.nameToValue(res);
				console.log(config);
			},
			rej=>console.log(rej)
		);
	}
}