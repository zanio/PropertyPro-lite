var sendToken = document.querySelector('#sign-up-form');
var fetchResetPassword = function (payload) {
    var endpoint = "http://127.0.0.1:3300/api/v1/reset/verify?id=" + token + "&email=" + email;
    var fetchRequest = {
        method: 'PATCH',
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
        Render.blockNotification('success', "Hi " + response.data.user + " " + response.data.message, 'notification');
    })["catch"](function (err) {
        Render.hideAsyncNotification('async-loading');
        Render.blockNotification('Internet error occured. please try again', 'notification');
        console.log(err);
    });
};
sendToken.addEventListener('submit', function (event) {
    event.preventDefault();
    var password = sendToken.password.value;
    var confirm_password = sendToken.confirm_password.value;
    if (password.length <= 8) {
        Render.blockStickyNotification('error', 'The password length is too short. please enter at least 8 characters');
        return;
    }
    if (confirm_password.length <= 8) {
        Render.blockStickyNotification('error', 'The confirmation password length is too short. please enter at least 8 characters');
        return;
    }
    if (confirm_password !== password) {
        Render.blockStickyNotification('error', 'The password does not match');
        return;
    }
    var pattern = /^[\w._]+$/;
    if (!pattern.test(password)) {
        Render.blockStickyNotification('error', 'Invalid password characters detected');
        return;
    }
    Render.hideStickyNotification();
    var payload = {
        password: password
    };
    payload = JSON.stringify(payload);
    Render.blockAsyncNotification('async-loading');
    fetchResetPassword(payload);
    setTimeout(function () {
        window.location.replace('login.html');
    }, 10000);
});
//# sourceMappingURL=sendtoken.js.map