window.addEventListener('load', ()=>{
const bars = document.querySelector('.bars');
const userDp = document.querySelector('.user-setting');

const getPageContent = (url)=>{
    return new Promise((resolve, reject)=>{
            if(window.fetch){
            resolve(fetch(url))
            reject(err)
            } else{
                reject(err)
            }
        });
};

const removeDomElement = (cls)=>{
    const elem = document.querySelector(cls);
    return  elem.parentNode.removeChild(elem);
}


bars.addEventListener('click',function (){
    
        document.querySelector('.mobile').style.display = "block";
        document.querySelector('body')
        .insertAdjacentHTML('beforeend','<div class="backdrop"></div>')

        document.querySelector('.backdrop').addEventListener('click',function(){
            this.style.display = "none";
            document.querySelector('.mobile').style.display = "none";
            this.parentNode.removeChild(this);
        })
      
});

document.querySelector('body').addEventListener('click',(e)=>{
    const id = e.target.classList.value;
    
    if(id === 'user-dp'){
        userDp.style.display = "block !important"
    }
    else{
        userDp.style.display = "none !important"
        console.log(id)
    }
});

document.querySelector('body').addEventListener('click',(e)=>{
    
    const id = e.target.id;
    if(id === 'next-1' ){
       
        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/form-2.html';
        getPageContent(formURL)
        .then(res=>res.text())
        .then(res=> document.querySelector('.insertForm').insertAdjacentHTML('beforeend',res))
        .catch(err=>{console.log(err)})
    }

}) 


document.querySelector('body').addEventListener('click',(e)=>{
    const id = e.target.id;
    
    if(id === 'next-2' ){
        if(id === 'cir-1'){
            const formURL = './form/form-1.html';
            removeDomElement('.form-bg');
            getPageContent(formURL)
            .then(res=>res.text())
            .then(res=> document.querySelector('.insertForm').insertAdjacentHTML('beforeend',res))
            .catch(err=>{console.log(err)})
           }

        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/feedback.html';
        getPageContent(formURL)
        .then(res=>res.text())
        .then(res=> document.querySelector('.insertForm').insertAdjacentHTML('beforeend',res))
        .catch(err=>{console.log(err)})
    }

});
document.querySelector('body').addEventListener('click',(e)=>{
    
    const id = e.target.id;
    if(id === 'update-1' ){
       
        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/update/form-2.html';
        getPageContent(formURL)
        .then(res=>res.text())
        .then(res=> document.querySelector('.insertUpdate').insertAdjacentHTML('beforeend',res))
        .catch(err=>{console.log(err)})
    }

}) 

/* it controls the fetching and displaying of details for update advert page*/

document.querySelector('body').addEventListener('click',(e)=>{
    const id = e.target.id;
    
    if(id === 'update-2' ){
        if(id === 'cirUpdate-1'){
            const formURL = './form/update/form-1.html';
            removeDomElement('.form-bg');
            getPageContent(formURL)
            .then(res=>res.text())
            .then(res=> document.querySelector('.insertUpdate').insertAdjacentHTML('beforeend',res))
            .catch(err=>{console.log(err)})
           }

        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/update/feedback.html';
        getPageContent(formURL)
        .then(res=>res.text())
        .then(res=> document.querySelector('.insertUpdate').insertAdjacentHTML('beforeend',res))
        .catch(err=>{console.log(err)})
    }

});

document.querySelector('.delete').addEventListener('click',()=>{
    const modalURL = './modal/modal.html';
    getPageContent(modalURL)
    .then(res=>res.text())
    .then(res=> document.querySelector('body').insertAdjacentHTML('beforeend',res))
    .then(()=>{
        if(document.querySelector('#modal')){
            document.querySelector('#modal').addEventListener('click', ()=>{
               location.href="dashboard.html"
            })
        }
    })
        
    .catch(err=>{console.log(err)})
    
});

// document.querySelector('.modal').addEventListener('click', ()=>{
//     console.log('asasasss')
// })

});