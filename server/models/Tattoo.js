const { Schema, model } = require('mongoose')
const commentSchema = require('./Comment')
const dateFormat = require('../utils/dateFormat')

const tattooSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0
    },
    comments: [commentSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

tattooSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Tattoo = model("Tattoo", tattooSchema);

module.exports = Tattoo;
