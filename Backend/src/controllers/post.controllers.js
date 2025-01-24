import { Post } from "../models/post.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);
  if (!title || !content) {
    throw new apiError(401, "Post details are missing ");
  }
  let postImagelocalpath;

  if (
    req.files &&
    Array.isArray(req.files.postImage) &&
    req.files.postImage.length > 0
  ) {
    postImagelocalpath = req?.files?.postImage[0]?.path;
  }
  const PostImage = await uploadOnCloudinary(postImagelocalpath);

  const post = new Post({
    title: title,
    content,
    postImage: PostImage?.url || "",
  });
  await post.save();
  return res
    .status(200)
    .json(new apiResponse(200, post, "new Post created successfully"));
});

//postFeed with infinite scrolling using last post

const postFeed = asyncHandler(async (req, res) => {
  const { lastPostId, limit = 10 } = req.query;

  // If no cursor provided, fetch the most recent posts
  let query = {};
  if (lastPostId) {
    const lastPost = await Post.findById(lastPostId);
    query = { createdAt: { $lt: lastPost.createdAt } }; // Fetch posts older than the last fetched post
  }

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

  res
    .status(200)
    .json({ posts, nextCursor: posts[posts.length - 1]?._id || null });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post) {
    throw new apiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, post, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const Id = req.query._id;
  const post = await Post.findByIdAndDelete(Id);

  if (!post) {
    throw new apiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, "Post deleted successfully"));
});

export { createPost, postFeed, deletePost, updatePost };
