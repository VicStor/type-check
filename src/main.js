const {
  argValidation,
  typeCheck,
  REGISTERED_TYPES,
  TYPE_ERROR,
  ARG_TYPE_ERR,
  TYPE_OF_WARN
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

function makeFunctionChecker(checker) {
  return function (typeObj) {
    const types = argValidation(typeObj);

    return types[checker]((type) => {
      const checkVar = typeCheck(type);
      if(Array.isArray(typeObj[type])) {
        return typeObj[type][checker](checkVar);
      }
      return checkVar(typeObj[type]);
    });
  }
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
