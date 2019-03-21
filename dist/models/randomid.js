"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * randomId function is from the discussion on this stackoverflow link
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * the function is modified here to generate 15 length character id for our data base
 */
var randomId = function randomId() {
  var id = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var index = 0; index < 15; index += 1) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
};

var _default = randomId;
exports.default = _default;
//# sourceMappingURL=randomid.js.map