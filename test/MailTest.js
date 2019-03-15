import chai from 'chai';
import MailModel from '../server/jsobjectsdb/models/Mail';
import randomId from '../server/jsobjectsdb/models/randomid';

describe('Mail Object', () => {
  it('Checks the instance of a mail Object', () => {
    const mail = MailModel;
    chai.expect(mail).to.be.an('object');
  });
});

describe('Create a Mail Account', () => {
  it('Return mail object', () => {
    const mail = {
      id: randomId(),
      createdOn: Date(),
      subject: 'Test',
      message: 'Testing with chai',
      senderId: 'ghj098',
      receiverId: 'jfvjigjgkvg89',
      parentMessageId: 'fjhtjvhntj',
      status: true,
    };
    const mailobj = MailModel.create(mail);

    chai.expect(mailobj).to.be.an('object');
  });
});


describe('All Mails', () => {
  it('Return array of mails', () => {
    chai.expect(MailModel.getAllMail()).to.be.an('array');
  });
});


describe('Inbox Mails', () => {
  it('Return array of inbox', () => {
    chai.expect(MailModel.getInbox()).to.be.an('array');
  });
});

describe('Sent Mail', () => {
  it('Return a sent mail', () => {
    chai.expect(MailModel.getASent(13)).to.be.an('object');
  });
});

describe('Sent Mails', () => {
  it('Return array of sent mails', () => {
    chai.expect(MailModel.getSent()).to.be.an('array');
  });
});
