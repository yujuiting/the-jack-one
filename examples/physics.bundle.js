webpackJsonp([0],{

/***/ 100:
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
var Service_1 = __webpack_require__(1);
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

/***/ 101:
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
var GameObject_1 = __webpack_require__(4);
var Vector_1 = __webpack_require__(0);
var Line_1 = __webpack_require__(61);
var Type_1 = __webpack_require__(10);
var PolygonColliderComponent_1 = __webpack_require__(62);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var BoxColliderComponent = (function (_super) {
    __extends(BoxColliderComponent, _super);
    function BoxColliderComponent(host) {
        var _this = _super.call(this, host) || this;
        _this.size = new Vector_1.Vector();
        for (var i = 0; i < 4; i++) {
            _this.points.push(new Vector_1.Vector());
            _this._cachedPoints.push(new Vector_1.Vector());
            _this._cachedAxes.push(new Vector_1.Vector());
            _this._cachedSides.push(new Line_1.Line(new Vector_1.Vector(), new Vector_1.Vector()));
        }
        return _this;
    }
    BoxColliderComponent.prototype.calculate = function () {
        var toWorldMatrix = this.host.transform.toWorldMatrix;
        var halfSizeX = this.size.x / 2;
        var halfSizeY = this.size.y / 2;
        this.points[0].setTo(-halfSizeX, -halfSizeY);
        this.points[1].setTo(halfSizeX, -halfSizeY);
        this.points[2].setTo(halfSizeX, halfSizeY);
        this.points[3].setTo(-halfSizeX, halfSizeY);
        this._cachedPoints[0].setTo(-halfSizeX, -halfSizeY);
        this._cachedPoints[1].setTo(halfSizeX, -halfSizeY);
        this._cachedPoints[2].setTo(halfSizeX, halfSizeY);
        this._cachedPoints[3].setTo(-halfSizeX, halfSizeY);
        this._cachedPoints.forEach(function (point) { return toWorldMatrix.multiplyToPoint(point); });
        for (var i = 0; i < 4; i++) {
            var p1 = this._cachedPoints[i];
            var p2 = this._cachedPoints[(i + 1) % 4];
            var axis = this._cachedAxes[i];
            var side = this._cachedSides[i];
            axis.copy(p1).subtract(p2);
            side.begin.copy(p1);
            side.end.copy(p2);
        }
        var x = this._cachedPoints.map(function (p) { return p.x; });
        var y = this._cachedPoints.map(function (p) { return p.y; });
        var minX = Math.min.apply(Math, x);
        var minY = Math.min.apply(Math, y);
        var maxX = Math.max.apply(Math, x);
        var maxY = Math.max.apply(Math, y);
        this.bounds.center.setTo((maxX + minX) / 2, (maxY + minY) / 2);
        this.bounds.extents.setTo((maxX - minX) / 2, (maxY - minY) / 2);
    };
    return BoxColliderComponent;
}(PolygonColliderComponent_1.PolygonColliderComponent));
exports.BoxColliderComponent = BoxColliderComponent;


/***/ }),

