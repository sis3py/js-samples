// Modules

// To make import/export work, browsers need <script type="module">
// Modules are :
// - Deferred by default
// - Async works on inline scripts
// - To load external scripts from another origin (domain/protocol/port), CORS headers are needed
// - have their own, local top-level scope and interchange functionality via import/export.
// - always use strict.
// - executed only once. Exports are created once and shared between importers.

// Export:
export default class User {}
export default function user(){}
export class Test {}
export function test {}
export {test as amazing}

// Re-export
export {x [as y], ...} from "/mod";
export * from "mod"
export {default [as y]} from "mod";

// Import:
// Named exports from module:
import {x [as y], ...} from "mod";

// Default export:
import x from "mod";
import {default as x} from "mod";

// Everything:
import * as obj from "mod";

// Import the module (it runs), but do not assign it to a variable:
import "mod";

// import() function
const modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)