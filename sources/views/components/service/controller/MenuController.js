import StocksController from "jet-views/components/service/controller/StocksController";
import windowItem from '../component/windowItem';

export default class MenuController extends StocksController{
	add(){
		this.ui(windowItem).showWindow();
		console.log('add');
	}
	update(item){
		console.log(item, 'update');
		this.ui(windowItem).showWindow();

		this.setValuesItem(item);
	}
	refresh(table){
		this.get(table).then(
			res=> {
				console.log(res);

				$$('table_stocks').clearAll();
				$$('table_stocks').parse(res);
			},
			rej=>console.log(rej)
		);
	}
	deleteItem(id, table){
		webix.confirm({
			ok: "Да", cancel: "Нет",
			type: "confirm-error",  width: "400px",
			title: "Удалить элемент ?", text: name,
			callback: (result)=>{
				if(result){
					this.delete(id, table).then(
						res=>this.refresh(table),
						rej=>console.log('error', rej)
					);
				}
			}
		});

	}
	setValuesItem(item){
		$$('form_element').setValues(item);
		item.parameters = JSON.parse(item.parameters);

		let array_name_form = ['form_element_position', 'form_element_qrcode', 'form_element_marketing'];
		setTimeout(()=>{
			switch (item.type_id) {
				case '1':
					$$(array_name_form[0]).setValues(item.parameters);
					break;
				case '2':
					$$(array_name_form[1]).setValues(item.parameters);
					break;
				case '3':
					$$(array_name_form[2]).setValues(item.parameters);
					break;
				default:
					console.log(item.type_id, 'default');
				//alert( "Нет таких значений" );
			}
		},500);

	}
}