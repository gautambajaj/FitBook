const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');


const functions = {
	getProfile: () => 
		axios
			.get('http://localhost:5000/api/profile')
			.then(res => res.data)
			.catch(err => err.response.data)
	,
	
	bookmarkRecipe: (recipe) => 
		axios
			.post('http://localhost:5000/api/profile/bookmark', recipe)
			.then(res => res.data)
			.catch(err => err.response.data)
	,

	unBookmarkRecipe: (id) =>
		var URL = 'http://localhost:5000/api/profile/bookmark/' + id;

		axios
			.delete(URL)
			.then(res => res.data)
			.catch(err => err.response.data)
};


module.exports = functions;