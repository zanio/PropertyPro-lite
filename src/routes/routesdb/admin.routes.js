import express from 'express' ;
const adminrouter = express.Router();
import {authorization,idCheck} from '../../middlewares/auth/auth';
import {jwtVerify} from '../../middlewares/auth/jsonweb';
//import {genderCheck,regCharCheck} from '../../middlewares/field/inputfield';
import {flaggedProperty} from '../../usingDb/controller/property';
import {createAdmin} from '../../usingDb/controller/Users';



/* flag a reported property */
adminrouter.put('/admin/property-advert/:id/flagged', idCheck, authorization, jwtVerify, flaggedProperty);

adminrouter.post('/admin/register',authorization,jwtVerify,createAdmin);



export {adminrouter};