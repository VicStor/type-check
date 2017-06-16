const ARG_TYPE_ERR = new TypeError('Expect argument to be object, with signature { type: variable } or { type: [variable] }');
const TYPE_ERROR = 'Expected keys to be one of registered types\n "undefined", "boolean", "number", "string", "symbol", "function", "object", "promise"\n but recieved';
const TYPE_OF_WARN = 'Function typeOf() checks the type of only first property in object\nuse everyType() or someType() for multiple checks';
const REGISTERED_TYPES = ['undefined', 'boolean', 'number', 'string', 'symbol', 'function', 'object', 'promise'];

function typeCheck(type) {
  return function(variable) {
    return checkType(type, variable);
  }
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

function checkType(type, variable) {
  if(type === 'promise') {
    return typeof variable.then === 'function';
  }
  return typeof variable === type;
}

function argValidation(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }
  let errMsg = '';
  const types = Object.keys(typeObj);
  if(types.length === 0) {
    throw ARG_TYPE_ERR;
  }
  types.forEach(type => {
    if(!~REGISTERED_TYPES.indexOf(type)) {
      errMsg += ` "${type}"`;
    }
  });
  if(errMsg !== '') {
    throw new TypeError(TYPE_ERROR + errMsg);
  }
  return types;
}


module.exports = {
  argValidation,
  typeCheck,
  REGISTERED_TYPES,
  TYPE_ERROR,
  ARG_TYPE_ERR,
  TYPE_OF_WARN,
  makeFunctionChecker
}
