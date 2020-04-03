function windowDevice(sub, label = 'Настройки элемента'){
	if(typeof sub != "object"){
		sub = {template: 'Произошла ошибка!'};
	}
	let winwdow = {
		view: 'window',
		id: 'win_custom',
		move: false,
		resize: true,
		position: 'center',
		left: 0, top: 45,
		fullscreen: false,
		modal: true,
		width: 800,
		minHeight: 600,
		head: {
			view: "toolbar", cols: [
				{view: "label", id: 'WindowRender_label', label: label},
				{
					view: "icon", icon: "mdi mdi-close", click: ()=>{$$("win_custom").close();}
				},
			],
		},
		body: {
			rows: [
				{height: 5},
				{cols: [
						{width: 15},
						sub,
						{width: 15},
					]},
				{height: 10},
			]
		}
	};
	return webix.ui(winwdow).show();
};

export default windowDevice;
