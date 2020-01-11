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

  // this is an `else if`
  if (
    node.type === 'IfStatement' &&
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

/**
 * @param {ASTNode} node - any node
 * @returns {boolean} whether the given node is an optional call expression,
 * see https://github.com/tc39/proposal-optional-chaining
 */
function isOptionalCallExpression(node) {
  return (
    !!node &&
    node.type === 'ExpressionStatement' &&
    node.expression.type === 'OptionalCallExpression'
  );
}

/**
 * @param {ASTNode} node - any node
 * @return {boolean} whether the expression is a pipeline,
 *  https://github.com/tc39/proposal-pipeline-operator
 */
function isPipeline(node) {
  return (
    !!node &&
    node.type === 'ExpressionStatement' &&
    node.expression.type === 'BinaryExpression' &&
    node.expression.operator === '|>'
  )
}

module.exports = ruleComposer.filterReports(
  rule,
  (problem, metadata) =>
    !isInDoStatement(problem.node) && !isOptionalCallExpression(problem.node) && !isPipeline(problem.node)
);

