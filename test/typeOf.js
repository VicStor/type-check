const { expect } = require('chai');
const { typeOf } = require('../src/main');
const { ARG_TYPE_ERR } = require('../src/helpers');

const prom = (x) => new Promise((res, rej) => {
  try {
    setTimeout(() => {
      return res(`Good ${x}`);
    }, 1000);
  } catch(err) {
    return rej(err);
  }
});

describe('Test typeOf() function', () => {
  it('Expect to throw the TypeError if argument not of "object" type', () => {
    expect(typeOf).to.throw(TypeError, ARG_TYPE_ERR);
  });

  it('Expect to throw the TypeError if argument is empty object', () => {
    expect(typeOf).to.throw(TypeError, ARG_TYPE_ERR);
  });

  it('typeOf should return true with warning', () => {
    expect(typeOf({ string: ['str', 'str'] })).to.be.true;
  });

  it('typeOf should return true for promise', () => {
    expect(typeOf({ promise: prom('xxx') })).to.be.true;
  });

  it('typeOf should return false for function but not promise', () => {
    expect(typeOf({ promise: prom })).to.be.false;
  });

  it('typeOf should return false', () => {
    expect(typeOf({ function: 'str' })).to.be.false;
  });

  it('typeOf should return false with warning', () => {
    expect(typeOf({
      function: 'str',
      string: 'str'
   })).to.be.false;
  });
});
