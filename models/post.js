// This file contains the Schema for the actual information posted on mongodb
// Exports to models\index.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  content: String,
  photo: { type: String },
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;