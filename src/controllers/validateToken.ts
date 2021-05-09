const JW = require('jsonwebtoken');
const USER = require('../models/user');

type responseTypes = {
  user: object | null;
  token: string | null;
  isAuthenticated?: boolean;
  message: string;
};

const validateToken = async (token: string | undefined | null) => {
  let response: responseTypes = {user: null, token: null, isAuthenticated: false, message: ''};
  if (token) {
    const decoded = JW.verify(token, 'SECRET');
    if (decoded) {
      const user = await USER.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      if (user) {
        response.isAuthenticated = true;
        response.user = user;
        response.token = token;
      } else response.message = 'User not found';
    } else response.message = 'Token expired';
  } else response.message = 'Unauthorized access';
  return response;
};

export default validateToken;
