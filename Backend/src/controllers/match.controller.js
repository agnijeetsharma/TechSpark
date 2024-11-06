import apiError from "../utils/apiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import Match from "./models/matchSchema.js";
import apiResponse from "../utils/apiResponse.js";

const SendConnectionRequest = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.body;

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

const acceptConnectionRequets = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.body;
  if (!sender || !receiver)
    throw new apiError(400, "sneder or receiver is not accessable");
  const findMatch = await Match.findOne({
    $or: [
      { sender: sender, receiver: receiver },
      { receiver: sender, sender: receiver },
    ],
  });
  if (!findMatch) throw new apiError(400, "No connection request exist");
  if (findMatch.status !== "Pending") {
    throw new apiError(400, "No pending connection request exist");
  }
  const newConnection = await findMatch.update(sender, receiver, {
    status: "Accepted",
  });
  await newConnection.save();
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        newConnection,
        "Connection request accepted successfully",
      ),
    );
});

const getAllConnection = asyncHandler(async (req, res) => {
  const { userId } = req.body;
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
const AllpendingRequest = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new apiError(400, "userId is not found");
  const Connctions = await Match.find({
    $or: [
      { sender: userId, status: "Pending" },
      { receiver: userId, status: "Pending" },
    ],
  });
  if (!Connctions) throw new apiError(400, "No connection exist");
  res
    .status(200)
    .json(new apiResponse(200, Connctions, "All connection find successfully"));
});

export {
  SendConnectionRequest,
  acceptConnectionRequets,
  getAllConnection,
  AllpendingRequest,
};
