const User = require('../models/user');

 async function getUserByToken (token){
  const { _id } = token;
  try {
    var user = User.findOne({_id }, {password: 0})
  } catch (error) {
    throw error;
  }
  return user;
}

module.exports = {getUserByToken};