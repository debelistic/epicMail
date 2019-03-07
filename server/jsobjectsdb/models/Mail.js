import randomId from './randomid';

class MailModel {
  constructor() {
    this.inbox = [
      {
        receiverId: parseInt(randomId, 2),
        parentMessageId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: false,
        status: 'UnRead',
      },
      {
        receiverId: parseInt(randomId, 2),
        parentMessageId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Summer Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: false,
        status: 'UnRead',
      },
      {
        receiverId: parseInt(randomId, 2),
        parentMessageId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: true,
        status: 'Read',
      },
      {
        receiverId: parseInt(randomId, 2),
        parentMessageId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Summer Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        readStatus: true,
        status: 'Read',
      },
    ];
    this.sent = [
      {
        receiverId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: true,
        status: 'Sent',
      },
      {
        receiverId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: true,
        status: 'Sent',
      },
    ];
    this.drafts = [
      {
        receiverId: parseInt(randomId, 2),
        messageId: randomId,
        subject: 'Rain Coder',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni temporibus ex tenetur delectus earum',
        createdOn: new Date(),
        sentStatus: false,
        status: 'Draft',
      },
      {
        receiverId: parseInt(randomId, 2),
        messageId: randomId,
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
      id: randomId,
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
    const aInbox = this.inbox.find(ainbox => ainbox.readStatus === false);
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

  getDrafts() {
    return this.drafts;
  }

  getADraft(id) {
    const aDraft = this.drafts.find(adraft => adraft.id === id);
    return aDraft;
  }
}


export default new MailModel();
