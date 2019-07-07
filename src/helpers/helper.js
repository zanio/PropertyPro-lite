import {error} from '../usingJSObject/data/error';
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

const mustBeInArray = (array, id) =>{
	return new Promise((resolve, reject) => {
		const row = array.find(r => r.id == id);
		if (!row) {
			reject(error.user_404);
		}
		resolve(row);
	});
};

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

const typeSearch = (array, type) =>{
	return new Promise((resolve, reject) => {
		const db = array.filter(r => r.type === type);
		if(!db){
			reject(error.property_404);
		}
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
const generateToken = id => {
	return new Promise((resolve,reject)=>{
		const token = jwt.sign({userId: id },process.env.SECRET_KEY, { expiresIn: '7d' });
		if(token) resolve(token);
		if(!token) reject({err:'could not assign a token'});
	});
    
};




export {getNewId,newDate,mustBeInArray,hashPassword,getSubId,adminDb,typeSearch,isValidEmail,generateToken,comparePassword};