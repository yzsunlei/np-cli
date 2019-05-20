'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rc = require('./utils/rc');

var _rc2 = _interopRequireDefault(_rc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (action, k, v) {
    let config;
    switch (action) {
      case 'get':
        config = yield (0, _rc2.default)(k);
        if (!k) {
          Object.keys(config).forEach(function (key) {
            return console.log(`${key}=${config[key]}`);
          });
        } else {
          console.log(config);
        }
        return true;
      case 'set':
        yield (0, _rc2.default)(k, v);
        return true;

      case 'remove':
        yield (0, _rc2.default)(k, v, true);
        return true;

      default:
        config = yield (0, _rc2.default)();
        Object.keys(config).forEach(function (key) {
          return console.log(`${key}=${config[key]}`);
        });
    }
  });

  function apply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return apply;
})();