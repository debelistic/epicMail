const dummy = require('dummy-data');

const user = {
  firstName: 'String',
  lastName: 'String',
  password: 'String',
  email: 'String',
  userImage: 'String',
  securityCode: 'String',
};

const messages = {
  firstName: 'String',
  lastName: 'String',
  password: 'String',
  email: 'String',
  userImage: 'String',
  securityCode: 'String',
};

const newmessage = dummy.generate(messages);
const newuser = dummy.generate(user);
