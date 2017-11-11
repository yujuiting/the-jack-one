webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(1);
var Rect = (function () {
    function Rect(position, width, height) {
        if (position === void 0) { position = new Vector_1.Vector(); }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.position = position;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "center", {
        get: function () {
            return new Vector_1.Vector(this.position.x + this.width / 2, this.position.y + this.height / 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "xMin", {
        get: function () { return this.position.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "xMax", {
        get: function () { return this.position.x + this.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "yMin", {
        get: function () { return this.position.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "yMax", {
        get: function () { return this.position.y + this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "min", {
        get: function () {
            return new Vector_1.Vector(this.xMin, this.yMin);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "max", {
        get: function () {
            return new Vector_1.Vector(this.xMax, this.yMax);
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.contains = function (point) {
        if (point.x < this.position.x) {
            return false;
        }
        if (point.y < this.position.y) {
            return false;
        }
        if (point.x > this.position.x + this.width) {
            return false;
        }
        if (point.y > this.position.y + this.height) {
            return false;
        }
        return true;
    };
    Rect.prototype.overlap = function (another) {
        if (this.xMax < another.xMin || this.xMin > another.xMax) {
            return false;
        }
        if (this.yMax < another.yMin || this.yMin > another.yMax) {
            return false;
        }
        return true;
    };
    return Rect;
}());
exports.Rect = Rect;


/***/ }),
/* 15 */,
/* 16 */
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
var BrowserDelegate_1 = __webpack_require__(2);
var Inject_1 = __webpack_require__(0);
var Texture = (function (_super) {
    __extends(Texture, _super);
    function Texture(path) {
        var _this = _super.call(this, path) || this;
        _this.isDirty = false;
        _this._width = 0;
        _this._height = 0;
        return _this;
    }
    Object.defineProperty(Texture.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) {
            this._width = value;
            this.markAsDirty();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) {
            this._height = value;
            this.markAsDirty();
        },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isLoaded) {
                    return [2];
                }
                return [2, new Promise(function (resolve) {
                        var request = new Image();
                        request.onprogress = _this.onprogress;
                        request.onerror = _this.onerror;
                        request.onloadstart = _this.onloadstart;
                        request.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, err_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        _a = this;
                                        return [4, this.processData(request)];
                                    case 1:
                                        _a._data = _b.sent();
                                        this._isLoaded = true;
                                        this.onLoad.next();
                                        return [3, 3];
                                    case 2:
                                        err_1 = _b.sent();
                                        this.onerror(err_1);
                                        return [3, 3];
                                    case 3:
                                        resolve();
                                        return [2];
                                }
                            });
                        }); };
                        request.src = _this.path;
                    })];
            });
        });
    };
    Texture.prototype.clone = function () {
        var texture = new Texture(this.path);
        texture.source = this.source;
        texture._width = this._width;
        texture._height = this._height;
        texture._isLoaded = this._isLoaded;
        return texture;
    };
    Texture.prototype.markAsDirty = function () {
        if (this.isDirty) {
            return;
        }
        this.isDirty = true;
        if (!this.isLoaded) {
            return;
        }
        this.processData(this.source);
    };
    Texture.prototype.processData = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var data, ctx;
            return __generator(this, function (_a) {
                data = this.data || this.browser.createCanvas();
                ctx = data.getContext('2d');
                if (this.width === 0 && this.height === 0) {
                    data.width = this._width = image.width;
                    data.height = this._height = image.height;
                }
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this._width, this._height);
                this.isDirty = false;
                this.source = image;
                return [2, data];
            });
        });
    };
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Texture.prototype, "browser", void 0);
    return Texture;
}(Resource_1.Resource));
exports.Texture = Texture;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Texture_1 = __webpack_require__(16);
var Vector_1 = __webpack_require__(1);
var Rect_1 = __webpack_require__(14);
var BrowserDelegate_1 = __webpack_require__(2);
var Inject_1 = __webpack_require__(0);
var Class_1 = __webpack_require__(4);
var Sprite = (function () {
    function Sprite(texture, rect) {
        if (rect === void 0) { rect = new Rect_1.Rect(); }
        this.rect = rect;
        this.pivot = new Vector_1.Vector(0.5, 0.5);
        this.canvas = this.browser.createCanvas();
        this.ctx = this.browser.getContext(this.canvas);
        this.setTexture(texture);
    }
    Object.defineProperty(Sprite.prototype, "texture", {
        get: function () { return this._texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () { return this.rect.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () { return this.rect.height; },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.setTexture = function (texture) {
        var _this = this;
        if (this._texture === texture) {
            return;
        }
        this._texture = texture;
        if (this.textureLoaded) {
            this.textureLoaded.unsubscribe();
        }
        if (texture.isLoaded) {
            this.drawTexture();
        }
        else {
            this.textureLoaded = texture.onLoad$.subscribe(function () { return _this.drawTexture(); });
        }
    };
    Sprite.prototype.drawTexture = function () {
        if (this.rect.width === 0 && this.rect.height === 0) {
            this.rect.width = this._texture.width;
            this.rect.height = this._texture.height;
        }
        this.canvas.width = this.rect.width;
        this.canvas.height = this.rect.height;
        if (this.textureLoaded) {
            this.textureLoaded.unsubscribe();
            delete this.textureLoaded;
        }
        this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
        this.ctx.drawImage(this._texture.data, this.rect.position.x, this.rect.position.y, this.rect.width, this.rect.height, 0, 0, this.rect.width, this.rect.height);
    };
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Sprite.prototype, "browser", void 0);
    Sprite = __decorate([
        Class_1.Class(),
        __metadata("design:paramtypes", [Texture_1.Texture,
            Rect_1.Rect])
    ], Sprite);
    return Sprite;
}());
exports.Sprite = Sprite;


/***/ }),
/* 18 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var RendererComponent_1 = __webpack_require__(21);
var UniqueComponent_1 = __webpack_require__(19);
var SpriteRendererComponent = (function (_super) {
    __extends(SpriteRendererComponent, _super);
    function SpriteRendererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDirty = false;
        return _this;
    }
    Object.defineProperty(SpriteRendererComponent.prototype, "sprite", {
        get: function () { return this._sprite; },
        set: function (value) {
            this._isDirty = true;
            this._sprite = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteRendererComponent.prototype, "isDirty", {
        get: function () { return this._isDirty; },
        enumerable: true,
        configurable: true
    });
    SpriteRendererComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._sprite) {
            var _a = this._sprite, width = _a.width, height = _a.height;
            this.canvas.width = width;
            this.canvas.height = height;
        }
    };
    SpriteRendererComponent.prototype.render = function () {
        if (!this._sprite) {
            return;
        }
        var ctx = this.ctx;
        var _a = this.canvas, width = _a.width, height = _a.height;
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.drawImage(this._sprite.canvas, 0, 0);
        ctx.restore();
    };
    SpriteRendererComponent = __decorate([
        UniqueComponent_1.UniqueComponent()
    ], SpriteRendererComponent);
    return SpriteRendererComponent;
}(RendererComponent_1.RendererComponent));
exports.SpriteRendererComponent = SpriteRendererComponent;


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
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
var GameObject_1 = __webpack_require__(3);
var Component_1 = __webpack_require__(13);
var TransformComponent_1 = __webpack_require__(23);
var Vector_1 = __webpack_require__(1);
var Engine_1 = __webpack_require__(36);
var Time_1 = __webpack_require__(12);
var ForceMode_1 = __webpack_require__(38);
var UniqueComponent_1 = __webpack_require__(19);
var RequireComponent_1 = __webpack_require__(47);
var Inject_1 = __webpack_require__(0);
var DoublePI = Math.PI * 2;
var RigidbodyComponent = (function (_super) {
    __extends(RigidbodyComponent, _super);
    function RigidbodyComponent(host, engine, time) {
        var _this = _super.call(this, host) || this;
        _this.engine = engine;
        _this.time = time;
        _this.angularDrag = 0;
        _this.angularVelocity = 0;
        _this.drag = 0;
        _this.freezeRotation = false;
        _this._mass = 1;
        _this.inverseMass = 1;
        _this._moi = 1000;
        _this.inverseMoi = 0.001;
        _this.maxAngularVelocity = Infinity;
        _this.velocity = Vector_1.Vector.Get();
        _this.useGravity = false;
        _this.isSleeping = false;
        _this.sleepThreshold = 1;
        _this.motion = 0;
        _this.forces = [
            Vector_1.Vector.Get(),
            Vector_1.Vector.Get(),
            Vector_1.Vector.Get(),
            Vector_1.Vector.Get()
        ];
        _this.torques = [0, 0, 0, 0];
        _this.sleepTimer = 0;
        _this.lastPosition = Vector_1.Vector.Get();
        return _this;
    }
    Object.defineProperty(RigidbodyComponent.prototype, "mass", {
        get: function () { return this._mass; },
        set: function (value) { this._mass = value; this.inverseMass = 1 / value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RigidbodyComponent.prototype, "moi", {
        get: function () { return this._moi; },
        set: function (value) { this._moi = value; this.inverseMoi = 1 / value; },
        enumerable: true,
        configurable: true
    });
    RigidbodyComponent.prototype.start = function () {
        _super.prototype.start.call(this);
        this.transform = this.getComponent(TransformComponent_1.TransformComponent);
    };
    RigidbodyComponent.prototype.addForce = function (force, forceMode) {
        if (forceMode === void 0) { forceMode = ForceMode_1.ForceMode.Force; }
        this.forces[forceMode].add(force);
    };
    RigidbodyComponent.prototype.addTorque = function (torque, forceMode) {
        if (forceMode === void 0) { forceMode = ForceMode_1.ForceMode.Force; }
        this.torques[forceMode] += torque;
    };
    RigidbodyComponent.prototype.clearForce = function () {
        this.forces.forEach(function (force) { return force.reset(); });
    };
    RigidbodyComponent.prototype.clearTorque = function () {
        for (var i = 0; i < this.torques.length; i++) {
            this.torques[i] = 0;
        }
    };
    RigidbodyComponent.prototype.sleep = function () {
        this.isSleeping = true;
        this.velocity.reset();
        this.angularVelocity = 0;
        this.clearForce();
        this.clearTorque();
    };
    RigidbodyComponent.prototype.awake = function () {
        this.isSleeping = false;
        this.sleepTimer = 0;
    };
    RigidbodyComponent.prototype.fixedUpdate = function () {
        _super.prototype.fixedUpdate.call(this);
        var deltaTimeInSecond = this.time.fixedDeltaTimeInSecond;
        if (this.useGravity && !this.isSleeping) {
            this.addForce(this.engine.gravity, ForceMode_1.ForceMode.Acceleration);
        }
        this.forces[ForceMode_1.ForceMode.Force].multiply(deltaTimeInSecond * this.inverseMass);
        this.velocity.add(this.forces[ForceMode_1.ForceMode.Force]);
        this.forces[ForceMode_1.ForceMode.Force].reset();
        this.forces[ForceMode_1.ForceMode.Acceleration].multiply(deltaTimeInSecond);
        this.velocity.add(this.forces[ForceMode_1.ForceMode.Acceleration]);
        this.forces[ForceMode_1.ForceMode.Acceleration].reset();
        this.forces[ForceMode_1.ForceMode.Impulse].multiply(1 * this.inverseMass);
        this.velocity.add(this.forces[ForceMode_1.ForceMode.Impulse]);
        this.forces[ForceMode_1.ForceMode.Impulse].reset();
        this.velocity.add(this.forces[ForceMode_1.ForceMode.VelocityChange]);
        this.forces[ForceMode_1.ForceMode.VelocityChange].reset();
        this.torques[ForceMode_1.ForceMode.Force] *= this.inverseMoi * deltaTimeInSecond;
        this.angularVelocity += this.torques[ForceMode_1.ForceMode.Force];
        this.torques[ForceMode_1.ForceMode.Force] = 0;
        this.torques[ForceMode_1.ForceMode.Acceleration] *= deltaTimeInSecond;
        this.angularVelocity += this.torques[ForceMode_1.ForceMode.Acceleration];
        this.torques[ForceMode_1.ForceMode.Acceleration] = 0;
        this.torques[ForceMode_1.ForceMode.Impulse] *= this.inverseMoi;
        this.angularVelocity += this.torques[ForceMode_1.ForceMode.Impulse];
        this.torques[ForceMode_1.ForceMode.Impulse] = 0;
        this.angularVelocity += this.torques[ForceMode_1.ForceMode.VelocityChange];
        this.torques[ForceMode_1.ForceMode.VelocityChange] = 0;
        this.checkSleep(deltaTimeInSecond);
        if (!this.velocity.isZero) {
            this.velocity.multiply(Math.max(0, 1 - this.drag * deltaTimeInSecond));
            var velocity = this.velocity.clone().multiply(deltaTimeInSecond);
            this.transform.position.add(velocity);
            velocity.destroy();
        }
        if (this.freezeRotation) {
            this.angularVelocity = 0;
        }
        else {
            if (Math.abs(this.angularVelocity) > 1e-6) {
                this.angularVelocity *= Math.max(0, 1 - this.angularDrag * deltaTimeInSecond);
                if (this.angularVelocity > this.maxAngularVelocity) {
                    this.angularVelocity = this.maxAngularVelocity;
                }
                this.transform.rotation += this.angularVelocity * deltaTimeInSecond;
                this.transform.rotation = this.transform.rotation % DoublePI;
            }
        }
        this.motion = (this.velocity.squareMagnitude() + Math.pow(this.angularVelocity, 2)) * 0.5;
        this.lastPosition.copy(this.transform.position);
    };
    RigidbodyComponent.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.angularDrag = 0;
        this.angularVelocity = 0;
        this.drag = 0;
        this.freezeRotation = false;
        this.mass = 1;
        this.maxAngularVelocity = Infinity;
        this.velocity = Vector_1.Vector.Get();
        this.useGravity = false;
        this.mass = 1;
        this.moi = 1000;
        this.isSleeping = false;
        this.sleepThreshold = 1;
        this.sleepTimer = 0;
        this.forces = [
            Vector_1.Vector.Get(),
            Vector_1.Vector.Get(),
            Vector_1.Vector.Get(),
            Vector_1.Vector.Get()
        ];
        this.torques = [0, 0, 0, 0];
        this.lastPosition = Vector_1.Vector.Get();
    };
    RigidbodyComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.velocity.destroy();
        this.forces.forEach(function (force) { return force.destroy(); });
        Vector_1.Vector.Put(this.velocity);
        Vector_1.Vector.Put(this.lastPosition);
        this.forces.forEach(function (force) { return Vector_1.Vector.Put(force); });
    };
    RigidbodyComponent.prototype.checkSleep = function (deltaTimeInSecond) {
        if (!this.isSleeping && this.sleepThreshold >= 0) {
            if (this.motion < this.sleepThreshold) {
                this.sleepTimer += deltaTimeInSecond;
                if (this.sleepTimer > 0.5) {
                    this.sleepTimer = 0;
                    this.sleep();
                }
            }
            else {
                this.sleepTimer = 0;
            }
        }
        else {
            if (this.motion >= this.sleepThreshold) {
                this.awake();
            }
        }
        if (!this.transform.position.equalTo(this.lastPosition, 1)) {
            this.awake();
        }
    };
    RigidbodyComponent = __decorate([
        UniqueComponent_1.UniqueComponent(),
        RequireComponent_1.RequireComponent([TransformComponent_1.TransformComponent]),
        __param(1, Inject_1.Inject(Engine_1.Engine)),
        __param(2, Inject_1.Inject(Time_1.Time)),
        __metadata("design:paramtypes", [GameObject_1.GameObject, Object, Object])
    ], RigidbodyComponent);
    return RigidbodyComponent;
}(Component_1.Component));
exports.RigidbodyComponent = RigidbodyComponent;


/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
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
var ArrayUtility_1 = __webpack_require__(10);
var Bundle = (function (_super) {
    __extends(Bundle, _super);
    function Bundle(bundleName, resources) {
        if (resources === void 0) { resources = []; }
        var _this = _super.call(this, bundleName) || this;
        _this.resources = resources;
        return _this;
    }
    Bundle.prototype.add = function (resource) {
        if (ArrayUtility_1.addToArray(this.resources, resource)) {
            this._isLoaded = false;
        }
        resource.onProgress$.subscribe(this.onProgress);
    };
    Bundle.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isLoaded) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, Promise.all(this.resources.map(function (resource) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2, resource.load()];
                            }); }); }))];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.onError.next(err_1);
                        return [3, 4];
                    case 4:
                        this._isLoaded = true;
                        this.onLoad.next();
                        return [2];
                }
            });
        });
    };
    Bundle.prototype.destroy = function () {
        this.resources.forEach(function (resource) { return resource.destroy(); });
    };
    return Bundle;
}(Resource_1.Resource));
exports.Bundle = Bundle;


/***/ }),
/* 27 */
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
var GameObject_1 = __webpack_require__(3);
var Screen_1 = __webpack_require__(11);
var GameObjectInitializer_1 = __webpack_require__(20);
var Color_1 = __webpack_require__(6);
var Bounds_1 = __webpack_require__(25);
var Rect_1 = __webpack_require__(14);
var Matrix_1 = __webpack_require__(43);
var Type_1 = __webpack_require__(8);
var BrowserDelegate_1 = __webpack_require__(2);
var Service_1 = __webpack_require__(5);
var Inject_1 = __webpack_require__(0);
exports.MainCamera = Symbol('MainCamera');
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(browser, screen, gameObjectInitializer) {
        var _this = _super.call(this, gameObjectInitializer) || this;
        _this.aspect = 16 / 9;
        _this.backgroundColor = Color_1.Color.Black;
        _this.toWorldMatrix = new Matrix_1.Matrix();
        _this.toScreenMatrix = new Matrix_1.Matrix();
        _this.cullingMask = Type_1.AllBuiltInLayer;
        _this.eventMask = Type_1.AllBuiltInLayer;
        _this.rect = new Rect_1.Rect();
        _this.bounds = new Bounds_1.Bounds();
        _this.setSize(screen.width, screen.height);
        return _this;
    }
    Camera.prototype.setSize = function (width, height) {
        this.toScreenMatrix.reset();
        this.rect.width = width;
        this.rect.height = height;
        var halfWidth = width * 0.5;
        var halfHeight = height * 0.5;
        this.toScreenMatrix.translate(halfWidth, halfHeight);
        this.toScreenMatrix.scale(0, -1);
        this.bounds.extents.setTo(halfWidth, halfHeight);
    };
    Camera.prototype.update = function () {
        _super.prototype.update.call(this);
        this.toScreenMatrix.save();
        this.toScreenMatrix.translate(-this.transform.position.x, -this.transform.position.y);
        this.toScreenMatrix.rotate(this.transform.rotation);
        this.toScreenMatrix.scale(this.transform.scale);
        this.toWorldMatrix.invertFrom(this.toScreenMatrix);
        this.bounds.center.copy(this.transform.position);
    };
    Camera.prototype.postRender = function () {
        _super.prototype.postRender.call(this);
        this.toScreenMatrix.restore();
    };
    Camera.prototype.screenToWorld = function (point) {
        var result = point.clone();
        this.toWorldMatrix.multiplyToPoint(result);
        return result;
    };
    Camera.prototype.worldToScreen = function (point) {
        var result = point.clone();
        this.toScreenMatrix.multiplyToPoint(result);
        return result;
    };
    Camera = __decorate([
        Service_1.Service(exports.MainCamera),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __param(1, Inject_1.Inject(Screen_1.Screen)),
        __param(2, Inject_1.Inject(GameObjectInitializer_1.GameObjectInitializer)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], Camera);
    return Camera;
}(GameObject_1.GameObject));
exports.Camera = Camera;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Texture_1 = __webpack_require__(16);
var Font_1 = __webpack_require__(136);
var Sound_1 = __webpack_require__(65);
var Bundle_1 = __webpack_require__(26);
exports.texture_bird = new Texture_1.Texture('./assets/flappy-bird/bird.png');
exports.texture_pipe = new Texture_1.Texture('./assets/flappy-bird/pipe.png');
exports.texture_sky = new Texture_1.Texture('./assets/flappy-bird/background.png');
exports.texture_ground = new Texture_1.Texture('./assets/flappy-bird/ground.png');
exports.font = new Font_1.Font('FlappyBird', 'truetype', './assets/flappy-bird/font.ttf');
exports.texture_splash = new Texture_1.Texture('./assets/flappy-bird/splash.png');
exports.texture_scoreboard = new Texture_1.Texture('./assets/flappy-bird/scoreboard.png');
exports.texture_medal_bronze = new Texture_1.Texture('./assets/flappy-bird/medal_bronze.png');
exports.texture_medal_gold = new Texture_1.Texture('./assets/flappy-bird/medal_gold.png');
exports.texture_medal_platinum = new Texture_1.Texture('./assets/flappy-bird/medal_platinum.png');
exports.texture_medal_silver = new Texture_1.Texture('./assets/flappy-bird/medal_silver.png');
exports.sfx_point = new Sound_1.Sound('./assets/flappy-bird/sfx_point.wav');
exports.sfx_wing = new Sound_1.Sound('./assets/flappy-bird/sfx_wing.wav');
exports.sfx_hit = new Sound_1.Sound('./assets/flappy-bird/sfx_hit.wav');
exports.sfx_die = new Sound_1.Sound('./assets/flappy-bird/sfx_die.wav');
exports.bundle = new Bundle_1.Bundle('game resources', [
    exports.texture_bird,
    exports.texture_pipe,
    exports.texture_sky,
    exports.texture_ground,
    exports.font,
    exports.texture_splash,
    exports.texture_scoreboard,
    exports.texture_medal_bronze,
    exports.texture_medal_gold,
    exports.texture_medal_platinum,
    exports.texture_medal_silver,
    exports.sfx_point,
    exports.sfx_wing,
    exports.sfx_hit,
    exports.sfx_die
]);


