const { ValuesOfCorrectTypeRule } = require("graphql");
const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: ValuesOfCorrectTypeRule
    }
  }
);

module.exports = commentSchema;
