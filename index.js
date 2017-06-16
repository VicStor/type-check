/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ARG_TYPE_ERR = new TypeError('Expect argument to be object, with signature { type: variable } or { type: [variable] }');
var TYPE_ERROR = 'Expected keys to be one of registered types\n "undefined", "boolean", "number", "string", "symbol", "function", "object", "promise"\n but recieved';
var TYPE_OF_WARN = 'Function typeOf() checks the type of only first property in object\nuse everyType() or someType() for multiple checks';
var REGISTERED_TYPES = ['undefined', 'boolean', 'number', 'string', 'symbol', 'function', 'object', 'promise'];

function typeCheck(type) {
  return function (variable) {
    return checkType(type, variable);
  };
}

function makeFunctionChecker(checker) {
  return function (typeObj) {
    var types = argValidation(typeObj);

    return types[checker](function (type) {
      var checkVar = typeCheck(type);
      if (Array.isArray(typeObj[type])) {
        return typeObj[type][checker](checkVar);
      }
      return checkVar(typeObj[type]);
    });
  };
}

function checkType(type, variable) {
  if (type === 'promise') {
    return typeof variable.then === 'function';
  }
  return (typeof variable === 'undefined' ? 'undefined' : _typeof(variable)) === type;
}

function argValidation(typeObj) {
  if ((typeof typeObj === 'undefined' ? 'undefined' : _typeof(typeObj)) !== 'object') {
    throw ARG_TYPE_ERR;
  }
  var errMsg = '';
  var types = Object.keys(typeObj);
  if (types.length === 0) {
    throw ARG_TYPE_ERR;
  }
  types.forEach(function (type) {
    if (!~REGISTERED_TYPES.indexOf(type)) {
      errMsg += ' "' + type + '"';
    }
  });
  if (errMsg !== '') {
    throw new TypeError(TYPE_ERROR + errMsg);
  }
  return types;
}

module.exports = {
  argValidation: argValidation,
  typeCheck: typeCheck,
  REGISTERED_TYPES: REGISTERED_TYPES,
  TYPE_ERROR: TYPE_ERROR,
  ARG_TYPE_ERR: ARG_TYPE_ERR,
  TYPE_OF_WARN: TYPE_OF_WARN,
  makeFunctionChecker: makeFunctionChecker
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    argValidation = _require.argValidation,
    typeCheck = _require.typeCheck,
    REGISTERED_TYPES = _require.REGISTERED_TYPES,
    TYPE_ERROR = _require.TYPE_ERROR,
    ARG_TYPE_ERR = _require.ARG_TYPE_ERR,
    TYPE_OF_WARN = _require.TYPE_OF_WARN,
    makeFunctionChecker = _require.makeFunctionChecker;

function typeOf(typeObj) {
  var types = argValidation(typeObj);

  if (types.length > 1 || Array.isArray(typeObj[types[0]])) {
    console.warn(TYPE_OF_WARN);
  }
  if (Array.isArray(typeObj[types[0]])) {
    return typeCheck(types[0])(typeObj[types[0]][0]);
  }
  return typeCheck(types[0])(typeObj[types[0]]);
}

function someTypeOf(typeObj) {
  return makeFunctionChecker('some')(typeObj);
}

function everyTypeOf(typeObj) {
  return makeFunctionChecker('every')(typeObj);
}

module.exports = {
  typeOf: typeOf,
  everyTypeOf: everyTypeOf,
  someTypeOf: someTypeOf
};

/***/ })
/******/ ]);