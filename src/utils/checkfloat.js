const checkFloat = num=>{
	const regex = /^[+-]?\d+(\.\d+)?$/;
	const regexTest = regex.test(num);
	if(regexTest) return parseFloat(num);

	return false;
};

export default checkFloat;
