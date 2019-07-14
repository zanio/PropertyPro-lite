import moment from 'moment';
import {query} from '../db';
import {generateId} from '../helpers/helper'



/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


const createProperty = async(req, res) => { 
	const {property_name, status,state,city,property_description, price,contact_person_number, address, proof,note,type} = req.body;
	const createQuery = `INSERT INTO property(id,owner_id,
		 status,state,city,type, price,property_name,property_description,contact_person_number,
		address, proof,note,image_url,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14, $15,$16) returning *`;
	const values = [
		generateId()+'1',
		req.body.token.userId,
		'available',
		state,
		city,
		type,
		price,
		property_name,
		property_description,
		contact_person_number,
		address, 
		proof,
		note,
		req.Image_url,
		moment(new Date()),
		moment(new Date()),
		
	];
	
	try {
		const { rows } = await query(createQuery, values);
		console.log(rows[0])
		return res.status(201).json({status:201,data:{
			id:rows[0].id,owner_id:rows[0].owner_id,status:rows[0].status,state:rows[0].state,
			city:rows[0].city,type:rows[0].type,price:rows[0].price,
			address:rows[0].address,image_url:rows[0].image_url}});
	} catch(error) {
		return res.status(400).json({status:400,error:'error occured during the process'});
	}
};


/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


