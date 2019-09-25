/* eslint-disable import/prefer-default-export */

import { cpUpload } from '../config/multer';

import { cloudinaryHandler } from '../config/cloudinary';
import {
 authorization, idCheck, typeAdvert, itemCountCheck,
} from '../middlewares/auth/auth';
import { jwtVerify } from '../middlewares/auth/jsonweb';
import { checkPropertyEmpty, updateprice, regNumCheck } from '../middlewares/field/inputfield';
import {
	createProperty, getOneFlaggedProperty, getAddress, getPageProperty,
	getAllFlaggedProperty, reportProperty, updatePropertyStatus, getTypeProperty,
	updateProperty, deleteProperty, getOneProperty, getAllProperty, getAllPropertyOfUser,
} from '../controller/property';

const express = require('express');

const propertyrouter = express.Router();


/* create propertyadvert advert  */
propertyrouter.post('/property', cpUpload, checkPropertyEmpty, regNumCheck, authorization,
	jwtVerify, cloudinaryHandler, createProperty);

propertyrouter.patch('/property/:id', cpUpload, idCheck, updateprice, authorization,
	jwtVerify, cloudinaryHandler, updateProperty);

propertyrouter.patch('/property/:id/sold', idCheck, authorization, jwtVerify, updatePropertyStatus);

propertyrouter.delete('/property/:id', idCheck, authorization, jwtVerify, deleteProperty);

propertyrouter.get('/property', getAllProperty);

propertyrouter.get('/property/user', authorization, jwtVerify, getAllPropertyOfUser);

propertyrouter.post('/property/:id/report', idCheck, authorization, jwtVerify, reportProperty);

propertyrouter.get('/property/search', typeAdvert, getTypeProperty);

propertyrouter.get('/property/:id', idCheck, getOneProperty);

propertyrouter.get('/property/:id/items', idCheck, itemCountCheck, getPageProperty);

propertyrouter.get('/property/flagged/:id', idCheck, getOneFlaggedProperty);

propertyrouter.get('/flagged', getAllFlaggedProperty);

propertyrouter.get('/property/address/:id', idCheck, getAddress);


export { propertyrouter };
