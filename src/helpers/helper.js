import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const newDate = () => new Date().toLocaleString();



const hashPassword = (password)=>{
	return new Promise((resolve, reject)=>{
		bcrypt.hash(password, 10,  function(err, hash) {
			resolve(hash);
			reject(err); 
		});   
	});
           
};

const comparePassword = (hashpassword , password)=>{
	return new Promise((resolve, reject)=>{
		bcrypt.compare(password, hashpassword,  function(err, bool) {
			resolve(bool);
			reject(err); 
		});   
	});
           
};


/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */

const isValidEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
};

/**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
const generateToken = (id) => {
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({userId: id },process.env.SECRET_KEY, { expiresIn: '7d' });
		if(token) resolve(token);
		if(!token) reject({err:'could not assign a token, make sure you provide a secret key'});
	});
    
};

const emailToken = (rand) => {
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({code: rand },process.env.SECRET_KEY, { expiresIn: '5m' });
		if(token) resolve(token);
		if(!token) reject({err:'could not assign a token, make sure you provide a secret key'});
	});
    
};

const generateId = ()=>{
	let rand=Math.floor(222+(Math.random() * 10000) + 400);
	return parseInt('222'+rand);
}




export {emailToken,generateId,newDate,hashPassword,isValidEmail,generateToken,comparePassword};