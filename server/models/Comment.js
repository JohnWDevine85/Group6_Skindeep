const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');
const commentSchema = new Schema({
  tattoo_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tattoo',
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // does this comment type need to be a string or should it reference a react component?
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
