const functions = require('./posts');

// Testing API calls for post-feed

describe('Post-feed Tests', () => {
	const newPost = {
		text: 'This is a test post',
		id: 5000
		name: 'testusertemp',
		image: 'test',
		label: 'test',
		tags: 'test',
		yields: 5,
		calories: 500,
		link: 'www.google.com'
	};

	// add and remove test post
	beforeAll(() => return functions.addPost(newPost));
	afterAll(() => return functions.deletePost(newPost.id));


	test('add comment to post', () => {
	    const newComment = {
	      text: 'This is a test comment',
	      name: 'testusertemp',
	      avatar: 'test'
	    };

		expect.assertions(3);

		return functions.addComment(newComment)
			.then(data => {
				expect(data.text).toEqual('testusertemp');
				expect(data.avatar).toEqual('test');
				expect(data.name).toEqual('testusertemp');
			});
	});	


	test('delete comment from post', () => {
		expect.assertions(1);

		return functions.deleteComment(newPost.id)
			.then(data => {
				expect(data.success).toBe(true);
			});
	});	


	test('like post', () => {
		expect.assertions(1);

		return functions.addLike(5000)
			.then(data => {
				expect(data.success).toBe(true);
			});
	});	


	test('unlike post', () => {
		expect.assertions(1);

		return functions.deleteLike(5000)
			.then(data => {
				expect(data.success).toBe(true);
			});
	});	
});
