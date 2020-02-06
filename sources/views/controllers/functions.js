export const renderPhone = (phone)=>{
		if(phone != ''){
			var res = `+${phone[0]} (${phone.slice(1,4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`
			return res;
		}else {
			return '';
		}
}