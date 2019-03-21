"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Helper = _interopRequireDefault(require("./Helper"));

var _randomid = _interopRequireDefault(require("./randomid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserModel =
/*#__PURE__*/
function () {
  function UserModel() {
    _classCallCheck(this, UserModel);

    this.users = [{
      firstName: 'victor',
      lastName: 'tolulope',
      contactName: 'deviclistic23',
      password: 'hjrjfhrjf9980GH#',
      confirmPassword: 'hjrjfhrjf9980GH#'
    }, {
      firstName: 'test',
      lastName: 'annie',
      contactName: 'funmilayo',
      password: 'tyrywruJKU89$',
      confirmPassword: 'tyrywruJKU89$'
    }];
  }

  _createClass(UserModel, [{
    key: "createUser",
    value: function createUser(user) {
      var newUser = {
        id: (0, _randomid.default)(),
        firstName: user.firstName,
        lastName: user.lastName,
        contactName: "".concat(user.contactName, "@epicmail.com"),
        password: user.password,
        confirmPassword: user.confirmPassword,
        createdOn: Date(),
        modifiedOn: Date()
      };

      if (!newUser.firstName || !newUser.lastName || !newUser.contactName || !newUser.password || !newUser.confirmPassword) {
        return {
          message: 'All fields are required'
        };
      }

      if (!/^[a-z\d]{5,}$/i.test(user.contactName)) {
        return {
          message: 'Use a valid contact name'
        };
      }

      if (newUser.password !== newUser.confirmPassword) {
        return {
          message: 'Password should match'
        };
      }

      var hashPassword = _Helper.default.hashPassword(newUser.password);

      var hashConfirmPassword = _Helper.default.hashPassword(newUser.confirmPassword);

      newUser.password = hashPassword;
      newUser.confirmPassword = hashConfirmPassword;
      this.users.push(newUser);
      return {
        message: "User account created for ".concat(newUser.firstName, " ").concat(newUser.lastName),
        mailaddress: "Your EPIC email address is ".concat(newUser.contactName),
        newUser: newUser
      };
    }
  }, {
    key: "getUserContactName",
    value: function getUserContactName(contactName) {
      var user = this.users.find(function (aUser) {
        return aUser.contactName === "".concat(contactName, "@epicmail.com");
      });
      return user;
    }
  }, {
    key: "getAUser",
    value: function getAUser(contactName, password) {
      var user = this.users.find(function (aUser) {
        return aUser.contactName === "".concat(contactName, "@epicmail.com");
      });

      if (!user.contactName || !user.password) {
        return {
          message: 'Signin details does not match'
        };
      }

      if (!_Helper.default.comparePassword(password, user.password)) {
        return {
          message: 'Invalid password'
        };
      }

      return user;
    }
  }, {
    key: "getAUserWithId",
    value: function getAUserWithId(id) {
      var user = this.users.find(function (auser) {
        return auser.id === id;
      });
      return user;
    }
  }, {
    key: "getAllusers",
    value: function getAllusers() {
      return this.users;
    }
  }]);

  return UserModel;
}();

var _default = new UserModel();

exports.default = _default;
//# sourceMappingURL=User.js.map