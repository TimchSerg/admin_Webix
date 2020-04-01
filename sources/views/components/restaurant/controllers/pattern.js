export function patternTime(code, target){
	//https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format

	let value = target.getValue();

	if(code == 8 || code == 46 || code == 37 || code == 39){
		if(value.length == 4 || value.length == 12){
			value = value.slice(0, -1);
			target.setValue(value);
		}
		if(value.length == 8){
			value = value.slice(0, -3);
			target.setValue(value);
		}
		return true;
	}

	if(value.length == 2 || value.length == 10){
		value = value + ':';
		target.setValue(value);
	}
	if(value.length == 5){
		value = value + ' - ';
		target.setValue(value);
	}
	if(value.length <= 12){
		if(code >= 48 && code<=57){
			return true;
		}
	}

	return false;
}