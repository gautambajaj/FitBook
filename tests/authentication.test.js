const functions = require('./users');

// Testing API calls for user auth

describe('Registration Tests', () => {
	test('register valid user', () => {
		const userData = {
			name: 'testusertemp',
			email: 'testusertemp@test.com',
			password: 'test123',
			password2: 'test123'
		};

		expect.assertions(2);

		return functions.registerUser(userData)
			.then(data => {
				expect(data.name).toEqual('testusertemp');
				expect(data.email).toEqual('testusertemp@test.com');
			});
	});	


	test('register invalid user', () => {
		const userData = {
			name: 'testusertemp',
			email: 'testusertemp@test.com',
			password: 'test123',
			password2: 'test1234'
		};

		expect.assertions(1);

		return functions.registerUser(userData)
			.then(err => {
				expect(err.name).toBeUndefined;
				expect(err.password2).toEqual('Passwords must match');
			});
	});	
});


describe('Login Tests', () => {
	test('login valid user', () => {
		const userData = {
			email: 'testusertemp@test.com',
			password: 'test123',
		};

		expect.assertions(1);

		return functions.loginUser(userData)
			.then(data => {
				expect(data.success).toBe(true);
			});
	});	


	test('login user with invalid email', () => {
		const userData = {
			email: 'fail@test.com',
			password: 'test123'
		};

		expect.assertions(1);

		return functions.loginUser(userData)
			.then(err => {
				expect(err.email).toEqual('User not found');
			});
	});	
});
