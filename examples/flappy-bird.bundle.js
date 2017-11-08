webpackJsonp([0],{

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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(27);
var runtime_1 = __webpack_require__(11);
runtime_1.def(runtime_1.DEBUG);
runtime_1.def(runtime_1.DEBUG_PHYSICS);
var World_1 = __webpack_require__(126);
runtime_1.instantiate(World_1.World);
runtime_1.bootstrap();


/***/ }),

/***/ 126:
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(4);
var runtime_1 = __webpack_require__(11);
var Class_1 = __webpack_require__(6);
var Scene_1 = __webpack_require__(32);
var SceneManager_1 = __webpack_require__(18);
var PointerInput_1 = __webpack_require__(41);
var KeyboardInput_1 = __webpack_require__(40);
var Inject_1 = __webpack_require__(0);
var Vector_1 = __webpack_require__(1);
var Screen_1 = __webpack_require__(17);
var resource_1 = __webpack_require__(43);
var Bird_1 = __webpack_require__(127);
var Pipe_1 = __webpack_require__(128);
var Background_1 = __webpack_require__(129);
var Random_1 = __webpack_require__(53);
var kPipeDistance = 500;
var kPipeRandamRange = 300;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Init"] = 0] = "Init";
    GameStatus[GameStatus["Playing"] = 1] = "Playing";
    GameStatus[GameStatus["Over"] = 2] = "Over";
})(GameStatus || (GameStatus = {}));
var World = (function () {
    function World(sceneManager, pointerInput, keyboardInput, screen, random) {
        var _this = this;
        this.random = random;
        this.scene = runtime_1.instantiate(Scene_1.Scene);
        this.camera = this.scene.mainCamera;
        this.startPosition = new Vector_1.Vector();
        this.status = GameStatus.Init;
        this.pipes = [
            runtime_1.instantiate(Pipe_1.Pipe),
            runtime_1.instantiate(Pipe_1.Pipe),
            runtime_1.instantiate(Pipe_1.Pipe),
            runtime_1.instantiate(Pipe_1.Pipe)
        ];
        this.bird = runtime_1.instantiate(Bird_1.Bird);
        this.background = runtime_1.instantiate(Background_1.Background);
        sceneManager.add(this.scene);
        this.scene.resources.add(resource_1.birdTexture);
        this.scene.resources.add(resource_1.pipeTexture);
        this.scene.resources.add(resource_1.backgroundTexture);
        this.scene.resources.add(resource_1.groundTexture);
        this.startPosition.setTo(-screen.width / 4, 0);
        this.scene.add(this.background);
        this.scene.add(this.bird, this.startPosition);
        this.reset(true);
        Observable_1.Observable.merge(this.bird.onBecameInvisible$, this.bird.onDie$).subscribe(function () { return _this.onGameOver(); });
        Observable_1.Observable.merge(pointerInput.pointerStart$, keyboardInput.keyDown$.filter(function (e) { return e.key === ' '; })).subscribe(function () { return _this.onTouch(); });
    }
    World.prototype.start = function () {
        this.status = GameStatus.Playing;
        this.pipes.forEach(function (pipe) { return pipe.startMove(); });
        this.bird.isFalling = true;
    };
    World.prototype.reset = function (init) {
        var _this = this;
        if (init === void 0) { init = false; }
        this.bird.isFalling = false;
        this.bird.transform.position.copy(this.startPosition);
        this.pipes.forEach(function (pipe, index) {
            pipe.onBecameInvisible$.subscribe(function () { return _this.onPipeBecameInvisible(pipe, index); });
            pipe.transform.position.setTo((index + 1) * kPipeDistance, _this.random.integer(-kPipeDistance, kPipeDistance));
            if (init) {
                _this.scene.add(pipe);
            }
            else {
                pipe.stopMove();
            }
        });
    };
    World.prototype.onPipeBecameInvisible = function (pipe, index) {
        var prevIndex = index - 1;
        if (prevIndex < 0) {
            prevIndex += this.pipes.length;
        }
        var prevPipe = this.pipes[prevIndex];
        pipe.transform.position.x = prevPipe.transform.position.x + kPipeDistance;
        pipe.transform.position.y = this.random.integer(-kPipeDistance, kPipeDistance);
    };
    World.prototype.onGameOver = function () {
        this.status = GameStatus.Over;
        this.reset();
    };
    World.prototype.onTouch = function () {
        switch (this.status) {
            case GameStatus.Init:
                this.start();
                break;
            case GameStatus.Over:
                break;
            case GameStatus.Playing:
            default:
                this.bird.fly();
                break;
        }
    };
    World = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(SceneManager_1.SceneManager)),
        __param(1, Inject_1.Inject(PointerInput_1.PointerInput)),
        __param(2, Inject_1.Inject(KeyboardInput_1.KeyboardInput)),
        __param(3, Inject_1.Inject(Screen_1.Screen)),
        __param(4, Inject_1.Inject(Random_1.Random)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Random_1.Random])
    ], World);
    return World;
}());
exports.World = World;


/***/ }),

