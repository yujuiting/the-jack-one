webpackJsonp([2],{

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
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(4);
var RendererComponent_1 = __webpack_require__(12);
var Color_1 = __webpack_require__(6);
var BrowserDelegate_1 = __webpack_require__(3);
var Class_1 = __webpack_require__(8);
var TextRendererComponent = (function (_super) {
    __extends(TextRendererComponent, _super);
    function TextRendererComponent(host, browserDelegate) {
        var _this = _super.call(this, host) || this;
        _this.text = '';
        _this.maxWidth = Number.MAX_VALUE;
        _this.fillColor = Color_1.Color.White;
        _this.fontSize = 16;
        _this.fontFamily = 'Arial';
        _this.fontWeight = 100;
        _this.fontStyle = 'normal';
        _this.fontVariant = 'normal';
        _this.actualWidth = 0;
        _this.canvas = browserDelegate.createCanvas();
        _this.ctx = _this.canvas.getContext('2d');
        return _this;
    }
    TextRendererComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.calculateBounds();
    };
    TextRendererComponent.prototype.render = function (ctx, toScreenMatrix) {
        ctx.save();
        var m = toScreenMatrix.clone().multiply(this.transform.toWorldMatrix);
        m.setScaling(1, -1);
        ctx.transform(m[0][0], m[0][1], m[1][0], m[1][1], m[0][2], m[1][2]);
        this.actualWidth = ctx.measureText(this.text).width;
        ctx.font = this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor.toHexString();
            ctx.strokeText(this.text, -this.actualWidth * 0.5, this.fontSize * 0.5, this.maxWidth);
        }
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor.toHexString();
            ctx.fillText(this.text, -this.actualWidth * 0.5, this.fontSize * 0.5, this.maxWidth);
        }
        ctx.restore();
    };
    TextRendererComponent.prototype.calculateBounds = function () {
        var halfWidth = this.actualWidth * 0.5;
        var halfHeight = this.fontSize * 0.5;
        this.bounds.extents.setTo(halfWidth, halfHeight);
        this.bounds.center
            .copy(this.transform.position);
    };
    TextRendererComponent = __decorate([
        Class_1.Class(),
        __metadata("design:paramtypes", [GameObject_1.GameObject,
            BrowserDelegate_1.BrowserDelegate])
    ], TextRendererComponent);
    return TextRendererComponent;
}(RendererComponent_1.RendererComponent));
exports.TextRendererComponent = TextRendererComponent;


/***/ }),

/***/ 67:
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
__webpack_require__(21);
var GameObject_1 = __webpack_require__(4);
var Component_1 = __webpack_require__(11);
var Scene_1 = __webpack_require__(30);
var SceneManager_1 = __webpack_require__(18);
var runtime_1 = __webpack_require__(14);
var Class_1 = __webpack_require__(8);
var Inject_1 = __webpack_require__(7);
var Texture_1 = __webpack_require__(31);
var Sprite_1 = __webpack_require__(33);
var Color_1 = __webpack_require__(6);
var Vector_1 = __webpack_require__(0);
var TextRendererComponent_1 = __webpack_require__(34);
var SpriteRendererComponent_1 = __webpack_require__(35);
var LineRendererComponent_1 = __webpack_require__(15);
var RigidbodyComponent_1 = __webpack_require__(20);
var KeyboardInput_1 = __webpack_require__(97);
var texture = new Texture_1.Texture('../Assets/circle.png');
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
        this.body.velocity.normalize().scale(this.speed);
    };
    __decorate([
        Inject_1.Inject(KeyboardInput_1.KeyboardInput),
        __metadata("design:type", KeyboardInput_1.KeyboardInput)
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
        sprite.rect.width = 100;
        sprite.rect.height = 100;
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
        __metadata("design:paramtypes", [SceneManager_1.SceneManager])
    ], Game);
    return Game;
}());
runtime_1.instantiate(Game);
runtime_1.bootstrap().catch(console.error);


/***/ }),

/***/ 97:
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
var BrowserDelegate_1 = __webpack_require__(3);
var Service_1 = __webpack_require__(1);
var KeyboardInput = (function () {
    function KeyboardInput(browserDelegate) {
        this.browserDelegate = browserDelegate;
    }
    Object.defineProperty(KeyboardInput.prototype, "keyDown$", {
        get: function () { return this.browserDelegate.keyDown$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardInput.prototype, "keyUp$", {
        get: function () { return this.browserDelegate.keyUp$; },
        enumerable: true,
        configurable: true
    });
    KeyboardInput = __decorate([
        Service_1.Service(),
        __metadata("design:paramtypes", [BrowserDelegate_1.BrowserDelegate])
    ], KeyboardInput);
    return KeyboardInput;
}());
exports.KeyboardInput = KeyboardInput;


/***/ })

},[67]);
//# sourceMappingURL=control-camera.bundle.js.map