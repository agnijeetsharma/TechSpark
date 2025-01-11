import {apiError} from "../utils/apiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Match } from "../models/match.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const SendConnectionRequest = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const sender = req.user._id;
  if (!sender || !receiver) throw new apiError(404, "User is not found.");

  const findMatch = await Match.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { receiver: sender, sender: receiver },
    ],
  });

  if (findMatch) throw new apiError(400, "Connection already exists.");

  const newConnection = await Match.create({
    sender: sender,
    receiver: receiver,
    status: "Pending",
  });
  await newConnection.save();
  if (!newConnection) throw new apiError(400, "Connection request failed.");

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        newConnection,
        "Connection request sent successfully",
      ),
    );
});

const acceptConnectionRequests = asyncHandler(async (req, res) => {
  const { sender } = req.body;
  const receiver = req.user._id;

  if (!sender || !receiver) {
    throw new apiError(400, "Sender or receiver is not accessible");
  }

  const findMatch = await Match.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender },
    ],
  });

  if (!findMatch) {
    throw new apiError(400, "No connection request exists");
  }

  if (findMatch.status !== "Pending") {
    throw new apiError(400, "No pending connection request exists");
  }

  // Update status and save
  findMatch.status = "Accepted";
  await findMatch.save();

  res.status(200).json(
    new apiResponse(200, findMatch, "Connection request accepted successfully")
  );
});


const getAllConnection = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new apiError(400, "userId is not found");
  const Connctions = await Match.find({
    $or: [
      { sender: userId, status: "Accepted" },
      { receiver: userId, status: "Accepted" },
    ],
  });
  if (!Connctions) throw new apiError(400, "No connection exist");
  res
    .status(200)
    .json(new apiResponse(200, Connctions, "All connection find successfully"));
});
const AllsentRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(req.user._id);
  if (!userId) throw new apiError(400, "userId is not found");
  const Connctions = await Match.find({ sender: userId, status: "Pending" });
  if (!Connctions) throw new apiError(400, "No connection exist");
  res
    .status(200)
    .json(new apiResponse(200, Connctions, "All connection find successfully"));
});
const AllreceivedRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(req.user._id);
  if (!userId) throw new apiError(400, "userId is not found");
  const Connctions = await Match.find({ reveiver: userId, status: "Pending" });
  if (!Connctions) throw new apiError(400, "No connection exist");
  res
    .status(200)
    .json(new apiResponse(200, Connctions, "All connection find successfully"));
});

export {
  SendConnectionRequest,
  acceptConnectionRequests,
  getAllConnection,
  AllsentRequest,
  AllreceivedRequest,
};
