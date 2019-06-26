const numRegex = num =>{
	const regex = /^[0-9]*$/;
	return regex.test(num);

};
const phoneLength = num =>{
	return num.length === 11 ? true : false;
};


export {numRegex,phoneLength};