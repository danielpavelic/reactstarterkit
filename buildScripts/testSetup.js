// Register babel to transpile before testing
require('babel-register')();
// Disable webpack parts that Mocha doesn't know about
require.extensions['.css'] = function(){};
