import MailModel from '../models/Mail';

const Mail = {

  createMail(req, res) {
    if (!req.body.subject && !req.body.message && !req.body.parentMessageId && !req.body.status) {
      res.status(400).send({ message: 'You have missing field' });
    }
    const mail = MailModel.create(req.body);
    return res.status(201).send(mail);
  },

  getAll(req, res) {
    const allMail = MailModel.getAllMail();
    res.status(200).send(allMail);
  },

  getInbox(req, res) {
    const allMail = MailModel.getInbox();
    res.status(200).send(allMail);
  },

  getSentMails(req, res) {
    const sentMail = MailModel.getSent();
    res.status(200).send(sentMail);
  },

  getASentMail(req, res) {
    const aSentMail = MailModel.getASent(req.params.id);
    res.status(200).send(aSentMail);
  },

  getDrafts(req, res) {
    const sentMail = MailModel.getDrafts();
    res.status(200).send(sentMail);
  },

  getADraftMail(req, res) {
    const aDraft = MailModel.getADraft(req.params.id);
    res.status(200).send(aDraft);
  },

  // deleteInboxMail(req, res){

  // }
};

export default Mail;
