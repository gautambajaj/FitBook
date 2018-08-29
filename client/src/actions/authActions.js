import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// **** THUNK ALLOWS US TO MAKE ASYNC DISPATCH CALL HERE
// Register user
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data 
			})
		);
};


// login -- get user token
export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData)
		.then(res => {
			const { token } = res.data;
			// save token to localStorage
			localStorage.setItem('jwtToken', token);

			// Set token to Auth header
			setAuthToken(token);

			// Decode token to get user data
			const decoded = jwt_decode(token);

			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
};


// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}


// log-out user
export const logoutUser = () => dispatch => {
	// remove token from localStorage
	localStorage.removeItem('jwtToken');

	// remove auth header for future requests
	setAuthToken(false);

	// set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
} 