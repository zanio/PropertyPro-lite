/* eslint-disable no-undef */
const dbPath = require('./dbPath');

let {users} = require(dbPath.userFileName);
import {getNewId,mustBeInArray,newDate,} from '../helpers/helper';


const getUsers = ()=> {
	return new Promise((resolve, reject) => {
		if (users.length === 0) {
			reject({
				message: 'no user available',
				status: 202
			});
		}
		resolve(users);
	});
};

const getUser = (id) => {
	return new Promise((resolve, reject) => {
		mustBeInArray(users, id)
			.then(user => resolve(user))
			.catch(err => reject(err));
	});
};

const insertUser =(newUser) => {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		const id = { id: getNewId(users) };
		const date = { 
			createdAt: newDate()
		}; 
		newUser = { ...id, ...date, ...newUser };
		users.push(newUser);
		resolve(newUser);
	});
};

const updateUser = (id, newPost) => {
	return new Promise((resolve, reject) => {
		mustBeInArray(users, id)
			.then(post => {
				const index = user.findIndex(p => p.id == post.id);
				id = { id: post.id };
				const date = {
					createdAt: post.createdAt,
					updated:newDate()
				}; 
				users[index] = { ...id, ...date, ...newPost };
				resolve(users[index]);
			})
			.catch(err => reject(err));
	});
};

const deleteUser = (id) => {
	return new Promise((resolve, reject) => {
		mustBeInArray(users, id)
			.then(() => {
				users = users.filter(p => p.id !== id);
				resolve(users);
			})
			.catch(err => reject(err));
	});
};

module.exports = {
	insertUser,
	getUsers,
	getUser, 
	updateUser,
	deleteUser
};