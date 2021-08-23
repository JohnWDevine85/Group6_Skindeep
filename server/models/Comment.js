const { Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 280
    },
    commentBody: {
      type: String,
      required: true
    }
  }
);

module.exports = commentSchema;
