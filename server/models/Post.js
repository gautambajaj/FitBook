const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId, 
		ref: 'users'
	},
	text: {
		type: String,
		required: true
	},
	recipe: {
		image: {
			type: String
		},
		label: {
			type: String
		},
		tags: {
			type: String
		},
		yields: {
			type: String
		},
		calories: {
			type: String
		},
		link: {
			type: String
		}
	},
	name: {
		type: String
	}, 
	avatar: {
		type: String
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId, 
				ref: 'users'			
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId, 
				ref: 'users'			
			},
			text: {
				type: String,
				required: true
			},	
			name: {
				type: String
			}, 
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', PostSchema);