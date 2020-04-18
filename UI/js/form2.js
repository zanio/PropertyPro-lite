var getUser = localStorage.getItem('user');
var page_1 = localStorage.getItem('page_1');
var goBack = document.querySelector('#back');
var propertySubmit = document.querySelector('#property-submit');
if ((getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null')) {
    window.location.replace('signup.html');
}
if ((page_1 === null
    || page_1 === undefined
    || page_1 === 'undefined'
    || page_1 === 'null')) {
    window.location.replace('form1.html');
}
var createAd = function (payload) {
    var endpoint = 'http://127.0.0.1:3300/api/v1/property';
    var getUserInfo = JSON.parse(getUser);
    var fetchRequest = {
        method: 'POST',
        body: payload,
        headers: { Authorization: "" + getUserInfo.token }
    };
    fetch(endpoint, fetchRequest)
        .then(function (res) { return res.json(); })
        .then(function (response) {
        Render.hideAsyncNotification('async-loading');
        if (response.error) {
            Render.blockStickyNotification('error', response.error);
            return;
        }
        window.location.replace('form3.html');
    })["catch"](function (err) {
        Render.hideAsyncNotification('async-loading');
        Render.blockNotification('Internet error occured. please try again', 'notification');
        console.log(err);
    });
};
window.addEventListener('load', function () {
    goBack.addEventListener('click', function () {
        location.replace('form1.html');
    });
    var parsePg = JSON.parse(page_1);
    propertySubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        var amount = propertySubmit.amount.value.trim();
        var phone_number = propertySubmit.phone_number.value.trim();
        var proof = propertySubmit.proof.value.trim();
        var sidenote = propertySubmit.sidenote.value.trim();
        var file = propertySubmit.image_url.files[0];
        var files = propertySubmit.images_url.files;
        if (!amount || amount === '') {
            Render.blockStickyNotification('error', 'Please Type in an Amount of the property');
            return;
        }
        if (!Helpers.float(amount)) {
            Render.blockStickyNotification('error', 'Price of property can only be float digits');
            return;
        }
        if (!Helpers.isValidDigits(phone_number) || !Helpers.phoneNumber(phone_number)) {
            Render.blockStickyNotification('error', 'Phone Number is required and should only be 11 digits');
            return;
        }
        if (sidenote && sidenote.length < 5) {
            Render.blockStickyNotification('error', 'Please type in a sidenote greater than 5 characters');
            return;
        }
        if (file === undefined) {
            Render.blockStickyNotification('error', 'Please upload a thumnail image to be used in displaying your ads.');
            return;
        }
        var formdata = new FormData();
        Helpers.formatMoney(amount);
        formdata.append('price', amount);
        formdata.append('city', parsePg.lga);
        formdata.append('state', parsePg.state);
        formdata.append('property_name', parsePg['property-name'].trim());
        formdata.append('property_description', parsePg['property-description'].trim());
        formdata.append('type', parsePg['property-type']);
        formdata.append('address', parsePg['property-address'].trim());
        formdata.append('phone_number', phone_number);
        formdata.append('proof', proof);
        formdata.append('note', sidenote);
        formdata.append('image_url', file);
        for (var i = 0; i < files.length; i += 1) {
            formdata.append('images_url', files[i]);
        }
        Render.blockAsyncNotification('async-loading');
        createAd(formdata);
    });
});
//# sourceMappingURL=form2.js.map