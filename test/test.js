const { expect } = require('chai');
const {
  typeOf,
  someTypeOf,
  everyTypeOf
} = require('../');



describe('Test typeOf(), someTypeOf(), everyTypeOf()', () => {

  const prom = (x) => new Promise((res, rej) => {
    try {
      setTimeout(() => {
        return res(`Good ${x}`);
      }, 1000);
    } catch(err) {
      return rej(err);
    }
  });

  it('Expect to throw the TypeError if argument not of "object" type', () => {
    const errMsg = 'Argument must be of "object" type, with signature { type: variable }';
    expect(typeOf).to.throw(TypeError, errMsg);
    expect(everyTypeOf).to.throw(TypeError, errMsg);
    expect(someTypeOf).to.throw(TypeError, errMsg);
  });

  it('Expect to throw the TypeError if argument is empty object', () => {
    const errMsg = 'Argument must be of "object" type, with signature { type: variable }';
    expect(typeOf({})).to.throw(TypeError, errMsg);
    expect(everyTypeOf({})).to.throw(TypeError, errMsg);
    expect(someTypeOf({})).to.throw(TypeError, errMsg);
  });

  it('typeOf should return true', () => {
    expect(typeOf({ string: 'str' })).to.be.true;
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

  it('typeOf should return false', () => {
    expect(typeOf({
      function: 'str',
      string: 'str'
   })).to.be.false;
  });

  it('everyTypeOf should return false', () => {
    expect(everyTypeOf({
      function: 'str',
      string: 'str',
      object: {}
   })).to.be.false;
  });

  it('everyTypeOf should return true', () => {
    expect(everyTypeOf({
      function: x => x,
      number: 9,
      boolean: false,
      string: 'str',
      object: {},
      object: null,
      object: [],
      symbol: Symbol(),
      promise: prom('xxx')
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
