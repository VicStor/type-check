const { expect } = require('chai');
const { someTypeOf } = require('../src/main');
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

describe('Test someTypeOf() function', () => {
  it('Expect to throw the TypeError if argument not of "object" type', () => {
    expect(someTypeOf).to.throw(TypeError, ARG_TYPE_ERR);
  });

  it('Expect to throw the TypeError if argument is empty object', () => {
    expect(someTypeOf).to.throw(TypeError, ARG_TYPE_ERR);
  });

  it('someTypeOf should return true', () => {
    expect(someTypeOf({
      string: ['str', 'str'],
      object: [{}, 'str']
    })).to.be.true;
  });

  it('someTypeOf should return true for promise', () => {
    expect(someTypeOf({ promise: prom('xxx') })).to.be.true;
  });

  it('someTypeOf should return false for function but not promise', () => {
    expect(someTypeOf({ promise: prom })).to.be.false;
  });

  it('someTypeOf should return false', () => {
    expect(someTypeOf({
      function: 'str',
      object: 'str'
    })).to.be.false;
  });

  it('someTypeOf should return true', () => {
    expect(someTypeOf({
      function: 'str',
      string: 'str'
   })).to.be.true;
  });

  it('someTypeOf should return true', () => {
    expect(someTypeOf({
      function: x => x,
      string: 'str',
      object: {}
   })).to.be.true;
  });

  it('someTypeOf should return true', () => {
    expect(someTypeOf({
      function: 'str',
      string: 9,
      object: {}
   })).to.be.true;
  });
});
