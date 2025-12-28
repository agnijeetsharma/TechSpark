import { Post } from "../models/post.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;
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
    author: user._id,
  });
  await post.save();
  return res
    .status(200)
    .json(new apiResponse(200, post, "new Post created successfully"));
});

const postFeed = asyncHandler(async (req, res) => {
  const { limit = 50, search = "" } = req.query;

  let query = {};

  if (search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.title = regex;
  }

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .populate("author", "username profileImage");

  res.status(200).json({
    posts,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const Id = req.query._id;
  if (!Id) throw new apiError(401, "Post Id not received");
  const post = await Post.findByIdAndUpdate(Id, req.body, {
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
  const Id = req.params.postId;
  const post = await Post.findByIdAndDelete(Id);

  if (!post) {
    throw new apiError(404, "Post not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, "Post deleted successfully"));
});

const userPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const post = await Post.find({ author: userId });
  return res
    .status(200)
    .json(new apiResponse(200, post, "User Post find Successfully"));
});

const postDetails = asyncHandler(async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId).populate("author", "username");
  if (!post) throw new apiError(401, "Post not found");
  return res
    .status(200)
    .json(new apiResponse(200, post, "Post Details find Successfully"));
});

const fetchInitialLikes = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  const post = await Post.findById(postId);
  if (!post) {
    throw new apiError(404, "Post not found");
  }

  const isLiked = post.likes.includes(userId);

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { likesCount: post.likes.length, isLiked },
        "Likes details retrieved successfully",
      ),
    );
});

const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json(new apiResponse(404, null, "Post not found"));
  }

  const index = post.likes.indexOf(userId);

  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();

  const isLiked = post.likes.includes(userId);
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { likesCount: post.likes.length, isLiked },
        "Like status updated successfully",
      ),
    );
});

const FeaturePost = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("author", "username profileImage");
  if (!posts || posts.length === 0) {
    return res.status(404).json(new apiResponse(404, null, "No posts found"));
  }
  return res
    .status(200)
    .json(new apiResponse(200, posts, "Featured posts retrieved successfully"));
});

export {
  createPost,
  postFeed,
  deletePost,
  updatePost,
  userPost,
  postDetails,
  toggleLike,
  fetchInitialLikes,
  FeaturePost,
};
