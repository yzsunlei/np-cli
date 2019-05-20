'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loading;

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loading(action = 'getting', repo = '') {
  const l = (0, _ora2.default)(`${action} ${repo}`);
  return l.start();
}