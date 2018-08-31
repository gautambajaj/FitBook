import axios from 'axios';

import { GET_BOOKMARKS, UNBOOKMARK, GET_RECIPES ,GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types';

// get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile')
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})		
		})
};

// create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};



// create URL from filters
const getURL = (filters) => {
    var processedQuery = encodeURIComponent((filters.query).trim());
    var indexRange = "&from=0&to=60";

    if(filters.calorieRange == 'No Preference'){
        var url = "https://api.edamam.com/search?q=" + processedQuery + indexRange + 
                  "&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";    
    } else{
        var processedCalorieRange = encodeURIComponent(filters.calorieRange);
        var url = "https://api.edamam.com/search?q=" + processedQuery + "&calories=" + processedCalorieRange +
                  indexRange + "&app_id=7ecc621e&app_key=406f850ab1d4aecc95b36d94db6f5329";           
    }
	
    return url;  
};


// get filtered recipes from API request
const getRecipes = (data, filters) => {
    var filteredData = data['data']['hits'];
    if(filters.dietLabel != "No Preference"){
        filteredData = data['data']['hits'].filter(hit => {
            return hit['recipe']['dietLabels'].includes(filters.dietLabel);
        });
    }
    data = filteredData;

    var id = 0;

    let recipes = data.map(hit => {
        var yieldQty = hit['recipe']['yield'];
        var caloriesPerServing = Math.trunc((hit['recipe']['calories'] / yieldQty));
        var tagData = hit['recipe']['healthLabels'];
        var tags = ""
        tagData.forEach(function (tag){
            tags = tags + "#" + tag + " ";
        });

        var recipe = {
            id: id,
            label: hit['recipe']['label'],
            image: hit['recipe']['image'],
            tags: tags,
            yields: yieldQty,
            calories: caloriesPerServing ,
            redirect: hit['recipe']['url']
        }
        ++id;
        return recipe;
    });

    return [recipes, filteredData.length, filters];
}


// Recipe-Search 
export const recipeSearch = (filters, history) => dispatch => {
	var URL = getURL(filters);
	console.log(URL);
	dispatch(setProfileLoading());
	
	axios
		.get(URL)
		.then(data => {
			var payload = getRecipes(data, filters);
			dispatch({
				type: GET_RECIPES,
				payload: payload
			})
			history.push('/recipe-search/results');
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		});
};


// Bookmark a recipe 
export const recipeBookmark = (recipe) => dispatch => {
	dispatch({
		type: GET_BOOKMARKS,
		payload: recipe
	});
	axios
		.post('/api/profile/bookmark', recipe)
		.then(res => {

		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		});
};


// UnBookmark a recipe 
export const recipeUnBookmark = (id) => dispatch => {
	dispatch({
		type: UNBOOKMARK,
		payload: id
	});
	var URL = '/api/profile/bookmark/' + id;
	axios
		.delete(URL)
		.then(res => {
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		});
};


// Delete account and profile
export const deleteAccount = () => dispatch => {
	if(window.confirm('Are you sure? This action cannot be undone!')){
		axios
			.delete('/api/profile')
			.then(res => 
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err => 
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}	
}

// profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
};