import axios from 'axios';

import{
	ADD_POST,
	GET_POSTS,
	GET_ERRORS,
	POST_LOADING,
	DELETE_POST,
	CLEAR_ERRORS,
	GET_POST,
	SHARE_POST
} from './types';


// Add post
export const addPost = postData => dispatch => {
	axios
		.post('/api/posts', postData)
		.then(res => {
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
};


// Share post
export const sharePost = recipe => dispatch => {
	dispatch({
		type: SHARE_POST,
		payload: recipe
	});
};


// Add comment
export const addComment = (postId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
};


// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
};


// Get posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res => {
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		});
};


// Update posts
export const updatePosts = () => dispatch => {
	axios
		.get('/api/posts')
		.then(res => {
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		});
};


// Get post
export const getPost = (id) => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_POST,
				payload: null
			})
		});
};


// add like
export const addLike = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
};


// remove like
export const removeLike = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts()))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
};


// Delete post
export const deletePost = id => dispatch => {
	dispatch({
		type: DELETE_POST,
		payload: id
	})
	axios
		.delete(`/api/posts/${id}`)
		.then(res => {

		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
};


// Set loading state
export const setPostLoading = () => {
	return{
		type: POST_LOADING
	}
}


// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	}
};