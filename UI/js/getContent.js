const footerURL = './navigation/footer.html';
const headerURL = './navigation/header.html';
const authHeader = './navigation/authheader.html';
const formURL = './form/form-1.html';

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

(function(){
    getPageContent(headerURL)
    .then(res=>res.text())
   .then(res=> document.querySelector('.insertHeader').insertAdjacentHTML('beforeend',res))
   .catch(err=>{console.log(err)})

    getPageContent(authHeader)
    .then(res=>res.text())
   .then(res=> document.querySelector('.insertauthHeader').insertAdjacentHTML('beforeend',res))
   .catch(err=>{console.log(err)})
   
    getPageContent(formURL)
    .then(res=>res.text())
   .then(res=> document.querySelector('.insertForm').insertAdjacentHTML('beforeend',res))
   .catch(err=>{console.log(err)})
   
   getPageContent(footerURL)
    .then(res=>res.text())
   .then(res=> document.querySelector('.insertFooter').insertAdjacentHTML('beforeend',res))
   .catch(err=>{console.log(err)})
   
   })()

