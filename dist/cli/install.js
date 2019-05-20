'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _git = require('../utils/git');

var _defs = require('../utils/defs');

var _loading = require('../utils/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* () {
    let loader, choices, answers, version;

    loader = (0, _loading2.default)('repo list fetching');
    const repos = yield (0, _git.repoList)();
    loader.succeed();

    if (repos.length === 0) {
      const registry = yield (0, _defs.rc)('registry');
      throw new Error(`There is no any scaffolds in https://github.com/${registry}. Please create and try`);
    }

    choices = repos.map(function ({ name }) {
      return name;
    });
    answers = yield _inquirer2.default.prompt([{
      type: 'list',
      name: 'repo',
      message: 'Which repo do you want to install?',
      choices
    }]);

    const repo = answers.repo;

    loader = (0, _loading2.default)('tag list fetching', repo);
    const tags = yield (0, _git.tagList)(repo);
    loader.succeed();

    if (tags.length === 0) {
      version = '';
    } else {
      choices = tags.map(function ({ name }) {
        return name;
      });

      answers = yield _inquirer2.default.prompt([{
        type: 'list',
        name: 'version',
        message: 'Which version do you want to install?',
        choices
      }]);
      version = answers.version;
    }

    loader = (0, _loading2.default)('downloading', repo);
    yield (0, _git.download)([repo, version].join('@'));
    loader.succeed(`downloaded ${repo}`);
  });

  function apply() {
    return _ref.apply(this, arguments);
  }

  return apply;
})();