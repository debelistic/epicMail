"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataUri = exports.multerUploads = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _datauri = _interopRequireDefault(require("datauri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A post on cloudinary storage by Okupkoro Joe
 * https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54
 */
var dUri = new _datauri.default();

var storage = _multer.default.memoryStorage();

var multerUploads = (0, _multer.default)({
  storage: storage
}).single('userImage');
exports.multerUploads = multerUploads;

var dataUri = function dataUri(req) {
  return dUri.format(_path.default.extname(req.file.originalname).toString(), req.file.buffer);
};

exports.dataUri = dataUri;
//# sourceMappingURL=multer.js.map