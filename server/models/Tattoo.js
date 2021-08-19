const mongoose = require("mongoose");
const { Schema } = mongoose;

const tattooSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
      type: Number,
      min: 0,
      default: 0
  },
});

const Tattoo = mongoose.model("Tattoo", tattooSchema);

module.exports = Tattoo;
