webpackJsonp([3],{

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
Object.defineProperty(exports, "__esModule", { value: true });
var RendererComponent_1 = __webpack_require__(24);
var Color_1 = __webpack_require__(8);
var Class_1 = __webpack_require__(6);
var TextRendererComponent = (function (_super) {
    __extends(TextRendererComponent, _super);
    function TextRendererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = '';
        _this.maxWidth = Number.MAX_VALUE;
        _this.fillColor = Color_1.Color.White;
        _this.fontSize = 16;
        _this.fontFamily = 'Arial';
        _this.fontWeight = 100;
        _this.fontStyle = 'normal';
        _this.fontVariant = 'normal';
        _this.actualWidth = 0;
        return _this;
    }
    TextRendererComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.ctx.font = this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
        this.actualWidth = this.ctx.measureText(this.text).width;
        this.canvas.width = this.actualWidth;
        this.canvas.height = this.fontSize;
    };
    TextRendererComponent.prototype.render = function () {
        var ctx = this.ctx;
        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor.toHexString();
            ctx.strokeText(this.text, 0, this.fontSize, this.maxWidth);
        }
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor.toHexString();
            ctx.fillText(this.text, 0, this.fontSize, this.maxWidth);
        }
    };
    TextRendererComponent = __decorate([
        Class_1.Class()
    ], TextRendererComponent);
    return TextRendererComponent;
}(RendererComponent_1.RendererComponent));
exports.TextRendererComponent = TextRendererComponent;


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
Object.defineProperty(exports, "__esModule", { value: true });
var RendererComponent_1 = __webpack_require__(24);
var Color_1 = __webpack_require__(8);
var ArrayUtility_1 = __webpack_require__(7);
var LineRendererComponent = (function (_super) {
    __extends(LineRendererComponent, _super);
    function LineRendererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lineWidth = 1;
        _this.strokeColor = Color_1.Color.Red;
        _this.closePath = false;
        _this._points = [];
        return _this;
    }
    LineRendererComponent.prototype.points = function () { return this._points; };
    LineRendererComponent.prototype.addPoint = function () {
        var _this = this;
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        points.forEach(function (point) { return ArrayUtility_1.addToArray(_this._points, point); });
    };
    LineRendererComponent.prototype.removePoint = function () {
        var _this = this;
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        points.forEach(function (point) { return ArrayUtility_1.removeFromArray(_this._points, point); });
    };
    LineRendererComponent.prototype.clearPoints = function () {
        this._points.forEach(function (point) { return point.destroy(); });
        this._points.splice(0, this._points.length);
    };
    LineRendererComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        var minX = Number.MAX_VALUE;
        var maxX = -Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = -Number.MAX_VALUE;
        this._points.forEach(function (point) {
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.y < minY) {
                minY = point.y;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
        });
        this.canvas.width = maxX - minX + this.lineWidth * 2;
        this.canvas.height = maxY - minX + this.lineWidth * 2;
    };
    LineRendererComponent.prototype.render = function () {
        var count = this._points.length;
        if (count === 0) {
            return;
        }
        var ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.save();
        ctx.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
        var firstPoint = this._points[0];
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (var i = 1; i < count; i++) {
            var point = this._points[i];
            ctx.lineTo(point.x, point.y);
        }
        if (this.closePath) {
            ctx.lineTo(firstPoint.x, firstPoint.y);
        }
        ctx.closePath();
        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor.toHexString();
            ctx.stroke();
        }
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor.toHexString();
            ctx.fill();
        }
        ctx.restore();
    };
    return LineRendererComponent;
}(RendererComponent_1.RendererComponent));
exports.LineRendererComponent = LineRendererComponent;


/***/ }),

