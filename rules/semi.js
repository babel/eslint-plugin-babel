/**
 * @fileoverview Rule to flag missing semicolons.
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const semiRule = eslint.linter.getRules().get("semi");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const filterSemiRule = ruleComposer.filterReports(semiRule, problem => {
    // VariableDeclaraction nodes use a modified checkForSemicolonForVariableDeclaration
    if (problem.node.type === "VariableDeclaration") {
        return false;
    }
    return true;
});
module.exports = ruleComposer.joinReports([
    filterSemiRule,
    context => {
        const OPT_OUT_PATTERN = /^[-[(/+`]/; // One of [(/+-`
        const options = context.options[1];
        const never = context.options[0] === "never",
            exceptOneLine = options && options.omitLastInOneLineBlock === true,
            sourceCode = context.getSourceCode();

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        /**
         * Reports a semicolon error with appropriate location and message.
         * @param {ASTNode} node The node with an extra or missing semicolon.
         * @param {boolean} missing True if the semicolon is missing.
         * @returns {void}
         */
        function report(node, missing) {
            const lastToken = sourceCode.getLastToken(node);
            let message,
                fix,
                loc = lastToken.loc;

            if (!missing) {
                message = "Missing semicolon.";
                loc = loc.end;
                fix = function (fixer) {
                    return fixer.insertTextAfter(lastToken, ";");
                };
            } else {
                message = "Extra semicolon.";
                loc = loc.start;
                fix = function (fixer) {
                    return fixer.remove(lastToken);
                };
            }

            context.report({
                node,
                loc,
                message,
                fix
            });
        }

        /**
         * Checks whether a token is a semicolon punctuator.
         * @param {Token} token The token.
         * @returns {boolean} True if token is a semicolon punctuator.
         */
        function isSemicolon(token) {
            return token.type === "Punctuator" && token.value === ";";
        }

        /**
         * Check if a semicolon is unnecessary, only true if:
         *   - next token is on a new line and is not one of the opt-out tokens
         *   - next token is a valid statement divider
         * @param {Token} lastToken last token of current node.
         * @returns {boolean} whether the semicolon is unnecessary.
         */
        function isUnnecessarySemicolon(lastToken) {
            if (!isSemicolon(lastToken)) {
                return false;
            }

            const nextToken = sourceCode.getTokenAfter(lastToken);

            if (!nextToken) {
                return true;
            }

            const lastTokenLine = lastToken.loc.end.line;
            const nextTokenLine = nextToken.loc.start.line;
            const isOptOutToken =
                OPT_OUT_PATTERN.test(nextToken.value) &&
                nextToken.value !== "++" &&
                nextToken.value !== "--";
            const isDivider = nextToken.value === "}" || nextToken.value === ";";

            return (lastTokenLine !== nextTokenLine && !isOptOutToken) || isDivider;
        }

        /**
         * Checks a node to see if it's in a one-liner block statement.
         * @param {ASTNode} node The node to check.
         * @returns {boolean} whether the node is in a one-liner block statement.
         */
        function isOneLinerBlock(node) {
            const nextToken = sourceCode.getTokenAfter(node);

            if (!nextToken || nextToken.value !== "}") {
                return false;
            }

            const parent = node.parent;

            return (
                parent &&
                parent.type === "BlockStatement" &&
                parent.loc.start.line === parent.loc.end.line
            );
        }

        /**
         * Checks a node to see if it's followed by a semicolon.
         * @param {ASTNode} node The node to check.
         * @returns {void}
         */
        function checkForSemicolon(node) {
            const lastToken = sourceCode.getLastToken(node);

            if (never) {
                if (isUnnecessarySemicolon(lastToken)) {
                    report(node, true);
                }
            } else {
                if (!isSemicolon(lastToken)) {
                    if (!exceptOneLine || !isOneLinerBlock(node)) {
                        report(node);
                    }
                } else {
                    if (exceptOneLine && isOneLinerBlock(node)) {
                        report(node, true);
                    }
                }
            }
        }

        /**
         * Checks to see if there's a semicolon after a variable declaration.
         * @param {ASTNode} node The node to check.
         * @returns {void}
         */
        function checkForSemicolonForVariableDeclaration(node) {
            const ancestors = context.getAncestors(),
                parentIndex = ancestors.length - 1,
                parent = ancestors[parentIndex];

            if (
                (parent.type !== "ForStatement" || parent.init !== node) &&
                (!/^For(?:In|Of|Await)Statement/.test(parent.type) ||
                    parent.left !== node)
            ) {
                checkForSemicolon(node);
            }
        }

        //--------------------------------------------------------------------------
        // Public API
        //--------------------------------------------------------------------------

        return {
            VariableDeclaration: checkForSemicolonForVariableDeclaration,
            ClassProperty: checkForSemicolon
        };
    }
]);
