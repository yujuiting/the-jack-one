webpackJsonp([1],{

/***/ 123:
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
__webpack_require__(40);
var runtime_1 = __webpack_require__(9);
runtime_1.def(runtime_1.DEBUG);
var GameObject_1 = __webpack_require__(3);
var Scene_1 = __webpack_require__(33);
var SceneManager_1 = __webpack_require__(42);
var BrowserDelegate_1 = __webpack_require__(2);
var ArrayUtility_1 = __webpack_require__(10);
var Class_1 = __webpack_require__(4);
var Inject_1 = __webpack_require__(0);
var Texture_1 = __webpack_require__(16);
var Sprite_1 = __webpack_require__(17);
var Color_1 = __webpack_require__(6);
var Random_1 = __webpack_require__(62);
var SpriteRendererComponent_1 = __webpack_require__(18);
var RigidbodyComponent_1 = __webpack_require__(22);
var BoxColliderComponent_1 = __webpack_require__(55);
var CircleColliderComponent_1 = __webpack_require__(52);
var PointerInput_1 = __webpack_require__(24);
var rectTexture = new Texture_1.Texture('./assets/rect.png');
var circleTexture = new Texture_1.Texture('./assets/circle.png');
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isVisible = true;
        return _this;
    }
    Shape.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.renderer.onBecameVisible$.subscribe(function () { return _this.isVisible = true; });
        this.renderer.onBecameInvisible$.subscribe(function () { return _this.isVisible = false; });
        this.body = this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        this.size = this.random.integer(64, 128);
        this.transform.scale.setTo(this.size / 400);
        this.body.useGravity = true;
    };
    __decorate([
        Inject_1.Inject(Random_1.Random),
        __metadata("design:type", Object)
    ], Shape.prototype, "random", void 0);
    Shape = __decorate([
        Class_1.Class()
    ], Shape);
    return Shape;
}(GameObject_1.GameObject));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.start = function () {
        _super.prototype.start.call(this);
        this.collider = this.addComponent(BoxColliderComponent_1.BoxColliderComponent);
        this.renderer.sprite = new Sprite_1.Sprite(rectTexture);
        this.collider.size.setTo(400);
    };
    Box = __decorate([
        Class_1.Class()
    ], Box);
    return Box;
}(Shape));
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.start = function () {
        _super.prototype.start.call(this);
        this.collider = this.addComponent(CircleColliderComponent_1.CircleColliderComponent);
        this.renderer.sprite = new Sprite_1.Sprite(circleTexture);
        this.collider.radius = 200;
    };
    Circle = __decorate([
        Class_1.Class()
    ], Circle);
    return Circle;
}(Shape));
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wall.prototype.start = function () {
        _super.prototype.start.call(this);
        this.collider = this.addComponent(BoxColliderComponent_1.BoxColliderComponent);
        this.collider.size.setTo(3000, 2);
    };
    Wall = __decorate([
        Class_1.Class()
    ], Wall);
    return Wall;
}(GameObject_1.GameObject));
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shapes = [];
        return _this;
    }
    GameManager.prototype.postRender = function () {
        var _this = this;
        _super.prototype.postRender.call(this);
        var invisibleShapes = this.shapes.filter(function (shape) { return shape.isActive && !shape.isVisible; });
        invisibleShapes.forEach(function (invisibleShape) { return _this.destroyShape(invisibleShape); });
    };
    GameManager.prototype.createShapeAt = function (position) {
        var _this = this;
        var type = this.random.pickOne(ShapeTypes);
        var shape = runtime_1.instantiate(type);
        this.scene.add(shape, position);
        setTimeout(function () { return _this.shapes.push(shape); }, 100);
    };
    GameManager.prototype.destroyShape = function (shape) {
        shape.destroy();
        this.scene.remove(shape);
        ArrayUtility_1.removeFromArray(this.shapes, shape);
    };
    __decorate([
        Inject_1.Inject(Random_1.Random),
        __metadata("design:type", Object)
    ], GameManager.prototype, "random", void 0);
    GameManager = __decorate([
        Class_1.Class()
    ], GameManager);
    return GameManager;
}(GameObject_1.GameObject));
var ShapeTypes = [Box, Circle];
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Game.prototype.start = function () {
        var _this = this;
        _super.prototype.start.call(this);
        this.mainCamera.backgroundColor = Color_1.Color.CreateByHexRgb('#4A687F');
        this.wallTop = runtime_1.instantiate(Wall);
        this.add(this.wallTop);
        this.wallBottom = runtime_1.instantiate(Wall);
        this.add(this.wallBottom);
        this.wallRight = runtime_1.instantiate(Wall);
        this.wallRight.transform.rotation = Math.PI / 2;
        this.add(this.wallRight);
        this.wallLeft = runtime_1.instantiate(Wall);
        this.wallLeft.transform.rotation = Math.PI / 2;
        this.add(this.wallLeft);
        this.adjustWalls();
        this.gameManager = runtime_1.instantiate(GameManager);
        this.gameManager.scene = this;
        this.add(this.gameManager);
        this.pointerInput.pointerStart$.subscribe(function (e) { return _this.onPointerStart(e); });
    };
    Game.prototype.onPointerStart = function (e) {
        var _this = this;
        e.locations.forEach(function (location) {
            var worldPosition = _this.mainCamera.screenToWorld(location);
            _this.gameManager.createShapeAt(worldPosition);
        });
    };
    Game.prototype.adjustWalls = function () {
        var halfWidth = this.screen.width * 0.5;
        var halfHeight = this.screen.height * 0.5;
        this.wallTop.transform.position.setTo(0, halfHeight);
        this.wallBottom.transform.position.setTo(0, -halfHeight);
        this.wallRight.transform.position.setTo(halfWidth, 0);
        this.wallLeft.transform.position.setTo(-halfWidth, 0);
    };
    Game.prototype.onResize = function () {
        _super.prototype.onResize.call(this);
        this.mainCamera.setSize(this.screen.width, this.screen.height);
        this.adjustWalls();
    };
    __decorate([
        Inject_1.Inject(SceneManager_1.SceneManager),
        __metadata("design:type", Object)
    ], Game.prototype, "sceneManager", void 0);
    __decorate([
        Inject_1.Inject(PointerInput_1.PointerInput),
        __metadata("design:type", Object)
    ], Game.prototype, "pointerInput", void 0);
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Game.prototype, "browserDelegate", void 0);
    Game = __decorate([
        Class_1.Class()
    ], Game);
    return Game;
}(Scene_1.Scene));
var scene = runtime_1.instantiate(Game);
scene.resources.add(rectTexture);
scene.resources.add(circleTexture);
runtime_1.bootstrap(scene).catch(console.error);


/***/ }),

/***/ 14:
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

/***/ 16:
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

/***/ 17:
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

/***/ 18:
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

/***/ 22:
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

/***/ 26:
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

/***/ 27:
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

/***/ 33:
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

/***/ 34:
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

/***/ 49:
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

/***/ 50:
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

/***/ 51:
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

/***/ 52:
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

/***/ 55:
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

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColliderType;
(function (ColliderType) {
    ColliderType[ColliderType["Static"] = 0] = "Static";
    ColliderType[ColliderType["Rigidbody"] = 1] = "Rigidbody";
    ColliderType[ColliderType["Kinematic"] = 2] = "Kinematic";
})(ColliderType = exports.ColliderType || (exports.ColliderType = {}));


/***/ })

},[123]);
//# sourceMappingURL=physics.bundle.js.map