/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
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
var BaseObject_1 = __webpack_require__(37);
var Tree_1 = __webpack_require__(44);
var Bundle_1 = __webpack_require__(26);
var Camera_1 = __webpack_require__(27);
var ArrayUtility_1 = __webpack_require__(10);
var Inject_1 = __webpack_require__(0);
var Class_1 = __webpack_require__(4);
var BroadPhaseCollisionResolver_1 = __webpack_require__(32);
var NarrowPhaseCollisionResolver_1 = __webpack_require__(48);
var Vector_1 = __webpack_require__(1);
var GameObjectInitializer_1 = __webpack_require__(20);
var RenderProcess_1 = __webpack_require__(46);
var runtime_1 = __webpack_require__(9);
var Logger_1 = __webpack_require__(30);
var Screen_1 = __webpack_require__(11);
var BrowserDelegate_1 = __webpack_require__(2);
var Time_1 = __webpack_require__(12);
var Color_1 = __webpack_require__(6);
var PointerInput_1 = __webpack_require__(24);
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(broadPhaseCollisionResolver, narrowPhaseCollisionResolver, gameObjectInitializer, renderProcess, mainCamera, logger, screen, browser, time, pointInput) {
        var _this = _super.call(this) || this;
        _this.broadPhaseCollisionResolver = broadPhaseCollisionResolver;
        _this.narrowPhaseCollisionResolver = narrowPhaseCollisionResolver;
        _this.gameObjectInitializer = gameObjectInitializer;
        _this.renderProcess = renderProcess;
        _this.mainCamera = mainCamera;
        _this.logger = logger;
        _this.screen = screen;
        _this.browser = browser;
        _this.time = time;
        _this.pointInput = pointInput;
        return _this;
    }
    Object.defineProperty(Scene.prototype, "isLoaded", {
        get: function () { return this._resources.isLoaded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "resources", {
        get: function () { return this._resources; },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._resources = new Bundle_1.Bundle('default');
        this.gameObjects = new Tree_1.Tree(null);
        this.cameras = [];
        this.rightTop = Vector_1.Vector.Get();
    };
    Scene.prototype.start = function () {
        var _this = this;
        if (this.hasStarted) {
            return;
        }
        _super.prototype.start.call(this);
        this.add(this.mainCamera);
        this.resizeSubscription = this.browser.resize$.subscribe(function () { return _this.onResize(); });
        this.rightTop.setTo(this.screen.width, 0);
    };
    Scene.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.hasStarted) {
            this.gameObjects.forEachChildren(function (gameObject) { return gameObject.destroy(); });
            this.resizeSubscription.unsubscribe();
        }
        this.gameObjects.clear();
        Vector_1.Vector.Put(this.rightTop);
        delete this.rightTop;
        this._resources.destroy();
    };
    Scene.prototype.add = function (gameObject, at) {
        if (!this.gameObjects.add(gameObject.node)) {
            return false;
        }
        if (!gameObject.hasStarted) {
            gameObject.node.hide();
        }
        if (gameObject instanceof Camera_1.Camera) {
            ArrayUtility_1.addToArray(this.cameras, gameObject);
        }
        if (at) {
            gameObject.transform.position.copy(at);
        }
        return true;
    };
    Scene.prototype.remove = function (gameObject) {
        gameObject.node.show();
        if (!this.gameObjects.remove(gameObject.node)) {
            return false;
        }
        if (gameObject instanceof Camera_1.Camera) {
            ArrayUtility_1.removeFromArray(this.cameras, gameObject);
        }
        return true;
    };
    Scene.prototype.has = function (gameObject) {
        return this.gameObjects.hasChild(gameObject.node);
    };
    Scene.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._resources.load()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scene.prototype.fixedUpdate = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.fixedUpdate(); });
        this.broadPhaseCollisionResolver.fixedUpdate();
        this.narrowPhaseCollisionResolver.resolve(this.broadPhaseCollisionResolver.pairs);
    };
    Scene.prototype.update = function () {
        var _this = this;
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.update(); });
        this.broadPhaseCollisionResolver.update();
        this.narrowPhaseCollisionResolver.resolve(this.broadPhaseCollisionResolver.pairs);
        runtime_1.ifdef(runtime_1.DEBUG, function () { return _this.logger.update(); });
    };
    Scene.prototype.lateUpdate = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.lateUpdate(); });
    };
    Scene.prototype.preRender = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.preRender(); });
        this.gameObjects.sort(function (a, b) { return b.data.layer - a.data.layer; });
    };
    Scene.prototype.render = function (ctx, width, height) {
        var _this = this;
        this.renderProcess.useContext(ctx, width, height);
        this.cameras.forEach(function (camera) { return _this.renderProcess.render(camera, _this.gameObjects); });
        runtime_1.ifdef(runtime_1.DEBUG_PHYSICS, function () { return _this.cameras.forEach(function (camera) { return _this.broadPhaseCollisionResolver.debugRender(ctx, camera); }); });
        runtime_1.ifdef(runtime_1.DEBUG, function () {
            _this.logger.render(ctx);
            _this.debugRender(ctx);
        });
    };
    Scene.prototype.postRender = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.postRender(); });
        this.gameObjectInitializer.resolve();
    };
    Scene.prototype.toString = function () {
        return "Scene(" + this.name + ")";
    };
    Scene.prototype.debugRender = function (ctx) {
        var deltaTime = ((this.time.deltaTime * 100) | 0) * 0.01;
        var fps = ((1000 / deltaTime * 100) | 0) * 0.01;
        ctx.save();
        ctx.fillStyle = Color_1.Color.White.toHexString();
        var deltaTimeText = "deltaTime: " + deltaTime;
        var deltaTimeWidth = ctx.measureText(deltaTimeText).width;
        ctx.fillText(deltaTimeText, this.rightTop.x - deltaTimeWidth, this.rightTop.y + 12);
        var fpsText = "fps: " + fps;
        var fpsWidth = ctx.measureText(fpsText).width;
        ctx.fillText(fpsText, this.rightTop.x - fpsWidth, this.rightTop.y + 30);
        var screenPositionText = "screen: " + this.pointInput.lastPointerPosition.x + ", " + this.pointInput.lastPointerPosition.y;
        var screenPositionWidth = ctx.measureText(screenPositionText).width;
        ctx.fillText(screenPositionText, this.rightTop.x - screenPositionWidth, this.rightTop.y + 48);
        var worldPosition = this.pointInput.lastPointerPosition.clone();
        this.mainCamera.toWorldMatrix.multiplyToPoint(worldPosition);
        var worldPositionText = "world: " + worldPosition.x + ", " + worldPosition.y;
        var worldPositionWidth = ctx.measureText(worldPositionText).width;
        ctx.fillText(worldPositionText, this.rightTop.x - worldPositionWidth, this.rightTop.y + 66);
        ctx.restore();
    };
    Scene.prototype.onResize = function () {
        this.rightTop.setTo(this.screen.width, 0);
    };
    Scene = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(BroadPhaseCollisionResolver_1.BroadPhaseCollisionResolver)),
        __param(1, Inject_1.Inject(NarrowPhaseCollisionResolver_1.NarrowPhaseCollisionResolver)),
        __param(2, Inject_1.Inject(GameObjectInitializer_1.GameObjectInitializer)),
        __param(3, Inject_1.Inject(RenderProcess_1.RenderProcess)),
        __param(4, Inject_1.Inject(Camera_1.MainCamera)),
        __param(5, Inject_1.Inject(Logger_1.Logger)),
        __param(6, Inject_1.Inject(Screen_1.Screen)),
        __param(7, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __param(8, Inject_1.Inject(Time_1.Time)),
        __param(9, Inject_1.Inject(PointerInput_1.PointerInput)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Camera_1.Camera, Object, Object, Object, Object, Object])
    ], Scene);
    return Scene;
}(BaseObject_1.BaseObject));
exports.Scene = Scene;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Projection = (function () {
    function Projection(min, max) {
        this.min = min;
        this.max = max;
        this._canRecycle = false;
    }
    Object.defineProperty(Projection.prototype, "canRecycle", {
        get: function () { return this._canRecycle; },
        enumerable: true,
        configurable: true
    });
    Projection.prototype.overlaps = function (another) {
        return this.max > another.min && this.min < another.max;
    };
    Projection.prototype.getOverlap = function (another) {
        if (!this.overlaps(another)) {
            return 0;
        }
        return this.max > another.max ? another.max - this.min : this.max - another.min;
    };
    Projection.prototype.destroy = function () {
        this._canRecycle = true;
    };
    Projection.prototype.reset = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 0; }
        this.min = min;
        this.max = max;
    };
    Projection.prototype.toString = function () {
        return "Projection (" + this.min + ", " + this.max + ")";
    };
    return Projection;
}());
exports.Projection = Projection;


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var RendererComponent_1 = __webpack_require__(21);
var Color_1 = __webpack_require__(6);
var Class_1 = __webpack_require__(4);
var TextRendererComponent = (function (_super) {
    __extends(TextRendererComponent, _super);
    function TextRendererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = '';
        _this.fillColor = Color_1.Color.White;
        _this.fontSize = 16;
        _this.lineWidth = 1;
        _this.fontFamily = 'Arial';
        _this.fontWeight = 100;
        _this.fontStyle = '';
        _this.fontVariant = '';
        _this.actualWidth = 0;
        return _this;
    }
    TextRendererComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.ctx.font = (this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily).trim();
        if (!this.text) {
            this.text = ' ';
        }
        this.actualWidth = this.ctx.measureText(this.text).width;
        this.canvas.width = Math.ceil(this.actualWidth);
        this.canvas.height = this.fontSize;
    };
    TextRendererComponent.prototype.render = function () {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor.toHexString();
            ctx.fillText(this.text, 0, this.fontSize);
        }
        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor.toHexString();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeText(this.text, 0, this.fontSize);
        }
    };
    TextRendererComponent = __decorate([
        Class_1.Class()
    ], TextRendererComponent);
    return TextRendererComponent;
}(RendererComponent_1.RendererComponent));
exports.TextRendererComponent = TextRendererComponent;


