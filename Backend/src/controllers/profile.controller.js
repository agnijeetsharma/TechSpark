import asyncHandler from "../utils/asyncHandler.js";
import { Profile } from "../models/profile.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import apiError from "../utils/apiErrors.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
const CreateProfile = asyncHandler(async (req, res) => {
  const {
    username,
    bio,
    skills,
    experienceLevel,
    interests,
    goals,
    location,
    githubLink,
    linkedinLink,
  } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username is required." });
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new apiError("user not found");
  }

  let coverImagelocalpath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImagelocalpath = req?.files?.coverImage[0]?.path;
  }

  const coverImage = await uploadOnCloudinary(coverImagelocalpath);

  const existingProfile = await Profile.findOne({ username });
  if (existingProfile) {
    return res.status(400).json({ message: "Username is already taken." });
  }

  const profile = new Profile({
    username,
    bio,
    skills,
    experienceLevel,
    interests,
    goals: goals || "",
    location: location || "",
    profileImage: coverImage?.url || "",
    githubLink,
    linkedinLink,
    user: user._id,
  });

  await profile.save();
  res
    .status(201)
    .json(new apiResponse(200, profile, "profile created successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) throw new apiError(400, "username not found");
  const updatedData = req.body;
  const profile = await Profile.findOneAndUpdate({ username }, updatedData, {
    new: true,
  });
  if (!profile) throw new apiError(404, "profile not found");
  res
    .status(200)
    .json(new apiResponse(200, profile, "profile updated successfully"));
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) throw new apiError(400, "Username not found");

  const profile = await Profile.findOne({ username });
  if (!profile) throw new apiError(404, "Profile not found");
  // console.log(req.files)
  const profileImagelocalpath = req?.files?.profileImage?.[0]?.path;
  // console.log(profileImagelocalpath)
  if (!profileImagelocalpath)
    throw new apiError(400, "Profile image is not found");

  const profileCoverImage = await uploadOnCloudinary(profileImagelocalpath);
  if (!profileCoverImage)
    throw new apiError(500, "Profile image cloud upload problem");

  const updatedProfile = await Profile.findOneAndUpdate(
    { username },
    { profileImage: profileCoverImage.url },
    { new: true },
  );
  if (!updatedProfile)
    throw new apiError(500, "Something went wrong when updating profile");

  res
    .status(200)
    .json(new apiResponse(200, updatedProfile, "Image uploaded successfully"));
});

const AllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().select("-password");
  if (!profiles) {
    throw new apiError(404, "No profiles found");
  }
  res.status(200).json(new apiResponse(200, profiles, "All profiles found"));
});

const getAllMatchProfile = asyncHandler(async (req, res) => {
  const currentUser = req.user._id;
  if (!currentUser) throw new apiError(400, "current user have some problems");
    const profile=await Profile.findById({user:currentUser});
    // if(profile)throw new apiError(400,"prfile not found");
    
});

export {
  CreateProfile,
  updateProfile,
  updateProfileImage,
  AllProfiles,
  getAllMatchProfile,
};
