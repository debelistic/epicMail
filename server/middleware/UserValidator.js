const ValidateUserInput = {
  async signUpField(req, res, next) {
    try {
      if (!req.body) {
        return res.status(400).send({

          message: 'Enter details',

        });
      }
      if (!req.body.firstName) {
        return res.status(400).send({

          message: 'Enter your first name',

        });
      }
      if (!req.body.lastName) {
        return res.status(400).send({

          message: 'Enter your last name',

        });
      }
      if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/.test(req.body.password)) {
        return res.status(400).send({

          message: 'Password should contain at least a lower and upper case, a digit and any of $,@,#,&,!',

        });
      }
      if (!req.body.username) {
        return res.status(400).send({

          message: 'Enter your username',

        });
      }
      if (!/^[a-z\d]{8,}$/i.test(req.body.username)) {
        return res.status(400).send({

          message: 'username should be at least 8 characters long',

        });
      }
      if (!req.body.password) {
        return res.status(400).send({

          message: 'Enter password',

        });
      }
      if (!req.body.securityKey) {
        return res.status(400).send({

          message: 'enter security password to reset your password',

        });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  },
  async loginField(req, res, next) {
    try {
      if (!req.body.email) {
        return res.status(400).send({
          message: 'Enter your email address',
        });
      }
      if (!req.body.password) {
        return res.status(400).send({

          message: 'Enter your password',

        });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  },


  async resetPasswordField(req, res, next) {
    try {
      if (!req.body.email) {
        return res.status(400).send({

          message: 'Enter your email address',

        });
      }
      if (!req.body.securityKey) {
        return res.status(400).send({

          message: 'Enter your security key',

        });
      }
      if (!req.body.password) {
        return res.status.send({

          message: 'Enter your a new password',

        });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  },
};

export default ValidateUserInput;
