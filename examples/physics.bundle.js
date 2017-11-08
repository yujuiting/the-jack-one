webpackJsonp([1],{

/***/ 12:
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
var GameObject_1 = __webpack_require__(2);
var Component_1 = __webpack_require__(10);
var TransformComponent_1 = __webpack_require__(14);
var Vector_1 = __webpack_require__(1);
var Engine_1 = __webpack_require__(23);
var Time_1 = __webpack_require__(9);
var ForceMode_1 = __webpack_require__(25);
var UniqueComponent_1 = __webpack_require__(15);
var RequireComponent_1 = __webpack_require__(31);
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
    RigidbodyComponent.prototype.fixedUpdate = function (alpha) {
        _super.prototype.fixedUpdate.call(this, alpha);
        var deltaTimeInSecond = this.time.fixedDeltaTimeInSecond * alpha;
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(27);
var runtime_1 = __webpack_require__(11);
runtime_1.def(runtime_1.DEBUG);
var GameObject_1 = __webpack_require__(2);
var Scene_1 = __webpack_require__(32);
var Screen_1 = __webpack_require__(17);
var SceneManager_1 = __webpack_require__(18);
var BrowserDelegate_1 = __webpack_require__(5);
var ArrayUtility_1 = __webpack_require__(7);
var Class_1 = __webpack_require__(6);
var Inject_1 = __webpack_require__(0);
var Texture_1 = __webpack_require__(26);
var Sprite_1 = __webpack_require__(16);
var Color_1 = __webpack_require__(8);
var Random_1 = __webpack_require__(53);
var SpriteRendererComponent_1 = __webpack_require__(20);
var RigidbodyComponent_1 = __webpack_require__(12);
var BoxColliderComponent_1 = __webpack_require__(54);
var CircleColliderComponent_1 = __webpack_require__(36);
var PointerInput_1 = __webpack_require__(41);
var rectTexture = new Texture_1.Texture('../assets/rect.png');
var circleTexture = new Texture_1.Texture('../assets/circle.png');
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
        __metadata("design:type", Random_1.Random)
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
        __metadata("design:type", Random_1.Random)
    ], GameManager.prototype, "random", void 0);
    GameManager = __decorate([
        Class_1.Class()
    ], GameManager);
    return GameManager;
}(GameObject_1.GameObject));
var ShapeTypes = [Box, Circle];
var Game = (function () {
    function Game(sceneManager, pointerInput, browserDelegate, screen) {
        var _this = this;
        this.sceneManager = sceneManager;
        this.pointerInput = pointerInput;
        this.browserDelegate = browserDelegate;
        this.screen = screen;
        this.scene = runtime_1.instantiate(Scene_1.Scene);
        this.sceneManager.add(this.scene);
        this.scene.mainCamera.backgroundColor = Color_1.Color.CreateByHexRgb('#4A687F');
        this.scene.resources.add(rectTexture);
        this.scene.resources.add(circleTexture);
        this.wallTop = runtime_1.instantiate(Wall);
        this.scene.add(this.wallTop);
        this.wallBottom = runtime_1.instantiate(Wall);
        this.scene.add(this.wallBottom);
        this.wallRight = runtime_1.instantiate(Wall);
        this.wallRight.transform.rotation = Math.PI / 2;
        this.scene.add(this.wallRight);
        this.wallLeft = runtime_1.instantiate(Wall);
        this.wallLeft.transform.rotation = Math.PI / 2;
        this.scene.add(this.wallLeft);
        this.adjustWalls();
        this.gameManager = runtime_1.instantiate(GameManager);
        this.gameManager.scene = this.scene;
        this.scene.add(this.gameManager);
        this.pointerInput.pointerStart$.subscribe(function (e) { return _this.onPointerStart(e); });
        this.browserDelegate.resize$.subscribe(function (e) { return _this.onResize(e); });
    }
    Game.prototype.onPointerStart = function (e) {
        var _this = this;
        e.locations.forEach(function (location) {
            var worldPosition = _this.scene.mainCamera.screenToWorld(location);
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
    Game.prototype.onResize = function (e) {
        this.scene.mainCamera.setSize(this.screen.width, this.screen.height);
        this.adjustWalls();
    };
    Game = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(SceneManager_1.SceneManager)),
        __param(1, Inject_1.Inject(PointerInput_1.PointerInput)),
        __param(2, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __param(3, Inject_1.Inject(Screen_1.Screen)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], Game);
    return Game;
}());
runtime_1.instantiate(Game);
runtime_1.bootstrap().catch(console.error);


/***/ }),

