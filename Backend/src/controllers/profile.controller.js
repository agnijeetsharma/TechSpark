import asyncHandler from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiErrors.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { Match } from "../models/match.model.js";

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new apiError(404, "user not found");
  const updatedData = req?.body.newUser;

  const profile = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  }).select("-password -refrenshToken");

  if (!profile) throw new apiError(404, "Profile updation unsuccessful");
  res
    .status(200)
    .json(new apiResponse(200, profile, "profile updated successfully"));
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new apiError(400, "User ID not found");

  const profile = await User.findById(userId);
  if (!profile) throw new apiError(404, "Profile not found");

  
  const profileImagelocalpath = req?.files?.profileImage?.[0]?.path;
  if (!profileImagelocalpath)
    throw new apiError(400, "Profile image is not found");

  
  const profileCoverImage = await uploadOnCloudinary(profileImagelocalpath);
  if (!profileCoverImage || !profileCoverImage.url)
    throw new apiError(500, "Profile image cloud upload problem");

 
  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { profileImage: profileCoverImage.url },
    { new: true }
  );
  if (!updatedProfile)
    throw new apiError(500, "Something went wrong when updating profile");

  
  res
    .status(200)
    .json(new apiResponse(200, updatedProfile, "Image uploaded successfully"));
});


const AllProfiles = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new apiError(401, "Unauthorized request");
  }

  // Exclude the current user's profile from the results
  const profiles = await User.find({ _id: { $ne: req.user._id } }).select("-password");
  
  if (!profiles || profiles.length === 0) {
    throw new apiError(404, "No profiles found");
  }

  res.status(200).json(new apiResponse(200, profiles, "All profiles found"));
});


const getPotentialMatches = asyncHandler(async (req, res) => {
  const currentUser = req.user._id;
  const userProfile = await User.findOne({ user: currentUser });
  if (!userProfile) throw new apiError(404, "User profile not found");

  const existingConnections = await Match.find({
    $or: [
      { sender: currentUser, status: { $in: ["Pending", "Accepted"] } },
      { receiver: currentUser, status: { $in: ["Pending", "Accepted"] } },
    ],
  }).select("sender receiver");

  const excludedUserIds = existingConnections.map((connection) =>
    connection.sender.equals(currentUser)
      ? connection.receiver
      : connection.sender,
  );

  const potentialMatches = await User.find({
    user: { $ne: currentUser, $nin: excludedUserIds },
    $or: [
      { skills: { $in: userProfile.skills } },
      { interests: { $in: userProfile.interests } },
      { experienceLevel: userProfile.experienceLevel },
    ],
  });

  if (!potentialMatches || potentialMatches.length === 0) {
    throw new apiError(404, "No potential matches found");
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        potentialMatches,
        "Potential match profiles retrieved successfully",
      ),
    );
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) throw new apiError(404, "User profile not found");
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { user: user },
        "User profile retrieved successfully",
      ),
    );
});

export {
  updateProfile,
  updateProfileImage,
  AllProfiles,
  getPotentialMatches,
  getUserProfile,
};
