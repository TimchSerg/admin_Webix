let formatWindow = (item)=>{
	let result = {
		view: 'form', id: 'form_comment', borderless:true,
		elements: [
			{view:'text', hidden: true, name: 'id'},
			{cols:[
					{view:'label', label: 'Дата создания:', width: 150},
					{view:'label', label: `${webix.i18n.longDateFormatStr(item.date)} - ${webix.i18n.timeFormatStr(item.date)}`},
				]},
			{cols:[
					{view:'label', label: 'Город:', width: 150},
					{view:'label', label: `${item.city_name}`},
				]},
			{cols:[
					{view:'label', label: 'Заведение:', width: 150},
					{view:'label', label: `${item.restaurant_name}`},
				]},
			{height:15},
			{cols:[
					{view:'label', label: 'Пользователь:', width: 150},
					{view:'label', label: `${item.user_name}`},
				]},
			{view:'textarea', label:'Комментарий', id:'comment_rest', labelPosition:'top', height:200, value:`${item.comment}`},
			{cols:[
					{view:'button', css:"webix_danger", value: 'Отменить', click: ()=>{
							$$("win_custom").close();
						}},
					{view:'button', css:"webix_primary", value: 'Сохранить', click: ()=>{
							let values = {
								id: item.id,
								city_id: item.city[0].id,
								restaurant_id:item.restaurant[0].id,
								user_id:item.user[0].id,
								date: item.date,
								comment:$$('comment_rest').getValue()
							};

							console.log(values);
							updateElement(values);
						}},
				]}
		]
	};
	return result;
};

function updateElement(items){
	let id = items.id;
	delete items.id;
	webix.ajax().headers({
		"Content-type":"application/json"
	}).post(`${base_url}/put/admin/comment/${id}`, JSON.stringify(items)).then(
		res=>{
			let refresh_btn = $$('refresh_btn');
			refresh_btn.callEvent('onItemClick');
			$$("win_custom").close();
		},
		rej=>console.log(rej)
	);
}
export default formatWindow;
