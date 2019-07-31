/* eslint-disable import/prefer-default-export */

import express from 'express';
import { authorization, idCheck } from '../middlewares/auth/auth';
import { jwtVerify } from '../middlewares/auth/jsonweb';
// import {genderCheck,regCharCheck} from '../../middlewares/field/inputfield';
import { flaggedProperty } from '../controller/property';
import { createAdmin } from '../controller/Users';

const adminrouter = express.Router();


/* flag a reported property */
adminrouter.put('/admin/property/:id/flagged', idCheck, authorization, jwtVerify, flaggedProperty);

adminrouter.post('/admin/signup', authorization, jwtVerify, createAdmin);


export { adminrouter };
