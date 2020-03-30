/**
 * Forked from core eslint to allow for stage-3 class properties proposal.
 * https://github.com/eslint/eslint/blob/c464e2744ec76e7e9c6c5af0f6162c92187f1ece/lib/rules/no-dupe-class-members.js
 *
 * Once class properties reach stage 4 this should be re-integrated to core.
 *
 * Proposal reference: https://github.com/tc39/proposal-class-fields
 * See Also: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "problem",

    docs: {
      description: "disallow duplicate class members",
      category: "ECMAScript 6",
      recommended: true,
      url: "https://eslint.org/docs/rules/no-dupe-class-members"
    },

    schema: [],

    messages: {
      unexpected: "Duplicate name '{{name}}'."
    }
  },

  create(context) {
    let stack = [];

    /**
     * Gets state of a given member name.
     * @param {string} name - A name of a member.
     * @param {boolean} isStatic - A flag which specifies that is a static member.
     * @returns {Object} A state of a given member name.
     *   - retv.init {boolean} A flag which shows the name is declared as normal member.
     *   - retv.get {boolean} A flag which shows the name is declared as getter.
     *   - retv.set {boolean} A flag which shows the name is declared as setter.
     */
    function getState(name, isStatic) {
      const stateMap = stack[stack.length - 1];
      const key = `$${name}`; // to avoid "__proto__".

      if (!stateMap[key]) {
        stateMap[key] = {
          nonStatic: { init: false, get: false, set: false },
          static: { init: false, get: false, set: false }
        };
      }

      return stateMap[key][isStatic ? "static" : "nonStatic"];
    }

    /**
     * Gets the name text of a given node.
     *
     * @param {ASTNode} node - A node to get the name.
     * @returns {string} The name text of the node.
     */
    function getName(node) {
      switch (node.type) {
        case "Identifier":
          return node.name;
        case "Literal":
          return String(node.value);

        /* istanbul ignore next: syntax error */
        default:
          return "";
      }
    }

    /**
     * Reports the node if its name has been declared already.
     *
     * @param {ASTNode} node - A node to get the name.
     */
    function checkIfDuplicate(node) {
      if (node.computed) {
        return;
      }

      const name = getName(node.key);
      const state = getState(name, node.static);
      let isDuplicate = false;

      if (node.kind === "get") {
        isDuplicate = state.init || state.get;
        state.get = true;
      } else if (node.kind === "set") {
        isDuplicate = state.init || state.set;
        state.set = true;
      } else {
        isDuplicate = state.init || state.get || state.set;
        state.init = true;
      }

      if (isDuplicate) {
        context.report({ node, messageId: "unexpected", data: { name } });
      }
    }

    /**
     * Detects if the passed in node is a class property assignment like:
     *
     * foo = this.foo.bind(this);
     *
     * @param {ASTNode} node
     * @return {boolean} true if this is a self-bind class property, false otherwise
     */
    function isSelfBind(node) {
      if (node.type !== 'ClassProperty') return false;
      if (node.computed || node.static) return false;

      let { key, value } = node;
      if (key.type !== 'Identifier') return false;
      if (!value || value.type !== 'CallExpression') return false;

      let { callee, arguments: args } = value;
      if (callee.type !== 'MemberExpression') return false;
      if (args.length !== 1 || args[0].type !== 'ThisExpression') return false;

      let { object, property } = callee;
      if (object.type !== 'MemberExpression') return false;
      if (property.type !== 'Identifier' || property.name !== 'bind') return false;

      let { object: innerObject, property: innerProperty } = object;
      if (innerObject.type !== 'ThisExpression') return false;
      if (innerProperty.type !== 'Identifier') return false;

      return key.name === innerProperty.name;
    }

    return {
      // Initializes the stack of state of member declarations.
      Program() {
        stack = [];
      },

      // Initializes state of member declarations for the class.
      ClassBody() {
        stack.push(Object.create(null));
      },

      // Disposes the state for the class.
      "ClassBody:exit"() {
        stack.pop();
      },

      ClassProperty(node) {
        if (!isSelfBind(node)) {
          checkIfDuplicate(node);
        }
      },

      MethodDefinition(node) {
        checkIfDuplicate(node);
      }
    };
  }
};