/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Line = (function () {
    function Line(begin, end) {
        this.begin = begin;
        this.end = end;
    }
    Object.defineProperty(Line.prototype, "slope", {
        get: function () {
            return (this.end.y - this.begin.y) / (this.end.x - this.begin.x);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "intercept", {
        get: function () {
            return this.begin.y - this.slope * this.begin.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "length", {
        get: function () {
            return this.begin.distanceTo(this.end);
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.getLength = function () {
        return this.begin.distanceTo(this.end);
    };
    Line.prototype.getDirection = function () {
        return this.end.clone().subtract(this.begin).normalize();
    };
    Line.prototype.resolvePoint = function (point, axis) {
        switch (axis) {
            case 'x':
                point.setTo(point.x, this.slope * point.x + this.intercept);
                break;
            case 'y':
                point.setTo((point.y - this.intercept) / this.slope, point.y);
                break;
            default:
                break;
        }
    };
    Line.prototype.hasPoint = function (point, threshold) {
        if (threshold === void 0) { threshold = 1e-6; }
        var dxc = point.x - this.begin.x;
        var dyc = point.y - this.begin.y;
        var dxl = this.end.x - this.begin.x;
        var dyl = this.end.y - this.begin.y;
        var cross = dxc * dyl - dyc * dxl;
        if (Math.abs(cross) > threshold) {
            return false;
        }
        if (Math.abs(dxl) >= Math.abs(dyl)) {
            return dxl > 0 ?
                this.begin.x <= point.x && point.x <= this.end.x :
                this.end.x <= point.x && point.x <= this.begin.x;
        }
        else {
            return dyl > 0 ?
                this.begin.y <= point.y && point.y <= this.end.y :
                this.end.y <= point.y && point.y <= this.begin.y;
        }
    };
    Line.prototype.toString = function () {
        return "Line (" + this.begin + " -> " + this.end + ")";
    };
    return Line;
}());
exports.Line = Line;


/***/ }),
/* 50 */
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
var GameObject_1 = __webpack_require__(3);
var ColliderComponent_1 = __webpack_require__(51);
var Vector_1 = __webpack_require__(1);
var Line_1 = __webpack_require__(49);
var Ray_1 = __webpack_require__(61);
var Projection_1 = __webpack_require__(34);
var CollisionJumpTable_1 = __webpack_require__(31);
var Inject_1 = __webpack_require__(0);
var CircleColliderComponent_1 = __webpack_require__(52);
var Type_1 = __webpack_require__(8);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var PolygonColliderComponent = (function (_super) {
    __extends(PolygonColliderComponent, _super);
    function PolygonColliderComponent(host, collisionJumpTable) {
        var _this = _super.call(this, host) || this;
        _this.collisionJumpTable = collisionJumpTable;
        _this.points = [];
        _this._calculatedPoints = [];
        _this._calculatedAxes = [];
        _this._calculatedSides = [];
        return _this;
    }
    Object.defineProperty(PolygonColliderComponent.prototype, "calculatedPoints", {
        get: function () { return this._calculatedPoints; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonColliderComponent.prototype, "calculatedAxes", {
        get: function () { return this._calculatedAxes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonColliderComponent.prototype, "calculatedSides", {
        get: function () { return this._calculatedSides; },
        enumerable: true,
        configurable: true
    });
    PolygonColliderComponent.prototype.fixedUpdate = function () {
        _super.prototype.fixedUpdate.call(this);
        this.calculate();
    };
    PolygonColliderComponent.prototype.calculate = function () {
        var _this = this;
        var toWorldMatrix = this.host.transform.toWorldMatrix;
        var count = this.points.length;
        var diff = count - this._calculatedPoints.length;
        if (diff > 0) {
            for (var i = 0; i < diff; i++) {
                this._calculatedPoints.push(new Vector_1.Vector());
                this._calculatedAxes.push(new Vector_1.Vector());
                this._calculatedSides.push(new Line_1.Line(new Vector_1.Vector(), new Vector_1.Vector()));
            }
        }
        else if (diff < 0) {
            this._calculatedPoints.splice(0, -diff);
            this._calculatedAxes.splice(0, -diff);
            this._calculatedSides.splice(0, -diff);
        }
        this._calculatedPoints.forEach(function (point, index) { return point.copy(_this.points[index]); });
        this._calculatedPoints.forEach(function (point) { return toWorldMatrix.multiplyToPoint(point); });
        for (var i = 0; i < count; i++) {
            var p1 = this._calculatedPoints[i];
            var p2 = this._calculatedPoints[(i + 1) % count];
            var axis = this._calculatedAxes[i];
            var side = this._calculatedSides[i];
            axis.copy(p1).subtract(p2);
            side.begin.copy(p1);
            side.end.copy(p2);
        }
        var x = this._calculatedPoints.map(function (p) { return p.x; });
        var y = this._calculatedPoints.map(function (p) { return p.y; });
        var minX = Math.min.apply(Math, x);
        var minY = Math.min.apply(Math, y);
        var maxX = Math.max.apply(Math, x);
        var maxY = Math.max.apply(Math, y);
        this.bounds.center.setTo((maxX + minX) / 2, (maxY + minY) / 2);
        this.bounds.extents.setTo((maxX - minX) / 2, (maxY - minY) / 2);
    };
    PolygonColliderComponent.prototype.collide = function (another) {
        if (another instanceof PolygonColliderComponent) {
            return this.collisionJumpTable.polygonPolygon(this, another);
        }
        else if (another instanceof CircleColliderComponent_1.CircleColliderComponent) {
            return this.collisionJumpTable.circlePolygon(another, this);
        }
    };
    PolygonColliderComponent.prototype.contains = function (point) {
        var ray = new Ray_1.Ray(point, Vector_1.Vector.Right);
        var count = this._calculatedSides.reduce(function (acc, side) { return ray.intersect(side) === -1 ? acc : ++acc; }, 0);
        return count % 2 !== 0;
    };
    PolygonColliderComponent.prototype.rayCast = function (ray) {
        var minDistance = Number.MAX_VALUE;
        var noIntersect = true;
        this._calculatedSides.forEach(function (side) {
            var distance = ray.intersect(side);
            if (distance > 0 && distance < minDistance) {
                minDistance = distance;
                noIntersect = false;
            }
        });
        if (noIntersect) {
            return;
        }
        return ray.getPoint(minDistance);
    };
    PolygonColliderComponent.prototype.project = function (axis) {
        var min = Number.MAX_VALUE;
        var max = -Number.MAX_VALUE;
        this._calculatedPoints.forEach(function (point) {
            var s = point.dot(axis);
            min = Math.min(min, s);
            max = Math.max(max, s);
        });
        return new Projection_1.Projection(min, max);
    };
    PolygonColliderComponent.prototype.getFurthestPoint = function (direction) {
        var max = -Number.MAX_VALUE;
        var pointer = -1;
        this._calculatedPoints.forEach(function (point, index) {
            var dot = point.dot(direction);
            if (dot > max) {
                max = dot;
                pointer = index;
            }
        });
        return this._calculatedPoints[pointer].clone();
    };
    PolygonColliderComponent = __decorate([
        __param(1, Inject_1.Inject(CollisionJumpTable_1.CollisionJumpTable)),
        __metadata("design:paramtypes", [GameObject_1.GameObject, Object])
    ], PolygonColliderComponent);
    return PolygonColliderComponent;
}(ColliderComponent_1.ColliderComponent));
exports.PolygonColliderComponent = PolygonColliderComponent;


/***/ }),
/* 51 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Inject_1 = __webpack_require__(0);
var Bounds_1 = __webpack_require__(25);
var Component_1 = __webpack_require__(13);
var RigidbodyComponent_1 = __webpack_require__(22);
var Vector_1 = __webpack_require__(1);
var Projection_1 = __webpack_require__(34);
var ColliderType_1 = __webpack_require__(64);
var BroadPhaseCollisionResolver_1 = __webpack_require__(32);
var TransformComponent_1 = __webpack_require__(23);
var Subject_1 = __webpack_require__(45);
var ColliderComponent = (function (_super) {
    __extends(ColliderComponent, _super);
    function ColliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bounds = new Bounds_1.Bounds();
        _this.offset = new Vector_1.Vector();
        _this.layer = 1;
        _this.restitution = 0.2;
        _this.friction = 0.99;
        _this.isKinematic = false;
        _this.isTigger = false;
        _this.type = ColliderType_1.ColliderType.Static;
        _this._onCollide$ = new Subject_1.Subject();
        _this._onTirgger$ = new Subject_1.Subject();
        return _this;
    }
    ColliderComponent.prototype.collide = function (another) { return; };
    ColliderComponent.prototype.contains = function (point) { return false; };
    ColliderComponent.prototype.rayCast = function (ray) { return; };
    ColliderComponent.prototype.project = function (axis) { return new Projection_1.Projection(0, 0); };
    ColliderComponent.prototype.getFurthestPoint = function (direction) { return this.bounds.center.clone(); };
    Object.defineProperty(ColliderComponent.prototype, "onCollide$", {
        get: function () { return this._onCollide$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColliderComponent.prototype, "onTrigger$", {
        get: function () { return this._onTirgger$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    ColliderComponent.prototype.start = function () {
        _super.prototype.start.call(this);
        this.rigidbody = this.getComponent(RigidbodyComponent_1.RigidbodyComponent);
        if (this.rigidbody) {
            if (this.isKinematic) {
                this.type = ColliderType_1.ColliderType.Kinematic;
                this.rigidbody.sleepThreshold = -1;
            }
            else {
                this.type = ColliderType_1.ColliderType.Rigidbody;
            }
        }
        this.transform = this.getComponent(TransformComponent_1.TransformComponent);
        this.broadPhaseCollisionResolver.track(this);
    };
    ColliderComponent.prototype.onCollide = function (collisionContact) {
        this._onCollide$.next(collisionContact);
    };
    ColliderComponent.prototype.onTrigger = function (other) {
        this._onTirgger$.next(other);
    };
    ColliderComponent.prototype.reset = function () {
        this._onCollide$ = new Subject_1.Subject();
        this._onTirgger$ = new Subject_1.Subject();
    };
    ColliderComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._onCollide$.complete();
        this._onTirgger$.complete();
    };
    __decorate([
        Inject_1.Inject(BroadPhaseCollisionResolver_1.BroadPhaseCollisionResolver),
        __metadata("design:type", Object)
    ], ColliderComponent.prototype, "broadPhaseCollisionResolver", void 0);
    return ColliderComponent;
}(Component_1.Component));
exports.ColliderComponent = ColliderComponent;


/***/ }),
/* 52 */
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
var GameObject_1 = __webpack_require__(3);
var ColliderComponent_1 = __webpack_require__(51);
var Projection_1 = __webpack_require__(34);
var CollisionJumpTable_1 = __webpack_require__(31);
var Inject_1 = __webpack_require__(0);
var Type_1 = __webpack_require__(8);
var PolygonColliderComponent_1 = __webpack_require__(50);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var CircleColliderComponent = (function (_super) {
    __extends(CircleColliderComponent, _super);
    function CircleColliderComponent(host, collisionJumpTable) {
        var _this = _super.call(this, host) || this;
        _this.collisionJumpTable = collisionJumpTable;
        _this.radius = 0;
        _this.calculatedRadius = 0;
        return _this;
    }
    CircleColliderComponent.prototype.fixedUpdate = function () {
        _super.prototype.fixedUpdate.call(this);
        var scale = (this.transform.scale.x + this.transform.scale.y) * 0.5;
        this.calculatedRadius = this.radius * scale;
        this.bounds.center.copy(this.host.transform.position);
        this.bounds.extents.setTo(this.calculatedRadius, this.calculatedRadius);
    };
    CircleColliderComponent.prototype.collide = function (another) {
        if (another instanceof CircleColliderComponent) {
            return this.collisionJumpTable.circleCircle(this, another);
        }
        else if (another instanceof PolygonColliderComponent_1.PolygonColliderComponent) {
            return this.collisionJumpTable.circlePolygon(this, another);
        }
    };
    CircleColliderComponent.prototype.contains = function (point) {
        return this.bounds.center.distanceTo(point) <= this.calculatedRadius;
    };
    CircleColliderComponent.prototype.rayCast = function (ray) {
        var c = this.bounds.center;
        var r = this.calculatedRadius;
        var o = ray.origin;
        var l = ray.direction;
        var co = o.clone().subtract(c);
        var discriminant = Math.sqrt(Math.pow(l.dot(co), 2) - Math.pow(co.magnitude(), 2) + Math.pow(r, 2));
        if (discriminant < 0) {
            return;
        }
        var d = -l.dot(co);
        if (discriminant > 0) {
            var d1 = d + discriminant;
            var d2 = d - discriminant;
            d = Math.min(d1, d2);
        }
        return ray.getPoint(d);
    };
    CircleColliderComponent.prototype.project = function (axis) {
        var dot = this.bounds.center.dot(axis);
        var s = [dot, dot + this.calculatedRadius, dot - this.calculatedRadius];
        return new Projection_1.Projection(Math.min.apply(Math, s), Math.max.apply(Math, s));
    };
    CircleColliderComponent.prototype.getFurthestPoint = function (direction) {
        return this.bounds.center.clone().add(direction.clone().normalize().multiply(this.calculatedRadius));
    };
    CircleColliderComponent = __decorate([
        __param(1, Inject_1.Inject(CollisionJumpTable_1.CollisionJumpTable)),
        __metadata("design:paramtypes", [GameObject_1.GameObject, Object])
    ], CircleColliderComponent);
    return CircleColliderComponent;
}(ColliderComponent_1.ColliderComponent));
exports.CircleColliderComponent = CircleColliderComponent;


/***/ }),
/* 53 */,
/* 54 */,
/* 55 */
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
var GameObject_1 = __webpack_require__(3);
var Vector_1 = __webpack_require__(1);
var Line_1 = __webpack_require__(49);
var Type_1 = __webpack_require__(8);
var PolygonColliderComponent_1 = __webpack_require__(50);
var Inject_1 = __webpack_require__(0);
var CollisionJumpTable_1 = __webpack_require__(31);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var BoxColliderComponent = (function (_super) {
    __extends(BoxColliderComponent, _super);
    function BoxColliderComponent(host, collisionJumpTable) {
        var _this = _super.call(this, host, collisionJumpTable) || this;
        _this.size = new Vector_1.Vector();
        for (var i = 0; i < 4; i++) {
            _this.points.push(new Vector_1.Vector());
            _this._calculatedPoints.push(new Vector_1.Vector());
            _this._calculatedAxes.push(new Vector_1.Vector());
            _this._calculatedSides.push(new Line_1.Line(new Vector_1.Vector(), new Vector_1.Vector()));
        }
        return _this;
    }
    BoxColliderComponent.prototype.calculate = function () {
        var toWorldMatrix = this.host.transform.toWorldMatrix;
        var halfSizeX = this.size.x * 0.5;
        var halfSizeY = this.size.y * 0.5;
        this.points[0].setTo(-halfSizeX, -halfSizeY);
        this.points[1].setTo(halfSizeX, -halfSizeY);
        this.points[2].setTo(halfSizeX, halfSizeY);
        this.points[3].setTo(-halfSizeX, halfSizeY);
        this._calculatedPoints[0].setTo(-halfSizeX, -halfSizeY);
        this._calculatedPoints[1].setTo(halfSizeX, -halfSizeY);
        this._calculatedPoints[2].setTo(halfSizeX, halfSizeY);
        this._calculatedPoints[3].setTo(-halfSizeX, halfSizeY);
        this._calculatedPoints.forEach(function (point) { return toWorldMatrix.multiplyToPoint(point); });
        for (var i = 0; i < 4; i++) {
            var p1 = this._calculatedPoints[i];
            var p2 = this._calculatedPoints[(i + 1) % 4];
            var axis = this._calculatedAxes[i];
            var side = this._calculatedSides[i];
            axis.copy(p1).subtract(p2);
            side.begin.copy(p1);
            side.end.copy(p2);
        }
        var x = this._calculatedPoints.map(function (p) { return p.x; });
        var y = this._calculatedPoints.map(function (p) { return p.y; });
        var minX = Math.min.apply(Math, x);
        var minY = Math.min.apply(Math, y);
        var maxX = Math.max.apply(Math, x);
        var maxY = Math.max.apply(Math, y);
        this.bounds.center.setTo((maxX + minX) / 2, (maxY + minY) / 2);
        this.bounds.extents.setTo((maxX - minX) / 2, (maxY - minY) / 2);
    };
    BoxColliderComponent = __decorate([
        __param(1, Inject_1.Inject(CollisionJumpTable_1.CollisionJumpTable)),
        __metadata("design:paramtypes", [GameObject_1.GameObject, Object])
    ], BoxColliderComponent);
    return BoxColliderComponent;
}(PolygonColliderComponent_1.PolygonColliderComponent));
exports.BoxColliderComponent = BoxColliderComponent;


/***/ }),
/* 56 */
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
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColliderType;
(function (ColliderType) {
    ColliderType[ColliderType["Static"] = 0] = "Static";
    ColliderType[ColliderType["Rigidbody"] = 1] = "Rigidbody";
    ColliderType[ColliderType["Kinematic"] = 2] = "Kinematic";
})(ColliderType = exports.ColliderType || (exports.ColliderType = {}));


/***/ }),
/* 65 */
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


