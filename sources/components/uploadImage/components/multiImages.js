export let multiImages = (type_id)=>{
	return {
		width: 680,
		rows:[
			{
				view: 'dataview',
				id:'dateview_picture',
				xCount:3,
				height: 240,
				type:{
					height: 125,
					width: 210,
				},
				template: '<div style="height:100%"><img src="#img#" style="height: 100%;width: 100%;" ></div>',
				data:[]
			},
			{
				view: "template",
				template: `<form id="form_multi_image" enctype="multipart/form-data" method="post"> <label for="imgInpMulti" class="webixtype_base" style="border: 1px solid silver;border-radius: 2px;text-align: center;padding: 4px;width: 98%;display: inline-block;">Загрузить фото</label><input name="files[]" type="file" id="imgInpMulti" min="1" max="9999" name="files[]" multiple hidden/><input name="${type_id}" id="${type_id}" hidden/></form>`,
				on:{
					onAfterRender: ()=>{
						let imageInput = document.getElementById('imgInpMulti');
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
	let imageShow = document.getElementById('imageShow_multi');
	let result = [];
	for(var i = 0; i < input.files.length; i++){
		if (input.files && input.files[i]) {
			var reader = new FileReader();
			let file = input.files[i];

			reader.readAsDataURL(file);
			reader.onload = function (e) {

				result.push({img: e.target.result});
				//imageShow.setAttribute('src', e.target.result);
				//imageShow.setAttribute('select', 'true');
				//console.log(result);
				$$('dateview_picture').define('data', result);
			};
			//reader.readAsDataURL(input.files[0]);
		}
	}
}

