window.addEventListener('load', ()=>{
    
const bars = document.querySelector('.bars');

const btnarr = ()=>{
    const deletedom = document.querySelectorAll('.delete');
    let deleteclasses =[];
    for(let i =0; i < deletedom.length; i++){
    deleteclasses.push(deletedom[i])
    }
    return deleteclasses
}

const userDp = document.querySelector('.user-setting');

const removeDomElement = (cls)=>{
    const elem = document.querySelector(cls);
    return  elem.parentNode.removeChild(elem);
}



function barss(){
    
    document.querySelector('.mobile').style.display = "block";
    document.querySelector('body')
    .insertAdjacentHTML('beforeend','<div class="backdrop"></div>')

    document.querySelector('.backdrop').addEventListener('click',function(){
        this.style.display = "none";
        document.querySelector('.mobile').style.display = "none";
        this.parentNode.removeChild(this);
    })
    return;
}



document.querySelector('body').addEventListener('click',(e)=>{
    const id = e.target.id
    const classList = e.target.classList.value;
    if(classList === "bars"){
        barss()
    }
   
    if(id === 'next-1' ){
        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/form-2.html';
        loadPage(formURL , '.insertForm')
        return
    }

    if(id === 'next-2' ){
        if(id === 'cir-1'){
            const formURL = './form/form-1.html';
            removeDomElement('.form-bg');
            loadPage(formURL , '.insertForm')
            return
           }

        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/feedback.html';
        loadPage(formURL , '.insertForm')
        return
    }

    if(id === 'update-1' ){
       
        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/update/form-2.html';
        loadPage(formURL , '.insertUpdate')

        
    }
    if(id === 'update-2' ){
        document.querySelector('.inactive-circle').classList.remove('inactive-circle')
        removeDomElement('.form-bg');
        const formURL = './form/update/feedback.html';
        loadPage(formURL , '.insertUpdate')
        return
  
    }


}) 


btnarr() !== null ?
btnarr().map(el=>{
    el.addEventListener('click',()=>{
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
        
    }) 
})
: null;


});
