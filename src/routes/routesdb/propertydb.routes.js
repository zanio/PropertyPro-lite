const express = require('express');
const propertyrouter = express.Router();
import {multerUploads} from '../../config/multer';

import {cloudinaryHandler} from '../../config/cloudinary';
import {authorization,idCheck,typeAdvert} from '../../middlewares/auth/auth';
import {jwtVerify} from '../../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../../middlewares/field/inputfield';
import {createProperty,getOneFlaggedProperty,getAllFlaggedProperty,reportProperty,updatePropertyStatus,getTypeProperty,updateProperty,deleteProperty,getOneProperty,getAllProperty,getAllPropertyOfUser} from '../../usingDb/controller/property';


/* create propertyadvert advert  */
propertyrouter.post('/property-advert', authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler, createProperty);


propertyrouter.patch('/property-advert/:id', idCheck, authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler,updateProperty);


propertyrouter.patch('/property-advert/:id/sold', idCheck, authorization, jwtVerify,updatePropertyStatus);


propertyrouter.delete('/property-advert/:id', idCheck, authorization, jwtVerify, deleteProperty);

	
propertyrouter.get('/property-advert', getAllProperty);


propertyrouter.get('/property-advert/user',authorization, jwtVerify, getAllPropertyOfUser);

propertyrouter.post('/property-advert/:id/report',idCheck,authorization, jwtVerify,reportProperty);

propertyrouter.get('/property-advert/search',typeAdvert,getTypeProperty);

propertyrouter.get('/property-advert/:id',idCheck,getOneProperty);

propertyrouter.get('/property-advert/flagged/:id', idCheck, getOneFlaggedProperty);

propertyrouter.get('/flagged', getAllFlaggedProperty);





export {propertyrouter};