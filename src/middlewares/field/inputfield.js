import { checkLetter, Arr } from '../../utils/string';
import { numRegex , phoneLength} from '../../utils/numRegex';
import checkFloat from '../../utils/checkfloat';
import {dataUri,dataUris} from '../../config/multer';
import {validateEmail} from '../../utils/email';

import dotenv  from 'dotenv';
dotenv.config();

const checkPropertyField = (req, res, next) =>{
	const {image_url,property,float}  = req;
	const boolArray = Arr(property);
	const letterBolean = checkLetter(boolArray);
	const floatBoolean = checkFloat(float.price);
	if(!letterBolean){
		res.status(403).json({status:403,error:'the property information can only contain aphabetic character'});
	} else if (!floatBoolean){
		res.status(403).json({status:403,error:'price value can only be numbers or floating numbers'});
	}
	else{
		req.price = parseFloat(float.price);
		req.property = property;
		req.image_url = image_url;
		next();
	}
    
};



const genderCheck =  (req, res, next) => {
	const { gender } = req.body;
	const genderCheck = gender === 'male' || gender === 'female' ? true : false;
	
	if (genderCheck || !gender) {
		next();
		
	} else {
		res.status(403).json({status:403, error:'gender can only be male or female values'});
		return;
	}
};


const checkPropertyEmpty = (req, res, next) =>{
	
	try {
		//dataUris(req);
		dataUri(req);
		const {property_name, status,price,state,city,type,contact_person_number,contact_person_address,proof,note} = req.body;
		const image = req.file;
		//const image = req.file;
		
		
		if(status && city && state && property_name && price && image && type && contact_person_number && contact_person_address ){
			const property = {status,state,type};
			const image_url = image;
			const float = {price};
			const other_details = {contact_person_number,city,contact_person_address,proof,note,property_name};
			req.property = property;
			req.image_url = image_url;
			req.float = float;
			req.other_details = other_details;
			next();
		} else{
			res.status(403).json({status:403,error:'please fill all filled correctly'});
		}
	} 
	catch(errors){
		res.status(403).json({status:403,error:'please fill all filled correctly and upload an image'});
		
	}
	
};

const emailValidation = (req, res, next)=>{
   
	const {email} = req.body;

	if(validateEmail(email) && email){
		next();
	} else{
		res.status(422).json({status:422,error:'invalid email validation'});
		return;
	}
};

const regCharCheck = (req, res, next)=>{
	const {newUser,first_name,last_name} = req.body;
	const namedata = {
		first_name,
		last_name	
	};
	const boolArray = Arr(namedata);
	const letterBolean = checkLetter(boolArray);
	
	if(letterBolean){
		req.newUser = newUser;
		next();
	} 
	else
	{
		res.status(404).json({status:404,error:'first_name and last_name can only be letter characters'});
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
		res.status(422).json({status:422,error:'phone number can only be digits with at least 11 characters and less than 13 characters'});
		return;
	}
};



export {checkPropertyField,genderCheck,checkPropertyEmpty,emailValidation,regCharCheck,regNumCheck};