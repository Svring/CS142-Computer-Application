'use strict';

/*
 * run-test-using-node.js - Run the cs142 project #2 test code using Node.js rather than in the
 * browser.  The browser has a better debugging environment so this is more a demonstration that the
 * JavaScript works in both places. To run the test:
 *   node run-tests-using-node.js
 */

/* eslint-env node */

// We need the Node.js file system access module (fs) and the Node.js JavaScript virtual machine
// access.
var fs = require('fs');
var vm = require('vm');

// Build an emulation of the browser's script tag processing where everything is in a global
// space and goes under the name window.

global.window = global; // The browser script assume global is available under the name window

/**
 * processScriptFromFile - Emulate the effects of a script tag in the browser by running the
 * contents of the file as a script with its scope being the global object.
 * @param {string} filename - File name of script to load and run.
 */
function processScriptFromFile(filename) {
  // Warning: Ugly, un-Node.js-like code warning:
  // In order to emulate the browser JavaScript environment we need to undo the default isolation
  // in node modules. By directly calling into the Node.js vm.Script() API we can have
  // all the JavaScripts files run in the same context like on the browser.
  try {
    new vm.Script(fs.readFileSync(filename, 'utf8'), { filename }).runInThisContext();
  } catch (err) {
    // fs.readFileSync communicates errors using exceptions. We log but otherwise ignore errors
    console.error('Error processing', filename, ':', err.message);
  }
}

console.log('*********** Running cs142 Project #2 tests ***********');

console.log('*** Loading project files ....');
processScriptFromFile('./cs142-make-multi-filter.js');
processScriptFromFile('./cs142-template-processor.js');

console.log('*** Running tests ....');
processScriptFromFile('./cs142-test-project2.js');

var { p1Message, p2Message, p3Message } = global.cs142Project2Results;

var testWorked = (p1Message === 'SUCCESS') && (p2Message === 'SUCCESS')
    && (p3Message === 'SUCCESS');

console.log(
  '*********** Running cs142 Project #2 tests ***********:',
  testWorked ? 'Success' : 'Fail',
);

// Return process status code 0 on success, 1 on failure.
process.exit(testWorked ? 0 : 1);
