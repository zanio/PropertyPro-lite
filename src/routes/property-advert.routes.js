const express = require('express');
const propertyrouter = express.Router();
import {multerUploads} from '../middlewares/multer';

import {cloudinaryHandler} from '../middlewares/cloudinary';
const propertyadvert = require('../models/property-advert.model');
import {authorization,getId,getPreviousId,idCheck,toDeleteId} from '../middlewares/auth/auth';
import {jwtVerify} from '../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../middlewares/field/inputfield';

//let {dbAdvert} = require('../data/users');

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler, getId,async(req, res)=>{
		const {data} = req;
		propertyadvert.insertPropertyAdvert(data)
			.then(response=>{
				res.status(200).json({status:200,data:response});
			});
  
	});

propertyrouter.patch('/property-advert/:id', idCheck, authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler, getPreviousId,async(req, res)=>{
		const {data} = req;
		const id = req.params.id;	
		propertyadvert.updatePropertyAdvert(id,data)
			.then(response=>{
				res.status(200).json({status:200,data:response});
			}).catch(err=>res.status(404).json({status: 404, err: err.message}));
			
	});

propertyrouter.delete('/property-advert/:id', idCheck, authorization, 
	jwtVerify, toDeleteId,async(req, res)=>{
		const id = req.params.id;	
		propertyadvert.deletePropertyAdvert(id)
			// eslint-disable-next-line no-unused-vars
			.then(response=>{
				res.status(201).json({status:200,data:{message:`advert with the ${id} id has been successfully deleted`}});
			}).catch(err=>res.status(404).json({status: 404, err: err.message}));
			
	});

propertyrouter.get('/property-advert/',async(req, res)=>{
		propertyadvert.getPropertyAdverts()
			.then(response=>{
				res.status(201).json({status:200,data:response});
			}).catch(err=>res.status(404).json({status: 404, err: err.message}));
			
	});



export {propertyrouter};