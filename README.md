# eslint-plugin-babel

An `eslint` plugin companion to `babel-eslint`. `babel-eslint` does a great job at adapting `eslint`
for use with Babel, but it can't change the built in rules to support experimental features.
`eslint-plugin-babel` re-implements problematic rules so they do not give false positives or negatives.

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
    "babel/no-invalid-this": 1
  }
}
```
### Rules

Each rule corresponds to a core `eslint` rule, and has the same options.

🛠 : means it's autofixable with `--fix`.

- `babel/new-cap`: Ignores capitalized decorators (`@Decorator`)
- `babel/object-curly-spacing`: doesn't complain about `export x from "mod";` or `export * as x from "mod";` (🛠 )
- `babel/no-invalid-this`: doesn't fail when inside class properties (`class A { a = this.b; }`)

The following rules are not in `eslint`, but are relevant only to syntax that is not specified by
the current JavaScript standard or supported by `eslint`.

- `babel/no-await-in-loop`: guard against awaiting async functions inside of a loop
- `babel/flow-object-type`: Require a particular separator between properties in Flow object types. (🛠 )
  - Use the option `semicolon` to require semicolons (e.g. `type Foo = { bar: number; baz: string }`).
  - Use the option `comma` to require commas (e.g. `type Foo = { bar: number, baz: string }`).


#### Deprecated

- `babel/generator-star-spacing`: Handles async/await functions correctly
- `babel/object-shorthand`: doesn't fail when using object spread (`...obj`)
- `babel/arrow-parens`: Handles async functions correctly (🛠 )
- `babel/func-params-comma-dangle`: Require or forbid trailing commas for function paramater lists. Behaves like, and takes the same options as, `eslint`'s [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle). (🛠 )
- `babel/array-bracket-spacing`: Handles destructuring arrays with flow type in function parameters (🛠 )
