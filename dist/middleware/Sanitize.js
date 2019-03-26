"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Sanitize = {
  trimInput: function trimInput(userInput) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              return _context.abrupt("return", userInput.trim());

            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 4]]);
    }))();
  },
  lowerCaseInput: function lowerCaseInput(userInput) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.abrupt("return", userInput.toLowerCase());

            case 4:
              _context2.prev = 4;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 4]]);
    }))();
  },
  trimAndLowerCase: function trimAndLowerCase(userInput) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              return _context3.abrupt("return", userInput.trim().toLowerCase());

            case 4:
              _context3.prev = 4;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _context3.t0);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 4]]);
    }))();
  }
};

exports.default = Sanitize;
//# sourceMappingURL=Sanitize.js.map