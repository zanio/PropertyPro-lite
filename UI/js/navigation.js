const navigationMount = () => {
    const getUser = localStorage.getItem('user');
    if (
      (
        getUser === null
      || getUser === undefined
      || getUser === 'undefined'
      || getUser === 'null'
      )
    ) {
      try {
        Render.renderContainer('navigation', Header);
      } catch (ex) {
        console.warn('Navigation container not found');
      }
    } else {
      try {
        const extractUser = JSON.parse(getUser);
        if (extractUser.is_admin) {
          Render.renderContainer('navigation', adminNav);
        } else {
          Render.renderContainer('navigation', AuthHeader);
          console.log(AuthHeader)
        }
      } catch (ex) {
        console.warn('Navigation container not found');
      }
    }
  };
  
  
  navigationMount();
  
  try {
    const signOutButton = document.querySelector('#sign-out-button');
    signOutButton.addEventListener('click', () => {
      Helpers.logout();
    });
  } catch (ex) {
    console.warn('sign out button not found');
  }

  
  window.addEventListener('load',()=>{
    const userSettings = document.querySelector('.user-setting');
    const body = document.querySelector('body');

    body.addEventListener('click',(e)=>{
      if(e.target.classList.value === 'user-dp'){
        userSettings.classList.remove('hide');
        userSettings.classList.add('block');
      } else{
        userSettings.classList.remove('block');
        userSettings.classList.add('hide');
      }

    })
  })