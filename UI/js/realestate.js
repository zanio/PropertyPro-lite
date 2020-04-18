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
var AllAdsFetch = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, endpoint, fetchRequest, fetchAds, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = 'http://127.0.0.1:3300/api/v1/property/search?type=Real-estate';
                fetchRequest = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
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
                data = response.data ? response.data : { status: response.status, message: response.error };
                if (response.error) {
                    Render.blockStickyNotification('success', response.error);
                    return [2, data];
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
var DisplayAllAdverts = function (data) {
    var html_1 = Helpers.iterateItem(data, advertCard);
    Render.renderContainer('all_ads', html_1);
    var arrayImage = Helpers.loopImage(data);
    Render.injectManyImage(arrayImage);
};
var ProcessAds = function () { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, AllAdsFetch()];
            case 1:
                data = _a.sent();
                try {
                    if (data.message) {
                        Render.blockNotification('success', 'no advert to display', 'notification');
                        return [2];
                    }
                    if (data.length >= 1) {
                        data.reverse();
                        DisplayAllAdverts(data);
                    }
                }
                catch (err) {
                    Render.blockNotification('error', err, 'notification');
                }
                return [2];
        }
    });
}); };
window.addEventListener('load', function () {
    Render.blockAsyncNotification('async-loading');
    ProcessAds();
});
//# sourceMappingURL=realestate.js.map