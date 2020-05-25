export let formationDataRestaurant = (item)=>{
	console.log(item);
	let res = {
		id:item.id,
		phone:item.phone,
		rating:item.rating / 10,
		phone_owner: item.phone_owner,
		address: item.address,
		category_id: item.category_id,
		city_id: item.city_id,
		description: '',
		metro: JSON.stringify(item.select_metro),
		owner_id: item.owner_id,
		min_price_hook: item.min_price_hook,
		name: item.name,
		other:{
			geolocation:{
				lat:item.lat == '' ? 0 : Number(item.lat),
				lng:item.lng == '' ? 0 : Number(item.lng),
				group_id:Number(item.group_id),
				list_metro: item.select_metro,
			},
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
				Monday: item.Monday == '' ? 'Выходной' : item.Monday,
				Tuesday: item.Tuesday == '' ? 'Выходной' : item.Tuesday,
				Wednesday: item.Wednesday == '' ? 'Выходной' : item.Wednesday,
				Thursday: item.Thursday == '' ? 'Выходной' : item.Thursday,
				Friday: item.Friday == '' ? 'Выходной' : item.Friday,
				Saturday: item.Saturday == '' ? 'Выходной' : item.Saturday,
				Sunday: item.Sunday == '' ? 'Выходной' : item.Sunday,
			}
		}
	};
	return res;
};