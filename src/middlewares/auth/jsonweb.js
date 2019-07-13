/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtVerify = (req, res, next)=>{
	const {token} = req;
	jwt.verify(token, process.env.SECRET_KEY, (err, result)=>{
		if(err){
			
			res.status(401).json({status:401, error:'failed jwt verification'});
		} else{
			req.result = result;
			next();
		}
	});

        
};

export {jwtVerify};
