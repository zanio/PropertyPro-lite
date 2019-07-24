const signInForm = document.querySelector('#sign-in-form');

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

const signIn = (payload) => {
    const endpoint = 'http://localhost:3300/api/v1/auth/signin';
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
        Render.blockNotification('logging in');
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.replace('dashboard.html');
      })
      .catch((err) => {
        Render.hideAsyncNotification();
        Render.blockNotification('Internet error occured. please try again');
        console.log(err);
      });
  };

  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = signInForm.email.value;
    const password = signInForm.password.value;
  
  
    // Validation starts here
    if (!Helpers.isEmail(String(email).toLowerCase())) {
      Render.blockStickyNotification('error', 'Please enter a valid email');
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
      email: String(email).toLowerCase(),
      password
    };
    console.log(payload)
    payload = JSON.stringify(payload);
    Render.blockAsyncNotification();
    setTimeout(()=>{
        signIn(payload);
    },1000)
    
  });
  