import express from 'express' ;
const Userrouter = express.Router();
import {authorization,AdminCheckDb} from '../../middlewares/auth/auth';
import {jwtVerify} from '../../middlewares/auth/jsonweb';
import {createUser,loginUser} from '../../usingDb/controller/Users';
import {genderCheck,regCharCheck} from '../../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/auth/register', AdminCheckDb,genderCheck,regCharCheck, createUser);

/* Login User */
Userrouter.post('/auth/login',AdminCheckDb,loginUser);

/* my account section */
Userrouter.get('/auth/my-account/*', authorization, jwtVerify, (req, res)=>{
	const {result} = req;
	res.status(200).json(result);
  
});





export {Userrouter};