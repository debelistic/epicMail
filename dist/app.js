"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _MessageController = _interopRequireDefault(require("./controllers/MessageController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

_dotenv.default.config();

app.use(_express.default.json());
app.use(_express.default.urlencoded('x-www-form-urlencoded'));
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use('/api/v1', _userRoutes.default);
app.get('/', function (req, res) {
  res.status(200).send('WELCOME TO EPICMAIL SERVICE');
});
app.get('/messages', _MessageController.default.getInbox);
app.post('/messages', _MessageController.default.create);
var port = process.env.PORT;
app.listen(port);
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map