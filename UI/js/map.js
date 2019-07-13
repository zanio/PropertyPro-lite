
let address;
let endpoint = 'https://propertpro-lite.herokuapp.com/api/v1/property-advert/address/';
let endpoint2 = 'https://propertpro-lite.herokuapp.com/api/v1/property-advert/search?type=flat';

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

getAdress(endpoint2,'').then(res=>console.log(res)).catch(err=>console.log(err));

let latitude,longitude;

async function geolocation(){
	var geocoder = new google.maps.Geocoder();
	const res = await getAdress(endpoint,1);
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



