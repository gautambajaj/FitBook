import { GET_BOOKMARKS, UNBOOKMARK, GET_RECIPES ,GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';


const initialState = {
	profile: null,
	profiles: null,
	loading: false,
	recipes: null
}


export default function(state = initialState, action){
	switch(action.type){
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			}
		case GET_PROFILE: 
			return {
				...state,
				profile: action.payload,
				loading: false
			}
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
				recipes: null
			}
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				loading: false
			}
		case GET_BOOKMARKS: 
			var newProfile = state.profile;
			var newBookmark = action.payload;
			newProfile.bookmarks.unshift(newBookmark);
			return {
				...state,
				profile: newProfile
			}
		case UNBOOKMARK:
			var newProfile = state.profile;
			console.log(newProfile.bookmarks);
			newProfile.bookmarks = newProfile.bookmarks.filter((bookmark) => {
				return String(bookmark.calories) !== String(action.payload);
			});
			console.log(newProfile.bookmarks);
			return{
				...state,
				profile: newProfile
			}
		default: 
			return state;
	}
}