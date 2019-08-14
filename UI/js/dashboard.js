/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars  */
const getUser = localStorage.getItem('user');
const displayUserDetails = document.querySelector('#user-info');
let AllDeleteBtn;

if (
	(
		getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null'
	)
) {
	window.location.replace('signup.html');
}

const fetchUserAdverts = async () => {
	let data;
	const getUserInfo = JSON.parse(getUser);
	const endpoint = 'http://127.0.0.1:3300/api/v1/property/user';
	const fetchRequest = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${getUserInfo.token}`,
		},
	};
	try {
		const fetchAds = await fetch(endpoint, fetchRequest);
		const response = await fetchAds.json();
		Render.hideAsyncNotification();
		data = response.data;
		if (response.error) {
			Render.blockStickyNotification('error', response.error);
			return;
		}
	} catch (err) {
		Render.hideAsyncNotification();
		Render.blockNotification('error', 'Internet error occured. please try again');
		console.log(err);
	}
	return data;
};

const fetchDeleteAdvert = async (propertyId) => {
	let data;
	const getUserInfo = JSON.parse(getUser);
	const endpoint = `http://127.0.0.1:3300/api/v1/property/${propertyId}`;
	const fetchRequest = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${getUserInfo.token}`,
		},
	};
	try {
		const fetchAds = await fetch(endpoint, fetchRequest);
		const response = await fetchAds.json();
		Render.hideAsyncNotification();
		data = response.data;
		if (response.error) {
			Render.blockStickyNotification('error', response.error);
			return;
		}
	} catch (err) {
		Render.hideAsyncNotification();
		Render.blockNotification('Internet error occured. please try again');
		console.log(err);
	}
	return data.message;
};

const fetchMarkStatus = async (propertyId, status) => {
	let data;
	const getUserInfo = JSON.parse(getUser);
	const endpoint = `http://127.0.0.1:3300/api/v1/property/${propertyId}/sold`;
	const fetchRequest = {
		method: 'PATCH',
		body: JSON.stringify(status),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${getUserInfo.token}`,
		},
	};
	try {
		const fetchAds = await fetch(endpoint, fetchRequest);
		const response = await fetchAds.json();
		Render.hideAsyncNotification();
		data = response.data;
		if (response.error) {
			Render.blockStickyNotification('error', response.error);
			return;
		}
	} catch (err) {
		Render.hideAsyncNotification();
		Render.blockNotification('Internet error occured. please try again');
		console.log(err);
	}
	return data.status;
};

const DeleteProcess = (domElement, i) => {
	domElement[i].addEventListener('click', (e) => {
		const get_text_id = document.querySelector('.get_id').textContent;
		const get_id = get_text_id.split(' ')[2].trim();

		Helpers.insertBackdrop();

		const message = document.querySelector('.message');
		message.innerHTML = deleteMessage;
		const modalBtn = document.querySelector('#modal');
		const cancelBtn = document.querySelector('#cancel');
		modalBtn.addEventListener('click', async () => {
			Render.blockAsyncNotification();
			const response = await fetchDeleteAdvert(get_id);
			console.log(response);
			Helpers.removeBackDrop();
			Render.blockNotification('success', `${response}`);
			setTimeout(() => {
				location.href = 'dashboard.html';
			}, 3000);
		});
		cancelBtn.addEventListener('click', () => {
			Helpers.removeBackDrop();
		});
	});
};

const StatusEvent = (changeStatus, get_id) => {
	const statusObject = {};
	changeStatus.addEventListener('change', () => {
		statusObject.status = changeStatus.value;
		const statusBody = statusObject || 'empty object';
		const modalBtn = document.querySelector('#modal-update');

		modalBtn.addEventListener('click', async () => {
			Render.blockAsyncNotification();
			const response = await fetchMarkStatus(get_id, statusBody);
			Helpers.removeBackDrop();
			Render.blockNotification('success', `Your advert has been successful marked as ${response}`);
		});
	});
};

const ps = ({ res }) => {

};

const UpdateProcess = (domElement, i) => {
	domElement[i].addEventListener('click', () => {
		const get_text_id = document.querySelector('.get_id').textContent;
		const get_id = get_text_id.split(' ')[2].trim();

		Helpers.insertBackdrop('normal');

		const message = document.querySelector('.message');
		message.innerHTML = updateMessage;
		const changeStatus = document.querySelector('#select_options');

		StatusEvent(changeStatus, get_id);
		const cancelBtn = document.querySelector('#cancel');
		cancelBtn.addEventListener('click', () => {
			Helpers.removeBackDrop();
		});
	});
};

const DisplayUserAdverts = (data) => {
	const html_1 = Helpers.iterateItem(data, user_ads);

	Render.renderContainer('user_ads', html_1);
};


const ProcessAdvertList = async () => {
	const data = await fetchUserAdverts();

	if (data.length <= 1) {
		window.location.replace('no-advert.html');
	}
	data.pop();
	data.reverse();

	// Display Users advert if users has adverts on his/her dashboard
	DisplayUserAdverts(data);

	// Delete button and mark property status section dashboard
	AllDeleteBtn = document.querySelectorAll('.delete');
	AllUpdateBtn = document.querySelectorAll('.mark-advert');

	for (let i = 0; i < AllDeleteBtn.length; i += 1) {
		DeleteProcess(AllDeleteBtn, i);
		UpdateProcess(AllUpdateBtn, i);
	}
};

window.addEventListener('load', () => {
	const getUserInfo = JSON.parse(getUser);
	const name = `${getUserInfo.first_name} ${getUserInfo.last_name}`;
	displayUserDetails.innerHTML = `
    Welcome <span  class="-light-blue">${name}</span>, Here are your recent advert.`;
	Render.blockAsyncNotification();
	ProcessAdvertList();
});
