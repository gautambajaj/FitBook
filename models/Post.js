const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId, 
		ref: 'users'
	},
	recipe: {
		recipeData: {
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
	}
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