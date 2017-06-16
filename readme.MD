#'type-check-easy' module provides following functions for easy type checks

- typeOf(typeObj)
- someTypeOf(typeObj)
- everyTypeOf(typeObj)

All the functions have the following type signature

```
typeOf someTypeOf everyTypeOf :: Object -> Boolean
```

The functions accept only argument with following signature
```js
const typeObj = {
  type: variable
}
// OR
const typeObj = {
  type: [variables]
}
```
###Important note
Keep in mind that object should not contain duplicate keys
```js
const typeObj = {
  string: ['str1', 12],
  string: ['str2', 'str3']
}
```
in this case second string key completely overwrite first string key so the function will receive
```js
// {
//   string: ['str2', 'str3']
// }
// so
everyTypeOf(typeObj) // => true
```

All the functions use standard JS "typeof" function under the hood so use keys
"undefined", "boolean", "number", "string", "symbol", "function", "object" in argument object.
Read [MDN typeof](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/typeof) for details.

It also returns true for "promise" check if the value object has .then() method.
```js
const typeObj = {
  number: [6, 8, 9],
  function: [x => x, y => y],
  object: [{}, null],
  string: 'any string',
  boolean: true,
  symbol: Symbol(),
  undefined: undefinedVariable,
  promise: promiseObject
}

```

###typeOf
---
typeOf checks only first key-value pair in passing object and ignores any further checks. You'll see warning message in console if you pass object with more then one key-value pair or array of values, still it executes without errors.

###someTypeOf
---
someTypeOf checks all specified key-values and returns 'true' if at least one of checks passed. It uses [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method under the hood

```js
someTypeOf({
  string: 9,
  boolean: 'string',
  function: x => x
}); // => returns true
// as it received correct function type in last property

someTypeOf({
  string: [9, 'string'],
  boolean: 'string',
  function: 1
}); // => returns true
// as it received correct string type in one of first properties
```

###everyTypeOf
---
everyTypeOf checks all speсified key-values and returns 'true' only if all of checks passed. It uses [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

So everyTypeOf is usefull to check if some object implements kinda interface you need

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
  description: 'Object description',
  count: 9,
  fn: x => x,
  promise: prom('xxx')
}

if(everyTypeOf({
      string: [targetObject.name, targetObject.description],
      number: targetObject.count,
      function: targetObject.fn,
      promise: targetObject.promise
    })
  ) {
  // targetObject.name
  // targetObject.description
  // targetObject.fn()
  // targetObject.promise.then()
}
```
