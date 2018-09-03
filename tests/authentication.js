const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');


const functions = {
	registerUser: (userData) => 
		axios
		.post('http://localhost:5000/api/users/register', userData)
		.then(res => res.data)
		.catch(err => err.response.data)
	,

	loginUser: (userData) => 
		axios
		.post('http://localhost:5000/api/users/login', userData)
		.then(res => res.data)
		.catch(err => err.response.data)
};


module.exports = functions;