/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(40);
var runtime_1 = __webpack_require__(9);
runtime_1.def(runtime_1.DEBUG);
var MainScene_1 = __webpack_require__(126);
var resource_1 = __webpack_require__(28);
var mainScene = runtime_1.instantiate(MainScene_1.MainScene);
mainScene.resources.add(resource_1.bundle);
runtime_1.bootstrap(mainScene);


/***/ }),
/* 126 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Class_1 = __webpack_require__(4);
var runtime_1 = __webpack_require__(9);
var Scene_1 = __webpack_require__(33);
var Vector_1 = __webpack_require__(1);
var GameManager_1 = __webpack_require__(127);
var Background_1 = __webpack_require__(137);
var Splash_1 = __webpack_require__(138);
var Score_1 = __webpack_require__(139);
var Pipe_1 = __webpack_require__(140);
var Bird_1 = __webpack_require__(141);
var Type_1 = __webpack_require__(8);
var ScoreBoard_1 = __webpack_require__(144);
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainScene.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        var background = runtime_1.instantiate(Background_1.Background);
        background.layer = Type_1.BuiltInLayer.Background;
        this.add(background);
        var bird = runtime_1.instantiate(Bird_1.Bird);
        this.add(bird, new Vector_1.Vector(-this.screen.width / 4, 0));
        var pipes = [
            runtime_1.instantiate(Pipe_1.Pipe),
            runtime_1.instantiate(Pipe_1.Pipe),
            runtime_1.instantiate(Pipe_1.Pipe),
            runtime_1.instantiate(Pipe_1.Pipe)
        ];
        pipes.forEach(function (pipe) { return _this.add(pipe); });
        var score = runtime_1.instantiate(Score_1.Score);
        score.layer = Type_1.BuiltInLayer.UI;
        this.add(score, new Vector_1.Vector(0, this.screen.height / 3));
        var splash = runtime_1.instantiate(Splash_1.Splash);
        splash.layer = Type_1.BuiltInLayer.UI;
        this.add(splash);
        var scoreBoard = runtime_1.instantiate(ScoreBoard_1.ScoreBoard);
        scoreBoard.layer = Type_1.BuiltInLayer.UI;
        this.add(scoreBoard);
        var gameManager = runtime_1.instantiate(GameManager_1.GameManager);
        gameManager.background = background;
        gameManager.splash = splash;
        gameManager.score = score;
        gameManager.pipes = pipes;
        gameManager.bird = bird;
        gameManager.scoreBoard = scoreBoard;
        this.add(gameManager);
    };
    MainScene = __decorate([
        Class_1.Class()
    ], MainScene);
    return MainScene;
}(Scene_1.Scene));
exports.MainScene = MainScene;


/***/ }),
/* 127 */
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
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(128);
var Observable_1 = __webpack_require__(7);
var GameObject_1 = __webpack_require__(3);
var Class_1 = __webpack_require__(4);
var PointerInput_1 = __webpack_require__(24);
var KeyboardInput_1 = __webpack_require__(60);
var Inject_1 = __webpack_require__(0);
var Vector_1 = __webpack_require__(1);
var Screen_1 = __webpack_require__(11);
var Random_1 = __webpack_require__(62);
var AudioPlayerComponent_1 = __webpack_require__(56);
var resource_1 = __webpack_require__(28);
var SceneManager_1 = __webpack_require__(42);
var Logger_1 = __webpack_require__(30);
var kPipeDistance = 300;
var kPipeRandamRange = 200;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Init"] = 0] = "Init";
    GameStatus[GameStatus["Playing"] = 1] = "Playing";
    GameStatus[GameStatus["Over"] = 2] = "Over";
})(GameStatus || (GameStatus = {}));
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = GameStatus.Init;
        _this.subscriptions = [];
        return _this;
    }
    GameManager.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        this.sfxScore = this.addComponent(AudioPlayerComponent_1.AudioPlayerComponent);
        this.sfxScore.source = resource_1.sfx_point;
        this.subscriptions.push(this.bird.onCollide$.subscribe(function (e) { return _this.onBirdCollide(e); }));
        this.subscriptions.push(Observable_1.Observable.merge(this.pointerInput.pointerStart$, this.keyboardInput.keyDown$.filter(function (e) { return e.key === ' '; })).throttleTime(100).subscribe(function () { return _this.onTouch(); }));
        this.pipes.forEach(function (pipe, index) {
            return pipe.onBecameInvisible$.subscribe(function () { return _this.onPipeBecameInvisible(pipe, index); });
        });
        this.gameReset();
    };
    GameManager.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        this.subscriptions = [];
    };
    GameManager.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.pipes.forEach(function (pipe, index) {
            if (!pipe.scored) {
                if (pipe.transform.position.x < _this.bird.transform.position.x) {
                    _this.increaseScore();
                    pipe.scored = true;
                    return true;
                }
            }
        });
    };
    GameManager.prototype.gameStart = function () {
        this.score.setScore(0);
        this.score.activate();
        this.splash.deactivate();
        this.status = GameStatus.Playing;
        this.pipes.forEach(function (pipe) { return pipe.startMove(); });
        this.bird.isFalling = true;
        this.background.isMoving = true;
        this.logger.log('game start');
    };
    GameManager.prototype.gameOver = function () {
        this.score.deactivate();
        this.status = GameStatus.Over;
        this.logger.log('game over');
        this.scoreBoard.activate();
        this.scoreBoard.setScore(this.score.getScore());
        this.background.isMoving = false;
        this.pipes.forEach(function (pipe) { return pipe.stopMove(); });
    };
    GameManager.prototype.gameReset = function () {
        var _this = this;
        this.splash.activate();
        this.scoreBoard.deactivate();
        this.bird.isFalling = false;
        this.bird.transform.position.copy(new Vector_1.Vector(-this.screen.width / 4, 0));
        this.pipes.forEach(function (pipe, index) {
            var x = (index + 1) * kPipeDistance;
            var y = _this.random.integer(-kPipeRandamRange, kPipeRandamRange) + 50;
            pipe.transform.position.setTo(x, y);
        });
        this.status = GameStatus.Init;
        this.logger.log('game init');
    };
    GameManager.prototype.increaseScore = function () {
        this.score.increaseScore();
        this.sfxScore.play();
    };
    GameManager.prototype.onTouch = function () {
        switch (this.status) {
            case GameStatus.Init:
                this.gameStart();
                break;
            case GameStatus.Over:
                this.gameReset();
                break;
            case GameStatus.Playing:
            default:
                this.bird.fly();
                break;
        }
    };
    GameManager.prototype.onPipeBecameInvisible = function (pipe, index) {
        var prevIndex = index - 1;
        if (prevIndex < 0) {
            prevIndex += this.pipes.length;
        }
        var prevPipe = this.pipes[prevIndex];
        pipe.transform.position.x = prevPipe.transform.position.x + kPipeDistance;
        pipe.transform.position.y = this.random.integer(-kPipeRandamRange, kPipeRandamRange) + 50;
        pipe.scored = false;
    };
    GameManager.prototype.onBirdCollide = function (e) {
        if (this.status === GameStatus.Playing) {
            this.bird.die();
            this.gameOver();
        }
    };
    __decorate([
        Inject_1.Inject(Screen_1.Screen),
        __metadata("design:type", Object)
    ], GameManager.prototype, "screen", void 0);
    __decorate([
        Inject_1.Inject(PointerInput_1.PointerInput),
        __metadata("design:type", Object)
    ], GameManager.prototype, "pointerInput", void 0);
    __decorate([
        Inject_1.Inject(KeyboardInput_1.KeyboardInput),
        __metadata("design:type", Object)
    ], GameManager.prototype, "keyboardInput", void 0);
    __decorate([
        Inject_1.Inject(Random_1.Random),
        __metadata("design:type", Object)
    ], GameManager.prototype, "random", void 0);
    __decorate([
        Inject_1.Inject(SceneManager_1.SceneManager),
        __metadata("design:type", Object)
    ], GameManager.prototype, "sceneManager", void 0);
    __decorate([
        Inject_1.Inject(Logger_1.Logger),
        __metadata("design:type", Object)
    ], GameManager.prototype, "logger", void 0);
    GameManager = __decorate([
        Class_1.Class()
    ], GameManager);
    return GameManager;
}(GameObject_1.GameObject));
exports.GameManager = GameManager;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(7);
var throttleTime_1 = __webpack_require__(129);
Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
//# sourceMappingURL=throttleTime.js.map

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(29);
var async_1 = __webpack_require__(130);
var throttle_1 = __webpack_require__(135);
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for `duration` milliseconds, then repeats this process.
 *
 * <span class="informal">Lets a value pass, then ignores source values for the
 * next `duration` milliseconds.</span>
 *
 * <img src="./img/throttleTime.png" width="100%">
 *
 * `throttleTime` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled. After `duration` milliseconds (or the time unit determined
 * internally by the optional `scheduler`) has passed, the timer is disabled,
 * and this process repeats for the next source value. Optionally takes a
 * {@link IScheduler} for managing timers.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounceTime}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttle}
 *
 * @param {number} duration Time to wait before emitting another value after
 * emitting the last value, measured in milliseconds or the time unit determined
 * internally by the optional `scheduler`.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the throttling.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttleTime
 * @owner Observable
 */
