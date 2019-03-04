import UserModel form '../models/User';

const User = {
  createUser(req, res) {
    if (!req.body.id && !req.body.firstName && !req.body.lastName && !req.body.contacName
        && !req.body.password && !req.body.confirmPassword) {
          return {message: 'All fields are required'}
    }

    const user = UserModel.createUser(req.body)
  },
};
