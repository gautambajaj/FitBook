const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	bio: {
		type: String,
	},
	recipes: [
		recipe: {
			image: {
				type: String,
				required: true
			},
			label: {
				type: String,
				required: true
			},
			tags: {
				type: String,
				required: true
			},
			yields: {
				type: string,
				required: true
			},
			calories: {
				type: string,
				required: true		
			},
			link: {
				type: string,
				required: true		
			}			
		}
	],
	social: {
		youtube: {
			type: String
		}, 
		twitter: {
			type: String
		}, 
		facebook: {
			type: String
		}, 
		linkedin: {
			type: String
		}, 
		instagram: {
			type: String
		}, 
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);