import moment from 'moment';
import uuidv4 from 'uuid/v4';
import {query} from '../db';
import {isValidEmail,hashPassword,comparePassword,generateToken} from '../../helpers/helper';




class Table {
	constructor(table){
		this.table = table;
	}

	async insert  (req, res,columns) {
		if (!req.body.email || !req.body.password) {
			console.log(req.body);
			return res.status(400).send({'message': 'Some values are missing'});
		}
		if (!isValidEmail(req.body.email)) {
			return res.status(400).send({ 'message': 'Please enter a valid email address' });
		}
		const hashPass = await hashPassword(req.body.password);
	
		const createQuery = `INSERT INTO
		  ${this.table}(${columns})
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
			return res.status(201).send({ token });
		} catch(error) {
			console.log(error);
			if (error.routine === '_bt_check_unique') {
				return res.status(400).send({ 'message': 'User with that EMAIL already exist' });
			}
			return res.status(400).send(error);
		}
	}

	async loginUser  (req, res) {
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({'message': 'Some values are missing'});
		}
		if (!isValidEmail(req.body.email)) {
			return res.status(400).send({ 'message': 'Please enter a valid email address' });
		}
		const text = `SELECT * FROM ${this.table} WHERE email = $1`;
		try {
			const { rows } = await query(text, [req.body.email]);
			console.log(typeof rows,rows);
			if (!rows[0]) {
				return res.status(400).send({'message': 'The credentials you provided is incorrect'});
			}
			const comparepass = await comparePassword(rows[0].password, req.body.password);
			console.log(comparepass);
			if(!comparepass) {
				return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
			}
			const token = await generateToken(rows[0].id);
			return res.status(200).send({ token });
		} catch(error) {
			return res.status(400).send(error);
		}
	}

	async deleteUser (req, res){
		const deleteQuery = `DELETE FROM ${this.table} WHERE id=$1 returning *`;
		try {
			const { rows } = await db.query(deleteQuery, [req.user.id]);
			if(!rows[0]) {
				return res.status(404).send({'message': 'user not found'});
			}
			return res.status(204).send({ 'message': 'deleted' });
		} catch(error) {
			return res.status(400).send(error);
		}
	}
}



export default Table;