function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    if (config === void 0) { config = throttle_1.defaultThrottleConfig; }
    return this.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
}
exports.throttleTime = throttleTime;
var ThrottleTimeOperator = (function () {
    function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
    };
    return ThrottleTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ThrottleTimeSubscriber = (function (_super) {
    __extends(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
        _super.call(this, destination);
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
        this._hasTrailingValue = false;
        this._trailingValue = null;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (this.throttled) {
            if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
            }
        }
        else {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
            if (this.leading) {
                this.destination.next(value);
            }
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            if (this.trailing && this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this._trailingValue = null;
                this._hasTrailingValue = false;
            }
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
}
//# sourceMappingURL=throttleTime.js.map

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AsyncAction_1 = __webpack_require__(131);
var AsyncScheduler_1 = __webpack_require__(133);
/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(35);
var Action_1 = __webpack_require__(132);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(41);
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__(134);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(72);
var subscribeToResult_1 = __webpack_require__(73);
exports.defaultThrottleConfig = {
    leading: true,
    trailing: false
};
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounce}
 * @see {@link delayWhen}
 * @see {@link sample}
 * @see {@link throttleTime}
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
 * to `{ leading: true, trailing: false }`.
 * @return {Observable<T>} An Observable that performs the throttle operation to
 * limit the rate of emissions from the source.
 * @method throttle
 * @owner Observable
 */
function throttle(durationSelector, config) {
    if (config === void 0) { config = exports.defaultThrottleConfig; }
    return this.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing));
}
exports.throttle = throttle;
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector, leading, trailing) {
        this.durationSelector = durationSelector;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
    };
    return ThrottleOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc
 * @ignore
 * @extends {Ignored}
 */
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        _super.call(this, destination);
        this.destination = destination;
        this.durationSelector = durationSelector;
        this._leading = _leading;
        this._trailing = _trailing;
        this._hasTrailingValue = false;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        if (this.throttled) {
            if (this._trailing) {
                this._hasTrailingValue = true;
                this._trailingValue = value;
            }
        }
        else {
            var duration = this.tryDurationSelector(value);
            if (duration) {
                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
            }
            if (this._leading) {
                this.destination.next(value);
                if (this._trailing) {
                    this._hasTrailingValue = true;
                    this._trailingValue = value;
                }
            }
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
            return this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return null;
        }
    };
    ThrottleSubscriber.prototype._unsubscribe = function () {
        var _a = this, throttled = _a.throttled, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue, _trailing = _a._trailing;
        this._trailingValue = null;
        this._hasTrailingValue = false;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
    };
    ThrottleSubscriber.prototype._sendTrailing = function () {
        var _a = this, destination = _a.destination, throttled = _a.throttled, _trailing = _a._trailing, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue;
        if (throttled && _trailing && _hasTrailingValue) {
            destination.next(_trailingValue);
            this._trailingValue = null;
            this._hasTrailingValue = false;
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._sendTrailing();
        this._unsubscribe();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this._sendTrailing();
        this._unsubscribe();
    };
    return ThrottleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=throttle.js.map

/***/ }),
/* 136 */
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
var Font = (function (_super) {
    __extends(Font, _super);
    function Font(fontFamily, format, path) {
        var _this = _super.call(this, path) || this;
        _this.fontFamily = fontFamily;
        _this.format = format;
        _this._responseType = 'blob';
        return _this;
    }
    Font.prototype.processData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var blobUrl, style;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.processData.call(this, data)];
                    case 1:
                        blobUrl = _a.sent();
                        style = this.browser.document.createElement('style');
                        style.textContent = Font.CssTemplate
                            .replace('{fontFamily}', this.fontFamily)
                            .replace('{url}', blobUrl)
                            .replace('{format}', this.format);
                        this.browser.document.head.appendChild(style);
                        return [2];
                }
            });
        });
    };
    Font.CssTemplate = '@font-face { font-family: \'{fontFamily}\'; src: url(\'{url}\') format(\'{format}\'); }';
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Font.prototype, "browser", void 0);
    return Font;
}(Resource_1.Resource));
exports.Font = Font;


