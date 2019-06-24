//import { newDate,getSubId } from './helper';
import { checkLetter, Arr } from '../../utils/string';
import checkFloat from '../../utils/checkfloat';
//import {stringRegex}  from '../utils/string';
import {helper}  from '../../helpers/helper';
import {validateEmail} from '../../utils/email';

import {jwt}  from 'jsonwebtoken';
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
	const { first_name,last_name, password, address, is_admin, email } = req.body;
	const is_Admin = is_admin === '1' ? true : false;
	let newPassword;

	if (first_name && last_name && password && address && email) {
		if(is_Admin){
        
			const res = await  helper.harshPassword(password);
			newPassword = res;
			const token = jwt.sign({ code: newPassword }, process.env.secretKey);
			const newUser = {
				token,
				first_name,
				last_name,
				password:newPassword,
				address,
				is_Admin,
				email
			};
       
			req.newUser = newUser;
			next();
		}
		else {
			res.status(403).json({ status:403, error: 'invalid input type' });
		}

	} else {
		res.status(403).json({status:402 , error: 'Please fill all field' });
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
	}
};



export {checkPropertyField,checkFieldsUser,checkPropertyEmpty,emailValidation};