/***/ 102:
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

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(0);
var Ray = (function () {
    function Ray(origin, direction) {
        if (origin === void 0) { origin = new Vector_1.Vector(); }
        if (direction === void 0) { direction = new Vector_1.Vector(); }
        this.origin = origin;
        this.direction = direction;
        this.direction.normalize();
    }
    Ray.prototype.getPoint = function (distance) {
        return this.direction.clone().scale(distance).add(this.origin);
    };
    Ray.prototype.intersect = function (another) {
        var p = this.origin;
        var r = this.direction;
        var q;
        var s;
        var l = 0;
        if (another instanceof Ray) {
            q = another.origin;
            s = another.direction;
        }
        else {
            q = another.begin;
            s = another.getDirection();
            l = another.length;
        }
        var pq = q.clone().subtract(p);
        var r_x_s = r.cross(s);
        var pq_x_r = pq.cross(r);
        if (r_x_s === 0) {
            return -1;
        }
        else {
            var t = pq.cross(s) / r_x_s;
            var u = pq_x_r / r_x_s;
            if (l && u > l) {
                return -1;
            }
            if (u >= 0 && t >= 0) {
                return t;
            }
        }
        return -1;
    };
    return Ray;
}());
exports.Ray = Ray;


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(0);
var ForceMode_1 = __webpack_require__(59);
var CollisionContact = (function () {
    function CollisionContact(colliderA, colliderB, mtv, point, normal) {
        this.colliderA = colliderA;
        this.colliderB = colliderB;
        this.mtv = mtv;
        this.point = point;
        this.normal = normal;
        this._canRecycle = false;
        this._resolved = false;
    }
    Object.defineProperty(CollisionContact.prototype, "canRecycle", {
        get: function () { return this._canRecycle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionContact.prototype, "resolved", {
        get: function () { return this._resolved; },
        enumerable: true,
        configurable: true
    });
    CollisionContact.prototype.resolve = function () {
        if (this._resolved) {
            return;
        }
        var a = this.colliderA;
        var b = this.colliderB;
        var bodyA = a.rigidbody;
        var bodyB = b.rigidbody;
        var shouldAwakeBodyA = bodyB ? !bodyB.isSleeping : false;
        var shouldAwakeBodyB = bodyA ? !bodyA.isSleeping : false;
        if (!bodyA && !bodyB) {
            return;
        }
        var velocityA = bodyA ? bodyA.velocity : Vector_1.Vector.Zero;
        var velocityB = bodyB ? bodyB.velocity : Vector_1.Vector.Zero;
        var angularVelocityA = bodyA ? bodyA.angularVelocity : 0;
        var angularVelocityB = bodyB ? bodyB.angularVelocity : 0;
        var relativeA = this.point.clone().subtract(a.bounds.center);
        var relativeB = this.point.clone().subtract(b.bounds.center);
        var relativeVelocity = velocityB.clone()
            .add(relativeB.cross(-angularVelocityB))
            .subtract(velocityA)
            .subtract(relativeA.cross(-angularVelocityA));
        var rvDotNormal = relativeVelocity.dot(this.normal);
        if (rvDotNormal > 0) {
            return;
        }
        var restitution = Math.min(this.colliderA.restitution, this.colliderB.restitution);
        var inverseMassA = bodyA ? bodyA.inverseMass : 0;
        var inverseMassB = bodyB ? bodyB.inverseMass : 0;
        var sumOfInverseMass = inverseMassA + inverseMassB;
        var inverseMoiA = bodyA ? bodyA.inverseMoi : 0;
        var inverseMoiB = bodyB ? bodyB.inverseMoi : 0;
        var j_moi_a = Vector_1.Vector.Cross(relativeA.cross(this.normal), relativeA).scale(inverseMoiA);
        var j_moi_b = Vector_1.Vector.Cross(relativeB.cross(this.normal), relativeB).scale(inverseMoiB);
        var j_moi = j_moi_a.add(j_moi_b).dot(this.normal);
        var j = -(1 + restitution) * rvDotNormal / (sumOfInverseMass + j_moi);
        var impulse = this.normal.clone().scale(j);
        if (bodyA && bodyB) {
            this.mtv.scale(0.5);
        }
        if (bodyA) {
            if (shouldAwakeBodyA && bodyA.isSleeping) {
                bodyA.awake();
            }
            bodyA.host.transform.position.add(this.mtv.clone().scale(-1));
            bodyA.addForce(impulse.clone().scale(-1), ForceMode_1.ForceMode.Impulse);
        }
        if (bodyB) {
            if (shouldAwakeBodyB && bodyB.isSleeping) {
                bodyB.awake();
            }
            bodyB.host.transform.position.add(this.mtv);
            bodyB.addForce(impulse, ForceMode_1.ForceMode.Impulse);
        }
        var tangent = this.normal.normal();
        var frictionImpulse;
        var jt_moi_a = Vector_1.Vector.Cross(relativeA.cross(tangent), relativeA).scale(inverseMoiA);
        var jt_moi_b = Vector_1.Vector.Cross(relativeB.cross(tangent), relativeB).scale(inverseMoiB);
        var jt_moi = jt_moi_a.add(jt_moi_b).dot(tangent);
        var t = relativeVelocity.clone().subtract(this.normal.clone().scale(rvDotNormal)).normalize();
        var jt = -relativeVelocity.dot(t) / (sumOfInverseMass + jt_moi);
        var mu = Math.sqrt(Math.pow(this.colliderA.friction, 2) + Math.pow(this.colliderB.friction, 2));
        if (Math.abs(jt) < j * mu) {
            frictionImpulse = t.clone().scale(jt);
        }
        else {
            frictionImpulse = t.clone().scale(-j * mu);
        }
        if (bodyA) {
            bodyA.addForce(frictionImpulse.clone().scale(-1), ForceMode_1.ForceMode.Impulse);
            bodyA.addTorque(-frictionImpulse.dot(t) * relativeA.cross(t), ForceMode_1.ForceMode.Impulse);
        }
        if (bodyB) {
            bodyB.addForce(frictionImpulse, ForceMode_1.ForceMode.Impulse);
            bodyB.addTorque(frictionImpulse.dot(t) * relativeB.cross(t), ForceMode_1.ForceMode.Impulse);
        }
    };
    CollisionContact.prototype.destroy = function () {
        this._canRecycle = true;
    };
    return CollisionContact;
}());
exports.CollisionContact = CollisionContact;


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

/***/ 39:
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
    Projection.prototype.toString = function () {
        return "Projection (" + this.min + ", " + this.max + ")";
    };
    return Projection;
}());
exports.Projection = Projection;


