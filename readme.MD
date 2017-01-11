#'type-check' module provides following functions for easy type checks

- typeOf(typeObj)
- someTypeOf(typeObj)
- everyTypeOf(typeObj)

Function type signature
(typeOf, someTypeOf, everyTypeOf):: Object -> Boolean

all these functions accept only argument with following signature
```js
const typeObj = {
  type: variable
}
```
These functions use standard JS "typeof" function under the hood so use
"undefined", "boolean", "number", "string", "symbol", "function", "object" keys in argument object.
Read [MDN typeof](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/typeof) for details.
It also returns true for "promise" check if value has .then() method.
```js
const typeObj = {
  function: (x) => x,
  object: {},
  object: null,
  string: 'any string',
  boolean: true,
  number: 6,
  symbol: Symbol(),
  undefined: undefinedVariable,
  promise: promiseObject
}

```

###typeOf
---
typeOf checks only first key-value pair in passing object and ignores any further checks. You'll see warning message in console if you pass object with more then one key-value pair, still it executes without errors.

###someTypeOf
---
someTypeOf checks all specified key-values and returns 'true' if at least one of checks passed. It uses [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method under the hood

###everyTypeOf
---
everyTypeOf - checks all spesified key-values and returns 'true' only if all of checks passed. It uses [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

So everyTypeOf is usefull to check if some object emplements kinda interface you need

```js
const prom = (x) => new Promise((res, rej) => {
  try{
    setTimeout(() => {
      return res(x);
    }, 1000);
  } catch(err) {
    rej(err);
  }
});

const targetObject = {
  name: 'Object name',
  count: 9,
  method1: (x) => x,
  method2: prom('xxx')
}

if(everyTypeOf({
      string: targetObject.name,
      number: targetObject.count,
      function: targetObject.method1,
      promise: targetObject.method2
    })
  ) {
  // targetObject.name
  // targetObject.method1()
  // targetObject.method2.then()
}
```
