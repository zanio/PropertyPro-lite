const signUpForm = document.querySelector('#sign-up-form');

const getUser = localStorage.getItem('user');

if (
  !(
    getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null'
  )
) {
  window.location.replace('dashboard.html');
}

const createAccount = (payload) => {
  const endpoint = 'http://localhost:3300/api/v1/auth/signup';
  const fetchRequest = {
    method: 'POST',
    body: payload,
    headers: { 'Content-Type': 'application/json' },
  };

  fetch(endpoint, fetchRequest)
    .then(res => res.json())
    .then((response) => {
      Render.hideAsyncNotification();
      if (response.error) {
        Render.blockStickyNotification('error', response.error);
        return;
      }
      Render.blockNotification('Sign up successful, logging in');
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.replace('dashboard.html');
    })
    .catch((err) => {
      Render.hideAsyncNotification();
      Render.blockNotification('Internet error occured. please try again');
      console.log(err);
    });
};




signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const email = signUpForm.email.value;
  const first_name = signUpForm['first_name'].value;
  const last_name = signUpForm['last_name'].value;
  const phone_number = signUpForm['phone_number'].value;
  const address = signUpForm.address.value;
  const password = signUpForm.password.value;


  // Validation starts here
  if (!Helpers.isEmail(String(email).toLowerCase())) {
    Render.blockStickyNotification('error', 'Please enter a valid email');
    return;
  }
  if (first_name.length <= 0) {
    Render.blockStickyNotification(
      'error',
      'Please enter a valid first name',
    );
    return;
  }
  if (last_name.length <= 0) {
    Render.blockStickyNotification('error', 'Please enter a valid last name');
    return;
  }
  if (address.length <= 0 ) {
    Render.blockStickyNotification(
      'error',
      'Please type your address',
    );
    return;
  }
  if ( address.length >= 350) {
    Render.blockStickyNotification(
      'error',
      'Not more than 350 characters allowed for address',
    );
    return;
  }
  if (password.length <= 8) {
    Render.blockStickyNotification(
      'error',
      'The password length is too short. please enter at least 8 characters',
    );
    return;
  }
  const pattern = /^[\w._]+$/;
  if (!pattern.test(password)) {
    Render.blockStickyNotification(
      'error',
      'Invalid password characters detected',
    );
    return;
  }

  Render.hideStickyNotification();
  // Validation ends here

  // Api calls
  let payload = {
    first_name: Helpers.capitalizeWords(first_name),
    last_name: Helpers.capitalizeWords(last_name),
    email: String(email).toLowerCase(),
    address: Helpers.capitalizeWords(address),
    password,
    phone_number
  };
  payload = JSON.stringify(payload);

  Render.blockAsyncNotification();
setTimeout(()=>{
  createAccount(payload);
},1000)
  
});
