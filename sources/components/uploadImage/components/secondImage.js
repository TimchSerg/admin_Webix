export let storage_logo;
export let secondImage = (type_id)=>{
	return {
		rows:[
			{view:'button', id:'secondShow', hidden:true, on:{onItemClick: ()=>{
					storage_logo = '';
				}}},
			{view: 'text', id:'urlSecondImage', name:'logo', hidden: true, value: '/files/avatars/default.jpg'},
			{
				view: "template",
				id:'imageShow',
				template: '<img id="imageShow" class="image_table_CLOSE" src="/files/avatars/default.jpg" alt="Фотография" select="false" style="height: 100%; display: block;margin: 0 auto;"/>',
				height: 160,
				width:240,
				css:{ border: "0px solid #fff !important"}
			},
			{
				view: "template",
				template: `<form id="form_second_image" enctype="multipart/form-data" method="post"> <label for="imgInp" class="webixtype_base" style="border: 1px solid silver;border-radius: 2px;text-align: center;padding: 4px;width: 98%;display: inline-block;">Загрузить фото</label><input name="logo" type="file" id="imgInp" hidden/><input name="${type_id}" id="${type_id}" hidden/></form>`,
				on:{
					onAfterRender: ()=>{

						let imageInput = document.getElementById('imgInp');
						imageInput.addEventListener('change', ()=>{
							readURL(imageInput);
						});
					}
				},
				css:{ border: "0px solid #fff !important"},
				height: 40
			},
		]
	};
};

function readURL(input){
	let imageShow = document.getElementById('imageShow');
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			imageShow.setAttribute('src', e.target.result)
			imageShow.setAttribute('select', 'true')
		}
		reader.readAsDataURL(input.files[0]);
		storage_logo = input.files[0];
	}
}


