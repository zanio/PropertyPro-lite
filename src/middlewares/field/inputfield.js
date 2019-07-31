/* eslint-disable camelcase, no-unused-expressions , no-unused-vars , prefer-const */

import dotenv from 'dotenv';
import { checkLetter, Arr } from '../../utils/string';
import { numRegex, phoneLength } from '../../utils/numRegex';
import checkFloat from '../../utils/checkfloat';
import { validateEmail } from '../../utils/email';

dotenv.config();

const checkPropertyField = (req, res, next) => {
	const { image_url, property, float } = req;
	const boolArray = Arr(req.property);
	const letterBolean = checkLetter(boolArray);
	const floatBoolean = checkFloat(req.float.price);
	if (!letterBolean) {
		res.status(403).json({ status: 403, error: 'the property information can only contain aphabetic character' });
	} else if (!floatBoolean) {
		res.status(403).json({ status: 403, error: 'price value can only be numbers or floating numbers' });
	} else {
		req.price = parseFloat(req.float.price);
		req.image_url = image_url;
		next();
	}
};


const genderCheck = (req, res, next) => {
	const { gender } = req.body;
	const genderDecide = (gender === 'male' || gender === 'female');

	if (genderDecide || !gender) {
		next();
	} else {
		res.status(403).json({ status: 403, error: 'gender can only be male or female values' });
	}
};


const checkPropertyEmpty = (req, res, next) => {
	try {
		let {
			property_name, property_description, price, state, city, type,
			contact_person_number, address, proof, note,
		} = req.body;
		const image_url = req.files.image_url[0] ? req.files.image_url[0] : null;
		property_name = property_name ? property_name.trim() : null;
		property_description = property_description ? property_description.trim() : null;
		price = price ? price.trim() : null;
		state = state ? state.trim() : null;
		city = city ? city.trim() : null;
		type = type ? type.trim() : null;
		address = address ? address.trim() : null;
		proof = proof ? proof.trim() : null;
		note = note ? note.trim() : null;


		if (city && state && price && image_url && type && address
			&& property_name && property_description) {
			const property = { state, type, city };
			const float = { price };
			const other_details = {
				contact_person_number, city, address, proof, note, property_name,
			};
			req.property = property;

			req.image_url = image_url;
			req.float = float;
			req.other_details = other_details;

			next();
		} else {
			res.status(403).json({ status: 403, error: 'please fill all filled correctly' });
		}
	} catch (errors) {
		res.status(403).json({ status: 403, error: 'please fill all filled correctly and upload an image' });
	}
};

const updateprice = (req, res, next) => {
	const { price } = req.body;


	if (price) {
		const float = { price };
		req.float = float;

		next();
	} else {
		res.status(403).json({ status: 403, error: 'please fill in the exact price' });
	}
};

const emailValidation = (req, res, next) => {
	const { email } = req.body;

	if (validateEmail(email) && email) {
		next();
	} else {
		res.status(422).json({ status: 422, error: 'invalid email validation' });
	}
};

const regCharCheck = (req, res, next) => {
	let { newUser, first_name, last_name } = req.body;
	first_name = first_name ? first_name.trim() : null;
	last_name = last_name ? last_name.trim() : null;
	const namedata = {
		first_name,
		last_name,
	};
	const boolArray = Arr(namedata);
	const letterBolean = checkLetter(boolArray);

	if (letterBolean) {
		req.newUser = newUser;
		next();
	} else {
		res.status(404).json({ status: 404, error: 'first_name and last_name can only be letter characters' });
	}
};

const regNumCheck = (req, res, next) => {
	let { phone_number } = req.body;
	phone_number = phone_number ? phone_number.trim() : null;
	const numRex = numRegex(phone_number);
	const lengthNum = phoneLength(phone_number);


	if (numRex && lengthNum) {
		next();
	} else {
		res.status(422).json({ status: 422, error: 'phone number can only be digits with 11 characters and less than 13 characters' });
	}
};


export {
	checkPropertyField,
	genderCheck,
	checkPropertyEmpty,
	emailValidation,
	regCharCheck,
	regNumCheck,
	updateprice,
};
