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
var _this = this;
var getUser = localStorage.getItem('user');
var displayUserDetails = document.querySelector('#user-info');
var AllDeleteBtn;
if ((getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null')) {
    window.location.replace('signup.html');
}
var fetchUserAdverts = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, getUserInfo, endpoint, fetchRequest, fetchAds, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getUserInfo = JSON.parse(getUser);
                endpoint = 'http://127.0.0.1:3300/api/v1/property/user';
                fetchRequest = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "" + getUserInfo.token
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, fetch(endpoint, fetchRequest)];
            case 2:
                fetchAds = _a.sent();
                return [4, fetchAds.json()];
            case 3:
                response = _a.sent();
                Render.hideAsyncNotification('async-loading');
                data = response.data;
                if (response.error) {
                    Render.blockStickyNotification('error', response.error);
                    return [2];
                }
                return [3, 5];
            case 4:
                err_1 = _a.sent();
                Render.hideAsyncNotification('async-loading');
                Render.blockNotification('error', 'Internet error occured. please try again', 'notification');
                console.log(err_1);
                return [3, 5];
            case 5: return [2, data];
        }
    });
}); };
var fetchDeleteAdvert = function (propertyId) { return __awaiter(_this, void 0, void 0, function () {
    var data, getUserInfo, endpoint, fetchRequest, fetchAds, response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getUserInfo = JSON.parse(getUser);
                endpoint = "http://127.0.0.1:3300/api/v1/property/" + propertyId;
                fetchRequest = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "" + getUserInfo.token
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, fetch(endpoint, fetchRequest)];
            case 2:
                fetchAds = _a.sent();
                return [4, fetchAds.json()];
            case 3:
                response = _a.sent();
                Render.hideAsyncNotification('async-loading');
                data = response.data;
                if (response.error) {
                    Render.blockStickyNotification('error', response.error);
                    return [2];
                }
                return [3, 5];
            case 4:
                err_2 = _a.sent();
                Render.hideAsyncNotification('async-loading');
                Render.blockNotification('Internet error occured. please try again', 'notification');
                console.log(err_2);
                return [3, 5];
            case 5: return [2, data.message];
        }
    });
}); };
var fetchMarkStatus = function (propertyId, status) { return __awaiter(_this, void 0, void 0, function () {
    var data, getUserInfo, endpoint, fetchRequest, fetchAds, response, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getUserInfo = JSON.parse(getUser);
                endpoint = "http://127.0.0.1:3300/api/v1/property/" + propertyId + "/sold";
                fetchRequest = {
                    method: 'PATCH',
                    body: JSON.stringify(status),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "" + getUserInfo.token
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, fetch(endpoint, fetchRequest)];
            case 2:
                fetchAds = _a.sent();
                return [4, fetchAds.json()];
            case 3:
                response = _a.sent();
                Render.hideAsyncNotification('async-loading');
                data = response.data;
                if (response.error) {
                    Render.blockStickyNotification('error', response.error);
                    return [2];
                }
                return [3, 5];
            case 4:
                err_3 = _a.sent();
                Render.hideAsyncNotification('async-loading');
                Render.blockNotification('Internet error occured. please try again', 'notification');
                console.log(err_3);
                return [3, 5];
            case 5: return [2, data.status];
        }
    });
}); };
var DeleteProcess = function (domElement, i) {
    domElement[i].addEventListener('click', function (e) {
        var get_text_id = document.querySelector('.get_id').textContent;
        var get_id = get_text_id.split(' ')[2].trim();
        Helpers.insertBackdrop();
        var message = document.querySelector('.message');
        message.innerHTML = deleteMessage;
        var modalBtn = document.querySelector('#modal');
        var cancelBtn = document.querySelector('#cancel');
        modalBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Render.blockAsyncNotification('async-loading');
                        return [4, fetchDeleteAdvert(get_id)];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        Helpers.removeBackDrop();
                        Render.blockNotification('success', "" + response, 'notification');
                        setTimeout(function () {
                            location.href = 'dashboard.html';
                        }, 3000);
                        return [2];
                }
            });
        }); });
        cancelBtn.addEventListener('click', function () {
            Helpers.removeBackDrop();
        });
    });
};
var StatusEvent = function (changeStatus, get_id) {
    var statusObject = {};
    changeStatus.addEventListener('change', function () {
        statusObject.status = changeStatus.value;
        var statusBody = statusObject || 'empty object';
        var modalBtn = document.querySelector('#modal-update');
        modalBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Render.blockAsyncNotification('async-loading');
                        return [4, fetchMarkStatus(get_id, statusBody)];
                    case 1:
                        response = _a.sent();
                        Helpers.removeBackDrop();
                        Render.blockNotification('success', "Your advert has been successful marked as " + response, 'notification');
                        return [2];
                }
            });
        }); });
    });
};
var ps = function (_a) {
    var res = _a.res;
};
var UpdateProcess = function (domElement, i) {
    domElement[i].addEventListener('click', function () {
        var get_text_id = document.querySelector('.get_id').textContent;
        var get_id = get_text_id.split(' ')[2].trim();
        Helpers.insertBackdrop('normal');
        var message = document.querySelector('.message');
        message.innerHTML = updateMessage;
        var changeStatus = document.querySelector('#select_options');
        StatusEvent(changeStatus, get_id);
        var cancelBtn = document.querySelector('#cancel');
        cancelBtn.addEventListener('click', function () {
            Helpers.removeBackDrop();
        });
    });
};
var DisplayUserAdverts = function (data) {
    var html_1 = Helpers.iterateItem(data, user_ads);
    Render.renderContainer('user_ads', html_1);
};
var ProcessAdvertList = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetchUserAdverts()];
            case 1:
                data = _a.sent();
                if (data.length <= 1) {
                    window.location.replace('no-advert.html');
                }
                data.pop();
                data.reverse();
                DisplayUserAdverts(data);
                AllDeleteBtn = document.querySelectorAll('.delete');
                AllUpdateBtn = document.querySelectorAll('.mark-advert');
                for (i = 0; i < AllDeleteBtn.length; i += 1) {
                    DeleteProcess(AllDeleteBtn, i);
                    UpdateProcess(AllUpdateBtn, i);
                }
                return [2];
        }
    });
}); };
window.addEventListener('load', function () {
    var getUserInfo = JSON.parse(getUser);
    var name = getUserInfo.first_name + " " + getUserInfo.last_name;
    displayUserDetails.innerHTML = "\n    Welcome <span  class=\"-light-blue\">" + name + "</span>, Here are your recent advert.";
    Render.blockAsyncNotification('async-loading');
    ProcessAdvertList();
});
//# sourceMappingURL=dashboard.js.map