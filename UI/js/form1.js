const getUser = localStorage.getItem('user');
const chooseState = document.querySelector('#choose-state')
const chooseLga = document.querySelector('#choose-lga')
const propertyType = document.querySelector('#type-of-property')
const propertyName = document.querySelector('#property-name')
const propertyAddress = document.querySelector('#property-address')
const continueAdBtn = document.querySelector('#next-1');

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
const fetchStates = async ()=>{
  const endpoint = 'https://locationsng-api.herokuapp.com/api/v1/states';
  
  try{
    const states = await fetch(endpoint);
    const statesJson = await states.json();
    const allStates =  statesJson.map(response=>{
     return `<option value="${response.name}">${response.name} - ${response.capital}</option>`;
    }).join('');
    chooseState.insertAdjacentHTML('beforeend',allStates)

  } catch(err){
    console.log(err)
  }
  

}
const fetchLga = async (state)=>{
  const endpoint = 'http://locationsng-api.herokuapp.com/api/v1/lgas';
  chooseLga.innerHTML = '';
  
  try{
    const lga = await fetch(endpoint);
    const lgaJson = await lga.json();
    const LGA = lgaJson.filter(p=>p.state == state)[0].lgas;
    const allLga =  LGA.map(response=>{
      
     return `<option value="${response}">${response}</option>`;
    }).join('');
    chooseLga.insertAdjacentHTML('beforeend',allLga)

  } catch(err){
    console.log(err)
  }
  

}

const continueAd = (data)=>{

  if(!data['property-type'] || data['property-type'] =='choose type'){
    Render.blockStickyNotification('error', 'Please select a property type');
    return;
  }
  if(!data['property-name'] || data['property-name'].length <= 5 ){
    Render.blockStickyNotification('error', 'Please enter a property name of length greater than 5');
    return;
  }

  if(!data['state'] || data['state'] == 'choose state' ){
    Render.blockStickyNotification('error', 'Please select a state');
    return;
  }
  if(!data['lga'] || data['lga'] == '' ){
    Render.blockStickyNotification('error', 'Please select an LGA');
    return;
  }

  if(!data['property-address'] || data['property-address'].length <= 3 ){
    Render.blockStickyNotification('error', 'Please type in an address of at least 3 chracters an above');
    return;
  }
  localStorage.setItem('page_1',JSON.stringify(data));
  location.replace('form2.html');
 
}



window.addEventListener('load',()=>{
  fetchStates();
  let page_1 = {};

  let state = {};
  chooseState.addEventListener('change',()=>{
    if(chooseState.value !== 'choose state'){
      state['state'] = chooseState.value;
      fetchLga(state.state)
      page_1['state'] = state.state;
    } 

   }); 

  propertyAddress.addEventListener('keyup',()=>{
    page_1['property-address'] = propertyAddress.value;
  })

   propertyType.addEventListener('change',()=>{
    if(propertyType.value !== 'choose type')
    page_1['property-type'] = propertyType.value
  });

  propertyName.addEventListener('keyup',()=>{
    page_1['property-name'] = propertyName.value;
  })

  chooseLga.addEventListener('change',()=>{
    if(chooseLga.value !== '')
    page_1['lga'] = chooseLga.value
  });
  
  continueAdBtn.addEventListener('click',()=>{
    continueAd(page_1);
  })


});