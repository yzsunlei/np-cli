'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderContent = _consolidate2.default.swig.render;

function render() {
  return function _render(files, metalsmith, next) {
    const meta = metalsmith.metadata();

    Object.keys(files).forEach(function (file) {
      const str = files[file].contents.toString();

      renderContent(str, meta, (err, res) => {
        if (err) {
          return next(err);
        }

        files[file].contents = new Buffer(res);
        next();
      });
    });
  };
}