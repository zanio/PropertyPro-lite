const express = require('express');
const propertyrouter = express.Router();
const propertyadvert = require('../models/property-advert.model');
import {authorization,getId} from '../middlewares/auth/auth';
import {jwtVerify} from '../middlewares/auth/jsonweb';
import {checkPropertyEmpty,checkPropertyField} from '../middlewares/field/inputfield';
//let {dbAdvert} = require('../data/users');

/* create propertyadvert advert  */
propertyrouter.post('/property-advert', authorization, 
	jwtVerify,checkPropertyEmpty,checkPropertyField,getId, async(req, res)=>{
		const {carData} = req;
		propertyadvert.insertcar(carData)
			.then(response=>{
				//console.log(response);
				res.status(200).json({status:200,data:response});
			});
  
	});



module.exports=propertyrouter;