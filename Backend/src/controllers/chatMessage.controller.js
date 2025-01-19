// controllers/chatController.js
import asyncHandler from "../utils/asyncHandler.js";
import { Chat } from "../models/chat.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { sender, receiver, contentType } = req.body;
  let content;

  if (contentType === "Image" || contentType === "Video") {
    const filePath = req.file.path;
    const uploadedFile = await uploadOnCloudinary(filePath);
    content = uploadedFile.secure_url;
  } else {
    content = req.body.content;
  }

  const message = new Message({ sender, receiver, contentType, content });
  await message.save();

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: message._id }, lastMessageAt: Date.now() },
    { new: true },
  );

  res.status(200).json(message);
});


// main working logic for the chat API

const ChatFeature = asyncHandler(async (req, res) => {  
  const targetUserId = req.params;
  const userId = req.user._id;

  let chat = await findOne({ $all: [userId, targetUserId] }).populate({
    path: "messages.senderId",
    select: "username",
  });

  if (!chat) {
    chat = new Chat({ participants: [userId, targetUserId], messages: [] });
    await chat.save();
  }
  return res
    .status(201)
    .json(new apiResponse(201, chat, "chat fetched successfully"));
});

export {ChatFeature}
