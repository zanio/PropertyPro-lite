var navigationMount = function () {
    var getUser = localStorage.getItem('user');
    if ((getUser === null
        || getUser === undefined
        || getUser === 'undefined'
        || getUser === 'null')) {
        try {
            Render.renderContainer('navigation', Header);
        }
        catch (ex) {
            console.warn('Navigation container not found');
        }
    }
    else {
        try {
            var extractUser = JSON.parse(getUser);
            if (extractUser.is_admin) {
                Render.renderContainer('navigation', adminNav);
            }
            else {
                Render.renderContainer('navigation', AuthHeader);
            }
        }
        catch (ex) {
            console.warn('Navigation container not found');
        }
    }
};
navigationMount();
try {
    var signOutButton = document.querySelector('#sign-out-button');
    signOutButton.addEventListener('click', function () {
        Helpers.removelocalStorage('user', 'index');
    });
}
catch (ex) {
    console.warn('sign out button not found');
}
window.addEventListener('load', function () {
    var userSettings = document.querySelector('.user-setting');
    var body = document.querySelector('body');
    body.addEventListener('click', function (e) {
        if (e.target.classList.value === 'user-dp') {
            userSettings.classList.remove('hide');
            userSettings.classList.add('block');
        }
        else {
            userSettings.classList.remove('block');
            userSettings.classList.add('hide');
        }
    });
});
//# sourceMappingURL=navigation.js.map