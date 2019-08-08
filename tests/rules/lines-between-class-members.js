/**
 * @fileoverview Tests for lines-between-class-members rule.
 * @author 薛定谔的猫<hh_2013@foxmail.com>
 * @author Aparajita Fishman
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../rules/lines-between-class-members"),
    RuleTester = require("../RuleTester");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------
const messages = {
    never: "Unexpected blank line between class members.",
    always: "Expected blank line between class members."
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("lines-between-class-members", rule, {
    valid: [
        "class foo{}",
        "class foo{;;}",
        "class foo{\n\n}",
        "class foo{constructor(){}\n}",
        "class foo{\nconstructor(){}}",

        "class foo{ bar(){}\n\nbaz(){}}",
        "class foo{ bar(){}\n\n/*comments*/baz(){}}",
        "class foo{ bar(){}\n\n//comments\nbaz(){}}",
        "class foo{ bar(){}\n//comments\n\nbaz(){}}",
        "class A{ foo() {} // a comment\n\nbar() {}}",
        "class A{ foo() {}\n/* a */ /* b */\n\nbar() {}}",
        "class A{ foo() {}/* a */ \n\n /* b */bar() {}}",

        "class foo{ bar(){}\n\n;;baz(){}}",
        "class foo{ bar(){};\n\nbaz(){}}",

        // Class fields
        "class foo{ bar\nbaz = 7\n\nboo(){}}",
        "class foo{ bar = 13\nbaz\n\nboo(){}}",
        "class foo{ bar;\nbaz;\n\nboo(){}}",
        "class foo{ bar;baz;\n\nboo(){}}",
        "class foo{ #bar\nbaz\n\nboo(){}}",
        "class foo{ #bar\n#baz\n\nboo(){}}",
        "class foo{ #bar\n\nboo(){}\n\n#boo\nhoo}",

        { code: "class foo{ bar(){}\nbaz(){}}", options: ["never"] },
        { code: "class foo{ bar(){}\n/*comments*/baz(){}}", options: ["never"] },
        { code: "class foo{ bar(){}\n//comments\nbaz(){}}", options: ["never"] },
        { code: "class foo{ bar(){}/* comments\n\n*/baz(){}}", options: ["never"] },
        { code: "class foo{ bar(){}/* \ncomments\n*/baz(){}}", options: ["never"] },
        { code: "class foo{ bar(){}\n/* \ncomments\n*/\nbaz(){}}", options: ["never"] },

        { code: "class foo{ bar(){}\n\nbaz(){}}", options: ["always"] },
        { code: "class foo{ bar(){}\n\n/*comments*/baz(){}}", options: ["always"] },
        { code: "class foo{ bar(){}\n\n//comments\nbaz(){}}", options: ["always"] },

        { code: "class foo{ bar(){}\nbaz(){}}", options: ["always", { exceptAfterSingleLine: true }] },
        { code: "class foo{ bar(){\n}\n\nbaz(){}}", options: ["always", { exceptAfterSingleLine: true }] }
    ],
    invalid: [
        {
            code: "class foo{ boo\n#hoo\n\nbar(){}\nbaz(){}}",
            output: "class foo{ boo\n#hoo\n\nbar(){}\n\nbaz(){}}",
            options: ["always"],
            errors: [messages.always]
        }, {
            code: "class foo{ boo\n#hoo\nbar(){}\n\nbaz(){}}",
            output: "class foo{ boo\n#hoo\nbar(){}\nbaz(){}}",
            options: ["never"],
            errors: [messages.never]
        }, {
            code: "class foo{ boo\n#hoo\n\nbar(){\n}\nbaz(){}}",
            output: "class foo{ boo\n#hoo\n\nbar(){\n}\n\nbaz(){}}",
            options: ["always", { exceptAfterSingleLine: true }],
            errors: [messages.always]
        }
    ]
});
