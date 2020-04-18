var token = location.search ? location.search.split('?')[1].split('&email=')[0].substring(3) : null;
var email = location.search ? location.search.split('?')[1].split('&email=')[1] : null;
if ((token === null
    || token === undefined
    || token === 'undefined'
    || token === 'null')) {
    window.location.replace('index.html');
}
window.addEventListener('load', function () {
    console.log(token, email);
});
//# sourceMappingURL=checktoken.js.map