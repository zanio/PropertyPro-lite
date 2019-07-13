import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getNewId = (array) => {
   
	if (array.length > 0) {
		let n;
		let idValue = array[array.length - 1].id; 
		n = idValue+1;
		return n;
        
	} else {
		return 234013005001;
	}
    
};

const getSubId = (array) => {
   
	if (array.length > 0) {
		let n;
		let idValue = array[array.length - 1].id; 
		n = idValue+1;
		return n;
        
	} else {
		return 43501;
	}
    
};
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


const adminDb = (array, email) =>{
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		const db = array.find(r => r.email === email);
		resolve(db);
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
		if(!token) reject({err:'could not assign a token'});
	});
    
};

const emailToken = (rand) => {
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({code: rand },process.env.SECRET_KEY, { expiresIn: '5m' });
		if(token) resolve(token);
		if(!token) reject({err:'could not assign a token'});
	});
    
};

const generateId = ()=>{
	let rand=Math.floor((Math.random() * 1000) + 400);
	console.log(rand,rand+1000)
	return rand+1000;
}




export {getNewId,emailToken,generateId,newDate,hashPassword,getSubId,adminDb,isValidEmail,generateToken,comparePassword};