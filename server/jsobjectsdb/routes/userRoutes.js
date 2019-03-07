import express from 'express';
import UserController from '../controllers/UserController';
// import Auth from '../dsmiddleware/AuthwithDS';

const router = express.Router();

router.use(express.json());
