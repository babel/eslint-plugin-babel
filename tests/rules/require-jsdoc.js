/* eslint-disable */

/**
 * @fileoverview Tests for require-jsdoc rule.
 * @author Viktor Gvozdev
 */

var rule = require('../../rules/require-jsdoc'),
    RuleTester = require('../RuleTester');

var ruleTester = new RuleTester();
ruleTester.run('babel/require-jsdoc', rule, {
    valid: [
        // Babel-specific test cases.
        {
            code: "@MyDecorator(123)\n/** Documentation*/\nclass MyClass{}",
            parser: "babel-eslint",
            options: [{
                "require": {
                    "ClassDeclaration": true
                }
            }]
        },
        {
            code: "/** Documentation*/\n@MyDecorator(123)\nclass MyClass{}",
            parser: "babel-eslint",
            options: [{
                "require": {
                    "ClassDeclaration": true
                }
            }]
        },
        {
            code: "class MyClass{\n@MyDecorator(123)\n/** Documentation*/\nmethod() {}\n}",
            parser: "babel-eslint",
            options: [{
                "require": {
                    "MethodDefinition": true
                }
            }]
        },
        {
            code: "class MyClass{\n/** Documentation*/\n@MyDecorator(123)\nmethod() {}\n}",
            parser: "babel-eslint",
            options: [{
                "require": {
                    "MethodDefinition": true
                }
            }]
        }
    ],
    invalid: [
        {
            code: "@MyDecorator(123)\nclass MyClass{}",
            parser: "babel-eslint",
            errors: ['Missing JSDoc comment.'],
            options: [{
                "require": {
                    "ClassDeclaration": true
                }
            }]
        },
        {
            code: "@MyDecorator(123)\nclass MyClass{}",
            parser: "babel-eslint",
            errors: ['Missing JSDoc comment.'],
            options: [{
                "require": {
                    "ClassDeclaration": true
                }
            }]
        },
        {
            code: "class MyClass{\n@MyDecorator(123)\nmethod() {}\n}",
            parser: "babel-eslint",
            errors: ['Missing JSDoc comment.'],
            options: [{
                "require": {
                    "MethodDefinition": true
                }
            }]
        },
        {
            code: "class MyClass{\n@MyDecorator(123)\nmethod() {}\n}",
            parser: "babel-eslint",
            errors: ['Missing JSDoc comment.'],
            options: [{
                "require": {
                    "MethodDefinition": true
                }
            }]
        }
    ]
});
