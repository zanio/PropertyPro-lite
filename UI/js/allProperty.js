/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return  */

const AllAds = async () => {
	let data;
	const endpoint = 'https://propertpro-lite.herokuapp.com/api/v1/property/';
	const fetchRequest = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const fetchAds = await fetch(endpoint, fetchRequest);
		const response = await fetchAds.json();
		Render.hideAsyncNotification();
		data = response.data;
		if (response.error) {
			Render.blockStickyNotification('error', response.error);
			return response.error;
		}
	} catch (err) {
		Render.hideAsyncNotification();
		Render.blockNotification('error', 'Internet error occured. please try again');
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
			Render.blockNotification('error', 'no advert to display');
			return;
		}
		if (data.length > 1) {
			data.pop();
			data.reverse();
			// Display All adverts from all category
			DisplayAllAdverts(data);
		}
	} catch (err) {
		Render.blockNotification('error', err);
	}

	// Delete button and mark property status section dashboard
};

window.addEventListener('load', () => {
	Render.blockAsyncNotification();
	ProcessAds();
});
