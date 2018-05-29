"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const rule = new eslint.Linter().getRules().get('no-unused-expressions');

/**
 * @param {ASTNode} node - any node
 * @returns {boolean} whether the given node is either an IfStatement or an
 *   ExpressionStatement and is the last node in the body of a BlockStatement
 */
function isFinalStatementInBlockStatement(node) {
  const parent = node.parent;
  return /^(?:If|Expression)Statement$/.test(node.type) &&
    parent.type === 'BlockStatement' &&
    parent.body[parent.body.length - 1] === node;
}

/**
 * @param {ASTNode} node - any node
 * @returns {boolean} whether the given node represents an unbroken chain of
 *   tail ExpressionStatements and IfStatements within a DoExpression
 */
function isInDoStatement(node) {
  if (!node) return false;

  if (node.type === 'DoExpression') return true;

  if (
    node.parent &&
    node.parent.type === 'IfStatement'
  ) {
    return isInDoStatement(node.parent);
  }

  if (isFinalStatementInBlockStatement(node)) {
    return isInDoStatement(node.parent.parent);
  }

  return false;
}

module.exports = ruleComposer.filterReports(
  rule,
  (problem, metadata) => !isInDoStatement(problem.node)
);
