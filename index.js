!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=1)}([function(e,n,t){"use strict";function r(e){return function(n){return i(e,n)}}function o(e){return function(n){return u(n)[e](function(t){var o=r(t);return Array.isArray(n[t])?n[t][e](o):o(n[t])})}}function i(e,n){return"promise"===e?"function"==typeof n.then:(void 0===n?"undefined":c(n))===e}function u(e){if("object"!==(void 0===e?"undefined":c(e)))throw f;var n="",t=Object.keys(e);if(0===t.length)throw f;if(t.forEach(function(e){~p.indexOf(e)||(n+=' "'+e+'"')}),""!==n)throw new TypeError(y+n);return t}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=new TypeError("Expect argument to be object, with signature { type: variable } or { type: [variable] }"),y='Expected keys to be one of registered types\n "undefined", "boolean", "number", "string", "symbol", "function", "object", "promise"\n but recieved',p=["undefined","boolean","number","string","symbol","function","object","promise"];e.exports={argValidation:u,typeCheck:r,REGISTERED_TYPES:p,TYPE_ERROR:y,ARG_TYPE_ERR:f,TYPE_OF_WARN:"Function typeOf() checks the type of only first property in object\nuse everyType() or someType() for multiple checks",makeFunctionChecker:o}},function(e,n,t){"use strict";function r(e){var n=c(e);return(n.length>1||Array.isArray(e[n[0]]))&&console.warn(y),Array.isArray(e[n[0]])?f(n[0])(e[n[0]][0]):f(n[0])(e[n[0]])}function o(e){return p("some")(e)}function i(e){return p("every")(e)}var u=t(0),c=u.argValidation,f=u.typeCheck,y=(u.REGISTERED_TYPES,u.TYPE_ERROR,u.ARG_TYPE_ERR,u.TYPE_OF_WARN),p=u.makeFunctionChecker;e.exports={typeOf:r,everyTypeOf:i,someTypeOf:o}}]);