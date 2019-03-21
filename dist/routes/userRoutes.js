'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.use(_express2.default.json());

Router.get('/', function (req, res) {
  res.send({
    status: 200,
    message: 'EPIC MAIL'
  });
});

// User Signup for an account
Router.post('/auth/signup', _UserController2.default.createUser);

// User Signin
Router.post('/auth/login', _UserController2.default.login);

// Reset password
Router.post('/auth/resetpassword', _UserController2.default.resetPassword);

exports.default = Router;
//# sourceMappingURL=userRoutes.js.map