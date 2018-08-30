const isEmpty = require('./is-empty');

module.exports = function validateBookmarkInput(data) {
	let errors = {};

	return {
		errors,
		isValid: isEmpty(errors)
	}
};