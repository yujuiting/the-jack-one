webpackJsonp([3],{

/***/ 119:
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
__webpack_require__(26);
var runtime_1 = __webpack_require__(12);
runtime_1.def(runtime_1.DEBUG);
var GameObject_1 = __webpack_require__(6);
var Scene_1 = __webpack_require__(33);
var SceneManager_1 = __webpack_require__(15);
var Class_1 = __webpack_require__(9);
var KeyboardInput_1 = __webpack_require__(39);
var Sprite_1 = __webpack_require__(23);
var SpriteSheet_1 = __webpack_require__(120);
var Texture_1 = __webpack_require__(22);
var Inject_1 = __webpack_require__(0);
var LineRendererComponent_1 = __webpack_require__(25);
var Vector_1 = __webpack_require__(1);
var Color_1 = __webpack_require__(7);
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderer = _this.addComponent(LineRendererComponent_1.LineRendererComponent);
        return _this;
    }
    Subject = __decorate([
        Class_1.Class()
    ], Subject);
    return Subject;
}(GameObject_1.GameObject));
var World = (function () {
    function World(sceneManager, keyboardInput) {
        var scene = runtime_1.instantiate(Scene_1.Scene);
        sceneManager.add(scene);
        var texture = new Texture_1.Texture('/Assets/flappy-bird/bird.png');
        var sprite = new Sprite_1.Sprite(texture);
        sprite.rect.position.setTo(0, 0);
        sprite.rect.width = 210;
        sprite.rect.height = 200;
        var spritesheet = new SpriteSheet_1.SpriteSheet(texture, [
            { x: 0, y: 0, width: 210, height: 200 },
            { x: 210, y: 0, width: 210, height: 200 },
            { x: 420, y: 0, width: 210, height: 200 }
        ], 6);
        scene.resources.add(texture);
        var subject = runtime_1.instantiate(Subject);
        subject.renderer.addPoint(new Vector_1.Vector(100, 100), new Vector_1.Vector(100, -100), new Vector_1.Vector(-100, -100), new Vector_1.Vector(-100, 100));
        subject.renderer.closePath = true;
        subject.renderer.strokeColor = Color_1.Color.Blue;
        subject.transform.position.setTo(100, 0);
        scene.add(subject);
        var onKeyDown$ = keyboardInput.keyDown$.map(function (e) { return e.key; });
        onKeyDown$.filter(function (code) { return code === 'w'; }).subscribe(function () { return subject.transform.position.y += 10; });
        onKeyDown$.filter(function (code) { return code === 's'; }).subscribe(function () { return subject.transform.position.y -= 10; });
        onKeyDown$.filter(function (code) { return code === 'd'; }).subscribe(function () { return subject.transform.position.x += 10; });
        onKeyDown$.filter(function (code) { return code === 'a'; }).subscribe(function () { return subject.transform.position.x -= 10; });
        onKeyDown$.filter(function (code) { return code === 'q'; }).subscribe(function () { return subject.transform.rotation += Math.PI / 6; });
        onKeyDown$.filter(function (code) { return code === 'e'; }).subscribe(function () { return subject.transform.rotation -= Math.PI / 6; });
        onKeyDown$.filter(function (code) { return code === 'c'; }).subscribe(function () { return subject.transform.scale.add(0.1); });
        onKeyDown$.filter(function (code) { return code === 'z'; }).subscribe(function () { return subject.transform.scale.add(-0.1); });
    }
    World = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(SceneManager_1.SceneManager)),
        __param(1, Inject_1.Inject(KeyboardInput_1.KeyboardInput)),
        __metadata("design:paramtypes", [Object, Object])
    ], World);
    return World;
}());
runtime_1.instantiate(World);
runtime_1.bootstrap().catch(console.error);


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sprite_1 = __webpack_require__(23);
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


/***/ }),

/***/ 25:
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
var RendererComponent_1 = __webpack_require__(8);
var Color_1 = __webpack_require__(7);
var ArrayUtility_1 = __webpack_require__(5);
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


/***/ })

},[119]);
//# sourceMappingURL=test.bundle.js.map