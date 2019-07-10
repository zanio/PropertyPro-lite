import express from 'express' ;
const Userrouter = express.Router();
import {AdminCheckDb,authorization} from '../../middlewares/auth/auth';
import {jwtVerify} from '../../middlewares/auth/jsonweb';
import {createUser,loginUser,verifyUserEmail,resetLink,resetPassword,updatePassword} from '../../usingDb/controller/Users';
import {genderCheck,regCharCheck} from '../../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/auth/register', AdminCheckDb,genderCheck,regCharCheck, createUser);

/* Login User */
Userrouter.post('/auth/login',AdminCheckDb,loginUser);

/* my email verification section */
Userrouter.get('/auth/verify',verifyUserEmail);

/* send reset password link to email */
Userrouter.get('/reset/',resetLink);

/* verify reset password link from email  */
Userrouter.patch('/reset/verify',resetPassword);

/* reset password if user remembers old password  */
Userrouter.patch('/reset/update',authorization,jwtVerify,updatePassword);


export {Userrouter};