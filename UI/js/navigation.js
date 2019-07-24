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