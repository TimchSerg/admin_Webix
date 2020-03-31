import {secondImage} from './components/secondImage.js';
import {multiImages} from './components/multiImages.js';

export let uploadImages = (multi, type_id)=>{
	let second = secondImage(type_id);
	let _multi = multiImages(type_id);

	let result;
	switch(multi){
		case 'second':
			result = second;
			break;
		case 'multi':
			result = _multi;
			break;

		default:
			result = second;
			break;
	}

	return result;
};

