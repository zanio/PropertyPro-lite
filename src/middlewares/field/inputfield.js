//import { newDate,getSubId } from './helper';
import { checkLetter, Arr } from '../../utils/string';
import { numRegex , phoneLength} from '../../utils/numRegex';
import checkFloat from '../../utils/checkfloat';
import {dataUri} from '../multer';
let {users} = require('../../data/users');
//import {stringRegex}  from '../utils/string';
import {harshPassword,getNewId}  from '../../helpers/helper';
import {validateEmail} from '../../utils/email';


import jwt  from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config();

const checkPropertyField = (req, res, next) =>{
	const {image_url,property,float}  = req;
	const boolArray = Arr(property);
	const letterBolean = checkLetter(boolArray);
	const floatBoolean = checkFloat(float.price);
	if(!letterBolean){
		res.status(403).json({status:403,err:'field label except price (number) can only be Alphabet characters'});
	} else if (!floatBoolean){
		res.status(403).json({status:403,err:'price Must be Floating Number, i.e 1700.00'});
	}
	else{
		req.price = parseFloat(float.price);
		req.property = property;
		req.image_url = image_url;
		next();
	}
    
};

const checkFieldsUser = async (req, res, next) => {
	const { first_name,last_name, password, address, email,phone_number,gender } = req.body;
	const {is_Admin} = req;
	const checkAdmin =  is_Admin ? true : false;
	const genderCheck = gender === 'male' || gender === 'female' ? true : false;
	const id = { id: getNewId(users) };
	
	let newPassword;

	if (first_name && last_name && password && address && email && phone_number && gender && genderCheck ) {
		const res = await  harshPassword(password);
		newPassword = res;
		
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
		
		

		
	} else {
		res.status(403).json({status:402 , error: 'Please fill all field correctly' });
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
			res.status(403).json({status:403,err:'empty field'});
		}
	} 
	catch(error){
		res.status(403).json({status:403,err:'please fill all input and upload an image'});
		
	}
	
};

const emailValidation = (req, res, next)=>{
   
	const {email} = req.body;

	if(validateEmail(email) && email){
		next();
	} else{
		res.status(402).json({ status:402, error: 'Invalid email' });
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
		res.status(404).json({status:404 , error: 'first name and last name can only be string with letter characters' });
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
		res.status(404).json({status:404 , error: 'Only numbers are required in phone number and 11 digits' });
		return;
	}
};



export {checkPropertyField,checkFieldsUser,checkPropertyEmpty,emailValidation,regCharCheck,regNumCheck};