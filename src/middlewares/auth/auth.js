/* eslint-disable no-console */
import {bcrypt} from 'bcrypt';


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
	let {user} = require('../data/users.js.js');
	user = user.find(r=>r.email === email);
	console.log(user);
	if (!user){
		next();
	} 
	else{

		console.log('email already in use %s',user.email);
		res.status(403).json({ status:403, error: `${email} already in use` });
	}
   
};



const isSignUp = (req, res, next) => {
	let {user} = require('../data/users.js.js');
	const {email,password} = req.body;
	// eslint-disable-next-line no-unused-vars
	let id;
	user = user.find(r=>r.email === email);

	if(user){
		bcrypt.compare(password, user.password, function(err, result) {
			const  checkpassword = result;

			if(checkpassword){
				id = user.id;       
				const singleUser = {
					status:200,
					data:user
				};
				req.user = singleUser;
				next();
			}
			else{
				console.log(email, user, checkpassword);
				res.status(403).json({ status:403, error: 'please check your email or password' });
			}

		});
	} else{
		res.status(403).json({ status:403, error: 'please register a new account, that email is not registered' });
	}
    
    
};


const getId = (req, res, next)=>{
	const {result} = req;
	let {user,car} = require('../data/users.js.js');
	const owner = {owner:result.payload};
	const date = { createdAt: newDate()}; 
	user = user.find(r=>r.id === owner.owner);
	const { carObj,price } = req;
	const existingUser = user? {
		first_name:user['first_name'],
		last_name:user['last_name'],
		address:user['address'],
	}:null;
	const data = {id:getSubId(car), ...owner,
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