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
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({'message': 'Some values are missing'});
	}
	if (!isValidEmail(req.body.email)) {
		return res.status(400).json({ 'message': 'Please enter a valid email address' });
	}
	const hashPass = await hashPassword(req.body.password);

	const createQuery = `INSERT INTO
      users(id, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
	const values = [
		uuidv4(),
		req.body.email,
		hashPass,
		moment(new Date()),
		moment(new Date())
	];

	try {
		const { rows } = await query(createQuery, values);
		const token = await generateToken(rows[0].id);
		return res.status(201).json({ token });
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
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({'message': 'Some values are missing'});
	}
	if (!isValidEmail(req.body.email)) {
		return res.status(400).json({ 'message': 'Please enter a valid email address' });
	}
	const text = 'SELECT * FROM users WHERE email = $1';
	try {
		const { rows } = await query(text, [req.body.email]);
		if (!rows[0]) {
			return res.status(400).json({'message': 'The credentials you provided is incorrect'});
		}
		const comparepass = await comparePassword(rows[0].password, req.body.password);
		if(!comparepass) {
			return res.status(400).json({ 'message': 'The credentials you provided is incorrect' });
		}
		const token = await generateToken(rows[0].id);
		return res.status(200).json({ token });
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