/***/ 21:
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

/***/ 33:
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

/***/ 34:
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
var GameObject_1 = __webpack_require__(2);
var ColliderComponent_1 = __webpack_require__(35);
var Vector_1 = __webpack_require__(1);
var Line_1 = __webpack_require__(33);
var Ray_1 = __webpack_require__(50);
var Projection_1 = __webpack_require__(21);
var CollisionJumpTable_1 = __webpack_require__(19);
var Inject_1 = __webpack_require__(0);
var CircleColliderComponent_1 = __webpack_require__(36);
var Type_1 = __webpack_require__(13);
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
    PolygonColliderComponent.prototype.fixedUpdate = function (alpha) {
        _super.prototype.fixedUpdate.call(this, alpha);
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

/***/ 35:
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
var Bounds_1 = __webpack_require__(30);
var Component_1 = __webpack_require__(10);
var RigidbodyComponent_1 = __webpack_require__(12);
var Vector_1 = __webpack_require__(1);
var Projection_1 = __webpack_require__(21);
var ColliderType_1 = __webpack_require__(55);
var BroadPhaseCollisionResolver_1 = __webpack_require__(42);
var TransformComponent_1 = __webpack_require__(14);
var Subject_1 = __webpack_require__(29);
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

/***/ 36:
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
var GameObject_1 = __webpack_require__(2);
var ColliderComponent_1 = __webpack_require__(35);
var Projection_1 = __webpack_require__(21);
var CollisionJumpTable_1 = __webpack_require__(19);
var Inject_1 = __webpack_require__(0);
var Type_1 = __webpack_require__(13);
var PolygonColliderComponent_1 = __webpack_require__(34);
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
    CircleColliderComponent.prototype.fixedUpdate = function (alpha) {
        _super.prototype.fixedUpdate.call(this, alpha);
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

/***/ 53:
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
var Service_1 = __webpack_require__(3);
var BITMASK32 = 0xFFFFFFFF;
var Random = (function () {
    function Random(seed) {
        if (seed === void 0) { seed = Date.now(); }
        this.seed = seed;
        this._lowerMask = 0x7FFFFFFF;
        this._upperMask = 0x80000000;
        this._w = 32;
        this._n = 624;
        this._m = 397;
        this._a = 0x9908B0DF;
        this._u = 11;
        this._s = 7;
        this._b = 0x9d2c5680;
        this._t = 15;
        this._c = 0xefc60000;
        this._l = 18;
        this._f = 1812433253;
        this._mt = new Array(this._n);
        this._mt[0] = seed >>> 0;
        for (var i = 1; i < this._n; i++) {
            var s = this._mt[i - 1] ^ (this._mt[i - 1] >>> (this._w - 2));
            this._mt[i] = (((this._f * ((s & 0xFFFF0000) >>> 16)) << 16) + (this._f * (s & 0xFFFF)) + i) >>> 0;
        }
        this._index = this._n;
    }
    Random.prototype._twist = function () {
        var mag01 = [0x0, this._a];
        var y = 0;
        for (var i = 0; i < this._n - this._m; i++) {
            y = (this._mt[i] & this._upperMask) | (this._mt[i + 1] & this._lowerMask);
            this._mt[i] = this._mt[i + this._m] ^ (y >>> 1) ^ mag01[y & 0x1] & BITMASK32;
        }
        for (; i < this._n - 1; i++) {
            y = (this._mt[i] & this._upperMask) | (this._mt[i + 1] & this._lowerMask);
            this._mt[i] = this._mt[i + (this._m - this._n)] ^ (y >>> 1) ^ mag01[y & 0x1] & BITMASK32;
        }
        y = (this._mt[this._n - 1] & this._upperMask) | (this._mt[0] & this._lowerMask);
        this._mt[this._n - 1] = this._mt[this._m - 1] ^ (y >>> 1) ^ mag01[y & 0x1] & BITMASK32;
        this._index = 0;
    };
    Random.prototype.nextInt = function () {
        if (this._index >= this._n) {
            this._twist();
        }
        var y = this._mt[this._index++];
        y ^= y >>> this._u;
        y ^= ((y << this._s) & this._b);
        y ^= ((y << this._t) & this._c);
        y ^= (y >>> this._l);
        return y >>> 0;
    };
    Random.prototype.next = function () {
        return this.nextInt() * (1.0 / 4294967296.0);
    };
    Random.prototype.floating = function (min, max) {
        return (max - min) * this.next() + min;
    };
    Random.prototype.integer = function (min, max) {
        return Math.floor((max - min + 1) * this.next() + min);
    };
    Random.prototype.bool = function (likelihood) {
        if (likelihood === void 0) { likelihood = .5; }
        return this.next() <= likelihood;
    };
    Random.prototype.pickOne = function (array) {
        return array[this.integer(0, array.length - 1)];
    };
    Random.prototype.pickSet = function (array, numPicks, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (allowDuplicates) {
            return this._pickSetWithDuplicates(array, numPicks);
        }
        else {
            return this._pickSetWithoutDuplicates(array, numPicks);
        }
    };
    Random.prototype._pickSetWithoutDuplicates = function (array, numPicks) {
        if (numPicks > array.length || numPicks < 0) {
            throw new Error('Invalid number of elements to pick, must pick a value 0 < n <= length');
        }
        if (numPicks === array.length) {
            return array;
        }
        var result = new Array(numPicks);
        var currentPick = 0;
        var tempArray = array.slice(0);
        while (currentPick < numPicks) {
            var index = this.integer(0, tempArray.length - 1);
            result[currentPick++] = tempArray[index];
            tempArray.splice(index, 1);
        }
        return result;
    };
    Random.prototype._pickSetWithDuplicates = function (array, numPicks) {
        if (numPicks < 0) {
            throw new Error('Invalid number of elements to pick, must pick a value 0 <= n < MAX_INT');
        }
        var result = new Array(numPicks);
        for (var i = 0; i < numPicks; i++) {
            result.push(this.pickOne(array));
        }
        return result;
    };
    Random.prototype.shuffle = function (array) {
        var tempArray = array.slice(0);
        var swap = null;
        for (var i = 0; i < tempArray.length - 2; i++) {
            var randomIndex = this.integer(i, tempArray.length - 1);
            swap = tempArray[i];
            tempArray[i] = tempArray[randomIndex];
            tempArray[randomIndex] = swap;
        }
        return tempArray;
    };
    Random.prototype.range = function (length, min, max) {
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = this.integer(min, max);
        }
        return result;
    };
    Random.prototype.d4 = function () {
        return this.integer(1, 4);
    };
    Random.prototype.d6 = function () {
        return this.integer(1, 6);
    };
    Random.prototype.d8 = function () {
        return this.integer(1, 8);
    };
    Random.prototype.d10 = function () {
        return this.integer(1, 10);
    };
    Random.prototype.d12 = function () {
        return this.integer(1, 12);
    };
    Random.prototype.d20 = function () {
        return this.integer(1, 20);
    };
    Random = __decorate([
        Service_1.Service(),
        __metadata("design:paramtypes", [Number])
    ], Random);
    return Random;
}());
exports.Random = Random;


/***/ }),

/***/ 54:
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
var GameObject_1 = __webpack_require__(2);
var Vector_1 = __webpack_require__(1);
var Line_1 = __webpack_require__(33);
var Type_1 = __webpack_require__(13);
var PolygonColliderComponent_1 = __webpack_require__(34);
var Inject_1 = __webpack_require__(0);
var CollisionJumpTable_1 = __webpack_require__(19);
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

/***/ 55:
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