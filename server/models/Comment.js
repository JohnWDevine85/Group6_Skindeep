const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  tattoo_id: {
    type: Schema.Types.ObjectId,
    ref: "Tattoo",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
