/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return  */

const AllAds = async () => {
	let data;
	const endpoint = 'http://localhost:3300/api/v1/property/';
	const fetchRequest = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const fetchAds = await fetch(endpoint, fetchRequest);
		const response = await fetchAds.json();
		Render.hideAsyncNotification('async-loading');
		data = response.data;
		if (response.error) {
			Render.blockStickyNotification('error', response.error);
			return response.error;
		}
	} catch (err) {
		Render.hideAsyncNotification('async-loading');
		Render.blockNotification('error', 'Internet error occured. please try again', 'notification');
		console.log(err);
	}
	return data;
};

const DisplayAllAdverts = (data) => {
	const html_1 = Helpers.iterateItem(data, advertCard);
	Render.renderContainer('all_ads', html_1);
	const arrayImage = Helpers.loopImage(data);
	Render.injectManyImage(arrayImage);
};

const ProcessAds = async () => {
	const data = await AllAds();
	try {
		if (data.message) {
			Render.blockNotification('error', 'no advert to display', 'notification');
			return;
		}
		if (data.length > 1) {
			data.pop();
			data.reverse();
			data.slice(0, 7);
			// Display All adverts from all category
			DisplayAllAdverts(data);
		}
	} catch (err) {
		Render.blockNotification('error', err, 'notification');
	}

	// Delete button and mark property status section dashboard
};

window.addEventListener('load', () => {
	Render.blockAsyncNotification('async-loading');
	ProcessAds();
});
