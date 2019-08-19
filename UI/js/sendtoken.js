/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, no-shadow  */
const sendToken = document.querySelector('#sign-up-form');


const fetchResetPassword = (payload) => {
	const endpoint = `http://127.0.0.1:3300/api/v1/reset/verify?id=${token}&email=${email}`;
	const fetchRequest = {
		method: 'PATCH',
		body: payload,
		headers: { 'Content-Type': 'application/json' },
	};

	fetch(endpoint, fetchRequest)
		.then(res => res.json())
		.then((response) => {
			Render.hideAsyncNotification('async-loading');
			if (response.error) {
				Render.blockStickyNotification('error', response.error);
				return;
			}
			Render.blockNotification('success', `Hi ${response.data.user} ${response.data.message}`, 'notification');
		})
		.catch((err) => {
			Render.hideAsyncNotification('async-loading');
			Render.blockNotification('Internet error occured. please try again', 'notification');
			console.log(err);
		});
};


sendToken.addEventListener('submit', (event) => {
	event.preventDefault();

	const password = sendToken.password.value;
	const confirm_password = sendToken.confirm_password.value;


	if (password.length <= 8) {
		Render.blockStickyNotification(
			'error',
			'The password length is too short. please enter at least 8 characters',
		);
		return;
	}
	if (confirm_password.length <= 8) {
		Render.blockStickyNotification(
			'error',
			'The confirmation password length is too short. please enter at least 8 characters',
		);
		return;
	}
	if (confirm_password !== password) {
		Render.blockStickyNotification(
			'error',
			'The password does not match',
		);
		return;
	}
	const pattern = /^[\w._]+$/;
	if (!pattern.test(password)) {
		Render.blockStickyNotification(
			'error',
			'Invalid password characters detected',
		);
		return;
	}

	Render.hideStickyNotification();
	// Validation ends here

	// Api calls
	let payload = {
		password,
	};
	payload = JSON.stringify(payload);

	Render.blockAsyncNotification('async-loading');
	fetchResetPassword(payload);
	setTimeout(() => {
		window.location.replace('login.html');
	}, 10000);
});
