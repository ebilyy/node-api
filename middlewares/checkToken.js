const jwt = require('jsonwebtoken');

const config = require('../config');

const check = async (req, res, next)=>{
  const token = req.headers['authorization'];
  console.log('token', token)
  if(!token){
    return next ({
      status: 403,
      message: `Forbiden. No Token !`
    })
  }
  try {
    var tokenObj = jwt.verify(token, config.secret)
  } catch({message}){
    return next({
      status: 400,
      message
    })
  }
  req.token = tokenObj;
  next()
}

module.exports = check