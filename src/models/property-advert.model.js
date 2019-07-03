/* eslint-disable no-unused-vars */
const dbPath = require('./dbPath');

let {dbAdvert} = require('../data/users');
import {getSubId,mustBeInArray,newDate,typeSearch} from '../helpers/helper';
import {error} from '../data/error';


const getPropertyAdverts = () => {
	return new Promise((resolve, reject) => {
		if (dbAdvert.length === 0) {
			reject(error.no_ads_err_404);
		}
		resolve(dbAdvert);
	});
};

const getPropertyAdvert = id => {
	return new Promise((resolve, reject) => {
		mustBeInArray(dbAdvert, id)
			.then(dbAdvert => resolve(dbAdvert))
			.catch(err => reject(error.no_ads_err_404));
	});
};

const getTypeProperty = q => {
	return new Promise((resolve, reject) => {
		typeSearch(dbAdvert, q)
			.then(dbAdvert => resolve(dbAdvert))
			.catch(err => reject(err));
	});
};

const insertPropertyAdvert = newcar => {
	return new Promise((resolve, reject) => {
		const id = {id:getSubId(dbAdvert)};
		newcar = {...id, ...newcar };
		dbAdvert.push(newcar);
		resolve(newcar);
	});
};

const updatePropertyAdvert = (id, newPost) => {
	return new Promise((resolve, reject) => {
		mustBeInArray(dbAdvert, id)
			.then(post => {
				const index = dbAdvert.findIndex(p => p.id == post.id);
				id = { id: post.id };
				const date = {
					createdAt: post.createdAt,
					updatedAt: newDate()
				}; 
				dbAdvert[index] = { ...id, ...date, ...newPost };
				resolve(dbAdvert[index]);
			})
			.catch(err => reject(error.no_ads_err_404));
	});
};

const deletePropertyAdvert = id => {
	return new Promise((resolve, reject) => {
		mustBeInArray(dbAdvert, id)
			.then(() => {
				dbAdvert = dbAdvert.filter(p => p.id != id);
				resolve(dbAdvert);
			})
			.catch(err => reject(error.no_ads_err_404));
	});
};

export {getPropertyAdvert,getPropertyAdverts,updatePropertyAdvert,deletePropertyAdvert,insertPropertyAdvert,
	getTypeProperty
};