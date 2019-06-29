/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import {admins} from '../../data/admin';
import {getSubId,newDate,adminDb} from '../../helpers/helper';
import {numRegex} from '../../utils/numRegex';
import {error} from '../../data/error';

const authorization = (req, res, next)=>{
	const header = req.headers['authorization'];
    
	if(typeof header !== 'undefined') {
		const bearer = header.split(' ');
		const token = bearer[1];

		req.token = token;
		next();
	} else {
		res.status(401).json(error.autthorization_401);
	}
};

const mustBeInteger = (req, res, next) => {

	const id = req.params.id;
	if (!Number.isInteger(parseInt(id))) {
		res.status(400).json({ message: 'ID must be an integer' });
	} else {
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
		res.status(403).json(error.uniquevalue_403);
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
				res.status(403).json(error.email_password_403);
			}

		});
	} else{
		res.status(403).json(error.reg_new_403);
		return;
	}
    
    
};


const getId = (req, res, next)=>{
	const {result} = req;
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
		res.status(403).json(error.unauthorized_post_403);
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
		
		res.status(403).json(error.unauthorized_post_403);
	}
};

const getSingleIdProperty = (req, res, next)=>{
	let {dbAdvert} = require('../../data/users.js');
	const {result} = req;
	const owner = {owner:result.id};

	dbAdvert = dbAdvert.find(r=>r.id == req.params.id);
	const {status} = req.body;
	dbAdvert['status'] = status;
	const data = { 
		...dbAdvert
	};
	if(owner && dbAdvert){
		req.data = data;
		next();
	} else{
		res.status(403).json(error.unauthorized_post_403);
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
		res.status(404).json(error.no_advert_delete_404);
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
		res.status(404).json(error.id_number_404);
	}

};

export {mustBeInteger,authorization,getId,isSignUp,uniqueValue,AdminCheck,getPreviousId,idCheck,toDeleteId,getSingleIdProperty};