import moment from 'moment';
import uuidv4 from 'uuid/v4';
import {query} from '../db';
import {isValidEmail,hashPassword,comparePassword,generateToken} from '../../helpers/helper';
import {Mail} from '../../services/sendmail';
import {verifyEmail} from '../../services/template/verifyEmail';
import jwt from 'jsonwebtoken';
import url from 'url';



/**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
const createUser = async (req, res) => {
	const {email,password,first_name,last_name,phone_number,address,gender} = req.body;
	if (!email || !password) {
		return res.status(400).json({'message': 'Some values are missing'});
	}
	if (!isValidEmail(req.body.email)) {
		return res.status(400).json({ 'message': 'Please enter a valid email address' });
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
		const verify_mail = {
			Subject:'Email Verification',
			Recipient:req.body.email
		};
		let link= process.env.NODE_ENV === 'development'?`http://localhost:3300/api/v1/auth/verify?id=${token}`:
			`${req.protocol}://${req.get('host')}/api/v1/auth/verify?id=${token}`;
		const data = {
			email,
			first_name,
			last_name,
			link
		};
		const send = new Mail(verify_mail,verifyEmail(data));
		send.main();
		
		return res.status(201).json({ status:201,data:{id,token,email,first_name,last_name,phone_number,address,gender,is_verify:rows[0].is_verify,is_admin:req.is_admin === 'False' ? false:true} });
	} catch(error) {
		if (error.routine === '_bt_check_unique') {
			return res.status(409).json({status:409, error: 'User with that EMAIL already exist' });
		}
		if(error.routine === 'varchar'){
			return res.status(422).json({status:422, error: 'Phone Number cannot be more than 13 characters' });
		}
		return res.status(400).json(error);
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
		const { rows } = await query(deleteQuery, [req.user.id]);
		if(!rows[0]) {
			return res.status(404).json({'message': 'user not found'});
		}
		return res.status(204).json({ 'message': 'deleted' });
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
		if((req.protocol+'://'+req.get('host'))==('http://localhost:3300') && rows[0].id){
			await query(updateText, ['True',rows[0].id]);
			return res.status(200).json({status:200,data:{is_verify:rows[0].is_verify}});
		}
		res.status(401).json({status:401,error:'This is a proctected route'});
		
	} catch(error){
		return res.status(400).json(error);
	}
		
	
	
};



export {deleteUser,loginUser,createUser,createAdmin,verifyUserEmail};
