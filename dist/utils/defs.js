'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alias = exports.versions = exports.dirs = exports.ua = exports.defaults = exports.interfaces = undefined;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _package = require('../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

const interfaces = exports.interfaces = {
  dir: 'interfaces',
  ask: 'interfaces/ask.js',
  hook: 'interfaces/hook.js'
};

const defaults = exports.defaults = {
  registry: 'project-scaffold',
  type: 'org',
  metalsmith: true
};

const ua = exports.ua = `${_package.name}-${_package.version}`;

const dirs = exports.dirs = {
  home,
  download: `${home}/.project`,
  rc: `${home}/.projectrc`,
  tmp: _os2.default.tmpdir(),
  metalsmith: 'metalsmith'
};

const versions = exports.versions = {
  node: process.version.substr(1),
  nodeEngines: _package.engines.node,
  [_package.name]: _package.version
};

const alias = exports.alias = {
  install: 'i',
  uninstall: 'uni',
  update: 'up',
  list: 'ls',
  help: 'h',
  init: 'g',
  config: 'c',
  search: 's'
};