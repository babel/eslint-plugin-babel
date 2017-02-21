/**
 * @fileoverview Rule to check for jsdoc presence.
 * @author Gyandeep Singh
 */
"use strict";
var originalRule = require('eslint/lib/rules/valid-jsdoc'),
    findJSDocComment = require('../ast-utils').findJSDocComment;

module.exports = {
    meta: originalRule.mets,

    create(originalContext) {
        const context = Object.create(originalContext);
        context.getSourceCode = function () {
            const source = Object.create(originalContext.getSourceCode()),
                originalGetJSDocComment = source.getJSDocComment;
            source.getJSDocComment = function (node) {
                return originalGetJSDocComment.call(this, node) ||
                    (node.type === 'ClassDeclaration' && checkDecorators(node)) ||
                    (node.type === 'FunctionExpression' && node.parent.type === 'MethodDefinition' && checkDecorators(node.parent)) ||
                    null;
            };
            return source;
        };
        return originalRule.create(context);
    }
};

function checkDecorators(node) {
    if(node.decorators && node.decorators[0]) {
        return findJSDocComment(node.decorators[0].leadingComments, node.decorators[0].loc.start.line)
    }
    return null;
}