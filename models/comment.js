const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
})

module.exports = mongoose.model('Comment', CommentSchema);