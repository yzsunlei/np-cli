'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = exports.tagList = exports.repoList = exports.searchList = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _path = require('path');

var _rc = require('./rc');

var _rc2 = _interopRequireDefault(_rc);

var _defs = require('./defs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function fetch(api) {
  return new Promise((resolve, reject) => {
    (0, _request2.default)({
      url: api,
      method: 'GET',
      headers: {
        'User-Agent': `${_defs.ua}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      const data = JSON.parse(body);
      if (data.message === 'Not Found') {
        reject(new Error(`${api} is not found`));
      } else {
        resolve(data);
      }
    });
  });
}

const getGitInfo = (() => {
  var _ref = _asyncToGenerator(function* (repo) {
    let template = repo;

    var _template$split = template.split('@'),
        _template$split2 = _slicedToArray(_template$split, 1);

    let scaffold = _template$split2[0];


    scaffold = (0, _path.basename)(scaffold);

    template = template.split('@').filter(Boolean).join('#');
    const registry = yield (0, _rc2.default)('registry');
    const url = `${registry}/${template}`;
    return {
      url,
      scaffold
    };
  });

  return function getGitInfo(_x) {
    return _ref.apply(this, arguments);
  };
})();

const searchList = exports.searchList = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    var _ref3 = yield (0, _rc2.default)();

    const type = _ref3.type,
          registry = _ref3.registry;

    let api;

    if (type === 'users') {
      api = `https://api.github.com/users/${registry}/repos?per_page=100&page=1`;
    } else if (type === 'orgs') {
      api = `https://api.github.com/orgs/${registry}/repos?per_page=100&page=1`;
    } else {
      throw new Error('Type muse be user or org');
    }

    return yield fetch(api);
  });

  return function searchList() {
    return _ref2.apply(this, arguments);
  };
})();

const repoList = exports.repoList = (() => {
  var _ref4 = _asyncToGenerator(function* () {
    var _ref5 = yield (0, _rc2.default)();

    const type = _ref5.type,
          registry = _ref5.registry;

    const api = `https://api.github.com/${type}/${registry}/repos`;

    return yield fetch(api);
  });

  return function repoList() {
    return _ref4.apply(this, arguments);
  };
})();

const tagList = exports.tagList = (() => {
  var _ref6 = _asyncToGenerator(function* (repo) {
    var _ref7 = yield getGitInfo(repo);

    const url = _ref7.url,
          scaffold = _ref7.scaffold;

    const api = `https://api.github.com/repos/${url}/tags`;

    return fetch(api, scaffold, url);
  });

  return function tagList(_x2) {
    return _ref6.apply(this, arguments);
  };
})();

const download = exports.download = (() => {
  var _ref8 = _asyncToGenerator(function* (repo) {
    var _ref9 = yield getGitInfo(repo);

    const url = _ref9.url,
          scaffold = _ref9.scaffold;


    return new Promise(function (resolve, reject) {
      (0, _downloadGitRepo2.default)(url, `${_defs.dirs.download}/${scaffold}`, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });

  return function download(_x3) {
    return _ref8.apply(this, arguments);
  };
})();