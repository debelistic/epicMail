"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserValidator = _interopRequireDefault(require("../middleware/UserValidator"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router();

Router.use(_express.default.json());
Router.get('/', function (req, res) {
  res.send({
    status: 200,
    message: 'EPIC MAIL'
  });
}); // User Signup for an account

Router.post('/auth/signup', _UserValidator.default.signUpField, _UserController.default.createUser); // User Signin

Router.post('/auth/login', _UserValidator.default.loginField, _UserController.default.login); // Reset password

Router.post('/auth/reset', _UserValidator.default.resetPasswordField, _UserController.default.resetPassword);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=userRoutes.js.map