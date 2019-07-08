const express = require('express');
const propertyrouter = express.Router();
import {multerUploads} from '../../config/multer';
import url from 'url';

import {cloudinaryHandler} from '../../config/cloudinary';
import {getPropertyAdvert,getPropertyAdverts,updatePropertyAdvert,deletePropertyAdvert,insertPropertyAdvert,getTypeProperty} from '../../usingJSObject/models/property-advert.model';
import {authorization,getPreviousId,idCheck,toDeleteId,getSingleIdProperty} from '../../middlewares/auth/auth';
import {jwtVerify} from '../../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../../middlewares/field/inputfield';
import {createProperty,updateProperty,deleteProperty,getOneProperty,getAllProperty,getAllPropertyOfUser} from '../../usingDb/controller/property';


/* create propertyadvert advert  */
propertyrouter.post('/property-advert', authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler, createProperty);


propertyrouter.patch('/property-advert/:id', idCheck, authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler,updateProperty);


propertyrouter.patch('/property-advert/:id/sold', idCheck, authorization, jwtVerify);


propertyrouter.delete('/property-advert/:id', idCheck, authorization, 
	jwtVerify, deleteProperty);

	
propertyrouter.get('/property-advert',getAllProperty);


propertyrouter.get('/property-advert/user',getAllPropertyOfUser);

propertyrouter.get('/property-advert/search',(req, res)=>{
	const url_parts = url.parse(req.url,true).query;
	getTypeProperty(url_parts.type)
		.then(response=>{
			res.status(201).json({status:200,data:response});
		}).catch(err=>res.status(404).json(err));
		
			
});

propertyrouter.get('/property-advert/:id',getOneProperty);



export {propertyrouter};