/***/ }),

/***/ 60:
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
var RendererComponent_1 = __webpack_require__(12);
var Vector_1 = __webpack_require__(0);
var Color_1 = __webpack_require__(6);
var CircleRendererComponent = (function (_super) {
    __extends(CircleRendererComponent, _super);
    function CircleRendererComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radius = 60;
        _this.lineWidth = 1;
        _this.strokeColor = Color_1.Color.Red;
        _this.center = new Vector_1.Vector();
        _this.startAngle = 0;
        _this.endAngle = Math.PI * 2;
        _this.anticlockwise = false;
        _this.useLocalCoordinate = true;
        return _this;
    }
    CircleRendererComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.calculateBounds();
    };
    CircleRendererComponent.prototype.render = function (ctx, toScreenMatrix) {
        ctx.save();
        var m = toScreenMatrix.clone();
        if (this.useLocalCoordinate) {
            m.multiply(this.transform.toWorldMatrix);
        }
        m.setScaling(-1, -1);
        ctx.transform(m[0][0], m[0][1], m[1][0], m[1][1], m[0][2], m[1][2]);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeColor.toHexString();
        ctx.beginPath();
        var center = this.center.clone();
        ctx.arc(center.x, center.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    };
    CircleRendererComponent.prototype.calculateBounds = function () {
        this.bounds.center.copy(this.center);
        this.bounds.extents.setTo(this.radius, this.radius);
        if (this.useLocalCoordinate) {
            this.bounds.center.add(this.transform.position);
        }
    };
    return CircleRendererComponent;
}(RendererComponent_1.RendererComponent));
exports.CircleRendererComponent = CircleRendererComponent;


/***/ }),

/***/ 61:
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

