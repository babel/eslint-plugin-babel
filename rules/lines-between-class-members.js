"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const rule = new eslint.Linter().getRules().get('lines-between-class-members');

module.exports = ruleComposer.filterReports(
    rule,
    (problem, metadata) => {
        let inClassProperty = false;
        let node = problem.node;

        while (node) {
            if (node.type === "ClassProperty" || node.type === "ClassPrivateProperty") {
                inClassProperty = true;
                return;
            }

            node = node.parent;
        }

        return !inClassProperty;
    }
);
