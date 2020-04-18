/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, no-shadow  */
const token = location.search ? location.search.split('?')[1].split('&email=')[0].substring(3) : null;
const email = location.search ? location.search.split('?')[1].split('&email=')[1] : null;


if (
	(
		token === null
    || token === undefined
    || token === 'undefined'
    || token === 'null'
	)
) {
	window.location.replace('index.html');
}


window.addEventListener('load', () => {
	console.log(token, email);
});
