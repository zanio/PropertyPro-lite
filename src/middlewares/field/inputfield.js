//import { newDate,getSubId } from './helper';
import { checkLetter, Arr } from '../../utils/string';
import { numRegex , phoneLength} from '../../utils/numRegex';
import checkFloat from '../../utils/checkfloat';
//import {stringRegex}  from '../utils/string';
import {harshPassword}  from '../../helpers/helper';
import {validateEmail} from '../../utils/email';

import jwt  from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config();

const checkPropertyField = (req, res, next) =>{
	const {carObj,letterChar,float}  = req;
	const boolArray = Arr(letterChar);
	const letterBolean = checkLetter(boolArray);
	const floatBoolean = checkFloat(float.price);
	if(!letterBolean){
		res.status(403).json({status:403,err:'field label except price (number) can only be Alphabet characters'});
	} else if (!floatBoolean){
		res.status(403).json({status:403,err:'price Must be Floating Number, i.e 1700.00'});
	}
	else{
		req.price = parseFloat(float.price);
		req.carObj = carObj;
		next();
	}
    
};

const checkFieldsUser = async (req, res, next) => {
	const { first_name,last_name, password, address, email,phone_number,gender } = req.body;
	const {is_Admin} = req;
	const checkAdmin =  is_Admin ? true : false;
	
	let newPassword;

	if (first_name && last_name && password && address && email && phone_number && gender) {
		const res = await  harshPassword(password);
		newPassword = res;
		const token = jwt.sign({ code: newPassword }, process.env.secretKey);
		const namedata = {
			first_name,
			last_name
			
		};
		const newUser = {
			token,
			...namedata,
			email,
			password:newPassword,
			address,
			phone_number,
			gender,
			is_Admin:checkAdmin,
			
		};
		
		
		req.newUser = newUser;
		next();
		
		

		
	} else {
		res.status(403).json({status:402 , error: 'Please fill all field' });
		return;
	}
};

const checkPropertyEmpty = (req, res, next) =>{
	const { model,manufacturer,state,price,body_type,color} = req.body;
	if(!model && !manufacturer && !state && !price && !body_type && !color){
		res.status(403).json({status:403,err:'empty field'});
	} else{
		const cars = {model,manufacturer,state,body_type,color};
		const letterChar = {model,manufacturer,state,body_type,color};
		const float = {price};
		req.carObj = cars;
		req.letterChar = letterChar;
		req.float = float;
		next();
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