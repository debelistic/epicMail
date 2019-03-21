'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swagger = require('../swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

var _userRoutes = require('./routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _messagesRoutes = require('./routes/messagesRoutes');

var _messagesRoutes2 = _interopRequireDefault(_messagesRoutes);

var _groupsRoutes = require('./routes/groupsRoutes');

var _groupsRoutes2 = _interopRequireDefault(_groupsRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_dotenv2.default.config();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));
app.use('/api/v1', _userRoutes2.default);
app.use('/api/v1', _messagesRoutes2.default);
app.use('/api/v1', _groupsRoutes2.default);

app.get('/', function (req, res) {
  res.status(200).send('WELCOME TO EPICMAIL SERVICE');
});

var port = process.env.PORT;
app.listen(port, function () {
  console.log('Your are on', port);
});

exports.default = app;
//# sourceMappingURL=app.js.map