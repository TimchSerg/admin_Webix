import StocksController from "jet-views/components/service/controller/StocksController";
import windowItem from '../component/windowItem';

export default class MenuController extends StocksController{
	add(){
		this.ui(windowItem).showWindow();
		console.log('add');
	}
	update(item){
		console.log(item, 'update');
	}
	refresh(table){
		this.get(table);
	}
	delete(id){
		console.log('delete');
	}
}