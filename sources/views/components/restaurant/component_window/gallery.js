import {uploadImages} from "../../../../components/uploadImage/uploadImages";

let uploadCustom = uploadImages('second', 'driver_id');
let uploadCustomMulti = uploadImages('multi', 'driver_id');

export let gallery = {
	id:'gallery',
	rows:[
		{height:15},
		{rows:[
				{cols:[
						{rows:[
							{view: 'label', label: 'Логотип заведения'},
							uploadCustom
						]},
						{width: 15},
						{rows:[
							{view:'label', label: 'Социальные сети'},
							{view: 'text', placeholder: 'vkontakte', name: 'vk'},
							{view: 'text', placeholder: 'instagram', name: 'instagram'},
							{view: 'text', placeholder: 'facebook', name: 'facebook'},
							{view: 'text', placeholder: 'twitter', name: 'twitter'},
							{view: 'text', placeholder: 'youtube', name: 'youtube'},
							{view: 'text', placeholder: 'telegram', name: 'telegram'},
						]}
				]},
				{template:'<hr>', height:1},
				{view:'label', label: 'Галерея изображений для свайпера'},
				uploadCustomMulti
		]},
		{template:'<hr>', height:1},
		{height:15},
	]
};