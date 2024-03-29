const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const pageShema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [String]
})

module.exports = mongoose.model('Page', pageShema)