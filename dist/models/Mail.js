"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _randomid = _interopRequireDefault(require("./randomid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MailModel =
/*#__PURE__*/
function () {
  function MailModel() {
    _classCallCheck(this, MailModel);

    this.inbox = [{
      id: (0, _randomid.default)(),
      receiverId: (0, _randomid.default)(),
      parentMessageId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Rain Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      readStatus: false,
      status: 'UnRead'
    }, {
      id: (0, _randomid.default)(),
      receiverId: (0, _randomid.default)(),
      parentMessageId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Summer Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      readStatus: false,
      status: 'UnRead'
    }, {
      id: 13,
      receiverId: (0, _randomid.default)(),
      parentMessageId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Rain Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      readStatus: true,
      status: 'Read'
    }, {
      id: (0, _randomid.default)(),
      receiverId: (0, _randomid.default)(),
      parentMessageId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Summer Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      readStatus: true,
      status: 'Read'
    }];
    this.sent = [{
      id: (0, _randomid.default)(),
      receiverId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Rain Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      sentStatus: true,
      status: 'Sent'
    }, {
      id: 13,
      receiverId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Rain Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      sentStatus: true,
      status: 'Sent'
    }];
    this.drafts = [{
      id: (0, _randomid.default)(),
      receiverId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Rain Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      sentStatus: false,
      status: 'Draft'
    }, {
      id: (0, _randomid.default)(),
      receiverId: (0, _randomid.default)(),
      messageId: (0, _randomid.default)(),
      subject: 'Rain Coder',
      message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
      createdOn: new Date(),
      sentStatus: false,
      status: 'Draft'
    }];
    this.allMail = [];
  }

  _createClass(MailModel, [{
    key: "create",
    value: function create(mail) {
      var newMail = {
        id: (0, _randomid.default)(),
        createdOn: Date(),
        subject: mail.subject,
        message: mail.message,
        receiverId: mail.receiverId,
        parentMessageId: mail.parentMessageId,
        sentStatus: mail.sentStatus,
        status: mail.status
      };
      this.allMail.push(mail);

      if (newMail.sentStatus === true) {
        this.sent.push(newMail);
        return {
          message: 'Mail Sent',
          newMail: newMail
        };
      }

      this.drafts.push(newMail);
      return {
        message: 'Saved to darfts',
        newMail: newMail
      };
    }
  }, {
    key: "getAllMail",
    value: function getAllMail() {
      return this.allMail;
    }
  }, {
    key: "getInbox",
    value: function getInbox() {
      return this.inbox;
    }
  }, {
    key: "getAInbox",
    value: function getAInbox(id) {
      var aInbox = this.inbox.find(function (ainbox) {
        return ainbox.id === id;
      });
      return aInbox;
    }
  }, {
    key: "getUnread",
    value: function getUnread() {
      var aInbox = this.inbox.find(function (inbox) {
        return inbox.readStatus === false;
      });
      return aInbox;
    }
  }, {
    key: "getRead",
    value: function getRead() {
      var aInbox = this.inbox.find(function (ainbox) {
        return ainbox.readStatus === true;
      });
      return aInbox;
    }
  }, {
    key: "getSent",
    value: function getSent() {
      return this.sent;
    }
  }, {
    key: "getASent",
    value: function getASent(id) {
      var aSent = this.sent.find(function (asent) {
        return asent.id === id;
      });
      return aSent;
    }
  }, {
    key: "deleteAInbox",
    value: function deleteAInbox(id) {
      var ainbox = this.getAInbox(id);
      var index = this.inbox.indexOf(ainbox);
      this.inbox.splice(index, 1);
      return {};
    }
  }]);

  return MailModel;
}();

var _default = new MailModel();

exports.default = _default;
//# sourceMappingURL=Mail.js.map