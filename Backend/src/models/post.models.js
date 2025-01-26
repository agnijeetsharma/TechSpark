import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    content: {
      type: String,
      requried: true,
    },
    postImage: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
      index: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", PostSchema);
