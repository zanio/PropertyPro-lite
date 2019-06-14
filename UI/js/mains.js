window.addEventListener('load', ()=>{
const barEl = document.querySelector('.bars');


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
})