var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Render = (function () {
    function Render() {
    }
    Render.renderContainer = function (containerId, content) {
        var container = document.querySelector("#" + containerId);
        container.innerHTML = content;
    };
    Render.renderContainerClass = function (containerCls, content) {
        try {
            var container = document.querySelector("." + containerCls);
            container.innerHTML = content;
        }
        catch (err) {
            console.log('error displaying the div');
        }
    };
    Render.injectSingleImage = function (ImageUrl) {
        try {
            var imageHolder = document.querySelector('.item-image-main');
            var imgElement = "<img class=\"\" src=\"" + ImageUrl + "\" />";
            imageHolder.innerHTML = imgElement;
        }
        catch (ex) {
            console.log('the image with id was not found');
        }
    };
    Render.multiplyDomQuery = function (cls) {
        var allDom = document.querySelectorAll("." + cls) ? document.querySelectorAll("." + cls) : 'error';
        console.log(allDom);
        var actionclasses = [];
        for (var i = 0; i < allDom.length; i += 1) {
            actionclasses.push(allDom[i]);
        }
        console.log(actionclasses);
        return actionclasses;
    };
    Render.injectManyImage = function (arrayImage) {
        try {
            var imgElementObj_1 = {};
            arrayImage.map(function (el, i) {
                imgElementObj_1[i] = "<img  class=\"dashboard-img-res\" src=\"" + el + "\" />";
                return imgElementObj_1;
            });
            var imgElement = Object.values(imgElementObj_1);
            var domImageHolders_1 = document.querySelectorAll('.item-image-main');
            imgElement.map(function (el, i) {
                domImageHolders_1[i].innerHTML = el;
                return domImageHolders_1;
            });
        }
        catch (ex) {
            console.log('Multiple images can not be appended');
        }
    };
    Render.blockNotification = function (type, word, id) {
        if (type === void 0) { type = 'normal'; }
        try {
            var notificationContainer_1 = document.querySelector("#" + id);
            var Textcolor = void 0;
            var border = void 0;
            switch (type) {
                case 'success':
                    Textcolor = 'color-success';
                    border = 'bd-success';
                    break;
                case 'error':
                    Textcolor = 'color-red';
                    border = 'bd-red';
                    break;
                default:
                    Textcolor = 'color-black';
                    border = 'bd-black';
            }
            notificationContainer_1.innerHTML = "<p class=\"slide-right inline-block\n         " + Textcolor + " " + border + " mb-1 mt-2 bold text-center font-weight\n         pl-1 pr-1 pt-1 pb-1\">" + word + "</p>";
            notificationContainer_1.className = 'block';
            setTimeout(function () {
                notificationContainer_1.className = notificationContainer_1.className.replace('block', '');
                notificationContainer_1.innerHTML = '';
            }, 5000);
        }
        catch (ex) {
            console.log('the id of notification was not found');
        }
    };
    Render.blockAsyncNotification = function (id) {
        try {
            var asyncNotificationContainer = document.querySelector("#" + id);
            if (asyncNotificationContainer.classList.contains('hide')) {
                asyncNotificationContainer.classList.remove('hide');
                asyncNotificationContainer.classList.add('block');
            }
        }
        catch (ex) {
            console.log('The image with id was not found');
        }
    };
    Render.hideAsyncNotification = function (id) {
        try {
            var asyncNotificationContainer_1 = document.querySelector("#" + id);
            asyncNotificationContainer_1.className = 'hide';
            setTimeout(function () {
                asyncNotificationContainer_1.className = '';
            }, 300);
        }
        catch (ex) {
            console.log('Error removing async notification');
        }
    };
    Render.blockStickyNotification = function (type, message) {
        var _this = this;
        if (type === void 0) { type = 'normal'; }
        if (message === void 0) { message = 'no message specified'; }
        try {
            var stickyNotificationContainer = document.querySelector('#slide-notification');
            var spanColor = void 0;
            var divBorder = void 0;
            switch (type) {
                case 'error':
                    spanColor = 'color-red';
                    divBorder = 'bd-red';
                    break;
                case 'success':
                    spanColor = 'color-success';
                    divBorder = 'bd-success';
                    break;
                default:
                    spanColor = 'color-black';
                    divBorder = 'bd-black';
            }
            stickyNotificationContainer.innerHTML = "\n      <div class= \"slide-right mb-2 mt-2 pt-1 pr-1 pb-1 pl-1 note " + divBorder + "\"><span class=" + spanColor + ">" + message + "</span>\n        <i id=\"close\" class=\"far float-right ft-2 fa-times-circle " + spanColor + "\"></i>\n      </div>\n        ";
            stickyNotificationContainer.classList.add('block');
            var closeBtn = document.querySelector('#close');
            closeBtn.addEventListener('click', function () {
                _this.hideStickyNotification();
            });
        }
        catch (ex) {
            console.log(ex);
        }
    };
    Render.hideStickyNotification = function () {
        try {
            var stickyNotificationContainer_1 = document.querySelector('#slide-notification');
            stickyNotificationContainer_1.classList.remove('block');
            stickyNotificationContainer_1.classList.add('hide');
            setTimeout(function () {
                stickyNotificationContainer_1.classList.remove('hide');
                stickyNotificationContainer_1.classList.remove('block');
            }, 1200);
        }
        catch (ex) {
            console.log('Error removing sticky notification');
        }
    };
    Render.pageLoading = function (loading) {
        try {
            var pageLoadingContainer = document.querySelector('#page-loading');
            if (loading === true) {
                pageLoadingContainer.className = '';
            }
            else {
                pageLoadingContainer.className = 'hide';
            }
        }
        catch (ex) {
            console.log('Error removing async notification');
        }
    };
    return Render;
}());
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.formatMoney = function (money) {
        var newWord = '';
        var prefix = '';
        for (var i = money.length - 1; i >= 0; i -= 1) {
            prefix = "" + money.charAt(i) + prefix;
            if (prefix.length === 3) {
                newWord = "," + prefix + newWord;
                prefix = '';
            }
        }
        newWord = "" + prefix + newWord;
        if (newWord.charAt(0) === ',') {
            newWord = newWord.substring(1, newWord.length);
        }
        return newWord;
    };
    Helpers.isEmail = function (email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    };
    Helpers.capitalizeWords = function (word) {
        return word.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    Helpers.float = function (amount) {
        var regex = /^[+-]?\d+(\.\d+)?$/;
        return regex.test(amount);
    };
    Helpers.phoneNumber = function (no) {
        var regex = no.length === 11;
        return regex;
    };
    Helpers.serialize = function (obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    };
    Helpers.isValidDigits = function (num) {
        var isNum = /^\d+$/;
        return isNum.test(num);
    };
    Helpers.removelocalStorage = function (item, page) {
        localStorage.removeItem("" + item);
        page ? window.location.replace(page + ".html") : null;
    };
    Helpers.getFirstN = function (array, startN, endN) {
        var arr = array.slice(startN, endN);
        return arr;
    };
    Helpers.iterateItem = function (array, html) {
        var content;
        var result = array.map(function (el) {
            content = html(el);
            return content;
        });
        return result.join(' ');
    };
    Helpers.loopImage = function (array) {
        var image = [];
        var result = array.map(function (el) {
            image.push(el.image_url);
            return image;
        });
        return image;
    };
    Helpers.insertBackdrop = function (type) {
        if (type === void 0) { type = 'normal'; }
        var backdropBg;
        switch (type) {
            case 'async':
                backdropBg = 'backdrop-async';
                break;
            default:
                backdropBg = 'backdrop';
        }
        document.querySelector('body').insertAdjacentHTML('beforeend', "<div  class=\"" + backdropBg + " message\"></div>");
    };
    Helpers.removeElement = function (ele) {
        var elem = document.querySelector("." + ele);
        return elem.parentNode.removeChild(elem);
    };
    Helpers.removeBackDrop = function () {
        var backdrop = 'backdrop';
        return this.removeElement(backdrop);
    };
    Helpers.delayedRoute = function (n, url) {
        if (n === void 0) { n = 5000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (done) {
                            setTimeout(function () {
                                window.location.replace(url);
                            }, n);
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Helpers;
}());
var pageHeight = 0;
(function () {
    function findHighestNode(nodesList) {
        for (var i = nodesList.length - 1; i >= 0; i -= 1) {
            if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
                var elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
                pageHeight = Math.max(elHeight, pageHeight);
            }
            if (nodesList[i].childNodes.length)
                findHighestNode(nodesList[i].childNodes);
        }
    }
    findHighestNode(document.documentElement.childNodes);
}());
window.addEventListener('scroll', function () {
    var navBar = document.querySelector('.navbar');
    if (pageYOffset > 300) {
        navBar.classList.add('sticky');
    }
    else {
        navBar.classList.remove('sticky');
    }
});
window.addEventListener('load', function () {
    var menuToggle = document.querySelector('.bars');
    menuToggle.addEventListener('click', function () {
        document.querySelector('.mobile').style.display = 'block';
        Helpers.insertBackdrop();
        document.querySelector('.backdrop').addEventListener('click', function () {
            this.style.display = 'none';
            document.querySelector('.mobile').style.display = 'none';
            this.parentNode.removeChild(this);
        });
    });
});
try {
    Render.renderContainer('insertFooter', footer);
}
catch (ex) {
    console.log('footer-container not found');
}
//# sourceMappingURL=index.js.map