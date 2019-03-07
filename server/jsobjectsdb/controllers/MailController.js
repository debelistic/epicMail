import express from 'express';
import MailModel from '../models/Mail';

const app = express();
app.use(express.json);

const Mail = {

  createMail(req, res) {
    if (!req.body.subject && !req.body.message && !req.body.parentMessageId && !req.body.status
      && !req.body.parentMessageId) {
      res.status(400).send({ message: 'You have missing field' });
    }
    const mail = MailModel.create(req.body);
    return res.status(201).send({
      status: 201,
      mail,
    });
  },

  getAll(req, res) {
    const allMail = MailModel.getAllMail();
    res.status(200).send(allMail);
  },

  getInbox(req, res) {
    const inbox = MailModel.getInbox();
    res.status(200).send({
      status: 200,
      data: [inbox],
    });
  },

  getUnreadMail(req, res) {
    const unreadMail = MailModel.getUnread();
    res.status(200).send({
      status: 200,
      data: [unreadMail],
    });
  },

  getSentMails(req, res) {
    const sentMail = MailModel.getSent();
    res.status(200).send({
      status: 200,
      data: [sentMail],
    });
  },

  getASentMail(req, res) {
    const aSentMail = MailModel.getASent(req.params.id);
    res.status(200).send({
      status: 201,
      data: [aSentMail],
    });
  },

  getDrafts(req, res) {
    const sentMail = MailModel.getDrafts();
    res.status(200).send(sentMail);
  },

  getADraftMail(req, res) {
    const aDraft = MailModel.getADraft(req.params.id);
    res.status(200).send(aDraft);
  },

  deleteInbox(req, res) {
    const inbox = MailModel.getAInbox(req.params.id);
    if (!inbox) {
      return res.status(404).send({
        status: 404,
        message: 'message not found',
      });
    }
    const dInbox = MailModel.deleteAInbox(req.params.id);
    return res.status(204).send({
      status: 204,
      dInbox,
    });
  },
};

export default Mail;
