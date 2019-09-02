const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signup = async (req, res, next) => {

  const credentials = req.body;
  let user;

  try {
    user = await User.create(credentials);
  } catch ({ message }) {
    // handle errors
    return next({
      status: 400,
      message
    });
  }
  return res.json(user);

}
const signin = async (req, res, next) => {

  const { login, password } = req.body;

  const user = await User.findOne({ login })

  if (!user) {
    return next({
      status: 400,
      message: `User not found`
    });
  }

  try {
    const result = await user.comparePasswords(password);
    console.log(result);
    if (!result) {
      throw new Error;
    }
  } catch (error) {
    return next({
      status: 400,
      message: `Bad credentials`
    })
  }

  const token = jwt.sign({ _id: user._id }, config.secret)
  // jwt.signin()
  // req.session.userId = user._id;

  res.json(token);
}

module.exports = { signup, signin };