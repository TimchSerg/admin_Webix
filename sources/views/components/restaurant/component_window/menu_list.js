export let menu_list = {
	id:'menu_list',
	rows:[
		{height: 15},
		{rows: [
				{view:'label', label: 'Меню заведения'},
				{cols: [
						{rows: [
							{view: 'label', label: 'Кухня'},
							{view: 'radio', name: 'foot', value:'1', options:[
									{value: 'Есть', id: 1},
									{value: 'Нету', id: 2},
							]},
						]},
						{view: 'template', borderless:true, width: 10, template:'<span style="font-size: 14px">|</span>'},
						{rows: [
								{view: 'label', label: 'Напитки'},
								{view: 'radio', name: 'drinks', value:'1', options:[
										{value: 'Есть', id: 1},
										{value: 'Нету', id: 2},
									]},
						]},
				]},{height: 3},
				{rows: [
						{view: 'label', label: 'Алкоголь'},
						{view: 'radio', name: 'alcohol', value:'1', options:[
								{value: 'Есть', id: 1},
								{value: 'Нету', id: 2},
								{value: 'Можно со своим', id: 3},
							]},
					]},
				{height: 7},
				{template:'<hr>', height:1},
				{height: 7},
				{view:'label', label: 'График работы'},
				{cols: [
						{rows: [
								{view:'text', label: 'Пн.', name: 'Monday', id: 'Monday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
								{view:'text', label: 'Вт.', name: 'Tuesday', id: 'Tuesday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
								{view:'text', label: 'Ср.', name: 'Wednesday', id: 'Wednesday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
								{view:'text', label: 'Чт.', name: 'Thursday', id: 'Thursday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
							]},
						{width: 15},
						{rows: [
								{view:'text', label: 'Пт.', name: 'Friday', id: 'Friday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
								{view:'text', label: 'Сб.', name: 'Saturday', id: 'Saturday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
								{view:'text', label: 'Вс.', name: 'Sunday', id: 'Sunday', placeholder:'00:00 - 00:00', pattern:{ mask:"##:## - ##:##", allow:/[0-9]/g}, validate: (v)=>{return true}},
							]},
					]},
		]}
	]
};

function valideTest(e){
	if(e == ''){
		return true;
	}else {
		return /[0-9]/.test(e);
	}
}