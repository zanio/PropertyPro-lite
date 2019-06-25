/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import {getSubId,newDate,} from '../../helpers/helper';


const authorization = (req, res, next)=>{
	const header = req.headers['authorization'];
    
	if(typeof header !== 'undefined') {
		const bearer = header.split(' ');
		const token = bearer[1];

		req.token = token;
		next();
	} else {
		res.status(401).json({
			err:401,
			data:'This is a protected routes, you have to be logged in'
		});
	}
};

const mustBeInteger = (req, res, next) => {

	const id = req.params.id;
	if (!Number.isInteger(parseInt(id))) {
		console.log(Number.isInteger(parseInt(id)));
		res.status(400).json({ message: 'ID must be an integer' });
	} else {
		console.log(Number.isInteger(parseInt(id)));
		next();
	}
};

const uniqueValue = (req, res, next) => {
	const {email} = req.body;
	let {users} = require('../../data/users.js');
	users = users.find(r=>r.email === email);
	console.log(users);
	if (!users){
		next();
	} 
	else{

		console.log('email already in use %s',users.email);
		res.status(403).json({ status:403, error: `${email} already in use` });
	}
   
};



const isSignUp = (req, res, next) => {
	let {users} = require('../../data/users.js');
	const {email,password} = req.body;
	// eslint-disable-next-line no-unused-vars
	let id;
	users = users.find(r=>r.email === email);

	if(users){
		bcrypt.compare(password, users.password, function(err, result) {
			const  checkpassword = result;

			if(checkpassword){
				id = users.id;       
				const singleUser = {
					status:200,
					data:users
				};
				req.user = singleUser;
				next();
			}
			else{
				console.log(email, users, checkpassword);
				res.status(403).json({ status:403, error: 'please check your email or password' });
			}

		});
	} else{
		res.status(403).json({ status:403, error: 'please register a new account, that email is not registered' });
	}
    
    
};


const getId = (req, res, next)=>{
	const {result} = req;
	let {users,dbAdvert} = require('../../data/users.js');
	const owner = {owner:result.payload};
	const date = { createdAt: newDate()}; 
	users = users.find(r=>r.id === owner.owner);
	const { carObj,price } = req;
	const existingUser = users? {
		first_name:users['first_name'],
		last_name:users['last_name'],
		address:users['address'],
	}:null;
	const data = {id:getSubId(dbAdvert), ...owner,
		email:result['user']['data']['email'], 
		...carObj,
		price,
		...date,
		...existingUser
	};
	if(owner){
		req.carData= data;
		next();
	} else{
		res.status(403).json({
			status:403,
			error:'unauthorized posting'
		});
	}
};

export {mustBeInteger,authorization,getId,isSignUp,uniqueValue};