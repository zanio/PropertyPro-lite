/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return  */

const AllAdsFetch = async () => {
	let data;
	const endpoint = 'http://127.0.0.1:3300/api/v1/property';
	const fetchRequest = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const fetchAds = await fetch(endpoint, fetchRequest);
		const response = await fetchAds.json();
		// Render.hideAsyncNotification('async-loading');
		data = response.data ? response.data : { status: response.status, message: response.error };
		if (response.error) {
			// Render.blockStickyNotification('success', response.error);
			return data;
		}
	} catch (err) {
		// Render.hideAsyncNotification('async-loading');
		// Render.blockNotification('error', 'Internet error occured. please try again', 'notification');
		console.log(err);
	}
	return data;
};

