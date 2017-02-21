# eslint-plugin-babel

An `eslint` plugin companion to `babel-eslint`. `babel-eslint` does a great job at adapting `eslint`
for use with Babel, but it can't change the built in rules to support experimental features.
`eslint-plugin-babel` re-implements problematic rules so they do not give false positives or negatives.

> Requires Node 4 or greater

### Install

```sh
npm install eslint-plugin-babel --save-dev
```

Load the plugin in your `.eslintrc` file:

```json
{
  "plugins": [
    "babel"
  ]
}
```

Finally enable all the rules you would like to use (remember to disable the
original ones as well!).

```json
{
  "rules": {
    "babel/new-cap": 1,
    "babel/object-curly-spacing": 1,
    "babel/no-await-in-loop": 1,
    "babel/flow-object-type": 1,
    "babel/no-invalid-this": 1,
    "babel/semi": 1
  }
}
```
### Rules

Each rule corresponds to a core `eslint` rule, and has the same options.

🛠 : means it's autofixable with `--fix`.

- `babel/new-cap`: Ignores capitalized decorators (`@Decorator`)
- `babel/object-curly-spacing`: doesn't complain about `export x from "mod";` or `export * as x from "mod";` (🛠 )
- `babel/no-invalid-this`: doesn't fail when inside class properties (`class A { a = this.b; }`)
- `babel/semi`: Includes class properties (🛠 )

The following rules are not in `eslint`, but are relevant only to syntax that is not specified by
the current JavaScript standard or supported by `eslint`.

- `babel/no-await-in-loop`: guard against awaiting async functions inside of a loop

#### Deprecated

- `babel/generator-star-spacing`: Use [`generator-star-spacing`](http://eslint.org/docs/rules/generator-star-spacing).
- `babel/object-shorthand`: Use [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand).
- `babel/arrow-parens`: Use [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens).
- `babel/func-params-comma-dangle`: Use [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle).
- `babel/array-bracket-spacing`: Use [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing).
- `babel/flow-object-type`: Use [`flowtype/object-type-delimiter`](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-object-type-delimiter).
