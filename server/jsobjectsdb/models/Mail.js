/**
 * randomId function is from the discussion on this stackoverflow link
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * the function is modified here to generate 15 length character id for our data base
 */
const randomId = () => {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 15; index += 1) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

class Mail {
  constructor() {
    this.inbox = [];
    this.sent = [];
    this.drafts = [];
    this.allMail = [];
  }

  create(mail) {
    const newMail = {
      id: randomId(),
      createdOn: Date(),
      subject: mail.subject,
      message: mail.message,
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

export default new Mail();
