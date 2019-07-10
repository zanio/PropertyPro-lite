
let address;
let endpoint = 'http://localhost:3300/api/v1/property-advert/address/';

let getAdress = (url,id)=>{
	return new Promise((resolve,reject)=>{
		if(window.fetch){
			fetch(url+id)
				.then(res=>res.text())
				.then(res=>JSON.parse(res))
				.then(res=>resolve(res))
				.catch(err=>reject(err));
		}
	});
};

let latitude,longitude;

async function geolocation(){
	var geocoder = new google.maps.Geocoder();
	const res = await getAdress(endpoint,2);
	console.log(res.data);
	address = res.data.contact_person_address+' ,'+res.data.city+' ,'+res.data.state;
	geocoder.geocode( { 'address': address},function(results,status){
    
		if (status == google.maps.GeocoderStatus.OK) {
			latitude = results[0].geometry.location.lat();
			longitude = results[0].geometry.location.lng();
			initMap();
		} 
    
	}); 

}


geolocation();

async function initMap() {
	// The location 
	var set = {
		lat: latitude,
		lng: longitude
	};
	console.log(set);
	// The map, centered
	var map = await new google.maps.Map(
		document.getElementById('map'), {
			zoom: 16,
			center: set
		});
	// The marker, 
	var marker = await new google.maps.Marker({
		position:set,
		map: map
	});
}



