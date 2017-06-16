const {
  argValidation,
  typeCheck,
  REGISTERED_TYPES,
  TYPE_ERROR,
  ARG_TYPE_ERR,
  TYPE_OF_WARN,
  makeFunctionChecker
} = require('./helpers');

function typeOf(typeObj) {
  const types = argValidation(typeObj);

  if (types.length > 1 || Array.isArray(typeObj[types[0]])) {
    console.warn(TYPE_OF_WARN);
  }
  if(Array.isArray(typeObj[types[0]])) {
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
  typeOf,
  everyTypeOf,
  someTypeOf
}
