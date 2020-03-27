export let menu_list = {
	id:'menu_list',
	rows:[
		{height: 15},
		{rows: [
				{view:'label', label: 'Меню заведения'},
				{cols: [
						{rows: [
							{view: 'label', label: 'Кухня'},
							{view: 'radio', name: 'cooke', options:[
									{value: 'Есть', id: 1},
									{value: 'Нету', id: 2},
							]},
						]},
						{view: 'template', borderless:true, width: 10, template:'<span style="font-size: 14px">|</span>'},
						{rows: [
								{view: 'label', label: 'Алкоголь'},
								{view: 'radio', name: 'cooke', options:[
										{value: 'Есть', id: 1},
										{value: 'Нету', id: 2},
										{value: 'Можно со своим', id: 3},
									]},
							]},
				]},
				{height: 7},
				{template:'<hr>', height:1},
				{height: 7},
				{view:'label', label: 'График работы'},
				{cols: [
						{rows: [
								{view:'text', label: 'Пн.'},
								{view:'text', label: 'Вт.'},
								{view:'text', label: 'Ср.'},
								{view:'text', label: 'Чт.'},
							]},
						{width: 15},
						{rows: [
								{view:'text', label: 'Пт.'},
								{view:'text', label: 'Сб.'},
								{view:'text', label: 'Вс.'},
							]},
					]},
		]}
	]
};