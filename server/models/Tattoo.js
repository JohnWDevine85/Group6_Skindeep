const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment')

const tattooSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0
    },
    comments: [commentSchema]
  }
);

const Tattoo = model("Tattoo", tattooSchema);

module.exports = Tattoo;
