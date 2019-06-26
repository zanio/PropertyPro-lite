/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtsign = (req, res,next)=>{
	const {user} = req;
	const decoded = jwt.verify(user.data.token, process.env.secretKey);
	const valid = decoded.code;
	if(valid){
		const _user = {
			status:200,
			...user
		};

		req._user = _user;
		next();
	} else{
		res.status(403).json({ status:402, error: 'failed authentication' });
	}
    
};


const jwtVerify = (req, res, next)=>{
	const {token} = req;
	jwt.verify(token, process.env.secretKey, (err, result)=>{
		if(err){
			res.status(403).json({
				err,
				data:'This is a protected routes, you have to be logged in'
			});
		} else{
			req.result = result;
			next();
		}
	});

        
};

export {jwtVerify,jwtsign};
