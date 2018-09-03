const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');


const functions = {
	addPost: (postData) => 
		axios
		.post('http://localhost:5000/api/posts', postData)
		.then(res => res.data)
		.catch(err => err.response.data)
	,

	deletePost: (id) => 
		axios
		.delete(`http://localhost:5000/api/posts/${id}`)
		.then(res => res.data)
		.catch(err => err.response.data)
	,

	addComment: (postId, commentData) => 
		axios
		.post(`http://localhost:5000/api/posts/comment/${postId}`, commentData)
		.then(res => res.data)
		.catch(err => err.response.data)
	,

	deleteComment: (postId, commentId) => 
		axios
		.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
		.then(res => res.data)
		.catch(err => err.response.data)
	,

	addLike: (postId) => 
		axios
		.post(`http://localhost:5000/api/posts/like/${postId}`)
		.then(res => res.data)
		.catch(err => err.response.data)
	,

	deleteLike: (postId) => 
		axios
		.post(`http://localhost:5000/api/posts/unlike/${postId}`)
		.then(res => res.data)
		.catch(err => err.response.data)
};


module.exports = functions;