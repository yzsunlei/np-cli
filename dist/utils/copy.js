'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copy;

var _ncp = require('ncp');

function copy(src, dest) {
  return new Promise((resolve, reject) => {
    (0, _ncp.ncp)(src, dest, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}