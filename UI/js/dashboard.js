const getUser = localStorage.getItem('user');
const displayUserDetails = document.querySelector('#user-info')
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

const fetchUserAdverts = async ()=>{
    let data;
    const getUserInfo = JSON.parse(getUser)
    const endpoint = 'http://localhost:3300/api/v1/property/user'
    const fetchRequest = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${getUserInfo.token}` }
      };
    try{
        const fetchAds = await fetch(endpoint, fetchRequest)
        const response = await fetchAds.json();
        Render.hideAsyncNotification();
        data = response.data;
        if(response.error){

            Render.blockStickyNotification('error', response.error);
            return;
        }
    } catch(err){
            Render.hideAsyncNotification();
            Render.blockNotification('Internet error occured. please try again');
            console.log(err);
    }
    return data;

}
const fetchDeleteAdvert = async (propertyId)=>{
    let data;
    const getUserInfo = JSON.parse(getUser)
    const endpoint = `http://localhost:3300/api/v1/property/${propertyId}`
    const fetchRequest = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${getUserInfo.token}` }
      };
    try{
        const fetchAds = await fetch(endpoint, fetchRequest)
        const response = await fetchAds.json();
        Render.hideAsyncNotification();
        data = response.data;
        if(response.error){

            Render.blockStickyNotification('error', response.error);
            return;
        }
    } catch(err){
            Render.hideAsyncNotification();
            Render.blockNotification('Internet error occured. please try again');
            console.log(err);
    }
    return data.message;

}
const fetchMarkStatus = async (propertyId,status)=>{
    let data;
    const getUserInfo = JSON.parse(getUser)
    const endpoint = `http://localhost:3300/api/v1/property/${propertyId}/sold`
    const fetchRequest = {
        method: 'PATCH',
        body:JSON.stringify(status),
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${getUserInfo.token}` }
      };
    try{
        const fetchAds = await fetch(endpoint, fetchRequest)
        const response = await fetchAds.json();
        Render.hideAsyncNotification();
        data = response.data;
        if(response.error){

            Render.blockStickyNotification('error', response.error);
            return;
        }
    } catch(err){
            Render.hideAsyncNotification();
            Render.blockNotification('Internet error occured. please try again');
            console.log(err);
    }
    return data.message;

}

const injectManyImage = (arrayImage)=>{
    try {
        let imgElement = {};
      for(let i in arrayImage){
        imgElement[i] = `<img  class="dashboard-img-res" src="${arrayImage[i]}" />`; 
      }
      const domImageHolders = document.querySelectorAll(`.item-image-main`)
      for(let key in imgElement){
          domImageHolders[key].innerHTML = imgElement[key]
      }

      } catch (ex) {
        console.log('Multiple images can not be appended');
      }
}

const DeleteProcess = (domElement,i)=>{
    domElement[i].addEventListener('click', (e)=>{
        const get_text_id = document.querySelector('.get_id').textContent;
        const get_id = get_text_id.split(' ')[2].trim()
        
        Helpers.insertBackdrop('normal')

        const message = document.querySelector('.message');
        message.innerHTML = deleteMessage;
        const modalBtn = document.querySelector('#modal');
        modalBtn.addEventListener('click',async()=>{
        Render.blockAsyncNotification();
        const response = await fetchDeleteAdvert(get_id);
        console.log(response)
        Helpers.removeBackDrop();
        location.href = 'dashboard.html';
        });
    });
}

const StatusEvent = (changeStatus,get_id)=>{

    let statusObject ={};
    changeStatus.addEventListener('change',()=>{
    statusObject['status'] = changeStatus.value;
    const statusBody = statusObject ? statusObject:'empty object'
    const modalBtn = document.querySelector('#modal-update');
    modalBtn.addEventListener('click',async()=>{
    Render.blockAsyncNotification();
    const response = await fetchMarkStatus(get_id,statusBody);
    Helpers.removeBackDrop();
    location.href = 'dashboard.html';
    

    });
});
}

const UpdateProcess = (domElement,i)=>{
    domElement[i].addEventListener('click',  (e)=>{
        const get_text_id = document.querySelector('.get_id').textContent;
        const get_id = get_text_id.split(' ')[1].trim()
        
        Helpers.insertBackdrop('normal');

        const message = document.querySelector('.message');
        message.innerHTML = updateMessage;
        const changeStatus = document.querySelector('#select_options');
       
        StatusEvent(changeStatus,get_id); 
    });
           
}



const ProcessAdvertList = async ()=>{
    const data = await fetchUserAdverts();
    let content;
    
    if(data.length <= 1){
        window.location.replace('no-advert.html');
    }
    data.pop();
    const FirstThree = Helpers.getFirstN(data,0,3);
    const NextThree = Helpers.getFirstN(data,3,6);

    const html_1 = Helpers.iterateItem(FirstThree,user_ads);
    const html_2 = Helpers.iterateItem(NextThree,user_ads);
    
    Render.renderContainer('user_ads',html_1);
    Render.renderContainer('user_ads_1',html_2);

    const Images_1 = Helpers.loopImage(FirstThree);
    const Images_2 = Helpers.loopImage(NextThree);

    injectManyImage(Images_1.concat(Images_2));

// Delete button section dashboard
    AllDeleteBtn = document.querySelectorAll('.delete');
    AllUpdateBtn = document.querySelectorAll('.mark-advert');

    for(let i =0; i < AllDeleteBtn.length;i++){
        DeleteProcess(AllDeleteBtn,i);
        UpdateProcess(AllUpdateBtn,i)
    }

}

window.addEventListener('load',()=>{
   const getUserInfo = JSON.parse(getUser)
   const name = getUserInfo.first_name+' '+ getUserInfo.last_name;
    displayUserDetails.innerHTML = `
    Welcome <span  class="-light-blue">${name}</span>, Here are your recent advert.`
    Render.blockAsyncNotification();
    ProcessAdvertList();
 
});







