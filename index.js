'use strict';

module.exports = {
  rules: {
    'generator-star-spacing': require('./rules/generator-star-spacing'),
    'new-cap': require('./rules/new-cap'),
    'object-curly-spacing': require('./rules/object-curly-spacing'),
    'array-bracket-spacing': require('./rules/array-bracket-spacing'),
    'object-shorthand': require('./rules/object-shorthand'),
    'arrow-parens': require('./rules/arrow-parens'),
    'no-await-in-loop': require('./rules/no-await-in-loop'),
    'flow-object-type': require('./rules/flow-object-type'),
    'func-params-comma-dangle': require('./rules/func-params-comma-dangle'),
    'no-invalid-this': require('./rules/no-invalid-this'),
    'semi': require('./rules/semi'),
  },
  rulesConfig: {
    'generator-star-spacing': 0,
    'new-cap': 0,
    'object-curly-spacing': 0,
    'array-bracket-spacing': 0,
    'object-shorthand': 0,
    'arrow-parens': 0,
    'no-await-in-loop': 0,
    'flow-object-type': 0,
    'func-params-comma-dangle': 0,
    'no-invalid-this': 0,
    'semi': 0,
  }
};
