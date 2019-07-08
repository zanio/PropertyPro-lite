import moment from 'moment';
import uuidv4 from 'uuid/v4';
import {query} from '../db';


/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


const createProperty = async(req, res) => { 
	const createQuery = `INSERT INTO property(id, success, low_point, take_away,owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
	const values = [
		uuidv4(),
		req.body.success,
		req.body.low_point,
		req.body.take_away,
		req.user.id,
		moment(new Date()),
		moment(new Date())
	];

	try {
		const { rows } = await query(createQuery, values);
		return res.status(201).send(rows[0]);
	} catch(error) {
		return res.status(400).send(error);
	}
};


/**
   * Get All property
   * @param {object} req 
   * @param {object} res 
   * @returns {object} property array
   */

  
const getAllProperty = async (req, res) => { 
	const findAllQuery = 'SELECT * FROM property where owner_id = $1';
	try {
		const { rows, rowCount } = await query(findAllQuery, ['35d3853d-49f4-447b-a241-182ead9ab6db']);
		return res.status(200).send({ rows, rowCount });
	} catch(error) {
		return res.status(400).send(error);
	}
};
	/**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */

const getOneProperty = async (req, res) => { 
	
	const text = 'SELECT * FROM property WHERE id = $1 AND owner_id = $2';
	try {
		const { rows } = await query(text, [req.params.id, req.user.id]);
		if (!rows[0]) {
			return res.status(404).send({'message': 'reflection not found'});
		}
		return res.status(200).send(rows[0]);
	} catch(error) {
		return res.status(400).send(error);
	}
};
	/**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */

const updateProperty = async (req, res) => { 
	const findOneQuery = 'SELECT * FROM property WHERE id=$1 AND owner_id = $2';
	const updateOneQuery =`UPDATE property
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 AND owner_id = $6 returning *`;
	try {
		const { rows } = await query(findOneQuery, [req.params.id, req.user.id]);
		if(!rows[0]) {
			return res.status(404).send({'message': 'reflection not found'});
		}
		const values = [
			req.body.success || rows[0].success,
			req.body.low_point || rows[0].low_point,
			req.body.take_away || rows[0].take_away,
			moment(new Date()),
			req.params.id,
			req.user.id
		];
		const response = await query(updateOneQuery, values);
		return res.status(200).send(response.rows[0]);
	} catch(err) {
		return res.status(400).send(err);
	}
};
/**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
const deleteProperty = async (req, res) => { 
	const deleteQuery = 'DELETE FROM reflections WHERE id=$1 AND owner_id = $2 returning *';
	try {
		const { rows } = await query(deleteQuery, [req.params.id, req.user.id]);
		if(!rows[0]) {
			return res.status(404).send({'message': 'reflection not found'});
		}
		return res.status(204).send({ 'message': 'deleted' });
	} catch(error) {
		return res.status(400).send(error);
	}
};


export {deleteProperty,getAllProperty,getOneProperty,updateProperty,createProperty};
