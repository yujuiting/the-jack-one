webpackJsonp([1],{

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

/***/ 36:
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
var Observable_1 = __webpack_require__(2);
var MouseInput_1 = __webpack_require__(37);
var TouchInput_1 = __webpack_require__(38);
var DOM_1 = __webpack_require__(32);
var Vector_1 = __webpack_require__(0);
var Service_1 = __webpack_require__(1);
var PointerInput = (function () {
    function PointerInput(mouseInput, touchInput) {
        this.mouseInput = mouseInput;
        this.touchInput = touchInput;
    }
    Object.defineProperty(PointerInput.prototype, "pointerStart$", {
        get: function () {
            var _this = this;
            return Observable_1.Observable.merge(this.mouseInput.mouseDown$.map(function (e) { return _this.parseMouseEvent(e); }), this.touchInput.touchStart$.map(function (e) { return _this.parseTouchEvent(e); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerInput.prototype, "pointerEnd$", {
        get: function () {
            var _this = this;
            return Observable_1.Observable.merge(this.mouseInput.mouseUp$.map(function (e) { return _this.parseMouseEvent(e); }), this.touchInput.touchEnd$.map(function (e) { return _this.parseTouchEvent(e); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerInput.prototype, "pointerMove$", {
        get: function () {
            var _this = this;
            return Observable_1.Observable.merge(this.mouseInput.mouseMove$.map(function (e) { return _this.parseMouseEvent(e); }), this.touchInput.touchMove$.map(function (e) { return _this.parseTouchEvent(e); }));
        },
        enumerable: true,
        configurable: true
    });
    PointerInput.prototype.parseMouseEvent = function (e) {
        return {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
            locations: [Vector_1.Vector.Get(e.clientX, e.clientY)]
        };
    };
    PointerInput.prototype.parseTouchEvent = function (e) {
        var locations = [];
        DOM_1.listToArray(e.touches).forEach(function (touch) {
            if (touch) {
                locations.push(Vector_1.Vector.Get(touch.clientX, touch.clientY));
            }
        });
        return {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
            locations: locations
        };
    };
    PointerInput = __decorate([
        Service_1.Service(),
        __metadata("design:paramtypes", [MouseInput_1.MouseInput,
            TouchInput_1.TouchInput])
    ], PointerInput);
    return PointerInput;
}());
exports.PointerInput = PointerInput;


/***/ }),

/***/ 37:
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
var MouseInput = (function () {
    function MouseInput(browserDelegate) {
        this.browserDelegate = browserDelegate;
    }
    Object.defineProperty(MouseInput.prototype, "click$", {
        get: function () { return this.browserDelegate.click$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInput.prototype, "mouseMove$", {
        get: function () { return this.browserDelegate.mouseMove$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInput.prototype, "mouseDown$", {
        get: function () { return this.browserDelegate.mouseDown$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInput.prototype, "mouseUp$", {
        get: function () { return this.browserDelegate.mouseUp$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInput.prototype, "wheel$", {
        get: function () { return this.browserDelegate.wheel$; },
        enumerable: true,
        configurable: true
    });
    MouseInput = __decorate([
        Service_1.Service(),
        __metadata("design:paramtypes", [BrowserDelegate_1.BrowserDelegate])
    ], MouseInput);
    return MouseInput;
}());
exports.MouseInput = MouseInput;


/***/ }),

/***/ 38:
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
var TouchInput = (function () {
    function TouchInput(browserDelegate) {
        this.browserDelegate = browserDelegate;
    }
    Object.defineProperty(TouchInput.prototype, "touchStart$", {
        get: function () { return this.browserDelegate.touchStart$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchInput.prototype, "touchEnd$", {
        get: function () { return this.browserDelegate.touchEnd$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchInput.prototype, "touchCancel$", {
        get: function () { return this.browserDelegate.touchCancel$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchInput.prototype, "touchMove$", {
        get: function () { return this.browserDelegate.touchMove$; },
        enumerable: true,
        configurable: true
    });
    TouchInput = __decorate([
        Service_1.Service(),
        __metadata("design:paramtypes", [BrowserDelegate_1.BrowserDelegate])
    ], TouchInput);
    return TouchInput;
}());
exports.TouchInput = TouchInput;


/***/ }),

/***/ 97:
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
var Screen_1 = __webpack_require__(17);
var Camera_1 = __webpack_require__(55);
var runtime_1 = __webpack_require__(14);
var Time_1 = __webpack_require__(28);
var Class_1 = __webpack_require__(8);
var Inject_1 = __webpack_require__(7);
var Sprite_1 = __webpack_require__(33);
var Color_1 = __webpack_require__(6);
var Bounds_1 = __webpack_require__(19);
var Texture_1 = __webpack_require__(31);
var Vector_1 = __webpack_require__(0);
var SpriteRendererComponent_1 = __webpack_require__(35);
var LineRendererComponent_1 = __webpack_require__(15);
var TextRendererComponent_1 = __webpack_require__(34);
var PointerInput_1 = __webpack_require__(36);
var RigidbodyComponent_1 = __webpack_require__(20);
var texture = new Texture_1.Texture('../Assets/circle.png');
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.destination = new Vector_1.Vector();
        _this.moveSpeed = 100;
        _this.isMoving = false;
        return _this;
    }
    Player.prototype.start = function () {
        _super.prototype.start.call(this);
        var sprite = new Sprite_1.Sprite(texture);
        sprite.rect.width = 100;
        sprite.rect.height = 100;
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.renderer.sprite = sprite;
        this.body = this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
    };
    Player.prototype.move = function (destination) {
        this.isMoving = true;
        this.destination.copy(destination);
        this.body.velocity
            .copy(destination)
            .subtract(this.transform.position)
            .normalize()
            .scale(this.moveSpeed);
    };
    Player.prototype.stopMove = function () {
        this.isMoving = false;
        this.body.velocity.reset();
    };
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.isMoving) {
            if (this.transform.position.distanceTo(this.destination) < 10) {
                this.stopMove();
            }
        }
    };
    Player = __decorate([
        Class_1.Class()
    ], Player);
    return Player;
}(GameObject_1.GameObject));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = 300;
        return _this;
    }
    Box.prototype.start = function () {
        _super.prototype.start.call(this);
        var outline = this.addComponent(LineRendererComponent_1.LineRendererComponent);
        var halfSize = this.size / 2;
        outline.addPoint(new Vector_1.Vector(halfSize, halfSize), new Vector_1.Vector(halfSize, -halfSize), new Vector_1.Vector(-halfSize, -halfSize), new Vector_1.Vector(-halfSize, halfSize));
        outline.closePath = true;
        outline.strokeColor = Color_1.Color.White;
    };
    Box = __decorate([
        Class_1.Class()
    ], Box);
    return Box;
}(GameObject_1.GameObject));
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = '';
        return _this;
    }
    Label.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(TextRendererComponent_1.TextRendererComponent);
        this.renderer.text = this.text;
    };
    Label = __decorate([
        Class_1.Class()
    ], Label);
    return Label;
}(GameObject_1.GameObject));
var CameraFollow = (function (_super) {
    __extends(CameraFollow, _super);
    function CameraFollow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bounds = new Bounds_1.Bounds();
        _this.isFollowing = false;
        _this.relative = new Vector_1.Vector();
        return _this;
    }
    CameraFollow.prototype.follow = function (target) { this.target = target; };
    CameraFollow.prototype.update = function () {
        if (!this.target) {
            return;
        }
        var cameraPosition = this.host.transform.position;
        var targetPosition = this.target.transform.position;
        this.bounds.center.copy(cameraPosition);
        if (this.isFollowing) {
            cameraPosition.copy(targetPosition).add(this.relative);
            if (this.bounds.containPoint(targetPosition)) {
                this.isFollowing = false;
            }
        }
        else {
            if (!this.bounds.containPoint(targetPosition)) {
                this.isFollowing = true;
                this.relative.copy(cameraPosition).subtract(targetPosition);
            }
        }
    };
    __decorate([
        Inject_1.Inject(Time_1.Time),
        __metadata("design:type", Time_1.Time)
    ], CameraFollow.prototype, "time", void 0);
    CameraFollow = __decorate([
        Class_1.Class()
    ], CameraFollow);
    return CameraFollow;
}(Component_1.Component));
var Game = (function () {
    function Game(sceneManager, pointerInput, screen) {
        var _this = this;
        this.player = runtime_1.instantiate(Player);
        this.scene = runtime_1.instantiate(Scene_1.Scene);
        this.mainCamera = this.scene.mainCamera;
        this.subCamera = runtime_1.instantiate(Camera_1.Camera);
        this.scene.resources.add(texture);
        this.scene.add(this.player);
        this.scene.add(this.subCamera);
        this.scene.add(runtime_1.instantiate(Box));
        sceneManager.add(this.scene);
        this.mainCamera.backgroundColor = Color_1.Color.CreateByHexRgb('#4A687F');
        var cameraFollow = this.mainCamera.addComponent(CameraFollow);
        cameraFollow.bounds.extents.setTo(50, 50);
        cameraFollow.follow(this.player);
        var halfScreenWidth = screen.width * 0.5;
        this.mainCamera.setSize(halfScreenWidth, screen.height);
        this.subCamera.setSize(halfScreenWidth, screen.height);
        this.subCamera.rect.position.setTo(halfScreenWidth, 0);
        pointerInput.pointerStart$.subscribe(function (e) { return _this.onPointerStart(e); });
        var mainCameraLabel = runtime_1.instantiate(Label);
        mainCameraLabel.text = 'Main Camera, click to move';
        mainCameraLabel.layer = 1 << 10;
        this.scene.add(mainCameraLabel);
        this.mainCamera.cullingMask = this.mainCamera.cullingMask | mainCameraLabel.layer;
        var subCameraLabel = runtime_1.instantiate(Label);
        subCameraLabel.text = 'Sub Camera';
        subCameraLabel.layer = 1 << 11;
        this.scene.add(subCameraLabel);
        this.subCamera.cullingMask = this.subCamera.cullingMask | subCameraLabel.layer;
    }
    Game.prototype.onPointerStart = function (e) {
        var location = e.locations[0];
        var halfScreenWidth = screen.width * 0.5;
        if (location.x > halfScreenWidth) {
            return;
        }
        var worldPosition = this.mainCamera.screenToWorld(location);
        this.player.move(worldPosition);
    };
    Game = __decorate([
        Class_1.Class(),
        __metadata("design:paramtypes", [SceneManager_1.SceneManager,
            PointerInput_1.PointerInput,
            Screen_1.Screen])
    ], Game);
    return Game;
}());
runtime_1.instantiate(Game);
runtime_1.bootstrap().catch(console.error);


/***/ })

},[97]);
//# sourceMappingURL=manage-cameras.bundle.js.map