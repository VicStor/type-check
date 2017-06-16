const { expect } = require('chai');
const { everyTypeOf } = require('../src/main');
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
const targetObject = {
  name: 'Object name',
  description: 'Object description',
  count: 9,
  method1: x => x,
  promise: prom('xxx')
}

describe('Test everyTypeOf()', () => {

  it('Expect to throw the TypeError if argument not of "object" type', () => {
    expect(everyTypeOf).to.throw(TypeError, ARG_TYPE_ERR);
  });

  it('Expect to throw the TypeError if argument is empty object', () => {
    expect(everyTypeOf).to.throw(TypeError, ARG_TYPE_ERR);
  });

  it('everyTypeOf should return false', () => {
    expect(everyTypeOf({
      function: 'str',
      string: 'str',
      object: {}
   })).to.be.false;
  });

  it('everyTypeOf should return false', () => {
    expect(everyTypeOf({
      function: x => x,
      number: [9, 10, 12],
      boolean: false,
      string: 'str',
      object: [{}, [], 'null'],
      symbol: Symbol(),
      promise: prom('xxx')
   })).to.be.false;
  });

  it('everyTypeOf should return true', () => {
    expect(everyTypeOf({
      function: [x => x, y => y],
      number: [9, 10, 12],
      boolean: [false, true],
      string: 'str',
      object: [null, {}, []],
      symbol: Symbol(),
      promise: [prom('xxx'), prom('yyy')]
   })).to.be.true;
  });

  it('everyTypeOf should return true', () => {
    expect(everyTypeOf({
      string: [targetObject.name, targetObject.description],
      number: targetObject.count,
      function: targetObject.method1,
      promise: targetObject.promise
    })).to.be.true;
  });
  
  it('everyTypeOf should return true', () => {
    let v1, v2, v3;
    expect(everyTypeOf({
      undefined: [v1, v2, v3]
    })).to.be.true;
  });
});
