// eslint-disable-next-line no-unused-vars
import { Jodit } from 'jodit';
import 'jodit/build/jodit.css';


var editor;

let sub_view = (lists)=>{

	let result = {
		view: "form",
		id: "form_news",
		elements: [
			{view:"text", hidden: true, name: "id"},
			{view:"text", value:"",	label:"Наименование", name:"name", labelWidth:170 },
			{template: '<textarea id="editor_news" name="editor_news"> </textarea>',
				on: {
					onAfterRender:()=>{

						// eslint-disable-next-line no-unused-vars
						editor = new Jodit("#editor_news", {
							"uploader": {
								"insertImageAsBase64URI": true
							},
							"buttons": ",,,underline,italic,|,|,ul,ol,|,,font,fontsize,brush,|,image,table,link,|,align,undo,redo,\n,cut,copy,paste,|,fullsize,print,about"
						});

						editor.s.insertHTML('<h1>Привет Мир</h1>');
					}
				}
			},
			{view:"textarea", value:"",	label:"Описание", name:"description", labelWidth:170, height:100 },
			{cols:[
				{view:"button", css:"webix_danger", value: "Отменить", click: ()=>{
					$$("win_custom").close();
				}},
				{view:"button", css:"webix_primary", value: "Сохранить", click: ()=>{
					let values = $$("form_service").getValues();
					if(values.id == ""){
						delete values.id;
						console.log("add");
					}else {
						console.log("update");
					}
				}},

			]}
		],

	};
	return result;
};

export default sub_view;