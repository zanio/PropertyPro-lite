const express = require('express') ;
const Userrouter = express.Router();
const user = require('../models/user.model');
import {authorization,uniqueValue,isSignUp} from '../middlewares/auth/auth';
import {jwtVerify,jwtsign} from '../middlewares/auth/jsonweb';
import {checkFieldsUser,emailValidation} from '../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/register', checkFieldsUser,emailValidation,uniqueValue,
	async (req, res) => {
		await user.insertUser(req.newUser)
			.then(user => res.status(200).json({
				status: 200,
				data: user
			}))
			.catch(err => res.status(500).json({ message: err.message }));
	});

/* Login User */
Userrouter.post('/login',emailValidation, isSignUp, jwtsign, (req, res)=>{
	const {_user} = req;
	res.status(200).json(_user);
});

/* my account section */
Userrouter.get('/my-account/*', authorization, jwtVerify, async(req, res)=>{
	const {result} = req;
	res.status(200).json(result);
  
});



module.exports = Userrouter;