const { expect } = require('chai');
const {
  argValidation,
  REGISTERED_TYPES
} = require('../src/helpers');

describe('Helper functions', () => {
  it('argValidation validate types', () => {
    expect(argValidation({
      string: 'str',
      object: {},
      function : 'x'
    })).to.satisfy((types) => {
      return types.every((type) => {
        return ~REGISTERED_TYPES.indexOf(type);
      });
    });
  });
  it('argValidation throw error', () => {
    expect(argValidation).to.throw(TypeError);
  })
});
