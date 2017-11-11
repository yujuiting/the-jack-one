webpackJsonp([4],{

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(40);
var Sound_1 = __webpack_require__(65);
var runtime_1 = __webpack_require__(9);
var AudioPlayerComponent_1 = __webpack_require__(56);
var sound = new Sound_1.Sound('./assets/nyan.wav');
var audioPlayer = window.audioPlayer = runtime_1.instantiate(AudioPlayerComponent_1.AudioPlayerComponent);
audioPlayer.source = sound;
audioPlayer.volume = 0.1;
audioPlayer.playbackRate = 1;
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, sound.load()];
            case 1:
                _a.sent();
                audioPlayer.play();
                return [2];
        }
    });
}); })();


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Inject_1 = __webpack_require__(0);
var BrowserDelegate_1 = __webpack_require__(2);
var Component_1 = __webpack_require__(13);
var GameObject_1 = __webpack_require__(3);
var Type_1 = __webpack_require__(8);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var AudioPlayerComponent = (function (_super) {
    __extends(AudioPlayerComponent, _super);
    function AudioPlayerComponent(host, browser) {
        var _this = _super.call(this, host) || this;
        _this.browser = browser;
        _this._volume = 1;
        _this._loop = false;
        _this._isPaused = false;
        _this._isPlaying = false;
        _this._lastCalculatedAt = 0;
        _this._elapsedTime = 0;
        _this._playbackRate = 1;
        return _this;
    }
    Object.defineProperty(AudioPlayerComponent.prototype, "isPaused", {
        get: function () { return this._isPaused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlayerComponent.prototype, "isPlaying", {
        get: function () { return this._isPlaying; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlayerComponent.prototype, "playbackRate", {
        get: function () { return this._playbackRate; },
        set: function (value) { this.setPlaybackRate(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlayerComponent.prototype, "volume", {
        get: function () { return this._volume; },
        set: function (value) { this.setVolume(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlayerComponent.prototype, "loop", {
        get: function () { return this._loop; },
        set: function (value) { this.setLoop(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlayerComponent.prototype, "source", {
        get: function () { return this._source; },
        set: function (value) {
            this._source = value;
        },
        enumerable: true,
        configurable: true
    });
    AudioPlayerComponent.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (!this._source) {
            return;
        }
        this.createBufferSource(this._source.context, this._source.data);
    };
    AudioPlayerComponent.prototype.resume = function () {
        if (!this._source || !this._source.isLoaded) {
            return;
        }
        if (!this._isPaused) {
            return;
        }
        this.createBufferSource(this._source.context, this._source.data);
        this.bufferSource.start(0, this._elapsedTime & this._source.duration);
        this._isPaused = false;
        this._isPlaying = true;
    };
    AudioPlayerComponent.prototype.pause = function () {
        if (!this._isPlaying) {
            return;
        }
        this.calculatePlayedTime();
        this._isPaused = true;
        this.bufferSource.stop(0);
    };
    AudioPlayerComponent.prototype.play = function () {
        if (!this._source || !this._source.isLoaded) {
            return;
        }
        if (this._isPaused) {
            this.resume();
            return;
        }
        if (this._isPlaying) {
            return;
        }
        this.createBufferSource(this._source.context, this._source.data);
        this.bufferSource.start(0);
        this._isPaused = false;
        this._isPlaying = true;
        this._lastCalculatedAt = Date.now();
    };
    AudioPlayerComponent.prototype.stop = function () {
        if (!this._isPlaying) {
            return;
        }
        this._elapsedTime = 0;
        this._isPaused = false;
        this.bufferSource.stop(0);
    };
    AudioPlayerComponent.prototype.setPlaybackRate = function (value) {
        this._playbackRate = value;
        if (this.bufferSource) {
            this.bufferSource.playbackRate.value = value;
        }
    };
    AudioPlayerComponent.prototype.setVolume = function (value) {
        this._volume = value;
        if (this.gainNode) {
            this.gainNode.gain.value = value;
        }
    };
    AudioPlayerComponent.prototype.setLoop = function (value) {
        this._loop = value;
        if (this.bufferSource) {
            this.bufferSource.loop = value;
        }
    };
    AudioPlayerComponent.prototype.calculatePlayedTime = function () {
        var now = Date.now();
        this._elapsedTime += (now - this._lastCalculatedAt) / this._playbackRate * 0.001;
        this._lastCalculatedAt = now;
    };
    AudioPlayerComponent.prototype.createBufferSource = function (ctx, buffer) {
        var _this = this;
        if (!this.gainNode) {
            this.gainNode = ctx.createGain();
            this.gainNode.connect(ctx.destination);
        }
        this.gainNode.gain.value = this._volume;
        if (this.bufferSource) {
            this.bufferSource.stop();
        }
        this.bufferSource = ctx.createBufferSource();
        this.bufferSource.connect(this.gainNode);
        this.bufferSource.buffer = buffer;
        this.bufferSource.loop = this._loop;
        this.bufferSource.playbackRate.value = this._playbackRate;
        this.bufferSource.onended = function (e) { return _this.onBufferSourceEnd(e); };
    };
    AudioPlayerComponent.prototype.onBufferSourceEnd = function (e) {
        this._isPlaying = false;
    };
    AudioPlayerComponent = __decorate([
        __param(1, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [GameObject_1.GameObject, Object])
    ], AudioPlayerComponent);
    return AudioPlayerComponent;
}(Component_1.Component));
exports.AudioPlayerComponent = AudioPlayerComponent;


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(15);
var Inject_1 = __webpack_require__(0);
var BrowserDelegate_1 = __webpack_require__(2);
var Sound = (function (_super) {
    __extends(Sound, _super);
    function Sound(path) {
        var _this = _super.call(this, path) || this;
        _this._duration = 0;
        _this.context = _this.browser.getAudioContext();
        _this._responseType = 'arraybuffer';
        return _this;
    }
    Object.defineProperty(Sound.prototype, "duration", {
        get: function () { return this._duration; },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.processData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        if (!_this.context) {
                            reject(new Error('Fail to create audio context'));
                            return;
                        }
                        _this.context.decodeAudioData(data, function (audioBuffer) {
                            _this._duration = audioBuffer.duration;
                            resolve(audioBuffer);
                        }, reject);
                    })];
            });
        });
    };
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Sound.prototype, "browser", void 0);
    return Sound;
}(Resource_1.Resource));
exports.Sound = Sound;


/***/ })

},[123]);
//# sourceMappingURL=test.bundle.js.map