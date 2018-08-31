import { SHARE_POST, ADD_POST, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	loading: false,
	shareData: null
};


export default function(state=initialState, action){
	switch(action.type){
		case POST_LOADING:
			return{
				...state,
				loading: true
			};
		case GET_POSTS:
			return{
				...state,
				posts: action.payload,
				loading: false	
			};
		case ADD_POST:
			return{
				...state,
				posts: [action.payload, ...state.posts],
				shareData: null
			};
		case DELETE_POST:
			return{
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};
		case GET_POST:
			return{
				...state,
				post: action.payload,
				loading: false
			}
		case SHARE_POST:
			return{
				...state,
				shareData: action.payload
			};
		default:
			return state;
	}
}