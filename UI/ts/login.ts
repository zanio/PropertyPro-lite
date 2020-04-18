/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, no-shadow  */

const signInForm = document.querySelector('#sign-in-form');

const getUser = localStorage.getItem('user');

if (
	!(
		getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null'
	)
) {
	window.location.replace('dashboard.html');
}

const getEmail = () => {
	const getEmailEvent = document.querySelector('#get-email');
	getEmailEvent.addEventListener('click', () => {
		const email = document.querySelector('[name="email"]').value;
		localStorage.setItem('reset-email', JSON.stringify(email));
		window.location.href = 'sendreset.html';
	});
};

const signIn = (payload) => {
	const endpoint = 'http://localhost:3300/api/v1/auth/signin';
	const fetchRequest = {
		method: 'POST',
		body: payload,
		headers: { 'Content-Type': 'application/json' },
	};

	fetch(endpoint, fetchRequest)
		.then(res => res.json())
		.then((response) => {
			Render.hideAsyncNotification('async-loading');
			if (response.error) {
				Render.blockStickyNotification('error', response.error);
				const passwordRecoveryHtml = '<p class="pt-2 title-head ft-08 text-center"> Did you forgert your password ? <a id="get-email" class="blue-link -light-blue">click</a> to recover</p>';
				Render.renderContainerClass('password-recovery', passwordRecoveryHtml);
				getEmail();
				return;
			}
			Render.blockNotification('success', 'logging in', 'notification');
			localStorage.setItem('user', JSON.stringify(response.data));
			window.location.replace('dashboard.html');
		})
		.catch((err) => {
			Render.hideAsyncNotification('async-loading');
			Render.blockNotification('error', 'Internet error occured. please try again', 'notification');
			console.log(err);
		});
};

signInForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const email = signInForm.email.value;
	const password = signInForm.password.value;


	// Validation starts here
	if (!Helpers.isEmail(String(email).toLowerCase())) {
		Render.blockStickyNotification('error', 'Please enter a valid email');
		return;
	}
	if (password.length <= 8) {
		Render.blockStickyNotification(
			'error',
			'The password length is too short. please enter at least 8 characters',
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
		email: String(email).toLowerCase(),
		password,
	};
	payload = JSON.stringify(payload);
	Render.blockAsyncNotification('async-loading');
	setTimeout(() => {
		signIn(payload);
	}, 1000);
});
