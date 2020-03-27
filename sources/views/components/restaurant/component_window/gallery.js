export let gallery = {
	id:'gallery',
	rows:[
		{height:15},
		{rows:[
				{cols:[
						{rows:[
							{view:'label', label: 'Логотип заведения'},
							{view:'template', template: '<img src="/files/avetars/default.jpg">'},
							{view: 'button', value: 'Загрузить'}
						]},
						{width: 15},
						{rows:[
							{view:'label', label: 'Социальные сети'},
							{view: 'text', placeholder: 'vkontakte', name: 'vkontakte'},
							{view: 'text', placeholder: 'instagramm', name: 'instagramm'},
							{view: 'text', placeholder: 'facebook', name: 'facebook'},
							{view: 'text', placeholder: 'twitter', name: 'twitter'},
							{view: 'text', placeholder: 'youtube', name: 'youtube'},
							{view: 'text', placeholder: 'telegramm', name: 'telegramm'},
						]}
				]},
				{template:'<hr>', height:1},
				{view:'label', label: 'Галерея изображений для свайпера'},
				{
					view: 'dataview',
					id:'dateview_picture',
					xCount:4,
					height: 240,
					type:{
						height: 60,
					},
					template: '<img src="#img#">',
					data:[]
				},
				{view: 'button', value:'Добавить фотографии'}
		]},
		{height:15},
	]
};