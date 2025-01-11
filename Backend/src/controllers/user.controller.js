import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiErrors.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { Profile } from "../models/profile.models.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new apiError(
      500,
      "something went wrong when generating access and refresh token",
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { email, password,username } = req.body;
  if ([email, password,username].some((field) => field?.trim() === "")) {
    throw apiError(400, "All fields are requried");
  }
  const existedUser = User.findOne({ email  });
  if (!existedUser) {
    throw new apiError(409, "User should have unique details");
  }

  // const avatarlocalpath = req?.files?.avatar[0]?.path;
  // let coverImagelocalpath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.coverImage) &&
  //   req.files.coverImage.length > 0
  // ) {
  //   coverImagelocalpath = req?.files?.coverImage[0]?.path;
  // }
  // if (!avatarlocalpath) {
  //   throw new apiError(400, "avtar not found");
  // }
  // const avatar = await uploadOnCloudinary(avatarlocalpath);
  // const coverImage = await uploadOnCloudinary(coverImagelocalpath);
  // if (!avatar) {
  //   throw new apiError(400, "avatar file is requried");
  // }
  const user = await User.create({
    // avatar: avatar?.url,
    // coverImage: coverImage?.url || "",
    email,
    password,
    username
  });
  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken",
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong ,try after some time!");
  }
  return res
    .status(200)
    .json(new apiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password)
    throw new apiError(400, "Valid information not found");

  const user = await User.findOne({
    email,
  });
// console.log(user);
  if (!user) throw new apiError(400, "User not found");
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new apiError(400, "Password is not correct");
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refrenshToken",
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  const profile=await Profile.findOne({user:user._id});
  
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          profile:profile||"",
          accessToken,
          refreshToken,
        },
        "User logged In successfully",
      ),
    );
});
const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new apiResponse(200, {}, "user Logged-Out successfully "));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new apiError(400, "Unauthorized details");
  try {
    const decodeToken = await jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const user = User.findById(decodeToken._id);
    if (!user) throw new apiError(401, "user not found");
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Refresh token is expired or used");
    }
    const option = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refeshToken", newRefreshToken, option)
      .json(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "refreshToken updatede successfully",
      );
  } catch (err) {
    throw new apiError(401, "Something is wrong");
  }
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect)
    throw new apiError(400, "Old Password is not correct");
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed Successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(200, req.user, "Current User Fetched Successfully");
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  if (!fullname || !email) throw new apiError(400, "Allfields are requried");
  const user = await User.findOneAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    {
      new: true,
    },
  ).select("-password");
  return res
    .status(200)
    .json(new apiResponse(200, user, "Details update successfully"));
});
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath)
    throw new apiError(400, "User Avatar file not found there");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) throw new apiError(400, "avatar url is not there");

  const user = await User.findByIdAndUpdate(
    req?.user?._id,
    {
      $set: { avatar: avatar.url },
    },
    {
      new: true,
    },
  ).select("-password");
  return res
    .status(200)
    .json(new apiResponse(200, user, "User avatar successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req?.file?.path;
  if (!coverImageLocalPath)
    throw new apiError(400, "CoverImage file path is not accessbile");
  const coverImage = uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage.url) {
    throw new apiError(400, "Error while uploading on avatar");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    },
  ).select("-password");
  return res
    .status(200)
    .json(new apiResponse(200, user, "CoverImage updated successfully"));
});

export {
  loginUser,
  registerUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserCoverImage,
  updateUserAvatar,
};
