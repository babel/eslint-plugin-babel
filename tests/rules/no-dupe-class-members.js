/**
 * Forked from core to allow for stage-3 class properties proposal.
 * https://github.com/eslint/eslint/blob/c464e2744ec76e7e9c6c5af0f6162c92187f1ece/tests/lib/rules/no-dupe-class-members.js
 *
 * Once class properties reach stage 4 this should be re-integrated to core.
 *
 * Proposal reference: https://github.com/tc39/proposal-class-fields
 * See Also: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../rules/no-dupe-class-members");
const RuleTester = require("../RuleTester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run("no-dupe-class-members", rule, {
  valid: [
    "class A { foo() {} bar() {} }",
    "class A { static foo() {} foo() {} }",
    "class A { get foo() {} set foo(value) {} }",
    "class A { static foo() {} get foo() {} set foo(value) {} }",
    "class A { foo() { } } class B { foo() { } }",
    "class A { [foo]() {} foo() {} }",
    "class A { 'foo'() {} 'bar'() {} baz() {} }",
    "class A { *'foo'() {} *'bar'() {} *baz() {} }",
    "class A { get 'foo'() {} get 'bar'() {} get baz() {} }",
    "class A { 1() {} 2() {} }"
  ],
  invalid: [
    {
      code: "class A { foo() {} foo() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 20,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    },
    {
      code: "!class A { foo() {} foo() {} };",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 21,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    },
    {
      code: "class A { 'foo'() {} 'foo'() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 22,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    },
    {
      code: "class A { 10() {} 1e1() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 19,
          messageId: "unexpected",
          data: { name: "10" }
        }
      ]
    },
    {
      code: "class A { foo() {} foo() {} foo() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 20,
          messageId: "unexpected",
          data: { name: "foo" }
        },
        {
          type: "MethodDefinition",
          line: 1,
          column: 29,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    },
    {
      code: "class A { static foo() {} static foo() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 27,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    },
    {
      code: "class A { foo() {} get foo() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 20,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    },
    {
      code: "class A { set foo(value) {} foo() {} }",
      errors: [
        {
          type: "MethodDefinition",
          line: 1,
          column: 29,
          messageId: "unexpected",
          data: { name: "foo" }
        }
      ]
    }
  ]
});
