/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import {admins} from '../../data/admin';
import {getSubId,newDate,adminDb} from '../../helpers/helper';
import {numRegex} from '../../utils/numRegex';

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
	if (!users){
		next();
	} 
	else{

		console.log('email already in use %s',users.email);
		res.status(403).json({ status:403, error: `${email} already in use` });
		return;
	}
   
};



const isSignUp = (req, res, next) => {
	let {users} = require('../../data/users.js');
	const {email,password} = req.body;
	const {is_Admin} = req;
	const checkAdmin =  is_Admin  ? true :false;
	// eslint-disable-next-line no-unused-vars
	let id;
	users = users.find(r=>r.email === email);
	users ? users.is_Admin = checkAdmin :null;

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
				res.status(403).json({ status:403, error: 'please check your email or password' });
			}

		});
	} else{
		res.status(403).json({ status:403, error: 'please register a new account, that email is not registered' });
		return;
	}
    
    
};


const getId = (req, res, next)=>{
	const {result} = req;
	console.log(result);
	let {users,dbAdvert} = require('../../data/users.js');
	const owner = {owner:result.id};
	const date = { createdAt: newDate()}; 
	users = users.find(r=>r.id === users.id);
	const { property,price,other_details,Image_url } = req;
	const existingUser = users? {
		first_name:users['first_name'],
		last_name:users['last_name'],
		address:users['address'],
	}:null;
	const data = {id:getSubId(dbAdvert), ...owner, 
		...property,
		price,
		...date,
		...other_details,
		Image_url,
		...existingUser
	};
	if(owner){
		req.data = data;
		next();
	} else{
		res.status(403).json({
			status:403,
			error:'unauthorized posting'
		});
	}
};
const getPreviousId = (req, res, next)=>{
	let {dbAdvert} = require('../../data/users.js');
	const {result} = req;
	const owner = {owner:result.id};
	//const date = { Updat: newDate()}; 
	dbAdvert = dbAdvert.find(r=>r.id == req.params.id);
	const { property,price,other_details,Image_url } = req;
	dbAdvert  = dbAdvert? {
		status:dbAdvert['status'] = property.status,
		state:dbAdvert['state'] = property.state,
		type:dbAdvert['type'] = property.type,
		contact_person_number:dbAdvert['contact_person_number'] = other_details.contact_person_number,
		city:dbAdvert['city'] = other_details.city,
		contact_person_address:dbAdvert['contact_person_address'] = other_details.contact_person_address,
		proof:dbAdvert['proof'] = other_details.proof,
		note:dbAdvert['note'] = other_details.note,
		property_name:dbAdvert['property_name'] = other_details.property_name,
		price:dbAdvert['price'] = price,
		Image_url:dbAdvert['Image_url'] = Image_url
		
	}:null;
	const data = { 
		...dbAdvert
	};
	if(owner && dbAdvert){
		req.data = data;
		next();
	} else{
		res.status(403).json({
			status:403,
			error:'unauthorized posting'
		});
	}
};

const toDeleteId = (req, res, next)=>{
	let {dbAdvert} = require('../../data/users.js');
	const {result} = req;
	const owner = {owner:result.id};
	//const date = { Updat: newDate()}; 
	dbAdvert = dbAdvert.find(r=>r.id == req.params.id);
	if(owner && dbAdvert){
		next();
	} else{
		res.status(404).json({
			status:404,
			error:'no advert to delete'
		});
	}
};

const AdminCheck = (req, res, next)=>{
	const {email} = req.body;
	adminDb(admins, email).then(result=>{
		if(result){
			req.is_Admin = result.is_Admin;
			next();
		} else{
			next();
		}
	});
};

const idCheck = (req, res, next)=>{
	const id = req.params.id;
	if(numRegex(id)){
		next();
	} else{
		res.status(404).json({
			status:404,
			error:'Id must be number'
		});
	}

};

export {mustBeInteger,authorization,getId,isSignUp,uniqueValue,AdminCheck,getPreviousId,idCheck,toDeleteId};