import express from 'express' ;
const adminrouter = express.Router();
import {authorization,idCheck} from '../middlewares/auth/auth';
import {jwtVerify} from '../middlewares/auth/jsonweb';
//import {genderCheck,regCharCheck} from '../../middlewares/field/inputfield';
import {flaggedProperty} from '../controller/property';
import {createAdmin} from '../controller/Users';



/* flag a reported property */
adminrouter.put('/admin/property/:id/flagged', idCheck, authorization, jwtVerify, flaggedProperty);

adminrouter.post('/admin/signup',authorization,jwtVerify,createAdmin);



export {adminrouter};