import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl:process.env.ssl
});


/**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object 
   */
  
const query = (text, params)=>{
	return new Promise((resolve, reject) => {
		pool.query(text, params)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
  
export {query};
