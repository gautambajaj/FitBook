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
	bio: {
		type: String,
	},
	bookmarks: [
		{
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
				type: String,
				required: true
			},
			calories: {
				type: String,
				required: true		
			},
			link: {
				type: String,
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