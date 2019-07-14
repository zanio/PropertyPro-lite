import moment from 'moment';
import uuidv4 from 'uuid/v4';
import {query} from '../db';
import {isValidEmail,hashPassword,comparePassword,generateToken,emailToken} from '../helpers/helper';
import {Mail} from '../services/sendmail';
import {resetPass} from '../services/template/resetPassword';
import {verifyEmail} from '../services/template/verifyEmail';
import jwt from 'jsonwebtoken';
import url from 'url';



/**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
const createUser = async (req, res) => {
	let {email,password,first_name,last_name,phone_number,address,gender} = req.body;
	email = email.trim();
	password = password.trim();
	first_name = first_name.trim();
	last_name = last_name.trim();
	phone_number = phone_number.trim();
	address = address.trim();
	gender.trim();
	if (!email && !password && !first_name && !last_name && !phone_number) {
		return res.status(400).json({status:400,error:'Some values are missing'});
	}
	if (!isValidEmail(req.body.email.trim())) {
		return res.status(400).json({status:400, error: 'Please enter a valid email address' });
	}
	const hashPass = await hashPassword(password);

	const createQuery = `INSERT INTO
      users(id, email, password,first_name,last_name,phone_number,address,gender,is_admin,is_verify, created_date,modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12)
	  returning *`;
	// const data = {first_name,last_name,phone_number,address,gender,is_admin:req.is_admin};
	const values = [
		uuidv4(),
		email,
		hashPass,
		first_name,
		last_name,
		phone_number,
		address,
		gender,
		req.is_admin,
		'False',
		moment(new Date()),
		moment(new Date())
	];

	try {
		
		const { rows } = await query(createQuery, values);
		const  id = rows[0].id;
		const token = await generateToken(id);
		// const verify_mail = {
		// 	Subject:'Email Verification',
		// 	Recipient:req.body.email
		// };
		// let link= process.env.NODE_ENV === 'development'?`http://localhost:3300/api/v1/auth/verify?id=${token}`:
		// 	`${'https'}://${req.get('host')}/api/v1/auth/verify?id=${token}`;
		// const data = {
		// 	email,
		// 	first_name,
		// 	last_name,
		// 	link
		// };
		// const send = new Mail(verify_mail,verifyEmail(data));
		// send.main();
		return res.status(201).json({ status:201,data:{id,token,email,first_name,last_name,phone_number,address,gender,is_verify:rows[0].is_verify,is_admin:req.is_admin === 'False' ? false:true} });
	} catch(error) {
		if (error.routine === '_bt_check_unique') {
			return res.status(409).json({status:409, error: 'User with that EMAIL already exist' });
		}
		if(error.routine === 'varchar'){
			return res.status(422).json({status:422, error: 'Phone Number cannot be more than 13 characters' });
		}
		return res.status(400).json({status:400, error: 'Validation error, please make sure you fill in all input correctly' });
	}
};


/**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
const loginUser = async (req, res) => {
	const { email,password } = req.body;
	if (!email || !password) {
		return res.status(422).json({status:422, error: 'Some values are missing'});
	}
	if (!isValidEmail(email)) {
		return res.status(422 ).json({status:422, error: 'Please enter a valid email address' });
	}
	const text = 'SELECT * FROM users WHERE email=$1';
	try {	
		const { rows } = await query(text, [req.body.email]);
		if (!rows[0]) {
			return res.status(403).json({'message': 'The credentials you provided is incorrect'});
		}
		const comparepass = await comparePassword(rows[0].password, password);
		if(!comparepass) {
			return res.status(422).json({status:422, error: 'The credentials you provided is incorrect' });
		}
		const  {id,email,first_name,last_name,phone_number,address,gender,is_admin} = rows[0];
		const token = await generateToken(id);
		return res.status(200).json({status:200,data:{id,token,email,first_name,last_name,phone_number,address,gender,is_admin}  });
	} catch(error) {
		return res.status(400).json(error);
	}
};


/**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */

const deleteUser = async (req, res) =>{
	const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
	try {
		const { rows } = await query(deleteQuery, [req.result.userId]);
		if(!rows[0]) {
			return res.status(404).json({'message': 'user not found'});
		}
		return res.status(204).json({ 'message': 'deleted' });
	} catch(error) {
		return res.status(400).json(error);
	}
};
/**
   * Update A User password
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */

