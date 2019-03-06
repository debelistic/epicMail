import randomId from './randomid';

class MailModel {
  constructor() {
    this.inbox = [];
    this.sent = [];
    this.drafts = [];
    this.allMail = [];
  }

  create(mail) {
    const newMail = {
      id: randomId,
      createdOn: Date(),
      subject: mail.subject,
      message: mail.message,
      userid: mail.id,
      parentMessageId: mail.parentMessageId,
      status: mail.status,
    };

    this.allMail.push(mail);

    if (newMail.status === true) {
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
