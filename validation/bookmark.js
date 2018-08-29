const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookmarkInput(data) {
	let errors = {};
	data.image = !isEmpty(data.image) ? data.image : "";
	data.label = !isEmpty(data.label) ? data.label : "";
	data.tags = !isEmpty(data.tags) ? data.tags : "";
	data.yields = !isEmpty(data.yields) ? data.yields : "";
	data.calories = !isEmpty(data.calories) ? data.calories : "";
	data.link = !isEmpty(data.link) ? data.link : "";

	if(Validator.isEmpty(data.image)){
		errors.image = 'image field field is required';
	}

	if(Validator.isEmpty(data.label)){
		errors.label = 'label field field is required';
	}

	if(Validator.isEmpty(data.tags)){
		errors.tags = 'tags field is required';
	}

	if(Validator.isEmpty(data.yields)){
		errors.yields = 'yields field is required';
	}

	if(Validator.isEmpty(data.calories)){
		errors.calories = 'calories field is required';
	}

	if(Validator.isEmpty(data.link)){
		errors.link = 'link field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
};