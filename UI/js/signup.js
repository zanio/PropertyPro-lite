var signUpForm = document.querySelector('#sign-up-form');
var getUser = localStorage.getItem('user');
if (!(getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null')) {
    window.location.replace('dashboard.html');
}
var createAccount = function (payload) {
    var endpoint = 'http://127.0.0.1:3300/api/v1/auth/signup';
    var fetchRequest = {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint, fetchRequest)
        .then(function (res) { return res.json(); })
        .then(function (response) {
        Render.hideAsyncNotification('async-loading');
        if (response.error) {
            Render.blockStickyNotification('error', response.error);
            return;
        }
        Render.blockNotification('Sign up successful, logging in', 'notification');
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.replace('dashboard.html');
    })["catch"](function (err) {
        Render.hideAsyncNotification('async-loading');
        Render.blockNotification('Internet error occured. please try again', 'notification');
        console.log(err);
    });
};
signUpForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var email = signUpForm.email.value;
    var first_name = signUpForm.first_name.value;
    var last_name = signUpForm.last_name.value;
    var phone_number = signUpForm.phone_number.value;
    var address = signUpForm.address.value;
    var password = signUpForm.password.value;
    if (!Helpers.isEmail(String(email).toLowerCase())) {
        Render.blockStickyNotification('error', 'Please enter a valid email');
        return;
    }
    if (first_name.length <= 0) {
        Render.blockStickyNotification('error', 'Please enter a valid first name');
        return;
    }
    if (last_name.length <= 0) {
        Render.blockStickyNotification('error', 'Please enter a valid last name');
        return;
    }
    if (address.length <= 0) {
        Render.blockStickyNotification('error', 'Please type your address');
        return;
    }
    if (address.length >= 350) {
        Render.blockStickyNotification('error', 'Not more than 350 characters allowed for address');
        return;
    }
    if (password.length <= 8) {
        Render.blockStickyNotification('error', 'The password length is too short. please enter at least 8 characters');
        return;
    }
    var pattern = /^[\w._]+$/;
    if (!pattern.test(password)) {
        Render.blockStickyNotification('error', 'Invalid password characters detected');
        return;
    }
    Render.hideStickyNotification();
    var payload = {
        first_name: Helpers.capitalizeWords(first_name),
        last_name: Helpers.capitalizeWords(last_name),
        email: String(email).toLowerCase(),
        address: Helpers.capitalizeWords(address),
        password: password,
        phone_number: phone_number
    };
    payload = JSON.stringify(payload);
    Render.blockAsyncNotification('async-loading');
    setTimeout(function () {
        createAccount(payload);
    }, 1000);
});
//# sourceMappingURL=signup.js.map