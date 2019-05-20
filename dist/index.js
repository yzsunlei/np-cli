'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _defs = require('./utils/defs');

var _check = require('./utils/check');

var _common = require('./utils/common');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (!(0, _check.checkNodeVersion)()) {
  throw new Error(`Node version is invalid. Please use Node ${_defs.versions.nodeEngines} `);
}

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (command, ...args) {
    try {
      yield (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${command}`))(...args);
    } catch (e) {
      console.log(e);
    }
  });

  function apply(_x) {
    return _ref.apply(this, arguments);
  }

  return apply;
})();