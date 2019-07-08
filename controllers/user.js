const UserService = require('../services/user');

async function getCurentUser(req, res, next){

  const {token } =  req;

  try {
    var user = await UserService.getUserByToken(token);
  } catch ({message}) {
    return next({
      status: 500,
      message
    })
  }
  return res.json(user)
}

module.exports = {getCurentUser};