const reportProperty = async(req, res) => { 
	const {reason,description,experience} = req.body;
	const createQuery = `INSERT INTO report(id,property_id,
		reporter_id,reason,description,experience,created_date)
      VALUES($1, $2, $3, $4, $5, $6,$7) returning *`;
	const values = [
		generateId()+'1',
		req.params.id,
		req.result.userId,
		reason,
		description,
		experience,
		moment(new Date())
	];
	
	try {
		const { rows } = await query(createQuery, values);
		return res.status(201).json({status:201,data:rows[0]});
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


const flaggedProperty = async(req, res) => { 
	const createQuery = `INSERT INTO flagged(id,
		report_id,admin_name,created_date)
	  VALUES($1, $2,$3) returning *`;
	const queryAdmin = `SELECT first_name,last_name,is_admin
	FROM users where id = $1`;
	const { rows } = await query(queryAdmin, [req.result.userId]);
	const values = [
		generateId(1),
		req.params.id,
		rows[0].first_name+' '+rows[0].last_name,
		moment(new Date())
	];
	
	try {
		if(rows[0].is_admin){
			const response = await query(createQuery, values);
			return res.status(201).json({status:201,data:response.rows[0]});
		}
		
		return res.status(422).json({status:422,error:'Only an admin can flag a property'});
		
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


const getOneFlaggedProperty = async(req, res) => { 
	const queryreport = `SELECT id,property_id,reason,description,experience,created_date 
	FROM report where id = $1`;
	const values = [
		req.params.id
	];
	const { rows } = await query(queryreport, values);
	
	try {
		if(rows[0].id){
			return res.status(200).json({status:200,data:rows[0]});
		}
		
		return res.status(404).json({status:404,error:'The id does not match any flagged property'});
		
	} catch(error) {
		return res.status(400).send(error);
	}
};


/**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */


const getAllFlaggedProperty = async(req, res) => { 
	const queryreport = `SELECT * 
	FROM report`;
	const { rows,rowCount } = await query(queryreport);
	
	try {
		if(rows[0]){
			return res.status(200).json({status:200,data:[rows,{rowCount}]});
		}
		
		
	} catch(error) {
		return res.status(400).json(error);
	}
};



/**
   * Get All property
   * @param {object} req 
   * @param {object} res 
   * @returns {object} property array
   */

  
const getAllProperty = async (req, res) => { 
	const findAllQuery = `SELECT id,property_name,property_description,status,state,city,price,
	contact_person_number,contact_person_address,proof,type,created_date,image
	 FROM property`;
	try {
		const { rows, rowCount } = await query(findAllQuery);
		return res.status(200).json({status:200,data:[...rows,{rowCount}] });
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
		return res.status(200).json({status:200,data:[...rows,{rowCount}] });
	} catch(error) {
		return res.status(400).json(error);
	}
};


/**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */

const getOneProperty = async (req, res) => { 
	
	const text = `SELECT id,property_name,status,state,city,price,property_description,
	contact_person_number,contact_person_address,proof,type,created_date,image
	 FROM property WHERE id = $1`;
	try {
		const { rows } = await query(text, [req.params.id]);
		if (!rows[0]) {
			return res.status(404).json({status:404,error:'That id property does not exist or has already been deleted'});
		}
		return res.status(200).json({status:200,data:rows[0] });
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

const getTypeProperty = async (req, res) => { 
	
	const text = `SELECT id,property_name,status,state,city,price,property_description,
	contact_person_number,contact_person_address,proof,type,created_date,image
	 FROM property WHERE type = $1`;
	try {
		const { rows } = await query(text, [req.type]);
		if (!rows[0]) {
			return res.status(404).json({status:404,error:'invalid search query params' });
		}
		return res.status(200).json({status:200,data:rows });
	} catch(error) {
		return res.status(400).send(error);
	}
};
const getAddress = async (req, res) => { 
	
	const text = `SELECT contact_person_address,city,state
	 FROM property WHERE id = $1`;
	try {
		const { rows } = await query(text, [req.params.id]);
		if (!rows[0]) {
			return res.status(404).json({status:404,error:'No advert available with that id' });
		}
		return res.status(200).json({status:200,data:rows[0] });
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
	  SET property_name=$1,status=$2,state=$3,property_description=$4,
	  city=$5,price=$6,contact_person_number=$7,
	  contact_person_address=$8,proof=$9,note=$10,
	  modified_date=$11, image = $12
	  WHERE id=$13 AND owner_id = $14 returning *`;
	try {
		

		const { rows } = await query(findOneQuery, [req.params.id.toString() , req.result.userId]);
		console.log(typeof req.result.userId,typeof req.params.id, rows)
		if(!rows[0].id) {
			return res.status(404).json({status:404,error:'That id property does not exist or has already been deleted'});
		}
		const values = [
			req.body.property_name || rows[0].property_name,
			rows[0].status,
			req.body.state || rows[0].state,
			req.body.property_description || rows[0].property_description,
			req.body.city || rows[0].city,
			req.body.price || rows[0].price,
			req.body.contact_person_number || rows[0].contact_person_number,
			req.body.contact_person_address || rows[0].address,
			req.body.proof || rows[0].proof,
			req.body.note || rows[0].note,
			moment(new Date()),
			req.image_url || rows[0].image_url,
			req.params.id,
			req.result.userId
		];
		const response = await query(updateOneQuery, values);
		return res.status(200).json({status:200,data:response.rows[0]});
	} catch(err) {
		return res.status(400).json({status:400,error:'error occured during the process'});
	}
};


/**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */

const updatePropertyStatus = async (req, res) => { 
	const findOneQuery = 'SELECT * FROM property WHERE id=$1 AND owner_id = $2';
	const updateOneQuery =`UPDATE property SET status=$1
      WHERE id=$2 AND owner_id = $3 returning *`;
	try {
		const { rows } = await query(findOneQuery, [req.params.id, req.result.userId]);
		
		if(!rows[0]) {
			return res.status(404).json({status:404,error:'invalid search query params' });
		}
		const values = [
			req.body.status || rows[0].status,
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
			return res.status(404).json({status:404,error:'That id property does not exist or has already been deleted'});
		}
		return res.status(204).json({status:202, message:`The id ${req.params.id} has been succcessufully deleted` });
	} catch(error) {
		return res.status(400).json(error);
	}
};


export {deleteProperty,reportProperty,getAllProperty,updatePropertyStatus,flaggedProperty,
	getTypeProperty,getOneProperty,updateProperty,createProperty,getAllPropertyOfUser
	,getOneFlaggedProperty,getAllFlaggedProperty,getAddress};
