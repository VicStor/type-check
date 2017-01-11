const ARG_TYPE_ERR = new TypeError('Argument must be of "object" type, with signature { type: variable }');
const TYPE_OF_WARN = 'Function typeOf() checks the type of only first property in object\nuse everyType() or someType() for multiple checks';
function typeOf(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }
  const types = Object.keys(typeObj);
  if (types.length > 1) {
    console.warn(TYPE_OF_WARN);
  }
  if(types[0] === 'promise') {
    return typeof typeObj[types[0]].then === 'function';
  }
  return typeof typeObj[types[0]] === types[0];
}

function someTypeOf(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }
  const types = Object.keys(typeObj);
  return types.some((type) => {
    if(type === 'promise') {
      return typeof typeObj[type].then === 'function';
    }
    return typeof typeObj[type] === type;
  });
}

function everyTypeOf(typeObj) {
  if(typeof typeObj !== 'object') {
    throw ARG_TYPE_ERR;
  }
  const types = Object.keys(typeObj);

  return types.every((type) => {
    if(type === 'promise') {
      return typeof typeObj[type].then === 'function';
    }
    return typeof typeObj[type] === type
  });
}



module.exports = {
  typeOf,
  everyTypeOf,
  someTypeOf
}
