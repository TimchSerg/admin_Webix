export let setValueWindow = (item)=>{

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

	$$('form_restaurant').setValues(param);

	$$('imageShow').define('template', `<img id="imageShow" class="image_table_CLOSE" src="${item.logo}" alt="Фотография" select="false" style="height: 100%; display: block;margin: 0 auto;"/>`);

	let images = item.images.map((i)=>{
		return {img: i};
	});

	$$('dateview_picture').define('data', images);

	console.log(item);
	if(item.geolocation.length){
		let geolocation = item.geolocation[0];
		geolocation.select_metro = JSON.parse(geolocation.list_metro);

		$$('select_metro').clearAll();
		$$('select_metro').parse(geolocation.select_metro);

		$$('geo_lat').setValue(geolocation.lat);
		$$('geo_lng').setValue(geolocation.lng);

		let group = geolocation.group_id;
		webix.storage.local.put('group_id', group);
	}

	//$$('group_id').setValue(group);
};