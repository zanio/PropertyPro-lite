import express from 'express' ;
const Userrouter = express.Router();
const user = require('../models/user.model');
import {authorization,uniqueValue,isSignUp,AdminCheck} from '../middlewares/auth/auth';
import {jwtVerify,jwtsign} from '../middlewares/auth/jsonweb';
import {checkFieldsUser,emailValidation,regCharCheck,regNumCheck,genderCheck} from '../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/auth/register', AdminCheck, checkFieldsUser,regCharCheck,regNumCheck,emailValidation,uniqueValue,genderCheck,
	(req, res) => {
		user.insertUser(req.newUser)
			.then(({id,createdAt,token,first_name,last_name,email,address,phone_number,gender,is_Admin}) => res.status(200).json({
				status: 201,
				data: {id,createdAt,token,first_name,last_name,email,address,phone_number,gender,is_Admin}
			}))
			.catch(err=>res.status(500).json(err));
			
		// eslint-disable-next-line no-console
		//console.log(users);
	});

/* Login User */
Userrouter.post('/auth/login',AdminCheck,emailValidation, isSignUp, jwtsign, (req, res)=>{
	const {id,createdAt,token,first_name,last_name,email,address,phone_number,gender,is_Admin} = req.user;
	res.status(200).json({
		status:200,
		data:{id,createdAt,token,first_name,last_name,email,address,phone_number,gender,is_Admin}
	});
});

/* my account section */
Userrouter.get('/auth/my-account/*', authorization, jwtVerify, (req, res)=>{
	const {result} = req;
	res.status(200).json(result);
  
});





export {Userrouter};