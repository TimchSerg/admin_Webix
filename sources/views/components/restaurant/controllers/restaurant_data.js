export let formationDataRestaurant = (item)=>{
	let res = {
		id:item.id,
		phone:item.phone,
		phone_owner: item.phone_owner,
		address: item.address,
		category_id: item.category_id,
		city_id: item.city_id,
		description: '',
		metro: '',
		//owner_id: item.owner_id,
		min_price_hook: item.min_price_hook,
		name: item.name,
		other:{
			images:[],
			logo:item.logo,
			menu_other:{
				alcohol: item.alcohol,
				drinks: item.drinks,
				foot: item.foot,
				hookah: [],
				tobacco:[]
			},
			soc_link:{
				vk:item.vk,
				facebook: item.facebook,
				instagram:item.instagram,
				telegram:item.telegram,
				twitter:item.twitter,
				youtube:item.youtube
			},
			time_work:{
				Monday: item.Monday == '' ? 'Выходной' : $$('Monday').getText(),
				Tuesday: item.Tuesday == '' ? 'Выходной' : $$('Tuesday').getText(),
				Wednesday: item.Wednesday == '' ? 'Выходной' : $$('Wednesday').getText(),
				Thursday: item.Thursday == '' ? 'Выходной' : $$('Thursday').getText(),
				Friday: item.Friday == '' ? 'Выходной' : $$('Friday').getText(),
				Saturday: item.Saturday == '' ? 'Выходной' : $$('Saturday').getText(),
				Sunday: item.Sunday == '' ? 'Выходной' : $$('Sunday').getText(),
			}
		}
	};
	return res;
};