(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TwoStep", [], factory);
	else if(typeof exports === 'object')
		exports["TwoStep"] = factory();
	else
		root["TwoStep"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getDirectionByKeyCode(keyCode) {
    // key codes here: https://css-tricks.com/snippets/javascript/javascript-keycodes/
    var keyCodesPositive = [40, // down key
    32, // spacebar
    39, // right key
    34 // page down
    ];
    var keyCodesNegative = [37, // left
    38, // up
    33 // page up
    ];
    if (keyCodesPositive.indexOf(keyCode) > -1) {
        return 1;
    } else if (keyCodesNegative.indexOf(keyCode) > -1) {
        return -1;
    }
    return 0;
}

exports.default = getDirectionByKeyCode;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.instances = [];
  }

  _createClass(_class, [{
    key: "register",
    value: function register(instance) {
      this.instances.push(instance);
      return this;
    }
  }, {
    key: "getActiveInstances",
    value: function getActiveInstances() {
      return this.instances.filter(function (ts) {
        return ts.enabled;
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keycodeToDirection = __webpack_require__(0);

var _keycodeToDirection2 = _interopRequireDefault(_keycodeToDirection);

var _manager = __webpack_require__(1);

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// keep track of twostep instances on page
var tsManager = new _manager2.default();

var _class = function () {
    function _class(opts) {
        _classCallCheck(this, _class);

        if (opts.elements.length === 0) {
            throw 'Elements array is empty';
        }

        if (opts.narrative) {
            if (opts.elements.length !== opts.narrative.length) {
                throw 'Elements and narrative are different lengths';
            }

            var narrationIsAllFunctions = !opts.narrative.filter(function (narr) {
                return typeof narr !== 'function';
            }).length;
            if (narrationIsAllFunctions === false) {
                throw 'Narrative contains non-functions';
            }

            this.narrative = opts.narrative;
        }
        this.onChange = opts.onChange;
        this.elements = Array.prototype.slice.call(opts.elements);
        this.enabled = true;

        this.offset = opts.hasOwnProperty('offset') ? opts.offset : { 'down': "50%", 'up': "0" };

        var waypointsDown = this.setWaypoints(this.elements, waypointHandlerDown, opts.continuous, this.offset.down);
        var waypointsUp = this.setWaypoints(this.elements, waypointHandlerUp, opts.continuous, this.offset.up);

        this.waypoints = [waypointsDown, waypointsUp];

        if (opts.stick) {
            if ($().fixTo === undefined) {
                throw 'fixTo is not present on the page, or may have been loaded in before jQuery.';
            }
            $(opts.stick).wrapInner('<div class="two-step-sticky-wrapper"></div>');
            this.sticky = $(opts.stick).find('.two-step-sticky-wrapper').fixTo($(opts.stick));
        }

        this.setKeyboard();
        this.index = -1;

        tsManager.register(this);

        setInterval(function () {
            Waypoint.refreshAll();
        }, 1000);

        var _this = this;
        function waypointHandlerUp(direction) {
            if (direction == "up") {
                var index = _this.elements.indexOf(this.element);
                if (index !== this.index) {
                    _this.goTo(index, false, direction);
                }
            };
        }

        function waypointHandlerDown(direction) {
            if (direction == "down") {
                var index = _this.elements.indexOf(this.element);
                if (index !== this.index) {
                    _this.goTo(index, false, direction);
                }
            };
        }
    }

    _createClass(_class, [{
        key: 'goTo',
        value: function goTo(index, scrollThere, direction) {
            var _this2 = this;

            if (this.isValidIndex(index) === false) {
                throw index + ' is not a valid index. Must be between 0 and ' + (this.elements.length - 1) + ' (inclusive).';
            }
            if (this.narrative) {
                this.narrative[index]({
                    element: this.elements[index],
                    index: index,
                    direction: direction
                });
            }
            if (this.onChange) {
                this.onChange({
                    element: this.elements[index],
                    index: index,
                    direction: direction
                });
            }
            this.index = index;

            var $target = $(this.elements).eq(index);
            $(this.elements).removeClass('active');
            $target.addClass('active');
            if (scrollThere === true) {
                this.disableWaypoints();
                return $('html, body').animate({
                    scrollTop: $target.offset().top - 100
                }, 500).promise().then(function () {
                    _this2.enableWaypoints();
                });
            }
            return $.Deferred().resolve();
        }
    }, {
        key: 'setWaypoints',
        value: function setWaypoints(elements, handler) {
            var continuous = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var offset = arguments[3];

            return elements.map(function (element) {
                return new Waypoint({
                    element: element, handler: handler, continuous: continuous, offset: offset
                });
            });
        }
    }, {
        key: 'setKeyboard',
        value: function setKeyboard() {
            var _this3 = this;

            $(window).keydown(function (e) {
                if (_this3.disabled) {
                    return true;
                }
                var direction = (0, _keycodeToDirection2.default)(e.keyCode);
                var activeInstances = tsManager.getActiveInstances();
                if (direction !== 0 && e.target === document.body && e.metaKey === false && activeInstances.length === 1) {
                    var newIndex = _this3.index + direction;
                    if (_this3.isValidIndex(newIndex)) {
                        _this3.goTo(newIndex, true);
                        e.preventDefault();
                        return false;
                    }
                    // don't override normal keyboard event
                    return true;
                }
            });
        }
    }, {
        key: 'isValidIndex',
        value: function isValidIndex(index) {
            return index < this.elements.length && index > -1;
        }
    }, {
        key: 'disableWaypoints',
        value: function disableWaypoints() {
            var flatWaypoints = [].concat.apply([], this.waypoints);
            flatWaypoints.forEach(function (w) {
                return w.disable();
            });
        }
    }, {
        key: 'enableWaypoints',
        value: function enableWaypoints() {
            var flatWaypoints = [].concat.apply([], this.waypoints);
            flatWaypoints.forEach(function (w) {
                return w.enable();
            });
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
            this.enabled = false;
            this.disableWaypoints();
            if (this.sticky) {
                this.sticky.fixTo('stop');
            }
        }
    }, {
        key: 'enable',
        value: function enable() {
            this.disabled = false;
            this.enabled = true;
            this.enableWaypoints();
            if (this.sticky) {
                this.sticky.fixTo('start');
            }
        }
    }]);

    return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=two-step.js.map