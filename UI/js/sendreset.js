/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, no-shadow  */

const ResetPassWordLink = document.querySelector('#reset-password-link');

const getEmailFromStorage = localStorage.getItem('reset-email');

if (
	(
		getEmailFromStorage === null
    || getEmailFromStorage === undefined
    || getEmailFromStorage === 'undefined'
    || getEmailFromStorage === 'null'
	)
) {
	window.location.replace('index.html');
}

const retrieveFromLocalStorage = (item) => {
	const ItemFromStorage = localStorage.getItem(`${item}`);
	return JSON.parse(ItemFromStorage);
};

const resetLink = ({ email }) => {
	const endpoint = `http://localhost:3300/api/v1/reset?email=${email}`;
	const fetchRequest = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

	fetch(endpoint, fetchRequest)
		.then(res => res.json())
		.then((response) => {
			Render.hideAsyncNotification('async-loading');
			if (response.error) {
				Render.blockNotification('error', response.error.message);
				return response.error;
			}
			if (response.data) {
				console.log(response.data);
				Render.blockNotification('success', response.data.message);
				return response.data;
			}
			// window.location.replace('dashboard.html');
		})
		.catch((err) => {
			Render.hideAsyncNotification('async-loading');
			Render.blockNotification('error', 'Internet error occured. please try again');
			console.log(err);
		});
};

ResetPassWordLink.addEventListener('click', () => {
	const payload = {
		email: String(retrieveFromLocalStorage('reset-email')).toLowerCase(),
	};
	Render.blockAsyncNotification('async-loading');
	resetLink(payload);
	Helpers.removelocalStorage('reset-email');
});
