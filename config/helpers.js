'use strict';

const path = require('path');
const _root = path.resolve(__dirname, '..');

exports.root = function (args) {
  console.log('root', _root)
  // comment
  args = Array.prototype.slice.call(arguments, 0);
  // comment
  const test = path.join.apply(path, [ _root ].concat(args));

  console.log('test', test);
  return test;
};

// likely unused
exports.assetsPath = function (_path) {
  return path.posix.join('static', _path);
};
