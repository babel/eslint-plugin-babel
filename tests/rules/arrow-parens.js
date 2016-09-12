/* eslint-disable */

/**
 * @fileoverview Tests for arrow-parens
 * @author Jxck
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../rules/arrow-parens"),
    RuleTester = require('../RuleTester');

function ok(code, args){
  return { code: code, options: args,  parser: 'babel-eslint' }
}

function err(code, output, errors, args){
  var e = ok(code, args)
  e.errors = errors
  e.output = output
  return e
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var ruleTester = new RuleTester();

var valid = [
    // "always" (by default)
    { code: "() => {}", ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => {}", ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => a", ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => {\n}", ecmaFeatures: { arrowFunctions: true } },
    { code: "a.then((foo) => {});", ecmaFeatures: { arrowFunctions: true } },
    { code: "a.then((foo) => { if (true) {}; });", ecmaFeatures: { arrowFunctions: true } },

    // "always" (explicit)
    { code: "() => {}", options: ["always"], ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => {}", options: ["always"], ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => a", options: ["always"], ecmaFeatures: { arrowFunctions: true } },
    { code: "(a) => {\n}", options: ["always"], ecmaFeatures: { arrowFunctions: true } },
    { code: "a.then((foo) => {});", options: ["always"], ecmaFeatures: { arrowFunctions: true } },
    { code: "a.then((foo) => { if (true) {}; });", options: ["always"], ecmaFeatures: { arrowFunctions: true } },

    // // as-needed
    { code: "() => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    { code: "a => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    { code: "a => a", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    { code: "([a, b]) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, destructuring: true } },
    { code: "({ a, b }) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, destructuring: true } },
    { code: "(a = 10) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, destructuring: true, defaultParams: true } },
    { code: "(...a) => a[0]", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true, restParams: true } },
    { code: "(a, b) => {}", options: ["as-needed"], ecmaFeatures: { arrowFunctions: true } },
    ok("(a: string) => a", ["as-needed"]),

    // "as-needed", { "requireForBlockBody": true }
    { code: "() => {}", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "a => a", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "([a, b]) => {}", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "([a, b]) => a", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "({ a, b }) => {}", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "({ a, b }) => a + b", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "(a = 10) => {}", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "(...a) => a[0]", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "(a, b) => {}", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },
    { code: "a => ({})", options: ["as-needed", { requireForBlockBody: true }], ecmaFeatures: { arrowFunctions: true } },

    // async
    ok("async () => {}"),
    ok("async (a) => {}"),
    ok("async (a) => a"),
    ok("async (a) => {\n}"),
    ok("a.then(async (foo) => {});"),
    ok("a.then((foo) => { if (true) {}; })"),

    ok("async () => {}", ["always"]),
    ok("async (a) => {}", ["always"]),
    ok("async (a) => a", ["always"]),
    ok("async (a) => {\n}", ["always"]),
    ok("a.then(async (foo) => {});", ["always"]),
    ok("a.then((foo) => { if (true) {}; })", ["always"]),

    ok("async () => {}", ["as-needed"]),
    ok("async a => {}", ["as-needed"]),
    ok("async a => a", ["as-needed"]),
    ok("async ([a, b]) => {}", ["as-needed"]),
    ok("async ({ a, b }) => {}", ["as-needed"]),
    ok("async (a = 10) => {}", ["as-needed"]),
    ok("async (...a) => a[0]", ["as-needed"]),
    ok("async (a, b) => {}", ["as-needed"]),

    ok("async () => {}", ["as-needed", { requireForBlockBody: true }]),
    ok("async a => a", ["as-needed", { requireForBlockBody: true }]),
    ok("async ([a, b]) => {}", ["as-needed", { requireForBlockBody: true }]),
    ok("async ([a, b]) => a", ["as-needed", { requireForBlockBody: true }]),
    ok("async ({ a, b }) => {}", ["as-needed", { requireForBlockBody: true }]),
    ok("async ({ a, b }) => a + b", ["as-needed", { requireForBlockBody: true }]),
    ok("async (a = 10) => {}", ["as-needed", { requireForBlockBody: true }]),
    ok("async (...a) => a[0]", ["as-needed", { requireForBlockBody: true }]),
    ok("async (a, b) => {}", ["as-needed", { requireForBlockBody: true }]),
    ok("async a => ({})", ["as-needed", { requireForBlockBody: true }]),

];

var message = message;
var asNeededMessage = asNeededMessage;
var requireForBlockBodyMessage = requireForBlockBodyMessage;
var requireForBlockBodyNoParensMessage = requireForBlockBodyNoParensMessage;
var type = type;

var invalid = [

    // "always" (by default)
    {
        code: "a => {}",
        output: "(a) => {}",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: message,
            type: type
        }]
    },
    {
        code: "a => a",
        output: "(a) => a",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: message,
            type: type
        }]
    },
    {
        code: "a => {\n}",
        output: "(a) => {\n}",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: message,
            type: type
        }]
    },
    {
        code: "a.then(foo => {});",
        output: "a.then((foo) => {});",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 8,
            message: message,
            type: type
        }]
    },
    {
        code: "a.then(foo => a);",
        output: "a.then((foo) => a);",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 8,
            message: message,
            type: type
        }]
    },
    {
        code: "a(foo => { if (true) {}; });",
        output: "a((foo) => { if (true) {}; });",
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 3,
            message: message,
            type: type
        }]
    },

    // "as-needed"
    {
        code: "(a) => a",
        output: "a => a",
        options: ["as-needed"],
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: asNeededMessage,
            type: type
        }]
    },
    {
        code: "(b) => b",
        output: "b => b",
        options: ["as-needed"],
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: asNeededMessage,
            type: type
        }]
    },

    // "as-needed", { "requireForBlockBody": true }
    {
        code: "a => {}",
        output: "(a) => {}",
        options: ["as-needed", { requireForBlockBody: true }],
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: requireForBlockBodyNoParensMessage,
            type: type
        }]
    },
    {
        code: "(a) => a",
        output: "a => a",
        options: ["as-needed", { requireForBlockBody: true }],
        ecmaFeatures: { arrowFunctions: true },
        errors: [{
            line: 1,
            column: 1,
            message: requireForBlockBodyMessage,
            type: type
        }]
    },

    // async
    err('async a => {}', 'async (a) => {}', [
      { message: 'Expected parentheses around arrow function argument.' },
    ]),

    err('async a => a', 'async (a) => a', [
      { message: 'Expected parentheses around arrow function argument.' },
    ]),

    err('async (a) => a', 'async a => a', [
      { message: 'Unexpected parentheses around single function argument' },
    ],
    ["as-needed"]),

    err('async a => {}', 'async (a) => {}', [
      { message: 'Expected parentheses around arrow function argument having a body with curly braces.' }
    ],
    ["as-needed", { requireForBlockBody: true }]),

    err('async (a) => a', 'async a => a', [
      { message: 'Unexpected parentheses around single function argument having a body with no curly braces' }
    ],
    ["as-needed", { requireForBlockBody: true }]),
];

ruleTester.run("arrow-parens", rule, {
    valid: valid,
    invalid: invalid
});
