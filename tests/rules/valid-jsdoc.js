/* eslint-disable */

/**
 * @fileoverview Tests for valid-jsdoc rule.
 * @author Viktor Gvozdev
 */

var rule = require('../../rules/valid-jsdoc'),
    RuleTester = require('../RuleTester');

var ruleTester = new RuleTester();
ruleTester.run('babel/valid-jsdoc', rule, {
    valid: [
        // Babel-specific test cases.
        {
            code: "@MyDecorator(123)\n/** Documentation*/\nclass MyClass{}",
            parser: "babel-eslint",
            options: [{
                matchDescription: 'Documentation'
            }]
        },
        {
            code: "/** Documentation*/\n@MyDecorator(123)\nclass MyClass{}",
            parser: "babel-eslint",
            options: [{
                matchDescription: 'Documentation'
            }]
        },
        {
            code: "class MyClass{\n@MyDecorator(123)\n/** Documentation*/\nmethod() {}\n}",
            parser: "babel-eslint",
            options: [{
                matchDescription: 'Documentation',
                requireReturn: false
            }]
        },
        {
            code: "class MyClass{\n/** Documentation*/\n@MyDecorator(123)\nmethod() {}\n}",
            parser: "babel-eslint",
            options: [{
                matchDescription: 'Documentation',
                requireReturn: false
            }]
        }
    ],
    invalid: [
        {
            code: "@MyDecorator(123)\n/** Documentation*/\nclass MyClass{}",
            parser: "babel-eslint",
            errors: ['JSDoc description does not satisfy the regex pattern.'],
            options: [{
                matchDescription: 'Docs'
            }]
        },
        {
            code: "/** Documentation*/\n@MyDecorator(123)\nclass MyClass{}",
            parser: "babel-eslint",
            errors: ['JSDoc description does not satisfy the regex pattern.'],
            options: [{
                matchDescription: 'Docs'
            }]
        },
        {
            code: "class MyClass{\n@MyDecorator(123)\n/** Documentation*/\nmethod() {}\n}",
            parser: "babel-eslint",
            errors: ['JSDoc description does not satisfy the regex pattern.'],
            options: [{
                matchDescription: 'Docs',
                requireReturn: false
            }]
        },
        {
            code: "class MyClass{\n/** Documentation*/\n@MyDecorator(123)\nmethod() {}\n}",
            parser: "babel-eslint",
            errors: ['JSDoc description does not satisfy the regex pattern.'],
            options: [{
                matchDescription: 'Docs',
                requireReturn: false
            }]
        }
    ]
});