/***/ }),
/* 137 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Class_1 = __webpack_require__(4);
var GameObject_1 = __webpack_require__(3);
var SpriteRendererComponent_1 = __webpack_require__(18);
var Sprite_1 = __webpack_require__(17);
var resource_1 = __webpack_require__(28);
var runtime_1 = __webpack_require__(9);
var Inject_1 = __webpack_require__(0);
var Screen_1 = __webpack_require__(11);
var Time_1 = __webpack_require__(12);
var BoxColliderComponent_1 = __webpack_require__(55);
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMoving = false;
        return _this;
    }
    Background.prototype.start = function () {
        _super.prototype.start.call(this);
        this.sky = runtime_1.instantiate(Sky);
        this.addChild(this.sky);
        this.grounds = [];
        for (var i = 0; i < 4; i++) {
            var ground = runtime_1.instantiate(Ground);
            this.grounds.push(ground);
            ground.transform.position.setTo((i - 1) * 336, 50 - this.screen.height / 2);
            this.addChild(ground);
        }
    };
    Background.prototype.fixedUpdate = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (!this.isMoving) {
            return;
        }
        var outOfScreen = (-this.screen.width - 336) / 2;
        this.grounds.forEach(function (ground) {
            ground.transform.localPosition.x -= 10 * _this.time.fixedDeltaTimeInSecond;
            if (ground.transform.localPosition.x < outOfScreen) {
                ground.transform.localPosition.x += 336 * 4;
            }
        });
    };
    __decorate([
        Inject_1.Inject(Screen_1.Screen),
        __metadata("design:type", Object)
    ], Background.prototype, "screen", void 0);
    __decorate([
        Inject_1.Inject(Time_1.Time),
        __metadata("design:type", Object)
    ], Background.prototype, "time", void 0);
    Background = __decorate([
        Class_1.Class()
    ], Background);
    return Background;
}(GameObject_1.GameObject));
exports.Background = Background;
var Sky = (function (_super) {
    __extends(Sky, _super);
    function Sky() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sky.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
    };
    Sky.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_sky);
        this.transform.localScale.setTo(3);
    };
    Sky = __decorate([
        Class_1.Class()
    ], Sky);
    return Sky;
}(GameObject_1.GameObject));
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ground.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_ground);
        this.collider = this.addComponent(BoxColliderComponent_1.BoxColliderComponent);
        this.collider.size.setTo(336, 112);
    };
    Ground = __decorate([
        Class_1.Class()
    ], Ground);
    return Ground;
}(GameObject_1.GameObject));


/***/ }),
/* 138 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Class_1 = __webpack_require__(4);
var GameObject_1 = __webpack_require__(3);
var SpriteRendererComponent_1 = __webpack_require__(18);
var Sprite_1 = __webpack_require__(17);
var resource_1 = __webpack_require__(28);
var Splash = (function (_super) {
    __extends(Splash, _super);
    function Splash() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Splash.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.name = 'splash';
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_splash);
        this.transform.scale.setTo(1.5);
    };
    Splash = __decorate([
        Class_1.Class()
    ], Splash);
    return Splash;
}(GameObject_1.GameObject));
exports.Splash = Splash;


/***/ }),
/* 139 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(3);
var TextRendererComponent_1 = __webpack_require__(39);
var resource_1 = __webpack_require__(28);
var Color_1 = __webpack_require__(6);
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 0;
        return _this;
    }
    Score.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.renderer = this.addComponent(TextRendererComponent_1.TextRendererComponent);
        this.renderer.fontFamily = resource_1.font.fontFamily;
        this.renderer.fontSize = 64;
        this.renderer.strokeColor = Color_1.Color.Black;
        this.renderer.lineWidth = 2;
    };
    Score.prototype.setScore = function (value) {
        this.value = value;
        this.renderer.text = "" + value;
    };
    Score.prototype.getScore = function () {
        return this.value;
    };
    Score.prototype.increaseScore = function () {
        this.setScore(++this.value);
    };
    return Score;
}(GameObject_1.GameObject));
exports.Score = Score;


/***/ }),
/* 140 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Class_1 = __webpack_require__(4);
var GameObject_1 = __webpack_require__(3);
var SpriteRendererComponent_1 = __webpack_require__(18);
var Sprite_1 = __webpack_require__(17);
var resource_1 = __webpack_require__(28);
var runtime_1 = __webpack_require__(9);
var RigidbodyComponent_1 = __webpack_require__(22);
var BoxColliderComponent_1 = __webpack_require__(55);
var PipeObject = (function (_super) {
    __extends(PipeObject, _super);
    function PipeObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PipeObject.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.collider = this.addComponent(BoxColliderComponent_1.BoxColliderComponent);
    };
    PipeObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_pipe);
        this.collider.size.setTo(138, 1000);
    };
    PipeObject = __decorate([
        Class_1.Class()
    ], PipeObject);
    return PipeObject;
}(GameObject_1.GameObject));
var Pipe = (function (_super) {
    __extends(Pipe, _super);
    function Pipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Pipe.prototype, "onBecameInvisible$", {
        get: function () { return this.upper.renderer.onBecameInvisible$; },
        enumerable: true,
        configurable: true
    });
    Pipe.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.upper = runtime_1.instantiate(PipeObject);
        this.lower = runtime_1.instantiate(PipeObject);
        this.body = this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        this.scored = false;
    };
    Pipe.prototype.start = function () {
        _super.prototype.start.call(this);
        this.upper.transform.localScale.setTo(1, -1);
        this.upper.transform.position.setTo(0, 325);
        this.lower.transform.position.setTo(0, -325);
        this.addChild(this.upper);
        this.addChild(this.lower);
        this.transform.scale.setTo(0.5);
    };
    Pipe.prototype.startMove = function () {
        this.body.velocity.setTo(-120, 0);
    };
    Pipe.prototype.stopMove = function () {
        this.body.velocity.reset();
    };
    Pipe = __decorate([
        Class_1.Class()
    ], Pipe);
    return Pipe;
}(GameObject_1.GameObject));
exports.Pipe = Pipe;


/***/ }),
/* 141 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(3);
var Class_1 = __webpack_require__(4);
var RigidbodyComponent_1 = __webpack_require__(22);
var CircleColliderComponent_1 = __webpack_require__(52);
var Vector_1 = __webpack_require__(1);
var SpriteSheetRendererComponent_1 = __webpack_require__(142);
var SpriteSheet_1 = __webpack_require__(143);
var resource_1 = __webpack_require__(28);
var ForceMode_1 = __webpack_require__(38);
var AudioPlayerComponent_1 = __webpack_require__(56);
var Inject_1 = __webpack_require__(0);
var Screen_1 = __webpack_require__(11);
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bird_1 = Bird;
    Object.defineProperty(Bird.prototype, "onCollide$", {
        get: function () { return this.collider.onCollide$; },
        enumerable: true,
        configurable: true
    });
    Bird.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.body = this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        this.collider = this.addComponent(CircleColliderComponent_1.CircleColliderComponent);
        this.renderer = this.addComponent(SpriteSheetRendererComponent_1.SpriteSheetRendererComponent);
        this.sfxWing = this.addComponent(AudioPlayerComponent_1.AudioPlayerComponent);
        this.sfxWing.source = resource_1.sfx_wing;
        this.sfxHit = this.addComponent(AudioPlayerComponent_1.AudioPlayerComponent);
        this.sfxHit.source = resource_1.sfx_hit;
        this.isFalling = false;
    };
    Bird.prototype.fixedUpdate = function () {
        _super.prototype.fixedUpdate.call(this);
        var top = this.screen.height * 0.5 - 40;
        if (this.transform.position.y >= top) {
            this.transform.position.y = top;
        }
    };
    Bird.prototype.start = function () {
        _super.prototype.start.call(this);
        this.collider.radius = 60;
        this.renderer.spriteSheet = new SpriteSheet_1.SpriteSheet(resource_1.texture_bird, [
            { x: 0, y: 0, width: 210, height: 200 },
            { x: 210, y: 0, width: 210, height: 200 },
            { x: 420, y: 0, width: 210, height: 200 }
        ], 6);
        this.transform.scale.setTo(0.25);
    };
    Bird.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.isFalling) {
            this.body.addForce(Bird_1.Gravity, ForceMode_1.ForceMode.Acceleration);
        }
        else {
            this.body.velocity.reset();
        }
        this.transform.rotation = this.body.velocity.y / 4000 * Math.PI;
    };
    Bird.prototype.fly = function () {
        this.body.velocity.reset();
        this.body.addForce(Bird_1.FlyVelocity, ForceMode_1.ForceMode.VelocityChange);
        if (this.sfxWing.isPlaying) {
            this.sfxWing.stop();
        }
        this.sfxWing.play();
    };
    Bird.prototype.die = function () {
        this.sfxHit.play();
        this.body.clearForce();
    };
    Bird.FlyVelocity = new Vector_1.Vector(0, 350);
    Bird.Gravity = new Vector_1.Vector(0, -1200);
    __decorate([
        Inject_1.Inject(Screen_1.Screen),
        __metadata("design:type", Object)
    ], Bird.prototype, "screen", void 0);
    Bird = Bird_1 = __decorate([
        Class_1.Class()
    ], Bird);
    return Bird;
    var Bird_1;
}(GameObject_1.GameObject));
exports.Bird = Bird;


/***/ }),
/* 142 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteRendererComponent_1 = __webpack_require__(18);
var Time_1 = __webpack_require__(12);
var UniqueComponent_1 = __webpack_require__(19);
var Inject_1 = __webpack_require__(0);
var SpriteSheetRendererComponent = (function (_super) {
    __extends(SpriteSheetRendererComponent, _super);
    function SpriteSheetRendererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentIndex = 0;
        _this.accumulator = 0;
        return _this;
    }
    Object.defineProperty(SpriteSheetRendererComponent.prototype, "spriteSheet", {
        get: function () { return this._spriteSheet; },
        set: function (value) { this.setSpriteSheep(value); },
        enumerable: true,
        configurable: true
    });
    SpriteSheetRendererComponent.prototype.play = function (key) {
        if (key === void 0) { key = 'default'; }
        this.currentIndex = 0;
        this.sheetKey = key;
        this.accumulator = 0;
        this.sprites = this._spriteSheet.getSprites(this.sheetKey);
    };
    SpriteSheetRendererComponent.prototype.update = function () {
        if (!this.sprites) {
            this.sprite = undefined;
            return;
        }
        this.accumulator += this.time.deltaTime;
        if (this.accumulator > this._spriteSheet.frameTime) {
            var times = (this.accumulator / this._spriteSheet.frameTime) | 0;
            this.accumulator %= this._spriteSheet.frameTime;
            this.currentIndex += times;
            if (this.currentIndex >= this.sprites.length) {
                this.currentIndex %= this.sprites.length;
            }
        }
        this.sprite = this.sprites[this.currentIndex];
        _super.prototype.update.call(this);
    };
    SpriteSheetRendererComponent.prototype.setSpriteSheep = function (spriteSheet) {
        this._spriteSheet = spriteSheet;
        if (!this.sprites) {
            this.play();
        }
    };
    __decorate([
        Inject_1.Inject(Time_1.Time),
        __metadata("design:type", Object)
    ], SpriteSheetRendererComponent.prototype, "time", void 0);
    SpriteSheetRendererComponent = __decorate([
        UniqueComponent_1.UniqueComponent()
    ], SpriteSheetRendererComponent);
    return SpriteSheetRendererComponent;
}(SpriteRendererComponent_1.SpriteRendererComponent));
exports.SpriteSheetRendererComponent = SpriteSheetRendererComponent;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sprite_1 = __webpack_require__(17);
var Rect_1 = __webpack_require__(14);
var Vector_1 = __webpack_require__(1);
var SpriteSheet = (function () {
    function SpriteSheet(texture, cellMapOrCells, _fps) {
        if (_fps === void 0) { _fps = 24; }
        var _this = this;
        this.texture = texture;
        this.cellMapOrCells = cellMapOrCells;
        this._fps = _fps;
        this.sprites = new Map();
        if (Array.isArray(cellMapOrCells)) {
            var sprites = this.makeSprites(texture, cellMapOrCells);
            var key = 'default';
            this.sprites.set(key, sprites);
        }
        else {
            var keys = Object.keys(cellMapOrCells);
            keys.forEach(function (key) {
                var cells = cellMapOrCells[key];
                var sprites = _this.makeSprites(texture, cells);
                _this.sprites.set(key, sprites);
            });
        }
        this.frameTime = 1000 / _fps;
    }
    Object.defineProperty(SpriteSheet.prototype, "fps", {
        get: function () { return this._fps; },
        set: function (value) {
            this._fps = value;
            this.frameTime = 1000 / value;
        },
        enumerable: true,
        configurable: true
    });
    SpriteSheet.prototype.getSprites = function (key) {
        return this.sprites.get(key) || [];
    };
    SpriteSheet.prototype.getSprite = function (key, index) {
        var sprites = this.sprites.get(key);
        if (!sprites) {
            return;
        }
        var correctedIndex = index % sprites.length;
        return sprites[correctedIndex];
    };
    SpriteSheet.prototype.makeSprites = function (texture, cells) {
        var sprites = [];
        cells.forEach(function (cell) {
            var sprite = new Sprite_1.Sprite(texture, new Rect_1.Rect(new Vector_1.Vector(cell.x || 0, cell.y || 0), cell.width, cell.height));
            sprites.push(sprite);
        });
        return sprites;
    };
    return SpriteSheet;
}());
exports.SpriteSheet = SpriteSheet;


/***/ }),
/* 144 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Class_1 = __webpack_require__(4);
var GameObject_1 = __webpack_require__(3);
var SpriteRendererComponent_1 = __webpack_require__(18);
var Sprite_1 = __webpack_require__(17);
var resource_1 = __webpack_require__(28);
var runtime_1 = __webpack_require__(9);
var TextRendererComponent_1 = __webpack_require__(39);
var Color_1 = __webpack_require__(6);
var ScoreBoard = (function (_super) {
    __extends(ScoreBoard, _super);
    function ScoreBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScoreBoard.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_scoreboard);
        this.medal = runtime_1.instantiate(Medal);
        this.medal.transform.position.setTo(-62, 6);
        this.addChild(this.medal);
        this.currentScore = runtime_1.instantiate(Score);
        this.currentScore.transform.position.setTo(80, 28);
        this.addChild(this.currentScore);
        this.bestScore = runtime_1.instantiate(Score);
        this.bestScore.transform.position.setTo(80, -12);
        this.addChild(this.bestScore);
    };
    ScoreBoard.prototype.setScore = function (score) {
        this.currentScore.setScore(score);
        this.bestScore.setScore(0);
        if (score >= 40) {
            this.medal.setType(MedalType.Platinum);
        }
        else if (score >= 30) {
            this.medal.setType(MedalType.Gold);
        }
        else if (score >= 20) {
            this.medal.setType(MedalType.Silver);
        }
        else if (score >= 10) {
            this.medal.setType(MedalType.Bronze);
        }
        else {
            this.medal.setType(MedalType.None);
        }
    };
    ScoreBoard = __decorate([
        Class_1.Class()
    ], ScoreBoard);
    return ScoreBoard;
}(GameObject_1.GameObject));
exports.ScoreBoard = ScoreBoard;
var MedalType;
(function (MedalType) {
    MedalType[MedalType["None"] = 0] = "None";
    MedalType[MedalType["Bronze"] = 1] = "Bronze";
    MedalType[MedalType["Silver"] = 2] = "Silver";
    MedalType[MedalType["Gold"] = 3] = "Gold";
    MedalType[MedalType["Platinum"] = 4] = "Platinum";
})(MedalType || (MedalType = {}));
var Medal = (function (_super) {
    __extends(Medal, _super);
    function Medal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Medal.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
    };
    Medal.prototype.setType = function (type) {
        switch (type) {
            case MedalType.Bronze:
                this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_medal_bronze);
                break;
            case MedalType.Silver:
                this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_medal_silver);
                break;
            case MedalType.Gold:
                this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_medal_gold);
                break;
            case MedalType.Platinum:
                this.renderer.sprite = new Sprite_1.Sprite(resource_1.texture_medal_platinum);
                break;
            case MedalType.None:
            default:
                this.renderer.sprite = undefined;
                break;
        }
    };
    Medal = __decorate([
        Class_1.Class()
    ], Medal);
    return Medal;
}(GameObject_1.GameObject));
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Score.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(TextRendererComponent_1.TextRendererComponent);
        this.renderer.fontFamily = resource_1.font.fontFamily;
        this.renderer.fontSize = 24;
        this.renderer.strokeColor = Color_1.Color.Black;
        this.renderer.lineWidth = 2;
    };
    Score.prototype.setScore = function (score) {
        this.renderer.text = "" + score;
    };
    return Score;
}(GameObject_1.GameObject));


/***/ })
],[125]);
//# sourceMappingURL=flappy-bird.bundle.js.map