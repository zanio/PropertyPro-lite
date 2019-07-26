const getUser = localStorage.getItem('user');
const page_1 = localStorage.getItem('page_1');
const goBack = document.querySelector('#back')
const propertySubmit = document.querySelector('#property-submit');
const formDashboard = document.querySelector('#form-dashboard');

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
if (
  (
    page_1 === null
    || page_1 === undefined
    || page_1 === 'undefined'
    || page_1 === 'null'
  )
) {
  window.location.replace('form1.html');
}



window.addEventListener('load',()=>{
  formDashboard.addEventListener('click',()=>{
    Helpers.removelocalStorage('page_1','dashboard');
  })
  
   
});