/***/ 62:
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
var ColliderComponent_1 = __webpack_require__(63);
var LineRendererComponent_1 = __webpack_require__(15);
var Vector_1 = __webpack_require__(0);
var Line_1 = __webpack_require__(61);
var Ray_1 = __webpack_require__(103);
var Projection_1 = __webpack_require__(39);
var CollisionJumpTable_1 = __webpack_require__(64);
var Inject_1 = __webpack_require__(7);
var CircleColliderComponent_1 = __webpack_require__(65);
var Type_1 = __webpack_require__(10);
var Color_1 = __webpack_require__(6);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var PolygonColliderComponent = (function (_super) {
    __extends(PolygonColliderComponent, _super);
    function PolygonColliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = [];
        _this._cachedPoints = [];
        _this._cachedAxes = [];
        _this._cachedSides = [];
        _this.debugColliderRenderer = null;
        _this.debugBoundsRenderer = null;
        _this.debugDirectionRenderer = null;
        return _this;
    }
    Object.defineProperty(PolygonColliderComponent.prototype, "cachedPoints", {
        get: function () { return this._cachedPoints; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonColliderComponent.prototype, "cachedAxes", {
        get: function () { return this._cachedAxes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonColliderComponent.prototype, "cachedSides", {
        get: function () { return this._cachedSides; },
        enumerable: true,
        configurable: true
    });
    PolygonColliderComponent.prototype.fixedUpdate = function () {
        this.calculate();
    };
    PolygonColliderComponent.prototype.update = function () {
        if (this.debug) {
            var isSleep = this.rigidbody ? this.rigidbody.isSleeping : true;
            var color = isSleep ? Color_1.Color.Green : Color_1.Color.Red;
            if (!this.debugColliderRenderer) {
                this.debugColliderRenderer = this.addComponent(LineRendererComponent_1.LineRendererComponent);
                this.debugColliderRenderer.useLocalCoordinate = false;
                this.debugColliderRenderer.closePath = true;
            }
            if (!this.debugBoundsRenderer) {
                this.debugBoundsRenderer = this.addComponent(LineRendererComponent_1.LineRendererComponent);
                this.debugBoundsRenderer.useLocalCoordinate = false;
                this.debugBoundsRenderer.closePath = true;
                this.debugBoundsRenderer.strokeColor = Color_1.Color.Cyan;
            }
            if (!this.debugDirectionRenderer) {
                this.debugDirectionRenderer = this.addComponent(LineRendererComponent_1.LineRendererComponent);
                this.debugDirectionRenderer.useLocalCoordinate = false;
            }
            this.debugColliderRenderer.strokeColor = color;
            this.debugDirectionRenderer.strokeColor = color;
            this.debugColliderRenderer.clearPoints();
            if (this._cachedPoints.length > 1) {
                (_a = this.debugColliderRenderer).addPoint.apply(_a, this._cachedPoints);
            }
            var min = this.bounds.min;
            var max = this.bounds.max;
            this.debugBoundsRenderer.clearPoints();
            this.debugBoundsRenderer.addPoint(new Vector_1.Vector(min.x, min.y), new Vector_1.Vector(min.x, max.y), new Vector_1.Vector(max.x, max.y), new Vector_1.Vector(max.x, min.y));
            var rotation = this.host.transform.rotation;
            var direction = new Vector_1.Vector(Math.cos(rotation), Math.sin(rotation));
            var ray = new Ray_1.Ray(this.bounds.center.clone(), direction.clone());
            var point = this.rayCast(ray) || direction;
            var center = this._cachedPoints.reduce(function (result, curr) { return result.add(curr); }, new Vector_1.Vector()).scale(1 / this._cachedPoints.length);
            this.debugDirectionRenderer.clearPoints();
            this.debugDirectionRenderer.addPoint(center, point);
        }
        else {
            if (this.debugColliderRenderer) {
                this.removeComponent(this.debugColliderRenderer);
                this.debugColliderRenderer = null;
            }
            if (this.debugBoundsRenderer) {
                this.removeComponent(this.debugBoundsRenderer);
                this.debugBoundsRenderer = null;
            }
            if (this.debugDirectionRenderer) {
                this.removeComponent(this.debugDirectionRenderer);
                this.debugDirectionRenderer = null;
            }
        }
        var _a;
    };
    PolygonColliderComponent.prototype.calculate = function () {
        var _this = this;
        var toWorldMatrix = this.host.transform.toWorldMatrix;
        var count = this.points.length;
        var diff = count - this._cachedPoints.length;
        if (diff > 0) {
            for (var i = 0; i < diff; i++) {
                this._cachedPoints.push(new Vector_1.Vector());
                this._cachedAxes.push(new Vector_1.Vector());
                this._cachedSides.push(new Line_1.Line(new Vector_1.Vector(), new Vector_1.Vector()));
            }
        }
        else if (diff < 0) {
            this._cachedPoints.splice(0, -diff);
            this._cachedAxes.splice(0, -diff);
            this._cachedSides.splice(0, -diff);
        }
        this._cachedPoints.forEach(function (point, index) { return point.copy(_this.points[index]); });
        this._cachedPoints.forEach(function (point) { return toWorldMatrix.multiplyToPoint(point); });
        for (var i = 0; i < count; i++) {
            var p1 = this._cachedPoints[i];
            var p2 = this._cachedPoints[(i + 1) % count];
            var axis = this._cachedAxes[i];
            var side = this._cachedSides[i];
            axis.copy(p1).subtract(p2);
            side.begin.copy(p1);
            side.end.copy(p2);
        }
        var x = this._cachedPoints.map(function (p) { return p.x; });
        var y = this._cachedPoints.map(function (p) { return p.y; });
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
        var count = this._cachedSides.reduce(function (acc, side) { return ray.intersect(side) === -1 ? acc : ++acc; }, 0);
        return count % 2 !== 0;
    };
    PolygonColliderComponent.prototype.rayCast = function (ray) {
        var minDistance = Number.MAX_VALUE;
        var noIntersect = true;
        this._cachedSides.forEach(function (side) {
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
        this._cachedPoints.forEach(function (point) {
            var s = point.dot(axis);
            min = Math.min(min, s);
            max = Math.max(max, s);
        });
        return new Projection_1.Projection(min, max);
    };
    PolygonColliderComponent.prototype.getFurthestPoint = function (direction) {
        var max = -Number.MAX_VALUE;
        var pointer = -1;
        this._cachedPoints.forEach(function (point, index) {
            var dot = point.dot(direction);
            if (dot > max) {
                max = dot;
                pointer = index;
            }
        });
        return this._cachedPoints[pointer].clone();
    };
    __decorate([
        Inject_1.Inject(CollisionJumpTable_1.CollisionJumpTable),
        __metadata("design:type", CollisionJumpTable_1.CollisionJumpTable)
    ], PolygonColliderComponent.prototype, "collisionJumpTable", void 0);
    return PolygonColliderComponent;
}(ColliderComponent_1.ColliderComponent));
exports.PolygonColliderComponent = PolygonColliderComponent;


/***/ }),

/***/ 63:
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
var Inject_1 = __webpack_require__(7);
var Bounds_1 = __webpack_require__(19);
var Component_1 = __webpack_require__(11);
var RigidbodyComponent_1 = __webpack_require__(20);
var Vector_1 = __webpack_require__(0);
var Projection_1 = __webpack_require__(39);
var ColliderType_1 = __webpack_require__(102);
var BroadPhaseCollisionResolver_1 = __webpack_require__(58);
var ColliderComponent = (function (_super) {
    __extends(ColliderComponent, _super);
    function ColliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bounds = new Bounds_1.Bounds();
        _this.offset = new Vector_1.Vector();
        _this.layer = 1;
        _this.debug = false;
        _this.restitution = 0.2;
        _this.friction = 0.99;
        _this.isKinematic = false;
        _this.type = ColliderType_1.ColliderType.Static;
        return _this;
    }
    ColliderComponent.prototype.collide = function (another) { return; };
    ColliderComponent.prototype.contains = function (point) { return false; };
    ColliderComponent.prototype.rayCast = function (ray) { return; };
    ColliderComponent.prototype.project = function (axis) { return new Projection_1.Projection(0, 0); };
    ColliderComponent.prototype.getFurthestPoint = function (direction) { return this.bounds.center.clone(); };
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
        this.broadPhaseCollisionResolver.track(this);
    };
    __decorate([
        Inject_1.Inject(BroadPhaseCollisionResolver_1.BroadPhaseCollisionResolver),
        __metadata("design:type", BroadPhaseCollisionResolver_1.BroadPhaseCollisionResolver)
    ], ColliderComponent.prototype, "broadPhaseCollisionResolver", void 0);
    return ColliderComponent;
}(Component_1.Component));
exports.ColliderComponent = ColliderComponent;


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __webpack_require__(1);
var CollisionContact_1 = __webpack_require__(104);
var CollisionJumpTable = (function () {
    function CollisionJumpTable() {
    }
    CollisionJumpTable.prototype.circleCircle = function (colliderA, colliderB) {
        var maxDistance = colliderA.radius + colliderB.radius;
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var distance = positionA.distanceTo(positionB);
        if (distance > maxDistance) {
            return;
        }
        var normal = positionB.clone().subtract(positionA).scale(colliderA.radius / distance);
        var point = positionA.clone().add(normal);
        normal.normalize();
        var mtv = normal.clone().scale(maxDistance - distance);
        return new CollisionContact_1.CollisionContact(colliderA, colliderB, mtv, point, normal);
    };
    CollisionJumpTable.prototype.circlePolygon = function (colliderA, colliderB) {
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var minAxis = this.circleBoxSAT(colliderA, colliderB);
        if (!minAxis) {
            return;
        }
        var ab = positionB.clone().subtract(positionA);
        var hasSameDirection = minAxis.dot(ab) >= 0;
        if (!hasSameDirection) {
            minAxis.scale(-1);
        }
        var normal = minAxis.clone().normalize();
        var pointA = colliderA.getFurthestPoint(minAxis);
        var pointB = colliderB.getFurthestPoint(minAxis);
        var containsPointA = colliderB.contains(pointA);
        var containsPointB = colliderA.contains(pointB);
        var contactPoint;
        if (containsPointA && containsPointB) {
            contactPoint = pointA.clone().add(pointB).scale(0.5);
        }
        else if (containsPointA) {
            contactPoint = pointA.clone();
        }
        else if (containsPointB) {
            contactPoint = pointB.clone();
        }
        else {
            contactPoint = pointA.clone().add(pointB).scale(0.5);
        }
        return new CollisionContact_1.CollisionContact(colliderA, colliderB, minAxis, contactPoint, normal);
    };
    CollisionJumpTable.prototype.polygonPolygon = function (colliderA, colliderB) {
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var minAxis = this.polygonPolygonSAT(colliderA, colliderB);
        if (!minAxis) {
            return;
        }
        var ab = positionB.clone().subtract(positionA);
        var hasSameDirection = minAxis.dot(ab) >= 0;
        if (!hasSameDirection) {
            minAxis.scale(-1);
        }
        var normal = minAxis.clone().normalize();
        var pointA = colliderA.getFurthestPoint(minAxis);
        var pointB = colliderB.getFurthestPoint(minAxis);
        var containsPointA = colliderB.contains(pointA);
        var containsPointB = colliderA.contains(pointB);
        var contactPoint;
        if (containsPointA && containsPointB) {
            contactPoint = pointA.clone().add(pointB).scale(0.5);
        }
        else if (containsPointA) {
            contactPoint = pointA.clone();
        }
        else if (containsPointB) {
            contactPoint = pointB.clone();
        }
        else {
            contactPoint = pointA.clone().add(pointB).scale(0.5);
        }
        return new CollisionContact_1.CollisionContact(colliderA, colliderB, minAxis, contactPoint, normal);
    };
    CollisionJumpTable.prototype.polygonPolygonSAT = function (colliderA, colliderB) {
        var axes = colliderA.cachedAxes.concat(colliderB.cachedAxes).map(function (axis) { return axis.normal(); });
        return this.findMTV(colliderA, colliderB, axes);
    };
    CollisionJumpTable.prototype.circleBoxSAT = function (colliderA, colliderB) {
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var ba = positionA.clone().subtract(positionB);
        var closestPointOnPoly = colliderB.getFurthestPoint(ba);
        var axes = colliderB.cachedAxes.map(function (axis) { return axis.normal(); }).concat([positionA.clone().subtract(closestPointOnPoly).normalize()]);
        return this.findMTV(colliderA, colliderB, axes);
    };
    CollisionJumpTable.prototype.findMTV = function (colliderA, colliderB, axes) {
        var count = axes.length;
        var minOverlap = Number.MAX_VALUE;
        var minIndex = -1;
        for (var i = 0; i < count; i++) {
            var projectionA = colliderA.project(axes[i]);
            var projectionB = colliderB.project(axes[i]);
            var overlap = projectionA.getOverlap(projectionB);
            if (overlap <= 0) {
                return;
            }
            else {
                if (overlap < minOverlap) {
                    minOverlap = overlap;
                    minIndex = i;
                }
            }
        }
        if (minIndex === -1) {
            return;
        }
        if (axes[minIndex].isZero) {
            return;
        }
        return axes[minIndex].clone().normalize().scale(minOverlap);
    };
    CollisionJumpTable = __decorate([
        Service_1.Service()
    ], CollisionJumpTable);
    return CollisionJumpTable;
}());
exports.CollisionJumpTable = CollisionJumpTable;


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
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(4);
var ColliderComponent_1 = __webpack_require__(63);
var CircleRendererComponent_1 = __webpack_require__(60);
var Vector_1 = __webpack_require__(0);
var Projection_1 = __webpack_require__(39);
var CollisionJumpTable_1 = __webpack_require__(64);
var Inject_1 = __webpack_require__(7);
var Type_1 = __webpack_require__(10);
var PolygonColliderComponent_1 = __webpack_require__(62);
var LineRendererComponent_1 = __webpack_require__(15);
var Color_1 = __webpack_require__(6);
Type_1.forwardRef(function () { return GameObject_1.GameObject; });
var CircleColliderComponent = (function (_super) {
    __extends(CircleColliderComponent, _super);
    function CircleColliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radius = 0;
        _this.debugColliderRenderer = null;
        _this.debugBoundsRenderer = null;
        _this.debugDirectionRenderer = null;
        return _this;
    }
    CircleColliderComponent.prototype.fixedUpdate = function () {
        this.calculate();
    };
    CircleColliderComponent.prototype.update = function () {
        if (this.debug) {
            var isSleep = this.rigidbody ? this.rigidbody.isSleeping : true;
            var color = isSleep ? Color_1.Color.Green : Color_1.Color.Red;
            if (!this.debugColliderRenderer) {
                this.debugColliderRenderer = this.addComponent(CircleRendererComponent_1.CircleRendererComponent);
                this.debugColliderRenderer.useLocalCoordinate = false;
            }
            if (!this.debugBoundsRenderer) {
                this.debugBoundsRenderer = this.addComponent(LineRendererComponent_1.LineRendererComponent);
                this.debugBoundsRenderer.useLocalCoordinate = false;
                this.debugBoundsRenderer.closePath = true;
                this.debugBoundsRenderer.strokeColor = Color_1.Color.Cyan;
            }
            if (!this.debugDirectionRenderer) {
                this.debugDirectionRenderer = this.addComponent(LineRendererComponent_1.LineRendererComponent);
                this.debugDirectionRenderer.useLocalCoordinate = false;
            }
            this.debugColliderRenderer.strokeColor = color;
            this.debugDirectionRenderer.strokeColor = color;
            this.debugColliderRenderer.center.copy(this.bounds.center);
            this.debugColliderRenderer.radius = this.radius;
            this.debugBoundsRenderer.clearPoints();
            var min = this.bounds.min;
            var max = this.bounds.max;
            this.debugBoundsRenderer.addPoint(new Vector_1.Vector(min.x, min.y), new Vector_1.Vector(min.x, max.y), new Vector_1.Vector(max.x, max.y), new Vector_1.Vector(max.x, min.y));
            var rotation = this.host.transform.rotation;
            var direction = new Vector_1.Vector(Math.cos(rotation), Math.sin(rotation));
            var point = this.host.transform.position.clone().add(direction.scale(this.radius));
            this.debugDirectionRenderer.clearPoints();
            this.debugDirectionRenderer.addPoint(this.bounds.center, point);
        }
        else {
            if (this.debugColliderRenderer) {
                this.removeComponent(this.debugColliderRenderer);
                this.debugColliderRenderer = null;
            }
            if (this.debugBoundsRenderer) {
                this.removeComponent(this.debugBoundsRenderer);
                this.debugBoundsRenderer = null;
            }
            if (this.debugDirectionRenderer) {
                this.removeComponent(this.debugDirectionRenderer);
                this.debugDirectionRenderer = null;
            }
        }
    };
    CircleColliderComponent.prototype.calculate = function () {
        this.bounds.center.copy(this.host.transform.position);
        this.bounds.extents.setTo(this.radius, this.radius);
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
        return this.bounds.center.distanceTo(point) <= this.radius;
    };
    CircleColliderComponent.prototype.rayCast = function (ray, max) {
        if (max === void 0) { max = Infinity; }
        var c = this.bounds.center;
        var r = this.radius;
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
        var s = [dot, dot + this.radius, dot - this.radius];
        return new Projection_1.Projection(Math.min.apply(Math, s), Math.max.apply(Math, s));
    };
    CircleColliderComponent.prototype.getFurthestPoint = function (direction) {
        return this.bounds.center.clone().add(direction.clone().normalize().scale(this.radius));
    };
    __decorate([
        Inject_1.Inject(CollisionJumpTable_1.CollisionJumpTable),
        __metadata("design:type", CollisionJumpTable_1.CollisionJumpTable)
    ], CircleColliderComponent.prototype, "collisionJumpTable", void 0);
    return CircleColliderComponent;
}(ColliderComponent_1.ColliderComponent));
exports.CircleColliderComponent = CircleColliderComponent;


