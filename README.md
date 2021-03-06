# es-modules-cop-frontend

ES Modules show case for Finanzcheck COP-Frontend

### Demo

* clone this repository
* `$ npm i`
* `$ npm run build`
* => all modules exported/imported using ESM are **excluded** if not explicitly imported
* => all modules exported/imported using cjs or esm/cjs are included, no matter whether or not they are explicitly imported

## JS Modules

(Good) JS Modules are highly self-contained, encapsulated pieces of code and (depending on their use case) only exporting "public" variables, which can be any kind of JS datatype.

### Why use them

* Maintainability
* Namespacing
* Reusability

### cjs vs ES Modules

#### cjs "The Node.js way"

Node.js has been managing modules using the cjs approach.

Though there is **no** language support!
_Naïvely said: "It's more or less just moving around Objects"_

```
// exporting
module.exports = { fn: noop => noop };

// importing
const { fn } = require('./module');
fn('test'); // 'test'
```

#### ES Modules

ES Modules are actually **native** to JavaScript! (introduced with ECMAScript2015)

```
// exporting
// named export
export const fn = noop => noop;
// default export
export default fn = noop => noop;

// importing
// named import
import { fn } from './module';
fn('test'); // 'test'

//default import
import anyFn from './module';
anyFn('test'); // 'test'

Keep in mind that import "{ fn } from 'module';" this is NOT destructuring!!
import { a: { b: { c } } } from 'module' is invalid syntax!
```

ES Modules are passing bindings not values!!

Meaning:

```
// exporting
export let x = 'y';
setTimeout(() => x = 'x', 1000);

//importing
import { x } from './module';
console.log(x); // 'y'
setTimeout(() => console.log(x), 1000); // 'x'
```

Whereas cjs imports are only copies of exports!

#### Treeshaking?

ES Module Imports are alive and read-only!
They are **Static** and analyzable at **compile time**.

Cjs imports are not!

Consider following:

```
// it's literally impossible to know which module will be imported.
// hence we can not know which module to include and which not.
// we'd have to run the code to decide
// therefore we'll be including both even though one will never be used
let lib;
if (Math.random() > .5) {
    lib = require('./module1');
} else {
    lib = require('./module2');
}

// same goes for exports
// we need to execute to know what'll be exported
if (Math.random() < .5) {
  exports.x = 'any value';
}
```

ES Modules don't let you do this.

* no dynamic/nested imports (well, technically there is an "[import loader API](https://github.com/whatwg/loader/)" but that's not included in the ESM spec)
* no variables in import statements
* imports **have to be** on the very top of a file

Hence we (or better said our bundler of choice) is actually able to figure out what is `exported and then imported` and more importantly what is `exported but never (!) imported` and just get rid of this very specific unused piece of code.

**That's what is called Treeshaking**

_Also you have to do property lookup on dynamic imports `const x = require('xy'); x.property(); <= property lookup` because, well, they are dynamic. Whereas static imports can be optimized since they're static. Simple, right?
Though for now I don't see any use case at Finanzcheck needing to care about this "performance hit"._

## Sure you can use Treeshaking?

* don't export/import objects => not static => no analysis => no code elimination!
* don't mix `module.export`and `import {} from ''` => not static => no analysis => no code elimination!
* don't configure you're loader/bundler to compile to modules!
  * use e.g. `presets: ['env', { modules: false } ]`
  * Rollup && Webpack >=4.0.0 are doing a great job of tree shaking
* when building a library, provide an es_module compatible entry
