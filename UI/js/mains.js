window.addEventListener('load', ()=>{
const barEl = document.querySelector('.bars');
const userDp = document.querySelector('.user-setting');

const removeDomElement = (cls)=>{
    const elem = document.querySelector(cls);
    return  elem.parentNode.removeChild(elem);
}



barEl.addEventListener('click',function (){
    
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
        console.log(id)
        //userDp.classList.add('displ')
    }
    else{
        userDp.style.display = "none !important"
        console.log(id)
        //userDp.classList.remove('display')
    }
})
})