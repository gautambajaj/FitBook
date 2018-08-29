const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load user model
const User = require('../../models/Users');


// @route GET api/users/register
// @desc Register User
// @access Public
router.post('/register', (req,res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			if(user){
				errors.email = 'Email already exists'
				return res.status(400).json(errors);
			} else{
				const avatar = gravatar.url(req.body.email, {
					s: '200', // size
					r: 'pg',  // rating
					d: 'mm'	  // default
				})
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar: avatar,
					password: req.body.password
				});

				bcrypt.genSalt(10, (err, salt) =>{
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password= hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					});
				});
			}
		});
});

// @route GET api/users/login
// @desc Login User / returning token 
// @access Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({email})
		.then(user => {
			// check if user exists
 			if(!user){
 				errors.email = 'User not found';
 				return res.status(404).json(errors);
 			}

 			// verify password
 			bcrypt.compare(password, user.password)
 				.then(isMatch => {
 					if(isMatch){
 						const userInfo = { id: user.id, name: user.name, avatar: user.avatar};

 						// sign token
 						jwt.sign(
 							userInfo, 
 							keys.secretKey, 
 							{ expiresIn: 3600 }, 
 							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								})
 							}
 						);
 					} else{
 						errors.password = 'Password incorrect';
 						return res.status(400).json(errors);
 					}
 				})
		})
});	


// @route GET api/users/current
// @desc Return current User
// @access Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});


module.exports = router;
