var signInForm = document.querySelector('#sign-in-form');
var getUser = localStorage.getItem('user');
if (!(getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null')) {
    window.location.replace('dashboard.html');
}
var getEmail = function () {
    var getEmailEvent = document.querySelector('#get-email');
    getEmailEvent.addEventListener('click', function () {
        var email = document.querySelector('[name="email"]').value;
        localStorage.setItem('reset-email', JSON.stringify(email));
        window.location.href = 'sendreset.html';
    });
};
var signIn = function (payload) {
    var endpoint = 'http://localhost:3300/api/v1/auth/signin';
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
            var passwordRecoveryHtml = '<p class="pt-2 title-head ft-08 text-center"> Did you forgert your password ? <a id="get-email" class="blue-link -light-blue">click</a> to recover</p>';
            Render.renderContainerClass('password-recovery', passwordRecoveryHtml);
            getEmail();
            return;
        }
        Render.blockNotification('success', 'logging in', 'notification');
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.replace('dashboard.html');
    })["catch"](function (err) {
        Render.hideAsyncNotification('async-loading');
        Render.blockNotification('error', 'Internet error occured. please try again', 'notification');
        console.log(err);
    });
};
signInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var email = signInForm.email.value;
    var password = signInForm.password.value;
    if (!Helpers.isEmail(String(email).toLowerCase())) {
        Render.blockStickyNotification('error', 'Please enter a valid email');
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
        email: String(email).toLowerCase(),
        password: password
    };
    payload = JSON.stringify(payload);
    Render.blockAsyncNotification('async-loading');
    setTimeout(function () {
        signIn(payload);
    }, 1000);
});
//# sourceMappingURL=login.js.map