/***/ 77:
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
var GameObject_1 = __webpack_require__(2);
var Component_1 = __webpack_require__(10);
var Scene_1 = __webpack_require__(32);
var SceneManager_1 = __webpack_require__(18);
var runtime_1 = __webpack_require__(11);
var Class_1 = __webpack_require__(6);
var Inject_1 = __webpack_require__(0);
var Texture_1 = __webpack_require__(26);
var Sprite_1 = __webpack_require__(16);
var Color_1 = __webpack_require__(8);
var Vector_1 = __webpack_require__(1);
var TextRendererComponent_1 = __webpack_require__(51);
var SpriteRendererComponent_1 = __webpack_require__(20);
var LineRendererComponent_1 = __webpack_require__(52);
var RigidbodyComponent_1 = __webpack_require__(12);
var KeyboardInput_1 = __webpack_require__(40);
var texture = new Texture_1.Texture('../assets/circle.png');
var CameraController = (function (_super) {
    __extends(CameraController, _super);
    function CameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMovingUp = false;
        _this.isMovingDown = false;
        _this.isMovingRight = false;
        _this.isMovingLeft = false;
        _this.speed = 100;
        return _this;
    }
    CameraController.prototype.start = function () {
        var _this = this;
        this.body = this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        this.description = this.addComponent(TextRendererComponent_1.TextRendererComponent);
        this.description.text = '← ↑ → ↓';
        this.description.fillColor = Color_1.Color.White;
        this.outline = this.addComponent(LineRendererComponent_1.LineRendererComponent);
        this.outline.addPoint(new Vector_1.Vector(100, 100), new Vector_1.Vector(100, -100), new Vector_1.Vector(-100, -100), new Vector_1.Vector(-100, 100));
        this.outline.closePath = true;
        this.outline.strokeColor = Color_1.Color.White;
        var keyDown$ = this.keyboardInput.keyDown$.map(function (e) { return e.key; });
        var keyUp$ = this.keyboardInput.keyUp$.map(function (e) { return e.key; });
        keyDown$.filter(function (key) { return key === 'ArrowUp'; }).subscribe(function () { return _this.isMovingUp = true; });
        keyUp$.filter(function (key) { return key === 'ArrowUp'; }).subscribe(function () { return _this.isMovingUp = false; });
        keyDown$.filter(function (key) { return key === 'ArrowDown'; }).subscribe(function () { return _this.isMovingDown = true; });
        keyUp$.filter(function (key) { return key === 'ArrowDown'; }).subscribe(function () { return _this.isMovingDown = false; });
        keyDown$.filter(function (key) { return key === 'ArrowRight'; }).subscribe(function () { return _this.isMovingRight = true; });
        keyUp$.filter(function (key) { return key === 'ArrowRight'; }).subscribe(function () { return _this.isMovingRight = false; });
        keyDown$.filter(function (key) { return key === 'ArrowLeft'; }).subscribe(function () { return _this.isMovingLeft = true; });
        keyUp$.filter(function (key) { return key === 'ArrowLeft'; }).subscribe(function () { return _this.isMovingLeft = false; });
    };
    CameraController.prototype.update = function () {
        this.body.velocity.reset();
        if (this.isMovingUp) {
            this.body.velocity.add(0, this.speed);
        }
        if (this.isMovingDown) {
            this.body.velocity.add(0, -this.speed);
        }
        if (this.isMovingRight) {
            this.body.velocity.add(this.speed, 0);
        }
        if (this.isMovingLeft) {
            this.body.velocity.add(-this.speed, 0);
        }
        this.body.velocity.normalize().multiply(this.speed);
    };
    __decorate([
        Inject_1.Inject(KeyboardInput_1.KeyboardInput),
        __metadata("design:type", Object)
    ], CameraController.prototype, "keyboardInput", void 0);
    CameraController = __decorate([
        Class_1.Class()
    ], CameraController);
    return CameraController;
}(Component_1.Component));
var Jack = (function (_super) {
    __extends(Jack, _super);
    function Jack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Jack.prototype.start = function () {
        _super.prototype.start.call(this);
        var sprite = new Sprite_1.Sprite(texture);
        this.transform.scale.setTo(0.25);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.renderer.sprite = sprite;
    };
    Jack = __decorate([
        Class_1.Class()
    ], Jack);
    return Jack;
}(GameObject_1.GameObject));
var Game = (function () {
    function Game(sceneManager) {
        this.scene = runtime_1.instantiate(Scene_1.Scene);
        this.camera = this.scene.mainCamera;
        this.scene.resources.add(texture);
        sceneManager.add(this.scene);
        this.camera.backgroundColor = Color_1.Color.CreateByHexRgb('#4A687F');
        this.camera.addComponent(CameraController);
        this.scene.add(runtime_1.instantiate(Jack));
    }
    Game = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(SceneManager_1.SceneManager)),
        __metadata("design:paramtypes", [Object])
    ], Game);
    return Game;
}());
runtime_1.instantiate(Game);
runtime_1.bootstrap().catch(console.error);


/***/ })

},[77]);
//# sourceMappingURL=control-camera.bundle.js.map