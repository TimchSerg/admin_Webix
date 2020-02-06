import moment from 'moment';

moment.locale('ru');

export const renderPhone = (phone)=>{
		if(phone != ''){
			var res = `+${phone[0]} (${phone.slice(1,4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`
			return res;
		}else {
			return '';
		}
}
export const renderDate = (date)=>{
	return moment(new Date(date)).format("Do MMM  YYYY");
}