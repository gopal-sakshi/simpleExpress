all node repos
- use "require"
- but this repo ===> uses "import"

======================================

determining module system

https://nodejs.org/api/packages.html#determining-module-system

NodeJs treats code as ES modules
    .mjs file extension
    "type": "module" in package.json
    import statements
    --input-type module         // flag

======================================
CommonJS is de facto everywhere in nodeJs universe
but ES modules are the future

few things for ES module    

(a)     
"type": "module"            // in package.json

(b) 
import something from './something.js'          // PREFERRED
import something from './something'             // NOT SO MUCH


(c)
import * as utils from '../utils/index.js'
import * as utils from '../utils'           // wont magically import index.js
const utils = require('./utils')          // it will check both "utils.js" (or) "index.js in utils folder" 

(d)
`add export infront of every function`
export const funcA = () => {}
export const funcB = () => {}
import { funcA, funcB } from '../utils/index.js'

// not recommended
export default {
    funcA, funcB
}

(e) not possible to import JSON files
use fs to read JSON file... then use JSON.parse()
- or, use JS modules instead of JSON
- or, use --experimental-json-modules nodejs flag

(f) 
In ES module, import statement can only be called at the beginning of the file.
require() can be called anywhere in the code. 
- use it to load modules conditionally from if statements
- main distinction between ESM and CJS is the loading of modules. ESM loads asynchronous and CJS loads synchronous
- while ESM can import CJS, CJS cannot require ESM, because it would break the synchronous constraint.

(g) 
require() loads modules synchronously.
- modules are loaded and processed one by one.

(h) 
ESM scripts can import CJS scripts
import _ from 'lodash'                  // works
import { shuffle } from 'lodash'        // doesnt work

<!--- ----------------------  CJS vs ESM ---------------------- -->

(a)
@babel/preset-env, Babel may transform ES6 modules into CommonJS modules
But, tree shaking is more difficult to do for CommonJS modules

(b)
side effects & tree shaking
when a function modifies something outside of its own scope

