const express = require('express');
const propertyrouter = express.Router();
import {multerUploads,multerArrayUploads} from '../config/multer';

import {cloudinaryHandler} from '../config/cloudinary';
import {authorization,idCheck,typeAdvert} from '../middlewares/auth/auth';
import {jwtVerify} from '../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../middlewares/field/inputfield';
import {createProperty,getOneFlaggedProperty,getAddress,updateprice,getAllFlaggedProperty,reportProperty,updatePropertyStatus,getTypeProperty,updateProperty,deleteProperty,getOneProperty,getAllProperty,getAllPropertyOfUser} from '../controller/property';


/* create propertyadvert advert  */
propertyrouter.post('/property',multerUploads, checkPropertyEmpty, authorization, 
	jwtVerify,cloudinaryHandler, createProperty);


propertyrouter.patch('/property/:id', idCheck,updateprice,authorization, 
	jwtVerify,updateProperty);


propertyrouter.patch('/property/:id/sold', idCheck, authorization, jwtVerify,updatePropertyStatus);


propertyrouter.delete('/property/:id', idCheck, authorization, jwtVerify, deleteProperty);

	
propertyrouter.get('/property', getAllProperty);


propertyrouter.get('/property/user', authorization , jwtVerify , getAllPropertyOfUser);

propertyrouter.post('/property/:id/report',idCheck,authorization, jwtVerify,reportProperty);

propertyrouter.get('/property/search',typeAdvert,getTypeProperty);

propertyrouter.get('/property/:id',idCheck,getOneProperty);

propertyrouter.get('/property/flagged/:id', idCheck, getOneFlaggedProperty);

propertyrouter.get('/flagged', getAllFlaggedProperty);

propertyrouter.get('/property/address/:id',idCheck,getAddress);





export {propertyrouter};