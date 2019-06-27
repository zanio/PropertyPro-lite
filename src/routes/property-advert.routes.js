const express = require('express');
const propertyrouter = express.Router();
import {multerUploads} from '../middlewares/multer';
import {cloudinaryHandler} from '../middlewares/cloudinary';
const propertyadvert = require('../models/property-advert.model');
import {authorization,getId} from '../middlewares/auth/auth';
import {jwtVerify} from '../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../middlewares/field/inputfield';

//let {dbAdvert} = require('../data/users');

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,getId,cloudinaryHandler, async(req, res)=>{
		const {data} = req;
		propertyadvert.insertPropertyAdvert(data)
			.then(response=>{
				res.status(200).json({status:200,data:response});
			});
  
	});



export {propertyrouter};