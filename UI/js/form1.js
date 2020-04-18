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
var page_1 = localStorage.getItem('page_1');
var chooseState = document.querySelector('#choose-state');
var chooseLga = document.querySelector('#choose-lga');
var propertyType = document.querySelector('#type-of-property');
var propertyName = document.querySelector('#property-name');
var propertyAddress = document.querySelector('#property-address');
var propertyDescription = document.querySelector('#property-description');
var continueAdBtn = document.querySelector('#next-1');
if ((getUser === null
    || getUser === undefined
    || getUser === 'undefined'
    || getUser === 'null')) {
    window.location.replace('signup.html');
}
var preserveState = function () {
    var data = JSON.parse(page_1);
    chooseState.value = data.state;
    chooseLga.value = data.lga;
    propertyType.value = data['property-type'];
    propertyName.value = data['property-name'];
    propertyAddress.value = data['property-address'];
    propertyDescription.value = data['property-description'];
};
if (!(page_1 === null
    || page_1 === undefined
    || page_1 === 'undefined'
    || page_1 === 'null')) {
    preserveState();
}
var fetchStates = function () { return __awaiter(_this, void 0, void 0, function () {
    var endpoint, states, statesJson, allStates, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = 'https://locationsng-api.herokuapp.com/api/v1/states';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, fetch(endpoint)];
            case 2:
                states = _a.sent();
                return [4, states.json()];
            case 3:
                statesJson = _a.sent();
                allStates = statesJson.map(function (response) { return "<option value=\"" + response.name + "\">" + response.name + " - " + response.capital + "</option>"; }).join('');
                chooseState.insertAdjacentHTML('beforeend', allStates);
                return [3, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
var fetchLga = function (state) { return __awaiter(_this, void 0, void 0, function () {
    var endpoint, lga, lgaJson, LGA, allLga, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = 'https://locationsng-api.herokuapp.com/api/v1/lgas';
                chooseLga.innerHTML = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, fetch(endpoint)];
            case 2:
                lga = _a.sent();
                return [4, lga.json()];
            case 3:
                lgaJson = _a.sent();
                LGA = lgaJson.filter(function (p) { return p.state === state; })[0].lgas;
                allLga = LGA.map(function (response) { return "<option value=\"" + response + "\">" + response + "</option>"; }).join('');
                chooseLga.insertAdjacentHTML('beforeend', allLga);
                return [3, 5];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
var continueAd = function (data) {
    if (!data['property-type'] || data['property-type'] === 'choose type') {
        Render.blockStickyNotification('error', 'Please select a property type');
        return;
    }
    if (!data['property-name'] || data['property-name'].length <= 5) {
        Render.blockStickyNotification('error', 'Please enter a property name of length greater than 5');
        return;
    }
    if (!data.state || data.state === 'choose state') {
        Render.blockStickyNotification('error', 'Please select a state');
        return;
    }
    if (!data.lga || data.lga === '') {
        Render.blockStickyNotification('error', 'Please select an LGA');
        return;
    }
    if (!data['property-address'] || data['property-address'].length <= 3) {
        Render.blockStickyNotification('error', 'Please type in an address of at least 3 chracters an above');
        return;
    }
    localStorage.setItem('page_1', JSON.stringify(data));
    location.replace('form2.html');
};
window.addEventListener('load', function () {
    fetchStates();
    var page_1 = {};
    var state = {};
    chooseState.addEventListener('change', function () {
        if (chooseState.value !== 'choose state') {
            state.state = chooseState.value;
            fetchLga(state.state);
            page_1.state = state.state;
        }
    });
    propertyAddress.addEventListener('keyup', function () {
        page_1['property-address'] = propertyAddress.value;
    });
    propertyDescription.addEventListener('keyup', function () {
        page_1['property-description'] = propertyDescription.value;
    });
    propertyType.addEventListener('change', function () {
        if (propertyType.value !== 'choose type') {
            page_1['property-type'] = propertyType.value;
        }
    });
    propertyName.addEventListener('keyup', function () {
        page_1['property-name'] = propertyName.value;
    });
    chooseLga.addEventListener('change', function () {
        if (chooseLga.value !== '') {
            page_1.lga = chooseLga.value;
        }
    });
    continueAdBtn.addEventListener('click', function () {
        page_1['property-type'] = page_1['property-type'] || propertyType.value;
        page_1['property-name'] = page_1['property-name'] || propertyName.value;
        page_1.lga = page_1.lga || chooseLga.value;
        page_1['property-address'] = page_1['property-address'] || propertyAddress.value;
        page_1['property-description'] = page_1['property-description'] || propertyDescription.value;
        continueAd(page_1);
    });
});
//# sourceMappingURL=form1.js.map