export let setValueWindow = (item)=>{

	let soc_link = item.soc_link[0];
	let menu = item.menu[0];
	let time_work = item.timeWork[0];

	let param = Object.assign(item, soc_link, menu, time_work);
	$$('form_restaurant').setValues(param);

	$$('imageShow').define('template', `<img id="imageShow" class="image_table_CLOSE" src="${item.logo}" alt="Фотография" select="false" style="height: 100%; display: block;margin: 0 auto;"/>`);

	let images = item.images.map((i)=>{
		return {img: i};
	});

	$$('dateview_picture').define('data', images);
};