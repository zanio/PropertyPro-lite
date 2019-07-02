import express from 'express' ;
const Userrouter = express.Router();
const user = require('../models/user.model');
//let {users} = require('../data/users');
import {authorization,uniqueValue,isSignUp,AdminCheck} from '../middlewares/auth/auth';
import {jwtVerify,jwtsign} from '../middlewares/auth/jsonweb';
import {checkFieldsUser,emailValidation,regCharCheck,regNumCheck} from '../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/auth/register', AdminCheck, checkFieldsUser,regCharCheck,regNumCheck,emailValidation,uniqueValue,
	(req, res) => {
		user.insertUser(req.newUser)
			.then(user => res.status(200).json({
				status: 200,
				data: user
			}))
			.catch(err=>res.status(500).json(err));
			
		// eslint-disable-next-line no-console
		//console.log(users);
	});

/* Login User */
Userrouter.post('/auth/login',AdminCheck,emailValidation, isSignUp, jwtsign, (req, res)=>{
	const {_user} = req;
	res.status(200).json(_user);
});

/* my account section */
Userrouter.get('/auth/my-account/*', authorization, jwtVerify, (req, res)=>{
	const {result} = req;
	res.status(200).json(result);
  
});





export {Userrouter};