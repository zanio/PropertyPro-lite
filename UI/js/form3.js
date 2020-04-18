var getUser = localStorage.getItem('user');
var page_1 = localStorage.getItem('page_1');
var goBack = document.querySelector('#back');
var propertySubmit = document.querySelector('#property-submit');
var formDashboard = document.querySelector('#form-dashboard');
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
window.addEventListener('load', function () {
    formDashboard.addEventListener('click', function () {
        Helpers.removelocalStorage('page_1', 'dashboard');
    });
});
//# sourceMappingURL=form3.js.map