const updatePassword = async (req, res) =>{
	const {old_password,new_password} = req.body;
	const updateQuery = 'UPDATE users SET password = $1 WHERE id=$2 returning *';
	const selectQuery = 'SELECT password FROM users WHERE id=$1';
	const newhash = await hashPassword(new_password);
	
	try {
		const { rows } = await query(selectQuery, [req.result.userId]);
		const comparepass = await comparePassword(rows[0].password, old_password);
		if(!comparepass){
			return res.status(422).json({status:422, error: 'The credentials you provided is incorrect' });
		}

		await query(updateQuery, [newhash,req.result.userId]);
		
		return res.status(200).json({ status:200,data:{message:'Your password has been successfull reset'}});
	} catch(error) {
		return res.status(400).json(error);
	}
};

/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


const createAdmin = async(req, res) => { 
	const {email} = req.body;
	const createQuery = `INSERT INTO admins(
		email,created_date)
	  VALUES($1,$2) returning *`;
	const queryUsers = `SELECT is_admin 
	FROM users where id = $1`;
	const { rows } = await query(queryUsers, [req.result.userId]);
	const values = [
		email,
		moment(new Date())
	];
	
	try {
		if(rows[0].is_admin){
			const reponse = await query(createQuery, values);
			return res.status(201).json({status:201,data:reponse.rows[0]});
		}
		if(!rows[0].is_admin){
			return res.status(402).json({status:402,error:'Only an admin can create new admin'});
		}
	} catch(error) {
		return res.status(400).send(error);
	}
};


const verifyUserEmail = async (req, res) => {
	const id = url.parse(req.url,true).query.id;
	const response = await jwt.verify(id, process.env.SECRET_KEY);
	try{
		const text = 'SELECT is_verify,id FROM users WHERE id=$1';
		const updateText = 'UPDATE users SET is_verify=$1 WHERE id =$2';
		const { rows } = await query(text, [response.userId]);
		const site = process.env.NODE_ENV === 'development'?'http://localhost:3300':'https://propertpro-lite.herokuapp.com';
		if(('https'+'://'+req.get('host'))==(site) && rows[0].id){
			await query(updateText, ['True',rows[0].id]);
			return res.status(200).json({status:200,data:{is_verify:rows[0].is_verify}});
		}
		res.status(401).json({status:401,error:'This is a proctected route'});
		
	} catch(error){
		return res.status(400).json(error);
	}
		
	
	
};


const resetLink = async (req, res) => {
	const email = url.parse(req.url,true).query.email;
	let rand=Math.floor((Math.random() * 100) + 54);
	const verify_mail = {
		Subject:'Password reset link',
		Recipient:email
	};

	try{
		const token = await emailToken(rand);
		let link= process.env.NODE_ENV === 'development'?`http://localhost:3300/api/v1/reset/verify?id=${token}&email=${email}`:
			`${req.protocol}://${req.get('host')}/api/v1/reset/verify?id=${token}&email=${email}`;

		const text = 'SELECT first_name FROM users WHERE email=$1';
		const { rows } = await query(text, [email]);
		const data = {
			email,
			first_name:rows[0].first_name,
			link
		};
	
		const resetmail = new Mail(verify_mail,resetPass(data));
	
		resetmail.main();
		
		return res.status(200).json({status:200,data:{message:'Check your email for a reset link'}});
		
	} catch(error){
		return res.status(400).json(error);
	}
		
	
	
};

const resetPassword = async (req, res) => {
	const url_parts = url.parse(req.url,true).query;
	const response = await jwt.verify(url_parts.id, process.env.SECRET_KEY);
	const {password} = req.body;
	const hashPass = await hashPassword(password);

	try{
		const text = 'SELECT first_name FROM users WHERE email=$1';
		const updateText = 'UPDATE users SET password=$1,modified_date=$2 WHERE email=$3 returning *';
		const { rows } = await query(text, [url_parts.email]);
		const site = process.env.NODE_ENV === 'development'?'http://localhost:3300':'https://propertpro-lite.herokuapp.com';
		if((req.protocol+'://'+req.get('host'))==(site) && response.code){
			await query(updateText, [hashPass,moment(new Date()),url_parts.email]);
			return res.status(200).json({status:200,data:{user:rows[0].first_name,message:'your password has been reset successfully'}});
		}
		res.status(401).json({status:401,error:'This is a proctected route'});
		
	} catch(error){
		return res.status(400).json(error);
	}
			
	
};



export {deleteUser,loginUser,createUser,createAdmin,verifyUserEmail,resetLink,resetPassword,updatePassword};
