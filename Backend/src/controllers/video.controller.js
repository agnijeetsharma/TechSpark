import { User } from "../models/user.models";
import asyncHandler from "../utils/asyncHandler";
import { Video } from "../models/video.models";
import { apiResponse } from "../utils/apiResponse";
import apiError from "../utils/apiErrors";
import { uploadOnCloudinary } from "../utils/cloudinary";
const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  let filter = {};
  if (query) {
    filter.title = { $regex: query, $options: "i" };
  }
  if (filter) {
    filter.userId = userId;
  }
  const sortOptions = {};
  sortOptions[sortBy] = sortType === "inc" ? 1 : -1;
  const videos = await Video.find(filter)
    .sort(sortOptions)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  res.status(200).json(
    new apiResponse(
      200,
      {
        data: videos,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalVideos / limitNumber),
        totalVideos,
      },
      "videos sended successfully",
    ),
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    if(!title||!description)throw new apiError(400,"All fields are requried");
    const videolocalpath = req?.files?.videofile[0]?.path;
    const thumbnaillocalpath = req?.files?.thumbnail[0]?.path;
    const uploadvideo=await uploadOnCloudinary(videolocalpath)
    const uploadthumbnail=await uploadOnCloudinary(thumbnaillocalpath)
   const video = await Video.create({ title, description, userId: req.user._id })
   if(!video)throw new apiError(400,"Something went wrong")
   res.status(201).json(new apiResponse(201,  {video:uploadvideo?.url,thumbnail:uploadthumbnail?.url} , "video created successfully"))

})

export { getAllVideos,publishAVideo };
