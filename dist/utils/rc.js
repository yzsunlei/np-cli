'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

var _fs = require('mz/fs');

var _defs = require('./defs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const emptyValues = {
  undefined: true,
  null: true,
  0: true
};

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (k, v, remove) {
    let config, content, setting;
    const isExist = yield (0, _fs.exists)(_defs.dirs.rc);

    if (!k || k.length === 0) {
      if (!isExist) {
        content = _ini2.default.stringify(_defs.defaults);
        yield (0, _fs.writeFile)(_defs.dirs.rc, content);
        return content;
      }
      return _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
    }

    if (remove) {
      config = _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
      if (config[k]) {
        delete config[k];
        setting = Object.assign({}, config, { [k]: v });
        yield (0, _fs.writeFile)(_defs.dirs.rc, _ini2.default.stringify(setting));
      }
      return true;
    }

    if (!v || v.length === 0) {
      if (!isExist) return _defs.defaults[k];

      config = _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));

      return emptyValues[config[k]] ? _defs.defaults[k] : config[k];
    } else if (k.length > 0 && v.length > 0) {
      if (!isExist) {
        config = {};
      } else {
        config = _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
      }

      setting = Object.assign({}, config, { [k]: v });
      yield (0, _fs.writeFile)(_defs.dirs.rc, _ini2.default.stringify(setting));
    }
  });

  function apply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return apply;
})();