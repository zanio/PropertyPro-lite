import express from 'express' ;
const Userrouter = express.Router();
const user = require('../models/user.model');
let {users} = require('../data/users');
import {authorization,uniqueValue,isSignUp,AdminCheck} from '../middlewares/auth/auth';
import {jwtVerify,jwtsign} from '../middlewares/auth/jsonweb';
import {checkFieldsUser,emailValidation,regCharCheck} from '../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/auth/register', AdminCheck, checkFieldsUser,regCharCheck, emailValidation,uniqueValue,
	async (req, res) => {
		await user.insertUser(req.newUser)
			.then(user => res.status(200).json({
				status: 200,
				data: user
			}))
			.catch(err => res.status(500).json({ message: err.message }));
		// eslint-disable-next-line no-console
		console.log(users);
	});

/* Login User */
Userrouter.post('/auth/login',emailValidation, isSignUp, jwtsign, (req, res)=>{
	const {_user} = req;
	res.status(200).json(_user);
});

/* my account section */
Userrouter.get('/auth/my-account/*', authorization, jwtVerify, async(req, res)=>{
	const {result} = req;
	res.status(200).json(result);
  
});



export {Userrouter};