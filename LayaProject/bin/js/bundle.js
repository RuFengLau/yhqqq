(function () {
    'use strict';

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedauto";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    class PlatformConfig {
        constructor() {
            this.platforms = [];
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new PlatformConfig();
            }
            return this._inst;
        }
        get PlatfromConfig() { return "localRes/data/platformConfigs.json"; }
        init(platform) {
            this.data = Laya.loader.getRes(PlatformConfig.inst.PlatfromConfig);
            this.platforms = this.data["Platforms"];
            this.currentPlatform = this.platforms[platform];
            GameEngine.inst.debug(`平台信息:${JSON.stringify(this.currentPlatform)}`);
        }
        get globalConfigs() {
            return this.data["GlobalConfigs"];
        }
        get switches() {
            return this.currentPlatform.switches;
        }
        useFreeCoinBtn() {
            if (this.currentPlatform.switches) {
                if (typeof this.currentPlatform.switches.useGetFreeCoinBtn !== "undefined") {
                    return this.currentPlatform.switches.useGetFreeCoinBtn;
                }
            }
            return true;
        }
        useLotteryShareBtn() {
            if (this.currentPlatform.switches) {
                if (typeof this.currentPlatform.switches.useLotteryShareBtn !== "undefined") {
                    return this.currentPlatform.switches.useLotteryShareBtn;
                }
            }
            return false;
        }
        getBannerAdData(key) {
            for (let index = 0; index < this.currentPlatform.bannerAdList.length; index++) {
                let d = this.currentPlatform.bannerAdList[index];
                if (d.key == key) {
                    return d;
                }
            }
            return null;
        }
        getVideoAdData(key) {
            for (let index = 0; index < this.currentPlatform.videoAdList.length; index++) {
                let d = this.currentPlatform.videoAdList[index];
                if (d.key == key) {
                    return d;
                }
            }
            return null;
        }
        getNativeAdData(key) {
            for (let index = 0; index < this.currentPlatform.nativeAdList.length; index++) {
                let d = this.currentPlatform.nativeAdList[index];
                if (d.key == key) {
                    return d;
                }
            }
            return null;
        }
        getNativeIconAdData(key) {
            for (let index = 0; index < this.currentPlatform.nativeIconAdList.length; index++) {
                let d = this.currentPlatform.nativeIconAdList[index];
                if (d.key == key) {
                    return d;
                }
            }
            return null;
        }
        isReview() {
            if (Platforms.inst.platform == Platform.game_app) {
                return Platforms.inst.isVertify();
            }
            else {
                if (this.currentPlatform.switches) {
                    if (typeof this.currentPlatform.switches.review !== "undefined") {
                        return this.currentPlatform.switches.review;
                    }
                }
            }
            return false;
        }
    }

    class EventManager {
        constructor() {
            this.eventDispatcher = new Laya.EventDispatcher();
        }
        static get inst() {
            if (EventManager.instance == null) {
                EventManager.instance = new EventManager();
            }
            return EventManager.instance;
        }
        SendEvent(type, arg = null) {
            this.eventDispatcher.event(type, arg);
        }
        AddEventListener(type, caller, listener, arg) {
            this.eventDispatcher.on(type, caller, listener, arg);
        }
        RemoveEventListener(type, caller, listener) {
            this.eventDispatcher.off(type, caller, listener);
        }
        RemoveEventListenerWithCaller(caller) {
            this.eventDispatcher.offAllCaller(caller);
        }
    }

    class PlatformEvents {
    }
    PlatformEvents.ON_BANNER_SUCCESS_EVENT = "onBannerSuccess";
    PlatformEvents.ON_BANNER_FAIL_EVENT = "onBannerFail";
    PlatformEvents.ON_NATIVE_AD_READY_EVENT = "onNativeAdReady";
    PlatformEvents.ON_INSERT_AD_ERROR_EVENT = "onInsertAdError";
    PlatformEvents.ON_INSERT_AD_CLOSE_EVENT = "onInsertAdClose";
    PlatformEvents.onShortCutInstallEvent = "onShortCutInstallEvent";
    PlatformEvents.ON_SHOW = "onShow";
    PlatformEvents.ON_HIDE = "onHide";

    class MathHelper {
        static getRoundPoint(center, count, r) {
            let results = new Array();
            let perAngle = 360 / count * MathHelper.Deg2Rad;
            for (let i = 0; i < count; i++) {
                results.push(new Laya.Point(Math.sin(perAngle * i) * r + center.x, Math.cos(perAngle * i) * r + center.y));
            }
            return results;
        }
        static getAngleSpace(a, b) {
            let s = Math.abs(a - b);
            if (s < 180) {
                return s;
            }
            else {
                return (a + b + 360) % 360;
            }
        }
        static onUnitSphere(radius) {
            var p1 = this.random(-radius, radius);
            var p2 = this.random(-radius, radius);
            var p3 = this.random(-radius, radius);
            var v3 = new Laya.Vector3(p1, p2, p3);
            Laya.Vector3.scale(v3, radius, v3);
            return v3;
        }
        static randomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
        static randomTotal2N(total, n) {
            var aryRet = [];
            var fSumTmp = n;
            var iAcc = 0;
            for (var i = 0; i < (total - 1); i++) {
                var iTmp = Math.ceil(Math.random() * (fSumTmp / 2));
                aryRet.push(iTmp);
                fSumTmp -= iTmp;
                iAcc += iTmp;
            }
            aryRet.push(n - iAcc);
            return aryRet;
        }
        static getRandomSequence(total, n) {
            let sequence = [total];
            let output = [n];
            for (let i = 0; i < total; i++) {
                sequence[i] = i;
            }
            let end = total - 1;
            for (let i = 0; i < n; i++) {
                let num = this.random(0, end);
                output[i] = sequence[num];
                sequence[num] = sequence[end];
                end--;
            }
            return output;
        }
        static random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        static randomValue(arr) {
            let len = arr.length;
            let index = (len * Math.random()) >> 0;
            if (index < len) {
                return arr[index];
            }
            return null;
        }
        static randRate(rate, total) {
            let r = this.random(1, total);
            let t = 0;
            for (let i = 0; i < rate.length; i++) {
                t += rate[i];
                if (r < t) {
                    return i;
                }
            }
            return 0;
        }
        static clampAngle(angle, min, max) {
            if (angle < min) {
                angle = min;
            }
            else if (angle > max) {
                angle = max;
            }
            return angle;
        }
        static clamp(value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        }
        static repeat(t, length) {
            return this.clamp(t - Math.floor(t / length) * length, 0.0, length);
        }
        static pingPong(t, length) {
            t = this.repeat(t, length * 2);
            return length - Math.abs(t - length);
        }
        static Approximately(a, b) {
            return Laya.MathUtils3D.nearEqual(a, b);
        }
        static number2BigNumber(n, maxLen = 4) {
            let outNum;
            let k = 1000;
            let base = k;
            let pow = 0;
            for (pow = 0;; pow++) {
                if (n < base) {
                    break;
                }
                base *= k;
            }
            let unit = "";
            if (pow < 5) {
                unit = pow == 0 ? "" : (pow == 1 ? "K" : (pow == 2 ? "M" : (pow == 3 ? "B" : "T")));
            }
            else {
                let l_a = 97;
                let l_A = 65;
                let div = Math.floor((pow - 5) / 26);
                let mod = (pow - 5) % 26;
                unit = div == 0 ? String.fromCharCode(l_a + mod, l_a + mod) : (div == 1 ? String.fromCharCode(l_A + mod, l_a + mod) : String.fromCharCode(l_A + mod, l_A + mod));
            }
            outNum = String(n / (base * 0.001));
            return "." == (outNum = outNum.substr(0, maxLen)).charAt(outNum.length - 1) ? outNum.replace(".", unit) : outNum + unit;
        }
        static SumString(a, b) {
            a = a.split('');
            b = b.split('');
            var jinwei = 0, result = '';
            while (a.length || b.length || jinwei) {
                var temp = parseInt(a.pop() || 0) + parseInt(b.pop() || 0) + jinwei;
                result = temp % 10 + result;
                jinwei = Math.floor(temp / 10);
            }
            return result;
        }
        static SubString(a, b) {
            a = a.split('');
            b = b.split('');
            var aMaxb = a.length > b.length;
            if (a.length == b.length) {
                for (var i = 0, len = a.length; i < len; i++) {
                    if (a[i] == b[i])
                        continue;
                    aMaxb = a[i] > b[i];
                    break;
                }
            }
            if (!aMaxb)
                a = [b, b = a][0];
            var result = '';
            while (a.length) {
                var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
                if (temp >= 0)
                    result = temp + result;
                else {
                    result = temp + 10 + result;
                    a[a.length - 1]--;
                }
            }
            result = (aMaxb ? '' : '-') + result.replace(/^0*/g, '');
            if (result == "-") {
                result = "0";
            }
            return result;
        }
        static CompareString(a, b) {
            let result = this.SubString(a, b);
            if (result == "0") {
                return 0;
            }
            else if (result.indexOf("-") == 0) {
                return -1;
            }
            else {
                return 1;
            }
        }
        static newGuid() {
            return 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        static countDay(newDate, oldDate) {
            let s1 = new Date(newDate);
            let s2 = new Date(oldDate);
            var days = s1.getTime() - s2.getTime();
            var time = days / (1000 * 60 * 60 * 24);
            return time;
        }
        static CompareVersion(v1, v2) {
            var arr1 = v1.split('.');
            var arr2 = v2.split('.');
            var len = Math.max(arr1.length, arr2.length);
            while (arr1.length < len) {
                arr1.push('0');
            }
            while (arr2.length < len) {
                arr2.push('0');
            }
            for (var i = 0; i < len; i++) {
                var num1 = parseInt(arr1[i]);
                var num2 = parseInt(arr2[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
        static lerp(numStart, numEnd, t) {
            if (t > 1) {
                t = 1;
            }
            else if (t < 0) {
                t = 0;
            }
            return numStart * (1 - t) + (numEnd * t);
        }
        static lerpAngle(current, target, t) {
            current %= 360;
            target %= 360;
            var dAngle = target - current;
            if (dAngle > 180) {
                target = current - (360 - dAngle);
            }
            else if (dAngle < -180) {
                target = current + (360 + dAngle);
            }
            return (this.lerp(current, target, t) % 360 + 360) % 360;
        }
        static angleTowards(current, target, speed) {
            current %= 360;
            target %= 360;
            var dAngle = target - current;
            if (dAngle > 180) {
                target = current - (360 - dAngle);
            }
            else if (dAngle < -180) {
                target = current + (360 + dAngle);
            }
            var dir = target - current;
            if (speed > Math.abs(dir)) {
                return target;
            }
            return ((current + speed * this.sign(dir)) % 360 + 360) % 360;
        }
        static sign(x) {
            if (x > 0) {
                return 1;
            }
            if (x < 0) {
                return -1;
            }
            return 0;
        }
        static probability(value) {
            return Math.random() < value;
        }
    }
    MathHelper.Deg2Rad = 0.01745329;
    MathHelper.Rad2Deg = 57.29578;

    class UI_ToastView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameCommandUI", "ToastView"));
        }
        onConstruct() {
            this.m_maskBg = (this.getChildAt(0));
            this.m_n2 = (this.getChildAt(1));
            this.m_title = (this.getChildAt(2));
        }
    }
    UI_ToastView.URL = "ui://9kynrs2zlo4qe";

    class Toast {
        constructor() {
            this.fadeDuration = 0.3;
            this.timer = new Laya.Timer();
        }
        static get inst() {
            if (this.instance == null) {
                this.instance = new Toast();
            }
            return this.instance;
        }
        show(content, mask = false, delay = 2000) {
            if (this.container == null) {
                this.container = fairygui.GRoot.inst;
            }
            if (this.view == null) {
                this.view = UI_ToastView.createInstance();
                this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            }
            this.container.addChild(this.view);
            this.view.alpha = 0;
            this.view.m_title.text = content;
            this.view.m_maskBg.touchable = mask;
            if (this.tweener) {
                this.tweener.clear();
            }
            this.view.visible = true;
            if (content == "") {
                this.view.m_n2.visible = false;
            }
            else {
                this.view.m_n2.visible = true;
            }
            this.tweener = Laya.Tween.to(this.view, { alpha: 1 }, this.fadeDuration * 1000);
            if (delay > 0) {
                this.timer.clear(this, this.hide);
                this.timer.once(delay, this, this.hide);
            }
        }
        hide() {
            this.timer.clear(this, this.hide);
            this.view.alpha = 0;
            this.onHideToastViewComplete();
        }
        toastViewUpdate(tweener) {
            this.view.alpha = tweener.value.x;
        }
        onHideToastViewComplete() {
            this.view.visible = false;
        }
    }

    class TextureScreenData {
        constructor() {
            this.backgroundImage = "";
            this.logo = "";
            this.backgroundColor = "";
            this.duration = 0;
        }
    }

    class SimpleSplashScreen {
        constructor() {
            this.data = [];
            this.queueIndex = 0;
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new SimpleSplashScreen();
            }
            return this._inst;
        }
        setData(data) {
            this.data = data;
            this.loadScreenImages();
        }
        loadScreenImages() {
            var urls = [];
            for (var key in this.data) {
                var item = this.data[key];
                if (item.logo != "") {
                    urls.push({ url: item.logo, type: Laya.Loader.IMAGE });
                }
                if (item.backgroundImage != "") {
                    urls.push({ url: item.backgroundImage, type: Laya.Loader.IMAGE });
                }
            }
            Laya.loader.load(urls, Laya.Handler.create(this, this.loadScreenImagesComplete));
        }
        loadScreenImagesComplete() {
            this.startQueue();
        }
        startQueue() {
            var textrueSplashData = this.data[this.queueIndex];
            var splash = this.createSplashComponent(textrueSplashData);
            let timeLine = new Laya.TimeLine();
            timeLine.addLabel("出现", 0).to(splash, { alpha: 1 }, 500);
            splash.alpha = 0;
            Laya.Tween.to(splash, { alpha: 1 }, 500, Laya.Ease.linearNone);
            fairygui.GTween.to(1, 0, 1).onUpdate((tweener) => {
                splash.alpha = tweener.value.x;
            }, this).onComplete(() => {
                fairygui.GRoot.inst.removeChild(splash, true);
                this.queueIndex++;
                if (this.queueIndex > this.data.length - 1) {
                    EventManager.inst.SendEvent(SimpleSplashScreen.ON_COMPLETE_EVENT);
                    return;
                }
                else {
                    this.startQueue();
                }
            }, this).setDelay(textrueSplashData.duration + 0.5);
        }
        createSplashComponent(splashData) {
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            var splashComponent = new fairygui.GComponent();
            splashComponent.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            var graphy = new fairygui.GGraph();
            graphy.drawRect(0, "0xFFFFFF", splashData.backgroundColor);
            graphy.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            splashComponent.addChild(graphy);
            if (splashData.logo != "") {
                let loader = new fairygui.GLoader();
                loader.verticalAlign = "Middle";
                loader.icon = splashData.logo;
                loader.autoSize = true;
                loader.center(true);
                splashComponent.addChild(loader);
            }
            if (splashData.backgroundImage != "") {
                let loader = new fairygui.GLoader();
                loader.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
                loader.fill = fairygui.LoaderFillType.ScaleNoBorder;
                loader.icon = splashData.backgroundImage;
                loader.verticalAlign = "Middle";
                loader.autoSize = true;
                loader.center(true);
                splashComponent.addChild(loader);
            }
            fairygui.GRoot.inst.addChild(splashComponent);
            return splashComponent;
        }
    }
    SimpleSplashScreen.ON_COMPLETE_EVENT = "onCompleteEvent";

    class ViewController {
        constructor() {
            this.ControllerName = "";
            this.init();
        }
        doScaleIn() {
            this.View.setPivot(0.5, 0.5);
            this.View.setScale(0, 0);
            fairygui.GTween.to(0, 1, 0.35)
                .onUpdate((tweener) => {
                this.View.setScale(tweener.value.x, tweener.value.x);
            }, this);
        }
        removeSelf() {
            UIManager.inst.hidePopupView(this.ControllerName);
        }
        init() {
            this.ControllerName = this.URL;
            this.View = fairygui.UIPackage.createObjectFromURL(this.URL);
            this.View.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            this.View.on(Laya.Event.ADDED, this, this.onViewAddedEvent);
            UIManager.inst.uiViewContainer.addChild(this.View);
        }
        onViewAddedEvent() {
            this.View.off(Laya.Event.ADDED, this, this.onViewAddedEvent);
            Laya.timer.callLater(this, () => {
                if (this.onViewAdded) {
                    this.onViewAdded.run();
                }
            });
        }
        PresentViewController() {
            this.View.displayObject.visible = true;
        }
        DismissViewController(destroy = false) {
            Laya.timer.clearAll(this);
            EventManager.inst.RemoveEventListenerWithCaller(this);
            if (this.onViewWillDestory) {
                this.onViewWillDestory.run();
            }
            if (destroy) {
                this.onViewAdded = null;
                this.onViewWillDestory = null;
                UIManager.inst.uiViewContainer.removeChild(this.View, destroy);
            }
            else {
                this.View.displayObject.visible = false;
            }
        }
    }

    class ViewControllerGeneric extends ViewController {
        get view() {
            return this.View;
        }
    }

    class UI_NativeAdView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "NativeAdView"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
            this.m_TitleLabel = (this.getChildAt(1));
            this.m_n23 = (this.getChildAt(2));
            this.m_n27 = (this.getChildAt(3));
            this.m_ImageLoader = (this.getChildAt(4));
            this.m_n18 = (this.getChildAt(5));
            this.m_n29 = (this.getChildAt(6));
            this.m_DescLabel = (this.getChildAt(7));
            this.m_ClickBtn = (this.getChildAt(8));
            this.m_CloseBtn = (this.getChildAt(9));
            this.m_ConfirmBtn = (this.getChildAt(10));
            this.m_n17 = (this.getChildAt(11));
        }
    }
    UI_NativeAdView.URL = "ui://2lldjolilo4qb";

    class NativeAdViewController extends ViewControllerGeneric {
        get URL() {
            return UI_NativeAdView.URL;
        }
        init() {
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        bind() {
            this.view.m_CloseBtn.onClick(this, () => {
                Platforms.inst.onNativeAdClose();
                this.removeSelf();
            });
            UIManager.inst.topViewContainer.addChild(this.view);
        }
        setData(ad) {
            if (Platforms.inst.platform == Platform.vivo_h5) {
                if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                    this.view.m_ImageLoader.icon = ad.imgUrlList[0];
                }
                else if (ad.icon && ad.icon != "") {
                    this.view.m_ImageLoader.icon = ad.icon;
                }
            }
            else if (Platforms.inst.platform == Platform.oppo_h5) {
                if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                    this.view.m_ImageLoader.icon = ad.imgUrlList[0];
                }
                else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                    this.view.m_ImageLoader.icon = ad.iconUrlList[0];
                }
                else if (ad.icon) {
                    this.view.m_ImageLoader.icon = ad.icon;
                }
            }
            this.view.m_ClickBtn.onClick(this, () => {
                Platforms.inst.onNativeAdClick(ad.adId);
                this.removeSelf();
            });
            this.view.m_ConfirmBtn.onClick(this, () => {
                Platforms.inst.onNativeAdClick(ad.adId);
                this.removeSelf();
            });
        }
        removeSelf() {
            UIManager.inst.topViewContainer.removeChild(this.view);
        }
    }

    class UI_FadeView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameCommandUI", "FadeView"));
        }
        onConstruct() {
            this.m_n2 = (this.getChildAt(0));
            this.m_n0 = (this.getChildAt(1));
            this.m_fadeIn = this.getTransitionAt(0);
            this.m_fadeOut = this.getTransitionAt(1);
        }
    }
    UI_FadeView.URL = "ui://9kynrs2zs24q4w";

    class UIManager {
        constructor() {
            this.views = new Array();
            this.record = [];
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new UIManager();
            }
            return this._inst;
        }
        init() {
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
            this.gameViewContainer = new fairygui.GComponent();
            this.gameViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            this.uiViewContainer = new fairygui.GComponent();
            this.uiViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            this.topViewContainer = new fairygui.GComponent();
            this.topViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            this.fadeViewContainer = new fairygui.GComponent();
            this.fadeViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            fairygui.GRoot.inst.addChild(this.gameViewContainer);
            fairygui.GRoot.inst.addChild(this.uiViewContainer);
            fairygui.GRoot.inst.addChild(this.topViewContainer);
            fairygui.GRoot.inst.addChild(this.fadeViewContainer);
        }
        addFadeView() {
            this.fadeView = fairygui.UIPackage.createObjectFromURL(UI_FadeView.URL);
            this.fadeView.setSize(Laya.stage.width, Laya.stage.height);
            this.fadeViewContainer.addChild(this.fadeView);
            this.fadeView.visible = false;
        }
        doFadeIn(complete) {
            this.fadeView.visible = true;
            this.fadeView.touchable = true;
            this.fadeView.m_fadeIn.play(Laya.Handler.create(this, () => {
                complete && complete.run();
                UIManager.inst.doFadeOut();
            }));
        }
        doFadeOut() {
            this.fadeView.m_fadeOut.play(Laya.Handler.create(this, () => {
                this.fadeView.visible = false;
                this.fadeView.touchable = false;
            }));
        }
        getView(name) {
            for (var i = 0; i < this.views.length; i++) {
                if (name === this.views[i].name) {
                    return this.views[i].viewController;
                }
            }
            return null;
        }
        showPopupView(viewController) {
            this.views.push({ name: viewController.ControllerName, viewController: viewController });
            if (this.checkRecord(viewController.ControllerName)) {
                this.addRecordCount(viewController.ControllerName);
            }
            else {
                this.addRecord(viewController.ControllerName);
            }
        }
        getViewRecordCount(name) {
            for (let index = 0; index < this.record.length; index++) {
                const viewInfo = this.record[index];
                if (viewInfo.name == name) {
                    return viewInfo.count;
                }
            }
            return 0;
        }
        hidePopupView(name) {
            let index = -1;
            for (var i = 0; i < this.views.length; i++) {
                if (name == this.views[i].name) {
                    var viewC = this.views[i].viewController;
                    viewC.DismissViewController(true);
                    index = i;
                }
            }
            if (index != -1) {
                this.views.splice(index, 1);
            }
        }
        showLoading(title = "请稍等") {
        }
        hideLoading() {
        }
        showToast(title, duration = 3000, mask = false) {
            Toast.inst.show(title, mask);
        }
        showModal(title, content, caller, callback) {
        }
        showNativeAd() {
            if (PlatformConfig.inst.isReview()) {
                return;
            }
            Platforms.inst.onShowNativeAd((ad) => {
                let view = new NativeAdViewController();
                UIManager.inst.showPopupView(view);
                view.setData(ad);
            });
        }
        showNativeIconButton(btn) {
            btn.visible = false;
            if (Platforms.inst.platform == Platform.oppo_h5) {
                Platforms.inst.onShowNativeAd((ad) => {
                    btn.visible = true;
                    console.log("addata:", JSON.stringify(ad));
                    let adId = ad.adId;
                    let title = ad.title;
                    let desc = ad.desc;
                    let icon = "";
                    if (Platforms.inst.platform == Platform.vivo_h5) {
                        if (ad.icon && ad.icon.length > 0) {
                            icon = ad.icon;
                        }
                        else if (ad.imgUrlList) {
                            icon = ad.imgUrlList[0];
                        }
                    }
                    else if (Platforms.inst.platform == Platform.oppo_h5) {
                        if (ad.iconUrlList.length > 0) {
                            icon = ad.iconUrlList[0];
                        }
                        else if (ad.imgUrlList) {
                            icon = ad.imgUrlList[0];
                        }
                    }
                    btn.icon = icon;
                    btn.title = title;
                    btn.onClick(this, () => {
                        btn.visible = false;
                        Platforms.inst.onNativeAdClick(adId);
                    });
                });
            }
        }
        showSplashScreen() {
            let screenDatas = new Array();
            let screenData = new TextureScreenData();
            screenData.backgroundImage = "res/images/splash.jpg";
            screenData.duration = 2;
            screenDatas.push(screenData);
            SimpleSplashScreen.inst.setData(screenDatas);
        }
        createLoadingView(view) {
            this.loadingView = view;
            this.topViewContainer.addChild(this.loadingView.View);
            this.loadingView.View.visible = false;
        }
        showGameLoading(callback, anim = true) {
            if (this.loadingView == null) {
            }
            if (this.loadingView && anim) {
                this.loadingView.View.visible = true;
                this.loadingView.View.alpha = 0;
                Laya.Tween.to(this.loadingView.View, { alpha: 1 }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    callback && callback();
                }));
            }
            else {
                callback && callback();
            }
        }
        hideGameLoading(delay = 1000, callbakc = null) {
            if (this.loadingView) {
                Laya.Tween.to(this.loadingView.View, { alpha: 0 }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    this.loadingView.View.visible = false;
                    callbakc && callbakc.run();
                }), delay);
            }
            else {
                callbakc && callbakc.run();
            }
        }
        addRecord(name) {
            this.record.push({ name: name, count: 1 });
        }
        checkRecord(name) {
            for (let index = 0; index < this.record.length; index++) {
                const viewInfo = this.record[index];
                if (viewInfo.name == name) {
                    return true;
                }
            }
            return false;
        }
        addRecordCount(name) {
            for (let index = 0; index < this.record.length; index++) {
                const viewInfo = this.record[index];
                if (viewInfo.name == name) {
                    viewInfo.count++;
                }
            }
        }
    }

    class WWWResultData {
        constructor() {
            this.resultCode = 1;
        }
    }
    WWWResultData.SUCCESS = 1;
    WWWResultData.FAIL = 0;
    class HttpRequestExtension extends Laya.HttpRequest {
        constructor() {
            super();
            this.httpRequest = new Laya.HttpRequest();
        }
        GetHeaders() {
            var arr = [
                "Content-Type", "application/json"
            ];
            return arr;
        }
        Get(url, caller, callback) {
            this.httpRequest.once(Laya.Event.COMPLETE, this, function (e) {
                callback.apply(caller, [JSON.parse(e)]);
            });
            this.httpRequest.once(Laya.Event.ERROR, this, function (e) {
                var result = new WWWResultData();
                result.msg = "获取失败";
                result.data = null;
                result.resultCode = WWWResultData.FAIL;
                callback.apply(caller, [result]);
            });
            this.httpRequest.send(url, null, 'get', 'application/json', this.GetHeaders());
            return this;
        }
        Post(url, data, caller, callback) {
            this.httpRequest.once(Laya.Event.COMPLETE, this, function (e) {
                callback.apply(caller, [JSON.parse(e)]);
            });
            this.httpRequest.once(Laya.Event.ERROR, this, function (e) {
                var result = new WWWResultData();
                result.msg = "获取失败";
                result.data = null;
                result.resultCode = WWWResultData.FAIL;
                callback.apply(caller, [result]);
            });
            this.httpRequest.send(url, JSON.stringify(data), 'post', 'application/json', this.GetHeaders());
            return this;
        }
    }

    class UI_SdkIconButtonAd extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkIconButtonAd"));
        }
        onConstruct() {
            this.m_n2 = (this.getChildAt(0));
            this.m_icon = (this.getChildAt(1));
            this.m_n4 = (this.getChildAt(2));
            this.m_title = (this.getChildAt(3));
            this.m_t0 = this.getTransitionAt(0);
        }
    }
    UI_SdkIconButtonAd.URL = "ui://kd5ich5s8m0z7";

    class SdkIconButtonAdComponent extends UI_SdkIconButtonAd {
        onConstruct() {
            super.onConstruct();
            this.on(Laya.Event.ADDED, this, this.addToScene);
            this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        addToScene() {
            if (YMSDK.inst.enabled == false) {
                this.visible = false;
                return;
            }
            this.onClick(this, this.onClickHandler);
            this.randomIcon();
            Laya.timer.loop(5000, this, this.randomIcon);
            this.visible = YMSDK.inst.getKeyValue(SdkSwitchEnum.游戏格子);
        }
        randomIcon() {
            let rand = MathHelper.random(0, YMSDK.inst.getApps().length - 1);
            this.appInfo = YMSDK.inst.getApps()[rand];
            this.icon = this.appInfo.icon;
            this.title = this.appInfo.name;
        }
        onClickHandler() {
            console.log("[YMSDK]点击跳转:", this.appInfo.appId);
            let s = this.data;
            console.log("附带数据:", s);
            if (s) {
                YMSDK.inst.clickEvent(s, this.appInfo);
            }
            else {
                YMSDK.inst.clickEvent("SDKICON点击", this.appInfo);
            }
        }
        removeToScene() {
            Laya.timer.clear(this, this.randomIcon);
            this.off(Laya.Event.ADDED, this, this.addToScene);
            this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
    }

    class UI_SdkOneLineBanner extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkOneLineBanner"));
        }
        onConstruct() {
            this.m_List = (this.getChildAt(0));
        }
    }
    UI_SdkOneLineBanner.URL = "ui://kd5ich5smzap8";

    class SdkOneLineBannerComponent extends UI_SdkOneLineBanner {
        constructor() {
            super(...arguments);
            this.index = 0;
        }
        onConstruct() {
            super.onConstruct();
            this.on(Laya.Event.ADDED, this, this.addToScene);
            this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        addToScene() {
            if (YMSDK.inst.enabled == false) {
                this.visible = false;
                return;
            }
            this.m_List.itemRenderer = Laya.Handler.create(this, this.onItemRenderer, null, false);
            this.m_List.numItems = YMSDK.inst.getApps().length;
            this.m_List.on(fairygui.Events.CLICK_ITEM, this, this.onClickHandler);
            this.visible = YMSDK.inst.getKeyValue(SdkSwitchEnum.结算ICON导出页面);
            Laya.timer.loop(3000, this, this.onScroll);
        }
        onScroll() {
            this.index++;
            if (this.index >= YMSDK.inst.getApps().length) {
                this.index = 0;
            }
            this.m_List.scrollToView(this.index, true);
        }
        onItemRenderer(index, ui) {
            let data = YMSDK.inst.getApps()[index];
            ui.title = data.name;
            ui.icon = data.icon;
        }
        onClickHandler() {
            let data = YMSDK.inst.getApps()[this.m_List.selectedIndex];
            console.log("[YMSDK]点击跳转:", data.appId);
            let s = this.data;
            console.log("附带数据:", s);
            if (s) {
                YMSDK.inst.clickEvent(s, data);
            }
            else {
                YMSDK.inst.clickEvent("SDKICONBanner点击", data);
            }
        }
        removeToScene() {
            this.off(Laya.Event.ADDED, this, this.addToScene);
            this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
            Laya.timer.clear(this, this.onScroll);
        }
    }

    class PlatformAdManager {
        static get inst() {
            if (this._inst == null) {
                this._inst = new PlatformAdManager();
            }
            return this._inst;
        }
        init() { }
        showBanner(forceShow = false, key) {
            let isShow = true;
            if ((Platforms.inst.platform == Platform.oppo_h5
                || Platforms.inst.platform == Platform.vivo_h5) && forceShow == false) {
                isShow = false;
            }
            console.log("是否显示banner：", isShow);
            if (isShow)
                Platforms.inst.onShowBanner(key);
        }
        destroyBanner() {
            Platforms.inst.onDestoryBanner();
        }
        showNativeAd() {
            Platforms.inst.onShowNativeAd((ad) => {
                let view = new NativeAdViewController();
                UIManager.inst.showPopupView(view);
                view.setData(ad);
            });
        }
        destroyNativeAd() {
            Platforms.inst.onDestroyNativeAd();
        }
        showNativeOrInsertAd() {
            if (Platforms.inst.platform == Platform.qqplay_h5 || Platforms.inst.platform == Platform.toutiao_h5) {
                Platforms.inst.onShowInsertAd();
            }
            else {
                this.showNativeAd();
            }
        }
        showNativeIconAd(btn, key) {
            if (Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5) {
                btn.getAd(key);
            }
        }
        destroyNativeIconAd() {
            if (Platforms.inst.platform == Platform.oppo_h5) {
                Platforms.inst.onDestroyNativeIconAd();
            }
        }
        sendEvent(obj) {
            Platforms.inst.sendEvent(obj);
        }
        showRewardedVideo(callback) {
            UIManager.inst.showToast("视频正在加载中", 3000, true);
            Laya.timer.once(1000, this, () => {
                Platforms.inst.onShowRewardedVideo(() => {
                    UIManager.inst.showToast("获得奖励");
                    callback && callback(true);
                }, (code, msg) => {
                    if (code == 1) {
                        UIManager.inst.showToast("视频尚未准备好，请稍后再试");
                    }
                    else if (code == 4) {
                        UIManager.inst.showToast("未完整看完视频无法获得奖励");
                    }
                    callback && callback(false);
                });
            });
        }
    }

    class UI_SdkPowerView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkPowerView"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
            this.m_n1 = (this.getChildAt(1));
            this.m_ImageLoader = (this.getChildAt(2));
            this.m_ClickBtn = (this.getChildAt(3));
            this.m_TipLabel = (this.getChildAt(4));
            this.m_ProgressBar = (this.getChildAt(5));
            this.m_ButtomBar = (this.getChildAt(6));
        }
    }
    UI_SdkPowerView.URL = "ui://kd5ich5smzapa";

    class SdkPowerViewController extends ViewControllerGeneric {
        constructor() {
            super(...arguments);
            this.isShowBanner = false;
            this.currentP = 0;
            this.randShowBanner = 0;
        }
        get URL() {
            return UI_SdkPowerView.URL;
        }
        init() {
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        unbind() {
            PlatformAdManager.inst.destroyBanner();
            Laya.timer.clear(this, this.onSubProgress);
        }
        bind() {
            if (YMSDK.inst.enabled == false) {
                this.removeSelf();
                return;
            }
            if (YMSDK.inst.getKeyValue(SdkSwitchEnum.结算误点进度页面) == false) {
                this.removeSelf();
                return;
            }
            EventManager.inst.AddEventListener(PlatformEvents.ON_BANNER_SUCCESS_EVENT, this, this.onBannerShowSuccess);
            PlatformAdManager.inst.destroyBanner();
            this.randShowBanner = MathHelper.random(30, 50);
            this.view.m_ClickBtn.onClick(this, this.onClick);
            Laya.timer.loop(1000, this, this.onSubProgress);
        }
        onBannerShowSuccess() {
            this.view.m_ButtomBar.height = Platforms.inst.bannerHeight();
        }
        onSubProgress() {
            this.currentP -= 3;
            if (this.currentP <= 0) {
                this.currentP = 0;
            }
            this.view.m_ProgressBar.tweenValue(this.currentP, 0.3);
        }
        onClick() {
            this.currentP += 10;
            if (this.currentP >= 100) {
                this.currentP = 100;
                this.removeSelf();
                this.closeHander && this.closeHander.runWith(true);
                return;
            }
            else if (this.currentP >= this.randShowBanner) {
                this.showBanner();
            }
            this.view.m_ProgressBar.tweenValue(this.currentP, 0.3);
        }
        showBanner() {
            if (this.isShowBanner == false) {
                this.isShowBanner = true;
                PlatformAdManager.inst.showBanner();
            }
        }
    }

    class UI_SdkResultIconListView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkResultIconListView"));
        }
        onConstruct() {
            this.m_SdkOneLineBanner = (this.getChildAt(0));
        }
    }
    UI_SdkResultIconListView.URL = "ui://kd5ich5smzap9";

    class SdkResultIconListViewController extends ViewControllerGeneric {
        get URL() {
            return UI_SdkResultIconListView.URL;
        }
        init() {
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        unbind() {
            PlatformAdManager.inst.destroyBanner();
        }
        bind() {
            if (YMSDK.inst.enabled == false) {
                this.removeSelf();
                return;
            }
            if (YMSDK.inst.getKeyValue(SdkSwitchEnum.结算ICON导出页面) == false) {
                this.removeSelf();
                return;
            }
            PlatformAdManager.inst.showBanner();
        }
    }

    class UI_SdkStartIconListView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkStartIconListView"));
        }
        onConstruct() {
            this.m_n5 = (this.getChildAt(0));
            this.m_List0 = (this.getChildAt(1));
            this.m_List1 = (this.getChildAt(2));
            this.m_CloseBtn = (this.getChildAt(3));
        }
    }
    UI_SdkStartIconListView.URL = "ui://kd5ich5ss4083";

    class SdkStartIconListViewController extends ViewControllerGeneric {
        constructor() {
            super(...arguments);
            this.list1 = new Array();
            this.list2 = new Array();
            this.index = 0;
        }
        get URL() {
            return UI_SdkStartIconListView.URL;
        }
        init() {
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        unbind() {
            Laya.timer.clear(this, this.onJumpPage);
            this.closeHandler && this.closeHandler.runWith(true);
        }
        bind() {
            this.view.m_CloseBtn.onClick(this, this.onClose);
            let apps = YMSDK.inst.getApps();
            let middle = Math.ceil(apps.length / 2);
            for (let index = 0; index < apps.length; index++) {
                const app = apps[index];
                if (index < middle) {
                    this.list1.push(app);
                }
                else {
                    this.list2.push(app);
                }
            }
            this.view.m_List0.itemRenderer = Laya.Handler.create(this, this.onList1Renderer, null, false);
            this.view.m_List0.numItems = this.list1.length;
            this.view.m_List1.itemRenderer = Laya.Handler.create(this, this.onList2Renderer, null, false);
            this.view.m_List1.numItems = this.list2.length;
            this.view.m_List0.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick0);
            this.view.m_List1.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick1);
            if (YMSDK.inst.getKeyValue(SdkSwitchEnum.开始ICON导出页面) == false) {
                this.removeSelf();
            }
            let page = Math.ceil(middle / 6);
            if (page > 1) {
                Laya.timer.loop(3000, this, this.onJumpPage);
            }
        }
        onJumpPage() {
            console.log("1111");
            this.index += 6;
            let apps = YMSDK.inst.getApps();
            let middle = Math.ceil(apps.length / 2);
            let page = Math.ceil(middle / 6);
            if (this.index >= page * 6) {
                this.index = 0;
            }
            this.view.m_List0.scrollToView(this.index, true);
            this.view.m_List1.scrollToView(this.index, true);
        }
        onList1Renderer(index, ui) {
            ui.icon = this.list1[index].icon;
            ui.title = this.list1[index].name;
            ui.data = this.list1[index];
        }
        onList2Renderer(index, ui) {
            ui.icon = this.list2[index].icon;
            ui.title = this.list2[index].name;
            ui.data = this.list2[index];
        }
        onItemClick0(ui) {
            console.log("[YMSDK]点击跳转:", ui.data);
            YMSDK.inst.clickEvent("开始页面导流按钮", ui.data);
        }
        onItemClick1(ui) {
            console.log("[YMSDK]点击跳转:", ui.data);
            YMSDK.inst.clickEvent("开始页面导流按钮", ui.data);
        }
        onClose() {
            this.removeSelf();
        }
    }

    class UI_ProgressBar1 extends fgui.GProgressBar {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "ProgressBar1"));
        }
        onConstruct() {
            this.m_n3 = (this.getChildAt(0));
            this.m_bar = (this.getChildAt(1));
        }
    }
    UI_ProgressBar1.URL = "ui://kd5ich5smzapd";

    class UI_SdkIconButton extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkIconButton"));
        }
        onConstruct() {
            this.m_n2 = (this.getChildAt(0));
            this.m_icon = (this.getChildAt(1));
            this.m_n4 = (this.getChildAt(2));
            this.m_title = (this.getChildAt(3));
        }
    }
    UI_SdkIconButton.URL = "ui://kd5ich5ss4084";

    class UI_SdkButton extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("YmSdkUI", "SdkButton"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
            this.m_ImageTitle = (this.getChildAt(1));
            this.m_title = (this.getChildAt(2));
        }
    }
    UI_SdkButton.URL = "ui://kd5ich5ss4085";

    class YmSdkUIBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_SdkIconButtonAd.URL, UI_SdkIconButtonAd);
            fgui.UIObjectFactory.setExtension(UI_SdkOneLineBanner.URL, UI_SdkOneLineBanner);
            fgui.UIObjectFactory.setExtension(UI_SdkResultIconListView.URL, UI_SdkResultIconListView);
            fgui.UIObjectFactory.setExtension(UI_SdkPowerView.URL, UI_SdkPowerView);
            fgui.UIObjectFactory.setExtension(UI_ProgressBar1.URL, UI_ProgressBar1);
            fgui.UIObjectFactory.setExtension(UI_SdkStartIconListView.URL, UI_SdkStartIconListView);
            fgui.UIObjectFactory.setExtension(UI_SdkIconButton.URL, UI_SdkIconButton);
            fgui.UIObjectFactory.setExtension(UI_SdkButton.URL, UI_SdkButton);
        }
    }

    var SdkSwitchEnum;
    (function (SdkSwitchEnum) {
        SdkSwitchEnum["\u5F00\u59CBICON\u5BFC\u51FA\u9875\u9762"] = "loadingIconListShow";
        SdkSwitchEnum["\u6E38\u620F\u683C\u5B50"] = "gridIconShow";
        SdkSwitchEnum["\u7ED3\u7B97ICON\u5BFC\u51FA\u9875\u9762"] = "resultIconListShow";
        SdkSwitchEnum["\u7ED3\u7B97\u8BEF\u70B9\u8FDB\u5EA6\u9875\u9762"] = "reslutProgressShow";
    })(SdkSwitchEnum || (SdkSwitchEnum = {}));
    class YMSDK {
        constructor() {
            this.initApi = "https://mini.coschat.com/api/sdk/";
            this.sendEventApi = "https://mini.coschat.com/api/sdk/click";
            this.enabled = true;
            this.wx = window['wx'];
            this.currentAppId = "";
            this.platformConfig = [];
            this.map = {
                "loadingIconListShow": false,
                "gridIconShow": false,
                "resultIconListShow": false,
                "reslutProgressShow": false
            };
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new YMSDK();
            }
            return this._inst;
        }
        setMap(key, value) {
            this.map[key] = value;
            console.log("[YMSDK]设置Map:", key, this.map[key]);
        }
        getKeyValue(key) {
            return this.map[key];
        }
        setConfig(data) {
            this.platformConfig = data;
        }
        initAsync(data) {
            return __awaiter(this, void 0, void 0, function* () {
                this.platformConfig = data;
                this.currentAppId = this.getCurrentAppId();
                console.log("[YMSDK]初始化渠道信息:", this.platformConfig);
                console.log(`当前渠道是 ${Platforms.inst.platformDisplayName} AppID:${this.currentAppId}`);
                yield this.loadUI();
                console.log("[YMSDK]加载UI完成");
                yield this.initSDK(data);
                console.log("[YMSDK]初始化SDK完成");
            });
        }
        getCurrentAppId() {
            for (let index = 0; index < this.platformConfig.length; index++) {
                const c = this.platformConfig[index];
                if (c.platform == Platform.weixin_h5) {
                    return c.appId;
                }
            }
            return "";
        }
        getApps() {
            return this.sdkConfig.apps;
        }
        showStartIconListView(callback) {
            console.log("获取SDK value:", YMSDK.inst.getKeyValue(SdkSwitchEnum.开始ICON导出页面));
            if (this.getKeyValue(SdkSwitchEnum.开始ICON导出页面)) {
                Laya.timer.callLater(this, () => {
                    let view = new SdkStartIconListViewController();
                    UIManager.inst.showPopupView(view);
                    view.closeHandler = Laya.Handler.create(this, () => {
                        callback && callback(true);
                    });
                });
            }
            else {
                callback && callback(true);
            }
        }
        showResultIconListView(callback) {
            if (this.getKeyValue(SdkSwitchEnum.结算ICON导出页面)) {
                Laya.timer.callLater(this, () => {
                    let view = new SdkResultIconListViewController();
                    UIManager.inst.showPopupView(view);
                });
                callback && callback(true);
            }
            else {
                callback && callback(false);
            }
        }
        hideResultIconListView() {
            UIManager.inst.hidePopupView(UI_SdkResultIconListView.URL);
        }
        showPowerView(callback) {
            if (this.getKeyValue(SdkSwitchEnum.结算误点进度页面)) {
                Laya.timer.callLater(this, () => {
                    let view = new SdkPowerViewController();
                    UIManager.inst.showPopupView(view);
                    view.closeHander = Laya.Handler.create(this, () => {
                        callback && callback(true);
                    });
                });
            }
            else {
                callback && callback(false);
            }
        }
        loadUI() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let urls = [];
                    urls.push({ url: "res/sdkAssets/YmSdkUI.bin", type: Laya.Loader.BUFFER });
                    urls.push({ url: "res/sdkAssets/YmSdkUI_atlas0.png", type: Laya.Loader.IMAGE });
                    Laya.loader.load(urls, Laya.Handler.create(this, (res) => __awaiter(this, void 0, void 0, function* () {
                        if (res) {
                            fairygui.UIPackage.addPackage("res/sdkAssets/YmSdkUI");
                            YmSdkUIBinder.bindAll();
                            fgui.UIObjectFactory.setExtension(UI_SdkIconButtonAd.URL, SdkIconButtonAdComponent);
                            fgui.UIObjectFactory.setExtension(UI_SdkOneLineBanner.URL, SdkOneLineBannerComponent);
                            resolve(true);
                        }
                        else {
                            console.log("加载UI资源失败,重试");
                            yield this.loadUI();
                        }
                    })));
                });
            });
        }
        initSDK(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let request = new HttpRequestExtension();
                    let url = this.initApi + this.currentAppId;
                    console.log(`[YMSDK]发送获取sdk:${url}`);
                    request.Get(url, null, (res) => {
                        console.log("[YMSDK]initSDK返回信息:", res);
                        if (res.code == 0) {
                            if (GameEngine.inst.isLocal) {
                                this.sdkConfig = res.data;
                                this.enabled = this.sdkConfig.switch;
                                PlatformConfig.inst.currentPlatform.canAd = this.sdkConfig.ad;
                                if (this.enabled) {
                                    this.setMap(SdkSwitchEnum.开始ICON导出页面, this.sdkConfig.switches[0]);
                                    this.setMap(SdkSwitchEnum.游戏格子, this.sdkConfig.switches[1]);
                                    this.setMap(SdkSwitchEnum.结算ICON导出页面, this.sdkConfig.switches[2]);
                                    this.setMap(SdkSwitchEnum.结算误点进度页面, this.sdkConfig.switches[3]);
                                }
                                else {
                                    this.setMap(SdkSwitchEnum.开始ICON导出页面, false);
                                    this.setMap(SdkSwitchEnum.游戏格子, false);
                                    this.setMap(SdkSwitchEnum.结算ICON导出页面, false);
                                    this.setMap(SdkSwitchEnum.结算误点进度页面, false);
                                }
                                let apps = this.getApps();
                                if (apps && apps.length == 0) {
                                    this.setMap(SdkSwitchEnum.开始ICON导出页面, false);
                                    this.setMap(SdkSwitchEnum.游戏格子, false);
                                    this.setMap(SdkSwitchEnum.结算ICON导出页面, false);
                                }
                                else {
                                    for (let index = 0; index < apps.length; index++) {
                                        const appInfo = apps[index];
                                        appInfo.name = appInfo.name.slice(0, 6);
                                    }
                                }
                                resolve(this.sdkConfig);
                                console.log("是否开启广告:", PlatformConfig.inst.currentPlatform.canAd);
                                console.log("是否开启导流:", this.enabled);
                            }
                            else {
                                if (this.wx) {
                                    console.log("微信版本");
                                    this.sdkConfig = res.data;
                                    this.enabled = this.sdkConfig.switch;
                                    PlatformConfig.inst.currentPlatform.canAd = this.sdkConfig.ad;
                                    this.setMap(SdkSwitchEnum.开始ICON导出页面, this.enabled);
                                    this.setMap(SdkSwitchEnum.游戏格子, this.enabled);
                                    this.setMap(SdkSwitchEnum.结算ICON导出页面, this.enabled);
                                    this.setMap(SdkSwitchEnum.结算误点进度页面, this.enabled);
                                    let apps = this.getApps();
                                    if (apps && apps.length == 0) {
                                        this.setMap(SdkSwitchEnum.开始ICON导出页面, false);
                                        this.setMap(SdkSwitchEnum.游戏格子, false);
                                        this.setMap(SdkSwitchEnum.结算ICON导出页面, false);
                                    }
                                    else {
                                        for (let index = 0; index < apps.length; index++) {
                                            const appInfo = apps[index];
                                            appInfo.name = appInfo.name.slice(0, 6);
                                        }
                                    }
                                    resolve(this.sdkConfig);
                                    console.log("是否开启广告:", PlatformConfig.inst.currentPlatform.canAd);
                                    console.log("是否开启导流:", this.enabled);
                                }
                                else {
                                    this.enabled = false;
                                    resolve(null);
                                }
                            }
                        }
                        else {
                            this.enabled = false;
                            resolve(null);
                        }
                    });
                });
            });
        }
        sendEvent(obj) {
            if (this.wx && this.wx.uma) {
                console.log("[YMSDK]发送事件111111:", JSON.stringify(obj));
                if (obj.data) {
                    this.wx.uma.trackEvent(obj.key, obj.data);
                }
                else {
                    this.wx.uma.trackEvent(obj.key);
                }
            }
        }
        clickEvent(scene, appInfo) {
            Platforms.inst.navigateToMiniGame({ appId: appInfo.appId });
            let request = new HttpRequestExtension();
            let url = `${this.sendEventApi}?gameid=${this.currentAppId}&appid=${appInfo.appId}&iconId=${appInfo.iconId}`;
            console.log(`[YMSDK]点击sdk:${url}`);
            request.Post(url, null, this, (res) => { console.warn(res); });
            this.sendEvent({ key: "SDKIconClickEvent", data: { gameId: this.currentAppId, appName: appInfo.name, scene: scene, appId: appInfo.appId, iconId: appInfo.iconId } });
        }
    }
    class BaseResponse {
    }
    class SdkPlatformConfig {
        constructor(appId, platform) {
            this.platform = platform;
            this.appId = appId;
        }
    }
    class SdkConfigResponse extends BaseResponse {
    }
    class SdkConfig {
    }
    class AppInfo {
    }

    class WeiXinH5GameAPI {
        constructor() {
            this.wx = window['wx'];
            this.m_bannerAd = null;
            this.m_videoAd = null;
            this.m_insertAd = null;
            this.m_gridAd = null;
            this.m_videoAdIsLoaded = false;
            this.m_moreButton = null;
            this.m_bannerHeight = 220;
            this.shareStartTime = 0;
        }
        userDataPath() {
            if (this.wx) {
                return this.wx.env.USER_DATA_PATH + "/";
            }
            return "";
        }
        downloadFile(url, callback) {
            if (this.wx) {
                if (this.downloadTask != null) {
                    this.downloadTask.abort();
                }
                this.downloadTask = this.wx.downloadFile({
                    url: url,
                    success(res) {
                        if (res.statusCode === 200) {
                            callback && callback(true, res);
                        }
                        else {
                            callback && callback(false, null);
                        }
                    }
                });
            }
            else {
                callback && callback(false, null);
            }
        }
        readFile(filePath, callback) {
            if (this.wx) {
                let url = this.userDataPath() + filePath;
                this.wx.getFileSystemManager().readFile({
                    filePath: url,
                    encoding: "utf-8",
                    success(res) {
                        callback && callback(true, res.data);
                    },
                    fail(err) {
                        callback && callback(false, "");
                    }
                });
            }
            else {
                callback && callback(false, "");
            }
        }
        writeFileSync(filePath, data) {
            if (this.wx) {
                let url = this.userDataPath() + filePath;
                this.wx.getFileSystemManager().writeFileSync(url, data, "utf-8");
            }
        }
        unzip(url, callback) {
            if (this.wx) {
                this.wx.getFileSystemManager().unzip({
                    zipFilePath: url,
                    targetPath: this.wx.env.USER_DATA_PATH,
                    success(res) {
                        console.log(res);
                        callback && callback(true);
                    }
                });
            }
            else {
                callback && callback(false);
            }
        }
        onInit(_callback) {
            if (this.wx) {
                let self = this;
                this.systemInfo = this.wx.getSystemInfoSync();
                this.onCheckForUpdate();
                this.wx.showShareMenu({
                    withShareTicket: true
                });
                this.wx.onShareAppMessage(function (res) {
                    return {
                        title: '一起来勇闯世界遗迹吧',
                        desc: '一起来勇闯世界遗迹吧',
                        imageUrl: PlatformConfig.inst.currentPlatform.shareImage,
                        imageUrlId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                        query: ''
                    };
                });
                this.wx.onShow(function (res) {
                    console.log("wx.onShow=====================================");
                    if (self.shareStartTime > 0 && Date.now() - self.shareStartTime >= 2000) {
                        if (self.onShareCallback) {
                            self.onShareCallback(true);
                        }
                    }
                    else {
                        if (self.onShareCallback) {
                            self.onShareCallback(false);
                        }
                    }
                    self.onShareCallback = null;
                    self.shareStartTime = 0;
                });
                this.wx.onHide(function () {
                    console.log("wx.onHide=====================================");
                });
            }
            console.log('WeiXinH5GameAPI onInit');
        }
        onCheckForUpdate() {
            let self = this;
            const updateManager = this.wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log('onCheckForUpdate', res.hasUpdate);
                if (res.hasUpdate) {
                    self.wx.showToast({
                        title: '即将有更新请留意'
                    });
                }
            });
            updateManager.onUpdateReady(() => {
                self.wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否立即使用？',
                    success: function (res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                        else {
                            self.wx.showToast({
                                icon: 'none',
                                title: '小程序下一次「冷启动」时会使用新版本',
                            });
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(() => {
                self.wx.showToast({
                    title: '更新失败，下次启动继续...'
                });
            });
        }
        onInitAdService(callback) {
            this.createBannerAd();
            this.createRewardedVideoAd();
            this.createInsertAd();
            callback();
            console.log('WeiXinH5GameAPI onInitAdService');
        }
        onShare(callback) {
            if (this.wx) {
                this.shareStartTime = Date.now();
                this.onShareCallback = callback;
                this.wx.shareAppMessage({
                    title: '一起来勇闯世界遗迹吧',
                    desc: '一起来勇闯世界遗迹吧',
                    imageUrl: PlatformConfig.inst.currentPlatform.shareImage,
                    imageUrlId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                    query: ''
                });
            }
            else {
                callback && callback(true);
            }
            console.log('WeiXinH5GameAPI onShare');
        }
        createAppBox() {
            throw new Error("Method not implemented.");
        }
        onShowAppBox() {
            throw new Error("Method not implemented.");
        }
        onHideAppBox() {
            throw new Error("Method not implemented.");
        }
        hasShortcutInstalled(callback) {
            callback(true);
        }
        installShortcut(callback) {
            callback(true);
        }
        createMoreGamesButton(inStyle) {
        }
        hideMoreGameButton() {
        }
        onShareVideo(callback) {
        }
        bannerHeight() {
            return this.m_bannerHeight;
        }
        notchHeight() {
            if (this.wx) {
                let scale = Laya.Browser.height / this.systemInfo.screenHeight;
                return this.systemInfo.statusBarHeight * scale;
            }
            return 20;
        }
        sendEvent(obj) {
            YMSDK.inst.sendEvent(obj);
        }
        vibrateShort() {
        }
        onStartRecord() {
        }
        onStopRecord() {
        }
        getScreenSize() {
            return new Laya.Size(750, 1334);
        }
        isVertify() {
            return true;
        }
        onLogin() {
            console.log('WeiXinH5GameAPI onLogin');
        }
        updateHighScore(_score) {
            console.log('WeiXinH5GameAPI updateHighScore');
        }
        createBannerAd() {
            console.log('WeiXinH5GameAPI createBannerAd');
        }
        onShowBanner() {
            if (this.wx && PlatformConfig.inst.currentPlatform.canAd) {
                if (this.m_bannerAd) {
                    this.m_bannerAd.destroy();
                    this.m_bannerAd = null;
                }
                let self = this;
                let style = { left: 0, top: 0, width: 200, height: 0 };
                var phone = this.wx.getSystemInfoSync();
                let phoneModel = phone.model;
                let w = phone.screenWidth / 2;
                let h = phone.screenHeight;
                if (phoneModel.search("iPhone X") != -1) {
                    style.width = w * 1.1;
                }
                else {
                    style.width = w * 1.71;
                }
                this.m_bannerAd = this.wx.createBannerAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.bannerAdId,
                    style: style
                });
                this.m_bannerAd.onResize(function (size) {
                    self.m_bannerAd.style.left = w - size.width / 2;
                    self.m_bannerAd.style.top = h - size.height;
                });
                this.m_bannerAd.onLoad(function () {
                    console.log("Banner广告加载完成================");
                    self.m_bannerAd.show()
                        .then(() => {
                        console.log('广告显示成功');
                        self.m_bannerHeight = 220;
                        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
                    })
                        .catch(err => {
                        console.log('广告组件出现问题', err);
                        self.m_bannerHeight = 20;
                        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                    });
                });
                this.m_bannerAd.onError(function (res) {
                    console.log("Banner广告加载失败=================");
                    self.m_bannerHeight = 20;
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                });
            }
            console.log('WeiXinH5GameAPI onShowBanner');
        }
        onHideBanner() {
            if (this.m_bannerAd) {
                this.m_bannerHeight = 20;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                this.m_bannerAd.destroy();
                this.m_bannerAd = null;
            }
            console.log('WeiXinH5GameAPI onHideBanner');
        }
        createRewardedVideoAd() {
            if (this.wx && PlatformConfig.inst.currentPlatform.canAd) {
                this.m_videoAd = this.wx.createRewardedVideoAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.videoAdId
                });
                if (this.m_videoAd == null)
                    return;
                this.m_videoAd.load().then(() => {
                    console.log('广告显示成功');
                }).catch(err => {
                    console.log('广告组件出现问题', err);
                    this.onFailCallback && this.onFailCallback(1, "激励视频广告取消关闭，不发放奖励");
                });
                this.m_videoAd.onLoad(() => {
                    console.log('WeiXinH5GameAPI RewardedVideo load success');
                    this.m_videoAdIsLoaded = true;
                });
                this.m_videoAd.onError((err) => {
                    console.log('WeiXinH5GameAPI RewardedVideo load Error:' + err);
                    this.m_videoAdIsLoaded = false;
                });
                this.m_videoAd.onClose((res) => {
                    if (res.isEnded) {
                        console.log('激励视频广告完成，发放奖励');
                        this.onSuccessCallback && this.onSuccessCallback();
                        this.m_videoAdIsLoaded = false;
                    }
                    else {
                        console.log('激励视频广告取消关闭，不发放奖励');
                        this.onFailCallback && this.onFailCallback(4, "激励视频广告取消关闭，不发放奖励");
                    }
                    this.clearVideoCallback();
                });
            }
            console.log('WeiXinH5GameAPI createRewardedVideoAd');
        }
        clearVideoCallback() {
            this.onSuccessCallback = null;
            this.onFailCallback = null;
        }
        onShowRewardedVideo(_successCallback, _failCallback) {
            if (this.wx && this.m_videoAd) {
                this.onSuccessCallback = _successCallback;
                this.onFailCallback = _failCallback;
                if (this.m_videoAd) {
                    if (this.m_videoAdIsLoaded) {
                        this.m_videoAd.show();
                    }
                    else {
                        this.m_videoAd.load();
                    }
                }
                else {
                    _failCallback && _failCallback(1, "激励视频广告取消关闭，不发放奖励");
                }
            }
            else {
                _successCallback && _successCallback();
            }
            console.log('WeiXinH5GameAPI onShowRewardedVideo');
        }
        createInsertAd() {
            if (this.wx && MathHelper.CompareVersion(this.systemInfo.SDKVersion, "2.6.0") == 1) {
                let self = this;
                this.m_insertAd = this.wx.createInterstitialAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.insertAdId
                });
            }
            console.log('WeiXinH5GameAPI createInsertAd');
        }
        onShowInsertAd() {
            if (this.m_insertAd) {
                this.m_insertAd.show().then(() => {
                    console.log('WeiXinH5GameAPI InsertAd 展示成功');
                }).catch((err) => {
                    console.log('WeiXinH5GameAPI InsertAd 展示失败:', JSON.stringify(err));
                });
            }
            console.log('WeiXinH5GameAPI onShowInsertAd');
        }
        createNativeAd() {
            console.log('WeiXinH5GameAPI createNativeAd');
        }
        onShowNativeAd() {
            console.log('WeiXinH5GameAPI onShowNativeAd');
        }
        onNativeAdClick(_id) {
            console.log('WeiXinH5GameAPI onNativeAdClick:' + _id);
        }
        saveDataToCache(_key, _value) {
            Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        }
        readDataFromCache(_key) {
            let data = Laya.LocalStorage.getItem(_key);
            if (data) {
                if (typeof data == "string") {
                    return JSON.parse(Laya.LocalStorage.getItem(_key));
                }
            }
            return null;
        }
        onDestroyNativeAd() {
        }
        onDestroyNativeIconAd() {
        }
        onDestoryBanner() {
            if (this.wx && this.m_bannerAd) {
                this.m_bannerAd.destroy();
            }
        }
        onDestoryInsertAd() {
        }
        createInnerAudioContext() {
            return null;
        }
        onHideInsertAd() {
        }
        navigateToMiniGame(object) {
            if (this.wx) {
                console.log("微信跳转...", object.appId);
                this.wx.navigateToMiniProgram({
                    appId: object.appId,
                    path: object.path,
                    extraData: object.extraData,
                    success(res) {
                        console.log("跳转成功...", object.appId);
                    }
                });
            }
        }
        pay(paymentData, callback) {
        }
        getPlatform() {
            return "";
        }
        showMoreGamesModal() {
        }
        reportMonitor(name, value) {
        }
        createNativeIconAd() {
        }
        onShowNativeIconAd(callback) {
        }
        onNativeIconAdClick(_id) {
        }
        onNativeIconAdClose() {
        }
        getDevicePlatform() {
            return "";
        }
        addColorSign() {
        }
        onNativeAdClose() {
        }
    }

    class User {
    }

    class UserInfo {
    }

    class GameEvents {
    }
    GameEvents.ON_UPDATE_USERINFO_EVENT = "onUpdateUserInfo";
    GameEvents.ON_LOAD_PROGRESS_EVENT = "onLoadProgressEvent";

    class DateHelper {
        static getSystemTime() {
            var curDate = new Date();
            var year = curDate.getFullYear();
            var month = curDate.getMonth() + 1;
            var date = curDate.getDate();
            var hour = curDate.getHours();
            var minute = curDate.getMinutes();
            var second = curDate.getSeconds();
            var systemTime = year + "年" + month + "月" + date + "日" + hour + "时" + minute + "分" + second + "秒";
            return systemTime;
        }
        static getTime() {
            let curDate = new Date();
            let year = curDate.getFullYear();
            let month = curDate.getMonth() + 1;
            let date = curDate.getDate();
            if (month < 10) {
            }
            var systemTime = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date < 10 ? "0" + date : date);
            return systemTime;
        }
    }

    class LocalStorageManager {
        constructor() {
            this.projectKey = "";
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new LocalStorageManager();
            }
            return this._inst;
        }
        get userDataKey() {
            return `${this.projectKey}_user`;
        }
        get soundMuteDataKey() {
            return `${this.projectKey}_soundMute`;
        }
        get shareVideoKey() {
            return `${this.projectKey}_shareVideo`;
        }
        get shortcutKey() {
            return `${this.projectKey}_shortcut`;
        }
        get colorSignKey() {
            return `${this.projectKey}_colorSign`;
        }
        get payTempRecordKey() {
            return `${this.projectKey}_payTempyRecord`;
        }
        get bannerRecordKey() {
            return `${this.projectKey}_bannerRecord`;
        }
        get checkInRecordKey() {
            return `${this.projectKey}_checkIn`;
        }
        get coisResourceKey() {
            return `${this.projectKey}_coinResource`;
        }
        get woodResourceKey() {
            return `${this.projectKey}_woodResource`;
        }
        get spinKey() {
            return `${this.projectKey}_spin_`;
        }
        get treasureKey() {
            return `${this.projectKey}_treasure`;
        }
        get guideRecordKey() {
            return `${this.projectKey}_guide`;
        }
        getDayLocalRecord(key) {
            let data = GameEngine.inst.loadData(this.projectKey + "_" + key);
            let flag = false;
            if (data) {
                let day = MathHelper.countDay(DateHelper.getTime(), data.date);
                if (day >= 1) {
                    GameEngine.inst.saveData(this.projectKey + "_" + key, { date: DateHelper.getTime() });
                }
                else {
                    flag = true;
                }
            }
            else {
                GameEngine.inst.saveData(this.projectKey + "_" + key, { date: DateHelper.getTime() });
            }
            return flag;
        }
        getDayCountEnterGame() {
            let count = 1;
            let key = this.projectKey + "_enterGame";
            let data = GameEngine.inst.loadData(key);
            if (data) {
                count = data.count;
            }
            else {
                GameEngine.inst.saveData(key, { date: DateHelper.getTime(), count: 1 });
            }
            return count;
        }
        enterGame() {
            let key = this.projectKey + "_enterGame";
            let data = GameEngine.inst.loadData(key);
            if (data) {
                let count = data.count;
                count++;
                GameEngine.inst.saveData(key, { date: DateHelper.getTime(), count: count });
            }
            else {
                GameEngine.inst.saveData(key, { date: DateHelper.getTime(), count: 1 });
            }
        }
        setDayDailyShowSwitch() {
        }
    }

    class UI_LoadingView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameLoadingUI", "LoadingView"));
        }
        onConstruct() {
            this.m_ColorBg = (this.getChildAt(0));
            this.m_BigBgLoader = (this.getChildAt(1));
            this.m_n11 = (this.getChildAt(2));
            this.m_n12 = (this.getChildAt(3));
            this.m_TipLabel = (this.getChildAt(4));
            this.m_LoadingBar = (this.getChildAt(5));
            this.m_LogoLoader = (this.getChildAt(6));
            this.m_CC = (this.getChildAt(7));
            this.m_TTT = (this.getChildAt(8));
        }
    }
    UI_LoadingView.URL = "ui://lrq909uufo2s0";

    class UI_LoadingBar extends fgui.GProgressBar {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameLoadingUI", "LoadingBar"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
            this.m_bar = (this.getChildAt(1));
        }
    }
    UI_LoadingBar.URL = "ui://lrq909uumpgu45";

    class GameLoadingUIBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_LoadingView.URL, UI_LoadingView);
            fgui.UIObjectFactory.setExtension(UI_LoadingBar.URL, UI_LoadingBar);
        }
    }

    class UI_ResourceBar extends fgui.GLabel {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "ResourceBar"));
        }
        onConstruct() {
            this.m_n7 = (this.getChildAt(0));
            this.m_title = (this.getChildAt(1));
            this.m_AddBtn = (this.getChildAt(2));
            this.m_icon = (this.getChildAt(3));
        }
    }
    UI_ResourceBar.URL = "ui://0lagqdfm5f7qa";

    class UI_ShopView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "ShopView"));
        }
        onConstruct() {
            this.m_adState = this.getControllerAt(0);
            this.m_n0 = (this.getChildAt(0));
            this.m_CoinBar = (this.getChildAt(1));
            this.m_n2 = (this.getChildAt(2));
            this.m_List = (this.getChildAt(3));
            this.m_BackBtn = (this.getChildAt(4));
            this.m_FreeGetBtn = (this.getChildAt(5));
            this.m_BuyBtn = (this.getChildAt(6));
            this.m_UseBtn = (this.getChildAt(7));
            this.m_ImageLoader = (this.getChildAt(8));
            this.m_n24 = (this.getChildAt(9));
            this.m_n25 = (this.getChildAt(10));
            this.m_n26 = (this.getChildAt(11));
            this.m_n27 = (this.getChildAt(12));
            this.m_ButtomBar = (this.getChildAt(13));
        }
    }
    UI_ShopView.URL = "ui://0lagqdfm9oij2c";

    class UI_CarShopList extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "CarShopList"));
        }
        onConstruct() {
            this.m_state = this.getControllerAt(0);
            this.m_button = this.getControllerAt(1);
            this.m_n7 = (this.getChildAt(0));
            this.m_icon = (this.getChildAt(1));
            this.m_n10 = (this.getChildAt(2));
            this.m_CoinLabel = (this.getChildAt(3));
            this.m_n13 = (this.getChildAt(4));
            this.m_NameLabel = (this.getChildAt(5));
            this.m_n15 = (this.getChildAt(6));
            this.m_n16 = (this.getChildAt(7));
            this.m_n17 = (this.getChildAt(8));
            this.m_n18 = (this.getChildAt(9));
        }
    }
    UI_CarShopList.URL = "ui://0lagqdfm9oij2l";

    class UI_StartView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "StartView"));
        }
        onConstruct() {
            this.m_gameState = this.getControllerAt(0);
            this.m_n2 = (this.getChildAt(0));
            this.m_n16 = (this.getChildAt(1));
            this.m_n17 = (this.getChildAt(2));
            this.m_Finger = (this.getChildAt(3));
            this.m_Bot = (this.getChildAt(4));
            this.m_StageLabel = (this.getChildAt(5));
            this.m_CoinBar = (this.getChildAt(6));
            this.m_ShopBtn = (this.getChildAt(7));
            this.m_n11 = (this.getChildAt(8));
            this.m_n12 = (this.getChildAt(9));
            this.m_n13 = (this.getChildAt(10));
            this.m_n14 = (this.getChildAt(11));
            this.m_n15 = (this.getChildAt(12));
            this.m_t0 = this.getTransitionAt(0);
        }
    }
    UI_StartView.URL = "ui://0lagqdfms24q0";

    class UI_GameBlueBtn extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "GameBlueBtn"));
        }
        onConstruct() {
            this.m_n18 = (this.getChildAt(0));
            this.m_title = (this.getChildAt(1));
        }
    }
    UI_GameBlueBtn.URL = "ui://0lagqdfms28528";

    class UI_GameBigBtn extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "GameBigBtn"));
        }
        onConstruct() {
            this.m_state = this.getControllerAt(0);
            this.m_n20 = (this.getChildAt(0));
            this.m_n21 = (this.getChildAt(1));
            this.m_imageTitle = (this.getChildAt(2));
        }
    }
    UI_GameBigBtn.URL = "ui://0lagqdfms28529";

    class UI_ResultView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "ResultView"));
        }
        onConstruct() {
            this.m_State = this.getControllerAt(0);
            this.m_adState = this.getControllerAt(1);
            this.m_ColorBg = (this.getChildAt(0));
            this.m_n28 = (this.getChildAt(1));
            this.m_n8 = (this.getChildAt(2));
            this.m_n11 = (this.getChildAt(3));
            this.m_n9 = (this.getChildAt(4));
            this.m_n10 = (this.getChildAt(5));
            this.m_n27 = (this.getChildAt(6));
            this.m_CoinLabel = (this.getChildAt(7));
            this.m_n12 = (this.getChildAt(8));
            this.m_GetCoinBtn = (this.getChildAt(9));
            this.m_FreeGetCoinBtn = (this.getChildAt(10));
            this.m_Win = (this.getChildAt(11));
            this.m_n13 = (this.getChildAt(12));
            this.m_n15 = (this.getChildAt(13));
            this.m_n16 = (this.getChildAt(14));
            this.m_CountTimeLabel = (this.getChildAt(15));
            this.m_n14 = (this.getChildAt(16));
            this.m_n5 = (this.getChildAt(17));
            this.m_ContinueBtn = (this.getChildAt(18));
            this.m_NextBtn = (this.getChildAt(19));
            this.m_Lose = (this.getChildAt(20));
        }
    }
    UI_ResultView.URL = "ui://0lagqdfmsocn5";

    class UI_GameButton extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameUI", "GameButton"));
        }
        onConstruct() {
            this.m_isRedPoint = this.getControllerAt(0);
            this.m_icon = (this.getChildAt(0));
            this.m_title = (this.getChildAt(1));
            this.m_n3 = (this.getChildAt(2));
        }
    }
    UI_GameButton.URL = "ui://0lagqdfmtq6l4";

    class GameUIBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_ResourceBar.URL, UI_ResourceBar);
            fgui.UIObjectFactory.setExtension(UI_ShopView.URL, UI_ShopView);
            fgui.UIObjectFactory.setExtension(UI_CarShopList.URL, UI_CarShopList);
            fgui.UIObjectFactory.setExtension(UI_StartView.URL, UI_StartView);
            fgui.UIObjectFactory.setExtension(UI_GameBlueBtn.URL, UI_GameBlueBtn);
            fgui.UIObjectFactory.setExtension(UI_GameBigBtn.URL, UI_GameBigBtn);
            fgui.UIObjectFactory.setExtension(UI_ResultView.URL, UI_ResultView);
            fgui.UIObjectFactory.setExtension(UI_GameButton.URL, UI_GameButton);
        }
    }

    class LoadingViewController extends ViewControllerGeneric {
        get URL() {
            return UI_LoadingView.URL;
        }
        init() {
            super.init();
            this.bind();
        }
        bind() {
            EventManager.inst.AddEventListener(GameEvents.ON_LOAD_PROGRESS_EVENT, this, this.loadProgress);
        }
        loadProgress(p) {
            this.view.m_LoadingBar.tweenValue(Math.ceil(p), 0.35);
        }
    }

    class UI_BtnColor extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameCommandUI", "BtnColor"));
        }
        onConstruct() {
            this.m_color = this.getControllerAt(0);
            this.m_videoStatus = this.getControllerAt(1);
            this.m_n97 = (this.getChildAt(0));
            this.m_n98 = (this.getChildAt(1));
            this.m_icon = (this.getChildAt(2));
            this.m_n99 = (this.getChildAt(3));
        }
    }
    UI_BtnColor.URL = "ui://9kynrs2zk0kn4a";

    class UI_MessageBoxView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameCommandUI", "MessageBoxView"));
        }
        onConstruct() {
            this.m_n44 = (this.getChildAt(0));
            this.m_n45 = (this.getChildAt(1));
            this.m_n46 = (this.getChildAt(2));
            this.m_ContentLabel = (this.getChildAt(3));
            this.m_TitleLabel = (this.getChildAt(4));
            this.m_CancelBtn = (this.getChildAt(5));
            this.m_ConfirmBtn = (this.getChildAt(6));
            this.m_n39 = (this.getChildAt(7));
            this.m_t0 = this.getTransitionAt(0);
        }
    }
    UI_MessageBoxView.URL = "ui://9kynrs2zlo4q3";

    class UI_ShareVideoView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameCommandUI", "ShareVideoView"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
            this.m_n30 = (this.getChildAt(1));
            this.m_ImageLoader = (this.getChildAt(2));
            this.m_CloseBtn = (this.getChildAt(3));
            this.m_n42 = (this.getChildAt(4));
            this.m_n39 = (this.getChildAt(5));
            this.m_t0 = this.getTransitionAt(0);
        }
    }
    UI_ShareVideoView.URL = "ui://9kynrs2zs24q4g";

    class UI_CommandButton extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameCommandUI", "CommandButton"));
        }
        onConstruct() {
            this.m_icon = (this.getChildAt(0));
            this.m_title = (this.getChildAt(1));
        }
    }
    UI_CommandButton.URL = "ui://9kynrs2zs24q4l";

    class GameCommandUIBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_BtnColor.URL, UI_BtnColor);
            fgui.UIObjectFactory.setExtension(UI_MessageBoxView.URL, UI_MessageBoxView);
            fgui.UIObjectFactory.setExtension(UI_ToastView.URL, UI_ToastView);
            fgui.UIObjectFactory.setExtension(UI_ShareVideoView.URL, UI_ShareVideoView);
            fgui.UIObjectFactory.setExtension(UI_CommandButton.URL, UI_CommandButton);
            fgui.UIObjectFactory.setExtension(UI_FadeView.URL, UI_FadeView);
        }
    }

    class ResourcesManager {
        constructor() {
            this.hashData = [];
            this.gameUIPacakge = "";
            this.gameURLS = [];
            this.gameModelURLS = [];
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new ResourcesManager();
            }
            return this._inst;
        }
        get GameConfigRes() { return "res/data/configs.json"; }
        readHashFile() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let file = Platforms.inst.userDataPath() + "downloadHash.json";
                    Laya.loader.load(file, Laya.Handler.create(this, (res) => {
                        if (res) {
                            this.hashData = Laya.loader.getRes(file);
                            resolve(JSON.stringify(this.hashData));
                        }
                        else {
                            Platforms.inst.writeFileSync("downloadHash.json", JSON.stringify([]));
                            resolve("[]");
                        }
                    }));
                });
            });
        }
        registerGameUIInfo(packageURL, resUrls) {
            this.gameUIPacakge = packageURL;
            this.gameURLS = resUrls;
        }
        registerModels(resUrls) {
            this.gameModelURLS = resUrls;
        }
        loadResource() {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("[ResourcesManager loadResource] 加载系统所需资源");
                if (GameEngine.inst.useZipAssets) {
                    let list = DataManager.inst.deepCopy(this.fileConfigs.systemFileList);
                    let p = 100 / list.length;
                    for (let index = 0; index < list.length; index++) {
                        const item = list[index];
                        EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, (index + 1) * p);
                        yield this.LoadZipAndUnZip(item.url);
                    }
                    if (Platforms.inst.platform == Platform.weixin_h5
                        || Platforms.inst.platform == Platform.toutiao_h5
                        || Platforms.inst.platform == Platform.vivo_h5) {
                        Laya.URL.basePath = Platforms.inst.userDataPath();
                    }
                    yield this.loadUI();
                    yield this.loadModel();
                    console.log("[ResourcesManager loadResource] 加载资源完成");
                }
                else {
                    yield this.loadUI();
                    yield this.loadModel();
                    console.log("[ResourcesManager loadResource] 加载资源完成");
                }
            });
        }
        getZipURL(key) {
            for (let index = 0; index < this.fileConfigs.fileList.length; index++) {
                const d = this.fileConfigs.fileList[index];
                if (d.key == key) {
                    return d.url;
                }
            }
            return "";
        }
        getZipData(key) {
            for (let index = 0; index < this.fileConfigs.fileList.length; index++) {
                const d = this.fileConfigs.fileList[index];
                if (d.key == key) {
                    return d;
                }
            }
            return null;
        }
        loadUI() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    Laya.loader.load(this.gameURLS, Laya.Handler.create(this, (res) => __awaiter(this, void 0, void 0, function* () {
                        if (res) {
                            console.log("加载UI资源完成");
                            fairygui.UIPackage.addPackage(this.gameUIPacakge);
                            GameUIBinder.bindAll();
                            fairygui.UIPackage.addPackage("res/ui/GameCommandUI");
                            GameCommandUIBinder.bindAll();
                            resolve(true);
                        }
                        else {
                            console.log("加载UI资源失败,重试");
                            yield this.loadUI();
                        }
                    })), Laya.Handler.create(this, (p) => {
                    }, null, false));
                });
            });
        }
        loadModel() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    if (this.gameModelURLS.length == 0) {
                        EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, 100);
                        resolve(true);
                    }
                    else {
                        Laya.loader.create(this.gameModelURLS, Laya.Handler.create(this, (res) => __awaiter(this, void 0, void 0, function* () {
                            if (res) {
                                console.log("加载模型资源完成");
                                resolve(true);
                            }
                            else {
                                console.log("加载模型资源失败,重试");
                            }
                        })), Laya.Handler.create(this, (p) => {
                            EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, 50 + p * 50);
                        }, null, false));
                    }
                });
            });
        }
        loadLocalFiles() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    GameEngine.inst.debug("ResourceManager - 加载本地内容");
                    fgui.UIConfig.packageFileExtension = "bin";
                    let urls = [];
                    urls.push({ url: "localRes/ui/GameLoadingUI_atlas0.png", type: Laya.Loader.IMAGE });
                    urls.push({ url: "localRes/ui/GameLoadingUI.bin", type: Laya.Loader.BUFFER });
                    urls.push({ url: "localRes/data/platformConfigs.json", type: Laya.Loader.JSON });
                    Laya.loader.load(urls, Laya.Handler.create(this, (res) => {
                        if (res) {
                            GameEngine.inst.debug("加载本地内容成功");
                            fairygui.UIPackage.addPackage("localRes/ui/GameLoadingUI");
                            GameLoadingUIBinder.bindAll();
                            UIManager.inst.showPopupView(new LoadingViewController());
                            resolve(true);
                        }
                        else {
                            GameEngine.inst.debug("加载本地内容失败");
                            resolve(false);
                        }
                    }));
                });
            });
        }
        getSprite3d(url, callback) {
            if (this.gameModelURLS.indexOf(url) != -1) {
                callback.runWith(Laya.loader.getRes(url));
            }
            else {
                Laya.loader.create(url, Laya.Handler.create(this, () => {
                    this.gameModelURLS.push(url);
                    callback.runWith(Laya.loader.getRes(url));
                }));
            }
        }
        getImageThumb(resName) {
            let url = fairygui.UIPackage.getItemURL("GameUI", resName);
            return url;
        }
        getZipBundlePath(path) {
            let s = path.split('/');
            let fileName = s[s.length - 1].split('.')[0];
            let url = "res/assets/" + fileName + ".zip";
            return url;
        }
        getJsonPath(path) {
            let s = path.split('/');
            let fileName = s[s.length - 1].split('.')[0];
            let url = "res/assets/" + fileName + ".json";
            return url;
        }
        clearResAll(url, callback) {
            let assetURL = url.split('.')[0] + "_asset.json";
            console.log("清理lh文件所有显存:", assetURL);
            let urls = [];
            urls.push({ url: assetURL, type: Laya.Loader.JSON });
            Laya.loader.load(urls, Laya.Handler.create(this, (success) => {
                if (success) {
                    let json = Laya.loader.getRes(assetURL);
                    let assets = json.assets;
                    for (let index = 0; index < assets.length; index++) {
                        const url = Laya.URL.basePath + assets[index];
                        for (const key in Laya.Loader.loadedMap) {
                            let item = Laya.Loader.loadedMap[key];
                            if (item.url && item.url.indexOf(url) != -1) {
                                if (item instanceof Laya.Texture2D) {
                                    item.destroy();
                                }
                                else if (item instanceof Laya.Mesh) {
                                    item.destroy();
                                }
                                Laya.Loader.clearRes(item.url);
                            }
                        }
                    }
                    callback && callback.run();
                }
            }));
        }
        getZipPath(path) {
            let s = path.split('/');
            let fileName = s[s.length - 1].split('.')[0];
            let url = this.getZipURL(fileName);
            return url;
        }
        LoadZipAndUnZip(zipUrl) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    if (Platforms.inst.platform == Platform.weixin_h5
                        || Platforms.inst.platform == Platform.toutiao_h5
                        || Platforms.inst.platform == Platform.vivo_h5) {
                        let candownLoad = true;
                        if (this.hashData && this.hashData.length > 0) {
                            for (let index = 0; index < this.hashData.length; index++) {
                                const url = this.hashData[index];
                                if (zipUrl == url) {
                                    console.log(zipUrl, " 已经有了");
                                    resolve(true);
                                    candownLoad = false;
                                }
                            }
                        }
                        if (candownLoad) {
                            Platforms.inst.downloadFile(zipUrl, (success, res) => {
                                if (success) {
                                    let tmpFile = res.tempFilePath;
                                    console.log("tmpfile:", tmpFile);
                                    Platforms.inst.unzip(tmpFile, (success) => {
                                        if (success) {
                                            console.log("解压zip包成功!!!!!");
                                            this.hashData.push(zipUrl);
                                            Platforms.inst.writeFileSync("downloadHash.json", JSON.stringify(this.hashData));
                                            resolve(true);
                                        }
                                        else {
                                            console.warn("解压zip包失败");
                                            resolve(false);
                                        }
                                    });
                                }
                                else {
                                    console.warn("下载zip包失败");
                                    resolve(false);
                                }
                            });
                        }
                    }
                    else {
                        resolve(true);
                    }
                }));
            });
        }
        loadFiles(urls) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    Laya.loader.load(urls, Laya.Handler.create(this, (res) => {
                        if (res) {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    }));
                });
            });
        }
    }

    class CarBagData {
    }
    class StageBagData {
    }
    class CarData {
    }

    class DataManager {
        constructor() {
            this._user = new User();
            this.carConfigs = [];
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new DataManager();
            }
            return this._inst;
        }
        get user() {
            return this._user;
        }
        init() { }
        initData() {
            let configs = Laya.loader.getRes(ResourcesManager.inst.GameConfigRes);
            this.carConfigs = configs["CarConfigs"];
            this.load();
            this.checkOldData();
            console.log("用户信息:", this._user);
        }
        generalUser() {
            let user = new User();
            user.userInfo = new UserInfo();
            user.userInfo.nickName = "ym_" + MathHelper.newGuid();
            user.userInfo.openid = MathHelper.newGuid();
            user.coins = 0;
            user.gems = 0;
            user.score = 0;
            user.currentStage = 0;
            user.currentCarId = "1";
            user.carBags = new Array();
            let carBagData = new CarBagData();
            carBagData._id = "1";
            carBagData.isUnlock = true;
            user.carBags.push(carBagData);
            user.stageBags = new Array();
            return user;
        }
        resetData() {
            Laya.LocalStorage.clear();
            this._user = this.generalUser();
            this.save();
        }
        resetUser() {
            Laya.LocalStorage.clear();
            this._user = this.generalUser();
            this.save();
            EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
        }
        addCoins(coins, reset = true) {
            this._user.coins += coins;
            if (reset) {
                EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
            }
            this.save();
        }
        addGems(gems) {
            this._user.gems += gems;
            EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
            this.save();
        }
        save() {
            GameEngine.inst.saveData(LocalStorageManager.inst.userDataKey, this._user);
        }
        load() {
            let localUser = GameEngine.inst.loadData(LocalStorageManager.inst.userDataKey);
            if (localUser) {
                this._user = localUser;
            }
            else {
                this._user = this.generalUser();
                this.save();
            }
        }
        checkOldData() {
        }
        clearStage() {
            this.user.currentStage++;
            EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
            this.save();
        }
        isUnlockCar(id) {
            let carBagData = this.user.carBags.find(i => i._id == id);
            if (carBagData && carBagData.isUnlock)
                return true;
            return false;
        }
        getCarData(id) {
        }
        getCarIndex(id) {
            let index = this.user.carBags.findIndex(i => i._id == id);
            if (index == -1) {
                index = 0;
            }
            return index;
        }
        buyCar(id) {
            let carBagData = this.user.carBags.find(i => i._id == id);
            if (carBagData == null) {
                let data = new CarBagData();
                data._id = id;
                data.isUnlock = true;
                this.user.carBags.push(data);
                this.save();
            }
        }
        useCar(id) {
            this.user.currentCarId = id;
            this.save();
        }
        deepCopy(source) {
            return JSON.parse(JSON.stringify(source));
        }
    }

    class OPPOH5GameAPI {
        constructor() {
            this.qg = window['qg'];
            this.systemInfo = null;
            this.m_bannerAd = null;
            this.m_bannerHeight = 170;
            this.m_isBannerShow = false;
            this.m_videoAd = null;
            this.m_videoAdIsLoaded = false;
            this.m_insertAd = null;
            this.m_nativeAd = null;
            this.m_nativeIconAd = null;
            this.canLoadInsertAd = false;
            this.insertAdReadyInterval = 10000;
            this.insertAdShowCD = 40000;
            this.canInsertAdErroShowBanner = false;
            this.deskTopRecordKey = "";
            this.bannerRecordKey = "";
            this.adShowTime = 1000;
            this.canShowAd = false;
        }
        userDataPath() {
            throw new Error("Method not implemented.");
        }
        downloadFile(url, callback) {
            throw new Error("Method not implemented.");
        }
        unzip(url, callback) {
            throw new Error("Method not implemented.");
        }
        readFile(filePath, callback) {
            throw new Error("Method not implemented.");
        }
        writeFileSync(filePath, data) {
            throw new Error("Method not implemented.");
        }
        hasShortcutInstalled(callback) {
            if (this.deskTopRecord.isGet == true) {
                GameEngine.inst.debug("今日已经领取了ICON奖励");
                callback(true);
                return;
            }
            if (this.qg) {
                this.qg.hasShortcutInstalled({
                    success: function (status) {
                        if (status) {
                            GameEngine.inst.debug('桌面图标已创建');
                            callback(true);
                        }
                        else {
                            GameEngine.inst.debug('桌面图标未创建');
                            callback(false);
                        }
                    }
                });
            }
            else {
                callback(false);
            }
        }
        installShortcut(callback) {
            if (this.qg) {
                if (this.deskTopRecord.isGet == true) {
                    GameEngine.inst.debug("今日已经领取了ICON奖励");
                    return;
                }
                let self = this;
                this.qg.hasShortcutInstalled({
                    success: function (res) {
                        if (res == false) {
                            self.qg.installShortcut({
                                success: function () {
                                    GameEngine.inst.debug("OPPOH5GameAPI.installShortcut 安装图标成功");
                                },
                                fail: function (err) {
                                    GameEngine.inst.debug(`OPPOH5GameAPI.installShortcut 安装图标失败 ${JSON.stringify(err)}`);
                                },
                                complete: function () { }
                            });
                            Laya.timer.once(1000, this, () => {
                                self.qg.hasShortcutInstalled({
                                    success: (res) => {
                                        if (res == false) {
                                            callback(false);
                                        }
                                        else {
                                            self.deskTopRecord.isGet = true;
                                            self.deskTopRecord.date = DateHelper.getTime();
                                            self.saveDataToCache(self.deskTopRecordKey, self.deskTopRecord);
                                            callback(true);
                                            GameEngine.inst.debug("OPPOH5GameAPI.hasShortcutInstalled 安装图标成功");
                                        }
                                    },
                                    fail: function (err) {
                                        GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 安装图标失败 ${JSON.stringify(err)}`);
                                        callback(false);
                                    },
                                    complete: function () { }
                                });
                            });
                        }
                        else {
                            GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 已安装图标`);
                            callback(false);
                        }
                    },
                    fail: function (err) {
                        GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 安装桌面图标出错 ${JSON.stringify(err)}`);
                        callback(false);
                    },
                    complete: function () { }
                });
            }
            else {
                this.deskTopRecord.isGet = true;
                this.deskTopRecord.date = DateHelper.getTime();
                this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
                callback(true);
                GameEngine.inst.debug("OPPOH5GameAPI.installShortcut 安装图标成功");
            }
            GameEngine.inst.debug("OPPOH5GameAPI.installShortcut 安装图标");
        }
        checkDesktop() {
            this.deskTopRecordKey = LocalStorageManager.inst.shortcutKey;
            this.deskTopRecord = this.readDataFromCache(this.deskTopRecordKey);
            if (this.deskTopRecord == null || this.deskTopRecord == undefined) {
                this.deskTopRecord = {
                    isGet: false, date: ""
                };
                this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            }
            else {
                let day = MathHelper.countDay(DateHelper.getTime(), this.deskTopRecord.date);
                if (day >= 1) {
                    this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
                }
            }
            console.log("桌面图标本地记录信息:", this.deskTopRecord);
        }
        setLoadingProgress(progress) {
            if (this.qg) {
                this.qg.setLoadingProgress({
                    progress: progress
                });
            }
        }
        loadingComplete() {
            if (this.qg) {
                this.qg.loadingComplete({});
                GameEngine.inst.debug("OPPOH5GameAPI.loadingComplete");
            }
        }
        versionCompareUsage(version) {
            if (this.platformVersionCode >= version) {
                return true;
            }
            return false;
        }
        onInit(_callback) {
            this.checkDesktop();
            this.checkBanner();
            this.canShowAd = false;
            Laya.timer.once(this.adShowTime, this, () => {
                this.canShowAd = true;
                GameEngine.inst.debug("倒计结束,广告可以显示了");
            });
            if (this.qg) {
                OPPOH5GameAPI.inst = this;
                this.systemInfo = this.qg.getSystemInfoSync();
                GameEngine.inst.debug(`OPPO系统信息:${JSON.stringify(this.systemInfo)}`);
                this.platformVersionCode = this.systemInfo.platformVersionCode;
                this.qg.setEnableDebug({
                    enableDebug: false,
                    success: function () {
                        console.log("test consol log");
                        console.info("test console info");
                        console.warn("test consol warn");
                        console.debug("test consol debug");
                        console.error("test consol error");
                    },
                    complete: function () {
                    },
                    fail: function () {
                    }
                });
                this.qg.onShow((res) => {
                    Laya.timer.scale = 1;
                });
                this.qg.onHide(() => {
                    Laya.timer.scale = 0;
                });
                this.reportMonitor("game_scene", 0);
            }
            else {
                this.qg = null;
            }
            _callback && _callback();
            GameEngine.inst.debug("OPPOH5GameAPI.onInit");
        }
        onInitAdService(callback) {
            if (this.qg) {
            }
            callback && callback();
            GameEngine.inst.debug('OPPOH5GameAPI onInitAdService');
        }
        reportMonitor(name, value) {
            if (this.qg) {
                if (this.versionCompareUsage(1060) == false) {
                    GameEngine.inst.debug("数据上报需要最小平台号1060");
                    return;
                }
                this.qg.reportMonitor(name, value);
                GameEngine.inst.debug("OPPOH5GameAPI reportMonitor");
            }
        }
        onLogin(callback) {
            if (this.qg) {
                this.qg.login({
                    success: function (res) {
                        var data = JSON.stringify(res.data);
                        GameEngine.inst.debug(`OPPOH5GameAPI.onLogin 成功:${JSON.stringify(data)}`);
                        DataManager.inst.user.userInfo.token = res.data.token;
                        DataManager.inst.save();
                        callback && callback(true);
                    },
                    fail: function (res) {
                        GameEngine.inst.debug(`OPPOH5GameAPI.onLogin 失败:${JSON.stringify(res)}`);
                        callback && callback(false);
                    }
                });
            }
            else {
                callback && callback(true);
            }
        }
        createInnerAudioContext() {
            if (this.qg) {
                return this.qg.createInnerAudioContext();
            }
            return null;
        }
        pay(paymentData, callback) {
            if (this.qg) {
                paymentData.openId = DataManager.inst.user.userInfo.token;
                paymentData.engineVersion = this.platformVersionCode.toString();
                paymentData.appVersion = "1.0.0";
                let self = this;
                var xhp = new HttpRequestExtension();
                GameEngine.inst.debug(`发起支付:${JSON.stringify(paymentData)}`);
                xhp.Post("https://payment.coschat.com/api/Oppo/PreOrder", paymentData, this, function (res) {
                    GameEngine.inst.debug(`服务器验证返回${JSON.stringify(res)}`);
                    this.saveDataToCache(LocalStorageManager.inst.payTempRecordKey, { orderNo: res.orderNo, token: paymentData.openId, point: paymentData.point });
                    if (res.code == "200") {
                        GameEngine.inst.debug(`服务器验证成功`);
                        this.qg.pay({
                            appId: parseInt(PlatformConfig.inst.currentPlatform.appId),
                            token: paymentData.openId,
                            timestamp: res.timestamp,
                            paySign: res.paySign,
                            orderNo: res.orderNo,
                            success: function (payres) {
                                self.saveDataToCache(LocalStorageManager.inst.payTempRecordKey, null);
                                GameEngine.inst.debug(`支付成功:${JSON.stringify(payres.data)}`);
                                callback(true, "支付成功");
                            },
                            fail: function (payres) {
                                GameEngine.inst.debug(`支付失败:${JSON.stringify(payres)}`);
                                callback(false, payres.data);
                            }
                        });
                    }
                    else {
                        GameEngine.inst.debug(`服务器验证支付失败${JSON.stringify(res)}`);
                        callback(false, res.msg);
                    }
                });
            }
            else {
                this.saveDataToCache(LocalStorageManager.inst.payTempRecordKey, null);
                callback && callback(true, "支付成功");
            }
        }
        checkBanner() {
            this.bannerRecord = this.readDataFromCache(this.bannerRecordKey);
            if (this.bannerRecord == null || this.bannerRecord == undefined) {
                this.bannerRecord = { hideCount: 5, date: "" };
                this.saveDataToCache(this.bannerRecordKey, this.bannerRecord);
            }
            else {
                let day = MathHelper.countDay(DateHelper.getTime(), this.bannerRecord.date);
                if (day >= 1) {
                    this.bannerRecord = { hideCount: 5, date: "" };
                    this.saveDataToCache(this.bannerRecordKey, this.bannerRecord);
                }
            }
            console.log("Banner本地记录:", this.bannerRecord);
        }
        createBannerAd() { }
        onShowBanner(key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.bannerRecord.hideCount <= 0) {
                GameEngine.inst.debug("今天已经关闭了Banner5次，不再显示Banner");
                return;
            }
            if (this.canShowAd == false) {
                GameEngine.inst.debug("开始游戏1分钟内不展示Banner广告");
                return;
            }
            let adData = PlatformConfig.inst.getBannerAdData(key);
            if (adData == null) {
                GameEngine.inst.debug("没有Banner广告数据");
                return;
            }
            console.log("Banner广告数据:", adData.key, adData.adId);
            if (this.qg) {
                this.onDestoryBanner();
                this.m_bannerAd = this.qg.createBannerAd({ adUnitId: adData.adId });
                this.m_bannerAd.onShow(this.onBannerAdShow);
                this.m_bannerAd.onError(this.onBannerAdError);
                this.m_bannerAd.onHide(this.onBannerHide);
                this.m_bannerAd.show();
                GameEngine.inst.debug('OPPOH5GameAPI.onShowBanner');
            }
        }
        onBannerAdShow() {
            OPPOH5GameAPI.inst.m_isBannerShow = true;
            OPPOH5GameAPI.inst.m_bannerHeight = 170;
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
            GameEngine.inst.debug('OPPOH5GameAPI.onBannerAdShow 显示Banner广告成功');
        }
        onBannerAdError(err) {
            OPPOH5GameAPI.inst.m_isBannerShow = false;
            OPPOH5GameAPI.inst.m_bannerHeight = 170;
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            GameEngine.inst.debug(`OPPOH5GameAPI.onBannerAdError Banner广告错误 ${JSON.stringify(err)}`);
        }
        onBannerHide() {
            if (OPPOH5GameAPI.inst.bannerRecord.hideCount > 0) {
                OPPOH5GameAPI.inst.bannerRecord.hideCount--;
                if (OPPOH5GameAPI.inst.bannerRecord.hideCount == 0) {
                    OPPOH5GameAPI.inst.bannerRecord.date = DateHelper.getTime();
                }
                OPPOH5GameAPI.inst.saveDataToCache(OPPOH5GameAPI.inst.bannerRecordKey, OPPOH5GameAPI.inst.bannerRecord);
            }
            OPPOH5GameAPI.inst.m_isBannerShow = false;
            OPPOH5GameAPI.inst.m_bannerHeight = 170;
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            console.log('BannerAd onHide,剩余隐藏次数:', OPPOH5GameAPI.inst.bannerRecord.hideCount);
        }
        onHideBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_bannerAd) {
                    this.m_bannerAd.hide();
                    this.m_bannerHeight = 170;
                    this.m_isBannerShow = false;
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                }
                GameEngine.inst.debug('OPPOH5GameAPI.onHideBanner 隐藏Banner广告');
            }
        }
        onDestoryBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_bannerAd) {
                    this.m_bannerHeight = 170;
                    this.m_isBannerShow = false;
                    this.m_bannerAd.offShow(this.onBannerAdShow);
                    this.m_bannerAd.offError(this.onBannerAdError);
                    this.m_bannerAd.offHide(this.onBannerHide);
                    this.m_bannerAd.destroy();
                    this.m_bannerAd = null;
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                    GameEngine.inst.debug('OPPOH5GameAPI.onDestoryBanner 销毁Banner广告');
                }
            }
        }
        createRewardedVideoAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
        }
        clearVideoCallbacks() {
            this.onVideoSuccessCallback = null;
            this.onVideoFailCallback = null;
        }
        onShowRewardedVideo(_successCallback, _failCallback, key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                return;
            }
            if (this.qg == null || this.qg == undefined) {
                _successCallback && _successCallback();
                return;
            }
            let adData = null;
            if (key && key.length > 0) {
                adData = PlatformConfig.inst.getVideoAdData(key);
            }
            if (adData == null) {
                _failCallback && _failCallback(1, "");
                return;
            }
            if (this.m_videoAd) {
                this.clearVideoCallbacks();
                this.m_videoAd.offLoad(this.rewardVideoOnLoad);
                this.m_videoAd.offError(this.rewardVideoOnError);
                this.m_videoAd.offClose(this.rewardVideoOnClose);
                this.m_videoAd.destroy();
            }
            this.onVideoSuccessCallback = _successCallback;
            this.onVideoFailCallback = _failCallback;
            this.m_videoAd = this.qg.createRewardedVideoAd({
                adUnitId: adData.adId
            });
            this.m_videoAd.load();
            this.m_videoAd.onLoad(this.rewardVideoOnLoad);
            this.m_videoAd.onError(this.rewardVideoOnError);
            this.m_videoAd.onClose(this.rewardVideoOnClose);
            GameEngine.inst.debug("OPPOH5GameAPI.onShowRewardedVideo");
        }
        rewardVideoOnLoad() {
            GameEngine.inst.debug("OPPOH5GameAPI.RewardedVideo.onLoad 激励视频加载成功");
            OPPOH5GameAPI.inst.m_videoAdIsLoaded = true;
            OPPOH5GameAPI.inst.m_videoAd.show();
        }
        rewardVideoOnError(err) {
            GameEngine.inst.debug(`OPPOH5GameAPI.RewardedVideo.onError 激励视频加载错误 ${JSON.stringify(err)}`);
            OPPOH5GameAPI.inst.m_videoAdIsLoaded = false;
            OPPOH5GameAPI.inst.onVideoFailCallback && OPPOH5GameAPI.inst.onVideoFailCallback(1, "");
            OPPOH5GameAPI.inst.clearVideoCallbacks();
        }
        rewardVideoOnClose(res) {
            if (res.isEnded) {
                GameEngine.inst.debug("OPPOH5GameAPI.RewardedVideo.onClose 激励视频广告完成，发放奖励");
                OPPOH5GameAPI.inst.onVideoSuccessCallback && OPPOH5GameAPI.inst.onVideoSuccessCallback();
                OPPOH5GameAPI.inst.m_videoAdIsLoaded = false;
                OPPOH5GameAPI.inst.clearVideoCallbacks();
            }
            else {
                GameEngine.inst.debug("OPPOH5GameAPI.RewardedVideo.onClose 激励视频广告取消关闭，不发放奖励");
                OPPOH5GameAPI.inst.onVideoFailCallback && OPPOH5GameAPI.inst.onVideoFailCallback(4, "激励视频广告取消关闭，不发放奖励");
                OPPOH5GameAPI.inst.clearVideoCallbacks();
            }
        }
        createInsertAd() {
        }
        _createInsertAd() {
        }
        onShowInsertAd() {
        }
        onDestoryInsertAd() {
        }
        onInsertAdLoaded() {
        }
        countDowwInsertTime() {
        }
        _countDownInsertTime() {
        }
        onInsertAdClose() {
        }
        onInsertAdError(err) {
        }
        createNativeAd() { }
        onShowNativeAd(callback, key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.canShowAd == false) {
                GameEngine.inst.debug("开始游戏1分钟内不展示原生广告");
                return;
            }
            let adData = null;
            if (key && key.length > 0) {
                adData = PlatformConfig.inst.getNativeAdData(key);
            }
            if (adData == null) {
                GameEngine.inst.debug("原生AdData数据空");
                return;
            }
            console.log("原生AdData数据:", adData.key, adData.adId);
            if (this.qg) {
                this.onDestroyNativeAd();
                this.m_nativeAd = this.qg.createNativeAd({
                    adUnitId: adData.adId
                });
                this.m_nativeAd.onError(this.onNativeAdError);
                this.m_nativeAd.onLoad(this.onNativeAdLoad);
                if (this.m_nativeAd) {
                    this.nativeAdOnLoad = callback;
                    this.m_nativeAd.load();
                }
                GameEngine.inst.debug("OPPOH5GameAPI.onShowNativeAd");
            }
            else {
                callback && callback(null);
            }
        }
        onDestroyNativeAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_nativeAd) {
                    this.nativeAdOnLoad = null;
                    this.m_nativeAd.offError(this.onNativeAdError);
                    this.m_nativeAd.offLoad(this.onNativeAdLoad);
                    this.m_nativeAd.destroy();
                    this.m_nativeAd = null;
                }
                GameEngine.inst.debug("OPPOH5GameAPI.onDestroyNativeAd");
            }
        }
        onNativeAdClick(_id) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_nativeAd) {
                    GameEngine.inst.debug(`OPPOH5GameAPI.reportAdClick 原生广告上报点击${_id}`);
                    this.m_nativeAd.reportAdClick({
                        adId: _id
                    });
                    this.onNativeAdClose();
                }
                GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdClick ${_id}`);
            }
        }
        onNativeAdClose() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            this.onDestroyNativeAd();
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdClose 关闭原生广告`);
        }
        countDownNativeAdTime() {
            this.canLoadInsertAd = false;
            Laya.timer.clear(this, this._countDownNativeAdTime);
            Laya.timer.once(this.insertAdShowCD, this, this._countDownNativeAdTime);
            GameEngine.inst.debug(`OPPOH5GameAPI 原生插屏需要倒计:${this.insertAdShowCD}秒`);
        }
        _countDownNativeAdTime() {
            this.canLoadInsertAd = true;
            GameEngine.inst.debug(`OPPOH5GameAPI 原生插屏倒计完成 ${this.canLoadInsertAd}`);
        }
        onNativeAdLoad(res) {
            if (res !== null && res !== undefined) {
                GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdLoad 原生广告加载成功 ${JSON.stringify(res.adList)}`);
                OPPOH5GameAPI.inst.onDestoryBanner();
                let data = res.adList.pop();
                OPPOH5GameAPI.inst.m_nativeAd.reportAdShow({
                    adId: data.adId
                });
                if (OPPOH5GameAPI.inst.nativeAdOnLoad) {
                    OPPOH5GameAPI.inst.nativeAdOnLoad(data);
                }
            }
        }
        onNativeAdError(err) {
            OPPOH5GameAPI.inst.canLoadInsertAd = true;
            if (OPPOH5GameAPI.inst.nativeAdOnLoad) {
                OPPOH5GameAPI.inst.nativeAdOnLoad(null);
            }
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdError ${JSON.stringify(err)}`);
        }
        createNativeIconAd() { }
        onShowNativeIconAd(callback, key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.canShowAd == false) {
                GameEngine.inst.debug("开始游戏1分钟内不展示原生Icon广告");
                return;
            }
            let adData = null;
            if (key && key.length > 0) {
                adData = PlatformConfig.inst.getNativeIconAdData(key);
            }
            if (adData == null) {
                GameEngine.inst.debug("原生图标AdData数据空");
                return;
            }
            console.log("原生图标AdData:", adData.key, adData.adId);
            if (this.qg) {
                this.onDestroyNativeIconAd();
                this.m_nativeIconAd = this.qg.createNativeAd({
                    adUnitId: adData.adId
                });
                this.m_nativeIconAd.onError(this.onNativeIconAdError);
                this.m_nativeIconAd.onLoad(this.onNativeIconAdLoad);
                if (this.m_nativeIconAd) {
                    OPPOH5GameAPI.inst.nativeIconAdOnLoad = callback;
                    this.m_nativeIconAd.load();
                }
                GameEngine.inst.debug('OPPOH5GameAPI.onShowNativeIconAd');
            }
            else {
                callback && callback(null);
            }
        }
        onDestroyNativeIconAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_nativeIconAd) {
                    this.nativeIconAdOnLoad = null;
                    this.m_nativeIconAd.offError(this.onNativeIconAdError);
                    this.m_nativeIconAd.offLoad(this.onNativeIconAdLoad);
                    this.m_nativeIconAd.destroy();
                    this.m_nativeIconAd = null;
                }
                GameEngine.inst.debug('OPPOH5GameAPI.onDestroyNativeIconAd');
            }
        }
        onNativeIconAdError(err) {
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeIconAdError ${JSON.stringify(err)}`);
        }
        onNativeIconAdLoad(res) {
            if (res !== null && res !== undefined) {
                let data = res.adList.pop();
                OPPOH5GameAPI.inst.m_nativeIconAd.reportAdShow({
                    adId: data.adId
                });
                if (OPPOH5GameAPI.inst.nativeIconAdOnLoad) {
                    OPPOH5GameAPI.inst.nativeIconAdOnLoad(data);
                }
            }
        }
        onNativeIconAdClick(_id) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_nativeIconAd) {
                    this.m_nativeIconAd.reportAdClick({
                        adId: _id
                    });
                    this.onNativeIconAdClose();
                }
                GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdLoad 原生ICON广告加载成功 ${JSON.stringify(_id)}`);
            }
        }
        onNativeIconAdClose() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                this.onDestroyNativeIconAd();
                GameEngine.inst.debug(`OPPOH5GameAPI.onNativeIconAdClose`);
            }
        }
        navigateToMiniGame(object) {
            if (this.qg) {
                this.qg.navigateToMiniGame({
                    pkgName: object,
                    success: function () { },
                    fail: function (res) {
                        console.log("跳转失败:", JSON.stringify(res));
                    }
                });
            }
            console.log(`OPPOH5GameAPI navigateToMiniGame`, JSON.stringify(object));
        }
        vibrateShort() {
            this.qg.vibrateShort({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }
        saveDataToCache(_key, _value) {
            Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        }
        readDataFromCache(_key) {
            return JSON.parse(Laya.LocalStorage.getItem(_key));
        }
        bannerHeight() {
            return this.m_bannerHeight;
        }
        notchHeight() {
            if (this.qg) {
                let scale = Laya.Browser.height / this.systemInfo.screenHeight;
                return this.systemInfo.statusBarHeight * scale;
            }
            return 20;
        }
        getScreenSize() {
            return new Laya.Size(750, 1334);
        }
        getPlatform() {
            return "";
        }
        getDevicePlatform() {
            return "";
        }
        isVertify() {
            return false;
        }
        sendEvent(obj) { }
        onShare() { }
        updateHighScore(_score) { }
        createAppBox() { }
        onShowAppBox() { }
        onHideAppBox() { }
        createMoreGamesButton(inStyle) { }
        hideMoreGameButton() { }
        onShareVideo(callback) { }
        onStartRecord() { }
        onStopRecord() { }
        showMoreGamesModal() { }
        addColorSign() { }
        onHideInsertAd() { }
        vibrateLong() {
            this.qg && this.qg.vibrateLong();
        }
    }

    var SoundType;
    (function (SoundType) {
        SoundType[SoundType["None"] = 0] = "None";
        SoundType[SoundType["BGM"] = 1] = "BGM";
        SoundType[SoundType["MainViewBGM"] = 2] = "MainViewBGM";
        SoundType[SoundType["SE_BuyItem"] = 3] = "SE_BuyItem";
        SoundType[SoundType["SE_Win"] = 4] = "SE_Win";
        SoundType[SoundType["SE_Lose"] = 5] = "SE_Lose";
    })(SoundType || (SoundType = {}));
    var RewardType;
    (function (RewardType) {
        RewardType[RewardType["Coin"] = 0] = "Coin";
        RewardType[RewardType["Role"] = 1] = "Role";
        RewardType[RewardType["Buff"] = 2] = "Buff";
        RewardType[RewardType["Woods"] = 3] = "Woods";
        RewardType[RewardType["Diamond"] = 4] = "Diamond";
    })(RewardType || (RewardType = {}));
    var UnlockType;
    (function (UnlockType) {
        UnlockType[UnlockType["Free"] = 0] = "Free";
        UnlockType[UnlockType["Coin"] = 1] = "Coin";
        UnlockType[UnlockType["CoinOrVideo"] = 2] = "CoinOrVideo";
        UnlockType[UnlockType["Video"] = 3] = "Video";
        UnlockType[UnlockType["Diamond"] = 4] = "Diamond";
        UnlockType[UnlockType["Stage"] = 5] = "Stage";
        UnlockType[UnlockType["StageAndVideo"] = 6] = "StageAndVideo";
        UnlockType[UnlockType["StageAndRMB"] = 7] = "StageAndRMB";
        UnlockType[UnlockType["Other"] = 11] = "Other";
        UnlockType[UnlockType["Y_\u91CE\u602ABoss"] = 12] = "Y_\u91CE\u602ABoss";
    })(UnlockType || (UnlockType = {}));
    var GameState;
    (function (GameState) {
        GameState[GameState["StandBy"] = 0] = "StandBy";
        GameState[GameState["Play"] = 1] = "Play";
        GameState[GameState["Result"] = 2] = "Result";
    })(GameState || (GameState = {}));
    var FriendType;
    (function (FriendType) {
        FriendType[FriendType["None"] = 0] = "None";
        FriendType[FriendType["Enemy"] = 1] = "Enemy";
        FriendType[FriendType["Friend"] = 2] = "Friend";
    })(FriendType || (FriendType = {}));
    var RoleClass;
    (function (RoleClass) {
        RoleClass[RoleClass["Solider"] = 0] = "Solider";
        RoleClass[RoleClass["Hero"] = 1] = "Hero";
    })(RoleClass || (RoleClass = {}));
    var BuildingType;
    (function (BuildingType) {
        BuildingType["\u7A7A"] = "";
        BuildingType["\u4E3B\u57CE"] = "1";
        BuildingType["\u8FD1\u6218\u5175\u8425"] = "2";
        BuildingType["\u8FDC\u7A0B\u5175\u8425"] = "3";
        BuildingType["\u796D\u575B"] = "4";
        BuildingType["\u91D1\u77FF"] = "5";
        BuildingType["\u4F10\u6728\u573A"] = "6";
    })(BuildingType || (BuildingType = {}));
    var RangeType;
    (function (RangeType) {
        RangeType[RangeType["\u8FD1\u6218"] = 0] = "\u8FD1\u6218";
        RangeType[RangeType["\u8FDC\u7A0B"] = 1] = "\u8FDC\u7A0B";
    })(RangeType || (RangeType = {}));
    var ArmType;
    (function (ArmType) {
        ArmType[ArmType["None"] = 0] = "None";
        ArmType[ArmType["Infantry"] = 1] = "Infantry";
        ArmType[ArmType["Spear"] = 2] = "Spear";
        ArmType[ArmType["Bow"] = 3] = "Bow";
        ArmType[ArmType["Magic"] = 4] = "Magic";
        ArmType[ArmType["Cavalry"] = 5] = "Cavalry";
        ArmType[ArmType["Mechine"] = 6] = "Mechine";
        ArmType[ArmType["Building"] = 7] = "Building";
        ArmType[ArmType["Hero"] = 8] = "Hero";
    })(ArmType || (ArmType = {}));
    var MapGripType;
    (function (MapGripType) {
        MapGripType[MapGripType["J_\u91D1\u5E01"] = 3] = "J_\u91D1\u5E01";
        MapGripType[MapGripType["M_\u6728\u6750"] = 4] = "M_\u6728\u6750";
        MapGripType[MapGripType["Z_\u94BB\u77F3"] = 5] = "Z_\u94BB\u77F3";
        MapGripType[MapGripType["Z_\u4E3B\u89D2\u51FA\u751F\u70B9"] = 6] = "Z_\u4E3B\u89D2\u51FA\u751F\u70B9";
        MapGripType[MapGripType["B_Boss\u51FA\u751F\u70B9"] = 7] = "B_Boss\u51FA\u751F\u70B9";
        MapGripType[MapGripType["G_\u5173\u5361"] = 8] = "G_\u5173\u5361";
        MapGripType[MapGripType["T_\u4F53\u529B"] = 9] = "T_\u4F53\u529B";
        MapGripType[MapGripType["C_\u85CF\u5B9D\u56FE"] = 10] = "C_\u85CF\u5B9D\u56FE";
        MapGripType[MapGripType["P_\u666E\u901A\u5B9D\u7BB1"] = 11] = "P_\u666E\u901A\u5B9D\u7BB1";
        MapGripType[MapGripType["S_\u89C6\u9891\u5B9D\u7BB1"] = 12] = "S_\u89C6\u9891\u5B9D\u7BB1";
        MapGripType[MapGripType["B_\u8865\u5145\u5175\u529B"] = 13] = "B_\u8865\u5145\u5175\u529B";
    })(MapGripType || (MapGripType = {}));
    var BuffType;
    (function (BuffType) {
        BuffType[BuffType["G_\u653B\u51FB\u529B"] = 0] = "G_\u653B\u51FB\u529B";
        BuffType[BuffType["F_\u9632\u5FA1\u529B"] = 1] = "F_\u9632\u5FA1\u529B";
        BuffType[BuffType["H_\u6062\u590D"] = 2] = "H_\u6062\u590D";
        BuffType[BuffType["Z_\u53EC\u5524"] = 3] = "Z_\u53EC\u5524";
        BuffType[BuffType["S_\u4F24\u5BB3"] = 4] = "S_\u4F24\u5BB3";
        BuffType[BuffType["B_\u51B0\u51BB"] = 5] = "B_\u51B0\u51BB";
        BuffType[BuffType["S_\u751F\u547D"] = 6] = "S_\u751F\u547D";
        BuffType[BuffType["J_\u6280\u80FD\u4F24\u5BB3"] = 7] = "J_\u6280\u80FD\u4F24\u5BB3";
        BuffType[BuffType["Y_\u79FB\u52A8\u901F\u5EA6"] = 8] = "Y_\u79FB\u52A8\u901F\u5EA6";
        BuffType[BuffType["G_\u653B\u51FB\u901F\u5EA6"] = 9] = "G_\u653B\u51FB\u901F\u5EA6";
    })(BuffType || (BuffType = {}));
    var BenefitType;
    (function (BenefitType) {
        BenefitType[BenefitType["Up"] = 0] = "Up";
        BenefitType[BenefitType["Down"] = 1] = "Down";
    })(BenefitType || (BenefitType = {}));
    var TargetType;
    (function (TargetType) {
        TargetType[TargetType["K_\u7A7A"] = 0] = "K_\u7A7A";
        TargetType[TargetType["Z_\u81EA\u8EAB"] = 1] = "Z_\u81EA\u8EAB";
        TargetType[TargetType["D_\u654C\u65B9\u5355\u4F53"] = 2] = "D_\u654C\u65B9\u5355\u4F53";
        TargetType[TargetType["Y_\u53CB\u65B9\u5355\u4F53"] = 3] = "Y_\u53CB\u65B9\u5355\u4F53";
        TargetType[TargetType["F_\u8303\u56F4\u53CB\u519B"] = 4] = "F_\u8303\u56F4\u53CB\u519B";
        TargetType[TargetType["D_\u654C\u65B9\u5168\u4F53"] = 5] = "D_\u654C\u65B9\u5168\u4F53";
        TargetType[TargetType["D_\u53CB\u65B9\u5168\u4F53"] = 6] = "D_\u53CB\u65B9\u5168\u4F53";
        TargetType[TargetType["Z_\u5B50\u5F39\u8303\u56F4\u654C\u519B"] = 7] = "Z_\u5B50\u5F39\u8303\u56F4\u654C\u519B";
        TargetType[TargetType["Z_\u81EA\u8EAB\u8303\u56F4\u654C\u519B"] = 8] = "Z_\u81EA\u8EAB\u8303\u56F4\u654C\u519B";
    })(TargetType || (TargetType = {}));

    class SoundData {
        constructor() {
            this.type = SoundType.None;
            this.clipName = "";
        }
    }

    class SoundManager {
        constructor() {
            this._musicMuted = false;
            this._soundMuted = false;
            this.soundList = [];
            this.musicVolume = 1;
            this.soundVolume = 1;
            this.soundPools = [];
            this.playingList = [];
        }
        static get inst() {
            if (this.instance == null) {
                Laya.SoundManager.autoStopMusic = true;
                if (Laya.Browser.onIOS) {
                    Laya.SoundManager.useAudioMusic = false;
                }
                this.instance = new SoundManager();
            }
            return this.instance;
        }
        loadData() {
            let muteJson = GameEngine.inst.loadData(LocalStorageManager.inst.soundMuteDataKey);
            if (muteJson) {
                this._musicMuted = muteJson.musicMuted;
                this._soundMuted = muteJson.soundMuted;
            }
            GameEngine.inst.debug(`音乐本地数据：${JSON.stringify(muteJson)}`);
            this.setMusicMuted(this._musicMuted);
            this.setSoundMuted(this._soundMuted);
        }
        saveData() {
            GameEngine.inst.saveData(LocalStorageManager.inst.soundMuteDataKey, { musicMuted: this._musicMuted, soundMuted: this._soundMuted });
        }
        setMusicMuted(muted) {
            this._musicMuted = muted;
            if (muted == false) {
                this.musicVolume = 1;
                this.setVolume(this.musicVolume, "BGM");
                if (Platforms.inst.platform == Platform.vivo_h5) {
                    this.PlayCurrentMusic();
                }
            }
            else {
                this.musicVolume = 0.001;
                this.setVolume(this.musicVolume, "BGM");
            }
            this.saveData();
        }
        getMusicMuted() {
            return this._musicMuted;
        }
        setSoundMuted(muted) {
            this._soundMuted = muted;
            if (muted == false) {
                this.soundVolume = 1;
                this.setVolume(this.soundVolume, "SE");
            }
            else {
                this.soundVolume = 0.001;
                this.setVolume(this.soundVolume, "SE");
            }
            this.saveData();
        }
        getSoundMuted() {
            return this._soundMuted;
        }
        registerSound(type, clipName) {
            let data = new SoundData();
            data.type = type;
            data.clipName = clipName;
            this.soundList.push(data);
        }
        getAudio(key) {
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                if (item.key == key) {
                    return item;
                }
            }
            return null;
        }
        stopSound(type) {
            if (this.currentBgAudio) {
                this.currentBgAudio.pause();
            }
            if (type == "") {
                for (let index = 0; index < this.soundPools.length; index++) {
                    const item = this.soundPools[index];
                    item.audio.pause();
                }
            }
            else {
                for (let index = 0; index < this.soundPools.length; index++) {
                    const item = this.soundPools[index];
                    if (item.type == type) {
                        item.audio.pause();
                    }
                }
            }
        }
        pauseSound(type) {
            if (type == "") {
                for (let index = 0; index < this.soundPools.length; index++) {
                    const item = this.soundPools[index];
                    item.audio.pause();
                }
            }
            else {
                for (let index = 0; index < this.soundPools.length; index++) {
                    const item = this.soundPools[index];
                    if (item.type == type) {
                        item.audio.pause();
                    }
                }
            }
        }
        setVolume(volume, type = "") {
            if (volume <= 0.001) {
                volume = 0.001;
            }
            if (type == "") {
                for (let index = 0; index < this.soundPools.length; index++) {
                    const item = this.soundPools[index];
                    item.audio.volume = volume;
                }
                Laya.SoundManager.setMusicVolume(volume);
                Laya.SoundManager.setSoundVolume(volume);
                if (this.currentBgAudio) {
                    this.currentBgAudio.volume = volume;
                }
            }
            else {
                if (type == "BGM") {
                    Laya.SoundManager.setMusicVolume(volume);
                    if (this.currentBgAudio) {
                        this.currentBgAudio.volume = volume;
                    }
                }
                else if (type == "SE") {
                    Laya.SoundManager.setSoundVolume(volume);
                }
                for (let index = 0; index < this.soundPools.length; index++) {
                    const item = this.soundPools[index];
                    if (item.type == type) {
                        item.audio.volume = volume;
                    }
                }
            }
        }
        PlayCurrentMusic() {
            if (this.curretnType) {
                this.PlayMusic(this.curretnType);
            }
        }
        PlayMusic(type) {
            for (let index = 0; index < this.soundList.length; index++) {
                let data = this.soundList[index];
                if (data.type == type) {
                    if (Platforms.inst.platform == Platform.vivo_h5) {
                        this.curretnType = type;
                        if (this.currentBgAudio) {
                            this.currentBgAudio.stop();
                            this.currentBgAudio = null;
                        }
                        this.currentBgAudio = Platforms.inst.createInnerAudioContext();
                        if (this.currentBgAudio) {
                            this.currentBgAudio.src = Laya.URL.basePath + data.clipName;
                            this.currentBgAudio.loop = true;
                            this.currentBgAudio.volume = this.musicVolume;
                            this.currentBgAudio.play();
                        }
                        else {
                            Laya.SoundManager.playMusic(data.clipName, 0);
                        }
                    }
                    else {
                        this.stopSound("BGM");
                        let item = this.getAudio(data.clipName);
                        if (item) {
                            item.audio.volume = this.musicVolume;
                            item.audio.play();
                        }
                        else {
                            let audioContext = Platforms.inst.createInnerAudioContext();
                            if (audioContext) {
                                audioContext.src = Laya.URL.basePath + data.clipName;
                                audioContext.loop = true;
                                audioContext.volume = this.musicVolume;
                                audioContext.play();
                                this.soundPools.push({ key: data.clipName, audio: audioContext, type: "BGM", canplay: false });
                            }
                            else {
                                Laya.SoundManager.playMusic(data.clipName, 0);
                            }
                        }
                    }
                    this.setVolume(this.musicVolume, "BGM");
                }
            }
        }
        Play(type, loop = 1) {
            for (let index = 0; index < this.soundList.length; index++) {
                let data = this.soundList[index];
                if (data.type == type) {
                    if (this.playingList.indexOf(data.clipName) == -1) {
                        let c = Laya.SoundManager.playSound(data.clipName, loop);
                        this.playingList.push(data.clipName);
                        c.completeHandler = Laya.Handler.create(this, this.onSoundPlayComplete, [data.clipName]);
                    }
                    else {
                    }
                    this.setVolume(this.soundVolume, "SE");
                }
            }
        }
        PlayURL(url, loop = 1) {
            if (this.playingList.indexOf(url) == -1) {
                let c = Laya.SoundManager.playSound(url, loop);
                if (c) {
                    this.playingList.push(url);
                    c.completeHandler = Laya.Handler.create(this, this.onSoundPlayComplete, [url]);
                }
            }
            else {
            }
            this.setVolume(this.soundVolume, "SE");
        }
        onSoundPlayComplete(url) {
            let index = this.playingList.indexOf(url);
            this.playingList.splice(index, 1);
        }
    }

    class VivoH5GameAPI {
        constructor() {
            this.qg = window['qg'];
            this.systemInfo = null;
            this.m_bannerAd = null;
            this.m_videoAd = null;
            this.m_insertAd = null;
            this.m_nativeAd = null;
            this.m_nativeIconAd = null;
            this.m_videoAdIsLoaded = false;
            this.isVideoAdPlaying = false;
            this.m_bannerHeight = 170;
            this.m_bannerIsShow = false;
            this.ishide = false;
            this.isVideoAdFirstPlay = true;
            this.deskTopRecordKey = "";
            this.canLoadInsertAd = false;
            this.bannerAdShowCD = 10000;
            this.canShowBannerAd = true;
            this.rewardAdShowCD = 60000;
            this.insertAdShowCD = 40000;
            this.canShowRewardAd = true;
            this.insertAdReadyInterval = 10000;
            this.currentNativeAd = null;
            this.currentNativeIconAd = null;
        }
        downloadFile(url, callback) {
            if (this.qg) {
                if (this.downloadTask != null) {
                    this.downloadTask.abort();
                }
                this.downloadTask = this.qg.download({
                    url: url,
                    success(res) {
                        console.log("下载资源zip成功:", res);
                        callback && callback(true, res);
                    },
                    fail: function (data, code) {
                        callback && callback(false, null);
                    }
                });
            }
            else {
                callback && callback(false, null);
            }
        }
        unzip(url, callback) {
            if (this.qg) {
                this.qg.unzipFile({
                    srcUri: url,
                    dstUri: this.userDataPath(),
                    success: function (uri) {
                        console.log(`handling success: ${uri}`);
                        callback && callback(true);
                    },
                    fail: function (data, code) {
                        console.log(`handling fail, code = ${code}`);
                        callback && callback(false);
                    }
                });
            }
            else {
                callback && callback(false);
            }
        }
        readFile(filePath, callback) {
            if (this.qg) {
                let url = this.userDataPath() + filePath;
                console.log("readFileSync:", url);
                const result = this.qg.readFileSync({
                    uri: url,
                    encoding: 'utf8'
                });
                if (typeof result === 'string') {
                    console.log(`handling fail, error message = ${result}`);
                    callback && callback(false, "");
                }
                else {
                    callback && callback(true, result.text);
                }
            }
            else {
                callback && callback(false, "");
            }
        }
        writeFileSync(filePath, data) {
            if (this.qg) {
                let url = this.userDataPath() + filePath;
                const result = this.qg.writeFileSync({
                    uri: url,
                    text: data
                });
                if (result === 'success') {
                    console.log(`handling success`);
                }
                else {
                    console.log(`handling fail, result = ${result}`);
                }
            }
        }
        userDataPath() {
            return "internal://files/assets/";
        }
        versionCompareUsage(version) {
            if (this.platformVersionCode >= version) {
                return true;
            }
            return false;
        }
        onHide() {
            SoundManager.inst.setVolume(0);
            Laya.timer.scale = 0;
        }
        onShow() {
            Laya.timer.scale = 1;
            if (SoundManager.inst.getMusicMuted() == false) {
                if (this.isVideoAdPlaying == false) {
                    SoundManager.inst.setVolume(1);
                    SoundManager.inst.PlayCurrentMusic();
                }
            }
        }
        onInit(_callback) {
            this.checkDesktop();
            if (this.qg) {
                VivoH5GameAPI.inst = this;
                this.systemInfo = this.qg.getSystemInfoSync();
                GameEngine.inst.debug(`VIVO系统信息:${JSON.stringify(this.systemInfo)}`);
                this.platformVersionCode = this.systemInfo.platformVersionCode;
                this.insertAdReadyInterval = PlatformConfig.inst.currentPlatform.insertAdReadyInterval;
                this.bannerAdShowCD = PlatformConfig.inst.currentPlatform.bannerAdShowCD;
                this.rewardAdShowCD = PlatformConfig.inst.currentPlatform.rewardAdShowCD;
                this.insertAdShowCD = PlatformConfig.inst.currentPlatform.insertAdShowCD;
                Laya.timer.once(this.insertAdReadyInterval, this, () => {
                    this.canLoadInsertAd = true;
                });
                this.qg.onShow(() => {
                    this.onShow();
                    GameEngine.inst.debug(`VivoH5GameAPI.onShow 进入前台`);
                });
                this.qg.onHide(() => {
                    this.onHide();
                    GameEngine.inst.debug(`VivoH5GameAPI.onHide 进入后台`);
                });
            }
            GameEngine.inst.debug('VivoH5GameAPI.onInit');
        }
        onLogin(callback) {
            callback && callback(true);
            console.log('VivoH5GameAPI onLogin');
        }
        onInitAdService(callback) {
            if (this.qg) {
                this.createBannerAd();
                this.createRewardedVideoAd();
                this.createInsertAd();
                this.createNativeAd();
                this.createNativeIconAd();
            }
            callback();
            GameEngine.inst.debug('VivoH5GameAPI.onInitAdService');
        }
        pay(paymentData, callback) {
        }
        createInnerAudioContext() {
            if (this.qg) {
                return this.qg.createInnerAudioContext();
            }
            return null;
        }
        checkDesktop() {
            this.deskTopRecordKey = LocalStorageManager.inst.shortcutKey;
            this.deskTopRecord = this.readDataFromCache(this.deskTopRecordKey);
            if (this.deskTopRecord == null || this.deskTopRecord == undefined || this.deskTopRecord == "") {
                this.deskTopRecord = {
                    isGet: false, date: ""
                };
                this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            }
            else {
                let day = MathHelper.countDay(DateHelper.getTime(), this.deskTopRecord.date);
                console.log("判断图标是否已经超过一日:", day);
                if (day >= 1) {
                    this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
                }
            }
            console.log("桌面图标本地记录信息:", this.deskTopRecord);
        }
        hasShortcutInstalled(callback) {
            if (this.deskTopRecord.isGet == true) {
                GameEngine.inst.debug("今日已经领取了ICON奖励");
                callback(true);
                return;
            }
            if (this.qg) {
                this.qg.hasShortcutInstalled({
                    success: function (status) {
                        if (status) {
                            GameEngine.inst.debug('桌面图标已创建');
                            callback(true);
                        }
                        else {
                            GameEngine.inst.debug('桌面图标未创建');
                            callback(false);
                        }
                    }
                });
            }
            else {
                callback(false);
            }
        }
        delayCheckShortCut(callback) {
            let self = this;
            Laya.timer.once(1000, this, () => {
                self.qg.hasShortcutInstalled({
                    success: (res) => {
                        if (res == false) {
                            callback(false);
                        }
                        else {
                            self.deskTopRecord.isGet = true;
                            self.deskTopRecord.date = DateHelper.getTime();
                            self.saveDataToCache(self.deskTopRecordKey, self.deskTopRecord);
                            callback(true);
                            GameEngine.inst.debug("OPPOH5GameAPI.hasShortcutInstalled 安装图标成功");
                        }
                    },
                    fail: function (err) {
                        GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 安装图标失败 ${JSON.stringify(err)}`);
                        callback(false);
                    },
                    complete: function () { }
                });
            });
        }
        installShortcut(callback) {
            if (this.qg) {
                if (this.deskTopRecord.isGet == true) {
                    console.log("今日已经领取了ICON奖励");
                    return;
                }
                let self = this;
                this.qg.hasShortcutInstalled({
                    success: function (res) {
                        console.log("没有安装过图标");
                        if (res == false) {
                            self.qg.installShortcut({
                                success: function (ss) {
                                    GameEngine.inst.debug("VivoH5GameAPI.installShortcut 安装图标成功");
                                    self.delayCheckShortCut(callback);
                                },
                                fail: function (err) {
                                    GameEngine.inst.debug(`VivoH5GameAPI.installShortcut 安装图标失败 ${JSON.stringify(err)}`);
                                    self.delayCheckShortCut(callback);
                                },
                                complete: function () { }
                            });
                        }
                        else {
                            GameEngine.inst.debug(`VivoH5GameAPI.hasShortcutInstalled 已安装图标`);
                            callback(false);
                        }
                    },
                    fail: function (err) {
                        GameEngine.inst.debug(`VivoH5GameAPI.hasShortcutInstalled 安装桌面图标出错 ${JSON.stringify(err)}`);
                        callback(false);
                    },
                    complete: function () { }
                });
            }
            else {
                this.deskTopRecord.isGet = true;
                this.deskTopRecord.date = DateHelper.getTime();
                this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
                callback(true);
                GameEngine.inst.debug("VivoH5GameAPI.installShortcut 安装图标成功");
            }
            console.log("installShortcut");
        }
        createBannerAd() { }
        onShowBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                let bannerId = PlatformConfig.inst.currentPlatform.bannerAdId;
                if (bannerId == undefined || bannerId == "") {
                    GameEngine.inst.debug("bannerId不能为空");
                    return;
                }
                if (this.canShowBannerAd == false) {
                    GameEngine.inst.debug("11秒内调用广告次数超过1次，11秒后再调用");
                    return;
                }
                this.onDestoryBanner();
                this.m_bannerAd = this.qg.createBannerAd({
                    posId: bannerId,
                    style: {}
                });
                let adshow = this.m_bannerAd.show();
                adshow && adshow.then(() => {
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
                    GameEngine.inst.debug("banner广告展示成功");
                    this.m_bannerIsShow = true;
                }).catch((err) => {
                    GameEngine.inst.debug(`banner广告展示失败 ${JSON.stringify(err)}`);
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                    this.m_bannerIsShow = false;
                });
                this.resetBannerCDTimer();
            }
        }
        resetBannerCDTimer() {
            this.canShowBannerAd = false;
            Laya.timer.once(this.bannerAdShowCD, this, () => {
                this.canShowBannerAd = true;
                GameEngine.inst.debug("banner广告可以再次显示了");
            });
        }
        onHideBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_bannerIsShow && this.m_bannerAd) {
                    var adhide = this.m_bannerAd.hide();
                    adhide && adhide.then(() => {
                        GameEngine.inst.debug(`banner广告隐藏成功`);
                        this.m_bannerAd = null;
                        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                    }).catch(err => {
                        GameEngine.inst.debug(`banner广告隐藏失败 ${JSON.stringify(err)}`);
                    });
                    this.m_bannerAd = null;
                    this.m_bannerIsShow = false;
                    this.resetBannerCDTimer();
                }
            }
        }
        onDestoryBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.m_bannerIsShow && this.m_bannerAd) {
                    var addestroy = this.m_bannerAd.destroy();
                    addestroy && addestroy.then(() => {
                        GameEngine.inst.debug(`banner广告销毁成功`);
                        this.m_bannerAd = null;
                        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                    }).catch(err => {
                        GameEngine.inst.debug(`banner广告销毁失败 ${JSON.stringify(err)}`);
                        this.onHideBanner();
                    });
                    this.resetBannerCDTimer();
                }
            }
        }
        createRewardedVideoAd() { }
        onShowRewardedVideo(_successCallback, _failCallback) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                _successCallback && _successCallback();
                return;
            }
            if (this.qg) {
                if (this.versionCompareUsage(1041) == false) {
                    GameEngine.inst.debug("激励视频需要最小平台号1041");
                    _failCallback && _failCallback(1, "没到指定时间不能显示视频广告");
                    return;
                }
                let videoId = PlatformConfig.inst.currentPlatform.videoAdId;
                if (videoId == undefined || videoId == "") {
                    GameEngine.inst.debug("videoId不能为空");
                    return;
                }
                if (this.canShowRewardAd == false) {
                    GameEngine.inst.debug("VivoH5GameAPI.onShowRewardedVideo 没到指定时间不能显示视频广告");
                    _failCallback && _failCallback(1, "没到指定时间不能显示视频广告");
                    return;
                }
                if (this.m_videoAd == null) {
                    this.m_videoAd = this.qg.createRewardedVideoAd({
                        posId: videoId
                    });
                    this.m_videoAd.onLoad(this.onRewardAdLoad);
                    this.m_videoAd.onError(this.onRewardAdError);
                    this.m_videoAd.onClose(this.onRewardAdClose);
                }
                this.onVideoAdSuccessCallback = _successCallback;
                this.onVideoAdFailCallback = _failCallback;
                if (this.m_videoAdIsLoaded) {
                    this.m_videoAd.show().then(() => {
                        GameEngine.inst.debug('VivoH5GameAPI.show 激励广告显示成功');
                        this.isVideoAdPlaying = true;
                        VivoH5GameAPI.inst.onHide();
                    }).catch(err => {
                        this.onVideoAdFailCallback && this.onVideoAdFailCallback(1, "");
                        this.clearVideoCallbacks();
                        GameEngine.inst.debug("激励广告展示失败" + JSON.stringify(err));
                    });
                }
                else {
                    this.m_videoAd.load().catch(err => {
                        this.m_videoAdIsLoaded = false;
                        this.onVideoAdFailCallback && this.onVideoAdFailCallback(1, "");
                        this.clearVideoCallbacks();
                        GameEngine.inst.debug("激励广告加载失败" + JSON.stringify(err));
                    });
                }
            }
            else {
                _successCallback && _successCallback();
            }
            console.log('VivoH5GameAPI onShowRewardedVideo');
        }
        onRewardAdLoad() {
            let adshow = VivoH5GameAPI.inst.m_videoAd.show();
            GameEngine.inst.debug('VivoH5GameAPI.onRewardAdLoad 视频加载成功');
            adshow && adshow.then(() => {
                GameEngine.inst.debug('VivoH5GameAPI.show 激励广告显示成功');
                VivoH5GameAPI.inst.isVideoAdPlaying = true;
                VivoH5GameAPI.inst.onHide();
            }).catch(err => {
                GameEngine.inst.debug(`VivoH5GameAPI.show 激励广告显示错误${JSON.stringify(err)}`);
                VivoH5GameAPI.inst.onVideoAdFailCallback && VivoH5GameAPI.inst.onVideoAdFailCallback(1, "");
                VivoH5GameAPI.inst.clearVideoCallbacks();
            });
        }
        onRewardAdError(err) {
            VivoH5GameAPI.inst.m_videoAdIsLoaded = false;
            VivoH5GameAPI.inst.isVideoAdPlaying = false;
            GameEngine.inst.debug(`VivoH5GameAPI.onRewardAdError ${JSON.stringify(err)}`);
        }
        onRewardAdClose(res) {
            if (res.isEnded) {
                GameEngine.inst.debug('激励视频广告完成，发放奖励');
                VivoH5GameAPI.inst.onVideoAdSuccessCallback && VivoH5GameAPI.inst.onVideoAdSuccessCallback();
            }
            else {
                GameEngine.inst.debug('激励视频广告取消关闭，不发放奖励');
                VivoH5GameAPI.inst.onVideoAdFailCallback && VivoH5GameAPI.inst.onVideoAdFailCallback(4, "激励视频广告取消关闭，不发放奖励");
            }
            VivoH5GameAPI.inst.isVideoAdPlaying = false;
            VivoH5GameAPI.inst.m_videoAdIsLoaded = false;
            VivoH5GameAPI.inst.onShow();
            VivoH5GameAPI.inst.clearVideoCallbacks();
            VivoH5GameAPI.inst.canShowRewardAd = false;
            Laya.timer.once(VivoH5GameAPI.inst.rewardAdShowCD, this, () => {
                GameEngine.inst.debug('激励视频倒计完成，可以再次显示');
                VivoH5GameAPI.inst.canShowRewardAd = true;
            });
        }
        clearVideoCallbacks() {
            this.onVideoAdSuccessCallback = null;
            this.onVideoAdFailCallback = null;
        }
        countDowwInsertTime() {
            this.canLoadInsertAd = false;
            Laya.timer.clear(this, this._countDownInsertTime);
            Laya.timer.once(this.insertAdShowCD, this, this._countDownInsertTime);
            GameEngine.inst.debug(`VivoH5GameAPI 插屏需要倒计:${this.insertAdShowCD}秒`);
        }
        _countDownInsertTime() {
            this.canLoadInsertAd = true;
            GameEngine.inst.debug(`VivoH5GameAPI 插屏倒计完成 ${this.canLoadInsertAd}`);
        }
        createInsertAd() { }
        onShowInsertAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.versionCompareUsage(1031) == false) {
                GameEngine.inst.debug("插屏广告需要最小平台号1031");
                return;
            }
            if (this.qg) {
                let insertAdId = PlatformConfig.inst.currentPlatform.insertAdId;
                if (insertAdId == undefined || insertAdId == "") {
                    GameEngine.inst.debug("insertAdId不能为空");
                    return;
                }
                GameEngine.inst.debug(`检查是否可以显示插屏广告:${this.canLoadInsertAd}`);
                if (this.canLoadInsertAd == false) {
                    GameEngine.inst.debug("VivoH5GameAPI.onShowInsertAd 没到指定时间不能显示插屏广告");
                    EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
                    return;
                }
                if (this.m_insertAd != null) {
                    this.m_insertAd.offClose(this.onInsertAdClose);
                    this.m_insertAd.offError(this.onInsertAdError);
                    this.m_insertAd = null;
                }
                this.m_insertAd = this.qg.createInterstitialAd({
                    posId: insertAdId
                });
                this.m_insertAd.onClose(this.onInsertAdClose);
                this.m_insertAd.onError(this.onInsertAdError);
                var adShow = this.m_insertAd.show();
                adShow && adShow.then(() => {
                    GameEngine.inst.debug("插屏广告展示成功");
                }).catch((err) => {
                });
            }
        }
        onInsertAdClose() {
            VivoH5GameAPI.inst.countDowwInsertTime();
            EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_CLOSE_EVENT);
            GameEngine.inst.debug('VivoH5GameAPI.onInsertAdClose 插屏广告关闭');
        }
        onInsertAdError(err) {
            VivoH5GameAPI.inst.countDowwInsertTime();
            EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
            GameEngine.inst.debug(`VivoH5GameAPI.onInsertAdError 插屏广告错误 ${JSON.stringify(err)}`);
        }
        onDestoryInsertAd() {
            GameEngine.inst.debug("暂时不提供销毁插屏广告方法");
            return;
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.versionCompareUsage(1031) == false) {
                GameEngine.inst.debug("插屏广告需要最小平台号1031");
                return;
            }
            if (this.qg) {
                if (this.m_insertAd && this.m_insertAd.destroy) {
                    this.m_insertAd.destroy();
                    this.m_insertAd = null;
                }
                else {
                    GameEngine.inst.debug("VIVO没有销毁插屏广告方法");
                }
            }
        }
        onHideInsertAd() {
            GameEngine.inst.debug("暂时不提供隐藏插屏广告方法");
            return;
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.versionCompareUsage(1031) == false) {
                GameEngine.inst.debug("插屏广告需要最小平台号1031");
                return;
            }
            if (this.qg) {
                if (this.m_insertAd && this.m_insertAd.hide) {
                    this.m_insertAd.hide();
                }
                else {
                    GameEngine.inst.debug("VIVO没有隐藏插屏广告方法");
                }
            }
        }
        createNativeAd() {
        }
        onNativeAdError(err) {
            GameEngine.inst.debug(`VivoH5GameAPI.NativeAd.OnError 原生广告错误${JSON.stringify(err)}`);
        }
        onNativeAdLoad(res) {
            console.log('原生广告加载完成-onload触发', JSON.stringify(res));
            let nativeCurrentAd;
            if (res && res.adList) {
                nativeCurrentAd = res.adList.pop();
                VivoH5GameAPI.inst.currentNativeAd = nativeCurrentAd;
                VivoH5GameAPI.inst.m_nativeAd.reportAdShow({ adId: nativeCurrentAd.adId.toString() });
                VivoH5GameAPI.inst.nativeAdOnLoad(VivoH5GameAPI.inst.currentNativeAd);
                VivoH5GameAPI.inst.countDownNativeAdTime();
            }
            else {
                console.log("不存在原生广告列表");
            }
        }
        onShowNativeAd(callback, key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                if (this.canLoadInsertAd == false) {
                    EventManager.inst.SendEvent(PlatformEvents.ON_NATIVE_AD_READY_EVENT);
                    EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
                    GameEngine.inst.debug("VivoH5GameAPI.onShowNativeAd 没到指定时间不能显示原生插屏广告");
                    return;
                }
                let nativeAdId = PlatformConfig.inst.currentPlatform.nativeAdId;
                if (nativeAdId == undefined || nativeAdId == "") {
                    GameEngine.inst.debug("nativeAdId不能为空");
                    return;
                }
                if (this.m_nativeAd == null) {
                    this.m_nativeAd = this.qg.createNativeAd({
                        posId: nativeAdId
                    });
                }
                else {
                    this.m_nativeAd.load();
                }
                VivoH5GameAPI.inst.nativeAdOnLoad = callback;
                this.m_nativeAd.offLoad(this.onNativeAdLoad);
                this.m_nativeAd.offLoad(this.onNativeAdError);
                this.m_nativeAd.onLoad(this.onNativeAdLoad);
                this.m_nativeAd.onError(this.onNativeAdError);
            }
        }
        countDownNativeAdTime() {
            this.canLoadInsertAd = false;
            Laya.timer.clear(this, this._countDownNativeAdTime);
            Laya.timer.once(this.insertAdShowCD, this, this._countDownNativeAdTime);
            GameEngine.inst.debug(`VivoH5GameAPI 原生插屏需要倒计:${this.insertAdShowCD}秒`);
        }
        _countDownNativeAdTime() {
            this.canLoadInsertAd = true;
            GameEngine.inst.debug(`VivoH5GameAPI 原生插屏倒计完成 ${this.canLoadInsertAd}`);
        }
        onNativeAdClick(_id) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg && this.m_nativeAd) {
                this.m_nativeAd.reportAdClick({
                    adId: _id
                });
                GameEngine.inst.debug(`点击上报原生id:${JSON.stringify(_id)}`);
            }
        }
        onNativeAdClose() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            GameEngine.inst.debug(`VivoH5GameAPI.onNativeAdClose 关闭原生广告-暂时没执行什么内容`);
        }
        onDestroyNativeAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            GameEngine.inst.debug(`VivoH5GameAPI.onDestroyNativeAd 没有销毁原生广告方法`);
        }
        createNativeIconAd() {
        }
        onNativeIconAdError(err) {
            GameEngine.inst.debug(`VivoH5GameAPI.NativeIconAd.OnError 原生图标广告错误${JSON.stringify(err)}`);
        }
        onNativeIconAdLoad(res) {
            console.log('原生图标广告加载完成-onload触发', JSON.stringify(res));
            let nativeCurrentAd;
            if (res && res.adList) {
                nativeCurrentAd = res.adList.pop();
                VivoH5GameAPI.inst.m_nativeIconAd.reportAdShow({ adId: nativeCurrentAd.adId.toString() });
                VivoH5GameAPI.inst.nativeIconAdOnLoad(nativeCurrentAd);
            }
            else {
                console.log("不存在原生广告列表");
            }
        }
        onShowNativeIconAd(callback) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg) {
                let nativeAdId = PlatformConfig.inst.currentPlatform.nativeIconAdId;
                if (nativeAdId == undefined || nativeAdId == "") {
                    GameEngine.inst.debug("nativeAdId不能为空");
                    return;
                }
                if (this.m_nativeIconAd == null) {
                    this.m_nativeIconAd = this.qg.createNativeAd({
                        posId: nativeAdId
                    });
                }
                else {
                    this.m_nativeIconAd.load();
                }
                VivoH5GameAPI.inst.nativeIconAdOnLoad = callback;
                this.m_nativeIconAd.offError(this.onNativeIconAdError);
                this.m_nativeIconAd.offLoad(this.onNativeIconAdLoad);
                this.m_nativeIconAd.onLoad(this.onNativeIconAdLoad);
                this.m_nativeIconAd.onError(this.onNativeIconAdError);
            }
        }
        onNativeIconAdClick(_id) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.qg && this.m_nativeIconAd) {
                this.m_nativeIconAd.reportAdClick({
                    adId: _id
                });
                GameEngine.inst.debug(`点击上报原生图标id:${JSON.stringify(_id)}`);
            }
        }
        onNativeIconAdClose() { }
        onDestroyNativeIconAd() { }
        saveDataToCache(_key, _value) {
            if (this.qg) {
                this.qg.setStorageSync({ key: _key, value: JSON.stringify(_value) });
            }
            else {
                Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
            }
        }
        readDataFromCache(_key) {
            if (this.qg) {
                var data = this.qg.getStorageSync({ key: _key });
                if (data) {
                    return JSON.parse(data);
                }
                return null;
            }
            else {
                let data = Laya.LocalStorage.getItem(_key);
                if (data) {
                    return JSON.parse(data);
                }
                else {
                    return null;
                }
            }
        }
        getDevicePlatform() {
            return "";
        }
        getPlatform() {
            return "";
        }
        getScreenSize() {
            return new Laya.Size(720, 1280);
        }
        isVertify() {
            return true;
        }
        bannerHeight() {
            return this.m_bannerHeight;
        }
        notchHeight() {
            if (this.qg) {
                return this.qg.getNotchHeightSync().height;
            }
            return 20;
        }
        vibrateShort() {
            if (this.qg) {
                this.qg.vibrateShort();
            }
        }
        showMoreGamesModal() { }
        addColorSign() { }
        reportMonitor(name, value) { }
        navigateToMiniGame(object) { }
        createAppBox() { }
        onShowAppBox() { }
        onHideAppBox() { }
        createMoreGamesButton(inStyle) { }
        hideMoreGameButton() { }
        onShareVideo(callback) { }
        onStartRecord() { }
        onStopRecord() { }
        sendEvent(obj) { }
        onShare() { }
        updateHighScore(_score) { }
    }

    class TouTiaoH5GameAPI {
        constructor() {
            this.tt = window['tt'];
            this.platform = "";
            this.isToutiaio = true;
            this.m_bannerAd = null;
            this.m_bannerHeight = 220;
            this.m_videoAd = null;
            this.m_videoAdIsLoaded = false;
            this.m_insertAd = null;
            this.insertAdReadyInterval = 10000;
            this.canLoadInsertAd = false;
            this.insertAdShowCD = 10000;
            this.m_moreButton = null;
            this.sdkVersion = "";
        }
        downloadFile(url, callback) {
            if (this.tt) {
                if (this.downloadTask != null) {
                    this.downloadTask.abort();
                }
                console.log("下载文件到本地:", url);
                this.downloadTask = this.tt.downloadFile({
                    url: url,
                    success(res) {
                        if (res.statusCode === 200) {
                            callback && callback(true, res);
                        }
                        else {
                            callback && callback(false, null);
                        }
                    }
                });
            }
            else {
                callback && callback(false, null);
            }
        }
        unzip(url, callback) {
            if (this.tt) {
                let targetP = this.tt.env.USER_DATA_PATH + "/";
                this.tt.getFileSystemManager().unzip({
                    zipFilePath: url,
                    targetPath: targetP,
                    success(res) {
                        console.log(res);
                        callback && callback(true);
                    }
                });
            }
            else {
                callback && callback(false);
            }
        }
        readFile(filePath, callback) {
            if (this.tt) {
                let url = this.userDataPath() + filePath;
                console.log("readFileSync:", url);
                this.tt.getFileSystemManager().readFile({
                    filePath: url,
                    encoding: "utf-8",
                    success(res) {
                        callback && callback(true, res.data);
                    },
                    fail(err) {
                        callback && callback(false, "");
                    }
                });
            }
            else {
                return "";
            }
        }
        writeFileSync(filePath, data) {
            if (this.tt) {
                let url = this.userDataPath() + filePath;
                console.log("writeFileSync:", url, data);
                this.tt.getFileSystemManager().writeFileSync(url, data, "utf-8");
            }
        }
        userDataPath() {
            if (this.tt) {
                return this.tt.env.USER_DATA_PATH + "/";
            }
            return "";
        }
        versionCompareUsage(useVersion) {
            let versionFlag = MathHelper.CompareVersion(this.sdkVersion, useVersion);
            if (versionFlag != 1) {
                GameEngine.inst.debug(`SDK版本过低！你的版本为：${this.sdkVersion}`);
                return false;
            }
            return true;
        }
        onInit(_callback) {
            if (this.tt) {
                TouTiaoH5GameAPI.inst = this;
                this.systemInfo = this.tt.getSystemInfoSync();
                console.log("头条系统信息:", JSON.stringify(this.systemInfo));
                this.isToutiaio = this.systemInfo.appName === "Toutiao";
                this.platform = this.systemInfo.platform;
                this.sdkVersion = this.systemInfo.SDKVersion;
                this.onCheckForUpdate();
                this.onInitRecorder();
                this.tt.onShareAppMessage(function (res) {
                    return {
                        templateId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                        title: '英雄冲突',
                        desc: '',
                        imageUrl: '',
                        query: '',
                        success() {
                        },
                        fail(e) {
                        }
                    };
                });
                this.tt.onShow(function (res) {
                    console.log('TouTiaoH5GameAPI onShow');
                    EventManager.inst.SendEvent(PlatformEvents.ON_SHOW);
                });
                this.tt.onHide(function () {
                    console.log('TouTiaoH5GameAPI onHide');
                    EventManager.inst.SendEvent(PlatformEvents.ON_HIDE);
                });
                this.insertAdReadyInterval = PlatformConfig.inst.currentPlatform.insertAdReadyInterval;
                this.insertAdShowCD = PlatformConfig.inst.currentPlatform.insertAdShowCD;
                Laya.timer.once(this.insertAdReadyInterval, this, () => {
                    this.canLoadInsertAd = true;
                });
            }
            console.log('TouTiaoH5GameAPI onInit');
        }
        onCheckForUpdate() {
            const updateManager = this.tt.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log('onCheckForUpdate', res.hasUpdate);
                if (res.hasUpdate) {
                    this.tt.showToast({
                        title: '即将有更新请留意'
                    });
                }
            });
            updateManager.onUpdateReady(() => {
                this.tt.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否立即使用？',
                    success: function (res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                        else {
                            this.tt.showToast({
                                icon: 'none',
                                title: '小程序下一次「冷启动」时会使用新版本',
                            });
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(() => {
                this.tt.showToast({
                    title: '更新失败，下次启动继续...'
                });
            });
        }
        onInitRecorder() {
            if (this.tt) {
                if (this.versionCompareUsage("1.4.1") == false) {
                    GameEngine.inst.debug("录屏需要1.4.1以上");
                    return;
                }
                this.m_recorder = this.tt.getGameRecorderManager();
                this.m_recorder.onStart(res => {
                    GameEngine.inst.debug(`开始录屏${JSON.stringify(res)}`);
                });
                this.m_recorder.onStop(res => {
                    this.m_recordVideoPath = res.videoPath;
                    GameEngine.inst.debug(`录屏结束,视频地址：${this.m_recordVideoPath}`);
                });
                this.m_recorder.onError(err => {
                    GameEngine.inst.debug(`录屏错误${JSON.stringify(err)}`);
                });
            }
            console.log('TouTiaoH5GameAPI onInitRecorder');
        }
        onInitAdService(callback) {
            this.createBannerAd();
            if (this.platform != "devtools") {
                this.createRewardedVideoAd();
            }
            this.createInsertAd();
            callback && callback();
            console.log('TouTiaoH5GameAPI onInitAdService');
        }
        onShare(callback) {
            if (this.tt) {
                this.tt.shareAppMessage({
                    templateId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                    title: '',
                    desc: '',
                    imageUrl: '',
                    query: '',
                    success() {
                        callback(true);
                    },
                    fail(e) {
                        callback(false);
                    }
                });
            }
            console.log('TouTiaoH5GameAPI onShare');
        }
        bannerHeight() {
            return this.m_bannerHeight;
        }
        notchHeight() {
            if (this.tt) {
                let layout = this.tt.getMenuButtonLayout();
                return layout.bottom + 40;
            }
            return 40;
        }
        getScreenSize() {
            return new Laya.Size(750, 1334);
        }
        isVertify() {
            return true;
        }
        onLogin(callback) {
            callback && callback(true);
            console.log('TouTiaoH5GameAPI onLogin:');
        }
        onShareVideo(callback) {
            if (this.tt && this.platform != "devtools") {
                console.log("录屏视频路径：", this.m_recordVideoPath);
                let self = this;
                this.tt.shareAppMessage({
                    templateId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                    channel: 'video',
                    title: '英雄冲突',
                    desc: "加入英雄冲突，拯救这个世界！",
                    imageUrl: '',
                    query: '',
                    extra: {
                        videoPath: self.m_recordVideoPath,
                        videoTopics: ['对面太强了，老铁快来帮忙啊！']
                    },
                    success() {
                        console.log('分享视频成功');
                        callback(true);
                    },
                    fail(e) {
                        console.log('分享视频失败', JSON.stringify(e));
                        callback(false);
                    }
                });
            }
            else {
                callback(true);
            }
            console.log('TouTiaoH5GameAPI onShareVideo');
        }
        showMoreGamesModal() {
            if (this.tt && this.platform != "ios") {
                if (this.versionCompareUsage("1.33.0") == false) {
                    GameEngine.inst.debug("更多游戏需要1.33.0以上");
                    return;
                }
                let list = [];
                for (let index = 0; index < PlatformConfig.inst.currentPlatform.moreGameList.length; index++) {
                    const app = PlatformConfig.inst.currentPlatform.moreGameList[index];
                    list.push({
                        appId: app.appId,
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    });
                }
                this.tt.showMoreGamesModal({
                    appLaunchOptions: list,
                    success(res) {
                        console.log("success", res.errMsg);
                    },
                    fail(res) {
                        console.log("fail", res.errMsg);
                    }
                });
                this.tt.onNavigateToMiniProgram(function (res) {
                    console.log("open other games", res);
                });
            }
            else {
                GameEngine.inst.debug("头条ios版本不支持更多游戏");
            }
        }
        onStartRecord() {
            if (this.tt && this.platform != "devtools") {
                if (this.versionCompareUsage("1.4.1") == false) {
                    GameEngine.inst.debug("录屏需要1.4.1以上");
                    return;
                }
                this.m_recorder.start({
                    duration: 30,
                });
            }
            GameEngine.inst.debug("TouTiaoH5GameAPI.onStartRecord 开始录屏30秒");
        }
        onStopRecord() {
            if (this.tt) {
                if (this.versionCompareUsage("1.4.1") == false) {
                    GameEngine.inst.debug("录屏需要1.4.1以上");
                    return;
                }
                this.m_recorder.stop();
            }
            GameEngine.inst.debug("TouTiaoH5GameAPI.onStopRecord 停止录屏");
        }
        createBannerAd() { }
        onShowBanner(key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.tt) {
                if (this.versionCompareUsage("1.3.0") == false) {
                    GameEngine.inst.debug("Banner广告需要1.3.0以上");
                    return;
                }
                this.onDestoryBanner();
                let style = { left: 0, top: 0, width: 128, height: 0 };
                this.screenWidth = this.systemInfo.screenWidth / 2;
                this.screenHeight = this.systemInfo.screenHeight;
                style.top = this.screenHeight - (style.width / 1334) * 750;
                this.m_bannerAd = this.tt.createBannerAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.bannerAdId,
                    style: style
                });
                this.m_bannerAd.onResize(this.onBannerResize);
                this.m_bannerAd.onLoad(this.onBannerLoaded);
                this.m_bannerAd.onError(this.onBannerError);
            }
            console.log('TouTiaoH5GameAPI onShowBanner');
        }
        onBannerLoaded() {
            console.log("Banner广告加载完成================");
            TouTiaoH5GameAPI.inst.m_bannerAd.show()
                .then(() => {
                console.log('onBannerLoaded 广告显示成功');
                TouTiaoH5GameAPI.inst.m_bannerHeight = 220;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
            })
                .catch(err => {
                console.log('onBannerLoaded 广告组件出现问题', err);
                TouTiaoH5GameAPI.inst.m_bannerHeight = 20;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            });
        }
        onBannerError(err) {
            console.log("Banner广告加载失败:", JSON.stringify(err));
            TouTiaoH5GameAPI.inst.m_bannerHeight = 20;
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
        }
        onBannerResize(size) {
            TouTiaoH5GameAPI.inst.m_bannerAd.style.left = TouTiaoH5GameAPI.inst.screenWidth - size.width / 2;
            TouTiaoH5GameAPI.inst.m_bannerAd.style.top = TouTiaoH5GameAPI.inst.screenHeight - size.height;
        }
        onHideBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.m_bannerAd) {
                if (this.versionCompareUsage("1.3.0") == false) {
                    GameEngine.inst.debug("Banner广告需要1.3.0以上");
                    return;
                }
                this.m_bannerHeight = 20;
                this.m_bannerAd.hide();
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            }
            console.log('TouTiaoH5GameAPI onHideBanner');
        }
        onDestoryBanner() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.m_bannerAd) {
                if (this.versionCompareUsage("1.3.0") == false) {
                    GameEngine.inst.debug("Banner广告需要1.3.0以上");
                    return;
                }
                this.m_bannerHeight = 20;
                this.m_bannerAd.offResize(this.onBannerResize);
                this.m_bannerAd.offLoad(this.onBannerLoaded);
                this.m_bannerAd.offError(this.onBannerError);
                this.m_bannerAd.destroy();
                this.m_bannerAd = null;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            }
            console.log('TouTiaoH5GameAPI onDestoryBanner');
        }
        createRewardedVideoAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.tt) {
                if (this.versionCompareUsage("1.3.0") == false) {
                    GameEngine.inst.debug("激励视频广告1.3.0以上");
                    return;
                }
                this.m_videoAd = this.tt.createRewardedVideoAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.videoAdId
                });
                this.m_videoAd.onLoad(() => {
                    GameEngine.inst.debug("TouTiaoH5GameAPI 激励广告加载成功");
                    this.m_videoAdIsLoaded = true;
                });
                this.m_videoAd.onError((err) => {
                    GameEngine.inst.debug(`TouTiaoH5GameAPI.onError 激励广告组件出现问题,${JSON.stringify(err)}`);
                    this.onVideoFailCallback && this.onVideoFailCallback(1, "广告组件出现问题");
                    this.m_videoAdIsLoaded = false;
                    this.clearVideoCallback();
                });
                this.m_videoAd.onClose((res) => {
                    this.m_videoAdIsLoaded = false;
                    if (res.isEnded) {
                        GameEngine.inst.debug("TouTiaoH5GameAPI 激励视频广告完成，发放奖励");
                        this.onVideoSuccessCallback && this.onVideoSuccessCallback();
                        this.m_videoAd.load();
                    }
                    else {
                        GameEngine.inst.debug("激励视频广告取消关闭，不发放奖励");
                        this.onVideoFailCallback && this.onVideoFailCallback(4, "激励视频广告取消关闭，不发放奖励");
                    }
                    this.clearVideoCallback();
                });
            }
            GameEngine.inst.debug("TouTiaoH5GameAPI.createRewardedVideoAd 创建激励视频广告");
        }
        onShowRewardedVideo(_successCallback, _failCallback, key) {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                _successCallback && _successCallback();
                return;
            }
            if (this.tt && this.platform != "devtools") {
                if (this.versionCompareUsage("1.3.0") == false) {
                    GameEngine.inst.debug("激励视频广告1.3.0以上");
                    _failCallback && _failCallback(1, "广告组件有问题");
                    return;
                }
                this.onVideoSuccessCallback = _successCallback;
                this.onVideoFailCallback = _failCallback;
                if (this.m_videoAd == null) {
                    this.createRewardedVideoAd();
                }
                if (this.m_videoAd) {
                    this.m_videoAd
                        .show()
                        .then(() => {
                        console.log("广告显示成功");
                    })
                        .catch((err) => {
                        console.log("广告组件出现问题", err);
                        this.m_videoAd.load().then(() => {
                            console.log("手动加载成功");
                            this.m_videoAd.show();
                        });
                    });
                }
                else {
                    _failCallback && _failCallback(1, "广告组件有问题");
                }
            }
            else {
                _successCallback && _successCallback();
            }
            GameEngine.inst.debug("TouTiaoH5GameAPI.onShowRewardedVideo 显示激励视频广告");
        }
        clearVideoCallback() {
            TouTiaoH5GameAPI.inst.onVideoSuccessCallback = null;
            TouTiaoH5GameAPI.inst.onVideoFailCallback = null;
        }
        createInsertAd() { }
        onShowInsertAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.canLoadInsertAd == false) {
                GameEngine.inst.debug("TouTiaoH5GameAPI.onShowInsertAd 没到指定时间不能显示插屏广告");
                EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
                return;
            }
            if (this.tt && this.isToutiaio) {
                this.onDestoryInsertAd();
                this.m_insertAd = this.tt.createInterstitialAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.insertAdId
                });
                this.m_insertAd.onLoad(this.onInsertAdLoaded);
                this.m_insertAd.onError(this.onInsertAdError);
                this.m_insertAd.onClose(this.onInsertAdClose);
            }
            if (this.m_insertAd) {
                this.m_insertAd.show()
                    .then(() => {
                    GameEngine.inst.debug(`TouTiaoH5GameAPI.onShowInsertAd 插屏广告显示成功`);
                    this.canLoadInsertAd = false;
                })
                    .catch(err => {
                    GameEngine.inst.debug(`TouTiaoH5GameAPI.onShowInsertAd 插屏广告显示失败 ${JSON.stringify(err)}`);
                });
                ;
                GameEngine.inst.debug("TouTiaoH5GameAPI.onShowInsertAd 显示插屏广告");
            }
        }
        onHideInsertAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            GameEngine.inst.debug("TouTiaoH5GameAPI.onHideInsertAd 头条的插屏没有hide方法");
        }
        onDestoryInsertAd() {
            if (PlatformConfig.inst.currentPlatform.canAd == false) {
                GameEngine.inst.debug("没广告版本");
                return;
            }
            if (this.tt) {
                if (this.m_insertAd) {
                    this.canLoadInsertAd = true;
                    this.m_insertAd.offLoad(this.onInsertAdLoaded);
                    this.m_insertAd.offError(this.onInsertAdError);
                    this.m_insertAd.offClose(this.onInsertAdClose);
                    this.m_insertAd.destroy();
                    this.m_insertAd = null;
                    GameEngine.inst.debug("TouTiaoH5GameAPI.onDestoryInsertAd 移除插屏广告");
                }
            }
        }
        onInsertAdLoaded() {
            GameEngine.inst.debug("TouTiaoH5GameAPI.onInsertAdLoaded 插屏广告加载成功");
        }
        onInsertAdError(err) {
            GameEngine.inst.debug(`TouTiaoH5GameAPI.onInsertAdError 插屏广告加载失败,${JSON.stringify(err)}`);
        }
        onInsertAdClose() {
            Laya.timer.once(TouTiaoH5GameAPI.inst.insertAdShowCD, TouTiaoH5GameAPI.inst, () => {
                TouTiaoH5GameAPI.inst.canLoadInsertAd = true;
            });
            TouTiaoH5GameAPI.inst.onDestoryInsertAd();
            TouTiaoH5GameAPI.inst.canLoadInsertAd = false;
            GameEngine.inst.debug(`TouTiaoH5GameAPI.onInsertAdClose 关闭插屏广告 ${TouTiaoH5GameAPI.inst.insertAdShowCD, TouTiaoH5GameAPI.inst.canLoadInsertAd} `);
        }
        createInnerAudioContext() {
            if (this.tt) {
                return this.tt.createInnerAudioContext();
            }
            return null;
        }
        saveDataToCache(_key, _value) {
            Laya.LocalStorage.setJSON(_key, _value);
        }
        readDataFromCache(_key) {
            return Laya.LocalStorage.getJSON(_key);
        }
        vibrateShort() {
            if (this.tt) {
                this.tt.vibrateShort();
            }
        }
        sendEvent(obj) {
            if (this.tt) {
                if (this.versionCompareUsage("1.8.0") == false) {
                    GameEngine.inst.debug("发送事件需要1.8.0以上");
                    return;
                }
                this.tt.reportAnalytics(obj.key, obj.data);
            }
            console.log('TouTiaoH5GameAPI sendEvent');
        }
        getDevicePlatform() {
            return "";
        }
        getPlatform() {
            return this.platform;
        }
        createMoreGamesButton(inStyle) {
            if (this.tt) {
                if (this.m_moreButton) {
                    this.m_moreButton.show();
                    return;
                }
                let scale = Laya.Browser.clientWidth / fairygui.GRoot.inst.width;
                let style = {
                    left: 0,
                    top: 0,
                    width: 108 * scale,
                    height: 117 * scale,
                    lineHeight: 0,
                    backgroundColor: "#ff000000",
                    textColor: "#ff0000",
                    textAlign: "center",
                    fontSize: 12,
                    borderRadius: 0,
                    borderWidth: 0,
                    borderColor: '#ff0000'
                };
                if (inStyle) {
                    style.left = inStyle.left * scale;
                    style.top = inStyle.top * scale;
                    style.width = inStyle.width * scale;
                    style.height = inStyle.height * scale;
                }
                this.m_moreButton = this.tt.createMoreGamesButton({
                    type: "image",
                    image: "images/moregame.png",
                    style: style,
                    appLaunchOptions: [],
                    onNavigateToMiniGame(res) {
                        console.log('跳转其他小游戏', res);
                    }
                });
                this.m_moreButton.onTap(() => {
                    console.log('点击更多游戏');
                });
            }
        }
        hideMoreGameButton() {
            if (this.m_moreButton) {
                this.m_moreButton.hide();
            }
        }
        pay(paymentData, callback) {
        }
        navigateToMiniGame(object) {
        }
        updateHighScore(_score) {
            console.log('TouTiaoH5GameAPI updateHighScore');
        }
        reportMonitor(name, value) {
        }
        createNativeIconAd() {
        }
        onShowNativeIconAd(callback) {
        }
        onNativeIconAdClick(_id) {
        }
        onNativeIconAdClose() {
        }
        createNativeAd() {
        }
        onShowNativeAd() {
        }
        onNativeAdClick(_id) {
        }
        onNativeAdClose() {
        }
        addColorSign() {
        }
        createAppBox() {
        }
        onShowAppBox() {
        }
        onHideAppBox() {
        }
        hasShortcutInstalled(callback) {
            callback(false);
        }
        installShortcut(callback) {
            callback(false);
        }
        onDestroyNativeAd() {
        }
        onDestroyNativeIconAd() {
        }
    }

    class WebH5GameAPI {
        downloadFile(url, callback) {
        }
        unzip(url, callback) {
        }
        readFile(filePath, callback) {
        }
        writeFileSync(filePath, data) {
        }
        userDataPath() {
            return "";
        }
        onDestroyNativeAd() {
        }
        onDestroyNativeIconAd() {
        }
        onDestoryBanner() {
        }
        onDestoryInsertAd() {
        }
        createInnerAudioContext() {
            return null;
        }
        onHideInsertAd() {
        }
        navigateToMiniGame(object) {
        }
        pay(paymentData, callback) {
        }
        getPlatform() {
            return "";
        }
        showMoreGamesModal() {
        }
        reportMonitor(name, value) {
        }
        createNativeIconAd() {
        }
        onShowNativeIconAd(callback) {
        }
        onNativeIconAdClick(_id) {
        }
        onNativeIconAdClose() {
        }
        getDevicePlatform() {
            return "";
        }
        addColorSign() {
        }
        onNativeAdClose() {
        }
        createAppBox() {
        }
        onShowAppBox() {
        }
        onHideAppBox() {
        }
        hasShortcutInstalled(callback) {
            callback(true);
        }
        installShortcut(callback) {
            callback(true);
        }
        createMoreGamesButton(inStyle) {
        }
        hideMoreGameButton() {
        }
        onShareVideo(callback) {
        }
        bannerHeight() {
            return 20;
        }
        notchHeight() {
            return 20;
        }
        sendEvent(obj) {
        }
        vibrateShort() {
        }
        onStartRecord() {
        }
        onStopRecord() {
        }
        getScreenSize() {
            return new Laya.Size(720, 1280);
        }
        isVertify() {
            return true;
        }
        onInit(_callback) {
            console.log('WebH5GameAPI onInit');
        }
        onLogin(callback) {
            callback && callback(true);
            console.log('WebH5GameAPI onLogin');
        }
        onShare() {
            console.log('WebH5GameAPI onShare');
        }
        updateHighScore(_score) {
            console.log('WebH5GameAPI updateHighScore');
        }
        onInitAdService(callback) {
            console.log('WebH5GameAPI onInitAdService');
            callback && callback();
            console.log('WebH5GameAPI onInitAdService');
        }
        createBannerAd() {
            console.log('WebH5GameAPI createBannerAd');
        }
        onShowBanner() {
            console.log('WebH5GameAPI onShowBanner');
        }
        onHideBanner() {
            console.log('WebH5GameAPI onHideBanner');
        }
        createRewardedVideoAd() {
            console.log('WebH5GameAPI createRewardedVideoAd');
        }
        onShowRewardedVideo(_successCallback, _failCallback) {
            _successCallback && _successCallback();
            console.log('WebH5GameAPI onShowRewardedVideo');
        }
        createInsertAd() {
            console.log('WebH5GameAPI createInsertAd');
        }
        onShowInsertAd() {
            console.log('WebH5GameAPI onShowInsertAd');
        }
        createNativeAd() {
            console.log('WebH5GameAPI createNativeAd');
        }
        onShowNativeAd() {
            console.log('WebH5GameAPI onShowNativeAd');
        }
        onNativeAdClick(_id) {
            console.log('WebH5GameAPI onNativeAdClick:' + _id);
        }
        saveDataToCache(_key, _value) {
            Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        }
        readDataFromCache(_key) {
            return JSON.parse(Laya.LocalStorage.getItem(_key));
        }
    }

    var Platform;
    (function (Platform) {
        Platform[Platform["NotSet"] = 999] = "NotSet";
        Platform[Platform["weixin_h5"] = 0] = "weixin_h5";
        Platform[Platform["qqplay_h5"] = 1] = "qqplay_h5";
        Platform[Platform["oppo_h5"] = 2] = "oppo_h5";
        Platform[Platform["vivo_h5"] = 3] = "vivo_h5";
        Platform[Platform["baidu_h5"] = 4] = "baidu_h5";
        Platform[Platform["xiaomi_h5"] = 5] = "xiaomi_h5";
        Platform[Platform["x4399_h5"] = 6] = "x4399_h5";
        Platform[Platform["toutiao_h5"] = 7] = "toutiao_h5";
        Platform[Platform["game_app"] = 8] = "game_app";
        Platform[Platform["web_h5"] = 9] = "web_h5";
        Platform[Platform["huawei_h5"] = 10] = "huawei_h5";
    })(Platform || (Platform = {}));
    class Platforms {
        constructor() {
            this.platformAPI = null;
            this._platform = Platform.NotSet;
        }
        static get inst() {
            if (this.m_instance === null) {
                this.m_instance = new Platforms();
            }
            return this.m_instance;
        }
        get platform() {
            if (this._platform === Platform.NotSet) {
                if (window["tt"]) {
                    this._platform = Platform.toutiao_h5;
                }
                else if (Laya.Browser.onQQMiniGame) {
                    this._platform = Platform.qqplay_h5;
                }
                else if (Laya.Browser.onWeiXin) {
                    this._platform = Platform.weixin_h5;
                }
                else if (Laya.Browser.onKGMiniGame) {
                    this._platform = Platform.xiaomi_h5;
                }
                else if (Laya.Browser.onBDMiniGame) {
                    this._platform = Platform.baidu_h5;
                }
                else if (Laya.Browser.onQGMiniGame) {
                    this._platform = Platform.oppo_h5;
                }
                else if (Laya.Browser.onVVMiniGame) {
                    this._platform = Platform.vivo_h5;
                }
                else if (window["hbs"]) {
                    this._platform = Platform.huawei_h5;
                }
                else {
                    this._platform = Platform.web_h5;
                }
            }
            return this._platform;
        }
        set platform(value) {
            this._platform = value;
        }
        get platformDisplayName() {
            let disName = "web";
            switch (this.platform) {
                case Platform.weixin_h5:
                    disName = "微信小游戏";
                    break;
                case Platform.qqplay_h5:
                    disName = "手Q小游戏";
                    break;
                case Platform.oppo_h5:
                    disName = "OPPO小游戏";
                    break;
                case Platform.vivo_h5:
                    disName = "VIVO小游戏";
                    break;
                case Platform.baidu_h5:
                    break;
                case Platform.xiaomi_h5:
                    break;
                case Platform.x4399_h5:
                    break;
                case Platform.toutiao_h5:
                    disName = "头条小游戏";
                    break;
                case Platform.game_app:
                    disName = "APP";
                    break;
            }
            return disName;
        }
        init() {
            switch (this.platform) {
                case Platform.weixin_h5:
                    this.platformAPI = new WeiXinH5GameAPI();
                    break;
                case Platform.oppo_h5:
                    this.platformAPI = new OPPOH5GameAPI();
                    break;
                case Platform.vivo_h5:
                    this.platformAPI = new VivoH5GameAPI();
                    break;
                case Platform.toutiao_h5:
                    this.platformAPI = new TouTiaoH5GameAPI();
                    break;
                case Platform.web_h5:
                    this.platformAPI = new WebH5GameAPI();
                    break;
            }
        }
        userDataPath() {
            return this.platformAPI && this.platformAPI.userDataPath();
        }
        downloadFile(url, callback) {
            this.platformAPI && this.platformAPI.downloadFile(url, callback);
        }
        readFile(filePath, callback) {
            return this.platformAPI && this.platformAPI.readFile(filePath, callback);
        }
        writeFileSync(filePath, data) {
            this.platformAPI && this.platformAPI.writeFileSync(filePath, data);
        }
        unzip(zipUrl, callback) {
            this.platformAPI && this.platformAPI.unzip(zipUrl, callback);
        }
        onInit(_callback) {
            if (this.platformAPI && this.platformAPI !== null) {
                this.platformAPI.onInit(_callback);
            }
        }
        vibrateShort() {
            this.platformAPI && this.platformAPI.vibrateShort();
        }
        startRecord() {
            this.platformAPI && this.platformAPI.onStartRecord();
        }
        stopRecord() {
            this.platformAPI && this.platformAPI.onStopRecord();
        }
        onLogin(callback) {
            this.platformAPI && this.platformAPI.onLogin(callback);
        }
        onShare(callback) {
            this.platformAPI && this.platformAPI.onShare(callback);
        }
        onShareVideo(callback) {
            let ttPlatform = this.platformAPI;
            ttPlatform && ttPlatform.onShareVideo(callback);
        }
        onShowAppBoxAd() {
            this.platformAPI && this.platformAPI.onShowAppBox();
        }
        createMoreGamesButton(inStyle) {
            let ttPlatform = this.platformAPI;
            ttPlatform && ttPlatform.createMoreGamesButton(inStyle);
        }
        hideMoreGameButton() {
            let ttPlatform = this.platformAPI;
            ttPlatform && ttPlatform.hideMoreGameButton();
        }
        updateHighScore(_score) {
            this.platformAPI && this.platformAPI.updateHighScore(_score);
        }
        onInitAdService(callback) {
            this.platformAPI && this.platformAPI.onInitAdService(callback);
        }
        createBannerAd() {
            this.platformAPI && this.platformAPI.createBannerAd();
        }
        onShowBanner(key) {
            this.platformAPI && this.platformAPI.onShowBanner(key);
        }
        onHideBanner() {
            this.platformAPI && this.platformAPI.onHideBanner();
        }
        onDestoryBanner() {
            this.platformAPI && this.platformAPI.onDestoryBanner();
        }
        createRewardedVideoAd() {
            this.platformAPI && this.platformAPI.createRewardedVideoAd();
        }
        onShowRewardedVideo(_successCallback, _failCallback, key) {
            this.platformAPI && this.platformAPI.onShowRewardedVideo(() => {
                Laya.timer.scale = 1;
                _successCallback && _successCallback();
            }, (code, msg) => {
                Laya.timer.scale = 1;
                _failCallback && _failCallback(code, msg);
            }, key);
        }
        createInsertAd() {
            this.platformAPI && this.platformAPI.createInsertAd();
        }
        onShowInsertAd() {
            this.platformAPI && this.platformAPI.onShowInsertAd();
        }
        onDestoryInsertAd() {
            this.platformAPI && this.platformAPI.onDestoryInsertAd();
        }
        createNativeAd() {
            this.platformAPI && this.platformAPI.createNativeAd();
        }
        onShowNativeAd(callback, key) {
            this.platformAPI && this.platformAPI.onShowNativeAd(callback, key);
        }
        onNativeAdClick(_id) {
            this.platformAPI && this.platformAPI.onNativeAdClick(_id);
        }
        onNativeAdClose() {
            this.platformAPI && this.platformAPI.onNativeAdClose();
        }
        onDestroyNativeAd() {
            this.platformAPI && this.platformAPI.onDestroyNativeAd();
        }
        createNativeIconAd() {
            this.platformAPI && this.platformAPI.createNativeIconAd();
        }
        onShowNativeIconAd(callback, key) {
            this.platformAPI && this.platformAPI.onShowNativeIconAd(callback, key);
        }
        onNativeIconAdClick(_id) {
            this.platformAPI && this.platformAPI.onNativeIconAdClick(_id);
        }
        onNativeAdIconClose() {
            this.platformAPI && this.platformAPI.onNativeIconAdClose();
        }
        onDestroyNativeIconAd() {
            this.platformAPI && this.platformAPI.onDestroyNativeIconAd();
        }
        reportMonitor(name, value) {
            this.platformAPI && this.platformAPI.reportMonitor(name, value);
        }
        saveDataToCache(_key, _value) {
            this.platformAPI && this.platformAPI.saveDataToCache(_key, _value);
        }
        readDataFromCache(_key) {
            return this.platformAPI && this.platformAPI.readDataFromCache(_key);
        }
        canRetinalCanvas() {
            let arr = [Platform.oppo_h5];
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i] === this.platform) {
                    return true;
                }
            }
            return false;
        }
        sendEvent(obj) {
            this.platformAPI && this.platformAPI.sendEvent(obj);
        }
        setLoadingProgress(progress) {
        }
        notchHeight() {
            return this.platformAPI && this.platformAPI.notchHeight();
        }
        bannerHeight() {
            return this.platformAPI && this.platformAPI.bannerHeight();
        }
        hasShortcutInstalled(callback) {
            this.platformAPI && this.platformAPI.hasShortcutInstalled(callback);
        }
        installShortcut(callback) {
            this.platformAPI && this.platformAPI.installShortcut(callback);
        }
        isVertify() {
            return this.platformAPI && this.platformAPI.isVertify();
        }
        addColorSign() {
            return this.platformAPI && this.platformAPI.addColorSign();
        }
        getDevicePlatform() {
            return this.platformAPI && this.platformAPI.getDevicePlatform();
        }
        showMoreGamesModal() {
            this.platformAPI && this.platformAPI.showMoreGamesModal();
        }
        getPlatform() {
            return this.platformAPI && this.platformAPI.getPlatform();
        }
        pay(paymentData, callback) {
            this.platformAPI && this.platformAPI.pay(paymentData, callback);
        }
        navigateToMiniGame(object) {
            this.platformAPI && this.platformAPI.navigateToMiniGame(object);
        }
        createInnerAudioContext() {
            return this.platformAPI && this.platformAPI.createInnerAudioContext();
        }
    }
    Platforms.m_instance = null;

    class UI_NativeAdViewButton extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "NativeAdViewButton"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
            this.m_n1 = (this.getChildAt(1));
            this.m_n2 = (this.getChildAt(2));
        }
    }
    UI_NativeAdViewButton.URL = "ui://2lldjolij6l4j8l";

    class UI_NativeAdViewCommandBtn extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "NativeAdViewCommandBtn"));
        }
        onConstruct() {
            this.m_icon = (this.getChildAt(0));
        }
    }
    UI_NativeAdViewCommandBtn.URL = "ui://2lldjolij6l4j8m";

    class UI_MoreGameBtn extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "MoreGameBtn"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
        }
    }
    UI_MoreGameBtn.URL = "ui://2lldjolij6l4j8o";

    class UI_ShortcutBtn extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "ShortcutBtn"));
        }
        onConstruct() {
            this.m_n0 = (this.getChildAt(0));
        }
    }
    UI_ShortcutBtn.URL = "ui://2lldjolij6l4j8q";

    class UI_NativeImage extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "NativeImage"));
        }
        onConstruct() {
            this.m_n18 = (this.getChildAt(0));
            this.m_ImageLoader = (this.getChildAt(1));
            this.m_n20 = (this.getChildAt(2));
        }
    }
    UI_NativeImage.URL = "ui://2lldjolijixpj8b";

    class UI_NativeImageLoader extends fgui.GLabel {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "NativeImageLoader"));
        }
        onConstruct() {
            this.m_icon = (this.getChildAt(0));
        }
    }
    UI_NativeImageLoader.URL = "ui://2lldjolijixpj8c";

    class UI_MoreGameCloseBtn extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "MoreGameCloseBtn"));
        }
        onConstruct() {
            this.m_icon = (this.getChildAt(0));
            this.m_t0 = this.getTransitionAt(0);
        }
    }
    UI_MoreGameCloseBtn.URL = "ui://2lldjolijixpj8f";

    class UI_MoreGameIcon extends fgui.GLabel {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "MoreGameIcon"));
        }
        onConstruct() {
            this.m_n2 = (this.getChildAt(0));
            this.m_icon = (this.getChildAt(1));
        }
    }
    UI_MoreGameIcon.URL = "ui://2lldjolijixpj8g";

    class UI_MoreGameView extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "MoreGameView"));
        }
        onConstruct() {
            this.m_n3 = (this.getChildAt(0));
            this.m_n6 = (this.getChildAt(1));
            this.m_n7 = (this.getChildAt(2));
            this.m_CloseBtn = (this.getChildAt(3));
            this.m_List = (this.getChildAt(4));
            this.m_n5 = (this.getChildAt(5));
        }
    }
    UI_MoreGameView.URL = "ui://2lldjolijixpj8h";

    class UI_MaskIcon extends fgui.GLabel {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "MaskIcon"));
        }
        onConstruct() {
            this.m_n2 = (this.getChildAt(0));
            this.m_icon = (this.getChildAt(1));
        }
    }
    UI_MaskIcon.URL = "ui://2lldjolilo4q3y";

    class UI_NativeIcon extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("GameAdUI", "NativeIcon"));
        }
        onConstruct() {
            this.m_n1 = (this.getChildAt(0));
            this.m_IconMask = (this.getChildAt(1));
            this.m_n3 = (this.getChildAt(2));
        }
    }
    UI_NativeIcon.URL = "ui://2lldjolilo4q40";

    class GameAdUIBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_NativeAdViewButton.URL, UI_NativeAdViewButton);
            fgui.UIObjectFactory.setExtension(UI_NativeAdViewCommandBtn.URL, UI_NativeAdViewCommandBtn);
            fgui.UIObjectFactory.setExtension(UI_MoreGameBtn.URL, UI_MoreGameBtn);
            fgui.UIObjectFactory.setExtension(UI_ShortcutBtn.URL, UI_ShortcutBtn);
            fgui.UIObjectFactory.setExtension(UI_NativeImage.URL, UI_NativeImage);
            fgui.UIObjectFactory.setExtension(UI_NativeImageLoader.URL, UI_NativeImageLoader);
            fgui.UIObjectFactory.setExtension(UI_MoreGameCloseBtn.URL, UI_MoreGameCloseBtn);
            fgui.UIObjectFactory.setExtension(UI_MoreGameIcon.URL, UI_MoreGameIcon);
            fgui.UIObjectFactory.setExtension(UI_MoreGameView.URL, UI_MoreGameView);
            fgui.UIObjectFactory.setExtension(UI_MaskIcon.URL, UI_MaskIcon);
            fgui.UIObjectFactory.setExtension(UI_NativeIcon.URL, UI_NativeIcon);
            fgui.UIObjectFactory.setExtension(UI_NativeAdView.URL, UI_NativeAdView);
        }
    }

    class MoreGameViewController extends ViewControllerGeneric {
        get URL() {
            return UI_MoreGameView.URL;
        }
        init() {
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            super.init();
        }
        unbind() {
            if (this.view.m_List.itemRenderer) {
                this.view.m_List.itemRenderer.clear();
            }
            this.view.m_List.off(fairygui.Events.CLICK_ITEM, this, this.onItemClick);
        }
        bind() {
            this.view.m_CloseBtn.onClick(this, this.onClose);
            this.view.m_List.itemRenderer = Laya.Handler.create(this, this.onItemRenderer, null, false);
            this.view.m_List.numItems = PlatformConfig.inst.currentPlatform.moreGameList.length;
            this.view.m_List.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick);
        }
        onItemRenderer(index, ui) {
            let data = PlatformConfig.inst.currentPlatform.moreGameList[index];
            ui.icon = data.icon;
        }
        onItemClick(ui) {
            let data = PlatformConfig.inst.currentPlatform.moreGameList[this.view.m_List.selectedIndex];
            let packageName = data.packageName;
            Platforms.inst.navigateToMiniGame(packageName);
        }
        onClose() {
            this.removeSelf();
        }
    }

    class MoreGameBtnComponent extends UI_MoreGameBtn {
        onConstruct() {
            super.onConstruct();
            this.on(Laya.Event.ADDED, this, this.init);
            this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        init() {
            if (Platforms.inst.platform == Platform.oppo_h5) {
                this.visible = true;
            }
            else if (Platforms.inst.platform == Platform.toutiao_h5 && Platforms.inst.getPlatform() == "ios") {
                this.visible = true;
            }
            else {
                this.visible = false;
            }
            this.onClick(this, () => {
                if (Platforms.inst.platform == Platform.oppo_h5) {
                    UIManager.inst.showPopupView(new MoreGameViewController());
                }
                else if (Platforms.inst.platform == Platform.toutiao_h5) {
                    Platforms.inst.showMoreGamesModal();
                }
            });
        }
        removeToScene() {
            this.off(Laya.Event.ADDED, this, this.init);
            this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
    }

    class NativeIconComponent extends UI_NativeIcon {
        constructor() {
            super(...arguments);
            this.images = [];
        }
        onConstruct() {
            super.onConstruct();
            this.on(Laya.Event.ADDED, this, this.addToScene);
            this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        addToScene() {
            this.key = this.data;
            this.getAd(this.key);
        }
        removeToScene() {
            this.off(Laya.Event.ADDED, this, this.addToScene);
            this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        getAd(key) {
            this.key = key;
            console.log("getAD:", this.key);
            Platforms.inst.onShowNativeIconAd((ad) => {
                if (ad) {
                    this.ad = ad;
                    PlatformAdManager.inst.nativeIconData = this.ad;
                }
                else {
                    this.ad = PlatformAdManager.inst.nativeIconData;
                    console.log("读取缓存的广告数据");
                }
                console.log(NativeIconComponent.name, "获取原生图标数据:", JSON.stringify(this.ad));
                this.setData(this.ad);
            }, this.key);
        }
        setData(ad) {
            if (ad == null) {
                this.visible = false;
                console.warn("没有原生图标广告数据!!!");
                return;
            }
            this.visible = true;
            if (Platforms.inst.platform == Platform.oppo_h5) {
                if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                    this.images = ad.imgUrlList;
                }
                else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                    this.images = ad.iconUrlList;
                }
                else if (ad.icon) {
                    this.images.push(ad.icon);
                }
            }
            this.m_IconMask.icon = this.images[0];
            this.onClick(this, () => {
                Platforms.inst.onNativeIconAdClick(ad.adId);
                this.getAd(this.key);
            });
        }
    }

    class NativeImageComponent extends UI_NativeImage {
        constructor() {
            super(...arguments);
            this.images = [];
            this.index = 0;
        }
        onConstruct() {
            super.onConstruct();
            this.on(Laya.Event.ADDED, this, this.addToScene);
            this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        addToScene() {
            this.key = this.data;
            this.visible = false;
            this.getAd(this.key);
        }
        removeToScene() {
            this.off(Laya.Event.ADDED, this, this.addToScene);
            this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
            Laya.timer.clear(this, this.loadImage);
        }
        getAd(key) {
            this.visible = false;
            if (Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5) {
                this.key = key;
                this.index = 0;
                Platforms.inst.onShowNativeAd((ad) => {
                    if (ad) {
                        this.ad = ad;
                        PlatformAdManager.inst.nativeImageAdData = this.ad;
                        this.visible = PlatformConfig.inst.currentPlatform.canAd;
                    }
                    else {
                        this.ad = PlatformAdManager.inst.nativeImageAdData;
                        console.log("读取缓存的广告数据");
                    }
                    console.log("获取原生三图数据:", JSON.stringify(this.ad));
                    this.setData(this.ad);
                }, this.key);
            }
        }
        setData(ad) {
            if (ad == null) {
                this.visible = false;
                console.warn("没有原生三图广告数据!!!");
                return;
            }
            this.visible = true;
            if (Platforms.inst.platform == Platform.oppo_h5) {
                if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                    this.images = ad.imgUrlList;
                }
                else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                    this.images = ad.iconUrlList;
                }
                else if (ad.icon) {
                    this.images.push(ad.icon);
                }
            }
            else if (Platforms.inst.platform == Platform.vivo_h5) {
                if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                    this.images = ad.imgUrlList;
                }
                else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                    this.images = ad.iconUrlList;
                }
                else if (ad.icon) {
                    this.images.push(ad.icon);
                }
                if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                    this.images = ad.imgUrlList;
                }
                else if (ad.icon && ad.icon != "") {
                    this.images.push(ad.icon);
                }
            }
            this.onClick(this, () => {
                console.log("原生广告点击");
                Laya.timer.clear(this, this.loadImage);
                Platforms.inst.onNativeAdClick(ad.adId);
                this.getAd(this.key);
            });
            Laya.timer.loop(2500, this, this.loadImage);
            this.loadImage();
        }
        loadImage() {
            this.m_ImageLoader.m_icon.url = this.images[this.index];
            this.index++;
            if (this.index >= this.images.length - 1) {
                this.index = 0;
            }
        }
    }

    class ShortcutBtnComponent extends UI_ShortcutBtn {
        onConstruct() {
            super.onConstruct();
            EventManager.inst.AddEventListener(PlatformEvents.onShortCutInstallEvent, this, this.onShortCutInstallEvent);
            this.on(Laya.Event.ADDED, this, this.addToScene);
            this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        removeToScene() {
            EventManager.inst.RemoveEventListener(PlatformEvents.onShortCutInstallEvent, this, this.onShortCutInstallEvent);
            this.off(Laya.Event.ADDED, this, this.addToScene);
            this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
        }
        onShortCutInstallEvent() {
            this.visible = false;
        }
        addToScene() {
            this.visible = false;
            if (Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5) {
                Platforms.inst.hasShortcutInstalled((install) => {
                    if (install == false) {
                        this.visible = true;
                        this.onClick(this, () => {
                            this.install();
                        });
                    }
                });
            }
        }
        install() {
            Platforms.inst.hasShortcutInstalled((installed) => {
                if (installed == false) {
                    Platforms.inst.installShortcut((success) => {
                        if (success) {
                            DataManager.inst.addCoins(50);
                            UIManager.inst.showToast("添加桌面图标成功，获得50钻石");
                            EventManager.inst.SendEvent(PlatformEvents.onShortCutInstallEvent);
                        }
                    });
                }
            });
        }
    }

    class YmAdSdk {
        static get inst() {
            if (this._inst == null) {
                this._inst = new YmAdSdk();
            }
            return this._inst;
        }
        init() {
            this.addFguiExtends();
        }
        addFguiExtends() {
            fairygui.UIPackage.addPackage("res/ui/GameAdUI");
            GameAdUIBinder.bindAll();
            fgui.UIObjectFactory.setExtension(UI_NativeIcon.URL, NativeIconComponent);
            fgui.UIObjectFactory.setExtension(UI_MoreGameBtn.URL, MoreGameBtnComponent);
            fgui.UIObjectFactory.setExtension(UI_NativeImage.URL, NativeImageComponent);
            fgui.UIObjectFactory.setExtension(UI_ShortcutBtn.URL, ShortcutBtnComponent);
        }
    }

    class GameEngine {
        constructor() {
            this.host = "";
            this.isLocal = false;
            this.debugIndex = 0;
            this.useZipAssets = false;
            this.zipHost = "";
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new GameEngine();
            }
            return this._inst;
        }
        set platform(value) {
            Platforms.inst.platform = value;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    UIManager.inst.init();
                    yield ResourcesManager.inst.loadLocalFiles();
                    PlatformConfig.inst.init(Platforms.inst.platform);
                    this.debug(`设置本地保存项目key ${PlatformConfig.inst.globalConfigs.localProjectkey}`);
                    LocalStorageManager.inst.projectKey = PlatformConfig.inst.globalConfigs.localProjectkey;
                    DataManager.inst.init();
                    SoundManager.inst.loadData();
                    if (this.useZipAssets == false &&
                        this.isLocal == false &&
                        PlatformConfig.inst.currentPlatform.basePath &&
                        PlatformConfig.inst.currentPlatform.basePath != "") {
                        Laya.URL.basePath = PlatformConfig.inst.currentPlatform.basePath;
                    }
                    Platforms.inst.setLoadingProgress(100);
                    this.debug(`设置Laya.URL.basePath ${Laya.URL.basePath}`);
                    resolve(true);
                }));
            });
        }
        initAsync(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                Platforms.inst.onInit(null);
                yield ResourcesManager.inst.loadResource();
                YmAdSdk.inst.init();
                let sdkPlatformConfig = new Array();
                sdkPlatformConfig.push(new SdkPlatformConfig("99e555608e754cca9725a3c9d2a7945b", Platform.weixin_h5));
                sdkPlatformConfig.push(new SdkPlatformConfig("tt_123456", Platform.toutiao_h5));
                sdkPlatformConfig.push(new SdkPlatformConfig("qqplay_123456", Platform.qqplay_h5));
                yield YMSDK.inst.initAsync(sdkPlatformConfig);
                DataManager.inst.initData();
                Platforms.inst.onInitAdService(() => {
                    callback();
                });
            });
        }
        saveData(key, data) {
            Platforms.inst.saveDataToCache(key, data);
        }
        loadData(key) {
            return Platforms.inst.readDataFromCache(key);
        }
        vibrateShort() {
            Platforms.inst.vibrateShort();
        }
        debug(msg) {
            this.debugIndex++;
            console.log(`${this.debugIndex}: 广州游梦 - ${msg}`);
        }
        pauseGame() {
            console.warn("暂停游戏");
            Laya.timer.scale = 0;
        }
        resumeGame() {
            console.warn("恢复游戏");
            Laya.timer.scale = 1;
        }
    }

    class TimeManager {
        constructor() {
            this.timers = new Array();
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new TimeManager();
            }
            return this._inst;
        }
        init() {
            if (this.timer == null) {
                this.timer = new Laya.Timer();
            }
            this.timer.frameLoop(1, this, this.onUpdate);
        }
        addTimer(id, timer) {
            if (this.has(id) == false) {
                timer.timeId = id;
                this.timers.push({ key: id, timer: timer });
            }
            else {
                console.log("已经有id");
            }
        }
        removeTimer(id) {
            if (this.has(id)) {
                let t = this.getTimer(id);
                t.clear();
                let index = this.getChildIndex(id);
                this.timers.splice(index, 1);
            }
            else {
                console.log("没有该timer id");
            }
        }
        onUpdate() {
            for (let index = 0; index < this.timers.length; index++) {
                const item = this.timers[index];
                item.timer.onUpdate();
            }
        }
        getTimer(id) {
            for (let index = 0; index < this.timers.length; index++) {
                const item = this.timers[index];
                if (item.key == id) {
                    return item.timer;
                }
            }
            return null;
        }
        has(id) {
            for (let index = 0; index < this.timers.length; index++) {
                const item = this.timers[index];
                if (item.key == id) {
                    return true;
                }
            }
            return false;
        }
        getChildIndex(id) {
            for (let index = 0; index < this.timers.length; index++) {
                const item = this.timers[index];
                if (item.key == id) {
                    return index;
                }
            }
            return -1;
        }
    }

    class CustomEventDispatcher extends Laya.EventDispatcher {
        constructor() { super(); }
        static get instance() {
            if (this._instance == null) {
                this._instance = new CustomEventDispatcher();
            }
            return this._instance;
        }
    }

    class ResultViewController extends ViewControllerGeneric {
        constructor() {
            super(...arguments);
            this.count = 5;
        }
        get URL() {
            return UI_ResultView.URL;
        }
        init() {
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        unbind() {
            Laya.timer.clear(this, this.onCountTime);
            YMSDK.inst.hideResultIconListView();
        }
        bind() {
            this.view.m_GetCoinBtn.onClick(this, this.onGetCoinBtnClick);
            this.view.m_FreeGetCoinBtn.onClick(this, this.onFreeGetCoinBtnClick);
            this.view.m_ContinueBtn.onClick(this, this.onContinuBtnClick);
            this.view.m_NextBtn.onClick(this, this.onNextBtnClick);
            this.view.m_State.selectedIndex = TruckGameManager.instance().isWin ? 0 : 1;
            this.view.m_CoinLabel.text = "+100";
            TruckGameManager.instance().loadLevel();
            if (TruckGameManager.instance().isWin == false) {
                Laya.timer.loop(1000, this, this.onCountTime);
                SoundManager.inst.Play(SoundType.SE_Lose);
            }
            else {
                SoundManager.inst.Play(SoundType.SE_Win);
            }
            this.view.m_adState.selectedIndex = PlatformConfig.inst.currentPlatform.canAd ? 1 : 0;
            if (Platforms.inst.platform != Platform.weixin_h5) {
                PlatformAdManager.inst.showBanner();
            }
            else {
                YMSDK.inst.showResultIconListView((s) => {
                });
            }
        }
        onCountTime() {
            this.count--;
            this.view.m_CountTimeLabel.text = this.count.toString();
            if (this.count == 0) {
                this.onContinuBtnClick();
            }
        }
        onFreeGetCoinBtnClick() {
            Laya.timer.clear(this, this.onCountTime);
            PlatformAdManager.inst.showRewardedVideo((success) => {
                if (success) {
                    let reward = 200;
                    DataManager.inst.addCoins(reward);
                    this.removeAfter(() => {
                        CustomEventDispatcher.instance.event("gameUI");
                    });
                }
                Laya.timer.loop(1000, this, this.onCountTime);
            });
        }
        onGetCoinBtnClick() {
            this.removeAfter(() => {
                CustomEventDispatcher.instance.event("gameUI");
            });
            CustomEventDispatcher.instance.event("gameUI");
        }
        onNextBtnClick() {
            Laya.timer.clear(this, this.onCountTime);
            PlatformAdManager.inst.showRewardedVideo((success) => {
                if (success) {
                    DataManager.inst.clearStage();
                    TruckGameManager.instance().loadLevel();
                    this.removeAfter(() => {
                        CustomEventDispatcher.instance.event("gameUI");
                    });
                }
                else {
                    Laya.timer.loop(1000, this, this.onCountTime);
                }
            });
        }
        onContinuBtnClick() {
            this.removeAfter(() => {
                CustomEventDispatcher.instance.event("gameUI");
            });
        }
        removeAfter(callback) {
            if (YMSDK.inst.enabled) {
                if (Platforms.inst.platform == Platform.weixin_h5) {
                    YMSDK.inst.showPowerView((success) => {
                        if (success) {
                            this.removeSelf();
                            Laya.timer.once(1000, this, () => {
                                callback && callback();
                            });
                        }
                    });
                }
                else {
                    this.removeSelf();
                    Laya.timer.once(1000, this, () => {
                        callback && callback();
                    });
                }
            }
            else {
                this.removeSelf();
                Laya.timer.once(1000, this, () => {
                    callback && callback();
                });
            }
        }
    }

    class GameData {
        static getDefaultCarLockData() {
            return {
                0: {
                    p: 100,
                    s: false
                },
                1: {
                    p: 100,
                    s: false
                },
                2: {
                    p: 100,
                    s: false
                },
                3: {
                    p: 100,
                    s: false
                },
                4: {
                    p: 100,
                    s: false
                },
                5: {
                    p: 100,
                    s: false
                }
            };
        }
        static getRandomInArr(e) {
            var t = ~~(Math.random() * e.length * 2);
            return e[t %= e.length];
        }
        static getEnvColor() {
            return {
                p: this.getRandomInArr(this.fogColors),
                r: this.getRandomInArr(this.roadColors)
            };
        }
        static getStorage(e, t) {
            var a = Laya.LocalStorage.getJSON(e);
            return "" == a || null == a || null == a || "undefined" == a ? (this.setStorage(e, t),
                t) : a;
        }
        static setStorage(e, t) {
            Laya.LocalStorage.setJSON(e, t);
        }
        static TransformPoint(e, t, a) {
            var n = e.worldMatrix;
            Laya.Vector3.transformV3ToV3(t, n, a);
        }
        static InverseTransformPoint(e, t, a) {
            var n = new Laya.Matrix4x4;
            e.worldMatrix.invert(n),
                Laya.Vector3.transformV3ToV3(t, n, a);
        }
        static QuaternionEuler(e, t, a, n) {
            var r = 180 / Math.PI;
            Laya.Quaternion.createFromYawPitchRoll(t / r, e / r, a / r, n);
        }
        static getQueryVariable(e, t) {
            for (var a = window.location.search.substring(1).split("&"), n = 0; n < a.length; n++) {
                var r = a[n].split("=");
                if (r[0] == e)
                    return r[1];
            }
            return t;
        }
        static FindChild(e, t) {
            for (var a = t.split("/"), n = 0; n < a.length; n++)
                if (t = a[n],
                    null == (e = e.getChildByName(t)))
                    return null;
            return e;
        }
        static QuaternionVector3(e, t, a) {
            var n = new Laya.Matrix4x4;
            return Laya.Matrix4x4.createFromQuaternion(e, n),
                Laya.Vector3.transformV3ToV3(t, n, a),
                a;
        }
        static FromToRotation(e, t, a) {
            Laya.Vector3.normalize(e, e),
                Laya.Vector3.normalize(t, t);
            var n = Laya.Vector3.dot(e, t);
            if (n >= 1)
                return new Laya.Quaternion;
            if (n < 1e-6 - 1) {
                var r = new Laya.Vector3;
                Laya.Vector3.cross(new Laya.Vector3(1, 0, 0), e, r),
                    this.isVectorZeroLength(r),
                    Laya.Vector3.cross(new Laya.Vector3(0, 1, 0), e, r),
                    Laya.Vector3.normalize(r, r),
                    Laya.Quaternion.createFromAxisAngle(r, 180, a);
            }
            else {
                var i = Math.sqrt(2 * (1 + n)), s = 1 / i, h = new Laya.Vector3;
                Laya.Vector3.cross(e, t, h),
                    a.x = h.x * s,
                    a.y = h.y * s,
                    a.z = h.z * s,
                    a.w = .5 * i,
                    a.normalize(a);
            }
            return a;
        }
        static isVectorZeroLength(e) {
            return e.x * e.x + e.y * e.y + e.z * e.z < 1e-12;
        }
        static LerpNumber(e, t, a) {
            return e + a * (t - e);
        }
        static Vector3Angle(e, t, a) {
            void 0 === a && (a = 1),
                e = e.clone(),
                Laya.Vector3.normalize(e, e),
                t = t.clone(),
                Laya.Vector3.normalize(t, t);
            var n = Laya.Vector3.dot(e, t);
            n = Math.max(-1, Math.min(1, n)),
                this.isZero(n) && (n = 0);
            var r = Math.acos(n) * (180 / Math.PI), i = new Laya.Vector3;
            switch (Laya.Vector3.cross(e, t, i),
                a) {
                case 0:
                    i.x < 0 && (r *= -1);
                    break;
                case 1:
                    i.y < 0 && (r *= -1);
                    break;
                case 2:
                    i.z < 0 && (r *= -1);
                    break;
                default:
                    i.y < 0 && (r *= -1);
            }
            return this.isZeroByValue(r, .1) ? 0 : r;
        }
        static isZero(e) {
            return Math.abs(e) < 1e-6;
        }
        static isZeroByValue(e, t) {
            return Math.abs(e) < t;
        }
    }
    GameData.fogColors = [new Laya.Vector3(.3795415, .7941176, .3824006), new Laya.Vector3(.3633218, .5783081, .7058823), new Laya.Vector3(.6524901, .3986267, .7426471)];
    GameData.roadColors = [new Laya.Vector3(.3412, .4431, .7922), new Laya.Vector3(.6431, .2745, .5608), new Laya.Vector3(.8353, .4745, .1686), new Laya.Vector3(.2353, .6824, .2902), new Laya.Vector3(.5922, .3059, .8667), new Laya.Vector3(.3961, .2157, .7373), new Laya.Vector3(.4235, .6745, .4118), new Laya.Vector3(.7059, .251, .2745), new Laya.Vector3(.2667, .4157, .6549), new Laya.Vector3(.1843, .5843, .5294)];
    GameData.colorTable = [{
            p: new Laya.Vector3(.3795415, .7941176, .3824006),
            r: new Laya.Vector3(.5382891, .245026, .7573529)
        }, {
            p: new Laya.Vector3(.3633218, .5783081, .7058823),
            r: new Laya.Vector3(.7867647, .2661116, .7508579)
        }, {
            p: new Laya.Vector3(.6524901, .3986267, .7426471),
            r: new Laya.Vector3(.8970588, .4606297, .1253244)
        }];

    class CustomEventType {
    }
    CustomEventType.CoinChange = "coinChange";
    CustomEventType.PeopleChange = "PeopleChange";
    CustomEventType.BossVal = "BossVal";
    CustomEventType.PassChange = "PassChange";

    class LayaBehavior3D extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._transform = null;
        }
        get transform() {
            if (!this._transform) {
                this._transform = this.owner.transform;
            }
            return this._transform;
        }
        onEnable() {
            CustomEventDispatcher.instance.on(CustomEventType.PassChange, this, this.setStartPos);
            this.initPos = this.transform.localPosition.clone();
            this.initRotate = this.transform.localRotationEuler.clone();
        }
        setStartPos() {
            this.transform.localPosition = this.initPos;
            this.transform.localRotationEuler = this.initRotate;
        }
        get gameObject() {
            if (!this._gameObject)
                this._gameObject = this.owner;
            return this._gameObject;
        }
        GetRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
        getForwardVector() {
            let targetForward = new Laya.Vector3();
            this.transform.getForward(targetForward);
            return targetForward;
        }
    }

    class CameraFollow extends LayaBehavior3D {
        constructor() {
            super(...arguments);
            this.followSpeed = 10;
            this.offsetPosition = new Laya.Vector3;
            this.stateMachine = null;
        }
        get transform() {
            return this.gameObject.transform;
        }
        onAwake() {
            this.camera = this.gameObject.getChildByName("Main Camera");
            this.animator = this.camera.getComponent(Laya.Animator);
            CustomEventDispatcher.instance.on("Default", this, this.OnDefaultEnter);
            CustomEventDispatcher.instance.on("Ending", this, this.OnEndingEnter);
        }
        OnDefaultEnter() {
            this.animator.play("zoomout");
        }
        OnEndingEnter() {
            this.animator.play("ending");
        }
        SetTarget(e) {
            if (e) {
                var t = e.transform.position;
                Laya.Vector3.subtract(this.transform.position, t, this.offsetPosition);
                e.transform.position.cloneTo(t);
                this.transform.position = t;
                this.target = e;
            }
        }
        onLateUpdate() {
            if (this.target) {
                var e = this.target.transform.position.clone();
                Laya.Vector3.add(e, this.offsetPosition, e);
                var t = this.transform.position.clone();
                Laya.Vector3.lerp(t, e, 1, e);
                this.transform.position = e;
            }
        }
    }

    class c {
        get Heading() {
            var e = new Laya.Vector3;
            return Laya.Vector3.subtract(this.Front, this.Back, e),
                Laya.Vector3.normalize(e, e),
                e;
        }
        get IsSet() {
            var e = Laya.Vector3.equals(this.Front, new Laya.Vector3()), t = Laya.Vector3.equals(this.Back, new Laya.Vector3());
            return !e && !t;
        }
        get IsOr() {
            var e = Laya.Vector3.equals(this.Front, new Laya.Vector3()), t = Laya.Vector3.equals(this.Back, new Laya.Vector3());
            return !e || !t;
        }
    }

    class carBase extends LayaBehavior3D {
        constructor() {
            super(...arguments);
            this.layerMask = 5;
            this.axleInfos = [];
            this.rigidbody = null;
            this.SuspensionForce = 2000;
            this.SuspensionLength = 1;
            this.AntiRollForce = 2000;
            this.m_groundForward = null;
        }
        get transform() {
            return this.gameObject.transform;
        }
        onAwake() {
            this.rigidbody = this.owner.getComponent(Laya.Rigidbody3D);
            this.rigidbody.mass = 70;
            this.rigidbody.linearDamping = .9;
            this.rigidbody.angularDamping = .999;
            this.rigidbody.overrideGravity = true;
            this.rigidbody.gravity = new Laya.Vector3(0, -30, 0);
        }
        AddFrontWheel(e, t) {
            var a = { IsFront: false, LeftWheel: '', RightWheel: "" };
            a.IsFront = true;
            a.LeftWheel = e;
            a.RightWheel = t;
            this.axleInfos.push(a);
        }
        AddBackWheel(e, t) {
            var a = { LeftWheel: '', RightWheel: "", IsBack: false };
            a.IsBack = true;
            a.LeftWheel = e;
            a.RightWheel = t;
            this.axleInfos.push(a);
        }
        GetGroundBasedForward() {
            var e = new Laya.Vector3().clone(), t = new Laya.Vector3().clone();
            for (var a = 0; a < this.axleInfos.length; a++) {
                var n = this.axleInfos[a];
                if (null != n.LastLeftWheelResult && null != n.LastRightWheelResult) {
                    var r = new Laya.Vector3;
                    Laya.Vector3.add(n.LastLeftWheelResult.ImpactPoint, n.LastRightWheelResult.ImpactPoint, r),
                        Laya.Vector3.scale(r, .5, r),
                        n.IsFront && (e = r),
                        n.IsBack && (t = r);
                }
            }
            var i = new c;
            return i.Front = e,
                i.Back = t,
                i;
        }
        HandleWheel(e) {
            var t = this.GetTransformUp(e), a = e.transform.position.clone(), n = new Laya.Vector3;
            Laya.Vector3.scale(t, -1, n);
            var r = new Laya.Ray(a, n), i = new Laya.HitResult;
            if (!TruckGameManager.instance().gameScene.physicsSimulation.rayCast(r, i, this.SuspensionLength, 1, 1))
                return null;
            var s = Laya.Vector3.distance(r.origin, i.point), h = this.Round(1 - s / this.SuspensionLength, 2), c = { Hit: new Laya.HitResult(), CompressionRatio: 0, ImpactPoint: "" };
            c.Hit = i;
            c.CompressionRatio = h;
            c.ImpactPoint = i.point.clone();
            var d = new Laya.Vector3;
            Laya.Vector3.scale(t, this.SuspensionForce * h, d);
            var g = e.transform.localPosition.clone();
            Laya.Vector3.subtract(g, new Laya.Vector3(0, 5, 0), g), GameData.TransformPoint(e.transform, g, g);
            var p = g;
            return Laya.Vector3.subtract(p, this.transform.position, p),
                this.rigidbody.applyForce(d, p),
                c;
        }
        HandleBalance(e) {
            var t = 1, a = 1, n = e.LastLeftWheelResult;
            n && (t = n.CompressionRatio);
            var r = e.LastLeftWheelResult;
            r && (a = n.CompressionRatio);
            var i = (t - a) * this.AntiRollForce;
            if (n) {
                var o = new Laya.Vector3;
                Laya.Vector3.scale(this.GetTransformUp(e.LeftWheel), -i, o);
                var s = e.LeftWheel.transform.position.clone();
                Laya.Vector3.subtract(s, this.transform.position, s),
                    this.rigidbody.applyForce(o, s);
            }
            if (r) {
                o = new Laya.Vector3;
                Laya.Vector3.scale(this.GetTransformUp(e.RightWheel), i, o);
                s = e.RightWheel.transform.position.clone();
                Laya.Vector3.subtract(s, this.transform.position, s),
                    this.rigidbody.applyForce(o, s);
            }
        }
        GetTransformUp(e) {
            var t = new Laya.Vector3;
            return e.transform.getUp(t),
                t;
        }
        Round(e, t) {
            var a = Math.pow(10, t);
            return Math.round(e * a) / a;
        }
    }

    class cargo extends Laya.Script3D {
        onAwake() {
            this.cargosCnt = 0;
        }
        onDisable() {
            Laya.timer.clear(this, this.checkIfFail);
        }
        onTriggerEnter(e) {
            if (e.owner.name.startsWith("cargox")) {
                this.cargosCnt++;
                TruckGameManager.instance().addCargo(e.owner.parent);
            }
        }
        onTriggerExit(e) {
            if (e.owner.name.startsWith("cargox")) {
                this.cargosCnt--;
                TruckGameManager.instance().removeCargo(e.owner.parent);
                Laya.timer.once(500, this, this.checkIfFail);
            }
        }
        checkIfFail() {
        }
        canStartGame() {
            return this.cargosCnt > 0;
        }
    }

    class Car extends carBase {
        constructor() {
            super(...arguments);
            this.radius = .5;
            this.TurnStrength = 5000;
            this.ForwardAcceleration = 4000;
            this.loadedCargos = [];
            this.m_forward = new Laya.Vector3;
            this.defRotateSpeed = 50;
            this.rotateSpeed = 50;
            this.head = null;
            this.buffers = {};
            this.frontWheels = [];
            this.backWheels = [];
            this.backTrails = [];
            this.speedUpdaPosition = null;
            this.danqiEffect = null;
            this.targetPosition = new Laya.Vector3;
            this.dummyTarPos = new Laya.Vector3;
            this.cargoTrigger = null;
            this.findTargetComplete = null;
            this.offsetPosition = new Laya.Vector3;
            this.pause = true;
        }
        onAwake() {
            super.onAwake();
            this.SuspensionLength = 1;
            this.frontWheels[0] = GameData.FindChild(this.owner, "Wheels/FL");
            this.frontWheels[1] = GameData.FindChild(this.owner, "Wheels/FR");
            this.backWheels[0] = GameData.FindChild(this.owner, "Wheels/BL");
            this.backWheels[1] = GameData.FindChild(this.owner, "Wheels/BR");
            this.head = this.gameObject.getChildByName("Head").transform;
            var e = this.owner.getChildByName("Raycasts");
            this.SuspensionLength = e.transform.localPositionY + this.radius;
            var t = e.getChildByName("FL"), a = e.getChildByName("FR"), n = e.getChildByName("BL"), r = e.getChildByName("BR");
            this.AddFrontWheel(t, a);
            this.AddBackWheel(n, r);
            this.speedUpdaPosition = this.owner.getChildByName("SpeedUpPosition");
            this.cargoTrigger = this.owner.getChildByName("CargoTrigger");
            this.cargoTrigger.addComponent(cargo);
        }
        SetTarget(e) {
            e.cloneTo(this.targetPosition);
        }
        SetShutDown() {
            this.rigidbody.linearFactor = new Laya.Vector3(0, 1, 0);
            var i = this.rigidbody.linearVelocity;
            i.setValue(0, i.y, 0);
            this.rigidbody.linearVelocity = i;
        }
        OnSpeedDownEnter() {
            this.pause = false;
            this.rotateSpeed = 0;
            if (this.backWheels.length > 0) {
                for (var e = 0; e < this.backWheels.length; e++) {
                    this.backWheels[e].transform.localRotationEulerX = 0;
                }
            }
            this.rotateSpeed = this.defRotateSpeed;
            this.axleInfos[1];
            var i = new Laya.Vector3;
            Laya.Vector3.normalize(this.m_forward, i);
            var t = new Laya.Vector3;
            Laya.Vector3.normalize(this.rigidbody.linearVelocity, t);
        }
        addForce() {
            if (this.pause == false) {
                if (this.m_groundForward && this.m_groundForward.IsOr) {
                    this.rigidbody.linearFactor = new Laya.Vector3(1, 1, 1);
                    var a = new Laya.Vector3;
                    Laya.Vector3.scale(this.m_forward, this.ForwardAcceleration, a);
                    var b = new Laya.Vector3;
                    Laya.Vector3.subtract(this.speedUpdaPosition.transform.position, this.transform.position, b);
                    this.rigidbody.applyForce(a, b);
                }
            }
        }
        onUpdate() {
            this.addForce();
            for (var e = 0; e < this.axleInfos.length; e++) {
                var t = this.axleInfos[e];
                t.LastLeftWheelResult = this.HandleWheel(t.LeftWheel);
                t.LastRightWheelResult = this.HandleWheel(t.RightWheel);
            }
            for (e = 0; e < this.axleInfos.length; e++)
                this.HandleBalance(this.axleInfos[e]);
            this.OnCarTransform();
        }
        OnCarTransform() {
            this.UpdateBuffers();
            this.UpdateCurrentGroundForward();
            this.OrientationTarget(this.targetPosition);
            this.CorrectionWheelRotation(this.frontWheels, true);
            this.CorrectionWheelRotation(this.backWheels, false);
            this.CorrectionWheelPosition(this.frontWheels, this.axleInfos[0]);
            this.CorrectionWheelPosition(this.backWheels, this.axleInfos[1]);
        }
        UpdateCurrentGroundForward() {
            var e = this.GetGroundBasedForward();
            if (e.IsSet)
                e.Heading.cloneTo(this.m_forward);
            else {
                var t = new Laya.Vector3;
                this.transform.getForward(t);
                Laya.Vector3.normalize(t, t);
                Laya.Vector3.scale(t, -1, t);
                t.cloneTo(this.m_forward);
            }
            this.m_groundForward = e;
        }
        AddTurnForce(e) {
            var t = new Laya.Vector3;
            Laya.Vector3.subtract(this.head.position, this.transform.position, t);
            this.rigidbody.applyForce(e, t);
        }
        OrientationTarget(e) {
            var a = new Laya.Vector3;
            Laya.Vector3.normalize(this.m_forward, a);
            var n = new Laya.Vector3;
            Laya.Vector3.normalize(this.rigidbody.linearVelocity, n);
            var r = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity), i = Laya.Vector3.dot(n, a);
            if (r > 2 && i > .1) {
                var s = new Laya.Vector3;
                GameData.InverseTransformPoint(this.transform, new Laya.Vector3(e.x, this.transform.position.y, e.z), s),
                    s.y = 0;
                var h = s.x / Laya.Vector3.scalarLength(s), c = new Laya.Vector3(1, 0, 0);
                GameData.QuaternionVector3(this.transform.rotation, c, c);
                Laya.Vector3.scale(c, h * this.TurnStrength, c);
                this.AddTurnForce(c);
            }
            if (this.pause == false && this.m_groundForward && this.m_groundForward.IsSet) {
                var l = new Laya.Quaternion;
                GameData.FromToRotation(n, a, l);
                GameData.QuaternionVector3(l, n, n);
                Laya.Vector3.scale(n, r, n);
                this.rigidbody.linearVelocity = n;
            }
        }
        CorrectionWheelPosition(e, t) {
            for (var a = 0; a < e.length; a++) {
                var n = e[a], r = null, i = new Laya.Vector3;
                0 == a && (r = t.LastLeftWheelResult),
                    1 == a && (r = t.LastRightWheelResult),
                    null != r ? (r.ImpactPoint.cloneTo(i),
                        GameData.InverseTransformPoint(n.transform._parent, i, i),
                        Laya.Vector3.add(i, new Laya.Vector3(0, this.radius, 0), i)) : n.transform.localPosition.cloneTo(i);
                var s = n.transform.localPosition;
                Laya.Vector3.lerp(s, i, .5, s);
                n.transform.localPosition = s;
            }
        }
        CorrectionWheelRotation(e, t) {
            var a = new Laya.Vector3, n = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
            if (0 != n) {
                Laya.Vector3.scale(this.rigidbody.linearVelocity, 1 / n, a);
                var r = n * Laya.Vector3.dot(a, this.m_forward) * (Laya.timer.delta / 1e3) * this.rotateSpeed;
                for (var i = 0; i < e.length; i++)
                    e[i].transform.localRotationEulerX += r;
                if (t) {
                    var s = new Laya.Vector3;
                    GameData.InverseTransformPoint(this.transform, new Laya.Vector3(this.targetPosition.x, this.transform.position.y, this.targetPosition.z), s),
                        s.y = 0,
                        Laya.Vector3.normalize(s, s);
                    var h = GameData.Vector3Angle(new Laya.Vector3(0, 0, 1), s, 1);
                    h = Math.max(-45, Math.min(45, h));
                    var c = e[0].transform.localRotationEulerY;
                    c = GameData.LerpNumber(c, h, .2);
                    for (i = 0; i < e.length; i++)
                        e[i].transform.localRotationEulerY = c;
                }
            }
        }
        UpdateBuffers() {
            for (var e in this.buffers) {
                if (this.buffers[e].TryUpdateBuffer(this) || (this.buffers[e].Stop(this))) {
                    delete this.buffers[e];
                }
            }
        }
        onTriggerEnter(e) {
            if ("endTrigger" == e.owner.name) {
                console.log("@stop the car");
                this.SetShutDown();
                TruckGameManager.instance().recoveryCargos();
                e.enabled = false;
                this.pause = true;
            }
            if ("zoomCameraObj" == e.owner.name) {
                CustomEventDispatcher.instance.event("Default");
                e.enabled = false;
            }
            if ("endingCamera" == e.owner.name) {
                CustomEventDispatcher.instance.event("Ending");
                e.enabled = false;
            }
        }
        onCollisionEnter(e) {
            if (TruckGameManager.instance().gameState == GameState$1.游戏结算)
                return;
            var t = e.other.owner.name.toLocaleLowerCase();
            if ("plane" == t) {
                TruckGameManager.instance().result(false);
            }
        }
    }

    class point extends Laya.Script3D {
        onAwake() {
            this.pointIndexByName = Number.parseInt(this.owner.name.replace("p", ""));
            this.parentRoadScript = this.owner.parent.getComponent(model);
        }
        onTriggerEnter(e) {
            console.log("@hit waypoint %d", this.pointIndexByName);
            var t = this.parentRoadScript.getNextPointPosInWorld(this.pointIndexByName);
            TruckGameManager.instance().carScript.SetTarget(t);
            this.owner.removeSelf();
        }
    }

    class model extends LayaBehavior3D {
        onAwake() {
            this.roadObj = this.gameObject;
        }
        static createWithPoint(e) {
            var t = new model;
            return t.setMaxPointCount(e), t;
        }
        addWayPoints() {
            for (var e = 0; e < this.maxPoint; e++) {
                var t = e + 1;
                this.owner.getChildByName("p" + t).addComponent(point);
            }
        }
        setMaxPointCount(e) {
            this.maxPoint = e;
        }
        getNextPointPosInWorld(e) {
            var t = "p" + (e + 1);
            var a = this.roadObj.getChildByName(t);
            return null == a ? TruckGameManager.instance().getDefaultTartget() : a.transform.position;
        }
    }

    var GameState$1;
    (function (GameState) {
        GameState[GameState["\u5F00\u59CB\u6E38\u620F"] = 0] = "\u5F00\u59CB\u6E38\u620F";
        GameState[GameState["\u6E38\u620F\u4E2D"] = 1] = "\u6E38\u620F\u4E2D";
        GameState[GameState["\u6E38\u620F\u7ED3\u7B97"] = 2] = "\u6E38\u620F\u7ED3\u7B97";
    })(GameState$1 || (GameState$1 = {}));
    class TruckGameManager {
        constructor() {
            this.sceneBasePath = "sub1/res/LayaScene_map0/Conventional/";
            this.carsScenePath = "sub1/res/cars/Cars.lh";
            this.cargosPath = "sub1/res/LayaScene_cargos/Conventional/cargos.lh";
            this.maxLeveLCount = 20;
            this.vv = 3;
            this.nowCargos = [];
            this.genPositons = [];
            this.gameState = GameState$1.开始游戏;
            this.isWin = false;
            Laya.Physics3DUtils.gravity = new Laya.Vector3(0, -15, 0);
            this.nowLevel = DataManager.inst.user.currentStage;
            this.nowCoin = DataManager.inst.user.coins;
            this.nowCarData = GameData.getStorage(`drivehill_${this.vv}nowCarData`, GameData.getDefaultCarLockData());
            this.nowCarIndex = GameData.getStorage(`drivehill_${this.vv}nowCarIndex`, 0);
        }
        static instance() {
            if (TruckGameManager._instance == null)
                TruckGameManager._instance = new TruckGameManager();
            return TruckGameManager._instance;
        }
        loadLevel() {
            if (this.gameScene)
                this.gameScene.destroy();
            Laya.Resource.destroyUnusedResources();
            let t = this.nowLevel % this.maxLeveLCount;
            let a = this.sceneBasePath + `map${t}.ls`;
            Laya.Scene3D.load(a, Laya.Handler.create(this, (t) => {
                Laya.stage.addChildAt(t, 0);
                this.gameScene = t;
                this.init();
            }));
        }
        init() {
            this.gameState = GameState$1.开始游戏;
            this.carScene = Laya.loader.getRes(this.carsScenePath);
            var e = GameData.getEnvColor();
            this.gameScene.enableFog = true;
            this.gameScene.fogStart = 15;
            this.gameScene.fogRange = 200;
            this.gameScene.fogColor = e.p;
            this.gameScene.getChildByName("roadLong").getChildByName("road").meshRenderer.sharedMaterial.albedoColor = e.r;
            this.gameScene.getChildByName("Plane").meshRenderer.sharedMaterial.albedoColor = e.p;
            var t = this.gameScene.getChildByName("camera");
            t.getChildByName("Main Camera").clearColor = e.p;
            this.cfollow = t.addComponent(CameraFollow);
            this.setup();
            this.initRoads();
            this.changeCar(this.nowCarIndex);
        }
        setup() {
            this.prefabs = new Array;
            this.genPositons = [];
            this.nowCargos = [];
            var e = Laya.loader.getRes(this.cargosPath);
            for (var t in e._children) {
                var a = e._children[t];
                a.name.startsWith("cargo") && this.prefabs.push(a);
            }
        }
        addLevel() {
            this.nowLevel += 1;
            DataManager.inst.clearStage();
            this.nowLevel = DataManager.inst.user.currentStage;
            CustomEventDispatcher.instance.event("addLevel");
        }
        unlockCar(e) {
            if (this.nowCarData[e]) {
                this.nowCarData[e].s = false;
                GameData.setStorage(`drivehill_${this.vv}nowCarData`, this.nowCarData);
            }
        }
        removeCargos() {
            var e = [], t = this.gameScene._children;
            for (var a in t) {
                var n = t[a];
                n.name.startsWith("cargo") && e.push(n);
            }
            for (var r = e.length, i = 0; i < r; i++) {
                e[i].destroy();
            }
            this.nowCargos = [];
        }
        addCargo(e) {
            this.nowCargos.push(e);
        }
        removeCargo(e) {
            this.nowCargos.splice(this.nowCargos.indexOf(e), 1);
        }
        recoveryCargos() {
            var e = this.nowCargos.length;
            if (e > 0) {
                var t = 0;
                for (var a in this.nowCargos) {
                    t++;
                    let r = this.nowCargos[a];
                    Laya.timer.once(200 * t, this, () => {
                        this.handleOneCargo(r, e);
                        console.log(this.nowCargos.length);
                        if (this.nowCargos.length == 1) {
                            Laya.timer.once(500, this, () => {
                                this.result(true);
                            });
                        }
                    });
                }
            }
            else {
                this.result(false);
            }
        }
        result(isWin) {
            if (this.gameState == GameState$1.游戏结算)
                return;
            this.gameState = GameState$1.游戏结算;
            console.log("游戏胜利失败:", isWin);
            this.isWin = isWin;
            if (this.isWin) {
                DataManager.inst.addCoins(100);
                TruckGameManager.instance().addLevel();
            }
            UIManager.inst.showPopupView(new ResultViewController());
        }
        handleOneCargo(e, t) {
            if (e.getChildAt(0))
                e.getChildAt(0).getComponent(Laya.Rigidbody3D).enabled = false;
            var a = e.transform, n = a.localPositionY + 7, r = a.localPositionX, i = a.localPositionZ;
            Laya.Tween.to(a, {
                localPositionY: n,
                localPositionX: r,
                localPositionZ: i
            }, 500, null, Laya.Handler.create(this, () => {
                e.destroy();
            }));
        }
        makeCargos(e) {
            var t = GameData.getRandomInArr(this.prefabs), a = e.getChildByName("CargoPosition"), n = 4;
            for (var r in a._children) {
                var i = a._children[r].transform.position;
                this.genPositons.push(i);
                var s = t.clone();
                s.transform.position = new Laya.Vector3(i.x, i.y + 3 + Math.random(), i.z);
                this.gameScene.addChild(s);
                var h = s.getChildAt(0).getComponent(Laya.Rigidbody3D);
                if (h.linearDamping = .5,
                    h.friction = 3,
                    h.linearVelocity = new Laya.Vector3,
                    h.applyImpulse(new Laya.Vector3(0, -5, 0)),
                    --n <= 0)
                    break;
            }
        }
        changeCar(e) {
            this.removeCargos();
            this.car && this.car.parent && this.car.removeSelf();
            this.car = this.carScene.getChildByName("Car" + e).clone();
            var t = this.gameScene.getChildByName("carPos");
            if (t)
                this.car.transform.position = t.transform.position;
            this.car.transform.localRotationEulerY = 0;
            this.gameScene.addChild(this.car);
            Laya.timer.frameOnce(10, this, () => {
                this.makeCargos(this.car);
            });
            this.carScript = this.car.addComponent(Car);
            this.carScript.SetTarget(this.getDefaultTartget());
            this.carScript.SetShutDown();
            this.cfollow.SetTarget(this.car);
            this.nowCarIndex = e;
            GameData.setStorage(`drivehill_${this.vv}nowCarIndex`, this.nowCarIndex);
        }
        initRoads() {
            var e = this.gameScene._children;
            for (var t in e) {
                var a = e[t];
                if (a.name.startsWith("roadS1")) {
                    var n = model.createWithPoint(3);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("roadS2")) {
                    n = model.createWithPoint(3);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("k_k3")) {
                    n = model.createWithPoint(3);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("k_k14")) {
                    n = model.createWithPoint(14);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("k_k4")) {
                    n = model.createWithPoint(4);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("k_k2")) {
                    n = model.createWithPoint(2);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("k_k5")) {
                    n = model.createWithPoint(5);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                if (a.name.startsWith("k_k6")) {
                    n = model.createWithPoint(6);
                    a.addComponentIntance(n);
                    n.addWayPoints();
                }
                a.name.startsWith("endingObj");
            }
        }
        getDefaultTartget() {
            var e = new Laya.Vector3;
            Laya.Vector3.add(this.car.transform.position, new Laya.Vector3(0, 0, 500), e);
            return e;
        }
        OnSpeedDownEnter() {
            this.carScript.OnSpeedDownEnter();
        }
    }

    var LanguageType;
    (function (LanguageType) {
        LanguageType[LanguageType["CN"] = 0] = "CN";
        LanguageType[LanguageType["EN"] = 1] = "EN";
        LanguageType[LanguageType["RU"] = 2] = "RU";
        LanguageType[LanguageType["AR"] = 3] = "AR";
        LanguageType[LanguageType["ZH_CN"] = 4] = "ZH_CN";
        LanguageType[LanguageType["KO"] = 5] = "KO";
        LanguageType[LanguageType["JA"] = 6] = "JA";
        LanguageType[LanguageType["PT"] = 7] = "PT";
        LanguageType[LanguageType["ES"] = 8] = "ES";
        LanguageType[LanguageType["DE"] = 9] = "DE";
        LanguageType[LanguageType["FR"] = 10] = "FR";
        LanguageType[LanguageType["BN"] = 11] = "BN";
        LanguageType[LanguageType["MS"] = 12] = "MS";
        LanguageType[LanguageType["HI"] = 13] = "HI";
        LanguageType[LanguageType["VI"] = 14] = "VI";
    })(LanguageType || (LanguageType = {}));
    class MultiLanguageManager {
        constructor() {
            this.m_data = new Array();
            this.languageType = LanguageType.CN;
        }
        static get inst() {
            if (this._inst == null) {
                this._inst = new MultiLanguageManager();
            }
            return this._inst;
        }
        get data() {
            return this.m_data;
        }
        set data(d) {
            this.m_data = d;
        }
        getLanguageString(type) {
            var label = "";
            switch (type) {
                case LanguageType.CN:
                    label = "";
                    break;
                default:
                    label = "en";
                    break;
            }
            return label;
        }
        getLanguage(key, repaceStr = "") {
            var label = key;
            switch (this.languageType) {
                case LanguageType.CN:
                    label = key;
                    break;
                case LanguageType.EN:
                    label = this.getLanguageData(key).en;
                    break;
                case LanguageType.RU:
                    label = this.getLanguageData(key).ru;
                    break;
                case LanguageType.ZH_CN:
                    label = key;
                    break;
                case LanguageType.FR:
                    label = this.getLanguageData(key).fr;
                    break;
                case LanguageType.DE:
                    label = this.getLanguageData(key).de;
                    break;
                case LanguageType.AR:
                    label = this.getLanguageData(key).ar;
                    break;
                case LanguageType.ES:
                    label = this.getLanguageData(key).es;
                    break;
                case LanguageType.HI:
                    label = this.getLanguageData(key).hi;
                    break;
                default:
                    label = this.getLanguageData(key).en;
                    break;
            }
            if (repaceStr.length > 0) {
                label = label.replace("{0}", repaceStr);
            }
            return label;
        }
        getLanguageData(key) {
            for (let index = 0; index < this.m_data.length; index++) {
                const item = this.m_data[index];
                if (item.key == key) {
                    return item;
                }
            }
            return null;
        }
    }

    class ShopViewController extends ViewControllerGeneric {
        get URL() {
            return UI_ShopView.URL;
        }
        init() {
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        unbind() {
            this.view.m_List.off(fairygui.Events.CLICK_ITEM, this, this.onItemClick);
            PlatformAdManager.inst.destroyBanner();
            PlatformAdManager.inst.showBanner();
        }
        bind() {
            this.view.m_BackBtn.onClick(this, this.onBackBtnClick);
            this.view.m_BuyBtn.onClick(this, this.onBuyBtnClick);
            this.view.m_FreeGetBtn.onClick(this, this.onFreeGetBtnClick);
            this.view.m_UseBtn.onClick(this, this.onUseBtnClick);
            this.view.m_adState.selectedIndex = PlatformConfig.inst.currentPlatform.canAd ? 1 : 0;
            this.view.m_List.itemRenderer = Laya.Handler.create(this, this.onItemRenderer, null, false);
            this.view.m_List.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick);
            this.view.m_List.numItems = DataManager.inst.carConfigs.length;
            this.view.m_List.selectedIndex = DataManager.inst.getCarIndex(DataManager.inst.user.currentCarId);
            this.selectCar(this.view.m_List.selectedIndex);
            this.updateUserInfo();
            PlatformAdManager.inst.showBanner();
        }
        onUseBtnClick() {
            let index = this.view.m_List.selectedIndex;
            let data = DataManager.inst.carConfigs[index];
            let oldId = DataManager.inst.user.currentCarId;
            let oldIndex = DataManager.inst.getCarIndex(oldId);
            DataManager.inst.useCar(data._id);
            UIManager.inst.showToast(MultiLanguageManager.inst.getLanguage("使用" + data.name));
            this.selectCar(oldIndex);
            TruckGameManager.instance().nowCarIndex = index;
            TruckGameManager.instance().changeCar(index);
            this.selectCar(index);
        }
        onFreeGetBtnClick() {
            PlatformAdManager.inst.showRewardedVideo((s) => {
                if (s) {
                    this.buyCar();
                }
            });
        }
        buyCar() {
            let index = this.view.m_List.selectedIndex;
            let data = DataManager.inst.carConfigs[index];
            DataManager.inst.buyCar(data._id);
            this.selectCar(index);
            SoundManager.inst.Play(SoundType.SE_BuyItem);
        }
        onBuyBtnClick() {
            let index = this.view.m_List.selectedIndex;
            let data = DataManager.inst.carConfigs[index];
            if (DataManager.inst.user.coins >= data.cost) {
                this.buyCar();
            }
            else {
                UIManager.inst.showToast(MultiLanguageManager.inst.getLanguage("金币不足"));
            }
        }
        selectCar(index) {
            let data = DataManager.inst.carConfigs[index];
            this.view.m_UseBtn.visible = false;
            this.view.m_BuyBtn.visible = true;
            this.view.m_ImageLoader.url = ResourcesManager.inst.getImageThumb(data.icon);
            this.view.m_FreeGetBtn.visible = PlatformConfig.inst.currentPlatform.canAd;
            let ui = this.view.m_List.getChildAt(index);
            ui.m_state.selectedIndex = 2;
            if (DataManager.inst.isUnlockCar(data._id)) {
                this.view.m_BuyBtn.visible = false;
                this.view.m_FreeGetBtn.visible = false;
                if (data._id != DataManager.inst.user.currentCarId) {
                    this.view.m_UseBtn.visible = true;
                }
                ui.m_state.selectedIndex = 1;
            }
            if (data._id == DataManager.inst.user.currentCarId) {
                ui.m_state.selectedIndex = 0;
            }
        }
        onItemClick(ui) {
            let index = this.view.m_List.selectedIndex;
            this.selectCar(index);
        }
        onItemRenderer(index, ui) {
            let data = DataManager.inst.carConfigs[index];
            ui.icon = ResourcesManager.inst.getImageThumb(data.icon);
            ui.m_CoinLabel.text = data.cost.toString();
            ui.m_NameLabel.text = data.name;
            ui.m_state.selectedIndex = 2;
            if (DataManager.inst.isUnlockCar(data._id)) {
                ui.m_state.selectedIndex = 1;
            }
            if (data._id == DataManager.inst.user.currentCarId) {
                ui.m_state.selectedIndex = 0;
            }
        }
        updateUserInfo() {
            this.view.m_CoinBar.title = DataManager.inst.user.coins.toString();
        }
        onBackBtnClick() {
            this.removeSelf();
        }
    }

    class StartViewController extends ViewControllerGeneric {
        get URL() {
            return UI_StartView.URL;
        }
        init() {
            this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
            this.onViewAdded = Laya.Handler.create(this, this.bind);
            super.init();
        }
        unbind() {
            this.view.m_Bot.displayObject.off(Laya.Event.MOUSE_DOWN, this, this.onTouchStart);
            this.view.m_Bot.displayObject.off(Laya.Event.MOUSE_UP, this, this.onRelease);
            CustomEventDispatcher.instance.off("gameUI", this, this.showPage);
        }
        bind() {
            EventManager.inst.AddEventListener(GameEvents.ON_UPDATE_USERINFO_EVENT, this, this.updateUserInfo);
            EventManager.inst.AddEventListener(PlatformEvents.ON_BANNER_SUCCESS_EVENT, this, this.onBannerSuccess);
            EventManager.inst.AddEventListener(PlatformEvents.ON_BANNER_FAIL_EVENT, this, this.onBannerFail);
            this.view.m_Bot.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.onTouchStart);
            this.view.m_Bot.displayObject.on(Laya.Event.MOUSE_UP, this, this.onRelease);
            CustomEventDispatcher.instance.on("gameUI", this, this.showPage);
            this.view.m_ShopBtn.onClick(this, this.onShopBtnClick);
            this.updateUserInfo();
            PlatformAdManager.inst.showBanner();
        }
        onBannerSuccess() {
        }
        onBannerFail() {
        }
        onShopBtnClick() {
            UIManager.inst.showPopupView(new ShopViewController());
        }
        updateUserInfo() {
            this.view.m_StageLabel.text = `第${DataManager.inst.user.currentStage + 1}关`;
            this.view.m_CoinBar.title = DataManager.inst.user.coins.toString();
        }
        onRelease() {
            if (TruckGameManager.instance().carScript) {
                TruckGameManager.instance().carScript.pause = true;
            }
        }
        onTouchStart() {
            TruckGameManager.instance().OnSpeedDownEnter();
            if (this.view.m_gameState.selectedIndex == 0) {
                PlatformAdManager.inst.destroyBanner();
            }
            this.view.m_gameState.selectedIndex = 1;
        }
        showPage() {
            this.view.m_gameState.selectedIndex = 0;
        }
    }

    class GameManager {
        static get inst() {
            if (this._inst == null) {
                this._inst = new GameManager();
            }
            return this._inst;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                Laya.Shader3D.debugMode = false;
                GameEngine.inst.isLocal = true;
                GameEngine.inst.useZipAssets = false;
                GameEngine.inst.platform = Platform.web_h5;
                Platforms.inst.init();
                if (GameEngine.inst.useZipAssets) {
                    yield ResourcesManager.inst.readHashFile();
                    let url = "";
                    yield ResourcesManager.inst.loadFiles(url);
                    ResourcesManager.inst.fileConfigs = Laya.loader.getRes(url);
                }
                yield GameEngine.inst.init();
                this.initConfigs();
            });
        }
        initConfigs() {
            return __awaiter(this, void 0, void 0, function* () {
                this.addSounds();
                let urls = [];
                urls.push({ url: "res/ui/GameCommandUI.bin", type: Laya.Loader.BUFFER });
                urls.push({ url: "res/ui/GameCommandUI_atlas0.png", type: Laya.Loader.IMAGE });
                urls.push({ url: "res/ui/GameAdUI.bin", type: Laya.Loader.BUFFER });
                urls.push({ url: "res/ui/GameAdUI_atlas0.png", type: Laya.Loader.IMAGE });
                urls.push({ url: "res/ui/GameUI.bin", type: Laya.Loader.BUFFER });
                urls.push({ url: "res/ui/GameUI_atlas0.png", type: Laya.Loader.IMAGE });
                urls.push({ url: "res/data/configs.json", type: Laya.Loader.JSON });
                urls.push({ url: "res/data/shader.json", type: Laya.Loader.JSON });
                ResourcesManager.inst.registerGameUIInfo("res/ui/GameUI", urls);
                let urls2 = [];
                urls2.push("sub1/res/LayaScene_map0/Conventional/map0.ls");
                urls2.push("sub1/res/cars/Cars.lh");
                urls2.push("sub1/res/LayaScene_cargos/Conventional/cargos.lh");
                ResourcesManager.inst.registerModels(urls2);
                GameEngine.inst.initAsync(() => {
                    GameEngine.inst.debug("初始化游戏");
                    LocalStorageManager.inst.enterGame();
                    TimeManager.inst.init();
                    UIManager.inst.addFadeView();
                    Laya.timer.once(200, this, () => { SoundManager.inst.PlayMusic(SoundType.BGM); });
                    Laya.timer.once(1000, this, () => {
                        UIManager.inst.doFadeIn(Laya.Handler.create(this, () => {
                            UIManager.inst.hidePopupView(UI_LoadingView.URL);
                            Laya.loader.clearRes("localRes/ui/GameLoadingUI_atlas_nqsz4g.jpg");
                            if (Platforms.inst.platform == Platform.weixin_h5) {
                                YMSDK.inst.showStartIconListView((success) => {
                                    if (success) {
                                        this.showStartView();
                                    }
                                });
                            }
                            else {
                                this.showStartView();
                            }
                        }));
                    });
                });
            });
        }
        showStartView() {
            UIManager.inst.showPopupView(new StartViewController());
            TruckGameManager.instance().loadLevel();
        }
        compileShader() {
            let data = Laya.loader.getRes("res/data/shader.json");
            for (let index = 0; index < data.length; index++) {
                const obj = data[index];
                Laya.Shader3D.compileShaderByDefineNames(obj.shaderName, obj.passIndex, obj.subShaderIndex, obj.defineNames);
            }
        }
        addSounds() {
            let soundExtendtion = Laya.Browser.window.conch ? ".ogg" : ".mp3";
            SoundManager.inst.registerSound(SoundType.BGM, "res/sounds/bgm.mp3");
            SoundManager.inst.registerSound(SoundType.SE_BuyItem, "res/sounds/buyButtonSE.ogg");
            SoundManager.inst.registerSound(SoundType.SE_Win, "res/sounds/win.ogg");
            SoundManager.inst.registerSound(SoundType.SE_Lose, "res/sounds/fail.ogg");
        }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            GameManager.inst.init();
        }
    }
    new Main();

}());
