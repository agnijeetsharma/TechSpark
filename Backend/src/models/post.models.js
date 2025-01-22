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
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Post=mongoose.model('Post',PostSchema)