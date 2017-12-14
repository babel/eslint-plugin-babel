/**
 * @fileoverview Disallow shadowing of NaN, undefined, and Infinity (ES5 section 15.1.1)
 * @author Michael Ficarra
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../rules/no-shadow-restricted-names'),
    RuleTester = require('../RuleTester');

const ruleTester = new RuleTester();

ruleTester.run("babel/no-shadow-restricted-names", rule, {
    valid: [
        "function foo(bar){ var baz; }",
        "!function foo(bar){ var baz; }",
        "!function(bar){ var baz; }",
        "try {} catch(e) {}",
        { code: "export default function() {}", parserOptions: { sourceType: "module" } },
        // Babel-specific test cases.
        "try {} catch {}"
    ],
    invalid: [
        {
            code: "function NaN(NaN) { var NaN; !function NaN(NaN) { try {} catch(NaN) {} }; }",
            parserOptions: { sourceType: "script" },
            errors: [
                { message: "Shadowing of global property 'NaN'.", type: "Identifier" },
                { message: "Shadowing of global property 'NaN'.", type: "Identifier" },
                { message: "Shadowing of global property 'NaN'.", type: "Identifier" },
                { message: "Shadowing of global property 'NaN'.", type: "Identifier" },
                { message: "Shadowing of global property 'NaN'.", type: "Identifier" },
                { message: "Shadowing of global property 'NaN'.", type: "Identifier" }
            ]
        },
        {
            code: "function undefined(undefined) { var undefined; !function undefined(undefined) { try {} catch(undefined) {} }; }",
            parserOptions: { sourceType: "script" },
            errors: [
                { message: "Shadowing of global property 'undefined'.", type: "Identifier" },
                { message: "Shadowing of global property 'undefined'.", type: "Identifier" },
                { message: "Shadowing of global property 'undefined'.", type: "Identifier" },
                { message: "Shadowing of global property 'undefined'.", type: "Identifier" },
                { message: "Shadowing of global property 'undefined'.", type: "Identifier" },
                { message: "Shadowing of global property 'undefined'.", type: "Identifier" }
            ]
        },
        {
            code: "function Infinity(Infinity) { var Infinity; !function Infinity(Infinity) { try {} catch(Infinity) {} }; }",
            parserOptions: { sourceType: "script" },
            errors: [
                { message: "Shadowing of global property 'Infinity'.", type: "Identifier" },
                { message: "Shadowing of global property 'Infinity'.", type: "Identifier" },
                { message: "Shadowing of global property 'Infinity'.", type: "Identifier" },
                { message: "Shadowing of global property 'Infinity'.", type: "Identifier" },
                { message: "Shadowing of global property 'Infinity'.", type: "Identifier" },
                { message: "Shadowing of global property 'Infinity'.", type: "Identifier" }
            ]
        },
        {
            code: "function arguments(arguments) { var arguments; !function arguments(arguments) { try {} catch(arguments) {} }; }",
            parserOptions: { sourceType: "script" },
            errors: [
                { message: "Shadowing of global property 'arguments'.", type: "Identifier" },
                { message: "Shadowing of global property 'arguments'.", type: "Identifier" },
                { message: "Shadowing of global property 'arguments'.", type: "Identifier" },
                { message: "Shadowing of global property 'arguments'.", type: "Identifier" },
                { message: "Shadowing of global property 'arguments'.", type: "Identifier" },
                { message: "Shadowing of global property 'arguments'.", type: "Identifier" }
            ]
        },
        {
            code: "function eval(eval) { var eval; !function eval(eval) { try {} catch(eval) {} }; }",
            parserOptions: { sourceType: "script" },
            errors: [
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" }
            ]
        },
        {
            code: "var eval = (eval) => { var eval; !function eval(eval) { try {} catch(eval) {} }; }",
            parserOptions: { sourceType: "script" },
            errors: [
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" },
                { message: "Shadowing of global property 'eval'.", type: "Identifier" }
            ]
        }
    ]
});
