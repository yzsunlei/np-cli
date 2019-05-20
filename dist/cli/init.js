'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _rmfr = require('rmfr');

var _rmfr2 = _interopRequireDefault(_rmfr);

var _fs = require('mz/fs');

var _path = require('path');

var _defs = require('../utils/defs');

var _rc = require('../utils/rc');

var _rc2 = _interopRequireDefault(_rc);

var _common = require('../utils/common');

var _copy = require('../utils/copy');

var _copy2 = _interopRequireDefault(_copy);

var _loading = require('../utils/loading');

var _loading2 = _interopRequireDefault(_loading);

var _metal = require('../helper/metal');

var _metal2 = _interopRequireDefault(_metal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* () {
    const download = _defs.dirs.download;
    const root = process.cwd();

    if (!(yield (0, _fs.exists)(download))) {
      throw new Error(`There is no ${download}, Please install a template`);
    }

    const list = yield (0, _fs.readdir)(download);

    if (list.length === 0) {
      throw new Error(`There is no any scaffolds in your local folder ${download}, install it`);
    }

    const answers = yield _inquirer2.default.prompt([{
      type: 'list',
      name: 'scaffold',
      message: 'Which scaffold do you want to init?',
      choices: list
    }, {
      type: 'input',
      name: 'dir',
      message: 'project name',
      validate(input) {
        var _this = this;

        return _asyncToGenerator(function* () {
          const done = _this.async();

          if (input.length === 0) {
            done('You must input project name');
            return;
          }

          const dir = (0, _path.resolve)(root, input);

          if (yield (0, _fs.exists)(dir)) {
            done('The project name is already existed. Please change another name');
          }

          done(null, true);
        })();
      }
    }]);

    let loader, ask, hook, reply;

    const metalsmith = yield (0, _rc2.default)('metalsmith');
    const scaffold = answers.scaffold;
    const dir = answers.dir;

    if (metalsmith) {
      try {
        ask = (0, _common.betterRequire)(`${download}/${_defs.interfaces.ask}`);
      } catch (e) {
        ask = (0, _common.betterRequire)((0, _path.resolve)(__dirname, './helper/ask.js'));
      }

      if (typeof ask === 'function') {
        ask = ask(scaffold);
      }

      if (!Array.isArray(ask)) {
        throw new Error(`Please ensure your ${scaffold} ${_defs.interfaces.ask} is exported with Array or function that was returned an array`);
      }

      reply = yield _inquirer2.default.prompt(ask);
      loader = (0, _loading2.default)('generating', dir);
      console.log((0, _path.resolve)(download, scaffold));
      yield (0, _metal2.default)((0, _path.resolve)(download, scaffold), (0, _path.resolve)(root, dir), reply);
      yield (0, _rmfr2.default)(`${(0, _path.resolve)(root, dir, _defs.interfaces.dir)}`);
      loader.succeed(`generated ${dir}`);

      // support hook function after for developer

      try {
        hook = (0, _common.betterRequire)(`${download}/${scaffold}/${_defs.interfaces.hook}`);
      } catch (e) {
        hook = { after() {} };
      }

      hook.after = (0, _common.wrapperAsync)(hook.after);

      try {
        const meta = Object.assign({
          dir: `${root}/${dir}`,
          scaffold
        }, reply);
        yield hook.after(meta, { runBash: _common.runBash, loader, inquirer: _inquirer2.default });
      } catch (e) {
        throw e;
      }
    } else {
      loader = (0, _loading2.default)('generating', dir);
      yield (0, _copy2.default)(`${download}/${scaffold}`, dir);
      loader.succeed(`generated ${dir}`);
    }
  });

  function apply() {
    return _ref.apply(this, arguments);
  }

  return apply;
})();