import moment from 'moment';
import {query} from '../db';
import uuidv4 from 'uuid/v4';



/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


const createProperty = async(req, res) => { 
	const {property_name, status,state,city, price,contact_person_number,contact_person_address, proof,note,} = req.body;
	const createQuery = `INSERT INTO property(owner_id,
		property_name, status,state,city, price,contact_person_number,
		contact_person_address, proof,note, created_date, modified_date,image)
      VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13) returning *`;
	const values = [
		req.result.userId,
		property_name,
		status,
		state,
		city,
		price,
		contact_person_number,
		contact_person_address, 
		proof,
		note,
		moment(new Date()),
		moment(new Date()),
		req.Image_url,
	];
	
	try {
		const { rows } = await query(createQuery, values);
		return res.status(201).json({status:201,data:rows[0]});
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
	const findAllQuery = 'SELECT * FROM property';
	try {
		const { rows, rowCount } = await query(findAllQuery);
		return res.status(200).send({ rows, rowCount });
	} catch(error) {
		return res.status(400).send(error);
	}
};

/**
   * Get All user property
   * @param {object} req 
   * @param {object} res 
   * @returns {object} property array
   */

  
const getAllPropertyOfUser = async (req, res) => { 
	const findAllQuery = 'SELECT * FROM property WHERE owner_id = $1';
	try {
		const { rows, rowCount } = await query(findAllQuery,[req.result.userId]);
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
		const { rows } = await query(text, [req.params.id, req.result.userId]);
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
	  SET property_name=$1,status=$2,state=$3,
	  city=$4,price=$5,contact_person_number=$6,
	  contact_person_address=$7,proof=$8,note=$9,
	  modified_date=$10, image = $11
      WHERE id=$12 AND owner_id = $13 returning *`;
	try {
		const { rows } = await query(findOneQuery, [req.params.id, req.result.userId]);
		
		if(!rows[0]) {
			return res.status(404).send({'message': 'reflection not found'});
		}
		const values = [
			req.body.property_name || rows[0].property_name,
			req.body.status || rows[0].status,
			req.body.state || rows[0].state,
			req.body.city || rows[0].city,
			req.body.price || rows[0].price,
			req.body.contact_person_number || rows[0].contact_person_number,
			req.body.contact_person_address || rows[0].contact_person_address,
			req.body.proof || rows[0].proof,
			req.body.note || rows[0].note,
			moment(new Date()),
			req.Image_url || rows[0].image,
			req.params.id,
			req.result.userId
		];
		const response = await query(updateOneQuery, values);
		return res.status(200).json({status:200,data:response.rows[0]});
	} catch(err) {
		return res.status(400).json(err);
	}
};
/**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
const deleteProperty = async (req, res) => { 
	const deleteQuery = 'DELETE FROM property WHERE id=$1 AND owner_id = $2 returning *';
	try {
		const { rows } = await query(deleteQuery, [req.params.id, req.result.userId]);
		if(!rows[0]) {
			return res.status(404).json({status:404,error:'that id property does not exist or has already been deleted'});
		}
		return res.status(204).json({status:202, message:`The id ${req.params.id} has been succcessufully deleted` });
	} catch(error) {
		return res.status(400).send(error);
	}
};


export {deleteProperty,getAllProperty,getOneProperty,updateProperty,createProperty,getAllPropertyOfUser};
