"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var dbURI;

if (process.env.NODE_ENV.trim() === 'test') {
  dbURI = process.env.TEST_DATABASE_URL;
} else {
  dbURI = process.env.DATABASE_URL;
}

var pool = new _pg.Pool({
  connectionString: dbURI
});
var _default = {
  /**
     * db query
     */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};
exports.default = _default;
//# sourceMappingURL=index.js.map