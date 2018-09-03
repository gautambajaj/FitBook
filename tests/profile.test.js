const functions = require('./profile');
const setAuthToken = require('..client/src/utils/setAuthToken');
const jwt_decode = require('jwt-decode');


// Testing API calls for profile actions

describe('Recipe-widget Tests', () => {
	test('Bookmark a recipe', () => {
    	const newBookmark = {
    		id: 5000
    		image: 'test',
    		label: 'testLabel',
    		tags: 'testTags',
    		yields: 6,
    		calories: 500,
    		link: 'www.google.com'
    	}

		expect.assertions(6);

		return functions.bookmarkRecipe(newBookmark)
			.then(data => {
				expect(data.image).toEqual('test');
				expect(data.calories).toEqual(500);
				expect(data.yields).toEqual(6);				
				expect(data.label).toEqual('testLabel');
				expect(data.tags).toEqual('testTags');
				expect(data.link).toEqual('www.google.com');
				expect(data.id).toEqual(5000);
			});
	});	


	test('unbookmark recipe', () => {
		expect.assertions(1);

		return functions.unBookmarkRecipe(5000)
			.then(data => {
				expect(data.success).toBe(true);
			});
	});	
});


describe('Fetch profile', () => {
	test('Fetch active profile', () => {
		expect.assertions(1);

		return functions.getProfile()
			.then(data => {
				expect(data.user.name).toEqual('testusertemp');
			});
	});	
});
