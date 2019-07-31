/* eslint-disable import/prefer-default-export */

import dotenv from 'dotenv';

dotenv.config();

const generateRandom = (len) => {
	const keys = process.env.char;
	const secretNum1 = process.env.numPrefix1;
	const secretNum2 = process.env.numPrefix2;

	let prefix = '';

	for (let i = 0; i < len; i += 1) {
		prefix += keys.charAt(Math.floor(Math.random() * 36));
	}

	return prefix + secretNum1 + prefix + secretNum2;
};

export { generateRandom };
