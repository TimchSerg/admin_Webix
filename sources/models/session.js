function status(){
	return webix.ajax().post(`${base_url}/threeraza/admin/status`)
		.then(a =>{
			return a.json();
		} );
}

function login(user, pass){
	return webix.ajax().post(`${base_url}/threeraza/admin/login`, {
		user, pass
	}).then(a =>{
		return a.json();
	} );
}

function logout(){
	return webix.ajax().post(`${base_url}/threeraza/admin/logout`)
		.then(a =>{
			return a.json();
		} );
}

export default {
	status, login, logout
}