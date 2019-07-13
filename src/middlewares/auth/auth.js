/* eslint-disable no-console */
import {numRegex} from '../../utils/numRegex';
import {query} from '../../db';
import url from 'url';


const authorization = (req, res, next)=>{
	const header = req.headers['authorization'];
    
	if(typeof header !== 'undefined') {
		const bearer = header;
		const token = bearer;

		req.token = token;
		next();
	} else {
		res.status(401).json({status:402,error:'You are not authorized to access this route'});
	}
};


const AdminCheckDb = async (req, res, next)=>{
	const adminSelectQuery = 'SELECT * FROM admins WHERE email = $1';
	const {email} = req.body;
	const {rows} = await query(adminSelectQuery,[email]);
	if(rows.length !== 0){
		req.is_admin = 'True';
		next();
	} else{
		req.is_admin = 'False';
		next();
	}
	
};

const idCheck = (req, res, next)=>{
	const id = req.params.id;
	if(numRegex(id)){
		next();
	} else{
		res.status(404).json({status:404,error:'that id does not exist in the database'});
	}

};

const typeAdvert = (req, res, next)=>{
	const url_parts = url.parse(req.url,true).query;

	if(url_parts.type){
		req.type = url_parts.type;
		next();
	} else{
		res.status(404).json({status:404,error:'That type of advert does not exist'});
	}

};

export {typeAdvert,AdminCheckDb,authorization,idCheck};