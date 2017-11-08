webpackJsonp([4],{

/***/ 124:
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
runtime_1.def(runtime_1.DEBUG_RENDERER);
var GameObject_1 = __webpack_require__(2);
var Scene_1 = __webpack_require__(32);
var SceneManager_1 = __webpack_require__(18);
var Class_1 = __webpack_require__(6);
var KeyboardInput_1 = __webpack_require__(40);
var SpriteSheetRendererComponent_1 = __webpack_require__(56);
var Sprite_1 = __webpack_require__(16);
var SpriteSheet_1 = __webpack_require__(57);
var Texture_1 = __webpack_require__(26);
var Inject_1 = __webpack_require__(0);
var Logger_1 = __webpack_require__(48);
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderer = _this.addComponent(SpriteSheetRendererComponent_1.SpriteSheetRendererComponent);
        return _this;
    }
    Subject = __decorate([
        Class_1.Class()
    ], Subject);
    return Subject;
}(GameObject_1.GameObject));
var World = (function () {
    function World(sceneManager, keyboardInput, logger) {
        var scene = runtime_1.instantiate(Scene_1.Scene);
        sceneManager.add(scene);
        var texture = new Texture_1.Texture('/Assets/flappy-bird/bird.png');
        var sprite = new Sprite_1.Sprite(texture);
        sprite.rect.position.reset(0, 0);
        sprite.rect.width = 210;
        sprite.rect.height = 200;
        var spritesheet = new SpriteSheet_1.SpriteSheet(texture, [
            { x: 0, y: 0, width: 210, height: 200 },
            { x: 210, y: 0, width: 210, height: 200 },
            { x: 420, y: 0, width: 210, height: 200 }
        ], 6);
        scene.resources.add(texture);
        var subject = runtime_1.instantiate(Subject);
        subject.renderer.spriteSheet = spritesheet;
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
        onKeyDown$.subscribe(function (key) { return logger.log("key down: " + key); });
    }
    World = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(SceneManager_1.SceneManager)),
        __param(1, Inject_1.Inject(KeyboardInput_1.KeyboardInput)),
        __param(2, Inject_1.Inject(Logger_1.Logger)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], World);
    return World;
}());
runtime_1.instantiate(World);
runtime_1.bootstrap().catch(console.error);


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

},[124]);
//# sourceMappingURL=test.bundle.js.map