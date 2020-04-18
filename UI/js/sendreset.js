var ResetPassWordLink = document.querySelector('#reset-password-link');
var getEmailFromStorage = localStorage.getItem('reset-email');
if ((getEmailFromStorage === null
    || getEmailFromStorage === undefined
    || getEmailFromStorage === 'undefined'
    || getEmailFromStorage === 'null')) {
    window.location.replace('index.html');
}
var retrieveFromLocalStorage = function (item) {
    var ItemFromStorage = localStorage.getItem("" + item);
    return JSON.parse(ItemFromStorage);
};
var resetLink = function (_a) {
    var email = _a.email;
    var endpoint = "http://localhost:3300/api/v1/reset?email=" + email;
    var fetchRequest = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint, fetchRequest)
        .then(function (res) { return res.json(); })
        .then(function (response) {
        Render.hideAsyncNotification('async-loading');
        if (response.error) {
            Render.blockNotification('error', response.error.message, 'notification');
            return response.error;
        }
        if (response.data) {
            console.log(response.data);
            Render.blockNotification('success', response.data.message, 'notification');
            return response.data;
        }
    })["catch"](function (err) {
        Render.hideAsyncNotification('async-loading');
        Render.blockNotification('error', 'Internet error occured. please try again', 'notification');
        console.log(err);
    });
};
ResetPassWordLink.addEventListener('click', function () {
    var payload = {
        email: String(retrieveFromLocalStorage('reset-email')).toLowerCase()
    };
    Render.blockAsyncNotification('async-loading');
    resetLink(payload);
    Helpers.removelocalStorage('reset-email');
});
//# sourceMappingURL=sendreset.js.map