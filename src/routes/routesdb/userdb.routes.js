import express from 'express' ;
const Userrouter = express.Router();
import {AdminCheckDb} from '../../middlewares/auth/auth';
import {createUser,loginUser,verifyUserEmail} from '../../usingDb/controller/Users';
import {genderCheck,regCharCheck} from '../../middlewares/field/inputfield';


/* register a new User */
Userrouter.post('/auth/register', AdminCheckDb,genderCheck,regCharCheck, createUser);

/* Login User */
Userrouter.post('/auth/login',AdminCheckDb,loginUser);

/* my email verification section */
Userrouter.get('/auth/verify',verifyUserEmail);





export {Userrouter};