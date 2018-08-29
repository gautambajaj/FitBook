const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load profile model
const Profile = require('../../models/Profile');
// load user model
const User = require('../../models/Users');
// load validation
const validateProfileInput = require('../../validation/profile');
const validateBookmarkInput = require('../../validation/bookmark');

// @route GET api/profile
// @desc Get current user's profile
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req,res) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = 'There is no profile for the user';
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
} );


// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get('/all', (req,res) => {
	const errors = {};

	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if(!profiles){
				errors.noprofile = "There are no profiles";
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: "There are no profiles"}));
});


// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', (req,res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});


// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', (req,res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile){
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});


// @route POST api/profile
// @desc create or edit user's profile
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
	// Get fields
	const { errors, isValid } = validateProfileInput(req.body);

	// check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.user = req.user.id;
	if(req.body.handle) profileFields.handle = req.body.handle;	
	if(req.body.location) profileFields.location = req.body.location;	
	if(req.body.bio) profileFields.bio = req.body.bio;		

	// social 
	profileFields.social = {};
	if(req.body.youtube) profileFields.social.youtube = req.body.youtube;	
	if(req.body.twitter) profileFields.social.twitter = req.body.twitter;	
	if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;	
	if(req.body.facebook) profileFields.social.facebook = req.body.facebook;	
	if(req.body.instagram) profileFields.social.instagram = req.body.instagram;	


	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(profile){
				//update
				Profile.findOneAndUpdate(
					{ user: req.user.id }, 
					{ $set: profileFields }, 
					{ new: true}
				)
				.then(profile => res.json(profile));

			} else {
				// create

				// check if handle exists
				Profile.findOne({ handle: profileFields.handle }).then(profile => {
					if(profile){
						errors.handle = "That handle already exists";
						res.status(400).json(errors);
					}
				})

				// save profile
				new Profile(profileFields).save().then(profile => res.json(profile));
			}
		})
});


// @route POST api/profile/bookmark
// @desc Add bookmark to profile
// @access Private
router.post('/bookmark', passport.authenticate('jwt', { session: false}), (req,res) => {
	// Get fields
	const { errors, isValid } = validateBookmarkInput(req.body);

	// check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newBookmark = {
				image: req.body.image,
				label: req.body.label,
				tags: req.body.tags,
				yields: req.body.yields,
				calories: req.body.calories,
				link: req.body.link
			} 

			// Add to bookmark array
			profile.bookmarks.unshift(newBookmark);

			profile.save().then(profile => res.json(profile));
		})
});


// @route Delete api/profile/bookmark/:bkmark_id
// @desc Delete bookmark from profile
// @access Private
router.delete('/bookmark/:bkmark_id', passport.authenticate('jwt', { session: false}), (req,res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			// Get remove index
			const removeIndex = profile.bookmarks
				.map(item => item.id)
				.indexOf(req.params.bkmark_id);

			// splice out of array
			profile.bookmarks.splice(removeIndex, 1);

			// save
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json(err));
});


// @route Delete api/profile/
// @desc Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false}), (req,res) => {
	Profile.findOneAndRemove({ user: req.user.id })
		.then(() => {
			User.findOneAndRemove({ _id: req.user.id })
				.then(() => res.json( {success: true} ))
		}) 
		.catch(err => res.status(404).json(err));
});


module.exports = router;
