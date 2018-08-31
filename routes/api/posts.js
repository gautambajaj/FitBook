const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// Import validation
const validatePostInput = require('../../validation/posts');


// @route GET api/posts
// @desc Get posts 
// @access Public
router.get('/', (req,res) => {
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({error: 'No posts found'}));
});


// @route GET api/posts/:id
// @desc Get posts by id
// @access Public
router.get('/:id', (req,res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({error: 'No post with this id'}));
});


// @route POST api/posts
// @desc Create posts 
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}
	const postRecipe = {
		image: req.body.image,
		label: req.body.label,
		tags: req.body.tags,
		yields: req.body.yields,
		calories: req.body.calories,
		link: req.body.link
	};

	const newPost = new Post({
		text: req.body.text,
		recipe: postRecipe,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then(post => res.json(post));
});


// @route DELETE api/posts/:id
// @desc Delete posts 
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req,res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// check post owner
					if(post.user.toString() !== req.user.id){
						return res.status(401).json({ authFaield: 'User not authorized' });
					}

					// delete post
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err => res.status(404).json({ error: "No post found" }));
		})
});


// @route POST api/posts/like/:id
// @desc Like post 
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false}), (req,res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// check if post is already liked by user
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
						return res.status(400).json({ alreadyLiked: 'Post already liked'});
					}

					// add user id to likes array
					post.likes.unshift({ user: req.user.id });

					// commit to mongoDB
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ error: "No post found" }));
		})
});


// @route POST api/posts/unlike/:id
// @desc unLike post 
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}), (req,res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// check if post is already liked by user
					if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
						return res.status(400).json({ alreadyLiked: 'You have not liked this post'});
					}

					// get remove index
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					// splice out of array
					post.likes.splice(removeIndex, 1);

					// commit to mongoDB
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ error: "No post found" }));
		})
});


// @route POST api/posts/comment/:id
// @desc Add comment to post 
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false}), (req,res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			}
	
			// add comment to array
			post.comments.unshift(newComment);

			// commit to db
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopost: "No post found"}));
});


// @route DELETE api/posts/comment/:id/:comment_id 
// @desc Delete comment from post 
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}), (req,res) => {
	Post.findById(req.params.id)
		.then(post => {
			// check if comment exists
			if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
				return res.status(404).json({ nocomment: "No such comment exists"});
			}

			// get remove index
			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(req.params.comment_id);

			// splice comment out of array
			post.comments.splice(removeIndex, 1);

			// commit to db
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopost: "No post found"}));
});

module.exports = router;
