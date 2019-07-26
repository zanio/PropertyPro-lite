const getUser = localStorage.getItem('user');
const page_1 = localStorage.getItem('page_1');

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
   
});