# Spacebars to JSX

Converts Spacebars AST to JSX-component (JSX code or JSX AST). Use it combined with [Spacebars-AST](https://github.com/Clovis-Portron/spacebars-AST) to parse Spacebars code to spacebars AST. 

This project is based on the [handlebars-to-jsx](https://github.com/danakt/handlebars-to-jsx) project from [Danakt](https://github.com/danakt).

Even if spacebars and handlebars are pretty similar, spacebars allow some additional things compared to its "cousin". 
The handlebars-to-jsx project does not support:

* Use of `{{#if}}{{#unless}}` blocks in attributs
* helpers and nested calls are ignored
* partials 

This projects tries to get around these limitations to allow full spacebars support. 

## Installation

```bash
# via cloning 
git clone git@github.com:Clovis-Portron/spacebars-to-jsx.git
cd spacebars-to-jsx
npm run build 
# the usable code is in the dist folder 
```

## Usage

This package has two methods. 

The `compile` method has the following syntax:

```
compile(input[, options])
```

- `input`  
  The Spacebars AST which should be converted to JSX code or JSX AST.
- `options` _Optional_  
  Options is optional and can have the following properties:
  - `isComponent` _Optional_  
    The default is `true`. Should return JSX code wrapped as a function component.
  - `isModule` _Optional_  
    The default is `false`. Should return generated code exported as default.
  - `includeImport` _Optional_  
    The default is `false`. Should return generated code with React import at the top. Requires `isModule` to be true.
  - `onlyAST` _Optional_ 
    The default is `false`. Should return JSX AST instead of JSX code. Using this option with any other option can cause unexpected behavior. 

Use it for simply converting Spacebars template to JSX code:

```js
const spacebars = '<div>{{variable}}</div>';

const spacebarAST = preprocess(spacebars); // preprocess is a part of the Spacebars-AST project 
compile(spacebarAST);
// Result code
// props => <div>{props.variable}</div>
```

## License

MIT licensed
