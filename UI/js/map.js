/* eslint-disable camelcase, no-undef, prefer-destructuring, no-console,
consistent-return,no-restricted-globals,no-unused-vars, no-shadow  */
let address; let latitude; let
	longitude;
const AddressEndpoint = 'http://127.0.0.1:3300/api/v1/property/address/';


const getOne = (url, id) => new Promise((resolve, reject) => {
	if (window.fetch) {
		fetch(url + id)
			.then(res => res.text())
			.then(res => JSON.parse(res))
			.then(res => resolve(res))
			.catch(err => reject(err));
	}
});

async function initMap() {
	// The location
	const set = {
		lat: latitude,
		lng: longitude,
	};
	// The map, centered
	const map = await new google.maps.Map(
		document.getElementById('map'), {
			zoom: 16,
			center: set,
		},
	);
	// The marker,
	const marker = await new google.maps.Marker({
		position: set,
		map,
	});
}


async function geolocation() {
	const geocoder = new google.maps.Geocoder();
	const res = await getOne(AddressEndpoint, 22260411);
	address = `${res.data.address} ,${res.data.city} ,${res.data.state}`;
	geocoder.geocode({ address }, (results, status) => {
		if (status === google.maps.GeocoderStatus.OK) {
			latitude = results[0].geometry.location.lat();
			longitude = results[0].geometry.location.lng();
			initMap();
		}
	});
}


geolocation();
