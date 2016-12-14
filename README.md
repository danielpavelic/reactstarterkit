# Starter Kit
Technology Independent Starter Kit based on node.js

1. Editor configuration
2. Security
3. Development Server
4. Automation
5. Transpiling
6. Bundling
7. Linting
8. Testing
9. CI Integration
10. Production Building

npm start -s
npm run build -s

"scripts": {
  "prestart": "babel-node buildScripts/startMessage.js",
  "start": "npm-run-all --parallel security-check open:src lint:watch test:watch",
  "open:src": "babel-node buildScripts/srcServer.js",
  "security-check": "nsp check",
  "localtunnel": "lt --port 3002 --subdomain daniel",
  "share": "npm-run-all --parallel open:src localtunnel",
  "lint": "esw webpack.config.* src buildScripts --color",
  "lint:watch": "npm run lint -- --watch",
  "test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\"",
  "test:watch": "npm run test -- --watch",
  "clean-dist": "rimraf ./dist && mkdir dist",
  "prebuild": "npm-run-all clean-dist test lint",
  "build": "babel-node buildScripts/build.js",
  "postbuild": "babel-node buildScripts/distServer.js"
}