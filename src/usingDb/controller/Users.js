import moment from 'moment';
import uuidv4 from 'uuid/v4';
import {query} from '../db';
import {isValidEmail,hashPassword,comparePassword,generateToken} from '../../helpers/helper';

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
      users(id, email, password,first_name,last_name,phone_number,address,gender,is_admin, created_date,modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)
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
		moment(new Date()),
		moment(new Date())
	];

	try {
		
		const { rows } = await query(createQuery, values);
		const  id = rows[0].id;
		const token = await generateToken(id);
		return res.status(201).json({ status:201,data:{id,token,email,first_name,last_name,phone_number,address,gender} });
	} catch(error) {
		if (error.routine === '_bt_check_unique') {
			return res.status(400).json({ 'message': 'User with that EMAIL already exist' });
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
	console.log(email);
	if (!email || !password) {
		return res.status(400).json({'message': 'Some values are missing'});
	}
	if (!isValidEmail(email)) {
		return res.status(400).json({ 'message': 'Please enter a valid email address' });
	}
	const text = 'SELECT * FROM users WHERE email=$1';
	try {
		
		
		const { rows } = await query(text, [req.body.email]);
		if (!rows[0]) {
			return res.status(400).json({'message': 'The credentials you provided is incorrect'});
		}
		const comparepass = await comparePassword(rows[0].password, password);
		if(!comparepass) {
			return res.status(400).json({ 'message': 'The credentials you provided is incorrect' });
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


export {deleteUser,loginUser,createUser};