/***/ }),

/***/ 99:
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
var Scene_1 = __webpack_require__(30);
var Screen_1 = __webpack_require__(17);
var SceneManager_1 = __webpack_require__(18);
var runtime_1 = __webpack_require__(14);
var BrowserDelegate_1 = __webpack_require__(3);
var ArrayUtility_1 = __webpack_require__(5);
var Class_1 = __webpack_require__(8);
var Inject_1 = __webpack_require__(7);
var Texture_1 = __webpack_require__(31);
var Sprite_1 = __webpack_require__(33);
var Color_1 = __webpack_require__(6);
var Vector_1 = __webpack_require__(0);
var Random_1 = __webpack_require__(100);
var SpriteRendererComponent_1 = __webpack_require__(35);
var LineRendererComponent_1 = __webpack_require__(15);
var CircleRendererComponent_1 = __webpack_require__(60);
var RigidbodyComponent_1 = __webpack_require__(20);
var BoxColliderComponent_1 = __webpack_require__(101);
var CircleColliderComponent_1 = __webpack_require__(65);
var PointerInput_1 = __webpack_require__(36);
var rectTexture = new Texture_1.Texture('../Assets/rect.png');
var circleTexture = new Texture_1.Texture('../Assets/circle.png');
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Shape.prototype, "isVisible", {
        get: function () { return this.outline && this.outline.isVisible; },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.start = function () {
        _super.prototype.start.call(this);
        this.renderer = this.addComponent(SpriteRendererComponent_1.SpriteRendererComponent);
        this.body = this.addComponent(RigidbodyComponent_1.RigidbodyComponent);
        this.size = this.random.integer(32, 128);
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
        this.outline = this.addComponent(LineRendererComponent_1.LineRendererComponent);
        this.collider = this.addComponent(BoxColliderComponent_1.BoxColliderComponent);
        this.renderer.sprite = new Sprite_1.Sprite(rectTexture);
        var halfSize = this.size / 2;
        this.renderer.sprite.rect.width = this.size;
        this.renderer.sprite.rect.height = this.size;
        this.outline.addPoint(new Vector_1.Vector(halfSize, halfSize), new Vector_1.Vector(halfSize, -halfSize), new Vector_1.Vector(-halfSize, -halfSize), new Vector_1.Vector(-halfSize, halfSize));
        this.outline.closePath = true;
        this.outline.strokeColor = Color_1.Color.CreateByHexRgb('#94CFFF');
        this.collider.size.setTo(this.size, this.size);
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
        this.outline = this.addComponent(CircleRendererComponent_1.CircleRendererComponent);
        this.collider = this.addComponent(CircleColliderComponent_1.CircleColliderComponent);
        this.renderer.sprite = new Sprite_1.Sprite(circleTexture);
        var halfSize = this.size / 2;
        this.renderer.sprite.rect.width = this.size;
        this.renderer.sprite.rect.height = this.size;
        this.outline.radius = halfSize;
        this.outline.strokeColor = Color_1.Color.CreateByHexRgb('#94CFFF');
        this.collider.radius = halfSize;
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
        this.collider.debug = true;
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
        __metadata("design:paramtypes", [SceneManager_1.SceneManager,
            PointerInput_1.PointerInput,
            BrowserDelegate_1.BrowserDelegate,
            Screen_1.Screen])
    ], Game);
    return Game;
}());
runtime_1.instantiate(Game);
runtime_1.bootstrap().catch(console.error);


/***/ })

},[99]);
//# sourceMappingURL=physics.bundle.js.map