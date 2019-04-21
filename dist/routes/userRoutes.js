"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = require("../middleware/multer");

var _UserValidator = _interopRequireDefault(require("../middleware/UserValidator"));

var _TokenHelper = _interopRequireDefault(require("../middleware/TokenHelper"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express.default.Router(); // User Signup for an account


Router.post('/auth/signup', _UserValidator.default.bodyCheck, _multer.multerUploads, _UserValidator.default.names, _UserValidator.default.username, _UserValidator.default.password, _UserValidator.default.resetMail, _UserValidator.default.checkRecoveryEmail, _UserController.default.createUser); // User Signin

Router.post('/auth/login', _UserValidator.default.loginField, _UserValidator.default.loginEmail, _UserValidator.default.loginPassword, _UserController.default.login); // Forget password

Router.post('/auth/forgetpass', _UserValidator.default.resetMail, _UserController.default.forgetpass); // Reset Password

Router.post('/auth/resetpass/:token', _TokenHelper.default.checkIfExpired, _UserValidator.default.password, _UserController.default.resetpass);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=userRoutes.js.map