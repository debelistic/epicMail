import randomId from './randomid';

class MailModel {
  constructor() {
    this.inbox = [
      {
        id: randomId(),
        receiverId: randomId(),
        parentMessageId: randomId(),
        messageId: randomId(),
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: false,
        status: 'UnRead',
      },
      {
        id: randomId(),
        receiverId: randomId(),
        parentMessageId: randomId(),
        messageId: randomId(),
        subject: 'Summer Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: false,
        status: 'UnRead',
      },
      {
        id: 13,
        receiverId: randomId(),
        parentMessageId: randomId(),
        messageId: randomId(),
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: true,
        status: 'Read',
      },
      {
        id: randomId(),
        receiverId: randomId(),
        parentMessageId: randomId(),
        messageId: randomId(),
        subject: 'Summer Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: true,
        status: 'Read',
      },
    ];
    this.sent = [
      {
        id: randomId(),
        receiverId: randomId(),
        messageId: randomId(),
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: true,
        status: 'Sent',
      },
      {
        id: 13,
        receiverId: randomId(),
        messageId: randomId(),
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: true,
        status: 'Sent',
      },
    ];
    this.drafts = [
      {
        id: randomId(),
        receiverId: randomId(),
        messageId: randomId(),
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: false,
        status: 'Draft',
      },
      {
        id: randomId(),
        receiverId: randomId(),
        messageId: randomId(),
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: false,
        status: 'Draft',
      },
    ];
    this.allMail = [];
  }

  create(mail) {
    const newMail = {
      id: randomId(),
      createdOn: Date(),
      subject: mail.subject,
      message: mail.message,
      receiverId: mail.receiverId,
      parentMessageId: mail.parentMessageId,
      sentStatus: mail.sentStatus,
      status: mail.status,
    };

    this.allMail.push(mail);

    if (newMail.sentStatus === true) {
      this.sent.push(newMail);
      return {
        message: 'Mail Sent',
        newMail,
      };
    }
    this.drafts.push(newMail);
    return {
      message: 'Saved to darfts',
      newMail,
    };
  }

  getAllMail() {
    return this.allMail;
  }

  getInbox() {
    return this.inbox;
  }

  getAInbox(id) {
    const aInbox = this.inbox.find(ainbox => ainbox.id === id);
    return aInbox;
  }

  getUnread() {
    const aInbox = this.inbox.find(inbox => inbox.readStatus === false);
    return aInbox;
  }

  getRead() {
    const aInbox = this.inbox.find(ainbox => ainbox.readStatus === true);
    return aInbox;
  }

  getSent() {
    return this.sent;
  }

  getASent(id) {
    const aSent = this.sent.find(asent => asent.id === id);
    return aSent;
  }

  deleteAInbox(id) {
    const ainbox = this.getAInbox(id);
    const index = this.inbox.indexOf(ainbox);

    this.inbox.splice(index, 1);

    return {};
  }
}


export default new MailModel();
