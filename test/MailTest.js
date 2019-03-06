import chai from 'chai';
import MailModel from '../server/jsobjectsdb/models/Mail';
import randomId from '../server/jsobjectsdb/models/randomid'


describe('Mail Object', () => {
  it('Checks the instance of a mail Object', () => {
    const mail = MailModel;
    chai.expect(mail).to.be.an('object');
  });
});

describe('Create a User', () => {
    it('Create user object', () => {
        const user
    })
})