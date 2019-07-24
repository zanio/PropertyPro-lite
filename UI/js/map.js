
let address,latitude,longitude;
let AddressEndpoint = 'http://localhost:3300/api/v1/property/address/';


let getOne = (url,id)=>{
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



async function geolocation(){
	var geocoder = new google.maps.Geocoder();
	const res = await getOne(AddressEndpoint,22260411);
	address = res.data.address+' ,'+res.data.city+' ,'+res.data.state;
	geocoder.geocode( { 'address': address},function(results,status){
    
		if (status == google.maps.GeocoderStatus.OK) {
			latitude = results[0].geometry.location.lat();
			longitude = results[0].geometry.location.lng();
			initMap();
		} 
    
	}); 

}


geolocation();





