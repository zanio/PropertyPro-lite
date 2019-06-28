
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
			reject({
				message: 'user does not exits',
				status: 404
			});
		}
		resolve(row);
	});
};

const harshPassword = (password)=>{
	const bcrypt = require('bcrypt');
	return new Promise((resolve, reject)=>{
		bcrypt.hash(password, 10,  function(err, hash) {
			// pass = hash
			if(hash) resolve(hash);
			if(err)  reject(err); 
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
			reject({
				status:404,
				err:'That property type do not exist'
			});
		}
		resolve(db);
	});
};


export {getNewId,newDate,mustBeInArray,harshPassword,getSubId,adminDb,typeSearch};