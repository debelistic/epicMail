"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('@babel/polyfill');

var Sanitize = {
  /**
   * This is taken from discussion at:
   * https://stackoverflow.com/questions/30266295/using-express-can-i-automatically-trim-all-incoming-posted-fields-in-req-body
   * @param {request object} req
   * @param {response object} res
   * @param {next middleware} next
   */
  trimInput: function () {
    var _trimInput = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var _arr, _i, _arr$_i, key, value;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (req.method === 'POST') {
                // eslint-disable-next-line no-restricted-syntax
                _arr = Object.entries(req.body);

                for (_i = 0; _i < _arr.length; _i++) {
                  _arr$_i = _slicedToArray(_arr[_i], 2), key = _arr$_i[0], value = _arr$_i[1];
                  req.body[key] = value.trim();
                }
              }

              return _context.abrupt("return", next());

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", next(_context.t0));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    }));

    function trimInput(_x, _x2, _x3) {
      return _trimInput.apply(this, arguments);
    }

    return trimInput;
  }()
};
var _default = Sanitize;
exports.default = _default;
//# sourceMappingURL=Sanitize.js.map