'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _package = require('../package.json');

var _defs = require('./utils/defs');

var _rc = require('./utils/rc');

var _rc2 = _interopRequireDefault(_rc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function help() {
  console.log('');
  console.log('  How to use:');
  console.log();
  console.log('    - np install');
  console.log('    - np init');
  console.log('    - np update');
  console.log('    - np search');
  console.log('    - np uninstall <installed template>');
  console.log('    - np clear');
  console.log('    - np config set <k> <v>');
  console.log('    - np config remove <k>');
  console.log('    - np config get <k>');
  console.log('    - np config help');
  console.log();
}

function registeredProgram(commander, type, typeInfo) {
  commander.command(type).description(typeInfo[type]).alias(_defs.alias[type]).action(_asyncToGenerator(function* () {
    try {
      if (type === 'config') {
        yield (0, _index2.default)('config', ...process.argv.slice(3));
      } else if (type === 'help') {
        help();
      } else {
        yield (0, _index2.default)(type);
      }
    } catch (e) {
      console.log(e);
    }
  }));

  return commander;
}

try {
  (() => {
    var _ref2 = _asyncToGenerator(function* () {
      const registry = yield (0, _rc2.default)('registry');
      const programTypes = {
        install: `install remote templates from https://github.com/${registry}`,
        uninstall: `uninstall a installed template in ${_defs.dirs.download}`,
        init: 'generate a new project from a template',
        clear: 'clear all installed template',
        update: `update the installed template in ${_defs.dirs.download}`,
        list: 'list installed template',
        search: 'search the templates from your github organization/user',
        help: 'more help info:',
        config: `${_defs.dirs.rc} config file set and get`,
        '*': 'the command is not found'
      };
      _commander2.default.version(_package.version, '-v, --version').usage('<command> [options]');

      Object.keys(programTypes).reduce(function (pre, type) {
        return registeredProgram(pre, type, programTypes);
      }, _commander2.default);

      _commander2.default.on('-h', help);
      _commander2.default.on('--help', help);

      _commander2.default.parse(process.argv);
    });

    function run() {
      return _ref2.apply(this, arguments);
    }

    return run;
  })()();
} catch (e) {
  console.log(e);

  help();
}