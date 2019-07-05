const express = require('express');
const propertyrouter = express.Router();
import {multerUploads} from '../middlewares/multer';
import url from 'url';

import {cloudinaryHandler} from '../middlewares/cloudinary';
import {getPropertyAdvert,getPropertyAdverts,updatePropertyAdvert,deletePropertyAdvert,insertPropertyAdvert,getTypeProperty} from '../models/property-advert.model';
import {authorization,getId,getPreviousId,idCheck,toDeleteId,getSingleIdProperty} from '../middlewares/auth/auth';
import {jwtVerify} from '../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../middlewares/field/inputfield';

//let {dbAdvert} = require('../data/users');

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler, getId,(req, res)=>{
		const {data} = req;
		insertPropertyAdvert(data)
			.then(response=>{
				res.status(200).json({status:200,data:response});
			});
  
	});


propertyrouter.patch('/property-advert/:id', idCheck, authorization, 
	jwtVerify,multerUploads,checkPropertyEmpty,checkPropertyField,cloudinaryHandler, getPreviousId,(req, res)=>{
		const {data} = req;
		const id = req.params.id;	
		updatePropertyAdvert(id,data)
			.then(response=>{
				res.status(200).json({status:200,data:response});
			}).catch(err=>res.status(404).json(err));
			
	});


propertyrouter.patch('/property-advert/:id/sold', idCheck, authorization, jwtVerify, getSingleIdProperty,(req, res)=>{	
	const {data} = req;
	const id = req.params.id;	
	updatePropertyAdvert(id,data)
		.then(response=>{
			res.status(200).json({status:200,data:response});
		}).catch(err=>res.status(404).json(err));
			
});


propertyrouter.delete('/property-advert/:id', idCheck, authorization, 
	jwtVerify, toDeleteId,(req, res)=>{
		const id = req.params.id;	
		deletePropertyAdvert(id)
			// eslint-disable-next-line no-unused-vars
			.then(response=>{
				res.status(204).json({status:204,data:{message:`advert with the ${id} id has been successfully deleted`}});
			}).catch(err=>res.status(404).json(err));
			
	});

	
propertyrouter.get('/property-advert',(req, res)=>{
	
	getPropertyAdverts()
		.then(response=>{
			res.status(201).json({status:200,data:response});
		}).catch(err=>res.status(404).json(err));
			
});

propertyrouter.get('/property-advert/search',(req, res)=>{
	const url_parts = url.parse(req.url,true).query;
	getTypeProperty(url_parts.type)
		.then(response=>{
			res.status(201).json({status:200,data:response});
		}).catch(err=>res.status(404).json(err));
		
			
});

propertyrouter.get('/property-advert/:id',(req, res)=>{
	getPropertyAdvert(req.params.id)
		.then(response=>{
			res.status(201).json({status:200,data:response});
		}).catch(err=>res.status(404).json(err));
		
			
});



export {propertyrouter};