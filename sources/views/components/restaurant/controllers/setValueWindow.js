export let setValueWindow = (item)=>{
	console.log(item);
	let id = {id: item.id};
	let soc_link = item.soc_link[0];
	let menu = item.menu[0];
	let time_work = item.timeWork[0];
		for (let key in time_work){
			if(time_work[key] == 'Выходной'){
				time_work[key] = '';
			}
		}

	let param = Object.assign(item, soc_link, menu, time_work, id);
	console.log(param);
	$$('form_restaurant').setValues(param);

	$$('imageShow').define('template', `<img id="imageShow" class="image_table_CLOSE" src="${item.logo}" alt="Фотография" select="false" style="height: 100%; display: block;margin: 0 auto;"/>`);

	let images = item.images.map((i)=>{
		return {img: i};
	});

	$$('dateview_picture').define('data', images);
};