const ARG_TYPE_ERR = new TypeError('Argument must be of "object" type, with signature { type: variable }');
const TYPE_OF_WARN = 'Function typeOf() checks the type of only first property in object\nuse everyType() or someType() for multiple checks';
function makeChecker(typeObj) {
  return (type) => {
    if(type === 'promise') {
      return typeof typeObj[type].then === 'function';
    }
    return typeof typeObj[type] === type;
  }
}

function typeOf(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }

  const types = Object.keys(typeObj);

  if(types.length === 0) {
    throw ARG_TYPE_ERR;
  }
  if (types.length > 1) {
    console.warn(TYPE_OF_WARN);
  }
  return makeChecker(typeObj)(types[0]);
}

function someTypeOf(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }
  const types = Object.keys(typeObj);
  const typeChecker = makeChecker(typeObj);

  if(types.length === 0) {
    throw ARG_TYPE_ERR;
  }

  return types.some(typeChecker);

}

function everyTypeOf(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }
  const types = Object.keys(typeObj);
  const typeChecker = makeChecker(typeObj);

  if(types.length === 0) {
    throw ARG_TYPE_ERR;
  }

  return types.every(typeChecker);
}



module.exports = {
  typeOf,
  everyTypeOf,
  someTypeOf
}
