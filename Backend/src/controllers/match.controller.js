import { apiError } from "../utils/apiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Match } from "../models/match.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { connections } from "mongoose";

const SendConnectionRequest = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const receiver = req.query.toUserId;
  console.log(sender, receiver);
  if (!sender || !receiver) {
    throw new apiError(404, "UserId not found.");
  }

  const findMatch = await Match.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { receiver: sender, sender: receiver },
    ],
  });

  if (findMatch) {
    throw new apiError(400, "Connection already exists.");
  }

  const newConnection = await Match.create({
    sender: sender,
    receiver: receiver,
    status: "Pending",
  });

  await newConnection.save();

  if (!newConnection) {
    throw new apiError(400, "Connection request failed.");
  }

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
  const sender = req.params.fromUserId;
  const receiver = req.user._id;
  const status = req.params.status;

  if (!sender || !receiver) {
    throw new apiError(400, "Sender or receiver is not accessible");
  }
  const allowedStatus = ["Rejected", "Accepted"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json(new apiResponse(400, null, "Invalid status"));
  }
  const findMatch = await Match.findOne(
    {
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    },
    { status: "Pending" },
  );

  if (!findMatch) {
    throw new apiError(400, "No connection request exists");
  }

  if (findMatch.status !== "Pending") {
    throw new apiError(400, "No pending connection request exists");
  }

  findMatch.status = status;
  await findMatch.save();

  res
    .status(200)
    .json(new apiResponse(200, findMatch, "Connection request" + status));
});

const getAllConnection = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new apiError(400, "User ID is not found");

  const connections = await Match.find({
    $or: [
      { sender: userId, status: "Accepted" },
      { receiver: userId, status: "Accepted" },
    ],
  })
    .populate({
      path: "sender",
    })
    .populate({
      path: "receiver",
    });

  if (!connections || connections.length === 0) {
    throw new apiError(400, "No connections exist");
  }
  const connectedUsers = connections.map((connection) => {
    if (connection.sender._id.equals(userId)) {
      return connection.receiver;
    } else {
      return connection.sender;
    }
  });

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        connectedUsers,
        "Connected users retrieved successfully",
      ),
    );
});

const AllsentRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) throw new apiError(400, "userId is not found");
  const Connctions = await Match.find({ sender: userId, status: "Pending" });
  if (!Connctions) throw new apiError(400, "No connection exist");
  res
    .status(200)
    .json(new apiResponse(200, Connctions, "All connection find successfully"));
});
const AllreceivedRequest = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log("userId:", userId);

  if (!userId) throw new apiError(400, "userId is not found");

  const Connctions = await Match.find({ receiver: userId, status: "Pending" }).populate('sender');
  

  if (!Connctions || Connctions.length === 0) {
    throw new apiError(400, "No connection exists");
  }

  res.status(200).json(new apiResponse(200, Connctions, "All connections found successfully"));
});


export {
  SendConnectionRequest,
  acceptConnectionRequests,
  getAllConnection,
  AllsentRequest,
  AllreceivedRequest,
};
