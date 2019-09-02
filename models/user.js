const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { type: String, },
  verification: { type: Boolean, default: false },
  email: { type: String, unique: true, index: true },
  password: { type: String, required: true },
  roles: [{ type: String }]
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  next();
})

UserSchema.methods.comparePasswords = function (password) {

  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)