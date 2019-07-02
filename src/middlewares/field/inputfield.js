//import { newDate,getSubId } from './helper';
import { checkLetter, Arr } from '../../utils/string';
import { numRegex , phoneLength} from '../../utils/numRegex';
import checkFloat from '../../utils/checkfloat';
import {dataUri} from '../multer';
let {users} = require('../../data/users');
//import {stringRegex}  from '../utils/string';
import {harshPassword,getNewId}  from '../../helpers/helper';
import {validateEmail} from '../../utils/email';
import {error} from '../../data/error';



import jwt  from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config();

const checkPropertyField = (req, res, next) =>{
	const {image_url,property,float}  = req;
	const boolArray = Arr(property);
	const letterBolean = checkLetter(boolArray);
	const floatBoolean = checkFloat(float.price);
	if(!letterBolean){
		res.status(403).json(error.label_err_403);
	} else if (!floatBoolean){
		res.status(403).json(error.price_403);
	}
	else{
		req.price = parseFloat(float.price);
		req.property = property;
		req.image_url = image_url;
		next();
	}
    
};

const checkFieldsUser =  (req, res, next) => {
	const { first_name,last_name, password, address, email,phone_number,gender } = req.body;
	const {is_Admin} = req;
	const checkAdmin =  is_Admin ? true : false;
	const genderCheck = gender === 'male' || gender === 'female' ? true : false;
	const id = { id: getNewId(users) };
	
	

	if (first_name && last_name && password && address && email && phone_number && gender && genderCheck ) {
		let newPassword = null;
		harshPassword(password).then(result=>{
			if(result) {
				newPassword = result;
				console.log(newPassword);
		
		const namedata = {
			first_name,
			last_name
			
		};
		const newUserNotoken = {
			...namedata,
			email,
			password:newPassword,
			address,
			phone_number,
			gender,
			is_Admin:checkAdmin,
			
		};

		const token = jwt.sign({ code: newPassword,...id, newUserNotoken }, process.env.SECRET_KEY);

		const newUser = {
			token,
			...newUserNotoken
			
		};
		
		
		
		req.newUser = newUser;
		next();
		
		
				
			}
		});
		

		
	} else {
		res.status(402).json(error.all_field_402);
		return;
	}
};

const checkPropertyEmpty = (req, res, next) =>{
	
	try {
		dataUri(req);
		const {property_name, status,price,state,city,type,contact_person_number,contact_person_address,proof,note} = req.body;
		const image = req.file;
		if(status && city && state  && property_name && price && image && type && contact_person_number && contact_person_address ){
			const property = {status,state,type};
			const image_url = {image};
			const float = {price};
			const other_details = {contact_person_number,city,contact_person_address,proof,note,property_name};
			req.property = property;
			req.image_url = image_url;
			req.float = float;
			req.other_details = other_details;
			next();
		} else{
			res.status(403).json(error.empty_field_403);
		}
	} 
	catch(errors){
		res.status(403).json(error.input_image_403);
		
	}
	
};

const emailValidation = (req, res, next)=>{
   
	const {email} = req.body;

	if(validateEmail(email) && email){
		next();
	} else{
		res.status(402).json(error.invalid_email_402);
		return;
	}
};

const regCharCheck = (req, res, next)=>{
	const {newUser} = req;
	const namedata = {
		first_name:newUser.first_name,
		last_name:newUser.last_name	
		
	};
	const boolArray = Arr(namedata);
	const letterBolean = checkLetter(boolArray);
	
	if(letterBolean){
		req.newUser = newUser;
		next();
	} 
	else
	{
		res.status(404).json(error.string_err_403);
		return;
	}
};

const regNumCheck = (req, res, next)=>{
	const {newUser} = req;
	const numInfo = newUser.phone_number;
	const numRex = numRegex(numInfo);
	const lengthNum = phoneLength(numInfo);
	
	if(numRex && lengthNum){
		req.newUser = newUser;
		next();
	} 
	else
	{
		res.status(404).json(error.interger_err_404);
		return;
	}
};



export {checkPropertyField,checkFieldsUser,checkPropertyEmpty,emailValidation,regCharCheck,regNumCheck};