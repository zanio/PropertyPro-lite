/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {error} from '../../usingJSObject/data/error';

dotenv.config();

const jwtsign = (req, res,next)=>{
	const {user} = req;
	const decoded = jwt.verify(user.token, process.env.SECRET_KEY);
	const valid = decoded.code;
	if(valid){
		next();
	} else{
		res.status(402).json(error.failed_auth_402);
	}
    
};

const jwtVerify = (req, res, next)=>{
	const {token} = req;
	jwt.verify(token, process.env.SECRET_KEY, (err, result)=>{
		if(err){
			
			res.status(401).json(error.autthorization_401);
		} else{
			req.result = result;
			next();
		}
	});

        
};

export {jwtVerify,jwtsign};