/***/ 127:
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
var GameObject_1 = __webpack_require__(2);
var Class_1 = __webpack_require__(6);
var RigidbodyComponent_1 = __webpack_require__(12);
var CircleColliderComponent_1 = __webpack_require__(36);
var Vector_1 = __webpack_require__(1);
var SpriteSheetRendererComponent_1 = __webpack_require__(56);
var SpriteSheet_1 = __webpack_require__(57);
var resource_1 = __webpack_require__(43);
var ForceMode_1 = __webpack_require__(25);
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.body = _this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        _this.collider = _this.addComponent(CircleColliderComponent_1.CircleColliderComponent);
        _this.renderer = _this.addComponent(SpriteSheetRendererComponent_1.SpriteSheetRendererComponent);
        _this.isFalling = false;
        return _this;
    }
    Bird_1 = Bird;
    Object.defineProperty(Bird.prototype, "onBecameInvisible$", {
        get: function () { return this.renderer.onBecameInvisible$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bird.prototype, "onDie$", {
        get: function () { return this.collider.onTrigger$; },
        enumerable: true,
        configurable: true
    });
    Bird.prototype.start = function () {
        _super.prototype.start.call(this);
        this.collider.radius = 100;
        this.collider.isTigger = true;
        this.renderer.spriteSheet = new SpriteSheet_1.SpriteSheet(resource_1.birdTexture, [
            { x: 0, y: 0, width: 210, height: 200 },
            { x: 210, y: 0, width: 210, height: 200 },
            { x: 420, y: 0, width: 210, height: 200 }
        ], 6);
        this.transform.scale.setTo(0.5);
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
    };
    Bird.FlyVelocity = new Vector_1.Vector(0, 500);
    Bird.Gravity = new Vector_1.Vector(0, -800);
    Bird = Bird_1 = __decorate([
        Class_1.Class()
    ], Bird);
    return Bird;
    var Bird_1;
}(GameObject_1.GameObject));
exports.Bird = Bird;


/***/ }),

/***/ 128:
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
var Class_1 = __webpack_require__(6);
var GameObject_1 = __webpack_require__(2);
var SpriteRendererComponent_1 = __webpack_require__(20);
var Sprite_1 = __webpack_require__(16);
var resource_1 = __webpack_require__(43);
var runtime_1 = __webpack_require__(11);
var RigidbodyComponent_1 = __webpack_require__(12);
var BoxColliderComponent_1 = __webpack_require__(54);
var PipeObject = (function (_super) {
    __extends(PipeObject, _super);
    function PipeObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderer = _this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        _this.collider = _this.addComponent(BoxColliderComponent_1.BoxColliderComponent);
        return _this;
    }
    PipeObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.pipeTexture);
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.upper = runtime_1.instantiate(PipeObject);
        _this.lower = runtime_1.instantiate(PipeObject);
        _this.body = _this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        return _this;
    }
    Object.defineProperty(Pipe.prototype, "onBecameInvisible$", {
        get: function () { return this.upper.renderer.onBecameInvisible$; },
        enumerable: true,
        configurable: true
    });
    Pipe.prototype.start = function () {
        _super.prototype.start.call(this);
        this.upper.transform.localScale.setTo(1, -1);
        this.upper.transform.position.setTo(0, 700);
        this.lower.transform.position.setTo(0, -700);
        this.addChild(this.upper);
        this.addChild(this.lower);
    };
    Pipe.prototype.startMove = function () {
        this.body.velocity.setTo(-50, 0);
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

/***/ 129:
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
var Class_1 = __webpack_require__(6);
var GameObject_1 = __webpack_require__(2);
var SpriteRendererComponent_1 = __webpack_require__(20);
var Sprite_1 = __webpack_require__(16);
var resource_1 = __webpack_require__(43);
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderer = _this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        return _this;
    }
    Background.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer.sprite = new Sprite_1.Sprite(resource_1.backgroundTexture);
        this.transform.scale.setTo(3);
    };
    Background = __decorate([
        Class_1.Class()
    ], Background);
    return Background;
}(GameObject_1.GameObject));
exports.Background = Background;


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

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Texture_1 = __webpack_require__(26);
exports.birdTexture = new Texture_1.Texture('../assets/flappy-bird/bird.png');
exports.pipeTexture = new Texture_1.Texture('../assets/flappy-bird/pipe.png');
exports.backgroundTexture = new Texture_1.Texture('../assets/flappy-bird/background.png');
exports.groundTexture = new Texture_1.Texture('../assets/flappy-bird/ground.png');


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
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteRendererComponent_1 = __webpack_require__(20);
var Time_1 = __webpack_require__(9);
var UniqueComponent_1 = __webpack_require__(15);
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
        this.accumulator += this.time.deltaTime;
        if (this.accumulator > this._spriteSheet.frameTime) {
            var times = (this.accumulator / this._spriteSheet.frameTime) | 0;
            this.accumulator %= this._spriteSheet.frameTime;
            this.currentIndex += times;
            if (this.currentIndex >= this.sprites.length) {
                this.currentIndex = 0;
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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sprite_1 = __webpack_require__(16);
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
            var sprite = new Sprite_1.Sprite(texture);
            sprite.rect.position.setTo(cell.x || 0, cell.y || 0);
            sprite.rect.width = cell.width;
            sprite.rect.height = cell.height;
            sprites.push(sprite);
        });
        return sprites;
    };
    return SpriteSheet;
}());
exports.SpriteSheet = SpriteSheet;


/***/ })

},[125]);
//# sourceMappingURL=flappy-bird.bundle.js.map